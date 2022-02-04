const memoryjs = require('memoryjs');

const prc = memoryjs.openProcess("WowClassic.exe")

const p1 = memoryjs.readMemory(prc.handle,prc.modBaseAddr + 0x32B9548, memoryjs.PTR);
const p2 = memoryjs.readMemory(prc.handle, p1 + 0x38E0, memoryjs.PTR)
const memory = memoryjs.readMemory(prc.handle, p2 + 0x40, 'float') 
console.log(memory)
memoryjs.writeMemory(prc.handle, p2 + 0x40, 2.1, "float")