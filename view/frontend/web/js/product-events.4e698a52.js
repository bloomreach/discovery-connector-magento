parcelRequire = function (e, r, t, n) {
    var i, o = "function" == typeof parcelRequire && parcelRequire, u = "function" == typeof require && require;

    function f(t, n) {
        if (!r[t]) {
            if (!e[t]) {
                var i = "function" == typeof parcelRequire && parcelRequire;
                if (!n && i) return i(t, !0);
                if (o) return o(t, !0);
                if (u && "string" == typeof t) return u(t);
                var c = new Error("Cannot find module '" + t + "'");
                throw c.code = "MODULE_NOT_FOUND", c
            }
            p.resolve = function (r) {
                return e[t][1][r] || r
            }, p.cache = {};
            var l = r[t] = new f.Module(t);
            e[t][0].call(l.exports, p, l, l.exports, this)
        }
        return r[t].exports;

        function p(e) {
            return f(p.resolve(e))
        }
    }

    f.isParcelRequire = !0, f.Module = function (e) {
        this.id = e, this.bundle = f, this.exports = {}
    }, f.modules = e, f.cache = r, f.parent = o, f.register = function (r, t) {
        e[r] = [function (e, r) {
            r.exports = t
        }, {}]
    };
    for (var c = 0; c < t.length; c++) try {
        f(t[c])
    } catch (e) {
        i || (i = e)
    }
    if (t.length) {
        var l = f(t[t.length - 1]);
        "object" == typeof exports && "undefined" != typeof module ? module.exports = l : "function" == typeof define && define.amd ? define(function () {
            return l
        }) : n && (this[n] = l)
    }
    if (parcelRequire = f, i) throw i;
    return f
}({
    "1c8d": [function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {value: !0});

        class e {
            static load() {
                document.querySelectorAll("[data-blm-add-to-cart]").forEach(e => {
                    const {blmAddToCartSku: d, blmAddToCartProdId: o} = e.dataset;
                    e.addEventListener("click", () => {
                        window.BrTrk.getTracker().logEvent("cart", "click-add", {prod_id: o, sku: d})
                    })
                }), document.querySelectorAll("[data-blm-quickview]").forEach(e => {
                    const {blmQuickviewSku: d, blmQuickviewProdId: o, blmQuickviewProdName: t} = e.dataset;
                    e.addEventListener("click", () => {
                        window.BrTrk.getTracker().logEvent("product", "quickview", {prod_id: o, prod_name: t, sku: d})
                    })
                })
            }
        }

        window.BloomreachModules = Object.assign(Object.assign({}, window.BloomreachModules ? window.BloomreachModules : {}), {events: e}), e.load();
    }, {}]
}, {}, ["1c8d"], null)
//# sourceMappingURL=/product-events.4e698a52.js.map
