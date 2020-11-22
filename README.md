# ae-code

An Adobe panel providing ~~the most advanced~~ a scripting environment for in-app code editing.

Yes, this is a rip off of [ovid](https://github.com/Inventsable/ovid-editor) by [Tom Scharstein](https://github.com/Inventsable) (even the above description mostly comes from his project 😬). I made this because I wanted to change the font size of the ovid-editor. And then I wanted to learn how it was made!

<sup>_This project was bootstrapped using another [Tom Scharstein](https://github.com/Inventsable) tool: [bombino](https://github.com/Inventsable/bombino)—check it out!_</sup>

## Features

- Run and edit code inside an Adobe host app
- Hinting and auto completion based on [types-for-adobe](https://github.com/pravdomil/types-for-adobe)
- Automatic ES6 compilation for any ECMA methods that Adobe CEP panels don't support

## Todos

- Continue to steal from [ovid](https://github.com/Inventsable/ovid-editor)...
- Support keyboard shortcuts that conflict with host apps (`Del`, `Cmd + /`, `Cmd + S`, etc...)
- I/O features (save, save as, open)
- Tabs
- User settings (any monaco editor options)
- Console panel
- Side panel file explorer?
- VS Code-like mini menu on bottom for resources?
