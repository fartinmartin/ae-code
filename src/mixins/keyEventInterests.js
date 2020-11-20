const os = require("os");

// TODO: block native keyboard events that conflict with the monaco actions/commands keybindings
// https://github.com/Adobe-CEP/CEP-Resources/issues/238
// TBD actions include: format, options/settings, save, save-as, open file, close file, run code, run selected code, newfile, reload

export const keyEventInterests = {
  mounted() {
    // keys are hexadecimal? (but JSON.stringify will handle it) https://www.hexadecimaldictionary.com/hexadecimal/0x75/

    const windowsKeys = [
      // https://docs.microsoft.com/en-us/windows/win32/inputdev/virtual-key-codes?redirectedfrom=MSDN
      { keyCode: 46 }, // or VK_DELETE (Windows DEL key)
    ];

    const macOSKeys = [
      // https://eastmanreference.com/complete-list-of-applescript-key-codes OR Library/Developer/CommandLineTools/SDKs/MacOSX.sdk/System/Library/Frameworks/Carbon.framework/Versions/A/Frameworks/HIToolbox.framework/Versions/A/Headers/Events.h
      { keyCode: 117 }, // (macOS kVK_ForwardDelete key)
    ];

    const isMac = os.platform() === "darwin";
    const data = JSON.stringify(isMac ? macOSKeys : windowsKeys);

    this.$cep.registerKeyEventsInterest(data);
  },
};
