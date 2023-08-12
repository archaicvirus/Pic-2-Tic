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
    this.dropdown = document.createElement('div');
    this.dropdown.id = 'dropdown';
    this.dropdown.classList.add('dropdown');
    this.dropdown.innerText = 'Select Palette';
    this.dropdownHeader = document.createElement('input');
    this.dropdownHeader.classList.add('dropdown-header');
    this.dropdownHeader.value = 'Select Palette';
    this.dropdownHeader.addEventListener('click', (e) => {
      e.preventDefault;
      this.dropdownHeader.value = '';
      this.handleDropdownToggle();
    });

    this.dropdownHeader.addEventListener('focusout', (e) => { 
      this.dropdownHeader.value = 'Select Palette';
      console.log('clicked off search');
      this.isDropdownOpen = false;
      this.updateDropdownList(Presets);
    });

    this.dropdownHeader.addEventListener('input', (e) => {
      console.log('typing - ' + this.dropdownHeader.value);
      if (this.dropdownHeader.value === '') {
        console.log('empty input');
        this.updateDropdownList(Presets);
      }else{
        this.handleSearch(this.dropdownHeader.value);
      }
    });
    this.dropdownIcon = document.createElement('span');
    this.dropdownIcon.classList.add('dropdown-icon');
    this.dropdownIcon.classList.add('open');
    this.dropdownHeader.appendChild(this.dropdownIcon);
    this.dropdownList = this.createDropdownList(Presets);

    this.dropdown.appendChild(this.dropdownHeader);
    this.dropdown.appendChild(this.dropdownList);
    return this.dropdown;
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
    this.dropdownList.style.display = this.isDropdownOpen ? 'block' : 'none';
    this.dropdownIcon.classList.toggle('open', this.isDropdownOpen);
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
    this.dropdownList.style.display = 'none';
    this.dropdownIcon.classList.remove('open');
  }

  getPresetPickerElement() {
    return this.container;
  }

  handleSearch(searchTerm) {
    const matchedPalettes = {};
    searchTerm = searchTerm.toLowerCase().trim();
    for (let [paletteName, paletteColors] of Object.entries(Presets)) {
      if (paletteName.toLowerCase().includes(searchTerm)) {
        matchedPalettes[paletteName] = paletteColors;
      }
  }
    console.log(matchedPalettes);
    this.updateDropdownList(matchedPalettes);
  }

  updateDropdownList(palettes) {
    let searchList = this.createDropdownList(palettes);
    if (this.dropdownList && this.dropdown.contains(this.dropdownList)) {
      this.dropdown.removeChild(this.dropdownList);
    }
    this.dropdownList = searchList;
    this.dropdown.appendChild(this.dropdownList);
    if (this.isDropdownOpen) {
      this.dropdownList.style.display = 'block';
    }
}

  createDropdownList(palettes) {
    let root = document.createElement('ul');
    root.classList.add('dropdown-list');
    root.style.display = 'none';
    for (let [paletteName, paletteColors] of Object.entries(palettes)) {
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
    root.appendChild(listItem);
    }
    return root
  }
}
