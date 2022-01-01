function bezier(cp, t) {
  var p1 = cp[0].mul((1 - t) * (1 - t));
  var p2 = cp[1].mul(2 * t * (1 - t));
  var p3 = cp[2].mul(t * t);
  return p1.add(p2).add(p3);
}

function random (min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function inheart(x, y, r) {
  // x^2+(y-(x^2)^(1/3))^2 = 1
  // http://www.wolframalpha.com/input/?i=x%5E2%2B%28y-%28x%5E2%29%5E%281%2F3%29%29%5E2+%3D+1
  var z = ((x / r) * (x / r) + (y / r) * (y / r) - 1) * ((x / r) * (x / r) + (y / r) * (y / r) - 1) * ((x / r) * (x / r) + (y / r) * (y / r) - 1) - (x / r) * (x / r) * (y / r) * (y / r) * (y / r);
  return z < 0;
}

function sleep(numberMillis) {
  var now = new Date();
  var exitTime = now.getTime() + numberMillis;
  while (true) {
    now = new Date();
    if (now.getTime() > exitTime)
      return;
  }
}

function Point(x, y) {
  this.x = x || 0;
  this.y = y || 0;
}

Point.prototype = {
  clone: function () {
    return new Point(this.x, this.y);
  },
  add: function (o) {
    p = this.clone();
    p.x += o.x;
    p.y += o.y;
    return p;
  },
  sub: function (o) {
    p = this.clone();
    p.x -= o.x;
    p.y -= o.y;
    return p;
  },
  div: function (n) {
    p = this.clone();
    p.x /= n;
    p.y /= n;
    return p;
  },
  mul: function (n) {
    p = this.clone();
    p.x *= n;
    p.y *= n;
    return p;
  }
}