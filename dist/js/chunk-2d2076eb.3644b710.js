(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d2076eb"],{a105:function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=this,a=e.$createElement,o=e._self._c||a;return o("div",[o("a-card",{staticStyle:{width:"100%"},attrs:{bordered:!1}},[o("a-card-meta",{attrs:{title:e.item.contestName}},[o("img",{staticStyle:{width:"250px",height:"180px"},attrs:{slot:"avatar",alt:"海报",src:e.item.contestLogo},slot:"avatar"}),o("template",{slot:"description"},[o("p",[o("span",[e._v("主办方:")]),e._v(e._s(e.item.sponsorName))]),o("p",[e._v(e._s(e.item.contestIntroduce))]),o("p",[o("span",[e._v("￥")]),e._v(e._s(e.item.contestReward)+"奖金")]),o("a-row",{style:{color:e.item.color}},[o("a-col",{attrs:{span:"4"}},[o("span",[e.item.userJoinState?o("a-button",{attrs:{disabled:""}},[e._v("已报名")]):o("a-button",{attrs:{type:"primary",disabled:"black"===e.item.color},on:{click:function(){t.key="enrol"}}},[o("router-link",{attrs:{to:{name:"enrol",query:{contestId:this.$route.query.contestId}}}},[e._v("立即报名")])],1)],1)]),o("a-col",{attrs:{span:"7"}},[o("span",[o("a-icon",{staticStyle:{"margin-right":"8px"},attrs:{type:"clock-circle"}}),e._v(e._s(e.item.tips)+"\n                        ")],1)]),o("a-col",{attrs:{span:"5"}},[e.time?o("span",[e._v("倒计时"+e._s(e.time.day)+"天"+e._s(e.time.hour)+"时"+e._s(e.time.minute)+"分钟"+e._s(e.time.second)+"秒")]):o("span",[e._v("活动已结束")])]),o("a-col",{attrs:{span:"4"}},[o("span",[o("a-icon",{staticStyle:{"margin-right":"8px"},attrs:{type:"clock-circle"}}),"#87d068"===e.item.color?o("span",[e._v("在期 | 报名中")]):"orange"===e.item.color?o("span",[e._v("在期 | 等待竞赛")]):"#f50"===e.item.color?o("span",[e._v("在期 | 竞赛中")]):o("span",[e._v("往期 | 已结束")])],1)]),o("a-col",{attrs:{span:"4"}},[o("span",[e._v(e._s(e.item.contestUserNum)+"人参与")])])],1)],1)],2)],1),o("a-row",{attrs:{gutter:16}},[o("a-col",{attrs:{span:20}},[o("a-card",{attrs:{tabList:e.tabListNoTitle,activeTabKey:e.key},on:{tabChange:function(t){return e.onTabChange(t)}}},[o("router-view")],1)],1),o("a-col",{attrs:{span:4}},[o("a-card",{attrs:{title:"主办方"}},[o("a",{attrs:{href:e.item.sponsorWebsite}},[o("img",{staticStyle:{width:"100%"},attrs:{src:e.item.sponsorLogo}}),o("h4",[e._v(e._s(e.item.sponsorName))])]),o("p",[e._v(e._s(e.item.sponsorIntroduce))])])],1)],1)],1)},n=[],s=a("e814"),i=a.n(s),r=a("3228"),c={data:function(){return{item:{},key:"details",time:{day:0,hour:0,minute:0,second:0},tabListNoTitle:[{key:"details",tab:"竞赛详情"},{key:"allEvents",tab:"全部赛况"},{key:"myEvent",tab:"我的赛况"},{key:"enrol",tab:"报名填表"},{key:"test",tab:"进入答题"}]}},created:function(){!1===this.$store.state.isLogin?this.contestInfoId("open"):this.contestInfoId("auth")},methods:{onTabChange:function(t){this.key=t,this.$router.push({name:t,query:{contestId:this.$route.query.contestId}})},contestInfoId:function(t){var e=this;Object(r["b"])(t,this.$route.query.contestId).then(function(t){console.log("竞赛详情",t),e.item=t.data;var a,o,n=e,s=new Date(t.data.contentJoinTime),r=new Date(t.data.contestStartTime),c=new Date(t.data.contestEndTime),l=(s.getTime()-(new Date).getTime())/1e3,m=(r.getTime()-(new Date).getTime())/1e3,p=(c.getTime()-(new Date).getTime())/1e3;if(l>0?(a=l,o=s.getTime(),n.item.tips=s.toLocaleString()+" 截至报名",n.item.color="#87d068"):m>0?(a=m,o=r.getTime(),n.item.tips=r.toLocaleString()+" 开始竞赛",n.item.color="orange"):p>0?(a=p,o=c.getTime(),n.item.tips=c.toLocaleString()+" 结束竞赛",n.item.color="#f50"):(clearInterval(d),n.time=null,a=0,n.item.tips=c.toLocaleString()+" 已结束",n.item.color="black"),a>0)var d=setInterval(function(){var t=new Date,e=i()((o-t.getTime())/1e3),a=i()(e/3600/24),s=i()(e/3600)%24,r=i()(e/60)%60,c=i()(e%60);n.time.day=a,n.time.hour=s,n.time.minute=r,n.time.second=c},1e3)}).catch(function(t){console.log(t)})}}},l=c,m=a("2877"),p=Object(m["a"])(l,o,n,!1,null,null,null);e["default"]=p.exports}}]);
//# sourceMappingURL=chunk-2d2076eb.3644b710.js.map