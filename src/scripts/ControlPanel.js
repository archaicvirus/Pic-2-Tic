const settings = [
  {name: 'Dithering Kernal', value: 'none', opts: ['FloydSteinberg', 'FalseFloydSteinberg', 'Stucki', 'Atkinson', 'Jarvis', 'Burkes', 'Sierra', 'TwoSierra', 'SierraLite', null], title: 'Dithering kernel type, or null for no dithering'},
  {name: 'dithDelta',  value: 0,           min: 0, max: 1,    title: 'Dithering threshhold (0-1) e.g: 0.05 will not dither colors with <= 5% difference'},
  {name: 'Serpentine Pattern',   value: false,       opts: ['True', 'False'], title: 'Enable serpentine pattern dithering'},
]

class ControlPanel {
  constructor() {
    //outer div
    this.root = document.createElement('div');
    this.root.classList.add('control-panel');
    this.root.id = 'control-panel';

    // gear icon
    this.icon = document.createElement('i');
    this.icon.classList.add('fa-solid');
    this.icon.classList.add('fa-gear');
    this.icon.classList.add('settings-icon');
    this.root.appendChild(this.icon);

    //settings header
    let header = document.createElement('h1');
    header.innerText = 'Settings';
    header.classList.add('control-panel-header');
    this.root.appendChild(header);
    //hide panel
    this.close_button = document.createElement('div');
    this.close_button.innerHTML += '&#10006';
    this.close_button.classList.add('close-button');
    this.close_button.style.fontSize = '12px';
    this.close_button.addEventListener('click', (e) => {
      e.preventDefault();
      this.close();
    });
    this.root.appendChild(this.close_button);

    // Dither - kernel select
    this.ditherOptions = createOption(settings[0]);
    this.root.appendChild(this.ditherOptions);
    // Dither - use serpentine pattern
    this.serpOptions = createOption(settings[2]);
    this.root.appendChild(this.serpOptions);

    this.usePalette = createOption({name: 'Use This Palette', value: false, opts: ['False', 'True'], title: 'If enabled, use this image\'s palette instead of global palette'});
    this.root.appendChild(this.usePalette);
  }

  open() {
    this.root.style.display = 'flex';
  }

  close() {
    this.root.style.display = 'none';
    this.icon.style.display = 'flex';
  }
}

function createOption(option) {
  let root = document.createElement('div');
  let textBox = document.createElement('div');
  let select = document.createElement('select');
  textBox.innerText = option.name;
  textBox.classList.add('option-name');
  select.classList.add('dither-select');
  root.classList.add('dither-select-box');
  root.appendChild(textBox);
  // console.log(option);
  for(let i = 0; i < option.opts.length; i++) {
    // console.log(option.opts[i]);
    let newOption = document.createElement('option');
    textBox.title = option.title;
    // newOption.value = option.value;
    newOption.classList.add('dither-option');
    newOption.innerText = option.opts[i] !== null ? option.opts[i] : 'No dithering';
    select.appendChild(newOption);
  };
  root.appendChild(select);
  
  return root
}