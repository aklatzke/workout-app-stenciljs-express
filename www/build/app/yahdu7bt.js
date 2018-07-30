/*! Built with http://stenciljs.com */
const{h:e}=window.App;import{a as t}from"./chunk-304dc430.js";var r=function(e,t,r,s){return new(r||(r=Promise))(function(i,o){function n(e){try{a(s.next(e))}catch(e){o(e)}}function c(e){try{a(s.throw(e))}catch(e){o(e)}}function a(e){e.done?i(e.value):new r(function(t){t(e.value)}).then(n,c)}a((s=s.apply(e,t||[])).next())})};class s{componentWillLoad(){return r(this,void 0,void 0,function*(){this.changeBack.emit("/workout/active"),this.setContextMenu.emit("");let e=yield t("http://localhost:8080/exercises/list");this.exercises=e})}renderGroups(){if(this.exercises)return e("div",{class:"row"},Object.keys(this.exercises).sort().map(t=>e("exercise-group",{activeWorkout:this.activeWorkout,title:t,records:this.exercises[t]})))}render(){return this.renderGroups()}static get is(){return"add-exercise"}static get properties(){return{activeWorkout:{type:String,attr:"active-workout"},exercises:{state:!0}}}static get events(){return[{name:"changeBack",method:"changeBack",bubbles:!0,cancelable:!0,composed:!0},{name:"setContextMenu",method:"setContextMenu",bubbles:!0,cancelable:!0,composed:!0}]}static get style(){return""}}var i=function(e,t,r,s){return new(r||(r=Promise))(function(i,o){function n(e){try{a(s.next(e))}catch(e){o(e)}}function c(e){try{a(s.throw(e))}catch(e){o(e)}}function a(e){e.done?i(e.value):new r(function(t){t(e.value)}).then(n,c)}a((s=s.apply(e,t||[])).next())})};class o{constructor(){this.expanded=!1}addExercise(e){return i(this,void 0,void 0,function*(){console.log(this.activeWorkout);let r=yield t(`http://localhost:8080/workout/${this.activeWorkout}/add/${e}`);console.log(r)})}renderItems(){if(this.expanded)return e("ul",{class:"col-12 pl-4 pr-4 exercise-records mt-4"},this.records.map(t=>e("li",{onClick:()=>this.addExercise(t._id)},t.name," ",e("i",{class:"fa fa-plus float-right"}))))}render(){return e("div",{class:"col-12 pt-2 pb-2 group "+(this.expanded?"group-expanded":"")},e("div",{class:"row"},e("div",{class:"col-10 offset-1",onClick:()=>this.expanded=!this.expanded},e("h6",null,this.title," ",this.expanded?e("i",{class:"fa fa-caret-up float-right"}):e("i",{class:"fa fa-caret-down float-right"}))),this.renderItems()))}static get is(){return"exercise-group"}static get properties(){return{activeWorkout:{type:String,attr:"active-workout"},expanded:{state:!0},records:{type:"Any",attr:"records"},title:{type:String,attr:"title"}}}static get style(){return"exercise-group{width:100%}.group{background-color:#444;border-bottom:1px solid #222}.group h6{margin:0}.group i{font-size:18px}.group-expanded{background-color:#fff}.group-expanded h6{color:#444}.exercise-records li{list-style-type:none;border-bottom:1px solid #cdcdcd;padding-top:7px;padding-bottom:7px;text-transform:capitalize;font-weight:700}.exercise-records li i{font-size:12px;position:relative;top:4px}"}}export{s as AddExercise,o as ExerciseGroup};