<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Binance extends Model
{
    use HasFactory;

    protected $table = 'binance';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'label',
        'quantity_int',
        'quantity_float',
        'amount_in_usd',
        'type',
    ];
}
