// 1.引入依赖模块
const fs = require('fs')
const path = require('path')
// 引入时间模块
// const moment = require('moment')

// 2.设置读写数据的方法
// 3.暴露模块
module.exports = {
    getAllHeroData(callback) {
        fs.readFile(path.join(__dirname, './hero.json'), 'utf8', (err, data) => {
            if (err) return callback(err);
            // let herosArr = JSON.parse(data)
            // res.render('index', {
            //     data: herosArr
            // })
            callback(null, data)
        })
    }
}