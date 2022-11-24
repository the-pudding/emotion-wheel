import{B as e,N as m,O as E,P as O,Q as P,R as D}from"./paths-05b9feb0.js";function w(t){return Object.prototype.toString.call(t)==="[object Date]"}function d(t,r){if(t===r||t!==t)return()=>t;const i=typeof t;if(i!==typeof r||Array.isArray(t)!==Array.isArray(r))throw new Error("Cannot interpolate values of different type");if(Array.isArray(t)){const a=r.map((n,s)=>d(t[s],n));return n=>a.map(s=>s(n))}if(i==="object"){if(!t||!r)throw new Error("Object cannot be null");if(w(t)&&w(r)){t=t.getTime(),r=r.getTime();const s=r-t;return o=>new Date(t+o*s)}const a=Object.keys(r),n={};return a.forEach(s=>{n[s]=d(t[s],r[s])}),s=>{const o={};return a.forEach(c=>{o[c]=n[c](s)}),o}}if(i==="number"){const a=r-t;return n=>t+n*a}throw new Error(`Cannot interpolate ${i} values`)}function k(t,r={}){const i=e(t);let a,n=t;function s(o,c){if(t==null)return i.set(t=o),Promise.resolve();n=o;let l=a,u=!1,{delay:h=0,duration:f=400,easing:j=P,interpolate:A=d}=m(m({},r),c);if(f===0)return l&&(l.abort(),l=null),i.set(t=n),Promise.resolve();const p=E()+h;let y;return a=O(b=>{if(b<p)return!0;u||(y=A(t,o),typeof f=="function"&&(f=f(t,o)),u=!0),l&&(l.abort(),l=null);const g=b-p;return g>f?(i.set(t=o),!1):(i.set(t=y(j(g/f))),!0)}),a.promise}return{set:s,update:(o,c)=>s(o(n,t),c),subscribe:i.subscribe}}const B=D(400),C=k(0,{duration:0}),S=e(!1),T=e(!1),W=e(!1),F=e(void 0),G=e(!0),I=e(void 0),M=e([]),N=e([]),Q=e(void 0),R=e([]),$=e(void 0),q=e("#b5bbbb"),z=e(0),H=e(0);export{W as a,B as b,C as c,I as d,T as e,N as f,q as g,Q as h,$ as i,F as j,H as k,S as l,R as n,G as s,k as t,z as v,M as w};