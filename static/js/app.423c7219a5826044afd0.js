webpackJsonp([1],{NHnr:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i("7+uW"),n=i("BO1k"),s=i.n(n),l=i("lHA8"),a=i.n(l),h=i("Gu7T"),c=i.n(h),o=i("d7EF"),d=i.n(o),f=i("mvHQ"),u=i.n(f),y={name:"TransferTree",data:function(){return{treeKeys:[],treeLength:0,treeIndeterminate:!1,treeCheckAll:!1,treeExpandedKeys:[],treeCheckKeys:[],filterTree:"",filterList:"",archiveFirst:[],rightList:[],listCheckKey:[],listCheckAll:!1}},props:{width:{type:String,default:"800px"},height:{type:String,default:"500px"},titles:{type:Array,default:function(){return["源数据","目标列表"]}},dataSource:{type:Array,default:function(){return[]}},defaultProps:{type:Object,default:function(){return{label:"label",children:"children"}}},nodeKey:{type:String,default:"id"},filterable:{type:Boolean,default:!1},openAll:{type:Boolean,default:!0},defaultCheckedKeys:{type:Array,default:function(){return[]}},defaultExpandedKeys:{type:Array,default:function(){return[]}},filterPlaceholder:{type:String,default:"请输入搜索内容"},accordion:{type:Boolean,default:!1},renderAfterExpand:{type:Boolean,default:!0},expandOnClickNode:{type:Boolean,default:!0},fatherChoose:{type:Boolean,default:!1},isRadio:{type:Boolean,default:!1},buttonTexts:{type:Array,default:function(){return[]}}},computed:{treeFromData:function(){return JSON.parse(u()(this.dataSource))},treeTitle:function(){return d()(this.titles,1)[0]},listTitle:function(){return d()(this.titles,2)[1]},leftButtonText:function(){return d()(this.buttonTexts,1)[0]},rightButtonText:function(){return d()(this.buttonTexts,2)[1]},listIndeterminate:function(){var e=this.listCheckKey.length;return e>0&&e<this.rightList.length},transferDisabled:function(){var e=this,t=this.rightList.map(function(t){return t[e.nodeKey]}),i=this.treeCheckKeys.length>0&&this.treeCheckKeys.every(function(e){return t.indexOf(e)>-1});return 0==t.length&&0==this.treeCheckKeys.length&&(i=!0),i}},watch:{treeCheckKeys:function(e){e.length>0?(this.treeIndeterminate=!0,e.length==this.treeLength?(this.treeIndeterminate=!1,this.treeCheckAll=!0):(this.treeIndeterminate=!0,this.treeCheckAll=!1)):(this.treeIndeterminate=!1,this.treeCheckAll=!1)},listCheckKey:function(e,t){var i=[].concat(c()(e),c()(t)).filter(function(i){return-1===e.indexOf(i)||-1===t.indexOf(i)});this.updateListAllChecked(),this.$emit("right-check-change",e,i)},filterTree:function(e){this.$refs["from-tree"].filter(e)},filterList:function(e,t){""==t&&(this.archiveFirst=this.rightList),""==e&&(this.rightList=this.archiveFirst);var i=RegExp(e);this.rightList=this.rightList.filter(function(e){return i.test(e.label)})},defaultCheckedKeys:function(e){this.treeCheckKeys=e,this.findItem(this.treeFromData),this.isRadio&&this.rightList.length>0?this.setDisable(this.treeFromData):this.chooseDisable(this.treeCheckKeys,this.treeFromData)},defaultExpandedKeys:{handler:function(e){var t=new a.a(this.treeExpandedKeys.concat(e));this.treeExpandedKeys=[].concat(c()(t))},immediate:!0}},mounted:function(){this.setTreeMsg(this.treeFromData)},methods:{fromTreeChecked:function(e){var t=this;this.treeCheckKeys=this.$refs["from-tree"].getCheckedKeys(!this.fatherChoose),this.isRadio&&this.setChecked([e.id]);var i=[];i=this.fatherChoose?[e[this.nodeKey]]:this.findChildKey([e]),console.log("left-check-change",this.treeCheckKeys,i),this.$nextTick(function(){t.$emit("left-check-change",t.treeCheckKeys,i)})},treeAllBoxChange:function(e){var t=this;if(0!=this.treeFromData.length){var i=this.rightList.map(function(e){return e[t.nodeKey]});e?(this.setChecked(this.treeKeys),this.treeCheckKeys=this.treeKeys):(this.setChecked(i),this.treeCheckKeys=i),this.$emit("left-check-change",this.treeCheckKeys)}},filterNodeFrom:function(e,t){return this.filterNode?this.filterNode(e,t,"form"):!e||-1!==t[this.defaultProps.label].indexOf(e)},treeToList:function(){var e,t=this,i=this.$refs["from-tree"].getCheckedNodes(!this.fatherChoose),r=JSON.parse(u()(this.rightList.map(function(e){return e[t.nodeKey]}))),n=[].concat(c()(new a.a(this.treeCheckKeys))).filter(function(e){return!new a.a(r).has(e)});if(e=i.filter(function(e){if(!t.rightList.some(function(i){return i[t.nodeKey]==e[t.nodeKey]}))return e}),this.rightList=[].concat(c()(this.rightList),c()(e)),this.isRadio)this.setDisable(this.treeFromData);else{var s=this.rightList.map(function(e){return e[t.nodeKey]});this.chooseDisable(s,this.treeFromData)}this.$emit("change",this.treeCheckKeys,"right",n)},listAllBoxChange:function(e){var t=this;this.listCheckKey=e?this.rightList.map(function(e){return e[t.nodeKey]}):[]},updateListAllChecked:function(){var e=this,t=this.rightList.map(function(t){return t[e.nodeKey]});this.listCheckAll=t.length>0&&t.every(function(t){return e.listCheckKey.indexOf(t)>-1})},listToTree:function(){var e=this,t=[].concat(c()(new a.a(this.treeCheckKeys))).filter(function(t){return new a.a(e.listCheckKey).has(t)});this.rightList=this.listCheckAll?[]:this.rightList.filter(function(t){return!e.listCheckKey.includes(t[e.nodeKey])&&t});var i=this.rightList.map(function(t){return t[e.nodeKey]});this.chooseDisable(i,this.treeFromData),0==this.rightList.length&&(this.treeIndeterminate=!1,this.treeCheckAll=!1),this.treeCheckKeys=[].concat(c()(new a.a(this.treeCheckKeys))).filter(function(t){return!new a.a(e.listCheckKey).has(t)}),this.listCheckKey=[],this.setChecked(i),this.$emit("change",this.treeCheckKeys,"left",t)},setTreeMsg:function(e){var t=!0,i=!1,r=void 0;try{for(var n,l=s()(e);!(t=(n=l.next()).done);t=!0){var a=n.value;this.treeLength++,this.treeKeys.push(a[this.nodeKey]),a.children&&this.setTreeMsg(a.children)}}catch(e){i=!0,r=e}finally{try{!t&&l.return&&l.return()}finally{if(i)throw r}}},setChecked:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];this.$refs["from-tree"].setCheckedKeys(e)},findItem:function(e){var t=!0,i=!1,r=void 0;try{for(var n,l=s()(e);!(t=(n=l.next()).done);t=!0){var a=n.value;this.defaultCheckedKeys.includes(a[this.nodeKey])&&this.rightList.push(a),a.children&&this.findItem(a.children)}}catch(e){i=!0,r=e}finally{try{!t&&l.return&&l.return()}finally{if(i)throw r}}},findChildKey:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],i=!0,r=!1,n=void 0;try{for(var l,a=s()(e);!(i=(l=a.next()).done);i=!0){var h=l.value;0==h.children.length&&t.push(h[this.nodeKey]),h.children&&this.findChildKey(h.children,t)}}catch(e){r=!0,n=e}finally{try{!i&&a.return&&a.return()}finally{if(r)throw n}}return t},chooseDisable:function(e,t){var i=!0,r=!1,n=void 0;try{for(var l,a=s()(t);!(i=(l=a.next()).done);i=!0){var h=l.value;e.includes(h[this.nodeKey])?this.$set(h,"disabled",!0):this.$set(h,"disabled",!1),this.isRadio&&!this.fatherChoose&&h.children.length>0&&this.$set(h,"disabled",!0),h.children&&this.chooseDisable(e,h.children)}}catch(e){r=!0,n=e}finally{try{!i&&a.return&&a.return()}finally{if(r)throw n}}},setDisable:function(e){var t=!0,i=!1,r=void 0;try{for(var n,l=s()(e);!(t=(n=l.next()).done);t=!0){var a=n.value;this.$set(a,"disabled",!0),a.children&&this.setDisable(a.children)}}catch(e){i=!0,r=e}finally{try{!t&&l.return&&l.return()}finally{if(i)throw r}}},getTreeChecked:function(){return{leftKeys:this.$refs["from-tree"].getCheckedKeys(),leftHarfKeys:this.$refs["from-tree"].getHalfCheckedKeys(),leftNodes:this.$refs["from-tree"].getCheckedNodes(),leftHalfNodes:this.$refs["from-tree"].getHalfCheckedNodes()}},clearQuery:function(){switch(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"all"){case"all":this.filterTree="",this.filterList="";break;case"left":this.filterTree="";break;case"right":this.filterList=""}}}},C={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"transfer-box transfer",style:{width:e.width,height:e.height}},[i("div",{staticClass:"transfer-left"},[i("div",{staticClass:"transfer-title"},[i("el-checkbox",{attrs:{indeterminate:e.treeIndeterminate},on:{change:e.treeAllBoxChange},model:{value:e.treeCheckAll,callback:function(t){e.treeCheckAll=t},expression:"treeCheckAll"}}),e._v(" "),i("span",[e._v(e._s(e.treeTitle))]),e._v(" "),i("span",{staticClass:"total"},[e._v(e._s(e.treeLength)+"/"+e._s(e.treeCheckKeys.length))])],1),e._v(" "),i("div",{staticClass:"transfer-main"},[e.filterable?i("el-input",{staticClass:"filter-input",attrs:{clearable:"",size:"small",placeholder:e.filterPlaceholder},model:{value:e.filterTree,callback:function(t){e.filterTree=t},expression:"filterTree"}},[i("i",{staticClass:"el-input__icon el-icon-search",attrs:{slot:"prefix"},slot:"prefix"})]):e._e(),e._v(" "),i("el-tree",{ref:"from-tree",attrs:{"show-checkbox":"","node-key":e.nodeKey,props:e.defaultProps,data:e.treeFromData,accordion:e.accordion,"default-expand-all":e.openAll,"filter-node-method":e.filterNodeFrom,"render-after-expand":e.renderAfterExpand,"expand-on-click-node":e.expandOnClickNode,"default-checked-keys":e.defaultCheckedKeys,"default-expanded-keys":e.treeExpandedKeys,"check-strictly":e.fatherChoose},on:{check:e.fromTreeChecked}}),e._v(" "),e.$slots["left-footer"]?i("div",{staticClass:"slot-footer"},[e._t("left-footer")],2):e._e()],1)]),e._v(" "),i("div",{staticClass:"transfer-center right-list-center"},[i("el-button",{attrs:{type:"primary",disabled:0==e.listCheckKey.length},on:{click:function(t){return e.listToTree()}}},[i("i",{staticClass:"el-icon-arrow-left el-icon--left"}),e._v("\n      "+e._s(e.leftButtonText)+"\n    ")]),e._v(" "),i("el-button",{attrs:{type:"primary",disabled:e.transferDisabled},on:{click:function(t){return e.treeToList()}}},[e._v("\n      "+e._s(e.rightButtonText)+"\n      "),i("i",{staticClass:"el-icon-arrow-right el-icon--right"})])],1),e._v(" "),i("div",{staticClass:"transfer-right"},[i("div",{staticClass:"transfer-title"},[i("el-checkbox",{attrs:{indeterminate:e.listIndeterminate},on:{change:e.listAllBoxChange},model:{value:e.listCheckAll,callback:function(t){e.listCheckAll=t},expression:"listCheckAll"}}),e._v(" "),i("span",[e._v(e._s(e.listTitle))]),e._v(" "),i("span",{staticClass:"total"},[e._v(e._s(e.rightList.length)+"/"+e._s(e.listCheckKey.length))])],1),e._v(" "),i("div",{staticClass:"transfer-main"},[e.filterable?i("el-input",{staticClass:"filter-input",attrs:{clearable:"",placeholder:e.filterPlaceholder,size:"small"},model:{value:e.filterList,callback:function(t){e.filterList=t},expression:"filterList"}},[i("i",{staticClass:"el-input__icon el-icon-search",attrs:{slot:"prefix"},slot:"prefix"})]):e._e(),e._v(" "),i("el-checkbox-group",{staticClass:"el-transfer-panel__list",model:{value:e.listCheckKey,callback:function(t){e.listCheckKey=t},expression:"listCheckKey"}},e._l(e.rightList,function(t){return i("el-checkbox",{key:t[e.nodeKey],staticClass:"el-transfer-panel__item",attrs:{label:t[e.nodeKey]}},[e._v("\n          "+e._s(t.label)+"\n        ")])}),1),e._v(" "),e.$slots["right-footer"]?i("div",{staticClass:"slot-footer"},[e._t("right-footer")],2):e._e()],1)])])},staticRenderFns:[]};var p=[{label:"A部门",id:"1",children:[{label:"小明",children:[],id:"1-1"},{label:"小红",children:[],id:"1-2"},{label:"小刚",children:[],id:"1-3"}]},{label:"B部门",id:"2",children:[{label:"小王",children:[],id:"2-1"},{label:"小李",children:[],id:"2-2"},{label:"小朱",children:[],id:"2-3"}]}],g={name:"App",components:{treeTransfer:i("VU/8")(y,C,!1,function(e){i("Y3hp")},null,null).exports},data:function(){return{dataSource:p,defaultValue:[]}},mounted:function(){this.defaultValue=["1-2"]},methods:{handleChange:function(e,t,i){console.log("handleChange",e,t,i)},handleLeftCheckChange:function(e,t){console.log("handleLeftCheckChange:",e,t)},handleRightCheckChange:function(e,t){console.log("handleRightCheckChange:",e,t)}}},k={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{attrs:{id:"app"}},[i("tree-transfer",{ref:"treeTransfer",attrs:{"data-source":e.dataSource,defaultCheckedKeys:e.defaultValue,isRadio:!1,filterable:!0,"father-choose":!1},on:{"update:dataSource":function(t){e.dataSource=t},"update:data-source":function(t){e.dataSource=t},"left-check-change":e.handleLeftCheckChange,"right-check-change":e.handleRightCheckChange,change:e.handleChange}})],1)},staticRenderFns:[]};var v=i("VU/8")(g,k,!1,function(e){i("cpQm")},null,null).exports,m=i("zL8q"),K=i.n(m);i("tvR6");r.default.config.productionTip=!1,r.default.use(K.a),new r.default({el:"#app",components:{App:v},template:"<App/>"})},Y3hp:function(e,t){},cpQm:function(e,t){},tvR6:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.423c7219a5826044afd0.js.map