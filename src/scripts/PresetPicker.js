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
    const pal = new Palette(this.currentPalette);
    return pal.getPaletteElement();
  }

  createDropdownElement() {
    const dropdown = document.createElement('div');
    dropdown.classList.add('dropdown');

    const dropdownHeader = document.createElement('div');
    dropdownHeader.classList.add('dropdown-header');
    dropdownHeader.innerText = 'Select Palette';
    dropdownHeader.addEventListener('click', () => this.handleDropdownToggle());

    // const dropdownTitle = document.createElement('h3');
    // dropdownTitle.classList.add('dropdown-title');

    const dropdownIcon = document.createElement('span');
    dropdownIcon.classList.add('dropdown-icon');
    dropdownIcon.classList.add('open');
    // dropdownHeader.appendChild(dropdownTitle);
    dropdownHeader.appendChild(dropdownIcon);

    const dropdownList = document.createElement('ul');
    dropdownList.classList.add('dropdown-list');
    dropdownList.style.display = 'none';

    for (const [paletteName, paletteColors] of Object.entries(Presets)) {
      const listItem = document.createElement('li');
      listItem.classList.add('dropdown-item');
      listItem.addEventListener('click', () => this.handlePaletteChange(paletteName, paletteColors));

      const palettePreview = document.createElement('div');
      palettePreview.classList.add('palette-preview');

      const paletteNameSpan = document.createElement('div');
      paletteNameSpan.classList.add('palette-name');
      paletteNameSpan.innerText = paletteName;

      const iconGridSmall = document.createElement('div');
      iconGridSmall.classList.add('icon-grid-small');

      for (let i = 0; i < 16; i++) {
        const iconSmall = document.createElement('div');
        iconSmall.classList.add('icon-small');
        iconSmall.style.backgroundColor = `#${paletteColors.slice(i * 6, i * 6 + 6)}`;
        iconGridSmall.appendChild(iconSmall);
      }

      // palettePreview.appendChild(paletteNameSpan);
      // palettePreview.appendChild(iconGridSmall);
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
    const dropdownList = this.dropdownElement.querySelector('.dropdown-list');
    dropdownList.style.display = this.isDropdownOpen ? 'block' : 'none';
    const dropdownIcon = this.dropdownElement.querySelector('.dropdown-icon');
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
    const dropdownList = this.dropdownElement.querySelector('.dropdown-list');
    dropdownList.style.display = 'none';
    const dropdownIcon = this.dropdownElement.querySelector('.dropdown-icon');
    dropdownIcon.classList.remove('open');
  }

  getPresetPickerElement() {
    return this.container;
  }
}
