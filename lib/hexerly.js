// helper functions for hexagonal tile-based games in HTML Canvas, Copyright Leon Bambrick, 2010. See  http://hexerly.codeplex.com or http://secretgeek.net/hexerly.asp for licensing
(function () {
  var TILE_WIDTH, TILE_HEIGHT, SCALE, HEX_SLOPE, hexPoints, hexInnerPoints;
  SCALE = 1.0;
  TILE_WIDTH = 21 * SCALE;
  TILE_HEIGHT = 24 * SCALE;
  HEX_SLOPE = 12.0 / 7.0;
  hexPoints = [];
  //    0-1--
  // 6 /     \ 2
  // 5 \     / 3
  //    --4--
  hexPoints[0] = [7, 0];
  hexPoints[1] = [20, 0];
  hexPoints[2] = [27, 12];
  hexPoints[3] = [20, 23];
  hexPoints[4] = [7, 23];
  hexPoints[5] = [0, 12];
  hexPoints[6] = hexPoints[0];

  hexInnerPoints = [];
  hexInnerPoints[0] = [7.5, 1];
  hexInnerPoints[1] = [19.5, 1];
  hexInnerPoints[2] = [25.8, 12];
  hexInnerPoints[3] = [19.5, 22];
  hexInnerPoints[4] = [7.5, 22];
  hexInnerPoints[5] = [1.2, 12];
  hexInnerPoints[6] = hexInnerPoints[0];

  this.setScale = function (scale) {
    SCALE = scale;
  };

  this.drawHex = function (c, xOffset, yOffset, fillStyle, borderColor) {
    if (c === undefined) {
      alert("No C!");
    }
    var i, gradient;
    c.beginPath();
    c.moveTo(
      (hexPoints[0][0] + xOffset) * SCALE,
      (hexPoints[0][1] + yOffset) * SCALE
    );
    for (i = 0; i < 6; i = i + 1) {
      c.lineWidth = 1.0;
      c.lineTo(
        (hexPoints[i + 1][0] + xOffset) * SCALE,
        (hexPoints[i + 1][1] + yOffset) * SCALE
      );
    }

    c.closePath();
    c.strokeStyle = borderColor;
    c.stroke();

    if (fillStyle !== undefined) {
      c.fillStyle = fillStyle;
      c.fill();
    }
  };

  this.drawHexBorder = function (c, xOffset, yOffset, borderColors) {
    if (c === undefined) {
      alert("No C!");
    }
    var oneColor = false;
    if (borderColors != undefined && typeof borderColors == "string") {
      oneColor = true;
    }
    var i;
    for (i = 0; i < 6; i = i + 1) {
      c.beginPath();
      c.lineWidth = 1.4 * SCALE;
      c.lineJoin = "round";
      c.moveTo(
        (hexInnerPoints[i][0] + xOffset) * SCALE,
        (hexInnerPoints[i][1] + yOffset) * SCALE
      );
      c.lineTo(
        (hexInnerPoints[i + 1][0] + xOffset) * SCALE,
        (hexInnerPoints[i + 1][1] + yOffset) * SCALE
      );
      c.strokeStyle = oneColor ? borderColors : borderColors[i];
      c.closePath();
      c.stroke();
    }
  };

  this.columnRowToXY = function (column, row) {
    return [
      (column - 1) * TILE_WIDTH,
      (row - 1) * TILE_HEIGHT + (column % 2) * (TILE_HEIGHT / 2),
    ];
  };
  this.xyToColumnRow = function (x, y) {
    x = x / SCALE + TILE_WIDTH;
    y = y / SCALE + TILE_HEIGHT;
    var gX, gY, fX, fY, column, row;
    gX = Math.floor(x / TILE_WIDTH);
    gY = Math.floor(y / TILE_HEIGHT);
    fX = x / TILE_WIDTH - gX;
    fY = y / TILE_HEIGHT - gY;
    if ((Math.abs(gX) & 1) === 1) {
      if (fY > 0.5) {
        if (1.0 - fX * HEX_SLOPE < fY) {
          column = gX;
          row = gY;
        } else {
          column = gX - 1;
          row = gY;
        }
      } else {
        if (fX * HEX_SLOPE > fY) {
          column = gX;
          row = gY - 1;
        } else {
          column = gX - 1;
          row = gY;
        }
      }
    } else {
      if (fY > 0.5) {
        if (fY - 0.5 < fX * HEX_SLOPE) {
          column = gX;
          row = gY;
        } else {
          column = gX - 1;
          row = gY;
        }
      } else {
        if (fY - 0.5 > fX * HEX_SLOPE * -1) {
          column = gX;
          row = gY;
        } else {
          column = gX - 1;
          row = gY - 1;
        }
      }
    }
    return [column, row];
  };
})();
