/*! Built with http://stenciljs.com */
App.loadBundle("cotdvesv",["exports"],function(e){var t=window.App.h,o=function(){function e(){}return e.prototype.render=function(){return t("div",{class:"app-home"},t("stencil-router",null,t("stencil-route-switch",{scrollTopOffset:0},t("stencil-route",{url:"/history",component:"display-workouts",componentProps:{uid:this.uid}}),t("stencil-route",{url:"/",component:"workouts-dashboard",exact:!0,componentProps:{uid:this.uid}}))))},Object.defineProperty(e,"is",{get:function(){return"app-home"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{uid:{type:String,attr:"uid"}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return".app-home{padding:10px}button{background:#5851ff;color:#fff;margin:8px;border:none;font-size:13px;font-weight:700;text-transform:uppercase;padding:16px 20px;border-radius:2px;-webkit-box-shadow:0 8px 16px rgba(0,0,0,.1),0 3px 6px rgba(0,0,0,.08);box-shadow:0 8px 16px rgba(0,0,0,.1),0 3px 6px rgba(0,0,0,.08);outline:0;letter-spacing:.04em;-webkit-transition:all .15s ease;transition:all .15s ease;cursor:pointer}button:hover{-webkit-box-shadow:0 3px 6px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.1);box-shadow:0 3px 6px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.1);-webkit-transform:translateY(1px);transform:translateY(1px)}"},enumerable:!0,configurable:!0}),e}();e.AppHome=o,Object.defineProperty(e,"__esModule",{value:!0})});