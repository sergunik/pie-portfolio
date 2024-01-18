<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Binance>
 */
class BinanceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'label' => fake()->userName,
            'quantity_int' => $quantity = fake()->numberBetween(1, 100000),
            'quantity_float' => fake()->numberBetween(1, 100000),
            'amount_in_usd' => $quantity * 40,
            'type' => 'spot',
        ];
    }
}
