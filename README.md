# bob-plugin-akl-baidu-free-translate
免费无限次使用百度翻译,根据网页版JavaScript加密算法开发的bobplugin;所以只要官网的算法不改,理论上就可以无限使用

bob插件主要为bob用户开发,bob是一款macOS上的翻译软件,bob官网地址:https://bobtranslate.com/

**下载地址:[百度翻译Bob插件(免秘钥)](https://github.com/akl7777777/bob-plugin-akl-baidu-free-translate/releases/download/v0.0.6/bob-plugin-akl-baidu-free-translate_v0.0.6.bobplugin)**


~~(发现一个问题,由于我调用的是沪江的服务,沪江在接口返回后如果超过200字符会自动阶段,导致译文不全,要寻找替代方案;如果不长的内容可以用,太长会被截断)~~

**200字截断的问题已解决,蒸鹅心啊...**

**应大家要求,写了一版不依赖Bob内置环境,基于nodejs环境的代码,可以直接终端输入node bd.js调用,需要的自行取用[bd.js](https://github.com/akl7777777/bob-plugin-akl-baidu-free-translate/blob/main/node_js/bd.js)**

简单描述一下代码逻辑(免得自己以后忘了):
第一次登录,获取cookie,然后马上刷页面,根据带上这个cookie重复请求上一个地址,然后会给你一个token还有一个gtk,最后你通过这个gtk和你要翻译的内容进行一系列复杂的加密算法,得到一个sign,然后把token,sign,cookie还有翻译内容都发给翻译服务,后台会校验你请求是否篡改

### 友情链接==>ChatGPT免费桌面版客户端(支持Windows,macOS)
下载地址:[OpenAI-ChatGPT免费桌面版客户端](https://github.com/akl7777777/free-chatgpt-client-pub)

### bob翻译插件大合集:

>[OpenAI ChatGPT(免秘钥)插件](https://github.com/akl7777777/bob-plugin-akl-chatgpt-free-translate)

>[DeepL翻译插件(免秘钥)](https://github.com/akl7777777/bob-plugin-akl-deepl-free-translate)

>[有道翻译插件(免秘钥)](https://github.com/akl7777777/bob-plugin-akl-youdao-free-translate)

>[CNKI学术翻译插件(免秘钥)](https://github.com/akl7777777/bob-plugin-akl-cnki-free-translate)

>[火山翻译插件(免秘钥)](https://github.com/akl7777777/bob-plugin-akl-volcengine-free-translate)

>[百度翻译插件(免秘钥)](https://github.com/akl7777777/bob-plugin-akl-baidu-free-translate)

>[腾讯翻译君插件(免秘钥)](https://github.com/akl7777777/bob-plugin-akl-tencent-free-translate)

>[腾讯交互翻译插件(免秘钥)](https://github.com/akl7777777/bob-plugin-akl-transmart-free-translate)

>[彩云小译插件(免秘钥)](https://github.com/akl7777777/bob-plugin-akl-caiyunxiaoyi-free-translate)

>[只为日语 - MOJi辞書（じしょ）](https://github.com/akl7777777/bob-plugin-akl-mojidict-translate)

>[Papago Naver 韩语翻译(免秘钥)](https://github.com/akl7777777/bob-plugin-akl-papago-free-translate)

>[Bob翻译剪切板图片的AlfredWorkflow](https://github.com/akl7777777/BobTranslateClipboard)

>[Bob的Postman接口调试插件](https://github.com/akl7777777/bob-plugin-akl-postman)



使用截图如下

<img width="573" alt="image" src="https://user-images.githubusercontent.com/84266551/220101173-82ae0736-7ca2-4a5e-96ab-de5adad66a40.png">


### 开发不易,如果喜欢可以请作者喝一杯可乐,谢谢!


![image](https://user-images.githubusercontent.com/84266551/219829283-3ed1798e-aeed-4174-bbcb-f93bf3008817.png)
