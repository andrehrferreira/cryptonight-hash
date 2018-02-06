const criptonight = require("./cryptonight.js");


criptonight.onRuntimeInitialized = function(){
    var heap = criptonight.HEAPU8.buffer;
    var input = new Uint8Array(heap, criptonight._malloc(84), 84);
    var output = new Uint8Array(heap, criptonight._malloc(32), 32);
    var hashs = 0;
    var stime = new Date().getTime() / 1000;

    function work(){
        var nonce = Math.random() * 4294967295 + 1 >>> 0;
        input[39] = (nonce & 4278190080) >> 24;
        input[40] = (nonce & 16711680) >> 16;
        input[41] = (nonce & 65280) >> 8;
        input[42] = (nonce & 255) >> 0;

        criptonight._cryptonight_hash(input.byteOffset, output.byteOffset, input.byteLength);

        //console.log(nonce, Buffer.from(output).toString('hex'));
        hashs++;
        var now = new Date().getTime();

        if(now % 1 == 0){
            now = now / 1000;

            if(typeof process.send == "function"){
                process.send({hashrate: (hashs / (now - stime) ), total: hashs, timestamp: (now - stime)});
            }
            else{
                console.clear();
                console.log("Hashrate: " + (hashs / (now - stime)) + "h/s\n" + "Total hashs: " + hashs + "\nTempo: " + (now - stime));
            }
        }

        work()
    }

    work();
}
