import{j as e,k as o}from"./index.5d61a7e0.js";const t=Vue.createTextVNode("搜索"),u=Vue.createTextVNode("重置"),l={class:"dialog-footer"},a=Vue.createTextVNode("确 定"),n=Vue.createTextVNode("取 消"),r=Vue.defineComponent({name:"SelectUser"}),V=Object.assign(r,{props:{role_id:{type:[Number,String]}},emits:["ok"],setup(r,{expose:V,emit:i}){const d=r,{proxy:p}=Vue.getCurrentInstance(),{sys_normal_disable:s}=p.useDict("sys_normal_disable"),c=Vue.ref([]),m=Vue.ref(!1),f=Vue.ref(0),_=Vue.ref([]),h=Vue.reactive({page_num:1,page_size:10,role_id:void 0,user_name:void 0,phone_num:void 0});function v(e){p.$refs.refTable.toggleRowSelection(e)}function w(e){_.value=e.map((e=>e.id))}async function C(){const o=await e(h);c.value=o.list,f.value=o.total}function g(){h.page_num=1,C()}function N(){p.resetForm("queryRef"),g()}function x(){const e=h.role_id,t=_.value;0!==t.length?o({role_id:e,user_ids:t}).then((e=>{p.$modal.msgSuccess("授权成功"),m.value=!1,i("ok")})):p.$modal.msgError("请选择要分配的用户")}return V({show:function(){h.role_id=d.role_id,C(),m.value=!0}}),(e,o)=>{const r=Vue.resolveComponent("el-input"),V=Vue.resolveComponent("el-form-item"),i=Vue.resolveComponent("el-button"),d=Vue.resolveComponent("el-form"),p=Vue.resolveComponent("el-table-column"),_=Vue.resolveComponent("dict-tag"),b=Vue.resolveComponent("el-table"),y=Vue.resolveComponent("pagination"),k=Vue.resolveComponent("el-row"),S=Vue.resolveComponent("el-dialog");return Vue.openBlock(),Vue.createBlock(S,{title:"选择用户",modelValue:m.value,"onUpdate:modelValue":o[5]||(o[5]=e=>m.value=e),width:"800px",top:"5vh","append-to-body":""},{footer:Vue.withCtx((()=>[Vue.createElementVNode("div",l,[Vue.createVNode(i,{type:"primary",onClick:x},{default:Vue.withCtx((()=>[a])),_:1}),Vue.createVNode(i,{onClick:o[4]||(o[4]=e=>m.value=!1)},{default:Vue.withCtx((()=>[n])),_:1})])])),default:Vue.withCtx((()=>[Vue.createVNode(d,{model:Vue.unref(h),ref:"queryRef",inline:!0},{default:Vue.withCtx((()=>[Vue.createVNode(V,{label:"用户名称",prop:"user_name"},{default:Vue.withCtx((()=>[Vue.createVNode(r,{modelValue:Vue.unref(h).user_name,"onUpdate:modelValue":o[0]||(o[0]=e=>Vue.unref(h).user_name=e),placeholder:"请输入用户名称",clearable:"",onKeyup:Vue.withKeys(g,["enter"])},null,8,["modelValue","onKeyup"])])),_:1}),Vue.createVNode(V,{label:"手机号码",prop:"phone_num"},{default:Vue.withCtx((()=>[Vue.createVNode(r,{modelValue:Vue.unref(h).phone_num,"onUpdate:modelValue":o[1]||(o[1]=e=>Vue.unref(h).phone_num=e),placeholder:"请输入手机号码",clearable:"",onKeyup:Vue.withKeys(g,["enter"])},null,8,["modelValue","onKeyup"])])),_:1}),Vue.createVNode(V,null,{default:Vue.withCtx((()=>[Vue.createVNode(i,{type:"primary",icon:"Search",onClick:g},{default:Vue.withCtx((()=>[t])),_:1}),Vue.createVNode(i,{icon:"Refresh",onClick:N},{default:Vue.withCtx((()=>[u])),_:1})])),_:1})])),_:1},8,["model"]),Vue.createVNode(k,null,{default:Vue.withCtx((()=>[Vue.createVNode(b,{onRowClick:v,ref:"refTable",data:c.value,onSelectionChange:w,height:"260px"},{default:Vue.withCtx((()=>[Vue.createVNode(p,{type:"selection",width:"55"}),Vue.createVNode(p,{label:"用户名称",prop:"user_name","show-overflow-tooltip":!0}),Vue.createVNode(p,{label:"用户昵称",prop:"user_nickname","show-overflow-tooltip":!0}),Vue.createVNode(p,{label:"邮箱",prop:"user_email","show-overflow-tooltip":!0}),Vue.createVNode(p,{label:"手机",prop:"phone_num","show-overflow-tooltip":!0}),Vue.createVNode(p,{label:"状态",align:"center",prop:"user_status"},{default:Vue.withCtx((e=>[Vue.createVNode(_,{options:Vue.unref(s),value:e.row.user_status},null,8,["options","value"])])),_:1}),Vue.createVNode(p,{label:"创建时间",align:"center",prop:"created_at",width:"180"},{default:Vue.withCtx((o=>[Vue.createElementVNode("span",null,Vue.toDisplayString(e.parseTime(o.row.created_at)),1)])),_:1})])),_:1},8,["data"]),Vue.withDirectives(Vue.createVNode(y,{total:f.value,page:Vue.unref(h).page_num,"onUpdate:page":o[2]||(o[2]=e=>Vue.unref(h).page_num=e),limit:Vue.unref(h).page_size,"onUpdate:limit":o[3]||(o[3]=e=>Vue.unref(h).page_size=e),onPagination:C},null,8,["total","page","limit"]),[[Vue.vShow,f.value>0]])])),_:1})])),_:1},8,["modelValue"])}}});export{V as default};
