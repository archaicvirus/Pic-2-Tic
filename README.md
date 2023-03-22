# Pic-2-Tic
A web-app designed specifically to convert images for use with the tic80 fantasy console. 

The project is still a WIP, and once it's finished I plan on packaging a standalone version, perhaps with electron or nw.js.
For now you can run the app by using vs-code, and the plugin https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer
More experienced users feel free to run/host the files however you see fit. Please note that I am not an experienced web developer, and the code could definitely be refactored. I welcome any criticism/input/pull requests however, so feel free to contribute if inclined.

![image](https://user-images.githubusercontent.com/25288625/227027839-fca3cd29-7825-4be3-9474-2f851ca1612d.png)

Start by loading an image, and you will see a brief 'Loading...' overlay followed by 'Processing...'. Once loaded and processed, you will see two images displayed, the original image, and the image converted to current palette on the sidebar. You can independantly resize each image using the anchor on the bottom right of each image window. You can also drag and reposition each image window by dragging the top 'bar'. 

To change the palette, select a preset from the dropdown, or manually set any color using the color pickers to the left. You can also paste a hex string ("palette key" lets call it, which is the tic80 palette string format) into the text box below the preset-dropdown. You have to hit ENTER after pasting the palette key, and the app will update the palette accordingly. The 'palette key' is a 96-character string where each 6 digits (0-F) represent a palette color, so 6x16 colors = 96 characters. When changing palettes, or manually changing one of the color pickers, the current palette is adjusted, and the output image is re-processed with the new palette color/s. The 'Processing...' overlay will cover the screen during processing to prevent excessive calculations (mainly an issue when drag-selecting a color from the color-picker widget)

The 'copy sprite data' button works by splitting the image up into 8x8 chunks, and outputting 1 string for each chunk, containing the tile index and pixel data (tic80 sprite format). The clipboard will contain all of the chunks, properly seperated with '\n'. I am working on a feature where you can specify the start/offset tile index with regards to the output data. Otherwise, the app starts the tile/sprite index at 255 (sprite page), and will properly keep the tiles in order, (given the input image is 128x128 pixels or less, or 16x16 tiles/sprites) This way when you paste the sprite data into your tic80 script, the image will remain intact with respect to how the sprites appear within the tic80 sprite editor.

Below is the result of clicking the 'copy sprite data' button, and then pasting the string between the two <SPRITES> </SPRITES> tags in your tic-80 file.
 
![image](https://user-images.githubusercontent.com/25288625/227029707-522adcec-e08e-4416-926e-c6abdc1f8434.png)
