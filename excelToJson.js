// 将产品翻译后的excel转为json

const xlsx = require('node-xlsx')
const fs = require('fs')

const columnMap = {
    1: {
        obj: {},
        fileName: 'en.json'
    },
    2: {
        obj: {},
        fileName: 'th.json'
    },
    3: {
        obj: {},
        fileName: 'in.json'
    },
    4: {
        obj: {},
        fileName: 'zh.json'
    },
    5: {
        obj: {},
        fileName: 'ph.json'
    },
    6: {
        obj: {},
        fileName: 'my.json'
    },
    7: {
        obj: {},
        fileName: 'vi.json'
    }
}


const sheet = xlsx.parse('./tanslate.xlsx')[0].data
sheet.forEach((row, rowIndex) => {
    if (rowIndex > 0) {
        const path = row[0]
        if (path) {
            for(let i = 1; i < 8; i++) {
                setValueByPath(columnMap[i].obj, path, row[i] || '')
            }
        }
    }
})

Object.keys(columnMap).forEach(key => {
    fs.writeFile(`result/${columnMap[key].fileName}`, obj2JS(columnMap[key].obj), err => {
        if (err) throw err
        console.log(`result/${columnMap[key].fileName} 已生成`)
    })
})


function setValueByPath(obj, path, newVal) {
    if (!obj || typeof obj !== 'object' || !path) {
        return
    }
    let result = obj
    let arr = path.split('.')
    let len = arr.length - 1
    let i = 0
    for (; i < len; i++) {
        if (result[arr[i]] == null) {       // null和undefined避免停止循环，防止报错
            result[arr[i]] = {}
        }
        result = result[arr[i]]
    }
    if (i === len) {
        result[arr[i]] = newVal
    }
}

function obj2JS(obj) {
    return JSON.stringify(obj, null, 4)
}