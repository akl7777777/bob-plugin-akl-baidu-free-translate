var config = require('./config.js');
var utils = require('./utils.js');
var bb = require('./b')
var dd = require('./d')


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
        if (translate_text !== '') {
            const serv = $option.service;
            if (serv === 'b') {
                await bb.translate(query, source_lang, target_lang, translate_text, completion)
            } else {
                await dd.translate(query, source_lang, target_lang, translate_text, completion)
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
