import{B as e,l as t,C as l,D as u,E as a,F as o,G as r,H as n,I as V,J as d,K as i}from"./index.5d61a7e0.js";import{t as c}from"./menu.c12ec602.js";function s(t){if(t&&t instanceof Array&&t.length>0){const l=e.getters&&e.getters.permissions,u=t,a="*:*:*";return!!l.some((e=>a===e||u.includes(e)))}return!1}const m={class:"app-container"},p=Vue.createTextVNode("搜索"),f=Vue.createTextVNode("重置"),h=Vue.createTextVNode("新增"),v=Vue.createTextVNode("修改"),_=Vue.createTextVNode("删除"),C=Vue.createTextVNode("导出"),w=Vue.createTextVNode(' v-model:showSearch="showSearch" @queryTable="getList" >'),y=Vue.createTextVNode(" 权限字符 "),x=Vue.createTextVNode("展开/折叠"),k=Vue.createTextVNode("全选/全不选"),N=Vue.createTextVNode("父子联动"),g={class:"dialog-footer"},b=Vue.createTextVNode("确 定"),B=Vue.createTextVNode("取 消"),D=Vue.createTextVNode("展开/折叠"),S=Vue.createTextVNode("全选/全不选"),U=Vue.createTextVNode("父子联动"),T={class:"dialog-footer"},K=Vue.createTextVNode("确 定"),R=Vue.createTextVNode("取 消"),E=Vue.defineComponent({name:"Role"}),$=Object.assign(E,{setup(e){const E=VueRouter.useRouter(),{proxy:$}=Vue.getCurrentInstance(),{sys_normal_disable:q}=$.useDict("sys_normal_disable"),F=Vue.ref([]),P=Vue.ref(!1),z=Vue.ref(!0),L=Vue.ref(!0),M=Vue.ref([]),Y=Vue.ref([]),j=Vue.ref(!0),H=Vue.ref(!0),A=Vue.ref(0),I=Vue.ref(""),G=Vue.ref([]),J=Vue.ref([]),O=Vue.ref(!1),Q=Vue.ref(!1),W=Vue.ref(!0),X=Vue.ref(!1),Z=Vue.ref([]),ee=Vue.ref(!1),te=Vue.ref(null),le=Vue.ref(null),ue=Vue.ref([{value:"1",label:"全部数据权限"},{value:"2",label:"自定数据权限"},{value:"3",label:"本部门数据权限"},{value:"4",label:"本部门及以下数据权限"},{value:"5",label:"仅本人数据权限"}]),ae=Vue.reactive({form:{},queryParams:{page_num:1,page_size:10,role_name:void 0,role_key:void 0,status:void 0},rules:{role_name:[{required:!0,message:"角色名称不能为空",trigger:"blur"}],role_key:[{required:!0,message:"权限字符不能为空",trigger:"blur"}],list_order:[{required:!0,message:"角色顺序不能为空",trigger:"blur"}]}}),{queryParams:oe,form:re,rules:ne}=Vue.toRefs(ae),Ve=async()=>{z.value=!0;const e=await t($.addDateRange(oe.value,G.value));F.value=e.list,A.value=e.total,z.value=!1};function de(){oe.value.page_num=1,Ve()}function ie(){G.value=[],$.resetForm("queryRef"),de()}function ce(e){const t=e.role_id?[e.role_id]:M.value,u=e.role_id?e.role_name:Y.value;$.$modal.confirm('是否确认删除角色编号为"'+u+'"的数据项?').then((function(){return l({role_ids:t})})).then((()=>{Ve(),$.$modal.msgSuccess("删除成功")})).catch((()=>{}))}function se(){$.download("system/role/export",{...oe.value},`role_${(new Date).getTime()}.xlsx`)}function me(e){M.value=e.map((e=>e.role_id)),Y.value=e.map((e=>e.role_name)),j.value=1!=e.length,H.value=!e.length}async function pe(){J.value=await c()}function fe(){null!=te.value&&te.value.setCheckedKeys([]),O.value=!1,Q.value=!1,W.value=!0,X.value=!1,re.value={role_id:void 0,role_name:void 0,role_key:void 0,list_order:0,status:"1",menu_ids:[],dept_ids:[],menuCheckStrictly:!0,deptCheckStrictly:!1,remark:void 0},$.resetForm("roleRef")}async function he(){fe(),await pe(),P.value=!0,I.value="添加角色"}async function ve(e){fe();const t=e.role_id||M.value[0];await pe();const l=await a({role_id:t}),u=await o({role_id:t});re.value=u,re.value.menuCheckStrictly=!0,re.value.list_order=Number(re.value.list_order),P.value=!0,l.forEach((e=>{Vue.nextTick((()=>{te.value.setChecked(e,!0,!1)}))})),I.value="修改角色"}function _e(e,t){if("menu"==t){let t=J.value;for(let l=0;l<t.length;l++)te.value.store.nodesMap[t[l].id].expanded=e}else if("dept"==t){let t=Z.value;for(let l=0;l<t.length;l++)le.value.store.nodesMap[t[l].id].expanded=e}}function Ce(e,t){"menu"==t?te.value.setCheckedNodes(e?J.value:[]):"dept"==t&&le.value.setCheckedNodes(e?Z.value:[])}function we(e,t){"menu"==t?re.value.menuCheckStrictly=!!e:"dept"==t&&(re.value.deptCheckStrictly=!!e)}function ye(){let e=te.value.getCheckedKeys(),t=te.value.getHalfCheckedKeys();return e.unshift.apply(e,t),e}async function xe(){$.$refs.roleRef.validate((async e=>{e&&(null!=re.value.role_id?(re.value.menu_ids=ye(),await r(re.value),$.$modal.msgSuccess("修改成功"),P.value=!1,Ve()):(re.value.menu_ids=ye(),await n(re.value),$.$modal.msgSuccess("新增成功"),P.value=!1,Ve()))}))}function ke(){P.value=!1,fe()}function Ne(e){"2"!==e&&le.value.setCheckedKeys([])}async function ge(e){fe();const t=e.role_id;await(async()=>{Z.value=await i()})();const l=await V({role_id:t}),u=await o({role_id:t});re.value=u,re.value.deptCheckStrictly=!1,ee.value=!0,Vue.nextTick((()=>{le.value&&le.value.setCheckedKeys(l)})),I.value="分配数据权限"}async function be(){null!=re.value.role_id&&(re.value.dept_ids=function(){let e=le.value.getCheckedKeys(),t=le.value.getHalfCheckedKeys();return e.unshift.apply(e,t),e}(),await d(re.value),$.$modal.msgSuccess("修改成功"),ee.value=!1,Ve())}function Be(){ee.value=!1,fe()}return Ve(),(e,t)=>{const l=Vue.resolveComponent("el-input"),a=Vue.resolveComponent("el-form-item"),o=Vue.resolveComponent("el-option"),r=Vue.resolveComponent("el-select"),n=Vue.resolveComponent("el-date-picker"),V=Vue.resolveComponent("el-button"),d=Vue.resolveComponent("el-form"),i=Vue.resolveComponent("el-col"),c=Vue.resolveComponent("right-toolbar"),M=Vue.resolveComponent("el-row"),Y=Vue.resolveComponent("el-table-column"),ae=Vue.resolveComponent("el-switch"),pe=Vue.resolveComponent("el-tooltip"),fe=Vue.resolveComponent("el-table"),ye=Vue.resolveComponent("pagination"),De=Vue.resolveComponent("info-filled"),Se=Vue.resolveComponent("el-icon"),Ue=Vue.resolveComponent("el-input-number"),Te=Vue.resolveComponent("el-radio"),Ke=Vue.resolveComponent("el-radio-group"),Re=Vue.resolveComponent("el-checkbox"),Ee=Vue.resolveComponent("el-tree"),$e=Vue.resolveComponent("el-dialog"),qe=Vue.resolveDirective("hasPermi"),Fe=Vue.resolveDirective("loading");return Vue.openBlock(),Vue.createElementBlock("div",m,[Vue.withDirectives(Vue.createVNode(d,{model:Vue.unref(oe),ref:"queryRef",inline:!0},{default:Vue.withCtx((()=>[Vue.createVNode(a,{label:"角色名称",prop:"role_name"},{default:Vue.withCtx((()=>[Vue.createVNode(l,{modelValue:Vue.unref(oe).role_name,"onUpdate:modelValue":t[0]||(t[0]=e=>Vue.unref(oe).role_name=e),placeholder:"请输入角色名称",clearable:"",style:{width:"240px"},onKeyup:Vue.withKeys(de,["enter"])},null,8,["modelValue","onKeyup"])])),_:1}),Vue.createVNode(a,{label:"权限字符",prop:"role_key"},{default:Vue.withCtx((()=>[Vue.createVNode(l,{modelValue:Vue.unref(oe).role_key,"onUpdate:modelValue":t[1]||(t[1]=e=>Vue.unref(oe).role_key=e),placeholder:"请输入权限字符",clearable:"",style:{width:"240px"},onKeyup:Vue.withKeys(de,["enter"])},null,8,["modelValue","onKeyup"])])),_:1}),Vue.createVNode(a,{label:"状态",prop:"status"},{default:Vue.withCtx((()=>[Vue.createVNode(r,{modelValue:Vue.unref(oe).status,"onUpdate:modelValue":t[2]||(t[2]=e=>Vue.unref(oe).status=e),placeholder:"角色状态",clearable:"",style:{width:"240px"}},{default:Vue.withCtx((()=>[(Vue.openBlock(!0),Vue.createElementBlock(Vue.Fragment,null,Vue.renderList(Vue.unref(q),(e=>(Vue.openBlock(),Vue.createBlock(o,{key:e.value,label:e.label,value:e.value},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1}),Vue.createVNode(a,{label:"创建时间"},{default:Vue.withCtx((()=>[Vue.createVNode(n,{modelValue:G.value,"onUpdate:modelValue":t[3]||(t[3]=e=>G.value=e),style:{width:"240px"},"value-format":"YYYY-MM-DD",type:"daterange","range-separator":"-","start-placeholder":"开始日期","end-placeholder":"结束日期"},null,8,["modelValue"])])),_:1}),Vue.createVNode(a,null,{default:Vue.withCtx((()=>[Vue.createVNode(V,{type:"primary",icon:"Search",onClick:de},{default:Vue.withCtx((()=>[p])),_:1}),Vue.createVNode(V,{icon:"Refresh",onClick:ie},{default:Vue.withCtx((()=>[f])),_:1})])),_:1})])),_:1},8,["model"]),[[Vue.vShow,L.value]]),Vue.createVNode(M,{gutter:10,class:"mb8",style:{height:"35px"}},{default:Vue.withCtx((()=>[Vue.createVNode(i,{span:1.5},{default:Vue.withCtx((()=>[Vue.withDirectives((Vue.openBlock(),Vue.createBlock(V,{type:"primary",plain:"",icon:"Plus",onClick:he},{default:Vue.withCtx((()=>[h])),_:1})),[[qe,["system/role/add"]]])])),_:1},8,["span"]),Vue.createVNode(i,{span:1.5},{default:Vue.withCtx((()=>[Vue.withDirectives((Vue.openBlock(),Vue.createBlock(V,{type:"success",plain:"",icon:"Edit",disabled:j.value,onClick:ve},{default:Vue.withCtx((()=>[v])),_:1},8,["disabled"])),[[qe,["system/role/edit"]]])])),_:1},8,["span"]),Vue.createVNode(i,{span:1.5},{default:Vue.withCtx((()=>[Vue.withDirectives((Vue.openBlock(),Vue.createBlock(V,{type:"danger",plain:"",icon:"Delete",disabled:H.value,onClick:ce},{default:Vue.withCtx((()=>[_])),_:1},8,["disabled"])),[[qe,["system/role/delete"]]])])),_:1},8,["span"]),Vue.createVNode(i,{span:1.5},{default:Vue.withCtx((()=>[Vue.withDirectives((Vue.openBlock(),Vue.createBlock(V,{type:"warning",plain:"",icon:"Download",onClick:se},{default:Vue.withCtx((()=>[C])),_:1})),[[qe,["system/role/export"]]])])),_:1},8,["span"]),Vue.createVNode(c,null,{default:Vue.withCtx((()=>[w])),_:1})])),_:1}),Vue.withDirectives((Vue.openBlock(),Vue.createBlock(fe,{data:F.value,onSelectionChange:me},{default:Vue.withCtx((()=>[Vue.createVNode(Y,{type:"selection",width:"55",align:"center"}),Vue.createVNode(Y,{label:"角色编号",prop:"role_id",width:"120","show-overflow-tooltip":""}),Vue.createVNode(Y,{label:"角色名称",prop:"role_name","show-overflow-tooltip":!0,width:"150"}),Vue.createVNode(Y,{label:"权限字符",prop:"role_key","show-overflow-tooltip":!0,width:"150"}),Vue.createVNode(Y,{label:"显示顺序",prop:"list_order",width:"100"}),Vue.createVNode(Y,{label:"状态",align:"center",width:"100"},{default:Vue.withCtx((e=>[Vue.createVNode(ae,{modelValue:e.row.status,"onUpdate:modelValue":t=>e.row.status=t,"active-value":"1","inactive-value":"0",onChange:t=>function(e){let t="1"===e.status?"启用":"停用";$.$modal.confirm('确认要"'+t+'""'+e.role_name+'"角色吗?').then((function(){return u(e.role_id,e.status)})).then((()=>{$.$modal.msgSuccess(t+"成功")})).catch((function(){e.status="0"===e.status?"1":"0"}))}(e.row),disabled:!Vue.unref(s)(["system/role/change_status"])},null,8,["modelValue","onUpdate:modelValue","onChange","disabled"])])),_:1}),Vue.createVNode(Y,{label:"创建时间",align:"center",prop:"created_at",width:"160"},{default:Vue.withCtx((t=>[Vue.createElementVNode("span",null,Vue.toDisplayString(e.parseTime(t.row.created_at)),1)])),_:1}),Vue.withDirectives((Vue.openBlock(),Vue.createBlock(Y,{label:"操作",align:"center","class-name":"small-padding fixed-width"},{default:Vue.withCtx((e=>[Vue.createVNode(pe,{content:"修改",placement:"top"},{default:Vue.withCtx((()=>[1!==e.row.role_id?Vue.withDirectives((Vue.openBlock(),Vue.createBlock(V,{key:0,type:"text",icon:"Edit",onClick:t=>ve(e.row)},null,8,["onClick"])),[[qe,["system/role/edit"]]]):Vue.createCommentVNode("",!0)])),_:2},1024),Vue.createVNode(pe,{content:"删除",placement:"top"},{default:Vue.withCtx((()=>[1!==e.row.role_id?Vue.withDirectives((Vue.openBlock(),Vue.createBlock(V,{key:0,type:"text",icon:"Delete",onClick:t=>ce(e.row)},null,8,["onClick"])),[[qe,["system/role/delete"]]]):Vue.createCommentVNode("",!0)])),_:2},1024),Vue.createVNode(pe,{content:"数据权限",placement:"top"},{default:Vue.withCtx((()=>[Vue.withDirectives(Vue.createVNode(V,{type:"text",icon:"CircleCheck",onClick:t=>ge(e.row)},null,8,["onClick"]),[[qe,["system/role/set_data_scope"]]])])),_:2},1024),Vue.createVNode(pe,{content:"分配用户",placement:"top"},{default:Vue.withCtx((()=>[1!==e.row.role_id?Vue.withDirectives((Vue.openBlock(),Vue.createBlock(V,{key:0,type:"text",icon:"User",onClick:t=>{return l=e.row,void E.push("/system/role-auth/user/"+l.role_id);var l}},null,8,["onClick"])),[[qe,["system/role/add_auth_user","system/role/cancel_auth_user"]]]):Vue.createCommentVNode("",!0)])),_:2},1024)])),_:1})),[[qe,["system/role/edit","system/role/delete","system/role/set_data_scope"]]])])),_:1},8,["data"])),[[Fe,z.value]]),Vue.withDirectives(Vue.createVNode(ye,{total:A.value,page:Vue.unref(oe).page_num,"onUpdate:page":t[4]||(t[4]=e=>Vue.unref(oe).page_num=e),limit:Vue.unref(oe).page_size,"onUpdate:limit":t[5]||(t[5]=e=>Vue.unref(oe).page_size=e),onPagination:Ve},null,8,["total","page","limit"]),[[Vue.vShow,A.value>0]]),Vue.createVNode($e,{title:I.value,modelValue:P.value,"onUpdate:modelValue":t[17]||(t[17]=e=>P.value=e),width:"500px","append-to-body":""},{footer:Vue.withCtx((()=>[Vue.createElementVNode("div",g,[Vue.createVNode(V,{type:"primary",onClick:xe},{default:Vue.withCtx((()=>[b])),_:1}),Vue.createVNode(V,{onClick:ke},{default:Vue.withCtx((()=>[B])),_:1})])])),default:Vue.withCtx((()=>[Vue.createVNode(d,{ref:"roleRef",model:Vue.unref(re),rules:Vue.unref(ne),"label-width":"100px"},{default:Vue.withCtx((()=>[Vue.createVNode(a,{label:"角色名称",prop:"role_name"},{default:Vue.withCtx((()=>[Vue.createVNode(l,{modelValue:Vue.unref(re).role_name,"onUpdate:modelValue":t[6]||(t[6]=e=>Vue.unref(re).role_name=e),placeholder:"请输入角色名称"},null,8,["modelValue"])])),_:1}),Vue.createVNode(a,{prop:"role_key"},{label:Vue.withCtx((()=>[Vue.createElementVNode("span",null,[Vue.createVNode(pe,{content:"控制器中定义的权限字符，如：@PreAuthorize(`@ss.hasRole('admin')`)",placement:"top"},{default:Vue.withCtx((()=>[Vue.createVNode(Se,null,{default:Vue.withCtx((()=>[Vue.createVNode(De)])),_:1})])),_:1}),y])])),default:Vue.withCtx((()=>[Vue.createVNode(l,{modelValue:Vue.unref(re).role_key,"onUpdate:modelValue":t[7]||(t[7]=e=>Vue.unref(re).role_key=e),placeholder:"请输入权限字符"},null,8,["modelValue"])])),_:1}),Vue.createVNode(a,{label:"角色顺序",prop:"list_order"},{default:Vue.withCtx((()=>[Vue.createVNode(Ue,{modelValue:Vue.unref(re).list_order,"onUpdate:modelValue":t[8]||(t[8]=e=>Vue.unref(re).list_order=e),"controls-position":"right",min:0},null,8,["modelValue"])])),_:1}),Vue.createVNode(a,{label:"状态"},{default:Vue.withCtx((()=>[Vue.createVNode(Ke,{modelValue:Vue.unref(re).status,"onUpdate:modelValue":t[9]||(t[9]=e=>Vue.unref(re).status=e)},{default:Vue.withCtx((()=>[(Vue.openBlock(!0),Vue.createElementBlock(Vue.Fragment,null,Vue.renderList(Vue.unref(q),(e=>(Vue.openBlock(),Vue.createBlock(Te,{key:e.value,label:e.value},{default:Vue.withCtx((()=>[Vue.createTextVNode(Vue.toDisplayString(e.label),1)])),_:2},1032,["label"])))),128))])),_:1},8,["modelValue"])])),_:1}),Vue.createVNode(a,{label:"菜单权限"},{default:Vue.withCtx((()=>[Vue.createVNode(Re,{modelValue:O.value,"onUpdate:modelValue":t[10]||(t[10]=e=>O.value=e),onChange:t[11]||(t[11]=e=>_e(e,"menu"))},{default:Vue.withCtx((()=>[x])),_:1},8,["modelValue"]),Vue.createVNode(Re,{modelValue:Q.value,"onUpdate:modelValue":t[12]||(t[12]=e=>Q.value=e),onChange:t[13]||(t[13]=e=>Ce(e,"menu"))},{default:Vue.withCtx((()=>[k])),_:1},8,["modelValue"]),Vue.createVNode(Re,{modelValue:Vue.unref(re).menuCheckStrictly,"onUpdate:modelValue":t[14]||(t[14]=e=>Vue.unref(re).menuCheckStrictly=e),onChange:t[15]||(t[15]=e=>we(e,"menu"))},{default:Vue.withCtx((()=>[N])),_:1},8,["modelValue"]),Vue.createVNode(Ee,{class:"tree-border",data:J.value,"show-checkbox":"",ref_key:"menuRef",ref:te,"node-key":"id","check-strictly":!Vue.unref(re).menuCheckStrictly,"empty-text":"加载中，请稍候",props:{label:"menu_name",children:"children"}},null,8,["data","check-strictly"])])),_:1}),Vue.createVNode(a,{label:"备注"},{default:Vue.withCtx((()=>[Vue.createVNode(l,{modelValue:Vue.unref(re).remark,"onUpdate:modelValue":t[16]||(t[16]=e=>Vue.unref(re).remark=e),type:"textarea",placeholder:"请输入内容"},null,8,["modelValue"])])),_:1})])),_:1},8,["model","rules"])])),_:1},8,["title","modelValue"]),Vue.createVNode($e,{title:I.value,modelValue:ee.value,"onUpdate:modelValue":t[27]||(t[27]=e=>ee.value=e),width:"500px","append-to-body":""},{footer:Vue.withCtx((()=>[Vue.createElementVNode("div",T,[Vue.createVNode(V,{type:"primary",onClick:be},{default:Vue.withCtx((()=>[K])),_:1}),Vue.createVNode(V,{onClick:Be},{default:Vue.withCtx((()=>[R])),_:1})])])),default:Vue.withCtx((()=>[Vue.createVNode(d,{model:Vue.unref(re),"label-width":"80px"},{default:Vue.withCtx((()=>[Vue.createVNode(a,{label:"角色名称"},{default:Vue.withCtx((()=>[Vue.createVNode(l,{modelValue:Vue.unref(re).role_name,"onUpdate:modelValue":t[18]||(t[18]=e=>Vue.unref(re).role_name=e),disabled:!0},null,8,["modelValue"])])),_:1}),Vue.createVNode(a,{label:"权限字符"},{default:Vue.withCtx((()=>[Vue.createVNode(l,{modelValue:Vue.unref(re).role_key,"onUpdate:modelValue":t[19]||(t[19]=e=>Vue.unref(re).role_key=e),disabled:!0},null,8,["modelValue"])])),_:1}),Vue.createVNode(a,{label:"权限范围"},{default:Vue.withCtx((()=>[Vue.createVNode(r,{modelValue:Vue.unref(re).data_scope,"onUpdate:modelValue":t[20]||(t[20]=e=>Vue.unref(re).data_scope=e),onChange:Ne},{default:Vue.withCtx((()=>[(Vue.openBlock(!0),Vue.createElementBlock(Vue.Fragment,null,Vue.renderList(ue.value,(e=>(Vue.openBlock(),Vue.createBlock(o,{key:e.value,label:e.label,value:e.value},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1}),Vue.withDirectives(Vue.createVNode(a,{label:"数据权限"},{default:Vue.withCtx((()=>[Vue.createVNode(Re,{modelValue:W.value,"onUpdate:modelValue":t[21]||(t[21]=e=>W.value=e),onChange:t[22]||(t[22]=e=>_e(e,"dept"))},{default:Vue.withCtx((()=>[D])),_:1},8,["modelValue"]),Vue.createVNode(Re,{modelValue:X.value,"onUpdate:modelValue":t[23]||(t[23]=e=>X.value=e),onChange:t[24]||(t[24]=e=>Ce(e,"dept"))},{default:Vue.withCtx((()=>[S])),_:1},8,["modelValue"]),Vue.createVNode(Re,{modelValue:Vue.unref(re).deptCheckStrictly,"onUpdate:modelValue":t[25]||(t[25]=e=>Vue.unref(re).deptCheckStrictly=e),disabled:"",onChange:t[26]||(t[26]=e=>we(e,"dept"))},{default:Vue.withCtx((()=>[U])),_:1},8,["modelValue"]),Vue.createVNode(Ee,{class:"tree-border",data:Z.value,"show-checkbox":"","default-expand-all":"",ref_key:"deptRef",ref:le,"node-key":"dept_id","check-strictly":!Vue.unref(re).deptCheckStrictly,"empty-text":"加载中，请稍候",props:{label:"dept_name",children:"children"}},null,8,["data","check-strictly"])])),_:1},512),[[Vue.vShow,2==Vue.unref(re).data_scope]])])),_:1},8,["model"])])),_:1},8,["title","modelValue"])])}}});export{$ as default};
