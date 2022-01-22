/**
 * 速度器
 * @param {Array} rate
 */
function SpeedRateController(rates) {
  this.rates = rates || [
    { range: '0-100', value: 18 },
    { range: '100-200', value: 15 },
    { range: '200-300', value: 12 },
    { range: '300-400', value: 10 },
    { range: '400-500', value: 8 },
    { range: '500-600', value: 7 },
    { range: '600-700', value: 6 },
    { range: '700-800', value: 5 },
    { range: '900-1000', value: 4 },
    { range: '1000-3000', value: 3 },
    { range: '3000-6000', value: 2 },
    { range: '6000-10000', value: 1 },
    { range: '10000-100000000', value: 0 },
  ];

  this.timestamps = 0;
}
SpeedRateController.prototype.getSpeed = function () {
  var now = Date.now(),
    diff = now - this.timestamps,
    ace = this.rates.reduce(function (total, cur) {
      var range = cur.range.split('-');
      if (diff > range[0] && diff <= range[1]) {
        total = cur.value;
      }
      return total;
    }, 0);

  this.timestamps = now;

  return ace;
};
