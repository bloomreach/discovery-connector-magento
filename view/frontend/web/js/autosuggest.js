!function(){"use strict";const e=Object.assign(Object.assign({},window.BloomreachModules?window.BloomreachModules:{}),{version:"3.0.1"});var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function n(e){var t=e.default;if("function"==typeof t){var n=function(){return t.apply(this,arguments)};n.prototype=t.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(e).forEach((function(t){var r=Object.getOwnPropertyDescriptor(e,t);Object.defineProperty(n,t,r.get?r:{enumerable:!0,get:function(){return e[t]}})})),n}var r={},o=n(Object.freeze({__proto__:null,default:{}}));function i(e,t){for(var n=0,r=e.length-1;r>=0;r--){var o=e[r];"."===o?e.splice(r,1):".."===o?(e.splice(r,1),n++):n&&(e.splice(r,1),n--)}if(t)for(;n--;n)e.unshift("..");return e}var s=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,a=function(e){return s.exec(e).slice(1)};function u(){for(var e="",t=!1,n=arguments.length-1;n>=-1&&!t;n--){var r=n>=0?arguments[n]:"/";if("string"!=typeof r)throw new TypeError("Arguments to path.resolve must be strings");r&&(e=r+"/"+e,t="/"===r.charAt(0))}return(t?"/":"")+(e=i(v(e.split("/"),(function(e){return!!e})),!t).join("/"))||"."}function c(e){var t=l(e),n="/"===_(e,-1);return(e=i(v(e.split("/"),(function(e){return!!e})),!t).join("/"))||t||(e="."),e&&n&&(e+="/"),(t?"/":"")+e}function l(e){return"/"===e.charAt(0)}function d(){var e=Array.prototype.slice.call(arguments,0);return c(v(e,(function(e,t){if("string"!=typeof e)throw new TypeError("Arguments to path.join must be strings");return e})).join("/"))}function g(e,t){function n(e){for(var t=0;t<e.length&&""===e[t];t++);for(var n=e.length-1;n>=0&&""===e[n];n--);return t>n?[]:e.slice(t,n-t+1)}e=u(e).substr(1),t=u(t).substr(1);for(var r=n(e.split("/")),o=n(t.split("/")),i=Math.min(r.length,o.length),s=i,a=0;a<i;a++)if(r[a]!==o[a]){s=a;break}var c=[];for(a=s;a<r.length;a++)c.push("..");return(c=c.concat(o.slice(s))).join("/")}function f(e){var t=a(e),n=t[0],r=t[1];return n||r?(r&&(r=r.substr(0,r.length-1)),n+r):"."}function p(e,t){var n=a(e)[2];return t&&n.substr(-1*t.length)===t&&(n=n.substr(0,n.length-t.length)),n}function m(e){return a(e)[3]}var h={extname:m,basename:p,dirname:f,sep:"/",delimiter:":",relative:g,join:d,isAbsolute:l,normalize:c,resolve:u};function v(e,t){if(e.filter)return e.filter(t);for(var n=[],r=0;r<e.length;r++)t(e[r],r,e)&&n.push(e[r]);return n}var _="b"==="ab".substr(-1)?function(e,t,n){return e.substr(t,n)}:function(e,t,n){return t<0&&(t=e.length+t),e.substr(t,n)},b=n(Object.freeze({__proto__:null,resolve:u,normalize:c,isAbsolute:l,join:d,relative:g,sep:"/",delimiter:":",dirname:f,basename:p,extname:m,default:h})),y={};!function(e){var t=/[|\\{}()[\]^$+*?.]/g,n=Object.prototype.hasOwnProperty,r=function(e,t){return n.apply(e,[t])};e.escapeRegExpChars=function(e){return e?String(e).replace(t,"\\$&"):""};var o={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&#34;","'":"&#39;"},i=/[&<>'"]/g;function s(e){return o[e]||e}e.escapeXML=function(e){return null==e?"":String(e).replace(i,s)},e.escapeXML.toString=function(){return Function.prototype.toString.call(this)+';\nvar _ENCODE_HTML_RULES = {\n      "&": "&amp;"\n    , "<": "&lt;"\n    , ">": "&gt;"\n    , \'"\': "&#34;"\n    , "\'": "&#39;"\n    }\n  , _MATCH_HTML = /[&<>\'"]/g;\nfunction encode_char(c) {\n  return _ENCODE_HTML_RULES[c] || c;\n};\n'},e.shallowCopy=function(e,t){if(t=t||{},null!=e)for(var n in t)r(t,n)&&"__proto__"!==n&&"constructor"!==n&&(e[n]=t[n]);return e},e.shallowCopyFromList=function(e,t,n){if(n=n||[],t=t||{},null!=e)for(var o=0;o<n.length;o++){var i=n[o];if(void 0!==t[i]){if(!r(t,i))continue;if("__proto__"===i||"constructor"===i)continue;e[i]=t[i]}}return e},e.cache={_data:{},set:function(e,t){this._data[e]=t},get:function(e){return this._data[e]},remove:function(e){delete this._data[e]},reset:function(){this._data={}}},e.hyphenToCamel=function(e){return e.replace(/-[a-z]/g,(function(e){return e[1].toUpperCase()}))},e.createNullProtoObjWherePossible="function"==typeof Object.create?function(){return Object.create(null)}:{__proto__:null}instanceof Object?function(){return{}}:function(){return{__proto__:null}}}(y);var w="3.1.8";!function(e){
/**
  	 * @file Embedded JavaScript templating engine. {@link http://ejs.co}
  	 * @author Matthew Eernisse <mde@fleegix.org>
  	 * @author Tiancheng "Timothy" Gu <timothygu99@gmail.com>
  	 * @project EJS
  	 * @license {@link http://www.apache.org/licenses/LICENSE-2.0 Apache License, Version 2.0}
  	 */
var t=o,n=b,r=y,i=!1,s=w,a="locals",u=["delimiter","scope","context","debug","compileDebug","client","_with","rmWhitespace","strict","filename","async"],c=u.concat("cache"),l=/^\uFEFF/,d=/^[a-zA-Z_$][0-9a-zA-Z_$]*$/;function g(n,r){var o;if(r.some((function(r){return o=e.resolveInclude(n,r,!0),t.existsSync(o)})))return o}function f(t,n){var r,o=t.filename,i=arguments.length>1;if(t.cache){if(!o)throw new Error("cache option requires a filename");if(r=e.cache.get(o))return r;i||(n=m(o).toString().replace(l,""))}else if(!i){if(!o)throw new Error("Internal EJS error: no file name or template provided");n=m(o).toString().replace(l,"")}return r=e.compile(n,t),t.cache&&e.cache.set(o,r),r}function p(t,n,r){var o;if(!r){if("function"==typeof e.promiseImpl)return new e.promiseImpl((function(e,r){try{e(o=f(t)(n))}catch(e){r(e)}}));throw new Error("Please provide a callback function")}try{o=f(t)(n)}catch(e){return r(e)}r(null,o)}function m(t){return e.fileLoader(t)}function h(n,o){var i=r.shallowCopy(r.createNullProtoObjWherePossible(),o);if(i.filename=function(n,r){var o,i,s=r.views,a=/^[A-Za-z]+:\\|^\//.exec(n);if(a&&a.length)n=n.replace(/^\/*/,""),o=Array.isArray(r.root)?g(n,r.root):e.resolveInclude(n,r.root||"/",!0);else if(r.filename&&(i=e.resolveInclude(n,r.filename),t.existsSync(i)&&(o=i)),!o&&Array.isArray(s)&&(o=g(n,s)),!o&&"function"!=typeof r.includer)throw new Error('Could not find the include file "'+r.escapeFunction(n)+'"');return o}(n,i),"function"==typeof o.includer){var s=o.includer(n,i.filename);if(s&&(s.filename&&(i.filename=s.filename),s.template))return f(i,s.template)}return f(i)}function v(e,t,n,r,o){var i=t.split("\n"),s=Math.max(r-3,0),a=Math.min(i.length,r+3),u=o(n),c=i.slice(s,a).map((function(e,t){var n=t+s+1;return(n==r?" >> ":"    ")+n+"| "+e})).join("\n");throw e.path=u,e.message=(u||"ejs")+":"+r+"\n"+c+"\n\n"+e.message,e}function _(e){return e.replace(/;(\s*$)/,"$1")}function x(t,n){n=n||r.createNullProtoObjWherePossible();var o=r.createNullProtoObjWherePossible();this.templateText=t,this.mode=null,this.truncate=!1,this.currentLine=1,this.source="",o.client=n.client||!1,o.escapeFunction=n.escape||n.escapeFunction||r.escapeXML,o.compileDebug=!1!==n.compileDebug,o.debug=!!n.debug,o.filename=n.filename,o.openDelimiter=n.openDelimiter||e.openDelimiter||"<",o.closeDelimiter=n.closeDelimiter||e.closeDelimiter||">",o.delimiter=n.delimiter||e.delimiter||"%",o.strict=n.strict||!1,o.context=n.context,o.cache=n.cache||!1,o.rmWhitespace=n.rmWhitespace,o.root=n.root,o.includer=n.includer,o.outputFunctionName=n.outputFunctionName,o.localsName=n.localsName||e.localsName||a,o.views=n.views,o.async=n.async,o.destructuredLocals=n.destructuredLocals,o.legacyInclude=void 0===n.legacyInclude||!!n.legacyInclude,o.strict?o._with=!1:o._with=void 0===n._with||n._with,this.opts=o,this.regex=this.createRegex()}e.cache=r.cache,e.fileLoader=t.readFileSync,e.localsName=a,e.promiseImpl=new Function("return this;")().Promise,e.resolveInclude=function(e,t,r){var o=n.dirname,i=n.extname,s=(0,n.resolve)(r?t:o(t),e);return i(e)||(s+=".ejs"),s},e.compile=function(e,t){return t&&t.scope&&(i||(console.warn("`scope` option is deprecated and will be removed in EJS 3"),i=!0),t.context||(t.context=t.scope),delete t.scope),new x(e,t).compile()},e.render=function(e,t,n){var o=t||r.createNullProtoObjWherePossible(),i=n||r.createNullProtoObjWherePossible();return 2==arguments.length&&r.shallowCopyFromList(i,o,u),f(i,e)(o)},e.renderFile=function(){var e,t,n,o=Array.prototype.slice.call(arguments),i=o.shift(),s={filename:i};return"function"==typeof arguments[arguments.length-1]&&(e=o.pop()),o.length?(t=o.shift(),o.length?r.shallowCopy(s,o.pop()):(t.settings&&(t.settings.views&&(s.views=t.settings.views),t.settings["view cache"]&&(s.cache=!0),(n=t.settings["view options"])&&r.shallowCopy(s,n)),r.shallowCopyFromList(s,t,c)),s.filename=i):t=r.createNullProtoObjWherePossible(),p(s,t,e)},e.Template=x,e.clearCache=function(){e.cache.reset()},x.modes={EVAL:"eval",ESCAPED:"escaped",RAW:"raw",COMMENT:"comment",LITERAL:"literal"},x.prototype={createRegex:function(){var e="(<%%|%%>|<%=|<%-|<%_|<%#|<%|%>|-%>|_%>)",t=r.escapeRegExpChars(this.opts.delimiter),n=r.escapeRegExpChars(this.opts.openDelimiter),o=r.escapeRegExpChars(this.opts.closeDelimiter);return e=e.replace(/%/g,t).replace(/</g,n).replace(/>/g,o),new RegExp(e)},compile:function(){var e,t,o,i=this.opts,s="",a="",u=i.escapeFunction,c=i.filename?JSON.stringify(i.filename):"undefined";if(!this.source){if(this.generateSource(),s+='  var __output = "";\n  function __append(s) { if (s !== undefined && s !== null) __output += s }\n',i.outputFunctionName){if(!d.test(i.outputFunctionName))throw new Error("outputFunctionName is not a valid JS identifier.");s+="  var "+i.outputFunctionName+" = __append;\n"}if(i.localsName&&!d.test(i.localsName))throw new Error("localsName is not a valid JS identifier.");if(i.destructuredLocals&&i.destructuredLocals.length){for(var l="  var __locals = ("+i.localsName+" || {}),\n",g=0;g<i.destructuredLocals.length;g++){var f=i.destructuredLocals[g];if(!d.test(f))throw new Error("destructuredLocals["+g+"] is not a valid JS identifier.");g>0&&(l+=",\n  "),l+=f+" = __locals."+f}s+=l+";\n"}!1!==i._with&&(s+="  with ("+i.localsName+" || {}) {\n",a+="  }\n"),a+="  return __output;\n",this.source=s+this.source+a}e=i.compileDebug?"var __line = 1\n  , __lines = "+JSON.stringify(this.templateText)+"\n  , __filename = "+c+";\ntry {\n"+this.source+"} catch (e) {\n  rethrow(e, __lines, __filename, __line, escapeFn);\n}\n":this.source,i.client&&(e="escapeFn = escapeFn || "+u.toString()+";\n"+e,i.compileDebug&&(e="rethrow = rethrow || "+v.toString()+";\n"+e)),i.strict&&(e='"use strict";\n'+e),i.debug&&console.log(e),i.compileDebug&&i.filename&&(e=e+"\n//# sourceURL="+c+"\n");try{if(i.async)try{o=new Function("return (async function(){}).constructor;")()}catch(e){throw e instanceof SyntaxError?new Error("This environment does not support async/await"):e}else o=Function;t=new o(i.localsName+", escapeFn, include, rethrow",e)}catch(e){throw e instanceof SyntaxError&&(i.filename&&(e.message+=" in "+i.filename),e.message+=" while compiling ejs\n\n",e.message+="If the above error is not helpful, you may want to try EJS-Lint:\n",e.message+="https://github.com/RyanZim/EJS-Lint",i.async||(e.message+="\n",e.message+="Or, if you meant to create an async function, pass `async: true` as an option.")),e}var p=i.client?t:function(e){return t.apply(i.context,[e||r.createNullProtoObjWherePossible(),u,function(t,n){var o=r.shallowCopy(r.createNullProtoObjWherePossible(),e);return n&&(o=r.shallowCopy(o,n)),h(t,i)(o)},v])};if(i.filename&&"function"==typeof Object.defineProperty){var m=i.filename,_=n.basename(m,n.extname(m));try{Object.defineProperty(p,"name",{value:_,writable:!1,enumerable:!1,configurable:!0})}catch(e){}}return p},generateSource:function(){this.opts.rmWhitespace&&(this.templateText=this.templateText.replace(/[\r\n]+/g,"\n").replace(/^\s+|\s+$/gm,"")),this.templateText=this.templateText.replace(/[ \t]*<%_/gm,"<%_").replace(/_%>[ \t]*/gm,"_%>");var e=this,t=this.parseTemplateText(),n=this.opts.delimiter,r=this.opts.openDelimiter,o=this.opts.closeDelimiter;t&&t.length&&t.forEach((function(i,s){var a;if(0===i.indexOf(r+n)&&0!==i.indexOf(r+n+n)&&(a=t[s+2])!=n+o&&a!="-"+n+o&&a!="_"+n+o)throw new Error('Could not find matching close tag for "'+i+'".');e.scanLine(i)}))},parseTemplateText:function(){for(var e,t=this.templateText,n=this.regex,r=n.exec(t),o=[];r;)0!==(e=r.index)&&(o.push(t.substring(0,e)),t=t.slice(e)),o.push(r[0]),t=t.slice(r[0].length),r=n.exec(t);return t&&o.push(t),o},_addOutput:function(e){if(this.truncate&&(e=e.replace(/^(?:\r\n|\r|\n)/,""),this.truncate=!1),!e)return e;e=(e=(e=(e=e.replace(/\\/g,"\\\\")).replace(/\n/g,"\\n")).replace(/\r/g,"\\r")).replace(/"/g,'\\"'),this.source+='    ; __append("'+e+'")\n'},scanLine:function(e){var t,n=this.opts.delimiter,r=this.opts.openDelimiter,o=this.opts.closeDelimiter;switch(t=e.split("\n").length-1,e){case r+n:case r+n+"_":this.mode=x.modes.EVAL;break;case r+n+"=":this.mode=x.modes.ESCAPED;break;case r+n+"-":this.mode=x.modes.RAW;break;case r+n+"#":this.mode=x.modes.COMMENT;break;case r+n+n:this.mode=x.modes.LITERAL,this.source+='    ; __append("'+e.replace(r+n+n,r+n)+'")\n';break;case n+n+o:this.mode=x.modes.LITERAL,this.source+='    ; __append("'+e.replace(n+n+o,n+o)+'")\n';break;case n+o:case"-"+n+o:case"_"+n+o:this.mode==x.modes.LITERAL&&this._addOutput(e),this.mode=null,this.truncate=0===e.indexOf("-")||0===e.indexOf("_");break;default:if(this.mode){switch(this.mode){case x.modes.EVAL:case x.modes.ESCAPED:case x.modes.RAW:e.lastIndexOf("//")>e.lastIndexOf("\n")&&(e+="\n")}switch(this.mode){case x.modes.EVAL:this.source+="    ; "+e+"\n";break;case x.modes.ESCAPED:this.source+="    ; __append(escapeFn("+_(e)+"))\n";break;case x.modes.RAW:this.source+="    ; __append("+_(e)+")\n";break;case x.modes.COMMENT:break;case x.modes.LITERAL:this._addOutput(e)}}else this._addOutput(e)}this.opts.compileDebug&&t&&(this.currentLine+=t,this.source+="    ; __line = "+this.currentLine+"\n")}},e.escapeXML=r.escapeXML,e.__express=e.renderFile,e.VERSION=s,e.name="ejs","undefined"!=typeof window&&(window.ejs=e)}(r);function x(e,t){if(!e)throw new Error("Invariant failed")}const O={method:"GET",headers:{"Content-Type":"application/json"}};function j(){const e=document.cookie.split("; ").find((e=>e.startsWith("_br_uid_2=")));return e?e.replace("_br_uid_2=",""):"uid%3D7797686432023%3Av%3D11.5%3Ats%3D1428617911187%3Ahc%3D55"}function E(){return Math.floor(1e12+9e12*Math.random())}const L=["_br_uid_2","fq","sort"];function S(e){const t=Object.assign({},e),n=(null==t?void 0:t.endpoint)||"https://suggest.dxpapi.com/api/v2/suggest/";return(null==t?void 0:t.endpoint)&&(null==t||delete t.endpoint),`${n}${r=t,`?${Object.keys(r).reduce(((e,t)=>[...e,`${t}=${L.includes(t)?r[t]:encodeURIComponent(r[t])}`]),[]).join("&")}`}`;var r}async function T(e){return async function(e,t){const n=await fetch(e,t);return await n.json()}(S(e),O)}var A,C='<% if (terms.length || productSuggestions.length) { %>\n  <div class="blm-autosuggest">\n    <div class="blm-autosuggest__suggestion-terms-container">\n      <ul class="blm-autosuggest__suggestion-terms">\n        <% terms.forEach(function(term) { %>\n          <li class="blm-autosuggest__suggestion-term">\n            <a href="<%- term.link %>" class="blm-autosuggest__suggestion-term-link" data-suggestion-text="<%- term.text %>"\n              ><%- term.processedText %></a\n            >\n            <% if (term.categories) { %>\n              <ul class="blm-autosuggest__category-results">\n                <% term.categories.forEach(function(category) { %>\n                <li class="blm-autosuggest__suggestion-term">\n                  <a href="#"\n                     data-category-id="<%- category.value %>"\n                     data-suggestion-text="<%- category.name %>"\n                     class="blm-autosuggest__suggestion-term-link blm-autosuggest__suggestion-term-link--category"\n                    ><%- category.name %></a\n                  >\n                </li>\n                <% }); %>\n              </ul>\n            <% } %>\n          </li>\n        <% }); %>\n      </ul>\n    </div>\n\n    <div class="blm-autosuggest__results-container">\n      <div class="blm-autosuggest__results">\n        <% productSuggestions.forEach(function(suggestion) { %>\n          <div class="blm-autosuggest__result">\n            <div class="blm-autosuggest-result-image">\n              <a\n                title="<%= suggestion.title %>"\n                aria-hidden="true"\n                tabindex="-1"\n                href="<%= suggestion.link %>"\n                class="blm-autosuggest-result-image__link"\n                ><img\n                  class="blm-autosuggest-result-image__image"\n                  src="<%= suggestion.image %>"\n              /></a>\n            </div>\n            <div class="blm-autosuggest-result-details">\n              <a class="blm-autosuggest-result-details__title" href="<%= suggestion.link %>"\n                ><%= suggestion.title %></a\n              >\n              <div class="blm-autosuggest-result-details__price blm-autosuggest-result-details__price--final">\n                <% if (config.format_money) { %>\n                  <%= config.format_money(suggestion.sale_price.toFixed(2) * 100) %>\n                <% } else { %>\n                  <%= config.default_currency %><%= suggestion.sale_price.toFixed(2) %>\n                <% } %>\n                <% if (suggestion.price) { %>\n                  <span\n                  class="blm-autosuggest-result-details__price blm-autosuggest-result-details__price--original"\n                  >\n                   <% if (config.format_money) { %>\n                     <%= config.format_money(suggestion.price.toFixed(2) * 100) %>\n                   <% } else { %>\n                     <%= config.default_currency %><%= suggestion.price.toFixed(2) %>\n                   <% } %>\n                  </span\n                >\n                <% } %>\n              </div>\n            </div>\n          </div>\n        <% }); %>\n      </div>\n    </div>\n\n  </div>\n  <% } %>\n';function N(){const e=function(){var e;const t=null===(e=null===window||void 0===window?void 0:window.bloomreachConnector)||void 0===e?void 0:e.config;return Object.assign({default_search_parameter:"q",url:window.location.href,ref_url:window.location.href,tracking_cookie:j(),format_money:e=>((e,t="$",n=!0)=>`${n?t:""}${(e/100).toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2})}${n?"":` ${t}`}`)(e,window.bloomreachDefaultCurrency||"$"),default_currency:window.bloomreachDefaultCurrency||"$"},t)}();return Object.assign(Object.assign({request_type:"suggest"},e),{autosuggest:Object.assign({enabled:!0,endpoint:"",number_of_terms:4,number_of_products:8,number_of_collections:8,selector:".search__input",template:C,catalog_views:""},e.autosuggest)})}function k(){var e;const t=N();x(null===(e=t.autosuggest)||void 0===e?void 0:e.selector);return document.querySelector(t.autosuggest.selector)}function M(){return document.querySelector(".blm-autosuggest-search-results")}function D(e,t){const n=new URLSearchParams(window.location.search);"function"==typeof t?n.set(e,t(n.get(e)).replace(/"/g,'\\"')):""===t?n.delete(e):n.set(e,t.replace(/"/g,'\\"')),function(e){const t={};for(const n of e.entries())t[n[0]]=n[1];window.history.pushState(t,document.title,`?${e.toString()}`)}(n)}function q(){M().querySelectorAll(".blm-autosuggest__suggestion-term-link--category").forEach((e=>{e.getAttribute("hasListener")||(e.addEventListener("click",(e=>{var t;e.preventDefault();const n=e.target,r=(null===(t=n.dataset)||void 0===t?void 0:t.categoryId)||"";window.BloomreachModules&&window.BloomreachModules.search&&(D("page","1"),window.BloomreachModules.search.load(r).then((()=>(k().value=(null==n?void 0:n.textContent)||"",M().innerHTML="",Le({last_template_data:null}),!0))).catch(console.error))})),e.setAttribute("hasListener","true"))}))}!function(e){e.small="480px",e.medium="680px",e.large="750px",e.xlarge="875px",e.xxlarge="1000px",e.xxxlarge="1200px"}(A||(A={})),window.matchMedia(`(max-width: ${A.medium})`),window.matchMedia(`(min-width:${A.medium}) and (max-width: ${A.xlarge})`);const F=()=>{var e,t;const n={q:k().value};null===(t=null===(e=window.BrTrk||{})||void 0===e?void 0:e.getTracker())||void 0===t||t.logEvent("suggest","submit",n,{},!0)};var $=function(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)},R="object"==typeof t&&t&&t.Object===Object&&t,P="object"==typeof self&&self&&self.Object===Object&&self,I=R||P||Function("return this")(),W=I,H=function(){return W.Date.now()},U=/\s/;var B=function(e){for(var t=e.length;t--&&U.test(e.charAt(t)););return t},z=/^\s+/;var J=function(e){return e?e.slice(0,B(e)+1).replace(z,""):e},Q=I.Symbol,G=Q,V=Object.prototype,X=V.hasOwnProperty,Z=V.toString,Y=G?G.toStringTag:void 0;var K=function(e){var t=X.call(e,Y),n=e[Y];try{e[Y]=void 0;var r=!0}catch(e){}var o=Z.call(e);return r&&(t?e[Y]=n:delete e[Y]),o},ee=Object.prototype.toString;var te=K,ne=function(e){return ee.call(e)},re=Q?Q.toStringTag:void 0;var oe=function(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":re&&re in Object(e)?te(e):ne(e)},ie=function(e){return null!=e&&"object"==typeof e};var se=J,ae=$,ue=function(e){return"symbol"==typeof e||ie(e)&&"[object Symbol]"==oe(e)},ce=/^[-+]0x[0-9a-f]+$/i,le=/^0b[01]+$/i,de=/^0o[0-7]+$/i,ge=parseInt;var fe=$,pe=H,me=function(e){if("number"==typeof e)return e;if(ue(e))return NaN;if(ae(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=ae(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=se(e);var n=le.test(e);return n||de.test(e)?ge(e.slice(2),n?2:8):ce.test(e)?NaN:+e},he=Math.max,ve=Math.min;var _e=function(e,t,n){var r,o,i,s,a,u,c=0,l=!1,d=!1,g=!0;if("function"!=typeof e)throw new TypeError("Expected a function");function f(t){var n=r,i=o;return r=o=void 0,c=t,s=e.apply(i,n)}function p(e){return c=e,a=setTimeout(h,t),l?f(e):s}function m(e){var n=e-u;return void 0===u||n>=t||n<0||d&&e-c>=i}function h(){var e=pe();if(m(e))return v(e);a=setTimeout(h,function(e){var n=t-(e-u);return d?ve(n,i-(e-c)):n}(e))}function v(e){return a=void 0,g&&r?f(e):(r=o=void 0,s)}function _(){var e=pe(),n=m(e);if(r=arguments,o=this,u=e,n){if(void 0===a)return p(u);if(d)return clearTimeout(a),a=setTimeout(h,t),f(u)}return void 0===a&&(a=setTimeout(h,t)),s}return t=me(t)||0,fe(n)&&(l=!!n.leading,i=(d="maxWait"in n)?he(me(n.maxWait)||0,t):i,g="trailing"in n?!!n.trailing:g),_.cancel=function(){void 0!==a&&clearTimeout(a),c=0,r=u=o=a=void 0},_.flush=function(){return void 0===a?s:v(pe())},_};const be=()=>Se().mouseDownEventHappenedInsideAutosuggestResultsContainer?(Te({mouseDownEventHappenedInsideAutosuggestResultsContainer:!1}),!1):(M().innerHTML="",!0),ye=e=>{(function(e,t){var n;let r=e;for(;r&&r.parentNode;)if(r=r.parentNode,r&&(null===(n=r.classList)||void 0===n?void 0:n.contains(t)))return r;return null})(e.target,"blm-autosuggest")?Te({mouseDownEventHappenedInsideAutosuggestResultsContainer:!0}):M().innerHTML=""},we=()=>{const e=Ee().last_template_data;Ee(),e&&(M().innerHTML=r.render(C,e))},xe=_e((e=>{const t=e.target.value,n=k();t.length>=2?(n.dataset.originalQuery=t,async function(e){Le({request_id:E()});const t=function(e){var t,n,r;const o=N(),i=new URLSearchParams(window.location.search),s=Ee(),a=Object.assign(Object.assign({},(null===(t=null==o?void 0:o.autosuggest)||void 0===t?void 0:t.endpoint)?{endpoint:o.autosuggest.endpoint}:{}),{q:e||i.get((null==o?void 0:o.default_search_parameter)||"")||"",aq:e,sort:null===(n=o.autosuggest)||void 0===n?void 0:n.sort,account_id:o.account_id,domain_key:o.domain_key,request_id:s.request_id,_br_uid_2:o.tracking_cookie,ref_url:o.ref_url,url:o.url,request_type:o.request_type,catalog_views:null===(r=o.autosuggest)||void 0===r?void 0:r.catalog_views,search_type:"keyword"});for(const[e,t]of i.entries())Object.keys(a).includes(e)||(a[e]=t);return Object.keys(a).forEach((e=>{void 0===a[e]&&delete a[e]})),a}(e),n=(o=await T(t),function(e){return"suggestionGroups"in e}(o)?function(e){var t,n,r,o,i,s,a,u,c;const l=N(),d=(null===(n=null===(t=null==e?void 0:e.suggestionGroups)||void 0===t?void 0:t[0])||void 0===n?void 0:n.searchSuggestions)||[],g=(null===(o=null===(r=null==e?void 0:e.suggestionGroups)||void 0===r?void 0:r[0])||void 0===o?void 0:o.querySuggestions)||[],f=(null===(s=null===(i=null==e?void 0:e.suggestionGroups)||void 0===i?void 0:i[0])||void 0===s?void 0:s.attributeSuggestions)||[],p=Object.assign(Object.assign({},(null===(a=null==e?void 0:e.queryContext)||void 0===a?void 0:a.originalQuery)?{originalQuery:e.queryContext.originalQuery}:{}),{terms:[...g.map(((e,t)=>{var n;return Object.assign(Object.assign(Object.assign({},e),{text:e.query,displayText:e.displayText,link:`${l.search_page_url}?${l.default_search_parameter}=${encodeURIComponent(e.query)}`}),0===t&&f?{categories:f.map((e=>Object.assign(Object.assign({},e),{name:e.name,value:e.value,type:e.attributeType}))).slice(0,null===(n=l.autosuggest)||void 0===n?void 0:n.number_of_collections)}:{})}))].slice(0,null===(u=l.autosuggest)||void 0===u?void 0:u.number_of_terms),productSuggestions:[...d.map((e=>Object.assign(Object.assign({},e),{id:e.pid,image:e.thumb_image,title:e.title,link:e.url,sale_price:Number((null==e?void 0:e.sale_price)||"0")})))].slice(0,null===(c=l.autosuggest)||void 0===c?void 0:c.number_of_products),config:l});return je(p)}(o):function(e){var t,n;const r=N();return je(Object.assign(Object.assign({},e.response.q?{originalQuery:e.response.q}:{}),{terms:[...e.response.suggestions?e.response.suggestions.map((e=>{var t;return Object.assign(Object.assign(Object.assign({},e),{text:e.q,displayText:e.dq,link:`${r.search_page_url}?${r.default_search_parameter}=${encodeURIComponent(e.q)}`}),e.filters?{categories:e.filters.map((e=>Object.assign(Object.assign({},e),{name:e.name,value:e.value,type:e.key}))).slice(0,null===(t=r.autosuggest)||void 0===t?void 0:t.number_of_collections)}:{})})):[]].slice(0,null===(t=r.autosuggest)||void 0===t?void 0:t.number_of_terms),productSuggestions:[...e.response.products?e.response.products.map((e=>Object.assign(Object.assign(Object.assign({},e),{id:e.pid,image:e.thumb_image,title:e.title,link:e.url,sale_price:Number.isNaN(e.sale_price)?Number.isNaN(e.price)?"0":e.price:e.sale_price}),"price"in e&&"sale_price"in e?{price:e.price}:{}))):[]].slice(0,null===(n=r.autosuggest)||void 0===n?void 0:n.number_of_products),config:r}))}(o));var o;Le({last_template_data:n}),M().innerHTML=r.render(C,n),q(),M().querySelectorAll(".blm-autosuggest__suggestion-term-link").forEach((e=>{e.getAttribute("hasListener")||(e.addEventListener("click",function(e){return()=>{var t,n;const{suggestionText:r}=e.dataset,{originalQuery:o}=k().dataset,i={aq:o,q:r,catalogs:[{name:"example_en"}]};null===(n=null===(t=window.BrTrk||{})||void 0===t?void 0:t.getTracker())||void 0===n||n.logEvent("suggest","click",i,{},!0)}}(e)),e.setAttribute("hasListener","true"))}))}(t).catch(console.error)):(M().innerHTML="",n.dataset.originalQuery="",Le({last_template_data:null}))}),500);function Oe(){!function(){document.body.removeEventListener("mousedown",ye),document.body.addEventListener("mousedown",ye);const e=k();e&&(e.removeEventListener("blur",be),e.addEventListener("blur",be))}(),function(){const e=k();e&&(e.removeEventListener("focus",we),e.addEventListener("focus",we))}(),function(){const e=k();e.removeEventListener("input",xe),e.addEventListener("input",xe)}()}function je(e){const t=Object.assign({},e);return e.terms.forEach(((n,o)=>{const i=r.render('<span class="blm-autosuggest__suggestion-term-link--typed-query"><%= query %></span>',{query:e.originalQuery}).trim();(t.terms[o]||{}).processedText=n.text.replace(e.originalQuery||"",i)})),t}function Ee(){return window.BloomreachModules.autosuggest.getCurrentAutosuggestRequestState()}function Le(e){window.BloomreachModules.autosuggest.setCurrentAutosuggestRequestState(Object.assign(Object.assign({},Ee()),e))}function Se(){return window.BloomreachModules.autosuggest.getCurrentAutosuggestUiState()}function Te(e){window.BloomreachModules.autosuggest.setCurrentAutosuggestUiState(Object.assign(Object.assign({},Se()),e))}const Ae=function(){let e={request_id:0,last_template_data:null},t={mouseDownEventHappenedInsideAutosuggestResultsContainer:!1};return{setCurrentAutosuggestRequestState:t=>{e=t},getCurrentAutosuggestRequestState:()=>e,setCurrentAutosuggestUiState:e=>{t=e},getCurrentAutosuggestUiState:()=>t,load:async()=>{!function(){if(!M()){const e=document.createElement("style");e.innerHTML=`.blm-autosuggest-search-results {\n      width: 100%;\n      position: absolute;\n      z-index: 100;\n      left: 0;\n      transform: translateY(${k().offsetHeight}px);\n    }`,document.head.appendChild(e)}}(),function(){var e;if(!M()){const t=document.createElement("div");t.classList.add("blm-autosuggest-search-results"),null===(e=k().parentElement)||void 0===e||e.appendChild(t)}}(),function(){var e;const t=N();return x(t.account_id),x(t.domain_key),k(),M(),null===(e=null==t?void 0:t.autosuggest)||void 0===e?void 0:e.enabled}()&&(Oe(),function(){const e=function(e,t){let n=e;for(;n&&n.parentNode;)if(n=n.parentNode,n&&n.tagName.toLowerCase()===t.toLowerCase())return n;return null}(k(),"form");e&&(e.removeEventListener("submit",F,!0),e.addEventListener("submit",F,!0))}(),k().setAttribute("autocomplete","off"))}}}();window.BloomreachModules=Object.assign(Object.assign({},e),{autosuggest:Ae}),Ae.load().catch(console.error)}();
//# sourceMappingURL=autosuggest.js.map
