export class Section {

  constructor(options) {
    this._items = options.items;
    this._renderer = options.renderer;
    this._container = document.querySelector(options.containerSelector);
  }

  renderAll() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }

  setItems(newItems) {
    this._items = newItems;
  }

}