# colors

Yet another minimal color library for javascript

## Why?

Because we can... and it's fun to learn doing something reusable.

## What can I find here?

For now, this repo only has code thrown into an editor. It needs to be polished, and also refactored.

## How to use it?

If regarding all the warnings about this experimental project you want to use it as is right now, you can use it as follows:

```javacript
var red = new color("#ff0000");
var lightRed = red.lighten(0.2);   // 20% lighter red
var lighterRed = red.lighten(0.7); // 70% lighter red
var lightestRed = red.lighten(1);  // 100% lighter red (i.e. white)
```

Pretty simple. But what if you want to apply those calculations for some useful end?

```javacript
document.body.backgroundColor = lightRed.css();
```

Done. Background color is 20% light red now. And [Vanilla JS&trade;](http://vanilla-js.com/) was all we needed.

## Roadmap

* Add darken feature
* Sort code
* Review DSL. Expect changes, then!

## Contributing

1. Fork it ( https://github.com/wecodeio/colors/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request