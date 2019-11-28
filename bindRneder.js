const path = require('path');
const template = require('art-template');

function bindRneder(req, res) {
    res.render = function (fileName, obj) {
        let str = template(path.join(__dirname, './views/' + fileName + '.html'), obj)
        this.end(str)
    }
}

module.exports = bindRneder