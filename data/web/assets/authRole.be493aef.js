import{a0 as T,C as A,g as r,r as n,aa as E,o as C,i as O,j as o,w as a,V,c as q,W as F,m as v,Q as K,t as S,z as $,P as Q}from"./vendor.8d886737.js";import{d as W,e as G}from"./index.c83df884.js";import{l as H}from"./role.8100c124.js";const J={class:"app-container"},L=v("h4",{class:"form-header h4"},"\u57FA\u672C\u4FE1\u606F",-1),M=v("h4",{class:"form-header h4"},"\u89D2\u8272\u4FE1\u606F",-1),X=$("\u63D0\u4EA4"),Y=$("\u8FD4\u56DE"),Z=T({name:"AuthRole"}),ae=Object.assign(Z,{setup(ee){const h=A(),{proxy:c}=Q(),g=r(!0),b=r(0),_=r(1),p=r(10),k=r([]),w=r([]),s=r({nickName:void 0,userName:void 0,userId:void 0});function N(l){c.$refs.roleRef.toggleRowSelection(l)}function j(l){k.value=l.map(e=>e.role_id)}function U(l){return l.role_id}function x(){c.$router.back(),c.$tab.closeOpenPage()}function B(){const l=s.value.id,e=k.value;console.log("user_id",l),console.log("role_ids",e),G({user_id:l,role_ids:e}).then(i=>{c.$modal.msgSuccess("\u6388\u6743\u6210\u529F"),x()})}async function I(){const l=h.params&&h.params.userId,e={page_num:1,page_size:9999999999};if(l){g.value=!0;const i=await H(e);w.value=i.list,b.value=i.total;const u=await W({user_id:l});s.value=u.user_info;const m=u.role_ids;K(()=>{w.value.forEach(f=>{m.includes(f.role_id)&&c.$refs.roleRef.toggleRowSelection(f)})}),g.value=!1}}return I(),(l,e)=>{const i=n("el-input"),u=n("el-form-item"),m=n("el-col"),f=n("el-row"),y=n("el-form"),d=n("el-table-column"),z=n("el-table"),D=n("pagination"),R=n("el-button"),P=E("loading");return C(),O("div",J,[L,o(y,{model:s.value,"label-width":"80px"},{default:a(()=>[o(f,null,{default:a(()=>[o(m,{span:8,offset:2},{default:a(()=>[o(u,{label:"\u7528\u6237\u6635\u79F0",prop:"user_nickname"},{default:a(()=>[o(i,{modelValue:s.value.user_nickname,"onUpdate:modelValue":e[0]||(e[0]=t=>s.value.user_nickname=t),disabled:""},null,8,["modelValue"])]),_:1})]),_:1}),o(m,{span:8,offset:2},{default:a(()=>[o(u,{label:"\u767B\u5F55\u8D26\u53F7",prop:"user_name"},{default:a(()=>[o(i,{modelValue:s.value.user_name,"onUpdate:modelValue":e[1]||(e[1]=t=>s.value.user_name=t),disabled:""},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})]),_:1},8,["model"]),M,V((C(),q(z,{"row-key":U,onRowClick:N,ref:"roleRef",onSelectionChange:j,data:w.value.slice((_.value-1)*p.value,_.value*p.value)},{default:a(()=>[o(d,{label:"\u5E8F\u53F7",type:"index",align:"center"},{default:a(t=>[v("span",null,S((_.value-1)*p.value+t.$index+1),1)]),_:1}),o(d,{type:"selection","reserve-selection":!0,width:"55"}),o(d,{label:"\u89D2\u8272\u7F16\u53F7",align:"center",prop:"role_id",width:"100","show-overflow-tooltip":""}),o(d,{label:"\u89D2\u8272\u540D\u79F0",align:"center",prop:"role_name"}),o(d,{label:"\u6743\u9650\u5B57\u7B26",align:"center",prop:"role_key"}),o(d,{label:"\u521B\u5EFA\u65F6\u95F4",align:"center",prop:"created_at",width:"180"},{default:a(t=>[v("span",null,S(l.parseTime(t.row.created_at)),1)]),_:1})]),_:1},8,["data"])),[[P,g.value]]),V(o(D,{total:b.value,page:_.value,"onUpdate:page":e[2]||(e[2]=t=>_.value=t),limit:p.value,"onUpdate:limit":e[3]||(e[3]=t=>p.value=t)},null,8,["total","page","limit"]),[[F,b.value>0]]),o(y,{"label-width":"100px"},{default:a(()=>[o(u,{style:{"text-align":"center","margin-left":"-120px","margin-top":"30px"}},{default:a(()=>[o(R,{type:"primary",onClick:e[4]||(e[4]=t=>B())},{default:a(()=>[X]),_:1}),o(R,{onClick:e[5]||(e[5]=t=>x())},{default:a(()=>[Y]),_:1})]),_:1})]),_:1})])}}});export{ae as default};