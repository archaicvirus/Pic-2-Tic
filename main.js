var currentPalette = '1a1c2c5d275db13e53ef7d57ffcd75a7f07038b76425717929366f3b5dc941a6f673eff7f4f4f494b0c2566c86333c57';
const dragDivs = [];
const palette = new PalettePicker();
const sidebar = document.getElementById('sidebarid')
const paletteDiv = document.getElementById('palettePicker');
const presetPicker = new PresetPicker();
const copyPasteDiv = document.createElement('div');
const copyPaletteButton = document.createElement('div');
const pastePaletteButton = document.createElement('div');
const applyPaletteButton = document.createElement('div');
// const undoButton = document.createElement('div');

applyPaletteButton.classList.add('apply-palette');
applyPaletteButton.innerText = 'Apply Palette';
pastePaletteButton.title = 'Paste Palette';
pastePaletteButton.classList.add('fa-solid');
pastePaletteButton.classList.add('fa-clipboard');
pastePaletteButton.classList.add('paste-palette-string');
copyPaletteButton.title = 'Copy Palette String';
copyPaletteButton.classList.add('fa-solid');
copyPaletteButton.classList.add('fa-clone');
copyPaletteButton.classList.add('copy-palette-string');
var selectedColor = 0;
sidebar.appendChild(palette.container);
sidebar.appendChild(applyPaletteButton);
sidebar.appendChild(presetPicker.getPresetPickerElement());
copyPasteDiv.appendChild(copyPaletteButton);
copyPasteDiv.appendChild(pastePaletteButton);
sidebar.appendChild(copyPasteDiv);

copyPaletteButton.addEventListener('click', (e) => {
  e.preventDefault();
  navigator.clipboard.writeText(currentPalette).then(function () {
    console.log('Current palette copied to clipboard successfully!');
    showNotification('Current palette copied to clipboard successfully!', 5000);
  }).catch(function (err) {
    console.error('Could not copy Current palette to clipboard:', err);
    showNotification('Could not copy Current palette to clipboard: ' + err, 5000);
  });
});

pastePaletteButton.addEventListener('click', (e) => {
  e.preventDefault();
  navigator.clipboard.readText().then(function (clipboardText) {
    let result = parsePalette('Custom', clipboardText.toString());
    if (result === true) {
      showNotification('Palette Set Successfully!', 5000);
    }else{
      showNotification('Could not read text from clipboard: ' + err, 5000);  
    }
  }).catch(function (err) {
    console.error('Could not read text from clipboard:', err);
    showNotification('Could not read text from clipboard: ' + err, 5000);
  });
});

sidebar.addEventListener('drop', (e) => {e.preventDefault()});

document.getElementById('draggableDivContainer').addEventListener("drop", (event) => {
  event.preventDefault();
  let files = event.dataTransfer.files;
  let dropX = event.clientX - 230;
  let dropY = event.clientY;
  let cascadeOffsetX = 30;
  let cascadeOffsetY = 30;
  let offsetX = 0;
  let offsetY = 0;
  for (let file of files) {
    if (file.type.startsWith("image/")) {
      let reader = new FileReader();
      reader.onload = (e) => {
        let newDraggable = createDraggableWindowWithImage(e.target.result, file.name);
        newDraggable.draggableDiv.style.left = (dropX + offsetX) + "px";
        newDraggable.draggableDiv.style.top = (dropY + offsetY) + "px";
        offsetX += cascadeOffsetX;
        offsetY += cascadeOffsetY;
        newDraggable.draggableDiv.addEventListener('mousedown', () => {
          for(let i = 0; i < dragDivs.length; i++){
            if (dragDivs[i].draggableDiv.style.zIndex > 1){
              dragDivs[i].draggableDiv.style.zIndex = 1;
            };
          };
          newDraggable.draggableDiv.style.zIndex = 100;
        });
        dragDivs.push(newDraggable);
      };
      reader.readAsDataURL(file);
    }
  }
});

const fileIcon = document.getElementById('fileIcon');
const fileInput = document.getElementById('fileInput');

fileIcon.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', (event) => {
  const files = event.target.files;
  for (const file of files) {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        newDraggable = createDraggableWindowWithImage(e.target.result, file.name);
        dragDivs.push(newDraggable);
      };
      reader.readAsDataURL(file);
    }
  }
});

document.addEventListener("dragover", (event) => event.preventDefault());
document.addEventListener("dragenter", (event) => event.preventDefault());

function createDraggableWindowWithImage(imageData, name) {
  let draggableWindow = new DraggableWindow(imageData, name);
  draggableWindow.setImageSrc(imageData, name);
  return draggableWindow;
}

function setPickerColor(col){
    col = hexToRgb(col);
    palette.colorPicker.rChannel.slider.value = parseInt(col.r);
    palette.colorPicker.rChannel.input.value = parseInt(col.r);
    palette.colorPicker.gChannel.slider.value = parseInt(col.g);
    palette.colorPicker.gChannel.input.value = parseInt(col.g);
    palette.colorPicker.bChannel.slider.value = parseInt(col.b);
    palette.colorPicker.bChannel.input.value = parseInt(col.b);
    palette.colorPicker.updateColorFromRGBSliders();
};

function acceptColor(){
  palette.colorPicker.root.style.display = 'none';
  palette.palette.setColor(selectedColor, palette.colorPicker.color);
  currentPalette = palette.palette.paletteString;
};

function cancelColor(){
  palette.colorPicker.root.style.display = 'none';
};

function valueToHex(c) {
  var hex = c.toString(16);
  return hex
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(col) {
  return "#" + (1 << 24 | col.r << 16 | col.g << 8 | col.b).toString(16).slice(1);
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function openPalette(index, color) {
  setPickerColor(color);
  selectedColor = index;
  palette.colorPicker.root.style.display = 'flex';
};

function parsePalette(name, palette) {
  let palette_string = palette;
  if (palette_string.length === 96) {
    presetPicker.handlePaletteChange(name, palette)
  }else{
    return false;
  }
  return true;
}

function applyPalette() {
  let palette = [];
  for (let i = 0; i < 16; i++) {
    let col = hexToRgb(currentPalette.slice(i * 6, i * 6 + 6));
    palette.push([col.r, col.g, col.b]);
  }

  for (let i = 0; i < dragDivs.length; i++) {
    let opts = {
      colors: 16,              // desired palette size
      method: 2,               // histogram method, 2: min-population threshold within subregions; 1: global top-population
      boxSize: [64,64],        // subregion dims (if method = 2)
      boxPxls: 2,              // min-population threshold (if method = 2)
      initColors: 4096,        // # of top-occurring colors  to start with (if method = 1)
      minHueCols: 0,           // # of colors per hue group to evaluate regardless of counts, to retain low-count hues
      dithKern: null,          // dithering kernel name, see available kernels in docs below
      dithDelta: 0,            // dithering threshhold (0-1) e.g: 0.05 will not dither colors with <= 5% difference
      dithSerp: true,          // enable serpentine pattern dithering
      palette: palette,        // a predefined palette to start with in r,g,b tuple format: [[r,g,b],[r,g,b]...]
      reIndex: false,          // affects predefined palettes only. if true, allows compacting of sparsed palette once target palette size is reached. also enables palette sorting.
      useCache: false,         // enables caching for perf usually, but can reduce perf in some cases, like pre-def palettes
      cacheFreq: 10,           // min color occurance count needed to qualify for caching
      colorDist: "euclidean",  // method used to determine color distance, can also be "manhattan"
    };
    let dither_kernel = dragDivs[i].controlPanel.ditherOptions.querySelector('select').value;
    opts.dithSerp = dragDivs[i].controlPanel.serpOptions.querySelector('select').value === 'True' ? true : false;
    let usePalette = dragDivs[i].controlPanel.usePalette.querySelector('select').value;
    if(dither_kernel === 'No dithering') {
      dither_kernel = null;
    }
    opts.dithKern = dither_kernel;
    if(usePalette == 'True'){
      let imgPalette = [];
      for (let j = 0; j < 16; j++) {
        let col = hexToRgb(dragDivs[i].palette_string.slice(j * 6, j * 6 + 6));
        imgPalette.push([col.r, col.g, col.b]);
      }
      opts.palette = imgPalette;
    }
    let image = dragDivs[i].originalSrc;
    let quant = new RgbQuant(opts);
    quant.sample(image, image.naturalWidth);
    let pal = quant.palette();
    let reduced = quant.reduce(image, 1);
    let reducedIndexed = quant.reduce(image, 2);
    dragDivs[i].imageIndexed = reducedIndexed;
    let reducedClamped = new Uint8ClampedArray(reduced);
    let imageData = new ImageData(reducedClamped, image.naturalWidth, image.naturalHeight);
    let canvas = document.createElement('canvas');
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    let ctx = canvas.getContext('2d');
    ctx.putImageData(imageData, 0, 0);
    let newImg = new Image();
    newImg.src = canvas.toDataURL();
    dragDivs[i].setImageSrc(newImg.src, dragDivs[i].name);
  }
  showNotification('Applied palette to all images!', 5000);
};

palette.colorPicker.okButton.addEventListener('click', acceptColor);
palette.colorPicker.cancelButton.addEventListener('click', cancelColor);
applyPaletteButton.addEventListener('click', applyPalette);