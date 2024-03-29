// Javascript hashes, Copyright Dan Allen, 2002. See  http://www.mojavelinux.com/articles/javascript_hashes.html
function Hash() {
  this.length = 0;
  this.items = new Array();
  for (var i = 0; i < arguments.length; i += 2) {
    if (typeof arguments[i + 1] !== "undefined") {
      this.items[arguments[i]] = arguments[i + 1];
      this.length++;
    }
  }

  this.removeItem = function (in_key) {
    var tmp_previous;
    if (typeof this.items[in_key] !== "undefined") {
      this.length--;
      var tmp_previous = this.items[in_key];
      delete this.items[in_key];
    }

    return tmp_previous;
  };

  this.getItem = function (in_key) {
    return this.items[in_key];
  };

  this.setItem = function (in_key, in_value) {
    var tmp_previous;
    if (typeof in_value !== "undefined") {
      if (typeof this.items[in_key] === "undefined") {
        this.length++;
      } else {
        tmp_previous = this.items[in_key];
      }

      this.items[in_key] = in_value;
    }

    return tmp_previous;
  };

  this.hasItem = function (in_key) {
    return typeof this.items[in_key] !== "undefined";
  };

  this.clear = function () {
    for (var i in this.items) {
      delete this.items[i];
    }

    this.length = 0;
  };
}
