(function() {
  var _ = (window.aspectRatioManager = {});
  _.elem = undefined;
  _.aspect_array = [
    { text: "ВМЕСТИТЬ", mode: 0x10 },
    { text: "УВЕЛИЧЕННЫЙ", mode: 0x40 },
    { text: "ОПТИМАЛЬНЫЙ", mode: 0x50 },
    { text: "РАСТЯНУТЬ", mode: 0x00 },
    { text: "КОМБИНИРОВАННЫЙ", mode: 0x30 }
  ];
  _.mode = undefined;
  _.init = function() {
    var self = this;
    this.mode = this.getAspect();
    var index = this.mode;
    var item = this.aspect_array[index];
    var value = item.mode;
    this.setAspect(value);
    this.setText(item.text);

    document.onkeydown = function(event) {
      if (event.keyCode === 117) {
        self.handler();
      }
    };
  };
  _.handler = function() {
    var status = this.statusActive();
    if (status) {
      this.nextAspect();
    }
    this.activate();
  };
  _.next_ = function() {
    this.mode = this.mode + 1;
    if (this.mode > 4) {
      this.mode = 0;
    }
    return this.mode;
  };
  _.nextAspect = function() {
    var index = this.next_();
    var item = this.aspect_array[index];
    var value = item.mode;
    this.setAspect(value);
    this.setText(item.text);
    this.activate();
  };
  _.mount = function(id) {
    this.elem = document.getElementById(id);
  };
  _.setText = function(text) {
    if (!this.elem) {
      return false;
    }
    this.elem.innerHTML = text;
  };
  _.visible = function(mode) {
    if (mode) {
      this.elem.style.display = "block";
    } else {
      this.elem.style.display = "none";
    }
  };
  _.statusActive = function statusActive(value) {
    if (typeof value === "undefined") {
      if (statusActive.statusActive) {
        return true;
      } else {
        return false;
      }
    } else if (value === true) {
      statusActive.statusActive = true;
    } else {
      statusActive.statusActive = false;
    }
  };
  _.activate = function activate() {
    var self = this;
    this.statusActive(true);
    this.visible(true);
    if (activate.timeout) {
      try {
        clearTimeout(activate.timeout);
      } catch (e) {
        console.log(e);
      }
    }
    activate.timeout = setTimeout(function() {
      self.statusActive(false);
      self.visible(false);
      self.saveAspect(self.mode);
    }, 3000);
  };

  _.getAspect = function() {
    var value;
    try {
      value = stb.RDir("getenv aspect", value);
    } catch (e) {
      console.log(e);
    }
    if (value) {
      value = +value;
      return value;
    } else {
      return 3;
    }
  };
  _.setAspect = function(value) {
    setTimeout(function() {
      try {
        stb.SetAspect(value);
      } catch (e) {
        console.log(e);
      }
    }, 0);
  };
  _.saveAspect = function(index) {
    setTimeout(function() {
      try {
        stb.RDir("setenv aspect " + index);
      } catch (e) {
        console.log(e);
      }
    }, 1000);
  };
})();

window.aspectRatioManager.mount("aspect");
window.aspectRatioManager.init();
