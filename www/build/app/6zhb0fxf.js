/*! Built with http://stenciljs.com */
const{h:t}=window.App;import{a as n}from"./chunk-304dc430.js";var o=function(t,n,o,e){return new(o||(o=Promise))(function(r,i){function u(t){try{c(e.next(t))}catch(t){i(t)}}function s(t){try{c(e.throw(t))}catch(t){i(t)}}function c(t){t.done?r(t.value):new o(function(n){n(t.value)}).then(u,s)}c((e=e.apply(t,n||[])).next())})};class e{constructor(){this.componentDidLoad=(()=>o(this,void 0,void 0,function*(){let t=yield n(`/user/workouts?uid=${this.uid}`);console.log(t)}))}render(){return null}static get is(){return"display-workouts"}static get properties(){return{uid:{type:String,attr:"uid"}}}static get style(){return".app-home{padding:10px}button{background:#5851ff;color:#fff;margin:8px;border:none;font-size:13px;font-weight:700;text-transform:uppercase;padding:16px 20px;border-radius:2px;-webkit-box-shadow:0 8px 16px rgba(0,0,0,.1),0 3px 6px rgba(0,0,0,.08);box-shadow:0 8px 16px rgba(0,0,0,.1),0 3px 6px rgba(0,0,0,.08);outline:0;letter-spacing:.04em;-webkit-transition:all .15s ease;transition:all .15s ease;cursor:pointer}button:hover{-webkit-box-shadow:0 3px 6px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.1);box-shadow:0 3px 6px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.1);-webkit-transform:translateY(1px);transform:translateY(1px)}"}}export{e as DisplayWorkouts};