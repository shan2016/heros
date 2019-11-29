// 1：引入依赖模块
const fs = require('fs');
const path = require('path');
const url = require('url');
let bindRneder = require('./bindRneder.js');

let controller = require('./controller.js');


// 2：路由分发设置
function router(req, res) {
    let urlObj = url.parse(req.url, true);
    console.log('urlObj:' + urlObj)
    let method = req.method;
    let pathname = urlObj.pathname;
    res.pathname = pathname;
    // console.log('pathname:' + pathname)
    if (method == 'GET' && (pathname == '/' || pathname == '/index' || pathname == '/index.html')) {
        controller.showIndexPage(req, res);

    } else if (method == 'GET' && (pathname == '/add' || pathname == '/add.html')) {
        controller.showAddPage(req, res)
    } else if (method == 'GET' && (pathname == '/edit' || pathname == '/edit.html')) {
        controller.showEditPage(req, res);
    } else if (method == 'GET' && (pathname == '/info' || pathname == '/info.html')) {
        controller.showInfoPage(req, res)
    } else if (method == 'GET' && pathname.startsWith('/node_modules')) {
        controller.loadStaticSource(req, res)
    } else if (method == 'GET' && pathname == '/js/jquery-1.12.2.js') {
        fs.readFile(path.join(__dirname, './js/jquery-1.12.2.js'), (err, data) => {
            if (err) return console.log(err.message);
            res.end(data)
        })
    } else {
        let obj = {
            code: 404,
            msg: '页面不存在哦'
        }
        res.end(JSON.stringify(obj));
    }
}


// 3：将方法暴露
module.exports = router;