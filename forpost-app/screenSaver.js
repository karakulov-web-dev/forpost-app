(function() {
  var elem = document.getElementById("screenSaver");

  function Item(elem, initX, initY, x, y) {
    this.elem = elem;
    this.position = this.createPosition(x, y);
    this.initPosition = this.createPosition(initX, initY);
  }
  Item.prototype.createPosition = function setPosition(x, y) {
    return {
      x: x,
      y: y
    };
  };
  Item.prototype.changePosition = function changePosition(position) {
    this.elem.style.left = position.x + "%";
    this.elem.style.top = position.y + "%";
  };
  Item.prototype.toPosition = function toPosition() {
    this.changePosition(this.position);
  };
  Item.prototype.toInitPosition = function toInitPosition() {
    this.changePosition(this.initPosition);
  };

  var elements = Array.prototype.slice.call(
    document.querySelectorAll(".screenSaverItems")
  );

  console.log(elements.length);
})();
