function color(c){
  // Normalizes RGB
  var clr = String(c).replace(/[^0-9a-f]/gi, '').toLowerCase();
  if (clr.length < 6) {
    clr = clr[0]+clr[0]+clr[1]+clr[1]+clr[2]+clr[2];
  }

  var rgb = [
    parseInt(clr.substr(0,2), 16),
    parseInt(clr.substr(2,2), 16),
    parseInt(clr.substr(4,2), 16)
  ];

  var rgb2hsl = function() {
    // http://marcocorvi.altervista.org/games/imgpr/rgb-hsl.htm

    var red = rgb[0] / 255;
    var green = rgb[1] / 255;
    var blue = rgb[2] / 255;

    var min = Math.min(red, green, blue);
    var max = Math.max(red, green, blue);
    var delta = max - min;

    luminosity = (max + min) / 2;

    if (delta == 0) { // gray
       hue = 0;
       saturation = 0;
    } else {
      if (luminosity < 0.5) {
        saturation = delta / (max + min)
      } else {
        saturation = delta / (2 - max - min)
      }

      deltaRed = (((max - red) / 6) + (delta / 2)) / delta;
      deltaGreen = (((max - green) / 6) + (delta / 2)) / delta;
      deltaBlue = (((max - blue) / 6) + (delta / 2)) / delta;

      if (red == max) {
        hue = deltaBlue - deltaGreen;
      } else if (green == max) {
        hue = (1 / 3) + deltaRed - deltaBlue;
      } else if (blue == max) {
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
  };

  var hsl2rgb = function(_hsl) {
    // http://marcocorvi.altervista.org/games/imgpr/rgb-hsl.htm

    var hue = _hsl[0];
    var saturation = _hsl[1];
    var luminosity = _hsl[2];

    var red, green, blue;
    
    var temp1, temp2, tempr, tempg, tempb;

    if (saturation == 0) {
      red = luminosity;
      green = luminosity;
      blue = luminosity;
    } else {
      if (luminosity < 0.5) {
        temp2 = luminosity * ( 1 + saturation);
      } else {
        temp2 = luminosity + saturation - luminosity * saturation;
      }

      temp1 = 2 * luminosity - temp2;

      hue /= 360;

      tempr = hue + 1/3;
      if (tempr > 1) { tempr -= 1 }

      tempg = hue;

      tempb = hue - 1/3;
      if (tempb < 0) { tempb += 1 }

      // Next three blocks can be reduced into a for loop
      if (tempr < 1/6) {
        red = temp1 + (temp2-temp1)*6*tempr;
      } else if (tempr < 1/2) {
        red = temp2;
      } else if (tempr < 2/3) {
        red = temp1 + (temp2 - temp1) * (2/3 - tempr) * 6;
      } else {
        red = temp1;
      }

      if (tempg < 1/6) {
        green = temp1 + (temp2-temp1)*6*tempg;
      } else if (tempg < 1/2) {
        green = temp2;
      } else if (tempg < 2/3) {
        green = temp1 + (temp2 - temp1) * (2/3 - tempg) * 6;
      } else {
        green = temp1;
      }

      if (tempb < 1/6) {
        blue = temp1 + (temp2-temp1)*6*tempb;
      } else if (tempb < 1/2) {
        blue = temp2;
      } else if (tempb < 2/3) {
        blue = temp1 + (temp2 - temp1) * (2/3 - tempb) * 6;
      } else {
        blue = temp1;
      }
    }

    return [
      Math.round(red * 255),
      Math.round(green * 255),
      Math.round(blue * 255)
    ]

  }

  var hsl = rgb2hsl();

  this.rgb = function() {
    return rgb;
  }
  this.hexRgb = function() {
    return [
      ("0" + rgb[0].toString(16)).substr(-2),
      ("0" + rgb[1].toString(16)).substr(-2),
      ("0" + rgb[2].toString(16)).substr(-2)
    ]
  }
  this.hsl = function() {
    return hsl;
  }

  this.css = function() {
    return "#" + this.hexRgb().join('');
  }

  var clamp = function(number) {
    return Math.min(1, Math.max(0, number));
  }

  this.lighten = function(percentage) {
    var tmp = this.hsl();
    console.log(tmp);
    tmp[2] *= 1 + percentage;
    console.log(tmp);
    var rgb = hsl2rgb(tmp);
    var result = [
      ("0" + rgb[0].toString(16)).substr(-2),
      ("0" + rgb[1].toString(16)).substr(-2),
      ("0" + rgb[2].toString(16)).substr(-2)
    ];

    return new color("#" + result.join(''));
  }
}