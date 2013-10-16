var connect = require('connect');
connect.createServer(
    connect.static("/home/hahue/git/hybridgame")
).listen(8080);