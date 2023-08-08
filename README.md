# Pic-2-Tic

A web-app designed specifically to convert images for use with the TIC-80 fantasy console. The project is nearly complete albeit any bugs.

## To run the app
- **Note: this version is deprecated, and is no longer hosted on github pages
- You can run the app locally by using [VS Code](https://visualstudio.microsoft.com/downloads/) and the [Live Server plugin](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer). 
- If you are new to VSC, after installing both, clone the src folder, open the FOLDER with vs code, then open the index.html file, and click "Go Live" on the bottom right. It will then open a new tab in your default browser, running the app. 
- More experienced users feel free to serve the html however you see fit. Please note this older version is really slow with larger images, and has bugs. Use the newest version from the main branch instead for the best experience.
- No 3rd party libs, written in pure javascript, html, and css.
- I only made this tool for a personal need I have developing [Craptorio](https://github.com/archaicvirus/Craptorio) a Factorio de-make for the TIC-80, however it occured to me that this could be useful to fellow TIC-80 developers/creators. Criticism is welcome, so feel free to open a discussion or open a pull request if so inclined.

![image](https://user-images.githubusercontent.com/25288625/227027839-fca3cd29-7825-4be3-9474-2f851ca1612d.png)

## Features
- Load any image and convert it's colors to the selected palette (using closest color algorithm)
- Output image to TIC-80's sprite or pixel format.
- Displays both original and converted images
- Resize images using the anchor on the bottom right of each widget (Does not affect output scale)
- Drag and reposition image widget by dragging the top 'bar'
- Palette presets, contained in bottom dropdown widget.
- Create a new palette by clicking on the color pickers
- Current palette is output to the text box below, you can copy this and paste directly into the tic80 editor (sprite editor > advanced mode > edit palette > paste) - Excludes changes from color-picker's, for now.
- Paste a palette string into the text-input box, then press ENTER to update the palette (for importing/pasting in custom palettes)
- Palette string is a 96-character string where each 6 digits (0-F) represent a palette color `16 colors * 6 = 96 total characters`
- Invalid palette strings are ignored, keeping the current palette.
- Image is updated with new colors when any palette color changes
- When image is re-colored, ORIGINAL image is used for closest color to the new palette
- 'Processing...' overlay covers the screen (ignores user input briefly) during upload & conversion, to prevent repeated dispatching of conversion algorithm (mainly when drag-selecting colors within the color-picker widgets)

## Copy Sprite Data Button
- Splits the image into 8x8 sprites and copies string data to your clipboard, in TIC-80 sprite format (maintaining image order if less then 128 pixels in width)
- Clipboard contains all of the sprites, you can `ctrl + v` to paste them into your game's script files.
- Paste the sprite data between the two `<SPRITES> </SPRITES>` tags in your TIC-80 file, and reload your file to see the converted sprites. You can also paste in between `<TILES> </TILES>` if you want to use them as map tiles.
- Specify the start/offset tile index with regards to the output data (WIP feature)
- App starts the tile/sprite index at 000 and keeps the tiles in order (viewed from sprite editor) unless > 128x128px
- * See example images below

![sprite_data_example_github](https://user-images.githubusercontent.com/25288625/227044658-81c94e91-8593-4e9a-a7a3-2b83bdaaf24f.PNG)


![image](https://user-images.githubusercontent.com/25288625/227029707-522adcec-e08e-4416-926e-c6abdc1f8434.png)

## Copy Pixel Data
- Similar to above function, except it outputs a 1-dimensional table of all the pixels (converted to palette indices)
- For drawing arbitrary sized images, 240x136 or smaller (tic80 screen size). It will still output larger images, though it is really slow due to sub-optimal conversion algorithm.
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

## Side Notes & Bugs
- When copying sprite data from an image larger than 128x128, the resulting sprites tile indices are arranged in linear order from top-left to bottom right in sections of 16 sprites per row until it reaches the last row, instead of the standard row/column ordering for smaller images. This is due to the tile map and sprite map being 16x16 tiles in size. In this case, all of the sprites will not fit on one page/bank, so you will have to add in logic to switch banks, to acces the extra sprites that didn't fit on page 1, within your game script.
- I have only tested this with .png .jpeg and .bmp image formats.
- The program is not 100% complete, so expect possible bugs (although I haven't found any major ones testing)
- Note the features (WIP feature) at the end are not finished.
- Please, any feature/s you would like, open a discussion or pull request, or message me in the TIC80 discord and I will try to implement them.
