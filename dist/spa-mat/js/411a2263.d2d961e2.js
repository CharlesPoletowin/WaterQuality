(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["411a2263"],{"324a":function(t,e,a){"use strict";var o=a("33fd"),i=a.n(o);i.a},"33fd":function(t,e,a){},"38b8":function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-page",{staticClass:"row q-pa-md q-pt-xl bg-sky"},[a("p",{staticClass:"pagetit"},[t._v("徐汇区水质监控决策分析")]),a("q-tabs",{staticClass:"tab"},[a("q-route-tab",{staticClass:"text-grey-4 bg-black",attrs:{slot:"title",to:"/",exact:""},slot:"title"},[t._v("单个站点")])],1),a("div",{staticClass:"col-4 q-pr-sm relative-position"},[a("div",{staticClass:"fit",attrs:{id:"baidumap"}}),t.recent?a("div",{staticClass:"dash q-pa-md"},[a("p",{staticClass:"text-warning zdata"},[t._v(" "+t._s(t.zdName))]),a("p",{staticClass:"text-positive zdata"},[t._v(t._s(t.recent_data.time))]),t._l(11,function(e){return a("p",{key:e,staticClass:"zdata "},[t._v(" "+t._s(t.recent.fields[e-1])+" :\n          "),a("span",{staticClass:"text-info",class:t.recent.status[e-1]?"text-red-12":"text-green-13"},[t._v(t._s(t.toFiexed(t.recent.value[e-1])))])])})],2):t._e()]),a("div",{staticClass:"col-8 q-pl-sm"},[a("div",{staticClass:"row full-height"},[a("div",{staticClass:"col-12 q-pb-xs half-height"},[a("div",{staticClass:"fit cardbg"},[a("i-echart",{ref:"timeline",staticClass:"fit",attrs:{option:t.option,isLoading:t.eleshow}})],1)]),a("div",{staticClass:"col-4 q-pr-xs q-pt-xs half-height"},[a("div",{staticClass:"fit cardbg"},[a("i-echart",{ref:"river",staticClass:"fit",attrs:{option:t.riveropt,isLoading:t.rivershow}})],1)]),a("div",{staticClass:"col-4 q-px-xs q-pt-xs half-height"},[a("div",{staticClass:"fit cardbg"},[a("i-echart",{staticClass:"fit",attrs:{option:t.heatopt,isLoading:t.heatshow}})],1)]),a("div",{staticClass:"col-4 q-pl-xs q-pt-xs half-height"},[a("div",{staticClass:"fit cardbg"},[a("i-echart",{staticClass:"fit",attrs:{option:t.radaropt,isLoading:t.radarshow}})],1)])])])],1)},i=[];o._withStripped=!0;a("6762"),a("456d"),a("cadf"),a("ffc1"),a("7f7f"),a("ac6a"),a("c5f6"),a("f751");var r=a("bd29"),n=(a("1fe0"),a("5a05")),s=a("4fef"),l=a("59f1"),c=a("4397"),d=a("a474"),m=a("22b6"),h=a("9005"),p=a("8dad"),f=a("7947");a("bbd5");a("a00a");var b=["#eb7f49","#eb9a49","#ebb549","#ebd049","#ebeb49","#d0eb49","#b5eb49","#9aeb49","#49eb9a","#49ebb5","#49ebd0","#49ebeb","#49d0eb","#49b5eb","#499aeb","#497feb","#4964eb","#4949eb","#6449eb","#7f49eb","#9a49eb","#b549eb","#d049eb","#eb49eb","#eb49d0"],y=["#FF6757","#FFCB57","#5976D6"],u=["#808080"],g={splitLine:{show:!0,lineStyle:{color:"#666",opacity:.1}},axisTick:{show:!1},axisLine:{show:!1,lineStyle:{color:"#999",width:1}}},v=[],S=["temperature","pH","EC","ORP","DO","turbidity","transparency","COD","P","NH3N","flux"];S.forEach(function(t,e){var a=c["a"].line(t,b[e]);v.push(a)});var x=["设备异常","统计异常","序列异常"],w=["可标记"],z=[];S.forEach(function(t){z.push({name:t,min:-.5,max:1})});var C=[{name:x[0],type:"line",itemStyle:{normal:{color:y[0],borderWidth:0}}},{name:x[1],type:"line",itemStyle:{normal:{color:y[1],borderWidth:0}}},{name:x[2],type:"line",itemStyle:{normal:{color:y[2],borderWidth:0}}}],E=[{name:w[0],type:"line",itemStyle:{normal:{color:u[0],borderWidth:0}}}];v=v.concat(C),v=v.concat(E);var A={name:"WaterQuality",components:{iEchart:r["a"],api:d["a"]},data:function(){return{eleshow:!0,rivershow:!0,heatshow:!0,radarshow:!0,months:"",recent:"",recent_data:[],elename:S,zdName:"华东理工站1",heatopt:{title:{text:"站点内各维度关联关系矩阵",top:10,left:10,textStyle:{color:"#fff",fontStyle:"normal",fontFamily:"微软雅黑",fontSize:14}},tooltip:Object.assign({},s["a"],{formatter:function(t,e,a){var o=t.value,i=o[0],r=o[1];return S[i]+"-"+S[r]+" 相关度 : "+o[2]}}),animation:!1,grid:{height:"65%",y:"22%",left:"20%",right:"8%"},xAxis:Object.assign({},{type:"category",data:S,axisLabel:{rotate:"20",interval:0,textStyle:{color:"rgba(255,255,255,0.7)",fontStyle:"normal",fontFamily:"微软雅黑",fontSize:10}},splitArea:{show:!1}},g),yAxis:{type:"category",data:S,axisLabel:{rotate:"20",interval:0,textStyle:{color:"rgba(255,255,255,0.7)",fontStyle:"normal",fontFamily:"微软雅黑",fontSize:10}},splitArea:{show:!1}},visualMap:{min:-1,max:1,show:!0,top:"10%",right:"6%",itemWidth:12,itemHeight:"45%",precision:2,calculable:!0,textStyle:{color:"#eee"},orient:"horizontal",inRange:{color:["#74D3E5","rgba(247,187,88,0)","#BDA061"]}},series:[{name:"相关度",type:"heatmap",data:null,label:{normal:{show:!1}},itemStyle:{emphasis:{shadowBlur:10,shadowColor:"rgba(0, 0, 0, 0.5)"}}}]},radaropt:{title:{text:"站点健康度雷达图",top:10,left:10,textStyle:{color:"#fff",fontStyle:"normal",fontFamily:"微软雅黑",fontSize:14}},tooltip:Object.assign({},s["a"],{show:!0,trigger:"item",axisPointer:{type:"shadow",lineStyle:{color:"#FFD77F"}}}),radar:{center:["50%","55%"],radius:"60%",startAngle:90,splitNumber:3,shape:"circle",axisLine:{lineStyle:{color:"rgba(238, 197, 102, 0.1)"}},splitArea:{show:!0,areaStyle:{color:["rgba(255,103,87, 0.2)","rgba(255,203,87, 0.1)","rgba(131,236,176, 0.2)"].reverse()}},splitLine:{lineStyle:{color:["rgba(255,255,255, 0.1)","rgba(131,236,176, 0)","rgba(255,103,87, 0.8)"]}},name:{show:!0,color:"rgba(255,255,255,0.7)",fontStyle:"normal",fontFamily:"微软雅黑",fontSize:10},indicator:z},series:[{name:"健康度",type:"radar",symbol:"circle",symbolSize:6,label:{show:!1},areaStyle:{normal:{color:"rgba(245, 166, 35, 0.1)"}},itemStyle:{color:"rgba(245, 166, 35, 1)",borderColor:"rgba(245, 166, 35, 0.3)"},lineStyle:{normal:{type:"dashed",color:"rgba(245, 166, 35, 1)",width:1}},data:null}]},riveropt:{color:y,title:{text:"站点异常类型统计变化",top:10,left:10,textStyle:{color:"#fff",fontStyle:"normal",fontFamily:"微软雅黑",fontSize:14}},tooltip:Object.assign({},s["a"],{show:!0,trigger:"axis",axisPointer:{lineStyle:{color:"#FFD77F",type:"dashed"}}}),legend:{width:"auto",top:"12%",itemGap:16,itemWidth:20,itemHeight:14,icon:"circle",data:x,textStyle:{color:"#a8aab0",fontStyle:"normal",fontFamily:"微软雅黑",fontSize:12}},singleAxis:Object.assign({},{top:"25%",bottom:"12%",right:"6%",left:"12%",type:"category",data:this.months,axisPointer:{type:"line",animation:!0,label:{show:!0,backgroundColor:"#000",shadowBlur:0}},splitLine:{show:!1},axisLabel:{rotate:"20",interval:1,align:"right",textStyle:{color:"rgba(255,255,255,0.7)",fontStyle:"normal",fontFamily:"微软雅黑",fontSize:10}}},g),series:[{type:"themeRiver",top:"15%",itemStyle:{opacity:.4,emphasis:{shadowBlur:20,shadowColor:"rgba(0, 0, 0, 0.8)"}},data:null,label:{normal:{show:!1}}}]},option:{baseOption:{timeline:{show:!0,type:"slider",axisType:"category",bottom:"3%",currentIndex:0,autoPlay:!1,playInterval:4e3,loop:!0,realtime:!0,controlPosition:"right",label:{normal:{color:"#4AB9CE",interval:0,rotate:20,padding:-5,align:"right"}},itemStyle:{normal:{borderColor:"#4AB9CE",borderWidth:1}},checkpointStyle:{color:"#f6a436"},lineStyle:{show:!0,color:"#4AB9CE"},symbol:"circle",controlStyle:{show:!0,showPrevBtn:!1,showNextBtn:!1,itemGap:20,itemSize:20,normal:{color:"#4AB9CE",borderColor:"#4AB9CE"},emphasis:{show:!1}},data:this.months},title:{text:"",top:10,left:10,textStyle:{color:"#fff",fontStyle:"normal",fontFamily:"微软雅黑",fontSize:14}},tooltip:Object.assign({},s["a"],{show:!0,position:function(t,e,a,o,i){return[[t[0]-i.contentSize[0],t[0]][+(t[0]<i.viewSize[0]/2)],"25%"]},trigger:"axis",axisPointer:{type:"shadow",lineStyle:{color:"#FFD77F"}}}),grid:{left:"4%",right:"5%",bottom:"18%",top:"20%",containLabel:!0},legend:{right:50,top:"10%",itemGap:16,itemWidth:20,itemHeight:14,data:S,selectedMode:"multiple",textStyle:{color:"#a8aab0",fontStyle:"normal",fontFamily:"微软雅黑",fontSize:12}},xAxis:[Object.assign({},{type:"time",boundaryGap:!0,axisLabel:{interval:5,margin:5,textStyle:{color:"rgba(255,255,255,0.7)",fontStyle:"normal",fontFamily:"微软雅黑",fontSize:10}}},g)],yAxis:[{type:"value",splitNumber:6,axisLabel:{textStyle:{color:"rgba(255,255,255,0.8)",fontStyle:"normal",fontFamily:"微软雅黑",fontSize:12}},offset:5,axisTick:{show:!1},splitLine:{show:!0,lineStyle:{color:"#ccc",opacity:.15}}}],series:v,animation:!1},options:null}}},mounted:function(){var t=this;this.drawLine(),Object(m["a"])(d["a"].abnormal).then(function(e){t.Abnormal=e.data,t.months=t.Abnormal[t.zdName].month,t.chooseZhand(t.zdName),t.$refs.timeline.myEcharts.on("timelinechanged",function(e){t.changeEle(e.currentIndex)})})},methods:{toFiexed:function(t){return Number(t).toFixed(3)},changeEle:function(t){var e=this.Abnormal[this.zdName];console.log("异常站点"),this.months=e.month;var a=this.months[t];console.log(t),console.log(this.months),console.log("%c this.ele: "+a,"background: red");var o=this.element[a];this.heatopt.series[0].data=this.shapeHeatData(o.correlation),this.radaropt.series[0].data=[o["health"]["value"]],this.riveropt.series[0].data=this.shapeRiverData(e),this.riveropt.singleAxis.data=this.months,this.rivershow=!1,this.heatshow=!1,this.radarshow=!1,console.log("%c tooltip 变化："+t,"background: green"),this.$refs.river.myEcharts.dispatchAction({type:"showTip",seriesIndex:0,dataIndex:t})},shapeHeatData:function(t){var e=[],a=t.value;return a.forEach(function(t,a){t.forEach(function(t,o){e.push([o,a,t])})}),e},shapeRiverData:function(t){var e=[],a=t.value,o=t.yfields;return a.forEach(function(t,a){t.forEach(function(t,i){e.push([i,t,o[a]])})}),e},drawLine:function(){var t=this;Object(m["a"])(d["a"].recent).then(function(e){console.log("=="),t.recent_data=e.data,console.log(e.data[t.zdName]),t.recent=t.recent_data.data[t.zdName].data;var a=t.$echarts.init(document.getElementById("baidumap"));h["a"].forEach(function(e,a){h["a"].length;e.lineStyle={normal:{color:t.$echarts.color.modifyHSL("#EBD049",Math.round(1*(1-t.recent_data.data[e.name].abdata)*100))}}}),f["a"].forEach(function(t,e){t.lineStyle={normal:{color:"#4AB9CE",opacity:.7,width:5}}}),t.bmapoption={tooltip:{show:!1},bmap:{center:[121.44061699999999,31.152043],zoom:14,maxZoom:20,roam:!1,mapStyle:{styleJson:n["a"]},enableMapClick:!1,enableAutoResize:!1},series:[{type:"effectScatter",coordinateSystem:"bmap",rippleEffect:{period:10,scale:5,brushType:"fill"},symbolSize:10,zlevel:2,showEffectOn:"render",itemStyle:{normal:{color:"#EBB549"}},data:null},{name:"监测站",type:"scatter",coordinateSystem:"bmap",symbolSize:15,rippleEffect:{brushType:"stroke"},label:{emphasis:{show:!0,position:"right",distance:12,formatter:"{b}",textStyle:{color:"#eee",fontSize:12}}},showEffectOn:"render",itemStyle:{normal:{color:function(e){return t.$echarts.color.modifyHSL("#EBD049",Math.round(1*(1-t.recent_data.data[e.name].abdata)*100))}}},data:l},{type:"lines",coordinateSystem:"bmap",polyline:!0,data:p["a"].concat(f["a"]),silent:!0,lineStyle:{normal:{color:"#74D3E5",opacity:.8,width:3}},progressiveThreshold:500,progressive:200},{type:"lines",coordinateSystem:"bmap",polyline:!0,data:h["a"],lineStyle:{normal:{width:0}},effect:{constantSpeed:20,show:!0,trailLength:.3,symbolSize:4},zlevel:1}]};var o=null;window.addEventListener("resize",function(){o=setTimeout(function(){t.baiduMap.resize();var e=t.bmap.getCenter();t.bmap.checkResize(),t.bmap.setCenter(e)},100)}),o&&clearTimeout(o),a.setOption(t.bmapoption),a.on("click",function(e){var a=e.seriesName;t.zdName=e.name,console.log("点击"+t.zdName),"监测站"==a&&t.chooseZhand(t.zdName)}),t.baiduMap=a;var i=a.getModel().getComponent("bmap").getBMap();i.enableScrollWheelZoom(),i.enableAutoResize(),t.bmap=i})},chooseZhand:function(t){var e=this;this.recent&&(this.recent=this.recent_data.data[this.zdName].data),Object(m["a"])(d["a"].elements,{zName:t}).then(function(a){e.element=a.data,console.log("更改站点");var o=l.filter(function(e){return e.name==t});e.bmapoption.series[0].data=o,e.baiduMap.setOption(e.bmapoption),e.option.baseOption.title.text=t;var i=[],r=[];Object.entries(e.element).forEach(function(t){var e={series:[]},a=t[1],o=t[0];r.push(o);var n=a.timestamp,s=a.data;Object.keys(s).forEach(function(t){var a=[],o=[];s[t].forEach(function(t,e){var o=[];o[0]=n[e],o[1]=t,a.push(o)});var i={};i.data=a;var r={};r.data=o,i.markPoint=r,e.series.push(i)});var l=a.errorarea,c=[],d=[];l&&Object.entries(l).forEach(function(t,a){var o={markArea:{data:[]}},i=[];c.push(t[0]);var r=t[1];r.forEach(function(t){var e=[];e[0]={name:t[2]?x[a]+" ( "+t[2]+" )":x[a],xAxis:t[0]},e[1]={xAxis:t[1]},d.push([t[0],t[1]]),i.push(e)}),o.markArea.data=i,o.markArea.label={show:!1,fontSize:10},e.series.push(o)}),x.forEach(function(t){c.includes(t)||e.series.push({markArea:{data:[]}})}),i.push(e)}),console.log("装载timeline"),console.log("----options-----"),console.log("----options-----"),e.option.baseOption.timeline.data=r,e.option.options=i,e.eleshow=!1,e.changeEle(0)})}}},F=A,O=(a("324a"),a("2877")),_=Object(O["a"])(F,o,i,!1,null,null,null);_.options.__file="Water.vue";e["default"]=_.exports},9005:function(t,e,a){"use strict";e["a"]=[{name:"虹桥镇站",coords:[[121.406878,31.184605],[121.408315,31.18513],[121.409968,31.185655],[121.41331,31.186613],[121.414999,31.18723],[121.418197,31.188188],[121.419239,31.188312],[121.420209,31.188373],[121.421287,31.188373]]},{name:"虹桥镇站",coords:[[121.407342,31.185036],[121.409642,31.185716],[121.410867,31.185809],[121.411298,31.184079],[121.411621,31.182998],[121.411837,31.182226],[121.412304,31.181175],[121.412376,31.180681],[121.412268,31.180063],[121.41234,31.179476],[121.41252,31.178395]]},{name:"宜山路桥站",coords:[[121.412734,31.177072],[121.412838,31.176665],[121.413126,31.175306],[121.413305,31.174039],[121.413665,31.172139],[121.413916,31.170517],[121.414257,31.169512],[121.414456,31.169138],[121.414995,31.168397],[121.41586,31.168636],[121.419309,31.169316],[121.422615,31.169748],[121.42434,31.170243]]},{name:"虹梅路七号桥站",coords:[[121.413001,31.162237],[121.414851,31.162716],[121.415857,31.163072],[121.416145,31.163535],[121.416073,31.164168],[121.415875,31.165265],[121.41566,31.166764],[121.415157,31.168216],[121.41586,31.168636],[121.419309,31.169316],[121.422615,31.169748],[121.42434,31.170243]]},{name:"梦公园站",coords:[[121.421249,31.188449],[121.422686,31.188263],[121.426531,31.188047],[121.430915,31.187831],[121.431813,31.187275],[121.432585,31.187083]]},{name:"文定路桥站",coords:[[121.432568,31.186963],[121.432927,31.186694],[121.433502,31.186292],[121.433789,31.185952],[121.435891,31.182971],[121.436592,31.182106],[121.436987,31.181411],[121.437114,31.18121]]},{name:"蒲汇塘泵站(浮标)",coords:[[121.433723,31.185995],[121.434478,31.184882],[121.435412,31.183647],[121.435987,31.182936],[121.436562,31.182195],[121.436885,31.18167],[121.437101,31.18099],[121.437239,31.180378],[121.437454,31.179111],[121.437454,31.178555],[121.43749,31.17735],[121.437562,31.177072],[121.437383,31.176701],[121.437239,31.176238],[121.437383,31.175713],[121.43749,31.174601],[121.43749,31.174384],[121.437562,31.173705],[121.437526,31.173457],[121.437993,31.173087],[121.437939,31.172515],[121.437903,31.172376],[121.437921,31.172036],[121.437939,31.171418],[121.438029,31.17131],[121.438101,31.170939],[121.438406,31.170281]]},{name:"上师大附中站",coords:[[121.424842,31.170347],[121.425016,31.170423],[121.425896,31.170698],[121.426238,31.170914],[121.426579,31.170945],[121.42798,31.171146],[121.428447,31.171131],[121.428609,31.171084],[121.428699,31.171131],[121.42904,31.171192],[121.429525,31.171332],[121.429687,31.171362],[121.429831,31.171254],[121.430028,31.171146],[121.430334,31.171146],[121.430549,31.171162],[121.430747,31.171146],[121.431023,31.17099],[121.431634,31.170434],[121.431867,31.170341],[121.432155,31.170295],[121.432586,31.170465],[121.433502,31.170728],[121.433897,31.170604],[121.434921,31.170434],[121.435263,31.170141],[121.435712,31.170032],[121.43697,31.170048],[121.438353,31.170125]]},{name:"世外中学站",coords:[[121.417946,31.15173],[121.420515,31.152574],[121.421162,31.152574],[121.421575,31.152667],[121.423948,31.153946],[121.424775,31.154132],[121.425583,31.15441],[121.426,31.154872],[121.426593,31.156139],[121.427278,31.158286],[121.427314,31.158811],[121.427376,31.16183],[121.427483,31.16268],[121.427286,31.16353],[121.427045,31.164336]]},{name:"上澳塘泵站(浮标)",coords:[[121.427051,31.164356],[121.426964,31.164774],[121.426703,31.165725],[121.426685,31.165856],[121.426299,31.168011],[121.426155,31.168575],[121.426154,31.169092],[121.425947,31.170473],[121.425902,31.170697]]},{name:"冠生园路桥站",coords:[[121.4261,31.169226],[121.425941,31.170673],[121.426238,31.170914],[121.426579,31.170945],[121.42798,31.171146],[121.428447,31.171131],[121.428609,31.171084],[121.428699,31.171132],[121.42903,31.171192],[121.429525,31.171332],[121.429687,31.171362],[121.429832,31.171254],[121.430028,31.171146],[121.430334,31.171146],[121.430549,31.171162],[121.430747,31.171146],[121.431023,31.17099],[121.431634,31.170434],[121.431857,31.170331],[121.432155,31.170295],[121.432586,31.170465],[121.433502,31.170728],[121.433897,31.170604],[121.434922,31.170433],[121.435253,31.170141],[121.435712,31.170132],[121.43697,31.170048],[121.438353,31.170125]]},{name:"冠生园路站",coords:[[121.43848,31.170145],[121.438442,31.17029],[121.43898,31.170489],[121.439375,31.170922],[121.43986,31.171153],[121.439896,31.171153],[121.440777,31.171169],[121.440992,31.1712],[121.441369,31.171262],[121.44295,31.171571],[121.443705,31.171601],[121.443849,31.171663],[121.444621,31.171679],[121.44516,31.171663],[121.445627,31.171895],[121.446292,31.172127],[121.446886,31.172217],[121.448018,31.172449],[121.449204,31.172773],[121.449312,31.172835],[121.450965,31.173066],[121.451468,31.173236],[121.451773,31.173422],[121.452133,31.173623],[121.452294,31.173731],[121.452348,31.173854],[121.453015,31.17464],[121.453121,31.174414]]},{name:"混凝土制品二厂站",coords:[[121.453051,31.174724],[121.45332,31.174934],[121.454075,31.175366],[121.454434,31.175366],[121.454811,31.175382],[121.455386,31.17549],[121.455817,31.175581],[121.45715,31.175963],[121.457492,31.176102],[121.457941,31.176519],[121.45947,31.177722],[121.460083,31.178292],[121.460245,31.178431],[121.460353,31.178771],[121.461233,31.181242],[121.462098,31.182554],[121.46253,31.182646],[121.462961,31.18277],[121.463716,31.183464],[121.464812,31.183789],[121.468153,31.184221],[121.468854,31.184237],[121.469698,31.184175]]},{name:"虹梅南路桥站",coords:[[121.422019,31.144183],[121.423218,31.144619],[121.423901,31.144895],[121.424323,31.144995],[121.424691,31.145157],[121.425428,31.145822],[121.425501,31.146448],[121.425996,31.150712],[121.426151,31.150942],[121.427705,31.152248],[121.427863,31.152483]]},{name:"华东理工站1",coords:[[121.428217,31.152626],[121.428792,31.152796],[121.429583,31.152904],[121.430113,31.153135],[121.432171,31.153684],[121.432629,31.153769],[121.433177,31.153924],[121.433293,31.153799],[121.433365,31.153451],[121.433904,31.153304],[121.433769,31.152029],[121.433823,31.151898],[121.43412,31.151882],[121.434473,31.152009]]},{name:"华东理工站2",coords:[[121.429361,31.147461],[121.429657,31.147585],[121.429756,31.147731],[121.429774,31.14777],[121.429729,31.147824],[121.429621,31.147901],[121.429513,31.148156],[121.430125,31.148333],[121.430721,31.148446],[121.431311,31.148712],[121.431374,31.148712],[121.431518,31.148681],[121.431553,31.148696],[121.431913,31.148897],[121.432128,31.148897],[121.432497,31.148882],[121.432793,31.148951],[121.432946,31.14916],[121.432955,31.14933],[121.432551,31.150713],[121.432613,31.150806],[121.434322,31.151307],[121.434376,31.151377],[121.434133,31.151879],[121.434412,31.152003]]},{name:"老沪闵路二号桥站",coords:[[121.434439,31.152009],[121.435342,31.152277],[121.436197,31.152414],[121.436332,31.152546],[121.436359,31.15297],[121.437178,31.153215],[121.438292,31.153624],[121.439208,31.153678],[121.439343,31.153748],[121.440295,31.154281],[121.441006,31.153956],[121.44132,31.154072],[121.444663,31.154296],[121.446379,31.154558],[121.447179,31.154511],[121.448302,31.154581],[121.450323,31.154789],[121.451275,31.154789],[121.452254,31.155021],[121.45334,31.155196],[121.453373,31.155207],[121.454136,31.155169],[121.45484,31.155427],[121.455407,31.155412],[121.455577,31.155311],[121.455703,31.155121],[121.455478,31.1545],[121.455478,31.154199],[121.455586,31.153975],[121.455963,31.153836],[121.457302,31.153897],[121.457365,31.153889],[121.458147,31.153773],[121.458884,31.153901],[121.460815,31.154463],[121.462872,31.155265]]},{name:"植物园站1",coords:[[121.451575,31.158352],[121.452213,31.158453],[121.452761,31.158592],[121.452904,31.158182],[121.45303,31.157727],[121.453183,31.157062],[121.453183,31.156962],[121.453363,31.156892],[121.453506,31.156885],[121.454234,31.157047],[121.45445,31.156653],[121.45445,31.156645],[121.454432,31.156267],[121.454683,31.156019],[121.454917,31.155463],[121.45542,31.155417],[121.455577,31.155311],[121.455703,31.155121],[121.455478,31.1545],[121.455478,31.154199],[121.455586,31.153975],[121.455963,31.153836],[121.457302,31.153897],[121.457365,31.153889],[121.458147,31.153773],[121.458884,31.153901],[121.460815,31.154463],[121.462872,31.155265]]},{name:"罗秀路桥站",coords:[[121.452132,31.138007],[121.452628,31.13863],[121.453736,31.139325],[121.454625,31.140229],[121.454715,31.140414],[121.454328,31.141759],[121.453572,31.142191],[121.453392,31.14257],[121.453401,31.142639],[121.453895,31.143822],[121.45431,31.144254],[121.455037,31.144671],[121.455244,31.145158],[121.455083,31.146773],[121.455892,31.147831],[121.456458,31.148542],[121.456942,31.148493],[121.457059,31.148501],[121.459377,31.14874],[121.461299,31.149621]]},{name:"跑道公园站",coords:[[121.464387,31.167151],[121.462458,31.166783],[121.461147,31.166243],[121.460851,31.166266],[121.458721,31.16602],[121.458793,31.166507],[121.458622,31.16704],[121.458648,31.168109],[121.458127,31.168711],[121.457838,31.169276],[121.457622,31.169337],[121.456949,31.170457],[121.456814,31.170558],[121.456634,31.170898],[121.456724,31.171013],[121.456535,31.171415],[121.456535,31.171539],[121.456445,31.171624],[121.456356,31.172018],[121.456023,31.172744]]},{name:"机场新村站",coords:[[121.456042,31.172735],[121.456706,31.173253],[121.457578,31.173933],[121.458692,31.174636],[121.459141,31.175028],[121.459536,31.175499]]},{name:"凌云路桥站",coords:[[121.426801,31.14129],[121.428219,31.142114],[121.428498,31.142304],[121.429872,31.143],[121.430151,31.142892],[121.4313,31.139762],[121.431438,31.139214],[121.43315,31.134222],[121.442958,31.135302],[121.447161,31.135888],[121.452264,31.136167],[121.458099,31.136282],[121.463256,31.136406],[121.46498,31.136699],[121.465717,31.1369],[121.466633,31.137364],[121.46737,31.138136]]},{name:"华泾路桥站",coords:[[121.448552,31.123241],[121.448858,31.122128],[121.448894,31.121927],[121.449001,31.121526],[121.449477,31.120113],[121.449765,31.12012],[121.451678,31.121148],[121.451938,31.121219],[121.452172,31.121267],[121.452433,31.121846],[121.453952,31.122665],[121.454366,31.123143],[121.456163,31.124557],[121.456532,31.12489],[121.457115,31.124913],[121.457413,31.12539],[121.458419,31.126085],[121.459075,31.126455],[121.4609,31.126602],[121.461214,31.126579],[121.461843,31.127259],[121.462698,31.12762],[121.464728,31.12772],[121.465636,31.127967],[121.466085,31.12789],[121.466956,31.127975],[121.467433,31.128121],[121.4679,31.12816],[121.469268,31.129094],[121.470978,31.12926]]},{name:"长华路站",coords:[[121.450414,31.134972],[121.449812,31.136046],[121.452212,31.136154],[121.452264,31.136167],[121.458099,31.136282],[121.463256,31.136406],[121.46498,31.136699],[121.465717,31.1369],[121.466633,31.137364],[121.46737,31.138136]]},{name:"凌云路桥站",coords:[[121.426801,31.14129],[121.428219,31.142114],[121.428498,31.142304],[121.429872,31.143],[121.430151,31.142892],[121.4313,31.139762],[121.431438,31.139214],[121.433075,31.134142],[121.433117,31.133885],[121.433117,31.132448],[121.433763,31.131042],[121.434248,31.130717],[121.434374,31.130377],[121.437393,31.125261],[121.437842,31.12455],[121.438543,31.1239],[121.442698,31.119553],[121.443273,31.119753],[121.444315,31.118702],[121.444099,31.118424],[121.444225,31.118254],[121.444638,31.118378],[121.444818,31.118408],[121.445433,31.118468]]},{name:"曹联路桥站",coords:[[121.445816,31.118469],[121.448217,31.118957],[121.448974,31.119473],[121.449459,31.12003],[121.451938,31.121219],[121.452172,31.121267],[121.452433,31.121846],[121.453952,31.122665],[121.454366,31.123143],[121.456163,31.124557],[121.456532,31.12489],[121.457115,31.124913],[121.457413,31.12539],[121.458419,31.126085],[121.459075,31.126455],[121.4609,31.126602],[121.461214,31.126579],[121.461843,31.127259],[121.462698,31.12762],[121.464728,31.12772],[121.465636,31.127967],[121.466085,31.12789],[121.466956,31.127975],[121.467433,31.128121],[121.4679,31.12816],[121.469268,31.129094],[121.470978,31.12926]]},{name:"华泾出口站",coords:[[121.471007,31.129294],[121.471353,31.12921],[121.471955,31.128847],[121.472764,31.129209],[121.473007,31.12982],[121.474013,31.130137]]},{name:"关港入口站",coords:[[121.45635,31.111088],[121.456908,31.111196],[121.456854,31.110361],[121.45698,31.110099],[121.457159,31.110052],[121.45777,31.110145],[121.458722,31.110099],[121.460196,31.110717],[121.460716,31.110546],[121.46183,31.110639],[121.4621,31.11084],[121.462106,31.110864],[121.462573,31.111467],[121.464334,31.111343],[121.464544,31.111349],[121.465334,31.111503],[121.466322,31.111658]]}]}}]);