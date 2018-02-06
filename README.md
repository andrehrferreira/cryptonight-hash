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

## Build

```bash
emcc cryptonight.c crypto/*.c -O0 -s VERBOSE=1 -s WASM=1 -s BINARYEN=1 -s NO_EXIT_RUNTIME=0 -s ASSERTIONS=1 -s BINARYEN_METHOD="'native-wasm,asmjs'" -s "BINARYEN_TRAP_MODE='js'" -s EXPORTED_FUNCTIONS="['_cryptonight_hash']" -s 'EXTRA_EXPORTED_RUNTIME_METHODS=["ccall", "cwrap"]' -o cryptonight.js
```

Or

```bash
$ chmod +x ./build.sh
$ ./build.sh
```

## Fix to Nodejs

There is a relatively simple problem that makes the script not work correctly in Node.js, to correct just comment the line below in the file cryptonight.js, the files available in this repository are already fixed

```js
if (ENVIRONMENT_IS_NODE) {
  process['exit'](status);
}
```

To
```js
if (ENVIRONMENT_IS_NODE) {
  //process['exit'](status);
}
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
