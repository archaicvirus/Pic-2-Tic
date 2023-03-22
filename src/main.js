let fileInput, slider, paletteDivs = [], paletteColors = [], colorPickers = [], textInput, canvas;
let img, imgCopy, imgProcessed, scaleValue = 1.0;
let fileInputLabel;
let img_window, output_window;
let sidebar, can, palette_list, sprite_data_button, pixel_data_button, sprite_data, load_window;
let processing = false;

//Add your own palettes to the list here
const colors = {
  'TIC-80': '1a1c2c5d275db13e53ef7d57ffcd75a7f07038b76425717929366f3b5dc941a6f673eff7f4f4f494b0c2566c86333c57',
  'PICO-8': '0000001d2b537e255383769cab5236008751ff004d5f574fff77a8ffa300c2c3c700e436ffccaa29adffffec27fff1e8',
  'MSWIN/IBM OS/2': '000000800000008000808000000080800080008080c0c0c0808080ff000000ff00ffff000000ffff00ff00ffffffffff',
  'APPLE MAC': 'fffffffbf305ff6403dd0907f208844700a50000d302abea1fb714006412562c0590713ac0c0c0808080404040000000'
};

function set_initial_palette() {
  let initialPalette = [
    "1A1C2C", "5D275D", "B13E53", "EF7D57",
    "FFCD75", "A7F070", "38B764", "257179",
    "29366F", "3B5DC9", "41A6F6", "73EFF7",
    "F4F4F4", "94B0C2", "566C86", "333C57"
  ];
  for (let i = 0; i < initialPalette.length; i++) {
    let colorHex = "#" + initialPalette[i];
    paletteColors[i] = colorHex;
    colorPickers[i].value = colorHex;
    paletteDivs[i].style.backgroundColor = colorHex;
  }
}

function parsePalette() {
  let palette_string = textInput.value;
  if (palette_string.length === 96) {
    for (let i = 0; i < 16; i++) {
      let colorHex = "#" + palette_string.substring(i * 6, i * 6 + 6);
      paletteColors[i] = colorHex;
      colorPickers[i].value = colorHex;
      paletteDivs[i].style.backgroundColor = colorHex;
    }
    recolor_output_image();
  }
}

window.addEventListener('load', () => {
  init();
});

function init() {
  load_window = document.createElement('div');
  lw_text = document.createElement('div');
  lw_text.classList.add('lw-text');
  load_window.appendChild(lw_text);
  lw_text.innerHTML = 'Loading...';
  load_window.classList.add('load-win');
  document.body.appendChild(load_window);
  // Create canvas element
  canvas = document.createElement('canvas');
  canvas.id = 'mainCanvas';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  // Sidebar container
  sidebar = document.createElement('div');
  sidebar.id = 'sidebar';
  document.body.appendChild(sidebar);

  // File input
  fileInput = document.getElementById('file-input');
  fileInput.type = 'file';
  fileInput.id = 'file-input';
  fileInput.classList.add('custom-file-input');

  // File input label
  fileInputLabel = document.createElement('label');
  fileInputLabel.innerText = 'Open Image';
  fileInputLabel.htmlFor = 'file-input';
  fileInputLabel.classList.add('custom-file-label');
  sidebar.appendChild(fileInputLabel);
  sidebar.appendChild(fileInput);

  // Canvas background card
  can = document.createElement('div');
  can.id = 'canvas-card';
  can.classList.add('canvas-card');
  document.body.appendChild(can);

  // Scale slider
  s_div = document.createElement('div');
  s_div.innerText = 'Scale';
  s_div.id = 'slider-div';
  s_div.classList.add('slider-div');
  sidebar.appendChild(s_div);
  s_div.style.display = 'none';

  slider = document.createElement('input');
  slider.type = 'range';
  slider.min = '0.1';
  slider.max = '10';
  slider.step = '0.1';
  slider.value = '1';
  slider.classList.add('scale-slider');
  slider.id = 'scale';
  slider.addEventListener('input', updateScale);
  s_div.appendChild(slider);

  // Palette color pickers
  for (let i = 0; i < 16; i++) {
    let paletteDiv = document.createElement('div');
    paletteDiv.classList.add('palette-div');
    sidebar.appendChild(paletteDiv);
    let colorPicker = document.createElement('input');
    colorPicker.type = 'color';
    colorPicker.value = '#FFFFFF';
    colorPicker.classList.add('color-picker');
    colorPicker.addEventListener('input', () => {
      paletteDiv.style.backgroundColor = colorPicker.value;
      paletteColors[i] = colorPicker.value;
      recolor_output_image();
    });
    colorPickers[i] = colorPicker;
    paletteDiv.appendChild(colorPicker);
    paletteDivs[i] = paletteDiv;
  }

  // Palette String input
  inp_div = document.createElement('div');
  inp_div.innerText = 'Copy/Paste Palette String';
  inp_div.classList.add('slider-div');
  textInput = document.createElement('input');
  textInput.type = 'text';
  textInput.value = '1a1c2c5d275db13e53ef7d57ffcd75a7f07038b76425717929366f3b5dc941a6f673eff7f4f4f494b0c2566c86333c57'
  textInput.classList.add('text-input');
  textInput.addEventListener('change', parsePalette);
  inp_div.appendChild(textInput);
  const palette_list = document.createElement('select');
  palette_list.classList.add('palette-list');
  for (const key in colors) {
    const option = document.createElement('option');
    option.value = key;
    option.text = key;
    palette_list.add(option);
  }
  palette_list.addEventListener('change', (event) => {
    const selectedColor = colors[event.target.value];
    textInput.value = selectedColor;
    parsePalette();
  });
  sidebar.appendChild(palette_list);
  sidebar.appendChild(inp_div);

  //Image Widget (Processed Image)
  output_window = new DraggableWindow();
  output_window.win_drag_bar.innerText = 'Output';
  output_window.draggableDiv.style.top = '15px';
  output_window.draggableDiv.style.left = '350px';

  //Image Widget (Original Image)
  img_window = new DraggableWindow();
  img_window.win_drag_bar.innerText = 'Input';
  // img_window.draggableDiv.style.left = '350px';
  img_window.draggableDiv.style.top = '15px';
  fileInput.addEventListener('change', (event) => {
    load_window.style.display = 'block';
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        img_window.setImageSrc(e.target.result);
        img_window.win_drag_bar.innerText = 'Input - ' + file.name;
        //Need to set the output_win.win_drag_bar.innerText here
        imgCopy = new Image();
        imgCopy.onload = () => {
          recolor_output_image();
          output_window.win_drag_bar.innerText = `Output - ${imgCopy.naturalWidth}x${imgCopy.naturalHeight}`;
          //load_window.style.display = 'none';
        };
        imgCopy.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  //Copy chunks of 8x8 'tic80' sprites to clipboard
  sprite_data_button = document.createElement('button');
  sprite_data_button.classList.add('output-button');
  sprite_data_button.innerHTML = 'Copy Sprite Data';
  sidebar.appendChild(sprite_data_button); ''
  sprite_data_button.addEventListener('click', () => {
    navigator.clipboard.writeText(sprite_data).then(function () {
      console.log('Sprite data copied to clipboard successfully!');
    }).catch(function (err) {
      console.error('Could not copy sprite data to clipboard:', err);
    });
  });

  //TODO Write lua function in tic80 using pix() to draw a 240x136 or smaller image to the screen
  //Copy pixel data as paletteColors[] indices
  pixel_data_button = document.createElement('button');
  pixel_data_button.classList.add('output-button');
  pixel_data_button.innerHTML = 'Copy Pixel Data';
  sidebar.appendChild(pixel_data_button); ''
  pixel_data_button.addEventListener('click', () => {
    let chars = 0;
    const outputImageElement = getImageElementFromWindow(output_window);
    const width = outputImageElement.naturalWidth;
    const height = outputImageElement.naturalHeight;
  
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = width;
    tempCanvas.height = height;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.drawImage(outputImageElement, 0, 0, width, height);
  
    const imageData = tempCtx.getImageData(0, 0, width, height);
    const pixelData = imageData.data;
  
    let outputString = 'output_img = [';
    for (let i = 0; i < pixelData.length; i += 4) {
      const r = pixelData[i];
      const g = pixelData[i + 1];
      const b = pixelData[i + 2];
  
      const pixelColor = `rgb(${r}, ${g}, ${b})`;
      const paletteIndex = paletteColors.findIndex((color) => color.toUpperCase() === rgbToHex(pixelColor).toUpperCase());      
      chars++;
      if (i > 3) {
        outputString += ',';
      }
  
      //outputString += paletteIndex.toString(16);
      outputString += paletteIndex;
      if (chars % 100 === 0) {
        outputString += '\n';
      }
    }
    outputString += '];';
    navigator.clipboard.writeText(outputString).then(function () {
      console.log('Pixel data copied to clipboard successfully!');
    }).catch(function (err) {
      console.error('Could not copy pixel data to clipboard:', err);
    });
  });

  set_initial_palette();
  img_window.contentDiv.addEventListener('resize', onWindowResize.bind(img_window));
  output_window.contentDiv.addEventListener('resize', onWindowResize.bind(output_window));
}

function updateScale() {
  img_window.updateScale(slider.value);
  output_window.updateScale(slider.value);
}

function recolor_output_image() {
  if (processing === true) {
    return
  }
  processing = true;
  if (load_window.style.display === 'none') {
    load_window.style.display = 'block';
  }
  lw_text.innerHTML = 'Processing Image...';
  const imgElement = img_window.contentDiv.querySelector('img');
  if (imgElement) {
    const canvas = document.createElement('canvas');
    canvas.width = imgCopy.naturalWidth;
    canvas.height = imgCopy.naturalHeight;
    const context = canvas.getContext('2d');
    context.drawImage(imgCopy, 0, 0, imgCopy.naturalWidth, imgCopy.naturalHeight);
    const imageData = context.getImageData(0, 0, imgCopy.width, imgCopy.height);
    const pixels = imageData.data;
    for (let i = 0; i < pixels.length; i += 4) {
      const r = pixels[i + 0];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      const a = pixels[i + 3];
      const colorToMatch = `rgb(${r}, ${g}, ${b})`;
      const closestColor = getClosestColor(colorToMatch);
      pixels[i + 0] = closestColor.r;
      pixels[i + 1] = closestColor.g;
      pixels[i + 2] = closestColor.b;
      pixels[i + 3] = 255;
    }
    context.putImageData(imageData, 0, 0);
    const processedImage = new Image();
    processedImage.onload = () => {
      output_window.setImageSrc(processedImage.src);
      const currentScale = parseFloat(slider.value);
      output_window.updateScale(currentScale);
      sprite_data = outputProcessedImg();
      load_window.style.display = 'none';
      lw_text.innerHTML = 'Loading...';
      processing = false;
    };
    processedImage.src = canvas.toDataURL();
  }
}

function getClosestColor(targetColor) {
  let minDist = Number.MAX_VALUE;
  let closestColor = paletteColors[0];
  for (let i = 0; i < paletteColors.length; i++) {
    let currentDist = colorDist(targetColor, paletteColors[i]);
    if (currentDist < minDist) {
      minDist = currentDist;
      closestColor = paletteColors[i];
    }
  }
  return hexToRgb(closestColor);
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function colorDist(c1, c2) {
  const [r1, g1, b1] = c1.substring(4, c1.length - 1).split(',').map(Number);
  const c2Rgb = hexToRgb(c2);
  const r2 = c2Rgb.r;
  const g2 = c2Rgb.g;
  const b2 = c2Rgb.b;
  let rDiff = r1 - r2;
  let gDiff = g1 - g2;
  let bDiff = b1 - b2;
  return rDiff * rDiff + gDiff * gDiff + bDiff * bDiff;
}

function onWindowResize() {
  const imgElement = this.contentDiv.querySelector('img');
  if (imgElement) {
    imgElement.style.width = '100%';
    imgElement.style.height = '100%';
  }
}

function rgbToHex(rgb) {
  const [r, g, b] = rgb.substring(4, rgb.length - 1).split(',').map(Number);
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
}

function getImageElementFromWindow(windowObj) {
  return windowObj.contentDiv.querySelector('img');
}

function outputProcessedImg() {
  const outputImageElement = getImageElementFromWindow(output_window);
  const width = outputImageElement.naturalWidth;
  const height = outputImageElement.naturalHeight;
  try {
    // some code that may throw an error
    if (width > 128 || height > 128) {
      throw new Error("Error: Max output size is 128x128");
    }
  } catch (error) {
    // code to handle the error
    alert(error.message);
    lw_text.innerHTML = 'Loading...';
    load_window.style.display = 'none';
    return
  }

  const tileWidth = 8;
  const tileHeight = 8;
  const sectionsPerRow = Math.ceil(width / tileWidth);
  const sectionsPerCol = Math.ceil(height / tileHeight);
  const tilemapWidth = 16; // Tilemap width in sprites (8x8)
  let output = '';

  // Create a canvas to get pixel data
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  context.drawImage(outputImageElement, 0, 0, width, height);

  for (let row = 0; row < sectionsPerCol; row++) {
    for (let col = 0; col < sectionsPerRow; col++) {
      const x = col * tileWidth;
      const y = row * tileHeight;

      // Calculate the tile index based on the tilemap width
      const tileIndex = row * tilemapWidth + col;
      const tileIndexStr = tileIndex.toString().padStart(3, '0');

      output += `-- ${tileIndexStr}:`;

      for (let i = 0; i < tileHeight; i++) {
        for (let j = 0; j < tileWidth; j++) {
          const pixelX = x + j;
          const pixelY = y + i;
          if (pixelX >= width || pixelY >= height) {
            output += '0';
          } else {
            // Get pixel color
            const imageData = context.getImageData(pixelX, pixelY, 1, 1);
            const pixelColor = `rgb(${imageData.data[0]}, ${imageData.data[1]}, ${imageData.data[2]})`;

            // Find the palette index for the pixel color
            const paletteIndex = paletteColors.findIndex((color) => color.toUpperCase() === rgbToHex(pixelColor).toUpperCase());

            output += paletteIndex.toString(16);
          }
        }
      }

      output += '\n';
    }
  }
  lw_text.innerHTML = 'Loading...';
  load_window.style.display = 'none';
  return output;
}
