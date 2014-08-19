var color = (function (c) {
  var mod = {}
  // Normalizes RGB
  var clr = String(c).replace(/[^0-9a-f]/gi, '').toLowerCase();
  if (clr.length < 6) {
    clr = clr[0] + clr[0] + clr[1] + clr[1] + clr[2] + clr[2];
  }

  function rgb2hsl (rgb) {
    // http://marcocorvi.altervista.org/games/imgpr/rgb-hsl.htm

    var red = rgb[0] / 255;
    var green = rgb[1] / 255;
    var blue = rgb[2] / 255;

    var min = Math.min(red, green, blue);
    var max = Math.max(red, green, blue);
    var delta = max - min;

    var hue;
    var luminosity = (max + min) / 2;
    var saturation;

    if (delta === 0) { // gray
      hue = 0;
      saturation = 0;
    } else {
      if (luminosity < 0.5) {
        saturation = delta / (max + min);
      } else {
        saturation = delta / (2 - max - min);
      }

      var deltaRed, deltaGreen, deltaBlue;

      deltaRed = (((max - red) / 6) + (delta / 2)) / delta;
      deltaGreen = (((max - green) / 6) + (delta / 2)) / delta;
      deltaBlue = (((max - blue) / 6) + (delta / 2)) / delta;

      if (red === max) {
        hue = deltaBlue - deltaGreen;
      } else if (green === max) {
        hue = (1 / 3) + deltaRed - deltaBlue;
      } else if (blue === max) {
        hue = (2 / 3) + deltaGreen - deltaRed;
      }

      if (hue < 0) {
        hue += 1;
      }
      if (hue > 1) {
        hue -= 1;
      }
    }

    return [
      hue * 360,
      saturation,
      luminosity
    ];
  }

  function hsl2rgb(hsl) {
    // http://marcocorvi.altervista.org/games/imgpr/rgb-hsl.htm

    var hue = hsl[0];
    var saturation = hsl[1];
    var luminosity = hsl[2];

    var rgb = [0, 0, 0];

    var temp1, temp2, tempRgb = [0, 0, 0];

    if (saturation === 0) {
      rgb = [luminosity, luminosity, luminosity];

    } else {
      if (luminosity < 0.5) {
        temp2 = luminosity * (1 + saturation);
      } else {
        temp2 = luminosity + saturation - luminosity * saturation;
      }

      temp1 = 2 * luminosity - temp2;

      hue /= 360;

      tempRgb[0] = hue + 1 / 3;
      if (tempRgb[0] > 1) { tempRgb[0] -= 1; }

      tempRgb[1] = hue;

      tempRgb[2] = hue - 1 / 3;
      if (tempRgb[2] < 0) { tempRgb[2] += 1; }

      // Next three blocks can be reduced into a for loop
      for (var i = 0; i < tempRgb.length; i++) {
        if (tempRgb[i] < 1 / 6) {
          rgb[i] = temp1 + (temp2 - temp1) * 6 * tempRgb[i];
        } else if (tempRgb[i] < 1 / 2) {
          rgb[i] = temp2;
        } else if (tempRgb[i] < 2 / 3) {
          rgb[i] = temp1 + (temp2 - temp1) * (2 / 3 - tempRgb[i]) * 6;
        } else {
          rgb[i] = temp1;
        }
      }
    }

    return rgb.map(function(component){
      return Math.round(component * 255);
    });
  }

  var rgb = [
    parseInt(clr.substr(0, 2), 16),
    parseInt(clr.substr(2, 2), 16),
    parseInt(clr.substr(4, 2), 16)
  ];

  var hsl = rgb2hsl(rgb);

  mod.rgb = function() {
    return rgb;
  }

  mod.hsl = function() {
    return hsl;
  }

  function rgb2hex(rgb) {
    return rgb.map(function(component){
      return ("0" + component.toString(16)).substr(-2);
    });
  }

  mod.css = function () {
    return "#" + rgb2hex(this.rgb()).join('');
  }

  function clamp(value) {
    return Math.min(1, Math.max(0, value));
  }

  function changeLuminosity(_hsl, ratio) {
    hsl[2] = clamp(hsl[2] * (1 + ratio)); // changes luminosity
    return new color("#" + rgb2hex(hsl2rgb(hsl)).join('')); // TODO: enhance conversion
  }

  mod.lighten = function (ratio) {
    return changeLuminosity(this.hsl(), ratio);
  }

  mod.darken = function (ratio) {
    return changeLuminosity(this.hsl(), -ratio);
  }

  mod.complementary = function() {
    hsl = this.hsl();
    hsl[0] = (hsl[0] + 180) % 360;
    return new color("#" + rgb2hex(hsl2rgb(hsl)).join('')); // TODO: enhance conversion
  }

  return mod;
});