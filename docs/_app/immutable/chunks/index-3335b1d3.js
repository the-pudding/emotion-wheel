function x(){}const at=t=>t;function ft(t,e){for(const n in e)t[n]=e[n];return t}function X(t){return t()}function K(){return Object.create(null)}function w(t){t.forEach(X)}function F(t){return typeof t=="function"}function Wt(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let N;function Bt(t,e){return N||(N=document.createElement("a")),N.href=e,t===N.href}function dt(t){return Object.keys(t).length===0}function _t(t,...e){if(t==null)return x;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function Ft(t,e,n){t.$$.on_destroy.push(_t(e,n))}function It(t,e,n,i){if(t){const s=Y(t,e,n,i);return t[0](s)}}function Y(t,e,n,i){return t[1]&&i?ft(n.ctx.slice(),t[1](i(e))):n.ctx}function Ht(t,e,n,i){if(t[2]&&i){const s=t[2](i(n));if(e.dirty===void 0)return s;if(typeof s=="object"){const c=[],r=Math.max(e.dirty.length,s.length);for(let u=0;u<r;u+=1)c[u]=e.dirty[u]|s[u];return c}return e.dirty|s}return e.dirty}function Gt(t,e,n,i,s,c){if(s){const r=Y(e,n,i,c);t.p(r,s)}}function Jt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function Kt(t,e,n){return t.set(n),e}function Qt(t){return t&&F(t.destroy)?t.destroy:x}const Z=typeof window<"u";let ht=Z?()=>window.performance.now():()=>Date.now(),I=Z?t=>requestAnimationFrame(t):x;const b=new Set;function tt(t){b.forEach(e=>{e.c(t)||(b.delete(e),e.f())}),b.size!==0&&I(tt)}function mt(t){let e;return b.size===0&&I(tt),{promise:new Promise(n=>{b.add(e={c:t,f:n})}),abort(){b.delete(e)}}}let O=!1;function pt(){O=!0}function yt(){O=!1}function gt(t,e,n,i){for(;t<e;){const s=t+(e-t>>1);n(s)<=i?t=s+1:e=s}return t}function bt(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const o=[];for(let l=0;l<e.length;l++){const d=e[l];d.claim_order!==void 0&&o.push(d)}e=o}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let s=0;for(let o=0;o<e.length;o++){const l=e[o].claim_order,d=(s>0&&e[n[s]].claim_order<=l?s+1:gt(1,s,a=>e[n[a]].claim_order,l))-1;i[o]=n[d]+1;const f=d+1;n[f]=o,s=Math.max(f,s)}const c=[],r=[];let u=e.length-1;for(let o=n[s]+1;o!=0;o=i[o-1]){for(c.push(e[o-1]);u>=o;u--)r.push(e[u]);u--}for(;u>=0;u--)r.push(e[u]);c.reverse(),r.sort((o,l)=>o.claim_order-l.claim_order);for(let o=0,l=0;o<r.length;o++){for(;l<c.length&&r[o].claim_order>=c[l].claim_order;)l++;const d=l<c.length?c[l]:null;t.insertBefore(r[o],d)}}function et(t,e){t.appendChild(e)}function nt(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function xt(t){const e=G("style");return wt(nt(t),e),e.sheet}function wt(t,e){return et(t.head||t,e),e.sheet}function $t(t,e){if(O){for(bt(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function Ut(t,e,n){O&&!n?$t(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function H(t){t.parentNode.removeChild(t)}function Vt(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function G(t){return document.createElement(t)}function vt(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function J(t){return document.createTextNode(t)}function Xt(){return J(" ")}function Yt(){return J("")}function Q(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function Zt(t){return function(e){return e.preventDefault(),t.call(this,e)}}function it(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function te(t,e){for(const n in e)it(t,n,e[n])}function ee(t,e,n){e in t?t[e]=typeof t[e]=="boolean"&&n===""?!0:n:it(t,e,n)}function ne(t){return t===""?null:+t}function Et(t){return Array.from(t.childNodes)}function kt(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function rt(t,e,n,i,s=!1){kt(t);const c=(()=>{for(let r=t.claim_info.last_index;r<t.length;r++){const u=t[r];if(e(u)){const o=n(u);return o===void 0?t.splice(r,1):t[r]=o,s||(t.claim_info.last_index=r),u}}for(let r=t.claim_info.last_index-1;r>=0;r--){const u=t[r];if(e(u)){const o=n(u);return o===void 0?t.splice(r,1):t[r]=o,s?o===void 0&&t.claim_info.last_index--:t.claim_info.last_index=r,u}}return i()})();return c.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,c}function st(t,e,n,i){return rt(t,s=>s.nodeName===e,s=>{const c=[];for(let r=0;r<s.attributes.length;r++){const u=s.attributes[r];n[u.name]||c.push(u.name)}c.forEach(r=>s.removeAttribute(r))},()=>i(e))}function ie(t,e,n){return st(t,e,n,G)}function re(t,e,n){return st(t,e,n,vt)}function At(t,e){return rt(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>J(e),!0)}function se(t){return At(t," ")}function oe(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function ce(t,e){t.value=e==null?"":e}function ue(t,e,n,i){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}let S;function Nt(){if(S===void 0){S=!1;try{typeof window<"u"&&window.parent&&window.parent.document}catch{S=!0}}return S}function le(t,e){getComputedStyle(t).position==="static"&&(t.style.position="relative");const i=G("iframe");i.setAttribute("style","display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;"),i.setAttribute("aria-hidden","true"),i.tabIndex=-1;const s=Nt();let c;return s?(i.src="data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>",c=Q(window,"message",r=>{r.source===i.contentWindow&&e()})):(i.src="about:blank",i.onload=()=>{c=Q(i.contentWindow,"resize",e)}),et(t,i),()=>{(s||c&&i.contentWindow)&&c(),H(i)}}function ae(t,e,n){t.classList[n?"add":"remove"](e)}function St(t,e,{bubbles:n=!1,cancelable:i=!1}={}){const s=document.createEvent("CustomEvent");return s.initCustomEvent(t,n,i,e),s}function fe(t,e=document.body){return Array.from(e.querySelectorAll(t))}const z=new Map;let q=0;function Ct(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}function jt(t,e){const n={stylesheet:xt(e),rules:{}};return z.set(t,n),n}function U(t,e,n,i,s,c,r,u=0){const o=16.666/i;let l=`{
`;for(let p=0;p<=1;p+=o){const g=e+(n-e)*c(p);l+=p*100+`%{${r(g,1-g)}}
`}const d=l+`100% {${r(n,1-n)}}
}`,f=`__svelte_${Ct(d)}_${u}`,a=nt(t),{stylesheet:_,rules:h}=z.get(a)||jt(a,t);h[f]||(h[f]=!0,_.insertRule(`@keyframes ${f} ${d}`,_.cssRules.length));const y=t.style.animation||"";return t.style.animation=`${y?`${y}, `:""}${f} ${i}ms linear ${s}ms 1 both`,q+=1,f}function Mt(t,e){const n=(t.style.animation||"").split(", "),i=n.filter(e?c=>c.indexOf(e)<0:c=>c.indexOf("__svelte")===-1),s=n.length-i.length;s&&(t.style.animation=i.join(", "),q-=s,q||zt())}function zt(){I(()=>{q||(z.forEach(t=>{const{ownerNode:e}=t.stylesheet;e&&H(e)}),z.clear())})}let k;function E(t){k=t}function P(){if(!k)throw new Error("Function called outside component initialization");return k}function de(t){P().$$.on_mount.push(t)}function _e(t){P().$$.after_update.push(t)}function he(t){P().$$.on_destroy.push(t)}function me(t,e){return P().$$.context.set(t,e),e}const v=[],V=[],j=[],W=[],ot=Promise.resolve();let B=!1;function ct(){B||(B=!0,ot.then(ut))}function pe(){return ct(),ot}function D(t){j.push(t)}function ye(t){W.push(t)}const R=new Set;let C=0;function ut(){const t=k;do{for(;C<v.length;){const e=v[C];C++,E(e),qt(e.$$)}for(E(null),v.length=0,C=0;V.length;)V.pop()();for(let e=0;e<j.length;e+=1){const n=j[e];R.has(n)||(R.add(n),n())}j.length=0}while(v.length);for(;W.length;)W.pop()();B=!1,R.clear(),E(t)}function qt(t){if(t.fragment!==null){t.update(),w(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(D)}}let $;function Dt(){return $||($=Promise.resolve(),$.then(()=>{$=null})),$}function T(t,e,n){t.dispatchEvent(St(`${e?"intro":"outro"}${n}`))}const M=new Set;let m;function ge(){m={r:0,c:[],p:m}}function be(){m.r||w(m.c),m=m.p}function Ot(t,e){t&&t.i&&(M.delete(t),t.i(e))}function xe(t,e,n,i){if(t&&t.o){if(M.has(t))return;M.add(t),m.c.push(()=>{M.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}const Pt={duration:0};function we(t,e,n,i){let s=e(t,n),c=i?0:1,r=null,u=null,o=null;function l(){o&&Mt(t,o)}function d(a,_){const h=a.b-c;return _*=Math.abs(h),{a:c,b:a.b,d:h,duration:_,start:a.start,end:a.start+_,group:a.group}}function f(a){const{delay:_=0,duration:h=300,easing:y=at,tick:p=x,css:g}=s||Pt,L={start:ht()+_,b:a};a||(L.group=m,m.r+=1),r||u?u=L:(g&&(l(),o=U(t,c,a,h,_,y,g)),a&&p(0,1),r=d(L,h),D(()=>T(t,a,"start")),mt(A=>{if(u&&A>u.start&&(r=d(u,h),u=null,T(t,r.b,"start"),g&&(l(),o=U(t,c,r.b,r.duration,0,y,s.css))),r){if(A>=r.end)p(c=r.b,1-c),T(t,r.b,"end"),u||(r.b?l():--r.group.r||w(r.group.c)),r=null;else if(A>=r.start){const lt=A-r.start;c=r.a+r.d*y(lt/r.duration),p(c,1-c)}}return!!(r||u)}))}return{run(a){F(s)?Dt().then(()=>{s=s(),f(a)}):f(a)},end(){l(),r=u=null}}}function $e(t,e){const n={},i={},s={$$scope:1};let c=t.length;for(;c--;){const r=t[c],u=e[c];if(u){for(const o in r)o in u||(i[o]=1);for(const o in u)s[o]||(n[o]=u[o],s[o]=1);t[c]=u}else for(const o in r)s[o]=1}for(const r in i)r in n||(n[r]=void 0);return n}function ve(t,e,n){const i=t.$$.props[e];i!==void 0&&(t.$$.bound[i]=n,n(t.$$.ctx[i]))}function Ee(t){t&&t.c()}function ke(t,e){t&&t.l(e)}function Lt(t,e,n,i){const{fragment:s,on_mount:c,on_destroy:r,after_update:u}=t.$$;s&&s.m(e,n),i||D(()=>{const o=c.map(X).filter(F);r?r.push(...o):w(o),t.$$.on_mount=[]}),u.forEach(D)}function Rt(t,e){const n=t.$$;n.fragment!==null&&(w(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Tt(t,e){t.$$.dirty[0]===-1&&(v.push(t),ct(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Ae(t,e,n,i,s,c,r,u=[-1]){const o=k;E(t);const l=t.$$={fragment:null,ctx:null,props:c,update:x,not_equal:s,bound:K(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(o?o.$$.context:[])),callbacks:K(),dirty:u,skip_bound:!1,root:e.target||o.$$.root};r&&r(l.root);let d=!1;if(l.ctx=n?n(t,e.props||{},(f,a,..._)=>{const h=_.length?_[0]:a;return l.ctx&&s(l.ctx[f],l.ctx[f]=h)&&(!l.skip_bound&&l.bound[f]&&l.bound[f](h),d&&Tt(t,f)),a}):[],l.update(),d=!0,w(l.before_update),l.fragment=i?i(l.ctx):!1,e.target){if(e.hydrate){pt();const f=Et(e.target);l.fragment&&l.fragment.l(f),f.forEach(H)}else l.fragment&&l.fragment.c();e.intro&&Ot(t.$$.fragment),Lt(t,e.target,e.anchor,e.customElement),yt(),ut()}E(o)}class Ne{$destroy(){Rt(this,1),this.$destroy=x}$on(e,n){const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const s=i.indexOf(n);s!==-1&&i.splice(s,1)}}$set(e){this.$$set&&!dt(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{$e as $,x as A,$t as B,It as C,Gt as D,Jt as E,Ht as F,Ft as G,fe as H,Vt as I,at as J,ae as K,Bt as L,D as M,we as N,he as O,Q as P,Kt as Q,ee as R,Ne as S,V as T,ve as U,ye as V,w as W,ft as X,vt as Y,re as Z,te as _,Xt as a,le as a0,Zt as a1,me as a2,Qt as a3,F as a4,ce as a5,ne as a6,Ut as b,se as c,be as d,Yt as e,Ot as f,ge as g,H as h,Ae as i,_e as j,G as k,ie as l,Et as m,it as n,de as o,ue as p,J as q,At as r,Wt as s,xe as t,oe as u,Ee as v,ke as w,Lt as x,Rt as y,pe as z};
