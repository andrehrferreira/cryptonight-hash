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
    -s EXPORTED_FUNCTIONS="['_analyzer_hash']" \
    -o ./cryptonight.js
