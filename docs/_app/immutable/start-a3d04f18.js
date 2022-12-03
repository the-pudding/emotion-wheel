import{_ as Z}from"./chunks/preload-helper-aa6bc0ce.js";import{S as Me,i as He,s as We,a as Xe,e as x,c as Ye,b as z,g as le,t as B,d as ce,f as J,h as F,j as Qe,o as ye,k as Ze,l as et,m as tt,n as ge,p as C,q as nt,r as at,u as rt,v as M,w as Re,x as H,y as W,z as Ve,A as st}from"./chunks/paths-8d3015a4.js";import{g as xe,f as Be,s as K,a as be,i as ot}from"./chunks/singletons-611020df.js";function it(r,e){return r==="/"||e==="ignore"?r:e==="never"?r.endsWith("/")?r.slice(0,-1):r:e==="always"&&!r.endsWith("/")?r+"/":r}function lt(r){for(const e in r)r[e]=r[e].replace(/%23/g,"#").replace(/%3[Bb]/g,";").replace(/%2[Cc]/g,",").replace(/%2[Ff]/g,"/").replace(/%3[Ff]/g,"?").replace(/%3[Aa]/g,":").replace(/%40/g,"@").replace(/%26/g,"&").replace(/%3[Dd]/g,"=").replace(/%2[Bb]/g,"+").replace(/%24/g,"$");return r}const ct=["href","pathname","search","searchParams","toString","toJSON"];function ft(r,e){const t=new URL(r);for(const c of ct){let i=t[c];Object.defineProperty(t,c,{get(){return e(),i},enumerable:!0,configurable:!0})}return t[Symbol.for("nodejs.util.inspect.custom")]=(c,i,d)=>d(r,i),ut(t),t}function ut(r){Object.defineProperty(r,"hash",{get(){throw new Error("Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead")}})}function dt(r){let e=5381,t=r.length;if(typeof r=="string")for(;t;)e=e*33^r.charCodeAt(--t);else for(;t;)e=e*33^r[--t];return(e>>>0).toString(36)}const Se=window.fetch;window.fetch=(r,e)=>{if((r instanceof Request?r.method:(e==null?void 0:e.method)||"GET")!=="GET"){const c=new URL(r instanceof Request?r.url:r.toString(),document.baseURI).href;ie.delete(c)}return Se(r,e)};const ie=new Map;function pt(r,e,t){let i=`script[data-sveltekit-fetched][data-url=${JSON.stringify(r instanceof Request?r.url:r)}]`;t&&typeof t.body=="string"&&(i+=`[data-hash="${dt(t.body)}"]`);const d=document.querySelector(i);if(d!=null&&d.textContent){const{body:a,...u}=JSON.parse(d.textContent),g=d.getAttribute("data-ttl");return g&&ie.set(e,{body:a,init:u,ttl:1e3*Number(g)}),Promise.resolve(new Response(a,u))}return Se(r,t)}function ht(r,e){const t=ie.get(r);if(t){if(performance.now()<t.ttl)return new Response(t.body,t.init);ie.delete(r)}return Se(r,e)}const mt=/^(\.\.\.)?(\w+)(?:=(\w+))?$/;function _t(r){const e=[],t=[];let c=!0;return{pattern:r===""?/^\/$/:new RegExp(`^${r.split(/(?:\/|$)/).filter(gt).map((d,a,u)=>{const g=decodeURIComponent(d),m=/^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(g);if(m)return e.push(m[1]),t.push(m[2]),"(?:/(.*))?";const y=a===u.length-1;return g&&"/"+g.split(/\[(.+?)\]/).map((L,R)=>{if(R%2){const N=mt.exec(L);if(!N)throw new Error(`Invalid param: ${L}. Params and matcher names can only have underscores and alphanumeric characters.`);const[,D,q,T]=N;return e.push(q),t.push(T),D?"(.*?)":"([^/]+?)"}return y&&L.includes(".")&&(c=!1),L.normalize().replace(/%5[Bb]/g,"[").replace(/%5[Dd]/g,"]").replace(/#/g,"%23").replace(/\?/g,"%3F").replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}).join("")}).join("")}${c?"/?":""}$`),names:e,types:t}}function gt(r){return!/^\([^)]+\)$/.test(r)}function wt(r,e,t,c){const i={};for(let d=0;d<e.length;d+=1){const a=e[d],u=t[d],g=r[d+1]||"";if(u){const m=c[u];if(!m)throw new Error(`Missing "${u}" param matcher`);if(!m(g))return}i[a]=g}return i}function yt(r,e,t,c){const i=new Set(e);return Object.entries(t).map(([u,[g,m,y]])=>{const{pattern:L,names:R,types:N}=_t(u),D={id:u,exec:q=>{const T=L.exec(q);if(T)return wt(T,R,N,c)},errors:[1,...y||[]].map(q=>r[q]),layouts:[0,...m||[]].map(a),leaf:d(g)};return D.errors.length=D.layouts.length=Math.max(D.errors.length,D.layouts.length),D});function d(u){const g=u<0;return g&&(u=~u),[g,r[u]]}function a(u){return u===void 0?u:[i.has(u),r[u]]}}function bt(r){let e,t,c;var i=r[0][0];function d(a){return{props:{data:a[2],form:a[1]}}}return i&&(e=new i(d(r))),{c(){e&&M(e.$$.fragment),t=x()},l(a){e&&Re(e.$$.fragment,a),t=x()},m(a,u){e&&H(e,a,u),z(a,t,u),c=!0},p(a,u){const g={};if(u&4&&(g.data=a[2]),u&2&&(g.form=a[1]),i!==(i=a[0][0])){if(e){le();const m=e;B(m.$$.fragment,1,0,()=>{W(m,1)}),ce()}i?(e=new i(d(a)),M(e.$$.fragment),J(e.$$.fragment,1),H(e,t.parentNode,t)):e=null}else i&&e.$set(g)},i(a){c||(e&&J(e.$$.fragment,a),c=!0)},o(a){e&&B(e.$$.fragment,a),c=!1},d(a){a&&F(t),e&&W(e,a)}}}function vt(r){let e,t,c;var i=r[0][0];function d(a){return{props:{data:a[2],$$slots:{default:[kt]},$$scope:{ctx:a}}}}return i&&(e=new i(d(r))),{c(){e&&M(e.$$.fragment),t=x()},l(a){e&&Re(e.$$.fragment,a),t=x()},m(a,u){e&&H(e,a,u),z(a,t,u),c=!0},p(a,u){const g={};if(u&4&&(g.data=a[2]),u&523&&(g.$$scope={dirty:u,ctx:a}),i!==(i=a[0][0])){if(e){le();const m=e;B(m.$$.fragment,1,0,()=>{W(m,1)}),ce()}i?(e=new i(d(a)),M(e.$$.fragment),J(e.$$.fragment,1),H(e,t.parentNode,t)):e=null}else i&&e.$set(g)},i(a){c||(e&&J(e.$$.fragment,a),c=!0)},o(a){e&&B(e.$$.fragment,a),c=!1},d(a){a&&F(t),e&&W(e,a)}}}function kt(r){let e,t,c;var i=r[0][1];function d(a){return{props:{data:a[3],form:a[1]}}}return i&&(e=new i(d(r))),{c(){e&&M(e.$$.fragment),t=x()},l(a){e&&Re(e.$$.fragment,a),t=x()},m(a,u){e&&H(e,a,u),z(a,t,u),c=!0},p(a,u){const g={};if(u&8&&(g.data=a[3]),u&2&&(g.form=a[1]),i!==(i=a[0][1])){if(e){le();const m=e;B(m.$$.fragment,1,0,()=>{W(m,1)}),ce()}i?(e=new i(d(a)),M(e.$$.fragment),J(e.$$.fragment,1),H(e,t.parentNode,t)):e=null}else i&&e.$set(g)},i(a){c||(e&&J(e.$$.fragment,a),c=!0)},o(a){e&&B(e.$$.fragment,a),c=!1},d(a){a&&F(t),e&&W(e,a)}}}function Je(r){let e,t=r[5]&&Fe(r);return{c(){e=Ze("div"),t&&t.c(),this.h()},l(c){e=et(c,"DIV",{id:!0,"aria-live":!0,"aria-atomic":!0,style:!0});var i=tt(e);t&&t.l(i),i.forEach(F),this.h()},h(){ge(e,"id","svelte-announcer"),ge(e,"aria-live","assertive"),ge(e,"aria-atomic","true"),C(e,"position","absolute"),C(e,"left","0"),C(e,"top","0"),C(e,"clip","rect(0 0 0 0)"),C(e,"clip-path","inset(50%)"),C(e,"overflow","hidden"),C(e,"white-space","nowrap"),C(e,"width","1px"),C(e,"height","1px")},m(c,i){z(c,e,i),t&&t.m(e,null)},p(c,i){c[5]?t?t.p(c,i):(t=Fe(c),t.c(),t.m(e,null)):t&&(t.d(1),t=null)},d(c){c&&F(e),t&&t.d()}}}function Fe(r){let e;return{c(){e=nt(r[6])},l(t){e=at(t,r[6])},m(t,c){z(t,e,c)},p(t,c){c&64&&rt(e,t[6])},d(t){t&&F(e)}}}function Et(r){let e,t,c,i,d;const a=[vt,bt],u=[];function g(y,L){return y[0][1]?0:1}e=g(r),t=u[e]=a[e](r);let m=r[4]&&Je(r);return{c(){t.c(),c=Xe(),m&&m.c(),i=x()},l(y){t.l(y),c=Ye(y),m&&m.l(y),i=x()},m(y,L){u[e].m(y,L),z(y,c,L),m&&m.m(y,L),z(y,i,L),d=!0},p(y,[L]){let R=e;e=g(y),e===R?u[e].p(y,L):(le(),B(u[R],1,1,()=>{u[R]=null}),ce(),t=u[e],t?t.p(y,L):(t=u[e]=a[e](y),t.c()),J(t,1),t.m(c.parentNode,c)),y[4]?m?m.p(y,L):(m=Je(y),m.c(),m.m(i.parentNode,i)):m&&(m.d(1),m=null)},i(y){d||(J(t),d=!0)},o(y){B(t),d=!1},d(y){u[e].d(y),y&&F(c),m&&m.d(y),y&&F(i)}}}function Rt(r,e,t){let{stores:c}=e,{page:i}=e,{components:d}=e,{form:a}=e,{data_0:u=null}=e,{data_1:g=null}=e;Qe(c.page.notify);let m=!1,y=!1,L=null;return ye(()=>{const R=c.page.subscribe(()=>{m&&(t(5,y=!0),t(6,L=document.title||"untitled page"))});return t(4,m=!0),R}),r.$$set=R=>{"stores"in R&&t(7,c=R.stores),"page"in R&&t(8,i=R.page),"components"in R&&t(0,d=R.components),"form"in R&&t(1,a=R.form),"data_0"in R&&t(2,u=R.data_0),"data_1"in R&&t(3,g=R.data_1)},r.$$.update=()=>{r.$$.dirty&384&&c.page.set(i)},[d,a,u,g,m,y,L,c,i]}class St extends Me{constructor(e){super(),He(this,e,Rt,Et,We,{stores:7,page:8,components:0,form:1,data_0:2,data_1:3})}}const $t={},fe=[()=>Z(()=>import("./chunks/0-8e62df68.js"),["chunks/0-8e62df68.js","chunks/_layout-8d2a742b.js","components/pages/_layout.svelte-41dd1655.js","assets/_layout-354301ee.css","chunks/paths-8d3015a4.js","chunks/misc-e2b2ff73.js"],import.meta.url),()=>Z(()=>import("./chunks/1-8518d435.js"),["chunks/1-8518d435.js","components/pages/_error.svelte-8b15b7af.js","chunks/paths-8d3015a4.js","chunks/singletons-611020df.js"],import.meta.url),()=>Z(()=>import("./chunks/2-40d06624.js"),["chunks/2-40d06624.js","components/pages/_page.svelte-19ae09e5.js","assets/_page-df95858c.css","chunks/paths-8d3015a4.js","chunks/misc-e2b2ff73.js","chunks/needsKey-742f62ce.js","assets/needsKey-500d14eb.css","chunks/preload-helper-aa6bc0ce.js"],import.meta.url),()=>Z(()=>import("./chunks/3-81bf8cbe.js"),["chunks/3-81bf8cbe.js","components/pages/activities/_page.svelte-71692d6f.js","assets/_page-52ddb787.css","chunks/paths-8d3015a4.js","chunks/needsKey-742f62ce.js","assets/needsKey-500d14eb.css","chunks/misc-e2b2ff73.js","chunks/preload-helper-aa6bc0ce.js"],import.meta.url)],Lt=[],Pt={"":[-3],activities:[3]},Ot={handleError:({error:r})=>{console.error(r)}};class ve{constructor(e,t){this.status=e,typeof t=="string"?this.body={message:t}:t?this.body=t:this.body={message:`Error: ${e}`}}toString(){return JSON.stringify(this.body)}}class Ke{constructor(e,t){this.status=e,this.location=t}}const It="/__data.js";async function At(r){var e;for(const t in r)if(typeof((e=r[t])==null?void 0:e.then)=="function")return Object.fromEntries(await Promise.all(Object.entries(r).map(async([c,i])=>[c,await i])));return r}const Ge="sveltekit:scroll",V="sveltekit:index",re=yt(fe,Lt,Pt,$t),ke=fe[0],Ee=fe[1];ke();Ee();let ee={};try{ee=JSON.parse(sessionStorage[Ge])}catch{}function we(r){ee[r]=be()}function Ut({target:r,base:e,trailing_slash:t}){var De;const c=[];let i=null;const d={before_navigate:[],after_navigate:[]};let a={branch:[],error:null,url:null},u=!1,g=!1,m=!0,y=!1,L=!1,R,N=(De=history.state)==null?void 0:De[V];N||(N=Date.now(),history.replaceState({...history.state,[V]:N},"",location.href));const D=ee[N];D&&(history.scrollRestoration="manual",scrollTo(D.x,D.y));let q=!1,T,$e,te;async function Le(){te=te||Promise.resolve(),await te,te=null;const n=new URL(location.href),l=he(n,!0);i=null,await Oe(l,n,[])}async function ue(n,{noscroll:l=!1,replaceState:f=!1,keepfocus:s=!1,state:o={}},p,h){return typeof n=="string"&&(n=new URL(n,xe(document))),me({url:n,scroll:l?be():null,keepfocus:s,redirect_chain:p,details:{state:o,replaceState:f},nav_token:h,accepted:()=>{},blocked:()=>{},type:"goto"})}async function Pe(n){const l=he(n,!1);if(!l)throw new Error("Attempted to prefetch a URL that does not belong to this app");return i={id:l.id,promise:Ue(l)},i.promise}async function Oe(n,l,f,s,o={},p){var k,v;$e=o;let h=n&&await Ue(n);if(h||(h=await Te(l,null,Q(new Error(`Not found: ${l.pathname}`),{url:l,params:{},routeId:null}),404)),l=(n==null?void 0:n.url)||l,$e!==o)return!1;if(h.type==="redirect")if(f.length>10||f.includes(l.pathname))h=await ne({status:500,error:Q(new Error("Redirect loop"),{url:l,params:{},routeId:null}),url:l,routeId:null});else return ue(new URL(h.location,l).href,{},[...f,l.pathname],o),!1;else((v=(k=h.props)==null?void 0:k.page)==null?void 0:v.status)>=400&&await K.updated.check()&&await ae(l);if(c.length=0,L=!1,y=!0,s&&s.details){const{details:w}=s,b=w.replaceState?0:1;w.state[V]=N+=b,history[w.replaceState?"replaceState":"pushState"](w.state,"",l)}if(i=null,g){a=h.state,h.props.page&&(h.props.page.url=l);const w=oe();R.$set(h.props),w()}else Ie(h);if(s){const{scroll:w,keepfocus:b}=s;if(!b){const S=document.body,P=S.getAttribute("tabindex");S.tabIndex=-1,S.focus({preventScroll:!0}),setTimeout(()=>{var O;(O=getSelection())==null||O.removeAllRanges()}),P!==null?S.setAttribute("tabindex",P):S.removeAttribute("tabindex")}if(await Ve(),m){const S=l.hash&&document.getElementById(l.hash.slice(1));w?scrollTo(w.x,w.y):S?S.scrollIntoView():scrollTo(0,0)}}else await Ve();m=!0,h.props.page&&(T=h.props.page),p&&p(),y=!1}function Ie(n){var o,p;a=n.state;const l=document.querySelector("style[data-sveltekit]");l&&l.remove(),T=n.props.page;const f=oe();R=new St({target:r,props:{...n.props,stores:K},hydrate:!0}),f();const s={from:null,to:se("to",{params:a.params,routeId:(p=(o=a.route)==null?void 0:o.id)!=null?p:null,url:new URL(location.href)}),type:"load"};d.after_navigate.forEach(h=>h(s)),g=!0}async function X({url:n,params:l,branch:f,status:s,error:o,route:p,form:h}){var P;const k=f.filter(Boolean),v={type:"loaded",state:{url:n,params:l,branch:f,error:o,route:p},props:{components:k.map(O=>O.node.component)}};h!==void 0&&(v.props.form=h);let w={},b=!T;for(let O=0;O<k.length;O+=1){const U=k[O];w={...w,...U.data},(b||!a.branch.some(j=>j===U))&&(v.props[`data_${O}`]=w,b=b||Object.keys((P=U.data)!=null?P:{}).length>0)}if(b||(b=Object.keys(T.data).length!==Object.keys(w).length),!a.url||n.href!==a.url.href||a.error!==o||h!==void 0||b){v.props.page={error:o,params:l,routeId:p&&p.id,status:s,url:n,form:h,data:b?w:T.data};const O=(U,j)=>{Object.defineProperty(v.props.page,U,{get:()=>{throw new Error(`$page.${U} has been replaced by $page.url.${j}`)}})};O("origin","origin"),O("path","pathname"),O("query","searchParams")}return v}async function de({loader:n,parent:l,url:f,params:s,routeId:o,server_data_node:p}){var w,b,S,P,O;let h=null;const k={dependencies:new Set,params:new Set,parent:!1,url:!1},v=await n();if((w=v.shared)!=null&&w.load){let U=function(...$){for(const _ of $){const{href:E}=new URL(_,f);k.dependencies.add(E)}};const j={routeId:o,params:new Proxy(s,{get:($,_)=>(k.params.add(_),$[_])}),data:(b=p==null?void 0:p.data)!=null?b:null,url:ft(f,()=>{k.url=!0}),async fetch($,_){let E;$ instanceof Request?(E=$.url,_={body:$.method==="GET"||$.method==="HEAD"?void 0:await $.blob(),cache:$.cache,credentials:$.credentials,headers:$.headers,integrity:$.integrity,keepalive:$.keepalive,method:$.method,mode:$.mode,redirect:$.redirect,referrer:$.referrer,referrerPolicy:$.referrerPolicy,signal:$.signal,..._}):E=$;const A=new URL(E,f).href;return U(A),g?ht(A,_):pt(E,A,_)},setHeaders:()=>{},depends:U,parent(){return k.parent=!0,l()}};Object.defineProperties(j,{props:{get(){throw new Error("@migration task: Replace `props` with `data` stuff https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693")},enumerable:!1},session:{get(){throw new Error("session is no longer available. See https://github.com/sveltejs/kit/discussions/5883")},enumerable:!1},stuff:{get(){throw new Error("@migration task: Remove stuff https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693")},enumerable:!1}}),h=(S=await v.shared.load.call(null,j))!=null?S:null,h=h?await At(h):null}return{node:v,loader:n,server:p,shared:(P=v.shared)!=null&&P.load?{type:"data",data:h,uses:k}:null,data:(O=h!=null?h:p==null?void 0:p.data)!=null?O:null}}function Ae(n,l,f,s){if(L)return!0;if(!f)return!1;if(f.parent&&l||f.url&&n)return!0;for(const o of f.params)if(s[o]!==a.params[o])return!0;for(const o of f.dependencies)if(c.some(p=>p(new URL(o))))return!0;return!1}function pe(n,l){var f,s;return(n==null?void 0:n.type)==="data"?{type:"data",data:n.data,uses:{dependencies:new Set((f=n.uses.dependencies)!=null?f:[]),params:new Set((s=n.uses.params)!=null?s:[]),parent:!!n.uses.parent,url:!!n.uses.url}}:(n==null?void 0:n.type)==="skip"&&l!=null?l:null}async function Ue({id:n,invalidating:l,url:f,params:s,route:o}){var $;if((i==null?void 0:i.id)===n)return i.promise;const{errors:p,layouts:h,leaf:k}=o,v=[...h,k];p.forEach(_=>_==null?void 0:_().catch(()=>{})),v.forEach(_=>_==null?void 0:_[1]().catch(()=>{}));let w=null;const b=a.url?n!==a.url.pathname+a.url.search:!1,S=v.reduce((_,E,A)=>{var Y;const I=a.branch[A],G=!!(E!=null&&E[0])&&((I==null?void 0:I.loader)!==E[1]||Ae(b,_.some(Boolean),(Y=I.server)==null?void 0:Y.uses,s));return _.push(G),_},[]);if(S.some(Boolean)){try{w=await ze(f,S)}catch(_){return ne({status:500,error:Q(_,{url:f,params:s,routeId:o.id}),url:f,routeId:o.id})}if(w.type==="redirect")return w}const P=w==null?void 0:w.nodes;let O=!1;const U=v.map(async(_,E)=>{var Y;if(!_)return;const A=a.branch[E],I=P==null?void 0:P[E];if((!I||I.type==="skip")&&_[1]===(A==null?void 0:A.loader)&&!Ae(b,O,(Y=A.shared)==null?void 0:Y.uses,s))return A;if(O=!0,(I==null?void 0:I.type)==="error")throw I;return de({loader:_[1],url:f,params:s,routeId:o.id,parent:async()=>{var Ce;const qe={};for(let _e=0;_e<E;_e+=1)Object.assign(qe,(Ce=await U[_e])==null?void 0:Ce.data);return qe},server_data_node:pe(I===void 0&&_[0]?{type:"skip"}:I!=null?I:null,A==null?void 0:A.server)})});for(const _ of U)_.catch(()=>{});const j=[];for(let _=0;_<v.length;_+=1)if(v[_])try{j.push(await U[_])}catch(E){if(E instanceof Ke)return{type:"redirect",location:E.location};let A=500,I;P!=null&&P.includes(E)?(A=($=E.status)!=null?$:A,I=E.error):E instanceof ve?(A=E.status,I=E.body):I=Q(E,{params:s,url:f,routeId:o.id});const G=await je(_,j,p);return G?await X({url:f,params:s,branch:j.slice(0,G.idx).concat(G.node),status:A,error:I,route:o}):await Te(f,o.id,I,A)}else j.push(void 0);return await X({url:f,params:s,branch:j,status:200,error:null,route:o,form:l?void 0:null})}async function je(n,l,f){for(;n--;)if(f[n]){let s=n;for(;!l[s];)s-=1;try{return{idx:s+1,node:{node:await f[n](),loader:f[n],data:{},server:null,shared:null}}}catch{continue}}}async function ne({status:n,error:l,url:f,routeId:s}){var w;const o={},p=await ke();let h=null;if(p.server)try{const b=await ze(f,[!0]);if(b.type!=="data"||b.nodes[0]&&b.nodes[0].type!=="data")throw 0;h=(w=b.nodes[0])!=null?w:null}catch{(f.origin!==location.origin||f.pathname!==location.pathname||u)&&await ae(f)}const k=await de({loader:ke,url:f,params:o,routeId:s,parent:()=>Promise.resolve({}),server_data_node:pe(h)}),v={node:await Ee(),loader:Ee,shared:null,server:null,data:null};return await X({url:f,params:o,branch:[k,v],status:n,error:l,route:null})}function he(n,l){if(Ne(n))return;const f=decodeURI(n.pathname.slice(e.length)||"/");for(const s of re){const o=s.exec(f);if(o){const p=new URL(n.origin+it(n.pathname,t)+n.search+n.hash);return{id:p.pathname+p.search,invalidating:l,route:s,params:lt(o),url:p}}}}function Ne(n){return n.origin!==location.origin||!n.pathname.startsWith(e)}async function me({url:n,scroll:l,keepfocus:f,redirect_chain:s,details:o,type:p,delta:h,nav_token:k,accepted:v,blocked:w}){var U,j,$,_;let b=!1;const S=he(n,!1),P={from:se("from",{params:a.params,routeId:(j=(U=a.route)==null?void 0:U.id)!=null?j:null,url:a.url}),to:se("to",{params:($=S==null?void 0:S.params)!=null?$:null,routeId:(_=S==null?void 0:S.route.id)!=null?_:null,url:n}),type:p};h!==void 0&&(P.delta=h);const O={...P,cancel:()=>{b=!0}};if(d.before_navigate.forEach(E=>E(O)),b){w();return}we(N),v(),g&&K.navigating.set(P),await Oe(S,n,s,{scroll:l,keepfocus:f,details:o},k,()=>{d.after_navigate.forEach(E=>E(P)),K.navigating.set(null)})}async function Te(n,l,f,s){return n.origin===location.origin&&n.pathname===location.pathname&&!u?await ne({status:s,error:f,url:n,routeId:l}):await ae(n)}function ae(n){return location.href=n.href,new Promise(()=>{})}return{after_navigate:n=>{ye(()=>(d.after_navigate.push(n),()=>{const l=d.after_navigate.indexOf(n);d.after_navigate.splice(l,1)}))},before_navigate:n=>{ye(()=>(d.before_navigate.push(n),()=>{const l=d.before_navigate.indexOf(n);d.before_navigate.splice(l,1)}))},disable_scroll_handling:()=>{(y||!g)&&(m=!1)},goto:(n,l={})=>ue(n,l,[]),invalidate:n=>{if(n===void 0)throw new Error("`invalidate()` (with no arguments) has been replaced by `invalidateAll()`");if(typeof n=="function")c.push(n);else{const{href:l}=new URL(n,location.href);c.push(f=>f.href===l)}return Le()},invalidateAll:()=>(L=!0,Le()),prefetch:async n=>{const l=new URL(n,xe(document));await Pe(l)},prefetch_routes:async n=>{const f=(n?re.filter(s=>n.some(o=>s.exec(o))):re).map(s=>Promise.all([...s.layouts,s.leaf].map(o=>o==null?void 0:o[1]())));await Promise.all(f)},apply_action:async n=>{if(n.type==="error"){const l=new URL(location.href),{branch:f,route:s}=a;if(!s)return;const o=await je(a.branch.length,f,s.errors);if(o){const p=await X({url:l,params:a.params,branch:f.slice(0,o.idx).concat(o.node),status:500,error:n.error,route:s});a=p.state;const h=oe();R.$set(p.props),h()}}else if(n.type==="redirect")ue(n.location,{},[]);else{const l={form:n.data,page:{...T,form:n.data,status:n.status}},f=oe();R.$set(l),f()}},_start_router:()=>{history.scrollRestoration="manual",addEventListener("beforeunload",s=>{var h,k;let o=!1;const p={from:se("from",{params:a.params,routeId:(k=(h=a.route)==null?void 0:h.id)!=null?k:null,url:a.url}),to:null,type:"unload",cancel:()=>o=!0};d.before_navigate.forEach(v=>v(p)),o?(s.preventDefault(),s.returnValue=""):history.scrollRestoration="auto"}),addEventListener("visibilitychange",()=>{if(document.visibilityState==="hidden"){we(N);try{sessionStorage[Ge]=JSON.stringify(ee)}catch{}}});const n=s=>{const{url:o,options:p}=Be(s);if(o&&p.prefetch){if(Ne(o))return;Pe(o)}};let l;const f=s=>{clearTimeout(l),l=setTimeout(()=>{var o;(o=s.target)==null||o.dispatchEvent(new CustomEvent("sveltekit:trigger_prefetch",{bubbles:!0}))},20)};addEventListener("touchstart",n),addEventListener("mousemove",f),addEventListener("sveltekit:trigger_prefetch",n),addEventListener("click",s=>{if(s.button||s.which!==1||s.metaKey||s.ctrlKey||s.shiftKey||s.altKey||s.defaultPrevented)return;const{a:o,url:p,options:h}=Be(s);if(!o||!p)return;const k=o instanceof SVGAElement;if(!k&&!(p.protocol==="https:"||p.protocol==="http:"))return;const v=(o.getAttribute("rel")||"").split(/\s+/);if(o.hasAttribute("download")||v.includes("external")||h.reload||(k?o.target.baseVal:o.target))return;const[w,b]=p.href.split("#");if(b!==void 0&&w===location.href.split("#")[0]){q=!0,we(N),a.url=p,K.page.set({...T,url:p}),K.page.notify();return}me({url:p,scroll:h.noscroll?be():null,keepfocus:!1,redirect_chain:[],details:{state:{},replaceState:p.href===location.href},accepted:()=>s.preventDefault(),blocked:()=>s.preventDefault(),type:"link"})}),addEventListener("popstate",s=>{if(s.state){if(s.state[V]===N)return;const o=s.state[V]-N;me({url:new URL(location.href),scroll:ee[s.state[V]],keepfocus:!1,redirect_chain:[],details:null,accepted:()=>{N=s.state[V]},blocked:()=>{history.go(-o)},type:"popstate",delta:o})}}),addEventListener("hashchange",()=>{q&&(q=!1,history.replaceState({...history.state,[V]:++N},"",location.href))});for(const s of document.querySelectorAll("link"))s.rel==="icon"&&(s.href=s.href);addEventListener("pageshow",s=>{s.persisted&&K.navigating.set(null)})},_hydrate:async({status:n,error:l,node_ids:f,params:s,routeId:o,data:p,form:h})=>{var w;u=!0;const k=new URL(location.href);let v;try{const b=f.map(async(S,P)=>{const O=p[P];return de({loader:fe[S],url:k,params:s,routeId:o,parent:async()=>{const U={};for(let j=0;j<P;j+=1)Object.assign(U,(await b[j]).data);return U},server_data_node:pe(O)})});v=await X({url:k,params:s,branch:await Promise.all(b),status:n,error:l,form:h,route:(w=re.find(S=>S.id===o))!=null?w:null})}catch(b){if(b instanceof Ke){await ae(new URL(b.location,location.href));return}v=await ne({status:b instanceof ve?b.status:500,error:Q(b,{url:k,params:s,routeId:o}),url:k,routeId:o})}Ie(v)}}}let jt=1;async function ze(r,e){const t=new URL(r);t.pathname=r.pathname.replace(/\/$/,"")+It,t.searchParams.set("__invalid",e.map(i=>i?"y":"n").join("")),t.searchParams.set("__id",String(jt++)),await Z(()=>import(t.href),[],import.meta.url);const c=window.__sveltekit_data;return delete window.__sveltekit_data,c}function Q(r,e){var t;return r instanceof ve?r.body:(t=Ot.handleError({error:r,event:e}))!=null?t:{message:e.routeId!=null?"Internal Error":"Not Found"}}const Nt=["hash","href","host","hostname","origin","pathname","port","protocol","search","searchParams","toString","toJSON"];function se(r,e){for(const t of Nt)Object.defineProperty(e,t,{get(){throw new Error(`The navigation shape changed - ${r}.${t} should now be ${r}.url.${t}`)},enumerable:!1});return e}function oe(){return()=>{}}async function Ct({env:r,hydrate:e,paths:t,target:c,trailing_slash:i}){st(t);const d=Ut({target:c,base:t.base,trailing_slash:i});ot({client:d}),e?await d._hydrate(e):d.goto(location.href,{replaceState:!0}),d._start_router()}export{Ct as start};