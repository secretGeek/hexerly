# hexerly

Hexerly is a tiny set of helper functions for writing hexagonal games targeting the HTML5 Canvas element. The download includes a set of sample games.

See samples: available online here: <https://secretgeek.github.io/hexerly/samples/index.html>

## Functions

There are just 5 functions in Hexerly, and they're all you need for rendering and using a hex-tiled surface.

  drawHex(c, x, y, fillStyle, borderColor)
  drawHexBorder(c, xOffset, yOffset, borderColors)
  columnRowToXY(column, row)
  xyToColumnRow(x, y)
  setScale(scale)

Each of these is described below.

### drawHex

Draws a hexagon at the given x,y coordinates.

    drawHex(c, x, y, fillStyle, borderColor)

"c" is the 2D context of a canvas element (this is a fundamental concept of canvas work and is described below)

The hexagon will be filled with 'fillStyle'. You can simply assign a color to it, e.g. "#F2F0C1", or you can delve into more complex fill styles, such as gradients. The examples included below tend to use linear gradients.

### drawHexBorder

Draws an inner border on a hexagon that is located at the given x,y co-ordinates. This is useful for 'highlighting' a hexagon.

    drawHexBorder(c, xOffset, yOffset, borderColors)

"c" is the 2D context of a canvas element (this is a fundamental concept of canvas work and is described below)

borderColors is either a string representing a color, or an array of 6 colors to be used for each edge (starting at the top and moving clockwise). This approach is used because many board games call for drawing a border on only certain edges of a tile. So the following are both valid calls:

    drawHexBorder(c, 100,100, "#F00"); //red border on every side

    drawHexBorder(c, 100,100, ["#F00","transparent","#0F0","transparent","#00F","transparent"]);
    //moving clockwise from the top,
    //borders are red, transparent, green, transparent, blue, then transparent.

### columnRowToXY

Given a column number and a row number for a hexagon, what is the x,y co-ordinate of the upper left hand corner of that hexagon?

   columnRowToXY(column, row)

Returns a 1 dimensional array with two elements: the x and y co-ordinate of the upper left hand corner of the hexagon at (column, row).

### xyToColumnRow

Given an x and y co-ordinate anywhere inside our canvas, work out which hexagon it is inside.

For example, if a user has clicked at x and y, then which hexagon did they click?

    xyToColumnRow(x, y)

Returns a 1 dimensional array with two elements: the column number and the row number of the selected hexagon.

### setScale

Useful if you want your tiles to be bigger or smaller than the default size.

For example, if you want your tiles twice as big as the default size, set the scale to 2.

If you do call this function, you should do so before you start drawing your board. The default scale (of 1.0) gives you hexes that are 27 pixels wide.

    setScale(scale)

Returns nothing.

## DOWNLOADS

Get hexerly.js (4191 bytes)

Get minified version (2165 bytes)

### Examples

* clicky
  Click a hex to turn it yellow.

* clicky 2
  Click a hex to turn it red. Click again to turn it off.

* hexPuzzler
   A fun hex puzzle. Arrange the pieces so that each piece's number of neighbors equals the number written on it.

* evolve
   Hexagonal cellular automata: trees, fire and water compete with wolves and rabbits. (Tip: try running it for a while, then starting a fire in a forest)

* hexGol
  A hexagonal game of life-style cellular automata.

see also Martin Gardner, "The Fantastic Combinations of John Conway's New Solitaire Game 'Life,'" Scientific American, 223 (October 1970) 120–123.

* slay
  Dodgy recreation of Sean O'Connors excellent slay game (i'm addicted to the iphone version).

## What is the '2D context' of a canvas element? In other words, what is 'c'?

The 'drawHex' and 'drawHexBorder' functions require a parameter named 'c' which is the 2D context of a canvas element.

I'll demonstrate what that means.

Say we have a canvas element named 'myCanvasElement', like so:

    <canvas id='myCanvasElement' width='800' height='600'> </canvas>

To use any of the html5 canvas functions we need to retrieve the '2D context' from this element, like so:

  var c = document.getElementById("myCanvasElement").getContext("2d");

All drawing is performed against the resulting 2D context variable, `c`.
