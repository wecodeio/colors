describe("When color created", function(){
  it("formats in RGB", function(){
    expect(color("#ff0000").rgb()).toEqual([255, 0, 0]);
  });
  it("formats in HSL", function(){
    expect(color("#ff0000").hsl()).toEqual([0, 1, 0.5]);
  });
  it("formats in css", function(){
    expect(color("#ff0000").css()).toEqual("#ff0000");
  });
});

describe("When color is lighten", function(){
  it("by zero remains equal", function(){
    expect(color("#ff0000").lighten(0).css()).toEqual("#ff0000");
  });
  it("by ten percent", function(){
    expect(color("#ff0000").lighten(.1).css()).toEqual("#ff1a1a");
  });
  it("by fifty percent", function(){
    expect(color("#ff0000").lighten(.5).css()).toEqual("#ff8080");
  });
  it("by ninety percent", function(){
    expect(color("#ff0000").lighten(.9).css()).toEqual("#ffe5e5");
  });
  it("by hundred percent", function(){
    expect(color("#ff0000").lighten(1).css()).toEqual("#ffffff");
  });
});

describe("When color is darken", function(){
  it("by zero remains equal", function(){
    expect(color("#ff0000").darken(0).css()).toEqual("#ff0000");
  });
  it("by ten percent", function(){
    expect(color("#ff0000").darken(.1).css()).toEqual("#e60000");
  });
  it("by fifty percent", function(){
    expect(color("#ff0000").darken(.5).css()).toEqual("#800000");
  });
  it("by ninety percent", function(){
    expect(color("#ff0000").darken(.9).css()).toEqual("#190000");
  });
  it("by hundred percent", function(){
    expect(color("#ff0000").darken(1).css()).toEqual("#000000");
  });
});