// 1.引入模板
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const template = require('art-template');

// 2：创建服务器对象
let app = http.createServer()

// 3：启动服务器并监听端口
app.listen(3006, () => {
    console.log('server is running at http://127.0.0.1:3006')
})

// 4:注册事件，并监听
app.on('request', (req, res) => {
    // console.log('req.url:' + req.url)
    let urlObj = url.parse(req.url, true);
    console.log('urlObj:' + urlObj)
    let method = req.method;
    let pathname = urlObj.pathname;
    // console.log('pathname:' + pathname)
    if (method == 'GET' && (pathname == '/' || pathname == '/index' || pathname == '/index.html')) {
        fs.readFile(path.join(__dirname, './hero.json'), 'utf8', (err, data) => {
            if (err) return console.log(err.message);
            let herosArr = JSON.parse(data)
            let str = template(path.join(__dirname, './views/index.html'), {
                data: herosArr
            })
            res.end(str);
        })

    } else if (method == 'GET' && (pathname == 'add' || pathname == '/add.html')) {
        let str = template(path.join(__dirname, './views/add.html'), {})
        res.end(str);
    } else if (method == 'GET' && (pathname == 'edit' || pathname == '/edit.html')) {
        let str = template(path.join(__dirname, './views/edit.html'), {})
        res.end(str);
    } else if (method == 'GET' && (pathname == 'info' || pathname == '/info.html')) {
        let str = template(path.join(__dirname, './views/info.html'), {})
        res.end(str);
    } else if (method == 'GET' && pathname == '/node_modules/bootstrap/dist/css/bootstrap.css') {
        fs.readFile(path.join(__dirname, '/node_modules/bootstrap/dist/css/bootstrap.css'), (err, data) => {
            if (err) return console.log(err.message);
            // 为了浏览器端没有警告，需要添加一个响应头
            res.writeHeader(200, {
                'Content-Type': 'text/css;charset=utf-8'
            })
            res.end(data)
        })
    } else if (method == 'GET' && pathname == '/js/jquery-1.12.2.js') {
        fs.readFile(path.join(__dirname, './js/jquery-1.12.2.js'), (err, data) => {
            if (err) return console.log(err.message);
            res.end(data)
        })
    } else {
        res.end('404')
    }
})