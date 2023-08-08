# Pic-2-Tic

A web-app designed specifically to convert images for use with the TIC-80 fantasy console.

## To run the app
- [Run the web app](https://archaicvirus.github.io/Pic-2-Tic/) - Hosted via github pages.
- Or download the source and host the index.html file
- Written in pure javascript, html, and css.
- Utilizes [RgbQuant.js](https://github.com/leeoniya/RgbQuant.js) for dithering, palette application, and palette retrieval.
- I made this tool while developing [Craptorio](https://github.com/archaicvirus/Craptorio) a wip Factorio de-make for the TIC-80, however it occured to me that this could be useful to fellow TIC-80 developers/creators.

![palette_demo2](https://github.com/archaicvirus/Pic-2-Tic/assets/25288625/7d45f458-2ca3-45cd-8b02-fa57edcf6af6)

![palette_demo](https://github.com/archaicvirus/Pic-2-Tic/assets/25288625/c5654afd-5c4e-4e42-bdd0-08a7c6d42048)

## Features
- Load any image and convert it's colors to the selected palette
- Over 100+ palettes imported from [lospec](https://lospec.com/) included as presets
- + Additional custom and retro computer palettes
- Automatically creates a new palette based on image colors, for optional use
- Drag & drop images onto canvas to load, or click the '+' icon on the canvas
- Operate on multiple images at once, with independant settings
- Download image button
- Copy any palette to clipboard
- Paste any palette from clipboard (to use custom palette)
- Palette string is a 96-character string where each 6 digits (0-F) represent a palette color `16 colors * 6 = 96 total characters`, excluding any quotes or #'s
- Click any palette color to customize with color picker
- Output image to TIC-80's pixel format
- Non-destructive workflow (palette applications are always performed on a copy of the original source image)
- Resize images using the anchor on the bottom right of each widget (Does not affect output scale)
- Drag and reposition image widget by dragging the top 'bar'
- Invalid palette strings are ignored, keeping the current palette.
- Notifications pop up and fade over time, indicating user actions

## Copy Pixel Data
- Outputs a 1-dimensional table of all the pixels (converted to palette indices) to the clipboard
- For drawing arbitrary sized images, 240x136 or smaller (tic80 screen size). It can easily handle any size images, though.
- Accompanied by a drawing function (used within TIC-80) to draw each pixel to the screen using pix() - See below

## Example pixel data

![pixel_data_output_example](https://user-images.githubusercontent.com/25288625/227093468-c9096f79-0925-4798-9122-d54438cc5c6e.PNG)

## Draw image function for TIC-80 in lua

```lua
function draw_image(x, y, width, height, pixel_data, color_key)
  color_key = color_key or -1
  for i = 0, width - 1 do
    for j = 0, height - 1 do
      local index = j * width + i
      if pixel_data[index] ~= color_key then
        pix(x + i, y + j, pixel_data[index])
      end
    end
  end
```

- `x, y` - The x,y screen coordinates to draw the image
- `width, height` - The natural width and height of the image in pixels
- `pixel_data` - A lua table copied from 'copy pixel data' button
- `color_key` - Transparency, eg. will not draw this color/palette index
- For fullscreen images, `x, y` should be `0, 0` and `width, height` should be `240, 136` (TIC-80's screen resolution)
