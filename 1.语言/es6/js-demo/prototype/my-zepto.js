(function (window) {

    const zepto = {}

    // 构造函数
    function Z(dom, selector='') {
        const len = dom ? dom.length : 0
        for (let i = 0; i < len; i++) {
            this[i] = dom[i]
        }

        this.length = len
        this.selector = selector
    }

    zepto.Z = function (dom, selector) {
        return new Z(dom, selector)
    }

    zepto.init = function (selector) {
        const slice = Array.prototype.slice
        const dom = slice.call(document.querySelectorAll(selector))
        return zepto.Z(dom, selector)
    }

    const $ = function (selector) {
        return zepto.init(selector)
    }
    window.$ = $

    $.fn = {
        css: function (key, value) {
            alert('css')
        },
        html: function (value) {
            return '这是一个模拟的 html 函数'
        }
    }
    // Z.prototype = $.fn
    // zepto prototype
    zepto.Z.prototype = Z.prototype = $.fn
})(window)
