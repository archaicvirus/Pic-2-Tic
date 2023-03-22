# Pic-2-Tic
A web-app designed specifically to convert images for use with the tic80 fantasy console. 

The project is still a WIP, and once it's finished I plan on packaging a standalone version, perhaps with electron or nw.js.
For now you can run the app by using vs-code, and the plugin https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer
More experienced users feel free to run/host the files however you see fit. Please note that I am not an experienced web developer, and the code could definitely be refactored. I welcome any criticism/input/pull requests however, so feel free to contribute if inclined.

![image](https://user-images.githubusercontent.com/25288625/227027839-fca3cd29-7825-4be3-9474-2f851ca1612d.png)

Start by loading an image, and you will see a brief 'Loading...' overlay followed by 'Processing...', once loaded and processed, you will see two images displayed, the original image, and the image converted to current palette on the sidebar. To change the palette, select a preset from the dropdown, or manually set each color, using the color pickers to the left. You can also paste a hex string (in the tic-80 palette format) into the text box below the preset-dropdown. You have to hit + enter after pasting the string, and the app will update the palette accordingly. The 'palette key' is a 96-character string where each 6 digits (0-F) represent a palette color, so 6x16 colors = 96 characters.
