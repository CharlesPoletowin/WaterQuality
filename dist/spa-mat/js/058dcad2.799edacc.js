(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["058dcad2"],{"22b6":function(t,e,n){"use strict";n("551c");var a=n("bc3a"),r=n.n(a),o=n("133b");n("f751"),n("a60d"),n("c5f6"),n("3b2b"),n("6b54");function i(t){o["a"].create({color:"warning",icon:"report_problem",position:"top",message:t})}function c(t){console.log("errorState============="),t&&i(t.status+" : "+t.statusText)}function s(t){return console.log("successState============="),t.data}r.a.interceptors.request.use(function(t){return t},function(t){return Promise.reject(t)}),r.a.interceptors.response.use(function(t){return t},function(t){return Promise.reject(t.response)});var l=function(t,e){var n={method:t.method,baseURL:"",url:t.url,params:e,data:e,headers:"get"===t.method?{Accept:"application/json","Content-Type":"application/json; charset=UTF-8"}:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"}};"get"===t.method?delete n.data:delete n.params;var a=new Promise(function(t,e){r()(n).then(function(e){t(s(e))}).catch(function(t){c(t),e(t)})});return a};e["a"]=l},"3b2b":function(t,e,n){var a=n("7726"),r=n("5dbc"),o=n("86cc").f,i=n("9093").f,c=n("aae3"),s=n("0bfb"),l=a.RegExp,u=l,p=l.prototype,f=/a/g,d=/a/g,m=new l(f)!==f;if(n("9e1e")&&(!m||n("79e5")(function(){return d[n("2b4c")("match")]=!1,l(f)!=f||l(d)==d||"/a/i"!=l(f,"i")}))){l=function(t,e){var n=this instanceof l,a=c(t),o=void 0===e;return!n&&a&&t.constructor===l&&o?t:r(m?new u(a&&!o?t.source:t,e):u((a=t instanceof l)?t.source:t,a&&o?s.call(t):e),n?this:p,l)};for(var b=function(t){t in l||o(l,t,{configurable:!0,get:function(){return u[t]},set:function(e){u[t]=e}})},h=i(u),g=0;h.length>g;)b(h[g++]);p.constructor=l,l.prototype=p,n("2aba")(a,"RegExp",l)}n("7a56")("RegExp")},a474:function(t,e,n){"use strict";var a="http://210.14.69.81:5000",r="http://10.200.43.5:5001";r="http://10.200.43.5:5001";var o={abnormal:{url:r+"/api/water/abnormals",method:"get"},elements:{url:r+"/api/water/elements_normalized",method:"get"},health:{url:a+"/api/health",method:"get"},recent:{url:r+"/api/water/recent",method:"get"},logout:{url:a+"/api/logout",method:"get"}};e["a"]=o},b656:function(t,e,n){"use strict";var a=n("d9be"),r=n.n(a);r.a},d9be:function(t,e,n){},f241:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("q-layout",{attrs:{view:"lHh Lpr lFf"}},[n("q-layout-header",[n("q-toolbar",[n("q-btn",{attrs:{flat:"",dense:"",round:"","aria-label":"Menu"},on:{click:function(e){t.leftDrawerOpen=!t.leftDrawerOpen}}},[n("q-icon",{attrs:{name:"menu"}})],1),n("q-toolbar-title",[t._v("\n        中央研究院大数据展示平台\n      ")]),n("q-btn",{attrs:{flat:"",round:"",dense:"",icon:"power_settings_new"},on:{click:t.backtoLogin}})],1)],1),n("q-layout-drawer",{attrs:{behavior:"mobile","content-style":{"margin-top":"50px","width ":"240px"},"content-class":"mat"===t.$q.theme?"bg-primary text-grey-3 text-weight-thin":null},model:{value:t.leftDrawerOpen,callback:function(e){t.leftDrawerOpen=e},expression:"leftDrawerOpen"}},[n("q-list",{attrs:{"no-border":"",link:"","inset-delimiter":""}},[n("q-list-header",{staticClass:"text-grey-6"},[t._v("功能菜单")]),n("q-item",{attrs:{to:"/"}},[n("q-item-side",{attrs:{icon:"waves",color:"grey-5"}}),n("q-item-main",{attrs:{label:"水质监测"}})],1),n("q-item",{attrs:{to:"/waterMark"}},[n("q-item-side",{attrs:{icon:"whatshot",color:"grey-5"}}),n("q-item-main",{attrs:{label:"异常标记"}})],1),n("q-item",{attrs:{to:"/waterAnalysis"}},[n("q-item-side",{attrs:{icon:"attach_file",color:"grey-5"}}),n("q-item-main",{attrs:{label:"原位水质监测"}})],1)],1)],1),n("q-page-container",{staticClass:"bg-primary"},[n("router-view")],1)],1)},r=[];a._withStripped=!0;var o=n("a60d"),i=function(t,e){if(o["a"].is.cordova&&navigator&&navigator.app)return navigator.app.loadUrl(t,{openExternal:!0});var n=window.open(t,"_blank");if(n)return n.focus(),n;e&&e()},c=(n("a474"),n("22b6"),{name:"MyLayout",data:function(){return{leftDrawerOpen:this.$q.platform.is.desktop}},methods:{openURL:i,backtoLogin:function(){window.location.href="http://210.14.69.81:5000/logout"}}}),s=c,l=(n("b656"),n("2877")),u=Object(l["a"])(s,a,r,!1,null,null,null);u.options.__file="MyLayout.vue";e["default"]=u.exports}}]);