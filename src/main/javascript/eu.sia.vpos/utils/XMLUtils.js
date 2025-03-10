const openTag = "<";
const closeTag = ">";
const closeSlash = "/";

function tagOpener(tagName) {
    return openTag + tagName.toString() + closeTag;
}

function tagCloser(tagName) {
    return openTag + closeSlash + tagName.toString() + closeTag;
}

function populateSingleXMLElement(tagName, value) {
    return tagOpener(tagName) + value + tagCloser(tagName);
}

let fromXMLDirty;
!function (r) {
    function t(r, t) {
        return a(n(r), t)
    }

    function n(r) {
        function t(r) {
            var t = r.length,
                f = r[0];
            if ("/" === f)
                for (var u = r.replace(/^\/|[\s\/].*$/g, "").toLowerCase(); c.length;) {
                    var a = l.n && l.n.toLowerCase();
                    if (l = c.pop(), a === u) break
                } else if ("?" === f) n({
                n: "?",
                r: r.substr(1, t - 2)
            });
            else if ("!" === f) "[CDATA[" === r.substr(1, 7) && "]]" === r.substr(-2) ? e(r.substr(8, t - 10)) : n({
                n: "!",
                r: r.substr(1)
            });
            else {
                var o = s(r);
                n(o), "/" === r[t - 1] ? o.c = 1 : (c.push(l), l = o)
            }
        }

        function n(r) {
            l.f.push(r)
        }

        function e(r) {
            r = f(r), r && n(u(r))
        }

        for (var a = String.prototype.split.call(r, /<([^!<>?](?:'[\S\s]*?'|"[\S\s]*?"|[^'"<>])*|!(?:--[\S\s]*?--|\[[^\[\]'"<>]+\[[\S\s]*?]]|DOCTYPE[^\[<>]*?\[[\S\s]*?]|(?:ENTITY[^"<>]*?"[\S\s]*?")?[\S\s]*?)|\?[\S\s]*?\?)>/), o = a.length, i = {
            f: []
        }, l = i, c = [], p = 0; p < o;) {
            var v = a[p++];
            v && e(v);
            var g = a[p++];
            g && t(g)
        }
        return i
    }

    function s(r) {
        var t = {
            f: []
        };
        r = r.replace(/\s*\/?$/, "");
        var n = r.search(/[\s='"\/]/);
        return n < 0 ? t.n = r : (t.n = r.substr(0, n), t.t = r.substr(n)), t
    }

    function e(r, t) {
        if (r.t) {
            for (var n, s, e = r.t.split(/([^\s='"]+(?:\s*=\s*(?:'[\S\s]*?'|"[\S\s]*?"|[^\s'"]*))?)/), a = e.length, i = 0; i < a; i++) {
                var c = f(e[i]);
                if (c) {
                    n || (n = {});
                    var p = c.indexOf("=");
                    if (p < 0) c = l + c, s = null;
                    else {
                        s = c.substr(p + 1).replace(/^\s+/, ""), c = l + c.substr(0, p).replace(/\s+$/, "");
                        var v = s[0],
                            g = s[s.length - 1];
                        v !== g || "'" !== v && '"' !== v || (s = s.substr(1, s.length - 2)), s = u(s)
                    }
                    t && (s = t(c, s)), o(n, c, s)
                }
            }
            return n
        }
    }

    function f(r) {
        return r && r.replace(/^\s+|\s+$/g, "")
    }

    function u(r) {
        return r.replace(/(&(?:lt|gt|amp|apos|quot|#(?:\d{1,6}|x[0-9a-fA-F]{1,5}));)/g, function (r) {
            if ("#" === r[1]) {
                var t = "x" === r[2] ? parseInt(r.substr(3), 16) : parseInt(r.substr(2), 10);
                if (t > -1) return String.fromCharCode(t)
            }
            return i[r] || r
        })
    }

    function a(r, t) {
        if ("string" == typeof r) return r;
        var n = r.r;
        if (n) return n;
        var s, f = e(r, t),
            u = r.f,
            i = u.length;
        if (f || i > 1) s = f || {}, u.forEach(function (r) {
            "string" == typeof r ? o(s, c, r) : o(s, r.n, a(r, t))
        });
        else if (i) {
            var l = u[0];
            if (s = a(l, t), l.n) {
                var p = {};
                p[l.n] = s, s = p
            }
        } else s = r.c ? null : "";
        return t && (s = t(r.n || "", s)), s
    }

    function o(r, t, n) {
        if ("undefined" != typeof n) {
            var s = r[t];
            s instanceof Array ? s.push(n) : t in r ? r[t] = [s, n] : r[t] = n
        }
    }

    var i = {
            "&amp;": "&",
            "&lt;": "<",
            "&gt;": ">",
            "&apos;": "'",
            "&quot;": '"'
        },
        l = "@",
        c = "#";
    r.fromXMLDirty = fromXMLDirty = t
}("object" == typeof exports && exports || {});


objectCleaner = (dirtyObject) => {
    if (dirtyObject !== null && typeof dirtyObject !== 'undefined')
        Object.keys(dirtyObject).forEach((key) => {
            if (typeof dirtyObject[key] === 'object' && dirtyObject[key] !== null) {
                objectCleaner(dirtyObject[key]);
            } else if (typeof dirtyObject[key] === 'string') {
                if (key === '!' || key === '?') {
                    delete dirtyObject[key];
                }
            }

        })

    return dirtyObject

}

fromXML = (xmlData) => {

    let dirtyObject = fromXMLDirty(xmlData).BPWXmlResponse ? fromXMLDirty(xmlData).BPWXmlResponse : fromXMLDirty(xmlData).BPWXmlRisposta;

    return objectCleaner(dirtyObject);


}

module.exports = {

    populateSingleXMLElement: populateSingleXMLElement,
    fromXML: fromXML

}




