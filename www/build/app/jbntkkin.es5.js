/*! Built with http://stenciljs.com */
App.loadBundle("jbntkkin",["exports","./chunk-cc815410.js"],function(t,e){var i=window.App.h,r=function(){function t(){this.unsubscribe=function(){},this.activeClass="link-active",this.exact=!1,this.strict=!0,this.custom="a",this.match=null}return t.prototype.componentWillLoad=function(){this.computeMatch()},t.prototype.computeMatch=function(){this.location&&(this.match=e.matchPath(this.location.pathname,{path:this.urlMatch||this.url,exact:this.exact,strict:this.strict}))},t.prototype.handleClick=function(t){if(!e.isModifiedEvent(t))return t.preventDefault(),this.history.push(this.getUrl(this.url))},t.prototype.getUrl=function(t){return"/"==t.charAt(0)&&"/"==this.root.charAt(this.root.length-1)?this.root.slice(0,this.root.length-1)+t:this.root+t},t.prototype.render=function(){var t,e={class:(t={},t[this.activeClass]=null!==this.match,t),onClick:this.handleClick.bind(this)};return this.anchorClass&&(e.class[this.anchorClass]=!0),"a"===this.custom&&(e=Object.assign({},e,{href:this.url,title:this.anchorTitle,role:this.anchorRole,tabindex:this.anchorTabIndex})),i(this.custom,Object.assign({},e),i("slot",null))},Object.defineProperty(t,"is",{get:function(){return"stencil-route-link"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{activeClass:{type:String,attr:"active-class"},anchorClass:{type:String,attr:"anchor-class"},anchorRole:{type:String,attr:"anchor-role"},anchorTabIndex:{type:String,attr:"anchor-tab-index"},anchorTitle:{type:String,attr:"anchor-title"},custom:{type:String,attr:"custom"},el:{elementRef:!0},exact:{type:Boolean,attr:"exact"},history:{type:"Any",attr:"history"},location:{type:"Any",attr:"location",watchCallbacks:["computeMatch"]},match:{state:!0},root:{type:String,attr:"root"},strict:{type:Boolean,attr:"strict"},url:{type:String,attr:"url"},urlMatch:{type:String,attr:"url-match"}}},enumerable:!0,configurable:!0}),t}();e.ActiveRouter.injectProps(r,["history","location","root"]),t.StencilRouteLink=r,Object.defineProperty(t,"__esModule",{value:!0})});