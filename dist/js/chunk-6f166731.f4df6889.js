(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6f166731"],{"822c":function(a,e,t){},a1ad:function(a,e,t){"use strict";t.r(e);var r=function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("div",{staticClass:"table-page-search-wrapper"},[t("a-form",{attrs:{layout:"inline"}},[t("a-row",{attrs:{gutter:48}},[t("a-col",{attrs:{md:8,sm:24}},[t("a-form-item",{attrs:{label:"名称"}},[t("a-input",{attrs:{placeholder:""},model:{value:a.queryParam.id,callback:function(e){a.$set(a.queryParam,"id",e)},expression:"queryParam.id"}})],1)],1),t("a-col",{attrs:{md:8,sm:24}},[t("a-form-item",{attrs:{label:"成员"}},[t("a-input",{attrs:{placeholder:""},model:{value:a.queryParam.id,callback:function(e){a.$set(a.queryParam,"id",e)},expression:"queryParam.id"}})],1)],1),a.advanced?[t("a-col",{attrs:{md:8,sm:24}},[t("a-form-item",{attrs:{label:"调用次数"}},[t("a-input-number",{staticStyle:{width:"100%"},model:{value:a.queryParam.callNo,callback:function(e){a.$set(a.queryParam,"callNo",e)},expression:"queryParam.callNo"}})],1)],1),t("a-col",{attrs:{md:8,sm:24}},[t("a-form-item",{attrs:{label:"更新日期"}})],1),t("a-col",{attrs:{md:8,sm:24}},[t("a-form-item",{attrs:{label:"使用状态"}})],1),t("a-col",{attrs:{md:8,sm:24}},[t("a-form-item",{attrs:{label:"使用状态"}})],1)]:a._e(),t("a-col",{attrs:{md:a.advanced?24:8,sm:24}},[t("span",{staticClass:"table-page-search-submitButtons",style:a.advanced&&{float:"right",overflow:"hidden"}||{}},[t("a-button",{attrs:{type:"primary"},on:{click:function(e){return a.$refs.table.refresh(!0)}}},[a._v("查询")]),t("a-button",{staticStyle:{"margin-left":"8px"},on:{click:function(){return a.queryParam={}}}},[a._v("重置")]),t("a",{staticStyle:{"margin-left":"8px"},on:{click:a.toggleAdvanced}},[a._v("\n            "+a._s(a.advanced?"收起":"展开")+"\n            "),t("a-icon",{attrs:{type:a.advanced?"up":"down"}})],1)],1)])],2)],1),t("groups-table",[t("router-view")],1)],1)},o=[],l=function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("div",[a._t("default",[t("a-button",{staticClass:"editable-add-btn",attrs:{type:"primary"},on:{click:a.handleAdd}},[t("a-icon",{attrs:{type:"plus"}}),a._v("新增")],1),t("a-table",{attrs:{dataSource:a.dataSource,columns:a.columns,pagination:a.pagination},scopedSlots:a._u([{key:"groupLogo",fn:function(a){return t("span",{},[t("img",{staticStyle:{width:"20px"},attrs:{src:a,alt:"LOGO",srcset:""}})])}},{key:"members",fn:function(e,r){return t("span",{},[t("router-link",{attrs:{to:{name:"groupMember",query:{id:r.id}}}},[a._v(a._s(e)+"[点击查看]")])],1)}},{key:"dataStatus",fn:function(e){return[t("a-tag",{attrs:{color:"blue"}},1===e?[a._v("报名")]:2===e?[a._v("在期")]:[a._v("结束")])]}},{key:"operation",fn:function(e){return[t("div",{on:{click:function(t){return a.editGroup(e)}}},[t("a",{attrs:{href:"javascript:;"}},[a._v("编辑")])])]}}])},[t("span",{attrs:{slot:"Logo"},slot:"Logo"},[t("a-icon",{attrs:{type:"smile-o"}}),a._v("LOGO")],1)]),t("groups-layer",{ref:"GroupsLayer",on:{getTeamGroup:a.getTeamGroup}})])],2)},s=[],n=function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("div",[t("a-modal",{attrs:{title:a.title,visible:a.visible,okText:"保存",cancelText:"返回"},on:{cancel:a.handleCancel,ok:a.handleOk}},[t("a-form",{attrs:{form:a.form}},[t("a-form-item",{attrs:{"label-col":a.formTailLayout.labelCol,"wrapper-col":a.formTailLayout.wrapperCol,label:"名称"}},[t("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["groupName",{rules:[{required:!0,message:"必填！/最长20个字符！"}]}],expression:"[\n            'groupName',\n            { rules: [{ required: true, message: '必填！/最长20个字符！' }] }\n          ]"}],attrs:{placeholder:"名称"}})],1),t("a-form-item",{attrs:{"label-col":a.formItemLayout.labelCol,"wrapper-col":a.formItemLayout.wrapperCol,label:"状态"}},[t("a-radio-group",{directives:[{name:"decorator",rawName:"v-decorator",value:["dataStatus"],expression:"['dataStatus']"}]},[t("a-radio",{attrs:{value:1}},[a._v("报名")]),t("a-radio",{attrs:{value:2}},[a._v("在期")]),t("a-radio",{attrs:{value:3}},[a._v("结束")])],1)],1),t("a-form-item",{attrs:{"label-col":a.formTailLayout.labelCol,"wrapper-col":a.formTailLayout.wrapperCol,label:"显示序列"}},[t("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["dataOrder",{rules:[{required:!0,pattern:/^\d+$/,message:"必填！/只允许数字！"}]}],expression:"[\n            'dataOrder',\n            { rules: [{ required: true, pattern: /^\\d+$/,  message: '必填！/只允许数字！' }] }\n          ]"}],attrs:{placeholder:"数值越小，显示越靠前"}})],1),t("a-form-item",{attrs:{"label-col":a.formItemLayout.labelCol,"wrapper-col":a.formItemLayout.wrapperCol,label:"备注"}},[t("a-textarea",{directives:[{name:"decorator",rawName:"v-decorator",value:["groupReserve",{rules:[{required:!0,message:"请添加备注！"}]}],expression:"[\n            'groupReserve',\n            { rules: [{ required: true, message: '请添加备注！' }] }\n          ]"}],attrs:{placeholder:"Basic usage",rows:4}})],1),t("upload-logo",{ref:"UploadLogo"})],1)],1)],1)},i=[],u=t("3228"),d=function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("div",[t("a-form-item",{attrs:{"label-col":a.formItemLayout.labelCol,"wrapper-col":a.formItemLayout.wrapperCol,label:"LOGO"}},[t("a-upload",{staticClass:"avatar-upload",attrs:{name:"avatar",showUploadList:!1,listType:"picture-card",action:a.uploadUrl,beforeUpload:a.beforeUpload},on:{change:a.handleChange}},[a.imageUrl?t("img",{staticStyle:{width:"80%"},attrs:{src:a.imageUrl,alt:"avatar"}}):t("div",[t("a-icon",{attrs:{type:a.loading?"loading":"plus"}}),t("div",{staticClass:"ant-upload-text"},[a._v("Upload")])],1)])],1)],1)},c=[],p=t("b95e"),m={data:function(){return{formItemLayout:{labelCol:{span:4},wrapperCol:{span:20}},formTailLayout:{labelCol:{span:4},wrapperCol:{span:10}},uploadUrl:p["b"],imageUrl:"",loading:!1}},methods:{beforeUpload:function(a){var e="image/jpeg"===a.type||"image/png";e||this.$message.error("You can only upload JPG file or PNG file!");var t=a.size/1024/1024<2;return t||this.$message.error("Image must smaller than 2MB!"),e&&t},handleChange:function(a){console.log(a),"uploading"!==a.file.status?"done"===a.file.status&&(this.imageUrl=a.file.response.data,this.loading=!1):this.loading=!0}}},f=m,g=t("2877"),v=Object(g["a"])(f,d,c,!1,null,null,null),b=v.exports,h={components:{UploadLogo:b},beforeCreate:function(){this.form=this.$form.createForm(this)},data:function(){return{formItemLayout:{labelCol:{span:4},wrapperCol:{span:20}},formTailLayout:{labelCol:{span:4},wrapperCol:{span:10}},visible:!1,title:"",id:""}},methods:{handleCancel:function(){var a=this.form;a.resetFields(),this.visible=!1},handleOk:function(a){var e=this;console.log(a),this.form.validateFields(function(a,t){a||("编辑群组"===e.title?Object(u["s"])({dataOrder:t.dataOrder,dataStatus:t.dataStatus,groupLogo:e.$refs.UploadLogo.imageUrl,groupName:t.groupName,groupReserve:t.groupReserve,id:e.id}).then(function(a){console.log("保存编辑群组后",a),200===a.code&&(e.$notification["success"]({message:"提示",description:"更改成功",duration:2}),e.$emit("getTeamGroup"))}).catch(function(a){console.log(a)}):Object(u["q"])({dataOrder:t.dataOrder,dataStatus:t.dataStatus,groupLogo:e.$refs.UploadLogo.imageUrl,groupName:t.groupName,groupReserve:t.groupReserve}).then(function(a){console.log("保存新增群组后",a),200===a.code&&(e.$notification["success"]({message:"提示",description:"更改成功",duration:2}),e.$emit("getTeamGroup"))}).catch(function(a){console.log(a)}),e.visible=!1)})},getGroupDetails:function(a){var e=this;console.log("群组详情弹窗id",a),this.id=a,this.visible=!0,this.title="编辑群组",Object(u["A"])(a).then(function(a){console.log("群组详情弹窗",a),e.form.setFieldsValue({groupName:a.data.groupName,groupReserve:a.data.groupReserve,dataOrder:a.data.dataOrder,dataStatus:a.data.dataStatus}),e.$refs.UploadLogo.imageUrl=a.data.groupLogo}).catch(function(a){console.log(a)})},addTeamGroup:function(){console.log("新增群组弹层"),this.title="新增群组";var a=this.form;a.resetFields(),this.$refs.UploadLogo.imageUrl="",this.visible=!0}}},y=h,L=Object(g["a"])(y,n,i,!1,null,null,null),w=L.exports,S={components:{GroupsLayer:w},created:function(){console.log(this.$store.state.token),this.getTeamGroup()},data:function(){return{pagination:{defaultPageSize:10},dataSource:[],columns:[{slots:{title:"Logo"},dataIndex:"groupLogo",scopedSlots:{customRender:"groupLogo"}},{title:"群组名称",dataIndex:"groupName"},{title:"成员总数",dataIndex:"memberCount",scopedSlots:{customRender:"members"}},{title:"备注",dataIndex:"groupReserve"},{title:"群组状态",dataIndex:"dataStatus",scopedSlots:{customRender:"dataStatus"}},{title:"操作",dataIndex:"id",scopedSlots:{customRender:"operation"}}]}},methods:{handleAdd:function(){this.$refs.GroupsLayer.addTeamGroup()},editGroup:function(a){this.$refs.GroupsLayer.getGroupDetails(a)},getTeamGroup:function(){var a=this;Object(u["z"])("pageSize=1000").then(function(e){if(console.log("群组列表",e),4401===e.code)return a.$notification.error({message:"注意",description:"用户已失效，请重新登录"});a.dataSource=e.data.list;for(var t=0;t<a.dataSource.length;t++)a.dataSource[t].key=a.dataSource[t].id}).catch(function(a){console.log(a)})}}},C=S,_=(t("fbb6"),Object(g["a"])(C,l,s,!1,null,"00682b2d",null)),$=_.exports,x={components:{GroupsTable:$},data:function(){return{advanced:!1,queryParam:{}}},methods:{toggleAdvanced:function(){this.advanced=!this.advanced}}},O=x,k=Object(g["a"])(O,r,o,!1,null,null,null);e["default"]=k.exports},fbb6:function(a,e,t){"use strict";var r=t("822c"),o=t.n(r);o.a}}]);
//# sourceMappingURL=chunk-6f166731.f4df6889.js.map