// 调用google api翻译
// 在终端执行(当前终端有效)： export GOOGLE_APPLICATION_CREDENTIALS="./resource/translate-key.json"

// 设置代理
const { google } = require("googleapis");
process.env.HTTPS_PROXY = 'http://127.0.0.1:7890'; // 需要当前中断设置代理(不同vpn不一样)： export https_proxy=http://127.0.0.1:7890 http_proxy=http://127.0.0.1:7890 all_proxy=socks5://127.0.0.1:7890
google.options({ proxy: 'http://127.0.0.1:7890' });

/**
 * TODO(developer): Uncomment the following line before running the sample.
 */
const projectId = 'peerless-column-221708';
// Imports the Google Cloud client library
const {Translate} = require('@google-cloud/translate').v2;

// Instantiates a client
const translate = new Translate({projectId});

/**
 * 翻译
 * @param {*} textList  要翻译的字符串或字符串数组
 * @param {*} target 要翻译成的目标语种
 * @returns 
 */
async function doTranslate(textList, target) {
    let result = []
    let start = 0
    let end = 120 // 接口每次翻译有条数限制
    while(textList.length > start) {
        const list = textList.slice(start, end)
        const [translation] = await translate.translate(list, target)
        result = result.concat(translation)
        start += 120
        end += 120
    }
    return result;
}
module.exports = doTranslate