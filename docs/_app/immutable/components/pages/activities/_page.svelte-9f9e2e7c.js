import{S as G,i as H,s as M,k as y,q as D,l as A,m as b,r as C,h,n as g,b as W,D as v,L as Q,u as R,A as I,a as B,c as q,C as j,W as X,_ as Y,v as z,w as K,x as L,f as S,g as et,d as it,$ as Z,t as w,K as st,y as O}from"../../../chunks/index-0202f02a.js";function nt(s){let t,i,e,a,l,n;return{c(){t=y("div"),i=y("h3"),e=D(s[1]),this.h()},l(r){t=A(r,"DIV",{class:!0,id:!0,style:!0});var o=b(t);i=A(o,"H3",{class:!0});var f=b(i);e=C(f,s[1]),f.forEach(h),o.forEach(h),this.h()},h(){g(i,"class","svelte-1i5xef3"),g(t,"class","card svelte-1i5xef3"),g(t,"id",s[0]),g(t,"style",a=`--background: url(../assets/activities/${s[0]}.png`)},m(r,o){W(r,t,o),v(t,i),v(i,e),l||(n=Q(t,"click",s[2]),l=!0)},p(r,[o]){o&2&&R(e,r[1]),o&1&&g(t,"id",r[0]),o&1&&a!==(a=`--background: url(../assets/activities/${r[0]}.png`)&&g(t,"style",a)},i:I,o:I,d(r){r&&h(t),l=!1,n()}}}function rt(s,t,i){let{imageSrc:e}=t,{title:a}=t,{currentActivity:l}=t;const n=()=>{i(3,l=e)};return s.$$set=r=>{"imageSrc"in r&&i(0,e=r.imageSrc),"title"in r&&i(1,a=r.title),"currentActivity"in r&&i(3,l=r.currentActivity)},s.$$.update=()=>{s.$$.dirty&8&&console.log({currentActivity:l})},[e,a,n,l]}class ct extends G{constructor(t){super(),H(this,t,rt,nt,M,{imageSrc:0,title:1,currentActivity:3})}}function at(s){let t,i,e,a,l,n,r;return{c(){t=y("div"),i=D(s[0]),e=B(),a=y("button"),l=D("close"),this.h()},l(o){t=A(o,"DIV",{class:!0});var f=b(t);i=C(f,s[0]),e=q(f),a=A(f,"BUTTON",{});var k=b(a);l=C(k,"close"),k.forEach(h),f.forEach(h),this.h()},h(){g(t,"class","modal svelte-4n5n1z"),j(t,"visible",s[0])},m(o,f){W(o,t,f),v(t,i),v(t,e),v(t,a),v(a,l),n||(r=Q(a,"click",s[1]),n=!0)},p(o,[f]){f&1&&R(i,o[0]),f&1&&j(t,"visible",o[0])},i:I,o:I,d(o){o&&h(t),n=!1,r()}}}function lt(s,t,i){let{currentActivity:e}=t;const a=()=>{i(0,e=void 0)};return s.$$set=l=>{"currentActivity"in l&&i(0,e=l.currentActivity)},[e,a]}class ot extends G{constructor(t){super(),H(this,t,lt,at,M,{currentActivity:0})}}function F(s,t,i){const e=s.slice();return e[4]=t[i].imageSrc,e[5]=t[i].title,e}function J(s){let t,i,e;function a(n){s[2](n)}let l={imageSrc:s[4],title:s[5]};return s[0]!==void 0&&(l.currentActivity=s[0]),t=new ct({props:l}),X.push(()=>Y(t,"currentActivity",a)),{c(){z(t.$$.fragment)},l(n){K(t.$$.fragment,n)},m(n,r){L(t,n,r),e=!0},p(n,r){const o={};!i&&r&1&&(i=!0,o.currentActivity=n[0],Z(()=>i=!1)),t.$set(o)},i(n){e||(S(t.$$.fragment,n),e=!0)},o(n){w(t.$$.fragment,n),e=!1},d(n){O(t,n)}}}function ut(s){let t,i,e,a,l,n,r,o,f,k,p,N,V,$=s[1],u=[];for(let c=0;c<$.length;c+=1)u[c]=J(F(s,$,c));const x=c=>w(u[c],1,1,()=>{u[c]=null});function tt(c){s[3](c)}let P={};return s[0]!==void 0&&(P.currentActivity=s[0]),p=new ot({props:P}),X.push(()=>Y(p,"currentActivity",tt)),{c(){t=y("div"),i=y("div"),e=y("h1"),a=D("Activities"),l=B(),n=y("a"),r=D("Go back to story"),o=B(),f=y("div");for(let c=0;c<u.length;c+=1)u[c].c();k=B(),z(p.$$.fragment),this.h()},l(c){t=A(c,"DIV",{class:!0});var d=b(t);i=A(d,"DIV",{class:!0});var m=b(i);e=A(m,"H1",{class:!0});var _=b(e);a=C(_,"Activities"),_.forEach(h),l=q(m),n=A(m,"A",{href:!0});var E=b(n);r=C(E,"Go back to story"),E.forEach(h),m.forEach(h),o=q(d),f=A(d,"DIV",{class:!0});var U=b(f);for(let T=0;T<u.length;T+=1)u[T].l(U);U.forEach(h),k=q(d),K(p.$$.fragment,d),d.forEach(h),this.h()},h(){g(e,"class","svelte-pa2w55"),g(n,"href","../"),g(i,"class","top svelte-pa2w55"),g(f,"class","cards svelte-pa2w55"),g(t,"class","container svelte-pa2w55")},m(c,d){W(c,t,d),v(t,i),v(i,e),v(e,a),v(i,l),v(i,n),v(n,r),v(t,o),v(t,f);for(let m=0;m<u.length;m+=1)u[m].m(f,null);v(t,k),L(p,t,null),V=!0},p(c,[d]){if(d&3){$=c[1];let _;for(_=0;_<$.length;_+=1){const E=F(c,$,_);u[_]?(u[_].p(E,d),S(u[_],1)):(u[_]=J(E),u[_].c(),S(u[_],1),u[_].m(f,null))}for(et(),_=$.length;_<u.length;_+=1)x(_);it()}const m={};!N&&d&1&&(N=!0,m.currentActivity=c[0],Z(()=>N=!1)),p.$set(m)},i(c){if(!V){for(let d=0;d<$.length;d+=1)S(u[d]);S(p.$$.fragment,c),V=!0}},o(c){u=u.filter(Boolean);for(let d=0;d<u.length;d+=1)w(u[d]);w(p.$$.fragment,c),V=!1},d(c){c&&h(t),st(u,c),O(p)}}}function ft(s,t,i){let e;const a=[{imageSrc:"wheel",title:"Emotion Wheel"},{imageSrc:"body",title:"Body mapping"},{imageSrc:"needs",title:"Needs checklist"}];function l(r){e=r,i(0,e)}function n(r){e=r,i(0,e)}return[e,a,l,n]}class dt extends G{constructor(t){super(),H(this,t,ft,ut,M,{})}}function _t(s){let t,i;return t=new dt({}),{c(){z(t.$$.fragment)},l(e){K(t.$$.fragment,e)},m(e,a){L(t,e,a),i=!0},p:I,i(e){i||(S(t.$$.fragment,e),i=!0)},o(e){w(t.$$.fragment,e),i=!1},d(e){O(t,e)}}}class ht extends G{constructor(t){super(),H(this,t,null,_t,M,{})}}export{ht as default};
