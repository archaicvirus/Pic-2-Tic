class PalettePicker {
  constructor() {
    this.defaultPalette = '1a1c2c5d275db13e53ef7d57ffcd75a7f07038b76425717929366f3b5dc941a6f673eff7f4f4f494b0c2566c86333c57';    
    this.palette = new Palette(this.defaultPalette);
    this.colorPicker = new ColorPicker();
    this.container = document.createElement('div');
    this.container.classList.add('palette-picker');
    this.container.appendChild(this.palette.getPaletteElement());
    this.container.appendChild(this.colorPicker.root);
  }

  expand(color) {
    this.colorPicker.setColor(color);
  }

  getPalettePickerElement() {
    return this.container;
  }
}