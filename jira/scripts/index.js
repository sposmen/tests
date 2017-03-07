/**
 * Created by SPOSMEN on 3/7/17.
 */

function d() {
    var text = getQueryVariable(
        urlParse(
            getQueryVariable(
                urlParse(document.querySelector('#url').value).query, 'fromURI')
        ).query, 'RelayState'
    );
    document.querySelector('#urlResult').innerHTML = text;
    window.getSelection().removeAllRanges();
    setTimeout(function() {
        var copyTextarea = document.querySelector('#urlResult');
        var range = document.createRange();
        range.selectNode(copyTextarea);
        window.getSelection().addRange(range);
        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            console.log('Copying text command was ' + msg);
        } catch (err) {
            console.log('Oops, unable to copy');
        }
        window.getSelection().removeAllRanges();
        document.querySelector('#url').value = '';
    }, 10);

    return text;
}

function urlParse(url){
    var parser = document.createElement('a');
    parser.href = url;
    parser.query = parser.search.substr(1);
    return parser;

}

function getQueryVariable(query, variable) {
    var query = query;
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
}

function q2j(){
    var text = document.querySelector('#queryString').value;
    try {
        document.querySelector('#q2jResult').innerHTML = JSON.stringify(queryStringToJson(text), null, '  ');
        hljs.initHighlighting.called = false;
        hljs.initHighlighting();
    } catch (e) {
        document.querySelector('#q2jResult').innerHTML = 'Couldn\'t get the url' ;
    }

}


function queryStringToJson(queryString) {
    if (queryString === '' && !(location && location.search)) return {};
    var key, value;
    var pairs = (queryString || location.search).slice(1).split('&');
    var result = {};
    for (var idx in pairs) {
        var pair = pairs[idx].split('=');
        if (!!pair[0] && (key = decodeURIComponent(pair[0]))) {
            value = decodeURIComponent(pair[1] || '');
            if (result.hasOwnProperty(key)) {
                if (typeof result[key] === 'string') {
                    result[key] = [result[key], decodeURIComponent(value || '')]
                } else result[key].push(decodeURIComponent(value || ''))

            } else result[key] = decodeURIComponent(value || '');
        }
    }
    return result;
}