import { defineComponent as b, ref as s, computed as B, onUnmounted as M, watch as N, openBlock as V, createBlock as $, resolveDynamicComponent as z, withCtx as A, renderSlot as g, createElementVNode as T, toDisplayString as h, normalizeClass as E, nextTick as U } from "vue";
const W = {
  class: "sentence",
  "data-id": "dmn-typing-sentence"
}, q = /* @__PURE__ */ b({
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
  setup(S, { emit: C }) {
    const e = S, D = C, c = s(0), o = s(""), p = s(0), a = s(!1), n = s(0), l = s(0);
    let u, r;
    const _ = B(() => ({
      caret: !0,
      typing: a.value
    }));
    function d() {
      U(() => {
        u = setTimeout(i, e.writeDelay);
      });
    }
    function i() {
      var t;
      l.value < ((t = e.sentences[n.value]) == null ? void 0 : t.length) ? (a.value = !0, w()) : x();
    }
    function w() {
      o.value += e.sentences[n.value].charAt(
        l.value
      ), l.value += 1;
      const t = I(e.minTypeSpeed, e.maxTypeSpeed);
      u = setTimeout(i, t);
    }
    function x() {
      if (D("sentence:typed", e.sentences[n.value]), p.value += 1, !e.loop && p.value === e.sentences.length) {
        a.value = !1;
        return;
      }
      e.loop ? (a.value = !1, r = setTimeout(f, e.eraseDelay)) : m();
    }
    function f() {
      l.value > 0 ? (a.value = !0, k()) : (a.value = !1, m());
    }
    function k() {
      o.value = e.sentences[n.value].substring(
        0,
        l.value - 1
      ), l.value -= 1, r = setTimeout(f, e.eraseSpeed);
    }
    function m() {
      n.value = (n.value + 1) % e.sentences.length, (e.loop || n.value > 0) && (a.value = !0, l.value = 0, u = setTimeout(i, e.writeDelay));
    }
    function I(t, y) {
      return Math.floor(Math.random() * (y - t + 1)) + t;
    }
    function v() {
      clearTimeout(u), clearTimeout(r);
    }
    return d(), M(() => {
      v();
    }), N(
      e,
      () => {
        v(), d(), c.value++;
      },
      { deep: !0 }
    ), (t, y) => (V(), $(z(t.tag), {
      key: c.value,
      class: "dmn-typing",
      "data-id": "dmn-typing"
    }, {
      default: A(() => [
        g(t.$slots, "before", { dataId: "dmn-typing-before" }),
        T("span", W, h(o.value), 1),
        T("span", {
          class: E(_.value),
          "data-id": "dmn-typing-caret"
        }, h(e.caret), 3),
        g(t.$slots, "after", { dataId: "dmn-typing-after" })
      ]),
      _: 3
    }));
  }
});
export {
  q as default
};
