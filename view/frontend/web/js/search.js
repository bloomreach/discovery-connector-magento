(function(){"use strict";const AUTOSUGGEST_MINIMUM_QUERY_LENGTH=2
;const AUTOSUGGEST_TYPED_QUERY_TEMPLATE='<span class="blm-autosuggest__suggestion-term-link--typed-query"><%= query %></span>'
;const COOKIE_NAME_SEGMENTATION_CDP_SEGMENTS="cdp_segments"
;const COOKIE_NAME_SEGMENTATION_CUSTOMER_PROFILE="customer_profile"
;const DEFAULT_CURRENCY="$";const DEFAULT_PAGE_SIZE=16
;const DEFAULT_SEARCH_PARAMETER="q";const DEFAULT_SORTING_OPTIONS=[{
label:"Relevance",value:""},{label:"Price (low - high)",value:"price+asc"},{
label:"Price (high - low)",value:"price+desc"},{label:"Name (A - Z)",
value:"title+asc"},{label:"Name (Z - A)",value:"title+desc"}]
;const DEFAULT_START=0;const DEFAULT_WIDGETS_TO_DISPLAY=4
;const FIELD_NAME_PRICE="price";const MAX_COLOR_SWATCHES=4
;const MAX_PAGINATION_NUMBER_BEFORE_CURRENT=2
;const MAX_PAGINATION_NUMBER_AFTER_CURRENT=2
;const NUMBER_OF_AUTOSUGGEST_COLLECTIONS=8
;const NUMBER_OF_AUTOSUGGEST_PRODUCTS=8;const NUMBER_OF_AUTOSUGGEST_TERMS=4
;const NUMBER_OF_FACET_GROUPS=5;const NUMBER_OF_FACET_VALUES=6
;const PARAMETER_NAME_FACETS="fq"
;const PARAMETER_NAME_FILTERS_PANEL="filterpanel"
;const PARAMETER_NAME_GROUPBY="groupby";const PARAMETER_NAME_PAGE="page"
;const PARAMETER_NAME_SIZE="size";const PARAMETER_NAME_SORT="sort"
;const REQUEST_TYPE_SEARCH="search";const REQUEST_TYPE_SUGGEST="suggest"
;const SEARCH_TYPE_CATEGORY="category";const SEARCH_TYPE_KEYWORD="keyword"
;const SELECTOR_AUTOSUGGEST_INPUT=".search__input"
;const SELECTOR_SEARCH_RESULTS_CONTAINER=".main-content"
;const ADD_TO_CART_ATTRIBUTE_NAME="data-blm-add-to-cart"
;const ADD_TO_CART_ATTRIBUTE_SKU="data-blm-add-to-cart-sku"
;const ADD_TO_CART_ATTRIBUTE_PROD_ID="data-blm-add-to-cart-prod-id"
;const ADD_TO_CART_ATTRIBUTE_DISABLE="data-blm-add-to-cart-disable"
;const QUICKVIEW_ATTRIBUTE_NAME="data-blm-quickview"
;const QUICKVIEW_ATTRIBUTE_SKU="data-blm-quickview-sku"
;const QUICKVIEW_ATTRIBUTE_PROD_ID="data-blm-quickview-prod-id"
;const QUICKVIEW_ATTRIBUTE_PROD_NAME="data-blm-quickview-prod-name"
;var constants=Object.freeze({__proto__:null,
AUTOSUGGEST_MINIMUM_QUERY_LENGTH:AUTOSUGGEST_MINIMUM_QUERY_LENGTH,
AUTOSUGGEST_TYPED_QUERY_TEMPLATE:AUTOSUGGEST_TYPED_QUERY_TEMPLATE,
COOKIE_NAME_SEGMENTATION_CDP_SEGMENTS:COOKIE_NAME_SEGMENTATION_CDP_SEGMENTS,
COOKIE_NAME_SEGMENTATION_CUSTOMER_PROFILE:COOKIE_NAME_SEGMENTATION_CUSTOMER_PROFILE,
DEFAULT_CURRENCY:DEFAULT_CURRENCY,DEFAULT_PAGE_SIZE:DEFAULT_PAGE_SIZE,
DEFAULT_SEARCH_PARAMETER:DEFAULT_SEARCH_PARAMETER,
DEFAULT_SORTING_OPTIONS:DEFAULT_SORTING_OPTIONS,DEFAULT_START:DEFAULT_START,
DEFAULT_WIDGETS_TO_DISPLAY:DEFAULT_WIDGETS_TO_DISPLAY,
FIELD_NAME_PRICE:FIELD_NAME_PRICE,MAX_COLOR_SWATCHES:MAX_COLOR_SWATCHES,
MAX_PAGINATION_NUMBER_BEFORE_CURRENT:MAX_PAGINATION_NUMBER_BEFORE_CURRENT,
MAX_PAGINATION_NUMBER_AFTER_CURRENT:MAX_PAGINATION_NUMBER_AFTER_CURRENT,
NUMBER_OF_AUTOSUGGEST_COLLECTIONS:NUMBER_OF_AUTOSUGGEST_COLLECTIONS,
NUMBER_OF_AUTOSUGGEST_PRODUCTS:NUMBER_OF_AUTOSUGGEST_PRODUCTS,
NUMBER_OF_AUTOSUGGEST_TERMS:NUMBER_OF_AUTOSUGGEST_TERMS,
NUMBER_OF_FACET_GROUPS:NUMBER_OF_FACET_GROUPS,
NUMBER_OF_FACET_VALUES:NUMBER_OF_FACET_VALUES,
PARAMETER_NAME_FACETS:PARAMETER_NAME_FACETS,
PARAMETER_NAME_FILTERS_PANEL:PARAMETER_NAME_FILTERS_PANEL,
PARAMETER_NAME_GROUPBY:PARAMETER_NAME_GROUPBY,
PARAMETER_NAME_PAGE:PARAMETER_NAME_PAGE,PARAMETER_NAME_SIZE:PARAMETER_NAME_SIZE,
PARAMETER_NAME_SORT:PARAMETER_NAME_SORT,REQUEST_TYPE_SEARCH:REQUEST_TYPE_SEARCH,
REQUEST_TYPE_SUGGEST:REQUEST_TYPE_SUGGEST,
SEARCH_TYPE_CATEGORY:SEARCH_TYPE_CATEGORY,
SEARCH_TYPE_KEYWORD:SEARCH_TYPE_KEYWORD,
SELECTOR_AUTOSUGGEST_INPUT:SELECTOR_AUTOSUGGEST_INPUT,
SELECTOR_SEARCH_RESULTS_CONTAINER:SELECTOR_SEARCH_RESULTS_CONTAINER,
ADD_TO_CART_ATTRIBUTE_NAME:ADD_TO_CART_ATTRIBUTE_NAME,
ADD_TO_CART_ATTRIBUTE_SKU:ADD_TO_CART_ATTRIBUTE_SKU,
ADD_TO_CART_ATTRIBUTE_PROD_ID:ADD_TO_CART_ATTRIBUTE_PROD_ID,
ADD_TO_CART_ATTRIBUTE_DISABLE:ADD_TO_CART_ATTRIBUTE_DISABLE,
QUICKVIEW_ATTRIBUTE_NAME:QUICKVIEW_ATTRIBUTE_NAME,
QUICKVIEW_ATTRIBUTE_SKU:QUICKVIEW_ATTRIBUTE_SKU,
QUICKVIEW_ATTRIBUTE_PROD_ID:QUICKVIEW_ATTRIBUTE_PROD_ID,
QUICKVIEW_ATTRIBUTE_PROD_NAME:QUICKVIEW_ATTRIBUTE_PROD_NAME})
;const globalBloomreachModules=Object.assign(Object.assign({},window.BloomreachModules?window.BloomreachModules:{}),{
version:"4.0.0",constants:constants})
;var commonjsGlobal=typeof globalThis!=="undefined"?globalThis:typeof window!=="undefined"?window:typeof global!=="undefined"?global:typeof self!=="undefined"?self:{}
;function getAugmentedNamespace(n){var f=n.default;if(typeof f=="function"){
var a=function(){return f.apply(this,arguments)};a.prototype=f.prototype
}else a={};Object.defineProperty(a,"__esModule",{value:true})
;Object.keys(n).forEach((function(k){var d=Object.getOwnPropertyDescriptor(n,k)
;Object.defineProperty(a,k,d.get?d:{enumerable:true,get:function(){return n[k]}
})}));return a}var ejs={};var _polyfillNode_fs={}
;var _polyfillNode_fs$1=Object.freeze({__proto__:null,default:_polyfillNode_fs})
;var require$$0=getAugmentedNamespace(_polyfillNode_fs$1)
;function normalizeArray(parts,allowAboveRoot){var up=0
;for(var i=parts.length-1;i>=0;i--){var last=parts[i];if(last==="."){
parts.splice(i,1)}else if(last===".."){parts.splice(i,1);up++}else if(up){
parts.splice(i,1);up--}}if(allowAboveRoot){for(;up--;up){parts.unshift("..")}}
return parts}
var splitPathRe=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/
;var splitPath=function(filename){return splitPathRe.exec(filename).slice(1)}
;function resolve(){var resolvedPath="",resolvedAbsolute=false
;for(var i=arguments.length-1;i>=-1&&!resolvedAbsolute;i--){
var path=i>=0?arguments[i]:"/";if(typeof path!=="string"){
throw new TypeError("Arguments to path.resolve must be strings")}else if(!path){
continue}resolvedPath=path+"/"+resolvedPath
;resolvedAbsolute=path.charAt(0)==="/"}
resolvedPath=normalizeArray(filter(resolvedPath.split("/"),(function(p){
return!!p})),!resolvedAbsolute).join("/")
;return(resolvedAbsolute?"/":"")+resolvedPath||"."}function normalize(path){
var isPathAbsolute=isAbsolute(path),trailingSlash=substr(path,-1)==="/"
;path=normalizeArray(filter(path.split("/"),(function(p){return!!p
})),!isPathAbsolute).join("/");if(!path&&!isPathAbsolute){path="."}
if(path&&trailingSlash){path+="/"}return(isPathAbsolute?"/":"")+path}
function isAbsolute(path){return path.charAt(0)==="/"}function join(){
var paths=Array.prototype.slice.call(arguments,0)
;return normalize(filter(paths,(function(p,index){if(typeof p!=="string"){
throw new TypeError("Arguments to path.join must be strings")}return p
})).join("/"))}function relative(from,to){from=resolve(from).substr(1)
;to=resolve(to).substr(1);function trim(arr){var start=0
;for(;start<arr.length;start++){if(arr[start]!=="")break}var end=arr.length-1
;for(;end>=0;end--){if(arr[end]!=="")break}if(start>end)return[]
;return arr.slice(start,end-start+1)}var fromParts=trim(from.split("/"))
;var toParts=trim(to.split("/"))
;var length=Math.min(fromParts.length,toParts.length);var samePartsLength=length
;for(var i=0;i<length;i++){if(fromParts[i]!==toParts[i]){samePartsLength=i;break
}}var outputParts=[];for(var i=samePartsLength;i<fromParts.length;i++){
outputParts.push("..")}
outputParts=outputParts.concat(toParts.slice(samePartsLength))
;return outputParts.join("/")}var sep="/";var delimiter=":"
;function dirname(path){var result=splitPath(path),root=result[0],dir=result[1]
;if(!root&&!dir){return"."}if(dir){dir=dir.substr(0,dir.length-1)}
return root+dir}function basename(path,ext){var f=splitPath(path)[2]
;if(ext&&f.substr(-1*ext.length)===ext){f=f.substr(0,f.length-ext.length)}
return f}function extname(path){return splitPath(path)[3]}
var _polyfillNode_path={extname:extname,basename:basename,dirname:dirname,
sep:sep,delimiter:delimiter,relative:relative,join:join,isAbsolute:isAbsolute,
normalize:normalize,resolve:resolve};function filter(xs,f){
if(xs.filter)return xs.filter(f);var res=[];for(var i=0;i<xs.length;i++){
if(f(xs[i],i,xs))res.push(xs[i])}return res}
var substr="ab".substr(-1)==="b"?function(str,start,len){
return str.substr(start,len)}:function(str,start,len){
if(start<0)start=str.length+start;return str.substr(start,len)}
;var _polyfillNode_path$1=Object.freeze({__proto__:null,resolve:resolve,
normalize:normalize,isAbsolute:isAbsolute,join:join,relative:relative,sep:sep,
delimiter:delimiter,dirname:dirname,basename:basename,extname:extname,
default:_polyfillNode_path})
;var require$$1=getAugmentedNamespace(_polyfillNode_path$1);var utils={}
;(function(exports){var regExpChars=/[|\\{}()[\]^$+*?.]/g
;var hasOwnProperty=Object.prototype.hasOwnProperty
;var hasOwn=function(obj,key){return hasOwnProperty.apply(obj,[key])}
;exports.escapeRegExpChars=function(string){if(!string){return""}
return String(string).replace(regExpChars,"\\$&")};var _ENCODE_HTML_RULES={
"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&#34;","'":"&#39;"}
;var _MATCH_HTML=/[&<>'"]/g;function encode_char(c){
return _ENCODE_HTML_RULES[c]||c}
var escapeFuncStr="var _ENCODE_HTML_RULES = {\n"+'      "&": "&amp;"\n'+'    , "<": "&lt;"\n'+'    , ">": "&gt;"\n'+'    , \'"\': "&#34;"\n'+'    , "\'": "&#39;"\n'+"    }\n"+"  , _MATCH_HTML = /[&<>'\"]/g;\n"+"function encode_char(c) {\n"+"  return _ENCODE_HTML_RULES[c] || c;\n"+"};\n"
;exports.escapeXML=function(markup){
return markup==undefined?"":String(markup).replace(_MATCH_HTML,encode_char)}
;exports.escapeXML.toString=function(){
return Function.prototype.toString.call(this)+";\n"+escapeFuncStr}
;exports.shallowCopy=function(to,from){from=from||{}
;if(to!==null&&to!==undefined){for(var p in from){if(!hasOwn(from,p)){continue}
if(p==="__proto__"||p==="constructor"){continue}to[p]=from[p]}}return to}
;exports.shallowCopyFromList=function(to,from,list){list=list||[];from=from||{}
;if(to!==null&&to!==undefined){for(var i=0;i<list.length;i++){var p=list[i]
;if(typeof from[p]!="undefined"){if(!hasOwn(from,p)){continue}
if(p==="__proto__"||p==="constructor"){continue}to[p]=from[p]}}}return to}
;exports.cache={_data:{},set:function(key,val){this._data[key]=val},
get:function(key){return this._data[key]},remove:function(key){
delete this._data[key]},reset:function(){this._data={}}}
;exports.hyphenToCamel=function(str){
return str.replace(/-[a-z]/g,(function(match){return match[1].toUpperCase()}))}
;exports.createNullProtoObjWherePossible=function(){
if(typeof Object.create=="function"){return function(){
return Object.create(null)}}if(!({__proto__:null}instanceof Object)){
return function(){return{__proto__:null}}}return function(){return{}}}()
})(utils);var name="ejs";var description="Embedded JavaScript templates"
;var keywords=["template","engine","ejs"];var version="3.1.8"
;var author="Matthew Eernisse <mde@fleegix.org> (http://fleegix.org)"
;var license="Apache-2.0";var bin={ejs:"./bin/cli.js"};var main="./lib/ejs.js"
;var jsdelivr="ejs.min.js";var unpkg="ejs.min.js";var repository={type:"git",
url:"git://github.com/mde/ejs.git"};var bugs="https://github.com/mde/ejs/issues"
;var homepage="https://github.com/mde/ejs";var dependencies={jake:"^10.8.5"}
;var devDependencies={browserify:"^16.5.1",eslint:"^6.8.0",
"git-directory-deploy":"^1.5.1",jsdoc:"^3.6.7","lru-cache":"^4.0.1",
mocha:"^7.1.1","uglify-js":"^3.3.16"};var engines={node:">=0.10.0"}
;var scripts={test:"mocha"};var require$$3={name:name,description:description,
keywords:keywords,version:version,author:author,license:license,bin:bin,
main:main,jsdelivr:jsdelivr,unpkg:unpkg,repository:repository,bugs:bugs,
homepage:homepage,dependencies:dependencies,devDependencies:devDependencies,
engines:engines,scripts:scripts};(function(exports){var fs=require$$0
;var path=require$$1;var utils$1=utils;var scopeOptionWarned=false
;var _VERSION_STRING=require$$3.version;var _DEFAULT_OPEN_DELIMITER="<"
;var _DEFAULT_CLOSE_DELIMITER=">";var _DEFAULT_DELIMITER="%"
;var _DEFAULT_LOCALS_NAME="locals";var _NAME="ejs"
;var _REGEX_STRING="(<%%|%%>|<%=|<%-|<%_|<%#|<%|%>|-%>|_%>)"
;var _OPTS_PASSABLE_WITH_DATA=["delimiter","scope","context","debug","compileDebug","client","_with","rmWhitespace","strict","filename","async"]
;var _OPTS_PASSABLE_WITH_DATA_EXPRESS=_OPTS_PASSABLE_WITH_DATA.concat("cache")
;var _BOM=/^\uFEFF/;var _JS_IDENTIFIER=/^[a-zA-Z_$][0-9a-zA-Z_$]*$/
;exports.cache=utils$1.cache;exports.fileLoader=fs.readFileSync
;exports.localsName=_DEFAULT_LOCALS_NAME
;exports.promiseImpl=new Function("return this;")().Promise
;exports.resolveInclude=function(name,filename,isDir){var dirname=path.dirname
;var extname=path.extname;var resolve=path.resolve
;var includePath=resolve(isDir?filename:dirname(filename),name)
;var ext=extname(name);if(!ext){includePath+=".ejs"}return includePath}
;function resolvePaths(name,paths){var filePath;if(paths.some((function(v){
filePath=exports.resolveInclude(name,v,true);return fs.existsSync(filePath)}))){
return filePath}}function getIncludePath(path,options){var includePath
;var filePath;var views=options.views;var match=/^[A-Za-z]+:\\|^\//.exec(path)
;if(match&&match.length){path=path.replace(/^\/*/,"")
;if(Array.isArray(options.root)){includePath=resolvePaths(path,options.root)
}else{includePath=exports.resolveInclude(path,options.root||"/",true)}}else{
if(options.filename){filePath=exports.resolveInclude(path,options.filename)
;if(fs.existsSync(filePath)){includePath=filePath}}
if(!includePath&&Array.isArray(views)){includePath=resolvePaths(path,views)}
if(!includePath&&typeof options.includer!=="function"){
throw new Error('Could not find the include file "'+options.escapeFunction(path)+'"')
}}return includePath}function handleCache(options,template){var func
;var filename=options.filename;var hasTemplate=arguments.length>1
;if(options.cache){if(!filename){
throw new Error("cache option requires a filename")}
func=exports.cache.get(filename);if(func){return func}if(!hasTemplate){
template=fileLoader(filename).toString().replace(_BOM,"")}
}else if(!hasTemplate){if(!filename){
throw new Error("Internal EJS error: no file name or template "+"provided")}
template=fileLoader(filename).toString().replace(_BOM,"")}
func=exports.compile(template,options);if(options.cache){
exports.cache.set(filename,func)}return func}
function tryHandleCache(options,data,cb){var result;if(!cb){
if(typeof exports.promiseImpl=="function"){
return new exports.promiseImpl((function(resolve,reject){try{
result=handleCache(options)(data);resolve(result)}catch(err){reject(err)}}))
}else{throw new Error("Please provide a callback function")}}else{try{
result=handleCache(options)(data)}catch(err){return cb(err)}cb(null,result)}}
function fileLoader(filePath){return exports.fileLoader(filePath)}
function includeFile(path,options){
var opts=utils$1.shallowCopy(utils$1.createNullProtoObjWherePossible(),options)
;opts.filename=getIncludePath(path,opts)
;if(typeof options.includer==="function"){
var includerResult=options.includer(path,opts.filename);if(includerResult){
if(includerResult.filename){opts.filename=includerResult.filename}
if(includerResult.template){return handleCache(opts,includerResult.template)}}}
return handleCache(opts)}function rethrow(err,str,flnm,lineno,esc){
var lines=str.split("\n");var start=Math.max(lineno-3,0)
;var end=Math.min(lines.length,lineno+3);var filename=esc(flnm)
;var context=lines.slice(start,end).map((function(line,i){var curr=i+start+1
;return(curr==lineno?" >> ":"    ")+curr+"| "+line})).join("\n")
;err.path=filename
;err.message=(filename||"ejs")+":"+lineno+"\n"+context+"\n\n"+err.message
;throw err}function stripSemi(str){return str.replace(/;(\s*$)/,"$1")}
exports.compile=function compile(template,opts){var templ;if(opts&&opts.scope){
if(!scopeOptionWarned){
console.warn("`scope` option is deprecated and will be removed in EJS 3")
;scopeOptionWarned=true}if(!opts.context){opts.context=opts.scope}
delete opts.scope}templ=new Template(template,opts);return templ.compile()}
;exports.render=function(template,d,o){
var data=d||utils$1.createNullProtoObjWherePossible()
;var opts=o||utils$1.createNullProtoObjWherePossible();if(arguments.length==2){
utils$1.shallowCopyFromList(opts,data,_OPTS_PASSABLE_WITH_DATA)}
return handleCache(opts,template)(data)};exports.renderFile=function(){
var args=Array.prototype.slice.call(arguments);var filename=args.shift();var cb
;var opts={filename:filename};var data;var viewOpts
;if(typeof arguments[arguments.length-1]=="function"){cb=args.pop()}
if(args.length){data=args.shift();if(args.length){
utils$1.shallowCopy(opts,args.pop())}else{if(data.settings){
if(data.settings.views){opts.views=data.settings.views}
if(data.settings["view cache"]){opts.cache=true}
viewOpts=data.settings["view options"];if(viewOpts){
utils$1.shallowCopy(opts,viewOpts)}}
utils$1.shallowCopyFromList(opts,data,_OPTS_PASSABLE_WITH_DATA_EXPRESS)}
opts.filename=filename}else{data=utils$1.createNullProtoObjWherePossible()}
return tryHandleCache(opts,data,cb)};exports.Template=Template
;exports.clearCache=function(){exports.cache.reset()}
;function Template(text,opts){
opts=opts||utils$1.createNullProtoObjWherePossible()
;var options=utils$1.createNullProtoObjWherePossible();this.templateText=text
;this.mode=null;this.truncate=false;this.currentLine=1;this.source=""
;options.client=opts.client||false
;options.escapeFunction=opts.escape||opts.escapeFunction||utils$1.escapeXML
;options.compileDebug=opts.compileDebug!==false;options.debug=!!opts.debug
;options.filename=opts.filename
;options.openDelimiter=opts.openDelimiter||exports.openDelimiter||_DEFAULT_OPEN_DELIMITER
;options.closeDelimiter=opts.closeDelimiter||exports.closeDelimiter||_DEFAULT_CLOSE_DELIMITER
;options.delimiter=opts.delimiter||exports.delimiter||_DEFAULT_DELIMITER
;options.strict=opts.strict||false;options.context=opts.context
;options.cache=opts.cache||false;options.rmWhitespace=opts.rmWhitespace
;options.root=opts.root;options.includer=opts.includer
;options.outputFunctionName=opts.outputFunctionName
;options.localsName=opts.localsName||exports.localsName||_DEFAULT_LOCALS_NAME
;options.views=opts.views;options.async=opts.async
;options.destructuredLocals=opts.destructuredLocals
;options.legacyInclude=typeof opts.legacyInclude!="undefined"?!!opts.legacyInclude:true
;if(options.strict){options._with=false}else{
options._with=typeof opts._with!="undefined"?opts._with:true}this.opts=options
;this.regex=this.createRegex()}Template.modes={EVAL:"eval",ESCAPED:"escaped",
RAW:"raw",COMMENT:"comment",LITERAL:"literal"};Template.prototype={
createRegex:function(){var str=_REGEX_STRING
;var delim=utils$1.escapeRegExpChars(this.opts.delimiter)
;var open=utils$1.escapeRegExpChars(this.opts.openDelimiter)
;var close=utils$1.escapeRegExpChars(this.opts.closeDelimiter)
;str=str.replace(/%/g,delim).replace(/</g,open).replace(/>/g,close)
;return new RegExp(str)},compile:function(){var src;var fn;var opts=this.opts
;var prepended="";var appended="";var escapeFn=opts.escapeFunction;var ctor
;var sanitizedFilename=opts.filename?JSON.stringify(opts.filename):"undefined"
;if(!this.source){this.generateSource()
;prepended+='  var __output = "";\n'+"  function __append(s) { if (s !== undefined && s !== null) __output += s }\n"
;if(opts.outputFunctionName){if(!_JS_IDENTIFIER.test(opts.outputFunctionName)){
throw new Error("outputFunctionName is not a valid JS identifier.")}
prepended+="  var "+opts.outputFunctionName+" = __append;"+"\n"}
if(opts.localsName&&!_JS_IDENTIFIER.test(opts.localsName)){
throw new Error("localsName is not a valid JS identifier.")}
if(opts.destructuredLocals&&opts.destructuredLocals.length){
var destructuring="  var __locals = ("+opts.localsName+" || {}),\n"
;for(var i=0;i<opts.destructuredLocals.length;i++){
var name=opts.destructuredLocals[i];if(!_JS_IDENTIFIER.test(name)){
throw new Error("destructuredLocals["+i+"] is not a valid JS identifier.")}
if(i>0){destructuring+=",\n  "}destructuring+=name+" = __locals."+name}
prepended+=destructuring+";\n"}if(opts._with!==false){
prepended+="  with ("+opts.localsName+" || {}) {"+"\n";appended+="  }"+"\n"}
appended+="  return __output;"+"\n";this.source=prepended+this.source+appended}
if(opts.compileDebug){
src="var __line = 1"+"\n"+"  , __lines = "+JSON.stringify(this.templateText)+"\n"+"  , __filename = "+sanitizedFilename+";"+"\n"+"try {"+"\n"+this.source+"} catch (e) {"+"\n"+"  rethrow(e, __lines, __filename, __line, escapeFn);"+"\n"+"}"+"\n"
}else{src=this.source}if(opts.client){
src="escapeFn = escapeFn || "+escapeFn.toString()+";"+"\n"+src
;if(opts.compileDebug){
src="rethrow = rethrow || "+rethrow.toString()+";"+"\n"+src}}if(opts.strict){
src='"use strict";\n'+src}if(opts.debug){console.log(src)}
if(opts.compileDebug&&opts.filename){
src=src+"\n"+"//# sourceURL="+sanitizedFilename+"\n"}try{if(opts.async){try{
ctor=new Function("return (async function(){}).constructor;")()}catch(e){
if(e instanceof SyntaxError){
throw new Error("This environment does not support async/await")}else{throw e}}
}else{ctor=Function}
fn=new ctor(opts.localsName+", escapeFn, include, rethrow",src)}catch(e){
if(e instanceof SyntaxError){if(opts.filename){e.message+=" in "+opts.filename}
e.message+=" while compiling ejs\n\n"
;e.message+="If the above error is not helpful, you may want to try EJS-Lint:\n"
;e.message+="https://github.com/RyanZim/EJS-Lint";if(!opts.async){
e.message+="\n"
;e.message+="Or, if you meant to create an async function, pass `async: true` as an option."
}}throw e}var returnedFn=opts.client?fn:function anonymous(data){
var include=function(path,includeData){
var d=utils$1.shallowCopy(utils$1.createNullProtoObjWherePossible(),data)
;if(includeData){d=utils$1.shallowCopy(d,includeData)}
return includeFile(path,opts)(d)}
;return fn.apply(opts.context,[data||utils$1.createNullProtoObjWherePossible(),escapeFn,include,rethrow])
};if(opts.filename&&typeof Object.defineProperty==="function"){
var filename=opts.filename
;var basename=path.basename(filename,path.extname(filename));try{
Object.defineProperty(returnedFn,"name",{value:basename,writable:false,
enumerable:false,configurable:true})}catch(e){}}return returnedFn},
generateSource:function(){var opts=this.opts;if(opts.rmWhitespace){
this.templateText=this.templateText.replace(/[\r\n]+/g,"\n").replace(/^\s+|\s+$/gm,"")
}
this.templateText=this.templateText.replace(/[ \t]*<%_/gm,"<%_").replace(/_%>[ \t]*/gm,"_%>")
;var self=this;var matches=this.parseTemplateText();var d=this.opts.delimiter
;var o=this.opts.openDelimiter;var c=this.opts.closeDelimiter
;if(matches&&matches.length){matches.forEach((function(line,index){var closing
;if(line.indexOf(o+d)===0&&line.indexOf(o+d+d)!==0){closing=matches[index+2]
;if(!(closing==d+c||closing=="-"+d+c||closing=="_"+d+c)){
throw new Error('Could not find matching close tag for "'+line+'".')}}
self.scanLine(line)}))}},parseTemplateText:function(){var str=this.templateText
;var pat=this.regex;var result=pat.exec(str);var arr=[];var firstPos
;while(result){firstPos=result.index;if(firstPos!==0){
arr.push(str.substring(0,firstPos));str=str.slice(firstPos)}arr.push(result[0])
;str=str.slice(result[0].length);result=pat.exec(str)}if(str){arr.push(str)}
return arr},_addOutput:function(line){if(this.truncate){
line=line.replace(/^(?:\r\n|\r|\n)/,"");this.truncate=false}if(!line){
return line}line=line.replace(/\\/g,"\\\\");line=line.replace(/\n/g,"\\n")
;line=line.replace(/\r/g,"\\r");line=line.replace(/"/g,'\\"')
;this.source+='    ; __append("'+line+'")'+"\n"},scanLine:function(line){
var self=this;var d=this.opts.delimiter;var o=this.opts.openDelimiter
;var c=this.opts.closeDelimiter;var newLineCount=0
;newLineCount=line.split("\n").length-1;switch(line){case o+d:case o+d+"_":
this.mode=Template.modes.EVAL;break;case o+d+"=":
this.mode=Template.modes.ESCAPED;break;case o+d+"-":this.mode=Template.modes.RAW
;break;case o+d+"#":this.mode=Template.modes.COMMENT;break;case o+d+d:
this.mode=Template.modes.LITERAL
;this.source+='    ; __append("'+line.replace(o+d+d,o+d)+'")'+"\n";break
;case d+d+c:this.mode=Template.modes.LITERAL
;this.source+='    ; __append("'+line.replace(d+d+c,d+c)+'")'+"\n";break
;case d+c:case"-"+d+c:case"_"+d+c:if(this.mode==Template.modes.LITERAL){
this._addOutput(line)}this.mode=null
;this.truncate=line.indexOf("-")===0||line.indexOf("_")===0;break;default:
if(this.mode){switch(this.mode){case Template.modes.EVAL:
case Template.modes.ESCAPED:case Template.modes.RAW:
if(line.lastIndexOf("//")>line.lastIndexOf("\n")){line+="\n"}}switch(this.mode){
case Template.modes.EVAL:this.source+="    ; "+line+"\n";break
;case Template.modes.ESCAPED:
this.source+="    ; __append(escapeFn("+stripSemi(line)+"))"+"\n";break
;case Template.modes.RAW:this.source+="    ; __append("+stripSemi(line)+")"+"\n"
;break;case Template.modes.COMMENT:break;case Template.modes.LITERAL:
this._addOutput(line);break}}else{this._addOutput(line)}}
if(self.opts.compileDebug&&newLineCount){this.currentLine+=newLineCount
;this.source+="    ; __line = "+this.currentLine+"\n"}}}
;exports.escapeXML=utils$1.escapeXML;exports.__express=exports.renderFile
;exports.VERSION=_VERSION_STRING;exports.name=_NAME
;if(typeof window!="undefined"){window.ejs=exports}})(ejs)
;function extractSegmentationCookie(){
const cookiePrefix=`${COOKIE_NAME_SEGMENTATION_CDP_SEGMENTS}=`
;const segmentationCookie=document.cookie.split("; ").find((cookie=>cookie.startsWith(cookiePrefix)))
;return(segmentationCookie||"").replace(cookiePrefix,"")}
function applyKeywordRedirection(response){var _a
;if(response===null||response===void 0?void 0:response.keywordRedirect){
localStorage.setItem("keywordRedirect",JSON.stringify({
original_query:response.keywordRedirect["original query"],
redirected_query:response.keywordRedirect["redirected query"],
redirected_url:response.keywordRedirect["redirected url"]}))
;const redirectedUrl=((_a=response.keywordRedirect)===null||_a===void 0?void 0:_a["redirected url"])||""
;window.location.href=`${!redirectedUrl.startsWith("http")?"https://":""}${redirectedUrl}`
}}async function getRequest(url,options){const response=await fetch(url,options)
;const result=await response.json();return result}const requestOptions={
method:"GET",headers:{"Content-Type":"application/json"}}
;function extractTrackingCookie(){
const trackingCookie=document.cookie.split("; ").find((cookie=>cookie.startsWith("_br_uid_2=")))
;return trackingCookie?trackingCookie.replace("_br_uid_2=",""):"uid%3D7797686432023%3Av%3D11.5%3Ats%3D1428617911187%3Ahc%3D55"
}
const formatAsCurrency=(cents,currencySign="$",onFront=true)=>`${onFront?currencySign:""}${(cents/100).toLocaleString(undefined,{
minimumFractionDigits:2,maximumFractionDigits:2
})}${!onFront?` ${currencySign}`:""}`;function generateRequestId(){
const requestID=Math.floor(1e12+Math.random()*9e12);return requestID}
const ENDPOINT_AUTOSUGGEST_API="https://suggest.dxpapi.com/api/v2/suggest/"
;const ENDPOINT_PRODUCT_SEARCH_API="https://core.dxpapi.com/api/v1/core/"
;const NO_ENCODE_PARAMETERS=["_br_uid_2","fq","sort"]
;const FIELD_LIST_DEFAULT="pid,title,brand,price,sale_price,thumb_image,sku_thumb_images,sku_swatch_images,sku_color_group,url,price_range,sale_price_range,description,is_live,score,skuid,group"
;function buildQueryParameters(apiCallParameters){
return`?${Object.keys(apiCallParameters).reduce(((queryParameters,parameterName)=>[...queryParameters,`${parameterName}=${NO_ENCODE_PARAMETERS.includes(parameterName)?apiCallParameters[parameterName]:encodeURIComponent(apiCallParameters[parameterName])}`]),[]).join("&")}`
}function buildSearchRequestUrl(parameters){
const apiParameters=Object.assign({},parameters)
;const endpoint=(apiParameters===null||apiParameters===void 0?void 0:apiParameters.endpoint)||ENDPOINT_PRODUCT_SEARCH_API
;if(apiParameters===null||apiParameters===void 0?void 0:apiParameters.endpoint)apiParameters===null||apiParameters===void 0?true:delete apiParameters.endpoint
;if(!(apiParameters===null||apiParameters===void 0?void 0:apiParameters.fl))apiParameters.fl=FIELD_LIST_DEFAULT
;return`${endpoint}${buildQueryParameters(apiParameters)}`}
function buildAutosuggestRequestUrl(parameters){
const apiParameters=Object.assign({},parameters)
;const endpoint=(apiParameters===null||apiParameters===void 0?void 0:apiParameters.endpoint)||ENDPOINT_AUTOSUGGEST_API
;if(apiParameters===null||apiParameters===void 0?void 0:apiParameters.endpoint)apiParameters===null||apiParameters===void 0?true:delete apiParameters.endpoint
;return`${endpoint}${buildQueryParameters(apiParameters)}`}
async function getSuggestions(params){
const url=buildAutosuggestRequestUrl(params);const options=requestOptions
;return getRequest(url,options)}async function getSearchResults(params){
const url=buildSearchRequestUrl(params);const options=requestOptions
;return getRequest(url,options)}
var searchLayoutTemplate='<% if (did_you_mean.length) { %>\n  <div class="blm-product-search-header">\n    <div class="blm-product-search-header-container">\n      <h1 class="blm-product-search-header-container__title">Results for\n        <% if (locals.keywordRedirect && keywordRedirect.redirected_url) { %>\n          <i><%- keywordRedirect.redirected_url %></i>\n        <% } else { %>\n          <i><%- did_you_mean[0] %></i>\n        <% } %>\n         instead of <i class="blm-product-search-header-container__title__searched-word"><%- locals[config.default_search_parameter] %></i></h1>\n      <div class="blm-did-you-mean-suggestion">\n        <label class="blm-did-you-mean-suggestion__label">Did you mean:</label>\n        <% did_you_mean.forEach(function(word) { %>\n        <a href="<%= config.search_page_url %>?<%= config.default_search_parameter %>=<%= word %>" class="blm-did-you-mean-suggestion__link"><%- word %></a>\n        <% }); %>\n      </div>\n      <% if (locals.keywordRedirect && keywordRedirect.redirected_query) { %>\n      <div class="blm-redirected-keyword">Redirected from <i>"<%- keywordRedirect.redirected_query %>"</i>.</div>\n      <% } %>\n    </div>\n  </div>\n<% } %>\n<% if (locals.keywordRedirect && keywordRedirect.redirected_query && did_you_mean.length === 0) { %>\n  <div class="blm-product-search-header">\n    <div class="blm-product-search-header-container">\n      <h1 class="blm-product-search-header-container__title">Results for <i><%- keywordRedirect.redirected_query %></i> </h1>\n      <div class="blm-redirected-keyword">Redirected from <i>"<%- keywordRedirect.original_query %>"</i> </div>\n    </div>\n  </div>\n<% } %>\n<div class="blm-<% if (config.search.is_category_page) { %>category<% } else { %>product-search<% } %> blm-results <% if (config.search.facets_included) { %>with-facets<% } %>">\n    <% if (config.search.facets_included && facets.length) { %>\n    <aside class="blm-product-search-sidebar">\n\n      <button class="blm-product-search-control-button blm-product-search-control-button--sidebar">\n        Filter\n        <svg viewBox="0 0 14.8 14.8" class="blm-product-search-control-button__icon" focusable="false"><path d="M1.6 14.8V0m6 14.8V1.6m5.6 13.2V0" fill="none" stroke="#000" stroke-miterlimit="10"></path><circle cx="1.6" cy="7.4" r="1.6"></circle><circle cx="13.2" cy="10.4" r="1.6"></circle><circle cx="7.6" cy="1.6" r="1.6"></circle></svg>\n      </button>\n\n      <% if (locals.selectedFilterItems && selectedFilterItems.length > 0) { %>\n        <div class="blm-product-search-selected-filters">\n          <h4 class="blm-product-search-selected-filters__title">Filters</h4>\n\n          <% selectedFilterItems.forEach(function(filterIitem) { %>\n            <span class="blm-product-search-selected-filter" data-filter-checkbox-id="<%- filterIitem.checkbox_id %>"><%- filterIitem.label %>\n              <span class="blm-product-search-selected-filter__clear">&times;</span>\n            </span>\n          <% }) %>\n\n          <button class="blm-product-search-selected-filters__clear-all">Clear all</button>\n        </div>\n      <% } %>\n\n      <div class="blm-product-search-sidebar-content <% if (locals.isFiltersPanelOpened && isFiltersPanelOpened) { %>blm-open<% } %>">\n\n        <button class="blm-product-search-control-button blm-product-search-control-button--sidebar blm-product-search-control-button--active">\n          Done\n          <svg viewBox="0 0 14.8 14.8" class="blm-product-search-control-button__icon" focusable="false"><path class="blm-product-search-control-button__icon-path" d="M1.6 14.8V0m6 14.8V1.6m5.6 13.2V0" fill="none" stroke="#000" stroke-miterlimit="10"></path><circle cx="1.6" cy="7.4" r="1.6"></circle><circle cx="13.2" cy="10.4" r="1.6"></circle><circle cx="7.6" cy="1.6" r="1.6"></circle></svg>\n        </button>\n\n        <div id="blm-product-search-search-filters">\n          <input id="blm-product-search-search-filters__input" placeholder="Type to search filters" />\n        </div>\n\n        <div class="blm-product-search-filter">\n          <h4 class="blm-product-search-filter-title">Price</h4>\n          <div class="blm-price-range-container">\n            <div class="blm-range-slider">\n              <input\n                value="<%= checkedFacets.price ? checkedFacets.price[0] : priceRangeFacet.start %>"\n                min="<%- priceRangeFacet.start %>"\n                max="<%- priceRangeFacet.end %>"\n                step="1"\n                type="range"\n                class="blm-price-range-input blm-price-range-input--lower blm-price-range-input--lower-%%-REQUEST_ID-%%"\n              >\n              <span class="blm-price-range-slider-rail"></span>\n              <input\n                value="<%= checkedFacets.price ? checkedFacets.price[1] : priceRangeFacet.end %>"\n                min="<%- priceRangeFacet.start %>"\n                max="<%- priceRangeFacet.end %>"\n                step="1"\n                type="range"\n                class="blm-price-range-input blm-price-range-input--upper blm-price-range-input--upper-%%-REQUEST_ID-%%"\n              >\n            </div>\n            <div class="blm-range-slider__values">\n              <span class="blm-range-slider__values--min">\n                <%= checkedFacets.price ? config.format_money(checkedFacets.price[0] * 100) : config.format_money(priceRangeFacet.start * 100) %>\n              </span>\n              <% if (checkedFacets.price) { %>\n                <span class="blm-range-slider__values--max">\n                  <%= checkedFacets.price ? config.format_money(checkedFacets.price[1] * 100) : config.format_money(priceRangeFacet.start * 100) %>\n                </span>\n              <% } else { %>\n                <span class="blm-range-slider__values--max">\n                  <%= config.format_money(priceRangeFacet.end * 100) %>\n                </span>\n              <% } %>\n            </div>\n          <% if (checkedFacets.price) { %>\n            <div class="blm-range-slider__clear-values">\n              <button class="blm-range-slider__clear-values-button blm-range-slider__clear-values-button--%%-REQUEST_ID-%%">Clear</button>\n            </div>\n          <% } %>\n          </div>\n        </div>\n\n        <% facets.forEach(function(facet, facetIndex) { %>\n          <% if (facet.section.length > 0) { %>\n          <div class="blm-product-search-filter blm-dynamic-filter" id="blm-facet-block-item-<%= facetIndex %>">\n            <h4 class="blm-product-search-filter-title"><%- facet.title %></h4>\n            <ul class="blm-product-search-filter-items">\n              <% facet.section.forEach(function(item) { %>\n              <li class="blm-product-search-filter-item">\n                <input\n                  type="checkbox"\n                  <% if (facet.original_title in checkedFacets && checkedFacets[facet.original_title].includes(escapeSpecialCharacters(item.id))) { %>checked<% } %>\n                  name="<%- facet.original_title %>"\n                  value="<%- escapeSpecialCharacters(item.id) %>"\n                  id="<%- facet.original_title + \'[\' + escapeSpecialCharacters(item.name) + \']\' %>"\n                  class="blm-product-search-filter-item__checkbox"\n                />\n                <label class="blm-product-search-filter-item__name" for="<%- facet.original_title + \'[\' + escapeSpecialCharacters(item.name) + \']\' %>"><%- item.name %></label>\n                <% if (!config.search.display_variants) { %>\n                <span class="blm-product-search-filter-item__badge"><%- item.count %></span>\n                <% } %>\n              </li>\n              <% }); %>\n            </ul>\n            <% if (facet.section.length > config.search.initial_number_of_facet_values) { %>\n            <div class="blm-product-search-load-more" data-item="<%= facetIndex %>">+ More</div>\n            <% } %>\n          </div>\n          <% } %>\n        <% }); %>\n\n        <% if (facets[0].section.length) { %>\n        <div class="blm-load-more-facet blm-load-more-facet--%%-REQUEST_ID-%%">+ More </div>\n        <% } %>\n\n      </div>\n    </aside>\n    <% } %>\n    <section class="blm-product-search-main">\n      <div class="blm-product-search-toolbar">\n        <%\n          const haveUngroupedResults = locals.number_of_results && number_of_results > 0;\n          const haveGroupedResults = locals.grouped_products && grouped_products.groups.length > 0;\n        %>\n        <% if (haveUngroupedResults || haveGroupedResults) { %>\n          <% if (haveUngroupedResults) { %>\n          <h2 class="blm-product-search-toolbar__title">\n            Showing <%- start + 1 %> - <%- Math.min(start + products.length, number_of_results) %> of <%- number_of_results %> products\n          </h2>\n          <% } %>\n        <div class="blm-product-search-toolbar-options">\n          <% if (config.search.groupby) { %>\n          <span class="blm-product-search-toolbar-options blm-product-search-toolbar-options--groupby">\n            <label for="groupby-%%-REQUEST_ID-%%" class="blm-product-search-toolbar-options__label">Group By: </label>\n            <select\n              name="groupby"\n              id="groupby-%%-REQUEST_ID-%%"\n              class="blm-product-search-toolbar-options__select"\n            >\n              <% config.search.groupby_options.forEach(function(option) { %>\n                <option value="<%- option.value %>" <% if (locals.groupby && groupby === option.value) { %>selected<% } %>><%- option.label %></option>\n              <% }) %>\n            </select>\n          </span>\n          <% } %>\n          <% if (!config.search.infinite_scroll && paginationData.length > 0) { %>\n          <span class="blm-product-search-toolbar-options blm-product-search-toolbar-options--page-size">\n            <label for="sort-size-%%-REQUEST_ID-%%" class="blm-product-search-toolbar-options__label">Size: </label>\n            <select\n              name="sort-size"\n              id="sort-size-%%-REQUEST_ID-%%"\n              class="blm-product-search-toolbar-options__select"\n            >\n              <% for (let i = (config.search.groupby ? 4 : 16); i <= (config.search.groupby ? 16 : 48); i += 4) { %>\n                <option value="<%- i %>" <% if (locals.size && size === i) { %>selected<% } %>><%- i %></option>\n              <% } %>\n            </select>\n          </span>\n          <% } %>\n          <span class="blm-product-search-toolbar-options blm-product-search-toolbar-options--sort-by">\n            <label for="sort-by-%%-REQUEST_ID-%%" class="blm-product-search-toolbar-options__label">Sort By: </label>\n            <select\n              name="sort-by"\n              id="sort-by-%%-REQUEST_ID-%%"\n              class="blm-product-search-toolbar-options__select"\n            >\n              <% config.search.sorting_options.forEach(function(option) { %>\n                <option value="<%- option.value %>" <% if (locals.sort && sort === option.value) { %>selected<% } %>><%- option.label %></option>\n              <% }) %>\n            </select>\n          </span>\n        </div>\n        <% } else if (!(locals.grouped_products) || grouped_products.groups.length < 1) { %>\n        <h2 class="blm-product-search-toolbar__title">\n          No results found\n        </h2>\n        <% } %>\n\n      </div>\n      <div <% if (products.length && !locals.grouped_products) { %>class="blm-product-search__results"<% } %>>\n        <% if (products.length || (locals.grouped_products && grouped_products.groups.length > 0)) { %>\n          %%-PRODUCT_LIST_TEMPLATE-%%\n        <% } %>\n      </div>\n\n      <% if (!config.search.infinite_scroll && paginationData.length > 0) { %>\n      <div class="blm-product-search-pagination">\n        <ul class="blm-product-search-pagination__pages blm-product-search-pagination__pages--%%-REQUEST_ID-%%">\n          <% paginationData.forEach(paginationNode => { %>\n            <li class="blm-product-search-pagination__page">\n              <button <% if (paginationNode.disabled) { %>disabled<% } %> class="blm-product-search-pagination__page-link <% if (paginationNode.active) { %>blm-product-search-pagination__page-link--active<% } %>" data-value="<%- paginationNode.value %>"\n                ><%- paginationNode.label ?? paginationNode.value %></button\n              >\n            </li>\n          <% }) %>\n        </ul>\n      </div>\n      <% } %>\n    </section>\n  </div>\n'
;var searchListTemplate='<% function printProduct(product) { %>\n  <div class="blm-product-search__result" <% if (product.variant_name) { %>title="<%- product.variant_name %>"<% } %>>\n    <%\n      const matchingVariant = !Array.isArray(product.variants)\n        ? null\n        : \'variant_index\' in product\n          ? product.variants[product.variant_index]\n          : product.variants.find(variant => selectedColors.includes(variant.sku_color_group ? variant.sku_color_group.toLowerCase() : null))\n    %>\n    <div class="blm-product-search-image-container">\n      <% if (product.variants && product.variants.length > 1) { %>\n        <% product.variants.forEach(function(variant, index) { %>\n\n        <%\n          const isActiveVariant =\n            !(\'variant_index\' in product) && !selectedColors.length\n              ? index === 0\n              : \'variant_index\' in product\n                ? product.variant_index === index\n                : matchingVariant == variant\n        %>\n\n        <div class="blm-product-search-swatch-image fade"\n          <% if (isActiveVariant) { %>style="display: block"<% } %>\n        >\n          <img\n            class="blm-product-search-image-container__image"\n            alt="title"\n            src="<%= variant.image %>"\n          />\n        </div>\n        <% }); %>\n      <% } else { %>\n        <div class="blm-product-search-swatch-image fade" style="display: block"\n        >\n          <img\n            class="blm-product-search-image-container__image"\n            alt="title"\n            src="<%= product.image %>"\n          />\n        </div>\n      <% } %>\n    </div>\n    <div class="blm-product-search-details-container">\n      <div class="blm-product-search-details-title-container">\n        <a href="<%= product.link %>" class="blm-product-search-details-container__title"\n          ><%- product.title %></a\n        >\n      </div>\n\n      <% if (product.variants && product.variants.length > 1) { %>\n        <% product.variants.forEach(function(variant, index) { %>\n          <%\n            const isActiveVariant =\n              !(\'variant_index\' in product) && !selectedColors.length\n                ? index === 0\n                : \'variant_index\' in product\n                  ? product.variant_index === index\n                  : matchingVariant == variant\n          %>\n          <p class="blm-product-search-details-container__price <% if (isActiveVariant) { %>active<% } %>">\n            <%\n              const salePrice = variant.sku_sale_price !== undefined ? variant.sku_sale_price : product.sale_price;\n              const price = variant.sku_price !== undefined ? variant.sku_price : product.price;\n            %>\n            <%= config.format_money((salePrice !== undefined ? salePrice : price).toFixed(2) * 100) %>\n            <% if (salePrice !== undefined) { %>\n              <span <% if (salePrice !== undefined) { %>class="blm-product-search-details-container__price--strike-through"<% } %>>\n                <%= config.format_money(price.toFixed(2) * 100) %>\n              </span>\n            <% } %>\n          </p>\n        <% }); %>\n      <% } else { %>\n        <p class="blm-product-search-details-container__price active">\n          <%= config.format_money((product.sale_price !== undefined ? product.sale_price : product.price).toFixed(2) * 100) %>\n          <% if (product.sale_price !== undefined) { %>\n            <span <% if (product.sale_price !== undefined) { %>class="blm-product-search-details-container__price--strike-through"<% } %>>\n              <%= config.format_money(product.price.toFixed(2) * 100) %>\n            </span>\n          <% } %>\n        </p>\n      <% } %>\n\n    </div>\n\n    <% if (product.variants && product.variants.length > 1) { %>\n      <ul class="blm-product-search-swatch-container">\n      <% product.variants.slice(0, defaultMaxColorSwatches || 0).forEach(function(variant, index) { %>\n        <%\n          const isActiveVariant =\n            !(\'variant_index\' in product) && !selectedColors.length\n              ? index === 0\n              : \'variant_index\' in product\n                ? product.variant_index === index\n                : matchingVariant == variant\n        %>\n        <li\n          class="blm-product-search-swatch-container__swatch <% if (isActiveVariant) { %>active<% } %>"\n          style="background-image: url(\'<%= variant.image %>\')"\n        ></li>\n      <% }); %>\n      </ul>\n\n      <% if (product.variants.length > defaultMaxColorSwatches || 0) { %>\n      <small class="blm-product-search-swatch-colors">(Colors) <%- product.variants.length %></small>\n      <% } %>\n    <% } %>\n  </div>\n<% } %>\n\n<% if (locals.grouped_products && grouped_products && grouped_products.groups) { %>\n\n  <% grouped_products.groups.forEach(group => { %>\n  <div class="blm-result-group">\n    <h3 class="blm-result-group__title"><%- group.title %></h3>\n\n    <div class="blm-product-search__results">\n      <% group.products.forEach(printProduct); %>\n    </div>\n  </div>\n  <% }); %>\n\n<% } else { %>\n\n  <% products.forEach(printProduct); %>\n\n<% } %>\n'
;var autosuggestTemplate='<% if (terms.length || productSuggestions.length) { %>\n  <div class="blm-autosuggest">\n    <div class="blm-autosuggest__suggestion-terms-container">\n      <ul class="blm-autosuggest__suggestion-terms">\n        <% terms.forEach(function(term) { %>\n          <li class="blm-autosuggest__suggestion-term">\n            <a href="<%- term.link %>" class="blm-autosuggest__suggestion-term-link" data-suggestion-text="<%- term.text %>"\n              ><%- term.processedText %></a\n            >\n            <% if (term.categories) { %>\n              <ul class="blm-autosuggest__category-results">\n                <% term.categories.forEach(function(category) { %>\n                <li class="blm-autosuggest__suggestion-term">\n                  <a href="#"\n                     data-category-id="<%- category.value %>"\n                     data-suggestion-text="<%- category.name %>"\n                     class="blm-autosuggest__suggestion-term-link blm-autosuggest__suggestion-term-link--category"\n                    ><%- category.name %></a\n                  >\n                </li>\n                <% }); %>\n              </ul>\n            <% } %>\n          </li>\n        <% }); %>\n      </ul>\n    </div>\n\n    <div class="blm-autosuggest__results-container">\n      <div class="blm-autosuggest__results">\n        <% productSuggestions.forEach(function(suggestion) { %>\n          <div class="blm-autosuggest__result">\n            <div class="blm-autosuggest-result-image">\n              <a\n                title="<%= suggestion.title %>"\n                aria-hidden="true"\n                tabindex="-1"\n                href="<%= suggestion.link %>"\n                class="blm-autosuggest-result-image__link"\n                ><img\n                  class="blm-autosuggest-result-image__image"\n                  src="<%= suggestion.image %>"\n              /></a>\n            </div>\n            <div class="blm-autosuggest-result-details">\n              <a class="blm-autosuggest-result-details__title" href="<%= suggestion.link %>"\n                ><%= suggestion.title %></a\n              >\n              <div class="blm-autosuggest-result-details__price blm-autosuggest-result-details__price--final">\n                <% if (config.format_money) { %>\n                  <%= config.format_money(suggestion.sale_price.toFixed(2) * 100) %>\n                <% } else { %>\n                  <%= config.default_currency %><%= suggestion.sale_price.toFixed(2) %>\n                <% } %>\n                <% if (suggestion.price) { %>\n                  <span\n                  class="blm-autosuggest-result-details__price blm-autosuggest-result-details__price--original"\n                  >\n                   <% if (config.format_money) { %>\n                     <%= config.format_money(suggestion.price.toFixed(2) * 100) %>\n                   <% } else { %>\n                     <%= config.default_currency %><%= suggestion.price.toFixed(2) %>\n                   <% } %>\n                  </span\n                >\n                <% } %>\n              </div>\n            </div>\n          </div>\n        <% }); %>\n      </div>\n    </div>\n\n  </div>\n  <% } %>\n'
;function buildBaseConfig(){var _a
;const connectorConfig=(_a=window===null||window===void 0?void 0:window.bloomreachConnector)===null||_a===void 0?void 0:_a.config
;const config=Object.assign({default_search_parameter:DEFAULT_SEARCH_PARAMETER,
url:window.location.href,ref_url:window.location.href,
tracking_cookie:extractTrackingCookie(),
format_money:cents=>formatAsCurrency(cents,window.bloomreachDefaultCurrency||DEFAULT_CURRENCY),
default_currency:window.bloomreachDefaultCurrency||DEFAULT_CURRENCY
},connectorConfig);return config}function buildAutosuggestConfig(){
const baseConfig=buildBaseConfig();const config=Object.assign(Object.assign({
request_type:REQUEST_TYPE_SUGGEST},baseConfig),{autosuggest:Object.assign({
enabled:true,endpoint:"",number_of_terms:NUMBER_OF_AUTOSUGGEST_TERMS,
number_of_products:NUMBER_OF_AUTOSUGGEST_PRODUCTS,
number_of_collections:NUMBER_OF_AUTOSUGGEST_COLLECTIONS,
selector:SELECTOR_AUTOSUGGEST_INPUT,template:autosuggestTemplate,
catalog_views:""},baseConfig.autosuggest)});return config}
function buildSearchConfig(){var _a,_b,_c;const baseConfig=buildBaseConfig()
;const urlParameters=new URLSearchParams(window.location.search)
;const state=getCurrentSearchRequestState()
;const defaultSearchProperties=Object.assign({display_variants:false,
enabled:true,endpoint:"",items_per_page:DEFAULT_PAGE_SIZE,facets_included:true,
initial_number_of_facets:NUMBER_OF_FACET_GROUPS,
initial_number_of_facet_values:NUMBER_OF_FACET_VALUES,infinite_scroll:false,
selector:SELECTOR_SEARCH_RESULTS_CONTAINER,
sorting_options:DEFAULT_SORTING_OPTIONS,template:searchLayoutTemplate,
product_list_template:searchListTemplate
},(baseConfig===null||baseConfig===void 0?void 0:baseConfig.search)?baseConfig.search:{})
;const config=Object.assign(Object.assign({},baseConfig),{
request_type:REQUEST_TYPE_SEARCH,
search_type:state.is_category_page?SEARCH_TYPE_CATEGORY:SEARCH_TYPE_KEYWORD,
start:DEFAULT_START,"facet.range":FIELD_NAME_PRICE,
"stats.field":FIELD_NAME_PRICE,sort:urlParameters.get(PARAMETER_NAME_SORT)||"",
search:Object.assign(Object.assign(Object.assign({},defaultSearchProperties),(state.is_category_page?baseConfig.category:baseConfig.search)||{}),state.category_to_load?{
category_id:state.category_to_load}:{})})
;(_c=(_b=(_a=config.search)===null||_a===void 0?void 0:_a.sorting_options)===null||_b===void 0?void 0:_b.sort)===null||_c===void 0?void 0:_c.call(_b,((option1,option2)=>option1.value>option2.value?1:-1))
;if(config.search){config.search=Object.assign(Object.assign({},config.search),{
items_per_page:Number(urlParameters.has(PARAMETER_NAME_SIZE)?urlParameters.get(PARAMETER_NAME_SIZE):config.search.items_per_page),
groupby:urlParameters.get(PARAMETER_NAME_GROUPBY)||config.search.groupby||""})}
return config}function buildPaginationData(results){
if("grouped_products"in results)return buildGroupedPaginationData(results)
;return buildRegularPaginationData(results)}
function buildRegularPaginationData(results){const pageSize=results.size||1
;if(results.number_of_results<=pageSize){return[]}
const page=Math.ceil((results.start+1)/pageSize)
;const numberOfAllPages=Math.ceil(results.number_of_results/pageSize)
;const beforeNumbers=Array(page-1).fill(null).map(((_,index)=>index+1)).slice(-MAX_PAGINATION_NUMBER_BEFORE_CURRENT)
;const afterNumbers=Array(numberOfAllPages-page).fill(null).map(((_,index)=>index+(page+1))).slice(0,MAX_PAGINATION_NUMBER_AFTER_CURRENT)
;return[...page>1?[{value:"previous",label:"&larr;"
}]:[],...page-1>MAX_PAGINATION_NUMBER_BEFORE_CURRENT?[{label:"&hellip;",
value:(page-MAX_PAGINATION_NUMBER_BEFORE_CURRENT-1).toString()
}]:[],...beforeNumbers.map((number=>({value:number.toString()}))),{
value:page.toString(),disabled:true,active:true},...afterNumbers.map((number=>({
value:number.toString()
}))),...page+MAX_PAGINATION_NUMBER_AFTER_CURRENT<numberOfAllPages?[{
label:"&hellip;",value:(page+MAX_PAGINATION_NUMBER_AFTER_CURRENT+1).toString()
}]:[],...page<numberOfAllPages?[{value:"next",label:"&rarr;"}]:[]]}
function buildGroupedPaginationData(results){var _a
;const page=Number(results.page||1);const pageSize=results.size||1
;const numberOfGroups=(((_a=results===null||results===void 0?void 0:results.grouped_products)===null||_a===void 0?void 0:_a.groups)||[]).length
;return[{value:"previous",label:"Previous",disabled:page<=1},{value:"next",
label:"Next",disabled:numberOfGroups<pageSize}]}
const escapeSpecialCharacters=value=>value.replace(/"/g,"&quot;").replace(/,/g,"%%-COMMA-%%")
;const decodeSpecialCharacters=value=>value.replace(/%%-COMMA-%%/g,",").replace(/&quot;/g,'"')
;const convertFacetsToQueryString=facets=>Object.keys(facets).map((facetName=>{
if(facetName==="price"){
return encodeURIComponent(`${facetName}:[${facets[facetName].map((value=>`${value}`)).join(" TO ")}]`)
}
return encodeURIComponent(`${facetName}:${facets[facetName].map((value=>`"${decodeSpecialCharacters(value)}"`)).join(" OR ")}`)
})).join("&fq=");let memoizedNS;const NOOP=Object.assign((()=>{}),{warn:()=>{},
error:()=>{},verbose:()=>{}});let colorIndex=-1;const memoizedColor=new Map
;const pickColor=ns=>{if(memoizedColor.has(ns))return memoizedColor.get(ns)
;const color=["#00a3ff","#ff00a3","#a3ff00","#00ffa3","#a300ff","#ffaa00","#00ffaa","#ff00aa","#aa00ff","#00aaff"][++colorIndex%10]||"#00a3ff"
;memoizedColor.set(ns,color);return color};const Debug=ns=>{
const active=activeNS();if(!active.has(ns)&&!active.has("*"))return NOOP
;const color=pickColor(ns)
;const logger=console.log.bind(console,`%c${ns}`,`color: ${color}`)
;logger.warn=console.warn.bind(console,`%c${ns}`,`color: ${color}`)
;logger.error=console.error.bind(console,`%c${ns}`,`color: ${color}`)
;if(active.has(`${ns}:verbose`)||active.has("*")){
logger.verbose=console.log.bind(console,`%c${ns}:verbose`,`color: ${color}`)
}else{logger.verbose=()=>{}}return logger};function activeNS(){
if(memoizedNS)return memoizedNS;const storage=window.localStorage
;if(!storage)return new Set;const ns=storage.getItem("debug")||""
;memoizedNS=new Set(ns.split(";"));return memoizedNS}
function invariant(truthy,message){if(truthy)return;throw new Error(message)}
Debug("br:autosuggest");function hideAllDynamicFacetGroups(){
[".blm-dynamic-filter",".blm-product-search-filter-item",".blm-product-search-load-more"].forEach((selector=>{
document.querySelectorAll(selector).forEach((item=>{
item.removeAttribute("style")}))}))}
function loadMoreFacetGroups(numberOfFacetGroupsParameter){var _a;let i=0
;let numberOfHiddenBoxWithVisibleChildren=0;const config=buildSearchConfig()
;const numberOfFacetGroups=Number(numberOfFacetGroupsParameter||((_a=config.search)===null||_a===void 0?void 0:_a.initial_number_of_facets))
;document.querySelectorAll('.blm-dynamic-filter:not([style*="display: block"])').forEach((item=>{
const visibleChildren=item===null||item===void 0?void 0:item.querySelectorAll('.blm-product-search-filter-item:not([style*="display: none"]')
;if(i<numberOfFacetGroups&&visibleChildren.length>0){
item===null||item===void 0?void 0:item.setAttribute("style","display: block")}
i++;numberOfHiddenBoxWithVisibleChildren+=visibleChildren.length>0?1:0}))
;const currentSearchRequestState=getCurrentSearchRequestState()
;const loadMoreFacetGroupsElement=document.querySelector(`.blm-load-more-facet--${currentSearchRequestState.request_id}`)
;const numberOfHiddenBoxes=document.querySelectorAll('.blm-dynamic-filter:not([style*="display: block"])').length
;if(numberOfHiddenBoxes===0||numberOfHiddenBoxWithVisibleChildren===0){
loadMoreFacetGroupsElement===null||loadMoreFacetGroupsElement===void 0?void 0:loadMoreFacetGroupsElement.classList.add("blm-hide")
}}function getLoadMoreFacetGroupsElement(){
const currentSearchRequestState=getCurrentSearchRequestState()
;const element=document.querySelector(`.blm-load-more-facet--${currentSearchRequestState.request_id}`)
;invariant(element,"the element for loading more facet groups must be in the DOM")
;return element}function resetFacetGroups(){var _a,_b,_c
;const config=buildSearchConfig()
;const numberOfDisplayedFacetGroups=Number((_a=config.search)===null||_a===void 0?void 0:_a.initial_number_of_facets)
;const numberOfDisplayedFacetValues=Number((_b=config.search)===null||_b===void 0?void 0:_b.initial_number_of_facet_values)
;hideAllDynamicFacetGroups();loadMoreFacetGroups(numberOfDisplayedFacetGroups-1)
;document.querySelectorAll(`.blm-product-search-filter-item:nth-child(-n+${numberOfDisplayedFacetValues})`).forEach((item=>item.style.display="block"))
;(_c=getLoadMoreFacetGroupsElement())===null||_c===void 0?void 0:_c.removeAttribute("style")
}function getSearchResultsContainerElement(){var _a
;const config=buildSearchConfig()
;invariant((_a=config.search)===null||_a===void 0?void 0:_a.selector,"the selector of search results container element must be set")
;const searchResultsContainerElement=document.querySelector(config.search.selector)
;return searchResultsContainerElement}
function getSearchResultsListContainerElement(){var _a
;const searchResultsListContainerElement=(_a=document.querySelector(".blm-product-search-main"))===null||_a===void 0?void 0:_a.lastElementChild
;return searchResultsListContainerElement}
function getAutosuggestSearchInputElement(){
const config=buildAutosuggestConfig();if(!config.autosuggest)return null
;invariant(config.autosuggest.selector,"the selector of search results container element must be set")
;const autosuggestInputElement=document.querySelector(config.autosuggest.selector)
;return autosuggestInputElement}
function getAutosuggestResultsContainerElement(){
const autosuggestResultsContainerElement=document.querySelector(".blm-autosuggest-search-results")
;return autosuggestResultsContainerElement}function resetLoadingIndicator(){
const scrollIndicator=document.querySelector(".blm-scroll-indicator")
;if(scrollIndicator){scrollIndicator.innerHTML=""
;const loaderElement=document.createElement("div")
;loaderElement.classList.add("blm-scroll-indicator__loading")
;scrollIndicator.appendChild(loaderElement)}}function getCheckedFacetValues(){
const checkedCheckboxes=document.querySelectorAll(".blm-product-search-filter-item__checkbox:checked")
;return checkedCheckboxes?Array.from(checkedCheckboxes).reduce(((all,current)=>Object.assign(Object.assign({},all),{
[current.name]:all[current.name]?[...all[current.name]||[],current.value]:[current.value]
})),{}):{}}function restoreScrollPosition(){var _a
;const storedScrollPositions=JSON.parse(window.localStorage.getItem("scrollPositions")||"{}")
;const currentUriEncoded=encodeURI(window.location.href)
;if(currentUriEncoded in storedScrollPositions){
const scrollPosition=parseInt((_a=storedScrollPositions[currentUriEncoded])===null||_a===void 0?void 0:_a.scrollPosition,10)
;setTimeout((()=>{document.documentElement.scrollTop=scrollPosition
;document.body.scrollTop=scrollPosition}),250)}
delete storedScrollPositions[encodeURI(window.location.href)]
;window.localStorage.setItem("scrollPositions",JSON.stringify(storedScrollPositions))
}function beforeUnloadWindowEvent(){let scrollPosition
;if(typeof window.pageYOffset!=="undefined"){scrollPosition=window.pageYOffset
}else if(typeof document.compatMode!=="undefined"&&document.compatMode!=="BackCompat"){
scrollPosition=document.documentElement.scrollTop
}else if(typeof document.body!=="undefined"){
scrollPosition=document.body.scrollTop}
const storedScrollPositions=JSON.parse(window.localStorage.getItem("scrollPositions")||"{}")
;window.localStorage.setItem("scrollPositions",JSON.stringify(Object.assign(Object.assign({},storedScrollPositions),{
[encodeURI(window.location.href)]:{scrollPosition:scrollPosition}})))}
function setupSavingScrollPosition(){unmountSaveScrollPosition()
;window.addEventListener("beforeunload",beforeUnloadWindowEvent)}
function unmountSaveScrollPosition(){
window.removeEventListener("beforeunload",beforeUnloadWindowEvent)}
var breakpoints;(function(breakpoints){breakpoints["small"]="480px"
;breakpoints["medium"]="680px";breakpoints["large"]="750px"
;breakpoints["xlarge"]="875px";breakpoints["xxlarge"]="1000px"
;breakpoints["xxxlarge"]="1200px"})(breakpoints||(breakpoints={}))
;const isMobileView=window.matchMedia(`(max-width: ${breakpoints.medium})`)
;window.matchMedia(`(min-width:${breakpoints.medium}) and (max-width: ${breakpoints.xlarge})`)
;function updateUrl(urlParameters){const historyStateObject={}
;for(const pair of urlParameters.entries()){historyStateObject[pair[0]]=pair[1]}
window.history.pushState(historyStateObject,document.title,`?${urlParameters.toString()}`)
}
function updateMultipleInstanceParametersInUrl(parameterName,parameters,userOptions){
const defaultOptions={
valueSerializer:parameterValue=>parameterValue.toString().replace(/"/g,'\\"'),
nameValueSeparator:":"}
;const options=Object.assign(Object.assign({},defaultOptions),userOptions)
;const urlParameters=new URLSearchParams(window.location.search)
;urlParameters.delete(parameterName);if(Array.isArray(parameters)){
parameters.forEach((value=>{
urlParameters.append(parameterName,options.valueSerializer(value))}))}else{
Object.keys(parameters).forEach((key=>{
urlParameters.append(parameterName,`${key}${options.nameValueSeparator}${options.valueSerializer(parameters[key])}`)
}))}updateUrl(urlParameters)}
function updateParameterInUrl(parameterName,newValue){
const urlParameters=new URLSearchParams(window.location.search)
;if(typeof newValue==="function"){
urlParameters.set(parameterName,newValue(urlParameters.get(parameterName)).replace(/"/g,'\\"'))
}else if(newValue===""){urlParameters.delete(parameterName)}else{
urlParameters.set(parameterName,newValue.replace(/"/g,'\\"'))}
updateUrl(urlParameters)}function incrementParameterInUrl(parameterName){
updateParameterInUrl(parameterName,(oldValue=>{if(!oldValue)return"2"
;let newValue=Number.parseInt(oldValue,10);return(++newValue).toString()}))}
function decrementParameterInUrl(parameterName){
updateParameterInUrl(parameterName,(oldValue=>{if(!oldValue)return"1"
;let newValue=Number.parseInt(oldValue,10);return(--newValue).toString()}))}
function buildPriceUrlParameterObject(){
const currentSearchRequestState=getCurrentSearchRequestState()
;const priceRangeLowerBoundaryInput=document.querySelector(".blm-price-range-input--lower")
;const priceRangeUpperBoundaryInput=document.querySelector(".blm-price-range-input--upper")
;let lowerBoundary=parseFloat(priceRangeLowerBoundaryInput.value)
;let upperBoundary=parseFloat(priceRangeUpperBoundaryInput.value)
;if(lowerBoundary===upperBoundary){
if(upperBoundary===currentSearchRequestState.price_range_max_value){
lowerBoundary-=1}else{upperBoundary+=1}}
if(upperBoundary===currentSearchRequestState.price_range_max_value&&(Number(lowerBoundary)===0||Number(lowerBoundary)===currentSearchRequestState.price_range_min_value)){
return{}}return{price:`${lowerBoundary},${upperBoundary}`}}
function getFacetsFromUrl(){
return new URLSearchParams(window.location.search).getAll(PARAMETER_NAME_FACETS).reduce(((all,current)=>Object.assign(Object.assign({},all),{
[current.split(":")[0]||""]:(current.split(":")[1]||"").split(",")})),{})}
function getSelectedColors(){const selectedFacetValues=getFacetsFromUrl()
;return Object.keys(selectedFacetValues).reduce(((colors,key)=>{
if(key.toLowerCase()==="color"){
colors=(selectedFacetValues[key]||[]).map((color=>color.toLowerCase()))}
return colors}),[])}const categoryLinkElementClickListener=event=>{var _a,_b,_c
;event.preventDefault();const clickedElement=event.target
;const categoryId=((_a=clickedElement.dataset)===null||_a===void 0?void 0:_a.categoryId)||""
;const module=((_b=window.BloomreachModules)===null||_b===void 0?void 0:_b.search)||((_c=window.BloomreachModules)===null||_c===void 0?void 0:_c.category)
;if(module){updateParameterInUrl(PARAMETER_NAME_PAGE,"1")
;module.load(categoryId).then((()=>{
const autosuggestSearchElement=getAutosuggestSearchInputElement()
;const autosuggestResultsElement=getAutosuggestResultsContainerElement()
;if(autosuggestSearchElement){
autosuggestSearchElement.value=(clickedElement===null||clickedElement===void 0?void 0:clickedElement.textContent)||""
}if(autosuggestResultsElement){autosuggestResultsElement.innerHTML=""}
updateCurrentAutosuggestRequestState({last_template_data:null});return true
})).catch(console.error)}};function addCategoryLinkElementClickListener(){var _a
;(_a=getAutosuggestResultsContainerElement())===null||_a===void 0?void 0:_a.querySelectorAll(".blm-autosuggest__suggestion-term-link--category").forEach((categoryLinkElement=>{
categoryLinkElement===null||categoryLinkElement===void 0?void 0:categoryLinkElement.removeEventListener("click",categoryLinkElementClickListener)
;categoryLinkElement===null||categoryLinkElement===void 0?void 0:categoryLinkElement.addEventListener("click",categoryLinkElementClickListener)
}))}function isObject$2(value){var type=typeof value
;return value!=null&&(type=="object"||type=="function")}
var isObject_1=isObject$2
;var freeGlobal$1=typeof commonjsGlobal=="object"&&commonjsGlobal&&commonjsGlobal.Object===Object&&commonjsGlobal
;var _freeGlobal=freeGlobal$1;var freeGlobal=_freeGlobal
;var freeSelf=typeof self=="object"&&self&&self.Object===Object&&self
;var root$2=freeGlobal||freeSelf||Function("return this")();var _root=root$2
;var root$1=_root;var now$1=function(){return root$1.Date.now()};var now_1=now$1
;var reWhitespace=/\s/;function trimmedEndIndex$1(string){
var index=string.length
;while(index--&&reWhitespace.test(string.charAt(index))){}return index}
var _trimmedEndIndex=trimmedEndIndex$1;var trimmedEndIndex=_trimmedEndIndex
;var reTrimStart=/^\s+/;function baseTrim$1(string){
return string?string.slice(0,trimmedEndIndex(string)+1).replace(reTrimStart,""):string
}var _baseTrim=baseTrim$1;var root=_root;var Symbol$2=root.Symbol
;var _Symbol=Symbol$2;var Symbol$1=_Symbol;var objectProto$1=Object.prototype
;var hasOwnProperty=objectProto$1.hasOwnProperty
;var nativeObjectToString$1=objectProto$1.toString
;var symToStringTag$1=Symbol$1?Symbol$1.toStringTag:undefined
;function getRawTag$1(value){
var isOwn=hasOwnProperty.call(value,symToStringTag$1),tag=value[symToStringTag$1]
;try{value[symToStringTag$1]=undefined;var unmasked=true}catch(e){}
var result=nativeObjectToString$1.call(value);if(unmasked){if(isOwn){
value[symToStringTag$1]=tag}else{delete value[symToStringTag$1]}}return result}
var _getRawTag=getRawTag$1;var objectProto=Object.prototype
;var nativeObjectToString=objectProto.toString;function objectToString$1(value){
return nativeObjectToString.call(value)}var _objectToString=objectToString$1
;var Symbol=_Symbol,getRawTag=_getRawTag,objectToString=_objectToString
;var nullTag="[object Null]",undefinedTag="[object Undefined]"
;var symToStringTag=Symbol?Symbol.toStringTag:undefined
;function baseGetTag$1(value){if(value==null){
return value===undefined?undefinedTag:nullTag}
return symToStringTag&&symToStringTag in Object(value)?getRawTag(value):objectToString(value)
}var _baseGetTag=baseGetTag$1;function isObjectLike$1(value){
return value!=null&&typeof value=="object"}var isObjectLike_1=isObjectLike$1
;var baseGetTag=_baseGetTag,isObjectLike=isObjectLike_1
;var symbolTag="[object Symbol]";function isSymbol$1(value){
return typeof value=="symbol"||isObjectLike(value)&&baseGetTag(value)==symbolTag
}var isSymbol_1=isSymbol$1
;var baseTrim=_baseTrim,isObject$1=isObject_1,isSymbol=isSymbol_1;var NAN=0/0
;var reIsBadHex=/^[-+]0x[0-9a-f]+$/i;var reIsBinary=/^0b[01]+$/i
;var reIsOctal=/^0o[0-7]+$/i;var freeParseInt=parseInt
;function toNumber$1(value){if(typeof value=="number"){return value}
if(isSymbol(value)){return NAN}if(isObject$1(value)){
var other=typeof value.valueOf=="function"?value.valueOf():value
;value=isObject$1(other)?other+"":other}if(typeof value!="string"){
return value===0?value:+value}value=baseTrim(value)
;var isBinary=reIsBinary.test(value)
;return isBinary||reIsOctal.test(value)?freeParseInt(value.slice(2),isBinary?2:8):reIsBadHex.test(value)?NAN:+value
}var toNumber_1=toNumber$1;var isObject=isObject_1,now=now_1,toNumber=toNumber_1
;var FUNC_ERROR_TEXT="Expected a function"
;var nativeMax=Math.max,nativeMin=Math.min;function debounce(func,wait,options){
var lastArgs,lastThis,maxWait,result,timerId,lastCallTime,lastInvokeTime=0,leading=false,maxing=false,trailing=true
;if(typeof func!="function"){throw new TypeError(FUNC_ERROR_TEXT)}
wait=toNumber(wait)||0;if(isObject(options)){leading=!!options.leading
;maxing="maxWait"in options
;maxWait=maxing?nativeMax(toNumber(options.maxWait)||0,wait):maxWait
;trailing="trailing"in options?!!options.trailing:trailing}
function invokeFunc(time){var args=lastArgs,thisArg=lastThis
;lastArgs=lastThis=undefined;lastInvokeTime=time;result=func.apply(thisArg,args)
;return result}function leadingEdge(time){lastInvokeTime=time
;timerId=setTimeout(timerExpired,wait);return leading?invokeFunc(time):result}
function remainingWait(time){
var timeSinceLastCall=time-lastCallTime,timeSinceLastInvoke=time-lastInvokeTime,timeWaiting=wait-timeSinceLastCall
;return maxing?nativeMin(timeWaiting,maxWait-timeSinceLastInvoke):timeWaiting}
function shouldInvoke(time){
var timeSinceLastCall=time-lastCallTime,timeSinceLastInvoke=time-lastInvokeTime
;return lastCallTime===undefined||timeSinceLastCall>=wait||timeSinceLastCall<0||maxing&&timeSinceLastInvoke>=maxWait
}function timerExpired(){var time=now();if(shouldInvoke(time)){
return trailingEdge(time)}timerId=setTimeout(timerExpired,remainingWait(time))}
function trailingEdge(time){timerId=undefined;if(trailing&&lastArgs){
return invokeFunc(time)}lastArgs=lastThis=undefined;return result}
function cancel(){if(timerId!==undefined){clearTimeout(timerId)}lastInvokeTime=0
;lastArgs=lastCallTime=lastThis=timerId=undefined}function flush(){
return timerId===undefined?result:trailingEdge(now())}function debounced(){
var time=now(),isInvoking=shouldInvoke(time);lastArgs=arguments;lastThis=this
;lastCallTime=time;if(isInvoking){if(timerId===undefined){
return leadingEdge(lastCallTime)}if(maxing){clearTimeout(timerId)
;timerId=setTimeout(timerExpired,wait);return invokeFunc(lastCallTime)}}
if(timerId===undefined){timerId=setTimeout(timerExpired,wait)}return result}
debounced.cancel=cancel;debounced.flush=flush;return debounced}
var debounce_1=debounce;debounce_1((event=>{const query=event.target.value
;const searchInputElement=getAutosuggestSearchInputElement()
;if(!searchInputElement)return
;if(query.length>=AUTOSUGGEST_MINIMUM_QUERY_LENGTH){
searchInputElement.dataset.originalQuery=query
;suggest(query).catch(console.error)}else{
const autosuggestResultsContainerElement=getAutosuggestResultsContainerElement()
;if(autosuggestResultsContainerElement){
autosuggestResultsContainerElement.innerHTML=""}
searchInputElement.dataset.originalQuery=""
;updateCurrentAutosuggestRequestState({last_template_data:null})}}),500)
;const listeners$2=new WeakMap
;const suggestionTermElementClickListener=suggestionTermElement=>()=>{var _a,_b
;const{suggestionText:suggestionText}=suggestionTermElement.dataset
;const input=getAutosuggestSearchInputElement();if(!input)return
;const{originalQuery:originalQuery}=input.dataset;const suggestionData={
aq:originalQuery,q:suggestionText,catalogs:[{name:"example_en"}]}
;(_b=(_a=window.BrTrk||{})===null||_a===void 0?void 0:_a.getTracker())===null||_b===void 0?void 0:_b.logEvent("suggest","click",suggestionData,{},true)
};function addSuggestionTermElementClickListener(){var _a
;(_a=getAutosuggestResultsContainerElement())===null||_a===void 0?void 0:_a.querySelectorAll(".blm-autosuggest__suggestion-term-link").forEach((suggestionTermElement=>{
const listener=suggestionTermElementClickListener(suggestionTermElement)
;const old=listeners$2.get(suggestionTermElement)
;if(old)suggestionTermElement.removeEventListener("click",old)
;listeners$2.set(suggestionTermElement,listener)
;suggestionTermElement===null||suggestionTermElement===void 0?void 0:suggestionTermElement.addEventListener("click",listener)
}))}function mapAutosuggestApiResponse(responseData){
return isV2Response(responseData)?mapV2Response(responseData):mapV1Response(responseData)
}function mapV2Response(responseData){var _a,_b,_c,_d,_e,_f,_g,_h,_j
;const config=buildAutosuggestConfig()
;const productSuggestions=((_b=(_a=responseData===null||responseData===void 0?void 0:responseData.suggestionGroups)===null||_a===void 0?void 0:_a[0])===null||_b===void 0?void 0:_b.searchSuggestions)||[]
;const suggestions=((_d=(_c=responseData===null||responseData===void 0?void 0:responseData.suggestionGroups)===null||_c===void 0?void 0:_c[0])===null||_d===void 0?void 0:_d.querySuggestions)||[]
;const categorySuggestions=((_f=(_e=responseData===null||responseData===void 0?void 0:responseData.suggestionGroups)===null||_e===void 0?void 0:_e[0])===null||_f===void 0?void 0:_f.attributeSuggestions)||[]
;const mappedApiResponse=Object.assign(Object.assign({},((_g=responseData===null||responseData===void 0?void 0:responseData.queryContext)===null||_g===void 0?void 0:_g.originalQuery)?{
originalQuery:responseData.queryContext.originalQuery}:{}),{
terms:[...suggestions.map(((term,index)=>{var _a
;return Object.assign(Object.assign(Object.assign({},term),{text:term.query,
displayText:term.displayText,
link:`${config.search_page_url}?${config.default_search_parameter}=${encodeURIComponent(term.query)}`
}),index===0&&categorySuggestions?{
categories:categorySuggestions.map((category=>Object.assign(Object.assign({},category),{
name:category.name,value:category.value,type:category.attributeType
}))).slice(0,(_a=config.autosuggest)===null||_a===void 0?void 0:_a.number_of_collections)
}:{})
}))].slice(0,(_h=config.autosuggest)===null||_h===void 0?void 0:_h.number_of_terms),
productSuggestions:[...productSuggestions.map((product=>Object.assign(Object.assign({},product),{
id:product.pid,image:product.thumb_image,title:product.title,link:product.url,
sale_price:Number((product===null||product===void 0?void 0:product.sale_price)||"0")
})))].slice(0,(_j=config.autosuggest)===null||_j===void 0?void 0:_j.number_of_products),
config:config});return highlightQueryInTermLabels(mappedApiResponse)}
function isV2Response(responseData){return"suggestionGroups"in responseData}
function mapV1Response(responseData){var _a,_b
;const config=buildAutosuggestConfig()
;const mappedApiResponse=Object.assign(Object.assign({},responseData.response.q?{
originalQuery:responseData.response.q}:{}),{
terms:[...responseData.response.suggestions?responseData.response.suggestions.map((term=>{
var _a;return Object.assign(Object.assign(Object.assign({},term),{text:term.q,
displayText:term.dq,
link:`${config.search_page_url}?${config.default_search_parameter}=${encodeURIComponent(term.q)}`
}),term.filters?{
categories:term.filters.map((category=>Object.assign(Object.assign({},category),{
name:category.name,value:category.value,type:category.key
}))).slice(0,(_a=config.autosuggest)===null||_a===void 0?void 0:_a.number_of_collections)
}:{})
})):[]].slice(0,(_a=config.autosuggest)===null||_a===void 0?void 0:_a.number_of_terms),
productSuggestions:[...responseData.response.products?responseData.response.products.map((product=>Object.assign(Object.assign(Object.assign({},product),{
id:product.pid,image:product.thumb_image,title:product.title,link:product.url,
sale_price:!Number.isNaN(product.sale_price)?product.sale_price:!Number.isNaN(product.price)?product.price:"0"
}),"price"in product&&"sale_price"in product?{price:product.price
}:{}))):[]].slice(0,(_b=config.autosuggest)===null||_b===void 0?void 0:_b.number_of_products),
config:config});return highlightQueryInTermLabels(mappedApiResponse)}
function highlightQueryInTermLabels(results){
const processedResults=Object.assign({},results)
;results.terms.forEach(((term,index)=>{
const typedQueryHtml=ejs.render(AUTOSUGGEST_TYPED_QUERY_TEMPLATE,{
query:results.originalQuery}).trim()
;(processedResults.terms[index]||{}).processedText=term.text.replace(results.originalQuery||"",typedQueryHtml)
}));return processedResults}function mapSearchApiResponse(responseData){
var _a,_b,_c,_d,_e,_f,_g,_h,_j,_k;const config=buildSearchConfig()
;return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({
response:responseData,
autoCorrectQuery:responseData===null||responseData===void 0?void 0:responseData.autoCorrectQuery,
facets:Object.entries(((_a=responseData===null||responseData===void 0?void 0:responseData.facet_counts)===null||_a===void 0?void 0:_a.facet_fields)||{}).map((fieldName=>({
original_title:fieldName[0],
title:fieldName[0].replace("_"," ").replace(/\b\w/g,(l=>l.toUpperCase())),
section:fieldName[1].map((section=>{if(section.name==="true"){section.name="Yes"
}else if(section.name==="false"){section.name="No"}return{count:section.count,
name:section.cat_name||section.name,id:section.cat_id||section.name,raw:section}
}))}))).filter((facet=>facet.section.length))
},((_c=(_b=responseData===null||responseData===void 0?void 0:responseData.facet_counts)===null||_b===void 0?void 0:_b.facet_ranges)===null||_c===void 0?void 0:_c.price)?{
priceRanges:responseData.facet_counts.facet_ranges.price.map((range=>({
count:range.count,start:range.start.toString(),end:range.end.toString()})))
}:{}),((_e=(_d=responseData===null||responseData===void 0?void 0:responseData.stats)===null||_d===void 0?void 0:_d.stats_fields)===null||_e===void 0?void 0:_e.price)?{
maxPrice:responseData.stats.stats_fields.price.max,
minPrice:responseData.stats.stats_fields.price.min
}:{}),((_g=(_f=responseData===null||responseData===void 0?void 0:responseData.stats)===null||_f===void 0?void 0:_f.stats_fields)===null||_g===void 0?void 0:_g.sale_price)?{
maxPrice:responseData.stats.stats_fields.sale_price.max,
minPrice:responseData.stats.stats_fields.sale_price.min}:{}),{
products:processDocs(((_h=responseData.response)===null||_h===void 0?void 0:_h.docs)||[])
}),(responseData===null||responseData===void 0?void 0:responseData.group_response)?{
grouped_products:Object.keys(responseData===null||responseData===void 0?void 0:responseData.group_response).reduce(((_,groupCategoryId)=>{
var _a,_b,_c,_d;return Object.assign(Object.assign({
group_category_id:groupCategoryId
},(_a=responseData.group_response)===null||_a===void 0?void 0:_a[groupCategoryId]),{
groups:((_d=(_c=(_b=responseData.group_response)===null||_b===void 0?void 0:_b[groupCategoryId])===null||_c===void 0?void 0:_c.groups)===null||_d===void 0?void 0:_d.map((group=>{
var _a;return{title:group.groupValue,
products:processDocs(((_a=group===null||group===void 0?void 0:group.doclist)===null||_a===void 0?void 0:_a.docs)||[])
}})))||[]})}),{})}:{}),{did_you_mean:responseData.did_you_mean||[],
number_of_results:Number((_j=responseData.response)===null||_j===void 0?void 0:_j.numFound),
start:Number((_k=responseData.response)===null||_k===void 0?void 0:_k.start),
config:config}),responseData.keywordRedirect?{keywordRedirect:{
original_query:responseData.keywordRedirect["original query"],
redirected_query:responseData.keywordRedirect["redirected query"],
redirected_url:responseData.keywordRedirect["redirected url"]}}:{})}
function processDocs(docs){const config=buildSearchConfig()
;return docs.reduce(((allProducts,currentProduct)=>[...allProducts,...config.search.display_variants?extractVariants(currentProduct):[transformProductResponseToProductData(currentProduct)]]),[])
}function extractVariants(productResponse){
if(!productResponse.variants||!productResponse.variants.length){
return[transformProductResponseToProductData(productResponse)]}
return(transformProductResponseToProductData(productResponse).variants||[]).map(((variant,index)=>Object.assign(Object.assign(Object.assign({},transformProductResponseToProductData(productResponse)),variant),{
variant_index:index})))}
function transformProductResponseToProductData(productResponse){
return Object.assign(Object.assign(Object.assign({},productResponse),{
title:productResponse.title,image:productResponse.thumb_image,
link:productResponse.url,id:productResponse.pid,price:productResponse.price,
sale_price:productResponse.sale_price}),productResponse.variants?{
variants:productResponse.variants.map((variant=>Object.assign(Object.assign({},variant),{
sku_color_group:variant.sku_color_group,
sku_swatch_images:variant.sku_swatch_images,
sku_thumb_images:variant.sku_thumb_images,sku_sale_price:variant.sku_sale_price,
sku_price:variant.sku_price,
image:variant.sku_thumb_images&&Array.isArray(variant.sku_thumb_images)?variant.sku_thumb_images[0]:variant.sku_swatch_images[0],
variant_name:variant.sku_color_group})))}:{})}
const log$1=Debug("br:autosuggest");async function suggest(query){var _a,_b,_c
;log$1("Fetching suggestions for",query);const config=buildAutosuggestConfig()
;updateCurrentAutosuggestRequestState({request_id:generateRequestId()})
;const apiCallParameters=buildApiCallParameters$1(query)
;const results=await getSuggestions(apiCallParameters)
;const templateData=mapAutosuggestApiResponse(results)
;updateCurrentAutosuggestRequestState({last_template_data:templateData})
;const container=getAutosuggestResultsContainerElement();if(!container)return
;log$1.verbose("Using config",config);log$1.verbose("Render to:",container)
;log$1.verbose("Is using default template?",!((_a=config.autosuggest)===null||_a===void 0?void 0:_a.template))
;log$1.verbose("Rendering with template:",{
template:((_b=config.autosuggest)===null||_b===void 0?void 0:_b.template)||autosuggestTemplate,
templateData:templateData})
;container.innerHTML=ejs.render(((_c=config.autosuggest)===null||_c===void 0?void 0:_c.template)||autosuggestTemplate,templateData)
;addCategoryLinkElementClickListener();addSuggestionTermElementClickListener()}
function buildApiCallParameters$1(query){var _a,_b,_c
;const config=buildAutosuggestConfig()
;const urlParameters=new URLSearchParams(window.location.search)
;const currentAutosuggestRequestState=getCurrentAutosuggestRequestState()
;const apiParameters=Object.assign(Object.assign({},((_a=config===null||config===void 0?void 0:config.autosuggest)===null||_a===void 0?void 0:_a.endpoint)?{
endpoint:config.autosuggest.endpoint}:{}),{
q:query||urlParameters.get((config===null||config===void 0?void 0:config.default_search_parameter)||"")||"",
aq:query,sort:(_b=config.autosuggest)===null||_b===void 0?void 0:_b.sort,
account_id:config.account_id,domain_key:config.domain_key,
request_id:currentAutosuggestRequestState.request_id,
_br_uid_2:config.tracking_cookie,ref_url:config.ref_url,url:config.url,
request_type:config.request_type,
catalog_views:(_c=config.autosuggest)===null||_c===void 0?void 0:_c.catalog_views,
search_type:"keyword"});if(!apiParameters.catalog_views){
apiParameters.catalog_views=""}for(const[key,value]of urlParameters.entries()){
if(!Object.keys(apiParameters).includes(key)){apiParameters[key]=value}}
Object.keys(apiParameters).forEach((key=>{if(apiParameters[key]===undefined){
delete apiParameters[key]}}));return apiParameters}
function getCurrentAutosuggestRequestState(){
return window.BloomreachModules.autosuggest.getCurrentAutosuggestRequestState()}
function updateCurrentAutosuggestRequestState(state){
window.BloomreachModules.autosuggest.setCurrentAutosuggestRequestState(Object.assign(Object.assign({},getCurrentAutosuggestRequestState()),state))
}Debug("br:product-events");Debug("br:recommendations")
;const clearPriceRangeValueButtonClickListener=()=>{resetLoadingIndicator()
;updateMultipleInstanceParametersInUrl(PARAMETER_NAME_FACETS,Object.assign({},getCheckedFacetValues()))
;updateParameterInUrl(PARAMETER_NAME_PAGE,"1");updateCurrentSearchRequestState({
price_range_max_value:0,price_range_min_value:0});initiateSearch({toReplace:true
}).catch(console.error)};function addClearPriceRangeValueButtonClickListener(){
const currentSearchRequestState=getCurrentSearchRequestState()
;const priceRangeValueClearButton=document.querySelector(`.blm-range-slider__clear-values-button--${currentSearchRequestState.request_id}`)
;if(priceRangeValueClearButton){
priceRangeValueClearButton.removeEventListener("click",clearPriceRangeValueButtonClickListener)
;priceRangeValueClearButton.addEventListener("click",clearPriceRangeValueButtonClickListener)
}}function removeClearPriceRangeValueButtonClickListener(){
const currentSearchRequestState=getCurrentSearchRequestState()
;const priceRangeValueClearButton=document.querySelector(`.blm-range-slider__clear-values-button--${currentSearchRequestState.request_id}`)
;if(priceRangeValueClearButton){
priceRangeValueClearButton.removeEventListener("click",clearPriceRangeValueButtonClickListener)
}}const clearSelectedFacetButtonClickListener=event=>{var _a,_b,_c,_d
;const checkboxId=(_c=(_b=(_a=event===null||event===void 0?void 0:event.target)===null||_a===void 0?void 0:_a.parentNode)===null||_b===void 0?void 0:_b.dataset)===null||_c===void 0?void 0:_c.filterCheckboxId
;if(checkboxId){
(_d=document.getElementById(checkboxId))===null||_d===void 0?void 0:_d.click()}}
;function addClearSelectedFacetButtonClickListener(){
const clearSelectedFacetButtons=document.querySelectorAll(".blm-product-search-selected-filter__clear")
;clearSelectedFacetButtons.forEach((button=>{
button===null||button===void 0?void 0:button.removeEventListener("click",clearSelectedFacetButtonClickListener)
;button===null||button===void 0?void 0:button.addEventListener("click",clearSelectedFacetButtonClickListener)
}))}function removeClearSelectedFacetButtonClickListener(){
const clearSelectedFacetButtons=document.querySelectorAll(".blm-product-search-selected-filter__clear")
;clearSelectedFacetButtons.forEach((button=>{
button===null||button===void 0?void 0:button.removeEventListener("click",clearSelectedFacetButtonClickListener)
}))}const clearAllSelectedFacetsButtonClickListener=()=>{resetLoadingIndicator()
;updateMultipleInstanceParametersInUrl(PARAMETER_NAME_FACETS,Object.assign({},buildPriceUrlParameterObject()))
;updateParameterInUrl(PARAMETER_NAME_PAGE,"1");initiateSearch({toReplace:true
}).catch(console.error)}
;function addClearAllSelectedFacetsButtonClickListener(){
const selectedFiltersClearAllButton=document.querySelector(".blm-product-search-selected-filters__clear-all")
;if(selectedFiltersClearAllButton){
selectedFiltersClearAllButton.removeEventListener("click",clearAllSelectedFacetsButtonClickListener)
;selectedFiltersClearAllButton.addEventListener("click",clearAllSelectedFacetsButtonClickListener)
}}function removeClearAllSelectedFacetsButtonClickListener(){
const selectedFiltersClearAllButton=document.querySelector(".blm-product-search-selected-filters__clear-all")
;if(selectedFiltersClearAllButton){
selectedFiltersClearAllButton.removeEventListener("click",clearAllSelectedFacetsButtonClickListener)
}}const facetCheckboxChangeListener=()=>{resetLoadingIndicator()
;updateMultipleInstanceParametersInUrl(PARAMETER_NAME_FACETS,Object.assign(Object.assign({},getCheckedFacetValues()),buildPriceUrlParameterObject()))
;updateParameterInUrl(PARAMETER_NAME_PAGE,"1");initiateSearch({toReplace:true
}).catch(console.error)};function addFacetCheckboxChangeListener(){
const facetCheckboxes=document.querySelectorAll(".blm-product-search-filter-item__checkbox")
;if(facetCheckboxes){facetCheckboxes.forEach((checkbox=>{
checkbox===null||checkbox===void 0?void 0:checkbox.removeEventListener("change",facetCheckboxChangeListener)
;checkbox===null||checkbox===void 0?void 0:checkbox.addEventListener("change",facetCheckboxChangeListener)
}))}}function removeFacetCheckboxChangeListener(){
const facetCheckboxes=document.querySelectorAll(".blm-product-search-filter-item__checkbox")
;if(facetCheckboxes){facetCheckboxes.forEach((checkbox=>{
checkbox===null||checkbox===void 0?void 0:checkbox.removeEventListener("change",facetCheckboxChangeListener)
}))}}const facetSearchInputChangeListener=debounce_1((event=>{var _a
;const inputValue=(((_a=event===null||event===void 0?void 0:event.target)===null||_a===void 0?void 0:_a.value)||"").trim()
;document.querySelectorAll(".blm-dynamic-filter").forEach((facetBox=>{
let displayedItems=0
;facetBox.querySelectorAll(".blm-product-search-filter-item").forEach((facetItem=>{
var _a
;const label=((_a=facetItem.querySelector("label"))===null||_a===void 0?void 0:_a.textContent)||""
;const shouldDisplay=!inputValue||label.toLowerCase().includes(inputValue.toLowerCase())
;const displayStyle=shouldDisplay?"block":"none"
;displayedItems+=shouldDisplay?1:0;facetItem.style.display=displayStyle}))
;facetBox.style.display=displayedItems?"block":"none"}))
;document.querySelectorAll(".blm-product-search-load-more").forEach((loadMoreLink=>{
loadMoreLink.style.display="none"}))
;const groupsELement=getLoadMoreFacetGroupsElement();if(!groupsELement)return
;groupsELement.style.display="none";if(!inputValue){resetFacetGroups()}}),500)
;function addFacetSearchInputChangeListener(){
const facetSearchInput=document.querySelector("#blm-product-search-search-filters__input")
;if(facetSearchInput){
facetSearchInput.removeEventListener("input",facetSearchInputChangeListener)
;facetSearchInput.addEventListener("input",facetSearchInputChangeListener)}}
function removeFacetSearchInputChangeListener(){
const facetSearchInput=document.querySelector("#blm-product-search-search-filters__input")
;if(facetSearchInput){
facetSearchInput.removeEventListener("input",facetSearchInputChangeListener)}}
const groupbySelectChangeListener=event=>{var _a
;updateParameterInUrl(PARAMETER_NAME_GROUPBY,(_a=event===null||event===void 0?void 0:event.target)===null||_a===void 0?void 0:_a.value)
;resetLoadingIndicator();initiateSearch({toReplace:true}).catch(console.error)}
;function addGroupbySelectChangeListener(){
const currentSearchRequestState=getCurrentSearchRequestState()
;const groupbySelector=document.querySelector(`#groupby-${currentSearchRequestState===null||currentSearchRequestState===void 0?void 0:currentSearchRequestState.request_id}`)
;if(groupbySelector){
groupbySelector.removeEventListener("change",groupbySelectChangeListener)
;groupbySelector.addEventListener("change",groupbySelectChangeListener)}}
function removeGroupbySelectChangeListener(){
const currentSearchRequestState=getCurrentSearchRequestState()
;const groupbySelector=document.querySelector(`#groupby-${currentSearchRequestState===null||currentSearchRequestState===void 0?void 0:currentSearchRequestState.request_id}`)
;if(groupbySelector){
groupbySelector.removeEventListener("change",groupbySelectChangeListener)}}
const loadMoreFacetGroupsButtonClickListener=()=>{loadMoreFacetGroups()}
;function addLoadMoreFacetGroupsButtonClickListener(){
const element=getLoadMoreFacetGroupsElement()
;element===null||element===void 0?void 0:element.removeEventListener("click",loadMoreFacetGroupsButtonClickListener)
;element===null||element===void 0?void 0:element.addEventListener("click",loadMoreFacetGroupsButtonClickListener)
}function removeLoadMoreFacetGroupsButtonClickListener(){
const element=getLoadMoreFacetGroupsElement()
;element===null||element===void 0?void 0:element.removeEventListener("click",loadMoreFacetGroupsButtonClickListener)
}const listeners$1=new WeakMap
;const loadMoreFacetValuesButtonClickListener=()=>{var _a
;const config=buildSearchConfig()
;const numberOfDisplayedFacetValues=Number((_a=config.search)===null||_a===void 0?void 0:_a.initial_number_of_facet_values)
;let showFilterItems=numberOfDisplayedFacetValues
;const incrementFilterBy=numberOfDisplayedFacetValues;return event=>{
const itemIndex=event.target.getAttribute("data-item")
;const facetBlock=document.getElementById(`blm-facet-block-item-${itemIndex}`)
;const filterListItems=facetBlock.getElementsByTagName("li")
;for(let i=showFilterItems;i<showFilterItems+incrementFilterBy;i++){
if(filterListItems[i]){filterListItems[i].style.display="block"}}
showFilterItems+=incrementFilterBy;if(showFilterItems>=filterListItems.length){
event.target.style.display="none"}}}
;function addLoadMoreFacetValuesButtonClickListener(){
document.querySelectorAll(".blm-product-search-load-more").forEach((item=>{
const old=listeners$1.get(item);if(old)item.removeEventListener("click",old)
;const listener=listeners$1.get(item)||loadMoreFacetValuesButtonClickListener()
;listeners$1.set(item,listener);item.addEventListener("click",listener)}))}
function removeLoadMoreFacetValuesButtonClickListener(){
document.querySelectorAll(".blm-product-search-load-more").forEach((item=>{
const old=listeners$1.get(item);if(old)item.removeEventListener("click",old)}))}
const pageSizeSelectChangeListener=event=>{
updateParameterInUrl(PARAMETER_NAME_SIZE,event.target.value)
;updateParameterInUrl(PARAMETER_NAME_PAGE,"1");resetLoadingIndicator()
;initiateSearch({toReplace:true}).catch(console.error)}
;function addPageSizeSelectChangeListener(){
const currentSearchRequestState=getCurrentSearchRequestState()
;const sizeSelector=document.querySelector(`#sort-size-${currentSearchRequestState.request_id}`)
;if(sizeSelector){
sizeSelector.removeEventListener("change",pageSizeSelectChangeListener)
;sizeSelector.addEventListener("change",pageSizeSelectChangeListener)}}
function removePageSizeSelectChangeListener(){
const currentSearchRequestState=getCurrentSearchRequestState()
;const sizeSelector=document.querySelector(`#sort-size-${currentSearchRequestState.request_id}`)
;if(sizeSelector){
sizeSelector.removeEventListener("change",pageSizeSelectChangeListener)}}
const paginationContainerClickListener=event=>{resetLoadingIndicator()
;const clickedPaginationValue=event.target.dataset.value
;if(clickedPaginationValue){switch(event.target.dataset.value){case"previous":
decrementParameterInUrl(PARAMETER_NAME_PAGE);break;case"next":
incrementParameterInUrl(PARAMETER_NAME_PAGE);break;default:
updateParameterInUrl(PARAMETER_NAME_PAGE,clickedPaginationValue)}
initiateSearch({toReplace:true}).catch(console.error)}}
;function addPaginationContainerClickListener(){
const currentSearchRequestState=getCurrentSearchRequestState()
;const paginationContainer=document.querySelector(`.blm-product-search-pagination__pages--${currentSearchRequestState.request_id}`)
;if(!paginationContainer)return
;paginationContainer.removeEventListener("click",paginationContainerClickListener)
;paginationContainer.addEventListener("click",paginationContainerClickListener)}
function removePaginationContainerClickListener(){
const currentSearchRequestState=getCurrentSearchRequestState()
;const paginationContainer=document.querySelector(`.blm-product-search-pagination__pages--${currentSearchRequestState.request_id}`)
;paginationContainer===null||paginationContainer===void 0?void 0:paginationContainer.removeEventListener("click",paginationContainerClickListener)
}const priceRangeChangeListener=()=>{resetLoadingIndicator()
;updateMultipleInstanceParametersInUrl(PARAMETER_NAME_FACETS,Object.assign(Object.assign({},getCheckedFacetValues()),buildPriceUrlParameterObject()))
;updateParameterInUrl(PARAMETER_NAME_PAGE,"1");initiateSearch({toReplace:true
}).catch(console.error)};function addPriceRangeChangeListeners(){
const currentSearchRequestState=getCurrentSearchRequestState()
;const priceRangeLowerBoundaryInput=document.querySelector(`.blm-price-range-input--lower-${currentSearchRequestState.request_id}`)
;const priceRangeUpperBoundaryInput=document.querySelector(`.blm-price-range-input--upper-${currentSearchRequestState.request_id}`)
;if(priceRangeLowerBoundaryInput&&priceRangeUpperBoundaryInput){
priceRangeLowerBoundaryInput.removeEventListener("change",priceRangeChangeListener)
;priceRangeLowerBoundaryInput.addEventListener("change",priceRangeChangeListener)
;priceRangeUpperBoundaryInput.removeEventListener("change",priceRangeChangeListener)
;priceRangeUpperBoundaryInput.addEventListener("change",priceRangeChangeListener)
}}function removePriceRangeChangeListeners(){
const currentSearchRequestState=getCurrentSearchRequestState()
;const priceRangeLowerBoundaryInput=document.querySelector(`.blm-price-range-input--lower-${currentSearchRequestState.request_id}`)
;const priceRangeUpperBoundaryInput=document.querySelector(`.blm-price-range-input--upper-${currentSearchRequestState.request_id}`)
;if(priceRangeLowerBoundaryInput&&priceRangeUpperBoundaryInput){
priceRangeLowerBoundaryInput.removeEventListener("change",priceRangeChangeListener)
;priceRangeUpperBoundaryInput.removeEventListener("change",priceRangeChangeListener)
}}const contexts=new WeakMap;const intersectionListener=config=>entries=>{var _a
;const first=entries[0];if(!first||first.intersectionRatio<=0){return}
const connectorConfigObject=((_a=window===null||window===void 0?void 0:window.bloomreachConnector)===null||_a===void 0?void 0:_a.config)||{}
;const currentStart=connectorConfigObject.start||0
;connectorConfigObject.start=currentStart+config.search.items_per_page
;incrementParameterInUrl(PARAMETER_NAME_PAGE);initiateSearch().catch((error=>{
decrementParameterInUrl(PARAMETER_NAME_PAGE);console.error(error)}))}
;function addScrollListener(){var _a,_b;const config=buildSearchConfig()
;if(((_a=config.search)===null||_a===void 0?void 0:_a.infinite_scroll)&&!document.querySelector(".blm-scroll-indicator")){
const searchResultsContainerElement=getSearchResultsContainerElement()
;const ctx=contexts.get(searchResultsContainerElement)||{}
;removeScrollListener();const indicatorElement=document.createElement("div")
;indicatorElement.classList.add("blm-scroll-indicator")
;const loaderElement=document.createElement("div")
;loaderElement.classList.add("blm-scroll-indicator__loading")
;indicatorElement.appendChild(loaderElement)
;(_b=searchResultsContainerElement===null||searchResultsContainerElement===void 0?void 0:searchResultsContainerElement.parentNode)===null||_b===void 0?void 0:_b.insertBefore(indicatorElement,searchResultsContainerElement.nextSibling)
;const scrollIndicator=document.querySelector(".blm-scroll-indicator")
;const intersectionObserver=new IntersectionObserver(intersectionListener(config))
;ctx.observer=intersectionObserver;ctx.indicator=indicatorElement
;if(scrollIndicator){intersectionObserver.observe(scrollIndicator)}}}
function removeScrollListener(){var _a,_b
;const searchResultsContainerElement=getSearchResultsContainerElement()
;const ctx=contexts.get(searchResultsContainerElement)||{};if(ctx){
(_a=ctx.observer)===null||_a===void 0?void 0:_a.disconnect()
;(_b=ctx.indicator)===null||_b===void 0?void 0:_b.remove()}}
const sidebarControlButtonClickHandler=()=>{
const sidebarContentElement=document.querySelector(".blm-product-search-sidebar-content")
;if(sidebarContentElement===null||sidebarContentElement===void 0?void 0:sidebarContentElement.classList.contains("blm-open")){
sidebarContentElement===null||sidebarContentElement===void 0?void 0:sidebarContentElement.classList.remove("blm-open")
;document.body.classList.remove("blm-out-of-view")
;updateParameterInUrl(PARAMETER_NAME_FILTERS_PANEL,"")}else{
document.body.classList.add("blm-out-of-view")
;sidebarContentElement===null||sidebarContentElement===void 0?void 0:sidebarContentElement.classList.add("blm-open")
;updateParameterInUrl(PARAMETER_NAME_FILTERS_PANEL,"on")}}
;function addSidebarControlButtonClickListener(){
const sidebarControlButtons=document.querySelectorAll(".blm-product-search-control-button--sidebar")
;sidebarControlButtons.forEach((button=>{
button.removeEventListener("click",sidebarControlButtonClickHandler)
;button.addEventListener("click",sidebarControlButtonClickHandler)}))}
function removeSidebarControlButtonClickListener(){
const sidebarControlButtons=document.querySelectorAll(".blm-product-search-control-button--sidebar")
;sidebarControlButtons.forEach((button=>{
button.removeEventListener("click",sidebarControlButtonClickHandler)}))}
const sortSelectChangeListener=event=>{var _a
;updateParameterInUrl(PARAMETER_NAME_SORT,(_a=event===null||event===void 0?void 0:event.target)===null||_a===void 0?void 0:_a.value)
;resetLoadingIndicator();initiateSearch({toReplace:true}).catch(console.error)}
;function addSortSelectChangeListener(){
const currentSearchRequestState=getCurrentSearchRequestState()
;const sortSelector=document.querySelector(`#sort-by-${currentSearchRequestState.request_id}`)
;if(sortSelector){
sortSelector.removeEventListener("change",sortSelectChangeListener)
;sortSelector.addEventListener("change",sortSelectChangeListener)}}
function removeSortSelectChangeListener(){
const currentSearchRequestState=getCurrentSearchRequestState()
;const sortSelector=document.querySelector(`#sort-by-${currentSearchRequestState.request_id}`)
;if(sortSelector){
sortSelector.removeEventListener("change",sortSelectChangeListener)}}
const listeners=new WeakMap;const swatchElementHoverListener=dependencies=>{
const{result:result,swatchItems:swatchItems,swatchIndex:swatchIndex}=dependencies
;return event=>{swatchItems.forEach((swatchItem=>{
swatchItem.classList.remove("active")}));event.target.classList.add("active")
;const imageContainer=result.querySelectorAll(".blm-product-search-image-container")
;imageContainer.forEach((imageItems=>{
imageItems.querySelectorAll(".blm-product-search-swatch-image").forEach(((image,i)=>{
image.style.display="none";if(swatchIndex===i){image.style.display="block"}}))
}))
;result.querySelectorAll(".blm-product-search-details-container__price").forEach(((price,index)=>{
price.classList.remove("active");if(swatchIndex===index){
price.classList.add("active")}}))}};function addSwatchElementHoverListener(){
document.querySelectorAll(".blm-product-search__result").forEach((result=>{
const swatchContainers=result.querySelectorAll(".blm-product-search-swatch-container")
;swatchContainers.forEach((swatchContainer=>{
const swatchItems=swatchContainer.querySelectorAll(".blm-product-search-swatch-container__swatch")
;swatchItems.forEach(((swatchItem,swatchIndex)=>{
const old=listeners.get(swatchItem)
;if(old)swatchItem.removeEventListener("mouseover",old)
;const listener=swatchElementHoverListener({result:result,
swatchItems:swatchItems,swatchIndex:swatchIndex})
;listeners.set(swatchItem,listener)
;swatchItem.addEventListener("mouseover",listener)}))}))}))}
function removeSwatchElementHoverListener(){
document.querySelectorAll(".blm-product-search__result").forEach((result=>{
const swatchContainers=result.querySelectorAll(".blm-product-search-swatch-container")
;swatchContainers.forEach((swatchContainer=>{
const swatchItems=swatchContainer.querySelectorAll(".blm-product-search-swatch-container__swatch")
;swatchItems.forEach((swatchItem=>{const old=listeners.get(swatchItem)
;if(old)swatchItem.removeEventListener("mouseover",old)}))}))}))}
const log=Debug("br:search");function buildDefaultSearchRequestState(options){
const{isCategoryPage:isCategoryPage}=options;return{request_id:0,
price_range_max_value:0,price_range_min_value:0,is_first_request:true,
is_category_page:isCategoryPage,category_to_load:"",pollIntervalId:void 0,
currentElement:null}}
function buildProductSearchModule({isCategoryPage:isCategoryPage}={
isCategoryPage:false}){var _a,_b,_c;log("Build Search Module:","4.0.0")
;let currentSearchRequestState=buildDefaultSearchRequestState({
isCategoryPage:isCategoryPage});if(isCategoryPage){
if(((_a=window.BloomreachModules)===null||_a===void 0?void 0:_a.search)&&!((_b=window.BloomreachModules)===null||_b===void 0?void 0:_b.category)){
console.warn("Search and catalog modules are not compatible with each other at this time. Please only load one of them. Undefined behavior may occur.")
}}else if((_c=window.BloomreachModules)===null||_c===void 0?void 0:_c.category){
console.warn("Search and catalog modules are not compatible with each other at this time. Please only load one of them. Undefined behavior may occur.")
}return{setCurrentSearchRequestState:requestState=>{
currentSearchRequestState=requestState},
getCurrentSearchRequestState:()=>currentSearchRequestState,
load:async categoryToLoad=>{await initPolling(isCategoryPage,categoryToLoad)}}}
async function initPolling(isCategoryPage=false,categoryToLoad){
let state=getCurrentSearchRequestState()
;window.clearInterval(state.pollIntervalId);const doPoll=async()=>{
state=getCurrentSearchRequestState();const currentElement=state.currentElement
;const foundElement=getSearchResultsContainerElement()
;if(currentElement&&!foundElement){updateCurrentSearchRequestState({
currentElement:null});moduleWillUnmount()
}else if(!currentElement&&foundElement){updateCurrentSearchRequestState({
currentElement:foundElement})
;await moduleWillMount(isCategoryPage,categoryToLoad)}}
;if(!state.pollIntervalId)log("Polling initialized")
;const pollTimer=window.setInterval(doPoll,100)
;updateCurrentSearchRequestState({pollIntervalId:pollTimer});await doPoll()}
function moduleWillUnmount(){var _a,_b;log("Umounting module...")
;const state=getCurrentSearchRequestState()
;(_a=state.afterLoadedObserver)===null||_a===void 0?void 0:_a.disconnect()
;(_b=getSearchResultsContainerElement())===null||_b===void 0?void 0:_b.classList.remove("blm-has-loaded")
;unmountSaveScrollPosition();removeScrollListener()
;window.removeEventListener("popstate",popStateWindowEvent)
;removePriceRangeChangeListeners()
;removeClearPriceRangeValueButtonClickListener()
;removeClearSelectedFacetButtonClickListener()
;removeClearAllSelectedFacetsButtonClickListener()
;removeSidebarControlButtonClickListener();removeFacetCheckboxChangeListener()
;removeLoadMoreFacetGroupsButtonClickListener()
;removeLoadMoreFacetValuesButtonClickListener()
;removeFacetSearchInputChangeListener();removePageSizeSelectChangeListener()
;removeSortSelectChangeListener();removeGroupbySelectChangeListener()
;removePaginationContainerClickListener();removeSwatchElementHoverListener()}
async function moduleWillMount(isCategoryPage=false,categoryToLoad){
log("Mounting module...");if(isCategoryPage&&categoryToLoad){
updateCurrentSearchRequestState({category_to_load:categoryToLoad})}
if(!areRequirementsMet()){log("Search/Category module requirements aren't met.")
;return}storeSegmentationPixelData();afterElementsLoaded((()=>{var _a
;log("Search/Category module's content has loaded.")
;(_a=getSearchResultsContainerElement())===null||_a===void 0?void 0:_a.classList.add("blm-has-loaded")
;setupSavingScrollPosition();addScrollListener();addChangeListeners()}))
;await initiateSearch();restoreScrollPosition()}function areRequirementsMet(){
var _a;const config=buildSearchConfig()
;invariant(config.account_id,"account_id must be set")
;invariant(config.domain_key,"domain_key must be set")
;invariant(config.default_search_parameter,"default_search_parameter must be set")
;invariant((_a=config===null||config===void 0?void 0:config.search)===null||_a===void 0?void 0:_a.selector,"the selector of search results container element must be set")
;getSearchResultsContainerElement()
;const urlParameters=new URLSearchParams(window.location.search)
;const searchPageHasQueryToLoad=config.search.is_search_page&&urlParameters.has(config.default_search_parameter)
;const categoryPageHasCategoryToLoad=config.search.is_category_page&&(urlParameters.has(config.default_search_parameter)||config.search.category_id)
;return searchPageHasQueryToLoad||categoryPageHasCategoryToLoad}
function storeSegmentationPixelData(){
const segmentationData=extractSegmentationCookie();if(segmentationData){
const br_data=window.br_data||{}
;br_data[COOKIE_NAME_SEGMENTATION_CDP_SEGMENTS]=segmentationData}}
async function initiateSearch(options={toReplace:false}){var _a,_b,_c,_d
;log("Initiate Search");const requestContextId=generateRequestId()
;updateCurrentSearchRequestState({request_id:requestContextId})
;const config=buildSearchConfig()
;const apiCallParameters=buildApiCallParameters()
;log("Fetch search results with params:",apiCallParameters)
;const response=await getSearchResults(apiCallParameters)
;log("Search results:",response)
;if(requestContextId!==getCurrentSearchRequestState().request_id){return}
if(response===null||response===void 0?void 0:response.keywordRedirect){
applyKeywordRedirection(response);return}
const templateData=buildTemplateData(response)
;const scrollLoader=document.querySelector(".blm-scroll-indicator__loading")
;const notEnoughProducts=(templateData===null||templateData===void 0?void 0:templateData.grouped_products)?(((_a=templateData===null||templateData===void 0?void 0:templateData.grouped_products)===null||_a===void 0?void 0:_a.groups)||[]).length<Number(apiCallParameters.rows):!templateData.products.length||templateData.number_of_results<Number(apiCallParameters.rows)
;if(scrollLoader&&notEnoughProducts){scrollLoader.remove()
;decrementParameterInUrl(PARAMETER_NAME_PAGE)}
const currentSearchRequestState=getCurrentSearchRequestState()
;if(currentSearchRequestState.is_first_request||!config.search.infinite_scroll||options.toReplace){
const container=getSearchResultsContainerElement();if(container){
log("Render with data: ",templateData)
;container.innerHTML=ejs.render((((_b=config.search)===null||_b===void 0?void 0:_b.template)||"").replace("%%-PRODUCT_LIST_TEMPLATE-%%",((_c=config.search)===null||_c===void 0?void 0:_c.product_list_template)||"").replace(/%%-REQUEST_ID-%%/g,currentSearchRequestState.request_id.toString()),templateData)
;window.scrollTo(0,0)}}else if(config.search.infinite_scroll){
const resultElements=ejs.render(((_d=config.search)===null||_d===void 0?void 0:_d.product_list_template)||"",templateData)
;getSearchResultsListContainerElement().insertAdjacentHTML("beforeend",resultElements)
}addChangeListeners();addSwatchElementHoverListener()
;updateCurrentSearchRequestState({is_first_request:false})}
function getCurrentSearchRequestState(){var _a,_b,_c
;return((_c=((_a=window.BloomreachModules)===null||_a===void 0?void 0:_a.search)||((_b=window.BloomreachModules)===null||_b===void 0?void 0:_b.category))===null||_c===void 0?void 0:_c.getCurrentSearchRequestState())||buildDefaultSearchRequestState({
isCategoryPage:false})}function updateCurrentSearchRequestState(state){
var _a,_b,_c
;(_c=((_a=window.BloomreachModules)===null||_a===void 0?void 0:_a.search)||((_b=window.BloomreachModules)===null||_b===void 0?void 0:_b.category))===null||_c===void 0?void 0:_c.setCurrentSearchRequestState(Object.assign(Object.assign({},getCurrentSearchRequestState()),state))
}function afterElementsLoaded(afterLoadCallback){
const state=getCurrentSearchRequestState()
;const searchElement=getSearchResultsContainerElement()
;if(state.afterLoadedObserver){state.afterLoadedObserver.disconnect()}
if(!searchElement){return}
const existingNodes=searchElement.querySelector(".blm-results")
;if(existingNodes){afterLoadCallback();return}let observer=void 0
;const mutationObserverCallback=mutationsList=>{
const productListAdded=mutationsList.find((mutationRecord=>mutationRecord.type==="childList"&&Array.from(mutationRecord.addedNodes).find((node=>node.classList&&node.classList.contains("blm-results")))))
;if(productListAdded){afterLoadCallback()
;observer===null||observer===void 0?void 0:observer.disconnect()}}
;observer=new MutationObserver(mutationObserverCallback)
;observer.observe(searchElement,{childList:true,subtree:true})}
async function popStateWindowEvent(){await initiateSearch({toReplace:true})}
function addChangeListeners(){
window.removeEventListener("popstate",popStateWindowEvent)
;window.addEventListener("popstate",popStateWindowEvent)
;addPriceRangeChangeListeners();addClearPriceRangeValueButtonClickListener()
;addClearSelectedFacetButtonClickListener()
;addClearAllSelectedFacetsButtonClickListener()
;if(document.querySelector(".blm-product-search-sidebar")){
addSidebarControlButtonClickListener();addFacetCheckboxChangeListener()
;addLoadMoreFacetGroupsButtonClickListener()
;addLoadMoreFacetValuesButtonClickListener();addFacetSearchInputChangeListener()
;resetFacetGroups()}addPageSizeSelectChangeListener()
;addSortSelectChangeListener();addGroupbySelectChangeListener()
;addPaginationContainerClickListener();addSwatchElementHoverListener()}
function buildTemplateData(response){var _a;const config=buildSearchConfig()
;const templateData=mapSearchApiResponse(response)
;const storedKeywordRedirect=JSON.parse(localStorage.getItem("keywordRedirect")||"{}")
;if(storedKeywordRedirect===null||storedKeywordRedirect===void 0?void 0:storedKeywordRedirect.redirected_query){
templateData.keywordRedirect=storedKeywordRedirect
;localStorage.removeItem("keywordRedirect")}
const urlParameters=new URLSearchParams(window.location.search)
;for(const[key,value]of urlParameters.entries()){
if(!Object.keys(templateData).includes(key)){templateData[key]=value}}
if(urlParameters.has(PARAMETER_NAME_SIZE)){
templateData.size=Number.parseInt(urlParameters.get(PARAMETER_NAME_SIZE)||"",10)
}else{
templateData.size=Number.parseInt(config.search.items_per_page.toString(),10)}
templateData.checkedFacets=getFacetsFromUrl()
;templateData.selectedFilterItems=((templateData===null||templateData===void 0?void 0:templateData.facets)||[]).reduce(((all,facet)=>{
if(facet.section.length>0){facet.section.forEach((item=>{var _a,_b,_c
;if(templateData.checkedFacets&&facet.original_title in templateData.checkedFacets&&((_c=(_b=(_a=templateData.checkedFacets)===null||_a===void 0?void 0:_a[facet.original_title])===null||_b===void 0?void 0:_b.includes)===null||_c===void 0?void 0:_c.call(_b,escapeSpecialCharacters(item.id)))){
(all||[]).push({
checkbox_id:`${facet.original_title}[${escapeSpecialCharacters(item.name)}]`,
label:item.name})}}))}return all}),[])
;let currentSearchRequestState=getCurrentSearchRequestState()
;if("minPrice"in templateData&&"maxPrice"in templateData&&currentSearchRequestState.price_range_min_value===0&&currentSearchRequestState.price_range_max_value===0){
updateCurrentSearchRequestState({
price_range_min_value:Math.floor(Number(templateData.minPrice)),
price_range_max_value:Math.ceil(Number(templateData.maxPrice))})}
currentSearchRequestState=getCurrentSearchRequestState()
;templateData.priceRangeFacet={
start:currentSearchRequestState.price_range_min_value,
end:currentSearchRequestState.price_range_max_value}
;if(!((_a=config===null||config===void 0?void 0:config.search)===null||_a===void 0?void 0:_a.infinite_scroll)){
templateData.paginationData=buildPaginationData(templateData)}
templateData.isFiltersPanelOpened=urlParameters.has(PARAMETER_NAME_FILTERS_PANEL)
;templateData.defaultMaxColorSwatches=MAX_COLOR_SWATCHES
;templateData.mobileView=isMobileView
;templateData.escapeSpecialCharacters=escapeSpecialCharacters
;templateData.selectedColors=getSelectedColors()
;templateData.formatMoney=templateData.formatMoney||config.format_money
;return templateData}function buildApiCallParameters(){var _a,_b,_c,_d,_e
;const config=buildSearchConfig()
;const urlParameters=new URLSearchParams(window.location.search)
;const currentSearchRequestState=getCurrentSearchRequestState()
;const apiParameters=Object.assign(Object.assign(Object.assign(Object.assign({},((_a=config.search)===null||_a===void 0?void 0:_a.endpoint)?{
endpoint:config.search.endpoint
}:{}),((_b=config.search)===null||_b===void 0?void 0:_b.groupby)?{
groupby:config.search.groupby
}:{}),((_c=config.search)===null||_c===void 0?void 0:_c.group_limit)?{
group_limit:config.search.group_limit}:{}),{
q:urlParameters.get(config.default_search_parameter||"")||config.search.category_id||"",
rows:(_d=config.search)===null||_d===void 0?void 0:_d.items_per_page,
sort:config===null||config===void 0?void 0:config.sort,start:config.start,
account_id:config.account_id,domain_key:config.domain_key,
request_id:currentSearchRequestState.request_id,
_br_uid_2:config.tracking_cookie||"",ref_url:config.ref_url,url:config.url||"",
request_type:config.request_type,search_type:config.search_type,
fl:(_e=config.search)===null||_e===void 0?void 0:_e.fields,
"facet.range":config["facet.range"],"stats.field":config["stats.field"]})
;const pageUrlParameter=urlParameters.get(PARAMETER_NAME_PAGE)
;if(pageUrlParameter){
if(config.search.infinite_scroll&&currentSearchRequestState.is_first_request){
apiParameters.start=0
;apiParameters.rows=Number.parseInt(pageUrlParameter,10)*config.search.items_per_page
}else{
apiParameters.start=(Number.parseInt(pageUrlParameter,10)-1)*config.search.items_per_page
}}const facets=getFacetsFromUrl();if(Object.keys(facets).length){
apiParameters.fq=convertFacetsToQueryString(facets)}
for(const[key,value]of urlParameters.entries()){
if(!Object.keys(apiParameters).includes(key)){apiParameters[key]=value}}
const segmentationData=extractSegmentationCookie();if(segmentationData){
apiParameters.brSeg=`seg:${segmentationData}`
;apiParameters.segment=`customer_profile:${segmentationData}`
;apiParameters.cdp_segments=segmentationData}
Object.keys(apiParameters).forEach((key=>{
if(apiParameters[key]===void 0||isString(apiParameters[key])&&apiParameters[key].length===0){
delete apiParameters[key]}}));return apiParameters}function isString(value){
return typeof value==="string"}
const productSearchModule=buildProductSearchModule()
;window.BloomreachModules=Object.assign(Object.assign({},globalBloomreachModules),{
search:productSearchModule});productSearchModule.load().catch(console.error)
})();
//# sourceMappingURL=search.js.map
