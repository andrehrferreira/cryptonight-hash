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
#!/bin/bash

emcc cryptonight.c crypto/*.c -O0 \
    -s DISABLE_EXCEPTION_CATCHING=1 \
    -s BINARYEN_ASYNC_COMPILATION=1 \
    -s ALIASING_FUNCTION_POINTERS=0 \
    -s ALLOW_MEMORY_GROWTH=1 \
    -s VERBOSE=1 \
    -s WASM=1 \
    -s BINARYEN=1 \
    -s NO_EXIT_RUNTIME=1 \
    -s ASSERTIONS=1 \
    -s SAFE_HEAP=0 \
    -s STACK_OVERFLOW_CHECK=0 \
    -s BINARYEN_METHOD="'native-wasm'" \
    -s BINARYEN_TRAP_MODE="'js'" \
    -s EXPORTED_FUNCTIONS="['_cryptonight_hash']" \
    -o ./cryptonight.js
```

Or

```bash
$ sudo chmod +x ./build.sh
$ ./build.sh
```

## Usage

The use is very simple, just follow the official guidelines in Cryptonote https://github.com/cryptonotefoundation/cryptonote

```js
const criptonight = require("cryptonight-hash");

var heap = criptonight.HEAPU8.buffer;
var input = new Uint8Array(heap, criptonight._malloc(84), 84);
var output = new Uint8Array(heap, criptonight._malloc(32), 32);

var nonce = Math.random() * 4294967295 + 1 >>> 0;
input[39] = (nonce & 4278190080) >> 24;
input[40] = (nonce & 16711680) >> 16;
input[41] = (nonce & 65280) >> 8;
input[42] = (nonce & 255) >> 0;

criptonight.ccall("cryptonight_hash", "string", [], [input.byteOffset, output.byteOffset, input.byteLength]);
console.log("Cryptonight: " + nonce + ": " + Buffer.from(output).toString('hex'));
```

## Donate

XMR wallet: 47TVQKg7VJCN6VVwwkfkPh8WWdpQK6T4c2iW9dAWFiyTjYkEFnatGt8bhbkPcAdRUhBGRtT1cASQiiAoZzbGx6t8UxW2hzP
