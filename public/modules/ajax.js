/**
 * Методы HTTP-запросов, поддерживаемые объектом Ajax.
 * @enum {string}
 */
(function() {
    const AJAX_METHODS = {
        GET: 'GET',
        POST: 'POST',
    };

    const noop = () => {};

    class Ajax {
        get({url, callback}) {
            this._ajax({
                method: AJAX_METHODS.GET,
                url,
                callback
            })
        }

        post({url, body, callback}) {
            this._ajax({
                method: AJAX_METHODS.POST,
                url,
                body,
                callback
            })
        }

        _ajax({method, url, body = null, callback = noop}) {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url, true);
            xhr.withCredentials = true;

            xhr.addEventListener('readystatechange', function () {
                if (xhr.readyState !== XMLHttpRequest.DONE) return;

                callback(xhr.status, xhr.responseText);
            });

            if (body) {
                xhr.setRequestHeader('Content-type', 'application/json; charset=utf8');
                xhr.send(JSON.stringify(body));
                return;
            }

            xhr.send();
        }
    }

    window.Ajax = new Ajax();
})()
