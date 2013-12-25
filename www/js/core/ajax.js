(function () {
    'use strict';

    var entryMatches = location.search.match(/[?|&]entry=([^&]*)(&|$)/),
        entry = entryMatches ? entryMatches[1] : '';

    function ucParam(url) {
        url += (url.indexOf('?') >= 0 ? '&' : '?') +
            'entry=' + entry +
            '&uc_param_str=dnfrpfbivesscpgimibtbmntnisieijblauputog';
        return url;
    }

    function ajax(type, url, params, success, error) {
        var xhr = new XMLHttpRequest(),
            paramsArr = [],
            p;
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    if (success) {
                        // alert(url + ' === ' + xhr.responseText);
                        success(JSON.parse(xhr.responseText), xhr.responseText);
                    }
                }
                else if (error) {
                    error(xhr);
                }
            }
        };
        for (p in params) {
            if (params.hasOwnProperty(p)) {
                paramsArr.push(p + '=' + encodeURIComponent(params[p]));
            }
        }
        type = type.toUpperCase() === 'POST' ? 'POST' : 'GET';
        if (type === 'POST') {
            // alert('POST: ' + ucParam(url) + '|' + paramsArr.join('&'));
            xhr.open(type, ucParam(url), true);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.send(paramsArr.join('&'));
        }
        else {
            // alert('GET: ' + ucParam(url) + '&' + paramsArr.join('&'));
            xhr.open(type, ucParam(url) + '&' + paramsArr.join('&'), true);
            xhr.send();
        }
    }
    window.ajax = ajax;
})();