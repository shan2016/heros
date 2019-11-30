// 1:引入模块
const fs = require('fs')
const path = require('path')
const url = require('url')
const querystring = require('querystring')
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
        // res.render('edit', {})
        // res.render('info', {})
        let urlObj = url.parse(req.url, true)
        let id = urlObj.query.id;
        // console.log(id)
        modelData.getOneHeroInfo(id, (err, data) => {
            if (err) res.end('404');
            res.render('edit', data)
            // console.log(data)
        })
    },
    // 3.显示info页面
    showInfoPage(req, res) {
        // res.render('info', {})
        let urlObj = url.parse(req.url, true)
        let id = urlObj.query.id;
        modelData.getOneHeroInfo(id, (err, data) => {
            if (err) res.end('404');
            res.render('info', data)
        })

    },
    editHeroInfo(req, res) {
        let str = '';
        req.on('data', chunk => {
            str += chunk;
        })
        req.on('end', () => {
            let heroInfo = querystring.parse(str);
            // console.log(heroInfo);
            modelData.editHeroInfo(heroInfo, (result) => {
                res.writeHeader(200, {
                    'Content-Type': 'text/plain;charset=utf-8'
                })
                // return中断操作
                if (result) return res.end(JSON.stringify({
                    code: 200,
                    msg: '修改成功'
                }))
                res.end(JSON.stringify({
                    code: 201,
                    msg: '修改失败'
                }))
            })
        })

    },
    // 4.显示add页面
    showAddPage(req, res) {
        res.render('add', {})
    },
    //添加英雄数据
    addHeroInfo(req, res) {
        let str = '';
        req.on('data', chunk => {
            str += chunk;
        })
        req.on('end', () => {
            let heroInfo = querystring.parse(str);
            console.log(heroInfo);
            modelData.addHeroInfo(heroInfo, (result) => {
                res.writeHeader(200, {
                    'Content-Type': 'text/plain;charset=utf-8'
                })
                if (result) return res.end(JSON.stringify({
                    code: 200,
                    msg: '添加成功'
                }))
                res.end(JSON.stringify({
                    code: 201,
                    msg: '添加失败'
                }))
            })
        })
    },
    deleteHeroInfo(req, res) {
        let urlObj = url.parse(req.url, true)
        let deleteId = urlObj.query.id
        modelData.deleteHeroInfo(deleteId, (result) => {
            res.writeHeader(200, {
                'Content-Type': 'text/plain;charset=utf-8'
            })
            if (result) return res.end(JSON.stringify({
                code: 200,
                msg: '删除成功'
            }))
            res.end(JSON.stringify({
                code: 201,
                msg: '删除失败'
            }))
        })
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