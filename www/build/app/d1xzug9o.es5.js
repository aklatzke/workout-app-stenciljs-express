/*! Built with http://stenciljs.com */
var __generator=this&&this.__generator||function(t,e){var n,o,r,i,u={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return i={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function c(i){return function(c){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;u;)try{if(n=1,o&&(r=2&i[0]?o.return:i[0]?o.throw||((r=o.return)&&r.call(o),0):o.next)&&!(r=r.call(o,i[1])).done)return r;switch(o=0,r&&(i=[2&i[0],r.value]),i[0]){case 0:case 1:r=i;break;case 4:return u.label++,{value:i[1],done:!1};case 5:u.label++,o=i[1],i=[0];continue;case 7:i=u.ops.pop(),u.trys.pop();continue;default:if(!(r=(r=u.trys).length>0&&r[r.length-1])&&(6===i[0]||2===i[0])){u=0;continue}if(3===i[0]&&(!r||i[1]>r[0]&&i[1]<r[3])){u.label=i[1];break}if(6===i[0]&&u.label<r[1]){u.label=r[1],r=i;break}if(r&&u.label<r[2]){u.label=r[2],u.ops.push(i);break}r[2]&&u.ops.pop(),u.trys.pop();continue}i=e.call(t,u)}catch(t){i=[6,t],o=0}finally{n=r=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,c])}}};App.loadBundle("d1xzug9o",["exports","./chunk-807bbfbc.js"],function(t,e){var n=window.App.h,o=function(){function t(){this.list=[]}return t.prototype.componentDidLoad=function(){return t=this,n=void 0,r=function(){var t;return __generator(this,function(n){switch(n.label){case 0:return[4,e.get("http://localhost:8080/user/exercises/all/?uid="+this.uid)];case 1:return t=n.sent(),this.list=t.slice(),[2]}})},new((o=void 0)||(o=Promise))(function(e,i){function u(t){try{l(r.next(t))}catch(t){i(t)}}function c(t){try{l(r.throw(t))}catch(t){i(t)}}function l(t){t.done?e(t.value):new o(function(e){e(t.value)}).then(u,c)}l((r=r.apply(t,n||[])).next())});var t,n,o,r},t.prototype.render=function(){return n("div",null,n("h4",null,"Graphs & Data"),n("hr",null),this.list.map(function(t){return n("stencil-route-link",{url:"/exercise/"+t._id},n("button",{class:"btn btn-primary btn-sm mr-2 mb-2"},t.name))}))},Object.defineProperty(t,"is",{get:function(){return"workout-list"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{list:{state:!0},uid:{type:String,attr:"uid"}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return""},enumerable:!0,configurable:!0}),t}(),r=function(t,e,n,o){return new(n||(n=Promise))(function(r,i){function u(t){try{l(o.next(t))}catch(t){i(t)}}function c(t){try{l(o.throw(t))}catch(t){i(t)}}function l(t){t.done?r(t.value):new n(function(e){e(t.value)}).then(u,c)}l((o=o.apply(t,e||[])).next())})},i=function(){function t(){var t=this;this.plotly=window.Plotly,this.componentDidLoad=function(){return r(t,void 0,void 0,function(){var t,n,o,r,i,u,c,l,s,a,f;return __generator(this,function(b){switch(b.label){case 0:return[4,e.get("http://localhost:8080/user/"+this.uid+"/workouts/overview")];case 1:return t=b.sent(),n=Object.keys(t.favWorkouts),o=n.map(function(e){return t.favWorkouts[e]}),r=document.querySelector("#favorite-workouts"),i=Object.keys(t.favExercises).slice(0,5),u=i.map(function(e){return t.favExercises[e]}),c=document.querySelector("#favorite-exercises"),this.changeBack.emit(!1),this.setContextMenu.emit(this.contextMenu()),l={margin:{l:50,r:50,t:50,b:70,pad:0},plot_bgcolor:"#343434",paper_bgcolor:"#343434",yaxis:{tickcolor:"#fff",tickfont:{color:"#fff"},line:{color:"#fff"}},xaxis:{tickcolor:"#fff",tickfont:{color:"#fff"}}},s={type:"pie",labels:n,values:o},a=Object.assign({},s,{textinfo:"percent",textposition:"outside",showlegend:!1,textfont:{color:"#fff"}}),f=Object.assign({},s,{textinfo:"label",textposition:"inside",showlegend:!1,textfont:{color:"#fff"}}),this.plotly.plot(r,[a,f],Object.assign({},l,{textposition:"outside"})),this.plotly.plot(c,[{type:"bar",x:i,y:u}],l),[2]}})})}}return t.prototype.contextMenu=function(){return n("stencil-route-link",{url:""},n("button",{class:"btn btn-sm btn-primary btn-just-icon"},n("i",{class:"fa fa-user"})))},t.prototype.renderWorkoutButton=function(){return this.hasActiveWorkout?n("stencil-route-link",{url:"/workout/active"},n("button",{class:"btn btn-block btn-sm btn-outline-primary"},"Active Workout")):n("stencil-route-link",{url:"/workout/new"},n("button",{class:"btn btn-block btn-sm btn-outline-primary"},"Start Workout"))},t.prototype.render=function(){return n("div",{class:"graph-container pl-2 pr-2"},n("h3",null,"Dashboard"),n("hr",null),n("div",{class:"row"},n("div",{class:"col-12"},this.renderWorkoutButton())),n("hr",null),n("div",{class:"row"},n("div",{class:"col-12 col-md-5 offset-md-1"},n("h4",null,"Most Performed Routines"),n("div",{id:"favorite-workouts"})),n("div",{class:"col-12 col-md-5 offset-md-1"},n("h4",null,"Most Performed Excercises"),n("div",{id:"favorite-exercises"}))),n("div",{class:"row"},n("div",{class:"col-12"},n("workout-list",{uid:this.uid}))))},Object.defineProperty(t,"is",{get:function(){return"workouts-dashboard"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{hasActiveWorkout:{type:Boolean,attr:"has-active-workout"},uid:{type:String,attr:"uid"}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"events",{get:function(){return[{name:"changeBack",method:"changeBack",bubbles:!0,cancelable:!0,composed:!0},{name:"setContextMenu",method:"setContextMenu",bubbles:!0,cancelable:!0,composed:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return""},enumerable:!0,configurable:!0}),t}();t.WorkoutList=o,t.WorkoutsDashboard=i,Object.defineProperty(t,"__esModule",{value:!0})});