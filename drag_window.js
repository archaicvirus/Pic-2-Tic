class DraggableWindow {
  constructor() {
    this.imageSrc = null;
    this.scale = 1;
    this.draggableDiv = document.createElement('div');
    this.draggableDiv.classList.add('draggable-window');
    this.win_drag_bar = document.createElement('div');
    this.win_drag_bar.innerText = '-';
    this.win_drag_bar.classList.add('drag-bar');
    this.draggableDiv.appendChild(this.win_drag_bar);
    this.contentDiv = document.createElement('div');
    this.contentDiv.classList.add('content');
    this.draggableDiv.appendChild(this.contentDiv);
    document.body.appendChild(this.draggableDiv);
    this.addEventListeners();
  }

  addEventListeners() {
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

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
        const newLeft = event.clientX - offsetX;
        const newTop = event.clientY - offsetY;
        let cont = document.getElementById('canvas-card');
        const minX = cont.offsetLeft;
        const minY = cont.offsetTop;
        const maxX = cont.offsetLeft + cont.offsetWidth - this.draggableDiv.offsetWidth - 2;
        const maxY = cont.offsetHeight - this.draggableDiv.offsetHeight + 2;
        const clampedLeft = Math.min(Math.max(minX, newLeft), maxX);
        const clampedTop = Math.min(Math.max(minY, newTop), maxY);
        this.draggableDiv.style.left = `${clampedLeft}px`;
        this.draggableDiv.style.top = `${clampedTop}px`;
      }
    });

    this.draggableDiv.addEventListener('resize', () => {
      const contentHeight = this.contentDiv.offsetHeight;
      const imageHeight = this.contentDiv.querySelector('img').offsetHeight;
      const maxHeight = contentHeight + imageHeight;
      this.draggableDiv.style.maxHeight = maxHeight + 'px';
      const currentHeight = this.draggableDiv.offsetHeight;
      if (currentHeight > maxHeight) {
        this.draggableDiv.style.height = maxHeight + 'px';
      }
    });
  }

  updateScale(scale) {
    this.scale = scale;
    this.updateImage();
  }

  updateImage() {
    const imageElement = this.contentDiv.querySelector('img');
    const originalWidth = imageElement.naturalWidth;
    const originalHeight = imageElement.naturalHeight;
    imageElement.width = originalWidth * this.scale;
    imageElement.height = originalHeight * this.scale;
  }

  setImageSrc(src) {
    const imageElement = new Image();
    imageElement.src = src;
    imageElement.addEventListener('dragstart', (e) => e.preventDefault());
    this.contentDiv.innerHTML = '';
    this.contentDiv.appendChild(imageElement);
  }
}