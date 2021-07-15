# translatei18n

## 目的
1. 避免前端发送给产品需要翻译的文案时一个个文案地复制粘贴，产品给回翻译时又要一个个复制粘贴。
2. 规范各项目给产品的翻译excel


## 注意
1. 目前除英语、泰语、印尼语外，其他语言需要用到google翻译，所以需要翻墙
2. 目前只支持两级嵌套的多语言文件，适合目前绝大部分项目，如果是单级或者更多级，需要稍微改造下
3. 多语言需求已经准备在erp-web开发，本项目只是个临时工具
4. 因为本工具和erp之后的多语言工具都生成的结果都是json，建议各项目将多语言文件都改成json格式，本项目tool下提供了一个工具jsToJson可以使用，不过还是检查下生成的json有没有问题


## 使用步骤
1. 平时开发将需要的文案写在项目的en.js中

2. 一般在第一轮测试基本结束时，将需需要的翻译文案整理成excel给产品, 以免测试过程中又加了很多文案

3. 比较开发分支的en.js 和 master分支的en.js， 就可以整理出开发分支加了哪些文案需要翻译，将其保留层级复制到source.js中

4. 安装依赖: npm i

5. 在终端中设置google翻译项目key文件（注意修改文件路径）：
export GOOGLE_APPLICATION_CREDENTIALS="/Users/xiaowei/master/translatei18n/resource/translate-key.json"  
设置vpn翻墙代理端口（不同vpn不一样）：
export https_proxy=http://127.0.0.1:7890 http_proxy=http://127.0.0.1:7890 all_proxy=socks5://127.0.0.1:7890

6. 在同一个终端中运行node sourceToExcel.js， 会生成一个tanslate.xlsx, 将这个文件给产品，让产品补全文件中的泰语、印尼语两列再给我们

7. 将产品给回的excel替换掉tanslate.xlsx，然后运行 node excelToJson.js，生成的结果将会保存在result文件夹下

8. 将result下的各语言翻译一块块复制到项目中即可


