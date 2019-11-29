// 1.引入模板
const http = require('http');
// const fs = require('fs');
// const path = require('path');
// const url = require('url');
// const template = require('art-template');

let bindRneder = require('./bindRneder.js');

let router = require('./router.js')

// 2：创建服务器对象
let app = http.createServer()

// 3：启动服务器并监听端口
app.listen(3006, () => {
    console.log('server is running at http://127.0.0.1:3006')
})

// 4:注册事件，并监听
app.on('request', (req, res) => {
    bindRneder(req, res);
    // console.log('req.url:' + req.url)
    router(req, res);
})