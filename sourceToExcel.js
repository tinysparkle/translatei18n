// 根据source.js, 将其转成excel给产品，让业务方提供翻译（目前'Chinese', 'Filipino', 'Malay', 'Vietnamese'四国语言通过google api翻译）

const xlsx = require('node-xlsx')
const fs = require('fs')
const originalEn = require('./source.js')
const translate = require('./translate.js') // google翻译工具， 需要设置google翻译的文件和翻墙

const sheet1 = [
    ['Label', 'English', 'Thai', 'Indonesian', 'Chinese', 'Filipino', 'Malay', 'Vietnamese']
]
const options = {'!cols': [{ wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }]}

let enList = []
Object.keys(originalEn).forEach(k1 => {
    Object.keys(originalEn[k1]).forEach(k2 => {
        enList.push(originalEn[k1][k2])
    })
})

Promise.all([translate(enList, 'zh'), translate(enList, 'tl'), translate(enList, 'ms'), translate(enList, 'vi')]).then(([zhList, fiList, myList, viList]) => { // 目前除了英语、泰语、印尼语是人工翻译，其他用google翻译
    let index = 0
    Object.keys(originalEn).forEach(k1 => {
        Object.keys(originalEn[k1]).forEach(k2 => {
            const label = k1 + '.' + k2
            sheet1.push([label, originalEn[k1][k2],,, zhList[index], fiList[index], myList[index], viList[index]])
            index++
        })
    })

    var buffer = xlsx.build([{name: "sheet1", data: sheet1, options}])
    fs.writeFile('translate.xlsx', buffer, err => {
        if (err) throw err
        console.log('translate.xlsx 已生成')
    })
})
