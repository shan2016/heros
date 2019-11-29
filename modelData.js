// 1.引入依赖模块
const fs = require('fs')
const path = require('path')
// 引入时间模块
const moment = require('moment')

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
    },
    getOneHeroInfo(id, callback) {
        this.getAllHeroData((err, data) => {
            if (err) return callback(err)
            let heroInfo = JSON.parse(data)
            let obj;
            heroInfo.some(item => {
                if (id == item.id) {
                    obj = item;
                }
            })
            callback(null, obj);
        })
    },
    addHeroInfo(heroInfo, callback) {
        this.getAllHeroData((err, data) => {
            if (err) return callback(err)
            let herosArr = JSON.parse(data)
            heroInfo.id = +herosArr[herosArr.length - 1].id + 1;
            // console.log(heroInfo.id)
            heroInfo.date = moment().format('YYYY-MM-DD HH:mm:ss')
            herosArr.push(heroInfo)
            // console.log(herosArr);
            fs.writeFile(path.join(__dirname, './hero.json'), JSON.stringify(herosArr), err => {
                if (err) return callback(false)
                callback(true)
            })
        })
    }
}