class DraggableWindow {
  constructor(imageSrc, name) {
    this.imageIndexed = '';
    this.name = name;
    this.palette_string = '';
    this.scale = 1;
    this.draggableDiv = document.createElement('div');
    this.draggableDiv.classList.add('draggable-window');
    this.win_drag_bar = document.createElement('div');
    this.win_drag_bar.classList.add('drag-bar');
    this.drag_bar_text = document.createElement('div');
    this.copy_palette_button = document.createElement('div');
    this.copy_palette_button.title = 'Copy Palette String';
    this.copy_palette_button.classList.add('fa-solid');
    this.copy_palette_button.classList.add('fa-palette');
    this.copy_palette_button.classList.add('copy-palette-button');
    this.palette_div = document.createElement('div');
    this.palette_div.classList.add('palette-div');
    // static gear button
    this.icon = document.createElement('i');
    this.icon.classList.add('fa-solid');
    this.icon.classList.add('fa-gear');
    this.icon.classList.add('copy-palette-button');
    this.icon.title = 'Image Settings';
    this.palette_div.appendChild(this.icon);
    //download image button
    this.download = document.createElement('a');
    this.download.classList.add('fa-solid');
    this.download.classList.add('fa-file-export');
    this.download.classList.add('copy-palette-button');
    this.download.title = 'Download current image';
    this.palette_div.appendChild(this.download);
    //copy pixel data button
    this.copyPixelData = document.createElement('i');
    this.copyPixelData.classList.add('fa-regular');
    this.copyPixelData.classList.add('fa-clone');
    this.copyPixelData.classList.add('copy-palette-button');
    this.copyPixelData.title = 'Copy pixel data array';
    this.palette_div.appendChild(this.copy_palette_button);
    this.palette_div.appendChild(this.copyPixelData);
    this.win_drag_bar.appendChild(this.drag_bar_text);
    this.draggableDiv.appendChild(this.win_drag_bar);
    //image window
    this.contentDiv = document.createElement('div');
    this.contentDiv.classList.add('content');
    this.win_drag_bar.appendChild(this.palette_div);
    //settings window
    this.controlPanel = new ControlPanel();
    this.draggableDiv.appendChild(this.controlPanel.root);
    this.draggableDiv.appendChild(this.contentDiv);
    //close window button
    this.closeButton = document.createElement('div');
    this.closeButton.classList.add('close-button');
    this.closeButton.innerHTML += '&#10006';
    this.win_drag_bar.appendChild(this.closeButton);
    let conta = document.getElementById('draggableDivContainer')
    conta.appendChild(this.draggableDiv);
    this.addEventListeners();
  }
  addEventListeners() {
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    this.copyPixelData.addEventListener('click', () => {
      let outputString = '{' + this.imageIndexed.join(',') + '}';

      navigator.clipboard.writeText(outputString).then(function () {
        console.log('Pixel data copied to clipboard successfully!');
        showNotification('Pixel data copied to clipboard successfully!', 5000);
      }).catch(function (err) {
        console.error('Could not copy pixel data to clipboard:', err);
        showNotification('Could not copy pixel data to clipboard: ' + err, 5000);
      });
    });

    this.icon.addEventListener('click', () => {
      this.controlPanel.open();
    });

    this.download.addEventListener('click', () => {
      console.log('download');
    });

    this.copy_palette_button.addEventListener('click', (event) => {
      navigator.clipboard.writeText(this.palette_string).then(function () {
        console.log('Palette String copied to clipboard successfully!');
        showNotification('Palette String copied to clipboard successfully!', 5000);
      }).catch(function (err) {
        console.error('Could not copy Palette String to clipboard:', err);
        showNotification('Could not copy Palette String to clipboard:' + err, 5000);
      });
    }); 

    this.closeButton.addEventListener('click', () => {
        this.draggableDiv.remove();
    })

    this.win_drag_bar.addEventListener('mousedown', (event) => {
      isDragging = true;
      offsetX = event.clientX - this.draggableDiv.offsetLeft;
      offsetY = event.clientY - this.draggableDiv.offsetTop;
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
    });

    document.addEventListener('mousemove', (event) => {
      if (isDragging) {
        let newLeft = event.clientX - offsetX;
        let newTop = event.clientY - offsetY;
        let sb = document.getElementById('sidebarid');
        let cont = document.getElementById('draggableDivContainer')
        let minX = sb.offsetLeft - 5;
        let minY = cont.offsetTop - 5;
        let maxX = 10000;
        let maxY = 10000;
        let clampedLeft = Math.min(Math.max(minX, newLeft), maxX);
        let clampedTop = Math.min(Math.max(minY, newTop), maxY);
        this.draggableDiv.style.left = `${clampedLeft}px`;
        this.draggableDiv.style.top = `${clampedTop}px`;
      }
    });
  }

  updateScale(scale) {
    this.scale = scale;
    this.updateImage();
  }

  updateImage() {
    let imageElement = this.contentDiv.querySelector('img');
    let originalWidth = imageElement.naturalWidth;
    let originalHeight = imageElement.naturalHeight;
    imageElement.width = originalWidth * this.scale;
    imageElement.height = originalHeight * this.scale;
  }

  setImageSrc(src, name) {
    var opts = {
      colors: 16,             // desired palette size
      method: 2,               // histogram method, 2: min-population threshold within subregions; 1: global top-population
      boxSize: [64,64],        // subregion dims (if method = 2)
      boxPxls: 2,              // min-population threshold (if method = 2)
      initColors: 4096,        // # of top-occurring colors  to start with (if method = 1)
      minHueCols: 0,           // # of colors per hue group to evaluate regardless of counts, to retain low-count hues
      dithKern: 'FloydSteinberg',          // dithering kernel name, see available kernels in docs below
      dithDelta: 0,            // dithering threshhold (0-1) e.g: 0.05 will not dither colors with <= 5% difference
      dithSerp: true,         // enable serpentine pattern dithering
      palette: [],             // a predefined palette to start with in r,g,b tuple format: [[r,g,b],[r,g,b]...]
      reIndex: false,          // affects predefined palettes only. if true, allows compacting of sparsed palette once target palette size is reached. also enables palette sorting.
      useCache: true,          // enables caching for perf usually, but can reduce perf in some cases, like pre-def palettes
      cacheFreq: 10,           // min color occurance count needed to qualify for caching
      colorDist: "euclidean",  // method used to determine color distance, can also be "manhattan"
    };
    let originalElement = new Image();
    originalElement.src = src;
    let imageElement = new Image();
    originalElement.addEventListener('dragstart', (e) => e.preventDefault());
    imageElement.src = src;
    imageElement.addEventListener('dragstart', (e) => e.preventDefault());
    originalElement.onload = () => {

    };
    imageElement.onload = () => {
      let width = imageElement.naturalWidth;
      let height = imageElement.naturalHeight;
      let dimensions = `${width}x${height}`;
      this.drag_bar_text.innerText = `${name} - ${dimensions}`;
      
      if(!this.palette_bg_div) {
        this.draggableDiv.style.width = `${width}px`;
        this.contentDiv.style.height = height;
        this.quant = new RgbQuant(opts);
        this.quant.sample(imageElement, width);
        var pal = this.quant.palette(true, true);
        this.imageIndexed = this.quant.reduce(imageElement, 2);
        for(let i = 0; i < 16; i++){
          let col = {r:pal[i][0], g:pal[i][1], b:pal[i][2]};
          this.palette_string += rgbToHex(col).slice(1);
        }
  
        this.palette_bg_div = document.createElement('div');
        this.palette_bg_div.classList.add('image-palette-div');

        this.iconGridSmall = document.createElement('div');
        this.iconGridSmall.classList.add('icon-grid-small');

        for (let i = 0; i < 16; i++) {
          let iconSmall = document.createElement('div');
          iconSmall.classList.add('icon-small');
          iconSmall.style.backgroundColor = `#${this.palette_string.slice(i * 6, i * 6 + 6)}`;
          this.iconGridSmall.appendChild(iconSmall);
        }

        this.palette_bg_div.appendChild(this.iconGridSmall);
        this.palette_bg_div.style.position = 'relative';
        this.iconGridSmall.style.position = 'relative';
        this.iconGridSmall.style.marginLeft = '15px';
        this.palette_div.appendChild(this.palette_bg_div);
      }
    };
    this.contentDiv.innerHTML = '';
    this.contentDiv.appendChild(imageElement);
    this.imageSrc = imageElement;
    if(!this.originalSrc) {
      this.originalSrc = originalElement;
    }
    this.download.href = this.imageSrc.src;
    this.download.download = 'processed_' + this.name;
  }
}