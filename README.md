# ae-code

An Adobe panel providing ~~the most advanced~~ a scripting environment for in-app code editing.

This is a rip off of [ovid](https://github.com/Inventsable/ovid-editor) by [Tom Scharstein](https://github.com/Inventsable) (even the above description mostly comes from his project 😬). I made this because I wanted to change the font size of the ovid-editor. And then I wanted to learn how it was made! I also share Tom's motivation:

> The goal of this panel is to lessen the burden to entry for any one curious about scripting while also providing a sophisticated environment for any one experienced to sandbox snippets within, all with absolutely no setup required.

## Features

- Run and edit code inside an Adobe host app
- Hinting and auto completion based on [types-for-adobe](https://github.com/pravdomil/types-for-adobe)
- Automatic ES6 compilation for any ECMA methods that Adobe CEP panels don't support
- Tabs for editing multiple scripts

## Get started

This project was bootstrapped using another [Tom Scharstein](https://github.com/Inventsable) tool—[bombino](https://github.com/Inventsable/bombino) (check it out!)—which means you have two options:

### Install a ZXP

1. Download from [`/archive/ae-code[VERSION_NUMBER].zxp`](https://github.com/fartinmartin/ae-code/tree/master/archive)
2. Install with [ZXP Installer](https://aescripts.com/learn/zxp-installer/)

Alternatively, create your own ZXP:

1. `git clone https://github.com/fartinmartin/ae-code.git`
2. `cd ae-code && npm i`
3. Use bombino to [build, run, and sign](https://github.com/Inventsable/bombino-commands#usage)

   > <sup>Be sure to have [ZXPSignCmd](https://github.com/Adobe-CEP/CEP-Resources/tree/master/ZXPSignCmd) installed in the root folder's parent directory<br/>Those on macOS: choose `ZXPSignCmd-64bit` and rename it `ZXPSignCmd`</sup>

4. Install with [ZXP Installer](https://aescripts.com/learn/zxp-installer/)

   > <sup>⚠️ Heads up! For some reason (at least on macOS) installing a ZXP with ZXP Installer wipes out any non-Adobe made directory inside of `~/Library⁩/Application Support/Adobe/⁨CEP⁩/extensions`—be sure to have a backup!</sup>

### Serve a live version

1. `git clone https://github.com/fartinmartin/ae-code.git` in valid CEP folder:

   > <sup>Windows: `C:\Users\<USERNAME>\AppData\Roaming\CEP\extensions` <br/>macOS: `~/Library⁩/Application Support/Adobe/⁨CEP⁩/extensions`</sup>

2. `cd ae-code && npm i && npm run serve`
3. [Edit CXSX plist file](https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_10.x/Documentation/CEP%2010.0%20HTML%20Extension%20Cookbook.md#debugging-unsigned-extensions)
4. Open After Effects, navigate to `Window > Extensions > ae-code`

## Todos

- Continue to steal from [ovid](https://github.com/Inventsable/ovid-editor)...
- Support keyboard shortcuts that conflict with host apps (`Del`, `Cmd + /`, `Cmd + S`, etc...)
- I/O features (save, save as, open)
- Tabs
- User settings (any monaco editor options)
- Console panel
- Side panel file explorer?
- VS Code-like mini menu on bottom for resources?

## Tabs

- tabs are `vue-router` routes...
- navigated via the `<tab-bar />` component in the `Edit.vue` view
- for each route (AKA tab), a new Monaco Editor model instance is created via `monaco.editor.createModel(...)`—so any `addTab()` will have to handle this
- when switching tabs, `editorInstance.setModel(modelInstance)` will update a `<monaco-editor />` prop?
- will have to store models with tabs in vuex store?
