!function(e){function t(t){for(var r,i,a=t[0],c=t[1],u=t[2],f=0,p=[];f<a.length;f++)i=a[f],Object.prototype.hasOwnProperty.call(o,i)&&o[i]&&p.push(o[i][0]),o[i]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);for(s&&s(t);p.length;)p.shift()();return l.push.apply(l,u||[]),n()}function n(){for(var e,t=0;t<l.length;t++){for(var n=l[t],r=!0,a=1;a<n.length;a++){var c=n[a];0!==o[c]&&(r=!1)}r&&(l.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},o={3:0},l=[];function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="";var a=window.webpackJsonp=window.webpackJsonp||[],c=a.push.bind(a);a.push=t,a=a.slice();for(var u=0;u<a.length;u++)t(a[u]);var s=c;l.push([9,0]),n()}([,function(e,t,n){var r=n(0),o=n(2);"string"==typeof(o=o.__esModule?o.default:o)&&(o=[[e.i,o,""]]);var l={insert:"head",singleton:!1};r(o,l);e.exports=o.locals||{}},function(e,t,n){},function(e,t,n){var r=n(0),o=n(4);"string"==typeof(o=o.__esModule?o.default:o)&&(o=[[e.i,o,""]]);var l={insert:"head",singleton:!1};r(o,l);e.exports=o.locals||{}},function(e,t,n){},function(e,t,n){var r=n(0),o=n(6);"string"==typeof(o=o.__esModule?o.default:o)&&(o=[[e.i,o,""]]);var l={insert:"head",singleton:!1};r(o,l);e.exports=o.locals||{}},function(e,t,n){},function(e,t){var n=document,r=n.getElementById("cross"),o=n.getElementById("menu"),l=n.getElementById("aside");o.addEventListener("click",(function(){l.style.left="0px"})),r.addEventListener("click",(function(){l.style.left="-302px"}))},,function(e,t,n){"use strict";n.r(t);n(8),n(1),n(3),n(5),n(11),n(7);var r=document,o=r.querySelectorAll(".task__answer"),l=r.querySelectorAll(".task__decision");window.onload=function(){for(var e=r.querySelectorAll(".task"),t=r.querySelectorAll(".task").length-1,n=0;n<=t;n++){var o=String(localStorage.getItem("task_".concat(n+1)));"true"==o&&(e[n].style.color="#329A36"),"false"==o&&(e[n].style.color="#CD5035"),"null"==o&&(e[n].style.color="#333")}};var i={1:10,2:5};o.forEach((function(e){e.addEventListener("click",(function(){var t=prompt("Введите ответ - одно число"),n=e.parentElement.parentElement.id.split("_")[1],r=!1;t==i[n]?(e.parentElement.previousElementSibling.style.color="#329A36",r=!0):e.parentElement.previousElementSibling.style.color="#CD5035",localStorage.setItem("task_".concat(n),String(r))}))})),l.forEach((function(e){e.addEventListener("click",(function(){var t=e.parentElement.parentElement.id.split("_")[1];alert(i[t])}))}))},,function(e,t,n){var r=n(0),o=n(12);"string"==typeof(o=o.__esModule?o.default:o)&&(o=[[e.i,o,""]]);var l={insert:"head",singleton:!1};r(o,l);e.exports=o.locals||{}},function(e,t,n){}]);