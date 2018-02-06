let cluster = require("cluster"),
    hashrate = {},
    totalhashs = {};

if (cluster.isMaster) {
    const cpus = require("os").cpus().length;

    for(var i = 0; i < cpus; i++) {
        let worker = cluster.fork();

        worker.on('message', function(msg) {
            //console.log('Master ' + process.pid + ' received message from worker ' + this.pid + '.', msg);
            hashrate[worker.process.pid] = msg.hashrate
            totalhashs[worker.process.pid] = msg.total;
        });
    }

    setInterval(function(){
        console.clear();

        var totalHashrate = 0,
            totalHashs = 0;

        for(let key in hashrate){
            totalHashrate += hashrate[key];
            totalHashs += totalhashs[key];
        }

        console.log("Hashrate: " + totalHashrate.toFixed(2) + "h/s\nTotal de hashs: " + totalHashs);
    }, 1000);
} else{
    require("./hashrate.js");
}
