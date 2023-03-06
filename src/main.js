var config = require('./config.js');
var utils = require('./utils.js');
var CryptoJS = require("crypto-js");
 
// 加密 
function btoa(str)  { return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(str)); }

// 解密 
function atob(str) { return CryptoJS.enc.Base64.parse(str).toString(CryptoJS.enc.Utf8); }


function supportLanguages() {
  return config.supportedLanguages.map(([standardLang]) => standardLang);
}

function translate(query, completion) {
  (async () => {
    const targetLanguage = utils.langMap.get(query.detectTo);
    const sourceLanguage = utils.langMap.get(query.detectFrom);
    if (!targetLanguage) {
      const err = new Error();
      Object.assign(err, {
        _type: 'unsupportLanguage',
        _message: '不支持该语种',
      });
      throw err;
    }
    const source_lang = sourceLanguage || 'cn';
    const target_lang = targetLanguage || 'en';
    const translate_text = query.text || '';
    let response;
    if (translate_text !== '') {

      // 获取登录令牌
      const loginUrl = 'http://track.hujiang.com/v4/track'
      // const url = 'http://res.d.hjfile.cn/v10/dict/translation/cn/en?content=hi';
      const url = 'http://res.d.hjfile.cn/v10/dict/translation/'+source_lang+'/'+target_lang;
      const loginHeaders = {
        'Accept': 'application/json, text/javascript, */*;',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Cache-Control': 'no-cache',
        'Content-Length': '1910',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Host': 'track.hujiang.com',
        'Origin': 'http://res.d.hjfile.cn',
        'Pragma': 'no-cache',
        'Proxy-Connection': 'keep-alive',
        'Referer': 'http://res.d.hjfile.cn/app/trans',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'
      }
      const translateHeaders = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        // 'Accept-Encoding': 'gzip, deflate',
        // 'Accept-Language': 'zh-CN,zh;q=0.9',
        // 'Cache-Control': 'no-cache',
        // 'Content-Length': '1910',
        'Host': 'res.d.hjfile.cn',
        'Origin': 'http://res.d.hjfile.cn',
        // 'Pragma': 'no-cache',
        // 'Proxy-Connection': 'keep-alive',
        'Referer': 'http://res.d.hjfile.cn/app/trans',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'
      }
      
      // const d = btoa(encodeURIComponent('{"hj_siteid":3,"hj_uid":"e2235725-ea43-9572-4cc8-998d7ed13e9b","hj_sid":"7636bbd9-294e-bf2d-5f29-6b800c77a6e9","hj_ssid":"d5d98b26-2a60-91d0-f37b-27b0ce05c2c0","hj_url":"http://res.d.hjfile.cn/app/trans","hj_urlref":"","hjid":0,"hj_p":"{\\"res\\":\\"1440*900\\",\\"wres\\":\\"291*796\\",\\"bdhm\\":null,\\"title\\":\\"%E5%85%A8%E6%96%87%E7%BF%BB%E8%AF%91_%E5%A4%9A%E8%AF%AD%E7%A7%8D%E5%9C%A8%E7%BA%BF%E7%BF%BB%E8%AF%91_%E6%B2%AA%E6%B1%9F%E5%B0%8FD\\"}","hj_vt":0,"hj_sst":1,"hj_csst":1,"hj_st":1,"hj_cst":0,"hj_ref":"","hj_sref":"","hj_fp":1370931257,"hj_v":"1.4.7","hj_ua":"mozilla/5.0 (macintosh; intel mac os x 10_15_7) applewebkit/537.36 (khtml, like gecko) chrome/109.0.0.0 safari/537.36","hj_t":1676825564724,"ch_source":"","hj_sr":"direct","hj_srp":"","hj_src":"","hj_srpt":"","hj_ssr":"direct","hj_ssrp":"","hj_ssrc":"","hj_ssrpt":"","hj_tm":"pc","_":"56496300e94da42f","is_sync":1}'))
      // TODO 尝试篡改id后,服务端并未报错,说明后端未校验,暂且先用着;后续研究id生成算法,自行生成id,而不应该写死
      const d = btoa(encodeURIComponent('{"hj_siteid":3,"hj_uid":"e2235234-ea43-9572-4cc8-998d7ed13e9b","hj_sid":"7666bbd9-294e-bf2d-5f29-6b800c77a6e9","hj_ssid":"d5d99b26-2a60-91d0-f37b-27b0ce05c2c0","hj_url":"http://res.d.hjfile.cn/app/trans","hj_urlref":"","hjid":0,"hj_p":"{\\"res\\":\\"1440*900\\",\\"wres\\":\\"291*796\\",\\"bdhm\\":null,\\"title\\":\\"%E5%85%A8%E6%96%87%E7%BF%BB%E8%AF%91_%E5%A4%9A%E8%AF%AD%E7%A7%8D%E5%9C%A8%E7%BA%BF%E7%BF%BB%E8%AF%91_%E6%B2%AA%E6%B1%9F%E5%B0%8FD\\"}","hj_vt":0,"hj_sst":1,"hj_csst":1,"hj_st":1,"hj_cst":0,"hj_ref":"","hj_sref":"","hj_fp":1370931257,"hj_v":"1.4.7","hj_ua":"mozilla/5.0 (macintosh; intel mac os x 10_15_7) applewebkit/537.36 (khtml, like gecko) chrome/109.0.0.0 safari/537.36","hj_t":1676825564724,"ch_source":"","hj_sr":"direct","hj_srp":"","hj_src":"","hj_srpt":"","hj_ssr":"direct","hj_ssrp":"","hj_ssrc":"","hj_ssrpt":"","hj_tm":"pc","_":"56496300e94da42f","is_sync":1}'))

      const loginFormData = {
        'd':d,
        't': Date.now()
      }
      try {
        const uid_resp = await $http.request({
          method: "POST",
          url: loginUrl,
          header: loginHeaders,
          body: loginFormData
        });
        if (uid_resp.data && uid_resp.data.HJ_UID) {
          translateHeaders.Cookie = 'HJ_UID='+uid_resp.data.HJ_UID+'; HJC_USRC=uzhi; HJC_NUID=1'
        } else {
          const errMsg = uid_resp.data ? JSON.stringify(uid_resp.data) : '获取UID未返回有效结果'
          completion({
            error: {
              type: 'unknown',
              message: errMsg,
              addtion: errMsg,
            },
          });
        }
        const resp = await $http.request({
          method: "POST",
          url: url,
          header: translateHeaders,
          body: {content:translate_text}
        });
        if (resp.data && resp.data.data && resp.data.data.content) {
          completion({
            result: {
              from: query.detectFrom,
              to: query.detectTo,
              toParagraphs: resp.data.data.content.split('\n'),
            },
          });
        } else {
          const errMsg = resp.data ? JSON.stringify(resp.data) : '请求翻译接口失败,请检查网络'
          completion({
            error: {
              type: 'unknown',
              message: errMsg,
              addtion: errMsg,
            },
          });
        }
      }
      catch (e) {
        $log.error('接口请求错误 ==> ' + JSON.stringify(e))
        Object.assign(e, {
          _type: 'network',
          _message: '接口请求错误 - ' + JSON.stringify(e),
        });
        throw e;
      }
    }
  })().catch((err) => {
    $log.error('***********解析返回值异常==>' + JSON.stringify(err))
    completion({
      error: {
        type: err._type || 'unknown',
        message: err._message || '未知错误',
        addtion: err._addtion,
      },
    });
  });
}

exports.supportLanguages = supportLanguages;
exports.translate = translate;
