const width = 100;
const height = 100;
const doc = app.documents.add(null, width, height);
const p = doc.pathItems;

for (const y = 0; y < height; y += 10) {
  for (const x = 0; x < width; x += width / 3) {
    const s = p.rectangle(width - y, x, width / 3, 10);
    if (x == 0) {
      s.fillColor = makeColor(y, 100 - y, 100, 0);
    } else if (x == width / 3) {
      s.fillColor = makeColor(0, y, 100 - y, y);
    } else {
      s.fillColor = makeColor(100 - y, y, 0, 0);
    }
    s.stroked = false;
  }
}

/*
    necessary since CMYKColor class has no constructor.
*/
function makeColor(c, m, y, k) {
  const ink = new CMYKColor();
  ink.cyan = c;
  ink.magenta = m;
  ink.yellow = y;
  ink.black = k;
  return ink;
}
