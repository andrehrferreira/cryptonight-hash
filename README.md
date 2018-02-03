# cryptonight-hash

JavaScript crytonight hash generation interface

[![npm package](https://nodei.co/npm/cryptonight-hash.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/cryptonight-hash/)

## Requeriment

To create the WASM file you will need Emscripten

```bash
git clone https://github.com/juj/emsdk.git
cd emsdk

# on Linux or Mac OS X
./emsdk install --build=Release sdk-incoming-64bit binaryen-master-64bit
./emsdk activate --global --build=Release sdk-incoming-64bit binaryen-master-64bit

# on Windows
emsdk install --build=Release sdk-incoming-64bit binaryen-master-64bit
emsdk activate --global --build=Release sdk-incoming-64bit binaryen-master-64bit
```

## Usage

The use is very simple, just follow the official guidelines in Cryptonote https://github.com/cryptonotefoundation/cryptonote

```js
const criptonight = require("cryptonight-hash");

criptonight.onRuntimeInitialized = function(){
    var heap = criptonight.HEAPU8.buffer;
    var input = new Uint8Array(heap, criptonight._malloc(84), 84);
    var output = new Uint8Array(heap, criptonight._malloc(32), 32);

    var nonce = Math.random() * 4294967295 + 1 >>> 0;
    input[39] = (nonce & 4278190080) >> 24;
    input[40] = (nonce & 16711680) >> 16;
    input[41] = (nonce & 65280) >> 8;
    input[42] = (nonce & 255) >> 0;

    criptonight._cryptonight_hash(input.byteOffset, output.byteOffset, input.byteLength);

    console.log("Cryptonight WASM: " + nonce + ": " + Buffer.from(output).toString('hex'));
}
```
