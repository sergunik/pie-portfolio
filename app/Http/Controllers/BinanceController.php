<?php

namespace App\Http\Controllers;

use App\Models\Binance;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Carbon;

class BinanceController extends Controller
{
    private function getPrices(): array
    {
        $client = new \Binance\Spot();
        $data = $client->tickerPrice();

        $prices = [];
        foreach ($data as $ticker) {
            $prices[$ticker['symbol']] = $ticker['price'];
        }

        return $prices;
    }

    public function getData(): Response
    {
        $prices = $this->getPrices();

        $client = new \Binance\Spot([
            'key' => config('binance.key'),
            'secret' => config('binance.secret'),
        ]);
        $data = $client->account();
        $balances = $data['balances'];
        $nonZeroBalance = array_filter($balances, function ($v, $k) {
            return $v['free'] > 0 || $v['locked'] > 0;
        }, ARRAY_FILTER_USE_BOTH);

        $spotBalance = array_filter($nonZeroBalance, function ($v, $k) {
            return !str_starts_with($v['asset'], 'LD');
        }, ARRAY_FILTER_USE_BOTH);

        $savingBalance = array_filter($nonZeroBalance, function ($v, $k) {
            return str_starts_with($v['asset'], 'LD');
        }, ARRAY_FILTER_USE_BOTH);

        $savingBalance = array_map(function ($v) {
            $v['asset'] = substr($v['asset'], 2);
            return $v;
        }, $savingBalance);

//        dd($spotBalance);

        $data = $client->stakingProductPosition('STAKING');
        $stakingBalance = array_map(function ($v) {
            return [
                'asset' => $v['asset'],
                'free' => 0,
                'locked' => $v['amount'],
            ];
        }, $data);

        Binance::truncate();
        $this->store($spotBalance, $prices, 'spot');
        $this->store($savingBalance, $prices, 'saving');
        $this->store($stakingBalance, $prices, 'staking');
//        dd($stakingBalance);

        return response(['ok']);
    }

    private function store(array $spotBalance, array $prices, string $type): void
    {
        $data = [];
        $now = Carbon::now();
        foreach ($spotBalance as $v) {
            $quantity = $v['free'] + $v['locked'];

            if (isset($prices[$v['asset'].'USDT'])) {
                $amount = $quantity * $prices[$v['asset'].'USDT'];
            } elseif (isset($prices[$v['asset'].'BUSD'])) {
                $amount = $quantity * $prices[$v['asset'].'BUSD'];
            } elseif (isset($prices[$v['asset'].'USD'])) {
                $amount = $quantity * $prices[$v['asset'].'USD'];
            } elseif ('USDT' === $v['asset']) {
                $amount = $quantity;
            } else {
                $amount = 0;
            }

            $whole = (int) $quantity;
            $frac  = $quantity - $whole;
            $frac  = intval($frac * pow(10, 8));

            $data[] = [
                'label' => $v['asset'],
                'quantity_int' => $whole,
                'quantity_float' => $frac,
                'amount_in_usd' => round($amount),
                'type' => $type,
                'created_at' => $now,
                'updated_at' => $now,
            ];
        }
        Binance::insert($data);
    }
}
