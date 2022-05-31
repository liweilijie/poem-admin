import{K as e,L as u,M as l,N as t,O as a,f as o,l as r,v as d,P as n,Q as V}from"./index.5d61a7e0.js";import{l as i}from"./post.61ad41f6.js";const s={class:"app-container"},c={class:"head-container"},p={class:"head-container"},m=Vue.createTextVNode("搜索"),_=Vue.createTextVNode("重置"),f=Vue.createTextVNode("新增"),h=Vue.createTextVNode("修改"),v=Vue.createTextVNode("删除"),w={class:"dialog-footer"},C=Vue.createTextVNode("确 定"),k=Vue.createTextVNode("取 消"),x=Vue.defineComponent({name:"User"}),b=Object.assign(x,{setup(x){const b=VueRouter.useRouter(),{proxy:g}=Vue.getCurrentInstance(),{sys_normal_disable:N,sys_user_sex:y,is_admin:B}=g.useDict("sys_normal_disable","sys_user_sex","is_admin"),U=Vue.ref([]),D=Vue.ref(!1),E=Vue.ref(!0),S=Vue.ref(!0),T=Vue.ref([]),R=Vue.ref([]),$=Vue.ref(!0),q=Vue.ref(!0),F=Vue.ref(0),L=Vue.ref(""),I=Vue.ref([]),K=Vue.ref(""),P=Vue.ref(void 0),M=Vue.ref(void 0),j=Vue.ref([]),z=Vue.ref([]),O=Vue.ref([]),Y=Vue.ref({}),A=Vue.ref([{key:0,label:"用户编号",visible:!0},{key:1,label:"用户名称",visible:!0},{key:2,label:"用户昵称",visible:!0},{key:3,label:"部门",visible:!0},{key:4,label:"手机号码",visible:!0},{key:5,label:"状态",visible:!0},{key:6,label:"创建时间",visible:!0}]),Q=Vue.reactive({form:{},queryParams:{page_num:1,page_size:10,user_name:void 0,phone_num:void 0,user_status:void 0,dept_id:void 0},rules:{user_name:[{required:!0,message:"用户名称不能为空",trigger:"blur"},{min:2,max:20,message:"用户名称长度必须介于 2 和 20 之间",trigger:"blur"}],user_nickname:[{required:!0,message:"用户昵称不能为空",trigger:"blur"}],user_password:[{required:!0,message:"用户密码不能为空",trigger:"blur"},{min:5,max:32,message:"用户密码长度必须介于 5 和 32 之间",trigger:"blur"}],user_email:[{type:"email",message:"请输入正确的邮箱地址",trigger:["blur","change"]}],dept_id:[{required:!0,message:"用户部门ID不能为空",trigger:["blur","change"]}],dept_ids:[{required:!0,message:"用户部门ID列表不能为空",trigger:["blur","change"]}],sex:[{required:!0,message:"用户性别不能为空",trigger:["blur","change"]}],role_ids:[{required:!0,message:"用户角色不能为空",trigger:["blur","change"]}],role_id:[{required:!0,message:"用户激活角色不能为空",trigger:["blur","change"]}],phone_num:[{pattern:/^1[3|4|5|6|7|8|9][0-9]\d{8}$/,message:"请输入正确的手机号码",trigger:"blur"}]}}),{queryParams:G,form:X,rules:H}=Vue.toRefs(Q),J=(e,u)=>!e||-1!==u.label.indexOf(e);function W(){E.value=!0,u(g.addDateRange(G.value,I.value)).then((e=>{U.value=e.list,F.value=e.total,E.value=!1}))}function Z(e){G.value.dept_id=e.dept_id,ee()}function ee(){G.value.page_num=1,W()}function ue(){I.value=[],G.value.dept_id=void 0,g.resetForm("queryRef"),ee()}function le(e){const u=e.id?[e.id]:T.value,t=e.id?e.user_name:R.value;g.$modal.confirm('是否确认删除用户为"'+t+'"的数据项？').then((function(){return l({user_ids:u})})).then((()=>{W(),g.$modal.msgSuccess("删除成功")})).catch((()=>{}))}function te(e){T.value=e.map((e=>e.id)),R.value=e.map((e=>e.user_name)),$.value=1!=e.length,q.value=!e.length}function ae(){void 0===P.value&&e().then((e=>{P.value=e}))}function oe(){X.value={id:void 0,user_name:void 0,user_nickname:void 0,user_password:void 0,phone_num:void 0,user_email:void 0,sex:void 0,user_status:"1",is_admin:"1",remark:void 0,post_ids:[],role_ids:[],role_id:void 0,dept_ids:[],dept_id:void 0},g.resetForm("userRef")}function re(){D.value=!1,oe()}function de(){oe(),ae(),Ve(),D.value=!0,L.value="添加用户",X.value.user_password=M.value}async function ne(e){oe(),ae();const u=e.id||T.value[0],l=await o({user_id:u});X.value=l.user_info,X.value.post_ids=l.post_ids,X.value.role_ids=l.role_ids,X.value.dept_ids=l.dept_ids,Ve(),D.value=!0,L.value="修改用户",X.password=""}async function Ve(){let e={page_num:1,page_size:Number.MAX_SAFE_INTEGER};const[{list:u},{list:l},{list:t}]=await Promise.all([i(e),r(e),d(e)]);j.value=u,z.value=l,O.value=t;const a={};t.forEach((e=>{a[e.dept_id]=e.dept_name})),Y.value=a}function ie(){g.$refs.userRef.validate((e=>{X.value.dept_ids.includes(X.value.dept_id)?e&&(null!=X.value.id?n(X.value).then((e=>{g.$modal.msgSuccess("修改成功"),D.value=!1,W()})):V(X.value).then((e=>{g.$modal.msgSuccess("新增成功"),D.value=!1,W()}))):g.$modal.msgError("激活部门不在可选部门范围内，请重新选择")}))}return Vue.watch(K,(e=>{g.$refs.deptTreeRef.filter(e)})),Vue.watch((()=>X.value.role_ids),((e,u)=>{0!==e.length&&e.includes(X.value.role_id)||(X.value.role_id=void 0)})),e().then((e=>{P.value=e})),W(),(e,u)=>{const l=Vue.resolveComponent("el-input"),o=Vue.resolveComponent("el-tree"),r=Vue.resolveComponent("el-col"),d=Vue.resolveComponent("el-form-item"),n=Vue.resolveComponent("el-option"),V=Vue.resolveComponent("el-select"),i=Vue.resolveComponent("el-date-picker"),x=Vue.resolveComponent("el-button"),T=Vue.resolveComponent("el-form"),R=Vue.resolveComponent("right-toolbar"),M=Vue.resolveComponent("el-row"),Q=Vue.resolveComponent("el-table-column"),ae=Vue.resolveComponent("el-switch"),oe=Vue.resolveComponent("el-tooltip"),Ve=Vue.resolveComponent("el-table"),se=Vue.resolveComponent("pagination"),ce=Vue.resolveComponent("tree-select"),pe=Vue.resolveComponent("el-radio"),me=Vue.resolveComponent("el-radio-group"),_e=Vue.resolveComponent("el-dialog"),fe=Vue.resolveDirective("hasPermi"),he=Vue.resolveDirective("loading");return Vue.openBlock(),Vue.createElementBlock("div",s,[Vue.createVNode(M,{gutter:20},{default:Vue.withCtx((()=>[Vue.createVNode(r,{span:4,xs:24},{default:Vue.withCtx((()=>[Vue.createElementVNode("div",c,[Vue.createVNode(l,{modelValue:K.value,"onUpdate:modelValue":u[0]||(u[0]=e=>K.value=e),placeholder:"请输入部门名称",clearable:"","prefix-icon":"el-icon-search",style:{"margin-bottom":"20px"}},null,8,["modelValue"])]),Vue.createElementVNode("div",p,[Vue.createVNode(o,{data:P.value,props:{label:"dept_name",children:"children"},"expand-on-click-node":!1,"filter-node-method":J,ref:"deptTreeRef","default-expand-all":"",onNodeClick:Z},null,8,["data"])])])),_:1}),Vue.createVNode(r,{span:20,xs:24},{default:Vue.withCtx((()=>[Vue.withDirectives(Vue.createVNode(T,{model:Vue.unref(G),ref:"queryRef",inline:!0,"label-width":"68px"},{default:Vue.withCtx((()=>[Vue.createVNode(d,{label:"用户名称",prop:"user_name"},{default:Vue.withCtx((()=>[Vue.createVNode(l,{modelValue:Vue.unref(G).user_name,"onUpdate:modelValue":u[1]||(u[1]=e=>Vue.unref(G).user_name=e),placeholder:"请输入用户名称",clearable:"",style:{width:"240px"},onKeyup:Vue.withKeys(ee,["enter"])},null,8,["modelValue","onKeyup"])])),_:1}),Vue.createVNode(d,{label:"手机号码",prop:"phone_num"},{default:Vue.withCtx((()=>[Vue.createVNode(l,{modelValue:Vue.unref(G).phone_num,"onUpdate:modelValue":u[2]||(u[2]=e=>Vue.unref(G).phone_num=e),placeholder:"请输入手机号码",clearable:"",style:{width:"240px"},onKeyup:Vue.withKeys(ee,["enter"])},null,8,["modelValue","onKeyup"])])),_:1}),Vue.createVNode(d,{label:"状态",prop:"user_status"},{default:Vue.withCtx((()=>[Vue.createVNode(V,{modelValue:Vue.unref(G).user_status,"onUpdate:modelValue":u[3]||(u[3]=e=>Vue.unref(G).user_status=e),placeholder:"用户状态",clearable:"",style:{width:"240px"}},{default:Vue.withCtx((()=>[(Vue.openBlock(!0),Vue.createElementBlock(Vue.Fragment,null,Vue.renderList(Vue.unref(N),(e=>(Vue.openBlock(),Vue.createBlock(n,{key:e.value,label:e.label,value:e.value},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1}),Vue.createVNode(d,{label:"创建时间"},{default:Vue.withCtx((()=>[Vue.createVNode(i,{modelValue:I.value,"onUpdate:modelValue":u[4]||(u[4]=e=>I.value=e),style:{width:"240px"},"value-format":"YYYY-MM-DD",type:"daterange","range-separator":"-","start-placeholder":"开始日期","end-placeholder":"结束日期"},null,8,["modelValue"])])),_:1}),Vue.createVNode(d,null,{default:Vue.withCtx((()=>[Vue.createVNode(x,{type:"primary",icon:"Search",onClick:ee},{default:Vue.withCtx((()=>[m])),_:1}),Vue.createVNode(x,{icon:"Refresh",onClick:ue},{default:Vue.withCtx((()=>[_])),_:1})])),_:1})])),_:1},8,["model"]),[[Vue.vShow,S.value]]),Vue.createVNode(M,{gutter:10,class:"mb8",style:{height:"35px"}},{default:Vue.withCtx((()=>[Vue.createVNode(r,{span:1.5},{default:Vue.withCtx((()=>[Vue.withDirectives((Vue.openBlock(),Vue.createBlock(x,{type:"primary",plain:"",icon:"Plus",onClick:de},{default:Vue.withCtx((()=>[f])),_:1})),[[fe,["system/user/add"]]])])),_:1},8,["span"]),Vue.createVNode(r,{span:1.5},{default:Vue.withCtx((()=>[Vue.withDirectives((Vue.openBlock(),Vue.createBlock(x,{type:"success",plain:"",icon:"Edit",disabled:$.value,onClick:ne},{default:Vue.withCtx((()=>[h])),_:1},8,["disabled"])),[[fe,["system/user/edit"]]])])),_:1},8,["span"]),Vue.createVNode(r,{span:1.5},{default:Vue.withCtx((()=>[Vue.withDirectives((Vue.openBlock(),Vue.createBlock(x,{type:"danger",plain:"",icon:"Delete",disabled:q.value,onClick:le},{default:Vue.withCtx((()=>[v])),_:1},8,["disabled"])),[[fe,["system/user/delete"]]])])),_:1},8,["span"]),Vue.createVNode(R,{showSearch:S.value,"onUpdate:showSearch":u[5]||(u[5]=e=>S.value=e),onQueryTable:W,columns:A.value},null,8,["showSearch","columns"])])),_:1}),Vue.withDirectives((Vue.openBlock(),Vue.createBlock(Ve,{data:U.value,onSelectionChange:te},{default:Vue.withCtx((()=>[Vue.createVNode(Q,{type:"selection",width:"50",align:"center"}),A.value[0].visible?(Vue.openBlock(),Vue.createBlock(Q,{label:"用户编号",align:"center",key:"id",prop:"id",width:"100","show-overflow-tooltip":""})):Vue.createCommentVNode("",!0),A.value[1].visible?(Vue.openBlock(),Vue.createBlock(Q,{label:"用户名称",align:"center",key:"user_name",prop:"user_name","show-overflow-tooltip":!0})):Vue.createCommentVNode("",!0),A.value[2].visible?(Vue.openBlock(),Vue.createBlock(Q,{label:"用户昵称",align:"center",key:"user_nickname",prop:"user_nickname","show-overflow-tooltip":!0})):Vue.createCommentVNode("",!0),A.value[3].visible?(Vue.openBlock(),Vue.createBlock(Q,{label:"部门",align:"center",key:"dept_id",prop:"dept.dept_name","show-overflow-tooltip":!0})):Vue.createCommentVNode("",!0),A.value[4].visible?(Vue.openBlock(),Vue.createBlock(Q,{label:"手机号码",align:"center",key:"phone_num",prop:"phone_num",width:"120"})):Vue.createCommentVNode("",!0),A.value[5].visible?(Vue.openBlock(),Vue.createBlock(Q,{label:"状态",align:"center",key:"user_status"},{default:Vue.withCtx((e=>[Vue.createVNode(ae,{modelValue:e.row.user_status,"onUpdate:modelValue":u=>e.row.user_status=u,"active-value":"1","inactive-value":"0",onChange:u=>function(e){let u="1"===e.user_status?"启用":"停用";g.$modal.confirm('确认要"'+u+'""'+e.user_name+'"用户吗?').then((function(){return t(e.id,e.user_status)})).then((()=>{g.$modal.msgSuccess(u+"成功")})).catch((function(){e.user_status="0"===e.user_status?"1":"0"}))}(e.row)},null,8,["modelValue","onUpdate:modelValue","onChange"])])),_:1})):Vue.createCommentVNode("",!0),A.value[6].visible?(Vue.openBlock(),Vue.createBlock(Q,{key:6,label:"创建时间",align:"center",prop:"created_at",width:"160"},{default:Vue.withCtx((u=>[Vue.createElementVNode("span",null,Vue.toDisplayString(e.parseTime(u.row.created_at)),1)])),_:1})):Vue.createCommentVNode("",!0),Vue.withDirectives((Vue.openBlock(),Vue.createBlock(Q,{label:"操作",align:"center",width:"150","class-name":"small-padding fixed-width"},{default:Vue.withCtx((e=>[Vue.createVNode(oe,{content:"修改",placement:"top"},{default:Vue.withCtx((()=>[1!==e.row.userId?Vue.withDirectives((Vue.openBlock(),Vue.createBlock(x,{key:0,type:"text",icon:"Edit",onClick:u=>ne(e.row)},null,8,["onClick"])),[[fe,["system/user/edit"]]]):Vue.createCommentVNode("",!0)])),_:2},1024),Vue.createVNode(oe,{content:"删除",placement:"top"},{default:Vue.withCtx((()=>[1!==e.row.userId?Vue.withDirectives((Vue.openBlock(),Vue.createBlock(x,{key:0,type:"text",icon:"Delete",onClick:u=>le(e.row)},null,8,["onClick"])),[[fe,["system/user/delete"]]]):Vue.createCommentVNode("",!0)])),_:2},1024),Vue.createVNode(oe,{content:"重置密码",placement:"top"},{default:Vue.withCtx((()=>[1!==e.row.userId?Vue.withDirectives((Vue.openBlock(),Vue.createBlock(x,{key:0,type:"text",icon:"Key",onClick:u=>{return l=e.row,void g.$prompt('请输入"'+l.user_name+'"的新密码',"提示",{confirmButtonText:"确定",cancelButtonText:"取消",closeOnClickModal:!1,inputPattern:/^.{5,32}$/,inputErrorMessage:"用户密码长度必须介于 5 和 32 之间"}).then((({value:e})=>{a(l.id,e).then((u=>{g.$modal.msgSuccess("修改成功，新密码是："+e)}))})).catch((()=>{}));var l}},null,8,["onClick"])),[[fe,["system/user/reset_passwd"]]]):Vue.createCommentVNode("",!0)])),_:2},1024),Vue.createVNode(oe,{content:"分配角色",placement:"top"},{default:Vue.withCtx((()=>[1!==e.row.userId?Vue.withDirectives((Vue.openBlock(),Vue.createBlock(x,{key:0,type:"text",icon:"CircleCheck",onClick:u=>function(e){const u=e.id;b.push("/system/user-auth/role/"+u)}(e.row)},null,8,["onClick"])),[[fe,["system/user/edit"]]]):Vue.createCommentVNode("",!0)])),_:2},1024)])),_:1})),[[fe,["system/user/edit","system/user/delete","system/user/delete","system/user/reset_passwd"]]])])),_:1},8,["data"])),[[he,E.value]]),Vue.withDirectives(Vue.createVNode(se,{total:F.value,page:Vue.unref(G).page_num,"onUpdate:page":u[6]||(u[6]=e=>Vue.unref(G).page_num=e),limit:Vue.unref(G).page_size,"onUpdate:limit":u[7]||(u[7]=e=>Vue.unref(G).page_size=e),onPagination:W},null,8,["total","page","limit"]),[[Vue.vShow,F.value>0]])])),_:1})])),_:1}),Vue.createVNode(_e,{title:L.value,modelValue:D.value,"onUpdate:modelValue":u[22]||(u[22]=e=>D.value=e),width:"600px","append-to-body":""},{footer:Vue.withCtx((()=>[Vue.createElementVNode("div",w,[Vue.createVNode(x,{type:"primary",onClick:ie},{default:Vue.withCtx((()=>[C])),_:1}),Vue.createVNode(x,{onClick:re},{default:Vue.withCtx((()=>[k])),_:1})])])),default:Vue.withCtx((()=>[Vue.createVNode(T,{model:Vue.unref(X),rules:Vue.unref(H),ref:"userRef","label-width":"80px"},{default:Vue.withCtx((()=>[Vue.createVNode(M,null,{default:Vue.withCtx((()=>[Vue.createVNode(r,{span:12},{default:Vue.withCtx((()=>[null==Vue.unref(X).id?(Vue.openBlock(),Vue.createBlock(d,{key:0,label:"用户名称",prop:"user_name"},{default:Vue.withCtx((()=>[Vue.createVNode(l,{modelValue:Vue.unref(X).user_name,"onUpdate:modelValue":u[8]||(u[8]=e=>Vue.unref(X).user_name=e),placeholder:"请输入用户名称",maxlength:"30"},null,8,["modelValue"])])),_:1})):Vue.createCommentVNode("",!0)])),_:1}),Vue.createVNode(r,{span:12},{default:Vue.withCtx((()=>[null==Vue.unref(X).id?(Vue.openBlock(),Vue.createBlock(d,{key:0,label:"用户密码",prop:"user_password"},{default:Vue.withCtx((()=>[Vue.createVNode(l,{modelValue:Vue.unref(X).user_password,"onUpdate:modelValue":u[9]||(u[9]=e=>Vue.unref(X).user_password=e),placeholder:"请输入用户密码",type:"password",maxlength:"32","show-password":""},null,8,["modelValue"])])),_:1})):Vue.createCommentVNode("",!0)])),_:1})])),_:1}),Vue.createVNode(M,null,{default:Vue.withCtx((()=>[Vue.createVNode(r,{span:12},{default:Vue.withCtx((()=>[Vue.createVNode(d,{label:"用户昵称",prop:"user_nickname"},{default:Vue.withCtx((()=>[Vue.createVNode(l,{modelValue:Vue.unref(X).user_nickname,"onUpdate:modelValue":u[10]||(u[10]=e=>Vue.unref(X).user_nickname=e),placeholder:"请输入用户昵称",maxlength:"30"},null,8,["modelValue"])])),_:1})])),_:1}),Vue.createVNode(r,{span:12},{default:Vue.withCtx((()=>[Vue.createVNode(d,{label:"用户性别",prop:"sex"},{default:Vue.withCtx((()=>[Vue.createVNode(V,{modelValue:Vue.unref(X).sex,"onUpdate:modelValue":u[11]||(u[11]=e=>Vue.unref(X).sex=e),placeholder:"请选择用户性别"},{default:Vue.withCtx((()=>[(Vue.openBlock(!0),Vue.createElementBlock(Vue.Fragment,null,Vue.renderList(Vue.unref(y),(e=>(Vue.openBlock(),Vue.createBlock(n,{key:e.value,label:e.label,value:e.value},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1})])),_:1})])),_:1}),Vue.createVNode(M,null,{default:Vue.withCtx((()=>[Vue.createVNode(r,{span:12},{default:Vue.withCtx((()=>[Vue.createVNode(d,{label:"用户部门",prop:"dept_ids"},{default:Vue.withCtx((()=>[Vue.createVNode(V,{modelValue:Vue.unref(X).dept_ids,"onUpdate:modelValue":u[12]||(u[12]=e=>Vue.unref(X).dept_ids=e),multiple:"","collapse-tags":"",placeholder:"请选择用户部门"},{default:Vue.withCtx((()=>[(Vue.openBlock(!0),Vue.createElementBlock(Vue.Fragment,null,Vue.renderList(O.value,(e=>(Vue.openBlock(),Vue.createBlock(n,{key:e.dept_id,label:("0"!=e.parent_id?Y.value[e.parent_id]+"-":"")+e.dept_name,value:e.dept_id,disabled:"0"==e.status},null,8,["label","value","disabled"])))),128))])),_:1},8,["modelValue"])])),_:1})])),_:1}),Vue.createVNode(r,{span:12},{default:Vue.withCtx((()=>[Vue.createVNode(d,{label:"激活部门",prop:"dept_id"},{default:Vue.withCtx((()=>[Vue.createVNode(ce,{value:Vue.unref(X).dept_id,"onUpdate:value":u[13]||(u[13]=e=>Vue.unref(X).dept_id=e),options:P.value,placeholder:"请选择激活归属部门",objMap:{value:"dept_id",label:"dept_name",children:"children"}},null,8,["value","options"])])),_:1})])),_:1})])),_:1}),Vue.createVNode(M,null,{default:Vue.withCtx((()=>[Vue.createVNode(r,{span:12},{default:Vue.withCtx((()=>[Vue.createVNode(d,{label:"用户角色",prop:"role_ids"},{default:Vue.withCtx((()=>[Vue.createVNode(V,{modelValue:Vue.unref(X).role_ids,"onUpdate:modelValue":u[14]||(u[14]=e=>Vue.unref(X).role_ids=e),multiple:"","collapse-tags":"",placeholder:"请选择用户角色"},{default:Vue.withCtx((()=>[(Vue.openBlock(!0),Vue.createElementBlock(Vue.Fragment,null,Vue.renderList(z.value,(e=>(Vue.openBlock(),Vue.createBlock(n,{key:e.role_id,label:e.role_name,value:e.role_id,disabled:"0"==e.status},null,8,["label","value","disabled"])))),128))])),_:1},8,["modelValue"])])),_:1})])),_:1}),Vue.createVNode(r,{span:12},{default:Vue.withCtx((()=>[Vue.createVNode(d,{label:"激活角色",prop:"role_id"},{default:Vue.withCtx((()=>[Vue.createVNode(V,{modelValue:Vue.unref(X).role_id,"onUpdate:modelValue":u[15]||(u[15]=e=>Vue.unref(X).role_id=e),placeholder:"请选择激活角色"},{default:Vue.withCtx((()=>[(Vue.openBlock(!0),Vue.createElementBlock(Vue.Fragment,null,Vue.renderList(z.value,(e=>(Vue.openBlock(),Vue.createBlock(n,{key:e.role_id,label:e.role_name,value:e.role_id,disabled:!Vue.unref(X).role_ids.includes(e.role_id)},null,8,["label","value","disabled"])))),128))])),_:1},8,["modelValue"])])),_:1})])),_:1})])),_:1}),Vue.createVNode(M,null,{default:Vue.withCtx((()=>[Vue.createVNode(r,{span:12},{default:Vue.withCtx((()=>[Vue.createVNode(d,{label:"手机号码",prop:"phone_num"},{default:Vue.withCtx((()=>[Vue.createVNode(l,{modelValue:Vue.unref(X).phone_num,"onUpdate:modelValue":u[16]||(u[16]=e=>Vue.unref(X).phone_num=e),placeholder:"请输入手机号码",maxlength:"11"},null,8,["modelValue"])])),_:1})])),_:1}),Vue.createVNode(r,{span:12},{default:Vue.withCtx((()=>[Vue.createVNode(d,{label:"用户邮箱",prop:"email"},{default:Vue.withCtx((()=>[Vue.createVNode(l,{modelValue:Vue.unref(X).user_email,"onUpdate:modelValue":u[17]||(u[17]=e=>Vue.unref(X).user_email=e),placeholder:"请输入邮箱",maxlength:"50"},null,8,["modelValue"])])),_:1})])),_:1})])),_:1}),Vue.createVNode(M,null,{default:Vue.withCtx((()=>[Vue.createVNode(r,{span:12},{default:Vue.withCtx((()=>[Vue.createVNode(d,{label:"用户岗位",prop:"post_ids"},{default:Vue.withCtx((()=>[Vue.createVNode(V,{modelValue:Vue.unref(X).post_ids,"onUpdate:modelValue":u[18]||(u[18]=e=>Vue.unref(X).post_ids=e),multiple:"","collapse-tags":"",placeholder:"请选择用户岗位"},{default:Vue.withCtx((()=>[(Vue.openBlock(!0),Vue.createElementBlock(Vue.Fragment,null,Vue.renderList(j.value,(e=>(Vue.openBlock(),Vue.createBlock(n,{key:e.post_id,label:e.post_name,value:e.post_id,disabled:"0"==e.status},null,8,["label","value","disabled"])))),128))])),_:1},8,["modelValue"])])),_:1})])),_:1})])),_:1}),Vue.createVNode(M,null,{default:Vue.withCtx((()=>[Vue.createVNode(r,{span:12},{default:Vue.withCtx((()=>[Vue.createVNode(d,{label:"后台用户"},{default:Vue.withCtx((()=>[Vue.createVNode(me,{modelValue:Vue.unref(X).is_admin,"onUpdate:modelValue":u[19]||(u[19]=e=>Vue.unref(X).is_admin=e)},{default:Vue.withCtx((()=>[(Vue.openBlock(!0),Vue.createElementBlock(Vue.Fragment,null,Vue.renderList(Vue.unref(B),(e=>(Vue.openBlock(),Vue.createBlock(pe,{key:e.value,label:e.value},{default:Vue.withCtx((()=>[Vue.createTextVNode(Vue.toDisplayString(e.label),1)])),_:2},1032,["label"])))),128))])),_:1},8,["modelValue"])])),_:1})])),_:1}),Vue.createVNode(r,{span:12},{default:Vue.withCtx((()=>[Vue.createVNode(d,{label:"用户状态"},{default:Vue.withCtx((()=>[Vue.createVNode(me,{modelValue:Vue.unref(X).user_status,"onUpdate:modelValue":u[20]||(u[20]=e=>Vue.unref(X).user_status=e)},{default:Vue.withCtx((()=>[(Vue.openBlock(!0),Vue.createElementBlock(Vue.Fragment,null,Vue.renderList(Vue.unref(N),(e=>(Vue.openBlock(),Vue.createBlock(pe,{key:e.value,label:e.value},{default:Vue.withCtx((()=>[Vue.createTextVNode(Vue.toDisplayString(e.label),1)])),_:2},1032,["label"])))),128))])),_:1},8,["modelValue"])])),_:1})])),_:1})])),_:1}),Vue.createVNode(M,null,{default:Vue.withCtx((()=>[Vue.createVNode(r,{span:24},{default:Vue.withCtx((()=>[Vue.createVNode(d,{label:"备注"},{default:Vue.withCtx((()=>[Vue.createVNode(l,{modelValue:Vue.unref(X).remark,"onUpdate:modelValue":u[21]||(u[21]=e=>Vue.unref(X).remark=e),type:"textarea",placeholder:"请输入内容"},null,8,["modelValue"])])),_:1})])),_:1})])),_:1})])),_:1},8,["model","rules"])])),_:1},8,["title","modelValue"])])}}});export{b as default};