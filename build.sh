emcc cryptonight.c crypto/*.c -O0 -s VERBOSE=1 -s WASM=1 -s NO_EXIT_RUNTIME=0 -s ASSERTIONS=1 -s EXPORTED_FUNCTIONS="['_cryptonight_hash']" -o cryptonight.js
