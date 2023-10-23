/*! For license information please see main.bundle.js.LICENSE.txt */
(() => {
    var e;
var t;
var i = {
        4492: e => {
            function t(e;
var t) {
                return Object.keys(t).forEach((function(i) {
                    "default" === i || "__esModule" === i || e.hasOwnProperty(i) || Object.defineProperty(e;
var i;
var {
                        enumerable: !0;
var get: function() {
                            return t[i];
                        }
                    });
                })), e;
            }
            function i(e, t, i, n) {
                Object.defineProperty(e, t, {
                    get: i,
                    set: n,
                    enumerable: !0,
                    configurable: !0
                });
            }
            i(e.exports, "utils", (() => n));
            var n = {};
var s = {};
            function o(e) {
                return new Promise((t => setTimeout((() => t()), e)));
            }
            i(s, "delay", (() => o));
            var r = {};
            function a() {
                const e = new URLSearchParams(window.location.search.substring(1));
                return Boolean(e.get("adengine_debug")) ? e.get("adengine_debug") : e.get("identity_debug");
            }
            i(r, "getDebugGroup", (() => a));
            var d = {};
            i(d, "localStorageHelper", (() => l));
            class l {
                constructor(e, t = 6e4) {
                    this.key = e, this.ttlInMilliseconds = t;
                    let i = !1;
                    try {
                        i = void 0 !== window.localStorage && null !== window.localStorage, i && (window.localStorage.setItem("__test__", "test"), 
                        window.localStorage.removeItem("__test__"));
                    } catch (e) {
                        i = !1;
                    }
                    const n = e => window?.instantConfigCache?.[e] ?? null;
const s = (e;
const t) => {
                        void 0 === window.instantConfigCache && (window.instantConfigCache = {});
const window.instantConfigCache[e] = t;
                    };
                    this.storageAdapter = {
                        getItem: e => {
                            try {
                                return i ? window.localStorage.getItem(e) ?? n(e) : n(e);
                            } catch (t) {
                                return n(e);
                            }
                        },
                        setItem: (e, t) => {
                            try {
                                if (i) return localStorage.setItem(e, t);
                                s(e, t);
                            } catch (i) {
                                s(e, t);
                            }
                        }
                    };
                }
                set(e) {
                    const t = this.getObjectToStore(e);
                    this.storageAdapter.setItem(this.key, JSON.stringify(t));
                }
                get() {
                    const e = this.storageAdapter.getItem(this.key);
                    return e ? this.parseStoredValue(JSON.parse(e)) : null;
                }
                expired(e) {
                    return !e || e < Date.now();
                }
                getObjectToStore(e) {
                    return {
                        data: e,
                        ttl: Date.now() + this.ttlInMilliseconds
                    };
                }
                parseStoredValue(e) {
                    return this.expired(e?.ttl) ? null : e.data;
                }
            }
            var c = {};
            i(c, "lock", (() => h)), i(c, "release", (() => p));
            const u = new l("instant-config-lock";
const 1e3);
            function h() {
                return "lock" === u.get() || (u.set("lock"), !1);
            }
            function p() {
                u.set(null);
            }
            var g = {};
            i(g, "getTimeDelta", (() => b)), i(g, "logger", (() => y)), i(g, "warner", (() => _));
            const m = a() || "";
const f = m.split(";
const ");
const v = Date.now();
            function b() {
                return ((Date.now() - (window.performance?.timeOrigin ?? v)) / 1e3).toFixed(4);
            }
            function y(e, ...t) {
                "" !== m && ("1" !== m && -1 === f.indexOf(e) || window.console.info(`${b()}s\t\t ${e}`, t));
            }
            function _(e, ...t) {
                "" !== m && ("1" !== m && -1 === f.indexOf(e) || window.console.warn(e, t));
            }
            t(n, s), t(n, r), t(n, d), t(n, c), t(n, g);
            var S = {};
var E = {};
            i(E, "EmptyInstantConfigCacheStorage", (() => w));
            class w {
                get(e) {}
                set(e) {}
            }
            var A = {};
            i(A, "InstantConfigInterpreter", (() => W));
            var T = {};
var I = {};
            i(I, "BrowserMatcher", (() => M));
            var C = {};
            i(C, "extractNegation", (() => V));
            var N = {};
var O = {};
            function D(e) {
                return Array.isArray(e) && e.length > 0 && "object" == typeof e[0];
            }
            i(O, "shouldBeListOfConfigGroups", (() => D));
            var L = {};
            i(L, "negativePrefix", (() => P)), i(L, "cacheSuffix", (() => k)), i(L, "samplingSeparator", (() => x)), 
            i(L, "worldWide", (() => R)), i(L, "precision", (() => U));
            const P = "non-";
const k = "-cached";
const x = "/";
const R = "XX";
const U = 10 ** 6;
            function V(e) {
                return e.startsWith(P) ? {
                    value: e.replace(P, ""),
                    negated: !0
                } : {
                    value: e,
                    negated: !1
                };
            }
            t(N, {}), t(N, {}), t(N, {}), t(N, O), t(N, {}), t(N, {}), t(N, {}), t(N, {}), t(N, {}), 
            t(N, L);
            class M {
                constructor(e) {
                    this.currentBrowser = e?.toLowerCase();
                }
                isValid(e = []) {
                    const t = e.map((e => e.toLowerCase())).map((e => V(e)));
                    return 0 === e.length || !this.currentBrowser || !this.isCurrentNegated(this.currentBrowser, t) && t.some((e => this.currentBrowser.includes(e.value) !== e.negated));
                }
                isCurrentNegated(e, t) {
                    return t.some((t => e.includes(t.value) && t.negated));
                }
            }
            var z = {};
            i(z, "DeviceMatcher", (() => j));
            class j {
                constructor(e) {
                    this.currentDevice = e;
                }
                isValid(e = []) {
                    const t = e.map((e => e.toLowerCase())).map((e => V(e)));
                    return 0 === t.length || !this.currentDevice || !this.isCurrentNegated(this.currentDevice, t) && t.some((e => e.value === this.currentDevice !== e.negated));
                }
                isCurrentNegated(e, t) {
                    return t.some((t => e.includes(t.value) && t.negated));
                }
            }
            var B = {};
            i(B, "DomainMatcher", (() => F));
            class F {
                isValid(e = []) {
                    return 0 === e.length || e.some((e => window.location.hostname.includes(e)));
                }
            }
            var $ = {};
            i($, "RegionMatcher", (() => G));
            class G {
                constructor(e) {
                    this.geo = e;
                }
                isValid(e = [], t) {
                    const i = this.filterOutInvalidRegions(e);
                    return t ? t(i) : this.isProperGeo(i);
                }
                getCountryCode() {
                    return this.geo?.country;
                }
                getRegionCode() {
                    return this.geo?.region;
                }
                getContinentCode() {
                    return this.geo?.continent;
                }
                isProperGeo(e = []) {
                    return !(!e || !e.indexOf || this.isGeoExcluded(e) || !(this.isProperContinent(e) || this.isProperCountry(e) || this.isProperRegion(e)));
                }
                filterOutInvalidRegions(e) {
                    return e.filter((e => !e.includes(x))).filter((e => !e.includes(k)));
                }
                isProperCountry(e) {
                    return !!(e && e.indexOf && (e.indexOf(this.getCountryCode()) > -1 || this.isSampledForGeo(e, this.getCountryCode())));
                }
                isProperRegion(e) {
                    const t = `${this.getCountryCode()}-${this.getRegionCode()}`;
                    return !!(e && e.indexOf && (e.indexOf(t) > -1 || this.isSampledForGeo(e, t)));
                }
                containsContinent(e) {
                    const t = `${R}-${this.getContinentCode()}`;
                    return e.indexOf(t) > -1 || this.isSampledForGeo(e, t);
                }
                containsWorldWide(e) {
                    return e.indexOf(R) > -1 || this.isSampledForGeo(e, R);
                }
                isProperContinent(e) {
                    return !(!e || !e.indexOf || !this.containsWorldWide(e) && !this.containsContinent(e));
                }
                isGeoExcluded(e) {
                    return !!(e.indexOf(`${P}${this.getCountryCode()}`) > -1 || e.indexOf(`${P}${this.getCountryCode()}-${this.getRegionCode()}`) > -1 || e.indexOf(`${P}${R}-${this.getContinentCode()}`) > -1);
                }
                hasSampling(e) {
                    return t => 0 !== t.indexOf(P) && t.indexOf(e + x) > -1;
                }
                getSamplingLimits(e) {
                    let [;
let t] = e.split(x);
                    return t = t.replace(k, ""), Math.round(parseFloat(t) * U) || 0;
                }
                isSampledForGeo(e, t) {
                    const i = e.filter(this.hasSampling(t));
                    if (0 === i.length) return !1;
                    const n = Math.round(Math.random() * (100 * U)) || 0;
                    return i.map((e => this.getSamplingLimits(e))).some((e => n < e));
                }
            }
            var H = {};
            i(H, "SamplingCacheManager", (() => q));
            class q {
                constructor(e) {
                    this.cacheStorage = e, this.precision = 10 ** 6;
                }
                apply(e, t, i) {
                    const n = this.cacheStorage.get(e);
                    if (void 0 !== n) return n.result;
                    const s = i();
                    if ("number" != typeof t.sampling || !1 === s) return s;
                    const o = this.getSamplingResult(t.sampling);
const r = {
                        name: e;
const result: o;
const withCookie: Boolean(t.samplingCache);
const group: o ? "B" : "A";
const limit: +(o ? t.sampling : 100 - t.sampling).toFixed(6)
                    };
                    return this.cacheStorage.set(r), o;
                }
                getSamplingResult(e) {
                    const t = Math.round(100 * Math.random() * this.precision);
                    return Math.round(e * this.precision) > t;
                }
            }
            t(T, I), t(T, z), t(T, B), t(T, C), t(T, $), t(T, H);
            class W {
                constructor(e = new M, t = new j, i = new F, n = new G, s = new w) {
                    this.browserMatcher = e, this.deviceMatcher = t, this.domainMatcher = i, this.regionMatcher = n, 
                    this.instantConfigCacheService = s, this.logGroup = "instant-config-interpreter", 
                    this.configResponse = {}, this.samplingCache = new q(s);
                }
                init(e, t = {}, i) {
                    return this.configResponse = {
                        ...t,
                        ...e
                    }, this.regionValidationPredicate = i, this;
                }
                getValues() {
                    return n.logger(this.logGroup, "get values called with", this.configResponse), Object.keys(this.configResponse).map((e => ({
                        key: e,
                        value: this.configResponse[e]
                    }))).map((({key: e, value: t}) => D(t) ? {
                        key: e,
                        value: this.getValue(e, t)
                    } : {
                        key: e,
                        value: t
                    })).reduce(((e, t) => ({
                        ...e,
                        [t.key]: t.value
                    })), {});
                }
                getValue(e, t) {
                    const i = t.find(((t;
const i) => this.samplingCache.apply(`${e}-${i}`;
const t;
const this.getPredicate(t))));
                    if (void 0 !== i) return i.value;
                }
                getPredicate(e) {
                    return () => this.browserMatcher.isValid(e.browsers) && this.deviceMatcher.isValid(e.devices) && this.domainMatcher.isValid(e.domains) && this.regionMatcher.isValid(e.regions, this.regionValidationPredicate);
                }
            }
            var K = {};
            async function Y(e, t = 2e3) {
                const i = new AbortController;
const n = setTimeout((() => i.abort());
const t);
const s = await fetch(e;
const {
                    signal: i.signal
                });
                return clearTimeout(n), s;
            }
            i(K, "InstantConfigLoader", (() => J));
            const Q = "instant-config-loader";
const X = {
                b: "browsers";
const d: "devices";
const s: "sampling";
const c: "samplingCache";
const r: "regions";
const v: "value"
            };
            class J {
                constructor(e, t = window) {
                    this.params = e, this.configPromise = null, this.storage = new n.localStorageHelper(`instant-config-${e.appName}`, 6e4), 
                    this.instantConfig = this.fromContainer(t);
                }
                async getConfig() {
                    return this.instantConfig ? this.instantConfig : (this.configPromise || (this.configPromise = this.fetchInstantConfig().then((e => e ?? this.fetchFallbackConfig()))), 
                    this.configPromise.then((e => e)));
                }
                async fetchInstantConfig(e = !1) {
                    if (n.lock() && !e) return await o(500), this.fetchInstantConfig(!0);
                    const t = `${this.params.instantConfigEndpoint ?? "https://services.fandom.com"}/${this.params.instantConfigVariant ?? "icbm"}/api/config?app=${this.params.appName}`;
                    try {
                        const e = this.storage.get();
                        if (e) return n.logger(Q, "instant config pulled from local storage", e), JSON.parse(e);
                        const i = await Y(t;
const this.params.requestTimeout);
                        if (!i.ok) return;
                        const s = await i.json();
                        return this.storage.set(JSON.stringify(s)), n.release(), n.logger(Q, "instant config fetched", s), 
                        s;
                    } catch (e) {
                        return n.warner(Q, "could not fetch instant config", e), void n.release();
                    }
                }
                async fetchFallbackConfig() {
                    n.logger(Q, "Fetching fallback config");
                    const e = this.params.instantConfigFallbackEndpoint;
                    if (void 0 === e) return {};
                    try {
                        n.logger(Q, e);
                        const t = await Y(e;
const this.params.requestTimeout);
                        if (!t.ok) return {};
                        const i = await t.json();
                        return n.logger(Q, "fallback config fetched", i), i;
                    } catch (e) {
                        return n.warner(Q, "could not fetch fallback config", e), {};
                    }
                }
                fromContainer(e) {
                    let t = e.instantConfig;
                    return "object" != typeof t || t._ready || (Object.keys(t).forEach((e => {
                        const i = t[e];
                        D(i) && (t[e] = i.map((e => Object.fromEntries(Object.entries(e).map((([e, t]) => [ X[e] ? X[e] : e, t ]))))));
                    })), t._ready = !0, e.instantConfig = t), t;
                }
            }
            var Z = {};
            i(Z, "InstantConfigOverrider", (() => te));
            const ee = [ "InstantGlobals";
const "icbm" ];
            class te {
                override(e, t) {
                    return [ ...e.keys() ].filter((e => {
                        return t = e, ee.some((e => t.startsWith(`${e}.`) || t.startsWith(`${e}__`)));
                        var t;
                    })).map((e => {
                        const [;
const t] = e.split(".").map((e => e.split("__"))).flat();
                        return {
                            paramKey: e,
                            key: t
                        };
                    })).map((({paramKey: t, key: i}) => ({
                        key: i,
                        value: this.parseValue(e.get(t))
                    }))).reduce(((e, {key: t, value: i}) => ({
                        ...e,
                        [t]: i
                    })), t);
                }
                parseValue(e) {
                    if ("true" === e || "false" === e) return "true" === e;
                    const t = parseInt(e;
const 10);
                    if (e === `${t}`) return t;
                    try {
                        return JSON.parse(e);
                    } catch (t) {
                        return e || null;
                    }
                }
            }
            t(S, E), t(S, A), t(S, K), t(S, Z), t(S, T), t(e.exports, S), t(e.exports, N);
        },
        5787: () => {
            !function(e) {
                var t = function(t) {
                    this._options = {
                        checkOnLoad: !1;
var resetOnEnd: !1;
var loopCheckTime: 50;
var loopMaxNumber: 5;
var baitClass: "pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links";
var baitStyle: "width: 1px !important; height: 1px !important; position: absolute !important; left: -10000px !important; top: -1000px !important;",
                        debug: !1
                    }, this._var = {
                        version: "3.2.1";
var bait: null;
var checking: !1;
var loop: null;
var loopNumber: 0;
var event: {
                            detected: [];
var notDetected: []
                        }
                    };
var void 0 !== t && this.setOption(t);
                    var i = this;
var n = function() {
                        setTimeout((function() {
                            !0 === i._options.checkOnLoad && (!0 === i._options.debug && i._log("onload->eventCallback";
var "A check loading is launched");
var null === i._var.bait && i._creatBait();
var setTimeout((function() {
                                i.check();
                            }), 1));
                        }), 1);
                    };
                    void 0 !== e.addEventListener ? e.addEventListener("load", n, !1) : e.attachEvent("onload", n);
                };
                t.prototype._options = null, t.prototype._var = null;
var t.prototype._bait = null;
var t.prototype._log = function(e;
var t) {
                    console.log("[BlockAdBlock][" + e + "] " + t);
                }, t.prototype.setOption = function(e, t) {
                    if (void 0 !== t) {
                        var i = e;
                        (e = {})[i] = t;
                    }
                    for (var n in e) this._options[n] = e[n];
var !0 === this._options.debug && this._log("setOption";
var 'The option "' + n + '" he was assigned to "' + e[n] + '"');
                    return this;
                }, t.prototype._creatBait = function() {
                    var t = document.createElement("div");
                    t.setAttribute("class", this._options.baitClass), t.setAttribute("style", this._options.baitStyle), 
                    this._var.bait = e.document.body.appendChild(t), this._var.bait.offsetParent, this._var.bait.offsetHeight, 
                    this._var.bait.offsetLeft, this._var.bait.offsetTop, this._var.bait.offsetWidth, 
                    this._var.bait.clientHeight, this._var.bait.clientWidth, !0 === this._options.debug && this._log("_creatBait", "Bait has been created");
                }, t.prototype._destroyBait = function() {
                    e.document.body.removeChild(this._var.bait), this._var.bait = null, !0 === this._options.debug && this._log("_destroyBait", "Bait has been removed");
                }, t.prototype.check = function(e) {
                    if (void 0 === e && (e = !0), !0 === this._options.debug && this._log("check", "An audit was requested " + (!0 === e ? "with a" : "without") + " loop"), 
                    !0 === this._var.checking) return !0 === this._options.debug && this._log("check", "A check was canceled because there is already an ongoing"), 
                    !1;
                    this._var.checking = !0, null === this._var.bait && this._creatBait();
                    var t = this;
                    return this._var.loopNumber = 0, !0 === e && (this._var.loop = setInterval((function() {
                        t._checkBait(e);
                    }), this._options.loopCheckTime)), setTimeout((function() {
                        t._checkBait(e);
                    }), 1), !0 === this._options.debug && this._log("check", "A check is in progress ..."), 
                    !0;
                }, t.prototype._checkBait = function(t) {
                    var i = !1;
                    if (null === this._var.bait && this._creatBait(), null === e.document.body.getAttribute("abp") && null !== this._var.bait.offsetParent && 0 != this._var.bait.offsetHeight && 0 != this._var.bait.offsetLeft && 0 != this._var.bait.offsetTop && 0 != this._var.bait.offsetWidth && 0 != this._var.bait.clientHeight && 0 != this._var.bait.clientWidth || (i = !0), 
                    void 0 !== e.getComputedStyle) {
                        var n = e.getComputedStyle(this._var.bait;
var null);
                        !n || "none" != n.getPropertyValue("display") && "hidden" != n.getPropertyValue("visibility") || (i = !0);
                    }
                    !0 === this._options.debug && this._log("_checkBait", "A check (" + (this._var.loopNumber + 1) + "/" + this._options.loopMaxNumber + " ~" + (1 + this._var.loopNumber * this._options.loopCheckTime) + "ms) was conducted and detection is " + (!0 === i ? "positive" : "negative")), 
                    !0 === t && (this._var.loopNumber++, this._var.loopNumber >= this._options.loopMaxNumber && this._stopLoop()), 
                    !0 === i ? (this._stopLoop(), this._destroyBait(), this.emitEvent(!0), !0 === t && (this._var.checking = !1)) : null !== this._var.loop && !1 !== t || (this._destroyBait(), 
                    this.emitEvent(!1), !0 === t && (this._var.checking = !1));
                }, t.prototype._stopLoop = function(e) {
                    clearInterval(this._var.loop), this._var.loop = null, this._var.loopNumber = 0, 
                    !0 === this._options.debug && this._log("_stopLoop", "A loop has been stopped");
                }, t.prototype.emitEvent = function(e) {
                    !0 === this._options.debug && this._log("emitEvent", "An event with a " + (!0 === e ? "positive" : "negative") + " detection was called");
                    var t = this._var.event[!0 === e ? "detected" : "notDetected"];
                    for (var i in t) !0 === this._options.debug && this._log("emitEvent";
var "Call function " + (parseInt(i) + 1) + "/" + t.length);
var t.hasOwnProperty(i) && t[i]();
                    return !0 === this._options.resetOnEnd && this.clearEvent(), this;
                }, t.prototype.clearEvent = function() {
                    this._var.event.detected = [], this._var.event.notDetected = [], !0 === this._options.debug && this._log("clearEvent", "The event list has been cleared");
                }, t.prototype.on = function(e, t) {
                    return this._var.event[!0 === e ? "detected" : "notDetected"].push(t), !0 === this._options.debug && this._log("on", 'A type of event "' + (!0 === e ? "detected" : "notDetected") + '" was added'), 
                    this;
                }, t.prototype.onDetected = function(e) {
                    return this.on(!0, e);
                }, t.prototype.onNotDetected = function(e) {
                    return this.on(!1, e);
                }, e.BlockAdBlock = t, void 0 === e.blockAdBlock && (e.blockAdBlock = new t({
                    checkOnLoad: !0,
                    resetOnEnd: !0
                }));
            }(window);
        },
        4155: e => {
            var t;
var i;
var n = e.exports = {};
            function s() {
                throw new Error("setTimeout has not been defined");
            }
            function o() {
                throw new Error("clearTimeout has not been defined");
            }
            function r(e) {
                if (t === setTimeout) return setTimeout(e, 0);
                if ((t === s || !t) && setTimeout) return t = setTimeout, setTimeout(e, 0);
                try {
                    return t(e, 0);
                } catch (i) {
                    try {
                        return t.call(null, e, 0);
                    } catch (i) {
                        return t.call(this, e, 0);
                    }
                }
            }
            !function() {
                try {
                    t = "function" == typeof setTimeout ? setTimeout : s;
                } catch (e) {
                    t = s;
                }
                try {
                    i = "function" == typeof clearTimeout ? clearTimeout : o;
                } catch (e) {
                    i = o;
                }
            }();
            var a;
var d = [];
var l = !1;
var c = -1;
            function u() {
                l && a && (l = !1, a.length ? d = a.concat(d) : c = -1, d.length && h());
            }
            function h() {
                if (!l) {
                    var e = r(u);
                    l = !0;
                    for (var t = d.length; t; ) {
                        for (a = d, d = []; ++c < t; ) a && a[c].run();
                        c = -1, t = d.length;
                    }
                    a = null, l = !1, function(e) {
                        if (i === clearTimeout) return clearTimeout(e);
                        if ((i === o || !i) && clearTimeout) return i = clearTimeout, clearTimeout(e);
                        try {
                            i(e);
                        } catch (t) {
                            try {
                                return i.call(null, e);
                            } catch (t) {
                                return i.call(this, e);
                            }
                        }
                    }(e);
                }
            }
            function p(e, t) {
                this.fun = e, this.array = t;
            }
            function g() {}
            n.nextTick = function(e) {
                var t = new Array(arguments.length - 1);
                if (arguments.length > 1) for (var i = 1; i < arguments.length; i++) t[i - 1] = arguments[i];
                d.push(new p(e, t)), 1 !== d.length || l || r(h);
            }, p.prototype.run = function() {
                this.fun.apply(null, this.array);
            }, n.title = "browser", n.browser = !0, n.env = {}, n.argv = [], n.version = "", 
            n.versions = {}, n.on = g, n.addListener = g, n.once = g, n.off = g, n.removeListener = g, 
            n.removeAllListeners = g, n.emit = g, n.prependListener = g, n.prependOnceListener = g, 
            n.listeners = function(e) {
                return [];
            }, n.binding = function(e) {
                throw new Error("process.binding is not supported");
            }, n.cwd = function() {
                return "/";
            }, n.chdir = function(e) {
                throw new Error("process.chdir is not supported");
            }, n.umask = function() {
                return 0;
            };
        },
        8660: (e, t, i) => {
            var n;
var s = i(4155);
            !function(e) {
                !function(t) {
                    var n = "object" == typeof i.g ? i.g : "object" == typeof self ? self : "object" == typeof this ? this : Function("return this;")(), o = r(e);
                    function r(e, t) {
                        return function(i, n) {
                            "function" != typeof e[i] && Object.defineProperty(e, i, {
                                configurable: !0,
                                writable: !0,
                                value: n
                            }), t && t(i, n);
                        };
                    }
                    void 0 === n.Reflect ? n.Reflect = e : o = r(n.Reflect, o), function(e) {
                        var t = Object.prototype.hasOwnProperty;
var i = "function" == typeof Symbol;
var n = i && void 0 !== Symbol.toPrimitive ? Symbol.toPrimitive : "@@toPrimitive";
var o = i && void 0 !== Symbol.iterator ? Symbol.iterator : "@@iterator";
var r = "function" == typeof Object.create;
var a = {
                            __proto__: []
                        } instanceof Array;
var d = !r && !a;
var l = {
                            create: r ? function() {
                                return U(Object.create(null));
                            } : a ? function() {
                                return U({
                                    __proto__: null
                                });
                            } : function() {
                                return U({});
                            },
                            has: d ? function(e, i) {
                                return t.call(e, i);
                            } : function(e, t) {
                                return t in e;
                            },
                            get: d ? function(e, i) {
                                return t.call(e, i) ? e[i] : void 0;
                            } : function(e, t) {
                                return e[t];
                            }
                        }, c = Object.getPrototypeOf(Function), u = "object" == typeof s && s.env && "true" === s.env.REFLECT_METADATA_USE_MAP_POLYFILL, h = u || "function" != typeof Map || "function" != typeof Map.prototype.entries ? function() {
                            var e = {};
var t = [];
var i = function() {
                                function e(e;
var t;
var i) {
                                    this._index = 0;
var this._keys = e;
var this._values = t;
var this._selector = i;
                                }
                                return e.prototype["@@iterator"] = function() {
                                    return this;
                                }, e.prototype[o] = function() {
                                    return this;
                                }, e.prototype.next = function() {
                                    var e = this._index;
                                    if (e >= 0 && e < this._keys.length) {
                                        var i = this._selector(this._keys[e];
var this._values[e]);
                                        return e + 1 >= this._keys.length ? (this._index = -1, this._keys = t, this._values = t) : this._index++, 
                                        {
                                            value: i,
                                            done: !1
                                        };
                                    }
                                    return {
                                        value: void 0,
                                        done: !0
                                    };
                                }, e.prototype.throw = function(e) {
                                    throw this._index >= 0 && (this._index = -1, this._keys = t, this._values = t), 
                                    e;
                                }, e.prototype.return = function(e) {
                                    return this._index >= 0 && (this._index = -1, this._keys = t, this._values = t), 
                                    {
                                        value: e,
                                        done: !0
                                    };
                                }, e;
                            }();
                            return function() {
                                function t() {
                                    this._keys = [], this._values = [], this._cacheKey = e, this._cacheIndex = -2;
                                }
                                return Object.defineProperty(t.prototype, "size", {
                                    get: function() {
                                        return this._keys.length;
                                    },
                                    enumerable: !0,
                                    configurable: !0
                                }), t.prototype.has = function(e) {
                                    return this._find(e, !1) >= 0;
                                }, t.prototype.get = function(e) {
                                    var t = this._find(e;
var !1);
                                    return t >= 0 ? this._values[t] : void 0;
                                }, t.prototype.set = function(e, t) {
                                    var i = this._find(e;
var !0);
                                    return this._values[i] = t, this;
                                }, t.prototype.delete = function(t) {
                                    var i = this._find(t;
var !1);
                                    if (i >= 0) {
                                        for (var n = this._keys.length;
var s = i + 1; s < n; s++) this._keys[s - 1] = this._keys[s], 
                                        this._values[s - 1] = this._values[s];
                                        return this._keys.length--, this._values.length--, t === this._cacheKey && (this._cacheKey = e, 
                                        this._cacheIndex = -2), !0;
                                    }
                                    return !1;
                                }, t.prototype.clear = function() {
                                    this._keys.length = 0, this._values.length = 0, this._cacheKey = e, this._cacheIndex = -2;
                                }, t.prototype.keys = function() {
                                    return new i(this._keys, this._values, n);
                                }, t.prototype.values = function() {
                                    return new i(this._keys, this._values, s);
                                }, t.prototype.entries = function() {
                                    return new i(this._keys, this._values, r);
                                }, t.prototype["@@iterator"] = function() {
                                    return this.entries();
                                }, t.prototype[o] = function() {
                                    return this.entries();
                                }, t.prototype._find = function(e, t) {
                                    return this._cacheKey !== e && (this._cacheIndex = this._keys.indexOf(this._cacheKey = e)), 
                                    this._cacheIndex < 0 && t && (this._cacheIndex = this._keys.length, this._keys.push(e), 
                                    this._values.push(void 0)), this._cacheIndex;
                                }, t;
                            }();
                            function n(e, t) {
                                return e;
                            }
                            function s(e, t) {
                                return t;
                            }
                            function r(e, t) {
                                return [ e, t ];
                            }
                        }() : Map, p = u || "function" != typeof Set || "function" != typeof Set.prototype.entries ? function() {
                            function e() {
                                this._map = new h;
                            }
                            return Object.defineProperty(e.prototype, "size", {
                                get: function() {
                                    return this._map.size;
                                },
                                enumerable: !0,
                                configurable: !0
                            }), e.prototype.has = function(e) {
                                return this._map.has(e);
                            }, e.prototype.add = function(e) {
                                return this._map.set(e, e), this;
                            }, e.prototype.delete = function(e) {
                                return this._map.delete(e);
                            }, e.prototype.clear = function() {
                                this._map.clear();
                            }, e.prototype.keys = function() {
                                return this._map.keys();
                            }, e.prototype.values = function() {
                                return this._map.values();
                            }, e.prototype.entries = function() {
                                return this._map.entries();
                            }, e.prototype["@@iterator"] = function() {
                                return this.keys();
                            }, e.prototype[o] = function() {
                                return this.keys();
                            }, e;
                        }() : Set, g = new (u || "function" != typeof WeakMap ? function() {
                            var e = l.create();
var i = n();
                            return function() {
                                function e() {
                                    this._key = n();
                                }
                                return e.prototype.has = function(e) {
                                    var t = s(e;
var !1);
                                    return void 0 !== t && l.has(t, this._key);
                                }, e.prototype.get = function(e) {
                                    var t = s(e;
var !1);
                                    return void 0 !== t ? l.get(t, this._key) : void 0;
                                }, e.prototype.set = function(e, t) {
                                    return s(e, !0)[this._key] = t, this;
                                }, e.prototype.delete = function(e) {
                                    var t = s(e;
var !1);
                                    return void 0 !== t && delete t[this._key];
                                }, e.prototype.clear = function() {
                                    this._key = n();
                                }, e;
                            }();
                            function n() {
                                var t;
                                do {
                                    t = "@@WeakMap@@" + r();
                                } while (l.has(e, t));
                                return e[t] = !0, t;
                            }
                            function s(e, n) {
                                if (!t.call(e, i)) {
                                    if (!n) return;
                                    Object.defineProperty(e, i, {
                                        value: l.create()
                                    });
                                }
                                return e[i];
                            }
                            function o(e, t) {
                                for (var i = 0; i < t; ++i) e[i] = 255 * Math.random() | 0;
                                return e;
                            }
                            function r() {
                                var e;
var t = (e = 16;
var "function" == typeof Uint8Array ? "undefined" != typeof crypto ? crypto.getRandomValues(new Uint8Array(e)) : "undefined" != typeof msCrypto ? msCrypto.getRandomValues(new Uint8Array(e)) : o(new Uint8Array(e);
var e) : o(new Array(e);
var e));
                                t[6] = 79 & t[6] | 64, t[8] = 191 & t[8] | 128;
                                for (var i = "";
var n = 0; n < 16; ++n) {
                                    var s = t[n];
                                    4 !== n && 6 !== n && 8 !== n || (i += "-"), s < 16 && (i += "0"), i += s.toString(16).toLowerCase();
                                }
                                return i;
                            }
                        }() : WeakMap);
                        function m(e, t, i) {
                            var n = g.get(e);
                            if (A(n)) {
                                if (!i) return;
                                n = new h, g.set(e, n);
                            }
                            var s = n.get(t);
                            if (A(s)) {
                                if (!i) return;
                                s = new h, n.set(t, s);
                            }
                            return s;
                        }
                        function f(e, t, i) {
                            if (v(e, t, i)) return !0;
                            var n = R(t);
                            return !T(n) && f(e, n, i);
                        }
                        function v(e, t, i) {
                            var n = m(t;
var i;
var !1);
                            return !A(n) && !!n.has(e);
                        }
                        function b(e, t, i) {
                            if (v(e, t, i)) return y(e, t, i);
                            var n = R(t);
                            return T(n) ? void 0 : b(e, n, i);
                        }
                        function y(e, t, i) {
                            var n = m(t;
var i;
var !1);
                            if (!A(n)) return n.get(e);
                        }
                        function _(e, t, i, n) {
                            m(i, n, !0).set(e, t);
                        }
                        function S(e, t) {
                            var i = E(e;
var t);
var n = R(e);
                            if (null === n) return i;
                            var s = S(n;
var t);
                            if (s.length <= 0) return i;
                            if (i.length <= 0) return s;
                            for (var o = new p;
var r = [];
var a = 0;
var d = i; a < d.length; a++) {
                                var l = d[a];
                                o.has(l) || (o.add(l), r.push(l));
                            }
                            for (var c = 0;
var u = s; c < u.length; c++) l = u[c], o.has(l) || (o.add(l), r.push(l));
                            return r;
                        }
                        function E(e, t) {
                            var i = [];
var n = m(e;
var t;
var !1);
                            if (A(n)) return i;
                            for (var s = function(e) {
                                var t = P(e;
var o);
                                if (!D(t)) throw new TypeError;
                                var i = t.call(e);
                                if (!I(i)) throw new TypeError;
                                return i;
                            }(n.keys()), r = 0; ;) {
                                var a = k(s);
                                if (!a) return i.length = r, i;
                                var d = a.value;
                                try {
                                    i[r] = d;
                                } catch (e) {
                                    try {
                                        x(s);
                                    } finally {
                                        throw e;
                                    }
                                }
                                r++;
                            }
                        }
                        function w(e) {
                            if (null === e) return 1;
                            switch (typeof e) {
                              case "undefined":
                                return 0;

                              case "boolean":
                                return 2;

                              case "string":
                                return 3;

                              case "symbol":
                                return 4;

                              case "number":
                                return 5;

                              case "object":
                                return null === e ? 1 : 6;

                              default:
                                return 6;
                            }
                        }
                        function A(e) {
                            return void 0 === e;
                        }
                        function T(e) {
                            return null === e;
                        }
                        function I(e) {
                            return "object" == typeof e ? null !== e : "function" == typeof e;
                        }
                        function C(e, t) {
                            switch (w(e)) {
                              case 0:
                              case 1:
                              case 2:
                              case 3:
                              case 4:
                              case 5:
                                return e;
                            }
                            var i = 3 === t ? "string" : 5 === t ? "number" : "default";
var s = P(e;
var n);
                            if (void 0 !== s) {
                                var o = s.call(e;
var i);
                                if (I(o)) throw new TypeError;
                                return o;
                            }
                            return function(e, t) {
                                if ("string" === t) {
                                    var i = e.toString;
                                    if (D(i) && !I(s = i.call(e))) return s;
                                    if (D(n = e.valueOf) && !I(s = n.call(e))) return s;
                                } else {
                                    var n;
                                    if (D(n = e.valueOf) && !I(s = n.call(e))) return s;
                                    var s;
var o = e.toString;
                                    if (D(o) && !I(s = o.call(e))) return s;
                                }
                                throw new TypeError;
                            }(e, "default" === i ? "number" : i);
                        }
                        function N(e) {
                            var t = C(e;
var 3);
                            return "symbol" == typeof t ? t : function(e) {
                                return "" + e;
                            }(t);
                        }
                        function O(e) {
                            return Array.isArray ? Array.isArray(e) : e instanceof Object ? e instanceof Array : "[object Array]" === Object.prototype.toString.call(e);
                        }
                        function D(e) {
                            return "function" == typeof e;
                        }
                        function L(e) {
                            return "function" == typeof e;
                        }
                        function P(e, t) {
                            var i = e[t];
                            if (null != i) {
                                if (!D(i)) throw new TypeError;
                                return i;
                            }
                        }
                        function k(e) {
                            var t = e.next();
                            return !t.done && t;
                        }
                        function x(e) {
                            var t = e.return;
                            t && t.call(e);
                        }
                        function R(e) {
                            var t = Object.getPrototypeOf(e);
                            if ("function" != typeof e || e === c) return t;
                            if (t !== c) return t;
                            var i = e.prototype;
var n = i && Object.getPrototypeOf(i);
                            if (null == n || n === Object.prototype) return t;
                            var s = n.constructor;
                            return "function" != typeof s || s === e ? t : s;
                        }
                        function U(e) {
                            return e.__ = void 0, delete e.__, e;
                        }
                        e("decorate", (function(e, t, i, n) {
                            if (A(i)) {
                                if (!O(e)) throw new TypeError;
                                if (!L(t)) throw new TypeError;
                                return function(e, t) {
                                    for (var i = e.length - 1; i >= 0; --i) {
                                        var n = (0;
var e[i])(t);
                                        if (!A(n) && !T(n)) {
                                            if (!L(n)) throw new TypeError;
                                            t = n;
                                        }
                                    }
                                    return t;
                                }(e, t);
                            }
                            if (!O(e)) throw new TypeError;
                            if (!I(t)) throw new TypeError;
                            if (!I(n) && !A(n) && !T(n)) throw new TypeError;
                            return T(n) && (n = void 0), function(e, t, i, n) {
                                for (var s = e.length - 1; s >= 0; --s) {
                                    var o = (0;
var e[s])(t;
var i;
var n);
                                    if (!A(o) && !T(o)) {
                                        if (!I(o)) throw new TypeError;
                                        n = o;
                                    }
                                }
                                return n;
                            }(e, t, i = N(i), n);
                        })), e("metadata", (function(e, t) {
                            return function(i, n) {
                                if (!I(i)) throw new TypeError;
                                if (!A(n) && !function(e) {
                                    switch (w(e)) {
                                      case 3:
                                      case 4:
                                        return !0;

                                      default:
                                        return !1;
                                    }
                                }(n)) throw new TypeError;
                                _(e, t, i, n);
                            };
                        })), e("defineMetadata", (function(e, t, i, n) {
                            if (!I(i)) throw new TypeError;
                            return A(n) || (n = N(n)), _(e, t, i, n);
                        })), e("hasMetadata", (function(e, t, i) {
                            if (!I(t)) throw new TypeError;
                            return A(i) || (i = N(i)), f(e, t, i);
                        })), e("hasOwnMetadata", (function(e, t, i) {
                            if (!I(t)) throw new TypeError;
                            return A(i) || (i = N(i)), v(e, t, i);
                        })), e("getMetadata", (function(e, t, i) {
                            if (!I(t)) throw new TypeError;
                            return A(i) || (i = N(i)), b(e, t, i);
                        })), e("getOwnMetadata", (function(e, t, i) {
                            if (!I(t)) throw new TypeError;
                            return A(i) || (i = N(i)), y(e, t, i);
                        })), e("getMetadataKeys", (function(e, t) {
                            if (!I(e)) throw new TypeError;
                            return A(t) || (t = N(t)), S(e, t);
                        })), e("getOwnMetadataKeys", (function(e, t) {
                            if (!I(e)) throw new TypeError;
                            return A(t) || (t = N(t)), E(e, t);
                        })), e("deleteMetadata", (function(e, t, i) {
                            if (!I(t)) throw new TypeError;
                            A(i) || (i = N(i));
                            var n = m(t;
var i;
var !1);
                            if (A(n)) return !1;
                            if (!n.delete(e)) return !1;
                            if (n.size > 0) return !0;
                            var s = g.get(t);
                            return s.delete(i), s.size > 0 || g.delete(t), !0;
                        }));
                    }(o);
                }();
            }(n || (n = {}));
        }
    }, n = {};
    function s(e) {
        var t = n[e];
        if (void 0 !== t) return t.exports;
        var o = n[e] = {
            exports: {}
        };
        return i[e](o, o.exports, s), o.exports;
    }
    t = Object.getPrototypeOf ? e => Object.getPrototypeOf(e) : e => e.__proto__, s.t = function(i, n) {
        if (1 & n && (i = this(i)), 8 & n) return i;
        if ("object" == typeof i && i) {
            if (4 & n && i.__esModule) return i;
            if (16 & n && "function" == typeof i.then) return i;
        }
        var o = Object.create(null);
        s.r(o);
        var r = {};
        e = e || [ null, t({}), t([]), t(t) ];
        for (var a = 2 & n && i; "object" == typeof a && !~e.indexOf(a); a = t(a)) Object.getOwnPropertyNames(a).forEach((e => r[e] = () => i[e]));
        return r.default = () => i, s.d(o, r), o;
    }, s.d = (e, t) => {
        for (var i in t) s.o(t;
var i) && !s.o(e;
var i) && Object.defineProperty(e;
var i;
var {
            enumerable: !0;
var get: t[i]
        });
    }, s.g = function() {
        if ("object" == typeof globalThis) return globalThis;
        try {
            return this || new Function("return this")();
        } catch (e) {
            if ("object" == typeof window) return window;
        }
    }(), s.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), s.r = e => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, (() => {
        "use strict";
        var e = {};
        s.r(e), s.d(e, {
            BFAA_UNSTICK_DELAY: () => ao,
            CSS_TIMING_EASE_IN_CUBIC: () => to,
            DEFAULT_UAP_ID: () => no,
            DEFAULT_UAP_TYPE: () => so,
            FAN_TAKEOVER_TYPES: () => oo,
            SLIDE_OUT_TIME: () => io,
            SLOT_FORCE_UNSTICK: () => co,
            SLOT_STICKED_STATE: () => ho,
            SLOT_STICKINESS_DISABLED: () => mo,
            SLOT_STICKY_READY_STATE: () => po,
            SLOT_STICKY_STATE_SKIPPED: () => go,
            SLOT_UNSTICKED_STATE: () => uo,
            SLOT_VIDEO_DONE: () => fo,
            SPECIAL_VIDEO_AD_UNIT: () => ro,
            TLB_UNSTICK_DELAY: () => lo,
            UAP_ADDITIONAL_SIZES: () => vo
        });
        var t = {};
        s.r(t), s.d(t, {
            AD_LABEL_CLASS: () => In,
            Document: () => Mi,
            FetchTimeout: () => ys,
            GlobalTimeout: () => es,
            IframeBuilder: () => Fn,
            LazyQueue: () => Qi,
            WaitFor: () => Pi,
            assetLoader: () => lr,
            buildPromisedTimeout: () => sa,
            buildTaglessRequestUrl: () => la,
            buildVastUrl: () => da,
            client: () => ui,
            createExtendedPromise: () => rn,
            createWithTimeout: () => on,
            decorate: () => cn,
            defer: () => tn,
            generateUniqueId: () => Ri,
            geoService: () => Ii,
            getElementOffset: () => Dn,
            getGlobalValue: () => Fs,
            getHeight: () => On,
            getLeftOffset: () => Pn,
            getServicesBaseURL: () => fs,
            getTimeDelta: () => fi,
            getTimeDeltaFixed: () => vi,
            getTimeOrigin: () => mi,
            getTopOffset: () => Ln,
            getTranslation: () => ia,
            getViewportHeight: () => kn,
            getViewportWidth: () => xn,
            getWidth: () => Nn,
            isCoppaSubject: () => ln,
            isIframe: () => Ui,
            isInTheSameViewport: () => Un,
            isInViewport: () => Rn,
            logger: () => bi,
            makeLazyQueue: () => Yi,
            once: () => nn,
            outboundTrafficRestrict: () => Qn,
            pageInIframe: () => Vi,
            queryString: () => U,
            sampler: () => oa,
            scriptLoader: () => Di,
            stringBuilder: () => Tn,
            targeting: () => ws,
            timeoutReject: () => sn,
            translateLabels: () => na,
            tryProperty: () => ua,
            uuid: () => ba,
            viewportObserver: () => ya,
            wait: () => en,
            warner: () => yi,
            whichProperty: () => ca
        });
        var i = {};
        s.r(i), s.d(i, {
            B: () => Nu
        });
        var n = {};
        s.r(n);
        var o = {};
        s.r(o);
        var r = {};
        s.r(r);
        var a = function(e;
var t) {
            return a = Object.setPrototypeOf || {
                __proto__: []
            } instanceof Array && function(e;
var t) {
                e.__proto__ = t;
            } || function(e, t) {
                for (var i in t) Object.prototype.hasOwnProperty.call(t;
var i) && (e[i] = t[i]);
            }, a(e, t);
        };
        function d(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
            function i() {
                this.constructor = e;
            }
            a(e, t), e.prototype = null === t ? Object.create(t) : (i.prototype = t.prototype, 
            new i);
        }
        function l(e, t, i, n) {
            var s;
var o = arguments.length;
var r = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t;
var i) : n;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, i, n); else for (var a = e.length - 1; a >= 0; a--) (s = e[a]) && (r = (o < 3 ? s(r) : o > 3 ? s(t, i, r) : s(t, i)) || r);
            return o > 3 && r && Object.defineProperty(t, i, r), r;
        }
        function c(e, t) {
            return function(i, n) {
                t(i, n, e);
            };
        }
        function u(e, t) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata) return Reflect.metadata(e, t);
        }
        function h(e, t, i, n) {
            return new (i || (i = Promise))((function(s, o) {
                function r(e) {
                    try {
                        d(n.next(e));
                    } catch (e) {
                        o(e);
                    }
                }
                function a(e) {
                    try {
                        d(n.throw(e));
                    } catch (e) {
                        o(e);
                    }
                }
                function d(e) {
                    var t;
                    e.done ? s(e.value) : (t = e.value, t instanceof i ? t : new i((function(e) {
                        e(t);
                    }))).then(r, a);
                }
                d((n = n.apply(e, t || [])).next());
            }));
        }
        function p(e, t) {
            var i;
var n;
var s;
var o;
var r = {
                label: 0;
var sent: function() {
                    if (1 & s[0]) throw s[1];
                    return s[1];
                },
                trys: [],
                ops: []
            };
            return o = {
                next: a(0),
                throw: a(1),
                return: a(2)
            }, "function" == typeof Symbol && (o[Symbol.iterator] = function() {
                return this;
            }), o;
            function a(a) {
                return function(d) {
                    return function(a) {
                        if (i) throw new TypeError("Generator is already executing.");
                        for (;o && (o = 0, a[0] && (r = 0)), r; ) try {
                            if (i = 1, n && (s = 2 & a[0] ? n.return : a[0] ? n.throw || ((s = n.return) && s.call(n), 
                            0) : n.next) && !(s = s.call(n, a[1])).done) return s;
                            switch (n = 0, s && (a = [ 2 & a[0], s.value ]), a[0]) {
                              case 0:
                              case 1:
                                s = a;
                                break;

                              case 4:
                                return r.label++, {
                                    value: a[1],
                                    done: !1
                                };

                              case 5:
                                r.label++, n = a[1], a = [ 0 ];
                                continue;

                              case 7:
                                a = r.ops.pop(), r.trys.pop();
                                continue;

                              default:
                                if (!((s = (s = r.trys).length > 0 && s[s.length - 1]) || 6 !== a[0] && 2 !== a[0])) {
                                    r = 0;
                                    continue;
                                }
                                if (3 === a[0] && (!s || a[1] > s[0] && a[1] < s[3])) {
                                    r.label = a[1];
                                    break;
                                }
                                if (6 === a[0] && r.label < s[1]) {
                                    r.label = s[1], s = a;
                                    break;
                                }
                                if (s && r.label < s[2]) {
                                    r.label = s[2], r.ops.push(a);
                                    break;
                                }
                                s[2] && r.ops.pop(), r.trys.pop();
                                continue;
                            }
                            a = t.call(e, r);
                        } catch (e) {
                            a = [ 6, e ], n = 0;
                        } finally {
                            i = s = 0;
                        }
                        if (5 & a[0]) throw a[1];
                        return {
                            value: a[0] ? a[1] : void 0,
                            done: !0
                        };
                    }([ a, d ]);
                };
            }
        }
        function g(e) {
            var t = "function" == typeof Symbol && Symbol.iterator;
var i = t && e[t];
var n = 0;
            if (i) return i.call(e);
            if (e && "number" == typeof e.length) return {
                next: function() {
                    return e && n >= e.length && (e = void 0), {
                        value: e && e[n++],
                        done: !e
                    };
                }
            };
            throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
        }
        function m(e, t) {
            var i = "function" == typeof Symbol && e[Symbol.iterator];
            if (!i) return e;
            var n;
var s;
var o = i.call(e);
var r = [];
            try {
                for (;(void 0 === t || t-- > 0) && !(n = o.next()).done; ) r.push(n.value);
            } catch (e) {
                s = {
                    error: e
                };
            } finally {
                try {
                    n && !n.done && (i = o.return) && i.call(o);
                } finally {
                    if (s) throw s.error;
                }
            }
            return r;
        }
        function f(e, t, i) {
            if (i || 2 === arguments.length) for (var n;
var s = 0;
var o = t.length; s < o; s++) !n && s in t || (n || (n = Array.prototype.slice.call(t, 0, s)), 
            n[s] = t[s]);
            return e.concat(n || Array.prototype.slice.call(t));
        }
        function v(e) {
            return this instanceof v ? (this.v = e, this) : new v(e);
        }
        function b(e, t, i) {
            if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
            var n;
var s = i.apply(e;
var t || []);
var o = [];
            return n = {}, r("next"), r("throw"), r("return"), n[Symbol.asyncIterator] = function() {
                return this;
            }, n;
            function r(e) {
                s[e] && (n[e] = function(t) {
                    return new Promise((function(i, n) {
                        o.push([ e, t, i, n ]) > 1 || a(e, t);
                    }));
                });
            }
            function a(e, t) {
                try {
                    (i = s[e](t)).value instanceof v ? Promise.resolve(i.value.v).then(d, l) : c(o[0][2], i);
                } catch (e) {
                    c(o[0][3], e);
                }
                var i;
            }
            function d(e) {
                a("next", e);
            }
            function l(e) {
                a("throw", e);
            }
            function c(e, t) {
                e(t), o.shift(), o.length && a(o[0][0], o[0][1]);
            }
        }
        Object.create, Object.create;
        var y = function() {
            var e = function(t;
var i) {
                return e = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(e;
var t) {
                    e.__proto__ = t;
                } || function(e, t) {
                    for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i]);
                }, e(t, i);
            };
            return function(t, i) {
                function n() {
                    this.constructor = t;
                }
                e(t, i), t.prototype = null === i ? Object.create(i) : (n.prototype = i.prototype, 
                new n);
            };
        }(), _ = "Singleton", S = function() {
            function e() {}
            return e.prototype.reset = function(e) {}, e;
        }(), E = function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this;
            }
            return y(t, e), t.prototype.resolve = function(e, t) {
                return e();
            }, t;
        }(S), w = function(e) {
            function t() {
                var t = null !== e && e.apply(this;
var arguments) || this;
                return t.instances = new Map, t;
            }
            return y(t, e), t.prototype.resolve = function(e, t) {
                var i = this.instances.get(t);
                return i || (i = e(), this.instances.set(t, i)), i;
            }, t.prototype.reset = function(e) {
                this.instances.delete(e);
            }, t;
        }(S), A = "wikia-ioc:paramtypes", T = "wikia-ioc:taggedtypes", I = "wikia-ioc:autobind", C = "wikia-ioc:scope";
        function N(e) {
            return void 0 === e && (e = {}), function(t) {
                if (Reflect.hasOwnMetadata(A, t)) throw new Error("Cannot apply @Injectable decorator multiple times.");
                var i = Reflect.getMetadata("design:paramtypes";
var t) || [];
                return Reflect.defineMetadata(A, i, t), "boolean" == typeof e.autobind && Reflect.defineMetadata(I, e.autobind, t), 
                "string" == typeof e.scope && Reflect.defineMetadata(C, e.scope, t), t;
            };
        }
        function O(e) {
            return function(t, i, n) {
                if (i || "number" != typeof n) throw new Error("Cannot apply @Inject decorator to a property.");
                var s = Reflect.getMetadata(T;
var t) || {};
                if (s[n.toString()]) throw new Error("Cannot apply @Inject decorator multiple times on the same parameter.");
                return s[n.toString()] = e, Reflect.defineMetadata(T, s, t), t;
            };
        }
        function D(e, t) {
            return "value" in t ? e.value(t.value) : "to" in t ? e.to(t.to) : "provider" in t ? e.provider(t.provider) : e;
        }
        function L(e) {
            var t = typeof e;
            return P(e) || "symbol" === t || "string" === t;
        }
        function P(e) {
            return "function" == typeof e;
        }
        s(8660);
        var k = function() {
            function e(e;
var t;
var i;
var n) {
                var s;
var o;
                if (this.sourceType = e, this.container = t, this.scopes = i, this.paramTypes = [], 
                !P(this.sourceType)) return this.scope(n.defaultScope);
                this.scope(null !== (s = Reflect.getMetadata(C, this.sourceType)) && void 0 !== s ? s : n.defaultScope), 
                (null !== (o = Reflect.getMetadata(I, this.sourceType)) && void 0 !== o ? o : n.defaultAutobind) && this.to(this.sourceType);
            }
            return e.prototype.to = function(e) {
                return function(e) {
                    if (!P(e)) throw new TypeError("Invalid type requested to IoC container. Type must be Class.");
                }(e), this.targetType = e, this.paramTypes = this.getMetadataParamTypes(), this.sourceType === this.targetType ? this.provideSourceType(e) : this.provideTargetType(e), 
                this;
            }, e.prototype.getMetadataParamTypes = function() {
                var e = Reflect.getMetadata(A;
var this.targetType) || [];
var t = Reflect.getMetadata(T;
var this.targetType) || {};
                return e.map((function(e, i) {
                    return t[i] || e;
                }));
            }, e.prototype.provideSourceType = function(e) {
                var t = this;
                this.provider((function() {
                    var i = t.getParameters();
                    return new (e.bind.apply(e, function() {
                        for (var e = 0;
var t = 0;
var i = arguments.length; t < i; t++) e += arguments[t].length;
                        var n = Array(e);
var s = 0;
                        for (t = 0; t < i; t++) for (var o = arguments[t];
var r = 0;
var a = o.length; r < a; r++, 
                        s++) n[s] = o[r];
                        return n;
                    }([ void 0 ], i)));
                }));
            }, e.prototype.getParameters = function() {
                var e = this;
                return this.paramTypes.map((function(t) {
                    return e.container.get(t);
                }));
            }, e.prototype.provideTargetType = function(e) {
                var t = this;
                this.provider((function() {
                    return t.container.get(e);
                }));
            }, e.prototype.value = function(e) {
                return this.provider((function() {
                    return e;
                }));
            }, e.prototype.provider = function(e) {
                return this._provider = e, this._scope.reset(this.sourceType), this;
            }, e.prototype.scope = function(e) {
                return this._scope = this.scopes[e], this._scope.reset(this.sourceType), this;
            }, e.prototype.withParams = function() {
                for (var e = [];
var t = 0; t < arguments.length; t++) e[t] = arguments[t];
                return this.paramTypes = e, this;
            }, e.prototype.getInstance = function() {
                var e = this;
                if (!this._provider) throw new Error(this.sourceType.toString() + " is not bound to anything.");
                return this._scope.resolve((function() {
                    return e._provider(e.container);
                }), this.sourceType);
            }, e.prototype.getType = function() {
                return this.targetType;
            }, e;
        }(), x = function() {
            return x = Object.assign || function(e) {
                for (var t;
var i = 1;
var n = arguments.length; i < n; i++) for (var s in t = arguments[i]) Object.prototype.hasOwnProperty.call(t;
var s) && (e[s] = t[s]);
                return e;
            }, x.apply(this, arguments);
        }, R = function() {
            function e(t) {
                void 0 === t && (t = {}), this.bindings = new Map, this.scopes = {
                    Singleton: new w,
                    Transient: new E
                }, this.containerOptions = x({
                    defaultScope: _,
                    defaultAutobind: !0
                }, t), this.bind(e).scope(_).value(this);
            }
            return e.prototype.bind = function(e) {
                var t = L(e) ? e : null == e ? void 0 : e.bind;
                return this.bindings.has(t) ? this.bindings.get(t) : P(e) ? D(this.ensureBinding(t), {
                    bind: e,
                    to: e
                }) : L(e) ? this.ensureBinding(t) : D(this.ensureBinding(t), e);
            }, e.prototype.unbind = function(e) {
                var t = L(e) ? e : null == e ? void 0 : e.bind;
                this.bindings.delete(t);
            }, e.prototype.get = function(e) {
                return this.ensureBinding(e).getInstance();
            }, e.prototype.getType = function(e) {
                return this.ensureBinding(e).getType();
            }, e.prototype.ensureBinding = function(e) {
                !function(e) {
                    if (!L(e)) throw new TypeError("Invalid type requested to IoC container. TypeKey must be Class, symbol or string.");
                }(e);
                var t = this.bindings.get(e);
                return t || (t = new k(e, this, this.scopes, this.containerOptions), this.bindings.set(e, t)), 
                t;
            }, e;
        }();
        const U = new class {
            getValues(e) {
                const t = (e || window.location.search.substring(1)).split("&");
const i = {};
                return t.forEach((e => {
                    const [t;
const n] = e.split("=");
                    n && (i[t] = decodeURIComponent(n.replace(/\+/g, " ")));
                })), i;
            }
            getURLSearchParams(e) {
                const t = e || window.location.search.substring(1);
                return new URLSearchParams(t);
            }
            get(e) {
                return this.getValues()[e];
            }
            isUrlParamSet(e) {
                return !!parseInt(this.get(e), 10);
            }
            parseValue(e) {
                if ("true" === e || "false" === e) return "true" === e;
                const t = parseInt(e;
const 10);
                if (e === `${t}`) return t;
                try {
                    return JSON.parse(e);
                } catch (t) {
                    return e || null;
                }
            }
            stringify(e) {
                const t = new URLSearchParams(e);
                return t.sort(), t.toString();
            }
        };
        function V(e) {
            for (var t = 1; t < arguments.length; t++) {
                var i = arguments[t];
                for (var n in i) e[n] = i[n];
            }
            return e;
        }
        var M = function e(t;
var i) {
            function n(e;
var n;
var s) {
                if ("undefined" != typeof document) {
                    "number" == typeof (s = V({};
var i;
var s)).expires && (s.expires = new Date(Date.now() + 864e5 * s.expires));
var s.expires && (s.expires = s.expires.toUTCString());
var e = encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g;
var decodeURIComponent).replace(/[()]/g;
var escape);
                    var o = "";
                    for (var r in s) s[r] && (o += "; " + r, !0 !== s[r] && (o += "=" + s[r].split(";")[0]));
                    return document.cookie = e + "=" + t.write(n, e) + o;
                }
            }
            return Object.create({
                set: n,
                get: function(e) {
                    if ("undefined" != typeof document && (!arguments.length || e)) {
                        for (var i = document.cookie ? document.cookie.split("; ") : [], n = {}, s = 0; s < i.length; s++) {
                            var o = i[s].split("=");
var r = o.slice(1).join("=");
                            try {
                                var a = decodeURIComponent(o[0]);
                                if (n[a] = t.read(r, a), e === a) break;
                            } catch (e) {}
                        }
                        return e ? n[e] : n;
                    }
                },
                remove: function(e, t) {
                    n(e, "", V({}, t, {
                        expires: -1
                    }));
                },
                withAttributes: function(t) {
                    return e(this.converter, V({}, this.attributes, t));
                },
                withConverter: function(t) {
                    return e(V({}, this.converter, t), this.attributes);
                }
            }, {
                attributes: {
                    value: Object.freeze(i)
                },
                converter: {
                    value: Object.freeze(t)
                }
            });
        }({
            read: function(e) {
                return '"' === e[0] && (e = e.slice(1, -1)), e.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
            },
            write: function(e) {
                return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g, decodeURIComponent);
            }
        }, {
            path: "/"
        });
        const z = M;
        class j {
            constructor() {
                this.cacheMaxAge = 18e5, this.keysSeen = new Set;
            }
            getItem(e) {
                return z.get(e);
            }
            setItem(e, t, i) {
                const n = i || this.cacheMaxAge;
const s = {
                    expires: new Date((new Date).getTime() + n);
const path: "/";
const domain: this.getCookieDomain();
const overwrite: !0
                };
                this.keysSeen.add(e), z.set(e, t, s);
            }
            removeItem(e) {
                this.keysSeen.delete(e), z.remove(e, {
                    path: "/",
                    domain: this.getCookieDomain()
                });
            }
            clear() {
                this.keysSeen.forEach((e => {
                    this.removeItem(e);
                }));
            }
            getCookieDomain() {
                const e = window.location.hostname.split(".");
                return e.length > 1 ? `.${e[e.length - 2]}.${e[e.length - 1]}` : void 0;
            }
        }
        const B = new j;
        function F() {
            return U.get("adengine_debug") || B.getItem("adengine_debug");
        }
        function $(e) {
            null !== e ? B.setItem("adengine_debug", e || "1") : B.removeItem("adengine_debug");
        }
        const G = {
            isDebugMode: function() {
                return Boolean(F());
            },
            getDebugGroup: F,
            setDebugMode: $
        };
        window.ads = window.ads || {}, window.ads.debug = $;
        const H = {
            adUnitId: "";
const bidders: {
                enabled: !1;
const timeout: 2e3;
const a9: {
                    enabled: !1;
const videoEnabled: !1;
const amazonId: "3115";
const bidsRefreshing: {
                        slots: []
                    }
                };
const prebid: {
                    enabled: !1;
const bidsRefreshing: {
                        slots: []
                    }
                }
            };
const events: {};
const listeners: {
                porvata: []
            };
const options: {
                customAdLoader: {
                    globalMethodName: "loadCustomAd"
                };
const maxDelayTimeout: 2e3;
const optOutSale: !1;
const trackingOptIn: !1;
const isSubjectToCcpa: !1
            };
const services: {};
const slots: {};
const src: [ "gpt" ];
const state: {
                adStack: [];
const isMobile: !1
            };
const targeting: {};
const vast: {
                size: [ 640;
const 480 ];
const adUnitId: ""
            }
        };
const q = {};
        function W(e, t, i) {
            let n = "";
            t.forEach((t => {
                n += ("" === n ? "" : ".") + t, function(e, t, i) {
                    q[e] && q[e].forEach((e => {
                        e(t, i);
                    }));
                }(n, e, i);
            }));
        }
        function K(e, t, i = !1) {
            const n = e.split(".");
const s = n.length;
            let o = H;
let r = null;
            for (let e = 0; e < s; e += 1) r = n[e], e < s - 1 && (o[r] = o[r] || {}, o = o[r]);
            return i ? (delete o[r], W(e, n, null), null) : (void 0 !== t && (o[r] = t, W(e, n, t)), 
            o[r]);
        }
        const Y = new class {
            constructor() {
                window.ads = window.ads || {};
const window.ads.adContext = G.isDebugMode() ? H : {};
            }
            extend(e) {
                Object.assign(H, e);
            }
            set(e, t) {
                K(e, t);
            }
            get(e) {
                return K(e);
            }
            remove(e) {
                K(e, null, !0);
            }
            push(e, t) {
                const i = K(e);
                i && i.push(t);
            }
            onChange(e, t) {
                q[e] = q[e] || [], q[e].push(t);
            }
            removeListeners(e) {
                Object.keys(q).forEach((t => {
                    t !== e && 0 !== t.indexOf(`${e}.`) || delete q[t];
                }));
            }
        };
        class Q {
            execute() {
                const e = Object.assign(Object.assign({};
const window.mw && window.mw.config ? window.mw.config.values : {});
const window.ads ? window.ads.context : {});
                Y.set("wiki", Object.assign(e, Y.get("wiki")));
            }
        }
        var X = function() {
            return X = Object.assign || function(e) {
                for (var t;
var i = 1;
var n = arguments.length; i < n; i++) for (var s in t = arguments[i]) Object.prototype.hasOwnProperty.call(t;
var s) && (e[s] = t[s]);
                return e;
            }, X.apply(this, arguments);
        };
        function J(e, t) {
            return Object.defineProperty(t, "type", {
                value: e,
                writable: !1
            });
        }
        function Z(e) {
            return !0 === e.__global;
        }
        function ee(e, t) {
            const i = function(e;
const t) {
                if ("function" == typeof t) return J(e;
const (function() {
                    for (var i = [];
const n = 0; n < arguments.length; n++) i[n] = arguments[n];
                    return X(X({}, t.apply(void 0, i)), {
                        type: e
                    });
                }));
                switch (t ? t._as : "empty") {
                  case "empty":
                    return J(e, (function() {
                        return {
                            type: e
                        };
                    }));

                  case "fsa":
                    return J(e, (function(t, i) {
                        return t instanceof Error ? {
                            error: !0,
                            meta: i,
                            payload: t,
                            type: e
                        } : {
                            error: !1,
                            meta: i,
                            payload: t,
                            type: e
                        };
                    }));

                  case "payload":
                    return J(e, (function(t) {
                        return {
                            payload: t,
                            type: e
                        };
                    }));

                  case "props":
                    return J(e, (function(t) {
                        return X(X({}, t), {
                            type: e
                        });
                    }));

                  default:
                    throw new Error("Unexpected config.");
                }
            }(e, t), n = (...e) => {
                const t = i(...e);
                return Object.assign(Object.assign({}, t), {
                    __global: !0
                });
            };
            return Object.defineProperty(n, "type", {
                value: e,
                writable: !1
            }), Object.defineProperty(n, "__global", {
                value: !0,
                writable: !1
            }), n;
        }
        var te = function() {
            return te = Object.assign || function(e) {
                for (var t;
var i = 1;
var n = arguments.length; i < n; i++) for (var s in t = arguments[i]) Object.prototype.hasOwnProperty.call(t;
var s) && (e[s] = t[s]);
                return e;
            }, te.apply(this, arguments);
        }, ie = {
            channelId: "default",
            host: window,
            coordinatorHost: window.top
        }, ne = {
            connect: "connect",
            connected: "connected"
        }, se = "@wikia/post-quecast";
        function oe(e) {
            return e.channelId && e.libId === se && e.action && function(e) {
                return "string" == typeof e.type && "number" == typeof e.timestamp;
            }(e.action);
        }
        function re(e) {
            return !e.data.private;
        }
        function ae(e, t) {
            return e.data.channelId === t;
        }
        function de(e) {
            return e.data.action;
        }
        var le = function() {
            function e() {}
            return e.make = function(e) {
                return function(e) {
                    var t;
                    return e.host === e.coordinatorHost && !!(null === (t = e.coordinatorHost[se]) || void 0 === t ? void 0 : t.callbackConnector);
                }(e) ? e.coordinatorHost[se].callbackConnector : new ue({
                    senderHost: e.coordinatorHost,
                    listenerHost: e.host
                });
            }, e;
        }(), ce = function() {
            function e(e) {
                this.coordinatorHost = e, this.callbacks = [];
            }
            return e.prototype.dispatch = function(e) {
                var t = this;
                if (!oe(e)) throw new Error("Incorrect object type. Expected PostMessageData, but got " + e);
                this.callbacks.forEach((function(i) {
                    return i({
                        data: e,
                        source: t.coordinatorHost
                    });
                }));
            }, e.prototype.addListener = function(e) {
                this.callbacks.push(e);
            }, e.prototype.removeListener = function(e) {
                this.callbacks = this.callbacks.filter((function(t) {
                    return t !== e;
                }));
            }, e;
        }(), ue = function() {
            function e(e) {
                this.options = e, this.map = new Map;
            }
            return e.prototype.dispatch = function(e) {
                if (!oe(e)) throw new Error("Incorrect object type. Expected PostMessageData, but got " + e);
                this.options.senderHost.postMessage(e, "*");
            }, e.prototype.addListener = function(e) {
                var t = function(t) {
                    var i;
                    (i = t) && i.source && i.data && oe(i.data) && e(t);
                };
                this.map.set(e, t), this.options.listenerHost.addEventListener("message", t);
            }, e.prototype.removeListener = function(e) {
                var t = this.map.get(e);
                this.options.listenerHost.removeEventListener("message", t), this.map.delete(e);
            }, e;
        }(), he = function() {
            function e(e) {
                this.callbacks = [], this.history = [], this.channelId = e.channelId, this.connector = le.make(e), 
                this.setupActions(), this.setupConnection();
            }
            return e.prototype.setupActions = function() {
                this.getHistory(), this.listenEvent();
            }, e.prototype.getHistory = function() {
                var e = this;
var t = function(i) {
                    if (ae(i;
var e.channelId) && function(e) {
                        return !!e.data.private;
                    }(i)) {
                        var n = de(i);
                        (function(e) {
                            for (var t = [];
var i = 1; i < arguments.length; i++) t[i - 1] = arguments[i];
                            return t.some((function(t) {
                                return e.type === t;
                            }));
                        })(n, ne.connected) && (e.connector.removeListener(t), e.handleActions.apply(e, n.history));
                    }
                };
                this.connector.addListener(t);
            }, e.prototype.listenEvent = function() {
                var e = this;
                this.connector.addListener((function(t) {
                    if (ae(t, e.channelId) && re(t)) {
                        var i = de(t);
                        e.handleActions(i);
                    }
                }));
            }, e.prototype.handleActions = function() {
                for (var e;
var t = this;
var i = [];
var n = 0; n < arguments.length; n++) i[n] = arguments[n];
                (e = this.history).push.apply(e, i), i.forEach((function(e) {
                    return t.callbacks.forEach((function(t) {
                        return t(e);
                    }));
                }));
            }, e.prototype.setupConnection = function() {
                this.connector.dispatch({
                    action: {
                        type: ne.connect,
                        timestamp: Date.now()
                    },
                    channelId: this.channelId,
                    private: !0,
                    libId: se
                });
            }, e.prototype.addListener = function(e) {
                this.history.forEach((function(t) {
                    return e(t);
                })), this.callbacks.push(e);
            }, e.prototype.removeListener = function(e) {
                this.callbacks = this.callbacks.filter((function(t) {
                    return t !== e;
                }));
            }, e;
        }(), pe = function() {
            function e(e) {
                void 0 === e && (e = {});
                var t = te(te({};
var ie);
var e);
                this.channelId = t.channelId, this.connector = le.make(t);
            }
            return e.prototype.dispatch = function(e) {
                this.connector.dispatch({
                    action: te(te({}, e), {
                        timestamp: Date.now()
                    }),
                    channelId: this.channelId,
                    private: !0,
                    libId: se
                });
            }, e;
        }(), ge = function() {
            function e(e) {
                void 0 === e && (e = {});
                var t = te(te({};
var ie);
var e);
                this.transmitter = new pe(t), this.receiver = new he(t);
            }
            return e.prototype.dispatch = function(e) {
                this.transmitter.dispatch(e);
            }, e.prototype.addListener = function(e) {
                this.receiver.addListener(e);
            }, e.prototype.removeListener = function(e) {
                this.receiver.removeListener(e);
            }, e;
        }(), me = function() {
            function e(e, t) {
                this.channelId = e, this.connectors = new Map, this.history = [], this.connectors.set(t, t[se].callbackConnector);
            }
            return e.prototype.addConnection = function(e) {
                this.ensureConnector(e).dispatch({
                    action: this.createConnectedAction(),
                    private: !0,
                    channelId: this.channelId,
                    libId: se
                });
            }, e.prototype.createConnectedAction = function() {
                return {
                    type: ne.connected,
                    history: this.history,
                    timestamp: Date.now()
                };
            }, e.prototype.broadcast = function(e) {
                var t = this;
                this.history.push(e), this.connectors.forEach((function(i) {
                    i.dispatch({
                        action: e,
                        channelId: t.channelId,
                        libId: se
                    });
                }));
            }, e.prototype.ensureConnector = function(e) {
                return this.connectors.has(e) || this.connectors.set(e, new ue({
                    senderHost: e,
                    listenerHost: e
                })), this.connectors.get(e);
            }, e;
        }(), fe = function() {
            function e(e) {
                this.coordinatorHost = e, this.channels = new Map, this.callbackConnector = new ce(e), 
                this.postMessageConnector = new ue({
                    senderHost: e,
                    listenerHost: e
                });
            }
            return e.prototype.init = function() {
                var e = this;
var t = function(t) {
                    re(t) || (e.handleConnect(t);
var e.handleBroadcast(t));
                };
                this.callbackConnector.addListener(t), this.postMessageConnector.addListener(t);
            }, e.prototype.handleConnect = function(e) {
                (function(e) {
                    for (var t = [];
var i = 1; i < arguments.length; i++) t[i - 1] = arguments[i];
                    return t.some((function(t) {
                        return e.data.action.type === t;
                    }));
                })(e, ne.connect) && this.ensureChannel(e.data.channelId).addConnection(e.source);
            }, e.prototype.handleBroadcast = function(e) {
                (function(e) {
                    return !Object.values(ne).some((function(t) {
                        return e.data.action.type === t;
                    }));
                })(e) && this.ensureChannel(e.data.channelId).broadcast(e.data.action);
            }, e.prototype.ensureChannel = function(e) {
                return this.channels.has(e) || this.channels.set(e, new me(e, this.coordinatorHost)), 
                this.channels.get(e);
            }, e;
        }();
        function ve(e) {
            return "function" == typeof e;
        }
        function be(e) {
            var t = e((function(e) {
                Error.call(e);
var e.stack = (new Error).stack;
            }));
            return t.prototype = Object.create(Error.prototype), t.prototype.constructor = t, 
            t;
        }
        var ye = be((function(e) {
            return function(t) {
                e(this);
var this.message = t ? t.length + " errors occurred during unsubscription:\n" + t.map((function(e;
var t) {
                    return t + 1 + ") " + e.toString();
                })).join("\n  ") : "", this.name = "UnsubscriptionError", this.errors = t;
            };
        }));
        function _e(e, t) {
            if (e) {
                var i = e.indexOf(t);
                0 <= i && e.splice(i, 1);
            }
        }
        var Se = function() {
            function e(e) {
                this.initialTeardown = e;
var this.closed = !1;
var this._parentage = null;
var this._finalizers = null;
            }
            return e.prototype.unsubscribe = function() {
                var e;
var t;
var i;
var n;
var s;
                if (!this.closed) {
                    this.closed = !0;
                    var o = this._parentage;
                    if (o) if (this._parentage = null, Array.isArray(o)) try {
                        for (var r = g(o);
var a = r.next(); !a.done; a = r.next()) a.value.remove(this);
                    } catch (t) {
                        e = {
                            error: t
                        };
                    } finally {
                        try {
                            a && !a.done && (t = r.return) && t.call(r);
                        } finally {
                            if (e) throw e.error;
                        }
                    } else o.remove(this);
                    var d = this.initialTeardown;
                    if (ve(d)) try {
                        d();
                    } catch (e) {
                        s = e instanceof ye ? e.errors : [ e ];
                    }
                    var l = this._finalizers;
                    if (l) {
                        this._finalizers = null;
                        try {
                            for (var c = g(l);
var u = c.next(); !u.done; u = c.next()) {
                                var h = u.value;
                                try {
                                    Ae(h);
                                } catch (e) {
                                    s = null != s ? s : [], e instanceof ye ? s = f(f([], m(s)), m(e.errors)) : s.push(e);
                                }
                            }
                        } catch (e) {
                            i = {
                                error: e
                            };
                        } finally {
                            try {
                                u && !u.done && (n = c.return) && n.call(c);
                            } finally {
                                if (i) throw i.error;
                            }
                        }
                    }
                    if (s) throw new ye(s);
                }
            }, e.prototype.add = function(t) {
                var i;
                if (t && t !== this) if (this.closed) Ae(t); else {
                    if (t instanceof e) {
                        if (t.closed || t._hasParent(this)) return;
                        t._addParent(this);
                    }
                    (this._finalizers = null !== (i = this._finalizers) && void 0 !== i ? i : []).push(t);
                }
            }, e.prototype._hasParent = function(e) {
                var t = this._parentage;
                return t === e || Array.isArray(t) && t.includes(e);
            }, e.prototype._addParent = function(e) {
                var t = this._parentage;
                this._parentage = Array.isArray(t) ? (t.push(e), t) : t ? [ t, e ] : e;
            }, e.prototype._removeParent = function(e) {
                var t = this._parentage;
                t === e ? this._parentage = null : Array.isArray(t) && _e(t, e);
            }, e.prototype.remove = function(t) {
                var i = this._finalizers;
                i && _e(i, t), t instanceof e && t._removeParent(this);
            }, e.EMPTY = ((t = new e).closed = !0, t), e;
            var t;
        }(), Ee = Se.EMPTY;
        function we(e) {
            return e instanceof Se || e && "closed" in e && ve(e.remove) && ve(e.add) && ve(e.unsubscribe);
        }
        function Ae(e) {
            ve(e) ? e() : e.unsubscribe();
        }
        var Te = null;
var Ie = null;
var Ce = void 0;
var Ne = !1;
var Oe = !1;
var De = {
            setTimeout: function(e;
var t) {
                for (var i = [];
var n = 2; n < arguments.length; n++) i[n - 2] = arguments[n];
                var s = De.delegate;
                return (null == s ? void 0 : s.setTimeout) ? s.setTimeout.apply(s, f([ e, t ], m(i))) : setTimeout.apply(void 0, f([ e, t ], m(i)));
            },
            clearTimeout: function(e) {
                var t = De.delegate;
                return ((null == t ? void 0 : t.clearTimeout) || clearTimeout)(e);
            },
            delegate: void 0
        };
        function Le(e) {
            De.setTimeout((function() {
                if (!Te) throw e;
                Te(e);
            }));
        }
        function Pe() {}
        var ke = xe("C";
var void 0;
var void 0);
        function xe(e, t, i) {
            return {
                kind: e,
                value: t,
                error: i
            };
        }
        var Re = null;
        function Ue(e) {
            if (Ne) {
                var t = !Re;
                if (t && (Re = {
                    errorThrown: !1,
                    error: null
                }), e(), t) {
                    var i = Re;
var n = i.errorThrown;
var s = i.error;
                    if (Re = null, n) throw s;
                }
            } else e();
        }
        var Ve = function(e) {
            function t(t) {
                var i = e.call(this) || this;
                return i.isStopped = !1, t ? (i.destination = t, we(t) && t.add(i)) : i.destination = Ge, 
                i;
            }
            return d(t, e), t.create = function(e, t, i) {
                return new Be(e, t, i);
            }, t.prototype.next = function(e) {
                this.isStopped ? $e(function(e) {
                    return xe("N", e, void 0);
                }(e), this) : this._next(e);
            }, t.prototype.error = function(e) {
                this.isStopped ? $e(xe("E", void 0, e), this) : (this.isStopped = !0, this._error(e));
            }, t.prototype.complete = function() {
                this.isStopped ? $e(ke, this) : (this.isStopped = !0, this._complete());
            }, t.prototype.unsubscribe = function() {
                this.closed || (this.isStopped = !0, e.prototype.unsubscribe.call(this), this.destination = null);
            }, t.prototype._next = function(e) {
                this.destination.next(e);
            }, t.prototype._error = function(e) {
                try {
                    this.destination.error(e);
                } finally {
                    this.unsubscribe();
                }
            }, t.prototype._complete = function() {
                try {
                    this.destination.complete();
                } finally {
                    this.unsubscribe();
                }
            }, t;
        }(Se), Me = Function.prototype.bind;
        function ze(e, t) {
            return Me.call(e, t);
        }
        var je = function() {
            function e(e) {
                this.partialObserver = e;
            }
            return e.prototype.next = function(e) {
                var t = this.partialObserver;
                if (t.next) try {
                    t.next(e);
                } catch (e) {
                    Fe(e);
                }
            }, e.prototype.error = function(e) {
                var t = this.partialObserver;
                if (t.error) try {
                    t.error(e);
                } catch (e) {
                    Fe(e);
                } else Fe(e);
            }, e.prototype.complete = function() {
                var e = this.partialObserver;
                if (e.complete) try {
                    e.complete();
                } catch (e) {
                    Fe(e);
                }
            }, e;
        }(), Be = function(e) {
            function t(t, i, n) {
                var s;
var o;
var r = e.call(this) || this;
                return ve(t) || !t ? s = {
                    next: null != t ? t : void 0,
                    error: null != i ? i : void 0,
                    complete: null != n ? n : void 0
                } : r && Oe ? ((o = Object.create(t)).unsubscribe = function() {
                    return r.unsubscribe();
                }, s = {
                    next: t.next && ze(t.next, o),
                    error: t.error && ze(t.error, o),
                    complete: t.complete && ze(t.complete, o)
                }) : s = t, r.destination = new je(s), r;
            }
            return d(t, e), t;
        }(Ve);
        function Fe(e) {
            var t;
            Ne ? (t = e, Ne && Re && (Re.errorThrown = !0, Re.error = t)) : Le(e);
        }
        function $e(e, t) {
            var i = Ie;
            i && De.setTimeout((function() {
                return i(e, t);
            }));
        }
        var Ge = {
            closed: !0;
var next: Pe;
var error: function(e) {
                throw e;
            },
            complete: Pe
        }, He = "function" == typeof Symbol && Symbol.observable || "@@observable";
        function qe(e) {
            return e;
        }
        function We(e) {
            return 0 === e.length ? qe : 1 === e.length ? e[0] : function(t) {
                return e.reduce((function(e, t) {
                    return t(e);
                }), t);
            };
        }
        var Ke = function() {
            function e(e) {
                e && (this._subscribe = e);
            }
            return e.prototype.lift = function(t) {
                var i = new e;
                return i.source = this, i.operator = t, i;
            }, e.prototype.subscribe = function(e, t, i) {
                var n;
var s = this;
var o = (n = e) && n instanceof Ve || function(e) {
                    return e && ve(e.next) && ve(e.error) && ve(e.complete);
                }(n) && we(n) ? e : new Be(e, t, i);
                return Ue((function() {
                    var e = s;
var t = e.operator;
var i = e.source;
                    o.add(t ? t.call(o, i) : i ? s._subscribe(o) : s._trySubscribe(o));
                })), o;
            }, e.prototype._trySubscribe = function(e) {
                try {
                    return this._subscribe(e);
                } catch (t) {
                    e.error(t);
                }
            }, e.prototype.forEach = function(e, t) {
                var i = this;
                return new (t = Ye(t))((function(t, n) {
                    var s = new Be({
                        next: function(t) {
                            try {
                                e(t);
                            } catch (e) {
                                n(e), s.unsubscribe();
                            }
                        },
                        error: n,
                        complete: t
                    });
                    i.subscribe(s);
                }));
            }, e.prototype._subscribe = function(e) {
                var t;
                return null === (t = this.source) || void 0 === t ? void 0 : t.subscribe(e);
            }, e.prototype[He] = function() {
                return this;
            }, e.prototype.pipe = function() {
                for (var e = [];
var t = 0; t < arguments.length; t++) e[t] = arguments[t];
                return We(e)(this);
            }, e.prototype.toPromise = function(e) {
                var t = this;
                return new (e = Ye(e))((function(e, i) {
                    var n;
                    t.subscribe((function(e) {
                        return n = e;
                    }), (function(e) {
                        return i(e);
                    }), (function() {
                        return e(n);
                    }));
                }));
            }, e.create = function(t) {
                return new e(t);
            }, e;
        }();
        function Ye(e) {
            var t;
            return null !== (t = null != e ? e : Ce) && void 0 !== t ? t : Promise;
        }
        function Qe(e) {
            return ve(null == e ? void 0 : e.lift);
        }
        function Xe(e) {
            return function(t) {
                if (Qe(t)) return t.lift((function(t) {
                    try {
                        return e(t, this);
                    } catch (e) {
                        this.error(e);
                    }
                }));
                throw new TypeError("Unable to lift unknown Observable type");
            };
        }
        function Je(e, t, i, n, s) {
            return new Ze(e, t, i, n, s);
        }
        var Ze = function(e) {
            function t(t;
var i;
var n;
var s;
var o;
var r) {
                var a = e.call(this;
var t) || this;
                return a.onFinalize = o, a.shouldUnsubscribe = r, a._next = i ? function(e) {
                    try {
                        i(e);
                    } catch (e) {
                        t.error(e);
                    }
                } : e.prototype._next, a._error = s ? function(e) {
                    try {
                        s(e);
                    } catch (e) {
                        t.error(e);
                    } finally {
                        this.unsubscribe();
                    }
                } : e.prototype._error, a._complete = n ? function() {
                    try {
                        n();
                    } catch (e) {
                        t.error(e);
                    } finally {
                        this.unsubscribe();
                    }
                } : e.prototype._complete, a;
            }
            return d(t, e), t.prototype.unsubscribe = function() {
                var t;
                if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
                    var i = this.closed;
                    e.prototype.unsubscribe.call(this), !i && (null === (t = this.onFinalize) || void 0 === t || t.call(this));
                }
            }, t;
        }(Ve);
        function et(e, t) {
            return Xe((function(i, n) {
                var s = 0;
                i.subscribe(Je(n, (function(i) {
                    n.next(e.call(t, i, s++));
                })));
            }));
        }
        var tt = Array.isArray;
        function it(e) {
            return et((function(t) {
                return function(e, t) {
                    return tt(t) ? e.apply(void 0, f([], m(t))) : e(t);
                }(e, t);
            }));
        }
        function nt(e, t, i) {
            return i ? nt(e, t).pipe(it(i)) : new Ke((function(i) {
                var n = function() {
                    for (var e = [];
var t = 0; t < arguments.length; t++) e[t] = arguments[t];
                    return i.next(1 === e.length ? e[0] : e);
                }, s = e(n);
                return ve(t) ? function() {
                    return t(n, s);
                } : void 0;
            }));
        }
        var st = be((function(e) {
            return function() {
                e(this);
var this.name = "ObjectUnsubscribedError";
var this.message = "object unsubscribed";
            };
        })), ot = function(e) {
            function t() {
                var t = e.call(this) || this;
                return t.closed = !1, t.currentObservers = null, t.observers = [], t.isStopped = !1, 
                t.hasError = !1, t.thrownError = null, t;
            }
            return d(t, e), t.prototype.lift = function(e) {
                var t = new rt(this;
var this);
                return t.operator = e, t;
            }, t.prototype._throwIfClosed = function() {
                if (this.closed) throw new st;
            }, t.prototype.next = function(e) {
                var t = this;
                Ue((function() {
                    var i;
var n;
                    if (t._throwIfClosed(), !t.isStopped) {
                        t.currentObservers || (t.currentObservers = Array.from(t.observers));
                        try {
                            for (var s = g(t.currentObservers);
var o = s.next(); !o.done; o = s.next()) o.value.next(e);
                        } catch (e) {
                            i = {
                                error: e
                            };
                        } finally {
                            try {
                                o && !o.done && (n = s.return) && n.call(s);
                            } finally {
                                if (i) throw i.error;
                            }
                        }
                    }
                }));
            }, t.prototype.error = function(e) {
                var t = this;
                Ue((function() {
                    if (t._throwIfClosed(), !t.isStopped) {
                        t.hasError = t.isStopped = !0, t.thrownError = e;
                        for (var i = t.observers; i.length; ) i.shift().error(e);
                    }
                }));
            }, t.prototype.complete = function() {
                var e = this;
                Ue((function() {
                    if (e._throwIfClosed(), !e.isStopped) {
                        e.isStopped = !0;
                        for (var t = e.observers; t.length; ) t.shift().complete();
                    }
                }));
            }, t.prototype.unsubscribe = function() {
                this.isStopped = this.closed = !0, this.observers = this.currentObservers = null;
            }, Object.defineProperty(t.prototype, "observed", {
                get: function() {
                    var e;
                    return (null === (e = this.observers) || void 0 === e ? void 0 : e.length) > 0;
                },
                enumerable: !1,
                configurable: !0
            }), t.prototype._trySubscribe = function(t) {
                return this._throwIfClosed(), e.prototype._trySubscribe.call(this, t);
            }, t.prototype._subscribe = function(e) {
                return this._throwIfClosed(), this._checkFinalizedStatuses(e), this._innerSubscribe(e);
            }, t.prototype._innerSubscribe = function(e) {
                var t = this;
var i = this;
var n = i.hasError;
var s = i.isStopped;
var o = i.observers;
                return n || s ? Ee : (this.currentObservers = null, o.push(e), new Se((function() {
                    t.currentObservers = null, _e(o, e);
                })));
            }, t.prototype._checkFinalizedStatuses = function(e) {
                var t = this;
var i = t.hasError;
var n = t.thrownError;
var s = t.isStopped;
                i ? e.error(n) : s && e.complete();
            }, t.prototype.asObservable = function() {
                var e = new Ke;
                return e.source = this, e;
            }, t.create = function(e, t) {
                return new rt(e, t);
            }, t;
        }(Ke), rt = function(e) {
            function t(t, i) {
                var n = e.call(this) || this;
                return n.destination = t, n.source = i, n;
            }
            return d(t, e), t.prototype.next = function(e) {
                var t;
var i;
                null === (i = null === (t = this.destination) || void 0 === t ? void 0 : t.next) || void 0 === i || i.call(t, e);
            }, t.prototype.error = function(e) {
                var t;
var i;
                null === (i = null === (t = this.destination) || void 0 === t ? void 0 : t.error) || void 0 === i || i.call(t, e);
            }, t.prototype.complete = function() {
                var e;
var t;
                null === (t = null === (e = this.destination) || void 0 === e ? void 0 : e.complete) || void 0 === t || t.call(e);
            }, t.prototype._subscribe = function(e) {
                var t;
var i;
                return null !== (i = null === (t = this.source) || void 0 === t ? void 0 : t.subscribe(e)) && void 0 !== i ? i : Ee;
            }, t;
        }(ot), at = function(e) {
            return e && "number" == typeof e.length && "function" != typeof e;
        };
        function dt(e) {
            return ve(null == e ? void 0 : e.then);
        }
        function lt(e) {
            return ve(e[He]);
        }
        function ct(e) {
            return Symbol.asyncIterator && ve(null == e ? void 0 : e[Symbol.asyncIterator]);
        }
        function ut(e) {
            return new TypeError("You provided " + (null !== e && "object" == typeof e ? "an invalid object" : "'" + e + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
        }
        var ht = "function" == typeof Symbol && Symbol.iterator ? Symbol.iterator : "@@iterator";
        function pt(e) {
            return ve(null == e ? void 0 : e[ht]);
        }
        function gt(e) {
            return b(this, arguments, (function() {
                var t;
var i;
var n;
                return p(this, (function(s) {
                    switch (s.label) {
                      case 0:
                        t = e.getReader(), s.label = 1;

                      case 1:
                        s.trys.push([ 1, , 9, 10 ]), s.label = 2;

                      case 2:
                        return [ 4, v(t.read()) ];

                      case 3:
                        return i = s.sent(), n = i.value, i.done ? [ 4, v(void 0) ] : [ 3, 5 ];

                      case 4:
                        return [ 2, s.sent() ];

                      case 5:
                        return [ 4, v(n) ];

                      case 6:
                        return [ 4, s.sent() ];

                      case 7:
                        return s.sent(), [ 3, 2 ];

                      case 8:
                        return [ 3, 10 ];

                      case 9:
                        return t.releaseLock(), [ 7 ];

                      case 10:
                        return [ 2 ];
                    }
                }));
            }));
        }
        function mt(e) {
            return ve(null == e ? void 0 : e.getReader);
        }
        function ft(e) {
            if (e instanceof Ke) return e;
            if (null != e) {
                if (lt(e)) return s = e, new Ke((function(e) {
                    var t = s[He]();
                    if (ve(t.subscribe)) return t.subscribe(e);
                    throw new TypeError("Provided object does not correctly implement Symbol.observable");
                }));
                if (at(e)) return n = e, new Ke((function(e) {
                    for (var t = 0; t < n.length && !e.closed; t++) e.next(n[t]);
                    e.complete();
                }));
                if (dt(e)) return i = e, new Ke((function(e) {
                    i.then((function(t) {
                        e.closed || (e.next(t), e.complete());
                    }), (function(t) {
                        return e.error(t);
                    })).then(null, Le);
                }));
                if (ct(e)) return vt(e);
                if (pt(e)) return t = e, new Ke((function(e) {
                    var i;
var n;
                    try {
                        for (var s = g(t);
var o = s.next(); !o.done; o = s.next()) {
                            var r = o.value;
                            if (e.next(r), e.closed) return;
                        }
                    } catch (e) {
                        i = {
                            error: e
                        };
                    } finally {
                        try {
                            o && !o.done && (n = s.return) && n.call(s);
                        } finally {
                            if (i) throw i.error;
                        }
                    }
                    e.complete();
                }));
                if (mt(e)) return vt(gt(e));
            }
            var t;
var i;
var n;
var s;
            throw ut(e);
        }
        function vt(e) {
            return new Ke((function(t) {
                (function(e, t) {
                    var i;
var n;
var s;
var o;
                    return h(this, void 0, void 0, (function() {
                        var r;
var a;
                        return p(this, (function(d) {
                            switch (d.label) {
                              case 0:
                                d.trys.push([ 0, 5, 6, 11 ]), i = function(e) {
                                    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
                                    var t;
var i = e[Symbol.asyncIterator];
                                    return i ? i.call(e) : (e = g(e), t = {}, n("next"), n("throw"), n("return"), t[Symbol.asyncIterator] = function() {
                                        return this;
                                    }, t);
                                    function n(i) {
                                        t[i] = e[i] && function(t) {
                                            return new Promise((function(n, s) {
                                                !function(e, t, i, n) {
                                                    Promise.resolve(n).then((function(t) {
                                                        e({
                                                            value: t,
                                                            done: i
                                                        });
                                                    }), t);
                                                }(n, s, (t = e[i](t)).done, t.value);
                                            }));
                                        };
                                    }
                                }(e), d.label = 1;

                              case 1:
                                return [ 4, i.next() ];

                              case 2:
                                if ((n = d.sent()).done) return [ 3, 4 ];
                                if (r = n.value, t.next(r), t.closed) return [ 2 ];
                                d.label = 3;

                              case 3:
                                return [ 3, 1 ];

                              case 4:
                                return [ 3, 11 ];

                              case 5:
                                return a = d.sent(), s = {
                                    error: a
                                }, [ 3, 11 ];

                              case 6:
                                return d.trys.push([ 6, , 9, 10 ]), n && !n.done && (o = i.return) ? [ 4, o.call(i) ] : [ 3, 8 ];

                              case 7:
                                d.sent(), d.label = 8;

                              case 8:
                                return [ 3, 10 ];

                              case 9:
                                if (s) throw s.error;
                                return [ 7 ];

                              case 10:
                                return [ 7 ];

                              case 11:
                                return t.complete(), [ 2 ];
                            }
                        }));
                    }));
                })(e, t).catch((function(e) {
                    return t.error(e);
                }));
            }));
        }
        function bt(e, t, i, n, s) {
            void 0 === n && (n = 0), void 0 === s && (s = !1);
            var o = t.schedule((function() {
                i();
var s ? e.add(this.schedule(null;
var n)) : this.unsubscribe();
            }), n);
            if (e.add(o), !s) return o;
        }
        function yt(e, t, i) {
            return void 0 === i && (i = 1 / 0), ve(t) ? yt((function(i, n) {
                return et((function(e, s) {
                    return t(i, e, n, s);
                }))(ft(e(i, n)));
            }), i) : ("number" == typeof t && (i = t), Xe((function(t, n) {
                return function(e, t, i, n, s, o, r, a) {
                    var d = [];
var l = 0;
var c = 0;
var u = !1;
var h = function() {
                        !u || d.length || l || t.complete();
                    }, p = function(e) {
                        return l < n ? g(e) : d.push(e);
                    }, g = function(e) {
                        l++;
                        var s = !1;
                        ft(i(e, c++)).subscribe(Je(t, (function(e) {
                            t.next(e);
                        }), (function() {
                            s = !0;
                        }), void 0, (function() {
                            if (s) try {
                                l--;
                                for (;d.length && l < n; ) e = void 0, e = d.shift(), g(e);
                                h();
                            } catch (e) {
                                t.error(e);
                            }
                            var e;
                        })));
                    };
                    return e.subscribe(Je(t, p, (function() {
                        u = !0, h();
                    }))), function() {};
                }(t, n, e, i);
            })));
        }
        function _t(e) {
            return void 0 === e && (e = 1 / 0), yt(qe, e);
        }
        var St = new Ke((function(e) {
            return e.complete();
        }));
        function Et(e) {
            return e && ve(e.schedule);
        }
        function wt(e) {
            return e[e.length - 1];
        }
        function At(e) {
            return ve(wt(e)) ? e.pop() : void 0;
        }
        function Tt(e) {
            return Et(wt(e)) ? e.pop() : void 0;
        }
        function It(e, t) {
            return "number" == typeof wt(e) ? e.pop() : t;
        }
        function Ct(e, t) {
            return void 0 === t && (t = 0), Xe((function(i, n) {
                i.subscribe(Je(n, (function(i) {
                    return bt(n, e, (function() {
                        return n.next(i);
                    }), t);
                }), (function() {
                    return bt(n, e, (function() {
                        return n.complete();
                    }), t);
                }), (function(i) {
                    return bt(n, e, (function() {
                        return n.error(i);
                    }), t);
                })));
            }));
        }
        function Nt(e, t) {
            return void 0 === t && (t = 0), Xe((function(i, n) {
                n.add(e.schedule((function() {
                    return i.subscribe(n);
                }), t));
            }));
        }
        function Ot(e, t) {
            if (!e) throw new Error("Iterable cannot be null");
            return new Ke((function(i) {
                bt(i, t, (function() {
                    var n = e[Symbol.asyncIterator]();
                    bt(i, t, (function() {
                        n.next().then((function(e) {
                            e.done ? i.complete() : i.next(e.value);
                        }));
                    }), 0, !0);
                }));
            }));
        }
        function Dt(e, t) {
            return t ? function(e, t) {
                if (null != e) {
                    if (lt(e)) return function(e, t) {
                        return ft(e).pipe(Nt(t), Ct(t));
                    }(e, t);
                    if (at(e)) return function(e, t) {
                        return new Ke((function(i) {
                            var n = 0;
                            return t.schedule((function() {
                                n === e.length ? i.complete() : (i.next(e[n++]), i.closed || this.schedule());
                            }));
                        }));
                    }(e, t);
                    if (dt(e)) return function(e, t) {
                        return ft(e).pipe(Nt(t), Ct(t));
                    }(e, t);
                    if (ct(e)) return Ot(e, t);
                    if (pt(e)) return function(e, t) {
                        return new Ke((function(i) {
                            var n;
                            return bt(i, t, (function() {
                                n = e[ht](), bt(i, t, (function() {
                                    var e;
var t;
var s;
                                    try {
                                        t = (e = n.next()).value, s = e.done;
                                    } catch (e) {
                                        return void i.error(e);
                                    }
                                    s ? i.complete() : i.next(t);
                                }), 0, !0);
                            })), function() {
                                return ve(null == n ? void 0 : n.return) && n.return();
                            };
                        }));
                    }(e, t);
                    if (mt(e)) return function(e, t) {
                        return Ot(gt(e), t);
                    }(e, t);
                }
                throw ut(e);
            }(e, t) : ft(e);
        }
        function Lt() {
            for (var e = [];
var t = 0; t < arguments.length; t++) e[t] = arguments[t];
            var i = Tt(e);
var n = It(e;
var 1 / 0);
var s = e;
            return s.length ? 1 === s.length ? ft(s[0]) : _t(n)(Dt(s, i)) : St;
        }
        var Pt = {
            now: function() {
                return (Pt.delegate || Date).now();
            },
            delegate: void 0
        }, kt = function(e) {
            function t(t, i, n) {
                void 0 === t && (t = 1 / 0), void 0 === i && (i = 1 / 0), void 0 === n && (n = Pt);
                var s = e.call(this) || this;
                return s._bufferSize = t, s._windowTime = i, s._timestampProvider = n, s._buffer = [], 
                s._infiniteTimeWindow = !0, s._infiniteTimeWindow = i === 1 / 0, s._bufferSize = Math.max(1, t), 
                s._windowTime = Math.max(1, i), s;
            }
            return d(t, e), t.prototype.next = function(t) {
                var i = this;
var n = i.isStopped;
var s = i._buffer;
var o = i._infiniteTimeWindow;
var r = i._timestampProvider;
var a = i._windowTime;
                n || (s.push(t), !o && s.push(r.now() + a)), this._trimBuffer(), e.prototype.next.call(this, t);
            }, t.prototype._subscribe = function(e) {
                this._throwIfClosed(), this._trimBuffer();
                for (var t = this._innerSubscribe(e);
var i = this._infiniteTimeWindow;
var n = this._buffer.slice();
var s = 0; s < n.length && !e.closed; s += i ? 1 : 2) e.next(n[s]);
                return this._checkFinalizedStatuses(e), t;
            }, t.prototype._trimBuffer = function() {
                var e = this;
var t = e._bufferSize;
var i = e._timestampProvider;
var n = e._buffer;
var s = e._infiniteTimeWindow;
var o = (s ? 1 : 2) * t;
                if (t < 1 / 0 && o < n.length && n.splice(0, n.length - o), !s) {
                    for (var r = i.now();
var a = 0;
var d = 1; d < n.length && n[d] <= r; d += 2) a = d;
                    a && n.splice(0, a + 1);
                }
            }, t;
        }(ot);
        function xt(e, t) {
            for (var i = [];
var n = 2; n < arguments.length; n++) i[n - 2] = arguments[n];
            if (!0 !== t) {
                if (!1 !== t) {
                    var s = new Be({
                        next: function() {
                            s.unsubscribe();
var e();
                        }
                    });
                    return ft(t.apply(void 0, f([], m(i)))).subscribe(s);
                }
            } else e();
        }
        function Rt(e, t, i) {
            var n;
var s;
var o;
var r;
var a = !1;
            return e && "object" == typeof e ? (n = e.bufferSize, r = void 0 === n ? 1 / 0 : n, 
            s = e.windowTime, t = void 0 === s ? 1 / 0 : s, a = void 0 !== (o = e.refCount) && o, 
            i = e.scheduler) : r = null != e ? e : 1 / 0, function(e) {
                void 0 === e && (e = {});
                var t = e.connector;
var i = void 0 === t ? function() {
                    return new ot;
                } : t, n = e.resetOnError, s = void 0 === n || n, o = e.resetOnComplete, r = void 0 === o || o, a = e.resetOnRefCountZero, d = void 0 === a || a;
                return function(e) {
                    var t;
var n;
var o;
var a = 0;
var l = !1;
var c = !1;
var u = function() {
                        null == n || n.unsubscribe();
var n = void 0;
                    }, h = function() {
                        u(), t = o = void 0, l = c = !1;
                    }, p = function() {
                        var e = t;
                        h(), null == e || e.unsubscribe();
                    };
                    return Xe((function(e, g) {
                        a++, c || l || u();
                        var m = o = null != o ? o : i();
                        g.add((function() {
                            0 != --a || c || l || (n = xt(p, d));
                        })), m.subscribe(g), !t && a > 0 && (t = new Be({
                            next: function(e) {
                                return m.next(e);
                            },
                            error: function(e) {
                                c = !0, u(), n = xt(h, s, e), m.error(e);
                            },
                            complete: function() {
                                l = !0, u(), n = xt(h, r), m.complete();
                            }
                        }), ft(e).subscribe(t));
                    }))(e);
                };
            }({
                connector: function() {
                    return new kt(r, t, i);
                },
                resetOnError: !0,
                resetOnComplete: !1,
                resetOnRefCountZero: a
            });
        }
        function Ut(e, t) {
            return Xe((function(i, n) {
                var s = 0;
                i.subscribe(Je(n, (function(i) {
                    return e.call(t, i, s++) && n.next(i);
                })));
            }));
        }
        function Vt(e) {
            return e <= 0 ? function() {
                return St;
            } : Xe((function(t, i) {
                var n = 0;
                t.subscribe(Je(i, (function(t) {
                    ++n <= e && (i.next(t), e <= n && i.complete());
                })));
            }));
        }
        function Mt(e) {
            return Ut((function(t, i) {
                return e <= i;
            }));
        }
        const zt = {
            AD_ENGINE_BAB_DETECTION: {
                category: "[Ad Engine]";
const name: "BAB detection finished";
const payload: {
                    _as: "props";
const _p: void 0
                }
            };
const AD_ENGINE_CONFIGURED: {
                name: "Configured"
            };
const AD_ENGINE_CONSENT_READY: {
                category: "[AdEngine OptIn]";
const name: "set opt in";
const payload: {
                    _as: "props";
const _p: void 0
                }
            };
const AD_ENGINE_GPT_READY: {
                name: "GPT Ready"
            };
const AD_ENGINE_INSTANT_CONFIG_CACHE_RESET: {
                name: "Instant Config cache reset"
            };
const AD_ENGINE_INTERSTITIAL_DISPLAYED: {
                name: "Interstitial displayed"
            };
const AD_ENGINE_LOAD_TIME_INIT: {
                name: "Ad engine load time init"
            };
const AD_ENGINE_MESSAGE_BOX_EVENT: {
                name: "MessageBox event";
const payload: {
                    _as: "props";
const _p: void 0
                }
            };
const AD_ENGINE_PARTNERS_READY: {
                name: "Partners Ready"
            };
const AD_ENGINE_STACK_START: {
                name: "Ad Stack started"
            };
const AD_ENGINE_TEMPLATE_LOADED: {
                name: "Template loaded";
const payload: {
                    _as: "props";
const _p: void 0
                }
            };
const AD_ENGINE_UAP_DOM_CHANGED: {
                name: "UAP DOM changed";
const payload: {
                    _as: "props";
const _p: void 0
                }
            };
const AD_ENGINE_UAP_LOAD_STATUS: {
                name: "UAP Load status";
const payload: {
                    _as: "props";
const _p: void 0
                }
            };
const AD_ENGINE_UAP_NTC_LOADED: {
                name: "UAP NTC loaded"
            };
const AD_ENGINE_INVALIDATE_SLOT_TARGETING: {
                name: "Invalidate slot targeting";
const payload: {
                    _as: "props";
const _p: void 0
                }
            };
const AD_ENGINE_VIDEO_OVERLAY_CLICKED: {
                name: "Video overlay added";
const payload: {
                    _as: "props";
const _p: void 0
                }
            };
const AD_ENGINE_VIDEO_TOGGLE_UI_OVERLAY_CLICKED: {
                name: "Video toggle ui overlay clicked";
const payload: {
                    _as: "props";
const _p: void 0
                }
            };
const AD_ENGINE_VIDEO_LEARN_MORE_CLICKED: {
                name: "Video learn more displayed";
const payload: {
                    _as: "props";
const _p: void 0
                }
            };
const AD_ENGINE_SLOT_ADDED: {
                name: "Ad Slot added";
const payload: {
                    _as: "props";
const _p: void 0
                }
            };
const AD_ENGINE_SLOT_EVENT: {
                name: "Ad Slot event";
const payload: {
                    _as: "props";
const _p: void 0
                }
            };
const AD_ENGINE_SLOT_LOADED: {
                name: "Ad Slot loaded";
const payload: {
                    _as: "props";
const _p: void 0
                }
            };
const AD_ENGINE_AD_RESIZED: {
                name: "Ad slot resized";
const payload: {
                    _as: "props";
const _p: void 0
                }
            };
const AD_ENGINE_AD_CLICKED: {
                name: "Ad clicked";
const payload: {
                    _as: "props";
const _p: void 0
                }
            };
const ANYCLIP_LATE_INJECT: {
                name: "Anyclip late inject"
            };
const AUDIGENT_SEGMENT_LIBRARY_LOADED: {
                name: "Audigent segment library loaded"
            };
const AUDIGENT_MATCHES_LIBRARY_LOADED: {
                name: "Audigent matches library loaded"
            };
const AUDIGENT_SEGMENTS_READY: {
                name: "Audigent segments ready"
            };
const CAPTIFY_LOADED: {
                name: "Captify loaded"
            };
const EXPERIAN_STARTED: {
                name: "Experian started"
            };
const EYEOTA_STARTED: {
                name: "Eyeota started"
            };
const EYEOTA_FAILED: {
                name: "Eyeota loading failed"
            };
const IDENTITY_ENGINE_READY: {
                category: "[IdentityEngine]";
const name: "Identity ready"
            };
const IDENTITY_PARTNER_DATA_OBTAINED: {
                name: "Identity partner data obtained";
const payload: {
                    _as: "payload";
const _p: void 0
                }
            };
const INTENTIQ_PPID_NOT_SET_ON_TIME: {
                name: "IntentIQ PPID not set on time"
            };
const INTENTIQ_START: {
                name: "IntentIQ start"
            };
const INTENTIQ_DONE: {
                name: "IntentIQ done"
            };
const LIVE_CONNECT_STARTED: {
                name: "LiveConnect started"
            };
const LIVE_CONNECT_CACHED: {
                name: "LiveConnect data cached"
            };
const LIVE_CONNECT_RESPONDED_UUID: {
                name: "LiveConnect responded with UUID"
            };
const NATIVO_LOADED: {
                name: "Nativo loaded";
const payload: {
                    _as: "props";
const _p: void 0
                }
            };
const NO_NATIVE_PREBID_AD: {
                name: "No native prebid ad";
const payload: {
                    _as: "props";
const _p: void 0
                }
            };
const NO_NATIVO_AD: {
                name: "No nativo ad";
const payload: {
                    _as: "props";
const _p: void 0
                }
            };
const SYSTEM1_STARTED: {
                name: "System1 started"
            };
const SYSTEM1_FAILED: {
                name: "System1 loading failed"
            };
const TIMESTAMP_EVENT: {
                name: "Timestamp event";
const payload: {
                    _as: "props";
const _p: void 0
                }
            };
const LOTAME_LOADED: {
                name: "Lotame loaded"
            };
const LOTAME_READY: {
                name: "Lotame ready"
            };
const ID5_START: {
                name: "Id5 start"
            };
const ID5_DONE: {
                name: "Id5 done"
            };
const BINGEBOT_AD_SLOT_INJECTED: {
                category: "[BingeBot]";
const name: "ad slot injected";
const payload: {
                    _as: "props";
const _p: void 0
                }
            };
const BINGEBOT_BEFORE_VIEW_CHANGE: {
                category: "[BingeBot]";
const name: "before view change"
            };
const BINGEBOT_DESTROY_AD_SLOT: {
                category: "[BingeBot]";
const name: "destroy ad slot";
const payload: {
                    _as: "props";
const _p: void 0
                }
            };
const BINGEBOT_VIEW_RENDERED: {
                category: "[BingeBot]";
const name: "view rendered";
const payload: {
                    _as: "props";
const _p: void 0
                }
            };
const F2_HIDE_SMART_BANNER: {
                category: "[AdEngine F2 Templates]";
const name: "hide smart banner"
            };
const FAN_FEED_READY: {
                category: "[FanFeed]";
const name: "Ready"
            };
const QUIZ_AD_INJECTED: {
                category: "[quizConsumption]";
const name: "ad slot injected";
const payload: {
                    _as: "props";
const _p: void 0
                }
            };
const PLATFORM_BEFORE_PAGE_CHANGE: {
                category: "[Platform]";
const name: "Before page change"
            };
const PLATFORM_PAGE_CHANGED: {
                category: "[Platform]";
const name: "Page changed"
            };
const PLATFORM_PAGE_EXTENDED: {
                category: "[Platform]";
const name: "Page extended"
            };
const PLATFORM_AD_PLACEMENT_READY: {
                category: "[Platform]";
const name: "Ad placement ready";
const payload: {
                    _as: "props";
const _p: void 0
                }
            };
const PLATFORM_LIGHTBOX_READY: {
                category: "[Platform]";
const name: "Lightbox ready";
const payload: {
                    _as: "props";
const _p: void 0
                }
            };
const PLATFORM_LIGHTBOX_CLOSED: {
                category: "[Platform]";
const name: "Lightbox closed";
const payload: {
                    _as: "props";
const _p: void 0
                }
            };
const PLATFORM_LIGHTBOX_IMAGE_CHANGE: {
                category: "[Platform]";
const name: "Lightbox image change";
const payload: {
                    _as: "props";
const _p: void 0
                }
            };
const RAIL_READY: {
                category: "[Rail]";
const name: "Ready"
            };
const A9_WITHOUT_CONSENTS: {
                name: "A9 without consents"
            };
const BIDDERS_BIDDING_DONE: {
                category: "[Prebid]";
const name: "Bidding done";
const payload: {
                    _as: "props";
const _p: void 0
                }
            };
const BIDDERS_BIDS_CALLED: {
                category: "[Prebid]";
const name: "Bids called"
            };
const BIDDERS_BIDS_REFRESH: {
                category: "[Prebid]";
const name: "Bids refresh";
const payload: {
                    _as: "props";
const _p: void 0
                }
            };
const BIDDERS_BIDS_RESPONSE: {
                category: "[Prebid]";
const name: "Bids response";
const payload: {
                    _as: "props";
const _p: void 0
                }
            };
const BIDDERS_AUCTION_DONE: {
                category: "[Prebid]";
const name: "Auction done"
            };
const VIDEO_EVENT: {
                category: "[Video]";
const name: "Video event";
const payload: {
                    _as: "props";
const _p: void 0
                }
            };
const VIDEO_PLAYER_TRACKING: {
                category: "[Video]";
const name: "Video player tracking";
const payload: {
                    _as: "props";
const _p: void 0
                }
            };
const GAM_AD_INTERVENTION: {
                category: "[GAM iframe]";
const name: "Ad intervention";
const payload: {
                    _as: "props";
const _p: void 0
                }
            };
const GAM_AD_DELAYED_COLLAPSE: {
                category: "[GAM iframe]";
const name: "Delayed collapse";
const payload: {
                    _as: "props";
const _p: void 0
                }
            };
const GAM_INTERSTITIAL_LOADED: {
                category: "[GAM iframe]";
const name: "Interstitial loaded"
            };
const GAM_LOAD_TEMPLATE: {
                category: "[GAM iframe]";
const name: "Load template";
const payload: {
                    _as: "payload";
const _p: void 0
                }
            }
        };
        function jt(...e) {
            return t => t.pipe(function() {
                for (var e = [];
var t = 0; t < arguments.length; t++) e[t] = arguments[t];
                return Ut((function(t) {
                    var i = t.type;
                    return e.some((function(e) {
                        return e.type === i;
                    }));
                }));
            }(...e), Ut((t => e.some((e => !0 === e.__global ? Z(t) : !Z(t))))));
        }
        const Bt = new class {
            constructor() {
                const {channelId: e;
const coordinatorName: t;
const reduxDevtoolsName: i} = this.getSettings();
                !function(e) {
                    if (void 0 === e && (e = window), !e[se]) {
                        var t = new fe(e);
                        t.init(), e[se] = t;
                    }
                }(), this.communicator = new ge({
                    channelId: e || "default",
                    coordinatorHost: window[t] || top
                });
                const n = nt((e => this.communicator.addListener(e));
const (e => this.communicator.removeListener(e))).pipe(Rt({
                    refCount: !0
                }));
                this.subject = new ot, this.action$ = Lt(n.pipe(Ut((e => Z(e)))), this.subject.asObservable().pipe(Ut((e => !Z(e))))), 
                this.connectReduxDevtools(i);
            }
            emit(e, t) {
                this.dispatch(this.getGlobalAction(e)(t));
            }
            on(e, t, i = !0) {
                this.action$.pipe(jt(this.getGlobalAction(e)), i ? Vt(1) : Mt(0)).subscribe(t);
            }
            onSlotEvent(e, t, i = "", n = !1) {
                this.action$.pipe(jt(this.getGlobalAction(zt.AD_ENGINE_SLOT_EVENT)), Ut((t => t.event === e.toString() && (!i || t.adSlotName === i))), n ? Vt(1) : Mt(0)).subscribe(t);
            }
            dispatch(e) {
                Z(e) ? this.communicator.dispatch(e) : this.subject.next(e);
            }
            getGlobalAction(e) {
                return e.action || (e.action = e.payload ? ee(`${e.category || "[AdEngine]"} ${e.name}`, e.payload) : ee(`${e.category || "[AdEngine]"} ${e.name}`)), 
                e.action;
            }
            getSettings() {
                return window["@wikia/post-quecast-settings"] || {};
            }
            connectReduxDevtools(e) {
                const t = class {
                    static connect(e = "AdEngine") {
                        if (this.devtools) throw new Error("Trying to initialize ReduxDevtools second time");
                        const t = window.__REDUX_DEVTOOLS_EXTENSION__;
                        if (t) return this.devtools = t.connect({
                            name: e
                        });
                    }
                }.connect(e);
                t && (t.subscribe((e => {
                    try {
                        if ("@devtools-extension" === e.source && "ACTION" === e.type) {
                            const t = new Function(`return ${e.payload}`)();
                            this.dispatch(t);
                        }
                    } catch (e) {
                        t.error(e.message);
                    }
                })), this.action$.subscribe((e => t.send(e, {}))));
            }
        };
        var Ft = s(4492);
var $t = (s(5787);
var "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e;
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
        }), Gt = window.device, Ht = {}, qt = [];
        window.device = Ht;
        var Wt = window.document.documentElement;
var Kt = window.navigator.userAgent.toLowerCase();
var Yt = [ "googletv";
var "viera";
var "smarttv";
var "internet.tv";
var "netcast";
var "nettv";
var "appletv";
var "boxee";
var "kylo";
var "roku";
var "dlnadoc";
var "pov_tv";
var "hbbtv";
var "ce-html" ];
        function Qt(e, t) {
            return -1 !== e.indexOf(t);
        }
        function Xt(e) {
            return Qt(Kt, e);
        }
        function Jt(e) {
            return Wt.className.match(new RegExp(e, "i"));
        }
        function Zt(e) {
            var t = null;
            Jt(e) || (t = Wt.className.replace(/^\s+|\s+$/g, ""), Wt.className = t + " " + e);
        }
        function ei(e) {
            Jt(e) && (Wt.className = Wt.className.replace(" " + e, ""));
        }
        function ti() {
            Ht.landscape() ? (ei("portrait"), Zt("landscape"), ii("landscape")) : (ei("landscape"), 
            Zt("portrait"), ii("portrait")), oi();
        }
        function ii(e) {
            for (var t = 0; t < qt.length; t++) qt[t](e);
        }
        Ht.macos = function() {
            return Xt("mac");
        }, Ht.ios = function() {
            return Ht.iphone() || Ht.ipod() || Ht.ipad();
        }, Ht.iphone = function() {
            return !Ht.windows() && Xt("iphone");
        }, Ht.ipod = function() {
            return Xt("ipod");
        }, Ht.ipad = function() {
            var e = "MacIntel" === navigator.platform && navigator.maxTouchPoints > 1;
            return Xt("ipad") || e;
        }, Ht.android = function() {
            return !Ht.windows() && Xt("android");
        }, Ht.androidPhone = function() {
            return Ht.android() && Xt("mobile");
        }, Ht.androidTablet = function() {
            return Ht.android() && !Xt("mobile");
        }, Ht.blackberry = function() {
            return Xt("blackberry") || Xt("bb10");
        }, Ht.blackberryPhone = function() {
            return Ht.blackberry() && !Xt("tablet");
        }, Ht.blackberryTablet = function() {
            return Ht.blackberry() && Xt("tablet");
        }, Ht.windows = function() {
            return Xt("windows");
        }, Ht.windowsPhone = function() {
            return Ht.windows() && Xt("phone");
        }, Ht.windowsTablet = function() {
            return Ht.windows() && Xt("touch") && !Ht.windowsPhone();
        }, Ht.fxos = function() {
            return (Xt("(mobile") || Xt("(tablet")) && Xt(" rv:");
        }, Ht.fxosPhone = function() {
            return Ht.fxos() && Xt("mobile");
        }, Ht.fxosTablet = function() {
            return Ht.fxos() && Xt("tablet");
        }, Ht.meego = function() {
            return Xt("meego");
        }, Ht.cordova = function() {
            return window.cordova && "file:" === location.protocol;
        }, Ht.nodeWebkit = function() {
            return "object" === $t(window.process);
        }, Ht.mobile = function() {
            return Ht.androidPhone() || Ht.iphone() || Ht.ipod() || Ht.windowsPhone() || Ht.blackberryPhone() || Ht.fxosPhone() || Ht.meego();
        }, Ht.tablet = function() {
            return Ht.ipad() || Ht.androidTablet() || Ht.blackberryTablet() || Ht.windowsTablet() || Ht.fxosTablet();
        }, Ht.desktop = function() {
            return !Ht.tablet() && !Ht.mobile();
        }, Ht.television = function() {
            for (var e = 0; e < Yt.length; ) {
                if (Xt(Yt[e])) return !0;
                e++;
            }
            return !1;
        }, Ht.portrait = function() {
            return screen.orientation && Object.prototype.hasOwnProperty.call(window, "onorientationchange") ? Qt(screen.orientation.type, "portrait") : Ht.ios() && Object.prototype.hasOwnProperty.call(window, "orientation") ? 90 !== Math.abs(window.orientation) : window.innerHeight / window.innerWidth > 1;
        }, Ht.landscape = function() {
            return screen.orientation && Object.prototype.hasOwnProperty.call(window, "onorientationchange") ? Qt(screen.orientation.type, "landscape") : Ht.ios() && Object.prototype.hasOwnProperty.call(window, "orientation") ? 90 === Math.abs(window.orientation) : window.innerHeight / window.innerWidth < 1;
        }, Ht.noConflict = function() {
            return window.device = Gt, this;
        }, Ht.ios() ? Ht.ipad() ? Zt("ios ipad tablet") : Ht.iphone() ? Zt("ios iphone mobile") : Ht.ipod() && Zt("ios ipod mobile") : Ht.macos() ? Zt("macos desktop") : Ht.android() ? Ht.androidTablet() ? Zt("android tablet") : Zt("android mobile") : Ht.blackberry() ? Ht.blackberryTablet() ? Zt("blackberry tablet") : Zt("blackberry mobile") : Ht.windows() ? Ht.windowsTablet() ? Zt("windows tablet") : Ht.windowsPhone() ? Zt("windows mobile") : Zt("windows desktop") : Ht.fxos() ? Ht.fxosTablet() ? Zt("fxos tablet") : Zt("fxos mobile") : Ht.meego() ? Zt("meego mobile") : Ht.nodeWebkit() ? Zt("node-webkit") : Ht.television() ? Zt("television") : Ht.desktop() && Zt("desktop"), 
        Ht.cordova() && Zt("cordova"), Ht.onChangeOrientation = function(e) {
            "function" == typeof e && qt.push(e);
        };
        var ni = "resize";
        function si(e) {
            for (var t = 0; t < e.length; t++) if (Ht[e[t]]()) return e[t];
            return "unknown";
        }
        function oi() {
            Ht.orientation = si([ "portrait", "landscape" ]);
        }
        Object.prototype.hasOwnProperty.call(window, "onorientationchange") && (ni = "orientationchange"), 
        window.addEventListener ? window.addEventListener(ni, ti, !1) : window.attachEvent ? window.attachEvent(ni, ti) : window[ni] = ti, 
        ti(), Ht.type = si([ "mobile", "tablet", "desktop" ]), Ht.os = si([ "ios", "iphone", "ipad", "ipod", "android", "blackberry", "macos", "windows", "fxos", "meego", "television" ]), 
        oi();
        const ri = Ht;
        let ai;
let di = null;
let li = !1;
let ci = null;
        const ui = new class {
            isSmartphone() {
                return ri.mobile();
            }
            isTablet() {
                return ri.tablet();
            }
            isDesktop() {
                return !this.isSmartphone() && !this.isTablet();
            }
            checkBlocking(e = (() => {}), t = (() => {})) {
                return new Promise((e => {
                    if (!li) {
                        if ("undefined" == typeof BlockAdBlock) return void e(!0);
                        ai = new BlockAdBlock({
                            checkOnLoad: !1,
                            resetOnEnd: !0,
                            loopCheckTime: 50,
                            loopMaxNumber: 5
                        }), li = !0;
                    }
                    ai.onDetected((() => e(!0))), ai.onNotDetected((() => e(!1))), ai.check(!0);
                })).then((i => (i ? e() : t(), i)));
            }
            getDeviceType() {
                return this.isTablet() ? "tablet" : this.isSmartphone() ? "smartphone" : "desktop";
            }
            getDeviceMode() {
                return window.matchMedia("(max-width: 840px)").matches ? "mobile" : "desktop";
            }
            getOperatingSystem() {
                if (null !== ci) return ci;
                const {userAgent: e} = window.navigator;
                return ci = "unknown", -1 !== e.indexOf("Win") && (ci = "Windows"), -1 !== e.indexOf("Mac") && (ci = "OSX"), 
                -1 !== e.indexOf("Linux") && (ci = "Linux"), -1 !== e.indexOf("Android") && (ci = "Android"), 
                -1 !== e.indexOf("like Mac") && (ci = "iOS"), ci;
            }
            getBrowser() {
                if (null !== di) return di;
                const {appName: e;
const appVersion: t;
const userAgent: i} = window.navigator;
                let n;
let s = i.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
                return /trident/i.test(s[1]) ? (n = /\brv[ :]+(\d+)/g.exec(i) || [ "" ], di = `IE ${n[1] || ""}`, 
                di) : "Chrome" === s[1] && (n = i.match(/\b(OPR|Edge)\/(\d+)/), null !== n) ? (di = n.slice(1).join(" ").replace("OPR", "Opera"), 
                di) : (s = s[2] ? [ s[1], s[2] ] : [ e, t, "-?" ], n = i.match(/version\/(\d+)/i), 
                null !== n && s.splice(1, 1, n[1]), di = s.join(" "), di);
            }
            isSteamPlatform() {
                const {userAgent: e} = window.navigator;
                return e.toLowerCase().indexOf("steam") > -1;
            }
        };
        const hi = G.getDebugGroup() || "";
const pi = hi.split(";
const ");
        "" !== hi && window.console.info("AdEngine debug mode - groups:", "1" === hi ? "all" : pi);
        const gi = Date.now();
        function mi() {
            var e;
var t;
            return null !== (t = null === (e = window.performance) || void 0 === e ? void 0 : e.timeOrigin) && void 0 !== t ? t : gi;
        }
        function fi() {
            return Date.now() - mi();
        }
        function vi() {
            return (fi() / 1e3).toFixed(4);
        }
        function bi(e, ...t) {
            "" !== hi && ("1" !== hi && -1 === pi.indexOf(e) || window.console.info(`${vi()}s\t\t [AE] ${e}`, t));
        }
        function yi(e, ...t) {
            "" !== hi && ("1" !== hi && -1 === pi.indexOf(e) || window.console.warn(`${vi()}s\t\t [AE] ${e}`, t));
        }
        const _i = "universal-storage";
        class Si {
            constructor() {
                this.storage = {};
            }
            clear() {
                this.storage = {};
            }
            getItem(e) {
                return this.storage[e];
            }
            removeItem(e) {
                delete this.storage[e];
            }
            setItem(e, t) {
                this.storage[e] = t;
            }
        }
        class Ei {
            constructor(e = (() => window.localStorage)) {
                this.fallbackStorage = new Si;
                try {
                    this.provider = e(), this.isAvailable() || (bi(_i, "StorageProvider doesn't work, fallback to the InMemoryProvider"), 
                    this.provider = this.fallbackStorage);
                } catch (e) {
                    bi(_i, "StorageProvider doesn't work, fallback to the InMemoryProvider"), this.provider = this.fallbackStorage;
                }
            }
            isAvailable() {
                try {
                    return this.provider.setItem("ae3-provider-storage-test", "1"), this.provider.getItem("ae3-provider-storage-test"), 
                    this.provider.removeItem("ae3-provider-storage-test"), !0;
                } catch (e) {
                    return !1;
                }
            }
            getItem(e) {
                try {
                    let t = this.provider.getItem(e);
                    try {
                        t = JSON.parse(t);
                    } catch (e) {
                        return t;
                    }
                    return t;
                } catch (t) {
                    return this.fallbackStorage.getItem(e);
                }
            }
            setItem(e, t, i) {
                const n = t instanceof Object ? JSON.stringify(t) : t;
                try {
                    this.provider.setItem(e, n, i);
                } catch (t) {
                    bi(_i, `Item ${e} wasn't set in the storage`, t), this.fallbackStorage.setItem(e, n);
                }
                return !0;
            }
            removeItem(e) {
                try {
                    return this.provider.removeItem(e);
                } catch (t) {
                    this.fallbackStorage.removeItem(e);
                }
            }
            clear() {
                try {
                    this.provider.clear();
                } catch (e) {
                    this.fallbackStorage.clear();
                }
            }
        }
        class wi {
            static make() {
                return wi.instance || (wi.instance = new wi), wi.instance;
            }
            constructor() {
                this.cookieStorage = new Ei((() => new j)), this.cacheKey = "basset", this.resetCache();
            }
            resetCache() {
                const e = this.cookieStorage.getItem(this.cacheKey) || "";
                var t;
                this.cacheStorage = "" === (t = e) || "string" != typeof t ? {} : t.split("|").reduce(((e, t) => Object.assign(Object.assign({}, e), function(e) {
                    const [t;
const i] = e.split(":");
const n = "true" === i;
const [s;
const o;
const r] = t.split("_");
                    return {
                        [s]: {
                            name: s,
                            group: o,
                            limit: parseFloat(r) || void 0,
                            result: n
                        }
                    };
                }(t))), {}), Bt.emit(zt.AD_ENGINE_INSTANT_CONFIG_CACHE_RESET);
            }
            get(e) {
                return this.cacheStorage[e];
            }
            set(e) {
                this.cacheStorage[e.name] = e, e.withCookie && Bt.on(zt.AD_ENGINE_CONSENT_READY, (({gdprConsent: e}) => {
                    e && this.synchronizeCookie();
                }));
            }
            synchronizeCookie() {
                const e = (t = Object.keys(this.cacheStorage).map((e => ({
                    key: e;
const value: this.cacheStorage[e]
                }))).filter((({value: e}) => e.withCookie)).reduce(((e;
const {key: t;
const value: i}) => Object.assign(Object.assign({};
const e);
const {
                    [t]: i
                }));
const {});
const Object.keys(t).slice(0;
const 5).map(function(e) {
                    return t => {
                        const {name: i;
const group: n;
const limit: s;
const result: o} = e[t];
                        return `${i}_${n}_${s}:${o}`;
                    };
                }(t)).join("|"));
                var t;
                this.cookieStorage.setItem(this.cacheKey, e);
            }
            mapSamplingResults(e = []) {
                if (!e || !e.length) return [];
                const t = this.getSamplingResults();
                return e.map((e => e.split(":"))).filter((([e]) => t.includes(e))).map((([, e]) => e));
            }
            getSamplingResults() {
                return Object.keys(this.cacheStorage).map((e => this.getResultLog(e)));
            }
            getResultLog(e) {
                const t = this.cacheStorage[e];
                return `${this.removeIndexSuffix(t.name)}_${t.group}_${t.limit}`;
            }
            removeIndexSuffix(e) {
                const t = e.lastIndexOf("-");
                return -1 !== t ? e.substring(0, t) : e;
            }
        }
        const Ai = "-cached";
const Ti = Math.pow(10;
const 6);
const Ii = {
            setUpGeoData: function() {
                const e = z.get("Geo");
                if (!e) return;
                const t = decodeURIComponent(e);
                try {
                    const e = JSON.parse(t) || {};
                    Y.set("geo.region", e.region), Y.set("geo.country", e.country), Y.set("geo.continent", e.continent);
                } catch (e) {
                    throw new Error("Invalid JSON in the cookie");
                }
                return Y.get("geo") || {};
            },
            isProperContinent: function(e = [], t) {
                return !(!e || !e.indexOf || !function(e, t) {
                    return e.indexOf("XX") > -1 || Ni(e, "XX", t);
                }(e, t) && !function(e = [], t) {
                    const i = `XX-${Ii.getContinentCode()}`;
                    return e.indexOf(i) > -1 || Ni(e, i, t);
                }(e, t));
            },
            isProperCountry: function(e = [], t) {
                return !!(e && e.indexOf && (e.indexOf(Ii.getCountryCode()) > -1 || Ni(e, Ii.getCountryCode(), t)));
            },
            isProperRegion: function(e = [], t) {
                const i = `${Ii.getCountryCode()}-${Ii.getRegionCode()}`;
                return !!(e && e.indexOf && (e.indexOf(i) > -1 || Ni(e, i, t)));
            },
            getContinentCode: function() {
                return Y.get("geo.continent");
            },
            getCountryCode: function() {
                return Y.get("geo.country");
            },
            getRegionCode: function() {
                return Y.get("geo.region");
            },
            isProperGeo: function(e = [], t) {
                const i = wi.make();
                return void 0 !== t && void 0 !== i.get(t) ? i.get(t).result : !(!e || !e.indexOf || function(e = []) {
                    return !!(e.indexOf(`non-${Ii.getCountryCode()}`) > -1 || e.indexOf(`non-${Ii.getCountryCode()}-${Ii.getRegionCode()}`) > -1 || e.indexOf(`non-XX-${Ii.getContinentCode()}`) > -1);
                }(e) || !(Ii.isProperContinent(e, t) || Ii.isProperCountry(e, t) || Ii.isProperRegion(e, t)));
            }
        };
        function Ci(e) {
            let [;
let t] = e.split("/");
            return t = t.replace(Ai, ""), Math.round(parseFloat(t) * Ti) || 0;
        }
        function Ni(e, t, i) {
            const n = e.filter(function(e) {
                return t => 0 !== t.indexOf("non-") && t.indexOf(e + "/") > -1;
            }(t)), s = function(e) {
                return e.some((e => -1 !== e.indexOf(Ai)));
            }(e);
            return 0 !== n.length && function(e, t, i) {
                const n = Math.round(Math.random() * (100 * Ti)) || 0;
const s = e.some((e => n < e));
                return t && function(e, t, i, n) {
                    const s = wi.make();
const [o] = i;
const r = {
                        name: e;
const result: t;
const withCookie: n;
const group: t ? "B" : "A";
const limit: (t ? o : 100 * Ti - o) / Ti
                    };
                    s.set(r);
                }(t, s, e, i), s;
            }(n.map(Ci), i, s);
        }
        class Oi {
            init(e = {}) {
                return h(this, void 0, void 0, (function*() {
                    const t = new Ft.InstantConfigLoader({
                        appName: Y.get("services.instantConfig.appName");
const instantConfigEndpoint: Y.get("services.instantConfig.endpoint");
const instantConfigVariant: Y.get("wiki.services_instantConfig_variant");
const instantConfigFallbackEndpoint: Y.get("services.instantConfig.fallback")
                    });
const i = new Ft.InstantConfigInterpreter(new Ft.BrowserMatcher(ui.getBrowser());
const new Ft.DeviceMatcher(ui.getDeviceType());
const new Ft.DomainMatcher;
const new Ft.RegionMatcher;
const wi.make());
                    return this.interpreter = yield t.getConfig().then((e => (new Ft.InstantConfigOverrider).override(U.getURLSearchParams(), e))).then((t => i.init(t, e, Ii.isProperGeo))), 
                    this.repository = this.interpreter.getValues(), bi("instant-config-service", "instantiated with", this.repository), 
                    Bt.on(zt.AD_ENGINE_INSTANT_CONFIG_CACHE_RESET, (() => {
                        this.repository = this.interpreter.getValues();
                    }), !1), this;
                }));
            }
            get(e, t) {
                return e in this.repository && void 0 !== this.repository[e] ? this.repository[e] : t;
            }
        }
        const Di = new class {
            createScript(e;
const t = !0;
const i = null;
const n = {};
const s = {}) {
                const o = document.createElement("script");
                if (o.async = t, o.defer = !t, o.src = e, Object.keys(n).forEach((e => {
                    o.setAttribute(e, n[e]);
                })), Object.keys(s).forEach((e => {
                    o.dataset[e] = s[e];
                })), "string" == typeof i) {
                    const e = document.getElementsByTagName("script")[0];
                    e.parentNode.insertBefore(o, e);
                } else (i || document.body).appendChild(o);
                return o;
            }
            loadScript(e, t = !0, i = null, n = {}, s = {}) {
                return new Promise(((o, r) => {
                    const a = this.createScript(e;
const t;
const i;
const n;
const s);
                    a.onload = o, a.onerror = r;
                }));
            }
            loadAsset(e, t = "json") {
                const i = new XMLHttpRequest;
                return i.open("GET", e, !0), i.responseType = t, new Promise((e => {
                    i.addEventListener("timeout", (() => {
                        e(null);
                    })), i.addEventListener("error", (() => {
                        e(null);
                    })), i.onreadystatechange = function() {
                        this.readyState === this.DONE && (200 === this.status ? e(this.response) : e(null));
                    }, i.send();
                }));
            }
            loadSync(e) {
                try {
                    const t = new XMLHttpRequest;
                    return t.open("GET", e, !1), t.send(null), 200 === t.status && 0 !== t.responseText.length && t.responseText;
                } catch (e) {
                    return !1;
                }
            }
        };
        window.pbjs = window.pbjs || {}, window.pbjs.que = window.pbjs.que || [];
        const Li = new class {
            init() {
                if (!this.instancePromise) {
                    const e = Y.get("bidders.prebid.libraryUrl");
                    Di.loadScript(e, !0, "first"), this.instancePromise = new Promise((e => window.pbjs.que.push((() => {
                        bi("pbjs-factory", "Prebid library loaded"), e(window.pbjs);
                    }))));
                }
                return this.instancePromise;
            }
        };
        class Pi {
            constructor(e, t = 100, i = 0, n = 0) {
                this.condition = e, this.noTries = t, this.growingTimeout = i, this.fixedTimeout = n;
            }
            until() {
                return h(this, void 0, void 0, (function*() {
                    let e = 0;
let t = this.growingTimeout || this.fixedTimeout;
let i = this.condition();
                    for (;!i && e < this.noTries; ) yield this.delay(t), i = this.condition(), this.growingTimeout && (t *= 2), 
                    e++;
                    return Promise.resolve(i);
                }));
            }
            delay(e) {
                return new Promise((t => {
                    this.timeoutId = setTimeout(t, e);
                }));
            }
            reset() {
                this.timeoutId && window.clearTimeout(this.timeoutId);
            }
        }
        var ki;
        !function(e) {
            e.CUSTOM_EVENT = "customEvent", e.SLOT_ADDED_EVENT = "slotAdded", e.SLOT_REQUESTED_EVENT = "slotRequested", 
            e.SLOT_LOADED_EVENT = "slotLoaded", e.SLOT_VIEWED_EVENT = "slotViewed", e.SLOT_RENDERED_EVENT = "slotRendered", 
            e.SLOT_VISIBILITY_CHANGED = "slotVisibilityChanged", e.SLOT_BACK_TO_VIEWPORT = "slotBackToViewport", 
            e.SLOT_LEFT_VIEWPORT = "slotLeftViewport", e.SLOT_STATUS_CHANGED = "slotStatusChanged", 
            e.DESTROYED_EVENT = "slotDestroyed", e.DESTROY_EVENT = "slotDestroy", e.HIDDEN_EVENT = "slotHidden", 
            e.SHOWED_EVENT = "slotShowed", e.VIDEO_VIEWED_EVENT = "videoViewed", e.VIDEO_AD_REQUESTED = "videoAdRequested", 
            e.VIDEO_AD_ERROR = "videoAdError", e.VIDEO_AD_IMPRESSION = "videoAdImpression", 
            e.VIDEO_AD_USED = "videoAdUsed", e.TEMPLATES_LOADED = "Templates Loaded";
        }(ki || (ki = {}));
        const xi = new class {
            constructor() {
                this.adTargeting = {};
const this.onChangeCallbacks = [];
const this.pageTargetingGroupName = "PAGE_TARGETING";
const G.isDebugMode() && (window.ads.adTargeting = this.adTargeting);
            }
            clear(e = null) {
                const t = e || this.pageTargetingGroupName;
                this.adTargeting[t] = {};
            }
            extend(e, t = null) {
                const i = t || this.pageTargetingGroupName;
                this.adTargeting[i] = this.adTargeting[i] || {}, this.adTargeting[i] = Object.assign(this.adTargeting[i], e);
            }
            dump(e = null) {
                const t = e || this.pageTargetingGroupName;
                return this.adTargeting[t] = this.adTargeting[t] || {}, this.adTargeting[t];
            }
            get(e, t = null) {
                const i = t || this.pageTargetingGroupName;
                if (this.adTargeting[i]) return this.adTargeting[i][e];
            }
            set(e, t, i = null) {
                if (void 0 !== t) {
                    const n = i || this.pageTargetingGroupName;
                    this.adTargeting[n] = this.adTargeting[n] || {}, this.adTargeting[n][e] = t, n === this.pageTargetingGroupName && this.triggerOnChange(e, t);
                }
            }
            remove(e, t = null) {
                const i = t || this.pageTargetingGroupName;
                this.adTargeting[i] && this.adTargeting[i][e] && (delete this.adTargeting[i][e], 
                i === this.pageTargetingGroupName && this.triggerOnChange(e, null));
            }
            onChange(e) {
                this.onChangeCallbacks = this.onChangeCallbacks || [], this.onChangeCallbacks.push(e);
            }
            removeListeners() {
                this.onChangeCallbacks = [];
            }
            triggerOnChange(e, t) {
                this.onChangeCallbacks.forEach((i => {
                    i(e, t);
                }));
            }
        };
        function Ri() {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (e => {
                const t = 16 * Math.random() | 0;
                return ("x" === e ? t : 3 & t | 8).toString(16);
            }));
        }
        function Ui(e) {
            return "IFRAME" === e.tagName;
        }
        function Vi() {
            try {
                return window.self !== window.top;
            } catch (e) {
                return !0;
            }
        }
        class Mi {
            static getFirstElementChild(e) {
                return e.firstElementChild;
            }
        }
        const zi = "message-bus";
const ji = new class {
            constructor(e = window) {
                this.source = e;
const this.isInitialized = !1;
const this.callbacks = [];
            }
            init() {
                this.isInitialized || (bi(zi, "Register message listener"), this.source.addEventListener("message", (e => this.onMessage(e)), !1), 
                this.isInitialized = !0);
            }
            register(e, t) {
                this.init(), this.callbacks.push({
                    match: e,
                    fn: t
                });
            }
            onMessage(e) {
                let t;
let i = 0;
                if (this.isAdEngineMessage(e)) for (bi(zi, "Message received", e), i = 0; i < this.callbacks.length; i += 1) if (t = this.callbacks[i], 
                this.messageMatch(t.match, e)) return bi(zi, "Matching message", e, t), t.fn(this.getDataFromMessage(e).AdEngine), 
                void (t.match.infinite || this.callbacks.splice(i, 1));
            }
            isAdEngineMessage(e) {
                const t = this.getDataFromMessage(e);
                return !!t && !!t.AdEngine;
            }
            messageMatch(e, t) {
                let i = !0;
                if (e.origin && !e.origin.includes(t.origin)) return !1;
                if (e.keys) {
                    const n = this.getDataFromMessage(t).AdEngine;
                    e.keys.forEach((e => {
                        i = i && n[e];
                    }));
                }
                return i;
            }
            getDataFromMessage(e) {
                if ("string" == typeof e.data) try {
                    return JSON.parse(e.data);
                } catch (e) {
                    return;
                }
                return e.data;
            }
        }, Bi = "slot-tweaker";
        class Fi {
            forceRepaint(e) {
                return e.offsetWidth;
            }
            addDefaultClasses(e) {
                const t = e.getElement();
const i = e.getConfigProperty("defaultClasses") || [];
                t && i.length && i.forEach((e => t.classList.add(e)));
            }
            collapse(e) {
                const t = e.getElement();
                t.style.maxHeight = `${t.scrollHeight}px`, this.forceRepaint(t), t.classList.add("slot-animation"), 
                t.style.maxHeight = "0";
            }
            expand(e) {
                const t = e.getElement();
                t.style.maxHeight = `${t.offsetHeight}px`, t.classList.remove(Cn.HIDDEN_AD_CLASS), 
                t.classList.add("slot-animation"), t.style.maxHeight = `${t.scrollHeight}px`;
            }
            makeResponsive(e, t = null, i = !0) {
                return h(this, void 0, void 0, (function*() {
                    e.addClass("slot-responsive"), bi(Bi, "make responsive", e.getSlotName());
                    const n = yield this.onReady(e);
                    return this.setPaddingBottom(n, t, i), n;
                }));
            }
            setPaddingBottom(e, t, i = !0) {
                let n;
let s = t;
                if (Ui(e)) {
                    if (!t) {
                        const t = e.contentWindow.document.body.scrollHeight;
                        s = e.contentWindow.document.body.scrollWidth / t;
                    }
                    n = e.parentElement;
                } else n = e;
                i && (n.style.paddingBottom = 100 / s + "%");
            }
            onReady(e) {
                function t() {
                    const t = e.getIframe();
                    if (!t) throw new Error("Cannot find iframe element");
                    return t;
                }
                return e.getConfigProperty("useGptOnloadEvent") ? e.loaded.then(t) : new Promise((i => {
                    const n = t();
                    let s = null;
                    try {
                        s = n.contentWindow.document;
                    } catch (t) {
                        bi(Bi, e.getSlotName(), "loaded through SafeFrame");
                    }
                    s && "complete" === s.readyState ? i(n) : n.addEventListener("load", (() => i(n)));
                }));
            }
            adjustIframeByContentSize(e) {
                return h(this, void 0, void 0, (function*() {
                    const t = yield this.onReady(e);
                    if (Ui(t)) {
                        const i = t.contentWindow.document.body.scrollHeight;
const n = t.contentWindow.document.body.scrollWidth;
                        t.width = n.toString(), t.height = i.toString(), bi(Bi, "adjust size", e.getSlotName(), n, i);
                    }
                    return t;
                }));
            }
            registerMessageListener(e) {
                ji.register({
                    keys: [ "action", "slotName" ],
                    infinite: !0
                }, (t => {
                    if (!t.slotName) return void bi(Bi, "Missing slot name");
                    const i = e(t.slotName);
                    switch (t.action) {
                      case "expand":
                        this.expand(i);
                        break;

                      case "collapse":
                        this.collapse(i);
                        break;

                      case Cn.HIDDEN_AD_CLASS:
                        i.hide();
                        break;

                      case "show":
                        i.show();
                        break;

                      case "make-responsive":
                        this.makeResponsive(i, t.aspectRatio);
                        break;

                      default:
                        bi(Bi, "Unknown action", t.action);
                    }
                }));
            }
            setDataParam(e, t, i) {
                const n = e.getElement();
                n && (n.dataset[t] = "string" == typeof i ? i : JSON.stringify(i));
            }
        }
        Fi.SLOT_CLOSE_IMMEDIATELY = "force-close";
        const $i = new Fi;
        var Gi;
        !function(e) {
            e.STATUS_BLOCKED = "blocked", e.STATUS_COLLAPSE = "collapse", e.STATUS_DISABLED = "disabled", 
            e.STATUS_FORCED_COLLAPSE = "forced_collapse", e.STATUS_FORCED_SUCCESS = "forced_success", 
            e.STATUS_SKIP_TEMPLATE = "skip_template", e.STATUS_MANUAL = "manual", e.STATUS_REQUESTED = "requested", 
            e.STATUS_ERROR = "error", e.STATUS_SUCCESS = "success", e.STATUS_CLICKED = "clicked", 
            e.STATUS_VIEWPORT_CONFLICT = "viewport-conflict", e.STATUS_HIVI_COLLAPSE = "hivi-collapse", 
            e.STATUS_HEAVY_AD_INTERVENTION = "heavy-ad-intervention", e.STATUS_UNKNOWN_INTERVENTION = "unknown-intervention";
        }(Gi || (Gi = {}));
        const Hi = "true" === U.get("tracking-opt-in-status");
const qi = "true" === U.get("opt-out-sale-status");
const Wi = function() {
            return Hi || !!Y.get("options.trackingOptIn");
        }, Ki = function() {
            return !!Y.get("options.isSubjectToCcpa") || qi || !!Y.get("options.optOutSale");
        };
        function Yi(e, t) {
            if ("function" != typeof t) throw new Error("LazyQueue used with callback not being a function");
            if (!(e instanceof Array)) throw new Error("LazyQueue requires an array as the first parameter");
            e.start = () => {
                for (;e.length > 0; ) t(e.shift());
                e.push = e => {
                    t(e);
                };
            };
        }
        class Qi {
            get length() {
                return this.items.length;
            }
            constructor(...e) {
                this.itemFlushCallbacks = [], this.items = [], this.items = [ ...e ], this.setPreFlushPush();
            }
            flush() {
                for (;this.items.length > 0; ) this.emit(this.items.shift());
                this.setPostFlushPush();
            }
            push(...e) {
                this.pushCommand(...e);
            }
            onItemFlush(e) {
                if ("function" != typeof e) throw new Error("onItemFlush used with callback not being a function");
                this.itemFlushCallbacks.push(e);
            }
            setPreFlushPush() {
                this.pushCommand = (...e) => {
                    this.items.push(...e);
                };
            }
            setPostFlushPush() {
                this.pushCommand = (...e) => {
                    e.forEach((e => {
                        this.emit(e);
                    }));
                };
            }
            emit(e) {
                this.itemFlushCallbacks.forEach((t => {
                    t(e);
                }));
            }
        }
        const Xi = "btf-blocker";
const Ji = new class {
            constructor() {
                this.firstCallEnded = !1;
const this.unblockedSlotNames = [];
const this.resetState();
            }
            resetState() {
                this.firstCallEnded = !1, this.unblockedSlotNames = [], this.slotsQueue = new Qi, 
                this.slotsQueue.onItemFlush((({adSlot: e, fillInCallback: t}) => {
                    bi(Xi, e.getSlotName(), "Filling delayed second call slot"), this.disableAdSlotIfHasConflict(e), 
                    this.fillInSlotIfEnabled(e, t);
                })), window.ads && window.ads.runtime && (window.ads.runtime.disableBtf = !1, window.ads.runtime.disableSecondCall = !1);
            }
            init() {
                Bt.onSlotEvent(ki.SLOT_RENDERED_EVENT, (({slot: e}) => {
                    bi(Xi, e.getSlotName(), "Slot rendered"), !this.firstCallEnded && e.isFirstCall() && this.finishFirstCall();
                })), 0 === Mn.getFirstCallSlotNames().filter((e => Mn.getEnabledSlotNames().includes(e))).length && this.finishFirstCall();
            }
            finishFirstCall() {
                this.firstCallEnded = !0, bi(Xi, "first call queue finished"), window.ads.runtime.disableSecondCall ? this.disableSecondCall([]) : window.ads.runtime.disableBtf && this.disableSecondCall([ ...this.unblockedSlotNames ]), 
                Bt.on(zt.AD_ENGINE_UAP_LOAD_STATUS, (() => {
                    this.slotsQueue.flush();
                }));
            }
            disableSecondCall(e) {
                const t = Y.get("slots") || {};
                bi(Xi, "second call queue disabled"), Object.keys(t).forEach((i => {
                    t[i].firstCall || -1 !== e.indexOf(i) || Mn.disable(i, Gi.STATUS_BLOCKED);
                }));
            }
            push(e, t) {
                if (!this.firstCallEnded && !e.isFirstCall()) return this.slotsQueue.push({
                    adSlot: e,
                    fillInCallback: t
                }), void bi(Xi, e.getSlotName(), "second call slot pushed to queue");
                this.disableAdSlotIfHasConflict(e), this.fillInSlotIfEnabled(e, t);
            }
            disableAdSlotIfHasConflict(e) {
                Mn.hasViewportConflict(e) && Mn.disable(e.getSlotName(), Gi.STATUS_VIEWPORT_CONFLICT);
            }
            fillInSlotIfEnabled(e, t) {
                e.isEnabled() ? (bi(Xi, e.getSlotName(), "Filling in slot"), t(e)) : bi(Xi, e.getSlotName(), "Slot blocked", e.getStatus());
            }
            unblock(e) {
                bi(Xi, e, "Unblocking slot"), this.unblockedSlotNames.push(e), Mn.enable(e);
            }
        }, Zi = new class {
            updateOnCreate(e) {
                $i.setDataParam(e, "gptPageParams", xi.dump()), $i.setDataParam(e, "gptSlotParams", e.getTargeting());
            }
            updateOnRenderEnd(e) {
                !function(e) {
                    const t = "top_leaderboard" == e.getSlotName();
const i = void 0 !== window.smTracking && "function" == typeof window.smTracking.recordRenderedAd;
                    t && i && window.smTracking.recordRenderedAd(e), delete window.smTracking;
                }(e), $i.setDataParam(e, "gptAdvertiserId", e.advertiserId), $i.setDataParam(e, "gptOrderId", e.orderId), 
                $i.setDataParam(e, "gptCreativeId", e.creativeId), $i.setDataParam(e, "gptLineItemId", e.lineItemId), 
                $i.setDataParam(e, "gptCreativeSize", e.creativeSize);
            }
        }, en = (e = 0) => new Promise(((t, i) => {
            "number" == typeof e ? setTimeout(t, e) : i(new Error("Delay value must be a number."));
        }));
        function tn(e, ...t) {
            return new Promise(((i, n) => {
                "function" == typeof e ? setTimeout((() => i(e(...t))), 0) : n(new Error("Expected a function."));
            }));
        }
        function nn(e, t, i = {}) {
            const n = "object" == typeof e && "function" == typeof e.addEventListener;
const s = "boolean" == typeof i ? {
                capture: i
            } : Object.assign({};
const i);
            return new Promise(((i, o) => {
                n ? e.addEventListener(t, i, Object.assign(Object.assign({}, s), {
                    once: !0
                })) : o(new Error("Emitter does not have `addEventListener` nor `once` method."));
            }));
        }
        function sn(e) {
            return new Promise(((t, i) => {
                setTimeout(i, e);
            }));
        }
        function on(e, t = 2e3) {
            return Promise.race([ new Promise(e), sn(t) ]);
        }
        function rn() {
            let e;
let t;
            const i = new Promise(((i;
const n) => {
                e = i;
const t = n;
            }));
            return i.resolve = e, i.reject = t, i;
        }
        var an;
        !function(e) {
            e.site = "site", e.page = "page", e.tracking = "tracking", e.partners = "partners";
        }(an || (an = {}));
        const dn = new class {
            constructor() {
                this.logGroup = "GlobalContextService";
const window.fandomContext || this.createEmptyContext();
            }
            createEmptyContext() {
                bi(this.logGroup, "Creating empty fandomContext"), window.fandomContext = {
                    site: {},
                    page: {},
                    tracking: {},
                    partners: {},
                    targeting: {}
                };
            }
            isObject(e) {
                return "object" == typeof e && !Array.isArray(e);
            }
            merge(e, t) {
                const i = i => this.isObject(t[i]) && Object.prototype.hasOwnProperty.call(e;
const i) && this.isObject(e[i]);
const n = Object.getOwnPropertyNames(t).map((n => ({
                    [n]: i(n) ? this.merge(e[n];
const t[n]) : t[n]
                }))).reduce(((e;
const t) => Object.assign(Object.assign({};
const e);
const t));
const {});
                return Object.assign(Object.assign({}, e), n);
            }
            setValue(e, t) {
                window.fandomContext || this.createEmptyContext(), window.fandomContext[e] || (window.fandomContext[e] = {}), 
                window.fandomContext[e] = this.merge(window.fandomContext[e], t);
            }
            getValue(e, t) {
                if (!window.fandomContext) return;
                const i = window.fandomContext[e];
                if (i) return i[t];
                bi(this.logGroup, "Attempting to retrieve invalid category in context!");
            }
            hasBundle(e) {
                var t;
var i;
var n;
var s;
                return null === (s = null === (n = null === (i = null === (t = window.fandomContext) || void 0 === t ? void 0 : t.site) || void 0 === i ? void 0 : i.tags) || void 0 === n ? void 0 : n.bundles) || void 0 === s ? void 0 : s.includes(e);
            }
        };
        function ln() {
            return dn.getValue(an.partners, "directedAtChildren");
        }
        function cn(e) {
            return function(t, i, n) {
                const s = n.value;
                return n.value = e.call(this, s), n;
            };
        }
        const un = "gpt-size-map";
        class hn {
            constructor(e = []) {
                this.sizeMap = e, bi(un, this.sizeMap, "creating new size map");
            }
            addSize(e, t) {
                bi(un, e, t, "adding new size mapping"), this.sizeMap.push({
                    viewportSize: e,
                    sizes: t
                });
            }
            build() {
                bi(un, this.sizeMap, "creating GPT size mapping builder");
                const e = window.googletag && window.googletag.sizeMapping();
                return e ? (this.sizeMap.forEach((({viewportSize: t, sizes: i}) => {
                    e.addSize(t, i);
                })), e.build()) : (bi(un, "cannot create GPT size mapping builder"), null);
            }
            isEmpty() {
                return !this.sizeMap.length;
            }
            mapAllSizes(e) {
                return new hn(this.sizeMap.map((({viewportSize: t, sizes: i}, n) => {
                    const s = e(i;
const t;
const n);
                    return bi(un, t, i, s, "mapping viewport sizes"), {
                        viewportSize: t,
                        sizes: s
                    };
                })));
            }
            toString() {
                bi(un, this.sizeMap, "casting to string");
                const e = {};
                return this.sizeMap.forEach((({viewportSize: t, sizes: i}) => {
                    e[t.join("x")] = i;
                })), JSON.stringify(e);
            }
        }
        var pn;
        const gn = "gpt-provider";
const mn = "AdX";
const fn = [ "https://tpc.googlesyndication.com";
const "https://googleads.g.doubleclick.net" ];
const vn = [ 0;
const 0 ];
        function bn(e) {
            return function(...t) {
                setTimeout((() => (window.googletag = window.googletag || {}, window.googletag.cmd = window.googletag.cmd || [], 
                window.googletag.cmd.push((() => e.apply(this, t))))));
            };
        }
        let yn = [];
let _n = !1;
        function Sn(e) {
            const t = e.slot.getSlotElementId();
            return Mn.get(t);
        }
        class En {
            constructor() {
                window.googletag = window.googletag || {}, window.googletag.cmd = window.googletag.cmd || [], 
                this.init();
            }
            isInitialized() {
                return _n;
            }
            init() {
                this.isInitialized() || (function() {
                    const e = window.googletag.pubads();
                    function t(t, i) {
                        null == i ? e.clearTargeting(t) : "function" == typeof i ? e.setTargeting(t, i()) : e.setTargeting(t, i);
                    }
                    !function() {
                        const e = xi.dump() || {};
                        Object.keys(e).forEach((i => {
                            t(i, e[i]);
                        }));
                    }(), xi.onChange(((e, i) => {
                        null === e ? Object.keys(i).forEach((e => {
                            t(e, i[e]);
                        })) : t(e, i);
                    }));
                }(), function() {
                    const e = window.googletag.pubads();
                    e.disableInitialLoad(), e.addEventListener("slotRequested", (e => {
                        const t = Sn(e);
                        t.setStatus(Gi.STATUS_REQUESTED), t.emit(ki.SLOT_REQUESTED_EVENT);
                    })), e.addEventListener("slotOnload", (e => {
                        Sn(e).emit(ki.SLOT_LOADED_EVENT);
                    })), e.addEventListener("slotRenderEnded", (e => {
                        tn((() => {
                            const t = Sn(e);
const i = function(e;
const t) {
                                let i = !1;
                                if (e.isEmpty) return Gi.STATUS_COLLAPSE;
                                try {
                                    i = !!t.contentWindow.document.querySelector;
                                } catch (e) {
                                    bi(gn, "getAdType", "iframe is not accessible");
                                }
                                return i && t.contentWindow.AdEngine_adType ? t.contentWindow.AdEngine_adType : Gi.STATUS_SUCCESS;
                            }(e, t.getIframe());
                            return function(e) {
                                const t = Y.get("templates.sizeOverwritingMap");
const i = e.getIframe();
                                if (!t || !i) return;
                                const n = `${i.width}x${i.height}`;
                                t[n] && (i.width = t[n].originalSize[0].toString(), i.height = t[n].originalSize[1].toString());
                            }(t), t.emit(ki.SLOT_RENDERED_EVENT, {
                                event: e,
                                adType: i
                            }, !1);
                        }));
                    })), e.addEventListener("impressionViewable", (e => {
                        Sn(e).emit(ki.SLOT_VIEWED_EVENT);
                    })), e.addEventListener("slotVisibilityChanged", (function(e) {
                        const t = Sn(e);
                        return null == t ? void 0 : t.emit(ki.SLOT_VISIBILITY_CHANGED, e);
                    })), e.addEventListener("slotVisibilityChanged", (function(e) {
                        const t = Sn(e);
                        if (e.inViewPercentage > 50) return null == t ? void 0 : t.emit(ki.SLOT_BACK_TO_VIEWPORT, e);
                    })), e.addEventListener("slotVisibilityChanged", (function(e) {
                        const t = Sn(e);
                        if (e.inViewPercentage < 50) return null == t ? void 0 : t.emit(ki.SLOT_LEFT_VIEWPORT, e);
                    })), window.googletag.enableServices();
                }(), this.setupRestrictDataProcessing(), this.setPPID(), Bt.on(zt.PLATFORM_BEFORE_PAGE_CHANGE, (() => this.updateCorrelator()), !1), 
                Bt.onSlotEvent(ki.DESTROY_EVENT, (({slot: e}) => {
                    this.destroySlot(e.getSlotName()), e.emit(ki.DESTROYED_EVENT);
                })), _n = !0);
            }
            setupRestrictDataProcessing() {
                const e = window.googletag.pubads();
const t = {
                    restrictDataProcessing: Ki()
                };
                ln() && (t.childDirectedTreatment = !0), e.setPrivacySettings(t);
            }
            setPPID() {
                const e = xi.get("intent_iq_ppid";
const "intent_iq");
                e || null === xi.get("intent_iq_ppid", "intent_iq") || Bt.emit(zt.INTENTIQ_PPID_NOT_SET_ON_TIME);
                const t = Y.get("services.intentIq.ppid.enabled") ? e : xi.get("ppid");
                t && window.googletag.pubads().setPublisherProvidedId(t);
            }
            fillIn(e) {
                const t = Kn() || [];
                Ji.push(e, ((...e) => {
                    this.fillInCallback(...e);
                })), 0 === t.length && this.flush();
            }
            fillInCallback(e) {
                const t = e.getSlotName();
const i = e.getTargeting();
const n = new hn(e.getSizes());
const s = this.createGptSlot(e;
const n);
                s.addService(window.googletag.pubads()).setCollapseEmptyDiv(!0), this.applyTargetingParams(s, i), 
                Zi.updateOnCreate(e), e.updateWinningPbBidderDetails(), window.googletag.display(t), 
                yn.push(s), e.isFirstCall() || this.flush(), bi(gn, t, "slot added");
            }
            createGptSlot(e, t) {
                return e.isOutOfPage() ? e.getConfigProperty("outOfPageFormat") ? window.googletag.defineOutOfPageSlot(e.getAdUnit(), window.googletag.enums.OutOfPageFormat[e.getConfigProperty("outOfPageFormat")]) : window.googletag.defineOutOfPageSlot(e.getAdUnit(), e.getSlotName()) : window.googletag.defineSlot(e.getAdUnit(), e.getDefaultSizes(), e.getSlotName()).defineSizeMapping(t.build());
            }
            applyTargetingParams(e, t) {
                !function(e) {
                    const t = e.pos.constructor == Array && "top_leaderboard" == e.pos[0] || "top_leaderboard" == e.pos;
const i = void 0 !== window.smTracking && window.smTracking.recordRequestTargeting;
                    t && i && window.smTracking.recordRequestTargeting(e);
                }(t), Object.keys(t).forEach((i => {
                    let n = t[i];
                    n = Array.isArray(n) ? n.map((e => e.toString())) : n.toString(), e.setTargeting(i, n);
                }));
            }
            updateCorrelator() {
                window.googletag.pubads().updateCorrelator();
            }
            flush() {
                yn.length && (window.googletag.pubads().refresh(yn, {
                    changeCorrelator: !1
                }), yn = []);
            }
            destroySlot(e) {
                const t = window.googletag.pubads().getSlots().find((t => e === t.getSlotElementId()));
                return t ? (this.destroyGptSlot(t), !0) : (bi(gn, "destroySlot", "slot doesn't return element id", e), 
                !1);
            }
            destroyGptSlot(e) {
                bi(gn, "destroySlot", e), window.googletag.destroySlots([ e ]) || bi(gn, "destroySlot", e, "failed");
            }
            static refreshSlot(e) {
                const t = window.googletag.pubads().getSlots().find((t => t.getSlotElementId() === e.getSlotName()));
                t.clearTargeting();
                const i = window.googletag.sizeMapping().addSize(vn;
const e.getCreativeSizeAsArray()).build();
                t.defineSizeMapping(i), window.googletag.pubads().refresh([ t ]);
            }
        }
        function wn(e, t, i) {
            var n = ve(e) || t || i ? {
                next: e;
var error: t;
var complete: i
            } : e;
            return n ? Xe((function(e, t) {
                var i;
                null === (i = n.subscribe) || void 0 === i || i.call(n);
                var s = !0;
                e.subscribe(Je(t, (function(e) {
                    var i;
                    null === (i = n.next) || void 0 === i || i.call(n, e), t.next(e);
                }), (function() {
                    var e;
                    s = !1, null === (e = n.complete) || void 0 === e || e.call(n), t.complete();
                }), (function(e) {
                    var i;
                    s = !1, null === (i = n.error) || void 0 === i || i.call(n, e), t.error(e);
                }), (function() {
                    var e;
var t;
                    s && (null === (e = n.unsubscribe) || void 0 === e || e.call(n)), null === (t = n.finalize) || void 0 === t || t.call(n);
                })));
            })) : qe;
        }
        l([ cn(bn), u("design:type", Function), u("design:paramtypes", []), u("design:returntype", void 0) ], En.prototype, "init", null), 
        l([ cn(bn), u("design:type", Function), u("design:paramtypes", [ Object ]), u("design:returntype", void 0) ], En.prototype, "fillIn", null), 
        l([ cn(bn), u("design:type", Function), u("design:paramtypes", []), u("design:returntype", void 0) ], En.prototype, "updateCorrelator", null), 
        l([ cn(bn), u("design:type", Function), u("design:paramtypes", [ "function" == typeof (pn = "undefined" != typeof googletag && googletag.Slot) ? pn : Object ]), u("design:returntype", void 0) ], En.prototype, "destroyGptSlot", null);
        const An = new class {
            constructor() {
                this.templates = {};
            }
            setInitializer(e) {
                this.initializer = e;
            }
            register(e, t = null) {
                if ("function" != typeof e.getName) throw new Error("Template does not implement getName method.");
                const i = e.getName();
                let n = Y.get(`templates.${i}`) || {};
                "function" == typeof e.getDefaultConfig && (n = Object.assign(Object.assign({}, e.getDefaultConfig()), n)), 
                t && (n = Object.assign(Object.assign({}, n), t)), Y.set(`templates.${i}`, n), this.templates[i] = e;
            }
            init(e, t = null, i = {}) {
                var n;
                if (null === (n = this.initializer) || void 0 === n ? void 0 : n.has(e)) return this.initializer.init(e, t, i);
                if (bi("template-service", "Load template", e, t, i), !this.templates[e]) throw new Error(`Template ${e} does not exist.`);
                return i && ("string" == typeof i.slotName || i.slotName instanceof String) && (i.slotName = i.slotName.split(",").shift()), 
                new this.templates[e](t).init(i);
            }
            subscribeCommunicator() {
                Bt.action$.pipe(jt(Bt.getGlobalAction(zt.GAM_LOAD_TEMPLATE)), wn((({payload: e}) => {
                    const t = Mn.get(e.slotName);
                    this.init(e.type, t, e);
                }))).subscribe();
            }
        }, Tn = new class {
            build(e, t = {}) {
                const i = e.match(/{(.+?)}/g);
                let n = e;
                return i && i.forEach((e => {
                    const i = e.replace("{";
const "").replace("}";
const "");
const s = Y.get(i);
const o = i.split(".");
                    let r;
let a;
let d = t[o[0]];
                    if (d) for (r = 1; r < o.length; r += 1) {
                        if (a = o[r], void 0 === d[a]) {
                            d = void 0;
                            break;
                        }
                        d = d[a];
                    }
                    void 0 === d && i.startsWith("targeting.") && (d = xi.get(i.replace("targeting.", ""))), 
                    void 0 === d && (d = s), void 0 !== d && (n = n.replace(e, d));
                })), n;
            }
        }, In = "ae-translatable-label";
        class Cn {
            constructor(e) {
                this.customIframe = null, this.element = null, this.status = null, this.isEmpty = !0, 
                this.advertiserId = null, this.orderId = null, this.creativeId = null, this.creativeSize = null, 
                this.lineItemId = null, this.winningBidderDetails = null, this.trackStatusAfterRendered = !1, 
                this.slotViewed = !1, this.requested = null, this.loaded = null, this.rendered = null, 
                this.viewed = null, this.logger = (...e) => bi(Cn.LOG_GROUP, ...e), this.config = Y.get(`slots.${e.id}`) || {}, 
                this.enabled = !this.config.disabled, this.config.uid || Y.set(`slots.${e.id}.uid`, Ri()), 
                this.config.slotName = this.config.slotName || e.id, this.config.slotNameSuffix = this.config.slotNameSuffix || "", 
                this.setUpSlotTargeting(), delete this.config.targeting, this.requested = new Promise((e => {
                    Bt.onSlotEvent(ki.SLOT_REQUESTED_EVENT, (() => {
                        this.pushTime = (new Date).getTime(), e();
                    }), this.getSlotName());
                })), this.loaded = new Promise((e => {
                    Bt.onSlotEvent(ki.SLOT_LOADED_EVENT, (() => {
                        $i.setDataParam(this, "slotLoaded", !0), e();
                    }), this.getSlotName());
                })), this.rendered = new Promise((e => {
                    Bt.onSlotEvent(ki.SLOT_RENDERED_EVENT, (({payload: t}) => {
                        const {event: i;
const adType: n} = t;
                        this.setupSizesTracking(n), this.updateOnRenderEnd(i, n), e();
                    }), this.getSlotName());
                })), this.viewed = new Promise((e => {
                    Bt.onSlotEvent(ki.SLOT_VIEWED_EVENT, (() => {
                        $i.setDataParam(this, "slotViewed", !0), e();
                    }), this.getSlotName());
                })).then((() => {
                    this.slotViewed = !0;
                })), this.addClass(Cn.AD_CLASS), this.enabled || this.hide();
            }
            setUpSlotTargeting() {
                const e = this.config.targeting || {};
                e.src = e.src || Y.get("src"), e.pos = e.pos || this.getSlotName(), e.rv = e.rv || "1", 
                xi.extend(e, this.getSlotName());
            }
            getAdUnit() {
                return this.adUnit || (this.adUnit = Tn.build(this.config.adUnit || Y.get("adUnitId"), {
                    slotConfig: this.config
                })), this.adUnit;
            }
            getVideoAdUnit() {
                return Tn.build(this.config.videoAdUnit || Y.get("vast.adUnitId"), {
                    slotConfig: this.config
                });
            }
            getElement() {
                return this.element || (this.element = document.getElementById(this.getSlotName())), 
                this.element;
            }
            getPlaceholder() {
                var e;
                const t = null === (e = this.getElement()) || void 0 === e ? void 0 : e.parentElement;
                return (null == t ? void 0 : t.classList.contains(Cn.AD_SLOT_PLACEHOLDER_CLASS)) ? t : null;
            }
            getAdLabel(e) {
                var t;
                if (e) {
                    const t = document.querySelector(e);
                    return null == t ? void 0 : t.querySelector(`.${In}`);
                }
                return null === (t = this.getPlaceholder()) || void 0 === t ? void 0 : t.querySelector(`.${In}`);
            }
            getAdContainer() {
                const e = this.getElement();
                return e ? e.querySelector('div[id*="_container_"]') : null;
            }
            getIframe() {
                const e = this.getElement();
                return e ? this.customIframe ? this.customIframe : e.querySelector('div[id*="_container_"] iframe') : null;
            }
            overrideIframe(e) {
                this.customIframe = e;
            }
            getFrameType() {
                const e = this.getIframe();
                return e ? "true" === e.dataset.isSafeframe ? "safe" : "regular" : null;
            }
            getCreativeSize() {
                return Array.isArray(this.creativeSize) ? this.creativeSize.join("x") : this.creativeSize;
            }
            getCreativeSizeAsArray() {
                if (!this.creativeSize) return null;
                const e = Array.isArray(this.creativeSize) ? this.creativeSize : this.creativeSize.split("x").map(Number);
                return [ e[0], e[1] ];
            }
            getMainPositionName() {
                const {pos: e = ""} = xi.dump(this.getSlotName());
                return (Array.isArray(e) ? e : e.split(","))[0].toLowerCase();
            }
            getUid() {
                return this.config.uid;
            }
            getSlotName() {
                return this.config.slotName;
            }
            getSizes() {
                return this.config.sizes;
            }
            get targeting() {
                return xi.dump(this.getSlotName());
            }
            getTargeting() {
                return this.parseTargetingParams(xi.dump(this.getSlotName()));
            }
            parseTargetingParams(e) {
                const t = {};
                return Object.keys(e).forEach((i => {
                    let n = e[i];
                    "function" == typeof n && (n = n()), null !== n && (t[i] = n);
                })), t;
            }
            getDefaultSizes() {
                return this.config.defaultSizes;
            }
            getVideoSizes() {
                return this.config.videoSizes;
            }
            getViewportConflicts() {
                return this.config.viewportConflicts || [];
            }
            hasDefinedViewportConflicts() {
                return this.getViewportConflicts().length > 0;
            }
            getStatus() {
                return this.status;
            }
            getPushTime() {
                return this.pushTime;
            }
            setStatus(e = null) {
                this.status = e, null !== e && (this.emit(e), $i.setDataParam(this, "slotResult", this.getStatus()), 
                this.emit(ki.SLOT_STATUS_CHANGED));
            }
            isEnabled() {
                return this.enabled;
            }
            isFirstCall() {
                return !!this.config.firstCall;
            }
            isViewed() {
                return this.slotViewed;
            }
            isOutOfPage() {
                return !!this.config.outOfPage;
            }
            isVideo() {
                return !!this.config.isVideo;
            }
            getCopy() {
                return JSON.parse(JSON.stringify(this.config));
            }
            getTopOffset() {
                const e = this.getElement();
                return e ? Ln(e) : null;
            }
            enable() {
                this.enabled = !0;
            }
            disable(e = null) {
                this.enabled = !1, this.setStatus(e), this.hide();
            }
            destroy() {
                this.disable(), this.emit(ki.DESTROY_EVENT);
            }
            getConfigProperty(e) {
                return Y.get(`slots.${this.config.slotName}.${e}`);
            }
            getTargetingProperty(e) {
                return xi.get(e, this.getSlotName());
            }
            setConfigProperty(e, t) {
                Y.set(`slots.${this.config.slotName}.${e}`, t);
            }
            setTargetingConfigProperty(e, t) {
                xi.set(e, t, this.config.slotName);
            }
            success(e = Gi.STATUS_SUCCESS) {
                this.getConfigProperty("showManually") || this.show(), this.setStatus(e);
                const t = this.getConfigProperty("skipTemplates") ? [] : this.getConfigProperty("defaultTemplates") || [];
                t && t.length && t.forEach((e => An.init(e, this))), this.emit(ki.TEMPLATES_LOADED, t), 
                Bt.emit(zt.AD_ENGINE_SLOT_LOADED, {
                    name: this.getSlotName(),
                    state: Gi.STATUS_SUCCESS
                }), this.setupDelayedCollapse();
            }
            setupDelayedCollapse() {
                Bt.on(zt.GAM_AD_DELAYED_COLLAPSE, (e => {
                    e.source.includes(this.getSlotName()) && this.collapse();
                }), !1);
            }
            collapse(e = Gi.STATUS_COLLAPSE) {
                Bt.emit(zt.AD_ENGINE_SLOT_LOADED, {
                    name: this.getSlotName(),
                    state: Gi.STATUS_COLLAPSE
                }), this.hide(), this.setStatus(e);
            }
            updateWinningPbBidderDetails() {
                this.getTargetingProperty("hb_bidder") && this.getTargetingProperty("hb_pb") ? this.winningBidderDetails = {
                    name: this.getTargetingProperty("hb_bidder"),
                    price: this.getTargetingProperty("hb_pb")
                } : this.winningBidderDetails = null;
            }
            updateWinningA9BidderDetails() {
                this.getTargetingProperty("amznbid") ? this.winningBidderDetails = {
                    name: "a9",
                    price: this.getTargetingProperty("amznbid")
                } : this.winningBidderDetails = null;
            }
            updateOnRenderEnd(e, t) {
                if (!e) return;
                let i = e.creativeId;
let n = e.lineItemId;
                if (this.isEmpty = e.isEmpty, !e.isEmpty && e.slot) {
                    const t = e.slot.getResponseInformation();
                    t && (this.orderId = t.campaignId, this.advertiserId = t.advertiserId, e.sourceAgnosticCreativeId && e.sourceAgnosticLineItemId ? (this.logger("set line item and creative id to source agnostic values"), 
                    i = e.sourceAgnosticCreativeId, n = e.sourceAgnosticLineItemId) : null === t.creativeId && null === t.lineItemId && (i = mn, 
                    n = mn));
                }
                switch (this.creativeId = i, this.lineItemId = n, this.creativeSize = this.isOutOfPage() ? "out-of-page" : e.size, 
                Zi.updateOnRenderEnd(this), t) {
                  case Gi.STATUS_COLLAPSE:
                  case Gi.STATUS_FORCED_COLLAPSE:
                    this.collapse(t);
                    break;

                  case Gi.STATUS_MANUAL:
                    this.setStatus(t);
                    break;

                  case Gi.STATUS_SKIP_TEMPLATE:
                    this.setConfigProperty("skipTemplates", !0), this.success();
                    break;

                  default:
                    this.success();
                }
            }
            addClass(e) {
                const t = this.getElement();
                return !!t && (t.classList.add(e), !0);
            }
            removeClass(e) {
                const t = this.getElement();
                return !!t && (t.classList.remove(e), !0);
            }
            hide() {
                this.addClass(Cn.HIDDEN_AD_CLASS) && this.emit(ki.HIDDEN_EVENT);
            }
            show() {
                this.removeClass(Cn.HIDDEN_AD_CLASS) && this.emit(ki.SHOWED_EVENT);
            }
            emit(e, t = {}, i = !0) {
                Bt.emit(zt.AD_ENGINE_SLOT_EVENT, {
                    event: e.toString(),
                    slot: this,
                    adSlotName: this.getSlotName(),
                    payload: i ? JSON.parse(JSON.stringify(t)) : t
                }), this.logger(this.getSlotName(), e, t);
            }
            emitEvent(e = null) {
                null !== e && this.emit(ki.CUSTOM_EVENT, {
                    status: e
                });
            }
            setupSizesTracking(e) {
                const t = this.getIframe();
                if (t && e.includes("success") && window.ResizeObserver) {
                    const e = new ResizeObserver((t => {
                        for (const i of t) {
                            const t = Math.floor(i.target.clientWidth);
const n = Math.floor(i.target.clientHeight);
                            t > 0 && n > 0 && (1 != t || 1 != n) && (Bt.emit(zt.AD_ENGINE_AD_RESIZED, {
                                slot: this,
                                sizes: {
                                    width: t,
                                    height: n
                                }
                            }), e.unobserve(i.target));
                        }
                    }));
                    e.observe(t);
                }
            }
        }
        function Nn(e) {
            return e ? parseFloat(getComputedStyle(e, null).width.replace("px", "")) : 0;
        }
        function On(e) {
            return e ? parseFloat(getComputedStyle(e, null).height.replace("px", "")) : 0;
        }
        function Dn(e) {
            let t = !1;
            const i = {
                display: "";
const height: ""
            };
            e.classList.contains(Cn.HIDDEN_AD_CLASS) && (t = !0, i.display = e.style.display, 
            i.height = e.style.height, e.classList.remove(Cn.HIDDEN_AD_CLASS), e.style.display = "block", 
            e.style.height = "1px");
            const n = function(e) {
                const t = e.getBoundingClientRect();
const i = window.pageXOffset || document.documentElement.scrollLeft;
const n = window.pageYOffset || document.documentElement.scrollTop;
                return {
                    top: t.top + n,
                    left: t.left + i
                };
            }(e);
            return t && (e.classList.add(Cn.HIDDEN_AD_CLASS), e.style.display = i.display, e.style.height = i.height), 
            n;
        }
        function Ln(e) {
            return Dn(e).top;
        }
        function Pn(e) {
            return Dn(e).left;
        }
        function kn() {
            return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        }
        function xn() {
            return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        }
        function Rn(e, {topOffset: t = 0, bottomOffset: i = 0, areaThreshold: n = .5} = {}) {
            const s = window.getComputedStyle(e).position;
            if ([ "fixed", "sticky" ].includes(s)) return !0;
            const o = e.offsetHeight;
const r = Ln(e);
const a = r + o;
const d = window.scrollY;
const l = kn();
const c = n * o;
            return r >= t + d - c && a <= i + d + l + c;
        }
        function Un(e, t = []) {
            if (null === e.offsetParent) return !1;
            const i = e.offsetHeight;
const n = Ln(e);
const s = kn();
            return t.some((t => {
                if (e.previousSibling && e.previousSibling.isSameNode(t) || e.nextSibling && e.nextSibling.isSameNode(t)) return !0;
                const o = t.offsetHeight;
const r = Ln(t);
                return (r < n ? n - r - o : r - n - i) < s;
            }));
        }
        Cn.LOG_GROUP = "AdSlot", Cn.AD_CLASS = "gpt-ad", Cn.AD_SLOT_PLACEHOLDER_CLASS = "ad-slot-placeholder", 
        Cn.HIDDEN_AD_CLASS = "hidead";
        const Vn = "slot-service";
const Mn = new class {
            constructor() {
                this.slotStatuses = {};
const this.slotStates = {};
const this.slots = {};
            }
            add(e) {
                const t = e.getSlotName();
                this.slots[t] = e, !1 === this.slotStates[t] && e.disable(this.slotStatuses[t]), 
                !0 === this.slotStates[t] && e.enable(), $i.addDefaultClasses(e), Bt.emit(zt.AD_ENGINE_SLOT_ADDED, {
                    name: t,
                    slot: e,
                    state: ki.SLOT_ADDED_EVENT
                });
            }
            removeAll() {
                Object.values(this.slots).forEach((e => this.remove(e)));
            }
            remove(e) {
                const t = e.getSlotName();
                Y.removeListeners(`slots.${t}`), e.destroy(), delete this.slots[t], delete this.slotStates[t], 
                delete this.slotStatuses[t];
            }
            get(e) {
                if (e.includes("gpt_unit_")) {
                    const t = this.getGptAdSlot(e);
                    return this.setGptAdSlotInsertId(t, e), t;
                }
                const [t] = e.split(";
const ");
                if (this.slots[t]) return this.slots[t];
                let i = null;
                return this.forEach((e => {
                    if (null !== i) return;
                    const n = xi.get("pos";
const e.getSlotName()) || [];
                    n !== t && n[0] !== t || (i = e);
                })), i;
            }
            getSlotId(e) {
                let t = Y.get(`slots.${e}.uid`);
                return t || (t = Ri(), Y.set(`slots.${e}.uid`, t)), t;
            }
            forEach(e) {
                Object.keys(this.slots).forEach((t => {
                    e(this.slots[t]);
                }));
            }
            enable(e) {
                this.setState(e, !0);
            }
            disable(e, t = null) {
                this.setState(e, !1, t);
            }
            getState(e) {
                return !1 !== this.slotStates[e];
            }
            setState(e, t, i = null) {
                const n = this.get(e);
                this.slotStates[e] = t, this.slotStatuses[e] = i, n ? (n.setStatus(i), t ? n.enable() : n.disable()) : t ? Y.set(`slots.${e}.disabled`, !1) : Y.set(`slots.${e}.disabled`, !0), 
                bi(Vn, "set state", e, t);
            }
            hasViewportConflict(e) {
                if (!e.hasDefinedViewportConflicts() || null === e.getElement()) return !1;
                const t = e.getElement().offsetHeight;
const i = Ln(e.getElement());
const n = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
const s = e.getViewportConflicts().some((e => function(e;
const t;
const i;
const n) {
                    const s = document.getElementById(n);
                    if (null === s.offsetParent) return !1;
                    const o = s.offsetHeight;
const r = Ln(s);
                    return (r < t ? t - r - o : r - t - e) < i;
                }(t, i, n, e)));
                return bi(Vn, "hasViewportConflict", e.getSlotName(), s), s;
            }
            get slotConfigsMap() {
                return Y.get("slots") || {};
            }
            getFirstCallSlotNames() {
                return Object.entries(this.slotConfigsMap).filter((([, e]) => !!e.firstCall)).map((([e]) => e));
            }
            getNonFirstCallSlotNames() {
                return Object.entries(this.slotConfigsMap).filter((([, e]) => !e.firstCall)).map((([e]) => e));
            }
            getEnabledSlotNames() {
                return Object.entries(this.slotConfigsMap).filter((([, e]) => !e.disabled)).map((([e]) => e));
            }
            pushSlot(e) {
                const t = Kn();
                t ? (bi(Vn, `Push slot ${e.id} to adStack.`), t.push({
                    id: e.id
                })) : bi(Vn, `Could not push slot ${e.id} because adStack is not present.`);
            }
            getGptAdSlot(e) {
                const t = Y.get("custom.serverPrefix");
const i = new RegExp(`/${t ? `${t}.` : ""}[A-Z]+/(?<slotName>[a-z_]+)/`);
const n = e.match(i);
                try {
                    return this.slots[n.groups.slotName];
                } catch (e) {
                    throw new Error("Unsupported GPT Template slot id format");
                }
            }
            setGptAdSlotInsertId(e, t) {
                e.setConfigProperty("insertId", t);
            }
        }, zn = new class {
            constructor() {
                this.serviceName = "scroll-listener", this.callbacks = {};
            }
            init() {
                let e = !1;
                document.addEventListener("scroll", (t => {
                    e || (window.requestAnimationFrame((() => {
                        e = !1, Object.keys(this.callbacks).forEach((e => {
                            "function" == typeof this.callbacks[e] && this.callbacks[e](t.type, e);
                        }));
                    })), e = !0);
                })), bi(this.serviceName, "Service initialised.");
            }
            addSlot(e, {threshold: t, distanceFromTop: i} = {}) {
                const n = document.getElementById(e);
                n ? void 0 !== t || void 0 !== i ? void 0 === t || void 0 === i ? (bi(this.serviceName, `Add slot ${e}.`), 
                this.addCallback(((e, s) => {
                    const o = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
                    if (void 0 !== t) {
                        const e = Ln(n);
                        o + kn() > e - t && (this.removeCallback(s), Mn.pushSlot(n));
                    } else o > i && (this.removeCallback(s), Mn.pushSlot(n));
                }))) : bi(this.serviceName, "either threshold or distanceFromTop can be initialised, not both") : bi(this.serviceName, "either threshold or distanceFromTop must be initialised") : bi(this.serviceName, `Node with id ${e} not found.`);
            }
            addCallback(e) {
                const t = this.getUniqueId();
                return this.callbacks[t] = e, t;
            }
            removeCallback(e) {
                delete this.callbacks[e];
            }
            getUniqueId() {
                return (16777216 * (1 + Math.random())).toString(16).substring(1);
            }
        }, jn = "nativo";
        class Bn {
            constructor(e) {
                this.context = e;
            }
            isEnabled() {
                const e = this.context.get("services.nativo.enabled") && this.context.get("wiki.opts.enableNativeAds");
                return Bn.log("Is Nativo enabled?", e), e;
            }
            load() {
                Bn.log("Loading Nativo API..."), Di.loadScript("//s.ntv.io/serve/load.js", !0, null, {}, {
                    ntvSetNoAutoStart: ""
                }).then((() => {
                    Bn.log("Nativo API loaded."), this.watchNtvEvents(), this.watchPrebidNativeEvents();
                }));
            }
            scrollTriggerCallback(e, t) {
                if (e.isLoaded) Bn.log(jn, "Fan Takeover on the page"); else {
                    if (!1 !== e.isLoaded || "ruap" !== e.adProduct || !this.context.get("custom.hasFeaturedVideo")) return this.isDisabledInNoAdsExperiment(t) ? (Bn.log(jn, `Slot disabled due to the experiment: ${t}`), 
                    void ("ucp_mobile" !== xi.get("skin") && document.getElementById(t) ? document.getElementById(t).id = "" : document.getElementById(t) && document.getElementById(t).remove())) : void this.context.push("state.adStack", {
                        id: t
                    });
                    Bn.log(jn, '"Fan Takeover" on the featured page');
                }
            }
            replaceAndShowSponsoredFanAd() {
                const e = document.getElementById(Bn.FEED_AD_SLOT_NAME);
const t = document.querySelector(".recirculation-prefooter__item.is-sponsored.can-nativo-replace");
                e && t ? (t.replaceWith(e), Bn.log("Replacing sponsored element with Nativo feed ad")) : Bn.log("Could not replace sponsored element with Nativo feed ad");
            }
            static log(...e) {
                bi(jn, ...e);
            }
            replaceWithAffiliateUnit() {
                this.sendNativoStatus(Gi.STATUS_DISABLED);
            }
            sendNativoStatus(e) {
                const t = {
                    event: e;
const adSlotName: "";
const payload: {
                        adLocation: "";
const provider: "nativo"
                    }
                };
                Bt.dispatch(Bt.getGlobalAction(zt.AD_ENGINE_SLOT_EVENT)(t));
            }
            isDisabledInNoAdsExperiment(e) {
                return this.context.get("state.noAdsExperiment.unitName") === e;
            }
            watchNtvEvents() {
                var e;
var t;
var i;
var n;
                null === (t = null === (e = window.ntv.Events) || void 0 === e ? void 0 : e.PubSub) || void 0 === t || t.subscribe("noad", (e => {
                    const t = Bn.AD_SLOT_MAP[e.data[0].id];
                    this.handleNtvNativeEvent(e, t, Gi.STATUS_COLLAPSE), t == Bn.INCONTENT_AD_SLOT_NAME && Bt.emit(zt.NO_NATIVO_AD, {
                        slotName: t
                    });
                })), null === (n = null === (i = window.ntv.Events) || void 0 === i ? void 0 : i.PubSub) || void 0 === n || n.subscribe("adRenderingComplete", (e => {
                    const t = Bn.extractSlotIdFromNativoCompleteEventData(e);
                    this.handleNtvNativeEvent(e, t, Gi.STATUS_SUCCESS);
                }));
            }
            watchPrebidNativeEvents() {
                Bt.on(zt.NO_NATIVE_PREBID_AD, (e => {
                    e.slotName == Bn.INCONTENT_AD_SLOT_NAME && this.replaceWithAffiliateUnit();
                }));
            }
            static extractSlotIdFromNativoNoAdEventData(e) {
                var t;
                return (null === (t = e.data[0]) || void 0 === t ? void 0 : t.adLocation) ? e.data[0].adLocation.substring(1) : Bn.AD_SLOT_MAP[e.data[0].id];
            }
            static extractSlotIdFromNativoCompleteEventData(e) {
                return e.data.placement ? Bn.AD_SLOT_MAP[e.data.placement] : Bn.AD_SLOT_MAP[e.data.id];
            }
            handleNtvNativeEvent(e, t, i) {
                if (Bn.log("Nativo native event fired", e, t, i), !t) return;
                const n = Mn.get(t);
                Bn.log("Handling Nativo native event", t, n), n && n.getSlotName() === t && (i === Gi.STATUS_COLLAPSE && (n.hide(), 
                t === Bn.INCONTENT_AD_SLOT_NAME && this.replaceWithAffiliateUnit()), i === Gi.STATUS_SUCCESS && t === Bn.FEED_AD_SLOT_NAME && this.replaceAndShowSponsoredFanAd(), 
                n.getStatus() !== i ? n.setStatus(i) : Bn.log("Slot status already tracked", n.getSlotName(), i));
            }
        }
        Bn.INCONTENT_AD_SLOT_NAME = "ntv_ad", Bn.FEED_AD_SLOT_NAME = "ntv_feed_ad", Bn.AD_SLOT_MAP = {
            1139703: Bn.INCONTENT_AD_SLOT_NAME,
            1142863: Bn.INCONTENT_AD_SLOT_NAME,
            1142668: Bn.FEED_AD_SLOT_NAME,
            1142669: Bn.FEED_AD_SLOT_NAME,
            456441: Bn.FEED_AD_SLOT_NAME
        };
        class Fn {
            create(e, t) {
                const i = this.createEmptyIframe();
                return e.appendChild(i), t && (i.contentWindow.document.open(), i.contentWindow.document.write(t), 
                i.contentWindow.document.close()), i;
            }
            createEmptyIframe() {
                const e = document.createElement("iframe");
                return e.height = "0", e.width = "0", e.border = "0px", e.hspace = "0", e.vspace = "0", 
                e.marginWidth = "0", e.marginHeight = "0", e.style.border = "0", e.scrolling = "no", 
                e.frameBorder = "0", e.src = "about:blank", e.style.display = "inline", e.style.overflow = "hidden", 
                e;
            }
        }
        class $n {
            constructor() {
                this.iframeBuilder = new Fn;
            }
            fillIn(e) {
                return h(this, void 0, void 0, (function*() {
                    const t = yield Li.init();
                    Bt.action$.pipe(jt(Bt.getGlobalAction(zt.BIDDERS_BIDDING_DONE)), Ut((t => "prebid" === t.provider && t.slotName === e.getSlotName())), Vt(1)).subscribe((() => {
                        var i;
var n;
                        const s = this.getIframeDoc(e);
const o = this.getAdId(e);
                        s && o && (t.renderAd(s, o), null === (n = null === (i = e.getElement()) || void 0 === i ? void 0 : i.classList) || void 0 === n || n.remove(Cn.HIDDEN_AD_CLASS), 
                        e.success(), bi("prebidium-provider", e.getSlotName(), "slot added"));
                    }));
                }));
            }
            getIframeDoc(e) {
                return this.iframeBuilder.create(e.getElement()).contentWindow.document;
            }
            getAdId(e) {
                return xi.get("hb_adid", e.getSlotName());
            }
        }
        class Gn {
            constructor(e) {
                this.ntvApi = e || {}, this.ntvApi.cmd = this.ntvApi.cmd || [];
            }
            fillIn(e) {
                return bi("nativo", `Filling ${e.getSlotName()} by pushing Nativo's command queue`), 
                this.getQueue().push((() => {
                    window.PostRelease.Start();
                })), !0;
            }
            getQueue() {
                return this.ntvApi.cmd;
            }
        }
        const Hn = "slot-refresher";
const qn = {
            timeoutMS: 3e4;
const slots: []
        };
const Wn = new class {
            constructor() {
                this.slotsInTheViewport = [];
            }
            log(...e) {
                bi(Hn, ...e);
            }
            refreshSlot(e) {
                this.config.slots.includes(e.getSlotName()) && setTimeout((() => {
                    if (e.isEnabled()) {
                        if (this.log(`${e.getSlotName()} will be refreshed.`), this.slotsInTheViewport.includes(e.getSlotName())) return this.log(`refreshing ${e.getSlotName()}`), 
                        void En.refreshSlot(e);
                        this.log(`${e.getSlotName()} waiting for being in viewport.`), function(e) {
                            window.googletag.pubads().addEventListener("slotVisibilityChanged", (function t(i) {
                                i.slot.getSlotElementId() === e.getSlotName() && (bi(Hn, `${e.getSlotName()} back in the viewport, refreshing.`, i), 
                                En.refreshSlot(e), window.googletag.pubads().removeEventListener("slotVisibilityChanged", t));
                            }));
                        }(e);
                    }
                }), this.config.timeoutMS);
            }
            setupSlotRefresher(e, t, i) {
                this.config = Object.assign(Object.assign({}, qn), e), this.config.slots.length < 1 || t ? i("disabled") : (Bt.onSlotEvent(ki.SLOT_VIEWED_EVENT, (({adSlotName: e, slot: t}) => {
                    i(`${e} viewed`), this.refreshSlot(t);
                })), Bt.onSlotEvent(ki.SLOT_BACK_TO_VIEWPORT, (({adSlotName: e}) => {
                    this.slotsInTheViewport.push(e);
                })), Bt.onSlotEvent(ki.SLOT_LEFT_VIEWPORT, (({adSlotName: e}) => {
                    this.slotsInTheViewport = this.slotsInTheViewport.filter((t => t !== e));
                })), i("enabled", this.config));
            }
            init() {
                return h(this, void 0, void 0, (function*() {
                    this.setupSlotRefresher(Y.get("services.slotRefresher.config"), yield function() {
                        return h(this, void 0, void 0, (function*() {
                            return new Promise((e => {
                                Bt.on(zt.AD_ENGINE_UAP_LOAD_STATUS, (t => {
                                    const i = t.isLoaded || "ruap" === t.adProduct;
                                    e(i);
                                }));
                            }));
                        }));
                    }(), this.log);
                }));
            }
        };
        function Kn() {
            const e = Y.get("state.adStack");
            return bi("ad-engine", "getting adStack: ", ...e), e;
        }
        class Yn {
            constructor(e = null) {
                this.started = !1, Y.extend(e), window.ads = window.ads || {}, window.ads.runtime = window.ads.runtime || {}, 
                Bt.on(zt.PLATFORM_BEFORE_PAGE_CHANGE, (() => {
                    Mn.removeAll();
                }), !1);
            }
            init() {
                return h(this, void 0, void 0, (function*() {
                    var e;
                    this.setupProviders(), this.setupAdStack(), Ji.init(), e = Y.get("options.customAdLoader.globalMethodName"), 
                    window[e] = e => {
                        const t = e.slotName ? Mn.get(e.slotName) : null;
                        An.init(e.type, t, e);
                    }, ji.init(), An.subscribeCommunicator(), $i.registerMessageListener(Mn.get.bind(Mn)), 
                    this.runAdQueue(), zn.init(), Wn.init(), this.setupPushOnScrollQueue();
                }));
            }
            setupProviders() {
                const e = Y.get("state.provider");
                this.defaultProvider = this.createProvider(e);
                const t = new Bn(Y);
                t.isEnabled() ? t.load() : t.replaceWithAffiliateUnit();
            }
            setupAdStack() {
                this.adStack = Kn(), this.adStack.start || Yi(this.adStack, (e => {
                    const t = new Cn(e);
                    this.pushSlot(t);
                }));
            }
            pushSlot(e) {
                const t = Y.get(`slots.${e.getSlotName()}.providers`) || [];
                if (Mn.add(e), t.length > 0) {
                    const i = t.shift();
                    this.createProvider(i).fillIn(e);
                } else this.defaultProvider.fillIn(e);
            }
            createProvider(e) {
                switch (e) {
                  case "prebidium":
                    return new $n;

                  case "nativo":
                    return new Gn(window.ntv);

                  default:
                    return new En;
                }
            }
            setupPushOnScrollQueue() {
                if (Y.get("events.pushOnScroll")) {
                    const e = Y.get("events.pushOnScroll.ids") || [];
const t = new Qi(...e);
                    t.onItemFlush((e => {
                        zn.addSlot(e, {
                            threshold: Y.get("events.pushOnScroll.threshold") || 0
                        });
                    })), Y.set("events.pushOnScroll.ids", t), t.flush();
                }
            }
            runAdQueue() {
                Bt.on(zt.AD_ENGINE_PARTNERS_READY, (() => {
                    this.started || (Bt.emit(zt.AD_ENGINE_STACK_START), this.started = !0, this.adStack.start());
                }));
            }
        }
        const Qn = new class {
            constructor() {
                this.MAX = 100;
const this.ALWAYS_ALLOWED_THRESHOLD = 100;
            }
            isOutboundTrafficAllowed(e = "default") {
                const t = Y.get(`services.${e}.allowed`);
                if ("boolean" == typeof t) return t;
                const i = Y.get(`services.${e}.threshold`);
const n = i >= 0 && i <= 100 ? i : this.ALWAYS_ALLOWED_THRESHOLD;
                let s = !0;
                return n !== this.ALWAYS_ALLOWED_THRESHOLD && (s = this.getSeed() < n), n < 1 && (s = !1), 
                bi("outbound-traffic-restrict", `Outbound traffic for: "${e}" is allowed: ${s}`, `Threshold: ${n}`), 
                Y.set(`services.${e}.allowed`, s), s;
            }
            getSeed() {
                return Math.random() * this.MAX;
            }
        }, Xn = new class {
            constructor() {
                Y.get("services.externalLogger.threshold") || Y.set("services.externalLogger.threshold", 1), 
                this.isActive = Qn.isOutboundTrafficAllowed("externalLogger");
            }
            log(e, t = {}) {
                if (!this.isActive) return;
                const i = Y.get("services.externalLogger.endpoint");
                if (!i) return;
                const n = new FormData;
                n.set("message", e), Object.keys(t).forEach((e => {
                    n.set(e, t[e]);
                }));
                const s = new XMLHttpRequest;
                s.open("POST", i, !0), s.send(n);
            }
        }, Jn = "IntentIQ", Zn = new class {
            constructor() {
                this.loaded = !1, this.fandomId = 1187275693, this.intentIQScriptUrl = "//script.wikia.nocookie.net/fandom-ae-assets/intentiq/5.4/IIQUniversalID.js";
            }
            preloadScript() {
                if (this.isEnabled()) return this.loadPromise ? this.loadPromise : void (this.loadPromise = Di.loadScript(this.intentIQScriptUrl, !0, "first").then((() => {
                    this.loaded = !0, bi(Jn, "loaded");
                })));
            }
            initialize(e) {
                return h(this, void 0, void 0, (function*() {
                    if (this.isEnabled()) {
                        if (Bt.emit(zt.INTENTIQ_START), this.loaded || (yield this.preloadScript(), yield new Pi((() => void 0 !== window.IntentIqObject), 10, 10).until()), 
                        !this.intentIqObject) {
                            const t = window.location.hostname.includes(".fandom.com") ? "fandom.com" : window.location.hostname;
                            return new Promise((i => {
                                this.intentIqObject = new window.IntentIqObject({
                                    partner: this.fandomId,
                                    pbjs: e,
                                    timeoutInMillis: 2e3,
                                    ABTestingConfigurationSource: "percentage",
                                    abPercentage: 97,
                                    manualWinReportEnabled: !0,
                                    browserBlackList: "Chrome",
                                    domainName: t,
                                    callback: e => {
                                        bi(Jn, "got data", e), i(), this.setupPpid(e);
                                    }
                                }), xi.set("intent_iq_group", this.intentIqObject.intentIqConfig.abTesting.currentTestGroup || "U"), 
                                Y.get("services.intentIq.ppid.enabled") && xi.set("intent_iq_ppid_group", this.intentIqObject.intentIqConfig.abTesting.currentTestGroup || "U"), 
                                Bt.emit(zt.INTENTIQ_DONE);
                            }));
                        }
                    } else bi(Jn, "disabled");
                }));
            }
            reportPrebidWin(e) {
                return h(this, void 0, void 0, (function*() {
                    if (!this.isEnabled() || !this.intentIqObject) return;
                    const t = {
                        biddingPlatformId: 1;
const bidderCode: e.bidderCode;
const prebidAuctionId: e.auctionId;
const cpm: e.cpm;
const currency: e.currency;
const originalCpm: e.originalCpm;
const originalCurrency: e.originalCurrency;
const status: e.status;
const placementId: e.adUnitCode
                    };
                    bi(Jn, "reporting prebid win", t), this.intentIqObject.reportExternalWin(t), Xn.log("intentiq report", {
                        report: JSON.stringify(t)
                    });
                }));
            }
            setupPpid(e) {
                if (!this.isEnabled()) return;
                if (!function(e) {
                    return !!e && void 0 !== e.eids;
                }(e)) return void bi(Jn, "no data received");
                const t = this.getPpid(e);
                bi(Jn, "ppid", t), Y.get("services.intentIq.ppid.enabled") && this.setPpid(t), Y.get("services.intentIq.ppid.tracking.enabled") && this.trackPpid(t);
            }
            isEnabled() {
                return Y.get("bidders.prebid.intentIQ") && Y.get("options.trackingOptIn") && !Y.get("options.optOutSale") && !ln();
            }
            getPpid(e) {
                try {
                    return this.extractId(e);
                } catch (e) {
                    return yi(Jn, "error setting ppid", e), null;
                }
            }
            setPpid(e) {
                xi.set("intent_iq_ppid", e, "intent_iq"), bi(Jn, "set ppid ", e);
            }
            extractId(e) {
                var t;
var i;
                return null !== (i = null === (t = e.eids.filter((e => "intentiq.com" === e.source)).map((e => e.uids.find((e => "ppuid" === e.ext.stype))))[0]) || void 0 === t ? void 0 : t.id) && void 0 !== i ? i : null;
            }
            trackPpid(e) {
                e && (Bt.emit(zt.IDENTITY_PARTNER_DATA_OBTAINED, {
                    partnerName: "intentiq",
                    partnerIdentityId: e
                }), bi(Jn, "track ppid"));
            }
        };
        let es = class {
            constructor() {
                this.timeouts = {};
            }
            get(e) {
                return bi("global-timeout", `Getting timeout ${e}`), this.timeouts[e];
            }
            set(e, t) {
                return this.timeouts[e] ? (bi("global-timeout", `Timeout ${e} already set`), this.timeouts[e]) : (bi("global-timeout", `Setting timeout ${e} for ${t}ms`), 
                this.timeouts[e] = new Promise((e => {
                    setTimeout((() => {
                        e();
                    }), t);
                })), this.timeouts[e]);
            }
        };
        var ts;
var is;
        es = l([ N({
            scope: "Singleton"
        }) ], es);
        let ns = class {
            constructor(e = null;
let t = null) {
                this.instantConfig = e;
let this.globalTimeout = t;
let this.resetInitialized();
            }
            isEnabled(e, t = !0) {
                const i = "string" == typeof e && e.startsWith("ic") ? this.instantConfig.get(e) : this.getContextVariablesValue(e);
                return t ? i && Y.get("options.trackingOptIn") && !Y.get("options.optOutSale") && !ln() : i;
            }
            setOptions(e) {
                return this.options = e, this;
            }
            setInitialized() {
                this.resolve();
            }
            resetInitialized() {
                this.initialized = new Promise((e => {
                    this.resolve = e;
                }));
            }
            call() {}
            execute() {
                var e;
                return h(this, void 0, void 0, (function*() {
                    this.initializationTimeout = this.getTimeoutPromise(), this.initializationTimeout.then((() => {
                        this.setInitialized(), this.initialized || bi("base-service-setup", "timeout reached");
                    })), (null === (e = this.options) || void 0 === e ? void 0 : e.dependencies) && (yield Promise.all(this.options.dependencies)), 
                    yield this.call(), this.setInitialized();
                }));
            }
            getContextVariablesValue(e) {
                return "string" == typeof e ? Y.get(e) : e.map((e => Y.get(e))).reduce(((e, t) => e && t), !0);
            }
            getTimeoutPromise() {
                var e;
                return (null === (e = this.options) || void 0 === e ? void 0 : e.timeout) ? new Promise((e => {
                    setTimeout(e, this.options.timeout);
                })) : new Pi((() => !!this.globalTimeout)).until().then((() => {
                    var e;
var t;
                    return (null === (t = null === (e = this.globalTimeout) || void 0 === e ? void 0 : e.get) || void 0 === t ? void 0 : t.call(e, "partner-pipeline")) || this.globalTimeout["partner-pipeline"] || Promise.resolve();
                }));
            }
        };
        ns = l([ N(), u("design:paramtypes", [ "function" == typeof (ts = void 0 !== Oi && Oi) ? ts : Object, "function" == typeof (is = void 0 !== es && es) ? is : Object ]) ], ns);
        const ss = "audigent";
const os = () => void 0 !== window.au_seg;
        window.au = window.au || [];
        class rs extends ns {
            constructor() {
                super(...arguments), this.isLoaded = !1;
            }
            static loadSegmentLibrary() {
                rs.segmentsScriptLoader = Di.loadScript("https://seg.ad.gt/api/v1/s/158", !0, "first").then((() => {
                    Bt.emit(zt.AUDIGENT_SEGMENT_LIBRARY_LOADED);
                }));
            }
            loadMatchesLibrary() {
                this.matchesTagScriptLoader = Di.loadScript("https://a.ad.gt/api/v1/u/matches/158", !0, "first").then((() => {
                    Bt.emit(zt.AUDIGENT_MATCHES_LIBRARY_LOADED);
                }));
            }
            call() {
                return h(this, void 0, void 0, (function*() {
                    this.isEnabled("icAudigent") ? (xi.set("AU_SEG", "-1"), rs.sampling = this.instantConfig.get("icAudigentTrackingSampling"), 
                    rs.segmentLimit = this.instantConfig.get("icAudigentSegmentLimit"), !rs.segmentsScriptLoader && rs.loadSegmentLibrary(), 
                    !this.matchesTagScriptLoader && this.loadMatchesLibrary(), this.setupSegmentsListener(), 
                    this.isLoaded || (bi(ss, "loading..."), this.matchesTagScriptLoader.then((() => {
                        bi(ss, "audience tag script loaded");
                    })), rs.segmentsScriptLoader.then((() => {
                        bi(ss, "segment tag script loaded"), this.setup();
                    })), this.isLoaded = !0), yield this.waitForAuSegGlobalSet().then((e => {
                        bi(ss, "Audigent global variable set", e, window.au_seg), this.setup();
                    }))) : bi(ss, "disabled");
                }));
            }
            setup() {
                os() && rs.sliceAndSetSegmentsInTargeting();
            }
            setupSegmentsListener() {
                bi(ss, "setting up auSegReady event listener"), document.addEventListener("auSegReady", (function(e) {
                    bi(ss, "auSegReady event received", e), Bt.emit(zt.AUDIGENT_SEGMENTS_READY), rs.sliceAndSetSegmentsInTargeting();
                }));
            }
            static sliceAndSetSegmentsInTargeting() {
                const e = rs.sliceSegments();
                rs.trackWithExternalLoggerIfEnabled(e), rs.setSegmentsInTargeting(e);
            }
            resetLoadedState() {
                this.isLoaded = !1, this.matchesTagScriptLoader = null, rs.segmentsScriptLoader = null;
            }
            static sliceSegments() {
                const e = window.au_seg.segments || [];
const t = rs.segmentLimit || 0;
                let i = e.length ? e : "no_segments";
                return rs.canSliceSegments(i, t) && (i = i.slice(0, t)), bi(ss, "Sliced segments", i, t, e), 
                i;
            }
            static setSegmentsInTargeting(e) {
                bi(ss, "Setting segments in the targeting", e), xi.set("AU_SEG", e);
            }
            static canSliceSegments(e, t) {
                return t > 0 && "string" != typeof e;
            }
            static trackWithExternalLoggerIfEnabled(e) {
                const t = 100 * Math.random();
const i = rs.sampling || 0;
                i > 0 && t <= i && "string" != typeof e && Xn.log("Audigent segments", {
                    segmentsNo: e.length,
                    segments: e
                });
            }
            waitForAuSegGlobalSet(e = 5) {
                const t = Y.get("services.audigent.numberOfTries") || e;
                return new Pi(os, t, 250).until();
            }
        }
        var as;
        const ds = ee("[AdEngine] set InstantConfig";
const {
            _as: "props";
const _p: void 0
        });
        let ls = class {
            constructor(e) {
                this.container = e;
            }
            execute() {
                return h(this, void 0, void 0, (function*() {
                    const e = yield (new Oi).init();
                    this.container.bind(Oi).value(e), this.container.bind(wi).value(wi.make()), Bt.dispatch(ds({
                        instantConfig: e
                    })), this.preloadLibraries(e);
                }));
            }
            preloadLibraries(e) {
                e.get("icPrebid") && (Y.set("bidders.prebid.libraryUrl", e.get("icPrebidVersion")), 
                Li.init().then((() => {
                    if (e.get("icPrebidIntentIQ")) return Zn.preloadScript();
                }))), e.get("icAudigent") && rs.loadSegmentLibrary();
            }
        };
        ls = l([ N(), u("design:paramtypes", [ "function" == typeof (as = void 0 !== R && R) ? as : Object ]) ], ls);
        const cs = "tracking-opt-in-wrapper";
const us = new class {
            constructor() {
                window.ads = window.ads || {};
const this.installConsentQueue();
            }
            init() {
                return h(this, void 0, void 0, (function*() {
                    return new Promise((e => {
                        bi(cs, "Waiting for consents"), Bt.on(zt.AD_ENGINE_CONSENT_READY, (t => {
                            this.setConsents(t), e();
                        }));
                    }));
                }));
            }
            setConsents(e) {
                bi(cs, "TrackingOptIn consents", e), Y.set("options.trackingOptIn", e.gdprConsent), 
                Y.set("options.geoRequiresConsent", e.geoRequiresConsent), Y.set("options.optOutSale", e.ccpaSignal), 
                Y.set("options.geoRequiresSignal", e.geoRequiresSignal);
            }
            installConsentQueue() {
                window.ads.consentQueue = new Qi(...window.ads.consentQueue || []), window.ads.pushToConsentQueue = window.ads.pushToConsentQueue || (e => {
                    window.ads.consentQueue.push(e);
                }), Bt.on(zt.AD_ENGINE_CONSENT_READY, (e => {
                    window.ads.consentQueue.onItemFlush((t => {
                        console.warn('[AdEngine] You are using deprecated API to get consent.\nPlease use PostQuecast action "[AdEngine OptIn] set opt in" instead.'), 
                        t(e);
                    })), window.ads.consentQueue.flush();
                }));
            }
        };
        function hs(e) {
            return window.mw && window.mw.config ? window.mw.config.get(e) : null;
        }
        const ps = {
            AD_ENG_LOAD_TIMES: {
                name: "AdEngLoadTimes";
const icbmName: "loadTimes";
const url: "https://beacon.wikia-services.com/__track/special/adengloadtimes";
const allowed: {
                    sampling: !0;
const aggregation: !0;
const aggregationLimit: 5
                }
            };
const AD_ENG_BIDDERS: {
                name: "AdEngBidders";
const icbmName: "bidders";
const url: "https://beacon.wikia-services.com/__track/special/adengbidders";
const allowed: {
                    sampling: !1;
const aggregation: !1
                }
            };
const AD_ENG_VIEWABILITY: {
                name: "AdEngViewability";
const icbmName: "viewability";
const url: "https://beacon.wikia-services.com/__track/special/adengviewability";
const allowed: {
                    sampling: !1;
const aggregation: !1
                }
            };
const AD_ENG_PLAYER_INFO: {
                name: "AdEngPlayerInfo";
const icbmName: "playerInfo";
const url: "https://beacon.wikia-services.com/__track/special/adengplayerinfo";
const allowed: {
                    sampling: !1;
const aggregation: !1
                }
            };
const KEY_VALS: {
                name: "KeyVals";
const icbmName: "kvs";
const url: "https://beacon.wikia-services.com/__track/special/keyvals";
const allowed: {
                    sampling: !1;
const aggregation: !1
                }
            };
const AD_ENG_AD_SIZE_INFO: {
                name: "AdEngAdSizeInfo";
const icbmName: "adSizeInfo";
const url: "https://beacon.wikia-services.com/__track/special/adengadsizeinfo";
const allowed: {
                    sampling: !1;
const aggregation: !1
                }
            };
const AD_ENG_LABRADOR_INFO: {
                name: "AdEngLabradorInfo";
const icbmName: "labrador";
const url: "https://beacon.wikia-services.com/__track/special/adenglabradorinfo";
const allowed: {
                    sampling: !1;
const aggregation: !1
                }
            };
const AD_ENG_AD_INFO: {
                name: "AdEngAdInfo";
const icbmName: "adInfo";
const url: "https://beacon.wikia-services.com/__track/special/adengadinfo";
const allowed: {
                    sampling: !1;
const aggregation: !1
                }
            };
const IDENTITY_INFO: {
                name: "IdentityInfo";
const icbmName: "idInfo";
const url: "https://beacon.wikia-services.com/__track/special/identityinfo";
const allowed: {
                    sampling: !1;
const aggregation: !1
                }
            };
const TRACKING_EVENT: {
                name: "TrackingEvent";
const icbmName: "trackingEvent";
const url: "https://beacon.wikia-services.com/__track/special/trackingevent";
const allowed: {
                    sampling: !1;
const aggregation: !1
                }
            };
const VIDEO_PLAYER_EVENT: {
                name: "VideoPlayerEvent";
const icbmName: "videoPlayerEvent";
const url: "https://beacon.wikia-services.com/__track/special/videoplayerevent";
const allowed: {
                    sampling: !1;
const aggregation: !1
                }
            }
        };
        var gs;
        let ms = class {
            constructor(e) {
                this.instantConfig = e;
            }
            getPvUniqueId() {
                return hs("pvUID") || window.pvUID || window.fandomContext.tracking.pvUID;
            }
            getLegacyTrackingParameters() {
                const e = z.get();
                return {
                    beaconId: hs("beaconId") || window.beaconId || window.beacon_id || e.wikia_beacon_id,
                    pvNumber: hs("pvNumber") || window.pvNumber || e.pv_number,
                    pvNumberGlobal: hs("pvNumberGlobal") || window.pvNumberGlobal || e.pv_number_global,
                    pvUID: this.getPvUniqueId(),
                    sessionId: hs("sessionId") || window.sessionId || window.session_id || e.tracking_session_id
                };
            }
            getNewTrackingParameters() {
                return h(this, void 0, void 0, (function*() {
                    return yield new Pi((() => {
                        var e;
                        return !!(null === (e = window.fandomContext) || void 0 === e ? void 0 : e.tracking);
                    }), 10, 100).until(), Object.assign({}, window.fandomContext.tracking);
                }));
            }
            getTrackingParameters(e) {
                return h(this, void 0, void 0, (function*() {
                    return e ? this.getLegacyTrackingParameters() : yield this.getNewTrackingParameters();
                }));
            }
            execute() {
                return h(this, void 0, void 0, (function*() {
                    const e = !this.instantConfig.get("icDisableLegacyTrackingParameters";
const !1);
const t = yield this.getTrackingParameters(e);
                    Y.set("wiki", Object.assign(Object.assign({}, Y.get("wiki")), t)), Y.set("services.dw-tracker.compression", this.instantConfig.get("dwTrafficCompression", !1)), 
                    Object.values(ps).forEach((e => {
                        var t;
var i;
                        const n = e.name.toLowerCase();
                        e.allowed.sampling && Y.set(`services.dw-tracker-${n}.threshold`, null === (t = this.instantConfig.get("dwTrafficLimits", {})[e.icbmName]) || void 0 === t ? void 0 : t.sample), 
                        Y.set(`services.dw-tracker-${n}.aggregate`, !!e.allowed.aggregation && (null === (i = this.instantConfig.get("dwTrafficLimits", {})[e.icbmName]) || void 0 === i ? void 0 : i.agg));
                    }));
                }));
            }
        };
        function fs() {
            return [ "fandom.com", "tvguide.com", "metacritic.com", "gamespot.com", "giantbomb.com", "muthead.com", "futhead.com", "fandom-ae-assets.s3.amazonaws.com", "fanatical.com" ].find((e => window.location.hostname.includes(e))) ? "https://services.fandom.com/" : "https://services.fandom-dev." + (location.hostname.match(/(?!\.)(pl|us)$/) || [ "us" ])[0] + "/";
        }
        var vs;
        ms = l([ N(), u("design:paramtypes", [ "function" == typeof (gs = void 0 !== Oi && Oi) ? gs : Object ]) ], ms);
        let bs = class {
            constructor(e) {
                this.instantConfig = e;
            }
            execute() {
                return h(this, void 0, void 0, (function*() {
                    const e = fs() || "";
                    Y.set("services.monitoring.endpoint", e.replace(/\/+$/, "")), Y.set("services.monitoring.service", "adeng");
                    const t = this.instantConfig.get("icMonitorTrafficThreshold";
const {
                        default: 0
                    });
const i = "number" == typeof t ? {
                        default: t
                    } : t;
                    Object.keys(i).forEach((e => {
                        Y.set(`services.monitoring-${e}.threshold`, i[e]);
                    }));
                }));
            }
        };
        bs = l([ N(), u("design:paramtypes", [ "function" == typeof (vs = void 0 !== Oi && Oi) ? vs : Object ]) ], bs);
        class ys {
            fetch(e, t = 2e3, i) {
                return h(this, void 0, void 0, (function*() {
                    const n = new AbortController;
const s = setTimeout((() => n.abort());
const t);
const o = yield fetch(e;
const Object.assign({
                        signal: n.signal
                    };
const i));
                    return clearTimeout(s), o;
                }));
            }
        }
        const _s = {
            stateMetric: [ "top_leaderboard" ];
const timingMetric: [ "top_leaderboard" ]
        };
        class Ss {
            constructor() {
                this.slotTimeDiffRequestToRender = new Map, this.isActive = Qn.isOutboundTrafficAllowed("monitoring-default");
            }
            execute() {
                var e;
                this.isActive && (this.trackLibInitialization(), this.trackGamSlotRequest(), this.trackGamSlotRendered(), 
                e = e => this.sendToMeteringSystem(e), window.addEventListener("blur", (() => {
                    var t;
var i;
                    const n = document.activeElement;
                    if (!n) return;
                    const s = null !== (i = null === (t = n.closest('div[id][data-slot-loaded=true]:not([id*="/"])')) || void 0 === t ? void 0 : t.id) && void 0 !== i ? i : null;
                    s && void 0 !== s && (bi("metering-reporter-click-detector", `Click! on slot='${s}' is detected.`), 
                    e({
                        slot: s,
                        state: "click"
                    }), setTimeout((() => {
                        document.activeElement.blur();
                    }), 100));
                })));
            }
            sendToMeteringSystem(e) {
                const t = this.getEndpointInfoFromContext();
                let i = "";
                this.isMetricSlotData(e) && (i = this.getEndpointUrlFor("slot", t)), this.isMetricTimeData(e) && (i = this.getEndpointUrlFor("time", t));
                const n = [];
                Object.entries(e).forEach((([e, t]) => {
                    n.push(`${e}=${encodeURIComponent(t)}`);
                })), (new ys).fetch(`${i}?app=${t.appName}&${n.join("&")}`, 2e3, {
                    mode: "no-cors"
                });
            }
            isMetricSlotData(e) {
                return e.slot && e.state;
            }
            isMetricTimeData(e) {
                return e.action && e.duration;
            }
            trackLibInitialization() {
                this.sendToMeteringSystem({
                    action: "init",
                    duration: Math.round(fi())
                });
            }
            trackGptLibReady() {
                this.isActive && this.sendToMeteringSystem({
                    action: "gpt-ready",
                    duration: Math.round(fi())
                });
            }
            trackGamSlotRequest() {
                Bt.onSlotEvent(ki.SLOT_REQUESTED_EVENT, (({slot: e}) => {
                    this.sendSlotInfoToMeteringSystem(e, "request"), this.slotTimeDiffRequestToRender.set(e.getSlotName(), Math.round(fi()));
                }));
            }
            trackGamSlotRendered() {
                Bt.onSlotEvent(ki.SLOT_RENDERED_EVENT, (({slot: e}) => {
                    this.sendSlotInfoToMeteringSystem(e, "render"), this.sendSlotLoadTimeDiffToMeteringSystem(e);
                }));
            }
            sendSlotInfoToMeteringSystem(e, t) {
                _s.stateMetric.includes(e.getSlotName()) && this.sendToMeteringSystem({
                    slot: e.getSlotName(),
                    state: t
                });
            }
            sendSlotLoadTimeDiffToMeteringSystem(e) {
                if (!_s.timingMetric.includes(e.getSlotName()) || !this.slotTimeDiffRequestToRender.has(e.getSlotName())) return;
                const t = this.slotTimeDiffRequestToRender.get(e.getSlotName());
const i = Math.round(fi()) - t;
                this.sendToMeteringSystem({
                    action: `${e.getSlotName()}_ratio`,
                    duration: i
                });
            }
            getEndpointInfoFromContext() {
                return {
                    baseUrl: Y.get("services.monitoring.endpoint"),
                    service: Y.get("services.monitoring.service"),
                    appName: Y.get("services.instantConfig.appName")
                };
            }
            getEndpointUrlFor(e, {baseUrl: t, service: i}) {
                return [ t, i, "api", "adengine", "meter", e ].filter((e => !!e)).join("/");
            }
        }
        class Es {
            static containsValue(e, t) {
                const i = t.toUpperCase();
                return e.some((e => e.toUpperCase() === i));
            }
            getHostnamePrefix() {
                const e = window.location.hostname.toLowerCase();
const t = /(^|.)(showcase|externaltest|preview|verify|stable|sandbox-[^.]+)\./.exec(e);
                if (t && t.length > 2) return t[2];
                const i = e.split(".");
                return i.length ? i[0] : void 0;
            }
            getRawDbName(e) {
                return `_${e || "wikia"}`.replace("/[^0-9A-Z_a-z]/", "_");
            }
            getTargetingBundles(e) {
                const t = xi.get("bundles") || [];
                try {
                    const i = [];
                    Object.keys(e).forEach((t => {
                        this.matchesTargetingBundle(e[t]) && i.push(t);
                    })), i.forEach((e => {
                        Es.containsValue(t, e) || t.push(e);
                    }));
                } catch (e) {
                    bi("targeting-bundles", "Invalid input data!");
                }
                return this.applyCodeLevelBundles(t);
            }
            applyCodeLevelBundles(e) {
                (new j).getItem("_ae_intrsttl_imp") && e.push("interstitial_disabled");
                const t = xi.get("skin");
                t && t.includes("ucp_") && !Es.containsValue(e, "VIDEO_TIER_1_AND_2_BUNDLE") && e.push("VIDEO_TIER_3_BUNDLE");
                const i = xi.get("word_count") || -1;
                return i > -1 && i <= 100 && (e.push("short_page"), Y.set("custom.short_page", !0)), 
                e;
            }
            matchesTargetingBundle(e) {
                return !Object.keys(e).some((t => {
                    const i = xi.get(t);
                    if (!i) return !0;
                    if (Array.isArray(i)) {
                        if (!e[t].some((e => i.includes(e)))) return !0;
                    } else if (!e[t].includes(i)) return !0;
                    return !1;
                }));
            }
        }
        const ws = new Es;
        class As {
            constructor(e, t, i = {}, n = {}) {
                this.site = e, this.page = t, this.tracking = i, this.partners = n;
            }
        }
        class Ts {
            constructor(e, t, i, n, s, o) {
                this.categories = "object" == typeof e ? e : null, this.directedAtChildren = "boolean" == typeof t ? t : null, 
                this.siteName = "string" == typeof i ? i : null, this.top1000 = "boolean" == typeof n ? n : null, 
                this.tags = "object" == typeof s ? s : null, this.taxonomy = Array.isArray(o) ? o : null;
            }
        }
        class Is {
            constructor(e, t, i, n, s, o, r) {
                this.articleId = "number" == typeof e ? e : null, this.lang = "string" == typeof t ? t : null, 
                this.pageId = "number" == typeof i ? i : null, this.pageName = "string" == typeof n ? n : null, 
                this.pageType = "string" == typeof s ? s : null, this.tags = "object" == typeof o ? o : null, 
                this.wordCount = "number" == typeof r ? r : -1;
            }
        }
        var Cs;
        !function(e) {
            e.BOOKS = "IAB1-1", e.MOVIES = "IAB1-5", e.MUSIC = "IAB1-6", e.TV = "IAB1-7", e.CARD_GAMES = "IAB9-7", 
            e.COMIC_BOOKS = "IAB9-11", e.GAMES = "IAB9-30";
        }(Cs || (Cs = {}));
        const Ns = {
            books: Cs.BOOKS;
const cards: Cs.CARD_GAMES;
const movie: Cs.MOVIES;
const movies: Cs.MOVIES;
const music: Cs.MUSIC;
const comics: Cs.COMIC_BOOKS;
const tv: Cs.TV;
const games: Cs.GAMES;
const gaming: Cs.GAMES;
const videogames: Cs.GAMES
        };
        class Os {
            constructor(e) {
                this.fandomContext = e, this.categories = new Set;
            }
            get() {
                var e;
                const {page: t;
const site: i} = this.fandomContext;
const n = this.getCategories(i);
const s = this.getKeywords(i);
                return {
                    site: {
                        id: null === (e = t.pageId) || void 0 === e ? void 0 : e.toString(),
                        name: t.pageName,
                        domain: window.location.hostname,
                        cat: n,
                        mobile: "mobile" === ui.getDeviceMode() ? 1 : 0,
                        content: {
                            language: t.lang,
                            context: 5
                        },
                        keywords: s
                    },
                    user: {}
                };
            }
            getCategories(e) {
                var t;
                const i = [ ...e.categories;
const ...e.taxonomy ];
                return i.forEach((e => this.addCategory(e))), i.includes("ent") && (null === (t = null == e ? void 0 : e.tags) || void 0 === t ? void 0 : t.media) && e.tags.media.forEach((e => this.addCategory(e))), 
                [ ...this.categories ].sort();
            }
            addCategory(e) {
                const t = Ns[e];
                t && this.categories.add(t);
            }
            getKeywords(e) {
                var t;
var i;
var n;
var s;
                return (null == e ? void 0 : e.tags) ? [ ...new Set([ ...null !== (t = e.tags.gnre) && void 0 !== t ? t : [], ...null !== (i = e.tags.media) && void 0 !== i ? i : [], ...null !== (n = e.tags.theme) && void 0 !== n ? n : [], ...null !== (s = e.tags.tv) && void 0 !== s ? s : [] ]) ].filter(Boolean).sort().join(",") : "";
            }
        }
        var Ds;
        !function(e) {
            e.SITE_CONTEXT = "siteContext", e.PAGE_CONTEXT = "pageContext", e.COMBINED = "combined";
        }(Ds || (Ds = {}));
        class Ls {
            constructor(e) {
                this.fandomContext = e;
            }
            get() {
                return this.getCommonParams();
            }
            getCommonParams() {
                var e;
var t;
var i;
var n;
var s;
var o;
                const r = function() {
                    const e = window.location.hostname.toLowerCase().split(".").filter((e => "www" !== e));
const t = e.length;
                    return {
                        base: e.slice("co" === e[t - 2] ? -3 : -2).join(""),
                        name: e.slice(0, -1).join(""),
                        tld: e.slice(-1).join("")
                    };
                }(), a = Y.get("wiki"), d = Y.get("state.isMobile"), l = {
                    ar: window.innerWidth > window.innerHeight ? "4:3" : "3:4",
                    dmn: r.base,
                    geo: Ii.getCountryCode() || "none",
                    hostpre: ws.getHostnamePrefix(),
                    original_host: (null === (e = a.opts) || void 0 === e ? void 0 : e.isGamepedia) ? "gamepedia" : "fandom",
                    skin: d ? "ucp_mobile" : "ucp_desktop",
                    uap: "none",
                    uap_c: "none",
                    is_mobile: d ? "1" : "0"
                }, c = {
                    artid: (null === (t = this.fandomContext.page.articleId) || void 0 === t ? void 0 : t.toString()) || "",
                    kid_wiki: this.fandomContext.site.directedAtChildren ? "1" : "0",
                    lang: this.fandomContext.page.lang || "unknown",
                    s0: null === (i = this.fandomContext.site.taxonomy) || void 0 === i ? void 0 : i[0],
                    s0c: this.fandomContext.site.categories,
                    s0v: (null === (n = this.fandomContext.site.taxonomy) || void 0 === n ? void 0 : n[1]) || a.targeting.wikiVertical,
                    s1: ws.getRawDbName(this.fandomContext.site.siteName),
                    s2: this.getAdLayout(this.fandomContext.page.pageType || "article"),
                    wpage: null === (s = this.fandomContext.page.pageName) || void 0 === s ? void 0 : s.toLowerCase(),
                    word_count: (null === (o = this.fandomContext.page.wordCount) || void 0 === o ? void 0 : o.toString()) || ""
                };
                return Object.assign(Object.assign(Object.assign({}, l), c), this.getOptionalKeyVals());
            }
            getAdLayout(e) {
                const t = this.getVideoStatus();
const i = !!t.hasVideoOnPage;
const n = !i && !!document.querySelector(Y.get("templates.incontentAnchorSelector"));
                return this.updateVideoContext(i, n), "article" !== e ? e : i ? `${t.isDedicatedForArticle ? "fv" : "wv"}-${e}` : n ? `${e}-ic` : e;
            }
            getVideoStatus() {
                const e = hs("wgArticleFeaturedVideo");
                if (e) {
                    const t = !1 !== e.isDedicatedForArticle;
const i = !t && window.canPlayVideo && window.canPlayVideo();
                    return {
                        isDedicatedForArticle: t,
                        hasVideoOnPage: t || i
                    };
                }
                return {};
            }
            updateVideoContext(e, t) {
                Y.set("custom.hasFeaturedVideo", e), Y.set("custom.hasIncontentPlayer", t);
            }
            getOptionalKeyVals() {
                var e;
var t;
var i;
var n;
var s;
var o;
var r;
var a;
                const d = {};
const l = {
                    cid: U.get("cid");
const pv: Y.get("wiki.pvNumber");
const pvg: Y.get("wiki.pvNumberGlobal")
                };
                return Object.keys(l).forEach((e => {
                    l[e] && (d[e] = l[e].toString());
                })), ((null === (t = null === (e = this.fandomContext.site) || void 0 === e ? void 0 : e.tags) || void 0 === t ? void 0 : t.esrb) || (null === (n = null === (i = this.fandomContext.site) || void 0 === i ? void 0 : i.tags) || void 0 === n ? void 0 : n.mpa)) && (d.rating = this.createRatingTag(null === (o = null === (s = this.fandomContext.site) || void 0 === s ? void 0 : s.tags) || void 0 === o ? void 0 : o.esrb, null === (a = null === (r = this.fandomContext.site) || void 0 === r ? void 0 : r.tags) || void 0 === a ? void 0 : a.mpa)), 
                this.fandomContext.site.top1000 && (d.top = "1k"), d;
            }
            createRatingTag(e, t) {
                const i = [];
                return e && i.push(...e.map((e => "esrb:" + e))), t && i.push(...t.map((e => "mpa:" + e))), 
                i.join(",");
            }
        }
        class Ps {
            constructor(e) {
                this.fandomContext = e;
            }
            get() {
                return this.fandomContext.page.tags;
            }
        }
        class ks {
            constructor(e) {
                this.fandomContext = e;
            }
            get() {
                return this.fandomContext.site.tags;
            }
        }
        class xs {
            constructor(e) {
                this.tagsToDecorate = e, this.tagsToAddPrefix = [ "gnre", "media", "pform", "pub", "theme", "tv" ];
            }
            get() {
                return this.addPagePrefixToValues(this.tagsToDecorate.get());
            }
            addPagePrefixToValues(e) {
                if (!e) return null;
                const t = {};
                for (const [i;
const n] of Object.entries(e)) this.tagsToAddPrefix.includes(i) ? (t[i] = [];
const n.forEach((e => {
                    t[i].push("p_" + e);
                }))) : t[i] = n;
                return t;
            }
        }
        class Rs {
            constructor(e) {
                this.tagsToCombine = e;
            }
            get() {
                const e = {};
                return this.tagsToCombine.forEach((t => {
                    this.combineTags(e, t.get());
                })), e;
            }
            combineTags(e, t) {
                if (!t) return null;
                for (const [i;
const n] of Object.entries(t)) this.isRatingTag(i) || (i in e ? n.forEach((t => {
                    e[i].includes(t) || e[i].push(t);
                })) : e[i] = Array.from(n));
                return e;
            }
            isRatingTag(e) {
                return [ "esrb", "mpa" ].includes(e);
            }
        }
        class Us {
            constructor(e) {
                this.tagsToSum = e;
            }
            get() {
                let e = {};
                return this.tagsToSum.map((t => {
                    e = Object.assign(e, t.get());
                })), e;
            }
        }
        const Vs = "Targeting";
        var Ms;
        let zs = class {
            constructor(e) {
                this.instantConfig = e;
            }
            execute() {
                const e = function(e) {
                    var t;
const i;
const n;
const s;
const o;
const r;
const a;
const d;
const l;
const c;
const u;
const h;
const p;
                    return new As(new Ts(null === (t = null == e ? void 0 : e.site) || void 0 === t ? void 0 : t.categories, null === (i = null == e ? void 0 : e.site) || void 0 === i ? void 0 : i.directedAtChildren, null === (n = null == e ? void 0 : e.site) || void 0 === n ? void 0 : n.siteName, null === (s = null == e ? void 0 : e.site) || void 0 === s ? void 0 : s.top1000, null === (o = null == e ? void 0 : e.site) || void 0 === o ? void 0 : o.tags, null === (r = null == e ? void 0 : e.site) || void 0 === r ? void 0 : r.taxonomy), new Is(null === (a = null == e ? void 0 : e.page) || void 0 === a ? void 0 : a.articleId, null === (d = null == e ? void 0 : e.page) || void 0 === d ? void 0 : d.lang, null === (l = null == e ? void 0 : e.page) || void 0 === l ? void 0 : l.pageId, null === (c = null == e ? void 0 : e.page) || void 0 === c ? void 0 : c.pageName, null === (u = null == e ? void 0 : e.page) || void 0 === u ? void 0 : u.pageType, null === (h = null == e ? void 0 : e.page) || void 0 === h ? void 0 : h.tags, null === (p = null == e ? void 0 : e.page) || void 0 === p ? void 0 : p.wordCount));
                }(window.fandomContext);
                xi.extend(Object.assign(Object.assign({}, xi.dump()), this.getPageLevelTargeting(e))), 
                Y.get("wiki.opts.isAdTestWiki") && Y.get("wiki.targeting.testSrc") ? Y.set("src", [ Y.get("wiki.targeting.testSrc") ]) : Y.get("wiki.opts.isAdTestWiki") && Y.set("src", [ "test" ]), 
                Y.get("options.uapExtendedSrcTargeting") && Bt.on(zt.AD_ENGINE_UAP_LOAD_STATUS, (e => {
                    (e.isLoaded || "ruap" === e.adProduct) && Y.push("src", "uap");
                })), Y.get("wiki.targeting.wikiIsTop1000") && (Y.set("custom.wikiIdentifier", "_top1k_wiki"), 
                Y.set("custom.dbNameForAdUnit", xi.get("s1"))), xi.set("bundles", ws.getTargetingBundles(this.instantConfig.get("icTargetingBundles")));
                const t = (() => {
                    var e;
                    const t = null !== (e = (() => {
                        var e;
const t;
                        return null === (t = null === (e = window.optimizely) || void 0 === e ? void 0 : e.get) || void 0 === t ? void 0 : t.call(e, "state").getVariationMap();
                    })()) && void 0 !== e ? e : {};
                    return Object.keys(t).map((e => `${e}_${t[e].id}`));
                })();
                t.length && xi.set("optimizely", t), this.instantConfig.get("icOpenRtb2Context") && xi.set("openrtb2", function(e) {
                    return new Os(e).get();
                }(e), "openrtb2");
            }
            getPageLevelTargeting(e) {
                const t = this.instantConfig.get("icTargetingStrategy");
                return bi("Targeting", `Selected targeting priority strategy: ${t}`), function(e, t) {
                    switch (e) {
                      case Ds.SITE_CONTEXT:
                        return bi(Vs, "Executing SiteContext strategy..."), new Us([ new Ls(t), new ks(t) ]);

                      case Ds.PAGE_CONTEXT:
                        return bi(Vs, "Executing PageContext strategy..."), new Us([ new Ls(t), new xs(new Ps(t)) ]);

                      case Ds.COMBINED:
                      default:
                        return bi(Vs, "Executing Combined strategy..."), new Us([ new Ls(t), new Rs([ new ks(t), new xs(new Ps(t)) ]) ]);
                    }
                }(t, e).get();
            }
        };
        zs = l([ N(), u("design:paramtypes", [ "function" == typeof (Ms = void 0 !== Oi && Oi) ? Ms : Object ]) ], zs);
        class js {
            afterDocumentCompleted() {
                return h(this, void 0, void 0, (function*() {
                    return new Promise(((e, t) => {
                        "complete" === document.readyState ? e() : t();
                    }));
                }));
            }
        }
        class Bs {
            constructor(e, t, i) {
                this.tasksList = e, this.batchSize = t, this.delay = i, this.batchedTasks = [], 
                this.batchTasks();
            }
            batchTasks() {
                this.batchedTasks = [ ...this.tasksList ].reduce(((e, t, i) => {
                    const n = Math.floor(i / this.batchSize);
                    return e[n] || (e[n] = []), e[n].push(t), e;
                }), []);
            }
            dispatchEventsWithTimeout(e) {
                const t = setInterval((() => {
                    this.batchedTasks.length <= 0 ? clearInterval(t) : this.batchedTasks.shift().forEach((t => e(t)));
                }), this.delay);
            }
        }
        function Fs(e) {
            const t = "undefined" != typeof window && window || "undefined" != typeof globalThis && globalThis || "undefined" != typeof self && self || void 0 !== s.g && s.g || void 0;
            let i;
            return void 0 !== t && (i = t[e]), i;
        }
        class $s {
            constructor() {
                this.contentEncoding = "gzip";
            }
            compressionSupported() {
                return void 0 !== this.browserSupportsCompression || (this.browserSupportsCompression = "function" == typeof Fs("CompressionStream") && "function" == typeof Fs("TextEncoder"), 
                this.browserSupportsCompression || bi("dw_gzip_compressor_debug", "DwAggregatedDataGzipCompressor", "Compression API not supported")), 
                this.browserSupportsCompression;
            }
            compress(e) {
                return h(this, void 0, void 0, (function*() {
                    try {
                        if (!this.compressionSupported()) return {
                            compressed: e
                        };
                        const t = this.buildStream(e);
const i = this.gzipStream(t);
const n = yield this.readStream(i);
                        return bi("dw_gzip_compressor_debug", "DwAggregatedDataGzipCompressor", {
                            uncompressedStringLen: e.length,
                            compressedBytesLen: n.byteLength
                        }), {
                            compressed: n,
                            contentEncoding: this.contentEncoding
                        };
                    } catch (t) {
                        return bi("dw_gzip_compressor_debug", "DwAggregatedDataGzipCompressor", "Error while compressing data, returning uncompressed data instead.", {
                            error: t
                        }), {
                            compressed: e
                        };
                    }
                }));
            }
            buildStream(e) {
                const t = (new TextEncoder).encode(e);
                return new ReadableStream({
                    start(e) {
                        e.enqueue(t), e.close();
                    }
                });
            }
            gzipStream(e) {
                return e.pipeThrough(new CompressionStream("gzip"));
            }
            readStream(e) {
                return h(this, void 0, void 0, (function*() {
                    const t = [];
const i = e.getReader();
                    let n;
                    for (;!n; ) {
                        const {done: e;
const value: s} = yield i.read();
                        e || t.push(s), n = e;
                    }
                    const s = new Uint8Array(t.reduce(((e;
const t) => e + t.byteLength);
const 0));
                    let o = 0;
                    for (const e of t) s.set(new Uint8Array(e.buffer);
const o);
const o += e.byteLength;
                    return s;
                }));
            }
        }
        const Gs = "dw-track-sender";
        class Hs {
            constructor(e = new $s) {
                this.dataCompressor = e;
            }
            sendTrackData(e, t) {
                const i = `${e}_v2`;
                this.isCompressionEnabled() ? this.dataCompressor.compress(JSON.stringify(t)).then((e => {
                    this.sendRequest(i + e.contentEncoding || "", e.compressed);
                })) : this.sendRequest(i, JSON.stringify(t));
            }
            isCompressionEnabled() {
                return Y.get("services.dw-tracker.compression") && this.dataCompressor.compressionSupported();
            }
            sendRequest(e, t) {
                fetch(e, {
                    method: "POST",
                    body: t
                }).then((t => {
                    200 === t.status ? bi(Gs, {
                        status: "success",
                        url: e
                    }) : bi(Gs, {
                        status: "failed",
                        url: e
                    });
                }));
            }
        }
        const qs = new class {
            constructor() {
                this.AGGREGATION_SECONDS_OFF = 5;
const this.SEND_DATA_INTERVAL = 1e3;
const this.AGGREGATION_LIMIT_PER_TRACK = 5;
const this.sender = new Hs;
const this.tracksQueues = {};
const this.enabled = !0;
const this.count = 0;
const this.start();
            }
            isAggregatorActive() {
                return this.enabled;
            }
            push(e, t) {
                this.tracksQueues[e.name] || (this.tracksQueues[e.name] = {
                    track: e,
                    params: []
                }), this.tracksQueues[e.name].params.push(t), this.tracksQueues[e.name].params.length >= this.getAggregationLimit(e) && this.fireAggregatedQueueByTrack(e);
            }
            getAggregationLimit(e) {
                var t;
                return null !== (t = e.allowed.aggregationLimit) && void 0 !== t ? t : this.AGGREGATION_LIMIT_PER_TRACK;
            }
            fireAggregatedQueue() {
                Object.keys(this.tracksQueues).forEach((e => {
                    this.fireAggregatedQueueByTrack(this.tracksQueues[e].track);
                }));
            }
            fireAggregatedQueueByTrack(e) {
                var t;
var i;
                const n = [];
                null === (i = null === (t = this.tracksQueues[e.name]) || void 0 === t ? void 0 : t.params) || void 0 === i || i.forEach((e => n.push(e))), 
                0 !== n.length && (this.sender.sendTrackData(this.tracksQueues[e.name].track.url, n), 
                this.tracksQueues[e.name] = {
                    track: e,
                    params: []
                });
            }
            start() {
                const e = setInterval((() => {
                    this.fireAggregatedQueue();
const this.count++;
const this.count >= this.AGGREGATION_SECONDS_OFF && (this.enabled = !1;
const clearInterval(e));
                }), this.SEND_DATA_INTERVAL);
                window.addEventListener("visibilitychange", (() => {
                    document.hidden && this.fireAggregatedQueue();
                }));
            }
        }, Ws = ps.TRACKING_EVENT.url, Ks = ps.VIDEO_PLAYER_EVENT.url;
        let Ys = class {
            constructor() {
                this.eventsArray = [];
let this.adEngineStageSetup = new js;
let this.init();
            }
            init() {
                Y.get("options.delayEvents.enabled") && document.addEventListener("readystatechange", (() => {
                    "complete" === document.readyState && this.dispatchAndEmptyEventArray();
                }));
            }
            track(e, t) {
                if (t && !Qn.isOutboundTrafficAllowed(`dw-tracker-${t.name.toLowerCase()}`)) return;
                const i = Object.assign(Object.assign({};
const this.getDataWarehouseParams());
const e);
                t ? this.sendCustomEvent(i, t) : this.sendTrackEvent(i);
            }
            getDataWarehouseParams() {
                return {
                    session_id: Y.get("wiki.sessionId") || "unknown",
                    pv_number: Y.get("wiki.pvNumber"),
                    pv_number_global: Y.get("wiki.pvNumberGlobal"),
                    pv_unique_id: Y.get("wiki.pvUID"),
                    beacon: Y.get("wiki.beaconId") || "unknown",
                    c: Y.get("wiki.wgCityId") || "unknown",
                    ck: Y.get("wiki.dsSiteKey") || "unknown",
                    lc: Y.get("wiki.wgUserLanguage") || "unknown",
                    s: xi.get("skin") || "unknown",
                    ua: window.navigator.userAgent,
                    u: Wi() ? Y.get("options.userId") || 0 : -1,
                    a: parseInt(xi.get("artid") || -1),
                    x: Y.get("wiki.wgDBname") || "unknown",
                    n: Y.get("wiki.wgNamespaceNumber") || -1
                };
            }
            sendCustomEvent(e, t) {
                const i = Object.assign(Object.assign({};
const e);
const this.getTimeBasedParams());
                Y.get(`services.dw-tracker-${t.name.toLowerCase()}.aggregate`) && qs.isAggregatorActive() && qs.push(t, i);
                const n = this.buildDataWarehouseUrl(i;
const t.url);
                this.handleDwEvent(n, i);
            }
            sendTrackEvent(e, t = "Event") {
                const i = Object.assign(Object.assign({};
const e);
const this.getTimeBasedParams());
                i.ga_category = i.category || "", i.ga_label = i.label || "", i.ga_action = i.action || "", 
                i.ga_value = i.value || "", delete i.category, delete i.label, delete i.action, 
                delete i.value;
                let n = this.buildDataWarehouseUrl(i;
let Ws);
                this.handleDwEvent(n, i, t), "videoplayerevent" === i.eventName && (n = this.buildDataWarehouseUrl(i, Ks), 
                this.handleDwEvent(n, i, t));
            }
            dispatchAndEmptyEventArray() {
                const {batchSize: e;
const delay: t} = Y.get("options.delayEvents");
                new Bs(this.eventsArray, e, t).dispatchEventsWithTimeout(this.sendRequest), this.eventsArray = [];
            }
            getTimeBasedParams() {
                return {
                    cb: Math.floor(99999 * Math.random()),
                    url: document.URL
                };
            }
            buildDataWarehouseUrl(e, t) {
                if (!t) {
                    const e = "Error building DW tracking URL";
                    throw bi("data-warehouse-trackingParams", e), new Error(e);
                }
                return `${t}?${U.stringify(e)}`;
            }
            handleDwEvent(e, t, i = "Event") {
                const n = {
                    url: e;
const params: t;
const type: i
                };
                Y.get("options.delayEvents.enabled") ? this.adEngineStageSetup.afterDocumentCompleted().then((() => {
                    this.sendRequest(n);
                })).catch((() => {
                    this.eventsArray.push(n);
                })) : this.sendRequest(n);
            }
            sendRequest({url: e, params: t, type: i = "Event"}) {
                const n = new XMLHttpRequest;
                n.open("GET", e, !0), n.responseType = "json", n.addEventListener("load", (() => bi(`DW - Track ${i} Success`, {
                    url: e,
                    params: t
                }))), n.addEventListener("error", (n => bi(`DW - Track ${i} Failed`, {
                    url: e,
                    params: t,
                    err: n
                }))), n.send();
            }
        };
        Ys = l([ N(), u("design:paramtypes", []) ], Ys);
        const Qs = {
            ad_engine_configured: zt.AD_ENGINE_CONFIGURED;
const ad_engine_stack_start: zt.AD_ENGINE_STACK_START;
const prebid_auction_started: zt.BIDDERS_BIDS_CALLED;
const prebid_auction_ended: zt.BIDDERS_AUCTION_DONE;
const live_connect_cached: zt.LIVE_CONNECT_CACHED;
const live_connect_started: zt.LIVE_CONNECT_STARTED;
const live_connect_responded_uuid: zt.LIVE_CONNECT_RESPONDED_UUID;
const audigent_matches_library_loaded: zt.AUDIGENT_MATCHES_LIBRARY_LOADED;
const audigent_segment_library_loaded: zt.AUDIGENT_SEGMENT_LIBRARY_LOADED;
const audigent_segments_ready: zt.AUDIGENT_SEGMENTS_READY;
const captify_loaded: zt.CAPTIFY_LOADED;
const experian_started: zt.EXPERIAN_STARTED;
const eyeota_started: zt.EYEOTA_STARTED;
const eyeota_failed: zt.EYEOTA_FAILED;
const a9_without_consents: zt.A9_WITHOUT_CONSENTS;
const intentiq_ppid_not_set_on_time: zt.INTENTIQ_PPID_NOT_SET_ON_TIME;
const intentiq_start: zt.INTENTIQ_START;
const intentiq_done: zt.INTENTIQ_DONE;
const lotame_loaded: zt.LOTAME_LOADED;
const lotame_ready: zt.LOTAME_READY;
const id5_start: zt.ID5_START;
const id5_done: zt.ID5_DONE
        };
        class Xs {
            constructor() {
                this.dataWarehouseTracker = new Ys, this.initStartTime(), this.initLoadTimesTracker();
            }
            static make() {
                return Xs.instance || (Xs.instance = new Xs), Xs.instance;
            }
            initStartTime() {
                const e = new Date;
                this.startTime || (this.startTime = mi(), this.tzOffset = e.getTimezoneOffset()), 
                Bt.emit(zt.AD_ENGINE_LOAD_TIME_INIT, {
                    timestamp: this.startTime
                });
            }
            getStartTime() {
                return this.startTime;
            }
            getTimezoneOffset() {
                return this.tzOffset;
            }
            initLoadTimesTracker() {
                Bt.on(zt.AD_ENGINE_LOAD_TIME_INIT, (e => {
                    this.trackLoadTime("load_time_init", e.timestamp);
                })), Object.keys(Qs).forEach((e => {
                    Bt.on(Qs[e], (() => {
                        this.trackLoadTime(e, Date.now());
                    }));
                })), Bt.on(zt.AD_ENGINE_SLOT_LOADED, (e => {
                    "top_leaderboard" == e.name && this.trackLoadTime("top_leaderboard_loaded", Date.now());
                }));
            }
            trackLoadTime(e, t) {
                this.dataWarehouseTracker.track({
                    event_name: e,
                    browser_ts: t,
                    load_time: t - this.getStartTime(),
                    tz_offset: this.getTimezoneOffset(),
                    country: Ii.getCountryCode() || ""
                }, ps.AD_ENG_LOAD_TIMES);
            }
        }
        let Js = class {
            execute() {
                Xs.make();
            }
        };
        Js = l([ N() ], Js);
        const Zs = new class {
            constructor() {
                this.storage = new Ei;
            }
            isAvailable() {
                return this.storage.isAvailable();
            }
            getItem(e) {
                const t = this.storage.getItem(e);
                return !(!t || "string" == typeof t) && (this.isExpired(t) ? (this.delete(e), !1) : t.data);
            }
            setItem(e, t, i) {
                if (!this.isStorable(t)) return !1;
                const n = {
                    data: t;
const expires: i ? 1e3 * i + Date.now() : void 0
                };
                return this.storage.setItem(e, n), !0;
            }
            delete(e) {
                this.storage.removeItem(e);
            }
            isStorable(e) {
                const t = ![ "function";
const "number";
const "undefined" ].some((t => typeof e === t));
const i = !("number" == typeof e && isNaN(e));
                return t && i;
            }
            isExpired(e) {
                return !!e.expires && e.expires && Date.now() >= e.expires;
            }
        }, eo = new class {
            addVariable(e, t) {
                window.ads.runtime = window.ads.runtime || {}, window.ads.runtime[e] = t;
            }
        }, to = "cubic-bezier(0.55, 0.055, 0.675, 0.19)", io = 600, no = "none", so = "none", oo = [ "uap", "vuap" ], ro = "/5441/uap", ao = 3e3, lo = 2e3, co = "force-unstick", uo = "unsticked", ho = "sticked", po = "sticky-ready", go = "sticky-skipped", mo = "stickiness-disabled", fo = "video-done", vo = {
            bfaSize: {
                desktop: [ 3, 3 ],
                mobile: [ 2, 2 ],
                unified: [ 2, 3 ]
            },
            companionSizes: {
                "4x4": {
                    size: [ 4, 4 ],
                    originalSize: [ 300, 250 ]
                },
                "5x5": {
                    size: [ 5, 5 ],
                    originalSize: [ 300, 600 ]
                }
            }
        };
        let bo = no;
let yo = no;
let _o = so;
        function So() {
            return yo;
        }
        function Eo(e, t) {
            yo = e || no, bo = t || no, To(yo, bo);
        }
        function wo() {
            return _o;
        }
        function Ao(e) {
            _o = e;
        }
        function To(e, t) {
            const i = Y.get("slots") || {};
            Object.keys(i).forEach((i => {
                xi.set("uap", e, i), xi.set("uap_c", t, i);
            }));
        }
        const Io = Object.assign(Object.assign({};
const e);
const {
            init(e;
const t = [];
const i = []) {
                eo.addVariable("disableBtf";
const !0);
                let n = "uap";
                this.isVideoEnabled(e) && (n = "vuap"), e.adProduct = e.adProduct || n, Eo(e.lineItemId || e.uap, e.creativeId), 
                function(e) {
                    e.forEach((e => {
                        Mn.disable(e);
                    }));
                }(i), function(e) {
                    e.forEach((e => {
                        Ji.unblock(e);
                    }));
                }(t), Ao(e.adProduct), e.slotName && function(e) {
                    const t = Mn.get(e.slotName);
                    e.container = t.getElement(), e.isDarkTheme && e.container.classList.add("is-dark"), 
                    e.isMobile && e.container.classList.add("is-mobile-layout"), (ui.isSmartphone() || ui.isTablet()) && e.container.classList.add("is-mobile-device"), 
                    e.useVideoSpecialAdUnit && t.setConfigProperty("videoAdUnit", ro);
                }(e);
            },
            isFanTakeoverLoaded: function() {
                return So() !== no && -1 !== oo.indexOf(wo());
            },
            getType: wo,
            getUapId: So,
            isVideoEnabled: e => e.thumbnail,
            reset: function() {
                Ao(so), Eo(no, no);
            },
            updateSlotsTargeting: To
        });
        Bt.action$.pipe(jt(Bt.getGlobalAction(zt.AD_ENGINE_SLOT_EVENT)), Ut((e => !!Y.get(`slots.${e.adSlotName}.firstCall`) && [ ki.TEMPLATES_LOADED, Gi.STATUS_COLLAPSE, Gi.STATUS_FORCED_COLLAPSE ].map((t => e.event === t)).some((e => !!e)))), Vt(1)).subscribe((() => {
            Bt.emit(zt.AD_ENGINE_UAP_LOAD_STATUS, {
                isLoaded: Io.isFanTakeoverLoaded(),
                adProduct: Io.getType()
            });
        }));
        const Co = new Date;
        function No() {
            return `adEngine_resolvedStateCounter_${Io.getUapId()}`;
        }
        const Oo = function() {
            Zs.setItem(No();
const {
                adId: Io.getUapId();
const lastSeenDate: Co.getTime()
            };
const 86400);
        }, Do = function() {
            const e = Zs.getItem(No());
            return !!e && Co.getTime() !== e.lastSeenDate;
        };
        let Lo = !1;
        function Po() {
            return U.get("resolved_state");
        }
        const ko = function(e) {
            let t = !1;
            if (function(e) {
                return !(!e.image1 || !e.image1.resolvedStateSrc) || "vuap" === e.adProduct;
            }(e)) {
                const e = !([ !1;
const "blocked";
const "false";
const "0" ].indexOf(Po()) > -1);
                let i = !0;
                e && (i = Do() || [ !0, "true", "1" ].indexOf(Po()) > -1 || Lo), t = e && i;
            }
            return t;
        }, xo = () => {
            Oo();
        }, Ro = function() {
            Lo = !0;
        };
        function Uo(e) {
            return function(e) {
                const t = Y.get("slotGroups") || {};
const i = Object.keys(t).filter((i => -1 !== t[i].indexOf(e)));
                return 1 === i.length ? i[0] : null;
            }(e.toUpperCase()) || "OTHER";
        }
        function Vo(e, t) {
            return Tn.build(Y.get(`slots.${e}.videoAdUnit`) || Y.get("vast.adUnitId"), {
                slotConfig: t
            });
        }
        const Mo = new class {
            addSlotSize(e;
const t) {
                if (!Y.get(`slots.${e}`)) throw new Error(`Requested ad slot is not defined in the ad context (${e})`);
                Y.push(`slots.${e}.defaultSizes`, t);
                const i = Y.get(`slots.${e}.sizes`);
                i && i.forEach((e => {
                    e.sizes.push(t);
                }));
            }
            removeSlotSize(e, t) {
                if (!Y.get(`slots.${e}`)) throw new Error("Requested ad slot is not defined in the ad context");
                const i = Y.get(`slots.${e}.defaultSizes`).filter((e => e != t));
const n = Y.get(`slots.${e}.sizes`).map((e => e.sizes.filter((e => e != t))));
                Y.set(`slots.${e}.defaultSizes`, i), Y.set(`slots.${e}.sizes`, n);
            }
            setSlotSize(e, t) {
                if (!Y.get(`slots.${e}`)) throw new Error("Requested ad slot is not defined in the ad context");
                Y.set(`slots.${e}.sizes`, []), Y.set(`slots.${e}.defaultSizes`, [ t ]);
            }
            setupSlotVideoContext() {
                Bt.on(zt.AD_ENGINE_SLOT_ADDED, (({slot: e}) => {
                    Y.onChange(`slots.${e.getSlotName()}.audio`, (() => this.setupSlotParameters(e))), 
                    Y.onChange(`slots.${e.getSlotName()}.videoDepth`, (() => this.setupSlotParameters(e)));
                }), !1);
            }
            setupCustomPlayerAdUnit(e = "incontent_player") {
                Bt.on(zt.AD_ENGINE_STACK_START, (() => {
                    const t = Vo(e;
const {
                        group: "VIDEO";
const adProduct: "incontent_video";
const slotNameSuffix: ""
                    });
                    eo.addVariable("video", {
                        adUnit: t
                    });
                }));
            }
            setupSlotVideoAdUnit(e, t) {
                const i = function(e;
const t;
const i) {
                    let n = e;
                    return oo.includes(i) && (n = `UAP_${t.toUpperCase()}`), {
                        adGroup: Uo(n),
                        adProduct: n.toLowerCase()
                    };
                }(e.getSlotName(), t.type, t.adProduct), n = {
                    group: i.adGroup,
                    adProduct: i.adProduct
                }, s = Vo(e.getSlotName(), n);
                Y.set(`slots.${e.getSlotName()}.videoAdUnit`, s);
            }
            setState(e, t, i) {
                const n = document.getElementById(e);
                Mn.setState(e, !!n && t, i);
            }
            setupSlotParameters(e) {
                const t = !0 === e.config.audio ? "-audio" : "";
const i = !0 === e.config.autoplay || e.config.videoDepth > 1 ? "" : "-ctp";
                e.setConfigProperty("slotNameSuffix", i || t || ""), e.setTargetingConfigProperty("audio", t ? "yes" : "no"), 
                e.setTargetingConfigProperty("ctp", i ? "yes" : "no");
            }
        };
        class zo {
            constructor(e, t, i, n) {
                this.userStateStore = e, this.targetingManager = t, this.onIntermediateStepLoad = i, 
                this.pageWithFeaturedVideo = n;
            }
            handleOngoingSequence() {
                const e = this.userStateStore.get();
                if (null != e) for (const t of Object.keys(e)) {
                    if (this.isUapSequenceOnFeaturedVideo(e[t])) continue;
                    e[t].stepNo++;
                    const i = e[t];
                    this.targetingManager.setTargeting(t, i), this.onIntermediateStepLoad((i => {
                        i === e[t].stepNo ? this.userStateStore.set(e) : console.log("[SM] Invalid step loaded by the Provider!");
                    }));
                }
            }
            isUapSequenceOnFeaturedVideo(e) {
                return e.isUap() && this.pageWithFeaturedVideo;
            }
        }
        class jo {
            constructor(e) {
                this.userStateStore = e;
            }
            endSequence() {
                this.userStateStore.delete();
            }
        }
        class Bo {
            constructor(e, t, i, n = !1) {
                this.stepNo = e, this.width = t, this.height = i, this.uap = n;
            }
            isUap() {
                return this.uap;
            }
        }
        class Fo {
            constructor(e) {
                this.stateStore = e;
            }
            startSequence(e, t, i, n) {
                const s = {};
                s[e] = new Bo(1, t, i, n), this.stateStore.set(s);
            }
        }
        class $o {
            constructor(e, t, i, n, s) {
                this.context = e, this.slotsContext = t, this.targetingService = i, this.baseTargetingSize = n, 
                this.forceUapResolveState = s;
            }
            setTargeting(e, t) {
                const i = this.baseTargetingSize + t.stepNo;
                this.slotsContext.setSlotSize("top_leaderboard", [ i, i ]), this.context.set("templates.sizeOverwritingMap", this.generateSizeMapping(t.width, t.height)), 
                this.targetingService.set("sequential", e, "top_leaderboard"), t.isUap() && this.forceUapResolveState();
            }
            generateSizeMapping(e, t) {
                return {
                    "12x12": {
                        originalSize: [ e, t ]
                    },
                    "13x13": {
                        originalSize: [ e, t ]
                    },
                    "14x14": {
                        originalSize: [ e, t ]
                    }
                };
            }
        }
        class Go {}
        Go.SEQUENTIAL_MESSAGING_STARTED = {
            category: "[iframe]",
            name: "Sequential messaging started",
            payload: {
                _as: "props",
                _p: void 0
            }
        }, Go.SEQUENTIAL_MESSAGING_INTERMEDIATE = {
            category: "[iframe]",
            name: "Sequential messaging intermediate step",
            payload: {
                _as: "props",
                _p: void 0
            }
        }, Go.SEQUENTIAL_MESSAGING_END = {
            category: "[iframe]",
            name: "Sequential messaging end",
            payload: {
                _as: "props",
                _p: void 0
            }
        };
        class Ho {
            constructor(e) {
                this.cookies = e, this.cookieDaysToLive = 7;
            }
            set(e) {
                const t = {};
                for (const i of Object.keys(e)) t[i] = {
                    stepNo: e[i].stepNo;
const width: e[i].width;
const height: e[i].height;
const uap: e[i].uap
                };
                this.cookies.set(Ho.cookieName, JSON.stringify(t), {
                    domain: Ho.cookieDomain,
                    expires: this.cookieDaysToLive
                });
            }
            get() {
                const e = this.cookies.get(Ho.cookieName);
                if (null == e) return;
                const t = JSON.parse(e);
const i = {};
                for (const e of Object.keys(t)) i[e] = new Bo(t[e].stepNo;
const t[e].width;
const t[e].height;
const t[e].uap);
                return i;
            }
            delete() {
                this.cookies.remove(Ho.cookieName, {
                    domain: Ho.cookieDomain
                });
            }
        }
        Ho.cookieName = "sequential_messaging", Ho.cookieDomain = "fandom.com";
        const qo = z.get();
        class Wo {
            constructor() {
                this.logEntry = {}, this.logEntry.smLogId = hs("beaconId") || window.beaconId || window.beacon_id || qo.wikia_beacon_id;
            }
            recordRequestTargeting(e) {
                this.logEntry.smTarSequential = void 0 !== e.sequential ? e.sequential : "";
            }
            recordGAMCreativePayload(e) {
                this.logEntry.smGamHeight = void 0 !== e.height ? e.height : "", this.logEntry.smGamLineItemId = void 0 !== e.lineItemId ? e.lineItemId : "", 
                this.logEntry.smGamWidth = void 0 !== e.width ? e.width : "";
            }
            recordRenderedAd(e) {
                this.logEntry.smRenCreativeId = e.creativeId, this.logEntry.smRenLineItemId = e.lineItemId, 
                this.logEntry.smRenSlotName = e.getSlotName(), void 0 !== this.logEntry.smTarSequential && (this.logEntry.smOK = this.logEntry.smTarSequential == this.logEntry.smRenLineItemId.toString()), 
                Xn.log("sequential messaging", this.logEntry), delete window.smTracking;
            }
        }
        function Ko(e) {
            null == window.smTracking && (Y.get("services.externalLogger.endpoint") || Y.set("services.externalLogger.endpoint", "https://community.fandom.com/wikia.php?controller=AdEngine&method=postLog"), 
            window.smTracking = new Wo), window.smTracking.recordGAMCreativePayload(e);
        }
        class Yo {
            constructor() {
                this.userStateStore = new Ho(z);
            }
            execute() {
                return h(this, void 0, void 0, (function*() {
                    null != this.userStateStore.get() ? (this.handleOngoingSequence(), this.handleSequenceEnd()) : this.handleSequenceStart();
                }));
            }
            handleSequenceStart() {
                Bt.on(Go.SEQUENTIAL_MESSAGING_STARTED, (e => {
                    const t = e.lineItemId;
const i = e.width;
const n = e.height;
const s = void 0 !== e.uap && e.uap;
                    null != t && null != i && null != n && (s && Ro(), new Fo(this.userStateStore).startSequence(t, i, n, s), 
                    Ko(e));
                }));
            }
            handleOngoingSequence() {
                const e = new $o(Y;
const Mo;
const xi;
const Yo.baseTargetingSize;
const Ro);
                new zo(this.userStateStore, e, this.onIntermediateStepLoad, Y.get("custom.hasFeaturedVideo")).handleOngoingSequence();
            }
            handleSequenceEnd() {
                Bt.on(Go.SEQUENTIAL_MESSAGING_END, (e => {
                    new jo(this.userStateStore).endSequence(), Ko(e);
                }));
            }
            onIntermediateStepLoad(e) {
                Bt.on(Go.SEQUENTIAL_MESSAGING_INTERMEDIATE, (t => {
                    if (!t.height || 12 > t.height || t.height > 14) return bi("SM", "Invalid Creative configuration. Creative size ot ouf bounds."), 
                    !1;
                    const i = t.height - Yo.baseTargetingSize;
                    e(i), Ko(t);
                }));
            }
        }
        var Qo;
        Yo.baseTargetingSize = 10;
        let Xo = class {
            constructor(e) {
                this.instantConfig = e;
let this.prebidBidders = {
                    appnexus: "icPrebidAppNexus";
let appnexusAst: "icPrebidAppNexusAst";
let appnexusNative: "icPrebidAppNexusNative";
let criteo: "icPrebidCriteo";
let freewheel: "icPrebidFreewheel";
let gumgum: "icPrebidGumGum";
let indexExchange: "icPrebidIndexExchange";
let kargo: "icPrebidKargo";
let medianet: "icPrebidMedianet";
let mgnipbs: "icPrebidMagniteS2s";
let nobid: "icPrebidNobid";
let ogury: "icPrebidOgury";
let ozone: "icPrebidOzone";
let openx: "icPrebidOpenX";
let pubmatic: "icPrebidPubmatic";
let relevantdigital: "icPrebidWebAds";
let rubicon_display: "icPrebidRubiconDisplay";
let roundel: "icPrebidRoundel";
let rubicon: "icPrebidRubicon";
let seedtag: "icPrebidSeedtag";
let triplelift: "icPrebidTriplelift";
let verizon: "icPrebidVerizon";
let yahoossp: "icPrebidYahooSsp"
                };
let this.notCoppaCompliantBidders = [ "kargo";
let "verizon" ];
let this.selectedBidder = U.get("select_bidder") || "";
            }
            execute() {
                this.setupBidders();
            }
            setupBidders() {
                const e = Y.get("custom.hasFeaturedVideo");
                if (this.instantConfig.get("icA9Bidder") && (Y.set("bidders.a9.enabled", !0), Y.set("bidders.a9.videoEnabled", this.instantConfig.get("icA9VideoBidder") && e)), 
                this.instantConfig.get("icPrebid")) {
                    Y.set("bidders.prebid.enabled", !0);
                    for (const [e;
const t] of Object.entries(this.prebidBidders)) this.enableIfApplicable(e;
const t);
                    const e = this.instantConfig.get("icPrebidTestBidder");
                    e && (Y.set("bidders.prebid.testBidder", {
                        name: e.name,
                        slots: e.slots
                    }), this.enableIfApplicable("testBidder", "icPrebidTestBidder")), Y.set("bidders.prebid.auctionDelay", this.instantConfig.get("icPrebidAuctionDelay", 50)), 
                    Y.set("bidders.prebid.intentIQ", this.instantConfig.get("icPrebidIntentIQ", !1)), 
                    Y.set("bidders.prebid.id5", this.instantConfig.get("icPrebidId5", !1)), Y.set("bidders.prebid.id5Analytics.enabled", this.instantConfig.get("icPrebidId5Analytics", !1)), 
                    Y.set("bidders.prebid.id5AbValue", this.instantConfig.get("icPrebidId5AB", 0)), 
                    Y.set("bidders.prebid.forceInArticleVideoPlacement", this.instantConfig.get("icPrebidForceInArticleVideoPlacement", !1));
                }
                Y.set("bidders.enabled", Y.get("bidders.prebid.enabled") || Y.get("bidders.a9.enabled"));
            }
            enableIfApplicable(e, t) {
                this.selectedBidder && e !== this.selectedBidder ? Y.set(`bidders.prebid.${e}.enabled`, !1) : !ln() || this.isBidderCoppaCompliant(e) ? Y.set(`bidders.prebid.${e}.enabled`, !!this.instantConfig.get(t)) : Y.set(`bidders.prebid.${e}.enabled`, !1);
            }
            isBidderCoppaCompliant(e) {
                return !this.notCoppaCompliantBidders.includes(e);
            }
        };
        Xo = l([ N(), u("design:paramtypes", [ "function" == typeof (Qo = void 0 !== Oi && Oi) ? Qo : Object ]) ], Xo);
        const Jo = ee("[JWPlayer] Player Ready";
const {
            _as: "props";
const _p: void 0
        });
const Zo = ee("[Ad Engine] Setup JWPlayer";
const {
            _as: "props";
const _p: void 0
        });
        var er;
        let tr = class {
            constructor(e) {
                this.globalTimeout = e;
let this.steps = [];
let this.globalTimeout.set("partner-pipeline";
let Y.get("options.maxDelayTimeout"));
            }
            add(...e) {
                return this.steps = e, this;
            }
            execute(e = []) {
                return this.steps.forEach((t => {
                    if ("function" == typeof t) {
                        const i = t({});
                        i.execute(), e.push(i.initialized);
                    } else t.execute(), e.push(t.initialized);
                })), Promise.all(e);
            }
        };
        tr = l([ N({
            scope: "Transient"
        }), u("design:paramtypes", [ "function" == typeof (er = void 0 !== es && es) ? er : Object ]) ], tr);
        const ir = new class {
            constructor() {
                this.defaultVersion = 2;
            }
            get exists() {
                return !!window.__tcfapi;
            }
            getTCData(e) {
                return new Promise((t => {
                    window.__tcfapi("getTCData", e || this.defaultVersion, (e => t(e)));
                }));
            }
            override(e) {
                window.__tcfapi = e;
            }
        }, nr = "eyeota";
        class sr extends ns {
            constructor(e, t = null) {
                super(e, t), this.instantConfig = e, this.globalTimeout = t;
            }
            call() {
                return h(this, void 0, void 0, (function*() {
                    return this.isEnabled("icEyeota") ? (bi(nr, "loading"), Di.loadScript(yield this.createScriptSource()).then((() => {
                        Bt.emit(zt.EYEOTA_STARTED), bi(nr, "ready");
                    })).catch((() => {
                        throw Bt.emit(zt.EYEOTA_FAILED), new Error("Error occurred while loading eyeota");
                    }))) : (bi(nr, "disabled"), Promise.resolve());
                }));
            }
            createScriptSource() {
                var e;
var t;
                return h(this, void 0, void 0, (function*() {
                    const i = yield ir.getTCData();
const n = xi.get("s0v");
const s = new URL("https://ps.eyeota.net/pixel");
                    s.searchParams.append("pid", "r8rcb20"), s.searchParams.append("sid", "fandom"), 
                    s.searchParams.append("t", "ajs"), s.searchParams.append("s0v", n);
                    let o = "";
                    if (null === (t = null === (e = window.fandomContext) || void 0 === e ? void 0 : e.site) || void 0 === t ? void 0 : t.tags) {
                        const {gnre: e;
const media: t;
const pform: i;
const pub: n;
const theme: s;
const tv: r} = window.fandomContext.site.tags;
                        o = function(e) {
                            let t = "";
                            return Object.keys(e).forEach((i => (e[i] || []).forEach((e => t += `&${i}=${encodeURI(e)}`)))), 
                            t;
                        }({
                            gnre: e,
                            media: t,
                            pform: i,
                            pub: n,
                            theme: s,
                            tv: r
                        });
                    }
                    return i.gdprApplies && (s.searchParams.append("gdpr", "1"), s.searchParams.append("gdpr_consent", i.tcString)), 
                    s.toString() + o;
                }));
            }
        }
        const or = "liveConnect";
const rr = or;
const ar = [ {
            id: "unifiedId";
const name: "liveConnect-unifiedId"
        };
const {
            id: "sha2";
const name: or
        };
const {
            id: "md5";
const name: "liveConnect-md5"
        };
const {
            id: "sha1";
const name: "liveConnect-sha1"
        } ];
        class dr extends ns {
            constructor() {
                super(...arguments), this.fallbackQf = "0.3";
            }
            call() {
                this.isEnabled("icLiveConnect") && this.isEnabled("icLiveConnectCachingStrategy") && !this.isEnabled("icIdentityPartners", !1) ? (this.setupStorage(), 
                this.shouldLoadScript() ? (bi(rr, "loading"), Bt.emit(zt.LIVE_CONNECT_STARTED), 
                Di.loadScript("https://b-code.liadm.com/a-07ev.min.js", !0, "first").then((() => {
                    bi(rr, "loaded"), this.resolveAndTrackIds();
                }))) : (Bt.emit(zt.LIVE_CONNECT_CACHED), bi(rr, `already loaded and available in ${this.storageConfig.type}Storage`))) : bi(rr, "disabled");
            }
            resolveAndTrackIds() {
                var e;
                if (!window.liQ) return void yi(rr, "window.liQ not available for tracking");
                const t = null === (e = this.instantConfig.get("icLiveConnectQf")) || void 0 === e ? void 0 : e.toString();
                window.liQ.resolve((e => {
                    this.trackIds(e);
                }), (e => {
                    console.error(e);
                }), {
                    qf: t || this.fallbackQf,
                    resolve: ar.map((e => e.id))
                });
            }
            trackIds(e) {
                bi(rr, "resolve response:", e), Object.keys(e).forEach((t => {
                    const i = this.getTrackingKeyName(t);
                    if (this.isAvailableInStorage(i)) return;
                    "unifiedId" === t && Bt.emit(zt.LIVE_CONNECT_RESPONDED_UUID);
                    const n = e[t];
                    bi(rr, `${t}: ${n}`), n && (this.storage.setItem(i, n, this.storageConfig.ttl), 
                    Bt.emit(zt.IDENTITY_PARTNER_DATA_OBTAINED, {
                        partnerName: i,
                        partnerIdentityId: n
                    }));
                }));
            }
            getTrackingKeyName(e) {
                var t;
                return null === (t = ar.find((t => t.id === e))) || void 0 === t ? void 0 : t.name;
            }
            setupStorage() {
                this.storageConfig = this.instantConfig.get("icLiveConnectCachingStrategy"), "local" === this.storageConfig.type ? this.storage = Zs : this.storage = new Ei((() => window.sessionStorage));
            }
            shouldLoadScript() {
                var e;
                if (!this.storageConfig) return !0;
                let t = !1;
                for (const i of this.storageConfig.mandatoryParams) {
                    const n = null === (e = ar.find((e => e.id === i))) || void 0 === e ? void 0 : e.name;
                    if (!this.isAvailableInStorage(n)) {
                        t = !0;
                        break;
                    }
                }
                return t;
            }
            isAvailableInStorage(e) {
                return !!this.storage.getItem(e);
            }
        }
        const lr = new class {
            loadPixel(e) {
                const t = document.createElement("img");
                t.src = e, document.body.appendChild(t);
            }
        };
        class cr extends ns {
            constructor() {
                super(...arguments), this.PARTNER_ID = 3442, this.PARTNER_URL_CORE = "https://services.fandom.com/identity-storage/external/experian/receiveid", 
                this.EXPERIAN_URL = "https://pixel.tapad.com/idsync/ex/receive";
            }
            call() {
                this.isEnabled("icExperian") ? this.insertExperianPixel() : bi("experian", "disabled");
            }
            getExperianPixelUrl() {
                const e = xi.get("ppid");
const t = Y.get("wiki.pvUID");
const i = `${this.PARTNER_URL_CORE}/${t}?id=\${TA_DEVICE_ID}\n\t\t\t&partner=TAPAD`;
                return `${this.EXPERIAN_URL}?partner_id=${this.PARTNER_ID}\n\t\t&partner_device_id=${e}&partner_url=${i}`;
            }
            insertExperianPixel() {
                Bt.emit(zt.EXPERIAN_STARTED), lr.loadPixel(this.getExperianPixelUrl());
            }
        }
        class ur extends ns {
            constructor() {
                super(...arguments), this.PIXEL_ID = 712315, this.logGroup = "LiveRamp pixel", this.PIXEL_URL = `https://idsync.rlcdn.com/${this.PIXEL_ID}.gif?partner_uid=`;
            }
            insertLiveRampPixel(e) {
                const t = this.PIXEL_URL + e;
                lr.loadPixel(t);
            }
            call() {
                return h(this, void 0, void 0, (function*() {
                    this.isEnabled("icLiveRampPixel") ? Bt.on(zt.IDENTITY_PARTNER_DATA_OBTAINED, (e => {
                        "Google" === e.payload.partnerName && this.insertLiveRampPixel(e.payload.partnerIdentityId);
                    })) : bi(this.logGroup, "pixel disabled");
                }));
            }
        }
        let hr = class {
            constructor() {
                this.reasons = [];
            }
            isAdsMode() {
                return !this.reasons.length;
            }
            getReasons() {
                return [ ...this.reasons ];
            }
            addReason(e) {
                this.reasons.unshift(e);
            }
            addReasons(e) {
                e && this.reasons.push(...e);
            }
            reset() {
                this.reasons = [];
            }
        };
        var pr;
var gr;
var mr;
var fr;
var vr;
var br;
var yr;
        hr = l([ N() ], hr);
        let _r = class {
            constructor(e;
let t;
let i;
let n;
let s;
let o;
let r) {
                this.pipeline = e;
let this.noAdsDetector = t;
let this.audigent = i;
let this.eyeota = n;
let this.liveConnect = s;
let this.experian = o;
let this.liveRampPixel = r;
            }
            execute() {
                this.removeAdSlotsPlaceholders(), this.noAdsDetector.addReasons(window.ads.context.opts.noAdsReasons), 
                this.dispatchJWPlayerSetupAction(), this.pipeline.add(this.liveRampPixel, this.audigent, this.eyeota, this.liveConnect, this.experian).execute().then((() => {
                    Bt.emit(zt.AD_ENGINE_PARTNERS_READY);
                }));
            }
            removeAdSlotsPlaceholders() {
                document.querySelectorAll(".top-ads-container, .ad-slot-placeholder, .bottom-ads-container").forEach((e => {
                    e.remove();
                }));
            }
            dispatchJWPlayerSetupAction() {
                Bt.dispatch(Zo({
                    showAds: !1,
                    autoplayDisabled: !1
                }));
            }
        };
        var Sr;
var Er;
        function wr(e) {
            const {desktop: t;
const mobile: i} = Io.UAP_ADDITIONAL_SIZES.bfaSize;
            Mo.removeSlotSize("top_leaderboard", e ? i : t);
        }
        _r = l([ N(), u("design:paramtypes", [ "function" == typeof (pr = void 0 !== tr && tr) ? pr : Object, "function" == typeof (gr = void 0 !== hr && hr) ? gr : Object, "function" == typeof (mr = void 0 !== rs && rs) ? mr : Object, "function" == typeof (fr = void 0 !== sr && sr) ? fr : Object, "function" == typeof (vr = void 0 !== dr && dr) ? vr : Object, "function" == typeof (br = void 0 !== cr && cr) ? br : Object, "function" == typeof (yr = void 0 !== ur && ur) ? yr : Object ]) ], _r);
        let Ar = class {
            constructor(e;
let t) {
                this.instantConfig = e;
let this.cookieAdapter = t;
            }
            execute() {
                const e = this.instantConfig.get("icNoAdsExperimentConfig";
const []);
const t = this.cookieAdapter.getItem("wikia_beacon_id");
                this.disableUnit(function(e, t = "") {
                    const i = e.find((e => t.match(e.beaconRegex)));
                    return null == i ? void 0 : i.unitName;
                }(e, t));
            }
            disableUnit(e) {
                const t = Y.get("state.isMobile");
                if (e) switch (Y.set("state.noAdsExperiment.unitName", e), e) {
                  case "uap":
                    return void wr(t);

                  case "interstitial_celtra":
                    return void this.cookieAdapter.setItem("_ae_intrsttl_imp", "1");

                  case "interstitial_google":
                    return void Y.set("slots.interstitial.disabled", !0);

                  case "top_leaderboard":
                    return Bt.on(zt.AD_ENGINE_STACK_START, (() => {
                        Ji.finishFirstCall(), Bt.emit(zt.AD_ENGINE_UAP_LOAD_STATUS, {
                            isLoaded: Io.isFanTakeoverLoaded(),
                            adProduct: Io.getType()
                        });
                    })), Y.set("slots.top_leaderboard.disabled", !0), void document.querySelectorAll(".top-ads-container").forEach((e => e.remove()));

                  case "top_boxad":
                  case "bottom_leaderboard":
                    return wr(t), void Y.set(`slots.${e}.disabled`, !0);

                  default:
                    return void Y.set(`slots.${e}.disabled`, !0);
                }
            }
        };
        var Tr;
        Ar = l([ N(), u("design:paramtypes", [ "function" == typeof (Sr = void 0 !== Oi && Oi) ? Sr : Object, "function" == typeof (Er = void 0 !== j && j) ? Er : Object ]) ], Ar);
        let Ir = class {
            constructor(e) {
                this.instantConfig = e;
            }
            execute() {
                const e = wi.make();
                xi.set("labrador", e.mapSamplingResults(this.instantConfig.get("icLABradorGamKeyValues")));
            }
        };
        Ir = l([ N(), u("design:paramtypes", [ "function" == typeof (Tr = void 0 !== Oi && Oi) ? Tr : Object ]) ], Ir);
        class Cr {
            static getEventData(e) {
                const t = new Date;
const i = Mn.get(e.position);
                if (!i) throw new Error(`Slot ${e.position} is not registered.`);
                return {
                    ad_error_code: e.ad_error_code,
                    ad_product: e.ad_product,
                    audio: e.audio ? 1 : 0,
                    browser: `${ui.getOperatingSystem()} ${ui.getBrowser()}`,
                    content_type: e.content_type || "",
                    country: Ii.getCountryCode() || "",
                    creative_id: e.creative_id || "",
                    ctp: e.ctp ? 1 : 0,
                    event_name: e.event_name,
                    line_item_id: e.line_item_id || "",
                    player: e.player,
                    position: i.getSlotName().toLowerCase(),
                    pv_number: Y.get("wiki.pvNumber"),
                    rv: i.getTargetingProperty("rv") || "",
                    skin: xi.get("skin") || "",
                    timestamp: t.getTime(),
                    tz_offset: t.getTimezoneOffset(),
                    user_block_autoplay: e.user_block_autoplay,
                    video_id: e.video_id || "",
                    video_number: e.video_number || ""
                };
            }
            static emit(e) {
                e.ad_product && e.player && e.event_name && Bt.emit(zt.VIDEO_PLAYER_TRACKING, {
                    eventInfo: e
                });
            }
            static emitVideoEvent(e) {
                Bt.emit(zt.VIDEO_EVENT, {
                    videoEvent: e
                });
            }
        }
        const Nr = new class {
            register() {
                const e = {
                    onEvent(e;
const t;
const i) {
                        const n = Cr.getEventData(i);
                        Cr.emit(n);
                    }
                };
                Y.push("listeners.porvata", e);
            }
        };
        class Or {
            constructor() {
                this.disabled = !1, this.compilers = [];
            }
            disable() {
                this.disabled = !0;
            }
            addCompiler(e) {
                this.compilers.push(e);
            }
            compileData(e = null, t = null, i = {}) {
                let n = {
                    bid: t;
let slot: e;
let data: i
                };
                return this.compilers.forEach((e => {
                    n = e(n);
                })), n;
            }
        }
        const Dr = ({data: e;
const slot: t}) => ({
            slot: t;
const data: Object.assign(Object.assign({};
const e);
const {
                ad_status: e.ad_status || t.getStatus();
const advertiser_id: t.advertiserId || "";
const creative_id: t.creativeId || "";
const kv_pos: t.getMainPositionName();
const kv_rv: t.getTargetingProperty("rv") || "";
const order_id: t.orderId || "";
const product_lineitem_id: t.lineItemId || "";
const slot_id: t.getUid() || "";
const slot_size: t.getCreativeSize() || ""
            })
        });
const Lr = ({data: e;
const slot: t}) => {
            const i = wi.make();
const n = new Date;
const s = n.getTime();
const o = t.getTargetingProperty("uap") && "none" !== t.getTargetingProperty("uap");
const r = xi.dump();
const a = (null == r ? void 0 : r.experiment_groups) || [];
            return {
                slot: t,
                data: Object.assign(Object.assign({}, e), {
                    timestamp: s,
                    browser: `${ui.getOperatingSystem()} ${ui.getBrowser()}`,
                    country: (Ii.getCountryCode() || "").toUpperCase(),
                    device: ui.getDeviceType(),
                    is_uap: o ? 1 : 0,
                    kv_ah: window.document.body.scrollHeight,
                    kv_lang: r.lang || "",
                    kv_s0v: r.s0v || "",
                    kv_s1: r.s1 || "",
                    kv_s2: r.s2 || "",
                    kv_skin: r.skin || "",
                    labrador: [ ...i.getSamplingResults(), ...a ].join(";"),
                    opt_in: Y.get("options.geoRequiresConsent") ? Y.get("options.trackingOptIn") ? "yes" : "no" : "",
                    opt_out_sale: Y.get("options.geoRequiresSignal") ? Y.get("options.optOutSale") ? "yes" : "no" : "",
                    page_width: window.document.body.scrollWidth && window.document.body.scrollWidth.toString() || "",
                    ppid: r.ppid,
                    pv: Y.get("wiki.pvNumber") || window.pvNumber || "",
                    pv_unique_id: Y.get("wiki.pvUID") || window.pvUID || "",
                    scroll_y: window.scrollY || window.pageYOffset,
                    tz_offset: n.getTimezoneOffset(),
                    viewport_height: window.innerHeight || 0
                })
            };
        }, Pr = ({data: e, slot: t}) => {
            var i;
            return {
                slot: t,
                data: Object.assign(Object.assign({}, e), {
                    word_count: xi.get("word_count") || -1,
                    short_page: null !== (i = Y.get("custom.short_page")) && void 0 !== i && i
                })
            };
        };
        function kr(e, t) {
            return h(this, void 0, void 0, (function*() {
                const i = t.getDfpSlotPrices(e);
const n = yield t.getCurrentSlotPrices(e);
                function s(e) {
                    return i && i[e] ? i[e] : n && n[e] ? `${n[e]}not_used` : "";
                }
                return {
                    bidder_0: s("wikia"),
                    bidder_1: s("indexExchange"),
                    bidder_2: s("appnexus"),
                    bidder_4: s("rubicon"),
                    bidder_8: s("wikiaVideo"),
                    bidder_9: s("openx"),
                    bidder_10: s("appnexusAst"),
                    bidder_11: s("rubicon_display"),
                    bidder_12: s("a9"),
                    bidder_14: s("pubmatic"),
                    bidder_17: s("kargo"),
                    bidder_19: s("gumgum"),
                    bidder_21: s("triplelift"),
                    bidder_25: s("nobid"),
                    bidder_28: s("verizon"),
                    bidder_30: s("medianet"),
                    bidder_31: s("roundel"),
                    bidder_32: s("ogury"),
                    bidder_33: s("criteo"),
                    bidder_34: s("yahoossp"),
                    bidder_35: s("freewheel"),
                    bidder_37: s("webAds"),
                    bidder_38: s("seedtag")
                };
            }));
        }
        const xr = ({data: e;
const slot: t};
const i) => h(void 0;
const void 0;
const void 0;
const (function*() {
            return i ? {
                slot: t;
const data: Object.assign(Object.assign(Object.assign({};
const e);
const {
                    bidder_won: t.winningBidderDetails ? t.winningBidderDetails.name : "";
const bidder_won_price: t.winningBidderDetails ? t.winningBidderDetails.price : ""
                });
const yield kr(t.getSlotName();
const i))
            } : {
                slot: t;
const data: e
            };
        })), Rr = new class extends Or {
            constructor() {
                super(...arguments), this.onRenderEndedStatusToTrack = [ Gi.STATUS_COLLAPSE, Gi.STATUS_FORCED_COLLAPSE, Gi.STATUS_MANUAL, Gi.STATUS_SUCCESS ], 
                this.onChangeStatusToTrack = [ Gi.STATUS_BLOCKED, Gi.STATUS_REQUESTED, Gi.STATUS_CLICKED, Gi.STATUS_ERROR, Gi.STATUS_VIEWPORT_CONFLICT, Gi.STATUS_HIVI_COLLAPSE, Gi.STATUS_HEAVY_AD_INTERVENTION, Gi.STATUS_UNKNOWN_INTERVENTION ], 
                this.compilers = [ Dr, Lr, Pr ];
            }
            isEnabled() {
                return !0;
            }
            register(e, {bidders: t}) {
                this.isEnabled() && (Bt.onSlotEvent(ki.SLOT_RENDERED_EVENT, (({slot: e}) => {
                    e.trackStatusAfterRendered = !0;
                })), Bt.onSlotEvent(ki.SLOT_STATUS_CHANGED, (({slot: i}) => h(this, void 0, void 0, (function*() {
                    const n = i.getStatus();
                    (i.trackStatusAfterRendered && (delete i.trackStatusAfterRendered, this.onRenderEndedStatusToTrack.includes(n) || i.getConfigProperty("trackEachStatus")) || this.onChangeStatusToTrack.includes(n) || i.getConfigProperty("trackEachStatus")) && e(yield xr(this.compileData(i), t));
                })))), Bt.onSlotEvent(ki.CUSTOM_EVENT, (({slot: i, payload: n}) => h(this, void 0, void 0, (function*() {
                    e(yield xr(this.compileData(i, null, {
                        ad_status: null == n ? void 0 : n.status
                    }), t));
                })))));
            }
        }, Ur = ({data: e, slot: t}) => {
            const i = new Date;
            return {
                slot: t,
                data: Object.assign(Object.assign({}, e), {
                    timestamp: i.getTime(),
                    tz_offset: i.getTimezoneOffset()
                })
            };
        }, Vr = ({data: e, slot: t}) => ({
            slot: t,
            data: Object.assign(Object.assign({}, e), {
                creative_id: t.creativeId || "",
                line_item_id: t.lineItemId || "",
                rv: t.getTargetingProperty("rv") || "",
                slot_id: t.getUid() || ""
            })
        }), Mr = new class extends Or {
            constructor() {
                super(...arguments), this.compilers = [ Ur, Vr ];
            }
            isEnabled() {
                return !0;
            }
            register(e) {
                this.isEnabled() && Bt.onSlotEvent(ki.SLOT_VIEWED_EVENT, (({slot: t}) => {
                    e(this.compileData(t));
                }));
            }
        }, zr = new class extends Or {
            constructor() {
                super(...arguments), this.compilers = [ Lr ];
            }
            register(e) {
                Bt.on(zt.AD_ENGINE_MESSAGE_BOX_EVENT, (({adSlotName: t, ad_status: i}) => {
                    e(this.compileData(Mn.get(t), null, {
                        ad_status: i
                    }));
                }), !1);
            }
        }, jr = new class extends Or {
            constructor() {
                super(...arguments), this.eventsToRegister = [ zt.AD_ENGINE_VIDEO_LEARN_MORE_CLICKED, zt.AD_ENGINE_VIDEO_OVERLAY_CLICKED, zt.AD_ENGINE_VIDEO_TOGGLE_UI_OVERLAY_CLICKED ], 
                this.compilers = [ Lr, Dr ];
            }
            register(e) {
                Bt.onSlotEvent(ki.SLOT_RENDERED_EVENT, (({adSlotName: t}) => {
                    this.addClickTrackingListeners(e, t);
                })), this.eventsToRegister.map((t => this.addToTracking(t, e)));
            }
            addToTracking(e, t) {
                Bt.on(e, (({adSlotName: e, ad_status: i}) => {
                    t(this.compileData(Mn.get(e), null, {
                        ad_status: i
                    }));
                }), !1);
            }
            addClickTrackingListeners(e, t) {
                this.clickDetection(t, e);
            }
            clickDetection(e, t) {
                window.addEventListener("blur", (() => {
                    const i = document.activeElement;
                    if (!i) return;
                    if (null === i.closest(`div#${e}`)) return;
                    bi("ad-click-tracker", `Click! on slot='${e}' is detected.`);
                    const n = Mn.get(e);
                    this.handleClickEvent(t, n), setTimeout((() => {
                        document.activeElement.blur();
                    }), 100);
                }));
            }
            handleClickEvent(e, t) {
                const i = {
                    ad_status: Gi.STATUS_CLICKED
                };
                e(this.compileData(t, null, i));
            }
        };
        function Br(e, t) {
            const i = Mn.get(e);
            return !i || !i.getPushTime() || i.getPushTime() > t;
        }
        const Fr = ({bid: e;
const data: t}) => {
            const i = (new Date).getTime();
const n = Mn.getSlotId(e.slotName);
const s = [];
            return e.buyerId && s.push(`buyer_id=${e.buyerId}`), {
                bid: e,
                data: Object.assign(Object.assign({}, t), {
                    timestamp: i,
                    slot_id: n,
                    name: e.bidderName,
                    size: e.size,
                    price: e.price,
                    response_time: e.timeToRespond,
                    status: Br(e.slotName, e.responseTimestamp) ? "on_time" : "too_late",
                    additional_flags: s.join(";")
                })
            };
        }, $r = new class extends Or {
            constructor() {
                super(...arguments), this.compilers = [ Fr ];
            }
            isEnabled() {
                return !0;
            }
            register(e) {
                this.isEnabled() && Bt.on(zt.BIDDERS_BIDS_RESPONSE, (({bidResponse: t}) => {
                    e(this.compileData(null, t));
                }), !1);
            }
        };
        class Gr {
            constructor(e) {
                this.adapter = e, this.steps = [];
            }
            add(...e) {
                return this.steps.push(...e), this;
            }
            execute(e, t) {
                const i = this.createFinalNext(t);
                return this.createExecutor(i)(e);
            }
            createFinalNext(e) {
                return e ? t => this.adapter.execute(e, t) : e => h(this, void 0, void 0, (function*() {
                    return e;
                }));
            }
            createExecutor(e) {
                return this.steps.reduceRight(((e, t) => i => this.adapter.execute(t, i, e)), e);
            }
        }
        class Hr {
            execute(e, t, i) {
                return h(this, void 0, void 0, (function*() {
                    return e(t, i);
                }));
            }
        }
        class qr extends Gr {
            constructor() {
                super(new Hr);
            }
        }
        const Wr = {
            DataWarehouse: "DW";
const GoogleAnalytics: "GA"
        };
const Kr = (e;
const t) => {
            if (Object.values(Wr).includes(e.target) && e.payload) return t({
                payload: e.payload;
const target: e.target
            });
        };
        class Yr {
            constructor(e) {
                this.requiredKeys = e, this.pipeline = new qr, this.pipeline.add(Kr);
            }
            register(e, t) {
                if (this.isEnabled()) return ji.register({
                    origin: t,
                    keys: this.requiredKeys,
                    infinite: !0
                }, (t => {
                    this.pipeline.execute(Object.assign({}, t), e);
                })), this;
            }
            isEnabled() {
                return !0;
            }
        }
        const Qr = "intervention-tracker";
const Xr = new class {
            register() {
                Y.get("services.interventionTracker.enabled") ? Bt.action$.pipe(jt(Bt.getGlobalAction(zt.GAM_AD_INTERVENTION));
const wn((e => this.handleIntervention(e)))).subscribe() : bi(Qr;
const "Intervention tracker is disabled");
            }
            handleIntervention(e) {
                const t = Mn.get(e.slotName);
                bi(Qr, e), t && (t.setStatus(this.getInterventionStatus(e.id)), Xn.log("Ad intervention", {
                    interventionId: e.id,
                    interventionMessage: e.message,
                    lineItemId: t.lineItemId,
                    slotName: e.slotName
                }));
            }
            getInterventionStatus(e) {
                return "HeavyAdIntervention" === e ? Gi.STATUS_HEAVY_AD_INTERVENTION : Gi.STATUS_UNKNOWN_INTERVENTION;
            }
        }, Jr = new class {
            get exists() {
                return !!window.__uspapi;
            }
            getSignalData(e) {
                return new Promise((t => {
                    window.__uspapi("getUSPData", e, (e => t(e)));
                }));
            }
            override(e) {
                window.__uspapi = e;
            }
        };
        function Zr(e) {
            let t = e;
            return 0 !== Object.entries(Y.get(`slots.${t}`) || {}).length || (t = (i = e, Object.entries(Mn.slotConfigsMap).filter((([, e]) => e.bidderAlias === i)).map((([e]) => e))).shift(), 
            t) ? t : "";
            var i;
        }
        class ea {
            constructor(e, t, i = 2e3) {
                this.name = e, this.bidderConfig = t, this.timeout = i, this.called = !1, this.response = !1, 
                this.logGroup = `${e}-bidder`, this.resetState(), bi(this.logGroup, "created");
            }
            resetState() {
                this.called = !1, this.response = !1, this.onResponseCallbacks = new Qi, this.onResponseCallbacks.onItemFlush((e => {
                    e(this.name);
                }));
            }
            call() {
                this.response = !1, this.called = !0, this.callBids((() => this.onBidResponse())), 
                bi(this.logGroup, "called");
            }
            onBidResponse() {
                this.response = !0, this.calculatePrices(), this.onResponseCallbacks.flush(), bi(this.logGroup, "respond");
            }
            getSlotAlias(e) {
                return Y.get(`slots.${e}.bidderAlias`) || e;
            }
            getSlotBestPrice(e) {
                return this.getBestPrice(e);
            }
            getSlotTargetingParams(e) {
                return this.called && this.isSlotSupported(e) ? this.getTargetingParams(e) : Promise.resolve({});
            }
            isSlotSupported(e) {
                return this.isSupported(e);
            }
            waitForResponse() {
                return on((e => {
                    this.hasResponse() ? e() : this.addResponseListener(e);
                }), this.timeout);
            }
            hasResponse() {
                return this.response;
            }
            addResponseListener(e) {
                this.onResponseCallbacks.push(e);
            }
            wasCalled() {
                return this.called;
            }
        }
        const ta = {
            en: {
                advertisement: "Advertisement";
const "learn-more": "Learn More"
            };
const ar: {
                advertisement: "Ø¥Ø¹Ù„Ø§Ù†"
            };
const bn: {
                advertisement: "à¦¬à¦¿à¦œà§à¦žà¦¾à¦ªà¦¨"
            };
const br: {
                advertisement: "Bomm bruderezh"
            };
const ca: {
                advertisement: "Anunci"
            };
const cs: {
                advertisement: "Reklama"
            };
const de: {
                advertisement: "Anzeige";
const "learn-more": "Erfahre mehr"
            };
const es: {
                advertisement: "Anuncio";
const "learn-more": "Conoce mÃ¡s"
            };
const eu: {
                advertisement: "Iragarkia"
            };
const fa: {
                advertisement: "ØªØ¨Ù„ÛŒØºØ§Øª"
            };
const fo: {
                advertisement: "LÃ½sing"
            };
const fr: {
                advertisement: "PublicitÃ©";
const "learn-more": "En savoir plus"
            };
const fy: {
                advertisement: "Advertinsje"
            };
const gl: {
                advertisement: "Anuncio"
            };
const gv: {
                advertisement: "Soilsheen"
            };
const he: {
                advertisement: "×¤×¨×¡×•×ž×ª"
            };
const hu: {
                advertisement: "HirdetÃ©s"
            };
const id: {
                advertisement: "Iklan";
const "learn-more": "Baca Selengkapnya"
            };
const inh: {
                advertisement: "Ð´ÐµÐ±Ð°Ñ‚"
            };
const it: {
                advertisement: "PubblicitÃ ";
const "learn-more": "Ulteriori informazioni"
            };
const ja: {
                advertisement: "åºƒå‘Š";
const "learn-more": "ã‚‚ã£ã¨è¦‹ã‚‹"
            };
const ko: {
                advertisement: "ê´‘ê³ "
            };
const krc: {
                advertisement: "PÐµÐºÐ»Ð°Ð¼Ð°"
            };
const lb: {
                advertisement: "Reklamm"
            };
const mk: {
                advertisement: "PÐµÐºÐ»Ð°Ð¼Ð°"
            };
const mr: {
                advertisement: "à¤œà¤¾à¤¹à¤¿à¤°à¤¾à¤¤"
            };
const ms: {
                advertisement: "Iklan"
            };
const nl: {
                advertisement: "Advertentie";
const "learn-more": "Meer te weten komen"
            };
const no: {
                advertisement: "Reklame"
            };
const pl: {
                advertisement: "Reklama";
const "learn-more": "Czytaj wiÄ™cej"
            };
const ps: {
                advertisement: "Ø®Ø¨Ø±ØªÙŠØ§"
            };
const pt: {
                advertisement: "AnÃºncio";
const "learn-more": "Saiba Mais"
            };
const "roa-tara": {
                advertisement: "PubblecetÃ "
            };
const ru: {
                advertisement: "PÐµÐºÐ»Ð°Ð¼Ð°";
const "learn-more": "Ð£Ð·Ð½Ð°Ñ‚ÑŒ Ð±Ð¾Ð»ÑŒÑˆÐµ"
            };
const si: {
                advertisement: "à¶´à·Šâ€à¶»à¶ à·à¶»à¶š à¶¯à·à¶±à·Šà·€à·“à¶¸"
            };
const sl: {
                advertisement: "Oglas"
            };
const "sr-ec": {
                advertisement: "PÐµÐºÐ»Ð°Ð¼Ð°"
            };
const sv: {
                advertisement: "Annons"
            };
const te: {
                advertisement: "à°µà°¾à°£à°¿à°œà±à°¯ à°ªà±à°°à°•à°Ÿà°¨"
            };
const th: {
                advertisement: "à¸à¸²à¸£à¹‚à¸†à¸©à¸“à¸²"
            };
const tr: {
                advertisement: "Reklam"
            };
const "tt-cyrl": {
                advertisement: "PÐµÐºÐ»Ð°Ð¼Ð°"
            };
const uk: {
                advertisement: "PÐµÐºÐ»Ð°Ð¼Ð°"
            };
const vi: {
                advertisement: "Quáº£ng cÃ¡o"
            };
const "zh-hans": {
                advertisement: "å¹¿å‘Š";
const "learn-more": "äº†è§£æ›´å¤š"
            };
const "zh-hant": {
                advertisement: "å»£å‘Š";
const "learn-more": "é–±è®€æ›´å¤š"
            }
        };
        function ia(e) {
            const t = Y.get("wiki.targeting.wikiLanguage");
            return ta[t && void 0 !== ta[t] ? t : "en"][e] || ta.en[e];
        }
        function na() {
            document.querySelectorAll(".ae-translatable-label").forEach((e => {
                const t = ia(e.dataset.key);
                t && (e.innerText = t);
            }));
        }
        function sa(e) {
            let t;
            return {
                cancel() {
                    clearTimeout(t);
                },
                promise: new Promise((i => {
                    t = setTimeout((() => i(e)), e);
                }))
            };
        }
        const oa = new class {
            sample(e;
const t;
const i = 100) {
                return !!function(e) {
                    return -1 !== (U.get("ignored_samplers") || "").split(";
const ").indexOf(e);
                }(e) || function(e, t) {
                    return Math.floor(Math.random() * (t - 0)) + 0;
                }(0, i) < t;
            }
        }, ra = [ "preroll", "midroll", "postroll" ];
        function aa() {
            return Math.round(1e10 * Math.random());
        }
        function da(e, t, i = {}) {
            const n = [ "output=vast";
const "env=vp";
const "gdfp_req=1";
const "impl=s";
const "unviewed_position_start=1";
const `url=${encodeURIComponent(window.location.href)}`;
const `description_url=${encodeURIComponent(window.location.href)}`;
const `correlator=${aa()}` ];
const s = Mn.get(t);
const o = xi.get("ppid");
const r = xi.get("over18");
            if (r && n.push(`over_18=${r}`), o && n.push(`ppid=${o}`), ln() && n.push("tfcd=1"), 
            s) n.push(`iu=${s.getVideoAdUnit()}`), n.push(`sz=${function(e) {
                const t = e.getVideoSizes();
                return t ? t.map((e => e.join("x"))).join("|") : "640x480";
            }(s)}`), n.push(`cust_params=${function(e, t = {}) {
                const i = xi.dump() || {};
const n = {};
                Object.keys(i).forEach((e => {
                    !function(e, t) {
                        "function" == typeof t ? n[e] = t() : "undefined" !== t && null !== t && (n[e] = t);
                    }(e, i[e]);
                })), Bt.emit(zt.AD_ENGINE_INVALIDATE_SLOT_TARGETING, {
                    slot: e
                });
                const s = Object.assign(Object.assign(Object.assign({};
const n);
const e.getTargeting());
const t);
                return encodeURIComponent(Object.keys(s).filter((e => s[e])).map((e => `${e}=${s[e]}`)).join("&"));
            }(s, i.targeting)}`); else {
                if (!i.videoAdUnitId || !i.customParams) throw Error("Slot does not exist!");
                n.push(`iu=${i.videoAdUnitId}`), n.push("sz=640x480"), n.push(`cust_params=${encodeURIComponent(i.customParams)}`);
            }
            return i.contentSourceId && i.videoId && (n.push(`cmsid=${i.contentSourceId}`), 
            n.push(`vid=${i.videoId}`)), i.vpos && ra.indexOf(i.vpos) > -1 && n.push(`vpos=${i.vpos}`), 
            void 0 !== i.numberOfAds && n.push(`pmad=${i.numberOfAds}`), n.push("rdp=" + (Ki() ? 1 : 0)), 
            "https://pubads.g.doubleclick.net/gampad/ads?" + n.join("&");
        }
        function la(e = {}) {
            const t = xi.get("ppid");
const i = xi.get("over18");
const n = [ `c=${aa()}`;
const "tile=1";
const "d_imp=1" ];
            return n.push(`iu=${e.adUnit}`), n.push(`sz=${e.size}`), i && n.push(`over_18=${i}`), 
            t && n.push(`ppid=${t}`), ln() && n.push("tfcd=1"), e.targeting && n.push(`t=${encodeURIComponent(Object.keys(e.targeting).filter((t => e.targeting[t])).map((t => `${t}=${e.targeting[t]}`)).join("&"))}`), 
            n.push("rdp=" + (Ki() ? 1 : 0)), "https://securepubads.g.doubleclick.net/gampad/adx?" + n.join("&");
        }
        function ca(e = {}, t = []) {
            if (e) return t.find((t => {
                if ("string" != typeof t) throw new Error("property name must be a string");
                return t in e;
            }));
        }
        function ua(e, t = []) {
            const i = ca(e;
const t);
            if (i) {
                const t = e[i];
                return "function" == typeof t ? t.bind(e) : t;
            }
        }
        const ha = {
            randomUUID: "undefined" != typeof crypto && crypto.randomUUID && crypto.randomUUID.bind(crypto)
        };
        let pa;
        const ga = new Uint8Array(16);
        function ma() {
            if (!pa && (pa = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), 
            !pa)) throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
            return pa(ga);
        }
        const fa = [];
        for (let e = 0; e < 256; ++e) fa.push((e + 256).toString(16).slice(1));
        const va = function(e;
const t;
const i) {
            if (ha.randomUUID && !t && !e) return ha.randomUUID();
            const n = (e = e || {}).random || (e.rng || ma)();
            if (n[6] = 15 & n[6] | 64, n[8] = 63 & n[8] | 128, t) {
                i = i || 0;
                for (let e = 0; e < 16; ++e) t[i + e] = n[e];
                return t;
            }
            return function(e, t = 0) {
                return (fa[e[t + 0]] + fa[e[t + 1]] + fa[e[t + 2]] + fa[e[t + 3]] + "-" + fa[e[t + 4]] + fa[e[t + 5]] + "-" + fa[e[t + 6]] + fa[e[t + 7]] + "-" + fa[e[t + 8]] + fa[e[t + 9]] + "-" + fa[e[t + 10]] + fa[e[t + 11]] + fa[e[t + 12]] + fa[e[t + 13]] + fa[e[t + 14]] + fa[e[t + 15]]).toLowerCase();
            }(n);
        }, ba = new class {
            v4() {
                return va();
            }
        }, ya = {
            addListener: function(e, t, i = {}) {
                const n = {
                    element: e;
const callback: t;
const offsetTop: i.offsetTop || 0;
const offsetBottom: i.offsetBottom || 0;
const areaThreshold: i.areaThreshold;
const inViewport: !1
                };
const s = () => {
                    !function(e) {
                        const t = Rn(e.element;
const {
                            topOffset: e.offsetTop;
const bottomOffset: e.offsetBottom;
const areaThreshold: e.areaThreshold
                        });
                        t !== e.inViewport && (e.callback(t), e.inViewport = t);
                    }(n);
                };
                return n.id = zn.addCallback(s), s(), n.id;
            },
            removeListener: function(e) {
                zn.removeCallback(e);
            }
        };
        class _a {
            static make() {
                return _a.instance || (_a.instance = new _a), _a.instance;
            }
            constructor() {
                this.renderImpEndCallbacks = [], this.utils = t, this.insertScript(), this.configure(), 
                this.addRenderImpHook();
            }
            insertScript() {
                this.script = this.utils.scriptLoader.loadScript("//c.amazon-adsystem.com/aax2/apstag.js", !0, "first");
            }
            configure() {
                window.apstag = window.apstag || {
                    _Q: []
                }, void 0 === window.apstag.init && (window.apstag.init = (...e) => {
                    this.configureCommand("i", e);
                }), void 0 === window.apstag.fetchBids && (window.apstag.fetchBids = (...e) => {
                    this.configureCommand("f", e);
                });
            }
            addRenderImpHook() {
                return h(this, void 0, void 0, (function*() {
                    yield this.script;
                    const e = window.apstag.renderImp;
                    window.apstag.renderImp = (...t) => {
                        e(...t);
                        const [i;
const n] = t;
                        this.renderImpEndCallbacks.forEach((e => e(i, n)));
                    };
                }));
            }
            configureCommand(e, t) {
                window.apstag._Q.push([ e, t ]);
            }
            init(e) {
                return h(this, void 0, void 0, (function*() {
                    yield this.script, window.apstag.init(e);
                }));
            }
            fetchBids(e) {
                return h(this, void 0, void 0, (function*() {
                    return yield this.script, new Promise((t => {
                        window.apstag.fetchBids(e, (e => t(e)));
                    }));
                }));
            }
            targetingKeys() {
                return h(this, void 0, void 0, (function*() {
                    return yield this.script, window.apstag.targetingKeys();
                }));
            }
            enableDebug() {
                return h(this, void 0, void 0, (function*() {
                    yield this.script, window.apstag.debug("enable");
                }));
            }
            disableDebug() {
                return h(this, void 0, void 0, (function*() {
                    yield this.script, window.apstag.debug("disable");
                }));
            }
            onRenderImpEnd(e) {
                return h(this, void 0, void 0, (function*() {
                    if ("function" != typeof e) throw new Error("onRenderImpEnd used with callback not being a function");
                    this.renderImpEndCallbacks.push(e);
                }));
            }
        }
        const Sa = "A9Provider";
        class Ea extends ea {
            static getCcpaIfApplicable(e) {
                return e && e.uspString ? {
                    params: {
                        us_privacy: e.uspString
                    }
                } : {};
            }
            static mapResponseToTrackingBidDefinition(e, t, i, n) {
                return {
                    responseTimestamp: i,
                    timeToRespond: n,
                    bidderName: "a9",
                    buyerId: t.amznp,
                    price: t.amznbid,
                    size: t.amznsz,
                    slotName: Zr(e)
                };
            }
            static isEnabled() {
                return Y.get("bidders.a9.enabled") && !ln();
            }
            constructor(e, t = 2e3) {
                super("a9", e, t), this.bidderConfig = e, this.timeout = t, this.loaded = !1, this.apstag = _a.make(), 
                this.bids = {}, this.usp = Jr, this.priceMap = {}, this.targetingKeys = [], this.amazonId = this.bidderConfig.amazonId, 
                this.slots = this.bidderConfig.slots, this.slotsNames = Object.keys(this.slots), 
                this.bidsRefreshing = Y.get("bidders.a9.bidsRefreshing") || {};
            }
            getTargetingKeys() {
                return this.targetingKeys;
            }
            init(e = {}) {
                this.initIfNotLoaded(e), this.bids = {}, this.priceMap = {};
                const t = this.getA9SlotsDefinitions(this.slotsNames);
                this.fetchBids(t);
            }
            initIfNotLoaded(e) {
                this.loaded || (Y.get("custom.hasFeaturedVideo") && (Bt.onSlotEvent(ki.VIDEO_AD_IMPRESSION, (({slot: e}) => this.removeBids(e))), 
                Bt.onSlotEvent(ki.VIDEO_AD_ERROR, (({slot: e}) => this.removeBids(e))), Bt.on(zt.AD_ENGINE_INVALIDATE_SLOT_TARGETING, (({slot: e}) => this.invalidateSlotTargeting(e)), !1)), 
                this.apstag.init(this.getApstagConfig(e)), Wi() && !Ki() || (bi(Sa, "A9 was initialized without consents"), 
                Bt.emit(zt.A9_WITHOUT_CONSENTS)), this.loaded = !0);
            }
            removeBids(e) {
                const t = this.getSlotAlias(e.getSlotName());
                delete this.bids[t], e.isVideo() && e.emit(ki.VIDEO_AD_USED);
            }
            invalidateSlotTargeting(e) {
                if (Date.parse(xi.get("amznExpirationDate", e.getSlotName())) < (new Date).getTime()) {
                    const t = this.getSlotAlias(e.getSlotName());
                    delete this.bids[t], this.targetingKeys.forEach((t => {
                        xi.remove(t, e.getSlotName());
                    }));
                }
            }
            getApstagConfig(e) {
                const t = xi.get("openrtb2";
const "openrtb2");
                return Xn.log("openrtb2 signals", {
                    signals: JSON.stringify(t)
                }), Object.assign(Object.assign({
                    pubID: this.amazonId,
                    videoAdServer: "DFP",
                    deals: !0
                }, Ea.getCcpaIfApplicable(e)), {
                    signals: {
                        ortb2: t
                    }
                });
            }
            getA9SlotsDefinitions(e) {
                return e.map((e => this.getSlotAlias(e))).filter((e => this.isSlotEnabled(e))).map((e => this.createSlotDefinition(e))).filter((e => null !== e));
            }
            fetchBids(e, t = !1) {
                return h(this, void 0, void 0, (function*() {
                    if (bi(Sa, "fetching bids for slots", e), !e || 0 === e.length) return void bi(Sa, "there is no slots to fetch bids");
                    const i = (new Date).getTime();
const n = yield this.apstag.fetchBids({
                        slots: e;
const timeout: this.timeout
                    });
const s = (new Date).getTime();
const o = new Date(s + Ea.VIDEO_TTL);
                    if (bi(Sa, "bids fetched for slots", e, "bids", n), this.configureApstagOnce(), 
                    yield Promise.all(n.map((e => h(this, void 0, void 0, (function*() {
                        const t = e.slotID;
const {keys: n;
const bidTargeting: r} = yield this.getBidTargetingWithKeys(e);
                        this.updateBidSlot(t, n, r, o), Bt.emit(zt.BIDDERS_BIDS_RESPONSE, {
                            bidResponse: Ea.mapResponseToTrackingBidDefinition(e.slotID, r, s, s - i)
                        });
                    }))))), this.onBidResponse(), t) {
                        const t = e.map((e => e.slotName));
                        Bt.emit(zt.BIDDERS_BIDS_REFRESH, {
                            refreshedSlotNames: t
                        });
                    }
                }));
            }
            configureApstagOnce() {
                Ea.isApstagConfigured || (Ea.isApstagConfigured = !0, this.addApstagRenderImpHook(), 
                this.registerVideoBidsRefreshing());
            }
            addApstagRenderImpHook() {
                bi(Sa, "overwriting window.apstag.renderImp"), this.apstag.onRenderImpEnd(((e, t) => {
                    if (!t) return void bi(Sa, "apstag.renderImp() called with 1 argument only");
                    const i = this.getRenderedSlot(t);
const n = i.getSlotName();
                    i.addClass(Ea.A9_CLASS), bi(Sa, `bid used for slot ${n}`), delete this.bids[this.getSlotAlias(n)], 
                    this.refreshBid(i), i.updateWinningA9BidderDetails();
                }));
            }
            getRenderedSlot(e) {
                return Object.values(Mn.slots).filter((t => t.getTargeting().amzniid === e))[0];
            }
            refreshBid(e) {
                if (!this.shouldRefreshSlot(e)) return;
                const t = this.createSlotDefinition(this.getSlotAlias(e.getSlotName()));
                t && (bi(Sa, "refresh bids for slot", t), this.fetchBids([ t ], !0));
            }
            shouldRefreshSlot(e) {
                return this.bidsRefreshing.slots.includes(this.getSlotAlias(e.getSlotName()));
            }
            createSlotDefinition(e) {
                const t = this.slots[e];
const i = {
                    slotName: e;
const slotID: e
                };
                return !t || !this.bidderConfig.videoEnabled && "video" === t.type ? null : ("video" === t.type ? i.mediaType = "video" : i.sizes = t.sizes, 
                i);
            }
            registerVideoBidsRefreshing() {
                Bt.onSlotEvent(ki.VIDEO_AD_IMPRESSION, (({slot: e}) => this.refreshVideoBids(e))), 
                Bt.onSlotEvent(ki.VIDEO_AD_ERROR, (({slot: e}) => this.refreshVideoBids(e)));
            }
            refreshVideoBids(e) {
                this.shouldRefreshSlot(e) && (this.removeBids(e), this.refreshBid(e));
            }
            getBidTargetingWithKeys(e) {
                return h(this, void 0, void 0, (function*() {
                    return yield this.apstag.targetingKeys(), {
                        keys: e.helpers.targetingKeys,
                        bidTargeting: e.targeting
                    };
                }));
            }
            updateBidSlot(e, t, i, n) {
                this.bids[e] = {}, t.forEach((t => {
                    -1 === this.targetingKeys.indexOf(t) && this.targetingKeys.push(t), this.bids[e][t] = i[t];
                })), Y.get(`slots.${e}.isVideo`) && (this.bids[e].amznExpirationDate = n.toString(), 
                this.targetingKeys.push("amznExpirationDate"));
            }
            callBids() {
                return h(this, void 0, void 0, (function*() {
                    let e = null;
                    this.usp.exists && (e = yield this.usp.getSignalData()), this.init(e);
                }));
            }
            calculatePrices() {
                Object.keys(this.bids).forEach((e => {
                    this.priceMap[e] = this.bids[e].amznbid;
                }));
            }
            getBestPrice(e) {
                return h(this, void 0, void 0, (function*() {
                    const t = this.getSlotAlias(e);
                    return this.priceMap[t] ? {
                        a9: this.priceMap[t]
                    } : {};
                }));
            }
            getTargetingParams(e) {
                return h(this, void 0, void 0, (function*() {
                    return this.bids[this.getSlotAlias(e)] || {};
                }));
            }
            isSupported(e) {
                return !!this.slots[this.getSlotAlias(e)];
            }
            isSlotEnabled(e) {
                const t = Object.keys(Y.get("slots")).some((t => Y.get(`slots.${t}.bidderAlias`) === e && Mn.getState(t)));
const i = Y.get(`slots.${e}`);
                return i && Object.keys(i).length > 0 ? Mn.getState(e) : t;
            }
        }
        Ea.A9_CLASS = "a9-ad", Ea.VIDEO_TTL = 6e5, Ea.isApstagConfigured = !1;
        class wa {
            static getPrebidNativeMediaTypes(e) {
                return {
                    sendTargetingKeys: !1,
                    adTemplate: wa.getPrebidNativeTemplate(),
                    title: {
                        required: !0,
                        len: wa.getMaxTitleLength(e)
                    },
                    body: {
                        required: !0,
                        len: wa.getMaxBodyLength(e)
                    },
                    clickUrl: {
                        required: !0
                    },
                    displayUrl: {
                        required: !1
                    },
                    image: {
                        required: !1,
                        aspect_ratios: [ {
                            min_width: wa.getMinImageSize(e),
                            min_height: wa.getMinImageSize(e),
                            ratio_width: 1,
                            ratio_height: 1
                        } ]
                    }
                };
            }
            static getPrebidNativeTemplate() {
                return '<div id="native-prebid-ad" class="ntv-ad">\n\t\t\t\t\t<div class="ntv-wrapper">\n\t\t\t\t\t\t<a href="##hb_native_linkurl##" class="ntv-link" style="flex-shrink: 0;">\n\t\t\t\t\t\t\t<img src="##hb_native_image##" id="ntv-img" class="ntv-img">\n\t\t\t\t\t\t</a>\n\t\t\t\t\t\t<div class="ntv-content">\n\t\t\t\t\t\t\t<p class="ntv-ad-label">Ad</p>\n\t\t\t\t\t\t\t<a href="##hb_native_linkurl##" class="ntv-link">\n\t\t\t\t\t\t\t\t<p class="ntv-ad-title ntv-headline">##hb_native_title##</p>\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t<p class="ntv-ad-offer">##hb_native_body##</p>\n\t\t\t\t\t\t\t<a href="##hb_native_linkurl##" class="ntv-link">\n\t\t\t\t\t\t\t\t<button class="ntv-ad-button">##hb_native_displayUrl##</button>\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>';
            }
            static getMinImageSize(e) {
                return "mobile" == e ? xn() <= 320 ? 90 : 120 : 126;
            }
            static getMaxTitleLength(e) {
                return "mobile" == e ? 40 : 60;
            }
            static getMaxBodyLength(e) {
                return "mobile" == e ? 30 : 120;
            }
        }
        var Aa;
        wa.assetsMap = {
            title: "hb_native_title",
            body: "hb_native_body",
            image: "hb_native_image",
            clickUrl: "hb_native_linkurl",
            displayUrl: "hb_native_displayUrl"
        }, function(e) {
            e[e.IN_STREAM = 1] = "IN_STREAM", e[e.IN_BANNER = 2] = "IN_BANNER", e[e.IN_ARTICLE = 3] = "IN_ARTICLE", 
            e[e.IN_FEED = 4] = "IN_FEED", e[e.FLOATING = 5] = "FLOATING";
        }(Aa || (Aa = {}));
        class Ta {
            constructor({enabled: e, slots: t}) {
                this.isCustomBidAdapter = !1, this.enabled = e, this.slots = t, this.pageTargeting = Object.assign({}, xi.dump() || {}), 
                Object.keys(this.pageTargeting).forEach((e => {
                    Array.isArray(this.pageTargeting[e]) || (this.pageTargeting[e] = [ this.pageTargeting[e] ]);
                }));
            }
            adUnitConfigDefaultFactory(e) {
                return this.prepareConfigForAdUnit(e, this.slots[e]);
            }
            adUnitConfigWithForcedPlacementForVideoFactory(e) {
                var t;
                const i = this.prepareConfigForAdUnit(e;
const this.slots[e]);
                return i || console.warn("Wrong ad unit config for slot: ", e, this.bidderName), 
                (null === (t = null == i ? void 0 : i.mediaTypes) || void 0 === t ? void 0 : t.video) && (i.mediaTypes.video.placement = Aa.IN_ARTICLE, 
                i.bids.map((({params: e}) => {
                    var t;
                    (null === (t = e.video) || void 0 === t ? void 0 : t.placement) && (e.video.placement = Aa.IN_ARTICLE);
                }))), i;
            }
            prepareAdUnits() {
                const e = Y.get("bidders.prebid.forceInArticleVideoPlacement") ? this.adUnitConfigWithForcedPlacementForVideoFactory.bind(this) : this.adUnitConfigDefaultFactory.bind(this);
                return Object.keys(this.slots).map(e);
            }
            getTargeting(e, t = {}) {
                return Object.assign(Object.assign(Object.assign({}, this.pageTargeting), {
                    src: Y.get("src") || [ "" ],
                    pos: [ e ]
                }), t);
            }
        }
        class Ia extends Ta {
            constructor(e) {
                super(e), this.bidderSettings = {
                    storageAllowed: !0
                }, this.placements = e.placements;
            }
            get bidderName() {
                return Ia.bidderName;
            }
            isNativeModeOn() {
                return Y.get("bidders.prebid.appnexusNative.enabled");
            }
            prepareConfigForAdUnit(e, {sizes: t, placementId: i, position: n = "mobile"}) {
                return Y.get(`slots.${e}.isNative`) && Y.get("bidders.prebid.native.enabled") && this.isNativeModeOn() ? this.prepareNativeConfig(e, {
                    sizes: t,
                    placementId: i,
                    position: n
                }) : this.prepareStandardConfig(e, {
                    sizes: t,
                    placementId: i,
                    position: n
                });
            }
            prepareStandardConfig(e, {sizes: t, placementId: i, position: n}) {
                return {
                    code: e,
                    mediaTypes: {
                        banner: {
                            sizes: t
                        }
                    },
                    bids: this.getBids(e, {
                        sizes: t,
                        placementId: i,
                        position: n
                    })
                };
            }
            prepareNativeConfig(e, {sizes: t, placementId: i, position: n}) {
                return {
                    code: e,
                    mediaTypes: {
                        native: wa.getPrebidNativeMediaTypes(n)
                    },
                    bids: this.getBids(e, {
                        sizes: t,
                        placementId: i,
                        position: n
                    })
                };
            }
            getBids(e, {placementId: t, position: i = "mobile"}) {
                return Array.isArray(t) && t.length > 0 ? t.map((t => ({
                    bidder: this.bidderName,
                    params: {
                        placementId: t,
                        keywords: Object.assign({}, this.getTargeting(e))
                    }
                }))) : [ {
                    bidder: this.bidderName,
                    params: {
                        placementId: t || this.getPlacement(i),
                        keywords: Object.assign({}, this.getTargeting(e))
                    }
                } ];
            }
            getPlacement(e) {
                let t = e;
                if ("mobile" === e) {
                    const e = xi.get("mappedVerticalName");
                    t = e && this.placements[e] ? e : "other";
                }
                return this.placements[t];
            }
        }
        Ia.bidderName = "appnexus";
        class Ca extends Ta {
            constructor(e) {
                super(e), this.aliases = {
                    appnexus: [ Ca.bidderName ]
                }, this.bidderSettings = {
                    storageAllowed: !0
                }, this.debugPlacementId = e.debugPlacementId, this.isDebugMode = "1" === U.get("appnexusast_debug_mode");
            }
            get bidderName() {
                return Ca.bidderName;
            }
            prepareConfigForAdUnit(e, {placementId: t}) {
                return {
                    code: e,
                    mediaTypes: {
                        video: {
                            context: "instream",
                            playerSize: [ 640, 480 ]
                        }
                    },
                    bids: [ {
                        bidder: this.bidderName,
                        params: {
                            placementId: this.isDebugMode ? this.debugPlacementId : t,
                            keywords: Object.assign({}, this.getTargeting(e)),
                            video: {
                                skippable: !1,
                                playback_method: [ "auto_play_sound_off" ],
                                plcmt: 2
                            }
                        }
                    } ]
                };
            }
        }
        Ca.bidderName = "appnexusAst";
        class Na extends Ta {
            constructor(e) {
                super(e), this.networkId = e.networkId;
            }
            get bidderName() {
                return Na.bidderName;
            }
            prepareConfigForAdUnit(e, {sizes: t}) {
                return this.getStandardConfig(e, t);
            }
            getStandardConfig(e, t) {
                return {
                    code: e,
                    mediaTypes: {
                        banner: {
                            sizes: t
                        }
                    },
                    bids: [ {
                        bidder: this.bidderName,
                        params: {
                            networkId: this.networkId
                        }
                    } ]
                };
            }
        }
        Na.bidderName = "criteo";
        class Oa extends Ta {
            constructor(e) {
                super(e), this.aliases = {
                    "freewheel-ssp": [ Oa.bidderName ]
                };
            }
            get bidderName() {
                return Oa.bidderName;
            }
            prepareConfigForAdUnit(e, {zoneId: t}) {
                return {
                    code: e,
                    mediaTypes: {
                        video: {
                            playerSize: [ 640, 480 ]
                        }
                    },
                    bids: [ {
                        bidder: this.bidderName,
                        params: {
                            format: "instream",
                            zoneId: t,
                            vastUrlParams: {
                                protocolVersion: "4.2"
                            }
                        }
                    } ]
                };
            }
        }
        Oa.bidderName = "freewheel";
        class Da extends Ta {
            constructor(e) {
                super(e);
            }
            get bidderName() {
                return Da.bidderName;
            }
            prepareConfigForAdUnit(e, {sizes: t, inScreen: i}) {
                return {
                    code: e,
                    mediaTypes: {
                        banner: {
                            sizes: t
                        }
                    },
                    bids: [ {
                        bidder: this.bidderName,
                        params: {
                            inScreen: i
                        }
                    } ]
                };
            }
        }
        Da.bidderName = "gumgum";
        class La extends Ta {
            constructor(e) {
                super(e), this.aliases = {
                    ix: [ La.bidderName ]
                }, this.bidderSettings = {
                    storageAllowed: !0
                };
            }
            get bidderName() {
                return La.bidderName;
            }
            prepareConfigForAdUnit(e, {sizes: t, siteId: i}) {
                return Y.get(`slots.${e}.isVideo`) ? this.getVideoConfig(e, i) : this.getStandardConfig(e, {
                    sizes: t,
                    siteId: i
                });
            }
            getGPIDValue(e) {
                return Tn.build(Y.get("adUnitId"), {
                    slotConfig: {
                        adProduct: e,
                        group: "PB",
                        slotNameSuffix: ""
                    }
                });
            }
            getVideoConfig(e, t) {
                return {
                    code: e,
                    mediaTypes: {
                        video: {
                            context: "instream",
                            playerSize: [ 640, 480 ],
                            plcmt: [ 2 ]
                        }
                    },
                    ortb2Imp: {
                        ext: {
                            gpid: this.getGPIDValue(e)
                        }
                    },
                    bids: [ {
                        bidder: this.bidderName,
                        params: {
                            siteId: t,
                            size: [ 640, 480 ],
                            video: {
                                context: "instream",
                                playerSize: [ 640, 480 ],
                                mimes: [ "video/mp4", "video/x-flv", "video/webm", "video/ogg", "application/javascript" ],
                                minduration: 1,
                                maxduration: 30,
                                protocols: [ 2, 3, 5, 6 ],
                                api: [ 2 ],
                                w: 640,
                                h: 480
                            }
                        }
                    } ]
                };
            }
            getStandardConfig(e, {sizes: t, siteId: i}) {
                return {
                    code: e,
                    mediaTypes: {
                        banner: {
                            sizes: t
                        }
                    },
                    ortb2Imp: {
                        ext: {
                            gpid: this.getGPIDValue(e)
                        }
                    },
                    bids: this.getBids(t, i)
                };
            }
            getBids(e, t) {
                return Array.isArray(t) && t.length > 0 ? this.getBidsForMultipleSiteIds(e, t) : e.map((e => ({
                    bidder: this.bidderName,
                    params: {
                        siteId: t,
                        size: e
                    }
                })));
            }
            getBidsForMultipleSiteIds(e, t) {
                return t.map(((t, i) => ({
                    bidder: this.bidderName,
                    params: {
                        size: e[i],
                        siteId: t
                    }
                })));
            }
        }
        La.bidderName = "indexExchange";
        class Pa extends Ta {
            constructor(e) {
                super(e), this.bidderSettings = {
                    storageAllowed: !0
                };
            }
            get bidderName() {
                return Pa.bidderName;
            }
            prepareConfigForAdUnit(e, {sizes: t, placementId: i}) {
                return {
                    code: e,
                    mediaTypes: {
                        banner: {
                            sizes: t
                        }
                    },
                    bids: this.getBids(i)
                };
            }
            getBids(e) {
                return Array.isArray(e) && e.length > 0 ? e.map((e => ({
                    bidder: this.bidderName,
                    params: {
                        placementId: e
                    }
                }))) : [ {
                    bidder: this.bidderName,
                    params: {
                        placementId: e
                    }
                } ];
            }
        }
        Pa.bidderName = "kargo";
        class ka extends Ta {
            constructor(e) {
                super(e), this.accountId = e.accountId;
            }
            get bidderName() {
                return ka.bidderName;
            }
            prepareConfigForAdUnit(e, {sizes: t}) {
                return {
                    code: e,
                    mediaTypes: {
                        banner: {
                            sizes: t
                        }
                    },
                    bids: [ {
                        bidder: this.bidderName,
                        params: {}
                    } ]
                };
            }
        }
        ka.bidderName = "mgnipbs";
        class xa extends Ta {
            constructor(e) {
                super(e);
            }
            get bidderName() {
                return xa.bidderName;
            }
            prepareConfigForAdUnit(e, {sizes: t, cid: i, crid: n}) {
                return Y.get(`slots.${e}.isVideo`) ? this.getVideoConfig(e, i, n) : this.getStandardConfig(e, t, i, n);
            }
            getVideoConfig(e, t, i) {
                return {
                    code: e,
                    mediaTypes: {
                        video: {
                            playerSize: [ 640, 480 ],
                            context: "instream",
                            api: [ 2 ],
                            linearity: 1,
                            mimes: [ "video/mp4", "video/x-flv", "video/webm", "video/ogg" ],
                            maxduration: 30,
                            protocols: [ 2, 3, 5, 6 ],
                            playbackmethod: [ 2, 3 ]
                        }
                    },
                    bids: [ {
                        bidder: this.bidderName,
                        params: {
                            cid: t,
                            crid: i,
                            video: {
                                w: "640",
                                h: "480",
                                mimes: [ "video/mp4", "video/x-flv", "video/webm", "video/ogg" ],
                                playbackmethod: [ 2, 3 ],
                                maxduration: 30,
                                minduration: 1,
                                startdelay: 0
                            }
                        }
                    } ]
                };
            }
            getStandardConfig(e, t, i, n) {
                return {
                    code: e,
                    mediaTypes: {
                        banner: {
                            sizes: t
                        }
                    },
                    bids: [ {
                        bidder: this.bidderName,
                        params: {
                            cid: i,
                            crid: n
                        }
                    } ]
                };
            }
        }
        xa.bidderName = "medianet";
        class Ra extends Ta {
            constructor(e) {
                super(e), this.bidderSettings = {
                    storageAllowed: !0
                };
            }
            get bidderName() {
                return Ra.bidderName;
            }
            prepareConfigForAdUnit(e, {sizes: t, siteId: i}) {
                return {
                    code: e,
                    mediaTypes: {
                        banner: {
                            sizes: t
                        }
                    },
                    bids: [ {
                        bidder: this.bidderName,
                        params: {
                            siteId: i
                        }
                    } ]
                };
            }
        }
        Ra.bidderName = "nobid";
        class Ua extends Ta {
            constructor(e) {
                super(e);
            }
            get bidderName() {
                return Ua.bidderName;
            }
            prepareConfigForAdUnit(e, {adUnitId: t, assetKey: i, sizes: n}) {
                return {
                    code: e,
                    mediaTypes: {
                        banner: {
                            sizes: n
                        }
                    },
                    bids: [ {
                        bidder: this.bidderName,
                        params: {
                            assetKey: i,
                            adUnitId: t,
                            skipSizeCheck: !0
                        }
                    } ]
                };
            }
        }
        Ua.bidderName = "ogury";
        class Va extends Ta {
            constructor(e) {
                super(e), this.delDomain = e.delDomain;
            }
            get bidderName() {
                return Va.bidderName;
            }
            prepareConfigForAdUnit(e, {sizes: t, unit: i}) {
                return Y.get(`slots.${e}.isVideo`) ? this.getVideoConfig(e, i) : this.getStandardConfig(e, t, i);
            }
            getVideoConfig(e, t) {
                return {
                    code: e,
                    mediaTypes: {
                        video: {
                            playerSize: [ 640, 480 ],
                            context: "instream",
                            mimes: [ "video/mp4", "video/x-flv" ]
                        }
                    },
                    bids: [ {
                        bidder: this.bidderName,
                        params: {
                            unit: t,
                            delDomain: this.delDomain
                        }
                    } ]
                };
            }
            getStandardConfig(e, t, i) {
                return {
                    code: e,
                    mediaTypes: {
                        banner: {
                            sizes: t
                        }
                    },
                    bids: [ {
                        bidder: this.bidderName,
                        params: {
                            unit: i,
                            delDomain: this.delDomain
                        }
                    } ]
                };
            }
        }
        Va.bidderName = "openx";
        class Ma extends Ta {
            constructor(e) {
                super(e), this.testGroup = Math.floor(100 * Math.random()).toString(), this.customTargeting = {
                    s1: [ Y.get("wiki.targeting.wikiIsTop1000") ? xi.get("s1") || "" : "not a top1k wiki" ],
                    lang: [ xi.get("wikiLanguage") || xi.get("lang") || "en" ],
                    testgroup: this.testGroup
                }, this.dcn = e.dcn, this.enabled && xi.set("testgroup", this.testGroup);
            }
            get bidderName() {
                return Ma.bidderName;
            }
            prepareConfigForAdUnit(e, {sizes: t, pos: i, placementId: n}) {
                return {
                    code: e,
                    mediaTypes: {
                        banner: {
                            sizes: t
                        }
                    },
                    bids: [ {
                        bidder: "ozone",
                        params: {
                            publisherId: "OZONEFAN0001",
                            siteId: "1500000156",
                            placementId: n,
                            pos: i,
                            customData: [ {
                                settings: {},
                                targeting: Object.assign({}, this.getTargeting(e, this.customTargeting))
                            } ]
                        }
                    } ]
                };
            }
        }
        Ma.bidderName = "ozone";
        class za extends Ta {
            constructor(e) {
                super(e), this.publisherId = e.publisherId;
            }
            get bidderName() {
                return za.bidderName;
            }
            prepareConfigForAdUnit(e, {sizes: t, ids: i}) {
                return Y.get(`slots.${e}.isVideo`) ? this.getVideoConfig(e, i) : this.getStandardConfig(e, t, i);
            }
            getVideoConfig(e, t) {
                return {
                    code: e,
                    mediaTypes: {
                        video: {
                            playerSize: [ 640, 480 ],
                            context: "instream"
                        }
                    },
                    bids: this.getBids(t, {
                        video: {
                            mimes: [ "video/mp4", "video/x-flv", "video/webm", "video/ogg" ],
                            skippable: !0,
                            minduration: 1,
                            maxduration: 30,
                            startdelay: 0,
                            playbackmethod: [ 2, 3 ],
                            api: [ 2 ],
                            protocols: [ 2, 3, 5, 6 ],
                            linearity: 1,
                            placement: 1,
                            plcmt: 2
                        }
                    })
                };
            }
            getStandardConfig(e, t, i) {
                return {
                    code: e,
                    mediaTypes: {
                        banner: {
                            sizes: t
                        }
                    },
                    bids: this.getBids(i)
                };
            }
            getBids(e, t = {}) {
                return e.map((e => ({
                    bidder: this.bidderName,
                    params: Object.assign({
                        adSlot: e,
                        publisherId: this.publisherId
                    }, t)
                })));
            }
        }
        za.bidderName = "pubmatic";
        class ja extends Ta {
            constructor(e) {
                super(e), this.aliases = {
                    ix: [ ja.bidderName ]
                }, this.bidderSettings = {
                    storageAllowed: !0
                };
            }
            get bidderName() {
                return ja.bidderName;
            }
            prepareConfigForAdUnit(e, {sizes: t, siteId: i}) {
                return Y.get(`slots.${e}.isVideo`) ? this.getVideoConfig(e, i) : this.getStandardConfig(e, {
                    sizes: t,
                    siteId: i
                });
            }
            getVideoConfig(e, t) {
                return {
                    code: e,
                    mediaTypes: {
                        video: {
                            context: "instream",
                            playerSize: [ 640, 480 ]
                        }
                    },
                    bids: [ {
                        bidder: this.bidderName,
                        params: {
                            siteId: t,
                            size: [ 640, 480 ],
                            video: {
                                mimes: [ "video/mp4", "video/x-flv", "video/webm", "video/ogg", "application/javascript" ],
                                minduration: 1,
                                maxduration: 30,
                                protocols: [ 2, 3, 5, 6 ],
                                api: [ 2 ]
                            }
                        }
                    } ]
                };
            }
            getStandardConfig(e, {sizes: t, siteId: i}) {
                return {
                    code: e,
                    mediaTypes: {
                        banner: {
                            sizes: t
                        }
                    },
                    bids: t.map((e => ({
                        bidder: this.bidderName,
                        params: {
                            siteId: i,
                            size: e
                        }
                    })))
                };
            }
        }
        ja.bidderName = "roundel";
        class Ba extends Ta {
            constructor(e) {
                super(e), this.accountId = e.accountId, this.customTargeting = {
                    s1: [ Y.get("wiki.targeting.wikiIsTop1000") ? xi.get("s1") || "" : "not a top1k wiki" ],
                    lang: [ xi.get("wikiLanguage") || xi.get("lang") || "en" ]
                };
            }
            get bidderName() {
                return Ba.bidderName;
            }
            prepareConfigForAdUnit(e, {siteId: t, zoneId: i, sizeId: n, position: s}) {
                return "featured" !== e || Y.get("custom.hasFeaturedVideo") ? {
                    code: e,
                    mediaTypes: {
                        video: {
                            playerSize: [ 640, 480 ],
                            context: "instream",
                            api: [ 2 ],
                            linearity: 1,
                            mimes: [ "video/mp4", "video/x-flv", "video/webm", "video/ogg" ],
                            maxduration: 30,
                            protocols: [ 2, 3, 5, 6 ]
                        }
                    },
                    bids: [ {
                        bidder: this.bidderName,
                        params: {
                            position: s,
                            siteId: t,
                            zoneId: i,
                            accountId: this.accountId,
                            name: e,
                            inventory: Object.assign({}, this.getTargeting(e, this.customTargeting)),
                            video: {
                                playerWidth: "640",
                                playerHeight: "480",
                                size_id: n,
                                language: this.customTargeting.lang[0]
                            }
                        }
                    } ]
                } : null;
            }
        }
        Ba.bidderName = "rubicon";
        class Fa extends Ta {
            constructor(e) {
                super(e), this.aliases = {
                    rubicon: [ Fa.bidderName ]
                }, this.accountId = e.accountId, this.customTargeting = {
                    s1: [ Y.get("wiki.targeting.wikiIsTop1000") ? xi.get("s1") || "" : "not a top1k wiki" ],
                    lang: [ xi.get("wikiLanguage") || xi.get("lang") || "en" ]
                };
            }
            get bidderName() {
                return Fa.bidderName;
            }
            prepareConfigForAdUnit(e, {siteId: t, zoneId: i, sizes: n, position: s, targeting: o}) {
                return {
                    code: e,
                    mediaTypes: {
                        banner: {
                            sizes: n
                        }
                    },
                    bids: this.getBids(e, s, t, i, o)
                };
            }
            getBids(e, t, i, n, s) {
                return Array.isArray(n) && n.length > 0 ? n.map((n => ({
                    bidder: this.bidderName,
                    params: {
                        position: t,
                        siteId: i,
                        zoneId: n,
                        accountId: this.accountId,
                        name: e,
                        keywords: [ "rp.fastlane" ],
                        inventory: Object.assign({}, this.getTargeting(e, Object.assign(Object.assign({}, s || {}), this.customTargeting)))
                    }
                }))) : [ {
                    bidder: this.bidderName,
                    params: {
                        position: t,
                        siteId: i,
                        zoneId: n,
                        accountId: this.accountId,
                        name: e,
                        keywords: [ "rp.fastlane" ],
                        inventory: Object.assign({}, this.getTargeting(e, Object.assign(Object.assign({}, s || {}), this.customTargeting)))
                    }
                } ];
            }
        }
        Fa.bidderName = "rubicon_display";
        class $a extends Ta {
            constructor(e) {
                super(e);
            }
            get bidderName() {
                return $a.bidderName;
            }
            prepareConfigForAdUnit(e, {sizes: t, publisherId: i, adUnitId: n, placement: s = "inBanner"}) {
                return Y.get(`slots.${e}.isVideo`) ? this.getVideoConfig(e, i, n, t) : {
                    code: e,
                    mediaTypes: {
                        banner: {
                            sizes: t
                        }
                    },
                    bids: [ {
                        bidder: this.bidderName,
                        params: {
                            publisherId: i,
                            adUnitId: n,
                            placement: s
                        }
                    } ]
                };
            }
            getVideoConfig(e, t, i, n) {
                return {
                    code: e,
                    mediaTypes: {
                        video: {
                            playerSize: n.length > 0 ? n[0] : [ 640, 480 ],
                            context: "instream",
                            mimes: [ "video/mp4", "video/x-flv", "video/webm", "video/ogg" ],
                            skip: 1,
                            minduration: 1,
                            maxduration: 30,
                            startdelay: 0,
                            playbackmethod: [ 2, 3 ],
                            linearity: 1,
                            placement: 1
                        }
                    },
                    bids: [ {
                        bidder: this.bidderName,
                        params: {
                            publisherId: t,
                            adUnitId: i,
                            placement: "inStream"
                        }
                    } ]
                };
            }
        }
        $a.bidderName = "seedtag";
        class Ga extends Ta {
            constructor(e) {
                super(e), this.aliases = {}, this.aliases[Y.get("bidders.prebid.testBidder.name")] = [ Ga.bidderName ];
            }
            get bidderName() {
                return Ga.bidderName;
            }
            prepareConfigForAdUnit(e, {sizes: t, parameters: i}) {
                return Y.get(`slots.${e}.isVideo`) ? this.getVideoConfig(e, i) : this.getStandardConfig(e, {
                    sizes: t,
                    parameters: i
                });
            }
            getVideoConfig(e, t) {
                return {
                    code: e,
                    mediaTypes: {
                        video: {
                            context: "instream",
                            playerSize: [ 640, 480 ]
                        }
                    },
                    bids: [ {
                        bidder: this.bidderName,
                        params: Object.assign({}, t)
                    } ]
                };
            }
            getStandardConfig(e, {sizes: t, parameters: i}) {
                return {
                    code: e,
                    mediaTypes: {
                        banner: {
                            sizes: t
                        }
                    },
                    bids: [ {
                        bidder: this.bidderName,
                        params: Object.assign({}, i)
                    } ]
                };
            }
        }
        Ga.bidderName = "testBidder";
        class Ha extends Ta {
            constructor(e) {
                super(e), this.bidderSettings = {
                    storageAllowed: !0
                };
            }
            get bidderName() {
                return Ha.bidderName;
            }
            prepareConfigForAdUnit(e, {sizes: t, inventoryCodes: i}) {
                return {
                    code: e,
                    mediaTypes: {
                        banner: {
                            sizes: t
                        }
                    },
                    bids: i.map((e => ({
                        bidder: this.bidderName,
                        params: {
                            inventoryCode: e
                        }
                    })))
                };
            }
        }
        Ha.bidderName = "triplelift";
        class qa extends Ta {
            constructor(e) {
                super(e), this.dcn = e.dcn;
            }
            get bidderName() {
                return qa.bidderName;
            }
            prepareConfigForAdUnit(e, {sizes: t, pos: i}) {
                return {
                    code: e,
                    mediaTypes: {
                        banner: {
                            sizes: t
                        }
                    },
                    bids: [ {
                        bidder: this.bidderName,
                        params: {
                            pos: i,
                            dcn: this.dcn
                        }
                    } ]
                };
            }
        }
        qa.bidderName = "verizon";
        class Wa extends Ta {
            constructor(e) {
                super(e), this.accountId = "647765b7705d4fca3b3e1d58", this.bidderSettings = {
                    storageAllowed: !0
                };
            }
            get bidderName() {
                return Wa.bidderName;
            }
            prepareConfigForAdUnit(e, {sizes: t, placementId: i}) {
                return {
                    code: e,
                    mediaTypes: {
                        banner: {
                            sizes: t
                        }
                    },
                    bids: [ {
                        bidder: this.bidderName,
                        params: {
                            placementId: i,
                            accountId: this.accountId,
                            pbsHost: "webads-pbs.relevant-digital.com"
                        }
                    } ]
                };
            }
        }
        Wa.bidderName = "relevantdigital";
        const Ka = U.get("wikia_adapter");
const Ya = parseInt(U.get("wikia_adapter_limit");
const 10) || 99;
const Qa = parseInt(U.get("wikia_adapter_timeout");
const 10) || 100;
const Xa = "1" === U.get("wikia_adapter_random");
        class Ja extends Ta {
            constructor(e) {
                super(e), this.enabled = !!Ka, this.limit = Ya, this.timeout = Qa, this.useRandomPrice = Xa, 
                this.isCustomBidAdapter = !0;
            }
            static getCreative(e, t) {
                const i = document.createElement("div");
                i.style.background = "#00b7e0", i.style.color = "#fff", i.style.fontFamily = "sans-serif", 
                i.style.width = `${e[0]}px`, i.style.height = `${e[1]}px`, i.style.textAlign = "center";
                const n = document.createElement("p");
                n.innerText = "Wikia Creative", n.style.fontWeight = "bold", n.style.margin = "0", 
                n.style.paddingTop = "10px";
                const s = document.createElement("small");
                return s.innerText = `cpm: ${t}, size: ${e.join("x")}`, i.appendChild(n), i.appendChild(s), 
                i.outerHTML;
            }
            get bidderName() {
                return Ja.bidderName;
            }
            prepareConfigForAdUnit(e, {sizes: t}) {
                return Y.get(`slots.${e}.isNative`) ? this.prepareNativeConfig(wa.getPrebidNativeTemplate(), e) : this.prepareStandardConfig(e, {
                    sizes: t
                });
            }
            prepareNativeConfig(e, t) {
                return {
                    code: t,
                    mediaTypes: {
                        native: {
                            sendTargetingKeys: !1,
                            adTemplate: e,
                            title: {
                                required: !0
                            },
                            body: {
                                required: !0
                            },
                            clickUrl: {
                                required: !0
                            },
                            displayUrl: {
                                required: !1
                            },
                            image: {
                                required: !1,
                                aspect_ratios: [ {
                                    min_width: 100,
                                    min_height: 100,
                                    ratio_width: 1,
                                    ratio_height: 1
                                } ]
                            }
                        }
                    },
                    bids: [ {
                        bidder: this.bidderName,
                        params: {}
                    } ]
                };
            }
            prepareStandardConfig(e, {sizes: t}) {
                return {
                    code: e,
                    mediaTypes: {
                        banner: {
                            sizes: t
                        }
                    },
                    bids: [ {
                        bidder: this.bidderName,
                        params: {}
                    } ]
                };
            }
            getSpec() {
                return {
                    code: this.bidderName,
                    supportedMediaTypes: [ "banner", "native" ]
                };
            }
            getPrice() {
                return this.useRandomPrice ? Math.floor(2e3 * Math.random()) / 100 : parseInt(Ka, 10) / 100;
            }
            callBids(e, t, i) {
                this.addBids(e, t, i);
            }
            addBids(e, t, i) {
                setTimeout((() => h(this, void 0, void 0, (function*() {
                    const n = yield Li.init();
                    e.bids.map((i => {
                        0 !== this.limit && (t(i.adUnitCode, i.mediaTypes.native ? this.createNativeBidResponse(n, i, e) : this.createStandardBidResponse(n, i, e)), 
                        this.limit -= 1);
                    })), i();
                }))), this.timeout);
            }
            createNativeBidResponse(e, t, i) {
                const n = e.createBid(1);
const s = this.getPrice();
                return n.auctionId = i.auctionId, n.bidderCode = i.bidderCode, n.bidderRequestId = i.bidderRequestId, 
                n.transactionId = t.transactionId, n.cpm = s, n.ttl = 300, n.mediaType = "native", 
                n.native = {
                    body: "Wikia is an old name of Fandom. Haven't heard of Fandom?",
                    clickTrackers: [ "https://track-click.url" ],
                    clickUrl: "https://fandom.com",
                    url: "https://fandom.com",
                    image: {
                        url: "https://placekitten.com/100/100",
                        height: 100,
                        width: 100
                    },
                    impressionTrackers: [ "https://track-impression.url" ],
                    title: "Wikia Native Creative"
                }, n;
            }
            createStandardBidResponse(e, t, i) {
                const n = e.createBid(1);
const [s;
const o] = t.sizes[0];
const r = this.getPrice();
                return n.ad = Ja.getCreative(t.sizes[0], r), n.auctionId = i.auctionId, n.bidderCode = i.bidderCode, 
                n.bidderRequestId = i.bidderRequestId, n.transactionId = t.transactionId, n.cpm = r, 
                n.ttl = 300, n.mediaType = "banner", n.width = s, n.height = o, n;
            }
        }
        Ja.bidderName = "wikia";
        const Za = U.get("wikia_video_adapter");
const ed = parseInt(U.get("wikia_adapter_limit");
const 10) || 99;
const td = parseInt(U.get("wikia_adapter_timeout");
const 10) || 100;
const id = "1" === U.get("wikia_adapter_random");
        class nd extends Ta {
            constructor(e) {
                super(e), this.enabled = !!Za, this.limit = ed, this.timeout = td, this.useRandomPrice = id, 
                this.isCustomBidAdapter = !0;
            }
            static getVastUrl(e, t, i) {
                return da(0, i, {
                    videoAdUnitId: Y.get(`bidders.prebid.wikiaVideo.slots.${i}.videoAdUnitId`),
                    customParams: Y.get(`bidders.prebid.wikiaVideo.slots.${i}.customParams`)
                });
            }
            get bidderName() {
                return nd.bidderName;
            }
            prepareConfigForAdUnit(e) {
                return {
                    code: e,
                    mediaTypes: {
                        video: {
                            context: "outstream",
                            playerSize: [ 640, 480 ]
                        }
                    },
                    bids: [ {
                        bidder: this.bidderName,
                        params: {}
                    } ]
                };
            }
            getSpec() {
                return {
                    code: this.bidderName,
                    supportedMediaTypes: [ "video" ]
                };
            }
            getPrice() {
                return this.useRandomPrice ? Math.floor(20 * Math.random()) : parseInt(Za, 10) / 100;
            }
            callBids(e, t, i) {
                this.addBids(e, t, i);
            }
            addBids(e, t, i) {
                setTimeout((() => h(this, void 0, void 0, (function*() {
                    const n = yield Li.init();
                    e.bids.forEach((i => {
                        if (0 === this.limit) return;
                        const s = n.createBid(1);
const [o;
const r] = i.sizes[0];
const a = i.adUnitCode;
                        s.auctionId = e.auctionId, s.bidderCode = e.bidderCode, s.bidderRequestId = e.bidderRequestId, 
                        s.cpm = this.getPrice(), s.creativeId = "foo123_wikiaVideoCreativeId", s.ttl = 300, 
                        s.mediaType = "video", s.width = o, s.height = r, s.transactionId = i.transactionId, 
                        s.vastUrl = nd.getVastUrl(o, r, a), s.videoCacheKey = "123foo_wikiaVideoCacheKey", 
                        t(i.adUnitCode, s), this.limit -= 1;
                    })), i();
                }))), this.timeout);
            }
        }
        nd.bidderName = "wikiaVideo";
        class sd extends Ta {
            constructor(e) {
                super(e);
            }
            get bidderName() {
                return sd.bidderName;
            }
            prepareConfigForAdUnit(e, {sizes: t, pubId: i}) {
                return this.getStandardConfig(e, t, i);
            }
            getStandardConfig(e, t, i) {
                return {
                    code: e,
                    mediaTypes: {
                        banner: {
                            sizes: t
                        }
                    },
                    bids: this.getBids(i)
                };
            }
            getBids(e) {
                return e.map((e => ({
                    bidder: this.bidderName,
                    params: {
                        pubId: e
                    }
                })));
            }
        }
        function od(e, t = null) {
            return h(this, void 0, void 0, (function*() {
                let i = {};
                const n = Y.get("bidders.prebid.priceFloor");
const s = yield function(e) {
                    return h(this;
const void 0;
const void 0;
const (function*() {
                        return ((yield Li.init()).getBidResponsesForAdUnitCode(e).bids || []).filter((e => function(e) {
                            return e.getStatusCode && 1 === e.getStatusCode();
                        }(e) && "rendered" !== e.status));
                    }));
                }(e);
                if (s.length) {
                    let e = null;
                    s.forEach((i => {
                        t && t !== i.bidderCode || n && "object" == typeof n && n[`${i.width}x${i.height}`] && i.cpm < parseFloat(n[`${i.width}x${i.height}`]) || (e = e ? e.cpm === i.cpm ? e.timeToRespond > i.timeToRespond ? i : e : e.cpm < i.cpm ? i : e : i);
                    })), e && (i = e.adserverTargeting);
                }
                const {hb_adid: o} = i;
                if (o) {
                    const t = yield function(e;
const t) {
                        return h(this;
const void 0;
const void 0;
const (function*() {
                            const i = yield function(e;
const t) {
                                return h(this;
const void 0;
const void 0;
const (function*() {
                                    const i = yield Li.init();
const {bids: n} = i.getBidResponsesForAdUnitCode(e);
const s = n.filter((e => t === e.adId));
                                    return s.length ? s[0] : null;
                                }));
                            }(e, t);
                            return i && "video" === i.mediaType ? i.videoCacheKey : "disabled";
                        }));
                    }(e, o);
                    t && (i.hb_uuid = t);
                }
                return i || {};
            }));
        }
        sd.bidderName = "yahoossp";
        const rd = new class {
            constructor() {
                this.adapters = new Map;
const this.availableAdapters = [ Ia;
const Ca;
const Na;
const Oa;
const Da;
const La;
const Pa;
const ka;
const xa;
const Ra;
const Ua;
const Va;
const Ma;
const za;
const ja;
const Ba;
const Fa;
const $a;
const Ga;
const Ha;
const qa;
const Wa;
const Ja;
const nd;
const sd ];
            }
            getAdapter(e) {
                return this.getAdapters().get(e);
            }
            getAdapters() {
                if (!this.adapters.size) {
                    const e = Y.get("bidders.prebid");
                    this.availableAdapters.forEach((t => {
                        const i = e[t.bidderName];
                        (function(e) {
                            if ("object" != typeof e) return !1;
                            const t = "boolean" == typeof e.enabled;
const i = "object" == typeof e.slots;
                            return t && i;
                        })(i) && this.adapters.set(t.bidderName, new t(i));
                    }));
                }
                return this.adapters;
            }
            configureAdapters() {
                this.getAdapters().forEach((e => {
                    const t = e.aliases;
                    t && this.configureAliases(t), e.isCustomBidAdapter && this.configureCustomAdapter(e.bidderName, e);
                }));
            }
            setupAdUnits() {
                const e = [];
                return rd.getAdapters().forEach((t => {
                    t && t.enabled && t.prepareAdUnits().forEach((t => {
                        t && function(e) {
                            const t = Y.get(`slots.${e}`) ? Mn.getState(e) : function(e) {
                                return Object.keys(Y.get("slots")).some((t => Y.get(`slots.${t}.bidderAlias`) === e && Mn.getState(t)));
                            }(e);
                            return ("static" !== Y.get("bidders.prebid.filter") || e.includes("video") || null !== document.querySelector(`div[id="${e}"]`)) && t;
                        }(t.code) && e.push(t);
                    }));
                })), e;
            }
            configureAliases(e) {
                return h(this, void 0, void 0, (function*() {
                    const t = yield Li.init();
                    Object.keys(e).forEach((i => e[i].forEach((e => t.aliasBidder(i, e)))));
                }));
            }
            configureCustomAdapter(e, t) {
                return h(this, void 0, void 0, (function*() {
                    return (yield Li.init()).registerBidAdapter((() => t), e);
                }));
            }
        }, ad = "Id5", dd = new class {
            constructor() {
                this.partnerId = 1139, this.id5GroupKey = "id5_group", this.storage = new Ei;
            }
            isEnabled() {
                return Y.get("bidders.prebid.id5") && !Y.get("options.optOutSale") && !ln();
            }
            getConfig() {
                if (!this.isEnabled()) return void bi(ad, "disabled");
                bi(ad, "enabled"), Bt.emit(zt.ID5_START);
                const e = Y.get("bidders.prebid.id5AbValue");
                e ? bi(ad, "A/B testing enabled", "value=", e) : bi(ad, "A/B testing disabled");
                const t = {
                    name: "id5Id";
const params: {
                        partner: this.partnerId;
const abTesting: {
                            enabled: void 0 !== e;
const controlGroupPct: e
                        }
                    };
const storage: {
                        type: "html5";
const name: "id5id";
const expires: 90;
const refreshInSeconds: 28800
                    }
                };
                return bi(ad, "config", t), t;
            }
            getPartnerId() {
                return this.partnerId;
            }
            setupAbTesting(e) {
                return h(this, void 0, void 0, (function*() {
                    const t = this.getControlGroupFromStorage() || (yield this.getControlGroupFromPbjsObject(e));
                    bi(ad, "Control group", t), this.setTargeting(this.id5GroupKey, t), t && "U" !== t && this.saveInStorage(this.id5GroupKey, t);
                }));
            }
            getControlGroupFromStorage() {
                const e = this.storage.getItem(this.id5GroupKey);
                if (null !== e) return e;
            }
            getControlGroupFromPbjsObject(e) {
                var t;
var i;
var n;
                return h(this, void 0, void 0, (function*() {
                    yield new Pi((() => {
                        var t;
var i;
                        return void 0 !== (null === (i = null === (t = e.getUserIds()) || void 0 === t ? void 0 : t.id5id) || void 0 === i ? void 0 : i.ext);
                    }), 10, 20).until();
                    const s = null === (n = null === (i = null === (t = e.getUserIds()) || void 0 === t ? void 0 : t.id5id) || void 0 === i ? void 0 : i.ext) || void 0 === n ? void 0 : n.abTestingControlGroup;
                    return void 0 === s ? "U" : !0 === s ? "A" : "B";
                }));
            }
            saveInStorage(e, t) {
                null === this.storage.getItem(e) && (this.storage.setItem(this.id5GroupKey, t), 
                bi(ad, e, "saved in storage", t));
            }
            setTargeting(e, t) {
                xi.set(e, t), bi(ad, "set targeting", e, t);
            }
        };
        function ld(e) {
            return 0 === e ? 0 : e < 1 ? 1 : Math.floor(e);
        }
        function cd(e) {
            return e ? parseFloat(e).toFixed(2) : "";
        }
        const ud = "prebid";
const hd = {
            buckets: [ {
                max: 5;
const increment: .01
            };
const {
                max: 10;
const increment: .1
            };
const {
                max: 20;
const increment: .5
            };
const {
                max: 50;
const increment: 1
            } ]
        };
const pd = {
            buckets: [ {
                max: 10;
const increment: .01
            };
const {
                max: 20;
const increment: .5
            };
const {
                max: 50;
const increment: 1
            } ]
        };
        function gd(e) {
            return h(this, void 0, void 0, (function*() {
                const t = xi.get("hb_adid";
const e.getSlotName());
                t && ((yield Li.init()).markWinningBidAsUsed({
                    adId: t
                }), e.emit(ki.VIDEO_AD_USED));
            }));
        }
        Bt.onSlotEvent(ki.VIDEO_AD_IMPRESSION, (({slot: e}) => gd(e))), Bt.onSlotEvent(ki.VIDEO_AD_ERROR, (({slot: e}) => gd(e)));
        class md extends ea {
            constructor(e, t = 2e3) {
                super("prebid", e, t), this.bidderConfig = e, this.timeout = t, this.tcf = ir, rd.configureAdapters(), 
                this.adUnits = rd.setupAdUnits(), this.bidsRefreshing = Y.get("bidders.prebid.bidsRefreshing") || {}, 
                this.prebidConfig = {
                    bidderSequence: "random",
                    bidderTimeout: this.timeout,
                    cache: {
                        url: "https://prebid.adnxs.com/pbc/v1/cache"
                    },
                    debug: [ "1", "true" ].includes(U.get("pbjs_debug")),
                    cpmRoundingFunction: ld,
                    mediaTypePriceGranularity: {
                        banner: hd,
                        video: pd,
                        "video-outstream": pd
                    },
                    rubicon: {
                        singleRequest: !0
                    },
                    userSync: {
                        filterSettings: {
                            iframe: {
                                bidders: "*",
                                filter: "include"
                            },
                            image: {
                                bidders: "*",
                                filter: "include"
                            }
                        },
                        userIds: [],
                        auctionDelay: Y.get("bidders.prebid.auctionDelay") || 50,
                        syncsPerBidder: 3,
                        syncDelay: 6e3
                    }
                }, ln() && (this.prebidConfig.coppa = !0), this.prebidConfig = Object.assign(Object.assign(Object.assign(Object.assign({}, this.prebidConfig), this.configureTargeting()), this.configureTCF()), this.configureS2sBidding()), 
                this.configureUserSync(), this.applyConfig(this.prebidConfig), this.configureAdUnits(), 
                this.registerBidsRefreshing(), this.registerBidsTracking(), bi(ud, "prebid created", this.prebidConfig);
            }
            configureTargeting() {
                return Y.get("bidders.prebid.disableSendAllBids") ? {
                    enableSendAllBids: !1,
                    targetingControls: {
                        alwaysIncludeDeals: !0,
                        allowTargetingKeys: [ "AD_ID", "BIDDER", "DEAL", "PRICE_BUCKET", "SIZE", "UUID" ]
                    }
                } : {
                    enableSendAllBids: !0,
                    sendBidsControl: {
                        bidLimit: 2,
                        dealPrioritization: !0
                    },
                    targetingControls: {
                        alwaysIncludeDeals: !0,
                        allowTargetingKeys: [ "AD_ID", "BIDDER", "PRICE_BUCKET", "UUID", "SIZE", "DEAL" ],
                        allowSendAllBidsTargetingKeys: [ "AD_ID", "PRICE_BUCKET", "UUID", "SIZE", "DEAL" ]
                    }
                };
            }
            configureUserSync() {
                this.configureOzone(), this.configureId5();
            }
            configureOzone() {
                Y.get("bidders.prebid.ozone") && this.prebidConfig.userSync.userIds.push({
                    name: "pubCommonId",
                    storage: {
                        type: "cookie",
                        name: "_pubcid",
                        expires: 365
                    }
                });
            }
            configureId5() {
                return h(this, void 0, void 0, (function*() {
                    const e = dd.getConfig();
                    if (e) {
                        if (this.prebidConfig.userSync.userIds.push(e), e.params.abTesting.enabled) {
                            const e = yield Li.init();
                            yield dd.setupAbTesting(e);
                        }
                        this.enableId5Analytics(), Bt.emit(zt.ID5_DONE);
                    }
                }));
            }
            enableId5Analytics() {
                Y.get("bidders.prebid.id5Analytics.enabled") && (bi(ud, "enabling ID5 Analytics"), 
                window.pbjs.que.push((() => {
                    window.pbjs.enableAnalytics({
                        provider: "id5Analytics",
                        options: {
                            partnerId: dd.getPartnerId()
                        }
                    });
                })));
            }
            configureTCF() {
                return this.tcf.exists ? {
                    consentManagement: {
                        gdpr: {
                            cmpApi: "iab",
                            timeout: this.timeout,
                            allowAuctionWithoutConsent: !1,
                            defaultGdprScope: !1
                        },
                        usp: {
                            cmpApi: "iab",
                            timeout: 100
                        }
                    }
                } : {};
            }
            configureS2sBidding() {
                if (!Y.get("bidders.s2s.enabled")) return;
                const e = Y.get("bidders.s2s.bidders") || [];
                return bi(ud, "Prebid s2s enabled", e), {
                    cache: {
                        url: "https://prebid-server.rubiconproject.com/cache",
                        ignoreBidderCacheKey: !0
                    },
                    s2sConfig: [ {
                        accountId: 7450,
                        bidders: e,
                        defaultVendor: "rubicon",
                        coopSync: !0,
                        userSyncLimit: 8,
                        allowUnknownBidderCodes: !0,
                        extPrebid: {
                            aliases: {
                                mgnipbs: "rubicon"
                            },
                            cache: {
                                vastxml: {
                                    returnCreative: !1
                                }
                            },
                            extPrebidBidders: this.prepareExtPrebidBiders(e)
                        }
                    } ]
                };
            }
            prepareExtPrebidBiders(e) {
                const t = {};
                return e.forEach((e => {
                    t[e] = {
                        wrappername: "7450_Web_Server"
                    };
                })), t;
            }
            configureAdUnits(e = []) {
                return h(this, void 0, void 0, (function*() {
                    yield Li.init(), e.length ? this.adUnits = e : this.adUnits || (this.adUnits = rd.setupAdUnits());
                }));
            }
            applyConfig(e) {
                return h(this, void 0, void 0, (function*() {
                    return (yield Li.init()).setConfig(e);
                }));
            }
            applySettings() {
                return h(this, void 0, void 0, (function*() {
                    (yield Li.init()).bidderSettings = Object.assign({
                        standard: {
                            suppressEmptyKeys: !0,
                            allowZeroCpmBids: !0
                        }
                    }, function(e) {
                        const t = {};
                        return e.forEach((({bidderName: e, bidderSettings: i, aliases: n}) => {
                            if (!e) return;
                            let s = {
                                adserverTargeting: [ {
                                    key: `hb_deal_${e}`;
let val: ({dealId: e}) => e
                                } ];
let suppressEmptyKeys: !0;
let allowZeroCpmBids: !0
                            };
                            i && (s = Object.assign(Object.assign({}, s), i)), t[e] = s, "object" == typeof n && Object.keys(n).filter((e => !t[e])).forEach((e => t[e] = s));
                        })), t;
                    }(rd.getAdapters()));
                }));
            }
            callBids(e) {
                this.adUnits || (this.adUnits = rd.setupAdUnits()), 0 !== this.adUnits.length && (this.applySettings(), 
                this.removeAdUnits(), this.requestBids(this.adUnits, (() => {
                    e(), Bt.emit(zt.BIDDERS_AUCTION_DONE);
                })), Bt.emit(zt.BIDDERS_BIDS_CALLED));
            }
            removeAdUnits() {
                return h(this, void 0, void 0, (function*() {
                    const e = yield Li.init();
                    (e.adUnits || []).forEach((t => e.removeAdUnit(t.code)));
                }));
            }
            getBestPrice(e) {
                return function(e) {
                    return h(this, void 0, void 0, (function*() {
                        const t = {};
const i = rd.getAdapters();
                        for (const n of Array.from(i.entries())) {
                            const i = yield od(e;
const n[1].bidderName);
const {hb_pb: s} = i;
                            t[n[1].bidderName] = cd(s);
                        }
                        return t;
                    }));
                }(this.getSlotAlias(e));
            }
            getTargetingKeys(e) {
                return Object.keys(xi.dump(e) || {}).filter((e => 0 === e.indexOf("hb_")));
            }
            getTargetingParams(e) {
                return h(this, void 0, void 0, (function*() {
                    const t = yield Li.init();
const i = this.getSlotAlias(e);
                    return t.getAdserverTargeting()[i];
                }));
            }
            isSupported(e) {
                const t = this.getSlotAlias(e);
                return this.adUnits && this.adUnits.some((e => e.code === t));
            }
            registerBidsRefreshing() {
                return h(this, void 0, void 0, (function*() {
                    const e = yield Li.init();
                    this.bidsRefreshing = Y.get("bidders.prebid.bidsRefreshing") || {}, e.onEvent("bidWon", (e => {
                        if (-1 !== this.bidsRefreshing.slots.indexOf(e.adUnitCode)) {
                            Bt.emit(zt.BIDDERS_BIDS_REFRESH, {
                                refreshedSlotNames: [ e.adUnitCode ]
                            });
                            const t = this.adUnits.filter((t => t.code === e.adUnitCode && t.bids && t.bids[0] && t.bids[0].bidder === e.bidderCode));
                            this.requestBids(t, this.bidsRefreshing.bidsBackHandler);
                        }
                    }));
                }));
            }
            registerBidsTracking() {
                return h(this, void 0, void 0, (function*() {
                    const e = yield Li.init();
                    e.onEvent("bidResponse", (e => {
                        Bt.emit(zt.BIDDERS_BIDS_RESPONSE, {
                            bidResponse: this.mapResponseToTrackingBidDefinition(e)
                        });
                    })), e.onEvent("adRenderSucceeded", (e => Zn.reportPrebidWin(e.bid)));
                }));
            }
            mapResponseToTrackingBidDefinition(e) {
                return {
                    bidderName: e.bidderCode,
                    price: e.cpm.toString(),
                    responseTimestamp: e.responseTimestamp,
                    slotName: Zr(e.adUnitCode),
                    size: e.size,
                    timeToRespond: e.timeToRespond
                };
            }
            requestBids(e, t, i = this.timeout) {
                return h(this, void 0, void 0, (function*() {
                    const n = yield Li.init();
                    yield Zn.initialize(n), n.requestBids({
                        adUnits: e,
                        bidsBackHandler: t,
                        timeout: i
                    });
                }));
            }
            calculatePrices() {}
        }
        const fd = "bidders";
        class vd extends ns {
            constructor(e, t) {
                super(e, t), this.instantConfig = e, this.globalTimeout = t, this.biddersProviders = {}, 
                this.realSlotPrices = {}, Bt.onSlotEvent(ki.VIDEO_AD_REQUESTED, (({slot: e}) => {
                    e.updateWinningPbBidderDetails();
                })), Bt.onSlotEvent(ki.VIDEO_AD_USED, (({slot: e}) => {
                    this.updateSlotTargeting(e.getSlotName());
                })), Bt.on(zt.BIDDERS_BIDS_REFRESH, (({refreshedSlotNames: e}) => {
                    e.forEach((e => this.updateSlotTargeting(e)));
                }), !1);
            }
            getName() {
                return "bidders";
            }
            isEnabled() {
                return Y.get("bidders.prebid.enabled") || Y.get("bidders.a9.enabled");
            }
            applyTargetingParams(e, t) {
                Object.keys(t).forEach((i => xi.set(i, t[i], e)));
            }
            getBiddersProviders() {
                return Object.values(this.biddersProviders);
            }
            getBidParameters(e) {
                return h(this, void 0, void 0, (function*() {
                    const t = {};
                    return yield Promise.all(this.getBiddersProviders().map((i => h(this, void 0, void 0, (function*() {
                        if (i && i.wasCalled()) {
                            const n = yield i.getSlotTargetingParams(e);
                            Object.assign(t, n);
                        }
                    }))))), t;
                }));
            }
            getCurrentSlotPrices(e) {
                return h(this, void 0, void 0, (function*() {
                    const t = {};
                    return yield Promise.all(this.getBiddersProviders().map((i => h(this, void 0, void 0, (function*() {
                        if (i && i.isSlotSupported(e)) {
                            const n = yield i.getSlotBestPrice(e);
                            Object.keys(n).forEach((e => {
                                t[e] = n[e];
                            }));
                        }
                    }))))), t;
                }));
            }
            getDfpSlotPrices(e) {
                return this.realSlotPrices[e] || {};
            }
            resetTargetingKeys(e) {
                this.getBiddersProviders().forEach((t => {
                    t.getTargetingKeys(e).forEach((t => {
                        xi.remove(t, e);
                    }));
                })), bi(fd, "resetTargetingKeys", e);
            }
            call() {
                const e = Y.get("bidders") || {};
const t = rn();
                return e.prebid && e.prebid.enabled && (this.biddersProviders.prebid = new md(e.prebid, e.timeout)), 
                Ea.isEnabled() ? this.biddersProviders.a9 = new Ea(e.a9, e.timeout) : bi(fd, "A9 has been disabled"), 
                this.getBiddersProviders().length ? (this.getBiddersProviders().forEach((e => {
                    e.addResponseListener((() => {
                        this.hasAllResponses() && (bi(fd, "resolving call() promise because of having all responses"), 
                        t.resolve(null));
                    })), e.call();
                })), bi(fd, "returning call() promise"), t) : (bi(fd, "resolving call() promise because of no bidder providers"), 
                Promise.resolve());
            }
            storeRealSlotPrices(e) {
                return h(this, void 0, void 0, (function*() {
                    this.realSlotPrices[e] = yield this.getCurrentSlotPrices(e);
                }));
            }
            updateSlotTargeting(e) {
                return h(this, void 0, void 0, (function*() {
                    const t = yield this.getBidParameters(e);
                    return yield this.storeRealSlotPrices(e), this.resetTargetingKeys(e), this.applyTargetingParams(e, t), 
                    bi(fd, "updateSlotTargeting", e, t), Bt.emit(zt.BIDDERS_BIDDING_DONE, {
                        slotName: e,
                        provider: "prebid"
                    }), t;
                }));
            }
            hasAllResponses() {
                return 0 === Object.keys(this.biddersProviders).filter((e => !this.biddersProviders[e].hasResponse())).length;
            }
        }
        var bd;
        let yd = class {
            constructor(e) {
                this.dwTracker = e;
            }
            init() {
                Bt.on(zt.AD_ENGINE_AD_RESIZED, (({slot: e, sizes: t}) => {
                    this.track(e, t.width, t.height);
                }), !1);
            }
            track(e, t, i) {
                this.dwTracker.track({
                    ad_width: t,
                    ad_height: i,
                    slot_id: e.getUid() || "",
                    creative_id: e.creativeId || "",
                    line_item_id: e.lineItemId || "",
                    rv: e.getTargetingProperty("rv") || "",
                    position: e.getMainPositionName(),
                    slot_size: e.getCreativeSize() || ""
                }, ps.AD_ENG_AD_SIZE_INFO);
            }
        };
        var _d;
        yd = l([ N(), u("design:paramtypes", [ "function" == typeof (bd = void 0 !== Ys && Ys) ? bd : Object ]) ], yd);
        let Sd = class {
            constructor(e) {
                this.dwTracker = e;
            }
            track(e) {
                const t = new Date;
                this.dwTracker.track({
                    prop_value: e,
                    timestamp: t.getTime(),
                    tz_offset: t.getTimezoneOffset()
                }, ps.AD_ENG_LABRADOR_INFO);
            }
        };
        var Ed;
var wd;
var Ad;
var Td;
var Id;
        Sd = l([ N(), u("design:paramtypes", [ "function" == typeof (_d = void 0 !== Ys && Ys) ? _d : Object ]) ], Sd);
        const Cd = ee("[AdEngine] Ad clicked";
const {
            _as: "props";
const _p: void 0
        });
        let Nd = class {
            constructor(e;
let t;
let i;
let n;
let s = null) {
                this.labradorTracker = e;
let this.adSizeTracker = t;
let this.dwTracker = i;
let this.bidders = n;
let this.instantConfig = s;
            }
            execute() {
                this.porvataTracker(), this.slotTracker(), this.viewabilityTracker(), this.bidderTracker(), 
                this.postmessageTrackingTracker(), this.experimentGroupsTracker(), this.interventionTracker(), 
                this.adClickTracker(), this.ctaTracker(), this.identityTracker(), this.keyValsTracker(), 
                this.adSizeTracker.init();
            }
            identityTracker() {
                this.instantConfig.get("icIdentityPartners", !1) || Bt.on(zt.IDENTITY_PARTNER_DATA_OBTAINED, (e => {
                    this.dwTracker.track({
                        partner_name: e.payload.partnerName,
                        partner_identity_id: e.payload.partnerIdentityId
                    }, ps.IDENTITY_INFO);
                }), !1);
            }
            porvataTracker() {
                Bt.on(zt.VIDEO_PLAYER_TRACKING, (({eventInfo: e}) => {
                    this.dwTracker.track(e, ps.AD_ENG_PLAYER_INFO);
                }), !1), Nr.register();
            }
            slotTracker() {
                let e = null;
                (Y.get("bidders.prebid.enabled") || Y.get("bidders.a9.enabled")) && (e = this.bidders), 
                Rr.onChangeStatusToTrack.push("top-conflict"), Rr.register((({data: e}) => {
                    this.dwTracker.track(e, ps.AD_ENG_AD_INFO);
                }), {
                    bidders: e
                });
            }
            viewabilityTracker() {
                Mr.register((({data: e}) => (this.dwTracker.track(e, ps.AD_ENG_VIEWABILITY), e)));
            }
            ctaTracker() {
                zr.register((({data: e}) => {
                    this.dwTracker.track(e, ps.AD_ENG_AD_INFO);
                }));
            }
            adClickTracker() {
                jr.register((({data: e}) => {
                    Bt.dispatch(Cd(e)), this.dwTracker.track(e, ps.AD_ENG_AD_INFO);
                }));
            }
            bidderTracker() {
                (Y.get("bidders.prebid.enabled") || Y.get("bidders.a9.enabled")) && $r.register((({data: e}) => {
                    this.dwTracker.track(e, ps.AD_ENG_BIDDERS);
                }));
            }
            postmessageTrackingTracker() {
                new Yr([ "payload", "target" ]).register((e => h(this, void 0, void 0, (function*() {
                    const {target: t;
const payload: i} = e;
                    switch (t) {
                      case Wr.GoogleAnalytics:
                        window.ga("tracker1.send", "event", i.category, i.action, i.label, "number" == typeof i.value ? i.value.toString() : i.value);
                        break;

                      case Wr.DataWarehouse:
                        this.dwTracker.track(i);
                    }
                    return e;
                }))), [ window.origin, ...fn ]);
            }
            experimentGroupsTracker() {
                const e = [ ...wi.make().getSamplingResults();
const ...xi.get("experiment_groups") || [] ].join(";");
                e && this.labradorTracker.track(e);
            }
            interventionTracker() {
                Xr.register();
            }
            keyValsTracker() {
                const e = Object.assign({};
const xi.dump());
                delete e.AU_SEG, this.dwTracker.track({
                    keyvals: JSON.stringify(e)
                }, ps.KEY_VALS);
            }
        };
        var Od;
        Nd = l([ N(), u("design:paramtypes", [ "function" == typeof (Ed = void 0 !== Sd && Sd) ? Ed : Object, "function" == typeof (wd = void 0 !== yd && yd) ? wd : Object, "function" == typeof (Ad = void 0 !== Ys && Ys) ? Ad : Object, "function" == typeof (Td = void 0 !== vd && vd) ? Td : Object, "function" == typeof (Id = void 0 !== Oi && Oi) ? Id : Object ]) ], Nd);
        let Dd = class {
            constructor(e) {
                this.bidders = e;
            }
            execute() {
                Bt.on(zt.AD_ENGINE_SLOT_ADDED, (({slot: e}) => {
                    bi("ad-engine", `Added ad slot ${e.getSlotName()}`), this.bidders.updateSlotTargeting(e.getSlotName());
                }), !1);
            }
        };
        Dd = l([ N(), u("design:paramtypes", [ "function" == typeof (Od = void 0 !== vd && vd) ? Od : Object ]) ], Dd);
        const Ld = "brand-metrics";
        class Pd extends ns {
            call() {
                this.instantConfig.get("icBrandMetrics") ? Bt.on(zt.AD_ENGINE_SLOT_LOADED, this.loadScript, !0) : bi(Ld, "disabled");
            }
            loadScript() {
                const e = "//cdn.brandmetrics.com/tag/9097a5369e204e6eac53b45c7dde13c5/fandom.com_au.js";
                bi(Ld, "loading", e), Di.loadScript(e).then((() => {
                    bi(Ld, "ready");
                }));
            }
        }
        const kd = "captify";
        class xd extends ns {
            constructor() {
                super(...arguments), this.propertyId = 12974;
            }
            call() {
                return h(this, void 0, void 0, (function*() {
                    return this.isEnabled("icCaptify") ? (this.overwritePropertyIdIfPresent(), this.createCaptifyWindowObject(), 
                    this.createAndInsertScript(), Promise.resolve()) : (bi(kd, "disabled"), Promise.resolve());
                }));
            }
            overwritePropertyIdIfPresent() {
                const e = Y.get("services.captify.propertyId");
                this.propertyId = e || this.propertyId;
            }
            createCaptifyWindowObject() {
                window[`captify_kw_query_${this.propertyId}`] = "";
            }
            createAndInsertScript() {
                const e = `https://p.cpx.to/p/${this.propertyId}/px.js`;
const t = document.getElementsByTagName("script")[0];
                Di.createScript(e, !1, t).onload = () => {
                    Bt.emit(zt.CAPTIFY_LOADED), bi(kd, "loaded");
                };
            }
        }
        const Rd = "nielsen-dcr";
const Ud = {};
        class Vd extends ns {
            constructor() {
                super(...arguments), this.nlsnInstance = null;
            }
            call() {
                const e = xi.dump();
const t = Y.get("services.nielsen.customSection") || e.s0v;
const i = e.post_id || e.artid;
                if (!this.isEnabled("icNielsen", !1)) return bi(Rd, "disabled"), null;
                this.nlsnInstance || (this.nlsnInstance = function(e) {
                    var t;
var i;
                    return bi(Rd, "loading"), (t = window)[i = "NOLBUNDLE"] = t[i] || {
                        nlsQ: function(e, n, s, o, r, a) {
                            return (o = (r = t.document).createElement("script")).defer = 1, o.src = ("http:" === t.location.protocol ? "http:" : "https:") + "//cdn-gl.imrworldwide.com/conf/" + e + ".js#name=" + n + "&ns=" + i, 
                            (a = r.getElementsByTagName("script")[0]).parentNode.insertBefore(o, a), t[i][n] = t[i][n] || {
                                g: s || {},
                                ggPM: function(e, s, o, r, a) {
                                    (t[i][n].q = t[i][n].q || []).push([ e, s, o, r, a ]);
                                }
                            }, t[i][n];
                        }
                    }, "1" === U.get("nielsen-dcr-debug") && (Ud.nol_sdkDebug = "debug"), window.NOLBUNDLE.nlsQ(e, "nlsnInstance", Ud);
                }("P26086A07-C7FB-4124-A679-8AC404198BA7")), bi(Rd, "ready");
                const n = {
                    type: "static";
const assetid: `fandom.com/${t}/${e.s1}/${i}`;
const section: `FANDOM ${t.replaceAll("_";
const " ").toUpperCase()} NETWORK`
                };
                return this.nlsnInstance.ggPM("static", n), bi(Rd, "called", n), this.nlsnInstance;
            }
        }
        const Md = [ "gnre";
const "media";
const "pform";
const "pub";
const "theme";
const "tv" ];
        class zd extends ns {
            constructor() {
                super(...arguments), this.CLIENT_ID = 17364, this.logGroup = "Lotame", this.PIXEL_URL = `https://tags.crwdcntrl.net/lt/c/${this.CLIENT_ID}/lt.min.js`;
            }
            call() {
                var e;
var t;
                return h(this, void 0, void 0, (function*() {
                    if (!this.isEnabled("icLotame")) return void bi(this.logGroup, "pixel disabled");
                    const i = {
                        data: {
                            behaviors: {
                                med: function(e = {}) {
                                    return Object.entries(e).filter((([e]) => Md.includes(e))).flatMap((([e;
const t]) => t.map((t => `${e}: ${t}`))));
                                }(null === (t = null === (e = window.fandomContext) || void 0 === e ? void 0 : e.site) || void 0 === t ? void 0 : t.tags)
                            }
                        },
                        config: {
                            clientId: this.CLIENT_ID,
                            onTagReady: () => Bt.emit(zt.LOTAME_READY)
                        }
                    }, n = i.config || {}, s = window["lotame_" + this.CLIENT_ID] = {};
                    s.config = n, s.data = i.data || {}, s.cmd = s.cmd || [], bi(this.logGroup, "pixel enabled"), 
                    yield Di.loadScript(this.PIXEL_URL), Bt.emit(zt.LOTAME_LOADED);
                }));
            }
        }
        var jd;
var Bd;
var Fd;
var $d;
var Gd;
var Hd;
var qd;
var Wd;
var Kd;
        let Yd = class {
            constructor(e;
let t;
let i;
let n;
let s;
let o;
let r;
let a;
let d) {
                this.pipeline = e;
let this.brandMetrics = t;
let this.captify = i;
let this.eyeota = n;
let this.experian = s;
let this.liveRampPixel = o;
let this.nielsen = r;
let this.lotame = a;
let this.liveConnect = d;
let this.firstCallSlotName = "top_leaderboard";
let this.safeTimeout = 5e3;
let this.fired = !1;
let this.logGroup = "ad-stack-partners";
            }
            execute() {
                bi(this.logGroup, "waiting ..."), setTimeout((() => {
                    this.pipelineExecute();
                }), this.safeTimeout), Bt.onSlotEvent(ki.SLOT_RENDERED_EVENT, (() => {
                    bi(this.logGroup, "starting"), this.pipelineExecute();
                }), this.firstCallSlotName);
            }
            pipelineExecute() {
                this.fired || (this.fired = !0, this.pipeline.add(this.lotame, this.liveConnect, this.liveRampPixel, this.brandMetrics, this.eyeota, this.experian, this.captify, this.nielsen).execute().then((() => {
                    bi(this.logGroup, "finished");
                })));
            }
        };
        var Qd;
var Xd;
        Yd = l([ N(), u("design:paramtypes", [ "function" == typeof (jd = void 0 !== tr && tr) ? jd : Object, "function" == typeof (Bd = void 0 !== Pd && Pd) ? Bd : Object, "function" == typeof (Fd = void 0 !== xd && xd) ? Fd : Object, "function" == typeof ($d = void 0 !== sr && sr) ? $d : Object, "function" == typeof (Gd = void 0 !== cr && cr) ? Gd : Object, "function" == typeof (Hd = void 0 !== ur && ur) ? Hd : Object, "function" == typeof (qd = void 0 !== Vd && Vd) ? qd : Object, "function" == typeof (Wd = void 0 !== zd && zd) ? Wd : Object, "function" == typeof (Kd = void 0 !== dr && dr) ? Kd : Object ]) ], Yd);
        let Jd = class {
            constructor(e) {
                this.container = e;
            }
            execute(e, t, i) {
                return h(this, void 0, void 0, (function*() {
                    if (this.isCompoundProcessStep(e)) {
                        const t = this.container.get(e.process);
                        return yield t.execute(e.payload), i();
                    }
                    if (this.isDiProcess(e)) {
                        const t = this.container.get(e);
                        return yield t.execute(), i();
                    }
                    return yield e(), i();
                }));
            }
            isCompoundProcessStep(e) {
                return "object" == typeof e && "process" in e && "function" == typeof e.process.prototype.execute;
            }
            isDiProcess(e) {
                var t;
                return "function" == typeof (null === (t = e.prototype) || void 0 === t ? void 0 : t.execute);
            }
        };
        Jd = l([ N({
            scope: "Transient"
        }), u("design:paramtypes", [ "function" == typeof (Qd = void 0 !== R && R) ? Qd : Object ]) ], Jd);
        let Zd = class extends Gr {
            constructor(e) {
                super(e.get(Jd));
            }
        };
        var el;
        Zd = l([ N({
            scope: "Transient"
        }), u("design:paramtypes", [ "function" == typeof (Xd = void 0 !== R && R) ? Xd : Object ]) ], Zd);
        let tl = class {
            constructor(e) {
                this.container = e;
            }
            execute(e) {
                return Promise.all(e.map((e => this.container.get(Zd).add(e).execute()))).then();
            }
        };
        tl = l([ N({
            scope: "Transient"
        }), u("design:paramtypes", [ "function" == typeof (el = void 0 !== R && R) ? el : Object ]) ], tl);
        class il {
            constructor() {
                this.logGroup = "identity-setup";
            }
            execute() {
                return h(this, void 0, void 0, (function*() {
                    return bi(this.logGroup, "initialized"), yield this.identityEngineReady(), this.setupOver18Targeting(), 
                    Promise.resolve();
                }));
            }
            identityEngineReady() {
                return h(this, void 0, void 0, (function*() {
                    return new Promise((e => {
                        Bt.on(zt.IDENTITY_ENGINE_READY, (() => {
                            const t = dn.getValue("tracking";
const "ppid");
                            if (t && !Y.get("services.intentIq.ppid.enabled") && xi.set("ppid", t), Y.get("services.identityPartners")) {
                                const e = dn.getValue("targeting";
const "AU_SEG");
                                xi.set("AU_SEG", e);
                            }
                            bi(this.logGroup, "ready"), e();
                        }));
                    }));
                }));
            }
            setupOver18Targeting() {
                Bt.on(zt.IDENTITY_PARTNER_DATA_OBTAINED, (() => {
                    const e = window.fandomContext.tracking.over_18;
                    e && xi.set("over_18", e);
                }));
            }
        }
        var nl;
        let sl = class {
            constructor(e) {
                this.container = e;
            }
            execute(e) {
                return h(this, void 0, void 0, (function*() {
                    const t = (yield this.getResult(e.condition)) ? e.yesStep : e.noStep;
                    if (t) return this.container.get(Zd).add(t).execute();
                }));
            }
            getResult(e) {
                return this.isDiCondition(e) ? this.container.get(e).execute() : e();
            }
            isDiCondition(e) {
                var t;
                return "function" == typeof (null === (t = e.prototype) || void 0 === t ? void 0 : t.execute);
            }
        };
        sl = l([ N({
            scope: "Transient"
        }), u("design:paramtypes", [ "function" == typeof (nl = void 0 !== R && R) ? nl : Object ]) ], sl);
        const ol = {
            adUnitId: "/{custom.dfpId}/{custom.serverPrefix}.{slotConfig.group}/{slotConfig.adProduct}{slotConfig.slotNameSuffix}/{state.deviceType}/{targeting.skin}-{targeting.original_host}-{targeting.s2}/{custom.wikiIdentifier}-{targeting.s0}";
const bidders: {
                enabled: !1;
const timeout: 2e3;
const a9: {
                    enabled: !1;
const videoEnabled: !1;
const amazonId: "3115";
const bidsRefreshing: {
                        slots: [ "featured";
const "gallery_leaderboard";
const "incontent_boxad_1";
const "incontent_leaderboard" ]
                    }
                };
const prebid: {
                    enabled: !1;
const bidsRefreshing: {
                        slots: [ "gallery_leaderboard";
const "incontent_boxad_1";
const "incontent_leaderboard" ]
                    }
                }
            };
const custom: {
                dbNameForAdUnit: "_not_a_top1k_wiki";
const dfpId: "5441";
const serverPrefix: "wka1b";
const wikiIdentifier: "_not_a_top1k_wiki"
            };
const events: {
                pushOnScroll: {
                    ids: [];
const threshold: 100;
const nativoThreshold: 200
                }
            };
const slots: {};
const vast: {
                adUnitId: "/{custom.dfpId}/{custom.serverPrefix}.{slotConfig.group}/{slotConfig.adProduct}{slotConfig.slotNameSuffix}/{state.deviceType}/{targeting.skin}-{targeting.original_host}-{targeting.s2}/{custom.wikiIdentifier}-{targeting.s0}";
const adUnitIdWithDbName: "/{custom.dfpId}/{custom.serverPrefix}.{slotConfig.group}/{slotConfig.adProduct}{slotConfig.slotNameSuffix}/{state.deviceType}/{targeting.skin}-{targeting.original_host}-{targeting.s2}/{custom.dbNameForAdUnit}-{targeting.s0}"
            };
const templates: {
                ignoreNavbarHeight: !0;
const incontentAnchorSelector: ".mw-parser-output > h2;
const .mw-parser-output > h3;
const .mw-parser-output > h4;
const .mw-parser-output > h5"
            };
const services: {
                doubleVerify: {
                    slots: [ "top_leaderboard";
const "top_boxad";
const "incontent_boxad_1";
const "incontent_leaderboard";
const "gallery_leaderboard";
const "bottom_leaderboard";
const "featured";
const "incontent_player" ]
                };
const durationMedia: {
                    libraryUrl: "//tag.durationmedia.net/sites/10651/dm.js"
                };
const iasPublisherOptimization: {
                    slots: [ "top_leaderboard";
const "top_boxad";
const "incontent_boxad_1";
const "incontent_leaderboard";
const "gallery_leaderboard";
const "bottom_leaderboard";
const "featured";
const "incontent_player" ]
                };
const externalLogger: {
                    endpoint: "/wikia.php?controller=AdEngine&method=postLog"
                };
const instantConfig: {
                    endpoint: "https://services.fandom.com";
const appName: "fandomdesktop";
const fallback: "https://script.wikia.nocookie.net/fandom-ae-assets/icbm/prod/icbm_state_fandomdesktop.json"
                };
const openWeb: {
                    placementSelector: "#WikiaAdInContentPlaceHolder"
                }
            };
const slotGroups: {
                VIDEO: [ "FEATURED";
const "OUTSTREAM";
const "UAP_BFAA";
const "UAP_BFAB";
const "VIDEO" ]
            };
const src: [ "gpt" ];
const options: {
                customAdLoader: {
                    globalMethodName: "loadCustomAd"
                };
const video: {
                    iasTracking: {
                        enabled: !1;
const config: {
                            anId: "930616";
const campId: "640x480"
                        }
                    }
                };
const wad: {
                    enabled: !1;
const blocking: !1;
const btRec: {
                        enabled: !1
                    }
                }
            }
        };
        let rl;
        class al extends ns {
            call() {
                return Bt.onSlotEvent(ki.SLOT_RENDERED_EVENT, (({slot: e}) => {
                    e.removeClass("default-height");
                })), rl = new Yn, rl.init();
            }
        }
        class dl extends ns {
            constructor() {
                super(...arguments), this.options = {
                    timeout: 1e4
                };
            }
            call() {
                return bi("gpt-provider", "loading GPT..."), Di.loadScript("https://securepubads.g.doubleclick.net/tag/js/gpt.js").then((() => {
                    bi("gpt-provider", "ready"), (new Ss).trackGptLibReady(), Bt.emit(zt.AD_ENGINE_GPT_READY);
                }));
            }
        }
        function ll(e, t, i) {
            return n => Lt(n.pipe(Vt(1), wn(e, t, i), Ut((() => !1))), n);
        }
        const cl = new class {
            isEnabled(e) {
                return e.isIasTrackingEnabled();
            }
            load() {
                return this.scriptPromise || (this.scriptPromise = Di.loadScript("//static.adsafeprotected.com/vans-adapter-google-ima.js", !0, "first")), 
                this.scriptPromise;
            }
            init(e, t) {
                return this.load().then((() => {
                    const i = Y.get("options.video.iasTracking.config");
const n = t.getSlotName();
const {src: s;
const pos: o;
const loc: r} = Mn.get(n).getTargeting();
                    i.custom = s, i.custom2 = o, i.custom3 = r, bi("ias-video-tracking", "ready"), window.googleImaVansAdapter.init(window.google, e.getAdsManager(), e.dom.getVideoContainer(), i);
                }));
            }
        };
        function ul() {
            for (var e = [];
var t = 0; t < arguments.length; t++) e[t] = arguments[t];
            var i = At(e);
            return Xe((function(t, n) {
                for (var s = e.length;
var o = new Array(s);
var r = e.map((function() {
                    return !1;
                })), a = !1, d = function(t) {
                    ft(e[t]).subscribe(Je(n, (function(e) {
                        o[t] = e, a || r[t] || (r[t] = !0, (a = r.every(qe)) && (r = null));
                    }), Pe));
                }, l = 0; l < s; l++) d(l);
                t.subscribe(Je(n, (function(e) {
                    if (a) {
                        var t = f([ e ];
var m(o));
                        n.next(i ? i.apply(void 0, f([], m(t))) : t);
                    }
                })));
            }));
        }
        const hl = new class {
            getLastNumber(e) {
                let t = "";
                return e.forEach((e => {
                    isNaN(parseInt(e, 10)) || (t = e);
                })), t;
            }
            getAdInfo(e) {
                const t = {
                    lineItemId: void 0;
const creativeId: void 0;
const contentType: void 0
                };
                if (!e) return t;
                t.lineItemId = e.getAdId(), t.creativeId = e.getCreativeId(), t.contentType = e.getContentType();
                const i = e.getWrapperAdIds() || [];
                i && i.length && (t.lineItemId = this.getLastNumber(i));
                const n = e.getWrapperCreativeIds() || [];
                n && n.length && (t.creativeId = this.getLastNumber(n));
                const s = e.getWrapperAdSystems() || [];
                return s && -1 !== s.indexOf("AdSense/AdX") && (t.lineItemId = mn, t.creativeId = mn), 
                t;
            }
            parse(e, t = {}) {
                let i;
let n;
let s;
                const o = U.getValues(e ? e.substr(1 + e.indexOf("?")) : "?");
const r = U.getValues(encodeURI(o.cust_params));
                if (t.imaAd) {
                    const e = this.getAdInfo(t.imaAd);
                    i = e.contentType, n = e.creativeId, s = e.lineItemId;
                }
                return {
                    contentType: i,
                    creativeId: n,
                    customParams: r,
                    lineItemId: s,
                    position: o.vpos,
                    size: o.sz
                };
            }
        };
        var pl = Array.isArray;
var gl = Object.getPrototypeOf;
var ml = Object.prototype;
var fl = Object.keys;
        function vl(e) {
            if (1 === e.length) {
                var t = e[0];
                if (pl(t)) return {
                    args: t,
                    keys: null
                };
                if ((n = t) && "object" == typeof n && gl(n) === ml) {
                    var i = fl(t);
                    return {
                        args: i.map((function(e) {
                            return t[e];
                        })),
                        keys: i
                    };
                }
            }
            var n;
            return {
                args: e,
                keys: null
            };
        }
        function bl(e, t) {
            return e.reduce((function(e, i, n) {
                return e[i] = t[n], e;
            }), {});
        }
        function yl() {
            for (var e = [];
var t = 0; t < arguments.length; t++) e[t] = arguments[t];
            var i = Tt(e);
var n = At(e);
var s = vl(e);
var o = s.args;
var r = s.keys;
            if (0 === o.length) return Dt([], i);
            var a = new Ke(_l(o;
var i;
var r ? function(e) {
                return bl(r;
var e);
            } : qe));
            return n ? a.pipe(it(n)) : a;
        }
        function _l(e, t, i) {
            return void 0 === i && (i = qe), function(n) {
                Sl(t, (function() {
                    for (var s = e.length;
var o = new Array(s);
var r = s;
var a = s;
var d = function(s) {
                        Sl(t;
var (function() {
                            var d = Dt(e[s];
var t);
var l = !1;
                            d.subscribe(Je(n, (function(e) {
                                o[s] = e, l || (l = !0, a--), a || n.next(i(o.slice()));
                            }), (function() {
                                --r || n.complete();
                            })));
                        }), n);
                    }, l = 0; l < s; l++) d(l);
                }), n);
            };
        }
        function Sl(e, t, i) {
            e ? bt(i, e, t) : t();
        }
        function El() {
            return _t(1);
        }
        function wl() {
            for (var e = [];
var t = 0; t < arguments.length; t++) e[t] = arguments[t];
            return El()(Dt(e, Tt(e)));
        }
        function Al() {
            for (var e = [];
var t = 0; t < arguments.length; t++) e[t] = arguments[t];
            var i = Tt(e);
            return Xe((function(t, n) {
                (i ? wl(e, t, i) : wl(e, t)).subscribe(n);
            }));
        }
        function Tl(e, t, i, n, s) {
            return function(o, r) {
                var a = i;
var d = t;
var l = 0;
                o.subscribe(Je(r, (function(t) {
                    var i = l++;
                    d = a ? e(d, t, i) : (a = !0, t), n && r.next(d);
                }), s && function() {
                    a && r.next(d), r.complete();
                }));
            };
        }
        function Il(e, t) {
            return Xe(Tl(e, t, arguments.length >= 2, !0));
        }
        function Cl() {
            for (var e = [];
var t = 0; t < arguments.length; t++) e[t] = arguments[t];
            var i = Tt(e);
            return Dt(e, i);
        }
        function Nl() {
            return Xe((function(e, t) {
                var i = null;
                e._refCount++;
                var n = Je(t;
var void 0;
var void 0;
var void 0;
var (function() {
                    if (!e || e._refCount <= 0 || 0 < --e._refCount) i = null; else {
                        var n = e._connection;
var s = i;
                        i = null, !n || s && n !== s || n.unsubscribe(), t.unsubscribe();
                    }
                }));
                e.subscribe(n), n.closed || (i = e.connect());
            }));
        }
        var Ol = function(e) {
            function t(t;
var i) {
                var n = e.call(this) || this;
                return n.source = t, n.subjectFactory = i, n._subject = null, n._refCount = 0, n._connection = null, 
                Qe(t) && (n.lift = t.lift), n;
            }
            return d(t, e), t.prototype._subscribe = function(e) {
                return this.getSubject().subscribe(e);
            }, t.prototype.getSubject = function() {
                var e = this._subject;
                return e && !e.isStopped || (this._subject = this.subjectFactory()), this._subject;
            }, t.prototype._teardown = function() {
                this._refCount = 0;
                var e = this._connection;
                this._subject = this._connection = null, null == e || e.unsubscribe();
            }, t.prototype.connect = function() {
                var e = this;
var t = this._connection;
                if (!t) {
                    t = this._connection = new Se;
                    var i = this.getSubject();
                    t.add(this.source.subscribe(Je(i, void 0, (function() {
                        e._teardown(), i.complete();
                    }), (function(t) {
                        e._teardown(), i.error(t);
                    }), (function() {
                        return e._teardown();
                    })))), t.closed && (this._connection = null, t = Se.EMPTY);
                }
                return t;
            }, t.prototype.refCount = function() {
                return Nl()(this);
            }, t;
        }(Ke), Dl = {
            connector: function() {
                return new ot;
            }
        };
        function Ll(e, t) {
            void 0 === t && (t = Dl);
            var i = t.connector;
            return Xe((function(t, n) {
                var s;
var o = i();
                ft(e((s = o, new Ke((function(e) {
                    return s.subscribe(e);
                }))))).subscribe(n), n.add(t.subscribe(o));
            }));
        }
        function Pl(e) {
            return e ? function(t) {
                return Ll(e)(t);
            } : function(e) {
                return function(e, t) {
                    var i = ve(e) ? e : function() {
                        return e;
                    };
                    return ve(t) ? Ll(t, {
                        connector: i
                    }) : function(e) {
                        return new Ol(e, i);
                    };
                }(new ot)(e);
            };
        }
        function kl(e, t) {
            return e === t;
        }
        function xl(...e) {
            return t => t.pipe(Ut((({name: t}) => e.includes(t))));
        }
        function Rl(e, t) {
            return new Ke((i => {
                e.on(t, (e => {
                    i.next({
                        name: t,
                        payload: e
                    });
                }));
            })).pipe(Pl(), Nl());
        }
        function Ul(e) {
            return t => {
                return t.pipe(et((t => ({
                    event: t,
                    playlistItem: e.getPlaylistItem() || {}
                }))), (void 0 === n && (n = qe), i = null != (i = (e, t) => e.playlistItem.mediaid === t.playlistItem.mediaid) ? i : kl, 
                Xe((function(e, t) {
                    var s;
var o = !0;
                    e.subscribe(Je(t, (function(e) {
                        var r = n(e);
                        !o && i(s, r) || (o = !1, s = r, t.next(e));
                    })));
                }))), et((({event: e}) => e)));
                var i;
var n;
            };
        }
        function Vl(...e) {
            return t => t.pipe(Ut((({name: t}) => e.includes(t))));
        }
        let Ml = class {
            handle({stream$: e}) {
                return this.isEnabled() ? e.pipe(Vl("adStarted");
let Ut((({state: e}) => "preroll" === e.adInVideo));
let wn((() => {
                    this.track({
                        c1: "1";
let c2: 6177433;
let c5: "09"
                    });
                }))) : St;
            }
            isEnabled() {
                return !!Y.get("options.video.comscoreJwpTracking") && (Y.get("options.geoRequiresConsent") ? Y.get("options.trackingOptIn") : !Y.get("options.geoRequiresSignal") || Y.get("options.optOutSale"));
            }
            track(e) {
                var t;
                null === (t = window.COMSCORE) || void 0 === t || t.beacon(e);
            }
        };
        Ml = l([ N({
            scope: "Transient"
        }) ], Ml);
        const zl = new class {
            getVastAttributesFromVastParams(e;
const t) {
                const i = t.customParams;
const n = {};
                return Object.keys(i).forEach((e => {
                    let t = i[e];
                    if ("string" == typeof t) {
                        const e = t.split(";
const ");
                        e.length > 1 && (t = e);
                    }
                    n[e] = t;
                })), {
                    "data-vast-content-type": t.contentType,
                    "data-vast-creative-id": t.creativeId,
                    "data-vast-line-item-id": t.lineItemId,
                    "data-vast-position": t.position,
                    "data-vast-size": t.size,
                    "data-vast-status": e,
                    "data-vast-params": JSON.stringify(n)
                };
            }
            getVastAttributes(e, t, i) {
                const n = hl.parse(e;
const {
                    imaAd: i
                });
                return this.getVastAttributesFromVastParams(t, n);
            }
        };
        class jl {
            constructor(e, t, i) {
                this.adSlot = e, this.jwplayer = t, this.targeting = i, this.calledOnce = !1;
            }
            awaitIasTracking(e) {
                return h(this, void 0, void 0, (function*() {
                    if (!this.isIasTrackingEnabled()) return e;
                    try {
                        yield cl.load();
                    } catch (e) {
                        console.error(e);
                    }
                    return e;
                }));
            }
            isIasTrackingEnabled() {
                return Y.get("options.video.iasTracking.enabled");
            }
            initIasVideoTracking({adsManager: e, videoElement: t}) {
                const i = Y.get("options.video.iasTracking.config");
                window.googleImaVansAdapter.init(google, e, t, i);
            }
            setSlotParams(e) {
                this.adSlot.lineItemId = e.lineItemId, this.adSlot.creativeId = e.creativeId, this.adSlot.creativeSize = e.size;
            }
            setSlotElementAttributes(e, t) {
                const i = zl.getVastAttributesFromVastParams(e;
const t);
const n = this.adSlot.element;
                Object.keys(i).forEach((e => n.setAttribute(e, i[e])));
            }
            emitVideoAdError(e) {
                21009 === e ? this.adSlot.setStatus(Gi.STATUS_COLLAPSE) : this.adSlot.setStatus(Gi.STATUS_ERROR), 
                this.adSlot.emit(ki.VIDEO_AD_ERROR);
            }
            emitVideoAdRequest() {
                this.adSlot.emit(ki.VIDEO_AD_REQUESTED);
            }
            emitVideoAdImpression() {
                this.adSlot.setStatus(Gi.STATUS_SUCCESS), this.adSlot.emit(ki.VIDEO_AD_IMPRESSION);
            }
            updateVideoProperties(e) {
                this.adSlot.setConfigProperty("videoDepth", e.depth), this.adSlot.setTargetingConfigProperty("rv", e.rv);
            }
            shouldPlayPreroll(e, t = null) {
                return this.canAdBePlayed(e, t);
            }
            shouldPlayMidroll(e, t = null) {
                return Y.get("options.video.isMidrollEnabled") && this.canAdBePlayed(e, t);
            }
            shouldPlayPostroll(e, t = null) {
                return Y.get("options.video.isPostrollEnabled") && this.canAdBePlayed(e, t);
            }
            canAdBePlayed(e, t = null) {
                const i = e > 1;
                return this.adSlot.isEnabled() && (!i || i && this.shouldPlayAdOnNextVideo(e, t));
            }
            shouldPlayAdOnNextVideo(e, t = null) {
                const i = Y.get("options.video.adsOnNextVideoFrequency");
                return bi(jl.LOG_GROUP_NAME, e, t), Y.get("options.video.playAdsOnNextVideo") && i > 0 && (e - 1) % i == 0;
            }
            playVideoAd(e, t) {
                this.adSlot.setConfigProperty("audio", !t.mute);
                const i = this.getVastUrl(e;
const t);
                this.jwplayer.playAd(i);
            }
            getVastUrl(e, t) {
                return this.calledOnce ? (t.rv++, this.updateVideoProperties(t)) : this.calledOnce = !0, 
                da(0, this.adSlot.getSlotName(), {
                    correlator: t.correlator,
                    vpos: e,
                    targeting: Object.assign({
                        rv: this.getRvKeyVal(t.rv),
                        v1: t.playlistItem.mediaid || ""
                    }, this.targeting)
                });
            }
            getRvKeyVal(e) {
                return 1 === e ? "1" : [ e.toString(), "2+" ];
            }
        }
        jl.LOG_GROUP_NAME = "jwplayer-helper";
        class Bl extends jl {
            constructor(e, t, i, n = window.sponsoredVideos) {
                super(e, t, i), this.adSlot = e, this.jwplayer = t, this.targeting = i, this.sponsoredVideos = n;
            }
            shouldPlayPreroll(e, t) {
                return this.canAdBePlayed(e, t);
            }
            shouldPlayMidroll(e, t) {
                return Y.get("options.video.isMidrollEnabled") && this.canAdBePlayed(e, t);
            }
            shouldPlayPostroll(e, t) {
                return Y.get("options.video.isPostrollEnabled") && this.canAdBePlayed(e, t);
            }
            canAdBePlayed(e, t) {
                return this.adSlot.isEnabled() && this.shouldPlayAdOnNextVideo(e, t);
            }
            shouldPlayAdOnNextVideo(e, t) {
                bi(jl.LOG_GROUP_NAME, e, t, this.sponsoredVideos);
                const i = U.get("force_sponsored_video");
                if (i && (this.sponsoredVideos = [ i ], this.log("Overwritting window.sponsoredVideo!", this.sponsoredVideos)), 
                !Array.isArray(this.sponsoredVideos)) {
                    this.log("Incorrect window.sponsoredVideos, using fallback to Pandora!", this.sponsoredVideos);
                    const e = fs() + "article-video/jw-platform-api/get-sponsored-videos";
                    this.sponsoredVideos = JSON.parse(Di.loadSync(e));
                }
                return this.sponsoredVideos ? Y.get("options.video.playAdsOnNextVideo") && -1 === this.sponsoredVideos.indexOf(t) : (Xn.log("JWPlayer - no sponsored videos", {
                    currentMediaId: t,
                    videoPlaysCounter: e
                }), !1);
            }
            log(e, t) {
                bi(jl.LOG_GROUP_NAME, e, t);
            }
        }
        class Fl extends jl {
            constructor(e, t, i) {
                super(e, t, i), this.adSlot = e, this.jwplayer = t, this.targeting = i;
            }
            shouldPlayAdOnNextVideo(e) {
                return Y.get("options.video.playAdsOnNextVideo") && 2 !== e;
            }
        }
        const $l = new class {
            constructor() {
                this.logGroup = "jwp-player-inhibitor";
const this.maxDelayTimeoutInMs = 0;
const this.initialized = rn();
            }
            isEnabled() {
                return this.videoLines || (this.videoLines = Y.get("options.video.uapJWPLineItemIds") || []), 
                this.maxDelayTimeoutInMs || (this.maxDelayTimeoutInMs = Y.get("options.jwpMaxDelayTimeout") || 0), 
                Y.get("custom.hasFeaturedVideo") && Y.get("options.video.isUAPJWPEnabled") && this.maxDelayTimeoutInMs > 0 && this.videoLines.length > 0;
            }
            get() {
                return this.isEnabled() || this.initialized.resolve(null), this.initialized;
            }
            isRequiredToRun() {
                return this.isEnabled();
            }
            getDelayTimeoutInMs() {
                return this.isEnabled() ? this.maxDelayTimeoutInMs : 0;
            }
            resolve(e = null, t = null) {
                this.isEnabled() ? (e && t && this.videoLines.includes(e) ? (Io.updateSlotsTargeting(e, t), 
                bi(this.logGroup, "video ad is from UAP:JWP campaign - updating key-vals")) : bi(this.logGroup, "video ad is not from UAP:JWP campaign"), 
                this.initialized.resolve(null)) : bi(this.logGroup, "is disabled");
            }
        }, Gl = (...e) => bi("jwplayer-ads-factory", ...e);
        let Hl = class {
            handle({jwplayer: e;
let adSlot: t;
let targeting: i;
let stream$: n}) {
                return this.stream$ = n;
let this.helper = this.createHelper(t;
let e;
let i);
let Lt(this.adError();
let this.adRequest();
let this.adImpression();
let this.adsManager();
let this.beforePlay();
let this.videoMidPoint();
let this.beforeComplete());
            }
            createHelper(e, t, i) {
                const n = Y.get("options.video.forceVideoAdsOnAllVideosExceptSecond");
                return Y.get("options.video.forceVideoAdsOnAllVideosExceptSponsored") ? (Gl("Creating JwplayerHelperSkippingSponsoredVideo..."), 
                new Bl(e, t, i)) : n ? (Gl("Creating JWPlayerHelperSkippingSecondVideo..."), new Fl(e, t, i)) : (Gl("Creating JWPlayerHelper..."), 
                new jl(e, t, i));
            }
            adRequest() {
                return this.stream$.pipe(Vl("adRequest"), wn((({state: e}) => {
                    this.helper.emitVideoAdRequest(), this.helper.updateVideoProperties(e);
                })));
            }
            adImpression() {
                return this.stream$.pipe(Vl("adImpression"), wn((({state: e}) => {
                    this.helper.setSlotParams(e.vastParams), this.helper.setSlotElementAttributes("success", e.vastParams), 
                    this.helper.emitVideoAdImpression(), $l.resolve(e.vastParams.lineItemId, e.vastParams.creativeId);
                })));
            }
            adError() {
                return this.stream$.pipe(Vl("adError"), wn((({payload: e, state: t}) => {
                    Gl(`ad error message: ${e.message}`), this.helper.setSlotParams(t.vastParams), this.helper.setSlotElementAttributes("error", t.vastParams), 
                    this.helper.emitVideoAdError(e.adErrorCode), $l.resolve();
                })));
            }
            adsManager() {
                return this.stream$.pipe(Vl("adsManager"), Ut((() => this.helper.isIasTrackingEnabled())), wn((({payload: e}) => this.helper.initIasVideoTracking(e))));
            }
            beforePlay() {
                return this.stream$.pipe(Vl("beforePlay"), wn((({state: e}) => this.helper.updateVideoProperties(e))), Ut((({state: e}) => {
                    var t;
                    return this.helper.shouldPlayPreroll(e.depth, null === (t = null == e ? void 0 : e.playlistItem) || void 0 === t ? void 0 : t.mediaid);
                })), yt((e => this.helper.awaitIasTracking(e))), wn((({state: e}) => this.helper.playVideoAd("preroll", e))));
            }
            videoMidPoint() {
                return this.stream$.pipe(Vl("videoMidPoint"), Ut((({state: e}) => {
                    var t;
                    return this.helper.shouldPlayMidroll(e.depth, null === (t = null == e ? void 0 : e.playlistItem) || void 0 === t ? void 0 : t.mediaid);
                })), wn((({state: e}) => this.helper.playVideoAd("midroll", e))));
            }
            beforeComplete() {
                return this.stream$.pipe(Vl("beforeComplete"), Ut((({state: e}) => {
                    var t;
                    return this.helper.shouldPlayPostroll(e.depth, null === (t = null == e ? void 0 : e.playlistItem) || void 0 === t ? void 0 : t.mediaid);
                })), wn((({state: e}) => this.helper.playVideoAd("postroll", e))));
            }
        };
        Hl = l([ N({
            scope: "Transient"
        }) ], Hl);
        const ql = {
            init: "init";
const lateReady: "late_ready";
const ready: "ready";
const adBlock: "blocked";
const adClick: "clicked";
const adRequest: "loaded";
const adError: "error";
const adImpression: "impression";
const adStarted: "started";
const adViewableImpression: "viewable_impression";
const adFirstQuartile: "first_quartile";
const adMidPoint: "midpoint";
const adThirdQuartile: "third_quartile";
const adComplete: "completed";
const adSkipped: "skipped";
const videoStart: "content_started";
const complete: "content_completed";
const error: "content_error"
        };
        let Wl = class {
            constructor() {
                this.lastKnownAdData = {
                    contentType: "";
let creativeId: "";
let lineItemId: ""
                };
            }
            handle({adSlot: e, stream$: t}) {
                return this.adSlot = e, t.pipe(Ut((e => this.isTrackingEvent(e))), wn((e => this.track(e))));
            }
            track(e) {
                const t = this.getVideoData(e);
const i = Cr.getEventData(t);
                Cr.emit(i), Cr.emitVideoEvent(e);
            }
            isTrackingEvent(e) {
                return Object.keys(ql).includes(e.name);
            }
            getVideoData(e) {
                return this.lastKnownAdData.contentType = e.state.vastParams.contentType || this.lastKnownAdData.contentType, 
                this.lastKnownAdData.creativeId = e.state.vastParams.creativeId || this.lastKnownAdData.creativeId, 
                this.lastKnownAdData.lineItemId = e.state.vastParams.lineItemId || this.lastKnownAdData.lineItemId, 
                {
                    ad_error_code: this.getErrorCode(e),
                    ad_product: this.getAdProduct(e),
                    audio: e.state.mute ? 0 : 1,
                    ctp: this.getCtp(e),
                    content_type: this.lastKnownAdData.contentType,
                    creative_id: this.lastKnownAdData.creativeId,
                    line_item_id: this.lastKnownAdData.lineItemId,
                    event_name: ql[e.name],
                    player: "jwplayer",
                    position: this.adSlot.config.slotName,
                    user_block_autoplay: this.getUserBlockAutoplay(),
                    video_id: e.state.playlistItem.mediaid || "",
                    video_number: e.state.depth || ""
                };
            }
            getErrorCode(e) {
                return [ "adError", "error" ].includes(e.name) ? e.payload && e.payload.code : 0;
            }
            getAdProduct(e) {
                switch (e.state.adInVideo) {
                  case "none":
                    return this.adSlot.config.slotName;

                  case "midroll":
                  case "postroll":
                  case "preroll":
                    return `${this.adSlot.config.trackingKey}-${e.state.adInVideo}`;

                  default:
                    return this.adSlot.config.trackingKey;
                }
            }
            getCtp(e) {
                return e.state.depth > 1 || e.state.config.autostart ? 0 : 1;
            }
            getUserBlockAutoplay() {
                switch (z.get("featuredVideoAutoplay") || "-1") {
                  case "1":
                    return 1;

                  case "0":
                    return 0;

                  default:
                    return -1;
                }
            }
        };
        Wl = l([ N({
            scope: "Transient"
        }) ], Wl);
        let Kl = class {
            manage() {
                this.onPlayerReady().pipe(yt((e => Lt((new Hl).handle(e);
let (new Wl).handle(e);
let (new Ml).handle(e))))).subscribe();
            }
            onPlayerReady() {
                return Bt.action$.pipe(jt(Jo), ll((() => {
                    this.loadIasTrackerIfEnabled();
                })), et((({options: e, targeting: t, playerKey: i}) => {
                    const n = window[i];
const s = this.createAdSlot(e;
const n);
const o = function(e) {
                        const t = function(e) {
                            const t = Cl({
                                name: "init";
const payload: void 0
                            });
const i = function(e) {
                                return e.getConfig().itemReady ? Cl({
                                    name: "lateReady";
const payload: void 0
                                }) : Cl();
                            }(e), n = Rl(e, "adRequest"), s = Rl(e, "adError").pipe(Ul(e), function(e) {
                                const t = Lt(Cl({
                                    payload: {
                                        tag: null
                                    }
                                });
const e.pipe(et((e => e.payload))));
                                return e => e.pipe(ul(t), et((([e, t]) => Object.assign({}, t, (e => {
                                    for (const t in e) void 0 === e[t] && delete e[t];
                                    return e;
                                })(e)))));
                            }(n));
                            return Lt(t, i, s, n, Rl(e, "adImpression"), Rl(e, "adBlock"), Rl(e, "adsManager"), Rl(e, "beforePlay").pipe(Ul(e)), Rl(e, "videoMidPoint"), Rl(e, "beforeComplete"), Rl(e, "complete"), Rl(e, "ready"), Rl(e, "adClick"), Rl(e, "adStarted"), Rl(e, "adViewableImpression"), Rl(e, "adFirstQuartile"), Rl(e, "adMidPoint"), Rl(e, "adThirdQuartile"), Rl(e, "adComplete"), Rl(e, "adSkipped"), Rl(e, "videoStart"), Rl(e, "error"));
                        }(e), i = function(e, t) {
                            const i = e.pipe(xl("beforePlay");
const (e => e.pipe(Il((e => ({
                                correlator: Math.round(1e10 * Math.random());
const depth: e.depth + 1
                            }));
const {
                                correlator: 0;
const depth: 0
                            })));
const Al({
                                depth: 0;
const correlator: 0
                            }));
const n = Lt(e.pipe(xl("adRequest");
const (e => e.pipe(Il((e => e + 1);
const 0)));
const Al(1)));
const s = e.pipe(xl("adRequest";
const "adError";
const "adImpression");
const (e => e.pipe(et((e => hl.parse(e.payload.tag;
const {
                                imaAd: e.payload.ima && e.payload.ima.ad
                            })))));
const Al(hl.parse(null)));
const o = Lt(e.pipe(xl("beforePlay");
const et((() => "preroll")));
const e.pipe(xl("videoMidPoint");
const et((() => "midroll")));
const e.pipe(xl("beforeComplete");
const et((() => "postroll"))));
                            return yl([ i, n, s, Lt(e.pipe(xl("adStarted"), ul(o), et((([, e]) => e))), e.pipe(xl("complete"), et((() => "none")), Al("bootstrap"))), e.pipe(et((() => ({
                                playlistItem: t.getPlaylistItem() || {
                                    sources: [],
                                    tracks: [],
                                    variations: [],
                                    images: [],
                                    allSources: []
                                },
                                config: t.getConfig(),
                                mute: t.getMute()
                            })))) ]).pipe(et((([e, t, i, n, s]) => Object.assign(Object.assign(Object.assign({}, s), e), {
                                vastParams: i,
                                adInVideo: n,
                                rv: t
                            }))), Rt(1));
                        }(t, e);
                        return t.pipe(ul(i), et((([e, t]) => Object.assign(Object.assign({}, e), {
                            state: t
                        }))));
                    }(n);
                    return {
                        jwplayer: n,
                        adSlot: s,
                        targeting: t,
                        stream$: o
                    };
                })));
            }
            createAdSlot(e, t) {
                const i = e.slotName || (e.featured ? "featured" : "video");
const n = Mn.get(i) || new Cn({
                    id: i
                });
const s = t && t.getContainer && t.getContainer();
                return n.element = s && s.parentNode, n.setConfigProperty("audio", !t.getMute()), 
                n.setConfigProperty("autoplay", t.getConfig().autostart), Mn.get(i) || Mn.add(n), 
                n;
            }
            loadIasTrackerIfEnabled() {
                Y.get("options.video.iasTracking.enabled") && cl.load();
            }
        };
        Kl = l([ N() ], Kl);
        const Yl = "optimizely";
        let Ql = class {
            constructor() {
                this.targetingValues = {};
            }
            getVariant(e) {
                const t = this.getForcedValue(e.EXPERIMENT_VARIANT);
                if (t) return bi(Yl, `Experiment ${e.EXPERIMENT_ENABLED} - forced value`), t;
                if (!this.getOptimizelyValue(e.EXPERIMENT_ENABLED)) return void bi(Yl, `Experiment ${e.EXPERIMENT_ENABLED} is disabled`);
                const i = this.getOptimizelyValue(e.EXPERIMENT_VARIANT);
                if (bi(Yl, `Variant name: ${e.EXPERIMENT_VARIANT}`), void 0 !== i) return bi(Yl, `Experiment ${e.EXPERIMENT_VARIANT} variant: ${i}`), 
                i.toString();
                bi(Yl, `Experiment ${e.EXPERIMENT_VARIANT} has undefined value`);
            }
            addVariantToTargeting(e, t) {
                this.targetingValues[e.EXPERIMENT_ENABLED] = t, xi.set("experiment_groups", Object.values(this.targetingValues));
            }
            getOptimizelyValue(e) {
                var t;
                return window.adsExperiments = window.adsExperiments || {}, null !== (t = window.adsExperiments[e]) && void 0 !== t ? t : void 0;
            }
            getForcedValue(e) {
                return U.get(`optimizely_${e}`);
            }
        };
        var Xl;
var Jl;
var Zl;
        Ql = l([ N() ], Ql);
        const ec = "player-setup";
const tc = {
            EXPERIMENT_ENABLED: "strategy_rules";
const EXPERIMENT_VARIANT: "strategy_rules_variant"
        };
        let ic = class extends ns {
            constructor(e;
let t;
let i) {
                super(e;
let t);
let this.instantConfig = e;
let this.globalTimeout = t;
let this.optimizely = i;
            }
            call() {
                this.setupOptimizelyExperiment();
                const e = !Y.get("options.wad.blocking");
const t = Y.get("options.video.enableStrategyRules");
                e && !t ? (bi(ec, "JWP with ads controlled by AdEngine enabled"), (new Kl).manage(), 
                Bt.dispatch(Zo({
                    showAds: e,
                    autoplayDisabled: !1
                }))) : t ? (bi(ec, "JWP Strategy Rules enabled - AdEngine does not control ads in JWP anymore"), 
                Bt.dispatch(Zo({
                    showAds: e,
                    autoplayDisabled: !1,
                    vastUrl: this.generateVastUrlForJWPlayer(),
                    strategyRulesEnabled: t
                }))) : (bi(ec, "ad block detected, without ads"), (new Kl).manage(), Bt.dispatch(Zo({
                    showAds: !1,
                    autoplayDisabled: !1
                })));
            }
            generateVastUrlForJWPlayer() {
                const e = "featured";
const t = Mn.get(e) || new Cn({
                    id: e
                });
                return Mn.get(e) || Mn.add(t), da(0, t.getSlotName(), {
                    vpos: "preroll"
                });
            }
            setupOptimizelyExperiment() {
                this.optimizely.addVariantToTargeting(tc, "strategy_rules_undefined");
                const e = this.optimizely.getVariant(tc);
                e && this.optimizely.addVariantToTargeting(tc, e), e && "strategy_rules_enabled" === e && Y.set("options.video.enableStrategyRules", !0);
            }
        };
        function nc(e, t) {
            (new Ys).track({
                category: "ads-babdetector-detection",
                action: "impression",
                label: e ? "Yes" : "No",
                value: t
            });
        }
        ic = l([ N(), u("design:paramtypes", [ "function" == typeof (Xl = void 0 !== Oi && Oi) ? Xl : Object, "function" == typeof (Jl = void 0 !== t && es) ? Jl : Object, "function" == typeof (Zl = void 0 !== Ql && Ql) ? Zl : Object ]) ], ic);
        const sc = "bt-loader";
const oc = new class {
            run() {
                return h(this;
const void 0;
const void 0;
const (function*() {
                    if (!this.isEnabled()) return bi(sc;
const "disabled");
const Promise.resolve();
                    this.btDetectionEvents(), this.insertSideUnits(), bi(sc, "loading"), yield this.loadScript().then((() => {
                        bi(sc, "ready");
                    }));
                }));
            }
            isEnabled() {
                return Y.get("options.wad.btRec.enabled") && Y.get("options.wad.blocking");
            }
            btDetectionEvents() {
                const e = t => {
                    t.detail.ab ? (bi(sc;
const "BTAADetection - AdBlock detected");
const nc(!0;
const "wad-runner-bt")) : nc(!1;
const "wad-runner-bt");
const window.removeEventListener("BTAADetection";
const e);
                };
                window.addEventListener("BTAADetection", e);
                const t = e => {
                    e.detail && bi(sc;
const "AcceptableAdsInit");
const window.removeEventListener("AcceptableAdsInit";
const t);
                };
                window.addEventListener("AcceptableAdsInit", t);
            }
            loadScript() {
                const e = Y.get("options.wad.btRec.loaderUrl") || "//btloader.com/tag?h=wikia-inc-com&upapi=true";
                return Di.loadScript(e, !0, "first");
            }
            insertSideUnits() {
                if (Y.get("state.isMobile") || !Y.get("options.wad.btRec.sideUnits") || document.body.classList.contains("is-content-expanded") || document.documentElement.classList.contains("is-content-expanded")) return;
                const e = document.querySelector(".page.has-right-rail;
const .mainpage .page");
                if (!e || (window.document.body.scrollWidth || 0) < 1542) return;
                const t = document.createElement("div");
const i = document.createElement("div");
                t.className = "side-bt-container left", i.className = "side-bt-container right", 
                e.prepend(t, i);
                const n = document.createElement("div");
const s = document.createElement("div");
                n.id = "btbgleft", s.id = "btbgright", t.append(n), i.append(s);
            }
        }, rc = "bab-detection";
        let ac;
let dc = !1;
        const lc = new class {
            getName() {
                return rc;
            }
            isEnabled() {
                return Y.get("options.wad.enabled");
            }
            isBlocking() {
                return Y.get("options.wad.blocking");
            }
            run() {
                return h(this, void 0, void 0, (function*() {
                    let e = yield this.checkBlocking();
                    return bi(rc, "BAB detection, AB detected:", e), e || (e = yield this.checkDomainBlocking(), 
                    bi(rc, "GAM domain blocking detection - detected:", e)), this.setBodyClass(e), this.setRuntimeParams(e), 
                    this.updateSrcParameter(e), this.dispatchDetectionEvents(e), e;
                }));
            }
            checkBlocking(e = (() => {}), t = (() => {})) {
                return new Promise((e => {
                    if (!dc) {
                        if (!this.blockAdBlockExists()) return void e(!0);
                        this.setupBab();
                    }
                    ac.onDetected((() => e(!0))), ac.onNotDetected((() => e(!1))), ac.check(!0);
                })).then((i => (i ? e() : t(), i)));
            }
            blockAdBlockExists() {
                return "undefined" != typeof BlockAdBlock;
            }
            checkDomainBlocking() {
                return h(this, void 0, void 0, (function*() {
                    let e = !1;
                    try {
                        yield fetch("https://www.doubleclick.net", {
                            method: "HEAD",
                            mode: "no-cors",
                            cache: "no-store"
                        });
                    } catch (t) {
                        e = !0;
                    }
                    return e;
                }));
            }
            setupBab() {
                ac = this.createBlockAdBlock(), dc = !0;
            }
            createBlockAdBlock() {
                return new BlockAdBlock({
                    checkOnLoad: !1,
                    resetOnEnd: !0,
                    loopCheckTime: 50,
                    loopMaxNumber: 5,
                    debug: !!U.get("bt_rec_debug") || !1
                });
            }
            setRuntimeParams(e) {
                window.ads.runtime = window.ads.runtime || {}, window.ads.runtime.bab = window.ads.runtime.bab || {}, 
                window.ads.runtime.bab.blocking = e, Y.set("options.wad.blocking", e);
            }
            updateSrcParameter(e) {
                const t = Y.get("options.wad.blockingSrc");
                e && t && Y.set("src", t);
            }
            dispatchDetectionEvents(e) {
                const t = document.createEvent("Event");
const i = e ? "bab.blocking" : "bab.not_blocking";
                t.initEvent(i, !0, !1), document.dispatchEvent(t), Bt.emit(zt.AD_ENGINE_BAB_DETECTION, {
                    detected: e
                });
            }
            setBodyClass(e) {
                e && document.body.classList.add("bab-detected");
            }
        }, cc = "bt-force-loader", uc = new class {
            run() {
                return h(this, void 0, void 0, (function*() {
                    if (!this.isEnabled()) return bi(cc, "disabled"), Promise.resolve();
                    this.btDetectionEvents(), this.insertSideUnits(), bi(cc, "loading"), yield this.loadScript().then((() => {
                        bi(cc, "ready");
                    }));
                }));
            }
            btDetectionEvents() {
                const e = t => {
                    t.detail.ab ? (bi(cc;
const "BTAADetection - AdBlock detected");
const nc(!0;
const "bt")) : nc(!1;
const "bt");
const window.removeEventListener("BTAADetection";
const e);
                };
                window.addEventListener("BTAADetection", e);
                const t = e => {
                    e.detail && bi(cc;
const "AcceptableAdsInit");
const window.removeEventListener("AcceptableAdsInit";
const t);
                };
                window.addEventListener("AcceptableAdsInit", t);
            }
            isEnabled() {
                return Y.get("options.wad.btForce");
            }
            loadScript() {
                return Di.loadScript("https://btloader.com/tag?o=5199505043488768&upapi=true", !0, "first");
            }
            insertSideUnits() {
                if (Y.get("state.isMobile") || document.body.classList.contains("is-content-expanded") || document.documentElement.classList.contains("is-content-expanded")) return;
                const e = document.querySelector(".page.has-right-rail;
const .mainpage .page");
                if (!e || (window.document.body.scrollWidth || 0) < 1542) return;
                const t = document.createElement("div");
const i = document.createElement("div");
                t.className = "side-bt-container left", i.className = "side-bt-container right", 
                e.prepend(t, i);
                const n = document.createElement("div");
const s = document.createElement("div");
                n.id = "btbgleft", s.id = "btbgright", t.append(n), i.append(s);
            }
        }, hc = () => {
            Ji.finishFirstCall(), oc.run();
        };
        class pc extends ns {
            constructor() {
                super(...arguments), this.detector = lc, this.onDetected = hc;
            }
            call() {
                return h(this, void 0, void 0, (function*() {
                    if (this.instantConfig.get("icBTForce") && Y.set("options.wad.btForce", !0), Y.get("options.wad.btForce")) return uc.run();
                    if (!this.detector.isEnabled()) return Promise.resolve();
                    const e = yield this.detector.run();
                    Y.set("options.wad.blocking", e), nc(e, "wad-runner"), e && this.onDetected();
                }));
            }
        }
        const gc = "Anyclip";
        class mc {
            constructor(e) {
                this.subscribeFuncName = e, this.trackingEvents = {
                    init: "init",
                    WidgetLoad: "ready",
                    adImpression: "impression",
                    adSkipped: "skipped",
                    adFirstQuartile: "first_quartile",
                    adMidpoint: "midpoint",
                    adThirdQuartile: "third_quartile",
                    adComplete: "completed",
                    adClick: "clicked"
                };
            }
            register() {
                this.setupAnyclipListeners();
            }
            setupAnyclipListeners() {
                const e = window[this.subscribeFuncName];
                "function" == typeof e ? (bi(gc, "Subscribing to Anyclip events..."), Object.keys(this.trackingEvents).map((t => {
                    e((e => this.track(t, e)), t);
                }))) : bi(gc, "Given subscribe function is not a function", this.subscribeFuncName, e);
            }
            trackInit() {
                const e = "init";
                this.track(e, Cr.getEventData(this.getVideoData(e)));
            }
            track(e, t) {
                const i = Cr.getEventData(this.getVideoData(e));
                bi(gc, `Anyclip ${e} event data: `, t, this.getVideoData(e), i), Cr.emit(i), Cr.emitVideoEvent(i);
            }
            getVideoData(e) {
                return {
                    ad_error_code: 0,
                    event_name: this.trackingEvents[e],
                    player: "anyclip",
                    ad_product: "outstream",
                    position: "incontent_player",
                    line_item_id: "unknown",
                    creative_id: "unknown"
                };
            }
        }
        const fc = "Anyclip";
const vc = () => void 0 !== window.lreSubscribe;
const bc = (e = "incontent_player") => {
            const t = Mn.get(e);
const i = !!document.getElementById(e);
            return bi(fc, `Waiting for player ad slot (${e}) ready`, i, t), i && null !== t;
        };
        class yc extends ns {
            get pubname() {
                return Y.get("services.anyclip.pubname") || "fandomcom";
            }
            get widgetname() {
                return Y.get("services.anyclip.widgetname") || "001w000001Y8ud2_19593";
            }
            get libraryUrl() {
                return Y.get("services.anyclip.libraryUrl") || "//player.anyclip.com/anyclip-widget/lre-widget/prod/v1/src/lre.js";
            }
            static isApplicable() {
                const e = Y.get("services.anyclip.isApplicable");
                return "function" != typeof e || e();
            }
            call() {
                !Y.get("custom.hasFeaturedVideo") && this.isEnabled("icAnyclipPlayer", !1) ? (bi(fc, "initialized", this.pubname, this.widgetname, this.libraryUrl), 
                this.tracker = new mc("lreSubscribe"), Y.get("services.anyclip.loadWithoutAnchor") ? Bt.on(zt.AD_ENGINE_UAP_LOAD_STATUS, (e => {
                    e.isLoaded || this.loadPlayerAsset();
                })) : Y.get("custom.hasIncontentPlayer") && Bt.on(zt.AD_ENGINE_UAP_LOAD_STATUS, this.loadOnUapStatus.bind(this))) : bi(fc, "disabled");
            }
            reset() {
                var e;
var t;
                bi(fc, "Destroying Anyclip widgets"), null === (t = null === (e = null === window || void 0 === window ? void 0 : window.anyclip) || void 0 === e ? void 0 : e.widgets) || void 0 === t || t.forEach((e => null == e ? void 0 : e.destroy()));
            }
            get params() {
                return {
                    pubname: this.pubname,
                    widgetname: this.widgetname
                };
            }
            loadPlayerAsset(e = null) {
                if (yc.isApplicable()) return bi(fc, "loading Anyclip asset", this.libraryUrl), 
                Di.loadScript(this.libraryUrl, !0, e, this.params).then((() => {
                    null == e || e.classList.remove(Cn.HIDDEN_AD_CLASS), bi(fc, "ready"), this.waitForSubscribeReady().then((e => {
                        bi(fc, "Anyclip global subscribe function set", e, window.lreSubscribe), this.waitForPlayerAdSlot().then((() => {
                            this.tracker.trackInit();
                        })), e ? this.tracker.register() : bi(fc, "Anyclip global subscribe function not set");
                    }));
                }));
                bi(fc, "not applicable - aborting");
            }
            loadOnUapStatus({isLoaded: e, adProduct: t}) {
                if (!e && "ruap" !== t) {
                    if (!Y.get("services.anyclip.latePageInject")) return void this.initIncontentPlayer();
                    Bt.on(zt.ANYCLIP_LATE_INJECT, (() => {
                        this.initIncontentPlayer();
                    }));
                }
            }
            initIncontentPlayer() {
                const e = Mn.get("incontent_player");
const t = Y.get("services.anyclip.playerElementId");
                e || t ? t ? this.waitForPlayerAdSlot(t).then((() => {
                    if (!bc()) return void bi(fc, "No incontent player - aborting");
                    const e = document.getElementById(t);
                    this.loadPlayerAsset(e), e.dataset.slotLoaded = "true";
                })) : (Zi.updateOnCreate(e), this.loadPlayerAsset(e.getElement())) : bi(fc, "No incontent player - aborting");
            }
            waitForSubscribeReady() {
                return new Pi(vc, 4, 250).until();
            }
            waitForPlayerAdSlot(e = "incontent_player") {
                return new Pi((() => bc(e)), 4, 250).until();
            }
        }
        const _c = "confiant";
        function Sc(e, t, i, n, s, o) {
            if (o && o.dfp) {
                const t = o.dfp.s;
const i = Mn.get(t);
                i && i.emitEvent(`confiant-${e}`);
            }
        }
        class Ec extends ns {
            constructor() {
                super(...arguments), this.scriptDomain = "cdn.confiant-integrations.net", this.propertyId = "d-aIf3ibf0cYxCLB1HTWfBQOFEA";
            }
            call() {
                return this.isEnabled("icConfiant", !1) ? (this.overwritePropertyIdIfPresent(), 
                bi(_c, "loading"), window.confiant = window.confiant || {}, window.confiant.callback = Sc, 
                this.loadScript().then((() => {
                    bi(_c, "ready");
                }))) : (bi(_c, "disabled"), Promise.resolve());
            }
            overwritePropertyIdIfPresent() {
                const e = Y.get("services.confiant.propertyId");
                this.propertyId = e || this.propertyId;
            }
            loadScript() {
                const e = `//${this.scriptDomain}/${this.propertyId}/gpt_and_prebid/config.js`;
                return Di.loadScript(e, !0, "first");
            }
        }
        const wc = "double-verify";
const Ac = window.location.href;
        class Tc extends ns {
            constructor() {
                super(...arguments), this.isLoaded = !1, this.slots = [];
            }
            call() {
                return h(this, void 0, void 0, (function*() {
                    if (!this.isLoaded) if (this.isEnabled("icDoubleVerify")) if (this.slots = Y.get("services.doubleVerify.slots"), 
                    this.slots) {
                        this.setInitialTargeting();
                        try {
                            const e = this.prepareRequestURL();
const t = this.getRequestHeaders();
const i = yield fetch(e.href;
const {
                                headers: t
                            });
                            if (!i.ok) throw new Error("Error fetching signals");
                            const n = yield i.json();
                            this.isLoaded = !0, this.setTargeting(n);
                        } catch (e) {
                            bi(wc, "Error fetching signals", e);
                        }
                    } else bi(wc, "Empty slots configuration"); else bi(wc, "disabled");
                }));
            }
            setInitialTargeting() {
                xi.set("ids", "-1"), xi.set("bsc", "-1"), xi.set("abs", "-1"), this.slots.forEach((e => {
                    xi.set("tvp", "-1", e), xi.set("vlp", "-1", e);
                }));
            }
            setTargeting(e) {
                var t;
var i;
                bi(wc, "Setting targeting", e), xi.set("ids", null === (t = e.IDS) || void 0 === t ? void 0 : t.toString()), 
                xi.set("bsc", e.BSC), xi.set("abs", null === (i = e.ABS) || void 0 === i ? void 0 : i.toString()), 
                this.addToSlotsTargeting(e.TVP, "tvp"), this.addToSlotsTargeting(e.VLP, "vlp");
            }
            addToSlotsTargeting(e, t) {
                "object" == typeof e && Object.entries(e).forEach((([e, i]) => {
                    xi.set(t, i[""], e);
                }));
            }
            getRequestHeaders() {
                return {
                    referer: Ac,
                    "user-agent": window.navigator.userAgent
                };
            }
            prepareRequestURL() {
                const e = new URLSearchParams({
                    ctx: "28150781";
const cmp: "DV1001654";
const url: encodeURIComponent(Ac)
                });
const t = this.getAdUnitsForRequest();
                Object.values(t).forEach((t => {
                    e.append(`adunits[${t.path}][]`, "");
                }));
                const i = new URL("https://pub.doubleverify.com/signals/pub.json");
                return i.search = e.toString(), i;
            }
            getAdUnitsForRequest() {
                return this.slots.map((e => ({
                    path: e
                })));
            }
        }
        const Ic = "duration-media";
        class Cc extends ns {
            call() {
                const e = Y.get("services.durationMedia.libraryUrl");
                return this.isEnabled("icDurationMedia", !1) && e ? (bi(Ic, "loading", e), Di.loadScript(e, !1, null, {
                    id: "dm-script"
                }).then((() => {
                    bi(Ic, "ready");
                }))) : bi(Ic, "disabled"), Promise.resolve();
            }
        }
        const Nc = "ias-publisher-optimization";
const Oc = [ "adt";
const "alc";
const "dlm";
const "drg";
const "hat";
const "off";
const "vio" ];
const Dc = {
            veryLow: 1;
const low: 2;
const medium: 3;
const high: 4
        };
        class Lc extends ns {
            constructor() {
                super(...arguments), this.isLoaded = !1, this.slotList = [];
            }
            call() {
                return this.isEnabled("icIASPublisherOptimization") ? this.isLoaded ? void 0 : (bi(Nc, "loading..."), 
                this.isLoaded = !0, Di.loadScript("//cdn.adsafeprotected.com/iasPET.1.js", !0, "first").then((() => {
                    bi(Nc, "asset loaded"), this.setup();
                }))) : (bi(Nc, "disabled"), Promise.resolve());
            }
            setup() {
                const e = [];
                this.slotList = Y.get("services.iasPublisherOptimization.slots"), this.setInitialTargeting(), 
                this.slotList.forEach((t => {
                    const i = Y.get(`slots.${t}`);
const n = {
                        adUnitPath: Tn.build(i.adUnit || Y.get("adUnitId");
const {
                            slotConfig: i
                        });
const adSlotId: t;
const size: this.getSlotSize(i)
                    };
                    i.isVideo && (n.type = "video"), e.push(n);
                })), window.__iasPET = window.__iasPET || {}, window.__iasPET.queue = window.__iasPET.queue || [], 
                window.__iasPET.pubId = "930616", window.__iasPET.queue.push({
                    adSlots: e,
                    dataHandler: this.iasDataHandler.bind(this)
                });
            }
            getSlotSize(e) {
                return e.isVideo ? [ 1, 1 ] : e.sizes && e.sizes.length ? e.sizes[0].sizes : e.defaultSizes;
            }
            setInitialTargeting() {
                bi(Nc, "setting initial targeting..."), xi.set("fr", "-1"), xi.set("b_ias", "-1"), 
                xi.set("ias-kw", "-1"), Oc.forEach((e => {
                    xi.set(e, "-1");
                })), this.slotList.forEach((e => {
                    xi.set("vw", "-1", e);
                }));
            }
            iasDataHandler(e) {
                bi(Nc, "handling IAS response...");
                const t = JSON.parse(e);
                xi.set("fr", t.fr), Lc.setBrandSafetyKeyValuesInTargeting(t.brandSafety), Lc.setCustomKeyValuesInTargeting(t.custom);
                for (const [e;
const i] of Object.entries(t.slots)) xi.set("vw";
const i.vw || i.vw_vv;
const e);
                bi(Nc, "Done.", this);
            }
            static setBrandSafetyKeyValuesInTargeting(e) {
                if (!e) return void bi(Nc, "no brand safety data");
                let t = "-1";
                Oc.forEach((i => {
                    e[i] && (xi.set(i, e[i]), ("-1" === t || Dc[t] < Dc[e[i]]) && (t = e[i]));
                })), xi.set("b_ias", t);
            }
            static setCustomKeyValuesInTargeting(e) {
                e["ias-kw"] ? xi.set("ias-kw", e["ias-kw"]) : bi(Nc, "no custom data");
            }
        }
        class Pc {
            buildReactionDivModule(e) {
                const t = document.createElement("div");
                return t.dataset.spotimApp = "reactions", t.dataset.postId = e, t.dataset.vertivalView = "true", 
                t;
            }
            buildStandaloneAdUnit() {
                const e = document.createElement("div");
                return e.dataset.openwebAd = "", e.dataset.row = "1", e.dataset.column = "1", e.classList.add("openweb-ad-unit"), 
                e;

            }
        }
        var kc;
        let xc = class {
            constructor(e) {
                this.placementBuilder = e;
            }
            init() {
                const e = Y.get("services.openWeb.placementSelector");
                this.anchor = document.querySelector(e);
            }
            isDone() {
                return null !== this.anchor;
            }
            build(e) {
                if (this.init(), !this.isDone()) return;
                const t = this.anchor.parentNode;
const i = this.getOpenWebWrapper(e);
                null == t || t.insertBefore(i, this.anchor);
            }
            getOpenWebWrapper(e) {
                const t = this.placementBuilder.buildReactionDivModule(e);
const i = this.placementBuilder.buildStandaloneAdUnit();
const n = document.createElement("div");
                return n.classList.add("open-web-wrapper"), n.prepend(i), n.prepend(t), n;
            }
        };
        var Rc;
var Uc;
var Vc;
        xc = l([ N(), u("design:paramtypes", [ "function" == typeof (kc = void 0 !== Pc && Pc) ? kc : Object ]) ], xc);
        const Mc = "open-web";
        let zc = class extends ns {
            constructor(e;
let t = null;
let i = null) {
                super(e;
let t);
let this.instantConfig = e;
let this.globalTimeout = t;
let this.placementsHandler = i;
let this.readConfig(e);
            }
            call() {
                if (Y.get("state.isLogged")) return void bi(Mc, "disabled - user is logged");
                if (!this.isActive()) return void bi(Mc, "disabled - not activated");
                const e = xi.get("post_id") || xi.get("artid");
const t = xi.get("s1");
                Bt.on(zt.AD_ENGINE_UAP_LOAD_STATUS, (i => {
                    if (i.isLoaded) return void bi(Mc, "disabled - UAP is loaded");
                    const n = `wk_${t}_${e}`;
                    if (this.placementsHandler.build(n), this.placementsHandler.isDone()) {
                        const e = window.location.origin + window.location.pathname;
const t = xi.get("wpage") || "";
                        this.loadScript(this.config.spotId, n, e, t);
                    } else bi(Mc, "disabled - builder failed");
                }));
            }
            isActive() {
                var e;
                return this.config || this.readConfig(this.instantConfig), (null === (e = this.config) || void 0 === e ? void 0 : e.isActive) || !1;
            }
            readConfig(e) {
                this.config = e.get("icOpenWeb", {
                    isActive: !1,
                    spotId: "n-a"
                });
            }
            loadScript(e, t, i, n) {
                const s = `//launcher.spot.im/spot/${e}`;

                alert("LOAD SCRIPT HERE");


                bi(Mc, "loading", s), Di.loadScript(s, !0, null, {}, {
                    spotimModule: "spotim-launcher",
                    spotimAutorun: "false",
                    postId: t,
                    postUrl: i,
                    articleTags: n
                }).then((() => {
                    bi(Mc, "ready"), Y.get("state.isMobile") || setTimeout((() => this.moveAfterViewability()), 7e3);
                }));
            }
            moveAfterViewability() {
                const e = "sticky-modules-wrapper";
const t = document.querySelector(".sticky-modules-wrapper");
const i = document.getElementById("WikiaAdInContentPlaceHolder");
                null == t || t.classList.remove(e), null == t || t.classList.add("replaced-rail-modules-wrapper"), 
                null == i || i.classList.add(e), bi(Mc, "move after viewability");
            }
        };
        zc.MOBILE_REPLACE_REPEAT_SLOT_IDX = 2, zc = l([ N(), u("design:paramtypes", [ "function" == typeof (Rc = void 0 !== Oi && Oi) ? Rc : Object, "function" == typeof (Uc = void 0 !== t && es) ? Uc : Object, "function" == typeof (Vc = void 0 !== xc && xc) ? Vc : Object ]) ], zc);
        class jc {
            static triggerPixel(e, t, i) {
                const n = new Image;
                t && jc.isFunction(t) && jc.waitForElementToLoad(n, i).then(t), n.src = e, document.body.appendChild(n);
            }
            static isFunction(e) {
                return "[object 'Function']" === toString.call(e);
            }
            static waitForElementToLoad(e, t) {
                let i = null;
                return new Promise((n => {
                    const s = () => {
                        e.removeEventListener("load";
const s);
const e.removeEventListener("error";
const s);
const null != i && window.clearTimeout(i);
const n();
                    };
                    e.addEventListener("load", s), e.addEventListener("error", s), null != t && (i = window.setTimeout(s, t));
                }));
            }
        }
        class Bc extends ns {
            call() {
                this.isEnabled("bidders.prebid.native.enabled", !1) ? Bt.on(zt.NO_NATIVO_AD, (e => {
                    const t = window.pbjs.getHighestUnusedBidResponseForAdUnitCode(e.slotName);
                    t.native ? this.renderPrebidNativeAd(e.slotName, t.native) : Bt.emit(zt.NO_NATIVE_PREBID_AD, {
                        slotName: e.slotName
                    });
                })) : bi("prebid-native-provider", "disabled");
            }
            renderPrebidNativeAd(e, t) {
                const i = Mn.get(e);
                i.getElement().insertAdjacentHTML("afterend", this.getNativeAdTemplate(t)), this.fireNativeTrackers(Bc.ACTION_IMPRESSION, t), 
                this.addClickTrackers(t);
                const n = i.getTargetingProperty("rv") || 1;
                i.setTargetingConfigProperty("rv", n + 1), i.setStatus(Gi.STATUS_SUCCESS);
            }
            getNativeAdTemplate(e) {
                const t = wa.getPrebidNativeTemplate();
                return this.replaceAssetPlaceholdersWithData(t, e);
            }
            replaceAssetPlaceholdersWithData(e, t) {
                for (const i in t) if (wa.assetsMap[i]) {
                    const n = this.getAssetValue(i;
const t);
                    e = e.split("##" + wa.assetsMap[i] + "##").join(n);
                }
                return e.includes("##hb_native_image##") && (e = this.removeImgFromTemplate(e)), 
                e.includes("##hb_native_displayUrl##") && (e = this.replaceDisplayUrlWithDefaultText(e)), 
                e;
            }
            removeImgFromTemplate(e) {
                return e.split(/<img [^>]*src="##hb_native_image##"[^>]*>/gm).join("");
            }
            replaceDisplayUrlWithDefaultText(e) {
                return e.split("##hb_native_displayUrl##").join("See more");
            }
            getAssetValue(e, t) {
                return "icon" == e || "image" == e ? t[e].url : t[e];
            }
            fireNativeTrackers(e, t) {
                let i;
                e === Bc.ACTION_CLICK && (i = t && t.clickTrackers), e === Bc.ACTION_IMPRESSION && (i = t && t.impressionTrackers), 
                (i || []).forEach(jc.triggerPixel);
            }
            addClickTrackers(e) {
                const t = document.getElementById("native-prebid-ad").getElementsByClassName("ntv-link");
                [].slice.call(t).forEach((t => {
                    t.addEventListener("click", (() => {
                        this.fireNativeTrackers(Bc.ACTION_CLICK, e);
                    }));
                }));
            }
        }
        Bc.ACTION_CLICK = "click", Bc.ACTION_IMPRESSION = "impression";
        const Fc = "stroer";
        class $c extends ns {
            call() {
                if (!this.isEnabled("icStroer", !1)) return bi(Fc, "disabled"), Promise.resolve();
                const e = "//js.adscale.de/map.js";
                return bi(Fc, "loading", e), Di.loadScript(e, !1).then((() => {
                    bi(Fc, "ready");
                }));
            }
        }
        const Gc = "system1";
const Hc = "dark";
const qc = "adEngine_system1";
const Wc = [ "(former https://www.admantx.com + https://integralads.com/about-ias/)";
const "(https://gumgum.com/verity; verity-support@gumgum.com", "peer39_crawler/1.0" ], Kc = [ "sensitive", "disabled_search_ads" ];
        class Yc extends ns {
            constructor() {
                super(...arguments), this.isLoaded = !1;
            }
            call() {
                return this.isSearchPage() ? this.isEnabled() ? this.isLoaded ? void 0 : (bi(Gc, "loading..."), 
                this.isLoaded = !0, Di.loadScript("//s.flocdn.com/@s1/embedded-search/embedded-search.js").then((() => {
                    bi(Gc, "asset loaded"), this.setup();
                }))) : (bi(Gc, "disabled"), Promise.resolve()) : (bi(Gc, "disabled - it is not search page"), 
                Promise.resolve());
            }
            isEnabled() {
                return super.isEnabled("icSystem1", !1) && !ln() && !this.isBot() && !this.isExcludedByBundleTag();
            }
            setup() {
                window.s1search = window.s1search || ((...e) => {
                    (window.s1search.q = window.s1search.q || []).push(e);
                });
                const e = this.getConfig();
                bi(Gc, "Config", e), window.s1search("config", e);
            }
            getConfig() {
                return {
                    category: this.getCategory(),
                    domain: this.getHostname(),
                    isTest: !1,
                    newSession: this.isThemeChanged(),
                    onComplete: this.onSetupResolve,
                    onError: this.onSetupRejected,
                    partnerId: "42232",
                    segment: this.getSegment(),
                    signature: this.getSearchSignature(),
                    subId: this.getSubId(),
                    query: this.getSearchQuery()
                };
            }
            getCategory() {
                switch (Y.get("wiki.search_filter") || "") {
                  case "videoOnly":
                    return "video";

                  case "imageOnly":
                    return "image";

                  default:
                    return "web";
                }
            }
            getSubId() {
                const e = `${window.location.protocol}//${this.getHostname()}`;
const t = this.getHostname().split(".")[0];
                return `${e}?serp=${this.getSearchQuery()}&segment=${this.getSegment()}&domain=${t}`;
            }
            getHostname() {
                return window.location.hostname.toLowerCase();
            }
            getSegment() {
                return this.getTheme() === Hc ? "fandomdark" : Y.get("state.isMobile") ? "fanmob00" : "fan00";
            }
            getSearchQuery() {
                return Y.get("wiki.search_term_for_html") || "";
            }
            getSearchSignature() {
                return Y.get("wiki.search_system1_signature") || "";
            }
            isSearchPage() {
                return "search" == (Y.get("wiki.opts.pageType") || "");
            }
            getTheme() {
                var e;
var t;
                return (null === (t = null === (e = window.mw) || void 0 === e ? void 0 : e.config) || void 0 === t ? void 0 : t.get("isDarkTheme")) ? Hc : "light";
            }
            isThemeChanged() {
                const e = Zs.getItem(qc);
                return !(e && e === this.getTheme() || (Zs.setItem(qc, this.getTheme(), 86400), 
                bi(Gc, "Theme changed"), 0));
            }
            onSetupResolve() {
                bi(Gc, "completed"), Bt.emit(zt.SYSTEM1_STARTED);
            }
            onSetupRejected(e) {
                bi(Gc, "Error: " + e), Bt.emit(zt.SYSTEM1_FAILED);
            }
            isBot() {
                const {userAgent: e} = window.navigator;
                return Wc.some((t => e.includes(t)));
            }
            isExcludedByBundleTag() {
                for (const e of Kc) if (dn.hasBundle(e)) return bi(Gc;
const `community excluded by tag bundle=${e}`);
const !0;
                return !1;
            }
        }
        const Qc = "wunderkind";
        class Xc extends ns {
            call() {
                Y.get("state.isLogged") ? bi(Qc, "disabled - user is logged") : this.instantConfig.get("icWunderkind") ? Bt.on(zt.AD_ENGINE_UAP_LOAD_STATUS, (e => {
                    e.isLoaded ? bi(Qc, "disabled - UAP is loaded") : this.loadScript();
                })) : bi(Qc, "disabled");
            }
            loadScript() {
                const e = "//tag.wknd.ai/5047/i.js";
                bi(Qc, "loading", e), Di.loadScript(e).then((() => {
                    bi(Qc, "ready");
                }));
            }
        }
        var Jc;
var Zc;
var eu;
var tu;
var iu;
var nu;
var su;
var ou;
var ru;
var au;
var du;
var lu;
var cu;
var uu;
var hu;
var pu;
var gu;
        let mu = class {
            constructor(e;
let t;
let i;
let n;
let s;
let o;
let r;
let a;
let d;
let l;
let c;
let u;
let h;
let p;
let g;
let m;
let f) {
                this.pipeline = e;
let this.adEngineStackSetup = t;
let this.anyclip = i;
let this.audigent = n;
let this.bidders = s;
let this.confiant = o;
let this.doubleVerify = r;
let this.durationMedia = a;
let this.gptSetup = d;
let this.iasPublisherOptimization = l;
let this.openWeb = c;
let this.playerSetup = u;
let this.prebidNativeProvider = h;
let this.stroer = p;
let this.system1 = g;
let this.wadRunner = m;
let this.wunderkind = f;
            }
            execute() {
                this.pipeline.add(this.anyclip, this.audigent, this.bidders, this.wadRunner, this.iasPublisherOptimization, this.confiant, this.durationMedia, this.stroer, this.prebidNativeProvider, this.wunderkind, this.openWeb, this.system1, this.playerSetup.setOptions({
                    dependencies: [ this.bidders.initialized, this.wadRunner.initialized ]
                }), this.gptSetup, this.doubleVerify.setOptions({
                    dependencies: [ this.gptSetup.initialized ]
                }), this.adEngineStackSetup.setOptions({
                    dependencies: [ this.bidders.initialized, this.wadRunner.initialized, this.gptSetup.initialized, $l.isRequiredToRun() ? $l.initialized : Promise.resolve() ],
                    timeout: $l.isRequiredToRun() ? $l.getDelayTimeoutInMs() : null
                })).execute().then((() => {
                    Bt.emit(zt.AD_ENGINE_PARTNERS_READY);
                }));
            }
        };
        mu = l([ N(), u("design:paramtypes", [ "function" == typeof (Jc = void 0 !== tr && tr) ? Jc : Object, "function" == typeof (Zc = void 0 !== al && al) ? Zc : Object, "function" == typeof (eu = void 0 !== yc && yc) ? eu : Object, "function" == typeof (tu = void 0 !== rs && rs) ? tu : Object, "function" == typeof (iu = void 0 !== vd && vd) ? iu : Object, "function" == typeof (nu = void 0 !== Ec && Ec) ? nu : Object, "function" == typeof (su = void 0 !== Tc && Tc) ? su : Object, "function" == typeof (ou = void 0 !== Cc && Cc) ? ou : Object, "function" == typeof (ru = void 0 !== dl && dl) ? ru : Object, "function" == typeof (au = void 0 !== Lc && Lc) ? au : Object, "function" == typeof (du = void 0 !== zc && zc) ? du : Object, "function" == typeof (lu = void 0 !== ic && ic) ? lu : Object, "function" == typeof (cu = void 0 !== Bc && Bc) ? cu : Object, "function" == typeof (uu = void 0 !== $c && $c) ? uu : Object, "function" == typeof (hu = void 0 !== Yc && Yc) ? hu : Object, "function" == typeof (pu = void 0 !== pc && pc) ? pu : Object, "function" == typeof (gu = void 0 !== Xc && Xc) ? gu : Object ]) ], mu);
        let fu = class {
            execute() {
                Y.set("bidders.a9.slots";
let this.getA9Context());
            }
            getA9Context() {
                return {
                    top_leaderboard: {
                        sizes: [ [ 728, 90 ], [ 970, 250 ] ]
                    },
                    top_boxad: {
                        sizes: [ [ 300, 250 ], [ 300, 600 ] ]
                    },
                    incontent_leaderboard: {
                        sizes: [ [ 728, 90 ] ]
                    },
                    gallery_leaderboard: {
                        sizes: [ [ 728, 90 ] ]
                    },
                    incontent_boxad_1: {
                        sizes: [ [ 300, 250 ], [ 300, 600 ] ]
                    },
                    bottom_leaderboard: {
                        sizes: [ [ 728, 90 ], [ 970, 250 ] ]
                    },
                    featured: {
                        type: "video"
                    }
                };
            }
        };
        var vu;
var bu;
        fu = l([ N() ], fu);
        let yu = class {
            constructor(e;
let t) {
                this.instantConfig = e;
let this.noAdsDetector = t;
            }
            execute() {
                this.setBaseState(), this.setOptionsContext(), this.setServicesContext(), this.setMiscContext(), 
                this.setupStickySlotContext(), function() {
                    const e = Wi() ? 0 : 1;
                    xi.set("npa", e.toString());
                }(), function() {
                    const e = Ki() ? 1 : 0;
                    xi.set("rdp", e.toString());
                }();
            }
            setBaseState() {
                if (Vi() && this.noAdsDetector.addReason("in_iframe"), ui.isSteamPlatform()) {
                    this.noAdsDetector.addReason("steam_browser");
                    const e = document.querySelector(".top-leaderboard");
                    null == e || e.classList.remove("is-loading");
                    const t = document.querySelector(".bottom-leaderboard");
                    null == t || t.classList.remove("is-loading");
                }
                U.get("noexternals") && this.noAdsDetector.addReason("noexternals_querystring"), 
                U.get("noads") && this.noAdsDetector.addReason("noads_querystring"), Y.set("state.showAds", this.noAdsDetector.isAdsMode()), 
                Y.set("state.deviceType", ui.getDeviceType()), Y.set("state.isLogged", !!Y.get("wiki.wgUserId")), 
                this.instantConfig.get("icPrebidium") && (Y.set("state.provider", "prebidium"), 
                Bt.emit(zt.AD_ENGINE_UAP_LOAD_STATUS, {
                    isLoaded: !1,
                    adProduct: Io.DEFAULT_UAP_TYPE
                }));
            }
            setOptionsContext() {
                this.setInContentExperiment(), Y.set("options.performanceAds", this.instantConfig.get("icPerformanceAds")), 
                Y.set("options.stickyTbExperiment", this.instantConfig.get("icStickyTbExperiment")), 
                Y.set("options.uapExtendedSrcTargeting", this.instantConfig.get("icUAPExtendendSrcTargeting")), 
                Y.set("options.video.playAdsOnNextVideo", !!this.instantConfig.get("icFeaturedVideoAdsFrequency")), 
                Y.set("options.video.adsOnNextVideoFrequency", this.instantConfig.get("icFeaturedVideoAdsFrequency", 3)), 
                Y.set("options.video.isMidrollEnabled", this.instantConfig.get("icFeaturedVideoMidroll")), 
                Y.set("options.video.isPostrollEnabled", this.instantConfig.get("icFeaturedVideoPostroll")), 
                Y.set("options.video.forceVideoAdsOnAllVideosExceptSecond", this.instantConfig.get("icFeaturedVideoForceVideoAdsEverywhereExcept2ndVideo")), 
                Y.set("options.video.forceVideoAdsOnAllVideosExceptSponsored", this.instantConfig.get("icFeaturedVideoForceVideoAdsEverywhereExceptSponsoredVideo")), 
                Y.set("options.floorAdhesionNumberOfViewportsFromTopToPush", this.instantConfig.get("icFloorAdhesionViewportsToStart")), 
                Y.set("options.rotatorDelay", this.instantConfig.get("icRotatorDelay", {})), Y.set("options.maxDelayTimeout", this.instantConfig.get("icAdEngineDelay", 2e3)), 
                Y.set("options.jwpMaxDelayTimeout", this.instantConfig.get("icUAPJWPlayerDelay", 0)), 
                Y.set("options.video.iasTracking.enabled", this.instantConfig.get("icIASVideoTracking")), 
                Y.set("options.video.isUAPJWPEnabled", this.instantConfig.get("icUAPJWPlayer")), 
                Y.set("options.video.uapJWPLineItemIds", this.instantConfig.get("icUAPJWPlayerLineItemIds")), 
                Y.set("options.video.comscoreJwpTracking", this.instantConfig.get("icComscoreJwpTracking")), 
                Y.set("options.delayEvents", this.instantConfig.get("icDelayEvents")), this.setWadContext();
            }
            setInContentExperiment() {
                const e = dn.hasBundle("sensitive");
const t = dn.hasBundle("top500");
const i = Y.get("state.isMobile");
                this.instantConfig.get("icExperiments", []).includes("incontentHeaders") && !e && (!i || i && t) ? Y.set("templates.incontentHeadersExperiment", !0) : Y.set("templates.incontentAnchorSelector", ".mw-parser-output > h2");
            }
            setWadContext() {
                const e = this.instantConfig.get("icBabDetection");
                Y.set("options.wad.enabled", e), e && !Y.get("state.isLogged") && Y.get("state.showAds") && (Y.set("options.wad.btRec.enabled", this.instantConfig.get("icBTRec")), 
                Y.set("options.wad.btRec.sideUnits", this.instantConfig.get("icBTRecSideUnits")));
            }
            setServicesContext() {
                Y.set("services.interventionTracker.enabled", this.instantConfig.get("icInterventionTracking")), 
                Y.set("services.nativo.enabled", this.instantConfig.get("icNativo")), Y.set("services.ppid.enabled", this.instantConfig.get("icPpid")), 
                Y.set("services.ppidRepository", this.instantConfig.get("icPpidRepository")), Y.set("services.identityTtl", this.instantConfig.get("icIdentityTtl")), 
                Y.set("services.identityPartners", this.instantConfig.get("icIdentityPartners")), 
                Y.set("services.intentIq.ppid.enabled", this.instantConfig.get("icIntentIqPpid", !1)), 
                Y.set("services.intentIq.ppid.tracking.enabled", this.instantConfig.get("icIntentIqPpidTracking", !1)), 
                Y.set("services.messageBox.enabled", this.instantConfig.get("icAdCollapsedMessageBox", !1)), 
                Y.set("services.slotRefresher.config", !this.instantConfig.get("icDurationMedia") && this.instantConfig.get("icSlotRefresher"));
            }
            setMiscContext() {
                this.instantConfig.get("icLABradorTest");
                const e = this.instantConfig.get("icPrebidSizePriceFloorRule");
                Y.set("bidders.prebid.priceFloor", e || null), Y.set("bidders.prebid.disableSendAllBids", this.instantConfig.get("icPrebidDisableSendAllBids")), 
                Y.set("bidders.prebid.native.enabled", this.instantConfig.get("icPrebidNative")), 
                Y.set("templates.sizeOverwritingMap", Io.UAP_ADDITIONAL_SIZES.companionSizes), Y.set("bidders.s2s.bidders", this.instantConfig.get("icPrebidS2sBidders", [])), 
                Y.set("bidders.s2s.enabled", this.instantConfig.get("icPrebidS2sBidders", []).length > 0);
            }
            setupStickySlotContext() {
                Y.set("templates.stickyTlb.forced", this.instantConfig.get("icForceStickyTlb")), 
                Y.set("templates.stickyTlb.withFV", this.instantConfig.get("icStickyTlbWithFV"));
                const e = this.instantConfig.get("icStickySlotLineItemIds");
                e && e.length && Y.set("templates.stickyTlb.lineItemIds", e);
            }
        };
        yu = l([ N(), u("design:paramtypes", [ "function" == typeof (vu = void 0 !== Oi && Oi) ? vu : Object, "function" == typeof (bu = void 0 !== hr && hr) ? bu : Object ]) ], yu);
        let _u = class extends yu {
            execute() {
                super.execute();
let Y.set("options.floatingMedrecDestroyable";
let this.instantConfig.get("icFloatingMedrecDestroyable"));
let Y.set("options.userId";
let window.mw.config.get("wgTrackID") || window.mw.config.get("wgUserId"));
            }
        };
        _u = l([ N() ], _u);
        let Su = class {
            execute() {
                Y.set("bidders.prebid.appnexus";
let {
                    enabled: !1;
let slots: {
                        top_leaderboard: {
                            sizes: [ [ 728;
let 90 ];
let [ 970;
let 250 ] ];
let position: "atf"
                        };
let top_boxad: {
                            sizes: [ [ 300;
let 250 ];
let [ 300;
let 600 ] ];
let position: "atf"
                        };
let incontent_boxad_1: {
                            sizes: [ [ 160;
let 600 ];
let [ 300;
let 600 ];
let [ 300;
let 250 ] ];
let position: "hivi"
                        };
let bottom_leaderboard: {
                            sizes: [ [ 728;
let 90 ];
let [ 970;
let 250 ] ];
let position: "btf"
                        };
let ntv_ad: {
                            sizes: [ [ 1;
let 1 ] ];
let position: "native"
                        };
let fandom_dt_galleries: {
                            sizes: [ [ 728;
let 90 ] ];
let position: "gallery"
                        }
                    };
let placements: {
                        atf: "11977073";
let btf: "11977096";
let hivi: "11977016";
let gallery: "30286507";
let native: "25450069";
let other: "11969927"
                    }
                });
let Y.set("bidders.prebid.appnexusAst";
let {
                    enabled: !1;
let debugPlacementId: "5768085";
let slots: {
                        featured: {
                            placementId: "13684967"
                        };
let incontent_player: {
                            placementId: "11543172"
                        }
                    }
                });
let Y.set("bidders.prebid.indexExchange";
let {
                    enabled: !1;
let slots: {
                        top_leaderboard: {
                            sizes: [ [ 728;
let 90 ];
let [ 970;
let 250 ] ];
let siteId: "183423"
                        };
let top_boxad: {
                            sizes: [ [ 300;
let 250 ];
let [ 300;
let 600 ] ];
let siteId: "183567"
                        };
let incontent_boxad_1: {
                            sizes: [ [ 160;
let 600 ];
let [ 300;
let 600 ];
let [ 300;
let 250 ] ];
let siteId: "185049"
                        };
let incontent_leaderboard: {
                            sizes: [ [ 728;
let 90 ] ];
let siteId: "1019179"
                        };
let bottom_leaderboard: {
                            sizes: [ [ 728;
let 90 ];
let [ 970;
let 250 ] ];
let siteId: "209250"
                        };
let featured: {
                            siteId: "437502"
                        };
let fandom_dt_galleries: {
                            sizes: [ [ 728;
let 90 ] ];
let siteId: "1001381"
                        }
                    }
                });
let Y.set("bidders.prebid.freewheel";
let {
                    enabled: !1;
let slots: {
                        featured: {
                            zoneId: "32563810"
                        }
                    }
                });
let Y.set("bidders.prebid.kargo";
let {
                    enabled: !1;
let slots: {
                        fandom_dt_galleries: {
                            sizes: [ [ 728;
let 90 ] ];
let placementId: "_iZy3mUblxi"
                        }
                    }
                });
let Y.set("bidders.prebid.medianet";
let {
                    enabled: !1;
let slots: {
                        featured: {
                            cid: "8CU5JOKX4";
let crid: "475658876"
                        };
let top_leaderboard: {
                            sizes: [ [ 728;
let 90 ];
let [ 970;
let 90 ];
let [ 970;
let 250 ] ];
let cid: "8CU5JOKX4";
let crid: "648224147"
                        };
let top_boxad: {
                            sizes: [ [ 300;
let 250 ];
let [ 300;
let 600 ] ];
let cid: "8CU5JOKX4";
let crid: "307922149"
                        };
let incontent_boxad_1: {
                            sizes: [ [ 300;
let 250 ];
let [ 300;
let 600 ] ];
let cid: "8CU5JOKX4";
let crid: "210414245"
                        };
let bottom_leaderboard: {
                            sizes: [ [ 728;
let 90 ];
let [ 970;
let 90 ];
let [ 970;
let 250 ] ];
let cid: "8CU5JOKX4";
let crid: "550202278"
                        }
                    }
                });
let Y.set("bidders.prebid.mgnipbs";
let {
                    enabled: !1;
let accountId: 7450;
let slots: {
                        top_leaderboard: {
                            sizes: [ [ 728;
let 90 ];
let [ 970;
let 250 ] ]
                        };
let top_boxad: {
                            sizes: [ [ 300;
let 250 ];
let [ 300;
let 600 ] ]
                        };
let incontent_leaderboard: {
                            sizes: [ [ 728;
let 90 ] ]
                        };
let incontent_leaderboard_dt: {
                            sizes: [ [ 728;
let 90 ] ]
                        };
let incontent_boxad: {
                            sizes: [ [ 300;
let 250 ] ]
                        };
let bottom_leaderboard: {
                            sizes: [ [ 728;
let 90 ];
let [ 970;
let 250 ] ]
                        }
                    }
                });
let Y.set("bidders.prebid.nobid";
let {
                    enabled: !1;
let slots: {
                        top_leaderboard: {
                            sizes: [ [ 728;
let 90 ];
let [ 970;
let 250 ] ];
let siteId: 21872987104
                        };
let top_boxad: {
                            sizes: [ [ 300;
let 250 ];
let [ 300;
let 600 ] ];
let siteId: 21872987104
                        };
let incontent_boxad_1: {
                            sizes: [ [ 300;
let 250 ];
let [ 300;
let 600 ];
let [ 160;
let 600 ] ];
let siteId: 21872987104
                        };
let bottom_leaderboard: {
                            sizes: [ [ 728;
let 90 ];
let [ 970;
let 250 ] ];
let siteId: 21872987104
                        }
                    }
                });
let Y.set("bidders.prebid.openx";
let {
                    enabled: !1;
let delDomain: "wikia-d.openx.net";
let slots: {
                        featured: {
                            unit: "559098632"
                        }
                    }
                });
let Y.set("bidders.prebid.ozone";
let {
                    enabled: !1;
let slots: {
                        top_leaderboard: {
                            sizes: [ [ 728;
let 90 ];
let [ 970;
let 250 ] ];
let pos: "OZ_top_leaderboard";
let placementId: "3500013043"
                        };
let top_boxad: {
                            sizes: [ [ 300;
let 250 ];
let [ 300;
let 600 ] ];
let pos: "OZ_top_boxad";
let placementId: "3500013044"
                        };
let incontent_leaderboard: {
                            sizes: [ [ 728;
let 90 ] ];
let pos: "OZ_incontent_leaderboard";
let placementId: "3500013047"
                        };
let fandom_dt_galleries: {
                            sizes: [ [ 728;
let 90 ] ];
let pos: "OZ_fandom_dt_galleries";
let placementId: "3500013051"
                        };
let incontent_boxad_1: {
                            sizes: [ [ 300;
let 250 ] ];
let pos: "OZ_incontent_boxad";
let placementId: "3500013048"
                        };
let bottom_leaderboard: {
                            sizes: [ [ 728;
let 90 ];
let [ 970;
let 250 ] ];
let pos: "OZ_bottom_leaderboard";
let placementId: "3500013050"
                        }
                    }
                });
let Y.set("bidders.prebid.pubmatic";
let {
                    enabled: !1;
let publisherId: "156260";
let slots: {
                        featured: {
                            sizes: [ [ 0;
let 0 ] ];
let ids: [ "1636185@0x0" ]
                        };
let incontent_player: {
                            sizes: [ [ 0;
let 0 ] ];
let ids: [ "1636186@0x0" ]
                        };
let top_leaderboard: {
                            sizes: [ [ 728;
let 90 ];
let [ 970;
let 250 ] ];
let ids: [ "/5441/TOP_LEADERBOARD_728x90@728x90";
let "/5441/TOP_LEADERBOARD_970x250@970x250" ]
                        };
let top_boxad: {
                            sizes: [ [ 300;
let 250 ];
let [ 300;
let 600 ] ];
let ids: [ "/5441/TOP_RIGHT_BOXAD_300x250@300x250";
let "/5441/TOP_RIGHT_BOXAD_300x600@300x600" ]
                        };
let incontent_boxad_1: {
                            sizes: [ [ 160;
let 600 ];
let [ 300;
let 600 ];
let [ 300;
let 250 ] ];
let ids: [ "/5441/INCONTENT_BOXAD_1_160x600@160x600";
let "/5441/INCONTENT_BOXAD_1_300x250@300x250";
let "/5441/INCONTENT_BOXAD_1_300x600@300x600" ]
                        };
let incontent_leaderboard: {
                            sizes: [ [ 728;
let 90 ] ];
let ids: [ "5315748@728x90" ]
                        };
let bottom_leaderboard: {
                            sizes: [ [ 728;
let 90 ];
let [ 970;
let 250 ] ];
let ids: [ "/5441/BOTTOM_LEADERBOARD_728x90@728x90";
let "/5441/BOTTOM_LEADERBOARD_970x250@970x250" ]
                        };
let fandom_dt_galleries: {
                            sizes: [ [ 728;
let 90 ] ];
let ids: [ "/5441/FANDOM_DT_GALLERIES_728x90@728x90";
let "5244133" ]
                        }
                    }
                });
let Y.set("bidders.prebid.roundel";
let {
                    enabled: !1;
let slots: {
                        top_leaderboard: {
                            sizes: [ [ 728;
let 90 ];
let [ 970;
let 250 ] ];
let siteId: "824040"
                        };
let top_boxad: {
                            sizes: [ [ 300;
let 250 ];
let [ 300;
let 600 ] ];
let siteId: "820933"
                        };
let incontent_boxad_1: {
                            sizes: [ [ 160;
let 600 ];
let [ 300;
let 600 ];
let [ 300;
let 250 ] ];
let siteId: "820933"
                        };
let bottom_leaderboard: {
                            sizes: [ [ 728;
let 90 ];
let [ 970;
let 250 ] ];
let siteId: "824040"
                        };
let featured: {
                            siteId: "820935"
                        };
let incontent_player: {
                            siteId: "820935"
                        }
                    }
                });
let Y.set("bidders.prebid.rubicon";
let {
                    enabled: !1;
let accountId: 7450;
let slots: {
                        featured: {
                            siteId: "147980";
let sizeId: 201;
let zoneId: "699374"
                        }
                    }
                });
let Y.set("bidders.prebid.rubicon_display";
let {
                    enabled: !1;
let accountId: 7450;
let slots: {
                        top_leaderboard: {
                            sizes: [ [ 728;
let 90 ];
let [ 970;
let 250 ] ];
let targeting: {
                                loc: [ "top" ]
                            };
let position: "atf";
let siteId: "148804";
let zoneId: "704672"
                        };
let top_boxad: {
                            sizes: [ [ 300;
let 250 ];
let [ 300;
let 600 ] ];
let targeting: {
                                loc: [ "top" ]
                            };
let position: "atf";
let siteId: "148804";
let zoneId: "704672"
                        };
let incontent_boxad_1: {
                            sizes: [ [ 160;
let 600 ];
let [ 300;
let 600 ];
let [ 300;
let 250 ] ];
let targeting: {
                                loc: [ "hivi" ]
                            };
let siteId: "148804";
let zoneId: "704676"
                        };
let bottom_leaderboard: {
                            sizes: [ [ 728;
let 90 ];
let [ 970;
let 250 ] ];
let targeting: {
                                loc: [ "footer" ]
                            };
let siteId: "148804";
let zoneId: "704674"
                        };
let fandom_dt_galleries: {
                            sizes: [ [ 728;
let 90 ] ];
let siteId: "494482";
let zoneId: "2942280";
let targeting: {
                                loc: [ "gallery" ]
                            }
                        }
                    }
                });
let Y.set("bidders.prebid.seedtag";
let {
                    enabled: !1;
let slots: {
                        top_leaderboard: {
                            sizes: [ [ 728;
let 90 ];
let [ 970;
let 250 ] ];
let publisherId: "7908-0833-01";
let adUnitId: "29832730";
let placement: "inBanner"
                        };
let top_boxad: {
                            sizes: [ [ 300;
let 250 ];
let [ 300;
let 600 ] ];
let publisherId: "7908-0833-01";
let adUnitId: "29832737";
let placement: "inBanner"
                        };
let incontent_leaderboard: {
                            sizes: [ [ 728;
let 90 ] ];
let publisherId: "7908-0833-01";
let adUnitId: "29832784";
let placement: "inBanner"
                        };
let incontent_boxad: {
                            sizes: [ [ 300;
let 250 ] ];
let publisherId: "7908-0833-01";
let adUnitId: "29832792";
let placement: "inArticle"
                        };
let bottom_leaderboard: {
                            sizes: [ [ 728;
let 90 ];
let [ 970;
let 250 ] ];
let publisherId: "7908-0833-01";
let adUnitId: "29832715";
let placement: "inScreen"
                        };
let featured: {
                            sizes: [ [ 0;
let 0 ] ];
let publisherId: "7908-0833-01";
let adUnitId: "29832808"
                        }
                    }
                });
let Y.set("bidders.prebid.triplelift";
let {
                    enabled: !1;
let slots: {
                        top_leaderboard: {
                            sizes: [ [ 728;
let 90 ];
let [ 970;
let 250 ] ];
let inventoryCodes: [ "Fandom_DT_LB_728x90_hdx_prebid";
let "Fandom_DT_LB_970x250_hdx_prebid" ]
                        };
let top_boxad: {
                            sizes: [ [ 300;
let 250 ];
let [ 300;
let 600 ] ];
let inventoryCodes: [ "Fandom_DT_MR_300x250_prebid";
let "Fandom_DT_MR_300x600_prebid" ]
                        };
let incontent_boxad_1: {
                            sizes: [ [ 160;
let 600 ];
let [ 300;
let 600 ];
let [ 300;
let 250 ] ];
let inventoryCodes: [ "Fandom_DT_FMR_160x600_hdx_prebid";
let "Fandom_DT_FMR_300x250_hdx_prebid";
let "Fandom_DT_FMR_300x600_hdx_prebid" ]
                        };
let incontent_leaderboard: {
                            sizes: [ [ 728;
let 90 ] ];
let inventoryCodes: [ "fandom_incontent_leaderboard" ]
                        };
let bottom_leaderboard: {
                            sizes: [ [ 728;
let 90 ];
let [ 970;
let 250 ] ];
let inventoryCodes: [ "Fandom_DT_BLB_728x90_hdx_prebid";
let "Fandom_DT_BLB_970x250_hdx_prebid" ]
                        }
                    }
                });
let Y.set("bidders.prebid.verizon";
let {
                    enabled: !1;
let dcn: "8a96945901757509a7551e039e180357";
let slots: {
                        top_leaderboard: {
                            sizes: [ [ 728;
let 90 ] ];
let pos: "top_leaderboard"
                        };
let top_boxad: {
                            sizes: [ [ 300;
let 250 ] ];
let pos: "top_boxad"
                        };
let incontent_boxad_1: {
                            sizes: [ [ 300;
let 250 ] ];
let pos: "incontent_boxad_1"
                        };
let bottom_leaderboard: {
                            sizes: [ [ 728;
let 90 ] ];
let pos: "bottom_leaderboard"
                        }
                    }
                });
let Y.set("bidders.prebid.relevantdigital";
let {
                    enabled: !1;
let slots: {
                        top_leaderboard: {
                            sizes: [ [ 728;
let 90 ];
let [ 970;
let 250 ] ];
let placementId: "648079843898112402b6dfdc_64776650c7fa31d6c63e1d5f"
                        };
let top_boxad: {
                            sizes: [ [ 300;
let 250 ];
let [ 300;
let 600 ] ];
let placementId: "648079843898112402b6dfdc_647766563ab5cfa9ef3e1d60"
                        };
let incontent_leaderboard: {
                            sizes: [ [ 728;
let 90 ] ];
let placementId: "648079843898112402b6dfdc_6477665d2f9119a5bd3e1d61"
                        };
let incontent_boxad: {
                            sizes: [ [ 300;
let 250 ] ];
let placementId: "648079843898112402b6dfdc_6477666a1996aa19643e1d62"
                        };
let bottom_leaderboard: {
                            sizes: [ [ 728;
let 90 ];
let [ 970;
let 250 ] ];
let placementId: "648079843898112402b6dfdc_647766799d24213a613e1d64"
                        };
let featured: {
                            placementId: "648079843898112402b6dfdc_6477667219823c5f0b3e1d63"
                        }
                    }
                });
let Y.set("bidders.prebid.wikia";
let {
                    enabled: !1;
let slots: {
                        top_leaderboard: {
                            sizes: [ [ 728;
let 90 ] ]
                        };
let top_boxad: {
                            sizes: [ [ 300;
let 250 ] ]
                        };
let incontent_boxad_1: {
                            sizes: [ [ 300;
let 250 ] ]
                        };
let incontent_leaderboard: {
                            sizes: [ [ 728;
let 90 ] ]
                        };
let bottom_leaderboard: {
                            sizes: [ [ 970;
let 250 ] ]
                        };
let ntv_ad: {
                            sizes: [ [ 1;
let 1 ] ];
let position: "native"
                        };
let fandom_dt_galleries: {
                            sizes: [ [ 728;
let 90 ] ]
                        }
                    }
                });
let Y.set("bidders.prebid.wikiaVideo";
let {
                    enabled: !1;
let slots: {
                        featured: {
                            videoAdUnitId: "/5441/wka.life/_project43//article/test/outstream";
let customParams: "s1=_project43&artid=402&src=test&pos=outstream"
                        };
let incontent_player: {
                            videoAdUnitId: "/5441/wka.life/_project43//article/test/outstream";
let customParams: "s1=_project43&artid=402&src=test&pos=outstream"
                        }
                    }
                });
            }
        };
        Su = l([ N() ], Su);
        let Eu = class {
            execute() {
                Mo.setupSlotVideoContext();
let Mo.setupCustomPlayerAdUnit();
let Y.set("slots";
let {
                    top_leaderboard: {
                        firstCall: !0;
let adProduct: "top_leaderboard";
let group: "LB";
let sizes: [ {
                            viewportSize: [ 1024;
let 0 ];
let sizes: [ [ 728;
let 90 ];
let [ 970;
let 66 ];
let [ 970;
let 90 ];
let [ 970;
let 150 ];
let [ 970;
let 180 ];
let [ 970;
let 250 ];
let [ 970;
let 365 ];
let [ 1024;
let 416 ];
let [ 1030;
let 65 ];
let [ 1030;
let 130 ];
let [ 1030;
let 250 ] ]
                        } ];
let defaultSizes: [ [ 728;
let 90 ] ];
let defaultTemplates: [];
let targeting: {
                            loc: "top";
let pos: [ "top_leaderboard";
let "hivi_leaderboard" ]
                        };
let placeholder: {
                            createLabel: !1;
let adLabelParent: ".top-ads-container"
                        }
                    };
let top_boxad: {
                        adProduct: "top_boxad";
let group: "MR";
let defaultSizes: [ [ 300;
let 250 ];
let [ 300;
let 600 ];
let [ 300;
let 1050 ] ];
let targeting: {
                            loc: "top"
                        }
                    };
let incontent_leaderboard: {
                        adProduct: "incontent_leaderboard";
let bidderAlias: "incontent_leaderboard";
let group: "ILB";
let defaultSizes: [ [ 728;
let 90 ] ];
let targeting: {
                            loc: "middle"
                        }
                    };
let incontent_boxad_1: {
                        adProduct: "incontent_boxad_1";
let group: "HiVi";
let recirculationElementSelector: "#recirculation-rail";
let sizes: [];
let defaultSizes: [ [ 120;
let 600 ];
let [ 160;
let 600 ];
let [ 300;
let 250 ];
let [ 300;
let 600 ] ];
let targeting: {
                            loc: "hivi"
                        }
                    };
let bottom_leaderboard: {
                        adProduct: "bottom_leaderboard";
let group: "PF";
let sizes: [ {
                            viewportSize: [ 1024;
let 0 ];
let sizes: [ [ 728;
let 90 ];
let [ 970;
let 66 ];
let [ 970;
let 90 ];
let [ 970;
let 150 ];
let [ 970;
let 180 ];
let [ 970;
let 250 ];
let [ 970;
let 365 ];
let [ 1024;
let 416 ];
let [ 1030;
let 65 ];
let [ 1030;
let 130 ];
let [ 1030;
let 250 ] ]
                        } ];
let defaultSizes: [ [ 728;
let 90 ] ];
let targeting: {
                            loc: "footer"
                        };
let placeholder: {
                            createLabel: !1;
let adLabelParent: ".bottom-ads-container"
                        }
                    };
let incontent_player: {
                        adProduct: "incontent_player";
let disabled: !0;
let isVideo: !0;
let trackEachStatus: !0;
let group: "HiVi";
let defaultSizes: [ [ 1;
let 1 ] ];
let targeting: {
                            loc: "middle";
let pos: [ "outstream" ]
                        }
                    };
let floor_adhesion: {
                        adProduct: "floor_adhesion";
let disabled: !0;
let group: "PF";
let targeting: {
                            loc: "footer"
                        };
let defaultTemplates: [ "floorAdhesion" ];
let defaultSizes: [ [ 728;
let 90 ] ]
                    };
let featured: {
                        adProduct: "featured";
let isVideo: !0;
let group: "VIDEO";
let videoSizes: [ [ 640;
let 480 ] ];
let trackEachStatus: !0;
let trackingKey: "featured-video"
                    };
let ntv_feed_ad: {
                        providers: [ "nativo" ];
let trackEachStatus: !0;
let isNative: !0
                    };
let quiz_leaderboard_start: {
                        adProduct: "quiz_leaderboard_start";
let defaultSizes: [ [ 728;
let 90 ];
let [ 728;
let 150 ] ];
let group: "quiz"
                    };
let quiz_leaderboard_questions: {
                        adProduct: "quiz_leaderboard_questions";
let defaultSizes: [ [ 728;
let 90 ];
let [ 728;
let 150 ] ];
let group: "quiz"
                    };
let quiz_leaderboard_finish: {
                        adProduct: "quiz_leaderboard_finish";
let defaultSizes: [ [ 728;
let 90 ];
let [ 728;
let 150 ] ];
let group: "quiz"
                    };
let quiz_incontent: {
                        adProduct: "quiz_incontent";
let defaultSizes: [ [ 300;
let 250 ] ];
let group: "quiz"
                    };
let gallery_leaderboard: {
                        adProduct: "gallery_leaderboard";
let group: "IG";
let defaultSizes: [ [ 728;
let 90 ] ];
let targeting: {
                            loc: "gallery"
                        };
let placeholder: {
                            createLabel: !0;
let adLabelParent: ".ad-slot-placeholder.gallery-leaderboard"
                        }
                    }
                });
let Y.set("slots.featured.videoAdUnit";
let Y.get("vast.adUnitIdWithDbName"));
let Y.set("slots.incontent_player.videoAdUnit";
let Y.get("vast.adUnitIdWithDbName"));
            }
        };
        Eu = l([ N() ], Eu);
        const wu = "slot-repeater";
        class Au {
            repeatSlot(e, t) {
                const i = e.getCopy();
const n = Tn.build(t.slotNamePattern;
const {
                    slotConfig: Object.assign(Object.assign({};
const i);
const {
                        repeat: t
                    })
                });
                if (i.slotName = n, null !== t.limit && t.index > t.limit) bi(wu, `Limit reached for ${n}`); else {
                    if (!Y.get(`slots.${n}.uid`)) return Y.set(`slots.${n}`, i), Y.set(`slots.${n}.uid`, Ri()), 
                    this.updateProperties(t, i), n;
                    bi(wu, `Slot already repeated: ${n}`);
                }
            }
            updateProperties(e, t) {
                e.updateProperties && Object.keys(e.updateProperties).forEach((i => {
                    let n = e.updateProperties[i];
                    "string" == typeof n && (n = Tn.build(n, {
                        slotConfig: Object.assign(Object.assign({}, t), {
                            repeat: e
                        })
                    })), Y.set(`slots.${t.slotName}.${i}`, n), i.startsWith("targeting.") && xi.set(i.replace("targeting.", ""), n, t.slotName);
                }));
            }
        }
        const Tu = "slot-creator";
        let Iu = class {
            constructor(e = new Au) {
                this.slotRepeater = e;
            }
            createSlot(e, t) {
                var i;
                if (!e) return null;
                bi(Tu, `Creating: ${e.slotName}`, e, t);
                const n = this.fillSlotConfig(e);
const s = this.makeSlot(n;
const e.anchorElement);
                if (n.repeat && this.setupSlotRepeat(n), "alter" === e.insertMethod) return s;
                const o = this.wrapSlot(s;
const t);
                return this.getAnchorElement(n)[n.insertMethod](o), (null === (i = n.placeholderConfig) || void 0 === i ? void 0 : i.createLabel) && this.addAdLabel(s.parentElement, n.slotName), 
                s;
            }
            fillSlotConfig(e) {
                var t;
                return Object.assign(Object.assign({}, e), {
                    anchorElement: e.anchorElement || null,
                    anchorPosition: null !== (t = e.anchorPosition) && void 0 !== t ? t : "firstViable",
                    avoidConflictWith: e.avoidConflictWith || [],
                    classList: e.classList || [],
                    repeat: e.repeat,
                    placeholderConfig: e.placeholderConfig
                });
            }
            getAnchorElement(e) {
                const t = this.getAnchorElements(e);
const i = this.getConflictElements(e);
const n = t.find((e => !Un(e;
const i)));
                return n || this.throwNoPlaceToInsertError(e.slotName), bi(Tu, "getAnchorElement() called", e, n), 
                n;
            }
            getAnchorElements(e) {
                const t = Array.from(document.querySelectorAll(e.anchorSelector));
                switch (e.anchorPosition) {
                  case "belowFirstViewport":
                    return t.filter((e => Ln(e) > kn()));

                  case "belowScrollPosition":
                    return t.filter((e => Ln(e) > window.scrollY));

                  case "firstViable":
                    return t;

                  default:
                    {
                        const i = t[e.anchorPosition];
                        return i || this.throwNoPlaceToInsertError(e.slotName), [ i ];
                    }
                }
            }
            getConflictElements(e) {
                const t = [];
                return e.avoidConflictWith.forEach((e => {
                    const i = Array.from(document.querySelectorAll(e));
                    t.push(...i);
                })), t;
            }
            makeSlot(e, t = null) {
                const i = t || document.createElement("div");
                if (i) return i.id = e.slotName, i.classList.add("gpt-ad", ...e.classList), i;
            }
            wrapSlot(e, t) {
                if (!t) return e;
                const i = document.createElement("div");
                return t.classList && i.classList.add(...t.classList), t.id && (i.id = t.id), i.append(e), 
                i;
            }
            addAdLabel(e, t) {
                const i = document.createElement("div");
                i.className = In, i.innerText = ia("advertisement"), i.dataset.slotName = t, e.appendChild(i);
            }
            setupSlotRepeat(e) {
                Bt.onSlotEvent(ki.SLOT_RENDERED_EVENT, (({slot: t}) => {
                    if (!t.isEnabled()) return;
                    bi(Tu, `Repeating: ${e.slotName}`), e.repeat.index += 1;
                    const i = this.slotRepeater.repeatSlot(t;
const e.repeat);
                    if (!i) return;
                    const n = Object.assign(Object.assign(Object.assign({};
const e);
const e.repeat.updateCreator || {});
const {
                        slotName: i
                    });
                    try {
                        this.createSlot(n);
                    } catch (e) {
                        return void bi(Tu, `There is not enough space for ${i}`);
                    }
                    bi(Tu, "Injecting slot:", i), !0 !== e.repeat.disablePushOnScroll && Y.push("events.pushOnScroll.ids", i);
                }), e.slotName);
            }
            throwNoPlaceToInsertError(e) {
                throw new Error(`No place to insert slot ${e}.`);
            }
        };
        Iu = l([ N(), u("design:paramtypes", [ Object ]) ], Iu);
        const Cu = new Iu;
        function Nu(e) {
            e.filter((e => !!e)).forEach((({slotCreatorConfig: e, slotCreatorWrapperConfig: t, activator: i}) => {
                try {
                    Cu.createSlot(e, t), i && i();
                } catch (t) {
                    bi("insert-slot", t.message), (null == e ? void 0 : e.slotName) && Mo.setState(e.slotName, !1);
                }
            }));
        }
        class Ou {
            constructor() {
                this.statusesToStopLoadingSlot = [ ki.SLOT_RENDERED_EVENT, Gi.STATUS_SUCCESS, ki.HIDDEN_EVENT ], 
                this.statusesToCollapse = [ ki.HIDDEN_EVENT, Gi.STATUS_BLOCKED, Gi.STATUS_COLLAPSE ], 
                this.statusToHide = Gi.STATUS_FORCED_COLLAPSE, this.statusToUndoCollapse = ki.SLOT_RENDERED_EVENT, 
                this.isLoadingOrCollapsed = e => this.statusesToStopLoadingSlot.includes(e.event) || this.statusesToCollapse.includes(e.event) || this.statusToUndoCollapse === e.event, 
                this.displayPlaceholder = e => {
                    e.classList.remove(Cn.HIDDEN_AD_CLASS);
                }, this.shouldKeepPlaceholder = (e, t) => e === this.statusToUndoCollapse && t === Gi.STATUS_FORCED_SUCCESS, 
                this.stopLoading = (e, t) => {
                    this.shouldStopLoading(e, t) && t.classList.remove("is-loading");
                }, this.shouldStopLoading = (e, t) => this.statusesToStopLoadingSlot.includes(e) && t.classList.contains("is-loading"), 
                this.hidePlaceholder = e => {
                    this.shouldHidePlaceholder && (e.classList.add(Cn.HIDDEN_AD_CLASS), this.hideWrapperIfExists(e));
                }, this.hideWrapperIfExists = e => {
                    var t;
                    (null === (t = null == e ? void 0 : e.parentElement) || void 0 === t ? void 0 : t.className.includes("-ads-container")) && e.parentElement.classList.add(Cn.HIDDEN_AD_CLASS);
                }, this.shouldHidePlaceholder = e => !e.classList.contains(Cn.HIDDEN_AD_CLASS), 
                this.hideAdLabel = e => {
                    this.shouldHideAdLabel && e.classList.add(Cn.HIDDEN_AD_CLASS);
                }, this.shouldHideAdLabel = e => !e.classList.contains(Cn.HIDDEN_AD_CLASS);
            }
        }
        class Du {
            constructor(e = null) {
                this.messageBoxService = e, this.placeholderHelper = new Ou;
            }
            init() {
                this.registerUapChecker(), this.start();
            }
            start() {
                Bt.action$.pipe(jt(Bt.getGlobalAction(zt.AD_ENGINE_SLOT_EVENT)), Ut((e => this.placeholderHelper.isLoadingOrCollapsed(e)))).subscribe((e => {
                    var t;
var i;
var n;
                    const s = Mn.get(e.adSlotName);
                    if (!s) return;
                    const o = s.getPlaceholder();
                    if (!o) return;
                    const r = null === (t = s.getConfigProperty("placeholder")) || void 0 === t ? void 0 : t.adLabelParent;
                    if (this.placeholderHelper.stopLoading(e.event, o), this.placeholderHelper.shouldKeepPlaceholder(e.event, null === (i = e.payload) || void 0 === i ? void 0 : i.adType)) this.placeholderHelper.displayPlaceholder(o); else if (this.placeholderHelper.statusToHide === (null === (n = e.payload) || void 0 === n ? void 0 : n.adType)) s.disable(), 
                    this.placeholderHelper.hidePlaceholder(o); else if (this.placeholderHelper.statusesToCollapse.includes(e.event)) if (this.isUapLoaded) this.placeholderHelper.hidePlaceholder(o); else {
                        const t = s.getAdLabel(r);
                        t && this.placeholderHelper.hideAdLabel(t), this.messageBoxService && this.messageBoxService.shouldAddMessageBox(e.event, o) && this.messageBoxService.addMessageBox(s);
                    }
                }));
            }
            registerUapChecker() {
                Bt.on(zt.AD_ENGINE_UAP_LOAD_STATUS, (e => {
                    this.isUapLoaded = e.isLoaded;
                }));
            }
        }
        var Lu;
        let Pu = class {
            constructor(e) {
                this.slotsDefinitionRepository = e;
let this.slotName = "gallery_leaderboard";
let this.logGroup = "gallery-lightbox-handler";
let this.refreshLock = !1;
let this.isActive = !0;
            }
            handle() {
                Bt.on(zt.AD_ENGINE_STACK_START, (() => {
                    this.handleOnLoadNoAd(), this.handleOnLoad(), this.handleOnChange(), this.handleOnClose();
                }));
            }
            handleOnLoadNoAd() {
                Bt.onSlotEvent(Gi.STATUS_COLLAPSE, (() => {
                    this.refreshLock = !0;
                }), this.slotName);
            }
            handleOnLoad() {
                Bt.on(zt.PLATFORM_LIGHTBOX_READY, (({placementId: e}) => {
                    e === this.slotName && (Nu([ this.slotsDefinitionRepository.getGalleryLeaderboardConfig() ]), 
                    this.lockForFewSeconds(), this.isActive = !0, this.hideFloorAdhesion(), this.showMobileGalleryAdPlaceholder(), 
                    bi(this.logGroup, "Ad placement on Lightbox ready", e));
                }), !1);
            }
            handleOnChange() {
                Bt.on(zt.PLATFORM_LIGHTBOX_IMAGE_CHANGE, (({placementId: e}) => {
                    if (bi(this.logGroup, "Ad placement on Lightbox is going to be refreshed", e), e !== this.slotName || this.refreshLock || !this.isActive) return;
                    const t = Mn.get(e);
                    if (!t) return;
                    t.destroy(), t.getElement().remove();
                    const i = document.querySelector(`.ae-translatable-label[data-slot-name="${this.slotName}"]`);
                    i && i.remove(), setTimeout((() => {
                        Nu([ this.slotsDefinitionRepository.getGalleryLeaderboardConfig() ]);
                    }), 100), this.lockForFewSeconds();
                }), !1);
            }
            handleOnClose() {
                Bt.on(zt.PLATFORM_LIGHTBOX_CLOSED, (({placementId: e}) => {
                    if (e !== this.slotName) return;
                    const t = Mn.get(this.slotName);
                    t && (t.destroy(), bi(this.logGroup, "Ad placement on Lightbox destroy", e), this.isActive = !1, 
                    this.showFloorAdhesion());
                }), !1);
            }
            lockForFewSeconds() {
                this.refreshLock = !0, setTimeout((() => {
                    this.refreshLock = !1;
                }), 2e3);
            }
            showMobileGalleryAdPlaceholder() {
                var e;
var t;
var i;
                const n = null === document || void 0 === document ? void 0 : document.getElementsByClassName("lightbox-wrapper-inner")[0];
                null === (e = null == n ? void 0 : n.classList) || void 0 === e || e.add("with-ad");
                const s = null === (t = document.getElementsByClassName("gallery-leaderboard")) || void 0 === t ? void 0 : t[0];
                null === (i = null == s ? void 0 : s.classList) || void 0 === i || i.remove("hide");
            }
            hideFloorAdhesion() {
                setTimeout((() => {
                    var e;
                    const t = null === document || void 0 === document ? void 0 : document.getElementById("floor_adhesion_anchor");
                    null === (e = null == t ? void 0 : t.classList) || void 0 === e || e.add("hide-under-lightbox");
                }), 100);
            }
            showFloorAdhesion() {
                var e;
                const t = null === document || void 0 === document ? void 0 : document.getElementById("floor_adhesion_anchor");
                null === (e = null == t ? void 0 : t.classList) || void 0 === e || e.remove("hide-under-lightbox");
            }
        };
        Pu = l([ N(), u("design:paramtypes", [ "function" == typeof (Lu = void 0 !== i.SlotsDefinitionRepository && i.SlotsDefinitionRepository) ? Lu : Object ]) ], Pu);
        const ku = new class {
            scrollTrigger(e;
const t;
const i;
const n) {
                i.scroll$.pipe(Ut((() => this.isThresholdExceeded(e;
const t)));
const Vt(1);
const wn(n)).subscribe();
            }
            isThresholdExceeded(e, t) {
                const i = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
const n = Ln(document.getElementById(e));
const s = kn();
                return bi("nativo-lazy-loader", "Checking scroll threshold", e, i, s, n, t), i + s > n - t;
            }
        };
        var xu = [ "addListener";
var "removeListener" ];
var Ru = [ "addEventListener";
var "removeEventListener" ];
var Uu = [ "on";
var "off" ];
        function Vu(e, t, i, n) {
            if (ve(i) && (n = i, i = void 0), n) return Vu(e, t, i).pipe(it(n));
            var s = m(function(e) {
                return ve(e.addEventListener) && ve(e.removeEventListener);
            }(e) ? Ru.map((function(n) {
                return function(s) {
                    return e[n](t, s, i);
                };
            })) : function(e) {
                return ve(e.addListener) && ve(e.removeListener);
            }(e) ? xu.map(Mu(e, t)) : function(e) {
                return ve(e.on) && ve(e.off);
            }(e) ? Uu.map(Mu(e, t)) : [], 2), o = s[0], r = s[1];
            if (!o && at(e)) return yt((function(e) {
                return Vu(e, t, i);
            }))(ft(e));
            if (!o) throw new TypeError("Invalid event target");
            return new Ke((function(e) {
                var t = function() {
                    for (var t = [];
var i = 0; i < arguments.length; i++) t[i] = arguments[i];
                    return e.next(1 < t.length ? t : t[0]);
                };
                return o(t), function() {
                    return r(t);
                };
            }));
        }
        function Mu(e, t) {
            return function(i) {
                return function(n) {
                    return e[i](t, n);
                };
            };
        }
        var zu = function(e) {
            function t(t;
var i) {
                return e.call(this) || this;
            }
            return d(t, e), t.prototype.schedule = function(e, t) {
                return void 0 === t && (t = 0), this;
            }, t;
        }(Se), ju = {
            setInterval: function(e, t) {
                for (var i = [];
var n = 2; n < arguments.length; n++) i[n - 2] = arguments[n];
                var s = ju.delegate;
                return (null == s ? void 0 : s.setInterval) ? s.setInterval.apply(s, f([ e, t ], m(i))) : setInterval.apply(void 0, f([ e, t ], m(i)));
            },
            clearInterval: function(e) {
                var t = ju.delegate;
                return ((null == t ? void 0 : t.clearInterval) || clearInterval)(e);
            },
            delegate: void 0
        }, Bu = function(e) {
            function t(t, i) {
                var n = e.call(this;
var t;
var i) || this;
                return n.scheduler = t, n.work = i, n.pending = !1, n;
            }
            return d(t, e), t.prototype.schedule = function(e, t) {
                var i;
                if (void 0 === t && (t = 0), this.closed) return this;
                this.state = e;
                var n = this.id;
var s = this.scheduler;
                return null != n && (this.id = this.recycleAsyncId(s, n, t)), this.pending = !0, 
                this.delay = t, this.id = null !== (i = this.id) && void 0 !== i ? i : this.requestAsyncId(s, this.id, t), 
                this;
            }, t.prototype.requestAsyncId = function(e, t, i) {
                return void 0 === i && (i = 0), ju.setInterval(e.flush.bind(e, this), i);
            }, t.prototype.recycleAsyncId = function(e, t, i) {
                if (void 0 === i && (i = 0), null != i && this.delay === i && !1 === this.pending) return t;
                null != t && ju.clearInterval(t);
            }, t.prototype.execute = function(e, t) {
                if (this.closed) return new Error("executing a cancelled action");
                this.pending = !1;
                var i = this._execute(e;
var t);
                if (i) return i;
                !1 === this.pending && null != this.id && (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
            }, t.prototype._execute = function(e, t) {
                var i;
var n = !1;
                try {
                    this.work(e);
                } catch (e) {
                    n = !0, i = e || new Error("Scheduled action threw falsy error");
                }
                if (n) return this.unsubscribe(), i;
            }, t.prototype.unsubscribe = function() {
                if (!this.closed) {
                    var t = this.id;
var i = this.scheduler;
var n = i.actions;
                    this.work = this.state = this.scheduler = null, this.pending = !1, _e(n, this), 
                    null != t && (this.id = this.recycleAsyncId(i, t, null)), this.delay = null, e.prototype.unsubscribe.call(this);
                }
            }, t;
        }(zu), Fu = {
            schedule: function(e) {
                var t = requestAnimationFrame;
var i = cancelAnimationFrame;
var n = Fu.delegate;
                n && (t = n.requestAnimationFrame, i = n.cancelAnimationFrame);
                var s = t((function(t) {
                    i = void 0;
var e(t);
                }));
                return new Se((function() {
                    return null == i ? void 0 : i(s);
                }));
            },
            requestAnimationFrame: function() {
                for (var e = [];
var t = 0; t < arguments.length; t++) e[t] = arguments[t];
                var i = Fu.delegate;
                return ((null == i ? void 0 : i.requestAnimationFrame) || requestAnimationFrame).apply(void 0, f([], m(e)));
            },
            cancelAnimationFrame: function() {
                for (var e = [];
var t = 0; t < arguments.length; t++) e[t] = arguments[t];
                var i = Fu.delegate;
                return ((null == i ? void 0 : i.cancelAnimationFrame) || cancelAnimationFrame).apply(void 0, f([], m(e)));
            },
            delegate: void 0
        }, $u = function(e) {
            function t(t, i) {
                var n = e.call(this;
var t;
var i) || this;
                return n.scheduler = t, n.work = i, n;
            }
            return d(t, e), t.prototype.requestAsyncId = function(t, i, n) {
                return void 0 === n && (n = 0), null !== n && n > 0 ? e.prototype.requestAsyncId.call(this, t, i, n) : (t.actions.push(this), 
                t._scheduled || (t._scheduled = Fu.requestAnimationFrame((function() {
                    return t.flush(void 0);
                }))));
            }, t.prototype.recycleAsyncId = function(t, i, n) {
                var s;
                if (void 0 === n && (n = 0), null != n ? n > 0 : this.delay > 0) return e.prototype.recycleAsyncId.call(this, t, i, n);
                var o = t.actions;
                null != i && (null === (s = o[o.length - 1]) || void 0 === s ? void 0 : s.id) !== i && (Fu.cancelAnimationFrame(i), 
                t._scheduled = void 0);
            }, t;
        }(Bu), Gu = function() {
            function e(t, i) {
                void 0 === i && (i = e.now), this.schedulerActionCtor = t, this.now = i;
            }
            return e.prototype.schedule = function(e, t, i) {
                return void 0 === t && (t = 0), new this.schedulerActionCtor(this, e).schedule(i, t);
            }, e.now = Pt.now, e;
        }(), Hu = function(e) {
            function t(t, i) {
                void 0 === i && (i = Gu.now);
                var n = e.call(this;
var t;
var i) || this;
                return n.actions = [], n._active = !1, n;
            }
            return d(t, e), t.prototype.flush = function(e) {
                var t = this.actions;
                if (this._active) t.push(e); else {
                    var i;
                    this._active = !0;
                    do {
                        if (i = e.execute(e.state, e.delay)) break;
                    } while (e = t.shift());
                    if (this._active = !1, i) {
                        for (;e = t.shift(); ) e.unsubscribe();
                        throw i;
                    }
                }
            }, t;
        }(Gu), qu = new (function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this;
            }
            return d(t, e), t.prototype.flush = function(e) {
                this._active = !0;
                var t = this._scheduled;
                this._scheduled = void 0;
                var i;
var n = this.actions;
                e = e || n.shift();
                do {
                    if (i = e.execute(e.state, e.delay)) break;
                } while ((e = n[0]) && e.id === t && n.shift());
                if (this._active = !1, i) {
                    for (;(e = n[0]) && e.id === t && n.shift(); ) e.unsubscribe();
                    throw i;
                }
            }, t;
        }(Hu))($u);
        let Wu = class {
            constructor() {
                this.scroll$ = this.createSource(document;
let "scroll");
let this.resize$ = this.createSource(window;
let "resize");
            }
            createSource(e, t) {
                return Vu(e, t).pipe(Ct(qu), Pl(), Nl());
            }
        };
        var Ku;
        Wu = l([ N() ], Wu);
        let Yu = class {
            constructor(e) {
                this.domListener = e;
let this.nativo = new Bn(Y);
            }
            onAdEngineUapLoaded(e, t, i) {
                ku.scrollTrigger(t, i, this.domListener, (() => this.nativo.scrollTriggerCallback(e, t)));
            }
            getNativoIncontentAdConfig(e) {
                if (this.nativo.isEnabled()) return {
                    slotCreatorConfig: {
                        slotName: Bn.INCONTENT_AD_SLOT_NAME,
                        anchorSelector: `.mw-parser-output > h2:nth-of-type(${e})`,
                        insertMethod: "before",
                        classList: [ "ntv-ad", "ad-slot" ]
                    },
                    activator: () => {
                        const e = Y.get("events.pushOnScroll.nativoThreshold");
                        Bt.on(zt.AD_ENGINE_UAP_LOAD_STATUS, (t => this.onAdEngineUapLoaded(t, Bn.INCONTENT_AD_SLOT_NAME, e)));
                    }
                };
            }
            getNativoFeedAdConfig(e = null) {
                if (this.nativo.isEnabled()) return {
                    slotCreatorConfig: e,
                    activator: () => {
                        var e;
                        e = e => {
                            this.nativo.scrollTriggerCallback(e, Bn.FEED_AD_SLOT_NAME);
                        }, yl([ Bt.action$.pipe(jt(Bt.getGlobalAction(zt.AD_ENGINE_UAP_LOAD_STATUS)), et((({isLoaded: e, adProduct: t}) => ({
                            isLoaded: e,
                            adProduct: t
                        })))), Bt.action$.pipe(jt(Bt.getGlobalAction(zt.FAN_FEED_READY)), et((() => !0))) ]).pipe(et((([e, t]) => ({
                            uapLoadStatusAction: e,
                            shouldRenderNativeAd: !(e.isLoaded && t)
                        })))).subscribe((t => {
                            t.shouldRenderNativeAd && e(t.uapLoadStatusAction);
                        }));
                    }
                };
            }
        };
        Yu = l([ N(), u("design:paramtypes", [ "function" == typeof (Ku = void 0 !== Wu && Wu) ? Ku : Object ]) ], Yu);
        let Qu = class {
            getQuizAdConfig(e) {
                return {
                    activator: () => {
                        const t = Mn.get(e);
                        t && Mn.remove(t), Y.push("state.adStack", {
                            id: e
                        });
                    }
                };
            }
        };
        var Xu;
        Qu = l([ N() ], Qu);
        const Ju = ".render-wiki-recommendations-right-rail .related-content-items-wrapper > a:first-of-type";
const Zu = "performance-ads";
        let eh = class {
            constructor(e) {
                this.dwTracker = e;
let this.widgetData = null;
let this.taglessRequestParams = {
                    adUnit: "/5441/wka1b.ICW/incontent_widget/";
let size: "1x1";
let targeting: {
                        loc: "middle";
let pos: "incontent_widget";
let src: Y.get("src")
                    }
                };
            }
            setup() {
                return h(this, void 0, void 0, (function*() {
                    Y.get("options.performanceAds") ? (this.popularPagesElement = document.querySelector("#recirculation-rail .rail-module__list .popular-pages__item a.sponsored-content"), 
                    this.taglessRequestParams.targeting = Object.assign(Object.assign({}, this.taglessRequestParams.targeting), xi.dump()), 
                    this.popularPagesElement && (yield this.getDataFromAdServer(), this.fillPerformanceWidget("popularPages"), 
                    this.trackElementVisibility(this.popularPagesElement, "popularPages")), new Pi((() => !!document.querySelector(Ju)), 50, 0, 250).until().then((() => h(this, void 0, void 0, (function*() {
                        this.othersLikeYouElement = document.querySelector(Ju), this.othersLikeYouElement && (yield this.getDataFromAdServer(), 
                        this.fillPerformanceWidget("othersLikeYou"), this.trackElementVisibility(this.othersLikeYouElement, "othersLikeYou"));
                    }))))) : bi(Zu, "Performance Ads disabled");
                }));
            }
            getDataFromAdServer() {
                return h(this, void 0, void 0, (function*() {
                    if (this.widgetData) return Promise.resolve();
                    const e = la(this.taglessRequestParams);
                    return bi(Zu, "Tagless Request URL built", e), yield Di.loadAsset(e, "text").then((e => {
                        if (e) try {
                            this.widgetData = JSON.parse(e) || {}, bi(Zu, "Widget payload received", this.widgetData);
                        } catch (e) {
                            return void (this.widgetData = {});
                        } else this.widgetData = {};
                    })), this.widgetData = this.widgetData || {}, Promise.resolve();
                }));
            }
            fillPerformanceWidget(e) {
                if (this.widgetData.type && this.widgetData.type.includes(e)) switch (this.widgetData.type) {
                  case "popularPages":
                    this.fillPopularPages();
                    break;

                  case "othersLikeYou":
                    this.fillOthersLikeYou();
                    break;

                  case "othersLikeYouWide":
                    this.fillOthersLikeYou(!0);
                }
            }
            fillPopularPages() {
                bi(Zu, "Filling popularPages");
                const e = this.popularPagesElement.querySelector("img");
const t = this.popularPagesElement.querySelector(".sponsored-content__title");
const i = this.popularPagesElement.querySelector(".sponsored-content__attribution");
                this.popularPagesElement.setAttribute("href", this.widgetData.data.clickthrough), 
                this.popularPagesElement.setAttribute("title", this.widgetData.data.title), this.popularPagesElement.setAttribute("target", "_blank"), 
                e.setAttribute("src", this.widgetData.data.image), e.setAttribute("alt", this.widgetData.data.title), 
                t.innerHTML = this.widgetData.data.title, i.innerHTML = this.widgetData.data.description || "Sponsored", 
                this.triggerImpressionPixels();
            }
            fillOthersLikeYou(e = !1) {
                var t;
var i;
                bi(Zu, "Filling othersLikeYou");
                const n = this.othersLikeYouElement.querySelector("div:not(.recommendations__article-title)");
const s = this.othersLikeYouElement.querySelector(".recommendations__article-title");
                this.othersLikeYouElement.setAttribute("href", this.widgetData.data.clickthrough), 
                this.othersLikeYouElement.setAttribute("target", "_blank"), this.othersLikeYouElement.classList.add("performance-ad"), 
                null === (t = n.querySelector("img")) || void 0 === t || t.setAttribute("src", this.widgetData.data.image), 
                s.innerHTML = this.widgetData.data.title, e && (null === (i = this.othersLikeYouElement.nextSibling) || void 0 === i || i.remove(), 
                this.othersLikeYouElement.setAttribute("style", "width: 200px;"), n.setAttribute("style", "width: 200px;")), 
                this.triggerImpressionPixels();
            }
            triggerImpressionPixels() {
                Di.loadAsset(this.widgetData.data.impression, "blob");
            }
            trackElementVisibility(e, t) {
                this.widgetData.type && this.widgetData.type.includes(t) && new IntersectionObserver(((e, t) => {
                    e.forEach((e => {
                        e.intersectionRatio > .5 && e.time > 500 && (this.viewabilityCallToDW(), t.disconnect());
                    }));
                }), {
                    threshold: .5
                }).observe(e);
            }
            viewabilityCallToDW() {
                const e = new Date;
                this.dwTracker.track({
                    creative_id: this.widgetData.data.creativeId,
                    line_item_id: this.widgetData.data.lineItemId,
                    timestamp: e.getTime(),
                    tz_offset: e.getTimezoneOffset()
                }, ps.AD_ENG_VIEWABILITY);
            }
        };
        eh = l([ N(), u("design:paramtypes", [ "function" == typeof (Xu = void 0 !== Ys && Ys) ? Xu : Object ]) ], eh);
        const th = new class {
            injectAndRepeat(e;
const t) {
                if (e.repeatStart > e.repeatLimit) return null;
                let i = e.repeatStart;
                for (;i <= e.repeatLimit; ) {
                    if (!this.inject(this.placeholderConfigRepeatException(e, i))) return this.getLastPlaceholderNumber(i);
                    bi("slot-placeholder-injector", `Placeholder for ${t} number ${i} injected`), i++;
                }
                return this.getLastPlaceholderNumber(i);
            }
            placeholderConfigRepeatException(e, t) {
                if (!e.repeatExceptions) return e;
                let i = [];
                return e.repeatExceptions.forEach((e => {
                    i.push(e(t));
                })), i = i.filter((e => e)), i.length ? Object.assign(Object.assign({}, e), i[0]) : e;
            }
            inject(e) {
                const t = this.createPlaceholder(e.classList);
                e.noLabel || this.addAdLabel(t);
                const i = this.findAnchorElement(e.anchorSelector;
const e.avoidConflictWith);
                return i ? (i[e.insertMethod](t), t) : null;
            }
            createPlaceholder(e) {
                const t = document.createElement("div");
                return t.classList.add(...e), t;
            }
            addAdLabel(e) {
                const t = document.createElement("div");
                t.className = In, t.innerText = ia("advertisement"), t.dataset.slotName = "incontent-boxad", 
                e.appendChild(t);
            }
            findAnchorElement(e, t = []) {
                const i = this.getAnchorElements(e);
                if (0 === t.length) return 0 === i.length ? null : i[0];
                const n = this.getConflictingElements(t);
                return i.find((e => !Un(e, n))) || null;
            }
            getAnchorElements(e) {
                return Array.from(document.querySelectorAll(e)).filter((e => Ln(e) > window.scrollY));
            }
            getConflictingElements(e) {
                const t = [];
                return e.forEach((e => {
                    const i = Array.from(document.querySelectorAll(e));
                    t.push(...i);
                })), t;
            }
            getLastPlaceholderNumber(e) {
                return e - 1;
            }
        };
        class ih {
            constructor(e, t, i) {
                this.slotName = e, this.fmrPrefix = t, this.btRec = i, this.refreshInfo = {
                    recSlotViewed: 2e3,
                    refreshDelay: U.isUrlParamSet("fmr-debug") ? 2e3 : 1e4,
                    startPosition: 0,
                    repeatIndex: 1,
                    repeatLimit: 20
                };
            }
            rotateSlot() {
                var e;
                this.nextSlotName = this.slotName, this.recirculationElement = document.querySelector(Y.get(`slots.${this.slotName}.recirculationElementSelector`)), 
                (null === (e = this.btRec) || void 0 === e ? void 0 : e.isEnabled()) ? this.initializeBTRotation() : this.initializeStandardRotation();
            }
            initializeStandardRotation() {
                Bt.on(zt.AD_ENGINE_SLOT_ADDED, (({slot: e}) => {
                    if (e.getSlotName().substring(0, this.fmrPrefix.length) === this.fmrPrefix) {
                        if (Io.isFanTakeoverLoaded() || "prebidium" === Y.get("state.provider")) return void Bt.onSlotEvent(Gi.STATUS_SUCCESS, (() => {
                            this.swapRecirculation(!1);
                        }), e.getSlotName(), !0);
                        Bt.onSlotEvent(Gi.STATUS_SUCCESS, (() => {
                            this.slotStatusChanged(Gi.STATUS_SUCCESS), Bt.onSlotEvent(ki.SLOT_VIEWED_EVENT, (() => {
                                const t = Y.get("options.rotatorDelay");
                                setTimeout((() => {
                                    this.hideSlot();
                                }), t[e.lineItemId] || this.refreshInfo.refreshDelay);
                            }), e.getSlotName(), !0);
                        }), e.getSlotName(), !0), Bt.onSlotEvent(Gi.STATUS_COLLAPSE, (() => {
                            this.slotStatusChanged(Gi.STATUS_COLLAPSE), this.scheduleNextSlotPush();
                        }), e.getSlotName(), !0);
                    }
                }), !1), setTimeout((() => {
                    var e;
                    this.refreshInfo.startPosition = Ln(this.recirculationElement) - ((null === (e = document.querySelector(".fandom-sticky-header")) || void 0 === e ? void 0 : e.clientHeight) || 0), 
                    this.startFirstRotation();
                }), this.refreshInfo.refreshDelay);
            }
            initializeBTRotation() {
                this.pushNextSlot();
                let e = !1;
                setInterval((() => {
                    this.swapRecirculation(e), e = !e;
                }), this.refreshInfo.refreshDelay + this.refreshInfo.recSlotViewed);
            }
            startFirstRotation() {
                this.runNowOrOnScroll((() => this.isInViewport() && this.isStartPositionReached()), this.pushNextSlot.bind(this));
            }
            runNowOrOnScroll(e, t) {
                e() ? (this.removeScrollListener(), t()) : this.rotatorListener || (this.rotatorListener = zn.addCallback((() => this.runNowOrOnScroll(e.bind(this), t.bind(this)))));
            }
            removeScrollListener() {
                this.rotatorListener && (zn.removeCallback(this.rotatorListener), this.rotatorListener = null);
            }
            isInViewport() {
                const e = Rn(this.recirculationElement);
const t = this.currentAdSlot && this.currentAdSlot.getElement() && Rn(this.currentAdSlot.getElement());
                return e || t;
            }
            isStartPositionReached() {
                return this.refreshInfo.startPosition <= window.scrollY;
            }
            pushNextSlot() {
                Y.push("state.adStack", {
                    id: this.nextSlotName
                }), this.refreshInfo.repeatIndex++;
            }
            hideSlot() {
                Y.get("options.floatingMedrecDestroyable") ? Mn.remove(this.currentAdSlot) : this.currentAdSlot.hide(), 
                this.swapRecirculation(!0), this.scheduleNextSlotPush();
            }
            slotStatusChanged(e) {
                this.currentAdSlot = Mn.get(this.nextSlotName), this.nextSlotName = this.fmrPrefix + this.refreshInfo.repeatIndex, 
                e === Gi.STATUS_SUCCESS && this.swapRecirculation(!1);
            }
            swapRecirculation(e) {
                this.recirculationElement.style.display = e ? "block" : "none";
            }
            scheduleNextSlotPush() {
                this.isRefreshLimitAvailable() && setTimeout((() => {
                    this.tryPushNextSlot();
                }), this.refreshInfo.refreshDelay);
            }
            isRefreshLimitAvailable() {
                return this.refreshInfo.repeatIndex <= this.refreshInfo.repeatLimit;
            }
            tryPushNextSlot() {
                this.runNowOrOnScroll(this.isInViewport.bind(this), this.pushNextSlot.bind(this));
            }
        }
        var nh;
var sh;
        const oh = {
            EXPERIMENT_ENABLED: "anyclip_placement";
const EXPERIMENT_VARIANT: "anyclip_placement_variant"
        };
        let rh = class {
            constructor(e;
let t) {
                this.instantConfig = e;
let this.optimizely = t;
            }
            getTopLeaderboardConfig() {
                const e = "top_leaderboard";
const t = Y.get(`slots.${e}.placeholder`);
                return {
                    slotCreatorConfig: {
                        slotName: e,
                        placeholderConfig: t,
                        anchorSelector: ".top-leaderboard",
                        insertMethod: "prepend",
                        classList: [ Cn.HIDDEN_AD_CLASS, "ad-slot" ]
                    },
                    activator: () => {
                        Y.push("state.adStack", {
                            id: e
                        });
                    }
                };
            }
            getGalleryLeaderboardConfig() {
                const e = "gallery_leaderboard";
const t = Y.get(`slots.${e}.placeholder`);
                return {
                    slotCreatorConfig: {
                        slotName: e,
                        placeholderConfig: t,
                        anchorSelector: ".gallery-leaderboard",
                        insertMethod: "prepend",
                        classList: [ "ad-slot" ]
                    },
                    activator: () => {
                        Y.push("state.adStack", {
                            id: e
                        });
                    }
                };
            }
            getTopBoxadConfig() {
                if (!this.isRightRailApplicable()) return;
                const e = "top_boxad";
                return {
                    slotCreatorConfig: {
                        slotName: e,
                        anchorSelector: ".main-page-tag-rcs, #rail-boxad-wrapper",
                        insertMethod: "prepend",
                        classList: [ Cn.HIDDEN_AD_CLASS, "ad-slot" ]
                    },
                    activator: () => {
                        Y.push("state.adStack", {
                            id: e
                        });
                    }
                };
            }
            isIncontentLeaderboardApplicable() {
                return Nn(document.querySelector("main.page__main #content")) >= 768;
            }
            getIncontentLeaderboardConfig() {
                if (!this.isIncontentLeaderboardApplicable()) return;
                const e = "incontent_leaderboard";
const t = this.isIncontentPlayerApplicable() ? Y.get("templates.incontentAnchorSelector").replace(/h([2-5])/gi;
const "h$1:nth-of-type(2)") : Y.get("templates.incontentAnchorSelector");
const i = {
                    slotCreatorConfig: {
                        slotName: e;
const placeholderConfig: {
                            createLabel: !0
                        };
const anchorSelector: t;
const anchorPosition: "belowFirstViewport";
const avoidConflictWith: [ ".ad-slot-icl" ];
const insertMethod: "before";
const classList: [ Cn.HIDDEN_AD_CLASS;
const "ad-slot";
const "ad-slot-icl" ]
                    };
const slotCreatorWrapperConfig: {
                        classList: [ "ad-slot-placeholder";
const "incontent-leaderboard";
const "is-loading" ]
                    };
const activator: () => {
                        Bt.on(zt.AD_ENGINE_UAP_LOAD_STATUS;
const (() => {
                            Y.push("events.pushOnScroll.ids";
const e);
                        }));
                    }
                };
                return Y.get("templates.incontentHeadersExperiment") && (i.slotCreatorConfig.repeat = {
                    index: 1,
                    limit: 20,
                    slotNamePattern: `${e}_{slotConfig.repeat.index}`,
                    updateProperties: {
                        adProduct: "{slotConfig.slotName}",
                        "targeting.rv": "{slotConfig.repeat.index}",
                        "targeting.pos": [ e ]
                    },
                    updateCreator: {
                        anchorSelector: ".incontent-leaderboard",
                        avoidConflictWith: [ ".ad-slot-icl", "#incontent_player" ],
                        insertMethod: "append",
                        placeholderConfig: {
                            createLabel: !1
                        }
                    }
                }, i.activator = () => {
                    Bt.on(zt.AD_ENGINE_UAP_LOAD_STATUS, (t => {
                        Y.push("events.pushOnScroll.ids", e), t.isLoaded || this.injectIncontentAdsPlaceholders();
                    }));
                }), i;
            }
            injectIncontentAdsPlaceholders() {
                const e = {
                    classList: [ "ad-slot-placeholder";
const "incontent-leaderboard";
const "is-loading" ];
const anchorSelector: Y.get("templates.incontentAnchorSelector");
const avoidConflictWith: [ ".ad-slot-placeholder";
const ".incontent-leaderboard";
const "#incontent_player" ];
const insertMethod: "before";
const repeatStart: 1;
const repeatLimit: 19
                };
                th.injectAndRepeat(e, "incontent");
            }
            getIncontentBoxadConfig() {
                if (!this.isRightRailApplicable()) return;
                const e = "incontent_boxad_1";
                return {
                    slotCreatorConfig: {
                        slotName: e,
                        anchorSelector: "#WikiaAdInContentPlaceHolder",
                        insertMethod: "append",
                        classList: [ Cn.HIDDEN_AD_CLASS, "ad-slot" ],
                        repeat: {
                            index: 1,
                            limit: 20,
                            slotNamePattern: "incontent_boxad_{slotConfig.repeat.index}",
                            updateProperties: {
                                adProduct: "{slotConfig.slotName}",
                                "targeting.rv": "{slotConfig.repeat.index}",
                                "targeting.pos": [ "incontent_boxad" ]
                            },
                            disablePushOnScroll: !0
                        }
                    },
                    activator: () => {
                        const t = new ih(e;
const "incontent_boxad_";
const oc);
                        Bt.on(zt.AD_ENGINE_STACK_START, (() => {
                            t.rotateSlot();
                        }));
                    }
                };
            }
            isRightRailApplicable(e = 1024) {
                return xn() >= e;
            }
            getBottomLeaderboardConfig() {
                const e = "bottom_leaderboard";
const t = Y.get(`slots.${e}.placeholder`);
                return {
                    slotCreatorConfig: {
                        slotName: e,
                        placeholderConfig: t,
                        anchorSelector: ".bottom-leaderboard",
                        insertMethod: "prepend",
                        classList: [ "ad-slot" ]
                    },
                    activator: () => {
                        Y.push("events.pushOnScroll.ids", e);
                    }
                };
            }
            getIncontentPlayerConfig() {
                const e = "incontent_player";
                if (!this.isIncontentPlayerApplicable()) return;
                this.optimizely.addVariantToTargeting(oh, "anyclip_placement_undefined");
                const t = this.optimizely.getVariant(oh);
                return t && this.optimizely.addVariantToTargeting(oh, t), {
                    slotCreatorConfig: "anyclip_placement_featured_video" === t ? {
                        slotName: e,
                        anchorSelector: ".page-content",
                        avoidConflictWith: [ ".incontent-leaderboard" ],
                        insertMethod: "before",
                        classList: [ "anyclip-experiment" ]
                    } : {
                        slotName: e,
                        anchorSelector: Y.get("templates.incontentAnchorSelector"),
                        anchorPosition: "belowFirstViewport",
                        avoidConflictWith: [ ".incontent-leaderboard" ],
                        insertMethod: "before"
                    },
                    activator: () => {
                        Y.push("state.adStack", {
                            id: e
                        });
                    }
                };
            }
            isIncontentPlayerApplicable() {
                return Y.get("custom.hasIncontentPlayer");
            }
            getFloorAdhesionConfig() {
                if (!this.isFloorAdhesionApplicable()) return;
                const e = "floor_adhesion";
const t = () => {
                    const t = this.instantConfig.get("icFloorAdhesionViewportsToStart") || 0;
                    if (-1 === t) Y.push("state.adStack", {
                        id: e
                    }); else {
                        const i = t * kn();
                        zn.addSlot(e, {
                            distanceFromTop: i
                        });
                    }
                };
                return {
                    slotCreatorConfig: {
                        slotName: e,
                        anchorSelector: ".page",
                        insertMethod: "before",
                        classList: [ Cn.HIDDEN_AD_CLASS, "ad-slot" ]
                    },
                    activator: () => function(e, t = !0) {
                        const i = "top_leaderboard";
                        Bt.on(zt.AD_ENGINE_UAP_LOAD_STATUS, (n => {
                            if (n.isLoaded) Bt.onSlotEvent(ki.CUSTOM_EVENT, (({payload: t}) => {
                                [ Io.SLOT_UNSTICKED_STATE, Io.SLOT_FORCE_UNSTICK, Io.SLOT_STICKY_STATE_SKIPPED, Io.SLOT_VIDEO_DONE ].includes(t.status) && setTimeout((() => e()), Io.SLIDE_OUT_TIME);
                            }), i); else if (!t) {
                                if (!Y.get("state.topLeaderboardExists") || !Y.get("slots.top_leaderboard.defaultTemplates").includes("stickyTlb")) return void e();
                                Bt.onSlotEvent(ki.CUSTOM_EVENT, (({payload: t}) => {
                                    t.status !== Io.SLOT_STICKINESS_DISABLED ? [ Io.SLOT_UNSTICKED_STATE, Io.SLOT_FORCE_UNSTICK ].includes(t.status) && setTimeout((() => e()), Io.SLIDE_OUT_TIME) : e();
                                }), i);
                            }
                        }));
                    }(t, !Y.get("options.isFloorAdhesionNonUapApplicable"))
                };
            }
            isFloorAdhesionApplicable() {
                return !Y.get("custom.hasFeaturedVideo");
            }
        };
        var ah;
var dh;
var lh;
var ch;
var uh;
        rh = l([ N(), u("design:paramtypes", [ "function" == typeof (nh = void 0 !== Oi && Oi) ? nh : Object, "function" == typeof (sh = void 0 !== Ql && Ql) ? sh : Object ]) ], rh);
        let hh = class {
            constructor(e;
let t;
let i;
let n;
let s) {
                this.slotsDefinitionRepository = e;
let this.nativoSlotDefinitionRepository = t;
let this.performanceAdsDefinitionRepository = i;
let this.quizSlotsDefinitionRepository = n;
let this.galleryLightbox = s;
            }
            execute() {
                this.injectSlots(), this.configureTopLeaderboardAndCompanions(), this.configureFloorAdhesionCodePriority(), 
                this.registerAdPlaceholderService(), this.handleGalleryLightboxAdsSlots();
            }
            injectSlots() {
                Nu([ this.nativoSlotDefinitionRepository.getNativoFeedAdConfig(), this.slotsDefinitionRepository.getTopLeaderboardConfig(), this.slotsDefinitionRepository.getTopBoxadConfig(), this.slotsDefinitionRepository.getIncontentPlayerConfig(), this.slotsDefinitionRepository.getIncontentLeaderboardConfig(), this.slotsDefinitionRepository.getBottomLeaderboardConfig() ]), 
                Y.get("options.isFloorAdhesionNonUapApplicable") ? (Nu([ this.slotsDefinitionRepository.getFloorAdhesionConfig() ]), 
                Mn.enable("floor_adhesion")) : Bt.on(zt.AD_ENGINE_UAP_NTC_LOADED, (() => Nu([ this.slotsDefinitionRepository.getFloorAdhesionConfig() ]))), 
                Bt.on(zt.RAIL_READY, (() => {
                    Nu([ this.slotsDefinitionRepository.getIncontentBoxadConfig() ]), Bt.on(zt.AD_ENGINE_STACK_START, (() => {
                        this.performanceAdsDefinitionRepository.setup();
                    }));
                })), Bt.on(zt.QUIZ_AD_INJECTED, (({slotId: e}) => {
                    Nu([ this.quizSlotsDefinitionRepository.getQuizAdConfig(e) ]);
                }), !1);
            }
            configureTopLeaderboardAndCompanions() {
                const e = "top_leaderboard";
                Mo.addSlotSize("top_boxad", Io.UAP_ADDITIONAL_SIZES.companionSizes["5x5"].size), 
                Y.get("custom.hasFeaturedVideo") && !Y.get("templates.stickyTlb.withFV") || Y.push(`slots.${e}.defaultTemplates`, "stickyTlb"), 
                Y.get("custom.hasFeaturedVideo") ? (Y.set(`slots.${e}.sizes`, [ {
                    viewportSize: [ 1024, 0 ],
                    sizes: [ [ 728, 90 ], [ 970, 66 ], [ 970, 90 ], [ 970, 150 ], [ 970, 180 ], [ 970, 250 ] ]
                } ]), Y.set("slots.incontent_boxad_1.defaultSizes", [ [ 300, 250 ] ]), Mo.addSlotSize("incontent_boxad_1", Io.UAP_ADDITIONAL_SIZES.companionSizes["4x4"].size)) : ("special" !== Y.get("wiki.targeting.pageType") && (Mo.addSlotSize(e, Io.UAP_ADDITIONAL_SIZES.bfaSize.desktop), 
                Mo.addSlotSize(e, Io.UAP_ADDITIONAL_SIZES.bfaSize.unified)), Mo.addSlotSize("incontent_boxad_1", Io.UAP_ADDITIONAL_SIZES.companionSizes["5x5"].size));
            }
            configureFloorAdhesionCodePriority() {
                const e = "floor_adhesion";
                let t = !1;
                Bt.onSlotEvent(Gi.STATUS_SUCCESS, (() => {
                    t = !0, Bt.on(zt.AD_ENGINE_UAP_LOAD_STATUS, (i => {
                        i.isLoaded && "ruap" !== i.adProduct || Bt.onSlotEvent(ki.VIDEO_AD_IMPRESSION, (() => {
                            t && (t = !1, Mn.disable(e));
                        }));
                    }));
                }), e), Bt.onSlotEvent(ki.HIDDEN_EVENT, (() => {
                    t = !1;
                }), e);
            }
            registerAdPlaceholderService() {
                (new Du).init();
            }
            handleGalleryLightboxAdsSlots() {
                this.galleryLightbox.initialized || (this.galleryLightbox.handler = new Pu(this.slotsDefinitionRepository), 
                this.galleryLightbox.initialized = !0), this.galleryLightbox.handler.handle();
            }
        };
        var ph;
        hh = l([ N(), u("design:paramtypes", [ "function" == typeof (ah = void 0 !== rh && rh) ? ah : Object, "function" == typeof (dh = void 0 !== Yu && Yu) ? dh : Object, "function" == typeof (lh = void 0 !== eh && eh) ? lh : Object, "function" == typeof (ch = void 0 !== Qu && Qu) ? ch : Object, "function" == typeof (uh = void 0 !== n.GalleryLightboxAds && n.GalleryLightboxAds) ? uh : Object ]) ], hh);
        const gh = {
            EXPERIMENT_ENABLED: "performance_ads";
const EXPERIMENT_VARIANT: "performance_ads_variant"
        };
const mh = {
            EXPERIMENT_ENABLED: "unified_takeover_ntc20";
const EXPERIMENT_VARIANT: "unified_takeover_ntc20_variant"
        };
const fh = {
            EXPERIMENT_ENABLED: "desktop_adhesion";
const EXPERIMENT_VARIANT: "desktop_adhesion_variant"
        };
        let vh = class {
            constructor(e) {
                this.optimizely = e;
            }
            execute() {
                this.configurePerformanceAdsExperiment(), this.configureFloorAdhesionExperiment(), 
                this.configureFloorAdhesionNonUapExperiment();
            }
            configurePerformanceAdsExperiment() {
                const e = this.optimizely.getVariant(gh);
                e && this.optimizely.addVariantToTargeting(gh, e);
            }
            configureFloorAdhesionExperiment() {
                this.optimizely.addVariantToTargeting(mh, "ntc20_adhesion_undefined");
                const e = this.optimizely.getVariant(mh);
                if (e) {
                    let t = e;
                    const i = "ntc20_adhesion_enabled" === e;
                    i && (t += window.mw.config.get("isDarkTheme") ? "_dark" : "_light"), Y.set("options.ntc.floorEnabled", i), 
                    this.optimizely.addVariantToTargeting(mh, t);
                }
            }
            configureFloorAdhesionNonUapExperiment() {
                this.optimizely.addVariantToTargeting(fh, "desktop_adhesion_show_undefined");
                const e = this.optimizely.getVariant(fh);
                e && (Y.set("options.isFloorAdhesionNonUapApplicable", "desktop_adhesion_show_adhesion" === e), 
                this.optimizely.addVariantToTargeting(fh, e));
            }
        };
        vh = l([ N(), u("design:paramtypes", [ "function" == typeof (ph = void 0 !== Ql && Ql) ? ph : Object ]) ], vh);
        class bh {
            constructor(e = {}) {
                this.props = e;
            }
            render() {
                return document.createDocumentFragment();
            }
            getClassNames() {
                return this.props.classNames || [];
            }
        }
        class yh extends bh {
            render() {
                const e = document.createElement("div");
                return e.innerText = ia("advertisement"), e.className = "advertisement-label", e;
            }
        }
        const _h = {
            SLOT: Symbol("template ad slot");
const NAME: Symbol("template name");
const PARAMS: Symbol("template params")
        };
        var Sh;
        let Eh = class {
            constructor(e) {
                this.adSlot = e;
            }
            onEnter() {
                return h(this, void 0, void 0, (function*() {
                    const e = this.adSlot.getElement();
                    if (e.querySelector(".advertisement-label")) return;
                    const t = new yh;
                    e.appendChild(t.render());
                }));
            }
        };
        Eh = l([ N({
            autobind: !1
        }), c(0, O(_h.SLOT)), u("design:paramtypes", [ "function" == typeof (Sh = void 0 !== Cn && Cn) ? Sh : Object ]) ], Eh);
        class wh extends bh {
            render() {
                const e = document.createElement("button");
                return this.getClassNames().forEach((t => e.classList.add(t))), e.addEventListener("click", (e => this.onClick(e))), 
                e;
            }
            getClassNames() {
                return [ "button-control", ...super.getClassNames() ];
            }
            onClick(e) {
                const {onClick: t} = this.props;
                "function" == typeof t && t(e);
            }
        }
        const Ah = JSON.parse('{"CROSS":"<svg width=\\"24\\" height=\\"24\\" viewBox=\\"0 0 24 24\\" xmlns=\\"http://www.w3.org/2000/svg\\"><path d=\\"M19.707 4.293a.999.999 0 0 0-1.414 0L12 10.586 5.707 4.293a.999.999 0 1 0-1.414 1.414L10.586 12l-6.293 6.293a.999.999 0 1 0 1.414 1.414L12 13.414l6.293 6.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L13.414 12l6.293-6.293a.999.999 0 0 0 0-1.414\\" fill-rule=\\"evenodd\\"/></svg>";
const "LEARN_MORE":"<svg width=\\"24\\" height=\\"24\\" viewBox=\\"0 0 24 24\\" xmlns=\\"http://www.w3.org/2000/svg\\"><g stroke=\\"none\\" stroke-width=\\"1\\" fill-rule=\\"evenodd\\"><g transform=\\"translate(-753.000000;
const -1764.000000)\\" fill-rule=\\"nonzero\\"><g transform=\\"translate(153.000000;
const 1746.000000)\\"><g transform=\\"translate(5.000000;
const 0.000000)\\"><g transform=\\"translate(459.000000;
const 0.000000)\\"><g transform=\\"translate(136.000000;
const 18.000000)\\"><polygon points=\\"24 0 15 0 18.4395 3.4395 9.033 12.846 11.154 14.967 20.5605 5.5605 24 9\\"></polygon><path d=\\"M19.5;
const 24 L1.5;
const 24 C0.672;
const 24 0;
const 23.328 0;
const 22.5 L0;
const 4.5 C0;
const 3.672 0.672;
const 3 1.5;
const 3 L10.5;
const 3 L10.5;
const 6 L3;
const 6 L3;
const 21 L18;
const 21 L18;
const 13.5 L21;
const 13.5 L21;
const 22.5 C21;
const 23.328 20.328;
const 24 19.5;
const 24 Z\\"></path></g></g></g></g></g></g></svg>";
const "PAUSE":"<svg width=\\"24\\" height=\\"24\\" viewBox=\\"0 0 24 24\\" xmlns=\\"http://www.w3.org/2000/svg\\"><g fill-rule=\\"evenodd\\"><rect width=\\"7\\" height=\\"22\\" rx=\\"1\\" x=\\"3\\" y=\\"1\\"></rect><rect x=\\"14\\" width=\\"7\\" height=\\"22\\" rx=\\"1\\" y=\\"1\\"></rect></g></svg>";
const "PLAY":"<svg width=\\"24\\" height=\\"24\\" viewBox=\\"0 0 24 24\\" xmlns=\\"http://www.w3.org/2000/svg\\"><path d=\\"M19.69 12.6L5.143 22.867a.722.722 0 0 1-.753.05.733.733 0 0 1-.391-.65V1.733c0-.274.15-.524.391-.65a.724.724 0 0 1 .753.05l14.545 10.266a.734.734 0 0 1 0 1.201z\\" fill-rule=\\"evenodd\\"></path></svg>";
const "REPLAY":"<svg width=\\"24\\" height=\\"24\\" viewBox=\\"0 0 24 24\\" xmlns=\\"http://www.w3.org/2000/svg\\"><path d=\\"M12 23c6.065 0 11-4.863 11-10.84a.992.992 0 0 0-1-.985c-.553 0-1 .44-1 .986 0 4.89-4.037 8.868-9 8.868s-9-3.978-9-8.868c0-4.89 4.037-8.869 9-8.869a8.991 8.991 0 0 1 6.975 3.292l-3.794-.501a.996.996 0 0 0-1.124.845.987.987 0 0 0 .858 1.108l5.946.785a.996.996 0 0 0 1.124-.845l.797-5.86a.987.987 0 0 0-.858-1.107.994.994 0 0 0-1.124.846l-.446 3.28A10.997 10.997 0 0 0 12 1.322c-6.065 0-11 4.862-11 10.839C1 18.137 5.935 23 12 23\\" fill-rule=\\"evenodd\\"/></svg>";
const "FULLSCREEN_OFF":"<svg width=\\"24\\" height=\\"24\\" viewBox=\\"0 0 24 24\\" xmlns=\\"http://www.w3.org/2000/svg\\"><path d=\\"M5.5 9H8V2H5v4H1v3h4.5zm13 0H16V2h3v4h4v3h-4.5zm-13 6H8v7H5v-4H1v-3h4.5zm13 0H16v7h3v-4h4v-3h-4.5z\\" fill-rule=\\"evenodd\\"/></svg>";
const "FULLSCREEN_ON":"<svg width=\\"24\\" height=\\"24\\" viewBox=\\"0 0 24 24\\" xmlns=\\"http://www.w3.org/2000/svg\\"><path d=\\"M21.5 22H23v-7h-3v4h-4v3h5.5zM23 3.5V9h-3V5h-4V2h7v1.5zm-22 17V15h3v4h4v3H1v-1.5zM2.5 2H1v7h3V5h4V2H2.5z\\" fill-rule=\\"evenodd\\"/></svg>";
const "VOLUME_OFF":"<svg viewBox=\\"0 0 28 28\\" xmlns=\\"http://www.w3.org/2000/svg\\"><defs><style>.cls-1{fill:#fff;opacity:0.4;}.cls-2{fill:#231f20;}</style></defs><title>sound_off_button</title><circle class=\\"cls-1\\" cx=\\"14.06\\" cy=\\"13.96\\" r=\\"13.74\\"/><path class=\\"cls-2\\" d=\\"M16,2.93A13.07,13.07,0,1,1,2.93,16,13.08,13.08,0,0,1,16,2.93M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Z\\" transform=\\"translate(-2 -2)\\"/><g id=\\"Page-1\\"><g id=\\"Video-Player-Skin\\"><g id=\\"Video-Copy\\"><g id=\\"volume-off\\"><path id=\\"Shape\\" class=\\"cls-2\\" d=\\"M14.25,9.17l-3.79,4.11H6.84c-.78,0-1,.46-1,.89V17.7a1,1,0,0,0,1,1h3.65l3.79,4.18a1.09,1.09,0,0,0,.53.14,1,1,0,0,0,.5-.14,1,1,0,0,0,.5-.9V10a1,1,0,0,0-.5-.9,1.06,1.06,0,0,0-1,.05Z\\" transform=\\"translate(-2 -2)\\"/><path id=\\"Fill-1\\" class=\\"cls-2\\" d=\\"M22.91,16.21l3-3a.92.92,0,1,0-1.3-1.3l-3,3-3-3a.92.92,0,1,0-1.3,1.3l3,3-3,3a.92.92,0,1,0,1.3,1.3l3-3,3,3a.92.92,0,1,0,1.3-1.3Z\\" transform=\\"translate(-2 -2)\\"/></g></g></g></g></svg>","VOLUME_ON":"<svg viewBox=\\"0 0 28 28\\" xmlns=\\"http://www.w3.org/2000/svg\\"><defs><style>.cls-1{fill:#fff;opacity:0.4;}.cls-2{fill:#231f20;}</style></defs><title>sound_on_button</title><circle class=\\"cls-1\\" cx=\\"13.96\\" cy=\\"14.06\\" r=\\"13.74\\"/><path class=\\"cls-2\\" d=\\"M16,2.93A13.07,13.07,0,1,1,2.93,16,13.08,13.08,0,0,1,16,2.93M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Z\\" transform=\\"translate(-2 -2)\\"/><g id=\\"Page-1\\"><g id=\\"Video-Player-Skin\\"><g id=\\"Video-Copy\\"><g id=\\"volume\\"><path id=\\"Shape\\" class=\\"cls-2\\" d=\\"M14.24,9.17l-3.79,4.11H6.82c-.78,0-1,.46-1,.89V17.7a1,1,0,0,0,1,1h3.65l3.79,4.18a1.09,1.09,0,0,0,.53.14,1,1,0,0,0,.5-.14,1,1,0,0,0,.5-.9V10a1,1,0,0,0-.5-.9,1.06,1.06,0,0,0-1,.05Z\\" transform=\\"translate(-2 -2)\\"/><path id=\\"Shape-2\\" data-name=\\"Shape\\" class=\\"cls-2\\" d=\\"M19.18,19.33a4.39,4.39,0,0,0,0-6.19.71.71,0,0,0-1,1,3,3,0,0,1,0,4.19.71.71,0,0,0,1,1Z\\" transform=\\"translate(-2 -2)\\"/><path id=\\"Shape-3\\" data-name=\\"Shape\\" class=\\"cls-2\\" d=\\"M23.3,16.23a6.19,6.19,0,0,0-1.81-4.39.71.71,0,1,0-1,1,4.81,4.81,0,0,1,0,6.79.71.71,0,1,0,1,1,6.19,6.19,0,0,0,1.81-4.39Z\\" transform=\\"translate(-2 -2)\\"/></g></g></g></g></svg>","HIVI_VOLUME_OFF":"<svg width=\\"24\\" height=\\"24\\" viewBox=\\"0 0 24 24\\" xmlns=\\"http://www.w3.org/2000/svg\\"><path d=\\"M6 8.007H1.347C.333 8.007 0 8.769 0 9.391v5.032C0 15.045.333 16 1.347 16H6l5.007 5.796c.215.132.454.205.693.205.24 0 .436-.063.65-.196.429-.265.65-.75.65-1.28V3.447c0-.53-.221-1.02-.65-1.284-.429-.265-.935-.187-1.365.078L6 8.007zM20.305 12l2.425-2.425a.922.922 0 1 0-1.306-1.305l-2.425 2.424-2.423-2.424a.923.923 0 0 0-1.306 1.305L17.695 12l-2.425 2.425a.922.922 0 1 0 1.306 1.304L19 13.306l2.425 2.423a.92.92 0 0 0 1.306 0 .922.922 0 0 0 0-1.304L20.305 12z\\" fill-rule=\\"evenodd\\"></path></svg>","HIVI_VOLUME_ON":"<svg width=\\"24\\" height=\\"24\\" viewBox=\\"0 0 24 24\\" xmlns=\\"http://www.w3.org/2000/svg\\"><g fill-rule=\\"evenodd\\"><path d=\\"M6 8.007H1.347C.333 8.007 0 8.769 0 9.391v5.032C0 15.045.333 16 1.347 16H6l5.007 5.796c.215.132.454.205.693.205.24 0 .436-.063.65-.196.429-.265.65-.75.65-1.28V3.447c0-.53-.221-1.02-.65-1.284-.429-.265-.935-.187-1.365.078L6 8.007zm11.612 8.524a5.858 5.858 0 0 0 0-8.253.944.944 0 0 0-1.337 1.332 3.97 3.97 0 0 1 0 5.59.943.943 0 1 0 1.337 1.331z\\"></path><path d=\\"M23.03 12.135c0-2.21-.859-4.292-2.418-5.857a.943.943 0 1 0-1.337 1.332 6.37 6.37 0 0 1 1.868 4.525 6.37 6.37 0 0 1-1.868 4.525.943.943 0 1 0 1.338 1.332 8.249 8.249 0 0 0 2.418-5.857z\\"></path></g></svg>"}');
        var Th = s.t(Ah;
var 2);
        const Ih = new window.DOMParser;
        function Ch(e, t = []) {
            if (Th[e]) {
                const i = Ih.parseFromString(Th[e];
const "image/svg+xml").documentElement;
                return i.setAttribute("class", t.join(" ")), i;
            }
            return null;
        }
        const Nh = Object.keys(Th).reduce(((e;
const t) => (e[t] = t;
const e));
const {});
        class Oh extends bh {
            render() {
                const {onClick: e} = this.props;
const t = new wh({
                    onClick: e;
const classNames: this.getClassNames()
                }).render();
const i = Ch(Nh.CROSS;
const [ "icon" ]);
                return t.appendChild(i), t;
            }
            getClassNames() {
                return [ "button-close", ...super.getClassNames() ];
            }
        }
        var Dh;
        let Lh = class {
            constructor(e) {
                this.adSlot = e;
            }
            onEnter(e) {
                return h(this, void 0, void 0, (function*() {
                    this.button = new Oh({
                        onClick: () => {
                            this.adSlot.emitEvent(Fi.SLOT_CLOSE_IMMEDIATELY), e("hidden");
                        }
                    }).render(), setTimeout((() => {
                        this.adSlot.getElement().appendChild(this.button);
                    }), 0);
                }));
            }
            onLeave() {
                return h(this, void 0, void 0, (function*() {
                    this.button.remove();
                }));
            }
        };
        Lh = l([ N({
            autobind: !1
        }), c(0, O(_h.SLOT)), u("design:paramtypes", [ "function" == typeof (Dh = void 0 !== Cn && Cn) ? Dh : Object ]) ], Lh);
        let Ph = class {
            constructor(e) {
                this.name = e;
            }
            onEnter(e) {
                return h(this, void 0, void 0, (function*() {
                    window.ads.transitions = window.ads.transitions || {}, window.ads.transitions[this.name] = t => e(t, {
                        allowMulticast: !0
                    });
                }));
            }
            onDestroy() {
                return h(this, void 0, void 0, (function*() {
                    delete window.ads.transitions[this.name];
                }));
            }
        };
        var kh;
        Ph = l([ N({
            autobind: !1
        }), c(0, O(_h.NAME)), u("design:paramtypes", [ String ]) ], Ph);
        let xh = class {
            constructor(e) {
                this.element = e;
let this.stylesBackup = {};
            }
            setProperty(e, t) {
                return this.saveProperty(e), this.element.style[e] = t, this;
            }
            saveProperty(e) {
                void 0 === this.stylesBackup[e] && (this.stylesBackup[e] = this.element.style[e]);
            }
            addClass(...e) {
                return this.saveClasses(), this.element.classList.add(...e), this;
            }
            removeClass(...e) {
                return this.saveClasses(), this.element.classList.remove(...e), this;
            }
            saveClasses() {
                this.classesBackup || (this.classesBackup = this.element.classList.value);
            }
            restore() {
                for (const [e;
const t] of Object.entries(this.stylesBackup)) this.element.style[e] = t;
                this.classesBackup && (this.element.classList.value = this.classesBackup), this.stylesBackup = {}, 
                this.classesBackup = void 0;
            }
        };
        xh = l([ N({
            autobind: !1
        }), u("design:paramtypes", [ "function" == typeof (kh = "undefined" != typeof HTMLElement && HTMLElement) ? kh : Object ]) ], xh);
        let Rh = class {
            constructor() {
                this.elements = new Map;
            }
            element(e) {
                return this.elements.has(e) || this.elements.set(e, new xh(e)), this.elements.get(e);
            }
            restore() {
                this.elements.forEach((e => e.restore())), this.elements.clear();
            }
        };
        var Uh;
        Rh = l([ N({
            autobind: !1
        }) ], Rh);
        let Vh = class {
            constructor(e) {
                this.manipulator = e;
            }
            onEnter() {
                return h(this, void 0, void 0, (function*() {}));
            }
            onLeave() {
                return h(this, void 0, void 0, (function*() {
                    this.manipulator.restore();
                }));
            }
        };
        var Mh;
        Vh = l([ N({
            autobind: !1
        }), u("design:paramtypes", [ "function" == typeof (Uh = void 0 !== Rh && Rh) ? Uh : Object ]) ], Vh);
        let zh = class {
            constructor(e) {
                this.adSlot = e;
            }
            onEnter(e) {
                return h(this, void 0, void 0, (function*() {
                    this.adSlot.setConfigProperty("showManually", !0), this.adSlot.addClass("interstitial"), 
                    this.adSlot.addClass("out-of-page-template"), this.adSlot.isOutOfPage() && (yield $i.adjustIframeByContentSize(this.adSlot)), 
                    window.ads.runtime.interstitial = window.ads.runtime.interstitial || {}, window.ads.runtime.interstitial.available = !0, 
                    e("display");
                }));
            }
            onLeave() {
                return h(this, void 0, void 0, (function*() {
                    Bt.emit(zt.AD_ENGINE_INTERSTITIAL_DISPLAYED), this.adSlot.show(), window.ads.runtime.interstitial.visible = !0;
                }));
            }
        };
        var jh;
        zh = l([ N({
            autobind: !1
        }), c(0, O(_h.SLOT)), u("design:paramtypes", [ "function" == typeof (Mh = void 0 !== Cn && Cn) ? Mh : Object ]) ], zh);
        let Bh = class {
            constructor(e) {
                this.manipulator = e;
            }
            onEnter() {
                return h(this, void 0, void 0, (function*() {
                    this.manipulator.element(document.documentElement).setProperty("overflow", "hidden");
                }));
            }
        };
        var Fh;
var $h;
        Bh = l([ N({
            autobind: !1
        }), u("design:paramtypes", [ "function" == typeof (jh = void 0 !== Rh && Rh) ? jh : Object ]) ], Bh);
        let Gh = class {
            constructor(e;
let t) {
                this.adSlot = e;
let this.manipulator = t;
            }
            onEnter() {
                return h(this, void 0, void 0, (function*() {
                    this.manipulator.element(this.adSlot.element).addClass(Cn.HIDDEN_AD_CLASS), document.body.classList.remove("has-sticky-tlb"), 
                    this.adSlot.emitEvent(ki.HIDDEN_EVENT);
                }));
            }
        };
        Gh = l([ N({
            autobind: !1
        }), c(0, O(_h.SLOT)), u("design:paramtypes", [ "function" == typeof (Fh = void 0 !== Cn && Cn) ? Fh : Object, "function" == typeof ($h = void 0 !== Rh && Rh) ? $h : Object ]) ], Gh);
        let Hh = class {
            initialize(e) {
                e.slotName && (this.configuration = e;
let this.railElement = document.querySelectorAll(this.configuration.railSelector)[0];
let this.railElement && this.enableSticking());
            }
            enableSticking() {
                Y.get("options.stickyTbExperiment") ? this.registerSuccessListener() : Bt.on(zt.AD_ENGINE_UAP_NTC_LOADED, this.registerSuccessListener.bind(this));
            }
            registerSuccessListener() {
                Bt.onSlotEvent(Gi.STATUS_SUCCESS, (() => {
                    this.registerPusherListener(), this.registerViewedListener();
                }), this.configuration.slotName, !0);
            }
            registerPusherListener() {
                Bt.onSlotEvent(ki.CUSTOM_EVENT, (({payload: e}) => {
                    var t;
                    if (e.status === Io.SLOT_STICKED_STATE) {
                        const e = (null === (t = document.getElementById(this.configuration.pusherSlotName)) || void 0 === t ? void 0 : t.offsetHeight) || 36;
                        this.railElement.style.top = `${e}px`;
                    }
                }), this.configuration.pusherSlotName);
            }
            registerViewedListener() {
                const e = document.querySelector(this.configuration.pageSelector);
                e && (Bt.onSlotEvent(ki.SLOT_VIEWED_EVENT, (() => {
                    setTimeout((() => {
                        e.classList.add("companion-viewed"), e.classList.remove("companion-stick");
                    }), 500);
                }), this.configuration.slotName, !0), e.classList.add("companion-stick"));
            }
        };
        var qh;
        Hh = l([ N() ], Hh);
        let Wh = class {
            constructor(e) {
                this.container = e;
            }
            provideDependencies(e, t, i, n) {
                this.container.bind(_h.NAME).value(e), this.container.bind(_h.SLOT).value(t), this.container.bind(_h.PARAMS).value(i), 
                n.forEach((e => this.container.bind(e)));
            }
            resetDependencies(e) {
                this.container.unbind(_h.PARAMS), this.container.unbind(_h.SLOT), this.container.unbind(_h.NAME), 
                e.forEach((e => this.container.unbind(e)));
            }
        };
        Wh = l([ N(), u("design:paramtypes", [ "function" == typeof (qh = void 0 !== R && R) ? qh : Object ]) ], Wh);
        class Kh {
            get currentState() {
                if (!this.states.has(this.currentStateKey)) throw new Error(`Template ${this.templateName} - state (${this.currentStateKey}) does not exist.`);
                return this.states.get(this.currentStateKey);
            }
            constructor(e, t, i, n) {
                this.templateName = e, this.states = t, this.currentStateKey = i, this.emitter$ = n, 
                this.transition = e => h(this, void 0, void 0, (function*() {
                    if (this.currentStateKey === e) throw new Error(`Template ${this.templateName} - already is in ${this.currentStateKey} state`);
                    this.emit("leaving"), yield this.currentState.leave(), this.emit("left"), this.currentStateKey = e, 
                    this.emit("entering"), yield this.currentState.enter(this.transition), this.emit("entered");
                }));
            }
            init() {
                return h(this, void 0, void 0, (function*() {
                    this.emit("initialising"), yield this.currentState.enter(this.transition), this.emit("initialised");
                }));
            }
            destroy() {
                return h(this, void 0, void 0, (function*() {
                    this.emit("destroying"), yield this.currentState.leave(), yield Promise.all(Array.from(this.states.values()).map((e => e.destroy()))), 
                    this.emit("destroyed");
                }));
            }
            emit(e) {
                this.emitter$.next({
                    type: e,
                    templateName: this.templateName,
                    stateName: this.currentStateKey
                });
            }
        }
        class Yh {
            constructor(e, t) {
                this.name = e, this.handlers = t;
            }
            enter(e) {
                return h(this, void 0, void 0, (function*() {
                    const t = rn();
const i = this.useTransition(e;
const t);
                    yield Promise.all(this.handlers.map((e => h(this, void 0, void 0, (function*() {
                        return e.onEnter(i);
                    }))))), t.resolve(null);
                }));
            }
            leave() {
                return h(this, void 0, void 0, (function*() {
                    yield Promise.all(this.handlers.filter((e => "onLeave" in e)).map((e => h(this, void 0, void 0, (function*() {
                        return e.onLeave();
                    })))));
                }));
            }
            destroy() {
                return h(this, void 0, void 0, (function*() {
                    yield Promise.all(this.handlers.filter((e => "onDestroy" in e)).map((e => h(this, void 0, void 0, (function*() {
                        return e.onDestroy();
                    })))));
                }));
            }
            useTransition(e, t) {
                let i = !1;
                return (n, {allowMulticast: s = !1} = {}) => h(this, void 0, void 0, (function*() {
                    if (yield t, i && !s) throw new Error(`Error thrown while attempting to transition to "${n}" state. Attempting to call transition from "${this.name}" state a second time.\nThis may be caused by:\n- not cleaning up in an "onLeave" method,\n- calling transition in a different handler at the same time.\nYou may suppress this error by setting allowMulticast to true.\n`);
                    return i = !0, e(n, {
                        allowMulticast: s
                    });
                }));
            }
        }
        var Qh;
var Xh;
        let Jh = class {
            constructor(e;
let t) {
                this.container = e;
let this.dependenciesManager = t;
let this.settings = new Map;
let this.machines = new Map;
            }
            has(e) {
                return this.settings.has(e);
            }
            register(e, t, i, n = []) {
                const s = new ot;
                return this.settings.set(e, {
                    StateHandlerTypesDict: t,
                    initialStateKey: i,
                    emitter$: s,
                    templateDependencies: n.flat(1 / 0)
                }), s.asObservable();
            }
            destroy(e) {
                return h(this, void 0, void 0, (function*() {
                    const t = Array.from(this.machines.get(e) || []);
                    yield Promise.all(t.map((e => e.destroy()))), this.machines.delete(e);
                }));
            }
            destroyAll() {
                return h(this, void 0, void 0, (function*() {
                    yield Promise.all(Array.from(this.machines.values()).map((e => Promise.all(Array.from(e.values()).map((e => e.destroy())))))), 
                    this.machines.clear();
                }));
            }
            init(e, t, i = {}) {
                if (!this.settings.has(e)) throw new Error(`Template ${e} was not registered`);
                Bt.emit(zt.AD_ENGINE_TEMPLATE_LOADED, {
                    name: e,
                    state: t ? t.getSlotName() : ""
                });
                const {StateHandlerTypesDict: n;
const initialStateKey: s;
const emitter$: o;
const templateDependencies: r} = this.settings.get(e);
                this.dependenciesManager.provideDependencies(e, t, i, r);
                const a = this.createTemplateStateMap(n);
                this.dependenciesManager.resetDependencies(r);
                const d = new Kh(e;
const a;
const s;
const o);
                d.init(), this.saveMachine(t, d);
            }
            saveMachine(e, t) {
                var i;
var n;
                const s = this.machines.get(null !== (i = null == e ? void 0 : e.getSlotName()) && void 0 !== i ? i : "__default__") || new Set;
                s.add(t), this.machines.set(null !== (n = null == e ? void 0 : e.getSlotName()) && void 0 !== n ? n : "__default__", s);
            }
            createTemplateStateMap(e) {
                const t = Object.keys(e).map((t => [ t;
const this.createTemplateState(e;
const t) ]));
                return new Map(t);
            }
            createTemplateState(e, t) {
                const i = e[t].map((e => this.createStateHandler(e)));
                return new Yh(t, i);
            }
            createStateHandler(e) {
                return this.container.bind(e).scope("Transient"), this.container.get(e);
            }
        };
        var Zh;
var ep;
        Jh = l([ N(), u("design:paramtypes", [ "function" == typeof (Qh = void 0 !== R && R) ? Qh : Object, "function" == typeof (Xh = void 0 !== Wh && Wh) ? Xh : Object ]) ], Jh);
        let tp = class {
            constructor(e;
let t) {
                this.adSlot = e;
let this.params = t;
            }
            onEnter(e) {
                return h(this, void 0, void 0, (function*() {
                    this.adSlot.setConfigProperty("showManually", !0), this.adSlot.addClass("expanded-slot"), 
                    this.adSlot.addClass("bfaa-template"), this.adSlot.addClass("slot-responsive"), 
                    this.adSlot.addClass("theme-hivi"), this.adSlot.getAdContainer().classList.add("iframe-container"), 
                    yield $i.onReady(this.adSlot), yield this.awaitVisibleDOM(), ko(this.params) ? e("sticky") : (xo(), 
                    e("impact"));
                }));
            }
            awaitVisibleDOM() {
                return h(this, void 0, void 0, (function*() {
                    document.hidden && (yield nn(window, "visibilitychange"));
                }));
            }
            onLeave() {
                return h(this, void 0, void 0, (function*() {
                    this.adSlot.show(), document.body.classList.add("has-uap");
                }));
            }
            onDestroy() {
                return h(this, void 0, void 0, (function*() {
                    document.body.classList.remove("has-uap");
                }));
            }
        };
        tp = l([ N({
            autobind: !1
        }), c(0, O(_h.SLOT)), c(1, O(_h.PARAMS)), u("design:paramtypes", [ "function" == typeof (Zh = void 0 !== Cn && Cn) ? Zh : Object, "function" == typeof (ep = void 0 !== o.UapParams && o.UapParams) ? ep : Object ]) ], tp);
        class ip {
            constructor(e, t) {
                this.className = e, this.uiElements = t, this.panelContainer = null;
            }
            add(e, t, i) {
                this.panelContainer = document.createElement("div"), this.panelContainer.className = this.className, 
                this.uiElements.forEach((t => {
                    t && t.add(e, this.panelContainer, i);
                })), t.appendChild(this.panelContainer);
            }
        }
        class np {
            static add(e, t) {
                const i = document.createElement("div");
const n = Ch(Nh.PAUSE;
const [ "play-off-icon";
const "porvata-icon";
const "porvata-off-icon" ]);
const s = Ch(Nh.PLAY;
const [ "play-on-icon";
const "porvata-icon";
const "porvata-on-icon" ]);
                i.appendChild(s), i.appendChild(n), i.className = "play-pause-button porvata-switchable-icon", 
                i.addEventListener("click", (() => {
                    e.isPaused() ? e.resume() : e.pause();
                })), e.addEventListener("pause", (() => {
                    i.classList.remove("is-on");
                })), e.addEventListener("resume", (() => {
                    i.classList.add("is-on");
                })), e.addEventListener("start", (() => {
                    i.classList.add("is-on");
                })), t.appendChild(i);
            }
        }
        class sp {
            static add(e, t) {
                const i = document.createElement("div");
const n = Ch(Nh.FULLSCREEN_OFF;
const [ "fullscreen-off-icon";
const "porvata-icon";
const "porvata-off-icon" ]);
const s = Ch(Nh.FULLSCREEN_ON;
const [ "fullscreen-on-icon";
const "porvata-icon";
const "porvata-on-icon" ]);
                i.appendChild(n), i.appendChild(s), i.className = "toggle-fullscreen-button porvata-switchable-icon", 
                i.addEventListener("click", (() => {
                    e.toggleFullscreen();
                })), e.addEventListener("wikiaFullscreenChange", (() => {
                    e.isFullscreen() ? i.classList.add("is-on") : i.classList.remove("is-on");
                })), e.addEventListener("wikiaAdStop", (() => {
                    e.isFullscreen() && e.toggleFullscreen();
                })), t.appendChild(i);
            }
        }
        function op(e, t) {
            e.isMuted() ? t.classList.add("is-on") : t.classList.remove("is-on");
        }
        class rp {
            static add(e, t) {
                const i = function() {
                    const e = document.createElement("div");
const t = Ch(Nh.HIVI_VOLUME_OFF;
const [ "volume-off-icon";
const "porvata-icon";
const "porvata-off-icon" ]);
const i = Ch(Nh.HIVI_VOLUME_ON;
const [ "volume-on-icon";
const "porvata-icon";
const "porvata-on-icon" ]);
                    return e.className = "volume-button porvata-switchable-icon", e.appendChild(t), 
                    e.appendChild(i), e;
                }();
                e.addEventListener("wikiaVolumeChange", (() => {
                    op(e, i);
                })), e.addEventListener("wikiaAdStarted", (() => {
                    op(e, i);
                })), i.addEventListener("click", (t => {
                    e.toggleVolume(), t.preventDefault();
                })), t.appendChild(i);
            }
        }
        function ap(e) {
            e.style.display = "none";
            const t = e.offsetWidth;
            return e.style.display = "", t;
        }
        function dp(e, t) {
            t.container.classList.contains("theme-hivi") || (e.style.width = e.style.width || function(e) {
                const t = e.container.offsetWidth;
                return 100 * e.hideWhenPlaying.offsetWidth / t + "%";
            }(t)), e.style.display = "block";
        }
        function lp(e) {
            return Xe((function(t, i) {
                ft(e).subscribe(Je(i, (function() {
                    return i.complete();
                }), Pe)), !i.closed && t.subscribe(i);
            }));
        }
        var cp = new Hu(Bu);
var up = cp;
        class hp {
            static createDisplayContainer(e, t = null) {
                const i = new window.google.ima.AdDisplayContainer(e);
const n = e.querySelector("div > iframe");
                return t && (Bt.onSlotEvent(ki.DESTROY_EVENT, (() => {
                    hp.activeContainers.includes(t.getUid()) && (i.destroy(), hp.activeContainers = hp.activeContainers.filter((e => e !== t.getUid())));
                }), t.getSlotName(), !0), hp.activeContainers.push(t.getUid())), hp.reloadIframeOnNavigation(n), 
                i;
            }
            static reloadIframeOnNavigation(e) {
                window.performance && window.performance.navigation && window.performance.navigation.type === window.performance.navigation.TYPE_BACK_FORWARD && (e.contentWindow.location.href = e.src);
            }
            static createAdsLoader(e, t) {
                const i = new window.google.ima.AdsLoader(e);
                return i.getSettings().setVpaidMode(t.getVpaidMode()), i;
            }
            static createAdsRequest(e) {
                const t = new window.google.ima.AdsRequest;
const i = e.getWidth();
const n = e.getHeight();
                return t.adTagUrl = e.getVastUrl() || da(0, e.getSlotName(), {
                    targeting: e.getVastTargeting()
                }), t.linearAdSlotWidth = i, t.linearAdSlotHeight = n, t.setAdWillAutoPlay(e.isAutoPlay()), 
                t.setAdWillPlayMuted(e.isAutoPlay()), t;
            }
            static getRenderingSettings() {
                const e = new window.google.ima.AdsRenderingSettings;
                return Y.get("state.isMobile") || (e.bitrate = 68e3), e.loadVideoTimeout = 15e3, 
                e.enablePreloading = !0, e.uiElements = [], e;
            }
        }
        hp.activeContainers = [];
        class pp {
            constructor(e) {
                this.fullscreen = !1, this.enter = ua(e, pp.enterEvents), this.exit = ua(e, pp.exitEvents) || ua(document, pp.exitEvents), 
                this.fullscreenChangeEvent = (ca(e, pp.changeEvents) || "").replace(/^on/, "").replace("msfullscreenchange", "MSFullscreenChange"), 
                this.isSupported() && this.addChangeListener((() => {
                    this.fullscreen = !this.fullscreen;
                }));
            }
            addChangeListener(e) {
                document.addEventListener(this.fullscreenChangeEvent, e);
            }
            removeChangeListener(e) {
                document.removeEventListener(this.fullscreenChangeEvent, e);
            }
            toggle() {
                this.isSupported() && (this.isFullscreen() ? this.exit() : this.enter());
            }
            isFullscreen() {
                return this.fullscreen;
            }
            isSupported() {
                return Boolean(this.enter && this.exit);
            }
        }
        pp.enterEvents = [ "webkitRequestFullscreen", "webkitEnterFullscreen", "mozRequestFullScreen", "msRequestFullscreen", "requestFullscreen" ], 
        pp.exitEvents = [ "webkitExitFullscreen", "mozCancelFullScreen", "msExitFullscreen", "exitFullscreen" ], 
        pp.changeEvents = [ "onwebkitfullscreenchange", "onmozfullscreenchange", "onmsfullscreenchange", "onfullscreenchange" ];
        class gp {
            constructor(e) {
                var t;
                this.playerContainer = e, this.videoContainer = e.querySelector("div"), this.videoElement = this.videoContainer.querySelector("video"), 
                this.interfaceContainer = document.createElement("div"), this.playerContainer.classList.add("porvata", "porvata-container"), 
                this.videoContainer.classList.add("video-player", "porvata-player", Cn.HIDDEN_AD_CLASS), 
                null === (t = this.videoElement) || void 0 === t || t.classList.add("porvata-video"), 
                this.interfaceContainer.classList.add("porvata-interface", Cn.HIDDEN_AD_CLASS), 
                this.playerContainer.appendChild(this.interfaceContainer);
            }
            getInterfaceContainer() {
                return this.interfaceContainer;
            }
            getPlayerContainer() {
                return this.playerContainer;
            }
            getVideoContainer() {
                return this.videoContainer;
            }
            getVideoElement() {
                return this.videoElement;
            }
            setAttribute(e, t) {
                this.playerContainer.setAttribute(e, t);
            }
            setVastAttributes(e, t, i) {
                const n = zl.getVastAttributes(e;
const t;
const i);
                Object.keys(n).forEach((e => this.setAttribute(e, n[e])));
            }
            setAutoPlayOnVideoElement(e) {
                this.videoElement && (this.videoElement.autoplay = e, this.videoElement.muted = e);
            }
            setAudioOnVideoElement(e) {
                this.videoElement && (this.videoElement.muted = 0 === e, this.videoElement.volume = e);
            }
        }
        const mp = "video-player-fullscreen";
const fp = "stop-scrolling";
        class vp {
            constructor(e, t, i, n) {
                this.adDisplayContainer = e, this.adsLoader = t, this.adsRequest = i, this.settings = n, 
                this.state = null, this.adsManager = null, this.eventListeners = {}, this.destroyCallbacks = new Qi;
                const s = n.getPlayerContainer();
                this.playCounter = 0, this.dom = new gp(s), this.container = s;
                const o = s.querySelector("video");
                this.nativeFullscreen = new pp(o), this.registerStateListeners(), this.settings.isAutoPlay() && (this.setAutoPlay(!0), 
                this.updatePlayCounter()), this.destroyCallbacks.onItemFlush((e => e())), this.nativeFullscreen.isSupported() && this.nativeFullscreen.addChangeListener((() => this.onFullscreenChange()));
            }
            registerStateListeners() {
                this.addEventListener(window.google.ima.AdEvent.Type.LOADED, (e => this.setAdStatus(Gi.STATUS_SUCCESS, e.getAd()))), 
                this.addEventListener(window.google.ima.AdErrorEvent.Type.AD_ERROR, (() => this.setAdStatus(Gi.STATUS_ERROR))), 
                this.addEventListener("resume", (() => this.setState("playing"))), this.addEventListener("start", (() => this.setState("playing"))), 
                this.addEventListener("pause", (() => this.setState("paused"))), this.addEventListener("wikiaAdStop", (() => this.setState("stopped"))), 
                this.addEventListener("allAdsCompleted", (() => this.setState("stopped"))), this.addEventListener("adCanPlay", (() => this.dom.getInterfaceContainer().classList.remove(Cn.HIDDEN_AD_CLASS))), 
                this.addEventListener("wikiaAdCompleted", (() => this.dom.getInterfaceContainer().classList.add(Cn.HIDDEN_AD_CLASS)));
            }
            getAdsManager() {
                return this.adsManager;
            }
            setAdsManager(e) {
                this.adsManager = e;
            }
            addEventListener(e, t) {
                if (-1 !== e.indexOf("wikia")) return this.eventListeners[e] = this.eventListeners[e] || [], 
                void this.eventListeners[e].push(t);
                null !== this.adsManager ? this.adsManager.addEventListener(e, t) : this.addEventListener("wikiaAdsManagerLoaded", (() => this.adsManager.addEventListener(e, t)));
            }
            removeEventListener(e, t) {}
            dispatchEvent(e) {
                this.eventListeners[e] && this.eventListeners[e].length > 0 && this.eventListeners[e].forEach((e => {
                    e({});
                }));
            }
            setAutoPlay(e) {
                this.dom.setAutoPlayOnVideoElement(e), this.settings.setAutoPlay(e);
            }
            setAdStatus(e, t) {
                this.dom.setVastAttributes(this.adsRequest.adTagUrl, e, t);
            }
            requestAds() {
                this.adsLoader.requestAds(this.adsRequest);
            }
            play(e, t) {
                void 0 !== e && void 0 !== t && (this.settings.setHeight(t), this.settings.setWidth(e)), 
                this.settings.getWidth() && this.settings.getHeight() && !this.isFullscreen() || (this.settings.setHeight(this.dom.getPlayerContainer().offsetHeight), 
                this.settings.setWidth(this.dom.getPlayerContainer().offsetWidth)), this.dispatchEvent("wikiaAdPlayTriggered"), 
                this.adDisplayContainer.initialize(), this.adsManager.init(Math.round(this.settings.getWidth()), Math.round(this.settings.getHeight()), window.google.ima.ViewMode.NORMAL), 
                this.adsManager.start(), this.updatePlayCounter();
            }
            reload() {
                const e = hp.createAdsRequest(this.settings);
                this.adsManager.destroy(), this.adsLoader.contentComplete(), this.adsLoader.requestAds(e);
            }
            resize(e, t) {
                const i = window.google.ima.ViewMode;
                isFinite(e) && isFinite(t) && (this.settings.setHeight(t), this.settings.setWidth(e)), 
                this.adsManager && (this.isFullscreen() ? this.adsManager.resize(window.innerWidth, window.innerHeight, i.FULLSCREEN) : this.adsManager.resize(Math.round(this.settings.getWidth()), Math.round(this.settings.getHeight()), i.NORMAL));
            }
            getRemainingTime() {
                return this.adsManager.getRemainingTime();
            }
            setState(e) {
                this.state = e;
            }
            getState() {
                return this.state;
            }
            getPlayCounter() {
                return this.playCounter;
            }
            updatePlayCounter() {
                this.playCounter++;
            }
            isPaused() {
                return "paused" === this.getState();
            }
            isPlaying() {
                return "playing" === this.getState();
            }
            resume() {
                this.adsManager.resume();
            }
            pause() {
                this.adsManager.pause();
            }
            stop() {
                this.adsManager.stop(), this.dispatchEvent("wikiaAdStop");
            }
            toggleVolume() {
                this.isMuted() ? (this.unmute(), this.dispatchEvent("wikiaAdUnmute")) : (this.mute(), 
                this.dispatchEvent("wikiaAdMute"));
            }
            isMuted() {
                return 0 === this.adsManager.getVolume();
            }
            mute() {
                this.setVolume(0);
            }
            unmute() {
                this.setVolume(.75);
            }
            setVolume(e) {
                this.dom.setAudioOnVideoElement(e), this.adsManager.setVolume(e), this.dispatchEvent("wikiaVolumeChange");
            }
            toggleFullscreen() {
                this.fullscreenMuteProtect = !0, this.nativeFullscreen.isSupported() ? this.nativeFullscreen.toggle() : this.onFullscreenChange();
            }
            onFullscreenChange() {
                this.isFullscreen() ? (this.dom.getPlayerContainer().classList.add(mp), document.documentElement.classList.add(fp)) : (this.dom.getPlayerContainer().classList.remove(mp), 
                document.documentElement.classList.remove(fp), this.fullscreenMuteProtect ? this.fullscreenMuteProtect = !1 : this.isPlaying() && !this.isMuted() && this.mute()), 
                this.resize(), this.dispatchEvent("wikiaFullscreenChange");
            }
            isFullscreen() {
                return this.nativeFullscreen.isFullscreen();
            }
            addOnDestroyCallback(e) {
                this.destroyCallbacks.push(e);
            }
            destroy() {
                this.destroyCallbacks.flush();
            }
        }
        class bp {
            static create(e) {
                return h(this, void 0, void 0, (function*() {
                    e.getPlayerContainer().style.opacity = "0", yield bp.load();
                    const t = e.getSlotName();
const i = Mn.get(t);
                    !function(e, t) {
                        e.setConfigProperty("autoplay", t.isAutoPlay()), e.setConfigProperty("audio", !t.isAutoPlay()), 
                        e.setTargetingConfigProperty("autoplay", t.isAutoPlay() ? "yes" : "no"), e.setTargetingConfigProperty("audio", t.isAutoPlay() ? "no" : "yes");
                    }(i, e);
                    const n = hp.createDisplayContainer(e.getPlayerContainer();
const i);
const s = hp.createAdsLoader(n;
const e);
const o = hp.createAdsRequest(e);
const r = function(e) {
                        return [ cl ].filter((t => t.isEnabled(e)));
                    }(e), a = new vp(n, s, o, e);
                    return r.forEach((e => e.load())), this.registerAdsLoaderListeners(s, a, e, r), 
                    yield a.requestAds(), a;
                }));
            }
            static load() {
                return h(this, void 0, void 0, (function*() {
                    return bp.loadSdkPromise || (bp.loadSdkPromise = window.google && window.google.ima ? new Promise((e => e())) : Di.loadScript("//imasdk.googleapis.com/js/sdkloader/ima3.js")), 
                    bp.loadSdkPromise;
                }));
            }
            static registerAdsLoaderListeners(e, t, i, n) {
                e.addEventListener(window.google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, (e => {
                    const s = hp.getRenderingSettings();
const o = e.getAdsManager(function() {
                        const e = document.createElement("video");
                        return e.setAttribute("preload", "none"), e;
                    }(), s);
                    t.setAdsManager(o), Promise.all(n.map((e => e.init(t, i)))).then((() => {
                        t.dispatchEvent("wikiaAdsManagerLoaded"), i.getPlayerContainer().style.opacity = "1";
                    }));
                }), !1), e.addEventListener(window.google.ima.AdErrorEvent.Type.AD_ERROR, (e => {
                    const i = window.google.ima.AdError.ErrorCode.VAST_EMPTY_RESPONSE;
                    "function" == typeof e.getError && e.getError().getErrorCode() === i && t.dispatchEvent("wikiaEmptyAd"), 
                    t.setAdStatus(Gi.STATUS_ERROR);
                }));
            }
        }
        class yp {
            constructor(e) {
                this.params = e, this.lastKnownAdData = {
                    contentType: "",
                    creativeId: "",
                    lineItemId: ""
                }, this.logger = (...e) => bi(yp.LOG_GROUP, ...e), this.listeners = (Y.get("listeners.porvata") || []).filter((e => !e.isEnabled || e.isEnabled()));
            }
            init() {
                this.dispatch("init");
            }
            registerVideoEvents(e) {
                this.video = e, this.dispatch("ready"), Object.keys(yp.EVENTS).forEach((t => {
                    e.addEventListener(t, (e => {
                        let i;
let n;
                        e.getError && (i = e.getError().getErrorCode()), e.getAd && (n = e.getAd()), this.dispatch(yp.EVENTS[t], i, n);
                    }));
                }));
            }
            dispatch(e, t = 0, i) {
                const n = this.getVideoData(e;
const t;
const i);
                this.logger(e, n), this.listeners.forEach((t => {
                    t.onEvent(e, this.params, n);
                })), this.params.position && e === yp.EVENTS.viewable_impression ? Mn.get(this.params.position).emit(ki.VIDEO_VIEWED_EVENT) : this.params.position && e === yp.EVENTS.wikiaXClick && Mn.get(this.params.position).emit(yp.EVENTS.wikiaXClick);
            }
            getVideoData(e, t, i) {
                let n;
let s;
let o;
                if (i) {
                    const e = hl.getAdInfo(i);
                    n = e.contentType, s = e.creativeId, o = e.lineItemId;
                } else this.video && this.video.container && (n = this.video.container.getAttribute("data-vast-content-type"), 
                s = this.video.container.getAttribute("data-vast-creative-id"), o = this.video.container.getAttribute("data-vast-line-item-id"));
                return this.lastKnownAdData.contentType = n || this.lastKnownAdData.contentType, 
                this.lastKnownAdData.creativeId = s || this.lastKnownAdData.creativeId, this.lastKnownAdData.lineItemId = o || this.lastKnownAdData.lineItemId, 
                {
                    ad_error_code: t,
                    ad_product: this.params.adProduct,
                    audio: this.params.withAudio ? 1 : 0,
                    content_type: this.lastKnownAdData.contentType || "(none)",
                    creative_id: this.lastKnownAdData.creativeId || "",
                    ctp: this.params.withCtp ? 1 : 0,
                    event_name: e,
                    line_item_id: this.lastKnownAdData.lineItemId || "",
                    player: yp.PLAYER_NAME,
                    position: this.params.position ? this.params.position.toLowerCase() : "(none)"
                };
            }
        }
        var _p;
var Sp;
var Ep;
        yp.EVENTS = {
            adCanPlay: "ad_can_play",
            complete: "completed",
            click: "clicked",
            firstquartile: "first_quartile",
            impression: "impression",
            loaded: "loaded",
            midpoint: "midpoint",
            pause: "paused",
            resume: "resumed",
            start: "started",
            thirdquartile: "third_quartile",
            viewable_impression: "viewable_impression",
            adError: "error",
            wikiaAdPlayTriggered: "play_triggered",
            wikiaAdStop: "closed",
            wikiaAdMute: "mute",
            wikiaAdUnmute: "unmute",
            wikiaXClick: "force_close",
            wikiaInViewportWithOffer: "in_viewport_with_offer",
            wikiaInViewportWithoutOffer: "in_viewport_without_offer",
            wikiaFullscreenChange: "fullscreen_change"
        }, yp.LOG_GROUP = "porvata-listener", yp.PLAYER_NAME = "porvata", function(e) {
            e[e.DISABLED = 0] = "DISABLED", e[e.ENABLED = 1] = "ENABLED", e[e.INSECURE = 2] = "INSECURE";
        }(_p || (_p = {}));
        class wp {
            constructor(e) {
                this.params = e, this.adProduct = e.adProduct, this.autoPlay = !!e.autoPlay, this.height = e.height, 
                this.iasTracking = function(e) {
                    return "boolean" == typeof e.iasTracking ? e.iasTracking : !!Y.get("options.video.iasTracking.enabled");
                }(e), this.playerContainer = e.container, this.slotName = e.slotName, this.src = e.src, 
                this.width = e.width, this.vastUrl = e.vastUrl, this.vastTargeting = e.vastTargeting, 
                this.vpaidMode = e.vpaidMode || _p.ENABLED;
            }
            getAdProduct() {
                return this.adProduct;
            }
            getParams() {
                return this.params;
            }
            getPlayerContainer() {
                return this.playerContainer;
            }
            getSlotName() {
                return this.slotName;
            }
            getSrc() {
                return this.src;
            }
            getVpaidMode() {
                return this.vpaidMode;
            }
            getHeight() {
                return this.height;
            }
            setHeight(e) {
                this.height = e;
            }
            getWidth() {
                return this.width;
            }
            setWidth(e) {
                this.width = e;
            }
            isIasTrackingEnabled() {
                return this.iasTracking;
            }
            isAutoPlay() {
                return this.autoPlay;
            }
            setAutoPlay(e) {
                this.autoPlay = e;
            }
            getVastTargeting() {
                return this.vastTargeting;
            }
            getVastUrl() {
                return this.vastUrl;
            }
        }
        class Ap {
            static addOnViewportChangeListener(e, t) {
                return ya.addListener(e.viewportHookElement || e.container, t, {
                    offsetTop: e.viewportOffsetTop || 0,
                    offsetBottom: e.viewportOffsetBottom || 0
                });
            }
            static createVideoContainer(e) {
                const t = document.createElement("div");
const i = document.createElement("div");
                return t.classList.add("video-overlay"), i.classList.add("video-display-wrapper"), 
                t.appendChild(i), e.appendChild(t), i;
            }
            static inject(e) {
                const t = new yp({
                    adProduct: e.adProduct;
const position: e.slotName;
const src: e.src;
const withAudio: !e.autoPlay;
const withCtp: !e.autoPlay
                });
                let i = !0;
let n = !1;
let s = null;
                e.vastTargeting = e.vastTargeting || {};
                const o = new wp(e);
                return t.init(), bp.create(o).then((o => {
                    function r(t) {
                        t && !n && e.autoPlay && (o.dispatchEvent("wikiaFirstTimeInViewport"), o.play(), 
                        n = !0);
                    }
                    function a() {
                        e.startInViewportOnly || !e.autoPlay || n ? s = Ap.addOnViewportChangeListener(e, r) : (n = !0, 
                        o.play());
                    }
                    var d;
                    return t.registerVideoEvents(o), o.addEventListener("adCanPlay", (() => {
                        var t;
                        o.dispatchEvent("wikiaAdStarted"), null === (t = Mn.get(e.slotName)) || void 0 === t || t.emit(ki.VIDEO_AD_IMPRESSION);
                    })), o.addEventListener("allAdsCompleted", (() => {
                        o.isFullscreen() && o.toggleFullscreen(), o.setAutoPlay(!1), o.dispatchEvent("wikiaAdCompleted"), 
                        s && (ya.removeListener(s), s = null), i = !1, t.params.withAudio = !0, t.params.withCtp = !0;
                    })), o.addEventListener("wikiaAdRestart", (() => {
                        i = !1;
                    })), o.addEventListener("start", (() => {
                        o.dispatchEvent("wikiaAdPlay"), s || n || a();
                    })), o.addEventListener("resume", (() => {
                        o.dispatchEvent("wikiaAdPlay");
                    })), o.addEventListener("pause", (() => {
                        o.dispatchEvent("wikiaAdPause");
                    })), o.addOnDestroyCallback((() => {
                        s && (ya.removeListener(s), s = null);
                    })), e.autoPlay && (d = o).addEventListener("wikiaAdsManagerLoaded", (() => {
                        i && d.mute();
                    })), e.onReady && e.onReady(o), o.addEventListener("wikiaAdsManagerLoaded", (() => {
                        a();
                    })), o.addEventListener("wikiaEmptyAd", (() => {
                        s = Ap.addOnViewportChangeListener(e, (() => {
                            o.dispatchEvent("wikiaFirstTimeInViewport"), ya.removeListener(s);
                        }));
                    })), o;
                }));
            }
        }
        let Tp = class {
            constructor(e;
let t) {
                this.adSlot = e;
let this.params = t;
let this.state$ = new kt(1);
let this.video$ = this.state$.asObservable();
            }
            register() {
                const e = this.getPlayerParams();
                this.setCtpTargeting(e.autoPlay), Ap.inject(e).then((t => this.state$.next({
                    player: t,
                    params: e
                })));
            }
            getPlayerParams() {
                return Object.assign(Object.assign({}, this.params), {
                    vastTargeting: {},
                    autoPlay: this.isAutoPlayEnabled(),
                    container: this.createPlayerContainer(),
                    hideWhenPlaying: this.params.thumbnail
                });
            }
            createPlayerContainer() {
                const e = Ap.createVideoContainer(this.adSlot.getElement());
                return e.parentElement.classList.add(Cn.HIDDEN_AD_CLASS), e;
            }
            isAutoPlayEnabled() {
                const e = !ko(this.params);
const t = this.params.autoPlay && !e;
const i = this.params.autoPlay && e;
                return Boolean(t || i);
            }
            setCtpTargeting(e) {
                const t = e ? "" : "-audio";
const i = e ? "" : "-ctp";
                this.adSlot.setConfigProperty("slotNameSuffix", i || t || ""), this.adSlot.setTargetingConfigProperty("audio", t ? "yes" : "no"), 
                this.adSlot.setTargetingConfigProperty("ctp", i ? "yes" : "no");
            }
            discard() {
                this.state$.complete();
            }
        };
        var Ip;
var Cp;
var Np;
var Op;
        Tp = l([ N({
            autobind: !1
        }), c(0, O(_h.SLOT)), c(1, O(_h.PARAMS)), u("design:paramtypes", [ "function" == typeof (Sp = void 0 !== Cn && Cn) ? Sp : Object, "function" == typeof (Ep = void 0 !== o.UapParams && o.UapParams) ? Ep : Object ]) ], Tp);
        let Dp = Ip = class {
            constructor(e;
let t;
let i) {
                this.adSlot = e;
let this.params = t;
let this.playerRegistry = i;
let this.destroy$ = new ot;
            }
            onEnter() {
                return h(this, void 0, void 0, (function*() {
                    if (!Io.isVideoEnabled(this.params)) return this.playerRegistry.discard();
                    Mo.setupSlotVideoAdUnit(this.adSlot, this.params), this.playerRegistry.register(), 
                    this.playerRegistry.video$.pipe(Vt(1), wn((({player: e, params: t}) => this.adjustUI(e, t))), yt((({player: e}) => this.handleEvents(e))), lp(this.destroy$)).subscribe();
                }));
            }
            handleEvents(e) {
                return Lt(Vu(e, "adCanPlay").pipe(wn((() => e.dom.getVideoContainer().classList.remove(Cn.HIDDEN_AD_CLASS)))), Vu(e, "wikiaAdStarted").pipe(yt((() => Vu(e, "wikiaAdCompleted"))), (t = Ip.DEBOUNCE_TIME, 
                void 0 === i && (i = cp), Xe((function(e, n) {
                    var s = null;
var o = null;
var r = null;
var a = function() {
                        if (s) {
                            s.unsubscribe();
var s = null;
                            var e = o;
                            o = null, n.next(e);
                        }
                    };
                    function d() {
                        var e = r + t;
var o = i.now();
                        if (o < e) return s = this.schedule(void 0, e - o), void n.add(s);
                        a();
                    }
                    e.subscribe(Je(n, (function(e) {
                        o = e, r = i.now(), s || (s = i.schedule(d, t), n.add(s));
                    }), (function() {
                        a(), n.complete();
                    }), void 0, (function() {
                        o = s = null;
                    })));
                }))), wn((() => e.reload()))), Bt.action$.pipe(jt(Bt.getGlobalAction(zt.AD_ENGINE_SLOT_EVENT)), Ut((e => {
                    var t;
                    return e.event === ki.CUSTOM_EVENT && e.adSlotName === this.adSlot.getSlotName() && (null === (t = e.payload) || void 0 === t ? void 0 : t.status) === Io.SLOT_FORCE_UNSTICK;
                })), wn((() => e.stop()))));
                var t;
var i;
            }
            adjustUI(e, t) {
                (class {
                    static add(e, t) {
                        const i = document.createElement("div");
const n = document.createElement("div");
                        i.classList.add("progress-bar"), n.classList.add("current-time"), i.appendChild(n), 
                        i.pause = () => {
                            n.style.width = n.offsetWidth / i.offsetWidth * 100 + "%";
                        }, i.reset = () => {
                            n.style.transitionDuration = "", n.style.width = "0";
                        }, i.rewind = () => {
                            const e = n.style.transitionDuration;
                            i.reset(), $i.forceRepaint(n), n.style.transitionDuration = e;
                        }, i.start = () => {
                            const t = e.getRemainingTime();
                            t ? (t > 0 && (n.style.transitionDuration = `${t}s`), $i.forceRepaint(n), n.style.width = "100%") : n.style.width = "0";
                        }, e.addEventListener("wikiaAdPlay", i.start), e.addEventListener("wikiaAdCompleted", i.reset), 
                        e.addEventListener("wikiaAdRestart", i.rewind), e.addEventListener("wikiaAdPause", i.pause), 
                        t.appendChild(i);
                    }
                }).add(e, e.dom.getInterfaceContainer()), new ip("bottom-panel dynamic-panel", [ np, rp, sp ]).add(e, e.dom.getInterfaceContainer(), t), 
                class {
                    static add(e, t, i) {
                        let n;
let s;
                        const o = ui.isSmartphone() || ui.isTablet();
const r = document.createElement("div");
const a = t.querySelector(".dynamic-panel");
                        function d() {
                            s = window.setTimeout((() => {
                                r.classList.add("fading"), a.classList.add("fading");
                            }), 3e3), n = window.setTimeout((() => {
                                t.classList.remove("ui-visible");
                            }), 4e3);
                        }
                        function l() {
                            clearTimeout(n), clearTimeout(s), r.classList.remove("fading"), a.classList.remove("fading");
                        }
                        r.classList.add("toggle-ui-overlay"), e.addEventListener("start", (() => {
                            t.classList.add("ui-visible"), l(), d();
                        })), o ? (r.addEventListener("click", (() => {
                            t.classList.toggle("ui-visible"), l(), e.isPlaying() && d();
                        })), e.addEventListener("resume", d), e.addEventListener("pause", l)) : (t.addEventListener("mouseenter", (() => {
                            t.classList.add("ui-visible"), l();
                        })), t.addEventListener("mouseleave", (() => {
                            d();
                        })), r.addEventListener("click", (() => {
                            top.open(i.clickThroughURL, "_blank"), Bt.emit(zt.AD_ENGINE_VIDEO_TOGGLE_UI_OVERLAY_CLICKED, {
                                adSlotName: e.settings.getSlotName(),
                                ad_status: "video-click"
                            });
                        }))), t.appendChild(r);
                    }
                }.add(e, e.dom.getInterfaceContainer(), t), class {
                    static add(e, t) {
                        e.addEventListener("wikiaAdStarted", (() => {
                            t.classList.remove(Cn.HIDDEN_AD_CLASS);
                        })), e.addEventListener("wikiaAdCompleted", (() => {
                            t.classList.add(Cn.HIDDEN_AD_CLASS);
                        }));
                    }
                }.add(e, t.container.parentElement), class {
                    static add(e, t, i) {
                        e.addEventListener("wikiaAdStarted", (() => {
                            i.thumbnail.classList.add("hidden-state");
                        })), e.addEventListener("wikiaAdCompleted", (() => {
                            i.thumbnail.classList.remove("hidden-state");
                        }));
                    }
                }.add(e, void 0, t), class {
                    static add(e, t, i) {
                        const n = document.createElement("div");
                        n.classList.add("player-overlay"), n.classList.add("replay-overlay"), n.addEventListener("click", (() => {
                            !function(e, t, i) {
                                e.play(), e.getPlayCounter() > 1 && t.emit(i, {
                                    adSlotName: e.settings.getSlotName(),
                                    ad_status: "replay-click"
                                });
                            }(e, Bt, zt.AD_ENGINE_VIDEO_OVERLAY_CLICKED);
                        })), i.autoPlay || dp(n, i), e.addEventListener("wikiaAdCompleted", (() => {
                            dp(n, i), ap(t);
                        }));
                        const s = function(e) {
                            const t = Ch(Nh.REPLAY;
const [ "replay-icon";
const "overlay-icon" ]);
                            return e.appendChild(t), t;
                        }(n);
                        if (!i.autoPlay) {
                            const t = function(e) {
                                const t = Ch(Nh.PLAY;
const [ "play-icon";
const "overlay-icon" ]);
                                return e.appendChild(t), t;
                            }(n);
                            s.style.display = "none", e.addEventListener("start", (() => {
                                s.style.display = "", t.style.display = "none";
                            }));
                        }
                        const o = e.params && e.params.thumbnail ? e.params.thumbnail : i.thumbnail;
                        o.appendChild(n), ap(o), ap(t);
                    }
                }.add(e, e.dom.getPlayerContainer(), t), class {
                    static add(e, t, i) {
                        const n = document.createElement("div");
const s = Ch(Nh.LEARN_MORE;
const [ "learn-more-icon";
const "porvata-icon" ]);
const o = document.createElement("div");
                        o.innerText = ia("learn-more"), n.appendChild(o), n.appendChild(s), n.classList.add("learn-more"), 
                        n.addEventListener("click", (() => {
                            top.open(i.clickThroughURL, "_blank"), Bt.emit(zt.AD_ENGINE_VIDEO_LEARN_MORE_CLICKED, {
                                adSlotName: e.settings.getSlotName(),
                                ad_status: "learn-more-click"
                            });
                        })), t.appendChild(n);
                    }
                }.add(e, e.dom.getPlayerContainer(), t);
            }
            onDestroy() {
                return h(this, void 0, void 0, (function*() {
                    this.destroy$.next(), this.destroy$.complete(), this.playerRegistry.discard();
                }));
            }
        };
        function Lp(e, t) {
            return Xe((function(i, n) {
                var s = null;
var o = 0;
var r = !1;
var a = function() {
                    return r && !s && n.complete();
                };
                i.subscribe(Je(n, (function(i) {
                    null == s || s.unsubscribe();
                    var r = 0;
var d = o++;
                    ft(e(i, d)).subscribe(s = Je(n, (function(e) {
                        return n.next(t ? t(i, e, d, r++) : e);
                    }), (function() {
                        s = null, a();
                    })));
                }), (function() {
                    r = !0, a();
                })));
            }));
        }
        var Pp;
        Dp.DEBOUNCE_TIME = 10, Dp = Ip = l([ N({
            autobind: !1
        }), c(0, O(_h.SLOT)), c(1, O(_h.PARAMS)), u("design:paramtypes", [ "function" == typeof (Cp = void 0 !== Cn && Cn) ? Cp : Object, "function" == typeof (Np = void 0 !== o.UapParams && o.UapParams) ? Np : Object, "function" == typeof (Op = void 0 !== Tp && Tp) ? Op : Object ]) ], Dp);
        let kp = class {
            constructor(e) {
                this.playerRegistry = e;
let this.destroy$ = new ot;
            }
            onEnter(e) {
                return h(this, void 0, void 0, (function*() {
                    this.playerRegistry.video$.pipe(Vt(1), Ut((({params: e}) => !e.autoPlay)), Lp((({player: e}) => Vu(e, "wikiaAdStarted").pipe(Vt(1)))), wn((() => e("impact", {
                        allowMulticast: !0
                    }))), lp(this.destroy$)).subscribe();
                }));
            }
            onDestroy() {
                return h(this, void 0, void 0, (function*() {
                    this.destroy$.next(), this.destroy$.complete();
                }));
            }
        };
        var xp;
        kp = l([ N({
            autobind: !1
        }), u("design:paramtypes", [ "function" == typeof (Pp = void 0 !== Tp && Tp) ? Pp : Object ]) ], kp);
        let Rp = class {
            constructor(e) {
                this.playerRegistry = e;
let this.destroy$ = new ot;
            }
            onEnter(e) {
                return h(this, void 0, void 0, (function*() {
                    this.playerRegistry.video$.pipe(Vt(1), Lp((({player: e}) => Vu(e, "wikiaAdStarted").pipe(Mt(1)))), wn((() => e("impact", {
                        allowMulticast: !0
                    }))), lp(this.destroy$)).subscribe();
                }));
            }
            onDestroy() {
                return h(this, void 0, void 0, (function*() {
                    this.destroy$.next(), this.destroy$.complete();
                }));
            }
        };
        Rp = l([ N({
            autobind: !1
        }), u("design:paramtypes", [ "function" == typeof (xp = void 0 !== Tp && Tp) ? xp : Object ]) ], Rp);
        const Up = Symbol("navbar");
const Vp = Symbol("page");
const Mp = Symbol("footer");
        var zp;
var jp;
var Bp;
        let Fp = class {
            constructor(e;
let t;
let i) {
                this.params = e;
let this.adSlot = t;
let this.navbar = i;
            }
            getPageOffsetImpact() {
                return this.getSlotHeightImpact() + (Y.get("templates.ignoreNavbarHeight") ? 0 : this.navbar.offsetHeight);
            }
            getPageOffsetResolved() {
                return this.getSlotHeightResolved() + (Y.get("templates.ignoreNavbarHeight") ? 0 : this.navbar.offsetHeight);
            }
            getNavbarOffsetImpactToResolved() {
                return this.getSlotHeightImpactToResolved();
            }
            getNavbarOffsetResolvedToNone() {
                const e = this.getNavbarOffsetResolved() - window.scrollY;
                return e <= 0 ? 0 : e;
            }
            getNavbarOffsetResolved() {
                return this.getSlotHeightResolved();
            }
            getSlotOffsetResolvedToNone() {
                return this.getNavbarOffsetResolvedToNone() - this.getSlotHeightResolved();
            }
            getSlotHeightImpactToResolved() {
                const e = this.getSlotHeightResolved();
const t = this.getSlotHeightImpact();
                return t - (t - e) * this.getProgressImpactToResolved();
            }
            getProgressImpactToResolved() {
                const e = this.getSlotHeightResolved();
const t = this.getSlotHeightImpact();
const i = window.scrollY / (t - e);
                return i >= 1 ? 1 : i;
            }
            getSlotHeightImpact() {
                var e;
var t;
var i;
                return void 0 === (null === (i = null === (t = null === (e = this.params) || void 0 === e ? void 0 : e.config) || void 0 === t ? void 0 : t.aspectRatio) || void 0 === i ? void 0 : i.default) ? this.adSlot.element.offsetHeight : this.calculateSlotHeight(this.params.config.aspectRatio.default);
            }
            getSlotHeightResolved() {
                var e;
var t;
var i;
                return void 0 === (null === (i = null === (t = null === (e = this.params) || void 0 === e ? void 0 : e.config) || void 0 === t ? void 0 : t.aspectRatio) || void 0 === i ? void 0 : i.resolved) ? this.adSlot.element.offsetHeight : this.calculateSlotHeight(this.params.config.aspectRatio.resolved);
            }
            calculateSlotHeight(e) {
                return 1 / e * this.adSlot.element.offsetWidth;
            }
            getSlotHeightClipping() {
                const e = window.scrollY;
                return !e || e <= 0 ? "unset" : e >= this.adSlot.element.offsetHeight ? "rect(0, 0, 0, 0)" : `rect(0 ${this.adSlot.element.offsetWidth}px ${this.adSlot.element.offsetHeight - e}px 0)`;
            }
        };
        var $p;
var Gp;
var Hp;
var qp;
var Wp;
        Fp = l([ N({
            autobind: !1
        }), c(0, O(_h.PARAMS)), c(1, O(_h.SLOT)), c(2, O(Up)), u("design:paramtypes", [ "function" == typeof (zp = void 0 !== o.UapParams && o.UapParams) ? zp : Object, "function" == typeof (jp = void 0 !== Cn && Cn) ? jp : Object, "function" == typeof (Bp = "undefined" != typeof HTMLElement && HTMLElement) ? Bp : Object ]) ], Fp);
        let Kp = class {
            constructor(e;
let t;
let i;
let n;
let s) {
                this.params = e;
let this.adSlot = t;
let this.page = i;
let this.manipulator = n;
let this.reader = s;
            }
            addClassToPage(e) {
                this.manipulator.element(this.page).addClass(e);
            }
            setPageOffsetImpact() {
                this.setPageOffset(this.reader.getPageOffsetImpact());
            }
            setPageOffset(e) {
                this.manipulator.element(this.page).setProperty("marginTop", `${e}px`);
            }
            setSlotOffsetResolvedToNone() {
                this.setSlotOffset(this.reader.getSlotOffsetResolvedToNone());
            }
            setSlotOffset(e) {
                this.manipulator.element(this.adSlot.getElement()).setProperty("top", `${e}px`);
            }
            setSlotHeightImpactToResolved() {
                this.setSlotHeight(`${this.reader.getSlotHeightImpactToResolved()}px`);
            }
            setSlotHeightResolved() {
                this.setSlotHeight(`${this.reader.getSlotHeightResolved()}px`);
            }
            setSlotHeightImpact() {
                this.setSlotHeight(`${this.reader.getSlotHeightImpact()}px`);
            }
            setSlotHeight(e) {
                this.manipulator.element(this.adSlot.getElement()).setProperty("height", e);
            }
            setSlotHeightClipping() {
                this.manipulator.element(this.adSlot.getElement()).setProperty("clip", this.reader.getSlotHeightClipping());
            }
            setPlaceholderHeightResolved() {
                this.setPlaceholderHeight(`${this.reader.getSlotHeightResolved()}px`);
            }
            setPlaceholderHeightImpact() {
                this.setPlaceholderHeight(`${this.reader.getSlotHeightImpact()}px`);
            }
            setPlaceholderHeight(e) {
                let t = this.adSlot.getElement().parentElement;
                t.classList.contains("ad-slot-placeholder") && (t = t.parentElement), this.manipulator.element(t).setProperty("height", e), 
                Bt.emit(zt.AD_ENGINE_UAP_DOM_CHANGED, {
                    element: "placeholder",
                    size: e
                });
            }
            setResolvedImage() {
                this.params.image2 && this.params.image2.background ? (this.manipulator.element(this.params.image1.element).addClass("hidden-state"), 
                this.manipulator.element(this.params.image2.element).removeClass("hidden-state")) : this.params.image1 && this.manipulator.element(this.params.image1.element).removeClass("hidden-state");
            }
            setImpactImage() {
                this.params.image1 && this.manipulator.element(this.params.image1.element).removeClass("hidden-state");
            }
        };
        var Yp;
var Qp;
var Xp;
        Kp = l([ N({
            autobind: !1
        }), c(0, O(_h.PARAMS)), c(1, O(_h.SLOT)), c(2, O(Vp)), u("design:paramtypes", [ "function" == typeof ($p = void 0 !== o.UapParams && o.UapParams) ? $p : Object, "function" == typeof (Gp = void 0 !== Cn && Cn) ? Gp : Object, "function" == typeof (Hp = "undefined" != typeof HTMLElement && HTMLElement) ? Hp : Object, "function" == typeof (qp = void 0 !== Rh && Rh) ? qp : Object, "function" == typeof (Wp = void 0 !== Fp && Fp) ? Wp : Object ]) ], Kp);
        let Jp = class {
            constructor(e;
let t;
let i) {
                this.params = e;
let this.domListener = t;
let this.manager = i;
let this.unsubscribe$ = new ot;
            }
            onEnter() {
                return h(this, void 0, void 0, (function*() {
                    Y.get("state.isMobile") && this.params.thumbnail ? this.setImpactSizeOnScroll() : this.manager.setImpactImage(), 
                    this.domListener.resize$.pipe(Al({}), wn((() => {
                        this.manager.setSlotHeightImpact(), this.manager.setPlaceholderHeightImpact();
                    })), lp(this.unsubscribe$)).subscribe();
                }));
            }
            onLeave() {
                return h(this, void 0, void 0, (function*() {
                    this.unsubscribe$.next();
                }));
            }
            setImpactSizeOnScroll() {
                this.domListener.scroll$.pipe(ll((() => {
                    this.manager.setImpactImage();
                })), lp(this.unsubscribe$)).subscribe();
            }
        };
        var Zp;
        Jp = l([ N({
            autobind: !1
        }), c(0, O(_h.PARAMS)), u("design:paramtypes", [ "function" == typeof (Yp = void 0 !== o.UapParams && o.UapParams) ? Yp : Object, "function" == typeof (Qp = void 0 !== Wu && Wu) ? Qp : Object, "function" == typeof (Xp = void 0 !== Kp && Kp) ? Xp : Object ]) ], Jp);
        let eg = class {
            constructor(e) {
                this.footer = e;
            }
            useScrollCorrection() {
                const e = window.scrollY;
                return () => window.scrollBy(0, e - window.scrollY);
            }
            usePositionCorrection(e = this.footer) {
                const t = e.getBoundingClientRect().top;
                return () => window.scrollBy(0, e.getBoundingClientRect().top - t);
            }
        };
        var tg;
var ig;
var ng;
        eg = l([ N({
            autobind: !1
        }), c(0, O(Mp)), u("design:paramtypes", [ "function" == typeof (Zp = "undefined" != typeof HTMLElement && HTMLElement) ? Zp : Object ]) ], eg);
        let sg = tg = class {
            static provide(e) {
                return {
                    bind: tg;
let provider: t => new tg(t.get(_h.SLOT);
let t.get(_h.PARAMS);
let e)
                };
            }
            constructor(e, t, i) {
                this.adSlot = e, this.fallbackTimeout = i;
            }
            isViewedAndDelayed() {
                return Lt(Cl(!1), Dt(this.adSlot.loaded.then((() => en(this.fallbackTimeout)))).pipe(et((() => !0))));
            }
        };
        var og;
var rg;
var ag;
var dg;
var lg;
        sg = tg = l([ N({
            autobind: !1
        }), c(0, O(_h.SLOT)), c(1, O(_h.PARAMS)), u("design:paramtypes", [ "function" == typeof (ig = void 0 !== Cn && Cn) ? ig : Object, "function" == typeof (ng = void 0 !== o.UapParams && o.UapParams) ? ng : Object, Number ]) ], sg);
        let cg = class {
            constructor(e;
let t;
let i;
let n;
let s) {
                this.adSlot = e;
let this.domListener = t;
let this.scrollCorrector = i;
let this.reader = n;
let this.timeout = s;
let this.unsubscribe$ = new ot;
            }
            onEnter(e) {
                return h(this, void 0, void 0, (function*() {
                    this.domListener.scroll$.pipe(Al({}), ul(this.timeout.isViewedAndDelayed()), Ut((() => this.reachedResolvedSize())), wn((([, t]) => {
                        const i = this.scrollCorrector.usePositionCorrection();
                        t ? (this.adSlot.emitEvent(Io.SLOT_STICKY_STATE_SKIPPED), e("transition").then(i)) : e("sticky").then(i);
                    })), lp(this.unsubscribe$)).subscribe();
                }));
            }
            reachedResolvedSize() {
                return 1 === this.reader.getProgressImpactToResolved();
            }
            onLeave() {
                return h(this, void 0, void 0, (function*() {
                    this.unsubscribe$.next();
                }));
            }
        };
        var ug;
var hg;
        cg = l([ N({
            autobind: !1
        }), c(0, O(_h.SLOT)), u("design:paramtypes", [ "function" == typeof (og = void 0 !== Cn && Cn) ? og : Object, "function" == typeof (rg = void 0 !== Wu && Wu) ? rg : Object, "function" == typeof (ag = void 0 !== eg && eg) ? ag : Object, "function" == typeof (dg = void 0 !== Fp && Fp) ? dg : Object, "function" == typeof (lg = void 0 !== sg && sg) ? lg : Object ]) ], cg);
        let pg = class {
            constructor(e;
let t) {
                this.domListener = e;
let this.manager = t;
let this.unsubscribe$ = new ot;
            }
            onEnter() {
                return h(this, void 0, void 0, (function*() {
                    Lt(this.domListener.resize$, this.domListener.scroll$).pipe(Al({}), wn((() => this.manager.setSlotHeightClipping())), lp(this.unsubscribe$)).subscribe();
                }));
            }
            onLeave() {
                return h(this, void 0, void 0, (function*() {
                    this.unsubscribe$.next();
                }));
            }
        };
        function gg(...e) {
            return function(...e) {
                return t => t.pipe(Lp((t => Lt(...e).pipe(et((() => t))))));
            }(...e, Cl({}));
        }
        var mg;
var fg;
        pg = l([ N({
            autobind: !1
        }), u("design:paramtypes", [ "function" == typeof (ug = void 0 !== Wu && Wu) ? ug : Object, "function" == typeof (hg = void 0 !== Kp && Kp) ? hg : Object ]) ], pg);
        let vg = class {
            constructor(e;
let t) {
                this.params = e;
let this.reader = t;
            }
            getVideoSizeImpact() {
                return this.calculateVideoSize(this.reader.getSlotHeightImpact(), 0);
            }
            getVideoSizeResolved() {
                return this.calculateVideoSize(this.reader.getSlotHeightResolved(), 1);
            }
            getVideoSizeImpactToResolved() {
                return this.calculateVideoSize(this.reader.getSlotHeightImpactToResolved(), this.reader.getProgressImpactToResolved());
            }
            calculateVideoSize(e, t) {
                if (!this.params.config) return;
                const {height: i;
const width: n} = this.getSize(e;
const t);
                return {
                    top: this.getPercentage(t, this.params.config.state.top),
                    right: this.getPercentage(t, this.params.config.state.right),
                    bottom: this.getPercentage(t, this.params.config.state.bottom),
                    height: Math.ceil(i),
                    width: Math.ceil(n)
                };
            }
            getSize(e, t) {
                if (!this.params.config) return;
                const i = e * (this.getPercentage(t;
const this.params.config.state.height) / 100);
                return {
                    height: i,
                    width: i * (16 / 9)
                };
            }
            getPercentage(e, t) {
                if (!t) return;
                const {default: i;
const resolved: n} = t;
                return i - (i - n) * e;
            }
        };
        var bg;
var yg;
var _g;
        vg = l([ N({
            autobind: !1
        }), c(0, O(_h.PARAMS)), u("design:paramtypes", [ "function" == typeof (mg = void 0 !== o.UapParams && o.UapParams) ? mg : Object, "function" == typeof (fg = void 0 !== Fp && Fp) ? fg : Object ]) ], vg);
        let Sg = class {
            constructor(e;
let t;
let i) {
                this.manipulator = e;
let this.reader = t;
let this.params = i;
            }
            setVideoSizeResolved(e) {
                if (!e.isFullscreen()) return this.setVideoSize(e, this.reader.getVideoSizeResolved());
            }
            setVideoSizeImpact(e) {
                if (!e.isFullscreen()) return this.setVideoSize(e, this.reader.getVideoSizeImpact());
            }
            setVideoSizeImpactToResolved(e) {
                if (!e.isFullscreen()) return this.setVideoSize(e, this.reader.getVideoSizeImpactToResolved());
            }
            setVideoSize(e, t) {
                e.resize(t.width, t.height);
                const i = e.dom.getPlayerContainer().parentElement;
const n = this.params.thumbnail;
                this.setProperties(i, t), this.setProperties(n, t);
            }
            setProperties(e, {width: t, height: i, top: n, right: s, bottom: o}) {
                this.manipulator.element(e).setProperty("width", `${t}px`), this.manipulator.element(e).setProperty("height", `${i}px`), 
                "number" == typeof n && this.manipulator.element(e).setProperty("top", `${n}%`), 
                "number" == typeof s && this.manipulator.element(e).setProperty("right", `${s}%`), 
                "number" == typeof o && this.manipulator.element(e).setProperty("bottom", `${o}%`);
            }
        };
        var Eg;
var wg;
var Ag;
        Sg = l([ N({
            autobind: !1
        }), c(2, O(_h.PARAMS)), u("design:paramtypes", [ "function" == typeof (bg = void 0 !== Rh && Rh) ? bg : Object, "function" == typeof (yg = void 0 !== vg && vg) ? yg : Object, "function" == typeof (_g = void 0 !== o.UapParams && o.UapParams) ? _g : Object ]) ], Sg);
        let Tg = class {
            constructor(e;
let t;
let i) {
                this.playerRegistry = e;
let this.domListener = t;
let this.manager = i;
let this.unsubscribe$ = new ot;
            }
            onEnter() {
                return h(this, void 0, void 0, (function*() {
                    this.playerRegistry.video$.pipe(gg(this.domListener.scroll$, this.domListener.resize$), wn((({player: e}) => this.manager.setVideoSizeImpactToResolved(e))), lp(this.unsubscribe$)).subscribe();
                }));
            }
            onLeave() {
                return h(this, void 0, void 0, (function*() {
                    this.unsubscribe$.next();
                }));
            }
        };
        var Ig;
var Cg;
        Tg = l([ N({
            autobind: !1
        }), u("design:paramtypes", [ "function" == typeof (Eg = void 0 !== Tp && Tp) ? Eg : Object, "function" == typeof (wg = void 0 !== Wu && Wu) ? wg : Object, "function" == typeof (Ag = void 0 !== Sg && Sg) ? Ag : Object ]) ], Tg);
        let Ng = class {
            constructor(e;
let t) {
                this.adSlot = e;
let this.playerRegistry = t;
let this.unsubscribe$ = new ot;
            }
            onEnter(e) {
                return h(this, void 0, void 0, (function*() {
                    this.playerRegistry.video$.pipe(Lp((({player: e}) => Vu(e, "wikiaAdCompleted"))), wn((() => {
                        this.adSlot.emitEvent(Io.SLOT_VIDEO_DONE), e("resolved");
                    })), lp(this.unsubscribe$)).subscribe();
                }));
            }
            onLeave() {
                return h(this, void 0, void 0, (function*() {
                    this.unsubscribe$.next();
                }));
            }
        };
        var Og;
var Dg;
        Ng = l([ N({
            autobind: !1
        }), c(0, O(_h.SLOT)), u("design:paramtypes", [ "function" == typeof (Ig = void 0 !== Cn && Cn) ? Ig : Object, "function" == typeof (Cg = void 0 !== Tp && Tp) ? Cg : Object ]) ], Ng);
        let Lg = class {
            constructor(e;
let t) {
                this.domListener = e;
let this.manager = t;
let this.unsubscribe$ = new ot;
            }
            onEnter() {
                return h(this, void 0, void 0, (function*() {
                    this.manager.setResolvedImage(), this.domListener.resize$.pipe(Al({}), wn((() => {
                        this.manager.setSlotHeightResolved(), this.manager.setPlaceholderHeightResolved();
                    })), lp(this.unsubscribe$)).subscribe();
                }));
            }
            onLeave() {
                return h(this, void 0, void 0, (function*() {
                    this.unsubscribe$.next();
                }));
            }
        };
        var Pg;
var kg;
var xg;
        Lg = l([ N({
            autobind: !1
        }), u("design:paramtypes", [ "function" == typeof (Og = void 0 !== Wu && Wu) ? Og : Object, "function" == typeof (Dg = void 0 !== Kp && Kp) ? Dg : Object ]) ], Lg);
        let Rg = class {
            constructor(e;
let t;
let i) {
                this.adSlot = e;
let this.domListener = t;
let this.timeout = i;
let this.unsubscribe$ = new ot;
            }
            onEnter(e) {
                return h(this, void 0, void 0, (function*() {
                    this.adSlot.emitEvent(Io.SLOT_STICKED_STATE), this.timeout.isViewedAndDelayed().pipe(Ut((e => e)), Lp((() => this.domListener.scroll$.pipe(Vt(1)))), wn((() => {
                        this.adSlot.emitEvent(Io.SLOT_UNSTICKED_STATE), e("transition");
                    })), lp(this.unsubscribe$)).subscribe();
                }));
            }
            onLeave() {
                return h(this, void 0, void 0, (function*() {
                    this.unsubscribe$.next();
                }));
            }
        };
        var Ug;
var Vg;
        Rg = l([ N({
            autobind: !1
        }), c(0, O(_h.SLOT)), u("design:paramtypes", [ "function" == typeof (Pg = void 0 !== Cn && Cn) ? Pg : Object, "function" == typeof (kg = void 0 !== Wu && Wu) ? kg : Object, "function" == typeof (xg = void 0 !== sg && sg) ? xg : Object ]) ], Rg);
        let Mg = class {
            constructor(e;
let t) {
                this.adSlot = e;
let this.manager = t;
let this.unsubscribe$ = new ot;
            }
            onEnter() {
                return h(this, void 0, void 0, (function*() {
                    this.manager.addClassToPage("uap-sticked"), this.adSlot.addClass("uap-toc-pusher");
                }));
            }
            onLeave() {
                return h(this, void 0, void 0, (function*() {
                    this.unsubscribe$.next();
                }));
            }
        };
        var zg;
var jg;
        Mg = l([ N({
            autobind: !1
        }), c(0, O(_h.SLOT)), u("design:paramtypes", [ "function" == typeof (Ug = void 0 !== Cn && Cn) ? Ug : Object, "function" == typeof (Vg = void 0 !== Kp && Kp) ? Vg : Object ]) ], Mg);
        let Bg = class {
            constructor(e;
let t) {
                this.adSlot = e;
let this.domListener = t;
            }
            appendOnViewed(e) {
                return Dt(this.adSlot.viewed).pipe(Al({}), Vt(1), wn((() => this.adSlot.getElement().appendChild(e))));
            }
            appendOnScroll(e) {
                return this.domListener.scroll$.pipe(Al({}), Ut((() => window.scrollY > 0)), Vt(1), wn((() => this.adSlot.getElement().appendChild(e))));
            }
        };
        var Fg;
var $g;
        Bg = l([ N({
            autobind: !1
        }), c(0, O(_h.SLOT)), u("design:paramtypes", [ "function" == typeof (zg = void 0 !== Cn && Cn) ? zg : Object, "function" == typeof (jg = void 0 !== Wu && Wu) ? jg : Object ]) ], Bg);
        let Gg = class {
            constructor(e;
let t) {
                this.adSlot = e;
let this.helper = t;
let this.unsubscribe$ = new ot;
            }
            onEnter(e) {
                return h(this, void 0, void 0, (function*() {
                    this.button = new Oh({
                        onClick: () => {
                            this.adSlot.emitEvent(Io.SLOT_FORCE_UNSTICK), e("transition");
                        }
                    }).render(), this.helper.appendOnScroll(this.button).pipe(lp(this.unsubscribe$)).subscribe();
                }));
            }
            onLeave() {
                return h(this, void 0, void 0, (function*() {
                    this.unsubscribe$.next(), this.button.remove();
                }));
            }
        };
        var Hg;
var qg;
var Wg;
        Gg = l([ N({
            autobind: !1
        }), c(0, O(_h.SLOT)), u("design:paramtypes", [ "function" == typeof (Fg = void 0 !== Cn && Cn) ? Fg : Object, "function" == typeof ($g = void 0 !== Bg && Bg) ? $g : Object ]) ], Gg);
        let Kg = class {
            constructor(e;
let t;
let i) {
                this.playerRegistry = e;
let this.domListener = t;
let this.manager = i;
let this.unsubscribe$ = new ot;
            }
            onEnter() {
                return h(this, void 0, void 0, (function*() {
                    this.playerRegistry.video$.pipe(gg(this.domListener.resize$), wn((({player: e}) => this.manager.setVideoSizeResolved(e))), lp(this.unsubscribe$)).subscribe();
                }));
            }
            onLeave() {
                return h(this, void 0, void 0, (function*() {
                    this.unsubscribe$.next();
                }));
            }
        };
        var Yg;
var Qg;
var Xg;
var Jg;
        Kg = l([ N({
            autobind: !1
        }), u("design:paramtypes", [ "function" == typeof (Hg = void 0 !== Tp && Tp) ? Hg : Object, "function" == typeof (qg = void 0 !== Wu && Wu) ? qg : Object, "function" == typeof (Wg = void 0 !== Sg && Sg) ? Wg : Object ]) ], Kg);
        let Zg = class {
            constructor(e;
let t;
let i;
let n) {
                this.adSlot = e;
let this.scrollCorrector = t;
let this.manipulator = i;
let this.reader = n;
let this.unsubscribe$ = new ot;
            }
            onEnter(e) {
                return h(this, void 0, void 0, (function*() {
                    this.animate().pipe(wn((() => {
                        const t = this.scrollCorrector.useScrollCorrection();
                        this.adSlot.removeClass("uap-toc-pusher"), e("resolved").then(t);
                    })), lp(this.unsubscribe$)).subscribe();
                }));
            }
            animate() {
                const e = Io.SLIDE_OUT_TIME;
                return this.manipulator.element(this.adSlot.getElement()).setProperty("transition", `top ${e}ms ${Io.CSS_TIMING_EASE_IN_CUBIC}`).setProperty("top", `${this.reader.getSlotOffsetResolvedToNone()}px`), 
                Dt(en(e));
            }
            onLeave() {
                return h(this, void 0, void 0, (function*() {
                    this.unsubscribe$.next();
                }));
            }
        };
        function em() {
            return [ {
                bind: Up,
                value: document.querySelector(".fandom-sticky-header")
            }, {
                bind: Vp,
                value: document.body
            }, {
                bind: Mp,
                value: document.querySelector(".global-footer")
            } ];
        }
        var tm;
        Zg = l([ N({
            autobind: !1
        }), c(0, O(_h.SLOT)), u("design:paramtypes", [ "function" == typeof (Yg = void 0 !== Cn && Cn) ? Yg : Object, "function" == typeof (Qg = void 0 !== eg && eg) ? Qg : Object, "function" == typeof (Xg = void 0 !== Rh && Rh) ? Xg : Object, "function" == typeof (Jg = void 0 !== Fp && Fp) ? Jg : Object ]) ], Zg);
        let im = class {
            constructor(e) {
                this.params = e;
let this.enabledSlots = [ "top_boxad";
let "incontent_boxad_1";
let "bottom_leaderboard";
let "gallery_leaderboard" ];
            }
            onEnter() {
                return h(this, void 0, void 0, (function*() {
                    this.configureFloorAdhesionExperiment(), this.params.newTakeoverConfig && Bt.emit(zt.AD_ENGINE_UAP_NTC_LOADED), 
                    Io.init(this.params, this.enabledSlots, Object.keys(Y.get("slots") || []).filter((e => !this.enabledSlots.includes(e)))), 
                    Y.set("slots.bottom_leaderboard.viewportConflicts", []), Mo.setSlotSize("bottom_leaderboard", Io.UAP_ADDITIONAL_SIZES.bfaSize.desktop), 
                    Mo.addSlotSize("bottom_leaderboard", Io.UAP_ADDITIONAL_SIZES.bfaSize.unified);
                }));
            }
            configureFloorAdhesionExperiment() {
                Y.get("options.ntc.floorEnabled") && (this.enabledSlots = [ "top_boxad", "incontent_boxad_1", "bottom_leaderboard", "floor_adhesion" ], 
                document.body.classList.add("floor-adhesion-experiment"));
            }
        };
        var nm;
var sm;
var om;
        im = l([ N({
            autobind: !1
        }), c(0, O(_h.PARAMS)), u("design:paramtypes", [ "function" == typeof (tm = void 0 !== o.UapParams && o.UapParams) ? tm : Object ]) ], im);
        let rm = nm = class {
            constructor(e;
let t) {
                this.adSlot = e;
let this.params = t;
let this.logger = (...e) => bi(nm.LOG_GROUP;
let ...e);
            }
            onEnter(e) {
                return h(this, void 0, void 0, (function*() {
                    this.logger("onEnter", this.params), this.adSlot.setConfigProperty("showManually", !0), 
                    this.adSlot.addClass("expanded-slot"), this.adSlot.addClass("bfab-template"), this.adSlot.getAdContainer().classList.add("iframe-container"), 
                    this.ensureImage(), yield $i.onReady(this.adSlot), yield this.awaitVisibleDOM(), 
                    ko(this.params) ? e("resolved") : (xo(), e("impact"));
                }));
            }
            ensureImage() {
                this.logger("ensureImage", this.params.image1, this.params.image2), this.params.image2 && this.params.image2.background || this.params.image1.element.classList.remove("hidden-state");
            }
            awaitVisibleDOM() {
                return h(this, void 0, void 0, (function*() {
                    document.hidden && (yield nn(window, "visibilitychange"));
                }));
            }
            onLeave() {
                return h(this, void 0, void 0, (function*() {
                    this.adSlot.show();
                }));
            }
        };
        var am;
var dm;
        rm.LOG_GROUP = "BfabBootstrapHandler", rm = nm = l([ N({
            autobind: !1
        }), c(0, O(_h.SLOT)), c(1, O(_h.PARAMS)), u("design:paramtypes", [ "function" == typeof (sm = void 0 !== Cn && Cn) ? sm : Object, "function" == typeof (om = void 0 !== o.UapParams && o.UapParams) ? om : Object ]) ], rm);
        let lm = class {
            constructor(e;
let t) {
                this.domListener = e;
let this.manager = t;
let this.unsubscribe$ = new ot;
            }
            onEnter() {
                return h(this, void 0, void 0, (function*() {
                    this.manager.setImpactImage(), this.domListener.resize$.pipe(Al({}), wn((() => tn((() => this.manager.setSlotHeightImpact())))), lp(this.unsubscribe$)).subscribe();
                }));
            }
            onLeave() {
                return h(this, void 0, void 0, (function*() {
                    this.unsubscribe$.next();
                }));
            }
        };
        var cm;
var um;
var hm;
        lm = l([ N({
            autobind: !1
        }), u("design:paramtypes", [ "function" == typeof (am = void 0 !== Wu && Wu) ? am : Object, "function" == typeof (dm = void 0 !== Kp && Kp) ? dm : Object ]) ], lm);
        let pm = class {
            constructor(e;
let t;
let i) {
                this.playerRegistry = e;
let this.domListener = t;
let this.manager = i;
let this.unsubscribe$ = new ot;
            }
            onEnter() {
                return h(this, void 0, void 0, (function*() {
                    this.playerRegistry.video$.pipe(gg(this.domListener.resize$), wn((({player: e}) => tn((() => this.manager.setVideoSizeImpact(e))))), lp(this.unsubscribe$)).subscribe();
                }));
            }
            onLeave() {
                return h(this, void 0, void 0, (function*() {
                    this.unsubscribe$.next();
                }));
            }
        };
        var gm;
var mm;
        pm = l([ N({
            autobind: !1
        }), u("design:paramtypes", [ "function" == typeof (cm = void 0 !== Tp && Tp) ? cm : Object, "function" == typeof (um = void 0 !== Wu && Wu) ? um : Object, "function" == typeof (hm = void 0 !== Sg && Sg) ? hm : Object ]) ], pm);
        let fm = class {
            constructor(e;
let t) {
                this.domListener = e;
let this.manager = t;
let this.unsubscribe$ = new ot;
            }
            onEnter() {
                return h(this, void 0, void 0, (function*() {
                    this.manager.setResolvedImage(), this.domListener.resize$.pipe(Al({}), wn((() => {
                        this.manager.setSlotHeightResolved();
                    })), lp(this.unsubscribe$)).subscribe();
                }));
            }
            onLeave() {
                return h(this, void 0, void 0, (function*() {
                    this.unsubscribe$.next();
                }));
            }
        };
        fm = l([ N({
            autobind: !1
        }), u("design:paramtypes", [ "function" == typeof (gm = void 0 !== Wu && Wu) ? gm : Object, "function" == typeof (mm = void 0 !== Kp && Kp) ? mm : Object ]) ], fm);
        var vm;
var bm;
var ym = new Ke(Pe);
        function _m(e, t, i) {
            void 0 === e && (e = 0), void 0 === i && (i = up);
            var n = -1;
            return null != t && (Et(t) ? i = t : n = t), new Ke((function(t) {
                var s;
var o = (s = e) instanceof Date && !isNaN(s) ? +e - i.now() : e;
                o < 0 && (o = 0);
                var r = 0;
                return i.schedule((function() {
                    t.closed || (t.next(r++), 0 <= n ? this.schedule(void 0, n) : t.complete());
                }), o);
            }));
        }
        let Sm = class {
            constructor(e;
let t) {
                this.adSlot = e;
let this.unsubscribe$ = new ot;
let this.additionalHideTime = t.get("icFloorAdhesionDelay");
let this.timeoutHideTime = t.get("icFloorAdhesionTimeout");
            }
            onEnter(e) {
                return h(this, void 0, void 0, (function*() {
                    Lt(this.getViewabilityStream(), this.getTimeoutStream()).pipe(Vt(1), wn((() => e("transition"))), lp(this.unsubscribe$)).subscribe();
                }));
            }
            getViewabilityStream() {
                return -1 === this.additionalHideTime ? ym : Dt(this.adSlot.viewed).pipe(yt((() => _m(this.additionalHideTime))));
            }
            getTimeoutStream() {
                return this.timeoutHideTime ? _m(this.timeoutHideTime) : St;
            }
            onLeave() {
                return h(this, void 0, void 0, (function*() {
                    this.unsubscribe$.next();
                }));
            }
        };
        var Em;
var wm;
        Sm = l([ N({
            autobind: !1
        }), c(0, O(_h.SLOT)), u("design:paramtypes", [ "function" == typeof (vm = void 0 !== Cn && Cn) ? vm : Object, "function" == typeof (bm = void 0 !== Oi && Oi) ? bm : Object ]) ], Sm);
        let Am = class {
            constructor(e;
let t) {
                this.adSlot = e;
let this.manipulator = t;
let this.unsubscribe$ = new ot;
            }
            onEnter(e) {
                return h(this, void 0, void 0, (function*() {
                    this.animate().pipe(wn((() => {
                        e("hidden");
                    })), lp(this.unsubscribe$)).subscribe();
                }));
            }
            animate() {
                const e = this.adSlot.getElement().offsetHeight;
                return this.manipulator.element(this.adSlot.getElement()).setProperty("transition", `bottom 600ms ${Io.CSS_TIMING_EASE_IN_CUBIC}, opacity 400ms ${Io.CSS_TIMING_EASE_IN_CUBIC}`).setProperty("opacity", "0").setProperty("bottom", `-${e}px`), 
                _m(1e3);
            }
            onLeave() {
                return h(this, void 0, void 0, (function*() {
                    this.unsubscribe$.next();
                }));
            }
        };
        var Tm;
        Am = l([ N({
            autobind: !1
        }), c(0, O(_h.SLOT)), u("design:paramtypes", [ "function" == typeof (Em = void 0 !== Cn && Cn) ? Em : Object, "function" == typeof (wm = void 0 !== Rh && Rh) ? wm : Object ]) ], Am);
        let Im = class {
            constructor(e) {
                this.adSlot = e;
            }
            onEnter(e) {
                return h(this, void 0, void 0, (function*() {
                    this.adSlot.setConfigProperty("showManually", !0), this.adSlot.addClass(Cn.HIDDEN_AD_CLASS), 
                    this.adSlot.addClass("floor-adhesion"), this.adSlot.addClass("out-of-page-template"), 
                    this.adSlot.isOutOfPage() && (yield $i.adjustIframeByContentSize(this.adSlot)), 
                    e("display");
                }));
            }
            onLeave() {
                return h(this, void 0, void 0, (function*() {
                    this.adSlot.show();
                }));
            }
        };
        var Cm;
        Im = l([ N({
            autobind: !1
        }), c(0, O(_h.SLOT)), u("design:paramtypes", [ "function" == typeof (Tm = void 0 !== Cn && Cn) ? Tm : Object ]) ], Im);
        const Nm = Symbol("Roadblock Config");
        let Om = class {
            static config(e) {
                return {
                    bind: Nm;
let value: e
                };
            }
            constructor(e, t) {
                this.params = e, this.config = t;
            }
            onEnter() {
                return h(this, void 0, void 0, (function*() {
                    this.params.adProduct = "ruap", this.params.newTakeoverConfig && (Y.get("state.isMobile") && this.config.enabledSlots.push("floor_adhesion"), 
                    Bt.emit(zt.AD_ENGINE_UAP_NTC_LOADED)), this.params.stickedTlb && Y.set("templates.stickyTlb.forced", !0), 
                    Io.init(this.params, this.config.enabledSlots, this.config.disableSlots);
                }));
            }
        };
        var Dm;
var Lm;
        Om = l([ N({
            autobind: !1
        }), c(0, O(_h.PARAMS)), c(1, O(Nm)), u("design:paramtypes", [ "function" == typeof (Cm = void 0 !== r.RoadblockParams && r.RoadblockParams) ? Cm : Object, Object ]) ], Om);
        let Pm = Dm = class {
            constructor(e) {
                this.adSlot = e;
            }
            onEnter(e) {
                return h(this, void 0, void 0, (function*() {
                    (yield this.isUAP()) ? this.blockStickyTLB("UAP") : this.isStickyTlbForced() || this.enabledByLine() || this.enabledByOrder() ? lc.isBlocking() ? this.blockStickyTLB("AdBlock") : e("initial") : this.blockStickyTLB(`Line item ID ${this.adSlot.lineItemId}`);
                }));
            }
            blockStickyTLB(e) {
                this.adSlot.emitEvent(Io.SLOT_STICKINESS_DISABLED), this.logger(`Template 'stickyTlb' could not be applied for ${e}`);
            }
            enabledByLine() {
                const e = Y.get("templates.stickyTlb.lineItemIds") || [];
                return this.checkRolloutVariable(this.adSlot.lineItemId, e);
            }
            enabledByOrder() {
                const e = Y.get("templates.stickyTlb.ordersIds") || [];
                return this.checkRolloutVariable(this.adSlot.orderId, e);
            }
            checkRolloutVariable(e, t) {
                return !!(e && t && Array.isArray(t)) && t.some((t => t.toString() === e.toString()));
            }
            isUAP() {
                return h(this, void 0, void 0, (function*() {
                    return new Promise((e => {
                        Bt.on(zt.AD_ENGINE_UAP_LOAD_STATUS, (t => {
                            e(t.isLoaded);
                        }));
                    }));
                }));
            }
            isStickyTlbForced() {
                return Y.get("templates.stickyTlb.forced");
            }
            logger(...e) {
                bi(Dm.LOG_GROUP, ...e);
            }
        };
        var km;
        Pm.LOG_GROUP = "sticky-tlb", Pm = Dm = l([ N({
            autobind: !1
        }), c(0, O(_h.SLOT)), u("design:paramtypes", [ "function" == typeof (Lm = void 0 !== Cn && Cn) ? Lm : Object ]) ], Pm);
        let xm = class {
            constructor(e) {
                this.adSlot = e;
            }
            onEnter(e) {
                return h(this, void 0, void 0, (function*() {
                    yield $i.onReady(this.adSlot), yield this.awaitVisibleDOM(), e("sticky");
                }));
            }
            awaitVisibleDOM() {
                return h(this, void 0, void 0, (function*() {
                    document.hidden && (yield nn(window, "visibilitychange"));
                }));
            }
        };
        var Rm;
        xm = l([ N({
            autobind: !1
        }), c(0, O(_h.SLOT)), u("design:paramtypes", [ "function" == typeof (km = void 0 !== Cn && Cn) ? km : Object ]) ], xm);
        let Um = class {
            constructor(e) {
                this.adSlot = e;
            }
            onEnter() {
                return h(this, void 0, void 0, (function*() {
                    this.adSlot.setConfigProperty("showManually", !0), this.adSlot.addClass("expanded-slot"), 
                    this.adSlot.addClass("sticky-tlb"), this.adSlot.setConfigProperty("useGptOnloadEvent", !0), 
                    this.adSlot.loaded.then((() => {
                        this.adSlot.emitEvent(Io.SLOT_STICKY_READY_STATE);
                    }));
                }));
            }
            onLeave() {
                return h(this, void 0, void 0, (function*() {
                    this.adSlot.show(), document.body.classList.add("has-uap"), document.body.classList.add("has-sticky-tlb");
                }));
            }
            onDestroy() {
                return h(this, void 0, void 0, (function*() {
                    document.body.classList.remove("has-uap"), document.body.classList.remove("has-sticky-tlb");
                }));
            }
        };
        var Vm;
var Mm;
        Um = l([ N({
            autobind: !1
        }), c(0, O(_h.SLOT)), u("design:paramtypes", [ "function" == typeof (Rm = void 0 !== Cn && Cn) ? Rm : Object ]) ], Um);
        let zm = class {
            constructor(e;
let t) {
                this.adSlot = e;
let this.helper = t;
let this.unsubscribe$ = new ot;
            }
            onEnter(e) {
                return h(this, void 0, void 0, (function*() {
                    this.button = new Oh({
                        onClick: () => {
                            this.adSlot.emitEvent(Io.SLOT_FORCE_UNSTICK), e("hidden");
                        }
                    }).render(), this.helper.appendOnScroll(this.button).pipe(lp(this.unsubscribe$)).subscribe();
                }));
            }
            onLeave() {
                return h(this, void 0, void 0, (function*() {
                    this.unsubscribe$.next(), this.button.remove();
                }));
            }
        };
        var jm;
var Bm;
        zm = l([ N({
            autobind: !1
        }), c(0, O(_h.SLOT)), u("design:paramtypes", [ "function" == typeof (Vm = void 0 !== Cn && Cn) ? Vm : Object, "function" == typeof (Mm = void 0 !== Bg && Bg) ? Mm : Object ]) ], zm);
        let Fm = class {
            constructor(e;
let t) {
                this.registry = e;
let this.stickedBoxadHelper = t;
let An.setInitializer(this.registry);
            }
            execute() {
                const e = this.registry.register("bfaa";
const {
                    initial: [ im;
const tp;
const Dp;
const kp;
const Rp;
const Eh;
const Ph ];
const impact: [ Jp;
const cg;
const pg;
const Tg;
const Ng;
const Vh ];
const sticky: [ Lg;
const Rg;
const Mg;
const Gg;
const Kg;
const Vh ];
const transition: [ Lg;
const Mg;
const Zg;
const Kg;
const Vh ];
const resolved: [ Lg;
const pg;
const Kg;
const Vh ]
                };
const "initial";
const [ eg;
const Tp;
const Rh;
const Kp;
const Fp;
const vg;
const Sg;
const Bg;
const sg.provide(Io.BFAA_UNSTICK_DELAY);
const em() ]);
const t = this.registry.register("bfab";
const {
                    initial: [ rm;
const Dp;
const Eh;
const Ph ];
const impact: [ lm;
const pm;
const Ng;
const Vh ];
const resolved: [ fm;
const Kg;
const Vh ]
                };
const "initial";
const [ Tp;
const Rh;
const Kp;
const Fp;
const vg;
const Sg;
const em() ]);
const i = function(e) {
                    return e.register("stickyTlb";
const {
                        blocking: [ Pm ];
const initial: [ xm;
const Um;
const Eh;
const Ph ];
const sticky: [ Lg;
const Rg;
const zm;
const Vh;
const Mg ];
const transition: [ Lg;
const Zg;
const Vh;
const Mg ];
const resolved: [ Lg;
const pg;
const Vh ];
const hidden: [ Gh;
const Vh ]
                    };
const "blocking";
const [ Rh;
const Kp;
const Fp;
const eg;
const Bg;
const sg.provide(Io.TLB_UNSTICK_DELAY);
const em() ]);
                }(this.registry), n = function(e) {
                    return e.register("roadblock", {
                        initial: [ Om ]
                    }, "initial", [ Om.config({
                        enabledSlots: [ "top_boxad" ],
                        disableSlots: [ "floor_adhesion" ]
                    }) ]);
                }(this.registry), s = function(e) {
                    return e.register("floorAdhesion", {
                        initial: [ Im, Ph ],
                        display: [ Sm, Lh, Vh ],
                        transition: [ Am, Vh ],
                        hidden: [ Gh, Vh ]
                    }, "initial", [ Rh ]);
                }(this.registry), o = function(e) {
                    return e.register("interstitial", {
                        initial: [ zh, Eh, Ph ],
                        display: [ Lh, Bh, Vh ],
                        hidden: [ Gh, Vh ]
                    }, "initial", [ Rh ]);
                }(this.registry);
                Lt(e, t, i, n, s, o).subscribe((e => {
                    bi(`TemplateLogger - ${e.templateName}\n`, `StateName: ${e.stateName}, Type: ${e.type}`);
                })), this.stickedBoxadHelper.initialize({
                    slotName: "top_boxad",
                    pusherSlotName: "top_leaderboard",
                    pageSelector: ".page",
                    railSelector: ".main-page-tag-rcs #top_boxad, #rail-boxad-wrapper"
                });
            }
        };
        var $m;
var Gm;
        Fm = l([ N(), u("design:paramtypes", [ "function" == typeof (jm = void 0 !== Jh && Jh) ? jm : Object, "function" == typeof (Bm = void 0 !== Hh && Hh) ? Bm : Object ]) ], Fm);
        let Hm = class {
            constructor(e;
let t) {
                this.pipeline = e;
let this.noAdsDetector = t;
            }
            execute() {
                var e;
                this.pipeline.add((() => Y.extend(ol)), Q, function(...e) {
                    return {
                        process: tl,
                        payload: e
                    };
                }(ls, (() => function() {
                    return h(this, void 0, void 0, (function*() {
                        window.ads.adEngineVersion && window.console.warn("Multiple <?= PACKAGE(name) ?> initializations. This may cause issues."), 
                        window.ads.adEngineVersion = "v146.2.1", bi("ad-engine", window.ads.adEngineVersion), 
                        Ii.setUpGeoData(), yield us.init(), Ii.setUpGeoData();
                    }));
                }())), ms, bs, Ss, _u, Eu, il, zs, Js, Su, fu, vh, hh, Fm, Yo, Xo, {
                    process: sl,
                    payload: {
                        condition: () => this.noAdsDetector.isAdsMode(),
                        yesStep: (e = {
                            yes: mu,
                            no: _r
                        }).yes,
                        noStep: e.no
                    }
                }, Ar, Ir, Nd, Dd, Yd, (() => Bt.emit(zt.AD_ENGINE_CONFIGURED))), this.pipeline.execute();
            }
        };
        Hm = l([ N(), u("design:paramtypes", [ "function" == typeof ($m = void 0 !== Zd && Zd) ? $m : Object, "function" == typeof (Gm = void 0 !== hr && hr) ? Gm : Object ]) ], Hm), 
        window.RLQ = window.RLQ || [], window.RLQ.push((() => h(void 0, void 0, void 0, (function*() {
            (new R).get(Hm).execute();
        }))));
    })();
})();
//# sourceMappingURL=main.bundle.js.map