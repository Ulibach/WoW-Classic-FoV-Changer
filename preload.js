const {
    contextBridge,
    ipcRenderer
} = require("electron");

contextBridge.exposeInMainWorld(
    "api", {
        send: (channel, data) => {
            let validChannels = ["revert", "write", "change_fov", "get_config"];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        receive: (channel, func) => {
            let validChannels = ["handle", "search"];
            if (validChannels.includes(channel)) {
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        }
    }
);

