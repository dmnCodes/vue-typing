import { defineComponent as b, ref as s, computed as k, onUnmounted as B, openBlock as M, createBlock as N, resolveDynamicComponent as V, withCtx as $, renderSlot as m, createElementVNode as v, toDisplayString as y, normalizeClass as z, nextTick as A } from "vue";
const E = {
  class: "sentence",
  "data-id": "dmn-typing-sentence"
}, W = /* @__PURE__ */ b({
  __name: "dmnTyping",
  props: {
    sentences: {},
    minTypeSpeed: { default: 50 },
    maxTypeSpeed: { default: 150 },
    eraseSpeed: { default: 100 },
    eraseDelay: { default: 1500 },
    writeDelay: { default: 0 },
    caret: { default: "_" },
    loop: { type: Boolean, default: !1 },
    tag: { default: "div" }
  },
  emits: ["sentence:typed"],
  setup(g, { emit: T }) {
    const e = g, h = T, u = s(""), c = s(0), a = s(!1), n = s(0), l = s(0);
    let o, r;
    const S = k(() => ({
      caret: !0,
      typing: a.value
    }));
    function C() {
      A(() => {
        o = setTimeout(i, e.writeDelay);
      });
    }
    function i() {
      var t;
      l.value < ((t = e.sentences[n.value]) == null ? void 0 : t.length) ? (a.value = !0, D()) : _();
    }
    function D() {
      u.value += e.sentences[n.value].charAt(
        l.value
      ), l.value += 1;
      const t = w(e.minTypeSpeed, e.maxTypeSpeed);
      o = setTimeout(i, t);
    }
    function _() {
      if (h("sentence:typed", e.sentences[n.value]), c.value += 1, !e.loop && c.value === e.sentences.length) {
        a.value = !1;
        return;
      }
      e.loop ? (a.value = !1, r = setTimeout(p, e.eraseDelay)) : d();
    }
    function p() {
      l.value > 0 ? (a.value = !0, x()) : (a.value = !1, d());
    }
    function x() {
      u.value = e.sentences[n.value].substring(
        0,
        l.value - 1
      ), l.value -= 1, r = setTimeout(p, e.eraseSpeed);
    }
    function d() {
      n.value = (n.value + 1) % e.sentences.length, (e.loop || n.value > 0) && (a.value = !0, l.value = 0, o = setTimeout(i, e.writeDelay));
    }
    function w(t, f) {
      return Math.floor(Math.random() * (f - t + 1)) + t;
    }
    function I() {
      clearTimeout(o), clearTimeout(r);
    }
    return C(), B(() => {
      I();
    }), (t, f) => (M(), N(V(t.tag), {
      class: "dmn-typing",
      "data-id": "dmn-typing"
    }, {
      default: $(() => [
        m(t.$slots, "before", { dataId: "dmn-typing-before" }),
        v("span", E, y(u.value), 1),
        v("span", {
          class: z(S.value),
          "data-id": "dmn-typing-caret"
        }, y(e.caret), 3),
        m(t.$slots, "after", { dataId: "dmn-typing-after" })
      ]),
      _: 3
    }));
  }
});
export {
  W as default
};
