  // Function to create and set up a slider and input box for a color channel
  function createSliderAndInput(channelName) {
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = '0';
    slider.max = '255';
    slider.step = '1';
    slider.value = '50';
    slider.classList.add('picker-slider');
    const input = document.createElement('input');
    input.type = 'text';
    input.classList.add('picker-input');
    input.value = '50';
    const container = document.createElement('div');
    container.classList.add('slider-container');
    const text = document.createElement('div');
    text.innerHTML = `${channelName}`;
    text.classList.add('picker-slider-text');
    container.appendChild(text);
    container.appendChild(slider);
    container.appendChild(input);
    return { container: container, slider: slider, input: input, text: text };
  };


class ColorPicker {
  constructor() {
    this.root = document.createElement('div');
    this.root.classList.add('picker-card');
    this.canvas = document.createElement('canvas');
    this.canvas.classList.add('picker-canvas');
    this.root.appendChild(this.canvas);
    // Default color
    this.color = 'rgb(50, 50, 50)';
    // RGB sliders and input boxes
    this.rChannel = createSliderAndInput('R');
    this.gChannel = createSliderAndInput('G');
    this.bChannel = createSliderAndInput('B');
    this.rChannel.container.title = 'Red Channel';
    this.gChannel.container.title = 'Green Channel';
    this.bChannel.container.title = 'Blue Channel';
    this.rChannel.text.style.color = '#FF0000';
    this.gChannel.text.style.color = '#00FF00';
    this.bChannel.text.style.color = '#036ffc';
    // Add sliders and input boxes to the slider container
    this.sliderContainer = document.createElement('div');
    this.sliderContainer.classList.add('picker-sliders')
    this.sliderContainer.appendChild(this.rChannel.container);
    this.sliderContainer.appendChild(this.gChannel.container);
    this.sliderContainer.appendChild(this.bChannel.container);
    this.root.appendChild(this.sliderContainer);
    this.buttonDiv = document.createElement('div');
    this.buttonDiv.classList.add('picker-button-div');
    this.cancelButton = document.createElement('button');
    this.cancelButton.innerHTML += '&#10006';
    this.cancelButton.title = 'Cancel';
    this.cancelButton.classList.add('picker-ok-button');
    this.cancelButton.classList.add('picker-cancel-button');
    // this.cancelButton.style.backgroundColor = '#ff0037';
    this.okButton = document.createElement('button');
    this.okButton.innerHTML += '&#10004';
    this.okButton.title = 'Accept Color Change';
    this.okButton.classList.add('picker-ok-button');
    let spacer = document.createElement('div');
    spacer.classList.add('picker-button-spacer');
    this.buttonDiv.appendChild(this.cancelButton);
    this.buttonDiv.appendChild(spacer);
    this.buttonDiv.appendChild(this.okButton);
    this.root.appendChild(this.buttonDiv);
    // Function to update the color based on the RGB slider values
    this.updateColorFromRGBSliders = function () {
      const r = parseInt(this.rChannel.slider.value, 10);
      const g = parseInt(this.gChannel.slider.value, 10);
      const b = parseInt(this.bChannel.slider.value, 10);
      this.color = rgbToHex({r:r,g:g,b:b});
      this.canvas.style.backgroundColor = this.color;
    };
    // this.setColor = function() {
    //   console.log('color: ');
    //   this.rChannel.slider.value = parseInt(col[0]);
    //   this.rChannel.input.value = parseInt(col[0]);
    //   this.gChannel.slider.value = parseInt(col[1]);
    //   this.gChannel.input.value = parseInt(col[1]);
    //   this.bChannel.slider.value = parseInt(col[2]);
    //   this.bChannel.input.value = parseInt(col[2]);
    //   this.updateColorFromRGBSliders();
    // };
    this.clamp = function (value, min, max) {
      return Math.min(Math.max(value, min), max);
    };

    // Add event listeners to the RGB sliders and input boxes
    this.rChannel.slider.addEventListener('input', () => {
      this.rChannel.input.value = this.clamp(this.rChannel.slider.value, 0, 255);
      this.updateColorFromRGBSliders();
    });
    this.gChannel.slider.addEventListener('input', () => {
      this.gChannel.input.value = this.clamp(this.gChannel.slider.value, 0, 255);
      this.updateColorFromRGBSliders();
    });
    this.bChannel.slider.addEventListener('input', () => {
      this.bChannel.input.value = this.clamp(this.bChannel.slider.value, 0, 255);
      this.updateColorFromRGBSliders();
    });
    this.rChannel.input.addEventListener('input', () => {
      this.rChannel.slider.value = this.clamp(parseInt(this.rChannel.input.value, 10) || 0, 0, 255);
      this.updateColorFromRGBSliders();
    });
    this.gChannel.input.addEventListener('input', () => {
      this.gChannel.slider.value = this.clamp(parseInt(this.gChannel.input.value, 10) || 0, 0, 255);
      this.updateColorFromRGBSliders();
    });
    this.bChannel.input.addEventListener('input', () => {
      this.bChannel.slider.value = this.clamp(parseInt(this.bChannel.input.value, 10) || 0, 0, 255);
      this.updateColorFromRGBSliders();
    });
    // Initially update the color based on the RGB slider values
    this.updateColorFromRGBSliders();
  }
}
