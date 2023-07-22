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
  'APPLE MAC': 'fffffffbf305ff6403dd0907f208844700a50000d302abea1fb714006412562c0590713ac0c0c0808080404040000000',
  'Cyberpunk': '2a213dff94008c00ffa600f9ff00ccff006600ff2a00ff1a1a1a5500ff00ffaa00aaff002aff00ffff005e5e5e5e5e5d',
  'Autumn Bliss': '4b29007d3a00af4b00e25c00ff6e00ff8000ff923affa454ff7e7e007e7e0000ff0000fe5e5e5e5e5e5d5e5e5c5e5e5b',
  'Morning Haze': '3d3d3d6e6e6e9f9f9fcfcfcfedededffffffd9d9d9b2b2b28484840052521a1a1a1a1a191a1a181a1a171a1a161a1a15',
  'Soothing Sea': '005757005f6e00848400a9a900cfcf00e5e5f5f5f5d9d9d9bdbdbda1a1a184848400666e004b4b1a1a1a1a1a191a1a18',
  'Vibrant Jungle': '2626004c4d003d3dff2e2eff1c1cff0000ff0000ff005200ff5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e',
  'Midnight Sky': '1a1a1a3434344e4e4e6868688282829c9c9cb6b6b6d0d0d0eaeaeaffffffff5252521a1a1a1a1a1a1a1a1a1a1a1a1a1a',
  'Pastel Dream': 'ffd9d9ffd4d4ffceceffc9c9ffc3c3ffbdbdffb8b8ffb2b2ffacacffa6a6ffa1a1ff9b9b5e5e5e5e5e5e5e5e5e5e5e5e',
  'Sunset Boulevard': 'ff7e00ff6400ff4a00ff3000ff1600ff0000ff2a00ff5400ff7e00ffa800ffd200fffc00ffffff5e5e5e5e5e5e5e5e5e',
  'Urban Jungle': '4c4c002a2a00080000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  'Galactic Voyage': '1a1a1a3434344e4e4e6868688282829c9c9cb6b6b6d0d0d0eaeaeaffffffff5252521a1a1a1a1a1a1a1a1a1a1a1a1a1a',
  'Summer Fiesta': 'ff8c00ffd7001aff1a00bfffff69b4dc143cff45008b451380800032cd3220b2aa1919705e5e5e5e5e5d5e5e5c5e5e5b',
  'Serene Ocean': '00bfff00ffff48d1cc40e0d0afeeee00ced17fffd44682b46495ed4169e11e90ff87ceeb5e5e5e5e5e5d5e5e5c5e5e5b',
  'Nature\'s Embrace': '228b2232cd323cb3718fbc8f90ee9000ff7f66cdaa7fffd49acd32adff2f556b2f6b8e235e5e5e5e5e5d5e5e5c5e5e5b',
  'Vintage Charm': '8b4513cd853fbc8f8ff4a460d2691edeb887ffdeadbdb76b8b008b9932cc9400d38000805e5e5e5e5e5d5e5e5c5e5e5b',
  'Electric Avenue': 'ff1493ff69b4ee82eeba55d3da70d6c71585db7093ff00ffee00eecd00cd8b008b9400d35e5e5e5e5e5d5e5e5c5e5e5b',
  'Arctic Chill': '00ffff40e0d048d1cc00ced120b2aa5f9ea04682b487cefaadd8e61e90ff5e5e5e5e5e5d5e5e5c5e5e5b5e5e5a5e5e59',
  'Golden Hour': 'ffcc00ffdb58ffaa00ffd700ffc125ffa500ff8c00ffa07acdad00eead0e8b69145e5e5e5e5e5d5e5e5c5e5e5b5e5e5a',
  'Cosmic Dust': '6a5acd7b68ee483d8b9370db8a2be24b00827f00ffda70d6ba55d39932cc8b008b9400d35e5e5e5e5e5d5e5e5c5e5e5b',
  'Forest Whisper': '228b220064002e8b5732cd323cb3718fbc8f9acd32adff2f7cfc007fff005e5e5e5e5e5d5e5e5c5e5e5b5e5e5a5e5e59',
  'Smoky Quartz': 'a0522d8b4513cd853fd2691edeb887ee9a00f28500ffa07a5e5e5e5e5e5d5e5e5c5e5e5b5e5e5a5e5e595e5e585e5e57',
  'Neon Lights': '00ffff00ff00ff00ffffff00ff4500ff1493ee82eeba55d35e5e5e5e5e5d5e5e5c5e5e5b5e5e5a5e5e595e5e585e5e57',
  'Autumn Harvest': '8b0000a52a2ab22222cd5c5cdc143cff6347ff7f50ff45005e5e5e5e5e5d5e5e5c5e5e5b5e5e5a5e5e595e5e585e5e57',
  'Eroge Copper' : '0d080d4f2b24825b31c59154f0bd77fbdf9bfff9e4bebbb27bb24e74adbb4180a032535f2a23497d3840c16c5be89973',
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
    const inputImageElement = getImageElementFromWindow(img_window);
    if(inputImageElement !== null){
      load_window.style.display = 'block';
      parsePalette();
    }
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
  img_window.draggableDiv.style.top = '15px';
  fileInput.addEventListener('change', (event) => {
    load_window.style.display = 'block';
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        img_window.setImageSrc(e.target.result);
        img_window.win_drag_bar.innerText = 'Input - ' + file.name;
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
  pixel_data_button.addEventListener('click', get_pixel_data);
  set_initial_palette();
  img_window.contentDiv.addEventListener('resize', onWindowResize.bind(img_window));
  output_window.contentDiv.addEventListener('resize', onWindowResize.bind(output_window));
}

function get_pixel_data() {
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
  let outputString = '{';
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
    if (chars % width == 0) {
      console.log('inserting new line into pixel data');
      outputString += '\n';
    }
  }
  outputString += '}';
  navigator.clipboard.writeText(outputString).then(function () {
    console.log('Pixel data copied to clipboard successfully!');
  }).catch(function (err) {
    console.error('Could not copy pixel data to clipboard:', err);
  });
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
  load_window.style.display = 'block';
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
      sprite_data = get_sprite_data();
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

function get_sprite_data() {
  const outputImageElement = getImageElementFromWindow(output_window);
  const width = outputImageElement.naturalWidth;
  const height = outputImageElement.naturalHeight;
  // try {
  //   if (width > 128 || height > 128) {
  //     //sprite_data = 'image'
  //     throw new Error("Warning: Images larger than 128x128 will take much longer to process sprite data!");
  //   }
  // } catch (error) {
  //   alert(error.message);
  //   lw_text.innerHTML = 'Loading...';
  //   load_window.style.display = 'none';
  //   return
  // }
  const tileWidth = 8;
  const tileHeight = 8;
  const sectionsPerRow = Math.ceil(width / tileWidth);
  const sectionsPerCol = Math.ceil(height / tileHeight);
  const tilemapWidth = 16;
  let output = '';
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  context.drawImage(outputImageElement, 0, 0, width, height);
  for (let row = 0; row < sectionsPerCol; row++) {
    for (let col = 0; col < sectionsPerRow; col++) {
      const x = col * tileWidth;
      const y = row * tileHeight;
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
            const imageData = context.getImageData(pixelX, pixelY, 1, 1);
            const pixelColor = `rgb(${imageData.data[0]}, ${imageData.data[1]}, ${imageData.data[2]})`;
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
