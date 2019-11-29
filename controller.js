// 1:引入模块
const fs = require('fs')
const path = require('path')
const url = require('url')
let bindRneder = require('./bindRneder.js');
let modelData = require('./modelData.js')

// 2：业务处理方法
// let controller ={

// }
module.exports = {
    // 原始写法
    // showIndexPage: function () {

    // },
    // // es6新写法
    // showIndexPage(){

    // }
    // 1.显示index页面
    showIndexPage(req, res) {
        fs.readFile(path.join(__dirname, './views/index.html'), 'utf8', (err, data) => {
            modelData.getAllHeroData((err, data) => {
                if (err) res.end('404')
                let herosArr = JSON.parse(data)
                let obj = {
                    data: herosArr
                }
                res.render('index', obj)
            })
        })
    },

    // 2.显示编辑页面
    showEditPage(req, res) {
        res.render('edit', {})
    },
    // 3.显示info页面
    showInfoPage(req, res) {
        res.render('info', {})
    },
    // 4.显示add页面
    showAddPage(req, res) {
        res.render('add', {})
    },
    loadStaticSource(req, res) {
        fs.readFile(path.join(__dirname, res.pathname), (err, data) => {
            if (err) return console.log(err.message);
            // 为了浏览器端没有警告，需要添加一个响应头
            if (res.pathname.endsWith('.css')) {
                res.writeHeader(200, {
                    'Content-Type': 'text/css;charset=utf-8'
                })
            }
            res.end(data)
        })
    }
}
// 3：暴露方法
// module.exports=controller