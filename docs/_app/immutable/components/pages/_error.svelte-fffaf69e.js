import{S as m,i as f,s as _,k as h,q as c,l as v,m as $,r as l,h as p,b as S,B as b,u as g,A as d,G as E}from"../../chunks/index-c6884d6c.js";import{s as j}from"../../chunks/singletons-cfd5ce0e.js";const k=()=>{const s=j,e={page:{subscribe:s.page.subscribe},navigating:{subscribe:s.navigating.subscribe},updated:s.updated};return Object.defineProperties(e,{preloading:{get(){return console.error("stores.preloading is deprecated; use stores.navigating instead"),{subscribe:s.navigating.subscribe}},enumerable:!1},session:{get(){return w(),{}},enumerable:!1}}),e},q={subscribe(s){return k().page.subscribe(s)}};function w(){throw new Error("stores.session is no longer available. See https://github.com/sveltejs/kit/discussions/5883")}function x(s){let e,a=s[0].status+"",n,o,i=s[0].error.message+"",u;return{c(){e=h("h1"),n=c(a),o=c(": "),u=c(i)},l(r){e=v(r,"H1",{});var t=$(e);n=l(t,a),o=l(t,": "),u=l(t,i),t.forEach(p)},m(r,t){S(r,e,t),b(e,n),b(e,o),b(e,u)},p(r,[t]){t&1&&a!==(a=r[0].status+"")&&g(n,a),t&1&&i!==(i=r[0].error.message+"")&&g(u,i)},i:d,o:d,d(r){r&&p(e)}}}function y(s,e,a){let n;return E(s,q,o=>a(0,n=o)),[n]}class C extends m{constructor(e){super(),f(this,e,y,x,_,{})}}export{C as default};