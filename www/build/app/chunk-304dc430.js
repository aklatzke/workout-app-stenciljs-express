/*! Built with http://stenciljs.com */
const{h:a}=window.App,t=async(a,t={})=>{let e=await fetch(a,{method:"POST",cache:"no-cache",headers:{"Content-Type":"application/json; charset=utf-8"},body:JSON.stringify(t)});return e&&(e=await e.json()),e},e=async a=>{let t=await fetch(a);return t&&(t=await t.json()),t};export{e as a,t as b};