function d(){}const Nt=t=>t;function it(t,e){for(const n in e)t[n]=e[n];return t}function G(t){return t()}function D(){return Object.create(null)}function w(t){t.forEach(G)}function I(t){return typeof t=="function"}function st(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let v;function kt(t,e){return v||(v=document.createElement("a")),v.href=e,t===v.href}function rt(t){return Object.keys(t).length===0}function ot(t,...e){if(t==null)return d;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function St(t,e,n){t.$$.on_destroy.push(ot(e,n))}function Ct(t,e,n,i){if(t){const s=R(t,e,n,i);return t[0](s)}}function R(t,e,n,i){return t[1]&&i?it(n.ctx.slice(),t[1](i(e))):n.ctx}function zt(t,e,n,i){if(t[2]&&i){const s=t[2](i(n));if(e.dirty===void 0)return s;if(typeof s=="object"){const a=[],r=Math.max(e.dirty.length,s.length);for(let c=0;c<r;c+=1)a[c]=e.dirty[c]|s[c];return a}return e.dirty|s}return e.dirty}function Mt(t,e,n,i,s,a){if(s){const r=R(e,n,i,a);t.p(r,s)}}function qt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function jt(t,e,n){return t.set(n),e}function Ht(t){return t&&I(t.destroy)?t.destroy:d}const J=typeof window<"u";let Lt=J?()=>window.performance.now():()=>Date.now(),K=J?t=>requestAnimationFrame(t):d;const m=new Set;function Q(t){m.forEach(e=>{e.c(t)||(m.delete(e),e.f())}),m.size!==0&&K(Q)}function Dt(t){let e;return m.size===0&&K(Q),{promise:new Promise(n=>{m.add(e={c:t,f:n})}),abort(){m.delete(e)}}}let k=!1;function ct(){k=!0}function lt(){k=!1}function at(t,e,n,i){for(;t<e;){const s=t+(e-t>>1);n(s)<=i?t=s+1:e=s}return t}function ut(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const o=[];for(let l=0;l<e.length;l++){const f=e[l];f.claim_order!==void 0&&o.push(f)}e=o}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let s=0;for(let o=0;o<e.length;o++){const l=e[o].claim_order,f=(s>0&&e[n[s]].claim_order<=l?s+1:at(1,s,$=>e[n[$]].claim_order,l))-1;i[o]=n[f]+1;const u=f+1;n[u]=o,s=Math.max(u,s)}const a=[],r=[];let c=e.length-1;for(let o=n[s]+1;o!=0;o=i[o-1]){for(a.push(e[o-1]);c>=o;c--)r.push(e[c]);c--}for(;c>=0;c--)r.push(e[c]);a.reverse(),r.sort((o,l)=>o.claim_order-l.claim_order);for(let o=0,l=0;o<r.length;o++){for(;l<a.length&&r[o].claim_order>=a[l].claim_order;)l++;const f=l<a.length?a[l]:null;t.insertBefore(r[o],f)}}function ft(t,e){t.appendChild(e)}function dt(t,e){if(k){for(ut(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function _t(t,e,n){t.insertBefore(e,n||null)}function ht(t,e,n){k&&!n?dt(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function b(t){t.parentNode.removeChild(t)}function Pt(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function q(t){return document.createElement(t)}function U(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function j(t){return document.createTextNode(t)}function Bt(){return j(" ")}function Wt(){return j("")}function P(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function Ot(t){return function(e){return e.preventDefault(),t.call(this,e)}}function V(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function Ft(t,e){for(const n in e)V(t,n,e[n])}function Gt(t,e,n){e in t?t[e]=typeof t[e]=="boolean"&&n===""?!0:n:V(t,e,n)}function mt(t){return Array.from(t.childNodes)}function X(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function Y(t,e,n,i,s=!1){X(t);const a=(()=>{for(let r=t.claim_info.last_index;r<t.length;r++){const c=t[r];if(e(c)){const o=n(c);return o===void 0?t.splice(r,1):t[r]=o,s||(t.claim_info.last_index=r),c}}for(let r=t.claim_info.last_index-1;r>=0;r--){const c=t[r];if(e(c)){const o=n(c);return o===void 0?t.splice(r,1):t[r]=o,s?o===void 0&&t.claim_info.last_index--:t.claim_info.last_index=r,c}}return i()})();return a.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,a}function Z(t,e,n,i){return Y(t,s=>s.nodeName===e,s=>{const a=[];for(let r=0;r<s.attributes.length;r++){const c=s.attributes[r];n[c.name]||a.push(c.name)}a.forEach(r=>s.removeAttribute(r))},()=>i(e))}function It(t,e,n){return Z(t,e,n,q)}function Rt(t,e,n){return Z(t,e,n,U)}function pt(t,e){return Y(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>j(e),!0)}function Jt(t){return pt(t," ")}function B(t,e,n){for(let i=n;i<t.length;i+=1){const s=t[i];if(s.nodeType===8&&s.textContent.trim()===e)return i}return t.length}function Kt(t,e){const n=B(t,"HTML_TAG_START",0),i=B(t,"HTML_TAG_END",n);if(n===i)return new W(void 0,e);X(t);const s=t.splice(n,i-n+1);b(s[0]),b(s[s.length-1]);const a=s.slice(1,s.length-1);for(const r of a)r.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1;return new W(a,e)}function Qt(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function Ut(t,e,n,i){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}let E;function yt(){if(E===void 0){E=!1;try{typeof window<"u"&&window.parent&&window.parent.document}catch{E=!0}}return E}function Vt(t,e){getComputedStyle(t).position==="static"&&(t.style.position="relative");const i=q("iframe");i.setAttribute("style","display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;"),i.setAttribute("aria-hidden","true"),i.tabIndex=-1;const s=yt();let a;return s?(i.src="data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>",a=P(window,"message",r=>{r.source===i.contentWindow&&e()})):(i.src="about:blank",i.onload=()=>{a=P(i.contentWindow,"resize",e)}),ft(t,i),()=>{(s||a&&i.contentWindow)&&a(),b(i)}}function Xt(t,e,n){t.classList[n?"add":"remove"](e)}function bt(t,e,{bubbles:n=!1,cancelable:i=!1}={}){const s=document.createEvent("CustomEvent");return s.initCustomEvent(t,n,i,e),s}function Yt(t,e=document.body){return Array.from(e.querySelectorAll(t))}class gt{constructor(e=!1){this.is_svg=!1,this.is_svg=e,this.e=this.n=null}c(e){this.h(e)}m(e,n,i=null){this.e||(this.is_svg?this.e=U(n.nodeName):this.e=q(n.nodeName),this.t=n,this.c(e)),this.i(i)}h(e){this.e.innerHTML=e,this.n=Array.from(this.e.childNodes)}i(e){for(let n=0;n<this.n.length;n+=1)_t(this.t,this.n[n],e)}p(e){this.d(),this.h(e),this.i(this.a)}d(){this.n.forEach(b)}}class W extends gt{constructor(e,n=!1){super(n),this.e=this.n=null,this.l=e}c(e){this.l?this.n=this.l:super.c(e)}i(e){for(let n=0;n<this.n.length;n+=1)ht(this.t,this.n[n],e)}}let g;function y(t){g=t}function x(){if(!g)throw new Error("Function called outside component initialization");return g}function Zt(t){x().$$.on_mount.push(t)}function te(t){x().$$.after_update.push(t)}function ee(t){x().$$.on_destroy.push(t)}function ne(){const t=x();return(e,n,{cancelable:i=!1}={})=>{const s=t.$$.callbacks[e];if(s){const a=bt(e,n,{cancelable:i});return s.slice().forEach(r=>{r.call(t,a)}),!a.defaultPrevented}return!0}}function ie(t,e){return x().$$.context.set(t,e),e}const p=[],O=[],T=[],C=[],tt=Promise.resolve();let z=!1;function et(){z||(z=!0,tt.then(nt))}function se(){return et(),tt}function M(t){T.push(t)}function re(t){C.push(t)}const S=new Set;let A=0;function nt(){const t=g;do{for(;A<p.length;){const e=p[A];A++,y(e),wt(e.$$)}for(y(null),p.length=0,A=0;O.length;)O.pop()();for(let e=0;e<T.length;e+=1){const n=T[e];S.has(n)||(S.add(n),n())}T.length=0}while(p.length);for(;C.length;)C.pop()();z=!1,S.clear(),y(t)}function wt(t){if(t.fragment!==null){t.update(),w(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(M)}}const N=new Set;let _;function oe(){_={r:0,c:[],p:_}}function ce(){_.r||w(_.c),_=_.p}function xt(t,e){t&&t.i&&(N.delete(t),t.i(e))}function le(t,e,n,i){if(t&&t.o){if(N.has(t))return;N.add(t),_.c.push(()=>{N.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}const ae=typeof window<"u"?window:typeof globalThis<"u"?globalThis:global;function ue(t,e){const n={},i={},s={$$scope:1};let a=t.length;for(;a--;){const r=t[a],c=e[a];if(c){for(const o in r)o in c||(i[o]=1);for(const o in c)s[o]||(n[o]=c[o],s[o]=1);t[a]=c}else for(const o in r)s[o]=1}for(const r in i)r in n||(n[r]=void 0);return n}function fe(t,e,n){const i=t.$$.props[e];i!==void 0&&(t.$$.bound[i]=n,n(t.$$.ctx[i]))}function de(t){t&&t.c()}function _e(t,e){t&&t.l(e)}function $t(t,e,n,i){const{fragment:s,on_mount:a,on_destroy:r,after_update:c}=t.$$;s&&s.m(e,n),i||M(()=>{const o=a.map(G).filter(I);r?r.push(...o):w(o),t.$$.on_mount=[]}),c.forEach(M)}function vt(t,e){const n=t.$$;n.fragment!==null&&(w(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Et(t,e){t.$$.dirty[0]===-1&&(p.push(t),et(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function he(t,e,n,i,s,a,r,c=[-1]){const o=g;y(t);const l=t.$$={fragment:null,ctx:null,props:a,update:d,not_equal:s,bound:D(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(o?o.$$.context:[])),callbacks:D(),dirty:c,skip_bound:!1,root:e.target||o.$$.root};r&&r(l.root);let f=!1;if(l.ctx=n?n(t,e.props||{},(u,$,...H)=>{const L=H.length?H[0]:$;return l.ctx&&s(l.ctx[u],l.ctx[u]=L)&&(!l.skip_bound&&l.bound[u]&&l.bound[u](L),f&&Et(t,u)),$}):[],l.update(),f=!0,w(l.before_update),l.fragment=i?i(l.ctx):!1,e.target){if(e.hydrate){ct();const u=mt(e.target);l.fragment&&l.fragment.l(u),u.forEach(b)}else l.fragment&&l.fragment.c();e.intro&&xt(t.$$.fragment),$t(t,e.target,e.anchor,e.customElement),lt(),nt()}y(o)}class me{$destroy(){vt(this,1),this.$destroy=d}$on(e,n){const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const s=i.indexOf(n);s!==-1&&i.splice(s,1)}}$set(e){this.$$set&&!rt(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const h=[];function pe(t,e){return{subscribe:At(t,e).subscribe}}function At(t,e=d){let n;const i=new Set;function s(c){if(st(t,c)&&(t=c,n)){const o=!h.length;for(const l of i)l[1](),h.push(l,t);if(o){for(let l=0;l<h.length;l+=2)h[l][0](h[l+1]);h.length=0}}}function a(c){s(c(t))}function r(c,o=d){const l=[c,o];return i.add(l),i.size===1&&(n=e(s)||d),c(t),()=>{i.delete(l),i.size===0&&(n(),n=null)}}return{set:s,update:a,subscribe:r}}let F="",Tt="";function ye(t){F=t.base,Tt=t.assets||F}export{ee as $,ye as A,At as B,Tt as C,kt as D,Xt as E,dt as F,d as G,St as H,F as I,Ct as J,Mt as K,qt as L,zt as M,it as N,Lt as O,Dt as P,Nt as Q,pe as R,me as S,Yt as T,Pt as U,O as V,fe as W,P as X,re as Y,w as Z,jt as _,Bt as a,Ht as a0,I as a1,U as a2,Rt as a3,M as a4,Vt as a5,Ot as a6,ae as a7,ie as a8,Ft as a9,ue as aa,ne as ab,W as ac,Kt as ad,Gt as ae,ht as b,Jt as c,ce as d,Wt as e,xt as f,oe as g,b as h,he as i,te as j,q as k,It as l,mt as m,V as n,Zt as o,Ut as p,j as q,pt as r,st as s,le as t,Qt as u,de as v,_e as w,$t as x,vt as y,se as z};