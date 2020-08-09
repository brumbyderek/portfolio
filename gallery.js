(function () {
  /*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
  (window.goog = window.goog || {}).inherits = function (a, c) {
    function b() {}
    b.prototype = c.prototype;
    a.prototype = new b();
    a.prototype.constructor = a;
  };
}.call(this));
/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
/*

 Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at
 http://polymer.github.io/LICENSE.txt The complete set of authors may be found
 at http://polymer.github.io/AUTHORS.txt The complete set of contributors may
 be found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by
 Google as part of the polymer project is also subject to an additional IP
 rights grant found at http://polymer.github.io/PATENTS.txt
*/
(function () {
  if (
    void 0 !== window.Reflect &&
    void 0 !== window.customElements &&
    !window.customElements.polyfillWrapFlushCallback
  ) {
    var BuiltInHTMLElement = HTMLElement;
    window.HTMLElement = function () {
      return Reflect.construct(BuiltInHTMLElement, [], this.constructor);
    };
    HTMLElement.prototype = BuiltInHTMLElement.prototype;
    HTMLElement.prototype.constructor = HTMLElement;
    Object.setPrototypeOf(HTMLElement, BuiltInHTMLElement);
  }
})();
(function () {
  /*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
  var n; /*

 Copyright (c) 2020 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at
 http://polymer.github.io/LICENSE.txt The complete set of authors may be found
 at http://polymer.github.io/AUTHORS.txt The complete set of contributors may
 be found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by
 Google as part of the polymer project is also subject to an additional IP
 rights grant found at http://polymer.github.io/PATENTS.txt
*/
  /*

 Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at
 http://polymer.github.io/LICENSE.txt The complete set of authors may be found
 at http://polymer.github.io/AUTHORS.txt The complete set of contributors may
 be found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by
 Google as part of the polymer project is also subject to an additional IP
 rights grant found at http://polymer.github.io/PATENTS.txt
*/
  var p = window.Document.prototype.createElement,
    q = window.Document.prototype.createElementNS,
    aa = window.Document.prototype.importNode,
    ba = window.Document.prototype.prepend,
    ca = window.Document.prototype.append,
    da = window.DocumentFragment.prototype.prepend,
    ea = window.DocumentFragment.prototype.append,
    r = window.Node.prototype.cloneNode,
    t = window.Node.prototype.appendChild,
    u = window.Node.prototype.insertBefore,
    v = window.Node.prototype.removeChild,
    w = window.Node.prototype.replaceChild,
    x = Object.getOwnPropertyDescriptor(window.Node.prototype, "textContent"),
    z = window.Element.prototype.attachShadow,
    A = Object.getOwnPropertyDescriptor(window.Element.prototype, "innerHTML"),
    B = window.Element.prototype.getAttribute,
    C = window.Element.prototype.setAttribute,
    D = window.Element.prototype.removeAttribute,
    E = window.Element.prototype.getAttributeNS,
    F = window.Element.prototype.setAttributeNS,
    G = window.Element.prototype.removeAttributeNS,
    H = window.Element.prototype.insertAdjacentElement,
    fa = window.Element.prototype.insertAdjacentHTML,
    ha = window.Element.prototype.prepend,
    ia = window.Element.prototype.append,
    ja = window.Element.prototype.before,
    ka = window.Element.prototype.after,
    la = window.Element.prototype.replaceWith,
    ma = window.Element.prototype.remove,
    na = window.HTMLElement,
    I = Object.getOwnPropertyDescriptor(
      window.HTMLElement.prototype,
      "innerHTML"
    ),
    oa = window.HTMLElement.prototype.insertAdjacentElement,
    pa = window.HTMLElement.prototype.insertAdjacentHTML;
  var qa = (function () {
    var a = new Set();
    "annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph"
      .split(" ")
      .forEach(function (b) {
        return a.add(b);
      });
    return a;
  })();
  function ra(a) {
    var b = qa.has(a);
    a = /^[a-z][.0-9_a-z]*-[-.0-9_a-z]*$/.test(a);
    return !b && a;
  }
  var sa = document.contains
    ? document.contains.bind(document)
    : document.documentElement.contains.bind(document.documentElement);
  function J(a) {
    var b = a.isConnected;
    if (void 0 !== b) return b;
    if (sa(a)) return !0;
    for (; a && !(a.__CE_isImportDocument || a instanceof Document); )
      a =
        a.parentNode ||
        (window.ShadowRoot && a instanceof ShadowRoot ? a.host : void 0);
    return !(!a || !(a.__CE_isImportDocument || a instanceof Document));
  }
  function K(a) {
    var b = a.children;
    if (b) return Array.prototype.slice.call(b);
    b = [];
    for (a = a.firstChild; a; a = a.nextSibling)
      a.nodeType === Node.ELEMENT_NODE && b.push(a);
    return b;
  }
  function L(a, b) {
    for (; b && b !== a && !b.nextSibling; ) b = b.parentNode;
    return b && b !== a ? b.nextSibling : null;
  }
  function M(a, b, c) {
    for (var e = a; e; ) {
      if (e.nodeType === Node.ELEMENT_NODE) {
        var d = e;
        b(d);
        var f = d.localName;
        if ("link" === f && "import" === d.getAttribute("rel")) {
          e = d.import;
          void 0 === c && (c = new Set());
          if (e instanceof Node && !c.has(e))
            for (c.add(e), e = e.firstChild; e; e = e.nextSibling) M(e, b, c);
          e = L(a, d);
          continue;
        } else if ("template" === f) {
          e = L(a, d);
          continue;
        }
        if ((d = d.__CE_shadowRoot))
          for (d = d.firstChild; d; d = d.nextSibling) M(d, b, c);
      }
      e = e.firstChild ? e.firstChild : L(a, e);
    }
  }
  function ta() {
    var a = !(null === N || void 0 === N || !N.noDocumentConstructionObserver),
      b = !(null === N || void 0 === N || !N.shadyDomFastWalk);
    this.f = [];
    this.s = [];
    this.c = !1;
    this.shadyDomFastWalk = b;
    this.K = !a;
  }
  function O(a, b, c, e) {
    var d = window.ShadyDom;
    if (a.shadyDomFastWalk && d && d.inUse) {
      if ((b.nodeType === Node.ELEMENT_NODE && c(b), b.querySelectorAll))
        for (
          a = d.nativeMethods.querySelectorAll.call(b, "*"), b = 0;
          b < a.length;
          b++
        )
          c(a[b]);
    } else M(b, c, e);
  }
  function ua(a, b) {
    a.c = !0;
    a.f.push(b);
  }
  function va(a, b) {
    a.c = !0;
    a.s.push(b);
  }
  function P(a, b) {
    a.c &&
      O(a, b, function (c) {
        return Q(a, c);
      });
  }
  function Q(a, b) {
    if (a.c && !b.__CE_patched) {
      b.__CE_patched = !0;
      for (var c = 0; c < a.f.length; c++) a.f[c](b);
      for (c = 0; c < a.s.length; c++) a.s[c](b);
    }
  }
  function R(a, b) {
    var c = [];
    O(a, b, function (d) {
      return c.push(d);
    });
    for (b = 0; b < c.length; b++) {
      var e = c[b];
      1 === e.__CE_state ? a.connectedCallback(e) : S(a, e);
    }
  }
  function T(a, b) {
    var c = [];
    O(a, b, function (d) {
      return c.push(d);
    });
    for (b = 0; b < c.length; b++) {
      var e = c[b];
      1 === e.__CE_state && a.disconnectedCallback(e);
    }
  }
  function U(a, b, c) {
    c = void 0 === c ? {} : c;
    var e = c.L,
      d =
        c.upgrade ||
        function (g) {
          return S(a, g);
        },
      f = [];
    O(
      a,
      b,
      function (g) {
        a.c && Q(a, g);
        if ("link" === g.localName && "import" === g.getAttribute("rel")) {
          var h = g.import;
          h instanceof Node &&
            ((h.__CE_isImportDocument = !0),
            (h.__CE_registry = document.__CE_registry));
          h && "complete" === h.readyState
            ? (h.__CE_documentLoadHandled = !0)
            : g.addEventListener("load", function () {
                var k = g.import;
                if (!k.__CE_documentLoadHandled) {
                  k.__CE_documentLoadHandled = !0;
                  var l = new Set();
                  e &&
                    (e.forEach(function (m) {
                      return l.add(m);
                    }),
                    l.delete(k));
                  U(a, k, { L: l, upgrade: d });
                }
              });
        } else f.push(g);
      },
      e
    );
    for (b = 0; b < f.length; b++) d(f[b]);
  }
  function S(a, b) {
    try {
      var c = a.G(b.ownerDocument, b.localName);
      c && a.I(b, c);
    } catch (e) {
      V(e);
    }
  }
  n = ta.prototype;
  n.I = function (a, b) {
    if (void 0 === a.__CE_state) {
      b.constructionStack.push(a);
      try {
        try {
          if (new b.constructorFunction() !== a)
            throw Error(
              "The custom element constructor did not produce the element being upgraded."
            );
        } finally {
          b.constructionStack.pop();
        }
      } catch (f) {
        throw ((a.__CE_state = 2), f);
      }
      a.__CE_state = 1;
      a.__CE_definition = b;
      if (b.attributeChangedCallback && a.hasAttributes()) {
        b = b.observedAttributes;
        for (var c = 0; c < b.length; c++) {
          var e = b[c],
            d = a.getAttribute(e);
          null !== d && this.attributeChangedCallback(a, e, null, d, null);
        }
      }
      J(a) && this.connectedCallback(a);
    }
  };
  n.connectedCallback = function (a) {
    var b = a.__CE_definition;
    if (b.connectedCallback)
      try {
        b.connectedCallback.call(a);
      } catch (c) {
        V(c);
      }
  };
  n.disconnectedCallback = function (a) {
    var b = a.__CE_definition;
    if (b.disconnectedCallback)
      try {
        b.disconnectedCallback.call(a);
      } catch (c) {
        V(c);
      }
  };
  n.attributeChangedCallback = function (a, b, c, e, d) {
    var f = a.__CE_definition;
    if (f.attributeChangedCallback && -1 < f.observedAttributes.indexOf(b))
      try {
        f.attributeChangedCallback.call(a, b, c, e, d);
      } catch (g) {
        V(g);
      }
  };
  n.G = function (a, b) {
    var c = a.__CE_registry;
    if (c && (a.defaultView || a.__CE_isImportDocument)) return W(c, b);
  };
  function wa(a, b, c, e) {
    var d = b.__CE_registry;
    if (
      d &&
      (null === e || "http://www.w3.org/1999/xhtml" === e) &&
      (d = W(d, c))
    )
      try {
        var f = new d.constructorFunction();
        if (void 0 === f.__CE_state || void 0 === f.__CE_definition)
          throw Error(
            "Failed to construct '" +
              c +
              "': The returned value was not constructed with the HTMLElement constructor."
          );
        if ("http://www.w3.org/1999/xhtml" !== f.namespaceURI)
          throw Error(
            "Failed to construct '" +
              c +
              "': The constructed element's namespace must be the HTML namespace."
          );
        if (f.hasAttributes())
          throw Error(
            "Failed to construct '" +
              c +
              "': The constructed element must not have any attributes."
          );
        if (null !== f.firstChild)
          throw Error(
            "Failed to construct '" +
              c +
              "': The constructed element must not have any children."
          );
        if (null !== f.parentNode)
          throw Error(
            "Failed to construct '" +
              c +
              "': The constructed element must not have a parent node."
          );
        if (f.ownerDocument !== b)
          throw Error(
            "Failed to construct '" +
              c +
              "': The constructed element's owner document is incorrect."
          );
        if (f.localName !== c)
          throw Error(
            "Failed to construct '" +
              c +
              "': The constructed element's local name is incorrect."
          );
        return f;
      } catch (g) {
        return (
          V(g),
          (b = null === e ? p.call(b, c) : q.call(b, e, c)),
          Object.setPrototypeOf(b, HTMLUnknownElement.prototype),
          (b.__CE_state = 2),
          (b.__CE_definition = void 0),
          Q(a, b),
          b
        );
      }
    b = null === e ? p.call(b, c) : q.call(b, e, c);
    Q(a, b);
    return b;
  }
  function V(a) {
    var b = a.message,
      c = a.sourceURL || a.fileName || "",
      e = a.line || a.lineNumber || 0,
      d = a.column || a.columnNumber || 0,
      f = void 0;
    void 0 === ErrorEvent.prototype.initErrorEvent
      ? (f = new ErrorEvent("error", {
          cancelable: !0,
          message: b,
          filename: c,
          lineno: e,
          colno: d,
          error: a,
        }))
      : ((f = document.createEvent("ErrorEvent")),
        f.initErrorEvent("error", !1, !0, b, c, e),
        (f.preventDefault = function () {
          Object.defineProperty(this, "defaultPrevented", {
            configurable: !0,
            get: function () {
              return !0;
            },
          });
        }));
    void 0 === f.error &&
      Object.defineProperty(f, "error", {
        configurable: !0,
        enumerable: !0,
        get: function () {
          return a;
        },
      });
    window.dispatchEvent(f);
    f.defaultPrevented || console.error(a);
  }
  function xa() {
    var a = this;
    this.D = void 0;
    this.C = new Promise(function (b) {
      a.H = b;
    });
  }
  xa.prototype.resolve = function (a) {
    if (this.D) throw Error("Already resolved.");
    this.D = a;
    this.H(a);
  };
  function X(a) {
    var b = document;
    this.l = void 0;
    this.a = a;
    this.g = b;
    U(this.a, this.g);
    "loading" === this.g.readyState &&
      ((this.l = new MutationObserver(this.F.bind(this))),
      this.l.observe(this.g, { childList: !0, subtree: !0 }));
  }
  X.prototype.disconnect = function () {
    this.l && this.l.disconnect();
  };
  X.prototype.F = function (a) {
    var b = this.g.readyState;
    ("interactive" !== b && "complete" !== b) || this.disconnect();
    for (b = 0; b < a.length; b++)
      for (var c = a[b].addedNodes, e = 0; e < c.length; e++) U(this.a, c[e]);
  };
  function Y(a) {
    this.i = new Map();
    this.j = new Map();
    this.v = new Map();
    this.o = !1;
    this.u = new Map();
    this.h = function (b) {
      return b();
    };
    this.b = !1;
    this.m = [];
    this.a = a;
    this.A = a.K ? new X(a) : void 0;
  }
  n = Y.prototype;
  n.J = function (a, b) {
    var c = this;
    if (!(b instanceof Function))
      throw new TypeError(
        "Custom element constructor getters must be functions."
      );
    ya(this, a);
    this.i.set(a, b);
    this.m.push(a);
    this.b ||
      ((this.b = !0),
      this.h(function () {
        return c.B();
      }));
  };
  n.define = function (a, b) {
    var c = this;
    if (!(b instanceof Function))
      throw new TypeError("Custom element constructors must be functions.");
    ya(this, a);
    za(this, a, b);
    this.m.push(a);
    this.b ||
      ((this.b = !0),
      this.h(function () {
        return c.B();
      }));
  };
  function ya(a, b) {
    if (!ra(b))
      throw new SyntaxError("The element name '" + b + "' is not valid.");
    if (W(a, b))
      throw Error(
        "A custom element with name '" + (b + "' has already been defined.")
      );
    if (a.o) throw Error("A custom element is already being defined.");
  }
  function za(a, b, c) {
    a.o = !0;
    var e;
    try {
      var d = c.prototype;
      if (!(d instanceof Object))
        throw new TypeError(
          "The custom element constructor's prototype is not an object."
        );
      var f = function (m) {
        var y = d[m];
        if (void 0 !== y && !(y instanceof Function))
          throw Error("The '" + m + "' callback must be a function.");
        return y;
      };
      var g = f("connectedCallback");
      var h = f("disconnectedCallback");
      var k = f("adoptedCallback");
      var l =
        ((e = f("attributeChangedCallback")) && c.observedAttributes) || [];
    } catch (m) {
      throw m;
    } finally {
      a.o = !1;
    }
    c = {
      localName: b,
      constructorFunction: c,
      connectedCallback: g,
      disconnectedCallback: h,
      adoptedCallback: k,
      attributeChangedCallback: e,
      observedAttributes: l,
      constructionStack: [],
    };
    a.j.set(b, c);
    a.v.set(c.constructorFunction, c);
    return c;
  }
  n.upgrade = function (a) {
    U(this.a, a);
  };
  n.B = function () {
    var a = this;
    if (!1 !== this.b) {
      this.b = !1;
      for (var b = [], c = this.m, e = new Map(), d = 0; d < c.length; d++)
        e.set(c[d], []);
      U(this.a, document, {
        upgrade: function (k) {
          if (void 0 === k.__CE_state) {
            var l = k.localName,
              m = e.get(l);
            m ? m.push(k) : a.j.has(l) && b.push(k);
          }
        },
      });
      for (d = 0; d < b.length; d++) S(this.a, b[d]);
      for (d = 0; d < c.length; d++) {
        for (var f = c[d], g = e.get(f), h = 0; h < g.length; h++)
          S(this.a, g[h]);
        (f = this.u.get(f)) && f.resolve(void 0);
      }
      c.length = 0;
    }
  };
  n.get = function (a) {
    if ((a = W(this, a))) return a.constructorFunction;
  };
  n.whenDefined = function (a) {
    if (!ra(a))
      return Promise.reject(
        new SyntaxError("'" + a + "' is not a valid custom element name.")
      );
    var b = this.u.get(a);
    if (b) return b.C;
    b = new xa();
    this.u.set(a, b);
    var c = this.j.has(a) || this.i.has(a);
    a = -1 === this.m.indexOf(a);
    c && a && b.resolve(void 0);
    return b.C;
  };
  n.polyfillWrapFlushCallback = function (a) {
    this.A && this.A.disconnect();
    var b = this.h;
    this.h = function (c) {
      return a(function () {
        return b(c);
      });
    };
  };
  function W(a, b) {
    var c = a.j.get(b);
    if (c) return c;
    if ((c = a.i.get(b))) {
      a.i.delete(b);
      try {
        return za(a, b, c());
      } catch (e) {
        V(e);
      }
    }
  }
  window.CustomElementRegistry = Y;
  Y.prototype.define = Y.prototype.define;
  Y.prototype.upgrade = Y.prototype.upgrade;
  Y.prototype.get = Y.prototype.get;
  Y.prototype.whenDefined = Y.prototype.whenDefined;
  Y.prototype.polyfillDefineLazy = Y.prototype.J;
  Y.prototype.polyfillWrapFlushCallback = Y.prototype.polyfillWrapFlushCallback;
  function Z(a, b, c) {
    function e(d) {
      return function (f) {
        for (var g = [], h = 0; h < arguments.length; ++h)
          g[h - 0] = arguments[h];
        h = [];
        for (var k = [], l = 0; l < g.length; l++) {
          var m = g[l];
          m instanceof Element && J(m) && k.push(m);
          if (m instanceof DocumentFragment)
            for (m = m.firstChild; m; m = m.nextSibling) h.push(m);
          else h.push(m);
        }
        d.apply(this, g);
        for (g = 0; g < k.length; g++) T(a, k[g]);
        if (J(this))
          for (g = 0; g < h.length; g++)
            (k = h[g]), k instanceof Element && R(a, k);
      };
    }
    void 0 !== c.prepend && (b.prepend = e(c.prepend));
    void 0 !== c.append && (b.append = e(c.append));
  }
  function Aa(a) {
    Document.prototype.createElement = function (b) {
      return wa(a, this, b, null);
    };
    Document.prototype.importNode = function (b, c) {
      b = aa.call(this, b, !!c);
      this.__CE_registry ? U(a, b) : P(a, b);
      return b;
    };
    Document.prototype.createElementNS = function (b, c) {
      return wa(a, this, c, b);
    };
    Z(a, Document.prototype, { prepend: ba, append: ca });
  }
  function Ba(a) {
    function b(e) {
      return function (d) {
        for (var f = [], g = 0; g < arguments.length; ++g)
          f[g - 0] = arguments[g];
        g = [];
        for (var h = [], k = 0; k < f.length; k++) {
          var l = f[k];
          l instanceof Element && J(l) && h.push(l);
          if (l instanceof DocumentFragment)
            for (l = l.firstChild; l; l = l.nextSibling) g.push(l);
          else g.push(l);
        }
        e.apply(this, f);
        for (f = 0; f < h.length; f++) T(a, h[f]);
        if (J(this))
          for (f = 0; f < g.length; f++)
            (h = g[f]), h instanceof Element && R(a, h);
      };
    }
    var c = Element.prototype;
    void 0 !== ja && (c.before = b(ja));
    void 0 !== ka && (c.after = b(ka));
    void 0 !== la &&
      (c.replaceWith = function (e) {
        for (var d = [], f = 0; f < arguments.length; ++f)
          d[f - 0] = arguments[f];
        f = [];
        for (var g = [], h = 0; h < d.length; h++) {
          var k = d[h];
          k instanceof Element && J(k) && g.push(k);
          if (k instanceof DocumentFragment)
            for (k = k.firstChild; k; k = k.nextSibling) f.push(k);
          else f.push(k);
        }
        h = J(this);
        la.apply(this, d);
        for (d = 0; d < g.length; d++) T(a, g[d]);
        if (h)
          for (T(a, this), d = 0; d < f.length; d++)
            (g = f[d]), g instanceof Element && R(a, g);
      });
    void 0 !== ma &&
      (c.remove = function () {
        var e = J(this);
        ma.call(this);
        e && T(a, this);
      });
  }
  function Ca(a) {
    function b(d, f) {
      Object.defineProperty(d, "innerHTML", {
        enumerable: f.enumerable,
        configurable: !0,
        get: f.get,
        set: function (g) {
          var h = this,
            k = void 0;
          J(this) &&
            ((k = []),
            O(a, this, function (y) {
              y !== h && k.push(y);
            }));
          f.set.call(this, g);
          if (k)
            for (var l = 0; l < k.length; l++) {
              var m = k[l];
              1 === m.__CE_state && a.disconnectedCallback(m);
            }
          this.ownerDocument.__CE_registry ? U(a, this) : P(a, this);
          return g;
        },
      });
    }
    function c(d, f) {
      d.insertAdjacentElement = function (g, h) {
        var k = J(h);
        g = f.call(this, g, h);
        k && T(a, h);
        J(g) && R(a, h);
        return g;
      };
    }
    function e(d, f) {
      function g(h, k) {
        for (var l = []; h !== k; h = h.nextSibling) l.push(h);
        for (k = 0; k < l.length; k++) U(a, l[k]);
      }
      d.insertAdjacentHTML = function (h, k) {
        h = h.toLowerCase();
        if ("beforebegin" === h) {
          var l = this.previousSibling;
          f.call(this, h, k);
          g(l || this.parentNode.firstChild, this);
        } else if ("afterbegin" === h)
          (l = this.firstChild), f.call(this, h, k), g(this.firstChild, l);
        else if ("beforeend" === h)
          (l = this.lastChild),
            f.call(this, h, k),
            g(l || this.firstChild, null);
        else if ("afterend" === h)
          (l = this.nextSibling), f.call(this, h, k), g(this.nextSibling, l);
        else
          throw new SyntaxError(
            "The value provided (" +
              String(h) +
              ") is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'."
          );
      };
    }
    z &&
      (Element.prototype.attachShadow = function (d) {
        d = z.call(this, d);
        if (a.c && !d.__CE_patched) {
          d.__CE_patched = !0;
          for (var f = 0; f < a.f.length; f++) a.f[f](d);
        }
        return (this.__CE_shadowRoot = d);
      });
    A && A.get
      ? b(Element.prototype, A)
      : I && I.get
      ? b(HTMLElement.prototype, I)
      : va(a, function (d) {
          b(d, {
            enumerable: !0,
            configurable: !0,
            get: function () {
              return r.call(this, !0).innerHTML;
            },
            set: function (f) {
              var g = "template" === this.localName,
                h = g ? this.content : this,
                k = q.call(document, this.namespaceURI, this.localName);
              for (k.innerHTML = f; 0 < h.childNodes.length; )
                v.call(h, h.childNodes[0]);
              for (f = g ? k.content : k; 0 < f.childNodes.length; )
                t.call(h, f.childNodes[0]);
            },
          });
        });
    Element.prototype.setAttribute = function (d, f) {
      if (1 !== this.__CE_state) return C.call(this, d, f);
      var g = B.call(this, d);
      C.call(this, d, f);
      f = B.call(this, d);
      a.attributeChangedCallback(this, d, g, f, null);
    };
    Element.prototype.setAttributeNS = function (d, f, g) {
      if (1 !== this.__CE_state) return F.call(this, d, f, g);
      var h = E.call(this, d, f);
      F.call(this, d, f, g);
      g = E.call(this, d, f);
      a.attributeChangedCallback(this, f, h, g, d);
    };
    Element.prototype.removeAttribute = function (d) {
      if (1 !== this.__CE_state) return D.call(this, d);
      var f = B.call(this, d);
      D.call(this, d);
      null !== f && a.attributeChangedCallback(this, d, f, null, null);
    };
    Element.prototype.removeAttributeNS = function (d, f) {
      if (1 !== this.__CE_state) return G.call(this, d, f);
      var g = E.call(this, d, f);
      G.call(this, d, f);
      var h = E.call(this, d, f);
      g !== h && a.attributeChangedCallback(this, f, g, h, d);
    };
    oa ? c(HTMLElement.prototype, oa) : H && c(Element.prototype, H);
    pa ? e(HTMLElement.prototype, pa) : fa && e(Element.prototype, fa);
    Z(a, Element.prototype, { prepend: ha, append: ia });
    Ba(a);
  }
  var Da = {};
  function Ea(a) {
    function b() {
      var c = this.constructor;
      var e = document.__CE_registry.v.get(c);
      if (!e)
        throw Error(
          "Failed to construct a custom element: The constructor was not registered with `customElements`."
        );
      var d = e.constructionStack;
      if (0 === d.length)
        return (
          (d = p.call(document, e.localName)),
          Object.setPrototypeOf(d, c.prototype),
          (d.__CE_state = 1),
          (d.__CE_definition = e),
          Q(a, d),
          d
        );
      var f = d.length - 1,
        g = d[f];
      if (g === Da)
        throw Error(
          "Failed to construct '" +
            e.localName +
            "': This element was already constructed."
        );
      d[f] = Da;
      Object.setPrototypeOf(g, c.prototype);
      Q(a, g);
      return g;
    }
    b.prototype = na.prototype;
    Object.defineProperty(HTMLElement.prototype, "constructor", {
      writable: !0,
      configurable: !0,
      enumerable: !1,
      value: b,
    });
    window.HTMLElement = b;
  }
  function Fa(a) {
    function b(c, e) {
      Object.defineProperty(c, "textContent", {
        enumerable: e.enumerable,
        configurable: !0,
        get: e.get,
        set: function (d) {
          if (this.nodeType === Node.TEXT_NODE) e.set.call(this, d);
          else {
            var f = void 0;
            if (this.firstChild) {
              var g = this.childNodes,
                h = g.length;
              if (0 < h && J(this)) {
                f = Array(h);
                for (var k = 0; k < h; k++) f[k] = g[k];
              }
            }
            e.set.call(this, d);
            if (f) for (d = 0; d < f.length; d++) T(a, f[d]);
          }
        },
      });
    }
    Node.prototype.insertBefore = function (c, e) {
      if (c instanceof DocumentFragment) {
        var d = K(c);
        c = u.call(this, c, e);
        if (J(this)) for (e = 0; e < d.length; e++) R(a, d[e]);
        return c;
      }
      d = c instanceof Element && J(c);
      e = u.call(this, c, e);
      d && T(a, c);
      J(this) && R(a, c);
      return e;
    };
    Node.prototype.appendChild = function (c) {
      if (c instanceof DocumentFragment) {
        var e = K(c);
        c = t.call(this, c);
        if (J(this)) for (var d = 0; d < e.length; d++) R(a, e[d]);
        return c;
      }
      e = c instanceof Element && J(c);
      d = t.call(this, c);
      e && T(a, c);
      J(this) && R(a, c);
      return d;
    };
    Node.prototype.cloneNode = function (c) {
      c = r.call(this, !!c);
      this.ownerDocument.__CE_registry ? U(a, c) : P(a, c);
      return c;
    };
    Node.prototype.removeChild = function (c) {
      var e = c instanceof Element && J(c),
        d = v.call(this, c);
      e && T(a, c);
      return d;
    };
    Node.prototype.replaceChild = function (c, e) {
      if (c instanceof DocumentFragment) {
        var d = K(c);
        c = w.call(this, c, e);
        if (J(this)) for (T(a, e), e = 0; e < d.length; e++) R(a, d[e]);
        return c;
      }
      d = c instanceof Element && J(c);
      var f = w.call(this, c, e),
        g = J(this);
      g && T(a, e);
      d && T(a, c);
      g && R(a, c);
      return f;
    };
    x && x.get
      ? b(Node.prototype, x)
      : ua(a, function (c) {
          b(c, {
            enumerable: !0,
            configurable: !0,
            get: function () {
              for (var e = [], d = this.firstChild; d; d = d.nextSibling)
                d.nodeType !== Node.COMMENT_NODE && e.push(d.textContent);
              return e.join("");
            },
            set: function (e) {
              for (; this.firstChild; ) v.call(this, this.firstChild);
              null != e && "" !== e && t.call(this, document.createTextNode(e));
            },
          });
        });
  }
  var N = window.customElements;
  function Ga() {
    var a = new ta();
    Ea(a);
    Aa(a);
    Z(a, DocumentFragment.prototype, { prepend: da, append: ea });
    Fa(a);
    Ca(a);
    a = new Y(a);
    document.__CE_registry = a;
    Object.defineProperty(window, "customElements", {
      configurable: !0,
      enumerable: !0,
      value: a,
    });
  }
  (N &&
    !N.forcePolyfill &&
    "function" == typeof N.define &&
    "function" == typeof N.get) ||
    Ga();
  window.__CE_installPolyfill = Ga; /*

Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
})();
(function () {
  var b = window.document;
  window.WebComponents = window.WebComponents || {};
  var a = function () {
    window.removeEventListener("DOMContentLoaded", a);
    window.WebComponents.ready = !0;
    var c = b.createEvent("CustomEvent");
    c.initEvent("WebComponentsReady", !0, !0);
    setTimeout(function () {
      window.document.dispatchEvent(c);
    }, 0);
  };
  "complete" === b.readyState
    ? a()
    : window.addEventListener("DOMContentLoaded", a);
})();
(function () {
  /*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
  "use strict";
  var g,
    l =
      "function" == typeof Object.create
        ? Object.create
        : function (a) {
            var b = function () {};
            b.prototype = a;
            return new b();
          },
    m = function (a) {
      a = [
        "object" == typeof globalThis && globalThis,
        a,
        "object" == typeof window && window,
        "object" == typeof self && self,
        "object" == typeof global && global,
      ];
      for (var b = 0; b < a.length; ++b) {
        var c = a[b];
        if (c && c.Math == Math) return c;
      }
      throw Error("Cannot find global object");
    },
    n = m(this),
    p;
  if ("function" == typeof Object.setPrototypeOf) p = Object.setPrototypeOf;
  else {
    var q;
    a: {
      var r = { S: !0 },
        t = {};
      try {
        t.__proto__ = r;
        q = t.S;
        break a;
      } catch (a) {}
      q = !1;
    }
    p = q
      ? function (a, b) {
          a.__proto__ = b;
          if (a.__proto__ !== b) throw new TypeError(a + " is not extensible");
          return a;
        }
      : null;
  }
  var u = p,
    w = function (a, b) {
      a.prototype = l(b.prototype);
      a.prototype.constructor = a;
      if (u) u(a, b);
      else
        for (var c in b)
          if ("prototype" != c)
            if (Object.defineProperties) {
              var d = Object.getOwnPropertyDescriptor(b, c);
              d && Object.defineProperty(a, c, d);
            } else a[c] = b[c];
    },
    goog = goog || {};
  var x = function (a, b, c) {
    for (var d = b / c, e, f, h, k = 0; k < a.length; k++)
      if (
        ((e = a[k]),
        "img" == e.tagName.toLowerCase() ||
          "gwd-image" == e.tagName.toLowerCase())
      )
        (f = e.offsetWidth / e.offsetHeight),
          d > f ? ((h = c * f), (f = c)) : ((h = b), (f = b / f)),
          (e.style.width = h + "px"),
          (e.style.height = f + "px");
  };
  var y = function (a, b) {
    return window.setTimeout(a, b);
  };
  var z = function (a, b, c) {
      c = void 0 === c ? null : c;
      var d = document.createEvent("CustomEvent");
      d.initCustomEvent(a, !0, !0, c);
      b.dispatchEvent(d);
      return d;
    },
    A = function (a, b, c) {
      c = void 0 === c ? null : c;
      var d = void 0 === d ? null : d;
      y(function () {
        var e = z(a, b, c);
        d && d(e);
      }, 0);
    },
    B = function (a, b) {
      var c = function (d) {
        a.removeEventListener("attached", c);
        b(d);
      };
      a.addEventListener("attached", c);
    },
    C = function (a) {
      var b = !1,
        c = null;
      return function () {
        b = !0;
        c ||
          (b && (a(), (b = !1)),
          (c = y(function () {
            c = null;
            b && (a(), (b = !1));
          }, 250)));
      };
    };
  var D = ["-ms-", "-moz-", "-webkit-", ""];
  var E = function (a) {
      return (
        "gwd-page" == a.tagName.toLowerCase() ||
        "gwd-page" == a.getAttribute("is")
      );
    },
    F = function (a) {
      if (E(a)) return a;
      for (; a && 9 != a.nodeType; )
        if ((a = a.parentElement) && E(a)) return a;
      return null;
    };
  var G = function (a) {
    a = a.trim();
    return window.Enabler ? window.Enabler.getUrl(a) : a;
  };
  var H = function () {
    this.M = "";
  };
  H.prototype.toString = function () {
    return "SafeStyle{" + this.M + "}";
  };
  H.prototype.A = function (a) {
    this.M = a;
  };
  new H().A("");
  var I = function () {
    this.L = "";
  };
  I.prototype.toString = function () {
    return "SafeStyleSheet{" + this.L + "}";
  };
  I.prototype.A = function (a) {
    this.L = a;
  };
  new I().A("");
  var J = function (a) {
      var b = document.createElement("gwd-image");
      b.setAttribute("source", a);
      return b;
    },
    K = function (a) {
      var b = [];
      if (a) {
        a = a.split(",");
        for (var c = 0; c < a.length; c++)
          /^[\s\xa0]*$/.test(a[c]) || b.push(J(G(a[c])));
      }
      return b;
    },
    L = function (a, b) {
      return ((a % b) + b) % b;
    },
    M = function (a, b, c, d) {
      d = void 0 === d ? 1 : d;
      return L(a + ("left" == b || "backwards" == b ? -d : d), c);
    };
  var N = function (a) {
      var b = a.currentIndex - 1;
      return b - (b % a.frameSnapInterval);
    },
    O = function (a) {
      this.f = a;
      this.i = null;
      this.Z = !0;
      this.v = !1;
    };
  O.prototype.play = function (a, b, c) {
    var d = this;
    b = void 0 === b ? "forwards" : b;
    if (this.f.frameCount && null == this.i) {
      if (c) {
        var e = Math.floor(a / c);
        a = c;
      } else (e = this.f.frameCount), (a /= e);
      var f = [],
        h = N(this.f);
      c = h;
      for (var k = 0; k < e; k++) {
        if (0 < k || !this.Z) c = M(c, b, this.f.frameCount);
        f.push(c);
      }
      b = function () {
        if (f.length) {
          var v = f.shift();
          d.v = !0;
          d.f.goToFrame(v + 1);
          d.v = !1;
          z("frameautoplayed", d.f, { id: v + 1 });
        } else d.stop(!0), d.f.goToFrame(h + 1);
      };
      this.i = window.setInterval(b, a);
      setTimeout(b);
    }
  };
  O.prototype.stop = function (a) {
    a = void 0 === a ? !1 : a;
    !this.v &&
      this.i &&
      (window.clearInterval(this.i),
      A("autoplayended", this.f, { completed: a }),
      (this.i = null));
  };
  var P = ["pause-front-media", "resume-next-media"],
    Q = function () {
      var a = HTMLElement.call(this) || this;
      a.frames = [];
      a.a = null;
      a.b = 0;
      a.l = 1;
      a.G = new O(a);
      a.Y = !1;
      a.$ = !1;
      return a;
    };
  w(Q, HTMLElement);
  Q.prototype.attributeChangedCallback = function (a, b, c) {
    switch (a) {
      case "pause-front-media":
        this.Y = "true" == c;
        break;
      case "resume-next-media":
        this.$ = "true" == c;
    }
  };
  Q.prototype.gwdIsLoaded = function () {
    return !0;
  };
  Q.prototype.gwdLoad = function () {};
  Q.prototype.goToFrame = function (a) {
    this.stopRotation();
    0 != this.b &&
      (a > this.b ? (a = this.b) : 1 > a && (a = 1), (this.a = a - 1));
  };
  var R = function (a, b, c, d) {
    if (null != a.a) {
      var e = M(a.a, b, a.l * Math.ceil(a.b / a.l), a.l);
      (!d && (("forwards" == b && e < a.a) || ("backwards" == b && e > a.a))) ||
        a.goToFrame(e + 1, c);
    }
  };
  g = Q.prototype;
  g.goBackwards = function (a, b) {
    R(this, "backwards", void 0 === a ? "slide" : a, void 0 === b ? !0 : b);
  };
  g.goForwards = function (a, b) {
    R(this, "forwards", void 0 === a ? "slide" : a, void 0 === b ? !0 : b);
  };
  g.rotateOnce = function (a, b) {
    this.G.play(void 0 === a ? 0 : a, b);
  };
  g.stopRotation = function () {
    this.G.stop();
  };
  g.getFrame = function (a) {
    if (0 != this.b) return this.frames[a - 1];
  };
  var S = function (a, b, c) {
    z(b, a, { id: c || a.currentIndex });
  };
  n.Object.defineProperties(Q.prototype, {
    currentIndex: {
      configurable: !0,
      enumerable: !0,
      get: function () {
        return 0 < this.b ? this.a + 1 : void 0;
      },
    },
    frameSnapInterval: {
      configurable: !0,
      enumerable: !0,
      get: function () {
        return this.l;
      },
    },
    frameCount: {
      configurable: !0,
      enumerable: !0,
      get: function () {
        return this.b;
      },
    },
  });
  n.Object.defineProperties(Q, {
    observedAttributes: {
      configurable: !0,
      enumerable: !0,
      get: function () {
        return P;
      },
    },
  });
  var T = ["images", "wrap", "pause-front-media", "resume-next-media"],
    U = function () {
      var a = Q.call(this) || this;
      a.C = !1;
      a.c = null;
      a.F = 0;
      a.h = null;
      a.R = a.W.bind(a);
      a.P = a.X.bind(a);
      a.O = a.V.bind(a);
      a.u = z.bind(null, "firstinteraction", a);
      a.K = a.T.bind(a);
      a.N = C(a.U.bind(a));
      a.s = [];
      a.I = 0;
      a.g = -1;
      a.m = null;
      a.H = !1;
      a.j = !1;
      a.o = null;
      a.B = !1;
      a.J = !1;
      return a;
    };
  w(U, Q);
  g = U.prototype;
  g.connectedCallback = function () {
    if (!this.B) {
      var a = document.createElement("gwd-gesture");
      a.className = "gesture";
      this.h = a;
      this.B = !0;
      this.J && V(this);
    }
    this.h.addEventListener("trackstart", this.R, !1);
    this.h.addEventListener("track", this.P, !1);
    this.h.addEventListener("tap", this.O, !1);
    this.gwdIsLoaded() ||
      ((a = F(this)) ? a.gwdIsLoaded() && this.gwdLoad() : this.gwdLoad());
    window.addEventListener("resize", this.N, !1);
  };
  g.disconnectedCallback = function () {
    window.removeEventListener("resize", this.N, !1);
    var a = this.h;
    a.removeEventListener("trackstart", this.R, !1);
    a.removeEventListener("track", this.P, !1);
    a.removeEventListener("tap", this.O, !1);
    -1 != this.g && (W(this, this.g), X(this));
  };
  g.attributeChangedCallback = function (a, b, c, d) {
    switch (a) {
      case "images":
        X(this);
        this.H = !0;
        this.b = 0;
        this.a = -1;
        this.frames = K(c);
        V(this);
        break;
      case "wrap":
        this.j = this.hasAttribute("wrap");
        break;
      default:
        Q.prototype.attributeChangedCallback.call(this, a, b, c, d);
    }
  };
  g.goToFrame = function (a, b, c) {
    b = void 0 === b ? "slide" : b;
    var d = a - 1;
    X(this);
    if (
      0 <= d &&
      d < this.frameCount &&
      d != (-1 != this.g ? this.g : this.a)
    ) {
      if (!c) {
        c = this.a;
        var e = Math.abs(d - c);
        c =
          d > c == (!this.j || this.frameCount / 2 > e)
            ? "forwards"
            : "backwards";
      }
      S(this, "frameactivated", a);
      this.D(M(this.a, c, this.frameCount), d, b, c, 300);
    }
  };
  g.rotateOnce = function (a, b) {
    var c = this;
    X(this);
    var d = a && b && "string" == typeof a && "number" == typeof b,
      e = (d ? a : b) || "forwards",
      f = (d ? b : a) || 300 * this.frameCount;
    if (1 < this.frameCount) {
      var h = this.a,
        k = M(this.a, e, this.frameCount);
      y(function () {
        c.D(k, h, "slide", e, f / c.frameCount, !0);
      }, 0);
    }
  };
  g.stopRotation = function () {
    X(this);
  };
  g.gwdIsLoaded = function () {
    return this.C;
  };
  g.gwdLoad = function () {
    if (!this.C && !this.c) {
      if (this.H) var a = K(this.getAttribute("images"));
      else {
        a = this.childNodes;
        for (var b = [], c = 0, d = a.length; c < d; c++) {
          var e = a[c];
          e.nodeType == Node.ELEMENT_NODE && b.push(e);
        }
        a = b;
      }
      this.frames = a;
      V(this);
    }
  };
  var V = function (a) {
    if (a.B) {
      for (; a.firstChild; ) a.removeChild(a.firstChild);
      a.c && a.c.removeEventListener("pageload", a.K, !1);
      for (
        var b = a.frames, c = document.createElement("gwd-page"), d = 0;
        d < b.length;
        d++
      ) {
        var e = b[d],
          f = void 0;
        f = void 0 === f ? !1 : f;
        for (var h = 0; h < D.length; h++) {
          var k = D[h] + "user-select";
          var v = (f ? D[h] : "") + "none";
          e.style.setProperty(k, v);
        }
        e.classList.add("frame");
        c.appendChild(e);
      }
      B(c, c.gwdLoad.bind(c));
      a.c = c;
      a.c.addEventListener("pageload", a.K, !1);
      a.appendChild(a.h);
      a.appendChild(a.c);
    } else a.J = !0;
  };
  g = U.prototype;
  g.T = function (a) {
    this.c === a.target &&
      (x(this.frames, this.clientWidth, this.clientHeight),
      (this.C = !0),
      this.removeChild(this.c),
      (this.b = this.frames.length),
      (this.s = []),
      (this.I = this.frameCount),
      W(this, 0),
      (this.c = null),
      z("imagesloaded", this),
      z("allframesloaded", this),
      this.hasAttribute("autoplay") && y(this.rotateOnce.bind(this), 0),
      z("ready", this));
  };
  g.U = function () {
    x(this.frames, this.clientWidth, this.clientHeight);
  };
  g.W = function () {
    X(this);
    0 < this.frameCount && (this.F = this.a);
  };
  g.X = function (a) {
    this.frameCount &&
      (this.u && (this.u(), (this.u = null)),
      (a = Math.round(a.dx / 50)),
      (a = this.j
        ? L(this.F + a, this.frameCount)
        : Math.max(0, Math.min(this.frameCount - 1, this.F + a))),
      this.a != a &&
        this.frames[a] &&
        (S(this, "frameactivated", a + 1), W(this, a)));
  };
  g.V = function () {
    this.frameCount && S(this, "frametap");
  };
  var W = function (a, b) {
    if (a.a != b && a.frames[b]) {
      a.a = b;
      var c = a.o;
      a.o = a.frames[b];
      a.appendChild(a.o);
      c && a.removeChild(c);
      S(a, "frameshown");
      a.s[b] || ((a.s[b] = !0), --a.I || A("allframesviewed", a));
    }
  };
  U.prototype.D = function (a, b, c, d, e, f) {
    f = void 0 === f ? !1 : f;
    "none" == c && (a = b);
    W(this, a);
    f && S(this, "frameactivated", a + 1);
    a != b
      ? ((this.g = b),
        (a = M(a, d, this.frameCount)),
        (this.m = y(this.D.bind(this, a, b, c, d, e, f), e)))
      : ((this.m = null), (this.g = -1));
  };
  var X = function (a) {
    -1 != a.g &&
      (window.clearTimeout(a.m),
      (a.m = null),
      (a.g = -1),
      S(a, "frameactivated", a.a));
  };
  U.prototype.getFrame = function (a) {
    return this.frames[a - 1];
  };
  U.prototype.goForwards = function () {
    var a = L(this.a + 1, this.frameCount);
    (!this.j && a < this.a) || this.goToFrame(a + 1);
  };
  U.prototype.goBackwards = function () {
    var a = L(this.a - 1, this.frameCount);
    (!this.j && a > this.a) || this.goToFrame(a + 1);
  };
  n.Object.defineProperties(U, {
    observedAttributes: {
      configurable: !0,
      enumerable: !0,
      get: function () {
        return T;
      },
    },
  });
  customElements.define("gwd-360gallery", U);
}.call(this));
(function () {
  /*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
  "use strict";
  var f =
      "function" == typeof Object.create
        ? Object.create
        : function (a) {
            var b = function () {};
            b.prototype = a;
            return new b();
          },
    k;
  if ("function" == typeof Object.setPrototypeOf) k = Object.setPrototypeOf;
  else {
    var l;
    a: {
      var n = { s: !0 },
        p = {};
      try {
        p.__proto__ = n;
        l = p.s;
        break a;
      } catch (a) {}
      l = !1;
    }
    k = l
      ? function (a, b) {
          a.__proto__ = b;
          if (a.__proto__ !== b) throw new TypeError(a + " is not extensible");
          return a;
        }
      : null;
  }
  var q = k,
    r = this || self;
  var t = function (a, b, c) {
      c = void 0 === c ? null : c;
      var d = document.createEvent("CustomEvent");
      d.initCustomEvent(a, !0, !0, c);
      b.dispatchEvent(d);
      return d;
    },
    u = function (a) {
      a = a.timeStamp;
      return 5e12 > a ? a : a / 1e3;
    };
  var v = ["auto", "none", "pan-x", "pan-y"],
    w = 2,
    x = null,
    y = !1,
    z = null,
    A = null,
    B = [],
    E = function (a, b) {
      var c = b.changedTouches[0];
      null == x &&
        ((x = c.identifier), (z = c.clientX), (A = c.clientY), (y = !1));
      C(b);
      D(a, "pointerover", b);
      D(a, "pointerdown", b);
    },
    F = function (a, b, c) {
      if (!y) {
        var d;
        if ((d = 1 != a && null != z)) {
          var e = c.touches[0];
          d = Math.abs(e.clientX - z);
          e = Math.abs(e.clientY - A);
          d = 2 == a ? d > e : e > d;
        }
        d
          ? (D(b, "pointercancel", c), (y = !0), (x = null))
          : (D(b, "pointermove", c), c.preventDefault());
        A = z = null;
      }
    },
    H = function (a, b) {
      y || (C(b), G(b), D(a, "pointerup", b), D(a, "pointerout", b));
    },
    G = function (a) {
      null != x &&
        I(a, function (b) {
          x == b.identifier && (A = z = x = null);
        });
    },
    C = function (a) {
      a = a.changedTouches[0];
      x == a.identifier &&
        ((a = { u: a.clientX, v: a.clientY, F: a.screenX, G: a.screenY }),
        B.push(a),
        setTimeout(
          function (b) {
            b = B.indexOf(b);
            -1 < b && B.splice(b, 1);
          }.bind(null, a),
          2500
        ));
    },
    J = function (a, b, c, d) {
      b = Math.abs(b - d);
      return 25 >= Math.abs(a - c) && 25 >= b;
    },
    K = function (a, b, c, d) {
      var e = document.createEvent("Event");
      e.initEvent(a, !0, !0);
      e.clientX = c.clientX;
      e.clientY = c.clientY;
      e.pointerId = b;
      e.isPrimary = d;
      return e;
    },
    L = {},
    M = function (a) {
      a = String(a.identifier);
      L[a] || (L[a] = w++);
      return L[a];
    },
    N = function (a, b, c) {
      c.preventDefault();
      var d;
      a: {
        for (d = 0; d < B.length; d++)
          if (
            J(c.clientX, c.clientY, B[d].u, B[d].v) ||
            J(c.screenX, c.screenY, B[d].F, B[d].G)
          ) {
            d = !0;
            break a;
          }
        d = !1;
      }
      d || a.dispatchEvent(K(b, 1, c, !0));
    },
    O = function (a, b, c) {
      a.dispatchEvent(K(b, c.pointerId, c, c.isPrimary));
    },
    D = function (a, b, c) {
      I(c, function (d) {
        a.dispatchEvent(K(b, M(d), d, x == d.identifier));
      });
    },
    I = function (a, b) {
      a = a.changedTouches;
      for (var c = 0; c < a.length; c++) b(a[c]);
    };
  var P = function (a, b) {
      var c = document.createEvent("MouseEvent");
      c.initMouseEvent(
        "tap",
        !0,
        !0,
        window,
        0,
        a,
        b,
        a,
        b,
        !1,
        !1,
        !1,
        !1,
        0,
        null
      );
      return c;
    },
    R = function (a, b, c, d) {
      return Q(a, c, d, c - b.downX, d - b.downY, c - b.lastX, d - b.lastY);
    },
    Q = function (a, b, c, d, e, m, h) {
      var g = document.createEvent("Event");
      g.initEvent(a, !0, !0);
      g.clientX = b;
      g.clientY = c;
      g.dx = d;
      g.dy = e;
      g.ddx = m;
      g.ddy = h;
      return g;
    };
  var S = function (a, b) {
      b = Math.sqrt(a * a + b * b);
      return 0 == b ? !1 : 0.92 < Math.abs(a / b);
    },
    T = function (a, b) {
      return Math.abs(a) >= Math.abs(b)
        ? 0 < a
          ? "swiperight"
          : "swipeleft"
        : 0 < b
        ? "swipedown"
        : "swipeup";
    };
  var U = function () {
      var a = HTMLElement.call(this) || this;
      a.a = {};
      a.b = !1;
      a.l = t.bind(null, "hover", a);
      a.g = a.B.bind(a);
      a.i = a.C.bind(a);
      a.m = a.H.bind(a);
      a.j = a.D.bind(a);
      a.c = a.A.bind(a);
      a.o = 0.5;
      a.f = 0.1;
      a.h = !1;
      return a;
    },
    V = HTMLElement;
  U.prototype = f(V.prototype);
  U.prototype.constructor = U;
  if (q) q(U, V);
  else
    for (var W in V)
      if ("prototype" != W)
        if (Object.defineProperties) {
          var X = Object.getOwnPropertyDescriptor(V, W);
          X && Object.defineProperty(U, W, X);
        } else U[W] = V[W];
  U.prototype.connectedCallback = function () {
    if (!this.h) {
      var a = 1;
      switch (this.getAttribute("touch-action")) {
        case "auto":
          a = 0;
          break;
        case "pan-x":
          a = 2;
          break;
        case "pan-y":
          a = 3;
      }
      a = void 0 === a ? 0 : a;
      var b = v[a];
      this.setAttribute("touch-action", b);
      this.style.touchAction = b;
      this.style.msTouchAction = b;
      void 0 === r.PointerEvent &&
        (r.navigator.msPointerEnabled
          ? (this.addEventListener(
              "MSPointerOver",
              O.bind(null, this, "pointerover"),
              !1
            ),
            this.addEventListener(
              "MSPointerDown",
              O.bind(null, this, "pointerdown"),
              !1
            ),
            this.addEventListener(
              "MSPointerMove",
              O.bind(null, this, "pointermove"),
              !1
            ),
            this.addEventListener(
              "MSPointerUp",
              O.bind(null, this, "pointerup"),
              !1
            ),
            this.addEventListener(
              "MSPointerOut",
              O.bind(null, this, "pointerout"),
              !1
            ),
            this.addEventListener(
              "MSPointerCancel",
              O.bind(null, this, "pointercancel"),
              !1
            ))
          : (this.addEventListener(
              "mouseover",
              N.bind(null, this, "pointerover"),
              !1
            ),
            this.addEventListener(
              "mousedown",
              N.bind(null, this, "pointerdown"),
              !1
            ),
            this.addEventListener(
              "mousemove",
              N.bind(null, this, "pointermove"),
              !1
            ),
            this.addEventListener(
              "mouseup",
              N.bind(null, this, "pointerup"),
              !1
            ),
            this.addEventListener(
              "mouseout",
              N.bind(null, this, "pointerout"),
              !1
            ),
            void 0 !== r.ontouchstart &&
              (this.addEventListener("touchstart", E.bind(null, this), !1),
              0 != a &&
                this.addEventListener("touchmove", F.bind(null, a, this), !1),
              this.addEventListener("touchend", H.bind(null, this), !1))));
      this.h = !0;
    }
    this.hasAttribute("swipe-velocity") &&
      (this.o = parseFloat(this.getAttribute("swipe-velocity")));
    this.hasAttribute("swipe-distance") &&
      (this.f = parseFloat(this.getAttribute("swipe-distance")));
    this.addEventListener("pointerover", this.l, !1);
    this.addEventListener("pointerdown", this.g, !1);
    this.addEventListener("pointermove", this.i, !1);
    this.addEventListener("pointerup", this.m, !1);
    this.addEventListener("pointerout", this.j, !1);
    this.addEventListener("pointercancel", this.c, !1);
  };
  U.prototype.disconnectedCallback = function () {
    this.removeEventListener("pointerover", this.l, !1);
    this.removeEventListener("pointerdown", this.g, !1);
    this.removeEventListener("pointermove", this.i, !1);
    this.removeEventListener("pointerup", this.m, !1);
    this.removeEventListener("pointerout", this.j, !1);
    this.removeEventListener("pointercancel", this.c, !1);
  };
  U.prototype.B = function (a) {
    if (a.isPrimary) {
      var b = String(a.pointerId);
      this.a[b] ||
        (this.a[b] = {
          downX: a.clientX,
          downY: a.clientY,
          downTime: u(a),
          lastX: a.clientX,
          lastY: a.clientY,
          tracking: !1,
        });
      this.b = !1;
    }
  };
  U.prototype.C = function (a) {
    a.preventDefault();
    var b = this.a[String(a.pointerId)];
    if (b) {
      if (
        10 < Math.abs(b.downX - a.clientX) ||
        10 < Math.abs(b.downY - a.clientY)
      )
        this.b = !0;
      b.tracking ||
        (this.dispatchEvent(Q("trackstart", b.downX, b.downY, 0, 0, 0, 0)),
        (b.tracking = !0));
      this.dispatchEvent(R("track", b, a.clientX, a.clientY));
      b.lastX = a.clientX;
      b.lastY = a.clientY;
    }
  };
  U.prototype.H = function (a) {
    Y(this, a) && (this.b || this.dispatchEvent(P(a.clientX, a.clientY)));
  };
  U.prototype.D = function (a) {
    Y(this, a);
    t("hoverend", this);
  };
  var Y = function (a, b) {
    var c = a.a[String(b.pointerId)];
    if (c) {
      if (c.tracking) {
        a.dispatchEvent(R("trackend", c, b.clientX, b.clientY));
        var d = b.clientX - c.downX,
          e = b.clientY - c.downY;
        a: {
          var m = u(b) - c.downTime;
          var h = a.f;
          var g = d / m;
          m = e / m;
          if (Math.abs(Math.sqrt(g * g + m * m)) < a.o) h = !1;
          else
            switch (T(d, e)) {
              case "swipeup":
              case "swipedown":
                h = S(e, d) && Math.abs(e) >= a.clientHeight * h;
                break a;
              case "swipeleft":
              case "swiperight":
                h = S(d, e) && Math.abs(d) >= a.clientWidth * h;
                break a;
              default:
                h = !1;
            }
        }
        h && t(T(d, e), a);
      }
      Z(a, b);
    }
    return c;
  };
  U.prototype.A = function (a) {
    Z(this, a);
    this.b = !0;
  };
  var Z = function (a, b) {
    b = String(b.pointerId);
    a.a[b] && delete a.a[b];
  };
  customElements.define("gwd-gesture", U);
}.call(this));
(function () {
  /*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
  "use strict";
  var g,
    h =
      "function" == typeof Object.create
        ? Object.create
        : function (a) {
            var b = function () {};
            b.prototype = a;
            return new b();
          },
    k;
  if ("function" == typeof Object.setPrototypeOf) k = Object.setPrototypeOf;
  else {
    var l;
    a: {
      var n = { ca: !0 },
        p = {};
      try {
        p.__proto__ = n;
        l = p.ca;
        break a;
      } catch (a) {}
      l = !1;
    }
    k = l
      ? function (a, b) {
          a.__proto__ = b;
          if (a.__proto__ !== b) throw new TypeError(a + " is not extensible");
          return a;
        }
      : null;
  }
  var q = k,
    goog = goog || {},
    r = this || self,
    t = Date.now,
    u = function (a, b) {
      a = a.split(".");
      var c = r;
      a[0] in c ||
        "undefined" == typeof c.execScript ||
        c.execScript("var " + a[0]);
      for (var d; a.length && (d = a.shift()); )
        a.length || void 0 === b
          ? (c = c[d] && c[d] !== Object.prototype[d] ? c[d] : (c[d] = {}))
          : (c[d] = b);
    };
  var v = function () {
    this.A = {};
  };
  v.prototype.add = function (a, b) {
    a = "string" === typeof a ? a : a.getString();
    this.A[a] || (this.A[a] = []);
    this.A[a].push(b);
  };
  var w = function (a) {
      var b = [],
        c = "object" == typeof gwd && "GwdId" in gwd,
        d;
      for (d in a.A) b.push(c ? new gwd.GwdId(d) : d);
      return b;
    },
    x = function (a, b) {
      return b ? a.A["string" === typeof b ? b : b.getString()] || [] : [];
    };
  var y = function (a, b) {
      if (a.contains && 1 == b.nodeType) return a == b || a.contains(b);
      if ("undefined" != typeof a.compareDocumentPosition)
        return a == b || !!(a.compareDocumentPosition(b) & 16);
      for (; b && a != b; ) b = b.parentNode;
      return b == a;
    },
    z = function (a) {
      return (
        "gwd-page" == a.tagName.toLowerCase() ||
        "gwd-page" == a.getAttribute("is")
      );
    },
    A = function (a) {
      if (z(a)) return a;
      for (; a && 9 != a.nodeType; )
        if ((a = a.parentElement) && z(a)) return a;
      return null;
    };
  var B = function (a, b) {
    this.i = a;
    this.da = b;
    this.H = this.M.bind(this);
  };
  B.prototype.observe = function (a) {
    if (a.nodeType == Node.ELEMENT_NODE)
      for (var b = w(this.i), c = 0; c < b.length; c++) {
        var d = D(b[c]);
        if (d && y(a, d)) {
          var e = x(this.i, b[c]);
          if (e)
            for (var f = 0; f < e.length; f++)
              d.addEventListener(e[f].event, this.H, !1);
        }
      }
  };
  B.prototype.M = function (a) {
    this.da(a);
  };
  var D = function (a) {
    return "string" === typeof a
      ? document.getElementById(a)
      : a.getElement(document);
  };
  var E = function (a, b, c) {
    c = void 0 === c ? null : c;
    var d = document.createEvent("CustomEvent");
    d.initCustomEvent(a, !0, !0, c);
    b.dispatchEvent(d);
    return d;
  };
  var F = function () {
    this.aa = "";
  };
  F.prototype.toString = function () {
    return "SafeStyle{" + this.aa + "}";
  };
  F.prototype.N = function (a) {
    this.aa = a;
  };
  new F().N("");
  var G = function () {
    this.$ = "";
  };
  G.prototype.toString = function () {
    return "SafeStyleSheet{" + this.$ + "}";
  };
  G.prototype.N = function (a) {
    this.$ = a;
  };
  new G().N("");
  Object.freeze && Object.freeze([]);
  var H = function (a, b) {
    var c =
      (c = r.performance) && c.now && c.timing
        ? Math.floor(c.now() + c.timing.navigationStart)
        : t();
    a = { label: a, type: 9, value: c };
    b = b.google_js_reporting_queue = b.google_js_reporting_queue || [];
    2048 > b.length && b.push(a);
  };
  var I = {},
    J = !1,
    K = !1;
  I.W = function (a) {
    J || ((J = !0), H("11", a));
  };
  I.pa = function (a) {
    K || ((K = !0), H("12", a));
  };
  I.qa = function (a, b, c) {
    c = void 0 === c ? 0 : c;
    var d = b;
    d = void 0 === d ? r : d;
    if ((d = (d = d.performance) && d.now ? d.now() : null))
      (a = { label: a, type: c, value: d }),
        (b = b.google_js_reporting_queue = b.google_js_reporting_queue || []),
        2048 > b.length && b.push(a);
  };
  I.reset = function (a) {
    K = J = !1;
    (a.google_js_reporting_queue =
      a.google_js_reporting_queue || []).length = 0;
  };
  u("gwd.rumUtil", I);
  u("gwd.rumUtil.logContentLoading", I.W);
  u("gwd.rumUtil.logContentRendered", I.pa);
  u("gwd.rumUtil.logTimingEvent", I.qa);
  u("gwd.rumUtil.reset", I.reset);
  var L = function () {
      var a = HTMLElement.call(this) || this;
      a.T = a.ja.bind(a);
      a.K = a.la.bind(a);
      a.U = a.ka.bind(a);
      a.D = a.ia.bind(a);
      a.C = a.ga.bind(a);
      a.F = E.bind(null, "expandfinish", a);
      a.B = E.bind(null, "collapsefinish", a);
      a.S = a.ha.bind(a);
      a.m = a.oa.bind(a);
      a.H = a.M.bind(a);
      a.Y = a.ma.bind(a);
      a.ba = a.na.bind(a);
      a.h = null;
      a.c = null;
      a.v = !1;
      a.u = !1;
      a.O = [];
      a.s = !1;
      a.J = !1;
      a.o = null;
      a.j = !1;
      a.G = !1;
      a.I = window.innerHeight >= window.innerWidth ? 1 : 2;
      a.b = null;
      a.g = null;
      a.V = !1;
      return a;
    },
    M = HTMLElement;
  L.prototype = h(M.prototype);
  L.prototype.constructor = L;
  if (q) q(L, M);
  else
    for (var N in M)
      if ("prototype" != N)
        if (Object.defineProperties) {
          var O = Object.getOwnPropertyDescriptor(M, N);
          O && Object.defineProperty(L, N, O);
        } else L[N] = M[N];
  g = L.prototype;
  g.connectedCallback = function () {
    var a = this;
    this.V ||
      ((this.J = this.hasAttribute("fullscreen")),
      (document.body.style.opacity = "0"),
      (this.V = !0));
    Enabler.addEventListener(studio.events.StudioEvent.EXPAND_START, this.D);
    Enabler.addEventListener(studio.events.StudioEvent.COLLAPSE_START, this.C);
    Enabler.addEventListener(
      studio.events.StudioEvent.FULLSCREEN_EXPAND_START,
      this.D
    );
    Enabler.addEventListener(
      studio.events.StudioEvent.FULLSCREEN_COLLAPSE_START,
      this.C
    );
    Enabler.addEventListener(studio.events.StudioEvent.EXPAND_FINISH, this.F);
    Enabler.addEventListener(studio.events.StudioEvent.COLLAPSE_FINISH, this.B);
    Enabler.addEventListener(
      studio.events.StudioEvent.FULLSCREEN_EXPAND_FINISH,
      this.F
    );
    Enabler.addEventListener(
      studio.events.StudioEvent.FULLSCREEN_COLLAPSE_FINISH,
      this.B
    );
    Enabler.addEventListener(
      studio.events.StudioEvent.FULLSCREEN_DIMENSIONS,
      this.S
    );
    window.addEventListener("resize", this.ba, !1);
    (0, I.W)(window);
    setTimeout(function () {
      a.a = a.querySelector("gwd-pagedeck");
      a.a.addEventListener("pagetransitionend", a.Y, !1);
      a.b = document.getElementById(a.getAttribute("data-provider"));
      a.g = document.querySelector("gwd-data-binder");
      var b = a.querySelector("gwd-metric-configuration"),
        c = new v();
      if (b) {
        b = Array.prototype.slice.call(
          b.getElementsByTagName("gwd-metric-event")
        );
        for (var d = 0; d < b.length; d++) {
          var e = b[d],
            f = e.getAttribute("source");
          if (f) {
            var m = e.getAttribute("exit");
            e = {
              event: e.getAttribute("event"),
              ra: e.getAttribute("metric") || m,
              ea: e.hasAttribute("cumulative"),
              exit: m,
            };
            c.add(P(f), e);
          }
        }
      }
      a.i = c;
      a.X = new B(a.i, a.H);
    }, 0);
  };
  g.disconnectedCallback = function () {
    Enabler.removeEventListener(studio.events.StudioEvent.INIT, this.T);
    Enabler.removeEventListener(studio.events.StudioEvent.VISIBLE, this.K);
    Enabler.removeEventListener(studio.events.StudioEvent.PAGE_LOADED, this.U);
    Enabler.removeEventListener(studio.events.StudioEvent.EXPAND_START, this.D);
    Enabler.removeEventListener(
      studio.events.StudioEvent.COLLAPSE_START,
      this.C
    );
    Enabler.removeEventListener(
      studio.events.StudioEvent.FULLSCREEN_EXPAND_START,
      this.D
    );
    Enabler.removeEventListener(
      studio.events.StudioEvent.FULLSCREEN_COLLAPSE_START,
      this.C
    );
    Enabler.removeEventListener(
      studio.events.StudioEvent.EXPAND_FINISH,
      this.F
    );
    Enabler.removeEventListener(
      studio.events.StudioEvent.COLLAPSE_FINISH,
      this.B
    );
    Enabler.removeEventListener(
      studio.events.StudioEvent.FULLSCREEN_EXPAND_FINISH,
      this.F
    );
    Enabler.removeEventListener(
      studio.events.StudioEvent.FULLSCREEN_COLLAPSE_FINISH,
      this.B
    );
    Enabler.removeEventListener(
      studio.events.StudioEvent.FULLSCREEN_DIMENSIONS,
      this.S
    );
    this.a.removeEventListener("pagetransitionend", this.Y, !1);
    window.removeEventListener("resize", this.ba, !1);
    this.b && this.h && this.b.removeEventListener("ready", this.h);
    this.g && this.c && this.g.removeEventListener("bindingfinished", this.c);
    Enabler.removeEventListener(
      studio.events.StudioEvent.HOSTPAGE_SCROLL,
      this.m,
      !1
    );
    window.removeEventListener("message", this.m, !1);
  };
  g.initAd = function () {
    this.s = !1;
    var a = this.T;
    Enabler.removeEventListener(studio.events.StudioEvent.INIT, a);
    Enabler.addEventListener(studio.events.StudioEvent.INIT, a);
    Enabler.isInitialized() && a();
  };
  g.exit = function (a, b, c, d, e) {
    c = void 0 === c ? !1 : c;
    d = void 0 === d ? !0 : d;
    Enabler.exit(a, b);
    d && Q(this);
    c && this.goToPage(e);
  };
  g.exitOverride = function (a, b, c, d, e) {
    c = void 0 === c ? !1 : c;
    d = void 0 === d ? !0 : d;
    Enabler.exitOverride(a, b);
    d && Q(this);
    c && this.goToPage(e);
  };
  g.incrementCounter = function (a, b) {
    Enabler.counter(a, b);
  };
  g.startTimer = function (a) {
    Enabler.startTimer(a);
  };
  g.stopTimer = function (a) {
    Enabler.stopTimer(a);
  };
  g.reportManualClose = function () {
    Enabler.reportManualClose();
  };
  g.M = function (a) {
    var b = a.target,
      c = P(b),
      d = c + ": " + a.type;
    a: {
      var e = x(this.i, c);
      for (var f = 0; f < e.length; f++)
        if (e[f].event == a.type) {
          e = e[f];
          break a;
        }
      e = void 0;
    }
    e.exit && a.detail && a.detail.url
      ? ((d = c + ": " + e.exit),
        a.detail["exit-id"] && (d = a.detail["exit-id"]),
        (b = ""),
        null != a.detail["product-index"] && (b = a.detail["product-index"]),
        this.b &&
        0 ==
          (this.b.getAttribute("gwd-schema-id") || "").indexOf(
            "dynamic_remarketing"
          )
          ? ((c = a.detail["action-event"]),
            (e = {}),
            c &&
              ((e.clickX = c.clientX || c.changedTouches[0].clientX),
              (e.clickY = c.clientY || c.changedTouches[0].clientY)),
            Enabler.dynamicExit(d, a.detail.url, b, void 0, e))
          : Enabler.exitOverride(d, a.detail.url),
        (a.detail.handled = !0),
        a.detail.collapse && this.goToPage())
      : (a = A(b)) && a.gwdIsActive() && this.incrementCounter(e.ra || d, e.ea);
  };
  g.ja = function () {
    var a = this;
    Enabler.removeEventListener(
      studio.events.StudioEvent.HOSTPAGE_SCROLL,
      this.m,
      !1
    );
    window.removeEventListener("message", this.m, !1);
    Enabler.isServingInLiveEnvironment()
      ? Enabler.addEventListener(
          studio.events.StudioEvent.HOSTPAGE_SCROLL,
          this.m,
          !1
        )
      : window.addEventListener("message", this.m, !1);
    var b = function () {
      if (a.hasAttribute("polite-load")) {
        var d = a.U;
        Enabler.isPageLoaded()
          ? d()
          : Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, d);
      } else
        (d = a.K),
          Enabler.isVisible()
            ? d()
            : Enabler.addEventListener(studio.events.StudioEvent.VISIBLE, d);
    };
    if (this.J) {
      var c = function (d) {
        a.o = !!d.supported;
        a.o && E("fullscreensupport", a);
        Enabler.removeEventListener(
          studio.events.StudioEvent.FULLSCREEN_SUPPORT,
          c
        );
        b();
      };
      Enabler.addEventListener(studio.events.StudioEvent.FULLSCREEN_SUPPORT, c);
      Enabler.queryFullscreenSupport();
    } else b();
  };
  g.la = function (a) {
    var b = this;
    if (this.s) this.b && this.R(null);
    else {
      var c;
      a && (c = a.detail);
      var d = this.ta.bind(this, c);
      this.b && (d = this.fa.bind(this, d));
      if (this.J) {
        Enabler.setResponsiveExpanding(!0);
        var e = function (f) {
          b.G = f;
          d();
        };
        Enabler.loadModule(studio.module.ModuleId.GDN, function () {
          var f = studio.sdk.gdn.getConfig();
          f.isInCreativeToolsetContext() ? f.isInterstitial(e) : d();
        });
      } else d();
    }
  };
  g.ka = function () {
    var a = this.K;
    Enabler.isVisible()
      ? a()
      : Enabler.addEventListener(studio.events.StudioEvent.VISIBLE, a);
  };
  g.fa = function (a) {
    this.b
      ? (this.h && this.b.removeEventListener("ready", this.h),
        (this.h = this.R.bind(this, a)),
        this.b.isDataLoaded() && this.h(),
        this.b.addEventListener("ready", this.h))
      : a();
  };
  g.R = function (a) {
    var b = !!a;
    if (this.g) {
      this.c &&
        (this.g.removeEventListener("bindingfinished", this.c),
        (this.c = null));
      var c = this.b.getData();
      c &&
        ((b = this.a.getElementsBySelector("*")),
        (b = b.concat(this.a.getPages())),
        this.g.bindData(c, b)
          ? this.Z(a)
          : ((this.c = this.Z.bind(this, a)),
            this.g.addEventListener("bindingfinished", this.c)),
        (b = !1));
    }
    b && a();
  };
  g.Z = function (a) {
    this.c &&
      (this.g.removeEventListener("bindingfinished", this.c), (this.c = null));
    if (this.s) {
      var b = document.getElementsByTagName("gwd-text-helper");
      0 < b.length && b[0].refitAll();
    }
    E("dynamicelementsready", this);
    a && a();
  };
  g.ta = function (a) {
    this.s ||
      ((this.s = !0),
      (document.body.style.opacity = ""),
      E("adinitialized", this, a),
      this.G
        ? ((a = this.a.getPage(
            this.a.findPageIndexByAttributeValue("expanded", !0)
          )),
          this.goToPage(a.id))
        : this.goToPage());
  };
  g.goToPage = function (a, b, c, d, e) {
    var f = this.a.getPage(this.a.currentIndex);
    if ((a = a ? this.a.getPage(a) : this.a.getDefaultPage())) {
      var m =
        !!f &&
        !!a &&
        !this.v &&
        !this.G &&
        !f.hasAttribute("expanded") &&
        a.hasAttribute("expanded");
      f =
        !!f &&
        !!a &&
        !this.u &&
        !this.G &&
        f.hasAttribute("expanded") &&
        !a.hasAttribute("expanded");
      (m && this.u) ||
        (f && this.v) ||
        (((this.f = a.id),
        b && (this.l = { transition: b, duration: c, easing: d, direction: e }),
        m)
          ? this.J && !1 !== this.o
            ? this.o && ((this.j = !0), Enabler.requestFullscreenExpand())
            : Enabler.requestExpand()
          : f
          ? this.j
            ? Enabler.requestFullscreenCollapse()
            : Enabler.requestCollapse()
          : ((this.u = this.v = !1), this.L()));
    }
  };
  g.ia = function () {
    E("expandstart", this);
    this.o
      ? ((this.j = !0), Enabler.finishFullscreenExpand())
      : Enabler.finishExpand();
    if (!this.f) {
      var a = this.a.getPage(
        this.a.findPageIndexByAttributeValue("expanded", !0)
      );
      a && (this.f = a.id);
    }
    a = this.a.getPage(this.a.currentIndex);
    this.v = !!a && this.f != a.id;
    window.setTimeout(this.L.bind(this), 30);
  };
  g.ga = function () {
    E("collapsestart", this);
    this.j
      ? (Enabler.finishFullscreenCollapse(), (this.j = !1))
      : Enabler.finishCollapse();
    this.f || (this.reportManualClose(), (this.f = this.a.getDefaultPage().id));
    var a = this.a.getPage(this.a.currentIndex);
    this.u = !!a && this.f != a.id;
    window.setTimeout(this.L.bind(this), 30);
  };
  g.oa = function (a) {
    if (Enabler.isServingInLiveEnvironment()) var b = a;
    else {
      if (!a.data || "string" !== typeof a.data) return;
      try {
        b = JSON.parse(a.data);
      } catch (c) {
        return;
      }
      if (b.eventType !== studio.events.StudioEvent.HOSTPAGE_SCROLL) return;
    }
    E("hostpagescroll", this, b);
  };
  g.na = function () {
    if (!this.f) {
      var a = window.innerHeight >= window.innerWidth ? 1 : 2;
      this.I != a &&
        ((this.I = a),
        (a = this.a.getPage(this.a.currentIndex)) &&
          window.setTimeout(this.goToPage.bind(this, a.id), 0));
    }
  };
  g.ha = function (a) {
    a && Enabler.setResponsiveSize(a.width, a.height);
  };
  g.L = function () {
    if (this.f) {
      this.I = window.innerHeight >= window.innerWidth ? 1 : 2;
      var a = this.a.getOrientationSpecificPage(this.I, this.f);
      this.l
        ? this.a.goToPage(
            a.id,
            this.l.transition,
            this.l.duration,
            this.l.easing,
            this.l.direction
          )
        : this.a.goToPage(a.id);
      this.j && a.classList.add("fs");
    }
    this.l = this.f = void 0;
  };
  g.ma = function (a) {
    this.u = this.v = !1;
    if (a.target == this.a) {
      var b = a.detail;
      a = b.outgoingPage;
      b = b.incomingPage;
      if (a) {
        var c = this.X;
        if (a.nodeType == Node.ELEMENT_NODE)
          for (var d = w(c.i), e = 0; e < d.length; e++) {
            var f = D(d[e]);
            if (f && y(a, f))
              for (var m = x(c.i, d[e]), C = 0; C < m.length; C++)
                f.removeEventListener(m[C].event, c.H, !1);
          }
        if ((a = a.querySelectorAll("video, gwd-video")) && 0 < a.length)
          for (this.P = []; this.O.length; )
            studio.video.Reporter.detach(this.O.shift());
      }
      this.X.observe(b);
      (a = b.querySelectorAll("video, gwd-video")) &&
        0 < a.length &&
        ((b = studio.video && studio.video.Reporter),
        (c = this.sa.bind(this)),
        (this.P = Array.prototype.slice.call(a)),
        b ? c() : Enabler.loadModule(studio.module.ModuleId.VIDEO, c));
    }
  };
  g.sa = function () {
    for (var a, b; this.P.length; )
      if (((b = this.P.shift()), (a = P(b))))
        studio.video.Reporter.attach(
          a,
          "gwd-video" == b.tagName.toLowerCase() ? b.nativeElement : b,
          b.autoplay
        ),
          this.O.push(a);
  };
  var P = function (a) {
      return "object" == typeof gwd && "GwdId" in gwd
        ? new gwd.GwdId(a).getString()
        : "string" == typeof a
        ? a
        : a.id;
    },
    Q = function (a) {
      a = Array.prototype.slice.call(
        a.a.querySelectorAll(
          "audio, video, gwd-video, gwd-youtube, gwd-youtube-livestream, gwd-audio"
        )
      );
      for (var b = 0; b < a.length; b++) a[b].pause();
    };
  customElements.define("gwd-google-ad", L);
}.call(this));
(function () {
  /*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
  "use strict";
  var d,
    e =
      "function" == typeof Object.create
        ? Object.create
        : function (a) {
            var b = function () {};
            b.prototype = a;
            return new b();
          },
    h = function (a) {
      a = [
        "object" == typeof globalThis && globalThis,
        a,
        "object" == typeof window && window,
        "object" == typeof self && self,
        "object" == typeof global && global,
      ];
      for (var b = 0; b < a.length; ++b) {
        var c = a[b];
        if (c && c.Math == Math) return c;
      }
      throw Error("Cannot find global object");
    },
    k = h(this),
    n;
  if ("function" == typeof Object.setPrototypeOf) n = Object.setPrototypeOf;
  else {
    var p;
    a: {
      var q = { j: !0 },
        r = {};
      try {
        r.__proto__ = q;
        p = r.j;
        break a;
      } catch (a) {}
      p = !1;
    }
    n = p
      ? function (a, b) {
          a.__proto__ = b;
          if (a.__proto__ !== b) throw new TypeError(a + " is not extensible");
          return a;
        }
      : null;
  }
  var u = n;
  var v = /^\d*\.?\d+\s\d*\.?\d+$/,
    w = function (a) {
      var b = !1,
        c = a.getAttribute("focalpoint"),
        g = a.getAttribute("scaling");
      ("cover" !== g && "none" !== g) ||
        a.hasAttribute("disablefocalpoint") ||
        !c ||
        !v.test(c) ||
        (b = !0);
      return b;
    };
  var x = function (a) {
      return (
        "gwd-page" == a.tagName.toLowerCase() ||
        "gwd-page" == a.getAttribute("is")
      );
    },
    y = function (a) {
      if (x(a)) return a;
      for (; a && 9 != a.nodeType; )
        if ((a = a.parentElement) && x(a)) return a;
      return null;
    };
  var z = function (a) {
    var b = !1,
      c = null;
    return function () {
      b = !0;
      c ||
        (b && (a(), (b = !1)),
        (c = window.setTimeout(function () {
          c = null;
          b && (a(), (b = !1));
        }, 250)));
    };
  };
  var A = ["alignment", "alt", "focalpoint", "scaling", "source"],
    B = function () {
      var a = HTMLElement.call(this) || this;
      a.a = document.createElement("img");
      a.g = a.l.bind(a);
      a.i = z(a.m.bind(a));
      a.b = 0;
      a.c = -1;
      a.f = -1;
      a.h = !1;
      a.a.addEventListener("load", a.g, !1);
      a.a.addEventListener("error", a.g, !1);
      return a;
    },
    C = HTMLElement;
  B.prototype = e(C.prototype);
  B.prototype.constructor = B;
  if (u) u(B, C);
  else
    for (var D in C)
      if ("prototype" != D)
        if (Object.defineProperties) {
          var E = Object.getOwnPropertyDescriptor(C, D);
          E && Object.defineProperty(B, D, E);
        } else B[D] = C[D];
  d = B.prototype;
  d.connectedCallback = function () {
    if (!this.h) {
      for (; this.firstChild; ) this.removeChild(this.firstChild);
      var a = this.getAttribute("src");
      a && (this.setAttribute("source", a), this.removeAttribute("src"));
      a = this.ownerDocument.createElement("div");
      a.classList.add("intermediate-element");
      a.appendChild(this.a);
      this.appendChild(a);
      this.h = !0;
    }
    this.gwdIsLoaded() ||
      ((a = y(this)) ? a.gwdIsLoaded() && this.gwdLoad() : this.gwdLoad());
    w(this) && window.addEventListener("resize", this.i, !1);
  };
  d.disconnectedCallback = function () {
    window.removeEventListener("resize", this.i, !1);
  };
  d.attributeChangedCallback = function (a) {
    if ("source" == a) 0 !== this.b && this.gwdLoad();
    else if ("scaling" == a) F(this);
    else if ("alignment" == a) G(this);
    else if ("focalpoint" == a) H(this);
    else if ("alt" == a) {
      var b = this.a;
      if (this.hasAttribute(a)) {
        var c = this.getAttribute(a);
        b.setAttribute(a, c);
      } else b.removeAttribute(a);
    }
  };
  d.l = function (a) {
    if (2 != this.b) {
      a && "error" == a.type
        ? ((this.b = 3),
          (this.c = this.f = -1),
          (this.a.style.backgroundImage = ""))
        : ((-1 != this.f && -1 != this.c) ||
            !this.getAttribute("source") ||
            ((this.f = this.naturalWidth), (this.c = this.naturalHeight)),
          (this.b = 2));
      F(this);
      w(this) ? H(this) : G(this);
      var b = void 0 === b ? null : b;
      a = document.createEvent("CustomEvent");
      a.initCustomEvent("ready", !0, !0, b);
      this.dispatchEvent(a);
    }
  };
  d.m = function () {
    w(this) && H(this);
  };
  d.gwdLoad = function () {
    this.b = 1;
    this.c = this.f = -1;
    var a =
      this.getAttribute("source") ||
      "data:image/gif;base64,R0lGODlhAQABAPAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
    this.a.setAttribute("src", a);
  };
  d.gwdIsLoaded = function () {
    return 2 == this.b || 3 == this.b;
  };
  var F = function (a) {
      if (2 == a.b) {
        var b = a.getAttribute("source"),
          c = a.getAttribute("scaling") || "stretch";
        "stretch" == c
          ? (a.classList.remove("scaled-proportionally"),
            (a.a.style.backgroundImage = ""),
            (a = a.a),
            (b =
              b ||
              "data:image/gif;base64,R0lGODlhAQABAPAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="),
            b != a.getAttribute("src") && a.setAttribute("src", b))
          : (a.classList.add("scaled-proportionally"),
            (a.a.style.backgroundImage = b
              ? "url(" + JSON.stringify(b) + ")"
              : ""),
            (a.a.style.backgroundSize = "none" != c ? c : "auto"),
            (b = a.a),
            "data:image/gif;base64,R0lGODlhAQABAPAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" !=
              b.getAttribute("src") &&
              b.setAttribute(
                "src",
                "data:image/gif;base64,R0lGODlhAQABAPAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
              ));
      }
    },
    G = function (a) {
      var b = a.getAttribute("alignment") || "center";
      a.a.style.backgroundPosition = b;
    },
    H = function (a) {
      var b = a.width,
        c = a.height,
        g = a.f,
        t = a.c,
        l = 1;
      "cover" == a.getAttribute("scaling") &&
        (l = c / b > t / g ? c / t : b / g);
      var f = a.getAttribute("focalpoint").split(" "),
        m = parseFloat(f[0]) * l - b / 2;
      f = parseFloat(f[1]) * l - c / 2;
      m = 0 < m ? Math.min(m, g * l - b) : 0;
      f = 0 < f ? Math.min(f, t * l - c) : 0;
      a.a.style.backgroundPositionX = -m + "px";
      a.a.style.backgroundPositionY = -f + "px";
    };
  k.Object.defineProperties(B.prototype, {
    nativeElement: {
      configurable: !0,
      enumerable: !0,
      get: function () {
        return this.a;
      },
    },
    assetHeight: {
      configurable: !0,
      enumerable: !0,
      get: function () {
        return this.c;
      },
    },
    assetWidth: {
      configurable: !0,
      enumerable: !0,
      get: function () {
        return this.f;
      },
    },
    naturalHeight: {
      configurable: !0,
      enumerable: !0,
      get: function () {
        return this.a.naturalHeight;
      },
    },
    naturalWidth: {
      configurable: !0,
      enumerable: !0,
      get: function () {
        return this.a.naturalWidth;
      },
    },
    height: {
      configurable: !0,
      enumerable: !0,
      get: function () {
        return this.a.height;
      },
      set: function (a) {
        this.a.height = a;
      },
    },
    width: {
      configurable: !0,
      enumerable: !0,
      get: function () {
        return this.a.width;
      },
      set: function (a) {
        this.a.width = a;
      },
    },
    alt: {
      configurable: !0,
      enumerable: !0,
      get: function () {
        return this.a.alt;
      },
      set: function (a) {
        this.a.alt = a;
      },
    },
    src: {
      configurable: !0,
      enumerable: !0,
      get: function () {
        return this.a.src;
      },
    },
  });
  k.Object.defineProperties(B, {
    observedAttributes: {
      configurable: !0,
      enumerable: !0,
      get: function () {
        return A;
      },
    },
  });
  customElements.define("gwd-image", B);
}.call(this));
(function () {
  /*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
  "use strict";
  var d,
    e =
      "function" == typeof Object.create
        ? Object.create
        : function (a) {
            var c = function () {};
            c.prototype = a;
            return new c();
          },
    f;
  if ("function" == typeof Object.setPrototypeOf) f = Object.setPrototypeOf;
  else {
    var g;
    a: {
      var h = { l: !0 },
        l = {};
      try {
        l.__proto__ = h;
        g = l.l;
        break a;
      } catch (a) {}
      g = !1;
    }
    f = g
      ? function (a, c) {
          a.__proto__ = c;
          if (a.__proto__ !== c) throw new TypeError(a + " is not extensible");
          return a;
        }
      : null;
  }
  var m = f;
  var n = function (a, c) {
    var b = void 0 === b ? null : b;
    var k = document.createEvent("CustomEvent");
    k.initCustomEvent(a, !0, !0, b);
    c.dispatchEvent(k);
  };
  var p = function () {
      var a = HTMLElement.call(this) || this;
      a.j = a.m.bind(a);
      a.a = [];
      a.g = !1;
      a.f = !1;
      a.b = !1;
      a.i = -1;
      a.h = -1;
      a.c = !1;
      return a;
    },
    q = HTMLElement;
  p.prototype = e(q.prototype);
  p.prototype.constructor = p;
  if (m) m(p, q);
  else
    for (var r in q)
      if ("prototype" != r)
        if (Object.defineProperties) {
          var t = Object.getOwnPropertyDescriptor(q, r);
          t && Object.defineProperty(p, r, t);
        } else p[r] = q[r];
  d = p.prototype;
  d.connectedCallback = function () {
    var a = this;
    this.i =
      parseInt(this.getAttribute("data-gwd-width"), 10) || this.clientWidth;
    this.h =
      parseInt(this.getAttribute("data-gwd-height"), 10) || this.clientHeight;
    this.addEventListener("ready", this.j, !1);
    this.style.visibility = "hidden";
    setTimeout(function () {
      a.a = Array.prototype.slice
        .call(a.querySelectorAll("*"))
        .filter(function (c) {
          return "function" != typeof c.gwdLoad ||
            "function" != typeof c.gwdIsLoaded ||
            c.gwdIsLoaded()
            ? !1
            : !0;
        }, a);
      a.g = !0;
      0 < a.a.length ? (a.f = !1) : u(a);
      a.b = !0;
      n("attached", a);
    }, 0);
  };
  d.disconnectedCallback = function () {
    this.removeEventListener("ready", this.j, !1);
    this.classList.remove("gwd-play-animation");
    n("detached", this);
  };
  d.gwdActivate = function () {
    this.classList.remove("gwd-inactive");
    Array.prototype.slice
      .call(this.querySelectorAll("*"))
      .forEach(function (a) {
        "function" == typeof a.gwdActivate &&
          "function" == typeof a.gwdIsActive &&
          0 == a.gwdIsActive() &&
          a.gwdActivate();
      });
    this.c = !0;
    this.b ? (this.b = !1) : n("attached", this);
    n("pageactivated", this);
  };
  d.gwdDeactivate = function () {
    this.classList.add("gwd-inactive");
    this.classList.remove("gwd-play-animation");
    var a = Array.prototype.slice.call(this.querySelectorAll("*"));
    a.push(this);
    for (var c = 0; c < a.length; c++) {
      var b = a[c];
      if (
        b.classList &&
        (b.classList.remove("gwd-pause-animation"),
        b.hasAttribute("data-gwd-current-label"))
      ) {
        var k = b.getAttribute("data-gwd-current-label");
        b.classList.remove(k);
        b.removeAttribute("data-gwd-current-label");
      }
      delete b.gwdGotoCounters;
      b != this &&
        "function" == typeof b.gwdDeactivate &&
        "function" == typeof b.gwdIsActive &&
        1 == b.gwdIsActive() &&
        b.gwdDeactivate();
    }
    this.c = !1;
    n("pagedeactivated", this);
    n("detached", this);
  };
  d.gwdIsActive = function () {
    return this.c;
  };
  d.gwdIsLoaded = function () {
    return this.g && 0 == this.a.length;
  };
  d.gwdLoad = function () {
    if (this.gwdIsLoaded()) u(this);
    else for (var a = this.a.length - 1; 0 <= a; a--) this.a[a].gwdLoad();
  };
  d.m = function (a) {
    a = this.a.indexOf(a.target);
    -1 < a && (this.a.splice(a, 1), 0 == this.a.length && u(this));
  };
  var u = function (a) {
    a.style.visibility = "";
    a.f || (n("ready", a), n("pageload", a));
    a.f = !0;
  };
  p.prototype.gwdPresent = function () {
    n("pagepresenting", this);
    this.classList.add("gwd-play-animation");
  };
  p.prototype.isPortrait = function () {
    return this.h >= this.i;
  };
  customElements.define("gwd-page", p);
}.call(this));
(function () {
  /*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
  "use strict";
  var g,
    k = function (a) {
      a = [
        "object" == typeof globalThis && globalThis,
        a,
        "object" == typeof window && window,
        "object" == typeof self && self,
        "object" == typeof global && global,
      ];
      for (var b = 0; b < a.length; ++b) {
        var c = a[b];
        if (c && c.Math == Math) return c;
      }
      throw Error("Cannot find global object");
    },
    m = k(this),
    n =
      "function" == typeof Object.create
        ? Object.create
        : function (a) {
            var b = function () {};
            b.prototype = a;
            return new b();
          },
    p;
  if ("function" == typeof Object.setPrototypeOf) p = Object.setPrototypeOf;
  else {
    var q;
    a: {
      var r = { J: !0 },
        t = {};
      try {
        t.__proto__ = r;
        q = t.J;
        break a;
      } catch (a) {}
      q = !1;
    }
    p = q
      ? function (a, b) {
          a.__proto__ = b;
          if (a.__proto__ !== b) throw new TypeError(a + " is not extensible");
          return a;
        }
      : null;
  }
  var u = p,
    goog = goog || {},
    v = this || self,
    w = Date.now,
    x = function (a, b) {
      a = a.split(".");
      var c = v;
      a[0] in c ||
        "undefined" == typeof c.execScript ||
        c.execScript("var " + a[0]);
      for (var d; a.length && (d = a.shift()); )
        a.length || void 0 === b
          ? (c = c[d] && c[d] !== Object.prototype[d] ? c[d] : (c[d] = {}))
          : (c[d] = b);
    };
  var y = function (a, b, c) {
      c = void 0 === c ? null : c;
      var d = document.createEvent("CustomEvent");
      d.initCustomEvent(a, !0, !0, c);
      b.dispatchEvent(d);
    },
    z = function (a, b, c) {
      var d = function (e) {
        a.removeEventListener(b, d);
        c(e);
      };
      a.addEventListener(b, d);
    };
  var A = "center top bottom left right transparent".split(" ");
  var B = ["-ms-", "-moz-", "-webkit-", ""],
    C = function (a, b) {
      var c = void 0 === c ? !1 : c;
      for (var d, e, f = 0; f < B.length; f++)
        (d = B[f] + "transition-duration"),
          (e = (c ? B[f] : "") + b),
          a.style.setProperty(d, e);
    },
    D = function (a) {
      var b = document,
        c = b.getElementsByTagName("head")[0];
      if (!c) {
        var d = b.getElementsByTagName("body")[0];
        c = b.createElement("head");
        d.parentNode.insertBefore(c, d);
      }
      b = b.createElement("style");
      b.textContent = a;
      c.appendChild(b);
      return b;
    };
  var E = function (a) {
      for (var b = 0; b < A.length; b++) a.classList.remove(A[b]);
    },
    F = function (a, b) {
      var c = function () {
        a.removeEventListener("webkitTransitionEnd", c);
        a.removeEventListener("transitionend", c);
        b();
      };
      a.addEventListener("webkitTransitionEnd", c);
      a.addEventListener("transitionend", c);
    },
    G = function (a, b, c, d) {
      c =
        "transform: matrix3d(1,0,0,0,0,1,0,0,0,0,1,0," + c + "," + d + ",0,1);";
      return a + "." + b + "{-webkit-" + c + "-moz-" + c + "-ms-" + c + c + "}";
    },
    H = function (a, b, c) {
      a = (a && "#") + a + ".gwd-pagedeck > .gwd-page";
      return (
        G(a, "center", 0, 0) +
        G(a, "top", 0, c) +
        G(a, "bottom", 0, -c) +
        G(a, "left", b, 0) +
        G(a, "right", -b, 0)
      );
    },
    I = function (a, b, c, d, e, f, h) {
      d = void 0 === d ? "none" : d;
      this.b = a;
      this.c = b;
      this.C = c;
      this.h = "none" == d ? 0 : void 0 === e ? 1e3 : e;
      this.i = void 0 === f ? "linear" : f;
      this.l = [];
      if (this.h) {
        a = d;
        h = void 0 === h ? "top" : h;
        if (this.b) {
          this.b.classList.add("gwd-page");
          this.b.classList.add("center");
          b = "center";
          if ("push" == a)
            switch (h) {
              case "top":
                b = "top";
                break;
              case "bottom":
                b = "bottom";
                break;
              case "left":
                b = "left";
                break;
              case "right":
                b = "right";
            }
          this.l.push(b);
          "fade" == a && this.l.push("transparent");
        }
        b = "center";
        if ("none" != a && "fade" != a)
          switch (h) {
            case "top":
              b = "bottom";
              break;
            case "bottom":
              b = "top";
              break;
            case "left":
              b = "right";
              break;
            case "right":
              b = "left";
          }
        this.c.classList.add(b);
        this.c.classList.add("gwd-page");
        "fade" == a && this.c.classList.add("transparent");
      }
    };
  I.prototype.start = function () {
    if (this.h) {
      F(this.c, this.R.bind(this));
      this.b && (C(this.b, this.h + "ms"), this.b.classList.add(this.i));
      C(this.c, this.h + "ms");
      this.c.classList.add(this.i);
      var a = this.c;
      a.setAttribute("gwd-reflow", a.offsetWidth);
      if (this.b)
        for (a = 0; a < this.l.length; a++) this.b.classList.add(this.l[a]);
      E(this.c);
    } else this.C();
  };
  I.prototype.R = function () {
    this.b && (E(this.b), C(this.b, 0), this.b.classList.remove(this.i));
    C(this.c, 0);
    this.c.classList.remove(this.i);
    this.C();
  };
  var J = function () {
    this.H = "";
  };
  J.prototype.toString = function () {
    return "SafeStyle{" + this.H + "}";
  };
  J.prototype.m = function (a) {
    this.H = a;
  };
  new J().m("");
  var K = function () {
    this.G = "";
  };
  K.prototype.toString = function () {
    return "SafeStyleSheet{" + this.G + "}";
  };
  K.prototype.m = function (a) {
    this.G = a;
  };
  new K().m("");
  Object.freeze && Object.freeze([]);
  var L = function (a, b) {
    var c =
      (c = v.performance) && c.now && c.timing
        ? Math.floor(c.now() + c.timing.navigationStart)
        : w();
    a = { label: a, type: 9, value: c };
    b = b.google_js_reporting_queue = b.google_js_reporting_queue || [];
    2048 > b.length && b.push(a);
  };
  var N = {},
    O = !1,
    P = !1;
  N.O = function (a) {
    O || ((O = !0), L("11", a));
  };
  N.B = function (a) {
    P || ((P = !0), L("12", a));
  };
  N.P = function (a, b, c) {
    c = void 0 === c ? 0 : c;
    var d = b;
    d = void 0 === d ? v : d;
    if ((d = (d = d.performance) && d.now ? d.now() : null))
      (a = { label: a, type: c, value: d }),
        (b = b.google_js_reporting_queue = b.google_js_reporting_queue || []),
        2048 > b.length && b.push(a);
  };
  N.reset = function (a) {
    P = O = !1;
    (a.google_js_reporting_queue =
      a.google_js_reporting_queue || []).length = 0;
  };
  x("gwd.rumUtil", N);
  x("gwd.rumUtil.logContentLoading", N.O);
  x("gwd.rumUtil.logContentRendered", N.B);
  x("gwd.rumUtil.logTimingEvent", N.P);
  x("gwd.rumUtil.reset", N.reset);
  var Q = function () {
      var a = HTMLElement.call(this) || this;
      z(window, "WebComponentsReady", a.N.bind(a));
      a.v = a.j.bind(a, "shake");
      a.A = a.j.bind(a, "tilt");
      a.u = a.j.bind(a, "rotatetoportrait");
      a.s = a.j.bind(a, "rotatetolandscape");
      a.a = [];
      a.D = a.M.bind(a);
      a.K = a.L.bind(a);
      a.F = null;
      a.g = null;
      a.f = -1;
      a.o = !1;
      return a;
    },
    R = HTMLElement;
  Q.prototype = n(R.prototype);
  Q.prototype.constructor = Q;
  if (u) u(Q, R);
  else
    for (var S in R)
      if ("prototype" != S)
        if (Object.defineProperties) {
          var T = Object.getOwnPropertyDescriptor(R, S);
          T && Object.defineProperty(Q, S, T);
        } else Q[S] = R[S];
  Q.prototype.connectedCallback = function () {
    this.addEventListener("pageload", this.D, !1);
    document.body.addEventListener("shake", this.v, !0);
    document.body.addEventListener("tilt", this.A, !0);
    document.body.addEventListener("rotatetoportrait", this.u, !0);
    document.body.addEventListener("rotatetolandscape", this.s, !0);
  };
  Q.prototype.disconnectedCallback = function () {
    this.removeEventListener("pageload", this.D, !1);
    document.body &&
      (document.body.removeEventListener("shake", this.v, !0),
      document.body.removeEventListener("tilt", this.A, !0),
      document.body.removeEventListener("rotatetoportrait", this.u, !0),
      document.body.removeEventListener("rotatetolandscape", this.s, !0));
  };
  Q.prototype.N = function () {
    this.classList.add("gwd-pagedeck");
    this.F || (this.F = D(H(this.id, this.offsetWidth, this.offsetHeight)));
    this.a = Array.prototype.slice.call(this.querySelectorAll("gwd-page"));
    this.a.forEach(function (a) {
      a.classList.add("gwd-page");
    });
    for (
      y("beforepagesdetached", this, { pages: this.a.slice() });
      this.firstChild;

    )
      this.removeChild(this.firstChild);
    -1 == this.f && void 0 !== this.I && this.goToPage(this.I);
  };
  var V = function (a, b, c, d, e, f) {
    if (!(a.f == b || 0 > b || b > a.a.length - 1 || a.g)) {
      var h = a.a[a.f],
        l = a.a[b];
      a.f = b;
      a.g = new I(h, l, a.K, c, d, e, f);
      var M = l.gwdLoad && !l.gwdIsLoaded();
      a.o = M;
      z(l, "attached", function () {
        l.gwdActivate();
        M ? l.gwdLoad() : U(a);
      });
      a.appendChild(l);
    }
  };
  Q.prototype.M = function (a) {
    this.o && a.target.parentNode == this && (U(this), (this.o = !1));
  };
  var U = function (a) {
    (0, N.B)(window);
    a.g.start();
    y("pagetransitionstart", a);
  };
  g = Q.prototype;
  g.L = function () {
    if (this.g) {
      var a = this.g.b,
        b = this.g.c;
      this.g = null;
      y("pagetransitionend", this, {
        outgoingPage: a ? a : null,
        incomingPage: b,
      });
      a && a.gwdDeactivate();
      b.gwdPresent();
    }
  };
  g.findPageIndexByAttributeValue = function (a, b) {
    for (var c = this.a.length, d, e = 0; e < c; e++)
      if (((d = this.a[e]), "boolean" == typeof b)) {
        if (d.hasAttribute(a)) return e;
      } else if (d.getAttribute(a) == b) return e;
    return -1;
  };
  g.goToNextPage = function (a, b, c, d, e) {
    var f = this.f,
      h = f + 1;
    h >= this.a.length && (h = a ? 0 : f);
    V(this, h, b, c, d, e);
  };
  g.goToPreviousPage = function (a, b, c, d, e) {
    var f = this.f,
      h = this.a.length,
      l = f - 1;
    0 > l && (l = a ? h - 1 : f);
    V(this, l, b, c, d, e);
  };
  g.goToPage = function (a, b, c, d, e) {
    this.a.length
      ? ((a =
          "number" == typeof a
            ? a
            : this.findPageIndexByAttributeValue("id", a)),
        0 <= a && V(this, a, b, c, d, e))
      : (this.I = a);
  };
  g.getPages = function () {
    return this.a;
  };
  g.getPage = function (a) {
    if ("number" != typeof a) {
      if (!a) return null;
      a = this.findPageIndexByAttributeValue("id", a);
    }
    return 0 > a || a > this.a.length - 1 ? null : this.a[a];
  };
  g.getCurrentPage = function () {
    return this.getPage(this.f);
  };
  g.getDefaultPage = function () {
    var a = this.getAttribute("default-page");
    return a
      ? this.getPage(this.findPageIndexByAttributeValue("id", a))
      : this.getPage(0);
  };
  g.getOrientationSpecificPage = function (a, b) {
    b = this.getPage(b);
    var c = b.getAttribute("alt-orientation-page");
    if (!c) return b;
    var d = b.isPortrait();
    a = 1 == a;
    c = this.getPage(c);
    return a == d ? b : c;
  };
  g.j = function (a, b) {
    if (b.target == document.body) {
      var c = this.getPage(this.f);
      y(a, c, b.detail);
    }
  };
  g.getElementById = function (a) {
    for (var b = this.a.length, c = 0; c < b; c++) {
      var d = this.a[c].querySelector("#" + a);
      if (d) return d;
    }
    return null;
  };
  g.getElementsBySelector = function (a) {
    for (var b = this.a.length, c = [], d = 0; d < b; d++) {
      var e = this.a[d].querySelectorAll(a);
      e && (c = c.concat(Array.prototype.slice.call(e)));
    }
    return c;
  };
  m.Object.defineProperties(Q.prototype, {
    currentIndex: {
      configurable: !0,
      enumerable: !0,
      get: function () {
        return 0 <= this.f ? this.f : void 0;
      },
    },
  });
  customElements.define("gwd-pagedeck", Q);
}.call(this));
