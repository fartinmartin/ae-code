// make a "Comps" folder
// const compFolder = app.project.items.addFolder("Comps"); 👈 the simple way
let compFolder;

for (let i = 1; i < app.project.numItems; i++) {
  if (
    app.project.item(i) instanceof FolderItem &&
    app.project.item(i).name === "Comps"
  ) {
    compFolder = app.project.item(i);
    break;
  }
}

if (app.project.numItems === 0 || !compFolder) {
  compFolder = app.project.items.addFolder("Comps");
}

// make a "Hello World!" comp
const comp = app.project.items.addComp(
  "Hello World!", // name
  1080, // width
  1080, // height
  1.0, // pixelAspect
  5.0, // duration
  24.0 // frameRate
);

comp.parentFolder = compFolder; // move the "Hello World!" comp to "Comps" folder
comp.openInViewer(); // open the "Hello World!" comp

// add a "Background" solid layer to the "Hello World!" comp
const solidLayer = comp.layers.addSolid(
  [0.2, 0.2, 0.5], // color
  "Background", // name
  comp.width, // reference comp for the rest
  comp.height,
  comp.pixelAspect,
  comp.duration
);
solidLayer.label = 5;
solidLayer.locked = true;

// add a "Hello World!" text layer to the "Hello World!" comp
const textLayer = comp.layers.addText("Hello World!");
textLayer.label = 9;
textLayer.blendingMode = BlendingMode.DIFFERENCE;

// hot tip: text layer properties are defined via a TextDocument object
// https://ae-scripting.docsforadobe.dev/other/textdocument/
const textSource = textLayer.property("Source Text");
const textDocument = textSource.value;

textDocument.resetCharStyle();
textDocument.font = "Monaco";
textDocument.fontSize = 100;
textDocument.fillColor = [1.0, 1.0, 1.0];
textDocument.applyFill = true;
textDocument.justification = ParagraphJustification.CENTER_JUSTIFY;

textSource.setValue(textDocument);

// add an effect via an AVLayer Match Name (?)
// https://ae-scripting.docsforadobe.dev/matchnames/layer/avlayer/
textLayer.property("ADBE Effect Parade").addProperty("Fill");

// TODO: https://ae-scripting.docsforadobe.dev/matchnames/layer/textlayer/

// center the "Hello World!" text layer's anchor point
const textLayerHeight = textLayer.sourceRectAtTime(0, true).height;
textLayer.property("Anchor Point").setValue([0.0, textLayerHeight / -2, 0.0]);

alert("🎉 Yay! You've done it!");
