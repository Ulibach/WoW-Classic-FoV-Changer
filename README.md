### ✅ Works as of 2/5/2022 version 2.5.3.42083

# WoW-Classic-FoV-Changer
[<img src="https://github.com//Ulibach/WoW-Classic-FoV-Changer/blob/main/example.gif?raw=true">]

This is a TBC Classic WoW field of view changer. 
It works by changing the fov value in memory using memoryjs. It is a hack and might get you banned 💀 (but probably not).

# How to use
1. Download the latest build from the releases tab (or build it)
2. Open the .exe
3. Change fov
# How to update manually
The config file for the offsets is stored in `AppData\Roaming\wowclassicfovchanger\storage\config.json`. You can get offsets for your WoW build [here](https://www.ownedcore.com/forums/world-of-warcraft/world-of-warcraft-bots-programs/wow-memory-editing) or using this [dumper](https://github.com/Razzue/Wow-Dumper).
# How to build
1. run `yarn`
2. Build memoryjs with `nw-gyp clean configure build --arch=x64 --target=0.15.4`
3. Build the electron app with `yarn build`
