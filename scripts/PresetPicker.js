class PresetPicker {
  constructor() {
    this.currentPalette = '1a1c2c5d275db13e53ef7d57ffcd75a7f07038b76425717929366f3b5dc941a6f673eff7f4f4f494b0c2566c86333c57';
    this.container = document.createElement('div');
    this.container.classList.add('preset-picker');
    this.paletteElement = this.createPaletteElement();
    this.dropdownElement = this.createDropdownElement();
    this.isDropdownOpen = false;
    this.setupDropdown();
  }
  
  createPaletteElement() {
    let pal = new Palette(this.currentPalette);
    return pal.getPaletteElement();
  }

  createDropdownElement() {
    let dropdown = document.createElement('div');
    dropdown.classList.add('dropdown');

    let dropdownHeader = document.createElement('div');
    dropdownHeader.classList.add('dropdown-header');
    dropdownHeader.innerText = 'Select Palette';
    dropdownHeader.addEventListener('click', () => this.handleDropdownToggle());
    let dropdownIcon = document.createElement('span');
    dropdownIcon.classList.add('dropdown-icon');
    dropdownIcon.classList.add('open');
    dropdownHeader.appendChild(dropdownIcon);
    let dropdownList = document.createElement('ul');
    dropdownList.classList.add('dropdown-list');
    dropdownList.style.display = 'none';

    for (let [paletteName, paletteColors] of Object.entries(Presets)) {
      let listItem = document.createElement('li');
      listItem.classList.add('dropdown-item');
      listItem.addEventListener('click', () => this.handlePaletteChange(paletteName, paletteColors));

      let palettePreview = document.createElement('div');
      palettePreview.classList.add('palette-preview');

      let paletteNameSpan = document.createElement('div');
      paletteNameSpan.classList.add('palette-name');
      paletteNameSpan.innerText = paletteName;

      let iconGridSmall = document.createElement('div');
      iconGridSmall.classList.add('icon-grid-small');

      for (let i = 0; i < 16; i++) {
        let iconSmall = document.createElement('div');
        iconSmall.classList.add('icon-small');
        iconSmall.style.backgroundColor = `#${paletteColors.slice(i * 6, i * 6 + 6)}`;
        iconGridSmall.appendChild(iconSmall);
      }

      listItem.appendChild(paletteNameSpan);
      listItem.appendChild(iconGridSmall);
      dropdownList.appendChild(listItem);
    }

    dropdown.appendChild(dropdownHeader);
    dropdown.appendChild(dropdownList);
    return dropdown;
  }

  setupDropdown() {
    this.container.appendChild(this.dropdownElement);
    document.addEventListener('click', (event) => {
      if (!this.container.contains(event.target)) {
        this.closeDropdown();
      }
    });
  }

  handleDropdownToggle() {
    this.isDropdownOpen = !this.isDropdownOpen;
    let dropdownList = this.dropdownElement.querySelector('.dropdown-list');
    dropdownList.style.display = this.isDropdownOpen ? 'block' : 'none';
    let dropdownIcon = this.dropdownElement.querySelector('.dropdown-icon');
    dropdownIcon.classList.toggle('open', this.isDropdownOpen);
  }

  handlePaletteChange(paletteName, paletteColors) {
    this.currentPalette = paletteColors;
    currentPalette = paletteColors;
    document.getElementById('pal-title').innerText = paletteName;
    palette.palette.paletteString = paletteColors;
    palette.palette.updateColors();
    this.closeDropdown();
  }

  closeDropdown() {
    this.isDropdownOpen = false;
    let dropdownList = this.dropdownElement.querySelector('.dropdown-list');
    dropdownList.style.display = 'none';
    let dropdownIcon = this.dropdownElement.querySelector('.dropdown-icon');
    dropdownIcon.classList.remove('open');
  }

  getPresetPickerElement() {
    return this.container;
  }
}
