/*
 Highcharts JS v10.2.1 (2022-08-29)

 Accessibility module

 (c) 2010-2021 Highsoft AS
 Author: Oystein Moseng

 License: www.highcharts.com/license
*/
(function (a) {
    "object" === typeof module && module.exports ? (a["default"] = a, module.exports = a) : "function" === typeof define && define.amd ? define("highcharts/modules/accessibility", ["highcharts"], function (x) {
        a(x);
        a.Highcharts = x;
        return a
    }) : a("undefined" !== typeof Highcharts ? Highcharts : void 0)
})(function (a) {
    function x(a, h, p, w) {
        a.hasOwnProperty(h) || (a[h] = w.apply(null, p), "function" === typeof CustomEvent && window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded", {
            detail: {
                path: h,
                module: a[h]
            }
        })))
    }

    a = a ? a._modules : {};
    x(a, "Accessibility/Utils/HTMLUtilities.js", [a["Core/Globals.js"], a["Core/Utilities.js"]], function (a, h) {
        function p(a) {
            if ("function" === typeof l.MouseEvent) return new l.MouseEvent(a.type, a);
            if (q.createEvent) {
                var g = q.createEvent("MouseEvent");
                if (g.initMouseEvent) return g.initMouseEvent(a.type, a.bubbles, a.cancelable, a.view || l, a.detail, a.screenX, a.screenY, a.clientX, a.clientY, a.ctrlKey, a.altKey, a.shiftKey, a.metaKey, a.button, a.relatedTarget), g
            }
            return w(a.type)
        }

        function w(a, g) {
            g = g || {x: 0, y: 0};
            if ("function" ===
                typeof l.MouseEvent) return new l.MouseEvent(a, {
                bubbles: !0,
                cancelable: !0,
                composed: !0,
                view: l,
                detail: "click" === a ? 1 : 0,
                screenX: g.x,
                screenY: g.y,
                clientX: g.x,
                clientY: g.y
            });
            if (q.createEvent) {
                var v = q.createEvent("MouseEvent");
                if (v.initMouseEvent) return v.initMouseEvent(a, !0, !0, l, "click" === a ? 1 : 0, g.x, g.y, g.x, g.y, !1, !1, !1, !1, 0, null), v
            }
            return {type: a}
        }

        var q = a.doc, l = a.win, t = h.css;
        return {
            addClass: function (a, g) {
                a.classList ? a.classList.add(g) : 0 > a.className.indexOf(g) && (a.className += " " + g)
            }, cloneMouseEvent: p, cloneTouchEvent: function (a) {
                var g =
                    function (a) {
                        for (var k = [], c = 0; c < a.length; ++c) {
                            var e = a.item(c);
                            e && k.push(e)
                        }
                        return k
                    };
                if ("function" === typeof l.TouchEvent) return g = new l.TouchEvent(a.type, {
                    touches: g(a.touches),
                    targetTouches: g(a.targetTouches),
                    changedTouches: g(a.changedTouches),
                    ctrlKey: a.ctrlKey,
                    shiftKey: a.shiftKey,
                    altKey: a.altKey,
                    metaKey: a.metaKey,
                    bubbles: a.bubbles,
                    cancelable: a.cancelable,
                    composed: a.composed,
                    detail: a.detail,
                    view: a.view
                }), a.defaultPrevented && g.preventDefault(), g;
                g = p(a);
                g.touches = a.touches;
                g.changedTouches = a.changedTouches;
                g.targetTouches = a.targetTouches;
                return g
            }, escapeStringForHTML: function (a) {
                return a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;")
            }, getElement: function (a) {
                return q.getElementById(a)
            }, getFakeMouseEvent: w, getHeadingTagNameForElement: function (a) {
                var g = function (a) {
                    a = parseInt(a.slice(1), 10);
                    return "h" + Math.min(6, a + 1)
                }, v = function (a) {
                    var c;
                    a:{
                        for (c = a; c = c.previousSibling;) {
                            var e = c.tagName || "";
                            if (/H[1-6]/.test(e)) {
                                c = e;
                                break a
                            }
                        }
                        c =
                            ""
                    }
                    if (c) return g(c);
                    a = a.parentElement;
                    if (!a) return "p";
                    c = a.tagName;
                    return /H[1-6]/.test(c) ? g(c) : v(a)
                };
                return v(a)
            }, removeChildNodes: function (a) {
                for (; a.lastChild;) a.removeChild(a.lastChild)
            }, removeClass: function (a, g) {
                a.classList ? a.classList.remove(g) : a.className = a.className.replace(new RegExp(g, "g"), "")
            }, removeElement: function (a) {
                a && a.parentNode && a.parentNode.removeChild(a)
            }, reverseChildNodes: function (a) {
                for (var g = a.childNodes.length; g--;) a.appendChild(a.childNodes[g])
            }, stripHTMLTagsFromString: function (a) {
                return "string" ===
                typeof a ? a.replace(/<\/?[^>]+(>|$)/g, "") : a
            }, visuallyHideElement: function (a) {
                t(a, {
                    position: "absolute",
                    width: "1px",
                    height: "1px",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    clip: "rect(1px, 1px, 1px, 1px)",
                    marginTop: "-3px",
                    "-ms-filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity=1)",
                    filter: "alpha(opacity=1)",
                    opacity: .01
                })
            }
        }
    });
    x(a, "Accessibility/A11yI18n.js", [a["Core/FormatUtilities.js"], a["Core/Utilities.js"]], function (a, h) {
        var p = a.format, w = h.getNestedProperty, q = h.pick, l;
        (function (a) {
            function v(c, e) {
                var d =
                    c.indexOf("#each("), b = c.indexOf("#plural("), f = c.indexOf("["), a = c.indexOf("]");
                if (-1 < d) {
                    a = c.slice(d).indexOf(")") + d;
                    b = c.substring(0, d);
                    f = c.substring(a + 1);
                    a = c.substring(d + 6, a).split(",");
                    d = Number(a[1]);
                    c = "";
                    if (e = w(a[0], e)) for (d = isNaN(d) ? e.length : d, d = 0 > d ? e.length + d : Math.min(d, e.length), a = 0; a < d; ++a) c += b + e[a] + f;
                    return c.length ? c : ""
                }
                if (-1 < b) {
                    f = c.slice(b).indexOf(")") + b;
                    b = c.substring(b + 8, f).split(",");
                    switch (Number(w(b[0], e))) {
                        case 0:
                            c = q(b[4], b[1]);
                            break;
                        case 1:
                            c = q(b[2], b[1]);
                            break;
                        case 2:
                            c = q(b[3], b[1]);
                            break;
                        default:
                            c = b[1]
                    }
                    c ? (e = c, e = e.trim && e.trim() || e.replace(/^\s+|\s+$/g, "")) : e = "";
                    return e
                }
                return -1 < f ? (b = c.substring(0, f), f = Number(c.substring(f + 1, a)), c = void 0, e = w(b, e), !isNaN(f) && e && (0 > f ? (c = e[e.length + f], "undefined" === typeof c && (c = e[0])) : (c = e[f], "undefined" === typeof c && (c = e[e.length - 1]))), "undefined" !== typeof c ? c : "") : "{" + c + "}"
            }

            function g(c, e, d) {
                var b = function (b, d) {
                    b = b.slice(d || 0);
                    var f = b.indexOf("{"), c = b.indexOf("}");
                    if (-1 < f && c > f) return {statement: b.substring(f + 1, c), begin: d + f + 1, end: d + c}
                }, f = [], a = 0;
                do {
                    var z = b(c, a);
                    var k = c.substring(a, z && z.begin - 1);
                    k.length && f.push({value: k, type: "constant"});
                    z && f.push({value: z.statement, type: "statement"});
                    a = z ? z.end + 1 : a + 1
                } while (z);
                f.forEach(function (b) {
                    "statement" === b.type && (b.value = v(b.value, e))
                });
                return p(f.reduce(function (b, d) {
                    return b + d.value
                }, ""), e, d)
            }

            function n(c, e) {
                c = c.split(".");
                for (var d = this.options.lang, b = 0; b < c.length; ++b) d = d && d[c[b]];
                return "string" === typeof d ? g(d, e, this) : ""
            }

            var k = [];
            a.compose = function (c) {
                -1 === k.indexOf(c) && (k.push(c), c.prototype.langFormat =
                    n);
                return c
            };
            a.i18nFormat = g
        })(l || (l = {}));
        return l
    });
    x(a, "Accessibility/Utils/ChartUtilities.js", [a["Core/Globals.js"], a["Accessibility/Utils/HTMLUtilities.js"], a["Core/Utilities.js"]], function (a, h, p) {
        function w(b, f) {
            var c = f.type, e = b.hcEvents;
            n.createEvent && (b.dispatchEvent || b.fireEvent) ? b.dispatchEvent ? b.dispatchEvent(f) : b.fireEvent(c, f) : e && e[c] ? d(b, c, f) : b.element && w(b.element, f)
        }

        function q(b) {
            var d = b.chart, c = {}, e = "Seconds";
            c.Seconds = ((b.dataMax || b.max || 0) - (b.dataMin || b.min || 0)) / 1E3;
            c.Minutes = c.Seconds /
                60;
            c.Hours = c.Minutes / 60;
            c.Days = c.Hours / 24;
            ["Minutes", "Hours", "Days"].forEach(function (b) {
                2 < c[b] && (e = b)
            });
            var a = c[e].toFixed("Seconds" !== e && "Minutes" !== e ? 1 : 0);
            return d.langFormat("accessibility.axis.timeRange" + e, {chart: d, axis: b, range: a.replace(".0", "")})
        }

        function l(b) {
            var d = b.chart, c = d.options,
                e = c && c.accessibility && c.accessibility.screenReaderSection.axisRangeDateFormat || "",
                a = {min: b.dataMin || b.min || 0, max: b.dataMax || b.max || 0};
            c = function (f) {
                return b.dateTime ? d.time.dateFormat(e, a[f]) : a[f].toString()
            };
            return d.langFormat("accessibility.axis.rangeFromTo", {
                chart: d,
                axis: b,
                rangeFrom: c("min"),
                rangeTo: c("max")
            })
        }

        function t(b) {
            if (b.points && b.points.length) return (b = e(b.points, function (b) {
                return !!b.graphic
            })) && b.graphic && b.graphic.element
        }

        function v(b) {
            var d = t(b);
            return d && d.parentNode || b.graph && b.graph.element || b.group && b.group.element
        }

        function g(b, d) {
            d.setAttribute("aria-hidden", !1);
            d !== b.renderTo && d.parentNode && d.parentNode !== n.body && (Array.prototype.forEach.call(d.parentNode.childNodes, function (b) {
                b.hasAttribute("aria-hidden") ||
                b.setAttribute("aria-hidden", !0)
            }), g(b, d.parentNode))
        }

        var n = a.doc, k = h.stripHTMLTagsFromString, c = p.defined, e = p.find, d = p.fireEvent;
        return {
            fireEventOnWrappedOrUnwrappedElement: w, getChartTitle: function (b) {
                return k(b.options.title.text || b.langFormat("accessibility.defaultChartTitle", {chart: b}))
            }, getAxisDescription: function (b) {
                return b && (b.userOptions && b.userOptions.accessibility && b.userOptions.accessibility.description || b.axisTitle && b.axisTitle.textStr || b.options.id || b.categories && "categories" || b.dateTime &&
                    "Time" || "values")
            }, getAxisRangeDescription: function (b) {
                var d = b.options || {};
                return d.accessibility && "undefined" !== typeof d.accessibility.rangeDescription ? d.accessibility.rangeDescription : b.categories ? (d = b.chart, b = b.dataMax && b.dataMin ? d.langFormat("accessibility.axis.rangeCategories", {
                    chart: d,
                    axis: b,
                    numCategories: b.dataMax - b.dataMin + 1
                }) : "", b) : !b.dateTime || 0 !== b.min && 0 !== b.dataMin ? l(b) : q(b)
            }, getPointFromXY: function (b, d, c) {
                for (var f = b.length, a; f--;) if (a = e(b[f].points || [], function (b) {
                    return b.x === d && b.y ===
                        c
                })) return a
            }, getSeriesFirstPointElement: t, getSeriesFromName: function (b, d) {
                return d ? (b.series || []).filter(function (b) {
                    return b.name === d
                }) : b.series
            }, getSeriesA11yElement: v, unhideChartElementFromAT: g, hideSeriesFromAT: function (b) {
                (b = v(b)) && b.setAttribute("aria-hidden", !0)
            }, scrollToPoint: function (b) {
                var f = b.series.xAxis, e = b.series.yAxis, a = f && f.scrollbar ? f : e;
                if ((f = a && a.scrollbar) && c(f.to) && c(f.from)) {
                    e = f.to - f.from;
                    if (c(a.dataMin) && c(a.dataMax)) {
                        var k = a.toPixels(a.dataMin), g = a.toPixels(a.dataMax);
                        b = (a.toPixels(b["xAxis" ===
                        a.coll ? "x" : "y"] || 0) - k) / (g - k)
                    } else b = 0;
                    f.updatePosition(b - e / 2, b + e / 2);
                    d(f, "changed", {from: f.from, to: f.to, trigger: "scrollbar", DOMEvent: null})
                }
            }
        }
    });
    x(a, "Accessibility/Utils/DOMElementProvider.js", [a["Core/Globals.js"], a["Accessibility/Utils/HTMLUtilities.js"]], function (a, h) {
        var p = a.doc, w = h.removeElement;
        return function () {
            function a() {
                this.elements = []
            }

            a.prototype.createElement = function () {
                var a = p.createElement.apply(p, arguments);
                this.elements.push(a);
                return a
            };
            a.prototype.destroyCreatedElements = function () {
                this.elements.forEach(function (a) {
                    w(a)
                });
                this.elements = []
            };
            return a
        }()
    });
    x(a, "Accessibility/Utils/EventProvider.js", [a["Core/Globals.js"], a["Core/Utilities.js"]], function (a, h) {
        var p = h.addEvent;
        return function () {
            function h() {
                this.eventRemovers = []
            }

            h.prototype.addEvent = function () {
                var h = p.apply(a, arguments);
                this.eventRemovers.push(h);
                return h
            };
            h.prototype.removeAddedEvents = function () {
                this.eventRemovers.forEach(function (a) {
                    return a()
                });
                this.eventRemovers = []
            };
            return h
        }()
    });
    x(a, "Accessibility/AccessibilityComponent.js", [a["Accessibility/Utils/ChartUtilities.js"],
        a["Accessibility/Utils/DOMElementProvider.js"], a["Accessibility/Utils/EventProvider.js"], a["Accessibility/Utils/HTMLUtilities.js"], a["Core/Utilities.js"]], function (a, h, p, w, q) {
        var l = a.fireEventOnWrappedOrUnwrappedElement, t = w.getFakeMouseEvent;
        a = q.extend;
        w = function () {
            function a() {
                this.proxyProvider = this.keyCodes = this.eventProvider = this.domElementProvider = this.chart = void 0
            }

            a.prototype.initBase = function (a, n) {
                this.chart = a;
                this.eventProvider = new p;
                this.domElementProvider = new h;
                this.proxyProvider = n;
                this.keyCodes =
                    {
                        left: 37,
                        right: 39,
                        up: 38,
                        down: 40,
                        enter: 13,
                        space: 32,
                        esc: 27,
                        tab: 9,
                        pageUp: 33,
                        pageDown: 34,
                        end: 35,
                        home: 36
                    }
            };
            a.prototype.addEvent = function (a, n, k, c) {
                return this.eventProvider.addEvent(a, n, k, c)
            };
            a.prototype.createElement = function (a, n) {
                return this.domElementProvider.createElement(a, n)
            };
            a.prototype.fakeClickEvent = function (a) {
                var g = t("click");
                l(a, g)
            };
            a.prototype.destroyBase = function () {
                this.domElementProvider.destroyCreatedElements();
                this.eventProvider.removeAddedEvents()
            };
            return a
        }();
        a(w.prototype, {
            init: function () {
            },
            getKeyboardNavigation: function () {
            }, onChartUpdate: function () {
            }, onChartRender: function () {
            }, destroy: function () {
            }
        });
        return w
    });
    x(a, "Accessibility/KeyboardNavigationHandler.js", [a["Core/Utilities.js"]], function (a) {
        var h = a.find;
        a = function () {
            function a(a, h) {
                this.chart = a;
                this.keyCodeMap = h.keyCodeMap || [];
                this.validate = h.validate;
                this.init = h.init;
                this.terminate = h.terminate;
                this.response = {success: 1, prev: 2, next: 3, noHandler: 4, fail: 5}
            }

            a.prototype.run = function (a) {
                var p = a.which || a.keyCode, l = this.response.noHandler,
                    t = h(this.keyCodeMap, function (a) {
                        return -1 < a[0].indexOf(p)
                    });
                t ? l = t[1].call(this, p, a) : 9 === p && (l = this.response[a.shiftKey ? "prev" : "next"]);
                return l
            };
            return a
        }();
        "";
        return a
    });
    x(a, "Accessibility/Components/ContainerComponent.js", [a["Accessibility/AccessibilityComponent.js"], a["Accessibility/KeyboardNavigationHandler.js"], a["Accessibility/Utils/ChartUtilities.js"], a["Core/Globals.js"], a["Accessibility/Utils/HTMLUtilities.js"]], function (a, h, p, w, q) {
        var l = this && this.__extends || function () {
            var a = function (c, e) {
                a =
                    Object.setPrototypeOf || {__proto__: []} instanceof Array && function (d, b) {
                        d.__proto__ = b
                    } || function (d, b) {
                        for (var a in b) b.hasOwnProperty(a) && (d[a] = b[a])
                    };
                return a(c, e)
            };
            return function (c, e) {
                function d() {
                    this.constructor = c
                }

                a(c, e);
                c.prototype = null === e ? Object.create(e) : (d.prototype = e.prototype, new d)
            }
        }(), t = p.unhideChartElementFromAT, v = p.getChartTitle, g = w.doc, n = q.stripHTMLTagsFromString;
        return function (a) {
            function c() {
                return null !== a && a.apply(this, arguments) || this
            }

            l(c, a);
            c.prototype.onChartUpdate = function () {
                this.handleSVGTitleElement();
                this.setSVGContainerLabel();
                this.setGraphicContainerAttrs();
                this.setRenderToAttrs();
                this.makeCreditsAccessible()
            };
            c.prototype.handleSVGTitleElement = function () {
                var a = this.chart, d = "highcharts-title-" + a.index,
                    b = n(a.langFormat("accessibility.svgContainerTitle", {chartTitle: v(a)}));
                if (b.length) {
                    var c = this.svgTitleElement = this.svgTitleElement || g.createElementNS("http://www.w3.org/2000/svg", "title");
                    c.textContent = b;
                    c.id = d;
                    a.renderTo.insertBefore(c, a.renderTo.firstChild)
                }
            };
            c.prototype.setSVGContainerLabel =
                function () {
                    var a = this.chart, d = a.langFormat("accessibility.svgContainerLabel", {chartTitle: v(a)});
                    a.renderer.box && d.length && a.renderer.box.setAttribute("aria-label", d)
                };
            c.prototype.setGraphicContainerAttrs = function () {
                var a = this.chart, d = a.langFormat("accessibility.graphicContainerLabel", {chartTitle: v(a)});
                d.length && a.container.setAttribute("aria-label", d)
            };
            c.prototype.setRenderToAttrs = function () {
                var a = this.chart, d = "disabled" !== a.options.accessibility.landmarkVerbosity,
                    b = a.langFormat("accessibility.chartContainerLabel",
                        {title: v(a), chart: a});
                b && (a.renderTo.setAttribute("role", d ? "region" : "group"), a.renderTo.setAttribute("aria-label", b))
            };
            c.prototype.makeCreditsAccessible = function () {
                var a = this.chart, d = a.credits;
                d && (d.textStr && d.element.setAttribute("aria-label", a.langFormat("accessibility.credits", {creditsStr: n(d.textStr)})), t(a, d.element))
            };
            c.prototype.getKeyboardNavigation = function () {
                var a = this.chart;
                return new h(a, {
                    keyCodeMap: [], validate: function () {
                        return !0
                    }, init: function () {
                        var d = a.accessibility;
                        d && d.keyboardNavigation.tabindexContainer.focus()
                    }
                })
            };
            c.prototype.destroy = function () {
                this.chart.renderTo.setAttribute("aria-hidden", !0)
            };
            return c
        }(a)
    });
    x(a, "Accessibility/FocusBorder.js", [a["Core/Renderer/SVG/SVGLabel.js"], a["Core/Utilities.js"]], function (a, h) {
        var p = h.addEvent, t = h.pick, q;
        (function (h) {
            function l() {
                var b = this.focusElement, d = this.options.accessibility.keyboardNavigation.focusBorder;
                b && (b.removeFocusBorder(), d.enabled && b.addFocusBorder(d.margin, {
                    stroke: d.style.color,
                    strokeWidth: d.style.lineWidth,
                    r: d.style.borderRadius
                }))
            }

            function v(b, d) {
                var a =
                    this.options.accessibility.keyboardNavigation.focusBorder;
                (d = d || b.element) && d.focus && (d.hcEvents && d.hcEvents.focusin || p(d, "focusin", function () {
                }), d.focus(), a.hideBrowserFocusOutline && (d.style.outline = "none"));
                this.focusElement && this.focusElement.removeFocusBorder();
                this.focusElement = b;
                this.renderFocusBorder()
            }

            function g(b) {
                if (!b.focusBorderDestroyHook) {
                    var d = b.destroy;
                    b.destroy = function () {
                        b.focusBorder && b.focusBorder.destroy && b.focusBorder.destroy();
                        return d.apply(b, arguments)
                    };
                    b.focusBorderDestroyHook =
                        d
                }
            }

            function n(b, d) {
                this.focusBorder && this.removeFocusBorder();
                var c = this.getBBox(), f = t(b, 3), e = this.parentGroup, y = this.scaleX || e && e.scaleX,
                    n = this.scaleY || e && e.scaleY;
                y = (y ? !n : n) ? Math.abs(y || n || 1) : (Math.abs(y || 1) + Math.abs(n || 1)) / 2;
                c.x += this.translateX ? this.translateX : 0;
                c.y += this.translateY ? this.translateY : 0;
                n = c.x - f;
                var h = c.y - f, E = c.width + 2 * f, C = c.height + 2 * f, D = this instanceof a;
                if ("text" === this.element.nodeName || D) {
                    var v = !!this.rotation;
                    if (D) var u = {x: v ? 1 : 0, y: 0}; else {
                        var m = u = 0;
                        "middle" === this.attr("text-anchor") ?
                            u = m = .5 : this.rotation ? u = .25 : m = .75;
                        u = {x: u, y: m}
                    }
                    m = +this.attr("x");
                    var r = +this.attr("y");
                    isNaN(m) || (n = m - c.width * u.x - f);
                    isNaN(r) || (h = r - c.height * u.y - f);
                    D && v && (D = E, E = C, C = D, isNaN(m) || (n = m - c.height * u.x - f), isNaN(r) || (h = r - c.width * u.y - f))
                }
                this.focusBorder = this.renderer.rect(n, h, E, C, parseInt((d && d.r || 0).toString(), 10) / y).addClass("highcharts-focus-border").attr({zIndex: 99}).add(e);
                this.renderer.styledMode || this.focusBorder.attr({
                    stroke: d && d.stroke,
                    "stroke-width": (d && d.strokeWidth || 0) / y
                });
                k(this, b, d);
                g(this)
            }

            function k(d) {
                for (var a =
                    [], c = 1; c < arguments.length; c++) a[c - 1] = arguments[c];
                d.focusBorderUpdateHooks || (d.focusBorderUpdateHooks = {}, b.forEach(function (b) {
                    b += "Setter";
                    var c = d[b] || d._defaultSetter;
                    d.focusBorderUpdateHooks[b] = c;
                    d[b] = function () {
                        var b = c.apply(d, arguments);
                        d.addFocusBorder.apply(d, a);
                        return b
                    }
                }))
            }

            function c() {
                e(this);
                this.focusBorderDestroyHook && (this.destroy = this.focusBorderDestroyHook, delete this.focusBorderDestroyHook);
                this.focusBorder && (this.focusBorder.destroy(), delete this.focusBorder)
            }

            function e(b) {
                b.focusBorderUpdateHooks &&
                (Object.keys(b.focusBorderUpdateHooks).forEach(function (d) {
                    var a = b.focusBorderUpdateHooks[d];
                    a === b._defaultSetter ? delete b[d] : b[d] = a
                }), delete b.focusBorderUpdateHooks)
            }

            var d = [], b = "x y transform width height r d stroke-width".split(" ");
            h.compose = function (b, a) {
                -1 === d.indexOf(b) && (d.push(b), b = b.prototype, b.renderFocusBorder = l, b.setFocusToElement = v);
                -1 === d.indexOf(a) && (d.push(a), a = a.prototype, a.addFocusBorder = n, a.removeFocusBorder = c)
            }
        })(q || (q = {}));
        return q
    });
    x(a, "Accessibility/Utils/Announcer.js", [a["Core/Renderer/HTML/AST.js"],
        a["Accessibility/Utils/DOMElementProvider.js"], a["Core/Globals.js"], a["Accessibility/Utils/HTMLUtilities.js"], a["Core/Utilities.js"]], function (a, h, p, w, q) {
        var l = p.doc, t = w.addClass, v = w.visuallyHideElement, g = q.attr;
        return function () {
            function n(a, c) {
                this.chart = a;
                this.domElementProvider = new h;
                this.announceRegion = this.addAnnounceRegion(c)
            }

            n.prototype.destroy = function () {
                this.domElementProvider.destroyCreatedElements()
            };
            n.prototype.announce = function (k) {
                var c = this;
                a.setElementHTML(this.announceRegion, k);
                this.clearAnnouncementRegionTimer &&
                clearTimeout(this.clearAnnouncementRegionTimer);
                this.clearAnnouncementRegionTimer = setTimeout(function () {
                    c.announceRegion.innerHTML = a.emptyHTML;
                    delete c.clearAnnouncementRegionTimer
                }, 1E3)
            };
            n.prototype.addAnnounceRegion = function (a) {
                var c = this.chart.announcerContainer || this.createAnnouncerContainer(),
                    e = this.domElementProvider.createElement("div");
                g(e, {"aria-hidden": !1, "aria-live": a});
                this.chart.styledMode ? t(e, "highcharts-visually-hidden") : v(e);
                c.appendChild(e);
                return e
            };
            n.prototype.createAnnouncerContainer =
                function () {
                    var a = this.chart, c = l.createElement("div");
                    g(c, {"aria-hidden": !1, "class": "highcharts-announcer-container"});
                    c.style.position = "relative";
                    a.renderTo.insertBefore(c, a.renderTo.firstChild);
                    return a.announcerContainer = c
                };
            return n
        }()
    });
    x(a, "Accessibility/Components/AnnotationsA11y.js", [a["Accessibility/Utils/HTMLUtilities.js"]], function (a) {
        function h(a) {
            return (a.annotations || []).reduce(function (a, n) {
                n.options && !1 !== n.options.visible && (a = a.concat(n.labels));
                return a
            }, [])
        }

        function p(a) {
            return a.options &&
                a.options.accessibility && a.options.accessibility.description || a.graphic && a.graphic.text && a.graphic.text.textStr || ""
        }

        function t(a) {
            var g = a.options && a.options.accessibility && a.options.accessibility.description;
            if (g) return g;
            g = a.chart;
            var n = p(a), k = a.points.filter(function (a) {
                    return !!a.graphic
                }).map(function (a) {
                    var b = a.accessibility && a.accessibility.valueDescription || a.graphic && a.graphic.element && a.graphic.element.getAttribute("aria-label") || "";
                    a = a && a.series.name || "";
                    return (a ? a + ", " : "") + "data point " +
                        b
                }).filter(function (a) {
                    return !!a
                }), c = k.length,
                e = "accessibility.screenReaderSection.annotations.description" + (1 < c ? "MultiplePoints" : c ? "SinglePoint" : "NoPoints");
            a = {
                annotationText: n,
                annotation: a,
                numPoints: c,
                annotationPoint: k[0],
                additionalAnnotationPoints: k.slice(1)
            };
            return g.langFormat(e, a)
        }

        function q(a) {
            return h(a).map(function (a) {
                return (a = l(G(t(a)))) ? "<li>".concat(a, "</li>") : ""
            })
        }

        var l = a.escapeStringForHTML, G = a.stripHTMLTagsFromString;
        return {
            getAnnotationsInfoHTML: function (a) {
                var g = a.annotations;
                if (!g ||
                    !g.length) return "";
                a = q(a);
                return '<ul style="list-style-type: none">'.concat(a.join(" "), "</ul>")
            }, getAnnotationLabelDescription: t, getAnnotationListItems: q, getPointAnnotationTexts: function (a) {
                var g = h(a.series.chart).filter(function (g) {
                    return -1 < g.points.indexOf(a)
                });
                return g.length ? g.map(function (a) {
                    return "".concat(p(a))
                }) : []
            }
        }
    });
    x(a, "Accessibility/Components/InfoRegionsComponent.js", [a["Accessibility/A11yI18n.js"], a["Accessibility/AccessibilityComponent.js"], a["Accessibility/Utils/Announcer.js"], a["Accessibility/Components/AnnotationsA11y.js"],
        a["Core/Renderer/HTML/AST.js"], a["Accessibility/Utils/ChartUtilities.js"], a["Core/FormatUtilities.js"], a["Core/Globals.js"], a["Accessibility/Utils/HTMLUtilities.js"], a["Core/Utilities.js"]], function (a, h, p, w, q, l, G, v, g, n) {
        function k(a, b) {
            var d = b[0], r = a.series && a.series[0] || {};
            r = {
                numSeries: a.series.length,
                numPoints: r.points && r.points.length,
                chart: a,
                mapTitle: a.mapView && a.mapView.geoMap && a.mapView.geoMap.title
            };
            if (!d) return a.langFormat("accessibility.chartTypes.emptyChart", r);
            if ("map" === d) return r.mapTitle ?
                a.langFormat("accessibility.chartTypes.mapTypeDescription", r) : a.langFormat("accessibility.chartTypes.unknownMap", r);
            if (1 < a.types.length) return a.langFormat("accessibility.chartTypes.combinationChart", r);
            b = b[0];
            d = a.langFormat("accessibility.seriesTypeDescriptions." + b, r);
            var c = a.series && 2 > a.series.length ? "Single" : "Multiple";
            return (a.langFormat("accessibility.chartTypes." + b + c, r) || a.langFormat("accessibility.chartTypes.default" + c, r)) + (d ? " " + d : "")
        }

        var c = this && this.__extends || function () {
                var a = function (b,
                                  d) {
                    a = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (a, b) {
                        a.__proto__ = b
                    } || function (a, b) {
                        for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d])
                    };
                    return a(b, d)
                };
                return function (b, d) {
                    function r() {
                        this.constructor = b
                    }

                    a(b, d);
                    b.prototype = null === d ? Object.create(d) : (r.prototype = d.prototype, new r)
                }
            }(), e = w.getAnnotationsInfoHTML, d = l.getAxisDescription, b = l.getAxisRangeDescription, f = l.getChartTitle,
            y = l.unhideChartElementFromAT, z = G.format, K = v.doc, t = g.addClass, x = g.getElement,
            B = g.getHeadingTagNameForElement,
            A = g.stripHTMLTagsFromString, E = g.visuallyHideElement, C = n.attr, D = n.pick;
        return function (g) {
            function u() {
                var a = null !== g && g.apply(this, arguments) || this;
                a.announcer = void 0;
                a.screenReaderSections = {};
                return a
            }

            c(u, g);
            u.prototype.init = function () {
                var a = this.chart, b = this;
                this.initRegionsDefinitions();
                this.addEvent(a, "aftergetTableAST", function (a) {
                    b.onDataTableCreated(a)
                });
                this.addEvent(a, "afterViewData", function (a) {
                    b.dataTableDiv = a;
                    setTimeout(function () {
                        b.focusDataTable()
                    }, 300)
                });
                this.announcer = new p(a, "assertive")
            };
            u.prototype.initRegionsDefinitions = function () {
                var a = this;
                this.screenReaderSections = {
                    before: {
                        element: null, buildContent: function (b) {
                            var d = b.options.accessibility.screenReaderSection.beforeChartFormatter;
                            return d ? d(b) : a.defaultBeforeChartFormatter(b)
                        }, insertIntoDOM: function (a, b) {
                            b.renderTo.insertBefore(a, b.renderTo.firstChild)
                        }, afterInserted: function () {
                            "undefined" !== typeof a.sonifyButtonId && a.initSonifyButton(a.sonifyButtonId);
                            "undefined" !== typeof a.dataTableButtonId && a.initDataTableButton(a.dataTableButtonId)
                        }
                    },
                    after: {
                        element: null, buildContent: function (b) {
                            var d = b.options.accessibility.screenReaderSection.afterChartFormatter;
                            return d ? d(b) : a.defaultAfterChartFormatter()
                        }, insertIntoDOM: function (a, b) {
                            b.renderTo.insertBefore(a, b.container.nextSibling)
                        }, afterInserted: function () {
                            a.chart.accessibility && a.chart.accessibility.keyboardNavigation.updateExitAnchor()
                        }
                    }
                }
            };
            u.prototype.onChartRender = function () {
                var a = this;
                this.linkedDescriptionElement = this.getLinkedDescriptionElement();
                this.setLinkedDescriptionAttrs();
                Object.keys(this.screenReaderSections).forEach(function (b) {
                    a.updateScreenReaderSection(b)
                })
            };
            u.prototype.getLinkedDescriptionElement = function () {
                var a = this.chart.options.accessibility.linkedDescription;
                if (a) {
                    if ("string" !== typeof a) return a;
                    a = z(a, this.chart);
                    a = K.querySelectorAll(a);
                    if (1 === a.length) return a[0]
                }
            };
            u.prototype.setLinkedDescriptionAttrs = function () {
                var a = this.linkedDescriptionElement;
                a && (a.setAttribute("aria-hidden", "true"), t(a, "highcharts-linked-description"))
            };
            u.prototype.updateScreenReaderSection = function (a) {
                var b = this.chart, d = this.screenReaderSections[a], c = d.buildContent(b),
                    m = d.element = d.element || this.createElement("div"),
                    f = m.firstChild || this.createElement("div");
                c ? (this.setScreenReaderSectionAttribs(m, a), q.setElementHTML(f, c), m.appendChild(f), d.insertIntoDOM(m, b), b.styledMode ? t(f, "highcharts-visually-hidden") : E(f), y(b, f), d.afterInserted && d.afterInserted()) : (m.parentNode && m.parentNode.removeChild(m), d.element = null)
            };
            u.prototype.setScreenReaderSectionAttribs = function (a, b) {
                var d = this.chart, c = d.langFormat("accessibility.screenReaderSection." + b + "RegionLabel", {
                    chart: d,
                    chartTitle: f(d)
                });
                b = "highcharts-screen-reader-region-".concat(b, "-").concat(d.index);
                C(a, {id: b, "aria-label": c || void 0});
                a.style.position = "relative";
                c && a.setAttribute("role", "all" === d.options.accessibility.landmarkVerbosity ? "region" : "group")
            };
            u.prototype.defaultBeforeChartFormatter = function () {
                var b = this.chart, d = b.options.accessibility.screenReaderSection.beforeChartFormat;
                if (!d) return "";
                var c = this.getAxesDescription(),
                    I = b.sonify && b.options.sonification && b.options.sonification.enabled,
                    H = "highcharts-a11y-sonify-data-btn-" +
                        b.index, u = "hc-linkto-highcharts-data-table-" + b.index, y = e(b),
                    g = b.langFormat("accessibility.screenReaderSection.annotations.heading", {chart: b});
                c = {
                    headingTagName: B(b.renderTo),
                    chartTitle: f(b),
                    typeDescription: this.getTypeDescriptionText(),
                    chartSubtitle: this.getSubtitleText(),
                    chartLongdesc: this.getLongdescText(),
                    xAxisDescription: c.xAxis,
                    yAxisDescription: c.yAxis,
                    playAsSoundButton: I ? this.getSonifyButtonText(H) : "",
                    viewTableButton: b.getCSV ? this.getDataTableButtonText(u) : "",
                    annotationsTitle: y ? g : "",
                    annotationsList: y
                };
                b = a.i18nFormat(d, c, b);
                this.dataTableButtonId = u;
                this.sonifyButtonId = H;
                return b.replace(/<(\w+)[^>]*?>\s*<\/\1>/g, "")
            };
            u.prototype.defaultAfterChartFormatter = function () {
                var b = this.chart, d = b.options.accessibility.screenReaderSection.afterChartFormat;
                if (!d) return "";
                var c = {endOfChartMarker: this.getEndOfChartMarkerText()};
                return a.i18nFormat(d, c, b).replace(/<(\w+)[^>]*?>\s*<\/\1>/g, "")
            };
            u.prototype.getLinkedDescription = function () {
                var a = this.linkedDescriptionElement;
                return A(a && a.innerHTML || "")
            };
            u.prototype.getLongdescText =
                function () {
                    var a = this.chart.options, b = a.caption;
                    b = b && b.text;
                    var d = this.getLinkedDescription();
                    return a.accessibility.description || d || b || ""
                };
            u.prototype.getTypeDescriptionText = function () {
                var a = this.chart;
                return a.types ? a.options.accessibility.typeDescription || k(a, a.types) : ""
            };
            u.prototype.getDataTableButtonText = function (a) {
                var b = this.chart;
                b = b.langFormat("accessibility.table.viewAsDataTableButtonText", {chart: b, chartTitle: f(b)});
                return '<button id="' + a + '">' + b + "</button>"
            };
            u.prototype.getSonifyButtonText =
                function (a) {
                    var b = this.chart;
                    if (b.options.sonification && !1 === b.options.sonification.enabled) return "";
                    b = b.langFormat("accessibility.sonification.playAsSoundButtonText", {chart: b, chartTitle: f(b)});
                    return '<button id="' + a + '">' + b + "</button>"
                };
            u.prototype.getSubtitleText = function () {
                var a = this.chart.options.subtitle;
                return A(a && a.text || "")
            };
            u.prototype.getEndOfChartMarkerText = function () {
                var a = this.chart, b = a.langFormat("accessibility.screenReaderSection.endOfChartMarker", {chart: a});
                return '<div id="highcharts-end-of-chart-marker-' +
                    a.index + '">' + b + "</div>"
            };
            u.prototype.onDataTableCreated = function (a) {
                var b = this.chart;
                if (b.options.accessibility.enabled) {
                    this.viewDataTableButton && this.viewDataTableButton.setAttribute("aria-expanded", "true");
                    var d = a.tree.attributes || {};
                    d.tabindex = -1;
                    d.summary = b.langFormat("accessibility.table.tableSummary", {chart: b});
                    a.tree.attributes = d
                }
            };
            u.prototype.focusDataTable = function () {
                var a = this.dataTableDiv;
                (a = a && a.getElementsByTagName("table")[0]) && a.focus && a.focus()
            };
            u.prototype.initSonifyButton = function (a) {
                var b =
                    this, d = this.sonifyButton = x(a), c = this.chart, f = function (a) {
                    d && (d.setAttribute("aria-hidden", "true"), d.setAttribute("aria-label", ""));
                    a.preventDefault();
                    a.stopPropagation();
                    a = c.langFormat("accessibility.sonification.playAsSoundClickAnnouncement", {chart: c});
                    b.announcer.announce(a);
                    setTimeout(function () {
                        d && (d.removeAttribute("aria-hidden"), d.removeAttribute("aria-label"));
                        c.sonify && c.sonify()
                    }, 1E3)
                };
                d && c && (d.setAttribute("tabindex", -1), d.onclick = function (a) {
                    (c.options.accessibility && c.options.accessibility.screenReaderSection.onPlayAsSoundClick ||
                        f).call(this, a, c)
                })
            };
            u.prototype.initDataTableButton = function (a) {
                var b = this.viewDataTableButton = x(a), d = this.chart;
                a = a.replace("hc-linkto-", "");
                b && (C(b, {
                    tabindex: -1,
                    "aria-expanded": !!x(a)
                }), b.onclick = d.options.accessibility.screenReaderSection.onViewDataTableClick || function () {
                    d.viewData()
                })
            };
            u.prototype.getAxesDescription = function () {
                var a = this.chart, b = function (b, d) {
                        b = a[b];
                        return 1 < b.length || b[0] && D(b[0].options.accessibility && b[0].options.accessibility.enabled, d)
                    }, d = !!a.types && 0 > a.types.indexOf("map") &&
                        0 > a.types.indexOf("treemap") && 0 > a.types.indexOf("tilemap"), c = !!a.hasCartesianSeries,
                    f = b("xAxis", !a.angular && c && d);
                b = b("yAxis", c && d);
                d = {};
                f && (d.xAxis = this.getAxisDescriptionText("xAxis"));
                b && (d.yAxis = this.getAxisDescriptionText("yAxis"));
                return d
            };
            u.prototype.getAxisDescriptionText = function (a) {
                var c = this.chart, f = c[a];
                return c.langFormat("accessibility.axis." + a + "Description" + (1 < f.length ? "Plural" : "Singular"), {
                    chart: c,
                    names: f.map(function (a) {
                        return d(a)
                    }),
                    ranges: f.map(function (a) {
                        return b(a)
                    }),
                    numAxes: f.length
                })
            };
            u.prototype.destroy = function () {
                this.announcer && this.announcer.destroy()
            };
            return u
        }(h)
    });
    x(a, "Accessibility/Components/MenuComponent.js", [a["Core/Chart/Chart.js"], a["Core/Utilities.js"], a["Accessibility/AccessibilityComponent.js"], a["Accessibility/KeyboardNavigationHandler.js"], a["Accessibility/Utils/ChartUtilities.js"], a["Accessibility/Utils/HTMLUtilities.js"]], function (a, h, p, w, q, l) {
        var t = this && this.__extends || function () {
            var a = function (c, d) {
                a = Object.setPrototypeOf || {__proto__: []} instanceof Array &&
                    function (a, d) {
                        a.__proto__ = d
                    } || function (a, d) {
                        for (var b in d) d.hasOwnProperty(b) && (a[b] = d[b])
                    };
                return a(c, d)
            };
            return function (c, d) {
                function b() {
                    this.constructor = c
                }

                a(c, d);
                c.prototype = null === d ? Object.create(d) : (b.prototype = d.prototype, new b)
            }
        }(), v = h.attr, g = q.getChartTitle, n = q.unhideChartElementFromAT, k = l.getFakeMouseEvent;
        h = function (a) {
            function c() {
                return null !== a && a.apply(this, arguments) || this
            }

            t(c, a);
            c.prototype.init = function () {
                var a = this.chart, b = this;
                this.addEvent(a, "exportMenuShown", function () {
                    b.onMenuShown()
                });
                this.addEvent(a, "exportMenuHidden", function () {
                    b.onMenuHidden()
                });
                this.createProxyGroup()
            };
            c.prototype.onMenuHidden = function () {
                var a = this.chart.exportContextMenu;
                a && a.setAttribute("aria-hidden", "true");
                this.setExportButtonExpandedState("false")
            };
            c.prototype.onMenuShown = function () {
                var a = this.chart, b = a.exportContextMenu;
                b && (this.addAccessibleContextMenuAttribs(), n(a, b));
                this.setExportButtonExpandedState("true")
            };
            c.prototype.setExportButtonExpandedState = function (a) {
                this.exportButtonProxy && this.exportButtonProxy.buttonElement.setAttribute("aria-expanded",
                    a)
            };
            c.prototype.onChartRender = function () {
                var a = this.chart, b = a.focusElement, c = a.accessibility;
                this.proxyProvider.clearGroup("chartMenu");
                this.proxyMenuButton();
                this.exportButtonProxy && b && b === a.exportingGroup && (b.focusBorder ? a.setFocusToElement(b, this.exportButtonProxy.buttonElement) : c && c.keyboardNavigation.tabindexContainer.focus())
            };
            c.prototype.proxyMenuButton = function () {
                var a = this.chart, b = this.proxyProvider, c = a.exportSVGElements && a.exportSVGElements[0],
                    e = a.options.exporting, k = a.exportSVGElements &&
                        a.exportSVGElements[0];
                e && !1 !== e.enabled && e.accessibility && e.accessibility.enabled && k && k.element && c && (this.exportButtonProxy = b.addProxyElement("chartMenu", {click: c}, {
                    "aria-label": a.langFormat("accessibility.exporting.menuButtonLabel", {
                        chart: a,
                        chartTitle: g(a)
                    }), "aria-expanded": !1, title: a.options.lang.contextButtonTitle || null
                }))
            };
            c.prototype.createProxyGroup = function () {
                this.chart && this.proxyProvider && this.proxyProvider.addGroup("chartMenu", "div")
            };
            c.prototype.addAccessibleContextMenuAttribs = function () {
                var a =
                    this.chart, b = a.exportDivElements;
                b && b.length && (b.forEach(function (a) {
                    a && ("LI" !== a.tagName || a.children && a.children.length ? a.setAttribute("aria-hidden", "true") : a.setAttribute("tabindex", -1))
                }), (b = b[0] && b[0].parentNode) && v(b, {
                    "aria-hidden": void 0,
                    "aria-label": a.langFormat("accessibility.exporting.chartMenuLabel", {chart: a}),
                    role: "list"
                }))
            };
            c.prototype.getKeyboardNavigation = function () {
                var a = this.keyCodes, b = this.chart, c = this;
                return new w(b, {
                    keyCodeMap: [[[a.left, a.up], function () {
                        return c.onKbdPrevious(this)
                    }],
                        [[a.right, a.down], function () {
                            return c.onKbdNext(this)
                        }], [[a.enter, a.space], function () {
                            return c.onKbdClick(this)
                        }]], validate: function () {
                        return !!b.exporting && !1 !== b.options.exporting.enabled && !1 !== b.options.exporting.accessibility.enabled
                    }, init: function () {
                        var a = c.exportButtonProxy, d = c.chart.exportingGroup;
                        a && d && b.setFocusToElement(d, a.buttonElement)
                    }, terminate: function () {
                        b.hideExportMenu()
                    }
                })
            };
            c.prototype.onKbdPrevious = function (a) {
                var b = this.chart, d = b.options.accessibility;
                a = a.response;
                for (var c = b.highlightedExportItemIx ||
                    0; c--;) if (b.highlightExportItem(c)) return a.success;
                return d.keyboardNavigation.wrapAround ? (b.highlightLastExportItem(), a.success) : a.prev
            };
            c.prototype.onKbdNext = function (a) {
                var b = this.chart, d = b.options.accessibility;
                a = a.response;
                for (var c = (b.highlightedExportItemIx || 0) + 1; c < b.exportDivElements.length; ++c) if (b.highlightExportItem(c)) return a.success;
                return d.keyboardNavigation.wrapAround ? (b.highlightExportItem(0), a.success) : a.next
            };
            c.prototype.onKbdClick = function (a) {
                var b = this.chart, d = b.exportDivElements[b.highlightedExportItemIx],
                    c = (b.exportSVGElements && b.exportSVGElements[0]).element;
                b.openMenu ? this.fakeClickEvent(d) : (this.fakeClickEvent(c), b.highlightExportItem(0));
                return a.response.success
            };
            return c
        }(p);
        (function (c) {
            function e() {
                var a = this.exportSVGElements && this.exportSVGElements[0];
                if (a && (a = a.element, a.onclick)) a.onclick(k("click"))
            }

            function d() {
                var a = this.exportDivElements;
                a && this.exportContextMenu && this.openMenu && (a.forEach(function (a) {
                    if (a && "highcharts-menu-item" === a.className && a.onmouseout) a.onmouseout(k("mouseout"))
                }),
                    this.highlightedExportItemIx = 0, this.exportContextMenu.hideMenu(), this.container.focus())
            }

            function b(a) {
                var b = this.exportDivElements && this.exportDivElements[a],
                    d = this.exportDivElements && this.exportDivElements[this.highlightedExportItemIx];
                if (b && "LI" === b.tagName && (!b.children || !b.children.length)) {
                    var c = !!(this.renderTo.getElementsByTagName("g")[0] || {}).focus;
                    b.focus && c && b.focus();
                    if (d && d.onmouseout) d.onmouseout(k("mouseout"));
                    if (b.onmouseover) b.onmouseover(k("mouseover"));
                    this.highlightedExportItemIx =
                        a;
                    return !0
                }
                return !1
            }

            function f() {
                if (this.exportDivElements) for (var a = this.exportDivElements.length; a--;) if (this.highlightExportItem(a)) return !0;
                return !1
            }

            var y = [];
            c.compose = function (c) {
                -1 === y.indexOf(c) && (y.push(c), c = a.prototype, c.hideExportMenu = d, c.highlightExportItem = b, c.highlightLastExportItem = f, c.showExportMenu = e)
            }
        })(h || (h = {}));
        return h
    });
    x(a, "Accessibility/KeyboardNavigation.js", [a["Core/Globals.js"], a["Accessibility/Components/MenuComponent.js"], a["Core/Utilities.js"], a["Accessibility/Utils/EventProvider.js"],
        a["Accessibility/Utils/HTMLUtilities.js"]], function (a, h, p, w, q) {
        var l = a.doc, t = a.win, v = p.addEvent, g = p.fireEvent, n = q.getElement;
        p = function () {
            function a(a, e) {
                this.components = this.chart = void 0;
                this.currentModuleIx = NaN;
                this.exitAnchor = this.eventProvider = void 0;
                this.modules = [];
                this.tabindexContainer = void 0;
                this.init(a, e)
            }

            a.prototype.init = function (a, e) {
                var d = this, b = this.eventProvider = new w;
                this.chart = a;
                this.components = e;
                this.modules = [];
                this.currentModuleIx = 0;
                this.update();
                b.addEvent(this.tabindexContainer,
                    "keydown", function (a) {
                        return d.onKeydown(a)
                    });
                b.addEvent(this.tabindexContainer, "focus", function (a) {
                    return d.onFocus(a)
                });
                ["mouseup", "touchend"].forEach(function (a) {
                    return b.addEvent(l, a, function () {
                        return d.onMouseUp()
                    })
                });
                ["mousedown", "touchstart"].forEach(function (c) {
                    return b.addEvent(a.renderTo, c, function () {
                        d.isClickingChart = !0
                    })
                });
                b.addEvent(a.renderTo, "mouseover", function () {
                    d.pointerIsOverChart = !0
                });
                b.addEvent(a.renderTo, "mouseout", function () {
                    d.pointerIsOverChart = !1
                })
            };
            a.prototype.update = function (a) {
                var c =
                    this.chart.options.accessibility;
                c = c && c.keyboardNavigation;
                var d = this.components;
                this.updateContainerTabindex();
                c && c.enabled && a && a.length ? (this.modules = a.reduce(function (a, c) {
                    c = d[c].getKeyboardNavigation();
                    return a.concat(c)
                }, []), this.updateExitAnchor()) : (this.modules = [], this.currentModuleIx = 0, this.removeExitAnchor())
            };
            a.prototype.updateExitAnchor = function () {
                var a = "highcharts-end-of-chart-marker-".concat(this.chart.index);
                a = n(a);
                this.removeExitAnchor();
                a ? (this.makeElementAnExitAnchor(a), this.exitAnchor =
                    a) : this.createExitAnchor()
            };
            a.prototype.move = function (a) {
                var c = this.modules && this.modules[this.currentModuleIx];
                c && c.terminate && c.terminate(a);
                this.chart.focusElement && this.chart.focusElement.removeFocusBorder();
                this.currentModuleIx += a;
                if (c = this.modules && this.modules[this.currentModuleIx]) {
                    if (c.validate && !c.validate()) return this.move(a);
                    if (c.init) return c.init(a), !0
                }
                this.currentModuleIx = 0;
                this.exiting = !0;
                0 < a ? this.exitAnchor && this.exitAnchor.focus() : this.tabindexContainer.focus();
                return !1
            };
            a.prototype.onFocus =
                function (a) {
                    var c = this.chart;
                    a = a.relatedTarget && c.container.contains(a.relatedTarget);
                    this.exiting || this.tabbingInBackwards || this.isClickingChart || a || (a = this.getFirstValidModuleIx(), null !== a && (this.currentModuleIx = a, this.modules[a].init(1)));
                    this.exiting = !1
                };
            a.prototype.onMouseUp = function () {
                delete this.isClickingChart;
                if (!this.keyboardReset) {
                    var a = this.chart;
                    if (!this.pointerIsOverChart) {
                        var e = this.modules && this.modules[this.currentModuleIx || 0];
                        e && e.terminate && e.terminate();
                        this.currentModuleIx = 0
                    }
                    a.focusElement &&
                    (a.focusElement.removeFocusBorder(), delete a.focusElement);
                    this.keyboardReset = !0
                }
            };
            a.prototype.onKeydown = function (a) {
                a = a || t.event;
                var c = this.modules && this.modules.length && this.modules[this.currentModuleIx], d;
                this.exiting = this.keyboardReset = !1;
                if (c) {
                    var b = c.run(a);
                    b === c.response.success ? d = !0 : b === c.response.prev ? d = this.move(-1) : b === c.response.next && (d = this.move(1));
                    d && (a.preventDefault(), a.stopPropagation())
                }
            };
            a.prototype.updateContainerTabindex = function () {
                var a = this.chart.options.accessibility;
                a = a &&
                    a.keyboardNavigation;
                a = !(a && !1 === a.enabled);
                var e = this.chart, d = e.container;
                e.renderTo.hasAttribute("tabindex") && (d.removeAttribute("tabindex"), d = e.renderTo);
                this.tabindexContainer = d;
                var b = d.getAttribute("tabindex");
                a && !b ? d.setAttribute("tabindex", "0") : a || e.container.removeAttribute("tabindex")
            };
            a.prototype.createExitAnchor = function () {
                var a = this.chart, e = this.exitAnchor = l.createElement("div");
                a.renderTo.appendChild(e);
                this.makeElementAnExitAnchor(e)
            };
            a.prototype.makeElementAnExitAnchor = function (a) {
                var c =
                    this.tabindexContainer.getAttribute("tabindex") || 0;
                a.setAttribute("class", "highcharts-exit-anchor");
                a.setAttribute("tabindex", c);
                a.setAttribute("aria-hidden", !1);
                this.addExitAnchorEventsToEl(a)
            };
            a.prototype.removeExitAnchor = function () {
                this.exitAnchor && this.exitAnchor.parentNode && (this.exitAnchor.parentNode.removeChild(this.exitAnchor), delete this.exitAnchor)
            };
            a.prototype.addExitAnchorEventsToEl = function (a) {
                var c = this.chart, d = this;
                this.eventProvider.addEvent(a, "focus", function (a) {
                    a = a || t.event;
                    var b =
                        !(a.relatedTarget && c.container.contains(a.relatedTarget) || d.exiting);
                    c.focusElement && delete c.focusElement;
                    b ? (d.tabbingInBackwards = !0, d.tabindexContainer.focus(), delete d.tabbingInBackwards, a.preventDefault(), d.modules && d.modules.length && (d.currentModuleIx = d.modules.length - 1, (a = d.modules[d.currentModuleIx]) && a.validate && !a.validate() ? d.move(-1) : a && a.init(-1))) : d.exiting = !1
                })
            };
            a.prototype.getFirstValidModuleIx = function () {
                for (var a = this.modules.length, e = 0; e < a; ++e) {
                    var d = this.modules[e];
                    if (!d.validate ||
                        d.validate()) return e
                }
                return null
            };
            a.prototype.destroy = function () {
                this.removeExitAnchor();
                this.eventProvider.removeAddedEvents();
                this.chart.container.removeAttribute("tabindex")
            };
            return a
        }();
        (function (k) {
            function c() {
                var a = this;
                g(this, "dismissPopupContent", {}, function () {
                    a.tooltip && a.tooltip.hide(0);
                    a.hideExportMenu()
                })
            }

            function e(b) {
                27 === (b.which || b.keyCode) && a.charts && a.charts.forEach(function (a) {
                    a && a.dismissPopupContent && a.dismissPopupContent()
                })
            }

            var d = [];
            k.compose = function (a) {
                h.compose(a);
                -1 ===
                d.indexOf(a) && (d.push(a), a.prototype.dismissPopupContent = c);
                -1 === d.indexOf(l) && (d.push(l), v(l, "keydown", e));
                return a
            }
        })(p || (p = {}));
        return p
    });
    x(a, "Accessibility/Components/LegendComponent.js", [a["Core/Animation/AnimationUtilities.js"], a["Core/Globals.js"], a["Core/Legend/Legend.js"], a["Core/Utilities.js"], a["Accessibility/AccessibilityComponent.js"], a["Accessibility/KeyboardNavigationHandler.js"], a["Accessibility/Utils/ChartUtilities.js"], a["Accessibility/Utils/HTMLUtilities.js"]], function (a, h, p, w,
                                                                                                                                                                                                                                                                                                                                                                               q, l, G, v) {
        function g(a) {
            var b = a.legend && a.legend.allItems, d = a.options.legend.accessibility || {};
            a = a.colorAxis && a.colorAxis.some(function (a) {
                return !a.dataClasses || !a.dataClasses.length
            });
            return !(!b || !b.length || a || !1 === d.enabled)
        }

        function n(a, d) {
            d.setState(a ? "hover" : "", !0);
            ["legendGroup", "legendItem", "legendSymbol"].forEach(function (c) {
                (c = (c = d[c]) && c.element || c) && b(c, a ? "mouseover" : "mouseout")
            })
        }

        var k = this && this.__extends || function () {
                var a = function (b, d) {
                    a = Object.setPrototypeOf || {__proto__: []} instanceof
                        Array && function (a, b) {
                            a.__proto__ = b
                        } || function (a, b) {
                            for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d])
                        };
                    return a(b, d)
                };
                return function (b, d) {
                    function c() {
                        this.constructor = b
                    }

                    a(b, d);
                    b.prototype = null === d ? Object.create(d) : (c.prototype = d.prototype, new c)
                }
            }(), c = a.animObject, e = h.doc, d = w.addEvent, b = w.fireEvent, f = w.isNumber, y = w.pick,
            z = w.syncTimeout, t = G.getChartTitle, x = v.stripHTMLTagsFromString, F = v.addClass, B = v.removeClass;
        a = function (a) {
            function b() {
                var b = null !== a && a.apply(this, arguments) || this;
                b.highlightedLegendItemIx =
                    NaN;
                b.proxyGroup = null;
                return b
            }

            k(b, a);
            b.prototype.init = function () {
                var a = this;
                this.recreateProxies();
                this.addEvent(p, "afterScroll", function () {
                    this.chart === a.chart && (a.proxyProvider.updateGroupProxyElementPositions("legend"), a.updateLegendItemProxyVisibility(), -1 < a.highlightedLegendItemIx && this.chart.highlightLegendItem(a.highlightedLegendItemIx))
                });
                this.addEvent(p, "afterPositionItem", function (b) {
                    this.chart === a.chart && this.chart.renderer && a.updateProxyPositionForItem(b.item)
                });
                this.addEvent(p, "afterRender",
                    function () {
                        this.chart === a.chart && this.chart.renderer && a.recreateProxies() && z(function () {
                            return a.proxyProvider.updateGroupProxyElementPositions("legend")
                        }, c(y(this.chart.renderer.globalAnimation, !0)).duration)
                    })
            };
            b.prototype.updateLegendItemProxyVisibility = function () {
                var a = this.chart, b = a.legend, d = b.currentPage || 1, c = b.clipHeight || 0;
                (b.allItems || []).forEach(function (f) {
                    if (f.a11yProxyElement) {
                        var r = f.a11yProxyElement.element, m = !1;
                        if (b.pages && b.pages.length) {
                            m = f.pageIx || 0;
                            var e = f._legendItemPos ? f._legendItemPos[1] :
                                0;
                            f = f.legendItem ? Math.round(f.legendItem.getBBox().height) : 0;
                            m = e + f - b.pages[m] > c || m !== d - 1
                        }
                        m ? a.styledMode ? F(r, "highcharts-a11y-invisible") : r.style.visibility = "hidden" : (B(r, "highcharts-a11y-invisible"), r.style.visibility = "")
                    }
                })
            };
            b.prototype.onChartRender = function () {
                g(this.chart) || this.removeProxies()
            };
            b.prototype.highlightAdjacentLegendPage = function (a) {
                var b = this.chart, d = b.legend;
                a = (d.currentPage || 1) + a;
                var c = d.pages || [];
                if (0 < a && a <= c.length) {
                    c = d.allItems.length;
                    for (var f = 0; f < c; ++f) if (d.allItems[f].pageIx +
                        1 === a) {
                        b.highlightLegendItem(f) && (this.highlightedLegendItemIx = f);
                        break
                    }
                }
            };
            b.prototype.updateProxyPositionForItem = function (a) {
                a.a11yProxyElement && a.a11yProxyElement.refreshPosition()
            };
            b.prototype.recreateProxies = function () {
                var a = e.activeElement, b = this.proxyGroup;
                a = a && b && b.contains(a);
                this.removeProxies();
                return g(this.chart) ? (this.addLegendProxyGroup(), this.proxyLegendItems(), this.updateLegendItemProxyVisibility(), this.updateLegendTitle(), a && this.chart.highlightLegendItem(this.highlightedLegendItemIx),
                    !0) : !1
            };
            b.prototype.removeProxies = function () {
                this.proxyProvider.removeGroup("legend")
            };
            b.prototype.updateLegendTitle = function () {
                var a = this.chart,
                    b = x((a.legend && a.legend.options.title && a.legend.options.title.text || "").replace(/<br ?\/?>/g, " "));
                a = a.langFormat("accessibility.legend.legendLabel" + (b ? "" : "NoTitle"), {
                    chart: a,
                    legendTitle: b,
                    chartTitle: t(a)
                });
                this.proxyProvider.updateGroupAttrs("legend", {"aria-label": a})
            };
            b.prototype.addLegendProxyGroup = function () {
                this.proxyGroup = this.proxyProvider.addGroup("legend",
                    "ul", {
                        "aria-label": "_placeholder_",
                        role: "all" === this.chart.options.accessibility.landmarkVerbosity ? "region" : null
                    })
            };
            b.prototype.proxyLegendItems = function () {
                var a = this;
                (this.chart.legend && this.chart.legend.allItems || []).forEach(function (b) {
                    b.legendItem && b.legendItem.element && a.proxyLegendItem(b)
                })
            };
            b.prototype.proxyLegendItem = function (a) {
                if (a.legendItem && a.legendGroup) {
                    var b = this.chart.langFormat("accessibility.legend.legendItem", {
                        chart: this.chart,
                        itemName: x(a.name),
                        item: a
                    });
                    a.a11yProxyElement = this.proxyProvider.addProxyElement("legend",
                        {
                            click: a.legendItem,
                            visual: (a.legendGroup.div ? a.legendItem : a.legendGroup).element
                        }, {tabindex: -1, "aria-pressed": a.visible, "aria-label": b})
                }
            };
            b.prototype.getKeyboardNavigation = function () {
                var a = this.keyCodes, b = this, d = this.chart;
                return new l(d, {
                    keyCodeMap: [[[a.left, a.right, a.up, a.down], function (a) {
                        return b.onKbdArrowKey(this, a)
                    }], [[a.enter, a.space], function (d) {
                        return h.isFirefox && d === a.space ? this.response.success : b.onKbdClick(this)
                    }], [[a.pageDown, a.pageUp], function (d) {
                        b.highlightAdjacentLegendPage(d ===
                        a.pageDown ? 1 : -1);
                        return this.response.success
                    }]], validate: function () {
                        return b.shouldHaveLegendNavigation()
                    }, init: function () {
                        d.highlightLegendItem(0);
                        b.highlightedLegendItemIx = 0
                    }, terminate: function () {
                        b.highlightedLegendItemIx = -1;
                        d.legend.allItems.forEach(function (a) {
                            return n(!1, a)
                        })
                    }
                })
            };
            b.prototype.onKbdArrowKey = function (a, b) {
                var d = this.keyCodes, c = a.response, f = this.chart, r = f.options.accessibility,
                    e = f.legend.allItems.length;
                b = b === d.left || b === d.up ? -1 : 1;
                if (f.highlightLegendItem(this.highlightedLegendItemIx +
                    b)) return this.highlightedLegendItemIx += b, c.success;
                1 < e && r.keyboardNavigation.wrapAround && a.init(b);
                return c.success
            };
            b.prototype.onKbdClick = function (a) {
                var b = this.chart.legend.allItems[this.highlightedLegendItemIx];
                b && b.a11yProxyElement && b.a11yProxyElement.click();
                return a.response.success
            };
            b.prototype.shouldHaveLegendNavigation = function () {
                if (!g(this.chart)) return !1;
                var a = this.chart, b = (a.options.legend || {}).accessibility || {};
                return !!(a.legend.display && b.keyboardNavigation && b.keyboardNavigation.enabled)
            };
            return b
        }(q);
        (function (a) {
            function b(a) {
                var b = this.legend.allItems,
                    d = this.accessibility && this.accessibility.components.legend.highlightedLegendItemIx, c = b[a];
                return c ? (f(d) && b[d] && n(!1, b[d]), b = this.legend, a = b.allItems[a].pageIx, d = b.currentPage, "undefined" !== typeof a && a + 1 !== d && b.scroll(1 + a - d), a = c.legendItem, b = c.a11yProxyElement && c.a11yProxyElement.buttonElement, a && a.element && b && this.setFocusToElement(a, b), n(!0, c), !0) : !1
            }

            function c(a) {
                var b = a.item;
                this.chart.options.accessibility.enabled && b && b.a11yProxyElement &&
                b.a11yProxyElement.buttonElement.setAttribute("aria-pressed", a.visible ? "true" : "false")
            }

            var e = [];
            a.compose = function (a, f) {
                -1 === e.indexOf(a) && (e.push(a), a.prototype.highlightLegendItem = b);
                -1 === e.indexOf(f) && (e.push(f), d(f, "afterColorizeItem", c))
            }
        })(a || (a = {}));
        return a
    });
    x(a, "Accessibility/Components/SeriesComponent/SeriesDescriber.js", [a["Accessibility/Components/AnnotationsA11y.js"], a["Accessibility/Utils/ChartUtilities.js"], a["Core/FormatUtilities.js"], a["Accessibility/Utils/HTMLUtilities.js"], a["Core/Utilities.js"]],
        function (a, h, p, w, q) {
            function l(a) {
                var b = a.index;
                return a.series && a.series.data && m(b) ? D(a.series.data, function (a) {
                    return !!(a && "undefined" !== typeof a.index && a.index > b && a.graphic && a.graphic.element)
                }) || null : null
            }

            function t(a) {
                var b = a.chart.options.accessibility.series.pointDescriptionEnabledThreshold;
                return !!(!1 !== b && a.points && a.points.length >= b)
            }

            function v(a) {
                var b = a.options.accessibility || {};
                return !t(a) && !b.exposeAsGroupOnly
            }

            function g(a) {
                var b = a.chart.options.accessibility.keyboardNavigation.seriesNavigation;
                return !(!a.points || !(a.points.length < b.pointNavigationEnabledThreshold || !1 === b.pointNavigationEnabledThreshold))
            }

            function n(a, b) {
                var d = a.series, c = d.chart;
                a = c.options.accessibility.point || {};
                var f = d.options.accessibility && d.options.accessibility.point || {};
                d = d.tooltipOptions || {};
                c = c.options.lang;
                return L(b) ? A(b, f.valueDecimals || a.valueDecimals || d.valueDecimals || -1, c.decimalPoint, c.accessibility.thousandsSep || c.thousandsSep) : b
            }

            function k(a) {
                var b = (a.options.accessibility || {}).description;
                return b && a.chart.langFormat("accessibility.series.description",
                    {description: b, series: a}) || ""
            }

            function c(a, b) {
                return a.chart.langFormat("accessibility.series." + b + "Description", {name: z(a[b]), series: a})
            }

            function e(a, b, d) {
                var c = b || "", f = d || "";
                return a.series.pointArrayMap.reduce(function (b, d) {
                    b += b.length ? ", " : "";
                    var r = n(a, u(a[d], a.options[d]));
                    return b + (d + ": " + c + r + f)
                }, "")
            }

            function d(a) {
                var b = a.series, d = 1 < b.chart.series.length || b.options.name, c = a.series;
                var f = c.chart;
                var r = c.options.accessibility;
                r = r && r.point && r.point.valueDescriptionFormat || f.options.accessibility.point.valueDescriptionFormat;
                c = u(c.xAxis && c.xAxis.options.accessibility && c.xAxis.options.accessibility.enabled, !f.angular);
                if (c) {
                    var g = a.series;
                    var k = g.chart;
                    var z = g.options.accessibility && g.options.accessibility.point || {},
                        h = k.options.accessibility.point || {};
                    (g = g.xAxis && g.xAxis.dateTime) ? (g = g.getXDateFormat(a.x || 0, k.options.tooltip.dateTimeLabelFormats), z = z.dateFormatter && z.dateFormatter(a) || h.dateFormatter && h.dateFormatter(a) || z.dateFormat || h.dateFormat || g, k = k.time.dateFormat(z, a.x || 0, void 0)) : k = void 0;
                    z = (a.series.xAxis || {}).categories &&
                        m(a.category) && ("" + a.category).replace("<br/>", " ");
                    h = m(a.id) && 0 > ("" + a.id).indexOf("highcharts-");
                    g = "x, " + a.x;
                    k = a.name || k || z || (h ? a.id : g)
                } else k = "";
                z = m(a.index) ? a.index + 1 : "";
                h = a.series;
                var l = h.chart.options.accessibility.point || {},
                    p = h.chart.options.accessibility && h.chart.options.accessibility.point || {},
                    E = h.tooltipOptions || {};
                g = p.valuePrefix || l.valuePrefix || E.valuePrefix || "";
                l = p.valueSuffix || l.valueSuffix || E.valueSuffix || "";
                p = n(a, a["undefined" !== typeof a.value ? "value" : "y"]);
                h = a.isNull ? h.chart.langFormat("accessibility.series.nullPointValue",
                    {point: a}) : h.pointArrayMap ? e(a, g, l) : g + p + l;
                f = B(r, {point: a, index: z, xDescription: k, value: h, separator: c ? ", " : ""}, f);
                r = (r = a.options && a.options.accessibility && a.options.accessibility.description) ? " " + r : "";
                b = d ? " " + b.name + "." : "";
                d = a.series.chart;
                c = y(a);
                k = {point: a, annotations: c};
                d = c.length ? d.langFormat("accessibility.series.pointAnnotationsDescription", k) : "";
                a.accessibility = a.accessibility || {};
                a.accessibility.valueDescription = f;
                return f + r + b + (d ? " " + d : "")
            }

            function b(a) {
                var b = v(a), c = g(a), f = a.chart.options.accessibility.point.describeNull;
                (b || c) && a.points.forEach(function (c) {
                    var e;
                    if (!(e = c.graphic && c.graphic.element)) {
                        var r = c.series;
                        e = r && r.chart;
                        r = r && r.is("sunburst");
                        e = e && e.options.accessibility.point.describeNull;
                        if (e = c.isNull && !r && e) {
                            r = c.series;
                            var m = l(c);
                            r = (e = m && m.graphic) ? e.parentGroup : r.graph || r.group;
                            m = m ? {x: u(c.plotX, m.plotX, 0), y: u(c.plotY, m.plotY, 0)} : {
                                x: u(c.plotX, 0),
                                y: u(c.plotY, 0)
                            };
                            m = c.series.chart.renderer.rect(m.x, m.y, 1, 1);
                            m.attr({
                                "class": "highcharts-a11y-dummy-point",
                                fill: "none",
                                opacity: 0,
                                "fill-opacity": 0,
                                "stroke-opacity": 0
                            });
                            r && r.element ? (c.graphic = m, c.hasDummyGraphic = !0, m.add(r), r.element.insertBefore(m.element, e ? e.element : null), e = m.element) : e = void 0
                        }
                    }
                    r = c.options && c.options.accessibility && !1 === c.options.accessibility.enabled;
                    e && (c.isNull && !f ? e.setAttribute("aria-hidden", !0) : (e.setAttribute("tabindex", "-1"), a.chart.styledMode || (e.style.outline = "none"), b && !r ? (m = c.series, r = m.chart.options.accessibility.point || {}, m = m.options.accessibility && m.options.accessibility.point || {}, c = C(m.descriptionFormatter && m.descriptionFormatter(c) ||
                        r.descriptionFormatter && r.descriptionFormatter(c) || d(c)), e.setAttribute("role", "img"), e.setAttribute("aria-label", c)) : e.setAttribute("aria-hidden", !0)))
                })
            }

            function f(a) {
                var b = a.chart, d = b.types || [], f = k(a), e = function (d) {
                    return b[d] && 1 < b[d].length && a[d]
                }, m = a.index + 1, r = c(a, "xAxis"), g = c(a, "yAxis"), y = {seriesNumber: m, series: a, chart: b};
                d = 1 < d.length ? "Combination" : "";
                y = b.langFormat("accessibility.series.summary." + a.type + d, y) || b.langFormat("accessibility.series.summary.default" + d, y);
                e = (e("yAxis") ? " " + g + "." :
                    "") + (e("xAxis") ? " " + r + "." : "");
                return B(b.options.accessibility.series.descriptionFormat || "", {
                    seriesDescription: y,
                    authorDescription: f ? " " + f : "",
                    axisDescription: e,
                    series: a,
                    chart: b,
                    seriesNumber: m
                }, void 0)
            }

            var y = a.getPointAnnotationTexts, z = h.getAxisDescription, K = h.getSeriesFirstPointElement,
                x = h.getSeriesA11yElement, F = h.unhideChartElementFromAT, B = p.format, A = p.numberFormat,
                E = w.reverseChildNodes, C = w.stripHTMLTagsFromString, D = q.find, L = q.isNumber, u = q.pick,
                m = q.defined;
            return {
                defaultPointDescriptionFormatter: d,
                defaultSeriesDescriptionFormatter: f, describeSeries: function (a) {
                    var d = a.chart, c = K(a), e = x(a), m = d.is3d && d.is3d();
                    if (e) {
                        e.lastChild !== c || m || E(e);
                        b(a);
                        F(d, e);
                        m = a.chart;
                        d = m.options.chart;
                        c = 1 < m.series.length;
                        m = m.options.accessibility.series.describeSingleSeries;
                        var r = (a.options.accessibility || {}).exposeAsGroupOnly;
                        d.options3d && d.options3d.enabled && c || !(c || m || r || t(a)) ? e.removeAttribute("aria-label") : (d = a.chart.options.accessibility, c = d.landmarkVerbosity, (a.options.accessibility || {}).exposeAsGroupOnly ? e.setAttribute("role",
                            "img") : "all" === c ? e.setAttribute("role", "region") : e.setAttribute("role", "group"), e.setAttribute("tabindex", "-1"), a.chart.styledMode || (e.style.outline = "none"), e.setAttribute("aria-label", C(d.series.descriptionFormatter && d.series.descriptionFormatter(a) || f(a))))
                    }
                }
            }
        });
    x(a, "Accessibility/Components/SeriesComponent/NewDataAnnouncer.js", [a["Core/Globals.js"], a["Core/Utilities.js"], a["Accessibility/Utils/Announcer.js"], a["Accessibility/Utils/ChartUtilities.js"], a["Accessibility/Utils/EventProvider.js"], a["Accessibility/Components/SeriesComponent/SeriesDescriber.js"]],
        function (a, h, p, w, q, l) {
            function t(a) {
                var b = a.series.data.filter(function (b) {
                    return a.x === b.x && a.y === b.y
                });
                return 1 === b.length ? b[0] : a
            }

            function v(a, b) {
                var d = (a || []).concat(b || []).reduce(function (a, b) {
                    a[b.name + b.index] = b;
                    return a
                }, {});
                return Object.keys(d).map(function (a) {
                    return d[a]
                })
            }

            var g = h.addEvent, n = h.defined, k = w.getChartTitle, c = l.defaultPointDescriptionFormatter,
                e = l.defaultSeriesDescriptionFormatter;
            h = function () {
                function d(a) {
                    this.announcer = void 0;
                    this.dirty = {allSeries: {}};
                    this.eventProvider = void 0;
                    this.lastAnnouncementTime = 0;
                    this.chart = a
                }

                d.prototype.init = function () {
                    var a = this.chart,
                        d = a.options.accessibility.announceNewData.interruptUser ? "assertive" : "polite";
                    this.lastAnnouncementTime = 0;
                    this.dirty = {allSeries: {}};
                    this.eventProvider = new q;
                    this.announcer = new p(a, d);
                    this.addEventListeners()
                };
                d.prototype.destroy = function () {
                    this.eventProvider.removeAddedEvents();
                    this.announcer.destroy()
                };
                d.prototype.addEventListeners = function () {
                    var a = this, d = this.chart, c = this.eventProvider;
                    c.addEvent(d, "afterApplyDrilldown",
                        function () {
                            a.lastAnnouncementTime = 0
                        });
                    c.addEvent(d, "afterAddSeries", function (b) {
                        a.onSeriesAdded(b.series)
                    });
                    c.addEvent(d, "redraw", function () {
                        a.announceDirtyData()
                    })
                };
                d.prototype.onSeriesAdded = function (a) {
                    this.chart.options.accessibility.announceNewData.enabled && (this.dirty.hasDirty = !0, this.dirty.allSeries[a.name + a.index] = a, this.dirty.newSeries = n(this.dirty.newSeries) ? void 0 : a)
                };
                d.prototype.announceDirtyData = function () {
                    var a = this;
                    if (this.chart.options.accessibility.announceNewData && this.dirty.hasDirty) {
                        var d =
                            this.dirty.newPoint;
                        d && (d = t(d));
                        this.queueAnnouncement(Object.keys(this.dirty.allSeries).map(function (b) {
                            return a.dirty.allSeries[b]
                        }), this.dirty.newSeries, d);
                        this.dirty = {allSeries: {}}
                    }
                };
                d.prototype.queueAnnouncement = function (a, d, c) {
                    var b = this, e = this.chart.options.accessibility.announceNewData;
                    if (e.enabled) {
                        var f = +new Date;
                        e = Math.max(0, e.minAnnounceInterval - (f - this.lastAnnouncementTime));
                        a = v(this.queuedAnnouncement && this.queuedAnnouncement.series, a);
                        if (d = this.buildAnnouncementMessage(a, d, c)) this.queuedAnnouncement &&
                        clearTimeout(this.queuedAnnouncementTimer), this.queuedAnnouncement = {
                            time: f,
                            message: d,
                            series: a
                        }, this.queuedAnnouncementTimer = setTimeout(function () {
                            b && b.announcer && (b.lastAnnouncementTime = +new Date, b.announcer.announce(b.queuedAnnouncement.message), delete b.queuedAnnouncement, delete b.queuedAnnouncementTimer)
                        }, e)
                    }
                };
                d.prototype.buildAnnouncementMessage = function (b, d, g) {
                    var f = this.chart, y = f.options.accessibility.announceNewData;
                    if (y.announcementFormatter && (b = y.announcementFormatter(b, d, g), !1 !== b)) return b.length ?
                        b : null;
                    b = a.charts && 1 < a.charts.length ? "Multiple" : "Single";
                    b = d ? "newSeriesAnnounce" + b : g ? "newPointAnnounce" + b : "newDataAnnounce";
                    y = k(f);
                    return f.langFormat("accessibility.announceNewData." + b, {
                        chartTitle: y,
                        seriesDesc: d ? e(d) : null,
                        pointDesc: g ? c(g) : null,
                        point: g,
                        series: d
                    })
                };
                return d
            }();
            (function (a) {
                function b(a) {
                    var b = this.chart, d = this.newDataAnnouncer;
                    d && d.chart === b && b.options.accessibility.announceNewData.enabled && (d.dirty.newPoint = n(d.dirty.newPoint) ? void 0 : a.point)
                }

                function d() {
                    var a = this.chart, b = this.newDataAnnouncer;
                    b && b.chart === a && a.options.accessibility.announceNewData.enabled && (b.dirty.hasDirty = !0, b.dirty.allSeries[this.name + this.index] = this)
                }

                a.composedClasses = [];
                a.compose = function (c) {
                    -1 === a.composedClasses.indexOf(c) && (a.composedClasses.push(c), g(c, "addPoint", b), g(c, "updatedData", d))
                }
            })(h || (h = {}));
            return h
        });
    x(a, "Accessibility/ProxyElement.js", [a["Core/Globals.js"], a["Core/Utilities.js"], a["Accessibility/Utils/EventProvider.js"], a["Accessibility/Utils/ChartUtilities.js"], a["Accessibility/Utils/HTMLUtilities.js"]],
        function (a, h, p, w, q) {
            var l = a.doc, t = h.attr, v = h.css, g = h.merge, n = w.fireEventOnWrappedOrUnwrappedElement,
                k = q.cloneMouseEvent, c = q.cloneTouchEvent, e = q.getFakeMouseEvent, d = q.removeElement;
            return function () {
                function a(a, b, d, c) {
                    this.chart = a;
                    this.target = b;
                    this.groupType = d;
                    d = "ul" === d;
                    this.eventProvider = new p;
                    var e = d ? l.createElement("li") : null, f = this.buttonElement = l.createElement("button");
                    a.styledMode || this.hideButtonVisually(f);
                    e ? (d && !a.styledMode && (e.style.listStyle = "none"), e.appendChild(f), this.element = e) :
                        this.element = f;
                    this.updateTarget(b, c)
                }

                a.prototype.click = function () {
                    var a = this.getTargetPosition();
                    a.x += a.width / 2;
                    a.y += a.height / 2;
                    a = e("click", a);
                    n(this.target.click, a)
                };
                a.prototype.updateTarget = function (a, b) {
                    this.target = a;
                    this.updateCSSClassName();
                    var d = b || {};
                    Object.keys(d).forEach(function (a) {
                        null === d[a] && delete d[a]
                    });
                    t(this.buttonElement, g({"aria-label": this.getTargetAttr(a.click, "aria-label")}, d));
                    this.eventProvider.removeAddedEvents();
                    this.addProxyEventsToButton(this.buttonElement, a.click);
                    this.refreshPosition()
                };
                a.prototype.refreshPosition = function () {
                    var a = this.getTargetPosition();
                    v(this.buttonElement, {
                        width: (a.width || 1) + "px",
                        height: (a.height || 1) + "px",
                        left: (Math.round(a.x) || 0) + "px",
                        top: (Math.round(a.y) || 0) + "px"
                    })
                };
                a.prototype.remove = function () {
                    this.eventProvider.removeAddedEvents();
                    d(this.element)
                };
                a.prototype.updateCSSClassName = function () {
                    var a = this.chart.legend;
                    a = a.group && a.group.div;
                    a = -1 < (a && a.className || "").indexOf("highcharts-no-tooltip");
                    var b = -1 < (this.getTargetAttr(this.target.click, "class") || "").indexOf("highcharts-no-tooltip");
                    this.buttonElement.className = a || b ? "highcharts-a11y-proxy-button highcharts-no-tooltip" : "highcharts-a11y-proxy-button"
                };
                a.prototype.addProxyEventsToButton = function (a, b) {
                    var d = this;
                    "click touchstart touchend touchcancel touchmove mouseover mouseenter mouseleave mouseout".split(" ").forEach(function (e) {
                        var f = 0 === e.indexOf("touch");
                        d.eventProvider.addEvent(a, e, function (a) {
                            var d = f ? c(a) : k(a);
                            b && n(b, d);
                            a.stopPropagation();
                            f || a.preventDefault()
                        }, {passive: !1})
                    })
                };
                a.prototype.hideButtonVisually = function (a) {
                    v(a,
                        {
                            borderWidth: 0,
                            backgroundColor: "transparent",
                            cursor: "pointer",
                            outline: "none",
                            opacity: .001,
                            filter: "alpha(opacity=1)",
                            zIndex: 999,
                            overflow: "hidden",
                            padding: 0,
                            margin: 0,
                            display: "block",
                            position: "absolute",
                            "-ms-filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity=1)"
                        })
                };
                a.prototype.getTargetPosition = function () {
                    var a = this.target.click;
                    a = a.element ? a.element : a;
                    a = this.target.visual || a;
                    if (this.chart.renderTo && a && a.getBoundingClientRect) {
                        a = a.getBoundingClientRect();
                        var b = this.chart.pointer.getChartPosition();
                        return {
                            x: (a.left - b.left) / b.scaleX,
                            y: (a.top - b.top) / b.scaleY,
                            width: a.right / b.scaleX - a.left / b.scaleX,
                            height: a.bottom / b.scaleY - a.top / b.scaleY
                        }
                    }
                    return {x: 0, y: 0, width: 1, height: 1}
                };
                a.prototype.getTargetAttr = function (a, b) {
                    return a.element ? a.element.getAttribute(b) : a.getAttribute(b)
                };
                return a
            }()
        });
    x(a, "Accessibility/ProxyProvider.js", [a["Core/Globals.js"], a["Core/Utilities.js"], a["Accessibility/Utils/ChartUtilities.js"], a["Accessibility/Utils/DOMElementProvider.js"], a["Accessibility/Utils/HTMLUtilities.js"],
        a["Accessibility/ProxyElement.js"]], function (a, h, p, w, q, l) {
        var t = a.doc, v = h.attr, g = h.css, n = p.unhideChartElementFromAT, k = q.removeElement,
            c = q.removeChildNodes;
        return function () {
            function a(a) {
                this.chart = a;
                this.domElementProvider = new w;
                this.groups = {};
                this.groupOrder = [];
                this.beforeChartProxyPosContainer = this.createProxyPosContainer("before");
                this.afterChartProxyPosContainer = this.createProxyPosContainer("after");
                this.update()
            }

            a.prototype.addProxyElement = function (a, b, c) {
                var d = this.groups[a];
                if (!d) throw Error("ProxyProvider.addProxyElement: Invalid group key " +
                    a);
                a = new l(this.chart, b, d.type, c);
                d.proxyContainerElement.appendChild(a.element);
                d.proxyElements.push(a);
                return a
            };
            a.prototype.addGroup = function (a, b, c) {
                var d = this.groups[a];
                if (d) return d.groupElement;
                d = this.domElementProvider.createElement(b);
                if (c && c.role && "div" !== b) {
                    var e = this.domElementProvider.createElement("div");
                    e.appendChild(d)
                } else e = d;
                e.className = "highcharts-a11y-proxy-group highcharts-a11y-proxy-group-" + a.replace(/\W/g, "-");
                this.groups[a] = {proxyContainerElement: d, groupElement: e, type: b, proxyElements: []};
                v(e, c || {});
                "ul" === b && d.setAttribute("role", "list");
                this.afterChartProxyPosContainer.appendChild(e);
                this.updateGroupOrder(this.groupOrder);
                return e
            };
            a.prototype.updateGroupAttrs = function (a, b) {
                var d = this.groups[a];
                if (!d) throw Error("ProxyProvider.updateGroupAttrs: Invalid group key " + a);
                v(d.groupElement, b)
            };
            a.prototype.updateGroupOrder = function (a) {
                var b = this;
                this.groupOrder = a.slice();
                if (!this.isDOMOrderGroupOrder()) {
                    var d = a.indexOf("series"), e = -1 < d ? a.slice(0, d) : a, g = -1 < d ? a.slice(d + 1) : [];
                    a = t.activeElement;
                    ["before", "after"].forEach(function (a) {
                        var d = b["before" === a ? "beforeChartProxyPosContainer" : "afterChartProxyPosContainer"];
                        a = "before" === a ? e : g;
                        c(d);
                        a.forEach(function (a) {
                            (a = b.groups[a]) && d.appendChild(a.groupElement)
                        })
                    });
                    (this.beforeChartProxyPosContainer.contains(a) || this.afterChartProxyPosContainer.contains(a)) && a && a.focus && a.focus()
                }
            };
            a.prototype.clearGroup = function (a) {
                var b = this.groups[a];
                if (!b) throw Error("ProxyProvider.clearGroup: Invalid group key " + a);
                c(b.proxyContainerElement)
            };
            a.prototype.removeGroup =
                function (a) {
                    var b = this.groups[a];
                    b && (k(b.groupElement), delete this.groups[a])
                };
            a.prototype.update = function () {
                this.updatePosContainerPositions();
                this.updateGroupOrder(this.groupOrder);
                this.updateProxyElementPositions()
            };
            a.prototype.updateProxyElementPositions = function () {
                Object.keys(this.groups).forEach(this.updateGroupProxyElementPositions.bind(this))
            };
            a.prototype.updateGroupProxyElementPositions = function (a) {
                (a = this.groups[a]) && a.proxyElements.forEach(function (a) {
                    return a.refreshPosition()
                })
            };
            a.prototype.destroy =
                function () {
                    this.domElementProvider.destroyCreatedElements()
                };
            a.prototype.createProxyPosContainer = function (a) {
                var b = this.domElementProvider.createElement("div");
                b.setAttribute("aria-hidden", "false");
                b.className = "highcharts-a11y-proxy-container" + (a ? "-" + a : "");
                g(b, {top: "0", left: "0"});
                this.chart.styledMode || (b.style.whiteSpace = "nowrap", b.style.position = "absolute");
                return b
            };
            a.prototype.getCurrentGroupOrderInDOM = function () {
                var a = this, b = function (b) {
                    var d = [];
                    b = b.children;
                    for (var c = 0; c < b.length; ++c) {
                        a:{
                            var e =
                                b[c];
                            for (var f = Object.keys(a.groups), g = f.length; g--;) {
                                var k = f[g], h = a.groups[k];
                                if (h && e === h.groupElement) {
                                    e = k;
                                    break a
                                }
                            }
                            e = void 0
                        }
                        e && d.push(e)
                    }
                    return d
                }, c = b(this.beforeChartProxyPosContainer);
                b = b(this.afterChartProxyPosContainer);
                c.push("series");
                return c.concat(b)
            };
            a.prototype.isDOMOrderGroupOrder = function () {
                var a = this, b = this.getCurrentGroupOrderInDOM(), c = this.groupOrder.filter(function (b) {
                    return "series" === b || !!a.groups[b]
                }), e = b.length;
                if (e !== c.length) return !1;
                for (; e--;) if (b[e] !== c[e]) return !1;
                return !0
            };
            a.prototype.updatePosContainerPositions = function () {
                var a = this.chart;
                if (!a.renderer.forExport) {
                    var b = a.renderer.box;
                    a.container.insertBefore(this.afterChartProxyPosContainer, b.nextSibling);
                    a.container.insertBefore(this.beforeChartProxyPosContainer, b);
                    n(this.chart, this.afterChartProxyPosContainer);
                    n(this.chart, this.beforeChartProxyPosContainer)
                }
            };
            return a
        }()
    });
    x(a, "Extensions/RangeSelector.js", [a["Core/Axis/Axis.js"], a["Core/Chart/Chart.js"], a["Core/Globals.js"], a["Core/DefaultOptions.js"], a["Core/Renderer/SVG/SVGElement.js"],
        a["Core/Utilities.js"]], function (a, h, p, w, q, l) {
        function t(a) {
            if (-1 !== a.indexOf("%L")) return "text";
            var b = "aAdewbBmoyY".split("").some(function (b) {
                return -1 !== a.indexOf("%" + b)
            }), d = "HkIlMS".split("").some(function (b) {
                return -1 !== a.indexOf("%" + b)
            });
            return b && d ? "datetime-local" : b ? "date" : d ? "time" : "text"
        }

        var v = w.defaultOptions, g = l.addEvent, n = l.createElement, k = l.css, c = l.defined,
            e = l.destroyObjectProperties, d = l.discardElement, b = l.extend, f = l.find, y = l.fireEvent,
            z = l.isNumber, x = l.merge, J = l.objectEach, F = l.pad, B = l.pick,
            A = l.pInt, E = l.splat;
        b(v, {
            rangeSelector: {
                allButtonsEnabled: !1,
                buttons: void 0,
                buttonSpacing: 5,
                dropdown: "responsive",
                enabled: void 0,
                verticalAlign: "top",
                buttonTheme: {width: 28, height: 18, padding: 2, zIndex: 7},
                floating: !1,
                x: 0,
                y: 0,
                height: void 0,
                inputBoxBorderColor: "none",
                inputBoxHeight: 17,
                inputBoxWidth: void 0,
                inputDateFormat: "%b %e, %Y",
                inputDateParser: void 0,
                inputEditDateFormat: "%Y-%m-%d",
                inputEnabled: !0,
                inputPosition: {align: "right", x: 0, y: 0},
                inputSpacing: 5,
                selected: void 0,
                buttonPosition: {align: "left", x: 0, y: 0},
                inputStyle: {color: "#335cad", cursor: "pointer"},
                labelStyle: {color: "#666666"}
            }
        });
        b(v.lang, {rangeSelectorZoom: "Zoom", rangeSelectorFrom: "", rangeSelectorTo: "\u2192"});
        var C = function () {
            function f(a) {
                this.buttons = void 0;
                this.buttonOptions = f.prototype.defaultButtons;
                this.initialButtonGroupWidth = 0;
                this.options = void 0;
                this.chart = a;
                this.init(a)
            }

            f.prototype.clickButton = function (b, d) {
                var e = this.chart, m = this.buttonOptions[b], f = e.xAxis[0],
                    r = e.scroller && e.scroller.getUnionExtremes() || f || {}, k = r.dataMin, h = r.dataMax,
                    n = f && Math.round(Math.min(f.max, B(h, f.max))), u = m.type;
                r = m._range;
                var l, p = m.dataGrouping;
                var q = !0;
                if (null !== k && null !== h) {
                    e.fixedRange = r;
                    this.setSelected(b);
                    p && (this.forcedDataGrouping = !0, a.prototype.setDataGrouping.call(f || {chart: this.chart}, p, !1), this.frozenStates = m.preserveDataGrouping);
                    if ("month" === u || "year" === u) if (f) {
                        q = {range: m, max: n, chart: e, dataMin: k, dataMax: h};
                        var A = f.minFromRange.call(q);
                        z(q.newMax) && (n = q.newMax);
                        q = !1
                    } else r = m; else if (r) A = Math.max(n - r, k), n = Math.min(A + r, h), q = !1; else if ("ytd" ===
                        u) if (f) {
                        if ("undefined" === typeof h || "undefined" === typeof k) k = Number.MAX_VALUE, h = Number.MIN_VALUE, e.series.forEach(function (a) {
                            if (a = a.xData) k = Math.min(a[0], k), h = Math.max(a[a.length - 1], h)
                        }), d = !1;
                        n = this.getYTDExtremes(h, k, e.time.useUTC);
                        A = l = n.min;
                        n = n.max
                    } else {
                        this.deferredYTDClick = b;
                        return
                    } else "all" === u && f && (e.navigator && e.navigator.baseSeries[0] && (e.navigator.baseSeries[0].xAxis.options.range = void 0), A = k, n = h);
                    q && m._offsetMin && c(A) && (A += m._offsetMin);
                    m._offsetMax && c(n) && (n += m._offsetMax);
                    this.dropdown &&
                    (this.dropdown.selectedIndex = b + 1);
                    if (f) f.setExtremes(A, n, B(d, !0), void 0, {
                        trigger: "rangeSelectorButton",
                        rangeSelectorButton: m
                    }); else {
                        var t = E(e.options.xAxis)[0];
                        var w = t.range;
                        t.range = r;
                        var v = t.min;
                        t.min = l;
                        g(e, "load", function () {
                            t.range = w;
                            t.min = v
                        })
                    }
                    y(this, "afterBtnClick")
                }
            };
            f.prototype.setSelected = function (a) {
                this.selected = this.options.selected = a
            };
            f.prototype.init = function (a) {
                var b = this, d = a.options.rangeSelector, c = d.buttons || b.defaultButtons.slice(), e = d.selected,
                    m = function () {
                        var a = b.minInput, d = b.maxInput;
                        a && a.blur && y(a, "blur");
                        d && d.blur && y(d, "blur")
                    };
                b.chart = a;
                b.options = d;
                b.buttons = [];
                b.buttonOptions = c;
                this.eventsToUnbind = [];
                this.eventsToUnbind.push(g(a.container, "mousedown", m));
                this.eventsToUnbind.push(g(a, "resize", m));
                c.forEach(b.computeButtonRange);
                "undefined" !== typeof e && c[e] && this.clickButton(e, !1);
                this.eventsToUnbind.push(g(a, "load", function () {
                    a.xAxis && a.xAxis[0] && g(a.xAxis[0], "setExtremes", function (d) {
                        this.max - this.min !== a.fixedRange && "rangeSelectorButton" !== d.trigger && "updatedData" !== d.trigger &&
                        b.forcedDataGrouping && !b.frozenStates && this.setDataGrouping(!1, !1)
                    })
                }))
            };
            f.prototype.updateButtonStates = function () {
                var a = this, b = this.chart, d = this.dropdown, c = b.xAxis[0], e = Math.round(c.max - c.min),
                    f = !c.hasVisibleSeries, g = b.scroller && b.scroller.getUnionExtremes() || c, k = g.dataMin,
                    h = g.dataMax;
                b = a.getYTDExtremes(h, k, b.time.useUTC);
                var n = b.min, u = b.max, y = a.selected, l = z(y), p = a.options.allButtonsEnabled, q = a.buttons;
                a.buttonOptions.forEach(function (b, m) {
                    var r = b._range, g = b.type, I = b.count || 1, N = q[m], H = 0, M = b._offsetMax -
                        b._offsetMin;
                    b = m === y;
                    var O = r > h - k, A = r < c.minRange, E = !1, t = !1;
                    r = r === e;
                    ("month" === g || "year" === g) && e + 36E5 >= 864E5 * {
                        month: 28,
                        year: 365
                    }[g] * I - M && e - 36E5 <= 864E5 * {
                        month: 31,
                        year: 366
                    }[g] * I + M ? r = !0 : "ytd" === g ? (r = u - n + M === e, E = !b) : "all" === g && (r = c.max - c.min >= h - k, t = !b && l && r);
                    g = !p && (O || A || t || f);
                    I = b && r || r && !l && !E || b && a.frozenStates;
                    g ? H = 3 : I && (l = !0, H = 2);
                    N.state !== H && (N.setState(H), d && (d.options[m + 1].disabled = g, 2 === H && (d.selectedIndex = m + 1)), 0 === H && y === m && a.setSelected())
                })
            };
            f.prototype.computeButtonRange = function (a) {
                var b = a.type,
                    d = a.count || 1,
                    c = {millisecond: 1, second: 1E3, minute: 6E4, hour: 36E5, day: 864E5, week: 6048E5};
                if (c[b]) a._range = c[b] * d; else if ("month" === b || "year" === b) a._range = 864E5 * {
                    month: 30,
                    year: 365
                }[b] * d;
                a._offsetMin = B(a.offsetMin, 0);
                a._offsetMax = B(a.offsetMax, 0);
                a._range += a._offsetMax - a._offsetMin
            };
            f.prototype.getInputValue = function (a) {
                a = "min" === a ? this.minInput : this.maxInput;
                var b = this.chart.options.rangeSelector, d = this.chart.time;
                return a ? ("text" === a.type && b.inputDateParser || this.defaultInputDateParser)(a.value, d.useUTC,
                    d) : 0
            };
            f.prototype.setInputValue = function (a, b) {
                var d = this.options, e = this.chart.time, f = "min" === a ? this.minInput : this.maxInput;
                a = "min" === a ? this.minDateBox : this.maxDateBox;
                if (f) {
                    var m = f.getAttribute("data-hc-time");
                    m = c(m) ? Number(m) : void 0;
                    c(b) && (c(m) && f.setAttribute("data-hc-time-previous", m), f.setAttribute("data-hc-time", b), m = b);
                    f.value = e.dateFormat(this.inputTypeFormats[f.type] || d.inputEditDateFormat, m);
                    a && a.attr({text: e.dateFormat(d.inputDateFormat, m)})
                }
            };
            f.prototype.setInputExtremes = function (a, b, d) {
                if (a =
                    "min" === a ? this.minInput : this.maxInput) {
                    var c = this.inputTypeFormats[a.type], e = this.chart.time;
                    c && (b = e.dateFormat(c, b), a.min !== b && (a.min = b), d = e.dateFormat(c, d), a.max !== d && (a.max = d))
                }
            };
            f.prototype.showInput = function (a) {
                var b = "min" === a ? this.minDateBox : this.maxDateBox;
                if ((a = "min" === a ? this.minInput : this.maxInput) && b && this.inputGroup) {
                    var d = "text" === a.type, c = this.inputGroup, e = c.translateX;
                    c = c.translateY;
                    var f = this.options.inputBoxWidth;
                    k(a, {
                        width: d ? b.width + (f ? -2 : 20) + "px" : "auto", height: d ? b.height - 2 + "px" :
                            "auto", border: "2px solid silver"
                    });
                    d && f ? k(a, {
                        left: e + b.x + "px",
                        top: c + "px"
                    }) : k(a, {
                        left: Math.min(Math.round(b.x + e - (a.offsetWidth - b.width) / 2), this.chart.chartWidth - a.offsetWidth) + "px",
                        top: c - (a.offsetHeight - b.height) / 2 + "px"
                    })
                }
            };
            f.prototype.hideInput = function (a) {
                (a = "min" === a ? this.minInput : this.maxInput) && k(a, {
                    top: "-9999em",
                    border: 0,
                    width: "1px",
                    height: "1px"
                })
            };
            f.prototype.defaultInputDateParser = function (a, b, d) {
                var c = a.split("/").join("-").split(" ").join("T");
                -1 === c.indexOf("T") && (c += "T00:00");
                if (b) c += "Z";
                else {
                    var e;
                    if (e = p.isSafari) e = c, e = !(6 < e.length && (e.lastIndexOf("-") === e.length - 6 || e.lastIndexOf("+") === e.length - 6));
                    e && (e = (new Date(c)).getTimezoneOffset() / 60, c += 0 >= e ? "+".concat(F(-e), ":00") : "-".concat(F(e), ":00"))
                }
                c = Date.parse(c);
                z(c) || (a = a.split("-"), c = Date.UTC(A(a[0]), A(a[1]) - 1, A(a[2])));
                d && b && z(c) && (c += d.getTimezoneOffset(c));
                return c
            };
            f.prototype.drawInput = function (a) {
                function d() {
                    var b = m.getInputValue(a), d = c.xAxis[0],
                        e = c.scroller && c.scroller.xAxis ? c.scroller.xAxis : d, f = e.dataMin;
                    e = e.dataMax;
                    var r =
                        m.maxInput, g = m.minInput;
                    b !== Number(q.getAttribute("data-hc-time-previous")) && z(b) && (q.setAttribute("data-hc-time-previous", b), y && r && z(f) ? b > Number(r.getAttribute("data-hc-time")) ? b = void 0 : b < f && (b = f) : g && z(e) && (b < Number(g.getAttribute("data-hc-time")) ? b = void 0 : b > e && (b = e)), "undefined" !== typeof b && d.setExtremes(y ? b : d.min, y ? d.max : b, void 0, void 0, {trigger: "rangeSelectorInput"}))
                }

                var c = this.chart, e = this.div, f = this.inputGroup, m = this, g = c.renderer.style || {},
                    h = c.renderer, u = c.options.rangeSelector, y = "min" === a,
                    l = v.lang[y ? "rangeSelectorFrom" : "rangeSelectorTo"] || "";
                l = h.label(l, 0).addClass("highcharts-range-label").attr({
                    padding: l ? 2 : 0,
                    height: l ? u.inputBoxHeight : 0
                }).add(f);
                h = h.label("", 0).addClass("highcharts-range-input").attr({
                    padding: 2,
                    width: u.inputBoxWidth,
                    height: u.inputBoxHeight,
                    "text-align": "center"
                }).on("click", function () {
                    m.showInput(a);
                    m[a + "Input"].focus()
                });
                c.styledMode || h.attr({stroke: u.inputBoxBorderColor, "stroke-width": 1});
                h.add(f);
                var q = n("input", {name: a, className: "highcharts-range-selector"}, void 0,
                    e);
                q.setAttribute("type", t(u.inputDateFormat || "%b %e, %Y"));
                c.styledMode || (l.css(x(g, u.labelStyle)), h.css(x({color: "#333333"}, g, u.inputStyle)), k(q, b({
                    position: "absolute",
                    border: 0,
                    boxShadow: "0 0 15px rgba(0,0,0,0.3)",
                    width: "1px",
                    height: "1px",
                    padding: 0,
                    textAlign: "center",
                    fontSize: g.fontSize,
                    fontFamily: g.fontFamily,
                    top: "-9999em"
                }, u.inputStyle)));
                q.onfocus = function () {
                    m.showInput(a)
                };
                q.onblur = function () {
                    q === p.doc.activeElement && d();
                    m.hideInput(a);
                    m.setInputValue(a);
                    q.blur()
                };
                var A = !1;
                q.onchange = function () {
                    A ||
                    (d(), m.hideInput(a), q.blur())
                };
                q.onkeypress = function (a) {
                    13 === a.keyCode && d()
                };
                q.onkeydown = function (a) {
                    A = !0;
                    38 !== a.keyCode && 40 !== a.keyCode || d()
                };
                q.onkeyup = function () {
                    A = !1
                };
                return {dateBox: h, input: q, label: l}
            };
            f.prototype.getPosition = function () {
                var a = this.chart, b = a.options.rangeSelector;
                a = "top" === b.verticalAlign ? a.plotTop - a.axisOffset[0] : 0;
                return {buttonTop: a + b.buttonPosition.y, inputTop: a + b.inputPosition.y - 10}
            };
            f.prototype.getYTDExtremes = function (a, b, d) {
                var c = this.chart.time, e = new c.Date(a), f = c.get("FullYear",
                    e);
                d = d ? c.Date.UTC(f, 0, 1) : +new c.Date(f, 0, 1);
                b = Math.max(b, d);
                e = e.getTime();
                return {max: Math.min(a || e, e), min: b}
            };
            f.prototype.render = function (a, b) {
                var d = this.chart, e = d.renderer, f = d.container, m = d.options, r = m.rangeSelector,
                    g = B(m.chart.style && m.chart.style.zIndex, 0) + 1;
                m = r.inputEnabled;
                if (!1 !== r.enabled) {
                    this.rendered || (this.group = e.g("range-selector-group").attr({zIndex: 7}).add(), this.div = n("div", void 0, {
                        position: "relative",
                        height: 0,
                        zIndex: g
                    }), this.buttonOptions.length && this.renderButtons(), f.parentNode &&
                    f.parentNode.insertBefore(this.div, f), m && (this.inputGroup = e.g("input-group").add(this.group), e = this.drawInput("min"), this.minDateBox = e.dateBox, this.minLabel = e.label, this.minInput = e.input, e = this.drawInput("max"), this.maxDateBox = e.dateBox, this.maxLabel = e.label, this.maxInput = e.input));
                    if (m && (this.setInputValue("min", a), this.setInputValue("max", b), a = d.scroller && d.scroller.getUnionExtremes() || d.xAxis[0] || {}, c(a.dataMin) && c(a.dataMax) && (d = d.xAxis[0].minRange || 0, this.setInputExtremes("min", a.dataMin, Math.min(a.dataMax,
                        this.getInputValue("max")) - d), this.setInputExtremes("max", Math.max(a.dataMin, this.getInputValue("min")) + d, a.dataMax)), this.inputGroup)) {
                        var k = 0;
                        [this.minLabel, this.minDateBox, this.maxLabel, this.maxDateBox].forEach(function (a) {
                            if (a) {
                                var b = a.getBBox().width;
                                b && (a.attr({x: k}), k += b + r.inputSpacing)
                            }
                        })
                    }
                    this.alignElements();
                    this.rendered = !0
                }
            };
            f.prototype.renderButtons = function () {
                var a = this, b = this.buttons, d = this.options, c = v.lang, e = this.chart.renderer,
                    f = x(d.buttonTheme), k = f && f.states, h = f.width || 28;
                delete f.width;
                delete f.states;
                this.buttonGroup = e.g("range-selector-buttons").add(this.group);
                var u = this.dropdown = n("select", void 0, {
                    position: "absolute",
                    width: "1px",
                    height: "1px",
                    padding: 0,
                    border: 0,
                    top: "-9999em",
                    cursor: "pointer",
                    opacity: .0001
                }, this.div);
                g(u, "touchstart", function () {
                    u.style.fontSize = "16px"
                });
                [[p.isMS ? "mouseover" : "mouseenter"], [p.isMS ? "mouseout" : "mouseleave"], ["change", "click"]].forEach(function (d) {
                    var c = d[0], e = d[1];
                    g(u, c, function () {
                        var d = b[a.currentButtonIndex()];
                        d && y(d.element, e || c)
                    })
                });
                this.zoomText =
                    e.label(c && c.rangeSelectorZoom || "", 0).attr({
                        padding: d.buttonTheme.padding,
                        height: d.buttonTheme.height,
                        paddingLeft: 0,
                        paddingRight: 0
                    }).add(this.buttonGroup);
                this.chart.styledMode || (this.zoomText.css(d.labelStyle), f["stroke-width"] = B(f["stroke-width"], 0));
                n("option", {textContent: this.zoomText.textStr, disabled: !0}, void 0, u);
                this.buttonOptions.forEach(function (d, c) {
                    n("option", {textContent: d.title || d.text}, void 0, u);
                    b[c] = e.button(d.text, 0, 0, function (b) {
                        var e = d.events && d.events.click, f;
                        e && (f = e.call(d, b));
                        !1 !== f && a.clickButton(c);
                        a.isActive = !0
                    }, f, k && k.hover, k && k.select, k && k.disabled).attr({
                        "text-align": "center",
                        width: h
                    }).add(a.buttonGroup);
                    d.title && b[c].attr("title", d.title)
                })
            };
            f.prototype.alignElements = function () {
                var a = this, b = this.buttonGroup, d = this.buttons, c = this.chart, e = this.group,
                    f = this.inputGroup, g = this.options, k = this.zoomText, h = c.options,
                    u = h.exporting && !1 !== h.exporting.enabled && h.navigation && h.navigation.buttonOptions;
                h = g.buttonPosition;
                var n = g.inputPosition, y = g.verticalAlign, l = function (b, d) {
                    return u &&
                    a.titleCollision(c) && "top" === y && "right" === d.align && d.y - b.getBBox().height - 12 < (u.y || 0) + (u.height || 0) + c.spacing[0] ? -40 : 0
                }, q = c.plotLeft;
                if (e && h && n) {
                    var p = h.x - c.spacing[3];
                    if (b) {
                        this.positionButtons();
                        if (!this.initialButtonGroupWidth) {
                            var A = 0;
                            k && (A += k.getBBox().width + 5);
                            d.forEach(function (a, b) {
                                A += a.width;
                                b !== d.length - 1 && (A += g.buttonSpacing)
                            });
                            this.initialButtonGroupWidth = A
                        }
                        q -= c.spacing[3];
                        this.updateButtonStates();
                        k = l(b, h);
                        this.alignButtonGroup(k);
                        e.placed = b.placed = c.hasLoaded
                    }
                    b = 0;
                    f && (b = l(f, n), "left" ===
                    n.align ? p = q : "right" === n.align && (p = -Math.max(c.axisOffset[1], -b)), f.align({
                        y: n.y,
                        width: f.getBBox().width,
                        align: n.align,
                        x: n.x + p - 2
                    }, !0, c.spacingBox), f.placed = c.hasLoaded);
                    this.handleCollision(b);
                    e.align({verticalAlign: y}, !0, c.spacingBox);
                    f = e.alignAttr.translateY;
                    b = e.getBBox().height + 20;
                    l = 0;
                    "bottom" === y && (l = (l = c.legend && c.legend.options) && "bottom" === l.verticalAlign && l.enabled && !l.floating ? c.legend.legendHeight + B(l.margin, 10) : 0, b = b + l - 20, l = f - b - (g.floating ? 0 : g.y) - (c.titleOffset ? c.titleOffset[2] : 0) - 10);
                    if ("top" ===
                        y) g.floating && (l = 0), c.titleOffset && c.titleOffset[0] && (l = c.titleOffset[0]), l += c.margin[0] - c.spacing[0] || 0; else if ("middle" === y) if (n.y === h.y) l = f; else if (n.y || h.y) l = 0 > n.y || 0 > h.y ? l - Math.min(n.y, h.y) : f - b;
                    e.translate(g.x, g.y + Math.floor(l));
                    h = this.minInput;
                    n = this.maxInput;
                    f = this.dropdown;
                    g.inputEnabled && h && n && (h.style.marginTop = e.translateY + "px", n.style.marginTop = e.translateY + "px");
                    f && (f.style.marginTop = e.translateY + "px")
                }
            };
            f.prototype.alignButtonGroup = function (a, b) {
                var d = this.chart, c = this.buttonGroup, e =
                    this.options.buttonPosition, f = d.plotLeft - d.spacing[3], g = e.x - d.spacing[3];
                "right" === e.align ? g += a - f : "center" === e.align && (g -= f / 2);
                c && c.align({
                    y: e.y,
                    width: B(b, this.initialButtonGroupWidth),
                    align: e.align,
                    x: g
                }, !0, d.spacingBox)
            };
            f.prototype.positionButtons = function () {
                var a = this.buttons, b = this.chart, d = this.options, c = this.zoomText,
                    e = b.hasLoaded ? "animate" : "attr", f = d.buttonPosition, g = b.plotLeft, k = g;
                c && "hidden" !== c.visibility && (c[e]({x: B(g + f.x, g)}), k += f.x + c.getBBox().width + 5);
                this.buttonOptions.forEach(function (b,
                                                     c) {
                    if ("hidden" !== a[c].visibility) a[c][e]({x: k}), k += a[c].width + d.buttonSpacing; else a[c][e]({x: g})
                })
            };
            f.prototype.handleCollision = function (a) {
                var b = this, d = this.chart, c = this.buttonGroup, e = this.inputGroup, f = this.options,
                    g = f.buttonPosition, m = f.dropdown, k = f.inputPosition;
                f = function () {
                    var a = 0;
                    b.buttons.forEach(function (b) {
                        b = b.getBBox();
                        b.width > a && (a = b.width)
                    });
                    return a
                };
                var h = function (b) {
                    if (e && c) {
                        var d = e.alignAttr.translateX + e.alignOptions.x - a + e.getBBox().x + 2,
                            f = e.alignOptions.width, m = c.alignAttr.translateX +
                                c.getBBox().x;
                        return m + b > d && d + f > m && g.y < k.y + e.getBBox().height
                    }
                    return !1
                }, n = function () {
                    e && c && e.attr({
                        translateX: e.alignAttr.translateX + (d.axisOffset[1] >= -a ? 0 : -a),
                        translateY: e.alignAttr.translateY + c.getBBox().height + 10
                    })
                };
                if (c) {
                    if ("always" === m) {
                        this.collapseButtons(a);
                        h(f()) && n();
                        return
                    }
                    "never" === m && this.expandButtons()
                }
                e && c ? k.align === g.align || h(this.initialButtonGroupWidth + 20) ? "responsive" === m ? (this.collapseButtons(a), h(f()) && n()) : n() : "responsive" === m && this.expandButtons() : c && "responsive" === m && (this.initialButtonGroupWidth >
                d.plotWidth ? this.collapseButtons(a) : this.expandButtons())
            };
            f.prototype.collapseButtons = function (a) {
                var b = this.buttons, d = this.buttonOptions, c = this.chart, e = this.dropdown, f = this.options,
                    g = this.zoomText, m = c.userOptions.rangeSelector && c.userOptions.rangeSelector.buttonTheme || {},
                    k = function (a) {
                        return {
                            text: a ? "" + a + " \u25be" : "\u25be",
                            width: "auto",
                            paddingLeft: B(f.buttonTheme.paddingLeft, m.padding, 8),
                            paddingRight: B(f.buttonTheme.paddingRight, m.padding, 8)
                        }
                    };
                g && g.hide();
                var h = !1;
                d.forEach(function (a, d) {
                    d = b[d];
                    2 !== d.state ? d.hide() : (d.show(), d.attr(k(a.text)), h = !0)
                });
                h || (e && (e.selectedIndex = 0), b[0].show(), b[0].attr(k(this.zoomText && this.zoomText.textStr)));
                d = f.buttonPosition.align;
                this.positionButtons();
                "right" !== d && "center" !== d || this.alignButtonGroup(a, b[this.currentButtonIndex()].getBBox().width);
                this.showDropdown()
            };
            f.prototype.expandButtons = function () {
                var a = this.buttons, b = this.buttonOptions, d = this.options, c = this.zoomText;
                this.hideDropdown();
                c && c.show();
                b.forEach(function (b, c) {
                    c = a[c];
                    c.show();
                    c.attr({
                        text: b.text,
                        width: d.buttonTheme.width || 28,
                        paddingLeft: B(d.buttonTheme.paddingLeft, "unset"),
                        paddingRight: B(d.buttonTheme.paddingRight, "unset")
                    });
                    2 > c.state && c.setState(0)
                });
                this.positionButtons()
            };
            f.prototype.currentButtonIndex = function () {
                var a = this.dropdown;
                return a && 0 < a.selectedIndex ? a.selectedIndex - 1 : 0
            };
            f.prototype.showDropdown = function () {
                var a = this.buttonGroup, b = this.buttons, d = this.chart, c = this.dropdown;
                if (a && c) {
                    var e = a.translateX;
                    a = a.translateY;
                    b = b[this.currentButtonIndex()].getBBox();
                    k(c, {
                        left: d.plotLeft +
                            e + "px", top: a + .5 + "px", width: b.width + "px", height: b.height + "px"
                    });
                    this.hasVisibleDropdown = !0
                }
            };
            f.prototype.hideDropdown = function () {
                var a = this.dropdown;
                a && (k(a, {top: "-9999em", width: "1px", height: "1px"}), this.hasVisibleDropdown = !1)
            };
            f.prototype.getHeight = function () {
                var a = this.options, b = this.group, d = a.y, c = a.buttonPosition.y, e = a.inputPosition.y;
                if (a.height) return a.height;
                this.alignElements();
                a = b ? b.getBBox(!0).height + 13 + d : 0;
                b = Math.min(e, c);
                if (0 > e && 0 > c || 0 < e && 0 < c) a += Math.abs(b);
                return a
            };
            f.prototype.titleCollision =
                function (a) {
                    return !(a.options.title.text || a.options.subtitle.text)
                };
            f.prototype.update = function (a) {
                var b = this.chart;
                x(!0, b.options.rangeSelector, a);
                this.destroy();
                this.init(b);
                this.render()
            };
            f.prototype.destroy = function () {
                var a = this, b = a.minInput, c = a.maxInput;
                a.eventsToUnbind && (a.eventsToUnbind.forEach(function (a) {
                    return a()
                }), a.eventsToUnbind = void 0);
                e(a.buttons);
                b && (b.onfocus = b.onblur = b.onchange = null);
                c && (c.onfocus = c.onblur = c.onchange = null);
                J(a, function (b, c) {
                    b && "chart" !== c && (b instanceof q ? b.destroy() :
                        b instanceof window.HTMLElement && d(b));
                    b !== f.prototype[c] && (a[c] = null)
                }, this)
            };
            return f
        }();
        C.prototype.defaultButtons = [{type: "month", count: 1, text: "1m", title: "View 1 month"}, {
            type: "month",
            count: 3,
            text: "3m",
            title: "View 3 months"
        }, {type: "month", count: 6, text: "6m", title: "View 6 months"}, {
            type: "ytd",
            text: "YTD",
            title: "View year to date"
        }, {type: "year", count: 1, text: "1y", title: "View 1 year"}, {type: "all", text: "All", title: "View all"}];
        C.prototype.inputTypeFormats = {
            "datetime-local": "%Y-%m-%dT%H:%M:%S", date: "%Y-%m-%d",
            time: "%H:%M:%S"
        };
        a.prototype.minFromRange = function () {
            var a = this.range, b = a.type, d = this.max, c = this.chart.time, e = function (a, d) {
                var e = "year" === b ? "FullYear" : "Month", f = new c.Date(a), g = c.get(e, f);
                c.set(e, f, g + d);
                g === c.get(e, f) && c.set("Date", f, 0);
                return f.getTime() - a
            };
            if (z(a)) {
                var f = d - a;
                var g = a
            } else a && (f = d + e(d, -(a.count || 1)), this.chart && (this.chart.fixedRange = d - f));
            var k = B(this.dataMin, Number.MIN_VALUE);
            z(f) || (f = k);
            f <= k && (f = k, "undefined" === typeof g && (g = e(f, a.count)), this.newMax = Math.min(f + g, B(this.dataMax,
                Number.MAX_VALUE)));
            z(d) ? !z(a) && a && a._offsetMin && (f += a._offsetMin) : f = void 0;
            return f
        };
        if (!p.RangeSelector) {
            var D = [], L = function (a) {
                function b() {
                    c && (d = a.xAxis[0].getExtremes(), e = a.legend, h = c && c.options.verticalAlign, z(d.min) && c.render(d.min, d.max), e.display && "top" === h && h === e.options.verticalAlign && (k = x(a.spacingBox), k.y = "vertical" === e.options.layout ? a.plotTop : k.y + c.getHeight(), e.group.placed = !1, e.align(k)))
                }

                var d, c = a.rangeSelector, e, k, h;
                c && (f(D, function (b) {
                    return b[0] === a
                }) || D.push([a, [g(a.xAxis[0],
                    "afterSetExtremes", function (a) {
                        c && c.render(a.min, a.max)
                    }), g(a, "redraw", b)]]), b())
            };
            g(h, "afterGetContainer", function () {
                this.options.rangeSelector && this.options.rangeSelector.enabled && (this.rangeSelector = new C(this))
            });
            g(h, "beforeRender", function () {
                var a = this.axes, b = this.rangeSelector;
                b && (z(b.deferredYTDClick) && (b.clickButton(b.deferredYTDClick), delete b.deferredYTDClick), a.forEach(function (a) {
                    a.updateNames();
                    a.setScale()
                }), this.getAxisMargins(), b.render(), a = b.options.verticalAlign, b.options.floating ||
                ("bottom" === a ? this.extraBottomMargin = !0 : "middle" !== a && (this.extraTopMargin = !0)))
            });
            g(h, "update", function (a) {
                var b = a.options.rangeSelector;
                a = this.rangeSelector;
                var d = this.extraBottomMargin, e = this.extraTopMargin;
                b && b.enabled && !c(a) && this.options.rangeSelector && (this.options.rangeSelector.enabled = !0, this.rangeSelector = a = new C(this));
                this.extraTopMargin = this.extraBottomMargin = !1;
                a && (L(this), b = b && b.verticalAlign || a.options && a.options.verticalAlign, a.options.floating || ("bottom" === b ? this.extraBottomMargin =
                    !0 : "middle" !== b && (this.extraTopMargin = !0)), this.extraBottomMargin !== d || this.extraTopMargin !== e) && (this.isDirtyBox = !0)
            });
            g(h, "render", function () {
                var a = this.rangeSelector;
                a && !a.options.floating && (a.render(), a = a.options.verticalAlign, "bottom" === a ? this.extraBottomMargin = !0 : "middle" !== a && (this.extraTopMargin = !0))
            });
            g(h, "getMargins", function () {
                var a = this.rangeSelector;
                a && (a = a.getHeight(), this.extraTopMargin && (this.plotTop += a), this.extraBottomMargin && (this.marginBottom += a))
            });
            h.prototype.callbacks.push(L);
            g(h, "destroy", function () {
                for (var a = 0; a < D.length; a++) {
                    var b = D[a];
                    if (b[0] === this) {
                        b[1].forEach(function (a) {
                            return a()
                        });
                        D.splice(a, 1);
                        break
                    }
                }
            });
            p.RangeSelector = C
        }
        return C
    });
    x(a, "Accessibility/Components/RangeSelectorComponent.js", [a["Extensions/RangeSelector.js"], a["Accessibility/AccessibilityComponent.js"], a["Accessibility/Utils/ChartUtilities.js"], a["Accessibility/Utils/Announcer.js"], a["Accessibility/KeyboardNavigationHandler.js"], a["Core/Utilities.js"]], function (a, h, p, w, q, l) {
        var t = this && this.__extends ||
            function () {
                var a = function (c, d) {
                    a = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (a, d) {
                        a.__proto__ = d
                    } || function (a, d) {
                        for (var b in d) d.hasOwnProperty(b) && (a[b] = d[b])
                    };
                    return a(c, d)
                };
                return function (c, d) {
                    function b() {
                        this.constructor = c
                    }

                    a(c, d);
                    c.prototype = null === d ? Object.create(d) : (b.prototype = d.prototype, new b)
                }
            }(), v = p.unhideChartElementFromAT, g = p.getAxisRangeDescription, n = l.addEvent, k = l.attr;
        h = function (a) {
            function c() {
                var d = null !== a && a.apply(this, arguments) || this;
                d.announcer = void 0;
                return d
            }

            t(c, a);
            c.prototype.init = function () {
                this.announcer = new w(this.chart, "polite")
            };
            c.prototype.onChartUpdate = function () {
                var a = this.chart, b = this, c = a.rangeSelector;
                c && (this.updateSelectorVisibility(), this.setDropdownAttrs(), c.buttons && c.buttons.length && c.buttons.forEach(function (a) {
                    b.setRangeButtonAttrs(a)
                }), c.maxInput && c.minInput && ["minInput", "maxInput"].forEach(function (d, e) {
                    if (d = c[d]) v(a, d), b.setRangeInputAttrs(d, "accessibility.rangeSelector." + (e ? "max" : "min") + "InputLabel")
                }))
            };
            c.prototype.updateSelectorVisibility =
                function () {
                    var a = this.chart, b = a.rangeSelector, c = b && b.dropdown, e = b && b.buttons || [];
                    b && b.hasVisibleDropdown && c ? (v(a, c), e.forEach(function (a) {
                        return a.element.setAttribute("aria-hidden", !0)
                    })) : (c && c.setAttribute("aria-hidden", !0), e.forEach(function (b) {
                        return v(a, b.element)
                    }))
                };
            c.prototype.setDropdownAttrs = function () {
                var a = this.chart, b = a.rangeSelector && a.rangeSelector.dropdown;
                b && (a = a.langFormat("accessibility.rangeSelector.dropdownLabel", {rangeTitle: a.options.lang.rangeSelectorZoom}), b.setAttribute("aria-label",
                    a), b.setAttribute("tabindex", -1))
            };
            c.prototype.setRangeButtonAttrs = function (a) {
                k(a.element, {tabindex: -1, role: "button"})
            };
            c.prototype.setRangeInputAttrs = function (a, b) {
                var c = this.chart;
                k(a, {tabindex: -1, "aria-label": c.langFormat(b, {chart: c})})
            };
            c.prototype.onButtonNavKbdArrowKey = function (a, b) {
                var c = a.response, d = this.keyCodes, e = this.chart,
                    g = e.options.accessibility.keyboardNavigation.wrapAround;
                b = b === d.left || b === d.up ? -1 : 1;
                return e.highlightRangeSelectorButton(e.highlightedRangeSelectorItemIx + b) ? c.success :
                    g ? (a.init(b), c.success) : c[0 < b ? "next" : "prev"]
            };
            c.prototype.onButtonNavKbdClick = function (a) {
                a = a.response;
                var b = this.chart;
                3 !== b.oldRangeSelectorItemState && this.fakeClickEvent(b.rangeSelector.buttons[b.highlightedRangeSelectorItemIx].element);
                return a.success
            };
            c.prototype.onAfterBtnClick = function () {
                var a = this.chart, b = g(a.xAxis[0]);
                (a = a.langFormat("accessibility.rangeSelector.clickButtonAnnouncement", {
                    chart: a,
                    axisRangeDescription: b
                })) && this.announcer.announce(a)
            };
            c.prototype.onInputKbdMove = function (a) {
                var b =
                        this.chart, c = b.rangeSelector,
                    d = b.highlightedInputRangeIx = (b.highlightedInputRangeIx || 0) + a;
                1 < d || 0 > d ? b.accessibility && (b.accessibility.keyboardNavigation.tabindexContainer.focus(), b.accessibility.keyboardNavigation.move(a)) : c && (a = c[d ? "maxDateBox" : "minDateBox"], c = c[d ? "maxInput" : "minInput"], a && c && b.setFocusToElement(a, c))
            };
            c.prototype.onInputNavInit = function (a) {
                var b = this, c = this, d = this.chart, e = 0 < a ? 0 : 1, g = d.rangeSelector,
                    k = g && g[e ? "maxDateBox" : "minDateBox"];
                a = g && g.minInput;
                g = g && g.maxInput;
                d.highlightedInputRangeIx =
                    e;
                if (k && a && g) {
                    d.setFocusToElement(k, e ? g : a);
                    this.removeInputKeydownHandler && this.removeInputKeydownHandler();
                    d = function (a) {
                        (a.which || a.keyCode) === b.keyCodes.tab && (a.preventDefault(), a.stopPropagation(), c.onInputKbdMove(a.shiftKey ? -1 : 1))
                    };
                    var h = n(a, "keydown", d), l = n(g, "keydown", d);
                    this.removeInputKeydownHandler = function () {
                        h();
                        l()
                    }
                }
            };
            c.prototype.onInputNavTerminate = function () {
                var a = this.chart.rangeSelector || {};
                a.maxInput && a.hideInput("max");
                a.minInput && a.hideInput("min");
                this.removeInputKeydownHandler &&
                (this.removeInputKeydownHandler(), delete this.removeInputKeydownHandler)
            };
            c.prototype.initDropdownNav = function () {
                var a = this, b = this.chart, c = b.rangeSelector, e = c && c.dropdown;
                c && e && (b.setFocusToElement(c.buttonGroup, e), this.removeDropdownKeydownHandler && this.removeDropdownKeydownHandler(), this.removeDropdownKeydownHandler = n(e, "keydown", function (c) {
                    var d = b.accessibility;
                    (c.which || c.keyCode) === a.keyCodes.tab && (c.preventDefault(), c.stopPropagation(), d && (d.keyboardNavigation.tabindexContainer.focus(), d.keyboardNavigation.move(c.shiftKey ?
                        -1 : 1)))
                }))
            };
            c.prototype.getRangeSelectorButtonNavigation = function () {
                var a = this.chart, b = this.keyCodes, c = this;
                return new q(a, {
                    keyCodeMap: [[[b.left, b.right, b.up, b.down], function (a) {
                        return c.onButtonNavKbdArrowKey(this, a)
                    }], [[b.enter, b.space], function () {
                        return c.onButtonNavKbdClick(this)
                    }]], validate: function () {
                        return !!(a.rangeSelector && a.rangeSelector.buttons && a.rangeSelector.buttons.length)
                    }, init: function (b) {
                        var d = a.rangeSelector;
                        d && d.hasVisibleDropdown ? c.initDropdownNav() : d && (d = d.buttons.length - 1, a.highlightRangeSelectorButton(0 <
                        b ? 0 : d))
                    }, terminate: function () {
                        c.removeDropdownKeydownHandler && (c.removeDropdownKeydownHandler(), delete c.removeDropdownKeydownHandler)
                    }
                })
            };
            c.prototype.getRangeSelectorInputNavigation = function () {
                var a = this.chart, b = this;
                return new q(a, {
                    keyCodeMap: [], validate: function () {
                        return !!(a.rangeSelector && a.rangeSelector.inputGroup && "hidden" !== a.rangeSelector.inputGroup.element.style.visibility && !1 !== a.options.rangeSelector.inputEnabled && a.rangeSelector.minInput && a.rangeSelector.maxInput)
                    }, init: function (a) {
                        b.onInputNavInit(a)
                    },
                    terminate: function () {
                        b.onInputNavTerminate()
                    }
                })
            };
            c.prototype.getKeyboardNavigation = function () {
                return [this.getRangeSelectorButtonNavigation(), this.getRangeSelectorInputNavigation()]
            };
            c.prototype.destroy = function () {
                this.removeDropdownKeydownHandler && this.removeDropdownKeydownHandler();
                this.removeInputKeydownHandler && this.removeInputKeydownHandler();
                this.announcer && this.announcer.destroy()
            };
            return c
        }(h);
        (function (c) {
            function e(a) {
                var b = this.rangeSelector && this.rangeSelector.buttons || [], c = this.highlightedRangeSelectorItemIx,
                    d = this.rangeSelector && this.rangeSelector.selected;
                "undefined" !== typeof c && b[c] && c !== d && b[c].setState(this.oldRangeSelectorItemState || 0);
                this.highlightedRangeSelectorItemIx = a;
                return b[a] ? (this.setFocusToElement(b[a].box, b[a].element), a !== d && (this.oldRangeSelectorItemState = b[a].state, b[a].setState(1)), !0) : !1
            }

            function d() {
                var a = this.chart.accessibility;
                if (a && a.components.rangeSelector) return a.components.rangeSelector.onAfterBtnClick()
            }

            var b = [];
            c.compose = function (c, g) {
                -1 === b.indexOf(c) && (b.push(c), c.prototype.highlightRangeSelectorButton =
                    e);
                -1 === b.indexOf(g) && (b.push(g), n(a, "afterBtnClick", d))
            }
        })(h || (h = {}));
        return h
    });
    x(a, "Accessibility/Components/SeriesComponent/ForcedMarkers.js", [a["Core/Utilities.js"]], function (a) {
        var h = a.addEvent, p = a.merge, t;
        (function (a) {
            function l(a) {
                p(!0, a, {marker: {enabled: !0, states: {normal: {opacity: 0}}}})
            }

            function q(a) {
                return a.marker.states && a.marker.states.normal && a.marker.states.normal.opacity
            }

            function t() {
                if (this.chart.styledMode) {
                    if (this.markerGroup) this.markerGroup[this.a11yMarkersForced ? "addClass" : "removeClass"]("highcharts-a11y-markers-hidden");
                    this._hasPointMarkers && this.points && this.points.length && this.points.forEach(function (a) {
                        a.graphic && (a.graphic[a.hasForcedA11yMarker ? "addClass" : "removeClass"]("highcharts-a11y-marker-hidden"), a.graphic[!1 === a.hasForcedA11yMarker ? "addClass" : "removeClass"]("highcharts-a11y-marker-visible"))
                    })
                }
            }

            function g(a) {
                this.resetA11yMarkerOptions = p(a.options.marker || {}, this.userOptions.marker || {})
            }

            function n() {
                var a = this.options, e = !1 !== (this.options.accessibility && this.options.accessibility.enabled);
                if (e = this.chart.options.accessibility.enabled &&
                    e) e = this.chart.options.accessibility, e = this.points.length < e.series.pointDescriptionEnabledThreshold || !1 === e.series.pointDescriptionEnabledThreshold;
                if (e) {
                    if (a.marker && !1 === a.marker.enabled && (this.a11yMarkersForced = !0, l(this.options)), this._hasPointMarkers && this.points && this.points.length) for (a = this.points.length; a--;) {
                        e = this.points[a];
                        var d = e.options, b = e.hasForcedA11yMarker;
                        delete e.hasForcedA11yMarker;
                        d.marker && (b = b && 0 === q(d), d.marker.enabled && !b ? (p(!0, d.marker, {states: {normal: {opacity: q(d) || 1}}}),
                            e.hasForcedA11yMarker = !1) : !1 === d.marker.enabled && (l(d), e.hasForcedA11yMarker = !0))
                    }
                } else this.a11yMarkersForced && (delete this.a11yMarkersForced, (a = this.resetA11yMarkerOptions) && this.update({
                    marker: {
                        enabled: a.enabled,
                        states: {normal: {opacity: a.states && a.states.normal && a.states.normal.opacity}}
                    }
                }), delete this.resetA11yMarkerOptions)
            }

            var k = [];
            a.compose = function (a) {
                -1 === k.indexOf(a) && (k.push(a), h(a, "afterSetOptions", g), h(a, "render", n), h(a, "afterRender", t))
            }
        })(t || (t = {}));
        return t
    });
    x(a, "Accessibility/Components/SeriesComponent/SeriesKeyboardNavigation.js",
        [a["Core/Series/Point.js"], a["Core/Series/Series.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Globals.js"], a["Core/Utilities.js"], a["Accessibility/KeyboardNavigationHandler.js"], a["Accessibility/Utils/EventProvider.js"], a["Accessibility/Utils/ChartUtilities.js"]], function (a, h, p, w, q, l, x, v) {
            function g(a) {
                var b = a.index, c = a.series.points, d = c.length;
                if (c[b] !== a) for (; d--;) {
                    if (c[d] === a) return d
                } else return b
            }

            function n(a) {
                var b = a.chart.options.accessibility.keyboardNavigation.seriesNavigation,
                    c = a.options.accessibility ||
                        {}, d = c.keyboardNavigation;
                return d && !1 === d.enabled || !1 === c.enabled || !1 === a.options.enableMouseTracking || !a.visible || b.pointNavigationEnabledThreshold && b.pointNavigationEnabledThreshold <= a.points.length
            }

            function k(a) {
                var b = a.series.chart.options.accessibility,
                    c = a.options.accessibility && !1 === a.options.accessibility.enabled;
                return a.isNull && b.keyboardNavigation.seriesNavigation.skipNullPoints || !1 === a.visible || !1 === a.isInside || c || n(a.series)
            }

            function c(a) {
                a = a.series || [];
                for (var b = a.length, c = 0; c < b; ++c) if (!n(a[c])) {
                    a:{
                        var d =
                            a[c].points || [];
                        for (var e = d.length, f = 0; f < e; ++f) if (!k(d[f])) {
                            d = d[f];
                            break a
                        }
                        d = null
                    }
                    if (d) return d
                }
                return null
            }

            function e(a) {
                for (var b = a.series.length, c = !1; b-- && !(a.highlightedPoint = a.series[b].points[a.series[b].points.length - 1], c = a.series[b].highlightNextValidPoint());) ;
                return c
            }

            function d(a) {
                delete a.highlightedPoint;
                return (a = c(a)) ? a.highlight() : !1
            }

            var b = p.seriesTypes, f = w.doc, t = q.defined, z = q.fireEvent, G = v.getPointFromXY,
                J = v.getSeriesFromName, F = v.scrollToPoint;
            p = function () {
                function b(a, b) {
                    this.keyCodes =
                        b;
                    this.chart = a
                }

                b.prototype.init = function () {
                    var b = this, d = this.chart, e = this.eventProvider = new x;
                    e.addEvent(h, "destroy", function () {
                        return b.onSeriesDestroy(this)
                    });
                    e.addEvent(d, "afterApplyDrilldown", function () {
                        var a = c(this);
                        a && a.highlight(!1)
                    });
                    e.addEvent(d, "drilldown", function (a) {
                        a = a.point;
                        var c = a.series;
                        b.lastDrilledDownPoint = {x: a.x, y: a.y, seriesName: c ? c.name : ""}
                    });
                    e.addEvent(d, "drillupall", function () {
                        setTimeout(function () {
                            b.onDrillupAll()
                        }, 10)
                    });
                    e.addEvent(a, "afterSetState", function () {
                        var a = this.graphic &&
                            this.graphic.element, b = f.activeElement, c = b && b.getAttribute("class");
                        c = c && -1 < c.indexOf("highcharts-a11y-proxy-button");
                        d.highlightedPoint === this && b !== a && !c && a && a.focus && a.focus()
                    })
                };
                b.prototype.onDrillupAll = function () {
                    var a = this.lastDrilledDownPoint, b = this.chart, d = a && J(b, a.seriesName), e;
                    a && d && t(a.x) && t(a.y) && (e = G(d, a.x, a.y));
                    e = e || c(b);
                    b.container && b.container.focus();
                    e && e.highlight && e.highlight(!1)
                };
                b.prototype.getKeyboardNavigationHandler = function () {
                    var a = this, b = this.keyCodes, f = this.chart, g = f.inverted;
                    return new l(f, {
                        keyCodeMap: [[g ? [b.up, b.down] : [b.left, b.right], function (b) {
                            return a.onKbdSideways(this, b)
                        }], [g ? [b.left, b.right] : [b.up, b.down], function (b) {
                            return a.onKbdVertical(this, b)
                        }], [[b.enter, b.space], function (a, b) {
                            if (a = f.highlightedPoint) b.point = a, z(a.series, "click", b), a.firePointEvent("click");
                            return this.response.success
                        }], [[b.home], function () {
                            d(f);
                            return this.response.success
                        }], [[b.end], function () {
                            e(f);
                            return this.response.success
                        }], [[b.pageDown, b.pageUp], function (a) {
                            f.highlightAdjacentSeries(a ===
                                b.pageDown);
                            return this.response.success
                        }]], init: function () {
                            return a.onHandlerInit(this)
                        }, validate: function () {
                            return !!c(f)
                        }, terminate: function () {
                            return a.onHandlerTerminate()
                        }
                    })
                };
                b.prototype.onKbdSideways = function (a, b) {
                    var c = this.keyCodes;
                    return this.attemptHighlightAdjacentPoint(a, b === c.right || b === c.down)
                };
                b.prototype.onHandlerInit = function (a) {
                    var b = this.chart;
                    b.options.accessibility.keyboardNavigation.seriesNavigation.rememberPointFocus && b.highlightedPoint ? b.highlightedPoint.highlight() : d(b);
                    return a.response.success
                };
                b.prototype.onKbdVertical = function (a, b) {
                    var c = this.chart, d = this.keyCodes;
                    b = b === d.down || b === d.right;
                    d = c.options.accessibility.keyboardNavigation.seriesNavigation;
                    if (d.mode && "serialize" === d.mode) return this.attemptHighlightAdjacentPoint(a, b);
                    c[c.highlightedPoint && c.highlightedPoint.series.keyboardMoveVertical ? "highlightAdjacentPointVertical" : "highlightAdjacentSeries"](b);
                    return a.response.success
                };
                b.prototype.onHandlerTerminate = function () {
                    var a = this.chart, b = a.options.accessibility.keyboardNavigation;
                    a.tooltip && a.tooltip.hide(0);
                    var c = a.highlightedPoint && a.highlightedPoint.series;
                    if (c && c.onMouseOut) c.onMouseOut();
                    if (a.highlightedPoint && a.highlightedPoint.onMouseOut) a.highlightedPoint.onMouseOut();
                    b.seriesNavigation.rememberPointFocus || delete a.highlightedPoint
                };
                b.prototype.attemptHighlightAdjacentPoint = function (a, b) {
                    var c = this.chart, f = c.options.accessibility.keyboardNavigation.wrapAround;
                    return c.highlightAdjacentPoint(b) ? a.response.success : f && (b ? d(c) : e(c)) ? a.response.success : a.response[b ? "next" :
                        "prev"]
                };
                b.prototype.onSeriesDestroy = function (a) {
                    var b = this.chart;
                    b.highlightedPoint && b.highlightedPoint.series === a && (delete b.highlightedPoint, b.focusElement && b.focusElement.removeFocusBorder())
                };
                b.prototype.destroy = function () {
                    this.eventProvider.removeAddedEvents()
                };
                return b
            }();
            (function (a) {
                function c(a) {
                    var b = this.series, c = this.highlightedPoint, d = c && g(c) || 0, e = c && c.series.points || [],
                        f = this.series && this.series[this.series.length - 1];
                    f = f && f.points && f.points[f.points.length - 1];
                    if (!b[0] || !b[0].points) return !1;
                    if (c) {
                        if (b = b[c.series.index + (a ? 1 : -1)], d = e[d + (a ? 1 : -1)], !d && b && (d = b.points[a ? 0 : b.points.length - 1]), !d) return !1
                    } else d = a ? b[0].points[0] : f;
                    return k(d) ? (b = d.series, n(b) ? this.highlightedPoint = a ? b.points[b.points.length - 1] : b.points[0] : this.highlightedPoint = d, this.highlightAdjacentPoint(a)) : d.highlight()
                }

                function d(a) {
                    var b = this.highlightedPoint, c = Infinity, d;
                    if (!t(b.plotX) || !t(b.plotY)) return !1;
                    this.series.forEach(function (e) {
                        n(e) || e.points.forEach(function (f) {
                            if (t(f.plotY) && t(f.plotX) && f !== b) {
                                var g = f.plotY -
                                    b.plotY, h = Math.abs(f.plotX - b.plotX);
                                h = Math.abs(g) * Math.abs(g) + h * h * 4;
                                e.yAxis && e.yAxis.reversed && (g *= -1);
                                !(0 >= g && a || 0 <= g && !a || 5 > h || k(f)) && h < c && (c = h, d = f)
                            }
                        })
                    });
                    return d ? d.highlight() : !1
                }

                function e(a) {
                    var b = this.highlightedPoint, c = this.series && this.series[this.series.length - 1],
                        d = c && c.points && c.points[c.points.length - 1];
                    if (!this.highlightedPoint) return c = a ? this.series && this.series[0] : c, (d = a ? c && c.points && c.points[0] : d) ? d.highlight() : !1;
                    c = this.series[b.series.index + (a ? -1 : 1)];
                    if (!c) return !1;
                    d = f(b, c, 4);
                    if (!d) return !1;
                    if (n(c)) return d.highlight(), a = this.highlightAdjacentSeries(a), a ? a : (b.highlight(), !1);
                    d.highlight();
                    return d.series.highlightNextValidPoint()
                }

                function f(a, b, c, d) {
                    var e = Infinity, f = b.points.length, g = function (a) {
                        return !(t(a.plotX) && t(a.plotY))
                    };
                    if (!g(a)) {
                        for (; f--;) {
                            var k = b.points[f];
                            if (!g(k) && (k = (a.plotX - k.plotX) * (a.plotX - k.plotX) * (c || 1) + (a.plotY - k.plotY) * (a.plotY - k.plotY) * (d || 1), k < e)) {
                                e = k;
                                var h = f
                            }
                        }
                        return t(h) ? b.points[h] : void 0
                    }
                }

                function h(a) {
                    void 0 === a && (a = !0);
                    var b = this.series.chart;
                    if (!this.isNull &&
                        a) this.onMouseOver(); else b.tooltip && b.tooltip.hide(0);
                    F(this);
                    this.graphic && (b.setFocusToElement(this.graphic), !a && b.focusElement && b.focusElement.removeFocusBorder());
                    b.highlightedPoint = this;
                    return this
                }

                function l() {
                    var a = this.chart.highlightedPoint, b = (a && a.series) === this ? g(a) : 0;
                    a = this.points;
                    var c = a.length;
                    if (a && c) {
                        for (var d = b; d < c; ++d) if (!k(a[d])) return a[d].highlight();
                        for (; 0 <= b; --b) if (!k(a[b])) return a[b].highlight()
                    }
                    return !1
                }

                var m = [];
                a.compose = function (a, f, g) {
                    -1 === m.indexOf(a) && (m.push(a), a =
                        a.prototype, a.highlightAdjacentPoint = c, a.highlightAdjacentPointVertical = d, a.highlightAdjacentSeries = e);
                    -1 === m.indexOf(f) && (m.push(f), f.prototype.highlight = h);
                    -1 === m.indexOf(g) && (m.push(g), f = g.prototype, f.keyboardMoveVertical = !0, ["column", "gantt", "pie"].forEach(function (a) {
                        b[a] && (b[a].prototype.keyboardMoveVertical = !1)
                    }), f.highlightNextValidPoint = l)
                }
            })(p || (p = {}));
            return p
        });
    x(a, "Accessibility/Components/SeriesComponent/SeriesComponent.js", [a["Accessibility/AccessibilityComponent.js"], a["Accessibility/Utils/ChartUtilities.js"],
        a["Accessibility/Components/SeriesComponent/ForcedMarkers.js"], a["Accessibility/Components/SeriesComponent/NewDataAnnouncer.js"], a["Accessibility/Components/SeriesComponent/SeriesDescriber.js"], a["Accessibility/Components/SeriesComponent/SeriesKeyboardNavigation.js"], a["Core/Tooltip.js"]], function (a, h, p, w, q, l, x) {
        var t = this && this.__extends || function () {
            var a = function (c, e) {
                a = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (a, b) {
                    a.__proto__ = b
                } || function (a, b) {
                    for (var c in b) b.hasOwnProperty(c) &&
                    (a[c] = b[c])
                };
                return a(c, e)
            };
            return function (c, e) {
                function d() {
                    this.constructor = c
                }

                a(c, e);
                c.prototype = null === e ? Object.create(e) : (d.prototype = e.prototype, new d)
            }
        }(), g = h.hideSeriesFromAT, n = q.describeSeries;
        return function (a) {
            function c() {
                return null !== a && a.apply(this, arguments) || this
            }

            t(c, a);
            c.compose = function (a, c, b) {
                w.compose(b);
                p.compose(b);
                l.compose(a, c, b)
            };
            c.prototype.init = function () {
                this.newDataAnnouncer = new w(this.chart);
                this.newDataAnnouncer.init();
                this.keyboardNavigation = new l(this.chart, this.keyCodes);
                this.keyboardNavigation.init();
                this.hideTooltipFromATWhenShown();
                this.hideSeriesLabelsFromATWhenShown()
            };
            c.prototype.hideTooltipFromATWhenShown = function () {
                var a = this;
                this.addEvent(x, "refresh", function () {
                    this.chart === a.chart && this.label && this.label.element && this.label.element.setAttribute("aria-hidden", !0)
                })
            };
            c.prototype.hideSeriesLabelsFromATWhenShown = function () {
                this.addEvent(this.chart, "afterDrawSeriesLabels", function () {
                    this.series.forEach(function (a) {
                        a.labelBySeries && a.labelBySeries.attr("aria-hidden",
                            !0)
                    })
                })
            };
            c.prototype.onChartRender = function () {
                this.chart.series.forEach(function (a) {
                    !1 !== (a.options.accessibility && a.options.accessibility.enabled) && a.visible ? n(a) : g(a)
                })
            };
            c.prototype.getKeyboardNavigation = function () {
                return this.keyboardNavigation.getKeyboardNavigationHandler()
            };
            c.prototype.destroy = function () {
                this.newDataAnnouncer.destroy();
                this.keyboardNavigation.destroy()
            };
            return c
        }(a)
    });
    x(a, "Accessibility/Components/ZoomComponent.js", [a["Accessibility/AccessibilityComponent.js"], a["Accessibility/Utils/ChartUtilities.js"],
        a["Accessibility/KeyboardNavigationHandler.js"], a["Core/Utilities.js"]], function (a, h, p, w) {
        var q = this && this.__extends || function () {
            var a = function (g, k) {
                a = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (a, e) {
                    a.__proto__ = e
                } || function (a, e) {
                    for (var c in e) e.hasOwnProperty(c) && (a[c] = e[c])
                };
                return a(g, k)
            };
            return function (g, k) {
                function c() {
                    this.constructor = g
                }

                a(g, k);
                g.prototype = null === k ? Object.create(k) : (c.prototype = k.prototype, new c)
            }
        }(), l = h.unhideChartElementFromAT, t = w.attr, v = w.pick;
        return function (a) {
            function g() {
                var g =
                    null !== a && a.apply(this, arguments) || this;
                g.focusedMapNavButtonIx = -1;
                return g
            }

            q(g, a);
            g.prototype.init = function () {
                var a = this, c = this.chart;
                this.proxyProvider.addGroup("zoom", "div");
                ["afterShowResetZoom", "afterApplyDrilldown", "drillupall"].forEach(function (e) {
                    a.addEvent(c, e, function () {
                        a.updateProxyOverlays()
                    })
                })
            };
            g.prototype.onChartUpdate = function () {
                var a = this.chart, c = this;
                a.mapNavigation && a.mapNavigation.navButtons.forEach(function (e, d) {
                    l(a, e.element);
                    c.setMapNavButtonAttrs(e.element, "accessibility.zoom.mapZoom" +
                        (d ? "Out" : "In"))
                })
            };
            g.prototype.setMapNavButtonAttrs = function (a, c) {
                var e = this.chart;
                c = e.langFormat(c, {chart: e});
                t(a, {tabindex: -1, role: "button", "aria-label": c})
            };
            g.prototype.onChartRender = function () {
                this.updateProxyOverlays()
            };
            g.prototype.updateProxyOverlays = function () {
                var a = this.chart;
                this.proxyProvider.clearGroup("zoom");
                a.resetZoomButton && this.createZoomProxyButton(a.resetZoomButton, "resetZoomProxyButton", a.langFormat("accessibility.zoom.resetZoomButton", {chart: a}));
                a.drillUpButton && a.breadcrumbs &&
                a.breadcrumbs.list && this.createZoomProxyButton(a.drillUpButton, "drillUpProxyButton", a.langFormat("accessibility.drillUpButton", {
                    chart: a,
                    buttonText: a.breadcrumbs.getButtonText(a.breadcrumbs.list[a.breadcrumbs.list.length - 1])
                }))
            };
            g.prototype.createZoomProxyButton = function (a, c, e) {
                this[c] = this.proxyProvider.addProxyElement("zoom", {click: a}, {"aria-label": e, tabindex: -1})
            };
            g.prototype.getMapZoomNavigation = function () {
                var a = this.keyCodes, c = this.chart, e = this;
                return new p(c, {
                    keyCodeMap: [[[a.up, a.down, a.left,
                        a.right], function (a) {
                        return e.onMapKbdArrow(this, a)
                    }], [[a.tab], function (a, b) {
                        return e.onMapKbdTab(this, b)
                    }], [[a.space, a.enter], function () {
                        return e.onMapKbdClick(this)
                    }]], validate: function () {
                        return !!(c.mapZoom && c.mapNavigation && c.mapNavigation.navButtons.length)
                    }, init: function (a) {
                        return e.onMapNavInit(a)
                    }
                })
            };
            g.prototype.onMapKbdArrow = function (a, c) {
                var e = this.keyCodes, d = this.chart[c === e.up || c === e.down ? "yAxis" : "xAxis"][0];
                c = c === e.left || c === e.up ? -1 : 1;
                e = d.getExtremes();
                var b = (e.max - e.min) / 3 * c, f = e.max +
                    b;
                b = e.min + b;
                var g = f - b;
                0 > c && b < e.dataMin ? (b = e.dataMin, f = b + g) : 0 < c && f > e.dataMax && (f = e.dataMax, b = f - g);
                d.setExtremes(b, f);
                return a.response.success
            };
            g.prototype.onMapKbdTab = function (a, c) {
                var e = this.chart;
                a = a.response;
                var d = (c = c.shiftKey) && !this.focusedMapNavButtonIx || !c && this.focusedMapNavButtonIx;
                e.mapNavigation.navButtons[this.focusedMapNavButtonIx].setState(0);
                if (d) return e.mapZoom(), a[c ? "prev" : "next"];
                this.focusedMapNavButtonIx += c ? -1 : 1;
                c = e.mapNavigation.navButtons[this.focusedMapNavButtonIx];
                e.setFocusToElement(c.box,
                    c.element);
                c.setState(2);
                return a.success
            };
            g.prototype.onMapKbdClick = function (a) {
                this.fakeClickEvent(this.chart.mapNavButtons[this.focusedMapNavButtonIx].element);
                return a.response.success
            };
            g.prototype.onMapNavInit = function (a) {
                var c = this.chart, e = c.mapNavigation.navButtons[0], d = c.mapNavigation.navButtons[1];
                e = 0 < a ? e : d;
                c.setFocusToElement(e.box, e.element);
                e.setState(2);
                this.focusedMapNavButtonIx = 0 < a ? 0 : 1
            };
            g.prototype.simpleButtonNavigation = function (a, c, e) {
                var d = this.keyCodes, b = this, f = this.chart;
                return new p(f,
                    {
                        keyCodeMap: [[[d.tab, d.up, d.down, d.left, d.right], function (a, b) {
                            return this.response[a === d.tab && b.shiftKey || a === d.left || a === d.up ? "prev" : "next"]
                        }], [[d.space, d.enter], function () {
                            var a = e(this, f);
                            return v(a, this.response.success)
                        }]], validate: function () {
                            return f[a] && f[a].box && b[c].buttonElement
                        }, init: function () {
                            f.setFocusToElement(f[a].box, b[c].buttonElement)
                        }
                    })
            };
            g.prototype.getKeyboardNavigation = function () {
                return [this.simpleButtonNavigation("resetZoomButton", "resetZoomProxyButton", function (a, c) {
                    c.zoomOut()
                }),
                    this.simpleButtonNavigation("drillUpButton", "drillUpProxyButton", function (a, c) {
                        c.drillUp();
                        return a.response.prev
                    }), this.getMapZoomNavigation()]
            };
            return g
        }(a)
    });
    x(a, "Accessibility/HighContrastMode.js", [a["Core/Globals.js"]], function (a) {
        var h = a.doc, p = a.isMS, t = a.win;
        return {
            isHighContrastModeActive: function () {
                var a = /(Edg)/.test(t.navigator.userAgent);
                if (t.matchMedia && a) return t.matchMedia("(-ms-high-contrast: active)").matches;
                if (p && t.getComputedStyle) {
                    a = h.createElement("div");
                    a.style.backgroundImage =
                        "url(".concat("data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", ")");
                    h.body.appendChild(a);
                    var l = (a.currentStyle || t.getComputedStyle(a)).backgroundImage;
                    h.body.removeChild(a);
                    return "none" === l
                }
                return t.matchMedia && t.matchMedia("(forced-colors: active)").matches
            }, setHighContrastTheme: function (a) {
                a.highContrastModeActive = !0;
                var h = a.options.accessibility.highContrastTheme;
                a.update(h, !1);
                a.series.forEach(function (a) {
                    var l = h.plotOptions[a.type] || {};
                    a.update({
                        color: l.color || "windowText",
                        colors: [l.color || "windowText"], borderColor: l.borderColor || "window"
                    });
                    a.points.forEach(function (a) {
                        a.options && a.options.color && a.update({
                            color: l.color || "windowText",
                            borderColor: l.borderColor || "window"
                        }, !1)
                    })
                });
                a.redraw()
            }
        }
    });
    x(a, "Accessibility/HighContrastTheme.js", [], function () {
        return {
            chart: {backgroundColor: "window"},
            title: {style: {color: "windowText"}},
            subtitle: {style: {color: "windowText"}},
            colorAxis: {minColor: "windowText", maxColor: "windowText", stops: []},
            colors: ["windowText"],
            xAxis: {
                gridLineColor: "windowText",
                labels: {style: {color: "windowText"}},
                lineColor: "windowText",
                minorGridLineColor: "windowText",
                tickColor: "windowText",
                title: {style: {color: "windowText"}}
            },
            yAxis: {
                gridLineColor: "windowText",
                labels: {style: {color: "windowText"}},
                lineColor: "windowText",
                minorGridLineColor: "windowText",
                tickColor: "windowText",
                title: {style: {color: "windowText"}}
            },
            tooltip: {backgroundColor: "window", borderColor: "windowText", style: {color: "windowText"}},
            plotOptions: {
                series: {
                    lineColor: "windowText",
                    fillColor: "window",
                    borderColor: "windowText",
                    edgeColor: "windowText",
                    borderWidth: 1,
                    dataLabels: {
                        connectorColor: "windowText",
                        color: "windowText",
                        style: {color: "windowText", textOutline: "none"}
                    },
                    marker: {lineColor: "windowText", fillColor: "windowText"}
                },
                pie: {color: "window", colors: ["window"], borderColor: "windowText", borderWidth: 1},
                boxplot: {fillColor: "window"},
                candlestick: {lineColor: "windowText", fillColor: "window"},
                errorbar: {fillColor: "window"}
            },
            legend: {
                backgroundColor: "window",
                itemStyle: {color: "windowText"},
                itemHoverStyle: {color: "windowText"},
                itemHiddenStyle: {color: "#555"},
                title: {style: {color: "windowText"}}
            },
            credits: {style: {color: "windowText"}},
            labels: {style: {color: "windowText"}},
            drilldown: {activeAxisLabelStyle: {color: "windowText"}, activeDataLabelStyle: {color: "windowText"}},
            navigation: {buttonOptions: {symbolStroke: "windowText", theme: {fill: "window"}}},
            rangeSelector: {
                buttonTheme: {
                    fill: "window",
                    stroke: "windowText",
                    style: {color: "windowText"},
                    states: {
                        hover: {fill: "window", stroke: "windowText", style: {color: "windowText"}},
                        select: {fill: "#444", stroke: "windowText", style: {color: "windowText"}}
                    }
                },
                inputBoxBorderColor: "windowText",
                inputStyle: {backgroundColor: "window", color: "windowText"},
                labelStyle: {color: "windowText"}
            },
            navigator: {
                handles: {backgroundColor: "window", borderColor: "windowText"},
                outlineColor: "windowText",
                maskFill: "transparent",
                series: {color: "windowText", lineColor: "windowText"},
                xAxis: {gridLineColor: "windowText"}
            },
            scrollbar: {
                barBackgroundColor: "#444",
                barBorderColor: "windowText",
                buttonArrowColor: "windowText",
                buttonBackgroundColor: "window",
                buttonBorderColor: "windowText",
                rifleColor: "windowText",
                trackBackgroundColor: "window",
                trackBorderColor: "windowText"
            }
        }
    });
    x(a, "Accessibility/Options/A11yDefaults.js", [], function () {
        return {
            accessibility: {
                enabled: !0,
                screenReaderSection: {
                    beforeChartFormat: "<{headingTagName}>{chartTitle}</{headingTagName}><div>{typeDescription}</div><div>{chartSubtitle}</div><div>{chartLongdesc}</div><div>{playAsSoundButton}</div><div>{viewTableButton}</div><div>{xAxisDescription}</div><div>{yAxisDescription}</div><div>{annotationsTitle}{annotationsList}</div>",
                    afterChartFormat: "{endOfChartMarker}",
                    axisRangeDateFormat: "%Y-%m-%d %H:%M:%S"
                },
                series: {
                    descriptionFormat: "{seriesDescription}{authorDescription}{axisDescription}",
                    describeSingleSeries: !1,
                    pointDescriptionEnabledThreshold: 200
                },
                point: {valueDescriptionFormat: "{xDescription}{separator}{value}.", describeNull: !0},
                landmarkVerbosity: "all",
                linkedDescription: '*[data-highcharts-chart="{index}"] + .highcharts-description',
                keyboardNavigation: {
                    enabled: !0,
                    focusBorder: {
                        enabled: !0,
                        hideBrowserFocusOutline: !0,
                        style: {color: "#335cad", lineWidth: 2, borderRadius: 3},
                        margin: 2
                    },
                    order: ["series", "zoom", "rangeSelector", "legend", "chartMenu"],
                    wrapAround: !0,
                    seriesNavigation: {skipNullPoints: !0, pointNavigationEnabledThreshold: !1, rememberPointFocus: !1}
                },
                announceNewData: {enabled: !1, minAnnounceInterval: 5E3, interruptUser: !1}
            },
            legend: {accessibility: {enabled: !0, keyboardNavigation: {enabled: !0}}},
            exporting: {accessibility: {enabled: !0}}
        }
    });
    x(a, "Accessibility/Options/LangDefaults.js", [], function () {
        return {
            accessibility: {
                defaultChartTitle: "Chart",
                chartContainerLabel: "{title}. Highcharts interactive chart.",
                svgContainerLabel: "Interactive chart",
                drillUpButton: "{buttonText}",
                credits: "Chart credits: {creditsStr}",
                thousandsSep: ",",
                svgContainerTitle: "",
                graphicContainerLabel: "",
                screenReaderSection: {
                    beforeRegionLabel: "",
                    afterRegionLabel: "",
                    annotations: {
                        heading: "Chart annotations summary",
                        descriptionSinglePoint: "{annotationText}. Related to {annotationPoint}",
                        descriptionMultiplePoints: "{annotationText}. Related to {annotationPoint}{ Also related to, #each(additionalAnnotationPoints)}",
                        descriptionNoPoints: "{annotationText}"
                    },
                    endOfChartMarker: "End of interactive chart."
                },
                sonification: {
                    playAsSoundButtonText: "Play as sound, {chartTitle}",
                    playAsSoundClickAnnouncement: "Play"
                },
                legend: {
                    legendLabelNoTitle: "Toggle series visibility, {chartTitle}",
                    legendLabel: "Chart legend: {legendTitle}",
                    legendItem: "Show {itemName}"
                },
                zoom: {mapZoomIn: "Zoom chart", mapZoomOut: "Zoom out chart", resetZoomButton: "Reset zoom"},
                rangeSelector: {
                    dropdownLabel: "{rangeTitle}",
                    minInputLabel: "Select start date.",
                    maxInputLabel: "Select end date.",
                    clickButtonAnnouncement: "Viewing {axisRangeDescription}"
                },
                table: {
                    viewAsDataTableButtonText: "View as data table, {chartTitle}",
                    tableSummary: "Table representation of chart."
                },
                announceNewData: {
                    newDataAnnounce: "Updated data for chart {chartTitle}",
                    newSeriesAnnounceSingle: "New data series: {seriesDesc}",
                    newPointAnnounceSingle: "New data point: {pointDesc}",
                    newSeriesAnnounceMultiple: "New data series in chart {chartTitle}: {seriesDesc}",
                    newPointAnnounceMultiple: "New data point in chart {chartTitle}: {pointDesc}"
                },
                seriesTypeDescriptions: {
                    boxplot: "Box plot charts are typically used to display groups of statistical data. Each data point in the chart can have up to 5 values: minimum, lower quartile, median, upper quartile, and maximum.",
                    arearange: "Arearange charts are line charts displaying a range between a lower and higher value for each point.",
                    areasplinerange: "These charts are line charts displaying a range between a lower and higher value for each point.",
                    bubble: "Bubble charts are scatter charts where each data point also has a size value.",
                    columnrange: "Columnrange charts are column charts displaying a range between a lower and higher value for each point.",
                    errorbar: "Errorbar series are used to display the variability of the data.",
                    funnel: "Funnel charts are used to display reduction of data in stages.",
                    pyramid: "Pyramid charts consist of a single pyramid with item heights corresponding to each point value.",
                    waterfall: "A waterfall chart is a column chart where each column contributes towards a total end value."
                },
                chartTypes: {
                    emptyChart: "Empty chart",
                    mapTypeDescription: "Map of {mapTitle} with {numSeries} data series.",
                    unknownMap: "Map of unspecified region with {numSeries} data series.",
                    combinationChart: "Combination chart with {numSeries} data series.",
                    defaultSingle: "Chart with {numPoints} data {#plural(numPoints, points, point)}.",
                    defaultMultiple: "Chart with {numSeries} data series.",
                    splineSingle: "Line chart with {numPoints} data {#plural(numPoints, points, point)}.",
                    splineMultiple: "Line chart with {numSeries} lines.",
                    lineSingle: "Line chart with {numPoints} data {#plural(numPoints, points, point)}.",
                    lineMultiple: "Line chart with {numSeries} lines.",
                    columnSingle: "Bar chart with {numPoints} {#plural(numPoints, bars, bar)}.",
                    columnMultiple: "Bar chart with {numSeries} data series.",
                    barSingle: "Bar chart with {numPoints} {#plural(numPoints, bars, bar)}.",
                    barMultiple: "Bar chart with {numSeries} data series.",
                    pieSingle: "Pie chart with {numPoints} {#plural(numPoints, slices, slice)}.",
                    pieMultiple: "Pie chart with {numSeries} pies.",
                    scatterSingle: "Scatter chart with {numPoints} {#plural(numPoints, points, point)}.",
                    scatterMultiple: "Scatter chart with {numSeries} data series.",
                    boxplotSingle: "Boxplot with {numPoints} {#plural(numPoints, boxes, box)}.",
                    boxplotMultiple: "Boxplot with {numSeries} data series.",
                    bubbleSingle: "Bubble chart with {numPoints} {#plural(numPoints, bubbles, bubble)}.",
                    bubbleMultiple: "Bubble chart with {numSeries} data series."
                },
                axis: {
                    xAxisDescriptionSingular: "The chart has 1 X axis displaying {names[0]}. {ranges[0]}",
                    xAxisDescriptionPlural: "The chart has {numAxes} X axes displaying {#each(names, -1) }and {names[-1]}.",
                    yAxisDescriptionSingular: "The chart has 1 Y axis displaying {names[0]}. {ranges[0]}",
                    yAxisDescriptionPlural: "The chart has {numAxes} Y axes displaying {#each(names, -1) }and {names[-1]}.",
                    timeRangeDays: "Data range: {range} days.",
                    timeRangeHours: "Data range: {range} hours.",
                    timeRangeMinutes: "Data range: {range} minutes.",
                    timeRangeSeconds: "Data range: {range} seconds.",
                    rangeFromTo: "Data ranges from {rangeFrom} to {rangeTo}.",
                    rangeCategories: "Data range: {numCategories} categories."
                },
                exporting: {chartMenuLabel: "Chart menu", menuButtonLabel: "View chart menu, {chartTitle}"},
                series: {
                    summary: {
                        "default": "{series.name}, series {seriesNumber} of {chart.series.length} with {series.points.length} data {#plural(series.points.length, points, point)}.",
                        defaultCombination: "{series.name}, series {seriesNumber} of {chart.series.length} with {series.points.length} data {#plural(series.points.length, points, point)}.",
                        line: "{series.name}, line {seriesNumber} of {chart.series.length} with {series.points.length} data {#plural(series.points.length, points, point)}.",
                        lineCombination: "{series.name}, series {seriesNumber} of {chart.series.length}. Line with {series.points.length} data {#plural(series.points.length, points, point)}.",
                        spline: "{series.name}, line {seriesNumber} of {chart.series.length} with {series.points.length} data {#plural(series.points.length, points, point)}.",
                        splineCombination: "{series.name}, series {seriesNumber} of {chart.series.length}. Line with {series.points.length} data {#plural(series.points.length, points, point)}.",
                        column: "{series.name}, bar series {seriesNumber} of {chart.series.length} with {series.points.length} {#plural(series.points.length, bars, bar)}.",
                        columnCombination: "{series.name}, series {seriesNumber} of {chart.series.length}. Bar series with {series.points.length} {#plural(series.points.length, bars, bar)}.",
                        bar: "{series.name}, bar series {seriesNumber} of {chart.series.length} with {series.points.length} {#plural(series.points.length, bars, bar)}.",
                        barCombination: "{series.name}, series {seriesNumber} of {chart.series.length}. Bar series with {series.points.length} {#plural(series.points.length, bars, bar)}.",
                        pie: "{series.name}, pie {seriesNumber} of {chart.series.length} with {series.points.length} {#plural(series.points.length, slices, slice)}.",
                        pieCombination: "{series.name}, series {seriesNumber} of {chart.series.length}. Pie with {series.points.length} {#plural(series.points.length, slices, slice)}.",
                        scatter: "{series.name}, scatter plot {seriesNumber} of {chart.series.length} with {series.points.length} {#plural(series.points.length, points, point)}.",
                        scatterCombination: "{series.name}, series {seriesNumber} of {chart.series.length}, scatter plot with {series.points.length} {#plural(series.points.length, points, point)}.",
                        boxplot: "{series.name}, boxplot {seriesNumber} of {chart.series.length} with {series.points.length} {#plural(series.points.length, boxes, box)}.",
                        boxplotCombination: "{series.name}, series {seriesNumber} of {chart.series.length}. Boxplot with {series.points.length} {#plural(series.points.length, boxes, box)}.",
                        bubble: "{series.name}, bubble series {seriesNumber} of {chart.series.length} with {series.points.length} {#plural(series.points.length, bubbles, bubble)}.",
                        bubbleCombination: "{series.name}, series {seriesNumber} of {chart.series.length}. Bubble series with {series.points.length} {#plural(series.points.length, bubbles, bubble)}.",
                        map: "{series.name}, map {seriesNumber} of {chart.series.length} with {series.points.length} {#plural(series.points.length, areas, area)}.",
                        mapCombination: "{series.name}, series {seriesNumber} of {chart.series.length}. Map with {series.points.length} {#plural(series.points.length, areas, area)}.",
                        mapline: "{series.name}, line {seriesNumber} of {chart.series.length} with {series.points.length} data {#plural(series.points.length, points, point)}.",
                        maplineCombination: "{series.name}, series {seriesNumber} of {chart.series.length}. Line with {series.points.length} data {#plural(series.points.length, points, point)}.",
                        mapbubble: "{series.name}, bubble series {seriesNumber} of {chart.series.length} with {series.points.length} {#plural(series.points.length, bubbles, bubble)}.",
                        mapbubbleCombination: "{series.name}, series {seriesNumber} of {chart.series.length}. Bubble series with {series.points.length} {#plural(series.points.length, bubbles, bubble)}."
                    },
                    description: "{description}",
                    xAxisDescription: "X axis, {name}",
                    yAxisDescription: "Y axis, {name}",
                    nullPointValue: "No value",
                    pointAnnotationsDescription: "{Annotation: #each(annotations). }"
                }
            }
        }
    });
    x(a, "Accessibility/Options/DeprecatedOptions.js", [a["Core/Utilities.js"]], function (a) {
        function h(a, h, k) {
            for (var c, e = 0; e < h.length - 1; ++e) c = h[e], a = a[c] = v(a[c], {});
            a[h[h.length - 1]] = k
        }

        function p(a, l, k, c) {
            function e(a, b) {
                return b.reduce(function (a, b) {
                    return a[b]
                }, a)
            }

            var d = e(a.options, l), b = e(a.options, k);
            Object.keys(c).forEach(function (e) {
                var f,
                    g = d[e];
                "undefined" !== typeof g && (h(b, c[e], g), x(32, !1, a, (f = {}, f[l.join(".") + "." + e] = k.join(".") + "." + c[e].join("."), f)))
            })
        }

        function t(a) {
            var g = a.options.chart, h = a.options.accessibility || {};
            ["description", "typeDescription"].forEach(function (c) {
                var e;
                g[c] && (h[c] = g[c], x(32, !1, a, (e = {}, e["chart.".concat(c)] = "use accessibility.".concat(c), e)))
            })
        }

        function q(a) {
            a.axes.forEach(function (g) {
                (g = g.options) && g.description && (g.accessibility = g.accessibility || {}, g.accessibility.description = g.description, x(32, !1, a, {"axis.description": "use axis.accessibility.description"}))
            })
        }

        function l(a) {
            var g = {
                description: ["accessibility", "description"],
                exposeElementToA11y: ["accessibility", "exposeAsGroupOnly"],
                pointDescriptionFormatter: ["accessibility", "point", "descriptionFormatter"],
                skipKeyboardNavigation: ["accessibility", "keyboardNavigation", "enabled"],
                "accessibility.pointDescriptionFormatter": ["accessibility", "point", "descriptionFormatter"]
            };
            a.series.forEach(function (k) {
                Object.keys(g).forEach(function (c) {
                    var e, d = k.options[c];
                    "accessibility.pointDescriptionFormatter" === c && (d = k.options.accessibility &&
                        k.options.accessibility.pointDescriptionFormatter);
                    "undefined" !== typeof d && (h(k.options, g[c], "skipKeyboardNavigation" === c ? !d : d), x(32, !1, a, (e = {}, e["series.".concat(c)] = "series." + g[c].join("."), e)))
                })
            })
        }

        var x = a.error, v = a.pick;
        return function (a) {
            t(a);
            q(a);
            a.series && l(a);
            p(a, ["accessibility"], ["accessibility"], {
                pointDateFormat: ["point", "dateFormat"],
                pointDateFormatter: ["point", "dateFormatter"],
                pointDescriptionFormatter: ["point", "descriptionFormatter"],
                pointDescriptionThreshold: ["series", "pointDescriptionEnabledThreshold"],
                pointNavigationThreshold: ["keyboardNavigation", "seriesNavigation", "pointNavigationEnabledThreshold"],
                pointValueDecimals: ["point", "valueDecimals"],
                pointValuePrefix: ["point", "valuePrefix"],
                pointValueSuffix: ["point", "valueSuffix"],
                screenReaderSectionFormatter: ["screenReaderSection", "beforeChartFormatter"],
                describeSingleSeries: ["series", "describeSingleSeries"],
                seriesDescriptionFormatter: ["series", "descriptionFormatter"],
                onTableAnchorClick: ["screenReaderSection", "onViewDataTableClick"],
                axisRangeDateFormat: ["screenReaderSection",
                    "axisRangeDateFormat"]
            });
            p(a, ["accessibility", "keyboardNavigation"], ["accessibility", "keyboardNavigation", "seriesNavigation"], {
                skipNullPoints: ["skipNullPoints"],
                mode: ["mode"]
            });
            p(a, ["lang", "accessibility"], ["lang", "accessibility"], {
                legendItem: ["legend", "legendItem"],
                legendLabel: ["legend", "legendLabel"],
                mapZoomIn: ["zoom", "mapZoomIn"],
                mapZoomOut: ["zoom", "mapZoomOut"],
                resetZoomButton: ["zoom", "resetZoomButton"],
                screenReaderRegionLabel: ["screenReaderSection", "beforeRegionLabel"],
                rangeSelectorButton: ["rangeSelector",
                    "buttonText"],
                rangeSelectorMaxInput: ["rangeSelector", "maxInputLabel"],
                rangeSelectorMinInput: ["rangeSelector", "minInputLabel"],
                svgContainerEnd: ["screenReaderSection", "endOfChartMarker"],
                viewAsDataTable: ["table", "viewAsDataTableButtonText"],
                tableSummary: ["table", "tableSummary"]
            })
        }
    });
    x(a, "Accessibility/Accessibility.js", [a["Core/DefaultOptions.js"], a["Core/Globals.js"], a["Core/Utilities.js"], a["Accessibility/Utils/HTMLUtilities.js"], a["Accessibility/A11yI18n.js"], a["Accessibility/Components/ContainerComponent.js"],
        a["Accessibility/FocusBorder.js"], a["Accessibility/Components/InfoRegionsComponent.js"], a["Accessibility/KeyboardNavigation.js"], a["Accessibility/Components/LegendComponent.js"], a["Accessibility/Components/MenuComponent.js"], a["Accessibility/Components/SeriesComponent/NewDataAnnouncer.js"], a["Accessibility/ProxyProvider.js"], a["Accessibility/Components/RangeSelectorComponent.js"], a["Accessibility/Components/SeriesComponent/SeriesComponent.js"], a["Accessibility/Components/ZoomComponent.js"], a["Accessibility/HighContrastMode.js"],
        a["Accessibility/HighContrastTheme.js"], a["Accessibility/Options/A11yDefaults.js"], a["Accessibility/Options/LangDefaults.js"], a["Accessibility/Options/DeprecatedOptions.js"]], function (a, h, p, w, q, l, x, v, g, n, k, c, e, d, b, f, y, z, K, J, F) {
        a = a.defaultOptions;
        var t = h.doc, A = p.addEvent, E = p.extend, C = p.fireEvent, D = p.merge, G = w.removeElement;
        h = function () {
            function a(a) {
                this.proxyProvider = this.keyboardNavigation = this.components = this.chart = void 0;
                this.init(a)
            }

            a.prototype.init = function (a) {
                this.chart = a;
                t.addEventListener &&
                a.renderer.isSVG ? (F(a), this.proxyProvider = new e(this.chart), this.initComponents(), this.keyboardNavigation = new g(a, this.components)) : (this.zombie = !0, this.components = {}, a.renderTo.setAttribute("aria-hidden", !0))
            };
            a.prototype.initComponents = function () {
                var a = this.chart, c = this.proxyProvider, e = a.options.accessibility;
                this.components = {
                    container: new l,
                    infoRegions: new v,
                    legend: new n,
                    chartMenu: new k,
                    rangeSelector: new d,
                    series: new b,
                    zoom: new f
                };
                e.customComponents && E(this.components, e.customComponents);
                var g =
                    this.components;
                this.getComponentOrder().forEach(function (b) {
                    g[b].initBase(a, c);
                    g[b].init()
                })
            };
            a.prototype.getComponentOrder = function () {
                if (!this.components) return [];
                if (!this.components.series) return Object.keys(this.components);
                var a = Object.keys(this.components).filter(function (a) {
                    return "series" !== a
                });
                return ["series"].concat(a)
            };
            a.prototype.update = function () {
                var a = this.components, b = this.chart, c = b.options.accessibility;
                C(b, "beforeA11yUpdate");
                b.types = this.getChartTypes();
                c = c.keyboardNavigation.order;
                this.proxyProvider.updateGroupOrder(c);
                this.getComponentOrder().forEach(function (c) {
                    a[c].onChartUpdate();
                    C(b, "afterA11yComponentUpdate", {name: c, component: a[c]})
                });
                this.keyboardNavigation.update(c);
                !b.highContrastModeActive && y.isHighContrastModeActive() && y.setHighContrastTheme(b);
                C(b, "afterA11yUpdate", {accessibility: this})
            };
            a.prototype.destroy = function () {
                var a = this.chart || {}, b = this.components;
                Object.keys(b).forEach(function (a) {
                    b[a].destroy();
                    b[a].destroyBase()
                });
                this.proxyProvider && this.proxyProvider.destroy();
                a.announcerContainer && G(a.announcerContainer);
                this.keyboardNavigation && this.keyboardNavigation.destroy();
                a.renderTo && a.renderTo.setAttribute("aria-hidden", !0);
                a.focusElement && a.focusElement.removeFocusBorder()
            };
            a.prototype.getChartTypes = function () {
                var a = {};
                this.chart.series.forEach(function (b) {
                    a[b.type] = 1
                });
                return Object.keys(a)
            };
            return a
        }();
        (function (a) {
            function e() {
                this.accessibility && this.accessibility.destroy()
            }

            function f() {
                this.a11yDirty && this.renderTo && (delete this.a11yDirty, this.updateA11yEnabled());
                var a = this.accessibility;
                a && !a.zombie && (a.proxyProvider.updateProxyElementPositions(), a.getComponentOrder().forEach(function (b) {
                    a.components[b].onChartRender()
                }))
            }

            function h(a) {
                if (a = a.options.accessibility) a.customComponents && (this.options.accessibility.customComponents = a.customComponents, delete a.customComponents), D(!0, this.options.accessibility, a), this.accessibility && this.accessibility.destroy && (this.accessibility.destroy(), delete this.accessibility);
                this.a11yDirty = !0
            }

            function l() {
                var b = this.accessibility,
                    c = this.options.accessibility;
                c && c.enabled ? b && !b.zombie ? b.update() : (this.accessibility = b = new a(this), !b.zombie) && b.update() : b ? (b.destroy && b.destroy(), delete this.accessibility) : this.renderTo.setAttribute("aria-hidden", !0)
            }

            function p() {
                this.series.chart.accessibility && (this.series.chart.a11yDirty = !0)
            }

            var t = [];
            a.i18nFormat = q.i18nFormat;
            a.compose = function (a, m, r, u, v, w, y) {
                g.compose(m);
                c.compose(v);
                n.compose(m, r);
                k.compose(m);
                b.compose(m, u, v);
                q.compose(m);
                x.compose(m, w);
                y && d.compose(m, y);
                -1 === t.indexOf(m) &&
                (t.push(m), m.prototype.updateA11yEnabled = l, A(m, "destroy", e), A(m, "render", f), A(m, "update", h), ["addSeries", "init"].forEach(function (a) {
                    A(m, a, function () {
                        this.a11yDirty = !0
                    })
                }), ["afterApplyDrilldown", "drillupall"].forEach(function (a) {
                    A(m, a, function () {
                        var a = this.accessibility;
                        a && !a.zombie && a.update()
                    })
                }));
                -1 === t.indexOf(u) && (t.push(u), A(u, "update", p));
                -1 === t.indexOf(v) && (t.push(v), ["update", "updatedData", "remove"].forEach(function (a) {
                    A(v, a, function () {
                        this.chart.accessibility && (this.chart.a11yDirty = !0)
                    })
                }))
            }
        })(h ||
            (h = {}));
        D(!0, a, K, {accessibility: {highContrastTheme: z}, lang: J});
        return h
    });
    x(a, "masters/modules/accessibility.src.js", [a["Core/Globals.js"], a["Accessibility/Accessibility.js"], a["Accessibility/AccessibilityComponent.js"], a["Accessibility/Utils/ChartUtilities.js"], a["Accessibility/Utils/HTMLUtilities.js"], a["Accessibility/KeyboardNavigationHandler.js"], a["Accessibility/Components/SeriesComponent/SeriesDescriber.js"]], function (a, h, p, w, q, l, x) {
        a.i18nFormat = h.i18nFormat;
        a.A11yChartUtilities = w;
        a.A11yHTMLUtilities =
            q;
        a.AccessibilityComponent = p;
        a.KeyboardNavigationHandler = l;
        a.SeriesAccessibilityDescriber = x;
        h.compose(a.Axis, a.Chart, a.Legend, a.Point, a.Series, a.SVGElement, a.RangeSelector)
    })
});
//# sourceMappingURL=accessibility.js.map