{
  "annotations": {
    "list": [
      {
        "builtIn": 1,
        "datasource": {
          "type": "grafana",
          "uid": "-- Grafana --"
        },
        "enable": true,
        "hide": true,
        "iconColor": "rgba(0, 211, 255, 1)",
        "name": "Annotations & Alerts",
        "target": {
          "limit": 100,
          "matchAny": false,
          "tags": [],
          "type": "dashboard"
        },
        "type": "dashboard"
      }
    ]
  },
  "editable": true,
  "fiscalYearStartMonth": 0,
  "graphTooltip": 0,
  "id": 1,
  "links": [],
  "liveNow": false,
  "panels": [
    {
      "datasource": {
        "type": "mysql",
        "uid": "Vf9vJiZ4z"
      },
      "fieldConfig": {
        "defaults": {
          "color": {
            "mode": "palette-classic"
          },
          "custom": {
            "hideFrom": {
              "legend": false,
              "tooltip": false,
              "viz": false
            }
          },
          "mappings": []
        },
        "overrides": []
      },
      "gridPos": {
        "h": 15,
        "w": 12,
        "x": 0,
        "y": 0
      },
      "id": 4,
      "options": {
        "displayLabels": [],
        "legend": {
          "displayMode": "table",
          "placement": "right",
          "showLegend": true,
          "values": [
            "value"
          ]
        },
        "pieType": "pie",
        "reduceOptions": {
          "calcs": [
            "lastNotNull"
          ],
          "fields": "",
          "values": false
        },
        "tooltip": {
          "mode": "single",
          "sort": "none"
        }
      },
      "pluginVersion": "9.1.0",
      "targets": [
        {
          "datasource": {
            "type": "mysql",
            "uid": "Vf9vJiZ4z"
          },
          "format": "time_series",
          "group": [
            {
              "params": [
                "$__interval",
                "none"
              ],
              "type": "time"
            }
          ],
          "metricColumn": "label",
          "rawQuery": false,
          "rawSql": "SELECT\n  $__timeGroupAlias(created_at,$__interval),\n  label AS metric,\n  sum(amount_in_usd) AS \"amount_in_usd\"\nFROM binance\nWHERE\n  $__timeFilter(created_at)\nGROUP BY 1,2\nORDER BY $__timeGroup(created_at,$__interval)",
          "refId": "A",
          "select": [
            [
              {
                "params": [
                  "amount_in_usd"
                ],
                "type": "column"
              },
              {
                "params": [
                  "sum"
                ],
                "type": "aggregate"
              },
              {
                "params": [
                  "amount_in_usd"
                ],
                "type": "alias"
              }
            ]
          ],
          "table": "binance",
          "timeColumn": "created_at",
          "timeColumnType": "timestamp",
          "where": [
            {
              "name": "$__timeFilter",
              "params": [],
              "type": "macro"
            }
          ]
        }
      ],
      "title": "Portfolio Total",
      "transparent": true,
      "type": "piechart"
    },
    {
      "datasource": {
        "type": "mysql",
        "uid": "Vf9vJiZ4z"
      },
      "fieldConfig": {
        "defaults": {
          "color": {
            "mode": "palette-classic"
          },
          "custom": {
            "hideFrom": {
              "legend": false,
              "tooltip": false,
              "viz": false
            }
          },
          "mappings": []
        },
        "overrides": []
      },
      "gridPos": {
        "h": 9,
        "w": 12,
        "x": 12,
        "y": 0
      },
      "id": 2,
      "options": {
        "displayLabels": [],
        "legend": {
          "displayMode": "table",
          "placement": "right",
          "showLegend": true,
          "values": [
            "value"
          ]
        },
        "pieType": "pie",
        "reduceOptions": {
          "calcs": [
            "lastNotNull"
          ],
          "fields": "",
          "values": false
        },
        "tooltip": {
          "mode": "single",
          "sort": "none"
        }
      },
      "pluginVersion": "9.1.0",
      "targets": [
        {
          "datasource": {
            "type": "mysql",
            "uid": "Vf9vJiZ4z"
          },
          "format": "time_series",
          "group": [
            {
              "params": [
                "$__interval",
                "none"
              ],
              "type": "time"
            }
          ],
          "metricColumn": "label",
          "rawQuery": false,
          "rawSql": "SELECT\n  $__timeGroupAlias(created_at,$__interval),\n  label AS metric,\n  sum(amount_in_usd) AS \"amount_in_usd\"\nFROM binance\nWHERE\n  $__timeFilter(created_at) AND\n  type = \"spot\"\nGROUP BY 1,2\nORDER BY $__timeGroup(created_at,$__interval)",
          "refId": "A",
          "select": [
            [
              {
                "params": [
                  "amount_in_usd"
                ],
                "type": "column"
              },
              {
                "params": [
                  "sum"
                ],
                "type": "aggregate"
              },
              {
                "params": [
                  "amount_in_usd"
                ],
                "type": "alias"
              }
            ]
          ],
          "table": "binance",
          "timeColumn": "created_at",
          "timeColumnType": "timestamp",
          "where": [
            {
              "name": "$__timeFilter",
              "params": [],
              "type": "macro"
            },
            {
              "datatype": "varchar",
              "name": "",
              "params": [
                "type",
                "=",
                "\"spot\""
              ],
              "type": "expression"
            }
          ]
        }
      ],
      "title": "Portfolio Spot",
      "transparent": true,
      "type": "piechart"
    },
    {
      "datasource": {
        "type": "mysql",
        "uid": "Vf9vJiZ4z"
      },
      "fieldConfig": {
        "defaults": {
          "color": {
            "mode": "palette-classic"
          },
          "custom": {
            "hideFrom": {
              "legend": false,
              "tooltip": false,
              "viz": false
            }
          },
          "mappings": []
        },
        "overrides": []
      },
      "gridPos": {
        "h": 9,
        "w": 12,
        "x": 12,
        "y": 9
      },
      "id": 3,
      "options": {
        "displayLabels": [],
        "legend": {
          "displayMode": "table",
          "placement": "right",
          "showLegend": true,
          "values": [
            "value"
          ]
        },
        "pieType": "pie",
        "reduceOptions": {
          "calcs": [
            "lastNotNull"
          ],
          "fields": "",
          "values": false
        },
        "tooltip": {
          "mode": "single",
          "sort": "none"
        }
      },
      "pluginVersion": "9.1.0",
      "targets": [
        {
          "datasource": {
            "type": "mysql",
            "uid": "Vf9vJiZ4z"
          },
          "format": "time_series",
          "group": [
            {
              "params": [
                "$__interval",
                "none"
              ],
              "type": "time"
            }
          ],
          "metricColumn": "label",
          "rawQuery": false,
          "rawSql": "SELECT\n  $__timeGroupAlias(created_at,$__interval),\n  label AS metric,\n  sum(amount_in_usd) AS \"amount_in_usd\"\nFROM binance\nWHERE\n  $__timeFilter(created_at) AND\n  type = \"saving\"\nGROUP BY 1,2\nORDER BY $__timeGroup(created_at,$__interval)",
          "refId": "A",
          "select": [
            [
              {
                "params": [
                  "amount_in_usd"
                ],
                "type": "column"
              },
              {
                "params": [
                  "sum"
                ],
                "type": "aggregate"
              },
              {
                "params": [
                  "amount_in_usd"
                ],
                "type": "alias"
              }
            ]
          ],
          "table": "binance",
          "timeColumn": "created_at",
          "timeColumnType": "timestamp",
          "where": [
            {
              "name": "$__timeFilter",
              "params": [],
              "type": "macro"
            },
            {
              "datatype": "varchar",
              "name": "",
              "params": [
                "type",
                "=",
                "\"saving\""
              ],
              "type": "expression"
            }
          ]
        }
      ],
      "title": "Portfolio Saving",
      "transparent": true,
      "type": "piechart"
    },
    {
      "datasource": {
        "type": "mysql",
        "uid": "Vf9vJiZ4z"
      },
      "fieldConfig": {
        "defaults": {
          "color": {
            "mode": "palette-classic"
          },
          "custom": {
            "hideFrom": {
              "legend": false,
              "tooltip": false,
              "viz": false
            }
          },
          "mappings": []
        },
        "overrides": []
      },
      "gridPos": {
        "h": 9,
        "w": 12,
        "x": 12,
        "y": 18
      },
      "id": 5,
      "options": {
        "displayLabels": [],
        "legend": {
          "displayMode": "table",
          "placement": "right",
          "showLegend": true,
          "values": [
            "value"
          ]
        },
        "pieType": "pie",
        "reduceOptions": {
          "calcs": [
            "lastNotNull"
          ],
          "fields": "",
          "values": false
        },
        "tooltip": {
          "mode": "single",
          "sort": "none"
        }
      },
      "pluginVersion": "9.1.0",
      "targets": [
        {
          "datasource": {
            "type": "mysql",
            "uid": "Vf9vJiZ4z"
          },
          "format": "time_series",
          "group": [
            {
              "params": [
                "$__interval",
                "none"
              ],
              "type": "time"
            }
          ],
          "metricColumn": "label",
          "rawQuery": false,
          "rawSql": "SELECT\n  $__timeGroupAlias(created_at,$__interval),\n  label AS metric,\n  sum(amount_in_usd) AS \"amount_in_usd\"\nFROM binance\nWHERE\n  $__timeFilter(created_at) AND\n  type = \"staking\"\nGROUP BY 1,2\nORDER BY $__timeGroup(created_at,$__interval)",
          "refId": "A",
          "select": [
            [
              {
                "params": [
                  "amount_in_usd"
                ],
                "type": "column"
              },
              {
                "params": [
                  "sum"
                ],
                "type": "aggregate"
              },
              {
                "params": [
                  "amount_in_usd"
                ],
                "type": "alias"
              }
            ]
          ],
          "table": "binance",
          "timeColumn": "created_at",
          "timeColumnType": "timestamp",
          "where": [
            {
              "name": "$__timeFilter",
              "params": [],
              "type": "macro"
            },
            {
              "datatype": "varchar",
              "name": "",
              "params": [
                "type",
                "=",
                "\"staking\""
              ],
              "type": "expression"
            }
          ]
        }
      ],
      "title": "Portfolio Staking",
      "transparent": true,
      "type": "piechart"
    }
  ],
  "schemaVersion": 37,
  "style": "dark",
  "tags": [],
  "templating": {
    "list": []
  },
  "time": {
    "from": "now-6h",
    "to": "now"
  },
  "timepicker": {},
  "timezone": "",
  "title": "Portfolio",
  "uid": "g0BEFZWVz",
  "version": 4,
  "weekStart": ""
}
