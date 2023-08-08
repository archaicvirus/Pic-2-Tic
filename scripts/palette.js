class Palette {
  constructor(paletteString) {
    this.paletteString = paletteString;
    this.container = document.createElement('div');
    this.container.classList.add('icon-grid');
    this.cells = [];
    for(let i = 0; i <= 15; i++){
      let colors = this.getColorsFromPaletteString();
      let cell = {
        root: document.createElement('div'),
        index: i,
        color: colors[i],
      }
      cell.root.classList.add('icon');
      cell.root.style.backgroundColor = colors[i];
      cell.root.title = 'Index: ' + i;
      cell.root.id = 'cell-'+ i
      cell.root.addEventListener('click', function(){
        openPalette(cell.index, cell.color);
      });
      this.cells.push(cell)
      this.container.appendChild(cell.root);
    }
  }

  updateColors() {
    let colors = this.getColorsFromPaletteString();
    for(let i = 0; i <= 15; i++){
      this.cells[i].color = colors[i];
      document.getElementById('cell-'+ i).style.backgroundColor = colors[i];
    }
  }

  getColorsFromPaletteString() {
    const colors = [];
    for (let i = 0; i < this.paletteString.length; i += 6) {
      colors.push(`#${this.paletteString.slice(i, i + 6)}`);
    }
    return colors;
  }

  setColor(index, color) {
    this.cells[index].root.style.backgroundColor = color;
    this.cells[index].color = color;
    this.updatePaletteString();
  };

  setPaletteString(paletteString) {
    this.paletteString = paletteString;
    this.updateColors();
  }
  updatePaletteString() {
    let col = this.cells.map(cell => cell.color.substring(1)); // Remove the '#' from the color
    this.paletteString = col.join('');
  }

  getPaletteElement() {
    return this.container;
  }
}
