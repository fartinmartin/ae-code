const colors = {
  tabText: "#848484",
  tabTextActive: "#ffffff",
  tabTextHover: "#848484",

  tabBackground: "#1e1e1e",
  tabBackgroundActive: "#1e1e1e",
  tabBackgroundHover: "#1e1e1e",

  tabBorder: "#242424",
  tabBorderActive: "#569cd6",
  tabBorderHover: "#242424",

  tabBarBackground: "#1e1e1e",
  tabBarBorder: "#242424",

  statusBarBackground: "#1e1e1e",
};

export const defaults = {
  colors,
  automaticLayout: true, // this is how monaco handles responsiveness/resizing
  scrollBeyondLastLine: false,
  lineNumbersMinChars: 4,
  autoIndent: true,
  formatOnPaste: true,
  formatOnType: true,
};

export const userDefaults = {
  "___⚠️ settings.json___": [
    "Hello! Welcome to ae-code. This is the settings.json",
    "file where you can tweak (mostly visual) options by",
    "adding/removing key-vaule pairs to this object.",
    "",
    "For a full list of options, check out the README.md:",
    "https://github.com/fartinmartin/ae-code#settings.json",
  ],

  fontSize: "16px",
  tabSize: 2,
  theme: "vs-dark",
  minimap: {
    enabled: false,
  },

  colors,
};
