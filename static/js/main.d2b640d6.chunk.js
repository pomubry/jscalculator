(this["webpackJsonpjavascript-calculator"]=this["webpackJsonpjavascript-calculator"]||[]).push([[0],{11:function(t,e,a){t.exports=a.p+"static/media/github.0a3a0978.svg"},17:function(t,e,a){t.exports=a(24)},22:function(t,e,a){},24:function(t,e,a){"use strict";a.r(e);var n=a(1),l=a.n(n),i=a(8),c=a.n(i),s=(a(22),a(9)),r=a(10),o=a(15),u=a(14),d=a(26),v=[{id:"zero",text:"0",value:0},{id:"one",text:"1",value:1},{id:"two",text:"2",value:2},{id:"three",text:"3",value:3},{id:"four",text:"4",value:4},{id:"five",text:"5",value:5},{id:"six",text:"6",value:6},{id:"seven",text:"7",value:7},{id:"eight",text:"8",value:8},{id:"nine",text:"9",value:9},{id:"add",text:"+",value:"+"},{id:"subtract",text:"-",value:"-"},{id:"multiply",text:"x",value:"*"},{id:"divide",text:"\xf7",value:"/"},{id:"clear",text:"AC",value:"clear"},{id:"equals",text:"=",value:"equals"},{id:"decimal",text:".",value:"."}];var h=function(t){var e=t.stateCopy,a=t.handleClick,n=e.total,i=e.input,c=v.map((function(t){return l.a.createElement("button",{key:t.id,id:t.id,onClick:a,value:t.value},t.text)}));return l.a.createElement("div",{className:"calc"},l.a.createElement("div",{className:"displayStyle"},l.a.createElement("div",{className:"total",style:{height:"100%"}},n.length>22?"...".concat(n.slice(n.length-22)):n),l.a.createElement("div",{id:"display"},i.length>22?"...".concat(i.slice(i.length-22)):i)),l.a.createElement("div",{className:"buttons"},c))},m=a(11),p=a.n(m),f=function(t){Object(o.a)(a,t);var e=Object(u.a)(a);function a(){var t;Object(s.a)(this,a);for(var n=arguments.length,l=new Array(n),i=0;i<n;i++)l[i]=arguments[i];return(t=e.call.apply(e,[this].concat(l))).state={total:"",input:"0",ans:""},t.handleClick=function(e){var a=e.target.value,n=t.state,l=n.input,i=n.total,c=n.ans,s=/[+\-*/]/,r=/[0-9]|\./,o=i[i.length-1],u=i[i.length-2];if("clear"===a)t.setState({total:"",input:"0",ans:""});else{if("0"===a&&"0"===i||"."===a&&l.includes(a)&&!c||s.test(a)&&""===i)return null;if(r.test(a)){var v="."===a?"0.":a;t.setState((function(t){return{total:"."===a&&s.test(o)?t.total+"0.":i.includes("=")||""===i?v:"0"===i&&"."!==a?a:"0"===a&&/[+\-*/]0/.test(u+o)?t.total:/[1-9]/.test(a)&&/[+\-*/]0/.test(u+o)?t.total.slice(0,t.total.length-1)+a:t.total+a,input:"."===a&&s.test(o)?"0.":i.includes("=")||""===i?v:"0"!==l&&!s.test(o)||"."===a?t.input+a:a,ans:""}}))}else if(s.test(a)){var h=r.test(o)||"-"===a&&/[0-9][+*/]/.test(u+o)?0:/[+\-*/]-/.test(u+"-")?-2:"-"===a&&"-"===o?null:-1,m=i.slice(0,i.length+h);i.includes("=")?t.setState((function(t){return{total:t.ans+a,input:a,ans:""}})):null===h?t.setState({total:i,input:l,ans:c}):t.setState({total:m+a,input:a})}else"equals"===a&&r.test(o)&&!i.includes("=")&&t.setState((function(t){var e=Object(d.a)(t.total);return{total:"".concat(t.total,"=").concat(e),input:"".concat(e),ans:e}}))}},t}return Object(r.a)(a,[{key:"render",value:function(){return l.a.createElement("div",{className:"App"},l.a.createElement("h1",null,"Javascript Calculator"),l.a.createElement(h,{stateCopy:this.state,handleClick:this.handleClick}),l.a.createElement("div",{className:"credits"},l.a.createElement("p",null,"Designed and Coded By"),l.a.createElement("a",{href:"https://github.com/pomubry"},l.a.createElement("img",{src:p.a,alt:"github icon"}),"Bryan Taduran")))}}]),a}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(f,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))}},[[17,1,2]]]);
//# sourceMappingURL=main.d2b640d6.chunk.js.map