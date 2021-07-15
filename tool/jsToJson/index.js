// 根据lang文件夹下的的js语言文件生成同名json文件

const fs = require('fs')
const jsDir = './lang'

let files = fs.readdirSync(jsDir);

files.forEach(file => {
    if (file.endsWith('.js')) {
        const obj = require(jsDir + '/' + file);
        const fileName = file.replace('.js', '.json')
        fs.writeFile(`lang/${fileName}`, obj2JS(obj), err => {
            if (err) throw err
            console.log(`lang/${fileName} 已生成`)
        })
    }
})

function obj2JS(obj) {
    return JSON.stringify(obj, null, 4)
}