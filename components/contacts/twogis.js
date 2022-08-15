
const twogis = function() {
    function o(o) {
        var t = document.getElementById(o);
        t && (t.style.display = "none")
    }

    function t(o) {
        for (var t = document.querySelectorAll("." + o), i = 0; i < t.length; i++) t[i].style.display = "none"
    }

    function i(o, t) {
        var i = "https:" === window.location.protocol ? "https:" : "http:";
        return i + "//widgets.2gis.com/widget?type=" + o + "&options=" + encodeURIComponent(JSON.stringify(t))
    }

    function r(o) {
        if (!o.src) return "";
        var t = o.borderColor ? "1px solid " + o.borderColor : "none";
        return '<iframe frameborder="no" style="border: ' + t + '; box-sizing: border-box;" width="' + o.width + '" height="' + o.height + '" src="' + o.src + '"></iframe>'
    }
    window.DG = window.DG || {}, DG.Widget = DG.Widget || {}, DG.Widget.Components = DG.Widget.Components || {}, window.DGWidgetLoader = function(n) {
        t("dg-widget-link"), o("firmsonmap_biglink"), o("firmsonmap_biglink_photo"), o("firmsonmap_biglink_route"), n = n || {}, n.org = n.org || [], n.pos = n.pos || {}, n.opt = n.opt || {};
        var e = n.width || 900;
        e = e.toString(), "%" != e.slice(-1) && (e = parseInt(e, 10), e = Math.min(1200, e), e = Math.max(500, e));
        var d = n.height || 600;
        d = d.toString(), "%" != d.slice(-1) && (d = parseInt(d, 10), d = Math.min(1e3, d), d = Math.max(400, d));
        for (var s = n.borderColor || "#a3a3a3", a = "", g = 0; g < n.org.length; g++) n.org[g].id && (a += n.org[g].id + ",");
        a = a.slice(0, -1);
        var p = {
            pos: n.pos,
            opt: n.opt,
            org: a
        };
        var mapp = r({
            width: e,
            height: d,
            borderColor: s,
            src: i("firmsonmap", p)
        })
        document.getElementById('2gismap').insertAdjacentHTML( 'beforeend', mapp); 
    }, DG.Widget.Components.Loader = function(t) {
        o("2gis_mini_biglink");
        var n, e, d = 700,
            s = 400,
            a = t.resize;
        a ? (n = a.w ? parseInt(a.w, 10) : d, e = a.h ? parseInt(a.h, 10) : s) : (n = d, e = s) 
        var mapp = r({
            width: n,
            height: e,
            src: i("mini", t)
        })
        document.getElementById('2gismap').insertAdjacentHTML( 'beforeend', mapp);
        
    }
};

export default twogis;