(function() {
  // bind - simple polyfill
  if (!Function.prototype.bind) {
    Function.prototype.bind = function(context /* ...args */) {
      var fn = this;
      var args = Array.prototype.slice.call(arguments, 1);
      if (typeof fn !== "function") {
        throw new TypeError(
          "Function.prototype.bind - context must be a valid function"
        );
      }
      return function() {
        return fn.apply(
          context,
          args.concat(Array.prototype.slice.call(arguments))
        );
      };
    };
  }
  if (![].flat) {
    Array.prototype.flat = function(depth) {
      depth = depth ? depth : 1;
      depth = isNaN(depth) ? 0 : Math.floor(depth);
      if (depth < 1) return this.slice();
      return [].concat.apply(
        [],
        depth < 2
          ? this
          : this.map(function(v) {
              return Array.isArray(v) ? v.flat(depth - 1) : v;
            })
      );
    };
  }

  if (![].fill) {
    Array.prototype.fill = function(value) {
      var O = Object(this);
      var len = parseInt(O.length, 10);
      var start = arguments[1];
      var relativeStart = parseInt(start, 10) || 0;
      var k =
        relativeStart < 0
          ? Math.max(len + relativeStart, 0)
          : Math.min(relativeStart, len);
      var end = arguments[2];
      var relativeEnd = end === undefined ? len : parseInt(end) || 0;
      var final =
        relativeEnd < 0
          ? Math.max(len + relativeEnd, 0)
          : Math.min(relativeEnd, len);

      for (; k < final; k++) {
        O[k] = value;
      }

      return O;
    };
  }
})();
