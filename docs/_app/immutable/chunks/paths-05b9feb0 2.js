function p(){}const pt=t=>t;function yt(t,e){for(const n in e)t[n]=e[n];return t}function et(t){return t()}function Q(){return Object.create(null)}function v(t){t.forEach(et)}function I(t){return typeof t=="function"}function gt(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let S;function Vt(t,e){return S||(S=document.createElement("a")),S.href=e,t===S.href}function bt(t){return Object.keys(t).length===0}function wt(t,...e){if(t==null)return p;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function Xt(t,e,n){t.$$.on_destroy.push(wt(e,n))}function Yt(t,e,n,i){if(t){const s=nt(t,e,n,i);return t[0](s)}}function nt(t,e,n,i){return t[1]&&i?yt(n.ctx.slice(),t[1](i(e))):n.ctx}function Zt(t,e,n,i){if(t[2]&&i){const s=t[2](i(n));if(e.dirty===void 0)return s;if(typeof s=="object"){const l=[],r=Math.max(e.dirty.length,s.length);for(let c=0;c<r;c+=1)l[c]=e.dirty[c]|s[c];return l}return e.dirty|s}return e.dirty}function te(t,e,n,i,s,l){if(s){const r=nt(e,n,i,l);t.p(r,s)}}function ee(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function ne(t,e,n){return t.set(n),e}function ie(t){return t&&I(t.destroy)?t.destroy:p}const it=typeof window<"u";let xt=it?()=>window.performance.now():()=>Date.now(),J=it?t=>requestAnimationFrame(t):p;const x=new Set;function st(t){x.forEach(e=>{e.c(t)||(x.delete(e),e.f())}),x.size!==0&&J(st)}function $t(t){let e;return x.size===0&&J(st),{promise:new Promise(n=>{x.add(e={c:t,f:n})}),abort(){x.delete(e)}}}let L=!1;function vt(){L=!0}function Et(){L=!1}function At(t,e,n,i){for(;t<e;){const s=t+(e-t>>1);n(s)<=i?t=s+1:e=s}return t}function Nt(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const o=[];for(let u=0;u<e.length;u++){const d=e[u];d.claim_order!==void 0&&o.push(d)}e=o}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let s=0;for(let o=0;o<e.length;o++){const u=e[o].claim_order,d=(s>0&&e[n[s]].claim_order<=u?s+1:At(1,s,a=>e[n[a]].claim_order,u))-1;i[o]=n[d]+1;const f=d+1;n[f]=o,s=Math.max(f,s)}const l=[],r=[];let c=e.length-1;for(let o=n[s]+1;o!=0;o=i[o-1]){for(l.push(e[o-1]);c>=o;c--)r.push(e[c]);c--}for(;c>=0;c--)r.push(e[c]);l.reverse(),r.sort((o,u)=>o.claim_order-u.claim_order);for(let o=0,u=0;o<r.length;o++){for(;u<l.length&&r[o].claim_order>=l[u].claim_order;)u++;const d=u<l.length?l[u]:null;t.insertBefore(r[o],d)}}function rt(t,e){t.appendChild(e)}function ot(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function Tt(t){const e=O("style");return kt(ot(t),e),e.sheet}function kt(t,e){return rt(t.head||t,e),e.sheet}function St(t,e){if(L){for(Nt(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function Ct(t,e,n){t.insertBefore(e,n||null)}function Mt(t,e,n){L&&!n?St(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function $(t){t.parentNode.removeChild(t)}function se(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function O(t){return document.createElement(t)}function ct(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function K(t){return document.createTextNode(t)}function re(){return K(" ")}function oe(){return K("")}function U(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function ce(t){return function(e){return e.preventDefault(),t.call(this,e)}}function lt(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function le(t,e){for(const n in e)lt(t,n,e[n])}function ue(t,e,n){e in t?t[e]=typeof t[e]=="boolean"&&n===""?!0:n:lt(t,e,n)}function zt(t){return Array.from(t.childNodes)}function ut(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function at(t,e,n,i,s=!1){ut(t);const l=(()=>{for(let r=t.claim_info.last_index;r<t.length;r++){const c=t[r];if(e(c)){const o=n(c);return o===void 0?t.splice(r,1):t[r]=o,s||(t.claim_info.last_index=r),c}}for(let r=t.claim_info.last_index-1;r>=0;r--){const c=t[r];if(e(c)){const o=n(c);return o===void 0?t.splice(r,1):t[r]=o,s?o===void 0&&t.claim_info.last_index--:t.claim_info.last_index=r,c}}return i()})();return l.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,l}function ft(t,e,n,i){return at(t,s=>s.nodeName===e,s=>{const l=[];for(let r=0;r<s.attributes.length;r++){const c=s.attributes[r];n[c.name]||l.push(c.name)}l.forEach(r=>s.removeAttribute(r))},()=>i(e))}function ae(t,e,n){return ft(t,e,n,O)}function fe(t,e,n){return ft(t,e,n,ct)}function jt(t,e){return at(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>K(e),!0)}function de(t){return jt(t," ")}function V(t,e,n){for(let i=n;i<t.length;i+=1){const s=t[i];if(s.nodeType===8&&s.textContent.trim()===e)return i}return t.length}function _e(t,e){const n=V(t,"HTML_TAG_START",0),i=V(t,"HTML_TAG_END",n);if(n===i)return new X(void 0,e);ut(t);const s=t.splice(n,i-n+1);$(s[0]),$(s[s.length-1]);const l=s.slice(1,s.length-1);for(const r of l)r.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1;return new X(l,e)}function he(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function me(t,e,n,i){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}let C;function qt(){if(C===void 0){C=!1;try{typeof window<"u"&&window.parent&&window.parent.document}catch{C=!0}}return C}function pe(t,e){getComputedStyle(t).position==="static"&&(t.style.position="relative");const i=O("iframe");i.setAttribute("style","display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;"),i.setAttribute("aria-hidden","true"),i.tabIndex=-1;const s=qt();let l;return s?(i.src="data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>",l=U(window,"message",r=>{r.source===i.contentWindow&&e()})):(i.src="about:blank",i.onload=()=>{l=U(i.contentWindow,"resize",e)}),rt(t,i),()=>{(s||l&&i.contentWindow)&&l(),$(i)}}function ye(t,e,n){t.classList[n?"add":"remove"](e)}function Dt(t,e,{bubbles:n=!1,cancelable:i=!1}={}){const s=document.createEvent("CustomEvent");return s.initCustomEvent(t,n,i,e),s}function ge(t,e=document.body){return Array.from(e.querySelectorAll(t))}class Ht{constructor(e=!1){this.is_svg=!1,this.is_svg=e,this.e=this.n=null}c(e){this.h(e)}m(e,n,i=null){this.e||(this.is_svg?this.e=ct(n.nodeName):this.e=O(n.nodeName),this.t=n,this.c(e)),this.i(i)}h(e){this.e.innerHTML=e,this.n=Array.from(this.e.childNodes)}i(e){for(let n=0;n<this.n.length;n+=1)Ct(this.t,this.n[n],e)}p(e){this.d(),this.h(e),this.i(this.a)}d(){this.n.forEach($)}}class X extends Ht{constructor(e,n=!1){super(n),this.e=this.n=null,this.l=e}c(e){this.l?this.n=this.l:super.c(e)}i(e){for(let n=0;n<this.n.length;n+=1)Mt(this.t,this.n[n],e)}}const q=new Map;let D=0;function Lt(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}function Ot(t,e){const n={stylesheet:Tt(e),rules:{}};return q.set(t,n),n}function Y(t,e,n,i,s,l,r,c=0){const o=16.666/i;let u=`{
`;for(let y=0;y<=1;y+=o){const b=e+(n-e)*l(y);u+=y*100+`%{${r(b,1-b)}}
`}const d=u+`100% {${r(n,1-n)}}
}`,f=`__svelte_${Lt(d)}_${c}`,a=ot(t),{stylesheet:_,rules:h}=q.get(a)||Ot(a,t);h[f]||(h[f]=!0,_.insertRule(`@keyframes ${f} ${d}`,_.cssRules.length));const g=t.style.animation||"";return t.style.animation=`${g?`${g}, `:""}${f} ${i}ms linear ${s}ms 1 both`,D+=1,f}function Pt(t,e){const n=(t.style.animation||"").split(", "),i=n.filter(e?l=>l.indexOf(e)<0:l=>l.indexOf("__svelte")===-1),s=n.length-i.length;s&&(t.style.animation=i.join(", "),D-=s,D||Rt())}function Rt(){J(()=>{D||(q.forEach(t=>{const{ownerNode:e}=t.stylesheet;e&&$(e)}),q.clear())})}let T;function N(t){T=t}function P(){if(!T)throw new Error("Function called outside component initialization");return T}function be(t){P().$$.on_mount.push(t)}function we(t){P().$$.after_update.push(t)}function xe(t){P().$$.on_destroy.push(t)}function $e(t,e){return P().$$.context.set(t,e),e}const A=[],Z=[],z=[],F=[],dt=Promise.resolve();let G=!1;function _t(){G||(G=!0,dt.then(ht))}function ve(){return _t(),dt}function H(t){z.push(t)}function Ee(t){F.push(t)}const B=new Set;let M=0;function ht(){const t=T;do{for(;M<A.length;){const e=A[M];M++,N(e),Bt(e.$$)}for(N(null),A.length=0,M=0;Z.length;)Z.pop()();for(let e=0;e<z.length;e+=1){const n=z[e];B.has(n)||(B.add(n),n())}z.length=0}while(A.length);for(;F.length;)F.pop()();G=!1,B.clear(),N(t)}function Bt(t){if(t.fragment!==null){t.update(),v(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(H)}}let E;function Wt(){return E||(E=Promise.resolve(),E.then(()=>{E=null})),E}function W(t,e,n){t.dispatchEvent(Dt(`${e?"intro":"outro"}${n}`))}const j=new Set;let m;function Ae(){m={r:0,c:[],p:m}}function Ne(){m.r||v(m.c),m=m.p}function Ft(t,e){t&&t.i&&(j.delete(t),t.i(e))}function Te(t,e,n,i){if(t&&t.o){if(j.has(t))return;j.add(t),m.c.push(()=>{j.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}const Gt={duration:0};function ke(t,e,n,i){let s=e(t,n),l=i?0:1,r=null,c=null,o=null;function u(){o&&Pt(t,o)}function d(a,_){const h=a.b-l;return _*=Math.abs(h),{a:l,b:a.b,d:h,duration:_,start:a.start,end:a.start+_,group:a.group}}function f(a){const{delay:_=0,duration:h=300,easing:g=pt,tick:y=p,css:b}=s||Gt,R={start:xt()+_,b:a};a||(R.group=m,m.r+=1),r||c?c=R:(b&&(u(),o=Y(t,l,a,h,_,g,b)),a&&y(0,1),r=d(R,h),H(()=>W(t,a,"start")),$t(k=>{if(c&&k>c.start&&(r=d(c,h),c=null,W(t,r.b,"start"),b&&(u(),o=Y(t,l,r.b,r.duration,0,g,s.css))),r){if(k>=r.end)y(l=r.b,1-l),W(t,r.b,"end"),c||(r.b?u():--r.group.r||v(r.group.c)),r=null;else if(k>=r.start){const mt=k-r.start;l=r.a+r.d*g(mt/r.duration),y(l,1-l)}}return!!(r||c)}))}return{run(a){I(s)?Wt().then(()=>{s=s(),f(a)}):f(a)},end(){u(),r=c=null}}}const Se=typeof window<"u"?window:typeof globalThis<"u"?globalThis:global;function Ce(t,e){const n={},i={},s={$$scope:1};let l=t.length;for(;l--;){const r=t[l],c=e[l];if(c){for(const o in r)o in c||(i[o]=1);for(const o in c)s[o]||(n[o]=c[o],s[o]=1);t[l]=c}else for(const o in r)s[o]=1}for(const r in i)r in n||(n[r]=void 0);return n}function Me(t,e,n){const i=t.$$.props[e];i!==void 0&&(t.$$.bound[i]=n,n(t.$$.ctx[i]))}function ze(t){t&&t.c()}function je(t,e){t&&t.l(e)}function It(t,e,n,i){const{fragment:s,on_mount:l,on_destroy:r,after_update:c}=t.$$;s&&s.m(e,n),i||H(()=>{const o=l.map(et).filter(I);r?r.push(...o):v(o),t.$$.on_mount=[]}),c.forEach(H)}function Jt(t,e){const n=t.$$;n.fragment!==null&&(v(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Kt(t,e){t.$$.dirty[0]===-1&&(A.push(t),_t(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function qe(t,e,n,i,s,l,r,c=[-1]){const o=T;N(t);const u=t.$$={fragment:null,ctx:null,props:l,update:p,not_equal:s,bound:Q(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(o?o.$$.context:[])),callbacks:Q(),dirty:c,skip_bound:!1,root:e.target||o.$$.root};r&&r(u.root);let d=!1;if(u.ctx=n?n(t,e.props||{},(f,a,..._)=>{const h=_.length?_[0]:a;return u.ctx&&s(u.ctx[f],u.ctx[f]=h)&&(!u.skip_bound&&u.bound[f]&&u.bound[f](h),d&&Kt(t,f)),a}):[],u.update(),d=!0,v(u.before_update),u.fragment=i?i(u.ctx):!1,e.target){if(e.hydrate){vt();const f=zt(e.target);u.fragment&&u.fragment.l(f),f.forEach($)}else u.fragment&&u.fragment.c();e.intro&&Ft(t.$$.fragment),It(t,e.target,e.anchor,e.customElement),Et(),ht()}N(o)}class De{$destroy(){Jt(this,1),this.$destroy=p}$on(e,n){const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const s=i.indexOf(n);s!==-1&&i.splice(s,1)}}$set(e){this.$$set&&!bt(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const w=[];function He(t,e){return{subscribe:Qt(t,e).subscribe}}function Qt(t,e=p){let n;const i=new Set;function s(c){if(gt(t,c)&&(t=c,n)){const o=!w.length;for(const u of i)u[1](),w.push(u,t);if(o){for(let u=0;u<w.length;u+=2)w[u][0](w[u+1]);w.length=0}}}function l(c){s(c(t))}function r(c,o=p){const u=[c,o];return i.add(u),i.size===1&&(n=e(s)||p),c(t),()=>{i.delete(u),i.size===0&&(n(),n=null)}}return{set:s,update:l,subscribe:r}}let tt="",Ut="";function Le(t){tt=t.base,Ut=t.assets||tt}export{ne as $,Le as A,Qt as B,Ut as C,Vt as D,ye as E,St as F,p as G,Xt as H,tt as I,Yt as J,te as K,ee as L,Zt as M,yt as N,xt as O,$t as P,pt as Q,He as R,De as S,ge as T,se as U,U as V,Z as W,Me as X,ie as Y,Ee as Z,v as _,re as a,H as a0,ke as a1,xe as a2,I as a3,ct as a4,fe as a5,wt as a6,le as a7,Ce as a8,pe as a9,ce as aa,Se as ab,$e as ac,X as ad,_e as ae,ue as af,Mt as b,de as c,Ne as d,oe as e,Ft as f,Ae as g,$ as h,qe as i,we as j,O as k,ae as l,zt as m,lt as n,be as o,me as p,K as q,jt as r,gt as s,Te as t,he as u,ze as v,je as w,It as x,Jt as y,ve as z};