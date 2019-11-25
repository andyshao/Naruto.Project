"use strict";

var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
    return typeof e;
} : function (e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

!function () {
    var e = window.layui && layui.define, t = {
        getPath: function () {
            var e = document.currentScript ? document.currentScript.src : function () {
                for (var e, t = document.scripts, n = t.length - 1, a = n; a > 0; a--) if ("interactive" === t[a].readyState) {
                    e = t[a].src;
                    break;
                }
                return e || t[n].src;
            }();
            return e.substring(0, e.lastIndexOf("/") + 1);
        }(),
        getStyle: function (e, t) {
            var n = e.currentStyle ? e.currentStyle : window.getComputedStyle(e, null);
            return n[n.getPropertyValue ? "getPropertyValue" : "getAttribute"](t);
        },
        link: function (e, a, i) {
            if (n.path) {
                var r = document.getElementsByTagName("head")[0], o = document.createElement("link");
                "string" == typeof a && (i = a);
                var s = (i || e).replace(/\.|\//g, ""), l = "layuicss-" + s, d = 0;
                o.rel = "stylesheet", o.href = n.path + e, o.id = l, document.getElementById(l) || r.appendChild(o),
                    "function" == typeof a && function e() {
                        return ++d > 80 ? window.console && console.error("laydate.css: Invalid") : void (1989 === parseInt(t.getStyle(document.getElementById(l), "width")) ? a() : setTimeout(e, 100));
                    }();
            }
        }
    }, n = {
        v: "5.0.9",
        config: {},
        index: window.laydate && window.laydate.v ? 1e5 : 0,
        path: t.getPath,
        set: function (e) {
            var t = this;
            return t.config = p.extend({}, t.config, e), t;
        },
        ready: function (a) {
            var i = "laydate", r ="laydate.css?v=" + n.v;
            return e ? layui.addcss(r, a, i) : t.link(r, a, i), this;
        }
    }, a = function () {
        var e = this;
        return {
            hint: function (t) {
                e.hint.call(e, t);
            },
            config: e.config
        };
    }, i = "layui-this", r = "laydate-disabled", o = "开始日期超出了结束日期<br>建议重新选择", s = [100, 2e5], l = "layui-laydate-static", d = "layui-laydate-list", c = "laydate-selected", m = "layui-laydate-hint", u = ".laydate-btns-confirm", y = "laydate-time-text", h = ".laydate-btns-time", f = function (e) {
        var t = this;
        t.index = ++n.index, t.config = p.extend({}, t.config, n.config, e), n.ready(function () {
            t.init();
        });
    }, p = function (e) {
        return new g(e);
    }, g = function (e) {
        for (var t = 0, n = "object" == (void 0 === e ? "undefined" : _typeof(e)) ? [e] : (this.selector = e,
            document.querySelectorAll(e || null)); t < n.length; t++) this.push(n[t]);
    };
    g.prototype = [], g.prototype.constructor = g, p.extend = function () {
        var e = 1, t = arguments;
        for (t[0] = "object" == _typeof(t[0]) ? t[0] : {}; e < t.length; e++) "object" == _typeof(t[e]) && function e(t, n) {
            t = t || (n.constructor === Array ? [] : {});
            for (var a in n) t[a] = n[a] && n[a].constructor === Object ? e(t[a], n[a]) : n[a];
            return t;
        }(t[0], t[e]);
        return t[0];
    }, p.ie = function () {
        var e = navigator.userAgent.toLowerCase();
        return !!(window.ActiveXObject || "ActiveXObject" in window) && ((e.match(/msie\s(\d+)/) || [])[1] || "11");
    }(), p.stope = function (e) {
        e = e || window.event, e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0;
    }, p.each = function (e, t) {
        var n, a = this;
        if ("function" != typeof t) return a;
        if (e = e || [], e.constructor === Object) {
            for (n in e) if (t.call(e[n], n, e[n])) break;
        } else for (n = 0; n < e.length && !t.call(e[n], n, e[n]); n++);
        return a;
    }, p.digit = function (e, t, n) {
        var a = "";
        e = String(e), t = t || 2;
        for (var i = e.length; i < t; i++) a += "0";
        return e < Math.pow(10, t) ? a + (0 | e) : e;
    }, p.elem = function (e, t) {
        var n = document.createElement(e);
        return p.each(t || {}, function (e, t) {
            n.setAttribute(e, t);
        }), n;
    }, g.addStr = function (e, t) {
        return e = e.replace(/\s+/, " "), t = t.replace(/\s+/, " ").split(" "), p.each(t, function (t, n) {
            new RegExp("\\b" + n + "\\b").test(e) || (e = e + " " + n);
        }), e.replace(/^\s|\s$/, "");
    }, g.removeStr = function (e, t) {
        return e = e.replace(/\s+/, " "), t = t.replace(/\s+/, " ").split(" "), p.each(t, function (t, n) {
            var a = new RegExp("\\b" + n + "\\b");
            a.test(e) && (e = e.replace(a, ""));
        }), e.replace(/\s+/, " ").replace(/^\s|\s$/, "");
    }, g.prototype.find = function (e) {
        var t = this, n = 0, a = [], i = "object" == (void 0 === e ? "undefined" : _typeof(e));
        return this.each(function (r, o) {
            for (var s = i ? [e] : o.querySelectorAll(e || null); n < s.length; n++) a.push(s[n]);
            t.shift();
        }), i || (t.selector = (t.selector ? t.selector + " " : "") + e), p.each(a, function (e, n) {
            t.push(n);
        }), t;
    }, g.prototype.each = function (e) {
        return p.each.call(this, this, e);
    }, g.prototype.addClass = function (e, t) {
        return this.each(function (n, a) {
            a.className = g[t ? "removeStr" : "addStr"](a.className, e);
        });
    }, g.prototype.removeClass = function (e) {
        return this.addClass(e, !0);
    }, g.prototype.hasClass = function (e) {
        var t = !1;
        return this.each(function (n, a) {
            new RegExp("\\b" + e + "\\b").test(a.className) && (t = !0);
        }), t;
    }, g.prototype.attr = function (e, t) {
        var n = this;
        return void 0 === t ? function () {
            if (n.length > 0) return n[0].getAttribute(e);
        }() : n.each(function (n, a) {
            a.setAttribute(e, t);
        });
    }, g.prototype.removeAttr = function (e) {
        return this.each(function (t, n) {
            n.removeAttribute(e);
        });
    }, g.prototype.html = function (e) {
        return this.each(function (t, n) {
            n.innerHTML = e;
        });
    }, g.prototype.val = function (e) {
        return this.each(function (t, n) {
            n.value = e;
        });
    }, g.prototype.append = function (e) {
        return this.each(function (t, n) {
            "object" == (void 0 === e ? "undefined" : _typeof(e)) ? n.appendChild(e) : n.innerHTML = n.innerHTML + e;
        });
    }, g.prototype.remove = function (e) {
        return this.each(function (t, n) {
            e ? n.removeChild(e) : n.parentNode.removeChild(n);
        });
    }, g.prototype.on = function (e, t) {
        return this.each(function (n, a) {
            a.attachEvent ? a.attachEvent("on" + e, function (e) {
                e.target = e.srcElement, t.call(a, e);
            }) : a.addEventListener(e, t, !1);
        });
    }, g.prototype.off = function (e, t) {
        return this.each(function (n, a) {
            a.detachEvent ? a.detachEvent("on" + e, t) : a.removeEventListener(e, t, !1);
        });
    }, f.isLeapYear = function (e) {
        return e % 4 == 0 && e % 100 != 0 || e % 400 == 0;
    }, f.prototype.config = {
        type: "date",
        range: !1,
        format: "yyyy-MM-dd",
        value: null,
        isInitValue: !0,
        min: "1900-1-1",
        max: "2099-12-31",
        trigger: "focus",
        show: !1,
        showBottom: !0,
        btns: ["clear", "now", "confirm"],
        lang: "cn",
        theme: "default",
        position: null,
        calendar: !1,
        mark: {},
        zIndex: null,
        done: null,
        change: null
    }, f.prototype.lang = function () {
        var e = this, t = e.config, n = {
            cn: {
                weeks: ["日", "一", "二", "三", "四", "五", "六"],
                time: ["时", "分", "秒"],
                timeTips: "选择时间",
                startTime: "开始时间",
                endTime: "结束时间",
                dateTips: "返回日期",
                month: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
                tools: {
                    confirm: "确定",
                    clear: "清空",
                    now: "现在"
                }
            },
            en: {
                weeks: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                time: ["Hours", "Minutes", "Seconds"],
                timeTips: "Select Time",
                startTime: "Start Time",
                endTime: "End Time",
                dateTips: "Select Date",
                month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                tools: {
                    confirm: "Confirm",
                    clear: "Clear",
                    now: "Now"
                }
            }
        };
        return n[t.lang] || n.cn;
    }, f.prototype.init = function () {
        var e = this, t = e.config, n = "yyyy|y|MM|M|dd|d|HH|H|mm|m|ss|s", a = "static" === t.position, i = {
            year: "yyyy",
            month: "yyyy-MM",
            date: "yyyy-MM-dd",
            time: "HH:mm:ss",
            datetime: "yyyy-MM-dd HH:mm:ss"
        };
        t.elem = p(t.elem), t.eventElem = p(t.eventElem), t.elem[0] && (!0 === t.range && (t.range = "-"),
            t.format === i.date && (t.format = i[t.type]), e.format = t.format.match(new RegExp(n + "|.", "g")) || [],
            e.EXP_IF = "", e.EXP_SPLIT = "", p.each(e.format, function (t, a) {
                var i = new RegExp(n).test(a) ? "\\d{" + function () {
                    return new RegExp(n).test(e.format[0 === t ? t + 1 : t - 1] || "") ? /^yyyy|y$/.test(a) ? 4 : a.length : /^yyyy$/.test(a) ? "1,4" : /^y$/.test(a) ? "1,308" : "1,2";
                }() + "}" : "\\" + a;
                e.EXP_IF = e.EXP_IF + i, e.EXP_SPLIT = e.EXP_SPLIT + "(" + i + ")";
            }), e.EXP_IF = new RegExp("^" + (t.range ? e.EXP_IF + "\\s\\" + t.range + "\\s" + e.EXP_IF : e.EXP_IF) + "$"),
            e.EXP_SPLIT = new RegExp("^" + e.EXP_SPLIT + "$", ""), e.isInput(t.elem[0]) || "focus" === t.trigger && (t.trigger = "click"),
            t.elem.attr("lay-key") || (t.elem.attr("lay-key", e.index), t.eventElem.attr("lay-key", e.index)),
            t.mark = p.extend({}, t.calendar && "cn" === t.lang ? {
                "0-1-1": "元旦",
                "0-2-14": "情人",
                "0-3-8": "妇女",
                "0-3-12": "植树",
                "0-4-1": "愚人",
                "0-5-1": "劳动",
                "0-5-4": "青年",
                "0-6-1": "儿童",
                "0-9-10": "教师",
                "0-9-18": "国耻",
                "0-10-1": "国庆",
                "0-12-25": "圣诞"
            } : {}, t.mark), p.each(["min", "max"], function (e, n) {
                var a = [], i = [];
                if ("number" == typeof t[n]) {
                    var r = t[n], o = new Date().getTime(), s = 864e5, l = new Date(r ? r < s ? o + r * s : r : o);
                    a = [l.getFullYear(), l.getMonth() + 1, l.getDate()], r < s || (i = [l.getHours(), l.getMinutes(), l.getSeconds()]);
                } else a = (t[n].match(/\d+-\d+-\d+/) || [""])[0].split("-"), i = (t[n].match(/\d+:\d+:\d+/) || [""])[0].split(":");
                t[n] = {
                    year: 0 | a[0] || new Date().getFullYear(),
                    month: a[1] ? (0 | a[1]) - 1 : new Date().getMonth(),
                    date: 0 | a[2] || new Date().getDate(),
                    hours: 0 | i[0],
                    minutes: 0 | i[1],
                    seconds: 0 | i[2]
                };
            }), e.elemID = "layui-laydate" + t.elem.attr("lay-key"), (t.show || a) && e.render(),
            a || e.events(), t.value && t.isInitValue && (t.value.constructor === Date ? e.setValue(e.parse(0, e.systemDate(t.value))) : e.setValue(t.value)));
    }, f.prototype.render = function () {
        var e = this, t = e.config, n = e.lang(), a = "static" === t.position, i = e.elem = p.elem("div", {
            id: e.elemID,
            class: ["layui-laydate", t.range ? " layui-laydate-range" : "", a ? " " + l : "", t.theme && "default" !== t.theme && !/^#/.test(t.theme) ? " laydate-theme-" + t.theme : ""].join("")
        }), r = e.elemMain = [], o = e.elemHeader = [], s = e.elemCont = [], d = e.table = [], c = e.footer = p.elem("div", {
            class: "layui-laydate-footer"
        });
        if (t.zIndex && (i.style.zIndex = t.zIndex), p.each(new Array(2), function (e) {
            if (!t.range && e > 0) return !0;
            var a = p.elem("div", {
                class: "layui-laydate-header"
            }), i = [function () {
                var e = p.elem("i", {
                    class: "layui-icon laydate-icon laydate-prev-y"
                });
                return e.innerHTML = "&#xe65a;", e;
            }(), function () {
                var e = p.elem("i", {
                    class: "layui-icon laydate-icon laydate-prev-m"
                });
                return e.innerHTML = "&#xe603;", e;
            }(), function () {
                var e = p.elem("div", {
                    class: "laydate-set-ym"
                }), t = p.elem("span"), n = p.elem("span");
                return e.appendChild(t), e.appendChild(n), e;
            }(), function () {
                var e = p.elem("i", {
                    class: "layui-icon laydate-icon laydate-next-m"
                });
                return e.innerHTML = "&#xe602;", e;
            }(), function () {
                var e = p.elem("i", {
                    class: "layui-icon laydate-icon laydate-next-y"
                });
                return e.innerHTML = "&#xe65b;", e;
            }()], l = p.elem("div", {
                class: "layui-laydate-content"
            }), c = p.elem("table"), m = p.elem("thead"), u = p.elem("tr");
            p.each(i, function (e, t) {
                a.appendChild(t);
            }), m.appendChild(u), p.each(new Array(6), function (e) {
                var t = c.insertRow(0);
                p.each(new Array(7), function (a) {
                    if (0 === e) {
                        var i = p.elem("th");
                        i.innerHTML = n.weeks[a], u.appendChild(i);
                    }
                    t.insertCell(a);
                });
            }), c.insertBefore(m, c.children[0]), l.appendChild(c), r[e] = p.elem("div", {
                class: "layui-laydate-main laydate-main-list-" + e
            }), r[e].appendChild(a), r[e].appendChild(l), o.push(i), s.push(l), d.push(c);
        }), p(c).html(function () {
            var e = [], i = [];
            return "datetime" === t.type && e.push('<span lay-type="datetime" class="laydate-btns-time">' + n.timeTips + "</span>"),
                p.each(t.btns, function (e, r) {
                    var o = n.tools[r] || "btn";
                    t.range && "now" === r || (a && "clear" === r && (o = "cn" === t.lang ? "重置" : "Reset"),
                        i.push('<span lay-type="' + r + '" class="laydate-btns-' + r + '">' + o + "</span>"));
                }), e.push('<div class="laydate-footer-btns">' + i.join("") + "</div>"), e.join("");
        }()), p.each(r, function (e, t) {
            i.appendChild(t);
        }), t.showBottom && i.appendChild(c), /^#/.test(t.theme)) {
            var m = p.elem("style"), u = ["#{{id}} .layui-laydate-header{background-color:{{theme}};}", "#{{id}} .layui-this{background-color:{{theme}} !important;}"].join("").replace(/{{id}}/g, e.elemID).replace(/{{theme}}/g, t.theme);
            "styleSheet" in m ? (m.setAttribute("type", "text/css"), m.styleSheet.cssText = u) : m.innerHTML = u,
                p(i).addClass("laydate-theme-molv"), i.appendChild(m);
        }
        e.remove(f.thisElemDate), a ? t.elem.append(i) : (document.body.appendChild(i),
            e.position()), e.checkDate().calendar(), e.changeEvent(), f.thisElemDate = e.elemID,
            "function" == typeof t.ready && t.ready(p.extend({}, t.dateTime, {
                month: t.dateTime.month + 1
            }));
    }, f.prototype.remove = function (e) {
        var t = this, n = (t.config, p("#" + (e || t.elemID)));
        return n.hasClass(l) || t.checkDate(function () {
            n.remove();
        }), t;
    }, f.prototype.position = function () {
        var e = this, t = e.config, n = e.bindElem || t.elem[0], a = n.getBoundingClientRect(), i = e.elem.offsetWidth, r = e.elem.offsetHeight, o = function (e) {
            return e = e ? "scrollLeft" : "scrollTop", document.body[e] | document.documentElement[e];
        }, s = function (e) {
            return document.documentElement[e ? "clientWidth" : "clientHeight"];
        }, l = a.left, d = a.bottom;
        l + i + 5 > s("width") && (l = s("width") - i - 5), d + r + 5 > s() && (d = a.top > r ? a.top - r : s() - r,
            d -= 10), t.position && (e.elem.style.position = t.position), e.elem.style.left = l + ("fixed" === t.position ? 0 : o(1)) + "px",
            e.elem.style.top = d + ("fixed" === t.position ? 0 : o()) + "px";
    }, f.prototype.hint = function (e) {
        var t = this, n = (t.config, p.elem("div", {
            class: m
        }));
        t.elem && (n.innerHTML = e || "", p(t.elem).find("." + m).remove(), t.elem.appendChild(n),
            clearTimeout(t.hinTimer), t.hinTimer = setTimeout(function () {
                p(t.elem).find("." + m).remove();
            }, 3e3));
    }, f.prototype.getAsYM = function (e, t, n) {
        return n ? t-- : t++ , t < 0 && (t = 11, e--), t > 11 && (t = 0, e++), [e, t];
    }, f.prototype.systemDate = function (e) {
        var t = e || new Date();
        return {
            year: t.getFullYear(),
            month: t.getMonth(),
            date: t.getDate(),
            hours: e ? e.getHours() : 0,
            minutes: e ? e.getMinutes() : 0,
            seconds: e ? e.getSeconds() : 0
        };
    }, f.prototype.checkDate = function (e) {
        var t, a, i = this, r = (new Date(), i.config), o = r.dateTime = r.dateTime || i.systemDate(), l = i.bindElem || r.elem[0], d = (i.isInput(l),
            i.isInput(l) ? l.value : "static" === r.position ? "" : l.innerHTML), c = function (e) {
                e.year > s[1] && (e.year = s[1], a = !0), e.month > 11 && (e.month = 11, a = !0),
                    e.hours > 23 && (e.hours = 0, a = !0), e.minutes > 59 && (e.minutes = 0, e.hours++ ,
                        a = !0), e.seconds > 59 && (e.seconds = 0, e.minutes++ , a = !0), t = n.getEndDate(e.month + 1, e.year),
                    e.date > t && (e.date = t, a = !0);
            }, m = function (e, t, n) {
                var o = ["startTime", "endTime"];
                t = (t.match(i.EXP_SPLIT) || []).slice(1), n = n || 0, r.range && (i[o[n]] = i[o[n]] || {}),
                    p.each(i.format, function (l, d) {
                        var c = parseFloat(t[l]);
                        t[l].length < d.length && (a = !0), /yyyy|y/.test(d) ? (c < s[0] && (c = s[0], a = !0),
                            e.year = c) : /MM|M/.test(d) ? (c < 1 && (c = 1, a = !0), e.month = c - 1) : /dd|d/.test(d) ? (c < 1 && (c = 1,
                                a = !0), e.date = c) : /HH|H/.test(d) ? (c < 1 && (c = 0, a = !0), e.hours = c,
                                    r.range && (i[o[n]].hours = c)) : /mm|m/.test(d) ? (c < 1 && (c = 0, a = !0), e.minutes = c,
                                        r.range && (i[o[n]].minutes = c)) : /ss|s/.test(d) && (c < 1 && (c = 0, a = !0),
                                            e.seconds = c, r.range && (i[o[n]].seconds = c));
                    }), c(e);
            };
        return "limit" === e ? (c(o), i) : (d = d || r.value, "string" == typeof d && (d = d.replace(/\s+/g, " ").replace(/^\s|\s$/g, "")),
            i.startState && !i.endState && (delete i.startState, i.endState = !0), "string" == typeof d && d ? i.EXP_IF.test(d) ? r.range ? (d = d.split(" " + r.range + " "),
                i.startDate = i.startDate || i.systemDate(), i.endDate = i.endDate || i.systemDate(),
                r.dateTime = p.extend({}, i.startDate), p.each([i.startDate, i.endDate], function (e, t) {
                    m(t, d[e], e);
                })) : m(o, d) : (i.hint("日期格式不合法<br>必须遵循下述格式：<br>" + (r.range ? r.format + " " + r.range + " " + r.format : r.format) + "<br>已为你重置"),
                    a = !0) : d && d.constructor === Date ? r.dateTime = i.systemDate(d) : (r.dateTime = i.systemDate(),
                        delete i.startState, delete i.endState, delete i.startDate, delete i.endDate, delete i.startTime,
                        delete i.endTime), c(o), a && d && i.setValue(r.range ? i.endDate ? i.parse() : "" : i.parse()),
            e && e(), i);
    }, f.prototype.mark = function (e, t) {
        var n, a = this, i = a.config;
        return p.each(i.mark, function (e, a) {
            var i = e.split("-");
            i[0] != t[0] && 0 != i[0] || i[1] != t[1] && 0 != i[1] || i[2] != t[2] || (n = a || t[2]);
        }), n && e.html('<span class="laydate-day-mark">' + n + "</span>"), a;
    }, f.prototype.limit = function (e, t, n, a) {
        var i, o = this, s = o.config, l = {}, d = s[n > 41 ? "endDate" : "dateTime"], c = p.extend({}, d, t || {});
        return p.each({
            now: c,
            min: s.min,
            max: s.max
        }, function (e, t) {
            l[e] = o.newDate(p.extend({
                year: t.year,
                month: t.month,
                date: t.date
            }, function () {
                var e = {};
                return p.each(a, function (n, a) {
                    e[a] = t[a];
                }), e;
            }())).getTime();
        }), i = l.now < l.min || l.now > l.max, e && e[i ? "addClass" : "removeClass"](r),
            i;
    }, f.prototype.calendar = function (e) {
        var t, a, r, o = this, l = o.config, d = e || l.dateTime, c = new Date(), m = o.lang(), y = "date" !== l.type && "datetime" !== l.type, h = e ? 1 : 0, f = p(o.table[h]).find("td"), g = p(o.elemHeader[h][2]).find("span");
        if (d.year < s[0] && (d.year = s[0], o.hint("最低只能支持到公元" + s[0] + "年")), d.year > s[1] && (d.year = s[1],
            o.hint("最高只能支持到公元" + s[1] + "年")), o.firstDate || (o.firstDate = p.extend({}, d)),
            c.setFullYear(d.year, d.month, 1), t = c.getDay(), a = n.getEndDate(d.month || 12, d.year),
            r = n.getEndDate(d.month + 1, d.year), p.each(f, function (e, n) {
                var s = [d.year, d.month], c = 0;
                n = p(n), n.removeAttr("class"), e < t ? (c = a - t + e, n.addClass("laydate-day-prev"),
                    s = o.getAsYM(d.year, d.month, "sub")) : e >= t && e < r + t ? (c = e - t, l.range || c + 1 === d.date && n.addClass(i)) : (c = e - r - t,
                        n.addClass("laydate-day-next"), s = o.getAsYM(d.year, d.month)), s[1]++ , s[2] = c + 1,
                    n.attr("lay-ymd", s.join("-")).html(s[2]), o.mark(n, s).limit(n, {
                        year: s[0],
                        month: s[1] - 1,
                        date: s[2]
                    }, e);
            }), p(g[0]).attr("lay-ym", d.year + "-" + (d.month + 1)), p(g[1]).attr("lay-ym", d.year + "-" + (d.month + 1)),
            "cn" === l.lang ? (p(g[0]).attr("lay-type", "year").html(d.year + "年"), p(g[1]).attr("lay-type", "month").html(d.month + 1 + "月")) : (p(g[0]).attr("lay-type", "month").html(m.month[d.month]),
                p(g[1]).attr("lay-type", "year").html(d.year)), y && (l.range && (e ? o.endDate = o.endDate || {
                    year: d.year + ("year" === l.type ? 1 : 0),
                    month: d.month + ("month" === l.type ? 0 : -1)
                } : o.startDate = o.startDate || {
                    year: d.year,
                    month: d.month
                }, e && (o.listYM = [[o.startDate.year, o.startDate.month + 1], [o.endDate.year, o.endDate.month + 1]],
                    o.list(l.type, 0).list(l.type, 1), "time" === l.type ? o.setBtnStatus("时间", p.extend({}, o.systemDate(), o.startTime), p.extend({}, o.systemDate(), o.endTime)) : o.setBtnStatus(!0))),
                    l.range || (o.listYM = [[d.year, d.month + 1]], o.list(l.type, 0))), l.range && !e) {
            var v = o.getAsYM(d.year, d.month);
            o.calendar(p.extend({}, d, {
                year: v[0],
                month: v[1]
            }));
        }
        return l.range || o.limit(p(o.footer).find(u), null, 0, ["hours", "minutes", "seconds"]),
            l.range && e && !y && o.stampRange(), o;
    }, f.prototype.list = function (e, t) {
        var n = this, a = n.config, o = a.dateTime, s = n.lang(), l = a.range && "date" !== a.type && "datetime" !== a.type, c = p.elem("ul", {
            class: d + " " + {
                year: "laydate-year-list",
                month: "laydate-month-list",
                time: "laydate-time-list"
            }[e]
        }), m = n.elemHeader[t], f = p(m[2]).find("span"), g = n.elemCont[t || 0], v = p(g).find("." + d)[0], D = "cn" === a.lang, T = D ? "年" : "", w = n.listYM[t] || {}, C = ["hours", "minutes", "seconds"], x = ["startTime", "endTime"][t];
        if (w[0] < 1 && (w[0] = 1), "year" === e) {
            var M, b = M = w[0] - 7;
            b < 1 && (b = M = 1), p.each(new Array(15), function (e) {
                var r = p.elem("li", {
                    "lay-ym": M
                }), o = {
                    year: M
                };
                M == w[0] && p(r).addClass(i), r.innerHTML = M + T, c.appendChild(r), M < n.firstDate.year ? (o.month = a.min.month,
                    o.date = a.min.date) : M >= n.firstDate.year && (o.month = a.max.month, o.date = a.max.date),
                    n.limit(p(r), o, t), M++;
            }), p(f[D ? 0 : 1]).attr("lay-ym", M - 8 + "-" + w[1]).html(b + T + " - " + (M - 1 + T));
        } else if ("month" === e) p.each(new Array(12), function (e) {
            var r = p.elem("li", {
                "lay-ym": e
            }), o = {
                year: w[0],
                month: e
            };
            e + 1 == w[1] && p(r).addClass(i), r.innerHTML = s.month[e] + (D ? "月" : ""), c.appendChild(r),
                w[0] < n.firstDate.year ? o.date = a.min.date : w[0] >= n.firstDate.year && (o.date = a.max.date),
                n.limit(p(r), o, t);
        }), p(f[D ? 0 : 1]).attr("lay-ym", w[0] + "-" + w[1]).html(w[0] + T); else if ("time" === e) {
            var S = function () {
                p(c).find("ol").each(function (e, a) {
                    p(a).find("li").each(function (a, i) {
                        n.limit(p(i), [{
                            hours: a
                        }, {
                            hours: n[x].hours,
                            minutes: a
                        }, {
                            hours: n[x].hours,
                            minutes: n[x].minutes,
                            seconds: a
                        }][e], t, [["hours"], ["hours", "minutes"], ["hours", "minutes", "seconds"]][e]);
                    });
                }), a.range || n.limit(p(n.footer).find(u), n[x], 0, ["hours", "minutes", "seconds"]);
            };
            a.range ? n[x] || (n[x] = {
                hours: 0,
                minutes: 0,
                seconds: 0
            }) : n[x] = o, p.each([24, 60, 60], function (e, t) {
                var a = p.elem("li"), r = ["<p>" + s.time[e] + "</p><ol>"];
                p.each(new Array(t), function (t) {
                    r.push("<li" + (n[x][C[e]] === t ? ' class="' + i + '"' : "") + ">" + p.digit(t, 2) + "</li>");
                }), a.innerHTML = r.join("") + "</ol>", c.appendChild(a);
            }), S();
        }
        if (v && g.removeChild(v), g.appendChild(c), "year" === e || "month" === e) p(n.elemMain[t]).addClass("laydate-ym-show"),
            p(c).find("li").on("click", function () {
                var s = 0 | p(this).attr("lay-ym");
                if (!p(this).hasClass(r)) {
                    if (0 === t) o[e] = s, l && (n.startDate[e] = s), n.limit(p(n.footer).find(u), null, 0); else if (l) n.endDate[e] = s; else {
                        var d = "year" === e ? n.getAsYM(s, w[1] - 1, "sub") : n.getAsYM(w[0], s, "sub");
                        p.extend(o, {
                            year: d[0],
                            month: d[1]
                        });
                    }
                    "year" === a.type || "month" === a.type ? (p(c).find("." + i).removeClass(i), p(this).addClass(i),
                        "month" === a.type && "year" === e && (n.listYM[t][0] = s, l && (n[["startDate", "endDate"][t]].year = s),
                            n.list("month", t))) : (n.checkDate("limit").calendar(), n.closeList()), n.setBtnStatus(),
                        a.range || n.done(null, "change"), p(n.footer).find(h).removeClass(r);
                }
            }); else {
            var E = p.elem("span", {
                class: y
            }), k = function () {
                p(c).find("ol").each(function (e) {
                    var t = this, a = p(t).find("li");
                    t.scrollTop = 30 * (n[x][C[e]] - 2), t.scrollTop <= 0 && a.each(function (e, n) {
                        if (!p(this).hasClass(r)) return t.scrollTop = 30 * (e - 2), !0;
                    });
                });
            }, H = p(m[2]).find("." + y);
            k(), E.innerHTML = a.range ? [s.startTime, s.endTime][t] : s.timeTips, p(n.elemMain[t]).addClass("laydate-time-show"),
                H[0] && H.remove(), m[2].appendChild(E), p(c).find("ol").each(function (e) {
                    var t = this;
                    p(t).find("li").on("click", function () {
                        var s = 0 | this.innerHTML;
                        p(this).hasClass(r) || (a.range ? n[x][C[e]] = s : o[C[e]] = s, p(t).find("." + i).removeClass(i),
                            p(this).addClass(i), S(), k(), (n.endDate || "time" === a.type) && n.done(null, "change"),
                            n.setBtnStatus());
                    });
                });
        }
        return n;
    }, f.prototype.listYM = [], f.prototype.closeList = function () {
        var e = this;
        e.config, p.each(e.elemCont, function (t, n) {
            p(this).find("." + d).remove(), p(e.elemMain[t]).removeClass("laydate-ym-show laydate-time-show");
        }), p(e.elem).find("." + y).remove();
    }, f.prototype.setBtnStatus = function (e, t, n) {
        var a, i = this, s = i.config, l = p(i.footer).find(u);
        s.range && "date" !== s.type && "time" !== s.type && (t = t || i.startDate, n = n || i.endDate,
            a = i.newDate(t).getTime() > i.newDate(n).getTime(), i.limit(null, t) || i.limit(null, n) ? l.addClass(r) : l[a ? "addClass" : "removeClass"](r),
            e && a && i.hint("string" == typeof e ? o.replace(/日期/g, e) : o));
    }, f.prototype.parse = function (e, t) {
        var n = this, a = n.config, i = t || (e ? p.extend({}, n.endDate, n.endTime) : a.range ? p.extend({}, n.startDate, n.startTime) : a.dateTime), r = n.format.concat();
        return p.each(r, function (e, t) {
            /yyyy|y/.test(t) ? r[e] = p.digit(i.year, t.length) : /MM|M/.test(t) ? r[e] = p.digit(i.month + 1, t.length) : /dd|d/.test(t) ? r[e] = p.digit(i.date, t.length) : /HH|H/.test(t) ? r[e] = p.digit(i.hours, t.length) : /mm|m/.test(t) ? r[e] = p.digit(i.minutes, t.length) : /ss|s/.test(t) && (r[e] = p.digit(i.seconds, t.length));
        }), a.range && !e ? r.join("") + " " + a.range + " " + n.parse(1) : r.join("");
    }, f.prototype.newDate = function (e) {
        return e = e || {}, new Date(e.year || 1, e.month || 0, e.date || 1, e.hours || 0, e.minutes || 0, e.seconds || 0);
    }, f.prototype.setValue = function (e) {
        var t = this, n = t.config, a = t.bindElem || n.elem[0], i = t.isInput(a) ? "val" : "html";
        return "static" === n.position || p(a)[i](e || ""), this;
    }, f.prototype.stampRange = function () {
        var e, t, n = this, a = n.config, s = p(n.elem).find("td");
        if (a.range && !n.endDate && p(n.footer).find(u).addClass(r), n.endDate) return e = n.newDate({
            year: n.startDate.year,
            month: n.startDate.month,
            date: n.startDate.date
        }).getTime(), t = n.newDate({
            year: n.endDate.year,
            month: n.endDate.month,
            date: n.endDate.date
        }).getTime(), e > t ? n.hint(o) : void p.each(s, function (a, r) {
            var o = p(r).attr("lay-ymd").split("-"), s = n.newDate({
                year: o[0],
                month: o[1] - 1,
                date: o[2]
            }).getTime();
            p(r).removeClass(c + " " + i), s !== e && s !== t || p(r).addClass(p(r).hasClass("laydate-day-prev") || p(r).hasClass("laydate-day-next") ? c : i),
                s > e && s < t && p(r).addClass(c);
        });
    }, f.prototype.done = function (e, t) {
        var n = this, a = n.config, i = p.extend({}, n.startDate ? p.extend(n.startDate, n.startTime) : a.dateTime), r = p.extend({}, p.extend(n.endDate, n.endTime));
        return p.each([i, r], function (e, t) {
            "month" in t && p.extend(t, {
                month: t.month + 1
            });
        }), e = e || [n.parse(), i, r], "function" == typeof a[t || "done"] && a[t || "done"].apply(a, e),
            n;
    }, f.prototype.choose = function (e) {
        var t = this, n = t.config, a = n.dateTime, o = p(t.elem).find("td"), s = e.attr("lay-ymd").split("-"), l = function (e) {
            new Date(), e && p.extend(a, s), n.range && (t.startDate ? p.extend(t.startDate, s) : t.startDate = p.extend({}, s, t.startTime),
                t.startYMD = s);
        };
        if (s = {
            year: 0 | s[0],
            month: (0 | s[1]) - 1,
            date: 0 | s[2]
        }, !e.hasClass(r)) if (n.range) {
            if (p.each(["startTime", "endTime"], function (e, n) {
                t[n] = t[n] || {
                    hours: 0,
                    minutes: 0,
                    seconds: 0
                };
            }), t.endState) l(), delete t.endState, delete t.endDate, t.startState = !0, o.removeClass(i + " " + c),
                e.addClass(i); else if (t.startState) {
                    if (e.addClass(i), t.endDate ? p.extend(t.endDate, s) : t.endDate = p.extend({}, s, t.endTime),
                        t.newDate(s).getTime() < t.newDate(t.startYMD).getTime()) {
                        var d = p.extend({}, t.endDate, {
                            hours: t.startDate.hours,
                            minutes: t.startDate.minutes,
                            seconds: t.startDate.seconds
                        });
                        p.extend(t.endDate, t.startDate, {
                            hours: t.endDate.hours,
                            minutes: t.endDate.minutes,
                            seconds: t.endDate.seconds
                        }), t.startDate = d;
                    }
                    n.showBottom || t.done(), t.stampRange(), t.endState = !0, t.done(null, "change");
                } else e.addClass(i), l(), t.startState = !0;
            p(t.footer).find(u)[t.endDate ? "removeClass" : "addClass"](r);
        } else "static" === n.position ? (l(!0), t.calendar().done().done(null, "change")) : "date" === n.type ? (l(!0),
            t.setValue(t.parse()).remove().done()) : "datetime" === n.type && (l(!0), t.calendar().done(null, "change"));
    }, f.prototype.tool = function (e, t) {
        var n = this, a = n.config, i = a.dateTime, s = "static" === a.position, l = {
            datetime: function () {
                p(e).hasClass(r) || (n.list("time", 0), a.range && n.list("time", 1), p(e).attr("lay-type", "date").html(n.lang().dateTips));
            },
            date: function () {
                n.closeList(), p(e).attr("lay-type", "datetime").html(n.lang().timeTips);
            },
            clear: function () {
                n.setValue("").remove(), s && (p.extend(i, n.firstDate), n.calendar()), a.range && (delete n.startState,
                    delete n.endState, delete n.endDate, delete n.startTime, delete n.endTime), n.done(["", {}, {}]);
            },
            now: function () {
                var e = new Date();
                p.extend(i, n.systemDate(), {
                    hours: e.getHours(),
                    minutes: e.getMinutes(),
                    seconds: e.getSeconds()
                }), n.setValue(n.parse()).remove(), s && n.calendar(), n.done();
            },
            confirm: function () {
                if (a.range) {
                    if (!n.endDate) return n.hint("请先选择日期范围");
                    if (p(e).hasClass(r)) return n.hint("time" === a.type ? o.replace(/日期/g, "时间") : o);
                } else if (p(e).hasClass(r)) return n.hint("不在有效日期或时间范围内");
                n.done(), n.setValue(n.parse()).remove();
            }
        };
        l[t] && l[t]();
    }, f.prototype.change = function (e) {
        var t = this, n = t.config, a = n.dateTime, i = n.range && ("year" === n.type || "month" === n.type), r = t.elemCont[e || 0], o = t.listYM[e], s = function (s) {
            var l = ["startDate", "endDate"][e], d = p(r).find(".laydate-year-list")[0], c = p(r).find(".laydate-month-list")[0];
            return d && (o[0] = s ? o[0] - 15 : o[0] + 15, t.list("year", e)), c && (s ? o[0]-- : o[0]++ ,
                t.list("month", e)), (d || c) && (p.extend(a, {
                    year: o[0]
                }), i && (t[l].year = o[0]), n.range || t.done(null, "change"), t.setBtnStatus(),
                    n.range || t.limit(p(t.footer).find(u), {
                        year: o[0]
                    })), d || c;
        };
        return {
            prevYear: function () {
                s("sub") || (a.year-- , t.checkDate("limit").calendar(), n.range || t.done(null, "change"));
            },
            prevMonth: function () {
                var e = t.getAsYM(a.year, a.month, "sub");
                p.extend(a, {
                    year: e[0],
                    month: e[1]
                }), t.checkDate("limit").calendar(), n.range || t.done(null, "change");
            },
            nextMonth: function () {
                var e = t.getAsYM(a.year, a.month);
                p.extend(a, {
                    year: e[0],
                    month: e[1]
                }), t.checkDate("limit").calendar(), n.range || t.done(null, "change");
            },
            nextYear: function () {
                s() || (a.year++ , t.checkDate("limit").calendar(), n.range || t.done(null, "change"));
            }
        };
    }, f.prototype.changeEvent = function () {
        var e = this;
        e.config, p(e.elem).on("click", function (e) {
            p.stope(e);
        }), p.each(e.elemHeader, function (t, n) {
            p(n[0]).on("click", function (n) {
                e.change(t).prevYear();
            }), p(n[1]).on("click", function (n) {
                e.change(t).prevMonth();
            }), p(n[2]).find("span").on("click", function (n) {
                var a = p(this), i = a.attr("lay-ym"), o = a.attr("lay-type");
                i && (i = i.split("-"), e.listYM[t] = [0 | i[0], 0 | i[1]], e.list(o, t), p(e.footer).find(h).addClass(r));
            }), p(n[3]).on("click", function (n) {
                e.change(t).nextMonth();
            }), p(n[4]).on("click", function (n) {
                e.change(t).nextYear();
            });
        }), p.each(e.table, function (t, n) {
            p(n).find("td").on("click", function () {
                e.choose(p(this));
            });
        }), p(e.footer).find("span").on("click", function () {
            var t = p(this).attr("lay-type");
            e.tool(this, t);
        });
    }, f.prototype.isInput = function (e) {
        return /input|textarea/.test(e.tagName.toLocaleLowerCase());
    }, f.prototype.events = function () {
        var e = this, t = e.config, n = function (n, a) {
            n.on(t.trigger, function () {
                a && (e.bindElem = this), e.render();
            });
        };
        t.elem[0] && !t.elem[0].eventHandler && (n(t.elem, "bind"), n(t.eventElem), p(document).on("click", function (n) {
            n.target !== t.elem[0] && n.target !== t.eventElem[0] && n.target !== p(t.closeStop)[0] && e.remove();
        }).on("keydown", function (t) {
            13 === t.keyCode && p("#" + e.elemID)[0] && e.elemID === f.thisElem && (t.preventDefault(),
                p(e.footer).find(u)[0].click());
        }), p(window).on("resize", function () {
            return !(!e.elem || !p(".layui-laydate")[0]) && void e.position();
        }), t.elem[0].eventHandler = !0);
    }, n.render = function (e) {
        var t = new f(e);
        return a.call(t);
    }, n.getEndDate = function (e, t) {
        var n = new Date();
        return n.setFullYear(t || n.getFullYear(), e || n.getMonth() + 1, 1), new Date(n.getTime() - 864e5).getDate();
    }, window.lay = window.lay || p, e ? (n.ready(), layui.define(function (e) {
        n.path = layui.cache.dir, e("laydate", n);
    })) : "function" == typeof define && define.amd ? define(function () {
        return n;
    }) : function () {
        n.ready(), window.laydate = n;
    }();
}();