# ae-code

An Adobe panel providing ~~the most advanced~~ a scripting environment for in-app code editing.

Yes, this is a rip off of [ovid](https://github.com/Inventsable/ovid-editor) by [Tom Scharstein](https://github.com/Inventsable) (even the above description mostly comes from his project 😬). I made this because I wanted to change the font size of the ovid-editor. And then I wanted to learn how it was made!

## Features

- Run and edit code inside an Adobe host app (only tested in After Effects so far...)
- Hinting and auto completion based on [types-for-adobe](https://github.com/pravdomil/types-for-adobe)
- Automatic ES6 compilation for any ECMA methods that Adobe CEP panels don't support

## Get started

This project was bootstrapped using another [Tom Scharstein](https://github.com/Inventsable) tool—[bombino](https://github.com/Inventsable/bombino) (check it out!)—which means you have two options:

### Install a ZXP

1. Download from [`/archive/ae-code[VERSION_NUMBER].zxp`](https://github.com/fartinmartin/ae-code/tree/master/archive)
2. Install with [ZXP Installer](https://aescripts.com/learn/zxp-installer/)

Alternatively, create your own ZXP:

1. `git clone https://github.com/fartinmartin/ae-code.git`
2. `cd ae-code && npm i`
3. Use bombino to [build, run, and sign](https://github.com/Inventsable/bombino-commands#usage)

    > <sup>Be sure to have [ZXPSignCmd](https://github.com/Adobe-CEP/CEP-Resources/tree/master/ZXPSignCmd) installed in the root folder's parent directory. Those on macOS: choose `ZXPSignCmd-64bit` and rename it `ZXPSignCmd`.</sup>

4. Install with [ZXP Installer](https://aescripts.com/learn/zxp-installer/)

### Serve a live version

1. `git clone https://github.com/fartinmartin/ae-code.git` in valid CEP folder:

    > <sup>Windows: `C:\Users\<USERNAME>\AppData\Roaming\CEP\extensions` • macOS: `~/Library⁩/Application Support/Adobe/⁨CEP⁩/extensions`</sup>

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
