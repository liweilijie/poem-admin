import{g as o,h as a,J as l,aa as u,V as d,o as m,i as h,m as p,k as g,n as v}from"./vendor.8d886737.js";const _=["src"],x={props:{src:{type:String,required:!0}},setup(n){const s=n,e=o(document.documentElement.clientHeight-94.5+"px;"),t=o(!0),r=a(()=>s.src);return l(()=>{setTimeout(()=>{t.value=!1},300),window.onresize=function(){e.value=document.documentElement.clientHeight-94.5+"px;"}}),(i,f)=>{const c=u("loading");return d((m(),h("div",{style:v("height:"+e.value)},[p("iframe",{src:g(r),frameborder:"no",style:{width:"100%",height:"100%"},scrolling:"auto"},null,8,_)],4)),[[c,t.value]])}}};export{x as _};