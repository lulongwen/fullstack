(function (window) {

    const jQuery = function (selector) {
        return new jQuery.fn.init(selector)
    }

    jQuery.fn = {
        css: function (key, value) {
            alert('css')
        },
        html: function (value) {
            return 'html'
        }
    }

    const init = jQuery.fn.init = function (selector='') {
        const slice = Array.prototype.slice
        const dom = slice.call(document.querySelectorAll(selector))

        const len = dom ? dom.length : 0
        for (let i = 0; i < len; i++) {
            this[i] = dom[i]
        }
        this.length = len
        this.selector = selector
    }

    init.prototype = jQuery.fn

    window.$ = jQuery

})(window)
