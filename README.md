# Pic-2-Tic

A web-app designed to convert images to 16-color format, for use with the TIC-80 fantasy console.
- Images can be exported for use anywhere.

## To run the app
- [Run the web app](https://archaicvirus.github.io/Pic-2-Tic/) - Hosted via github pages.
- Or download the source and host the index.html file
- Written in pure javascript, html, and css.
- Utilizes [RgbQuant.js](https://github.com/leeoniya/RgbQuant.js) for dithering, palette application, and palette retrieval.
- I made this tool while developing [Craptorio](https://github.com/archaicvirus/Craptorio) a wip Factorio de-make for the TIC-80, then it occured to me that this could be useful to fellow TIC-80 developers/creators.

![palette_demo2](https://github.com/archaicvirus/Pic-2-Tic/assets/25288625/7d45f458-2ca3-45cd-8b02-fa57edcf6af6)

![palette_demo](https://github.com/archaicvirus/Pic-2-Tic/assets/25288625/c5654afd-5c4e-4e42-bdd0-08a7c6d42048)

## Features
- Load any image, reduce it to 16-colors using a preset palette, or automagically.
- Over 100+ palettes imported from [lospec](https://lospec.com/) included as presets
- + Additional custom and retro computer palettes
- Automatically creates a new palette for each image, based on image colors, for optional use instead of presets.
- Drag & drop images onto canvas to load, or click the '+' icon on the canvas
- Operate on multiple images at once, with independant settings
- Download image button
- Copy any palette to clipboard
- Paste any palette from clipboard (to use custom palette)
- Copy or paste any palette directly between TIC-80's sprite editor and Pic2Tic.
- Palette string is a 96-character string where each 6 digits (0-F) represent a palette color `16 colors * 6 = 96 total characters`, excluding any quotes or #'s
- Click any palette color to customize with color picker
- Output image to TIC-80's pixel format
- Non-destructive workflow (palette applications are always performed on a copy of the original source image)
- Resize images using the anchor on the bottom right of each widget (Does not affect output scale)
- Drag and reposition image widget by dragging the top 'bar'
- Notifications pop up and fade over time, indicating user actions
- When pasting a custom palette using the clipboard button-icon, invalid palette strings are ignored, keeping the current palette.

## Image Settings
- Here you can choose the dithering kernel, enable serpentine dithering pattern, and toggle using the image's natural palette instead of the preset.

![settings2](https://github.com/archaicvirus/Pic-2-Tic/assets/25288625/f02c4ca5-e4b7-46ab-8659-345d30768f7d)

![settings](https://github.com/archaicvirus/Pic-2-Tic/assets/25288625/1cde7ac6-52ca-439b-9acd-ab8633b5174e)

## Download Image
- Downloads a copy of the currently displayed image

![downloadImage](https://github.com/archaicvirus/Pic-2-Tic/assets/25288625/ae3e7009-801f-496b-a99b-c43bf524f6c2)

## Copy Pixel Data
![copyPixel_data](https://github.com/archaicvirus/Pic-2-Tic/assets/25288625/451534be-5688-4494-ac90-8bb4c573971b)
- Outputs a 1-dimensional table of all the pixels (converted to palette indices) to the clipboard
- For drawing arbitrary sized images, 240x136 or smaller (tic80 screen size). It can easily handle any size images, though.
- Accompanied by a drawing function (used within TIC-80) to draw each pixel to the screen using pix() - See below
- Example pixel data

![examplePixelData](https://github.com/archaicvirus/Pic-2-Tic/assets/25288625/2072271a-b11f-488a-8e06-ba9f891c26d5)


## Copy Sprite Data
![copySprite_data](https://github.com/archaicvirus/Pic-2-Tic/assets/25288625/657026f0-ae9e-40c4-82b5-69a0342ab8c6)

- Paste this data between your `<SPRITES> </SPRITES>` or `<TILES> </TILES>` tags in your TIC80 cart file.
- Example sprite data:

![sprite_data_example_github](https://github.com/archaicvirus/Pic-2-Tic/assets/25288625/1e10e8d6-540b-4145-aabd-7f94bdf14fb6)

## Copy Image Palette
- Copies the image's natural palette to the clipboard

![copyPalette](https://github.com/archaicvirus/Pic-2-Tic/assets/25288625/302c3807-cb8c-4598-82e7-297a332a8c48)

## Copy Selected Palette
- Copies the current palette-preset (including custom palettes) to the clipboard

![copyCurrentPalette](https://github.com/archaicvirus/Pic-2-Tic/assets/25288625/5150264a-f0a7-498d-8057-8ccb9a6cab20)

## Paste/Import Palette
- Click to paste a copied palette from Pic2Tic, TIC80 or any source
- Example palette `010413efefefffffff0b2049184179152409263512c8d2db473f1b5d5233162e36806a47c0a2752b53897d95b2e2e1df`

![pasteCurrentPalette](https://github.com/archaicvirus/Pic-2-Tic/assets/25288625/6a8cf8e9-0b8b-4dee-bba0-4a4de67d41aa)


## Customizing Palette
- Click on any of the color cells within the palette, to change with color picker
- Adjust the RGB sliders, or manually type numbers in text-input box to the right
- Click the x to cancel changes or the check to accept the new color
- Hover any color cell to show it's palette index (same order as TIC80)

![customizeColors](https://github.com/archaicvirus/Pic-2-Tic/assets/25288625/9d7c0792-106f-4057-8de3-cd4db79706d4)


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
- For importing fullscreen images to TIC-80, `x, y` should be `0, 0` and `width, height` should be `240, 136` (TIC-80's screen resolution)
- - Although with a custom draw function, you could import larger images, and have a method to pan the screen, to see images larger than 240x136 within TIC-80.
