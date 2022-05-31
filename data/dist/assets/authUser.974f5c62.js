import e from"./selectUser.c19ef879.js";import{h as t,i as o}from"./index.5d61a7e0.js";const u={class:"app-container"},a=Vue.createTextVNode("搜索"),l=Vue.createTextVNode("重置"),r=Vue.createTextVNode("添加用户"),n=Vue.createTextVNode("批量取消授权"),i=Vue.createTextVNode("关闭"),V=Vue.createTextVNode("取消授权"),c=Vue.defineComponent({name:"AuthUser"}),s=Object.assign(c,{setup(c){const s=VueRouter.useRoute(),{proxy:d}=Vue.getCurrentInstance(),{sys_normal_disable:p}=d.useDict("sys_normal_disable"),m=Vue.ref([]),h=Vue.ref(!0),f=Vue.ref(!0),_=Vue.ref(!0),w=Vue.ref(0),v=Vue.ref([]),C=Vue.reactive({page_num:1,page_size:10,role_id:s.params.roleId,user_name:void 0,phone_num:void 0});async function g(){h.value=!0;const e=await t(C);m.value=e.list,w.value=e.total,h.value=!1}function x(){d.$router.back(),d.$tab.closeOpenPage()}function N(){C.page_num=1,g()}function y(){d.resetForm("queryRef"),N()}function b(e){v.value=e.map((e=>e.id)),_.value=!e.length}function k(){d.$refs.selectRef.show()}function B(e){const t=C.role_id,u=v.value;d.$modal.confirm("是否取消选中用户授权数据项?").then((function(){return o({user_ids:u,role_id:t})})).then((()=>{g(),d.$modal.msgSuccess("取消授权成功")})).catch((()=>{}))}return g(),(t,c)=>{const s=Vue.resolveComponent("el-input"),v=Vue.resolveComponent("el-form-item"),D=Vue.resolveComponent("el-button"),S=Vue.resolveComponent("el-form"),T=Vue.resolveComponent("el-col"),R=Vue.resolveComponent("right-toolbar"),U=Vue.resolveComponent("el-row"),$=Vue.resolveComponent("el-table-column"),K=Vue.resolveComponent("dict-tag"),P=Vue.resolveComponent("el-table"),j=Vue.resolveComponent("pagination"),z=Vue.resolveDirective("hasPermi"),O=Vue.resolveDirective("loading");return Vue.openBlock(),Vue.createElementBlock("div",u,[Vue.withDirectives(Vue.createVNode(S,{model:Vue.unref(C),ref:"queryRef",inline:!0},{default:Vue.withCtx((()=>[Vue.createVNode(v,{label:"用户名称",prop:"user_name"},{default:Vue.withCtx((()=>[Vue.createVNode(s,{modelValue:Vue.unref(C).user_name,"onUpdate:modelValue":c[0]||(c[0]=e=>Vue.unref(C).user_name=e),placeholder:"请输入用户名称",clearable:"",style:{width:"240px"},onKeyup:Vue.withKeys(N,["enter"])},null,8,["modelValue","onKeyup"])])),_:1}),Vue.createVNode(v,{label:"手机号码",prop:"phone_num"},{default:Vue.withCtx((()=>[Vue.createVNode(s,{modelValue:Vue.unref(C).phone_num,"onUpdate:modelValue":c[1]||(c[1]=e=>Vue.unref(C).phone_num=e),placeholder:"请输入手机号码",clearable:"",style:{width:"240px"},onKeyup:Vue.withKeys(N,["enter"])},null,8,["modelValue","onKeyup"])])),_:1}),Vue.createVNode(v,null,{default:Vue.withCtx((()=>[Vue.createVNode(D,{type:"primary",icon:"Search",onClick:N},{default:Vue.withCtx((()=>[a])),_:1}),Vue.createVNode(D,{icon:"Refresh",onClick:y},{default:Vue.withCtx((()=>[l])),_:1})])),_:1})])),_:1},8,["model"]),[[Vue.vShow,f.value]]),Vue.createVNode(U,{gutter:10,class:"mb8",style:{height:"35px"}},{default:Vue.withCtx((()=>[Vue.createVNode(T,{span:1.5},{default:Vue.withCtx((()=>[Vue.withDirectives((Vue.openBlock(),Vue.createBlock(D,{type:"primary",plain:"",icon:"Plus",onClick:k},{default:Vue.withCtx((()=>[r])),_:1})),[[z,["system/role/add_auth_user"]]])])),_:1},8,["span"]),Vue.createVNode(T,{span:1.5},{default:Vue.withCtx((()=>[Vue.withDirectives((Vue.openBlock(),Vue.createBlock(D,{type:"danger",plain:"",icon:"CircleClose",disabled:_.value,onClick:B},{default:Vue.withCtx((()=>[n])),_:1},8,["disabled"])),[[z,["system/role/cancel_auth_user"]]])])),_:1},8,["span"]),Vue.createVNode(T,{span:1.5},{default:Vue.withCtx((()=>[Vue.createVNode(D,{type:"warning",plain:"",icon:"Close",onClick:x},{default:Vue.withCtx((()=>[i])),_:1})])),_:1},8,["span"]),Vue.createVNode(R,{showSearch:f.value,"onUpdate:showSearch":c[2]||(c[2]=e=>f.value=e),onQueryTable:g},null,8,["showSearch"])])),_:1}),Vue.withDirectives((Vue.openBlock(),Vue.createBlock(P,{data:m.value,onSelectionChange:b},{default:Vue.withCtx((()=>[Vue.createVNode($,{type:"selection",width:"55",align:"center"}),Vue.createVNode($,{label:"用户名称",prop:"user_name","show-overflow-tooltip":!0}),Vue.createVNode($,{label:"用户昵称",prop:"user_nickname","show-overflow-tooltip":!0}),Vue.createVNode($,{label:"邮箱",prop:"user_email","show-overflow-tooltip":!0}),Vue.createVNode($,{label:"手机",prop:"phone_num","show-overflow-tooltip":!0}),Vue.createVNode($,{label:"状态",align:"center",prop:"user_status"},{default:Vue.withCtx((e=>[Vue.createVNode(K,{options:Vue.unref(p),value:e.row.user_status},null,8,["options","value"])])),_:1}),Vue.createVNode($,{label:"创建时间",align:"center",prop:"created_at",width:"180"},{default:Vue.withCtx((e=>[Vue.createElementVNode("span",null,Vue.toDisplayString(t.parseTime(e.row.created_at)),1)])),_:1}),Vue.withDirectives((Vue.openBlock(),Vue.createBlock($,{label:"操作",align:"center","class-name":"small-padding fixed-width"},{default:Vue.withCtx((e=>[Vue.createVNode(D,{type:"text",icon:"CircleClose",onClick:t=>{return u=e.row,void d.$modal.confirm('确认要取消该用户"'+u.user_name+'"角色吗？').then((function(){return o({user_ids:[u.id],role_id:C.role_id})})).then((()=>{g(),d.$modal.msgSuccess("取消授权成功")})).catch((()=>{}));var u}},{default:Vue.withCtx((()=>[V])),_:2},1032,["onClick"])])),_:1})),[[z,["system/role/cancel_auth_user"]]])])),_:1},8,["data"])),[[O,h.value]]),Vue.withDirectives(Vue.createVNode(j,{total:w.value,page:Vue.unref(C).page_num,"onUpdate:page":c[3]||(c[3]=e=>Vue.unref(C).page_num=e),limit:Vue.unref(C).page_size,"onUpdate:limit":c[4]||(c[4]=e=>Vue.unref(C).page_size=e),onPagination:g},null,8,["total","page","limit"]),[[Vue.vShow,w.value>0]]),Vue.createVNode(Vue.unref(e),{ref:"selectRef",role_id:Vue.unref(C).role_id,onOk:N},null,8,["role_id"])])}}});export{s as default};
