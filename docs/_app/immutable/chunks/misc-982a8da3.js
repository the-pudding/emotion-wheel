import{B as e,N as m,O as P,P as E,Q as O,R as D}from"./paths-8d3015a4.js";function w(t){return Object.prototype.toString.call(t)==="[object Date]"}function u(t,s){if(t===s||t!==t)return()=>t;const i=typeof t;if(i!==typeof s||Array.isArray(t)!==Array.isArray(s))throw new Error("Cannot interpolate values of different type");if(Array.isArray(t)){const a=s.map((n,r)=>u(t[r],n));return n=>a.map(r=>r(n))}if(i==="object"){if(!t||!s)throw new Error("Object cannot be null");if(w(t)&&w(s)){t=t.getTime(),s=s.getTime();const r=s-t;return o=>new Date(t+o*r)}const a=Object.keys(s),n={};return a.forEach(r=>{n[r]=u(t[r],s[r])}),r=>{const o={};return a.forEach(c=>{o[c]=n[c](r)}),o}}if(i==="number"){const a=s-t;return n=>t+n*a}throw new Error(`Cannot interpolate ${i} values`)}function k(t,s={}){const i=e(t);let a,n=t;function r(o,c){if(t==null)return i.set(t=o),Promise.resolve();n=o;let l=a,d=!1,{delay:h=0,duration:f=400,easing:j=O,interpolate:A=u}=m(m({},s),c);if(f===0)return l&&(l.abort(),l=null),i.set(t=n),Promise.resolve();const p=P()+h;let y;return a=E(b=>{if(b<p)return!0;d||(y=A(t,o),typeof f=="function"&&(f=f(t,o)),d=!0),l&&(l.abort(),l=null);const g=b-p;return g>f?(i.set(t=o),!1):(i.set(t=y(j(g/f))),!0)}),a.promise}return{set:r,update:(o,c)=>r(o(n,t),c),subscribe:i.subscribe}}const B=D(400),C=k(0,{duration:0}),I=e(!1),S=e(!1),T=e(!1),W=e(!1),F=e(!1),G=e(void 0),M=e(!0),N=e(void 0),Q=e([]),R=e([]),$=e(void 0),q=e([]),z=e(void 0),H=e("#b5bbbb"),J=e(0),K=e(0);export{F as a,W as b,M as c,B as d,S as e,C as f,N as g,R as h,H as i,$ as j,z as k,G as l,K as m,q as n,I as o,T as s,J as v,Q as w};
