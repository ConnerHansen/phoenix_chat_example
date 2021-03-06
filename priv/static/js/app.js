(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';

    if (has(cache, path)) return cache[path].exports;
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex].exports;
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  var list = function() {
    var result = [];
    for (var item in modules) {
      if (has(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.list = list;
  globals.require.brunch = true;
})();
/*! jQuery v1.11.2 | (c) 2005, 2014 jQuery Foundation, Inc. | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k={},l="1.11.2",m=function(a,b){return new m.fn.init(a,b)},n=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,o=/^-ms-/,p=/-([\da-z])/gi,q=function(a,b){return b.toUpperCase()};m.fn=m.prototype={jquery:l,constructor:m,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=m.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return m.each(this,a,b)},map:function(a){return this.pushStack(m.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},m.extend=m.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||m.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(e=arguments[h]))for(d in e)a=g[d],c=e[d],g!==c&&(j&&c&&(m.isPlainObject(c)||(b=m.isArray(c)))?(b?(b=!1,f=a&&m.isArray(a)?a:[]):f=a&&m.isPlainObject(a)?a:{},g[d]=m.extend(j,f,c)):void 0!==c&&(g[d]=c));return g},m.extend({expando:"jQuery"+(l+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===m.type(a)},isArray:Array.isArray||function(a){return"array"===m.type(a)},isWindow:function(a){return null!=a&&a==a.window},isNumeric:function(a){return!m.isArray(a)&&a-parseFloat(a)+1>=0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},isPlainObject:function(a){var b;if(!a||"object"!==m.type(a)||a.nodeType||m.isWindow(a))return!1;try{if(a.constructor&&!j.call(a,"constructor")&&!j.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}if(k.ownLast)for(b in a)return j.call(a,b);for(b in a);return void 0===b||j.call(a,b)},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(b){b&&m.trim(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(o,"ms-").replace(p,q)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=r(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(n,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(r(Object(a))?m.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){var d;if(b){if(g)return g.call(b,a,c);for(d=b.length,c=c?0>c?Math.max(0,d+c):c:0;d>c;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,b){var c=+b.length,d=0,e=a.length;while(c>d)a[e++]=b[d++];if(c!==c)while(void 0!==b[d])a[e++]=b[d++];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=r(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(f=a[b],b=a,a=f),m.isFunction(a)?(c=d.call(arguments,2),e=function(){return a.apply(b||this,c.concat(d.call(arguments)))},e.guid=a.guid=a.guid||m.guid++,e):void 0},now:function(){return+new Date},support:k}),m.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function r(a){var b=a.length,c=m.type(a);return"function"===c||m.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var s=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=hb(),z=hb(),A=hb(),B=function(a,b){return a===b&&(l=!0),0},C=1<<31,D={}.hasOwnProperty,E=[],F=E.pop,G=E.push,H=E.push,I=E.slice,J=function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},K="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",L="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",N=M.replace("w","w#"),O="\\["+L+"*("+M+")(?:"+L+"*([*^$|!~]?=)"+L+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+N+"))|)"+L+"*\\]",P=":("+M+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+O+")*)|.*)\\)|)",Q=new RegExp(L+"+","g"),R=new RegExp("^"+L+"+|((?:^|[^\\\\])(?:\\\\.)*)"+L+"+$","g"),S=new RegExp("^"+L+"*,"+L+"*"),T=new RegExp("^"+L+"*([>+~]|"+L+")"+L+"*"),U=new RegExp("="+L+"*([^\\]'\"]*?)"+L+"*\\]","g"),V=new RegExp(P),W=new RegExp("^"+N+"$"),X={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),TAG:new RegExp("^("+M.replace("w","w*")+")"),ATTR:new RegExp("^"+O),PSEUDO:new RegExp("^"+P),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+L+"*(even|odd|(([+-]|)(\\d*)n|)"+L+"*(?:([+-]|)"+L+"*(\\d+)|))"+L+"*\\)|)","i"),bool:new RegExp("^(?:"+K+")$","i"),needsContext:new RegExp("^"+L+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+L+"*((?:-\\d)?\\d*)"+L+"*\\)|)(?=[^-]|$)","i")},Y=/^(?:input|select|textarea|button)$/i,Z=/^h\d$/i,$=/^[^{]+\{\s*\[native \w/,_=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,ab=/[+~]/,bb=/'|\\/g,cb=new RegExp("\\\\([\\da-f]{1,6}"+L+"?|("+L+")|.)","ig"),db=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},eb=function(){m()};try{H.apply(E=I.call(v.childNodes),v.childNodes),E[v.childNodes.length].nodeType}catch(fb){H={apply:E.length?function(a,b){G.apply(a,I.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function gb(a,b,d,e){var f,h,j,k,l,o,r,s,w,x;if((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,d=d||[],k=b.nodeType,"string"!=typeof a||!a||1!==k&&9!==k&&11!==k)return d;if(!e&&p){if(11!==k&&(f=_.exec(a)))if(j=f[1]){if(9===k){if(h=b.getElementById(j),!h||!h.parentNode)return d;if(h.id===j)return d.push(h),d}else if(b.ownerDocument&&(h=b.ownerDocument.getElementById(j))&&t(b,h)&&h.id===j)return d.push(h),d}else{if(f[2])return H.apply(d,b.getElementsByTagName(a)),d;if((j=f[3])&&c.getElementsByClassName)return H.apply(d,b.getElementsByClassName(j)),d}if(c.qsa&&(!q||!q.test(a))){if(s=r=u,w=b,x=1!==k&&a,1===k&&"object"!==b.nodeName.toLowerCase()){o=g(a),(r=b.getAttribute("id"))?s=r.replace(bb,"\\$&"):b.setAttribute("id",s),s="[id='"+s+"'] ",l=o.length;while(l--)o[l]=s+rb(o[l]);w=ab.test(a)&&pb(b.parentNode)||b,x=o.join(",")}if(x)try{return H.apply(d,w.querySelectorAll(x)),d}catch(y){}finally{r||b.removeAttribute("id")}}}return i(a.replace(R,"$1"),b,d,e)}function hb(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ib(a){return a[u]=!0,a}function jb(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function kb(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function lb(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||C)-(~a.sourceIndex||C);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function mb(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function nb(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function ob(a){return ib(function(b){return b=+b,ib(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function pb(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=gb.support={},f=gb.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=gb.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=g.documentElement,e=g.defaultView,e&&e!==e.top&&(e.addEventListener?e.addEventListener("unload",eb,!1):e.attachEvent&&e.attachEvent("onunload",eb)),p=!f(g),c.attributes=jb(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=jb(function(a){return a.appendChild(g.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=$.test(g.getElementsByClassName),c.getById=jb(function(a){return o.appendChild(a).id=u,!g.getElementsByName||!g.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(cb,db);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(cb,db);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=$.test(g.querySelectorAll))&&(jb(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\f]' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+L+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+L+"*(?:value|"+K+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),jb(function(a){var b=g.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+L+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=$.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&jb(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",P)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=$.test(o.compareDocumentPosition),t=b||$.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===g||a.ownerDocument===v&&t(v,a)?-1:b===g||b.ownerDocument===v&&t(v,b)?1:k?J(k,a)-J(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,h=[a],i=[b];if(!e||!f)return a===g?-1:b===g?1:e?-1:f?1:k?J(k,a)-J(k,b):0;if(e===f)return lb(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)i.unshift(c);while(h[d]===i[d])d++;return d?lb(h[d],i[d]):h[d]===v?-1:i[d]===v?1:0},g):n},gb.matches=function(a,b){return gb(a,null,null,b)},gb.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(U,"='$1']"),!(!c.matchesSelector||!p||r&&r.test(b)||q&&q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return gb(b,n,null,[a]).length>0},gb.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},gb.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&D.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},gb.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},gb.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=gb.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=gb.selectors={cacheLength:50,createPseudo:ib,match:X,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(cb,db),a[3]=(a[3]||a[4]||a[5]||"").replace(cb,db),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||gb.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&gb.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return X.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&V.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(cb,db).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+L+")"+a+"("+L+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=gb.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(Q," ")+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){k=q[u]||(q[u]={}),j=k[a]||[],n=j[0]===w&&j[1],m=j[0]===w&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[w,n,m];break}}else if(s&&(j=(b[u]||(b[u]={}))[a])&&j[0]===w)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(s&&((l[u]||(l[u]={}))[a]=[w,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||gb.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ib(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=J(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ib(function(a){var b=[],c=[],d=h(a.replace(R,"$1"));return d[u]?ib(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ib(function(a){return function(b){return gb(a,b).length>0}}),contains:ib(function(a){return a=a.replace(cb,db),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ib(function(a){return W.test(a||"")||gb.error("unsupported lang: "+a),a=a.replace(cb,db).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Z.test(a.nodeName)},input:function(a){return Y.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:ob(function(){return[0]}),last:ob(function(a,b){return[b-1]}),eq:ob(function(a,b,c){return[0>c?c+b:c]}),even:ob(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:ob(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:ob(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:ob(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=mb(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=nb(b);function qb(){}qb.prototype=d.filters=d.pseudos,d.setFilters=new qb,g=gb.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=S.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=T.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(R," ")}),h=h.slice(c.length));for(g in d.filter)!(e=X[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?gb.error(a):z(a,i).slice(0)};function rb(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function sb(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[u]||(b[u]={}),(h=i[d])&&h[0]===w&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function tb(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function ub(a,b,c){for(var d=0,e=b.length;e>d;d++)gb(a,b[d],c);return c}function vb(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function wb(a,b,c,d,e,f){return d&&!d[u]&&(d=wb(d)),e&&!e[u]&&(e=wb(e,f)),ib(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||ub(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:vb(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=vb(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?J(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=vb(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):H.apply(g,r)})}function xb(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=sb(function(a){return a===b},h,!0),l=sb(function(a){return J(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];f>i;i++)if(c=d.relative[a[i].type])m=[sb(tb(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return wb(i>1&&tb(m),i>1&&rb(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(R,"$1"),c,e>i&&xb(a.slice(i,e)),f>e&&xb(a=a.slice(e)),f>e&&rb(a))}m.push(c)}return tb(m)}function yb(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,m,o,p=0,q="0",r=f&&[],s=[],t=j,u=f||e&&d.find.TAG("*",k),v=w+=null==t?1:Math.random()||.1,x=u.length;for(k&&(j=g!==n&&g);q!==x&&null!=(l=u[q]);q++){if(e&&l){m=0;while(o=a[m++])if(o(l,g,h)){i.push(l);break}k&&(w=v)}c&&((l=!o&&l)&&p--,f&&r.push(l))}if(p+=q,c&&q!==p){m=0;while(o=b[m++])o(r,s,g,h);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=F.call(i));s=vb(s)}H.apply(i,s),k&&!f&&s.length>0&&p+b.length>1&&gb.uniqueSort(i)}return k&&(w=v,j=t),r};return c?ib(f):f}return h=gb.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=xb(b[c]),f[u]?d.push(f):e.push(f);f=A(a,yb(e,d)),f.selector=a}return f},i=gb.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(cb,db),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=X.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(cb,db),ab.test(j[0].type)&&pb(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&rb(j),!a)return H.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,ab.test(a)&&pb(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=jb(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),jb(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||kb("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&jb(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||kb("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),jb(function(a){return null==a.getAttribute("disabled")})||kb(K,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),gb}(a);m.find=s,m.expr=s.selectors,m.expr[":"]=m.expr.pseudos,m.unique=s.uniqueSort,m.text=s.getText,m.isXMLDoc=s.isXML,m.contains=s.contains;var t=m.expr.match.needsContext,u=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,v=/^.[^:#\[\.,]*$/;function w(a,b,c){if(m.isFunction(b))return m.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return m.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(v.test(b))return m.filter(b,a,c);b=m.filter(b,a)}return m.grep(a,function(a){return m.inArray(a,b)>=0!==c})}m.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?m.find.matchesSelector(d,a)?[d]:[]:m.find.matches(a,m.grep(b,function(a){return 1===a.nodeType}))},m.fn.extend({find:function(a){var b,c=[],d=this,e=d.length;if("string"!=typeof a)return this.pushStack(m(a).filter(function(){for(b=0;e>b;b++)if(m.contains(d[b],this))return!0}));for(b=0;e>b;b++)m.find(a,d[b],c);return c=this.pushStack(e>1?m.unique(c):c),c.selector=this.selector?this.selector+" "+a:a,c},filter:function(a){return this.pushStack(w(this,a||[],!1))},not:function(a){return this.pushStack(w(this,a||[],!0))},is:function(a){return!!w(this,"string"==typeof a&&t.test(a)?m(a):a||[],!1).length}});var x,y=a.document,z=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,A=m.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a.charAt(0)&&">"===a.charAt(a.length-1)&&a.length>=3?[null,a,null]:z.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||x).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof m?b[0]:b,m.merge(this,m.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:y,!0)),u.test(c[1])&&m.isPlainObject(b))for(c in b)m.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}if(d=y.getElementById(c[2]),d&&d.parentNode){if(d.id!==c[2])return x.find(a);this.length=1,this[0]=d}return this.context=y,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):m.isFunction(a)?"undefined"!=typeof x.ready?x.ready(a):a(m):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),m.makeArray(a,this))};A.prototype=m.fn,x=m(y);var B=/^(?:parents|prev(?:Until|All))/,C={children:!0,contents:!0,next:!0,prev:!0};m.extend({dir:function(a,b,c){var d=[],e=a[b];while(e&&9!==e.nodeType&&(void 0===c||1!==e.nodeType||!m(e).is(c)))1===e.nodeType&&d.push(e),e=e[b];return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),m.fn.extend({has:function(a){var b,c=m(a,this),d=c.length;return this.filter(function(){for(b=0;d>b;b++)if(m.contains(this,c[b]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=t.test(a)||"string"!=typeof a?m(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&m.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?m.unique(f):f)},index:function(a){return a?"string"==typeof a?m.inArray(this[0],m(a)):m.inArray(a.jquery?a[0]:a,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(m.unique(m.merge(this.get(),m(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function D(a,b){do a=a[b];while(a&&1!==a.nodeType);return a}m.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return m.dir(a,"parentNode")},parentsUntil:function(a,b,c){return m.dir(a,"parentNode",c)},next:function(a){return D(a,"nextSibling")},prev:function(a){return D(a,"previousSibling")},nextAll:function(a){return m.dir(a,"nextSibling")},prevAll:function(a){return m.dir(a,"previousSibling")},nextUntil:function(a,b,c){return m.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return m.dir(a,"previousSibling",c)},siblings:function(a){return m.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return m.sibling(a.firstChild)},contents:function(a){return m.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:m.merge([],a.childNodes)}},function(a,b){m.fn[a]=function(c,d){var e=m.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=m.filter(d,e)),this.length>1&&(C[a]||(e=m.unique(e)),B.test(a)&&(e=e.reverse())),this.pushStack(e)}});var E=/\S+/g,F={};function G(a){var b=F[a]={};return m.each(a.match(E)||[],function(a,c){b[c]=!0}),b}m.Callbacks=function(a){a="string"==typeof a?F[a]||G(a):m.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(c=a.memory&&l,d=!0,f=g||0,g=0,e=h.length,b=!0;h&&e>f;f++)if(h[f].apply(l[0],l[1])===!1&&a.stopOnFalse){c=!1;break}b=!1,h&&(i?i.length&&j(i.shift()):c?h=[]:k.disable())},k={add:function(){if(h){var d=h.length;!function f(b){m.each(b,function(b,c){var d=m.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&f(c)})}(arguments),b?e=h.length:c&&(g=d,j(c))}return this},remove:function(){return h&&m.each(arguments,function(a,c){var d;while((d=m.inArray(c,h,d))>-1)h.splice(d,1),b&&(e>=d&&e--,f>=d&&f--)}),this},has:function(a){return a?m.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],e=0,this},disable:function(){return h=i=c=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,c||k.disable(),this},locked:function(){return!i},fireWith:function(a,c){return!h||d&&!i||(c=c||[],c=[a,c.slice?c.slice():c],b?i.push(c):j(c)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!d}};return k},m.extend({Deferred:function(a){var b=[["resolve","done",m.Callbacks("once memory"),"resolved"],["reject","fail",m.Callbacks("once memory"),"rejected"],["notify","progress",m.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return m.Deferred(function(c){m.each(b,function(b,f){var g=m.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&m.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?m.extend(a,d):d}},e={};return d.pipe=d.then,m.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&m.isFunction(a.promise)?e:0,g=1===f?a:m.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&m.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var H;m.fn.ready=function(a){return m.ready.promise().done(a),this},m.extend({isReady:!1,readyWait:1,holdReady:function(a){a?m.readyWait++:m.ready(!0)},ready:function(a){if(a===!0?!--m.readyWait:!m.isReady){if(!y.body)return setTimeout(m.ready);m.isReady=!0,a!==!0&&--m.readyWait>0||(H.resolveWith(y,[m]),m.fn.triggerHandler&&(m(y).triggerHandler("ready"),m(y).off("ready")))}}});function I(){y.addEventListener?(y.removeEventListener("DOMContentLoaded",J,!1),a.removeEventListener("load",J,!1)):(y.detachEvent("onreadystatechange",J),a.detachEvent("onload",J))}function J(){(y.addEventListener||"load"===event.type||"complete"===y.readyState)&&(I(),m.ready())}m.ready.promise=function(b){if(!H)if(H=m.Deferred(),"complete"===y.readyState)setTimeout(m.ready);else if(y.addEventListener)y.addEventListener("DOMContentLoaded",J,!1),a.addEventListener("load",J,!1);else{y.attachEvent("onreadystatechange",J),a.attachEvent("onload",J);var c=!1;try{c=null==a.frameElement&&y.documentElement}catch(d){}c&&c.doScroll&&!function e(){if(!m.isReady){try{c.doScroll("left")}catch(a){return setTimeout(e,50)}I(),m.ready()}}()}return H.promise(b)};var K="undefined",L;for(L in m(k))break;k.ownLast="0"!==L,k.inlineBlockNeedsLayout=!1,m(function(){var a,b,c,d;c=y.getElementsByTagName("body")[0],c&&c.style&&(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),typeof b.style.zoom!==K&&(b.style.cssText="display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1",k.inlineBlockNeedsLayout=a=3===b.offsetWidth,a&&(c.style.zoom=1)),c.removeChild(d))}),function(){var a=y.createElement("div");if(null==k.deleteExpando){k.deleteExpando=!0;try{delete a.test}catch(b){k.deleteExpando=!1}}a=null}(),m.acceptData=function(a){var b=m.noData[(a.nodeName+" ").toLowerCase()],c=+a.nodeType||1;return 1!==c&&9!==c?!1:!b||b!==!0&&a.getAttribute("classid")===b};var M=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,N=/([A-Z])/g;function O(a,b,c){if(void 0===c&&1===a.nodeType){var d="data-"+b.replace(N,"-$1").toLowerCase();if(c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:M.test(c)?m.parseJSON(c):c}catch(e){}m.data(a,b,c)}else c=void 0}return c}function P(a){var b;for(b in a)if(("data"!==b||!m.isEmptyObject(a[b]))&&"toJSON"!==b)return!1;
return!0}function Q(a,b,d,e){if(m.acceptData(a)){var f,g,h=m.expando,i=a.nodeType,j=i?m.cache:a,k=i?a[h]:a[h]&&h;if(k&&j[k]&&(e||j[k].data)||void 0!==d||"string"!=typeof b)return k||(k=i?a[h]=c.pop()||m.guid++:h),j[k]||(j[k]=i?{}:{toJSON:m.noop}),("object"==typeof b||"function"==typeof b)&&(e?j[k]=m.extend(j[k],b):j[k].data=m.extend(j[k].data,b)),g=j[k],e||(g.data||(g.data={}),g=g.data),void 0!==d&&(g[m.camelCase(b)]=d),"string"==typeof b?(f=g[b],null==f&&(f=g[m.camelCase(b)])):f=g,f}}function R(a,b,c){if(m.acceptData(a)){var d,e,f=a.nodeType,g=f?m.cache:a,h=f?a[m.expando]:m.expando;if(g[h]){if(b&&(d=c?g[h]:g[h].data)){m.isArray(b)?b=b.concat(m.map(b,m.camelCase)):b in d?b=[b]:(b=m.camelCase(b),b=b in d?[b]:b.split(" ")),e=b.length;while(e--)delete d[b[e]];if(c?!P(d):!m.isEmptyObject(d))return}(c||(delete g[h].data,P(g[h])))&&(f?m.cleanData([a],!0):k.deleteExpando||g!=g.window?delete g[h]:g[h]=null)}}}m.extend({cache:{},noData:{"applet ":!0,"embed ":!0,"object ":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(a){return a=a.nodeType?m.cache[a[m.expando]]:a[m.expando],!!a&&!P(a)},data:function(a,b,c){return Q(a,b,c)},removeData:function(a,b){return R(a,b)},_data:function(a,b,c){return Q(a,b,c,!0)},_removeData:function(a,b){return R(a,b,!0)}}),m.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=m.data(f),1===f.nodeType&&!m._data(f,"parsedAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=m.camelCase(d.slice(5)),O(f,d,e[d])));m._data(f,"parsedAttrs",!0)}return e}return"object"==typeof a?this.each(function(){m.data(this,a)}):arguments.length>1?this.each(function(){m.data(this,a,b)}):f?O(f,a,m.data(f,a)):void 0},removeData:function(a){return this.each(function(){m.removeData(this,a)})}}),m.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=m._data(a,b),c&&(!d||m.isArray(c)?d=m._data(a,b,m.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=m.queue(a,b),d=c.length,e=c.shift(),f=m._queueHooks(a,b),g=function(){m.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return m._data(a,c)||m._data(a,c,{empty:m.Callbacks("once memory").add(function(){m._removeData(a,b+"queue"),m._removeData(a,c)})})}}),m.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?m.queue(this[0],a):void 0===b?this:this.each(function(){var c=m.queue(this,a,b);m._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&m.dequeue(this,a)})},dequeue:function(a){return this.each(function(){m.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=m.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=m._data(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var S=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,T=["Top","Right","Bottom","Left"],U=function(a,b){return a=b||a,"none"===m.css(a,"display")||!m.contains(a.ownerDocument,a)},V=m.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===m.type(c)){e=!0;for(h in c)m.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,m.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(m(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},W=/^(?:checkbox|radio)$/i;!function(){var a=y.createElement("input"),b=y.createElement("div"),c=y.createDocumentFragment();if(b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",k.leadingWhitespace=3===b.firstChild.nodeType,k.tbody=!b.getElementsByTagName("tbody").length,k.htmlSerialize=!!b.getElementsByTagName("link").length,k.html5Clone="<:nav></:nav>"!==y.createElement("nav").cloneNode(!0).outerHTML,a.type="checkbox",a.checked=!0,c.appendChild(a),k.appendChecked=a.checked,b.innerHTML="<textarea>x</textarea>",k.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue,c.appendChild(b),b.innerHTML="<input type='radio' checked='checked' name='t'/>",k.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,k.noCloneEvent=!0,b.attachEvent&&(b.attachEvent("onclick",function(){k.noCloneEvent=!1}),b.cloneNode(!0).click()),null==k.deleteExpando){k.deleteExpando=!0;try{delete b.test}catch(d){k.deleteExpando=!1}}}(),function(){var b,c,d=y.createElement("div");for(b in{submit:!0,change:!0,focusin:!0})c="on"+b,(k[b+"Bubbles"]=c in a)||(d.setAttribute(c,"t"),k[b+"Bubbles"]=d.attributes[c].expando===!1);d=null}();var X=/^(?:input|select|textarea)$/i,Y=/^key/,Z=/^(?:mouse|pointer|contextmenu)|click/,$=/^(?:focusinfocus|focusoutblur)$/,_=/^([^.]*)(?:\.(.+)|)$/;function ab(){return!0}function bb(){return!1}function cb(){try{return y.activeElement}catch(a){}}m.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,n,o,p,q,r=m._data(a);if(r){c.handler&&(i=c,c=i.handler,e=i.selector),c.guid||(c.guid=m.guid++),(g=r.events)||(g=r.events={}),(k=r.handle)||(k=r.handle=function(a){return typeof m===K||a&&m.event.triggered===a.type?void 0:m.event.dispatch.apply(k.elem,arguments)},k.elem=a),b=(b||"").match(E)||[""],h=b.length;while(h--)f=_.exec(b[h])||[],o=q=f[1],p=(f[2]||"").split(".").sort(),o&&(j=m.event.special[o]||{},o=(e?j.delegateType:j.bindType)||o,j=m.event.special[o]||{},l=m.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&m.expr.match.needsContext.test(e),namespace:p.join(".")},i),(n=g[o])||(n=g[o]=[],n.delegateCount=0,j.setup&&j.setup.call(a,d,p,k)!==!1||(a.addEventListener?a.addEventListener(o,k,!1):a.attachEvent&&a.attachEvent("on"+o,k))),j.add&&(j.add.call(a,l),l.handler.guid||(l.handler.guid=c.guid)),e?n.splice(n.delegateCount++,0,l):n.push(l),m.event.global[o]=!0);a=null}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,n,o,p,q,r=m.hasData(a)&&m._data(a);if(r&&(k=r.events)){b=(b||"").match(E)||[""],j=b.length;while(j--)if(h=_.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=m.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,n=k[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),i=f=n.length;while(f--)g=n[f],!e&&q!==g.origType||c&&c.guid!==g.guid||h&&!h.test(g.namespace)||d&&d!==g.selector&&("**"!==d||!g.selector)||(n.splice(f,1),g.selector&&n.delegateCount--,l.remove&&l.remove.call(a,g));i&&!n.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||m.removeEvent(a,o,r.handle),delete k[o])}else for(o in k)m.event.remove(a,o+b[j],c,d,!0);m.isEmptyObject(k)&&(delete r.handle,m._removeData(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,l,n,o=[d||y],p=j.call(b,"type")?b.type:b,q=j.call(b,"namespace")?b.namespace.split("."):[];if(h=l=d=d||y,3!==d.nodeType&&8!==d.nodeType&&!$.test(p+m.event.triggered)&&(p.indexOf(".")>=0&&(q=p.split("."),p=q.shift(),q.sort()),g=p.indexOf(":")<0&&"on"+p,b=b[m.expando]?b:new m.Event(p,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=q.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+q.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:m.makeArray(c,[b]),k=m.event.special[p]||{},e||!k.trigger||k.trigger.apply(d,c)!==!1)){if(!e&&!k.noBubble&&!m.isWindow(d)){for(i=k.delegateType||p,$.test(i+p)||(h=h.parentNode);h;h=h.parentNode)o.push(h),l=h;l===(d.ownerDocument||y)&&o.push(l.defaultView||l.parentWindow||a)}n=0;while((h=o[n++])&&!b.isPropagationStopped())b.type=n>1?i:k.bindType||p,f=(m._data(h,"events")||{})[b.type]&&m._data(h,"handle"),f&&f.apply(h,c),f=g&&h[g],f&&f.apply&&m.acceptData(h)&&(b.result=f.apply(h,c),b.result===!1&&b.preventDefault());if(b.type=p,!e&&!b.isDefaultPrevented()&&(!k._default||k._default.apply(o.pop(),c)===!1)&&m.acceptData(d)&&g&&d[p]&&!m.isWindow(d)){l=d[g],l&&(d[g]=null),m.event.triggered=p;try{d[p]()}catch(r){}m.event.triggered=void 0,l&&(d[g]=l)}return b.result}},dispatch:function(a){a=m.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(m._data(this,"events")||{})[a.type]||[],k=m.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=m.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,g=0;while((e=f.handlers[g++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(e.namespace))&&(a.handleObj=e,a.data=e.data,c=((m.event.special[e.origType]||{}).handle||e.handler).apply(f.elem,i),void 0!==c&&(a.result=c)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!=this;i=i.parentNode||this)if(1===i.nodeType&&(i.disabled!==!0||"click"!==a.type)){for(e=[],f=0;h>f;f++)d=b[f],c=d.selector+" ",void 0===e[c]&&(e[c]=d.needsContext?m(c,this).index(i)>=0:m.find(c,this,null,[i]).length),e[c]&&e.push(d);e.length&&g.push({elem:i,handlers:e})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},fix:function(a){if(a[m.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=Z.test(e)?this.mouseHooks:Y.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new m.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=f.srcElement||y),3===a.target.nodeType&&(a.target=a.target.parentNode),a.metaKey=!!a.metaKey,g.filter?g.filter(a,f):a},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button,g=b.fromElement;return null==a.pageX&&null!=b.clientX&&(d=a.target.ownerDocument||y,e=d.documentElement,c=d.body,a.pageX=b.clientX+(e&&e.scrollLeft||c&&c.scrollLeft||0)-(e&&e.clientLeft||c&&c.clientLeft||0),a.pageY=b.clientY+(e&&e.scrollTop||c&&c.scrollTop||0)-(e&&e.clientTop||c&&c.clientTop||0)),!a.relatedTarget&&g&&(a.relatedTarget=g===a.target?b.toElement:g),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==cb()&&this.focus)try{return this.focus(),!1}catch(a){}},delegateType:"focusin"},blur:{trigger:function(){return this===cb()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return m.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):void 0},_default:function(a){return m.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=m.extend(new m.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?m.event.trigger(e,null,b):m.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},m.removeEvent=y.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){var d="on"+b;a.detachEvent&&(typeof a[d]===K&&(a[d]=null),a.detachEvent(d,c))},m.Event=function(a,b){return this instanceof m.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?ab:bb):this.type=a,b&&m.extend(this,b),this.timeStamp=a&&a.timeStamp||m.now(),void(this[m.expando]=!0)):new m.Event(a,b)},m.Event.prototype={isDefaultPrevented:bb,isPropagationStopped:bb,isImmediatePropagationStopped:bb,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=ab,a&&(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=ab,a&&(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=ab,a&&a.stopImmediatePropagation&&a.stopImmediatePropagation(),this.stopPropagation()}},m.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){m.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!m.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),k.submitBubbles||(m.event.special.submit={setup:function(){return m.nodeName(this,"form")?!1:void m.event.add(this,"click._submit keypress._submit",function(a){var b=a.target,c=m.nodeName(b,"input")||m.nodeName(b,"button")?b.form:void 0;c&&!m._data(c,"submitBubbles")&&(m.event.add(c,"submit._submit",function(a){a._submit_bubble=!0}),m._data(c,"submitBubbles",!0))})},postDispatch:function(a){a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&m.event.simulate("submit",this.parentNode,a,!0))},teardown:function(){return m.nodeName(this,"form")?!1:void m.event.remove(this,"._submit")}}),k.changeBubbles||(m.event.special.change={setup:function(){return X.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(m.event.add(this,"propertychange._change",function(a){"checked"===a.originalEvent.propertyName&&(this._just_changed=!0)}),m.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1),m.event.simulate("change",this,a,!0)})),!1):void m.event.add(this,"beforeactivate._change",function(a){var b=a.target;X.test(b.nodeName)&&!m._data(b,"changeBubbles")&&(m.event.add(b,"change._change",function(a){!this.parentNode||a.isSimulated||a.isTrigger||m.event.simulate("change",this.parentNode,a,!0)}),m._data(b,"changeBubbles",!0))})},handle:function(a){var b=a.target;return this!==b||a.isSimulated||a.isTrigger||"radio"!==b.type&&"checkbox"!==b.type?a.handleObj.handler.apply(this,arguments):void 0},teardown:function(){return m.event.remove(this,"._change"),!X.test(this.nodeName)}}),k.focusinBubbles||m.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){m.event.simulate(b,a.target,m.event.fix(a),!0)};m.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=m._data(d,b);e||d.addEventListener(a,c,!0),m._data(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=m._data(d,b)-1;e?m._data(d,b,e):(d.removeEventListener(a,c,!0),m._removeData(d,b))}}}),m.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(f in a)this.on(f,b,c,a[f],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=bb;else if(!d)return this;return 1===e&&(g=d,d=function(a){return m().off(a),g.apply(this,arguments)},d.guid=g.guid||(g.guid=m.guid++)),this.each(function(){m.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,m(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=bb),this.each(function(){m.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){m.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?m.event.trigger(a,b,c,!0):void 0}});function db(a){var b=eb.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}var eb="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",fb=/ jQuery\d+="(?:null|\d+)"/g,gb=new RegExp("<(?:"+eb+")[\\s/>]","i"),hb=/^\s+/,ib=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,jb=/<([\w:]+)/,kb=/<tbody/i,lb=/<|&#?\w+;/,mb=/<(?:script|style|link)/i,nb=/checked\s*(?:[^=]|=\s*.checked.)/i,ob=/^$|\/(?:java|ecma)script/i,pb=/^true\/(.*)/,qb=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,rb={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:k.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},sb=db(y),tb=sb.appendChild(y.createElement("div"));rb.optgroup=rb.option,rb.tbody=rb.tfoot=rb.colgroup=rb.caption=rb.thead,rb.th=rb.td;function ub(a,b){var c,d,e=0,f=typeof a.getElementsByTagName!==K?a.getElementsByTagName(b||"*"):typeof a.querySelectorAll!==K?a.querySelectorAll(b||"*"):void 0;if(!f)for(f=[],c=a.childNodes||a;null!=(d=c[e]);e++)!b||m.nodeName(d,b)?f.push(d):m.merge(f,ub(d,b));return void 0===b||b&&m.nodeName(a,b)?m.merge([a],f):f}function vb(a){W.test(a.type)&&(a.defaultChecked=a.checked)}function wb(a,b){return m.nodeName(a,"table")&&m.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function xb(a){return a.type=(null!==m.find.attr(a,"type"))+"/"+a.type,a}function yb(a){var b=pb.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function zb(a,b){for(var c,d=0;null!=(c=a[d]);d++)m._data(c,"globalEval",!b||m._data(b[d],"globalEval"))}function Ab(a,b){if(1===b.nodeType&&m.hasData(a)){var c,d,e,f=m._data(a),g=m._data(b,f),h=f.events;if(h){delete g.handle,g.events={};for(c in h)for(d=0,e=h[c].length;e>d;d++)m.event.add(b,c,h[c][d])}g.data&&(g.data=m.extend({},g.data))}}function Bb(a,b){var c,d,e;if(1===b.nodeType){if(c=b.nodeName.toLowerCase(),!k.noCloneEvent&&b[m.expando]){e=m._data(b);for(d in e.events)m.removeEvent(b,d,e.handle);b.removeAttribute(m.expando)}"script"===c&&b.text!==a.text?(xb(b).text=a.text,yb(b)):"object"===c?(b.parentNode&&(b.outerHTML=a.outerHTML),k.html5Clone&&a.innerHTML&&!m.trim(b.innerHTML)&&(b.innerHTML=a.innerHTML)):"input"===c&&W.test(a.type)?(b.defaultChecked=b.checked=a.checked,b.value!==a.value&&(b.value=a.value)):"option"===c?b.defaultSelected=b.selected=a.defaultSelected:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}}m.extend({clone:function(a,b,c){var d,e,f,g,h,i=m.contains(a.ownerDocument,a);if(k.html5Clone||m.isXMLDoc(a)||!gb.test("<"+a.nodeName+">")?f=a.cloneNode(!0):(tb.innerHTML=a.outerHTML,tb.removeChild(f=tb.firstChild)),!(k.noCloneEvent&&k.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||m.isXMLDoc(a)))for(d=ub(f),h=ub(a),g=0;null!=(e=h[g]);++g)d[g]&&Bb(e,d[g]);if(b)if(c)for(h=h||ub(a),d=d||ub(f),g=0;null!=(e=h[g]);g++)Ab(e,d[g]);else Ab(a,f);return d=ub(f,"script"),d.length>0&&zb(d,!i&&ub(a,"script")),d=h=e=null,f},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,l,n=a.length,o=db(b),p=[],q=0;n>q;q++)if(f=a[q],f||0===f)if("object"===m.type(f))m.merge(p,f.nodeType?[f]:f);else if(lb.test(f)){h=h||o.appendChild(b.createElement("div")),i=(jb.exec(f)||["",""])[1].toLowerCase(),l=rb[i]||rb._default,h.innerHTML=l[1]+f.replace(ib,"<$1></$2>")+l[2],e=l[0];while(e--)h=h.lastChild;if(!k.leadingWhitespace&&hb.test(f)&&p.push(b.createTextNode(hb.exec(f)[0])),!k.tbody){f="table"!==i||kb.test(f)?"<table>"!==l[1]||kb.test(f)?0:h:h.firstChild,e=f&&f.childNodes.length;while(e--)m.nodeName(j=f.childNodes[e],"tbody")&&!j.childNodes.length&&f.removeChild(j)}m.merge(p,h.childNodes),h.textContent="";while(h.firstChild)h.removeChild(h.firstChild);h=o.lastChild}else p.push(b.createTextNode(f));h&&o.removeChild(h),k.appendChecked||m.grep(ub(p,"input"),vb),q=0;while(f=p[q++])if((!d||-1===m.inArray(f,d))&&(g=m.contains(f.ownerDocument,f),h=ub(o.appendChild(f),"script"),g&&zb(h),c)){e=0;while(f=h[e++])ob.test(f.type||"")&&c.push(f)}return h=null,o},cleanData:function(a,b){for(var d,e,f,g,h=0,i=m.expando,j=m.cache,l=k.deleteExpando,n=m.event.special;null!=(d=a[h]);h++)if((b||m.acceptData(d))&&(f=d[i],g=f&&j[f])){if(g.events)for(e in g.events)n[e]?m.event.remove(d,e):m.removeEvent(d,e,g.handle);j[f]&&(delete j[f],l?delete d[i]:typeof d.removeAttribute!==K?d.removeAttribute(i):d[i]=null,c.push(f))}}}),m.fn.extend({text:function(a){return V(this,function(a){return void 0===a?m.text(this):this.empty().append((this[0]&&this[0].ownerDocument||y).createTextNode(a))},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=wb(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=wb(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?m.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||m.cleanData(ub(c)),c.parentNode&&(b&&m.contains(c.ownerDocument,c)&&zb(ub(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++){1===a.nodeType&&m.cleanData(ub(a,!1));while(a.firstChild)a.removeChild(a.firstChild);a.options&&m.nodeName(a,"select")&&(a.options.length=0)}return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return m.clone(this,a,b)})},html:function(a){return V(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a)return 1===b.nodeType?b.innerHTML.replace(fb,""):void 0;if(!("string"!=typeof a||mb.test(a)||!k.htmlSerialize&&gb.test(a)||!k.leadingWhitespace&&hb.test(a)||rb[(jb.exec(a)||["",""])[1].toLowerCase()])){a=a.replace(ib,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(m.cleanData(ub(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,m.cleanData(ub(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,l=this.length,n=this,o=l-1,p=a[0],q=m.isFunction(p);if(q||l>1&&"string"==typeof p&&!k.checkClone&&nb.test(p))return this.each(function(c){var d=n.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(l&&(i=m.buildFragment(a,this[0].ownerDocument,!1,this),c=i.firstChild,1===i.childNodes.length&&(i=c),c)){for(g=m.map(ub(i,"script"),xb),f=g.length;l>j;j++)d=i,j!==o&&(d=m.clone(d,!0,!0),f&&m.merge(g,ub(d,"script"))),b.call(this[j],d,j);if(f)for(h=g[g.length-1].ownerDocument,m.map(g,yb),j=0;f>j;j++)d=g[j],ob.test(d.type||"")&&!m._data(d,"globalEval")&&m.contains(h,d)&&(d.src?m._evalUrl&&m._evalUrl(d.src):m.globalEval((d.text||d.textContent||d.innerHTML||"").replace(qb,"")));i=c=null}return this}}),m.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){m.fn[a]=function(a){for(var c,d=0,e=[],g=m(a),h=g.length-1;h>=d;d++)c=d===h?this:this.clone(!0),m(g[d])[b](c),f.apply(e,c.get());return this.pushStack(e)}});var Cb,Db={};function Eb(b,c){var d,e=m(c.createElement(b)).appendTo(c.body),f=a.getDefaultComputedStyle&&(d=a.getDefaultComputedStyle(e[0]))?d.display:m.css(e[0],"display");return e.detach(),f}function Fb(a){var b=y,c=Db[a];return c||(c=Eb(a,b),"none"!==c&&c||(Cb=(Cb||m("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=(Cb[0].contentWindow||Cb[0].contentDocument).document,b.write(),b.close(),c=Eb(a,b),Cb.detach()),Db[a]=c),c}!function(){var a;k.shrinkWrapBlocks=function(){if(null!=a)return a;a=!1;var b,c,d;return c=y.getElementsByTagName("body")[0],c&&c.style?(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),typeof b.style.zoom!==K&&(b.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1",b.appendChild(y.createElement("div")).style.width="5px",a=3!==b.offsetWidth),c.removeChild(d),a):void 0}}();var Gb=/^margin/,Hb=new RegExp("^("+S+")(?!px)[a-z%]+$","i"),Ib,Jb,Kb=/^(top|right|bottom|left)$/;a.getComputedStyle?(Ib=function(b){return b.ownerDocument.defaultView.opener?b.ownerDocument.defaultView.getComputedStyle(b,null):a.getComputedStyle(b,null)},Jb=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Ib(a),g=c?c.getPropertyValue(b)||c[b]:void 0,c&&(""!==g||m.contains(a.ownerDocument,a)||(g=m.style(a,b)),Hb.test(g)&&Gb.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0===g?g:g+""}):y.documentElement.currentStyle&&(Ib=function(a){return a.currentStyle},Jb=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Ib(a),g=c?c[b]:void 0,null==g&&h&&h[b]&&(g=h[b]),Hb.test(g)&&!Kb.test(b)&&(d=h.left,e=a.runtimeStyle,f=e&&e.left,f&&(e.left=a.currentStyle.left),h.left="fontSize"===b?"1em":g,g=h.pixelLeft+"px",h.left=d,f&&(e.left=f)),void 0===g?g:g+""||"auto"});function Lb(a,b){return{get:function(){var c=a();if(null!=c)return c?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d,e,f,g,h;if(b=y.createElement("div"),b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",d=b.getElementsByTagName("a")[0],c=d&&d.style){c.cssText="float:left;opacity:.5",k.opacity="0.5"===c.opacity,k.cssFloat=!!c.cssFloat,b.style.backgroundClip="content-box",b.cloneNode(!0).style.backgroundClip="",k.clearCloneStyle="content-box"===b.style.backgroundClip,k.boxSizing=""===c.boxSizing||""===c.MozBoxSizing||""===c.WebkitBoxSizing,m.extend(k,{reliableHiddenOffsets:function(){return null==g&&i(),g},boxSizingReliable:function(){return null==f&&i(),f},pixelPosition:function(){return null==e&&i(),e},reliableMarginRight:function(){return null==h&&i(),h}});function i(){var b,c,d,i;c=y.getElementsByTagName("body")[0],c&&c.style&&(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),b.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",e=f=!1,h=!0,a.getComputedStyle&&(e="1%"!==(a.getComputedStyle(b,null)||{}).top,f="4px"===(a.getComputedStyle(b,null)||{width:"4px"}).width,i=b.appendChild(y.createElement("div")),i.style.cssText=b.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",i.style.marginRight=i.style.width="0",b.style.width="1px",h=!parseFloat((a.getComputedStyle(i,null)||{}).marginRight),b.removeChild(i)),b.innerHTML="<table><tr><td></td><td>t</td></tr></table>",i=b.getElementsByTagName("td"),i[0].style.cssText="margin:0;border:0;padding:0;display:none",g=0===i[0].offsetHeight,g&&(i[0].style.display="",i[1].style.display="none",g=0===i[0].offsetHeight),c.removeChild(d))}}}(),m.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var Mb=/alpha\([^)]*\)/i,Nb=/opacity\s*=\s*([^)]*)/,Ob=/^(none|table(?!-c[ea]).+)/,Pb=new RegExp("^("+S+")(.*)$","i"),Qb=new RegExp("^([+-])=("+S+")","i"),Rb={position:"absolute",visibility:"hidden",display:"block"},Sb={letterSpacing:"0",fontWeight:"400"},Tb=["Webkit","O","Moz","ms"];function Ub(a,b){if(b in a)return b;var c=b.charAt(0).toUpperCase()+b.slice(1),d=b,e=Tb.length;while(e--)if(b=Tb[e]+c,b in a)return b;return d}function Vb(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=m._data(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&U(d)&&(f[g]=m._data(d,"olddisplay",Fb(d.nodeName)))):(e=U(d),(c&&"none"!==c||!e)&&m._data(d,"olddisplay",e?c:m.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}function Wb(a,b,c){var d=Pb.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Xb(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=m.css(a,c+T[f],!0,e)),d?("content"===c&&(g-=m.css(a,"padding"+T[f],!0,e)),"margin"!==c&&(g-=m.css(a,"border"+T[f]+"Width",!0,e))):(g+=m.css(a,"padding"+T[f],!0,e),"padding"!==c&&(g+=m.css(a,"border"+T[f]+"Width",!0,e)));return g}function Yb(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=Ib(a),g=k.boxSizing&&"border-box"===m.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=Jb(a,b,f),(0>e||null==e)&&(e=a.style[b]),Hb.test(e))return e;d=g&&(k.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Xb(a,b,c||(g?"border":"content"),d,f)+"px"}m.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Jb(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":k.cssFloat?"cssFloat":"styleFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=m.camelCase(b),i=a.style;if(b=m.cssProps[h]||(m.cssProps[h]=Ub(i,h)),g=m.cssHooks[b]||m.cssHooks[h],void 0===c)return g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b];if(f=typeof c,"string"===f&&(e=Qb.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(m.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||m.cssNumber[h]||(c+="px"),k.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),!(g&&"set"in g&&void 0===(c=g.set(a,c,d)))))try{i[b]=c}catch(j){}}},css:function(a,b,c,d){var e,f,g,h=m.camelCase(b);return b=m.cssProps[h]||(m.cssProps[h]=Ub(a.style,h)),g=m.cssHooks[b]||m.cssHooks[h],g&&"get"in g&&(f=g.get(a,!0,c)),void 0===f&&(f=Jb(a,b,d)),"normal"===f&&b in Sb&&(f=Sb[b]),""===c||c?(e=parseFloat(f),c===!0||m.isNumeric(e)?e||0:f):f}}),m.each(["height","width"],function(a,b){m.cssHooks[b]={get:function(a,c,d){return c?Ob.test(m.css(a,"display"))&&0===a.offsetWidth?m.swap(a,Rb,function(){return Yb(a,b,d)}):Yb(a,b,d):void 0},set:function(a,c,d){var e=d&&Ib(a);return Wb(a,c,d?Xb(a,b,d,k.boxSizing&&"border-box"===m.css(a,"boxSizing",!1,e),e):0)}}}),k.opacity||(m.cssHooks.opacity={get:function(a,b){return Nb.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=m.isNumeric(b)?"alpha(opacity="+100*b+")":"",f=d&&d.filter||c.filter||"";c.zoom=1,(b>=1||""===b)&&""===m.trim(f.replace(Mb,""))&&c.removeAttribute&&(c.removeAttribute("filter"),""===b||d&&!d.filter)||(c.filter=Mb.test(f)?f.replace(Mb,e):f+" "+e)}}),m.cssHooks.marginRight=Lb(k.reliableMarginRight,function(a,b){return b?m.swap(a,{display:"inline-block"},Jb,[a,"marginRight"]):void 0}),m.each({margin:"",padding:"",border:"Width"},function(a,b){m.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+T[d]+b]=f[d]||f[d-2]||f[0];return e}},Gb.test(a)||(m.cssHooks[a+b].set=Wb)}),m.fn.extend({css:function(a,b){return V(this,function(a,b,c){var d,e,f={},g=0;if(m.isArray(b)){for(d=Ib(a),e=b.length;e>g;g++)f[b[g]]=m.css(a,b[g],!1,d);return f}return void 0!==c?m.style(a,b,c):m.css(a,b)},a,b,arguments.length>1)},show:function(){return Vb(this,!0)},hide:function(){return Vb(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){U(this)?m(this).show():m(this).hide()})}});function Zb(a,b,c,d,e){return new Zb.prototype.init(a,b,c,d,e)
}m.Tween=Zb,Zb.prototype={constructor:Zb,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(m.cssNumber[c]?"":"px")},cur:function(){var a=Zb.propHooks[this.prop];return a&&a.get?a.get(this):Zb.propHooks._default.get(this)},run:function(a){var b,c=Zb.propHooks[this.prop];return this.pos=b=this.options.duration?m.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Zb.propHooks._default.set(this),this}},Zb.prototype.init.prototype=Zb.prototype,Zb.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=m.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){m.fx.step[a.prop]?m.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[m.cssProps[a.prop]]||m.cssHooks[a.prop])?m.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},Zb.propHooks.scrollTop=Zb.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},m.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},m.fx=Zb.prototype.init,m.fx.step={};var $b,_b,ac=/^(?:toggle|show|hide)$/,bc=new RegExp("^(?:([+-])=|)("+S+")([a-z%]*)$","i"),cc=/queueHooks$/,dc=[ic],ec={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=bc.exec(b),f=e&&e[3]||(m.cssNumber[a]?"":"px"),g=(m.cssNumber[a]||"px"!==f&&+d)&&bc.exec(m.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,m.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function fc(){return setTimeout(function(){$b=void 0}),$b=m.now()}function gc(a,b){var c,d={height:a},e=0;for(b=b?1:0;4>e;e+=2-b)c=T[e],d["margin"+c]=d["padding"+c]=a;return b&&(d.opacity=d.width=a),d}function hc(a,b,c){for(var d,e=(ec[b]||[]).concat(ec["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function ic(a,b,c){var d,e,f,g,h,i,j,l,n=this,o={},p=a.style,q=a.nodeType&&U(a),r=m._data(a,"fxshow");c.queue||(h=m._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,n.always(function(){n.always(function(){h.unqueued--,m.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[p.overflow,p.overflowX,p.overflowY],j=m.css(a,"display"),l="none"===j?m._data(a,"olddisplay")||Fb(a.nodeName):j,"inline"===l&&"none"===m.css(a,"float")&&(k.inlineBlockNeedsLayout&&"inline"!==Fb(a.nodeName)?p.zoom=1:p.display="inline-block")),c.overflow&&(p.overflow="hidden",k.shrinkWrapBlocks()||n.always(function(){p.overflow=c.overflow[0],p.overflowX=c.overflow[1],p.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],ac.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(q?"hide":"show")){if("show"!==e||!r||void 0===r[d])continue;q=!0}o[d]=r&&r[d]||m.style(a,d)}else j=void 0;if(m.isEmptyObject(o))"inline"===("none"===j?Fb(a.nodeName):j)&&(p.display=j);else{r?"hidden"in r&&(q=r.hidden):r=m._data(a,"fxshow",{}),f&&(r.hidden=!q),q?m(a).show():n.done(function(){m(a).hide()}),n.done(function(){var b;m._removeData(a,"fxshow");for(b in o)m.style(a,b,o[b])});for(d in o)g=hc(q?r[d]:0,d,n),d in r||(r[d]=g.start,q&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function jc(a,b){var c,d,e,f,g;for(c in a)if(d=m.camelCase(c),e=b[d],f=a[c],m.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=m.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function kc(a,b,c){var d,e,f=0,g=dc.length,h=m.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=$b||fc(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:m.extend({},b),opts:m.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:$b||fc(),duration:c.duration,tweens:[],createTween:function(b,c){var d=m.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(jc(k,j.opts.specialEasing);g>f;f++)if(d=dc[f].call(j,a,k,j.opts))return d;return m.map(k,hc,j),m.isFunction(j.opts.start)&&j.opts.start.call(a,j),m.fx.timer(m.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}m.Animation=m.extend(kc,{tweener:function(a,b){m.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],ec[c]=ec[c]||[],ec[c].unshift(b)},prefilter:function(a,b){b?dc.unshift(a):dc.push(a)}}),m.speed=function(a,b,c){var d=a&&"object"==typeof a?m.extend({},a):{complete:c||!c&&b||m.isFunction(a)&&a,duration:a,easing:c&&b||b&&!m.isFunction(b)&&b};return d.duration=m.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in m.fx.speeds?m.fx.speeds[d.duration]:m.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){m.isFunction(d.old)&&d.old.call(this),d.queue&&m.dequeue(this,d.queue)},d},m.fn.extend({fadeTo:function(a,b,c,d){return this.filter(U).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=m.isEmptyObject(a),f=m.speed(b,c,d),g=function(){var b=kc(this,m.extend({},a),f);(e||m._data(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=m.timers,g=m._data(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&cc.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&m.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=m._data(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=m.timers,g=d?d.length:0;for(c.finish=!0,m.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),m.each(["toggle","show","hide"],function(a,b){var c=m.fn[b];m.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(gc(b,!0),a,d,e)}}),m.each({slideDown:gc("show"),slideUp:gc("hide"),slideToggle:gc("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){m.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),m.timers=[],m.fx.tick=function(){var a,b=m.timers,c=0;for($b=m.now();c<b.length;c++)a=b[c],a()||b[c]!==a||b.splice(c--,1);b.length||m.fx.stop(),$b=void 0},m.fx.timer=function(a){m.timers.push(a),a()?m.fx.start():m.timers.pop()},m.fx.interval=13,m.fx.start=function(){_b||(_b=setInterval(m.fx.tick,m.fx.interval))},m.fx.stop=function(){clearInterval(_b),_b=null},m.fx.speeds={slow:600,fast:200,_default:400},m.fn.delay=function(a,b){return a=m.fx?m.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a,b,c,d,e;b=y.createElement("div"),b.setAttribute("className","t"),b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",d=b.getElementsByTagName("a")[0],c=y.createElement("select"),e=c.appendChild(y.createElement("option")),a=b.getElementsByTagName("input")[0],d.style.cssText="top:1px",k.getSetAttribute="t"!==b.className,k.style=/top/.test(d.getAttribute("style")),k.hrefNormalized="/a"===d.getAttribute("href"),k.checkOn=!!a.value,k.optSelected=e.selected,k.enctype=!!y.createElement("form").enctype,c.disabled=!0,k.optDisabled=!e.disabled,a=y.createElement("input"),a.setAttribute("value",""),k.input=""===a.getAttribute("value"),a.value="t",a.setAttribute("type","radio"),k.radioValue="t"===a.value}();var lc=/\r/g;m.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=m.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,m(this).val()):a,null==e?e="":"number"==typeof e?e+="":m.isArray(e)&&(e=m.map(e,function(a){return null==a?"":a+""})),b=m.valHooks[this.type]||m.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=m.valHooks[e.type]||m.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(lc,""):null==c?"":c)}}}),m.extend({valHooks:{option:{get:function(a){var b=m.find.attr(a,"value");return null!=b?b:m.trim(m.text(a))}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(k.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&m.nodeName(c.parentNode,"optgroup"))){if(b=m(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=m.makeArray(b),g=e.length;while(g--)if(d=e[g],m.inArray(m.valHooks.option.get(d),f)>=0)try{d.selected=c=!0}catch(h){d.scrollHeight}else d.selected=!1;return c||(a.selectedIndex=-1),e}}}}),m.each(["radio","checkbox"],function(){m.valHooks[this]={set:function(a,b){return m.isArray(b)?a.checked=m.inArray(m(a).val(),b)>=0:void 0}},k.checkOn||(m.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var mc,nc,oc=m.expr.attrHandle,pc=/^(?:checked|selected)$/i,qc=k.getSetAttribute,rc=k.input;m.fn.extend({attr:function(a,b){return V(this,m.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){m.removeAttr(this,a)})}}),m.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===K?m.prop(a,b,c):(1===f&&m.isXMLDoc(a)||(b=b.toLowerCase(),d=m.attrHooks[b]||(m.expr.match.bool.test(b)?nc:mc)),void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=m.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void m.removeAttr(a,b))},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(E);if(f&&1===a.nodeType)while(c=f[e++])d=m.propFix[c]||c,m.expr.match.bool.test(c)?rc&&qc||!pc.test(c)?a[d]=!1:a[m.camelCase("default-"+c)]=a[d]=!1:m.attr(a,c,""),a.removeAttribute(qc?c:d)},attrHooks:{type:{set:function(a,b){if(!k.radioValue&&"radio"===b&&m.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),nc={set:function(a,b,c){return b===!1?m.removeAttr(a,c):rc&&qc||!pc.test(c)?a.setAttribute(!qc&&m.propFix[c]||c,c):a[m.camelCase("default-"+c)]=a[c]=!0,c}},m.each(m.expr.match.bool.source.match(/\w+/g),function(a,b){var c=oc[b]||m.find.attr;oc[b]=rc&&qc||!pc.test(b)?function(a,b,d){var e,f;return d||(f=oc[b],oc[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,oc[b]=f),e}:function(a,b,c){return c?void 0:a[m.camelCase("default-"+b)]?b.toLowerCase():null}}),rc&&qc||(m.attrHooks.value={set:function(a,b,c){return m.nodeName(a,"input")?void(a.defaultValue=b):mc&&mc.set(a,b,c)}}),qc||(mc={set:function(a,b,c){var d=a.getAttributeNode(c);return d||a.setAttributeNode(d=a.ownerDocument.createAttribute(c)),d.value=b+="","value"===c||b===a.getAttribute(c)?b:void 0}},oc.id=oc.name=oc.coords=function(a,b,c){var d;return c?void 0:(d=a.getAttributeNode(b))&&""!==d.value?d.value:null},m.valHooks.button={get:function(a,b){var c=a.getAttributeNode(b);return c&&c.specified?c.value:void 0},set:mc.set},m.attrHooks.contenteditable={set:function(a,b,c){mc.set(a,""===b?!1:b,c)}},m.each(["width","height"],function(a,b){m.attrHooks[b]={set:function(a,c){return""===c?(a.setAttribute(b,"auto"),c):void 0}}})),k.style||(m.attrHooks.style={get:function(a){return a.style.cssText||void 0},set:function(a,b){return a.style.cssText=b+""}});var sc=/^(?:input|select|textarea|button|object)$/i,tc=/^(?:a|area)$/i;m.fn.extend({prop:function(a,b){return V(this,m.prop,a,b,arguments.length>1)},removeProp:function(a){return a=m.propFix[a]||a,this.each(function(){try{this[a]=void 0,delete this[a]}catch(b){}})}}),m.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!m.isXMLDoc(a),f&&(b=m.propFix[b]||b,e=m.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=m.find.attr(a,"tabindex");return b?parseInt(b,10):sc.test(a.nodeName)||tc.test(a.nodeName)&&a.href?0:-1}}}}),k.hrefNormalized||m.each(["href","src"],function(a,b){m.propHooks[b]={get:function(a){return a.getAttribute(b,4)}}}),k.optSelected||(m.propHooks.selected={get:function(a){var b=a.parentNode;return b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex),null}}),m.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){m.propFix[this.toLowerCase()]=this}),k.enctype||(m.propFix.enctype="encoding");var uc=/[\t\r\n\f]/g;m.fn.extend({addClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j="string"==typeof a&&a;if(m.isFunction(a))return this.each(function(b){m(this).addClass(a.call(this,b,this.className))});if(j)for(b=(a||"").match(E)||[];i>h;h++)if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(uc," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=m.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j=0===arguments.length||"string"==typeof a&&a;if(m.isFunction(a))return this.each(function(b){m(this).removeClass(a.call(this,b,this.className))});if(j)for(b=(a||"").match(E)||[];i>h;h++)if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(uc," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?m.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(m.isFunction(a)?function(c){m(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=m(this),f=a.match(E)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===K||"boolean"===c)&&(this.className&&m._data(this,"__className__",this.className),this.className=this.className||a===!1?"":m._data(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(uc," ").indexOf(b)>=0)return!0;return!1}}),m.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){m.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),m.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var vc=m.now(),wc=/\?/,xc=/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;m.parseJSON=function(b){if(a.JSON&&a.JSON.parse)return a.JSON.parse(b+"");var c,d=null,e=m.trim(b+"");return e&&!m.trim(e.replace(xc,function(a,b,e,f){return c&&b&&(d=0),0===d?a:(c=e||b,d+=!f-!e,"")}))?Function("return "+e)():m.error("Invalid JSON: "+b)},m.parseXML=function(b){var c,d;if(!b||"string"!=typeof b)return null;try{a.DOMParser?(d=new DOMParser,c=d.parseFromString(b,"text/xml")):(c=new ActiveXObject("Microsoft.XMLDOM"),c.async="false",c.loadXML(b))}catch(e){c=void 0}return c&&c.documentElement&&!c.getElementsByTagName("parsererror").length||m.error("Invalid XML: "+b),c};var yc,zc,Ac=/#.*$/,Bc=/([?&])_=[^&]*/,Cc=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Dc=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Ec=/^(?:GET|HEAD)$/,Fc=/^\/\//,Gc=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,Hc={},Ic={},Jc="*/".concat("*");try{zc=location.href}catch(Kc){zc=y.createElement("a"),zc.href="",zc=zc.href}yc=Gc.exec(zc.toLowerCase())||[];function Lc(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(E)||[];if(m.isFunction(c))while(d=f[e++])"+"===d.charAt(0)?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function Mc(a,b,c,d){var e={},f=a===Ic;function g(h){var i;return e[h]=!0,m.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function Nc(a,b){var c,d,e=m.ajaxSettings.flatOptions||{};for(d in b)void 0!==b[d]&&((e[d]?a:c||(c={}))[d]=b[d]);return c&&m.extend(!0,a,c),a}function Oc(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===e&&(e=a.mimeType||b.getResponseHeader("Content-Type"));if(e)for(g in h)if(h[g]&&h[g].test(e)){i.unshift(g);break}if(i[0]in c)f=i[0];else{for(g in c){if(!i[0]||a.converters[g+" "+i[0]]){f=g;break}d||(d=g)}f=f||d}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function Pc(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}m.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:zc,type:"GET",isLocal:Dc.test(yc[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Jc,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":m.parseJSON,"text xml":m.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?Nc(Nc(a,m.ajaxSettings),b):Nc(m.ajaxSettings,a)},ajaxPrefilter:Lc(Hc),ajaxTransport:Lc(Ic),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=m.ajaxSetup({},b),l=k.context||k,n=k.context&&(l.nodeType||l.jquery)?m(l):m.event,o=m.Deferred(),p=m.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!j){j={};while(b=Cc.exec(f))j[b[1].toLowerCase()]=b[2]}b=j[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?f:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return i&&i.abort(b),x(0,b),this}};if(o.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||zc)+"").replace(Ac,"").replace(Fc,yc[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=m.trim(k.dataType||"*").toLowerCase().match(E)||[""],null==k.crossDomain&&(c=Gc.exec(k.url.toLowerCase()),k.crossDomain=!(!c||c[1]===yc[1]&&c[2]===yc[2]&&(c[3]||("http:"===c[1]?"80":"443"))===(yc[3]||("http:"===yc[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=m.param(k.data,k.traditional)),Mc(Hc,k,b,v),2===t)return v;h=m.event&&k.global,h&&0===m.active++&&m.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!Ec.test(k.type),e=k.url,k.hasContent||(k.data&&(e=k.url+=(wc.test(e)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=Bc.test(e)?e.replace(Bc,"$1_="+vc++):e+(wc.test(e)?"&":"?")+"_="+vc++)),k.ifModified&&(m.lastModified[e]&&v.setRequestHeader("If-Modified-Since",m.lastModified[e]),m.etag[e]&&v.setRequestHeader("If-None-Match",m.etag[e])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+Jc+"; q=0.01":""):k.accepts["*"]);for(d in k.headers)v.setRequestHeader(d,k.headers[d]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(d in{success:1,error:1,complete:1})v[d](k[d]);if(i=Mc(Ic,k,b,v)){v.readyState=1,h&&n.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,i.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,c,d){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),i=void 0,f=d||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,c&&(u=Oc(k,v,c)),u=Pc(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(m.lastModified[e]=w),w=v.getResponseHeader("etag"),w&&(m.etag[e]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?o.resolveWith(l,[r,x,v]):o.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,h&&n.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),h&&(n.trigger("ajaxComplete",[v,k]),--m.active||m.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return m.get(a,b,c,"json")},getScript:function(a,b){return m.get(a,void 0,b,"script")}}),m.each(["get","post"],function(a,b){m[b]=function(a,c,d,e){return m.isFunction(c)&&(e=e||d,d=c,c=void 0),m.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),m._evalUrl=function(a){return m.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},m.fn.extend({wrapAll:function(a){if(m.isFunction(a))return this.each(function(b){m(this).wrapAll(a.call(this,b))});if(this[0]){var b=m(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&1===a.firstChild.nodeType)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){return this.each(m.isFunction(a)?function(b){m(this).wrapInner(a.call(this,b))}:function(){var b=m(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=m.isFunction(a);return this.each(function(c){m(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){m.nodeName(this,"body")||m(this).replaceWith(this.childNodes)}).end()}}),m.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0||!k.reliableHiddenOffsets()&&"none"===(a.style&&a.style.display||m.css(a,"display"))},m.expr.filters.visible=function(a){return!m.expr.filters.hidden(a)};var Qc=/%20/g,Rc=/\[\]$/,Sc=/\r?\n/g,Tc=/^(?:submit|button|image|reset|file)$/i,Uc=/^(?:input|select|textarea|keygen)/i;function Vc(a,b,c,d){var e;if(m.isArray(b))m.each(b,function(b,e){c||Rc.test(a)?d(a,e):Vc(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==m.type(b))d(a,b);else for(e in b)Vc(a+"["+e+"]",b[e],c,d)}m.param=function(a,b){var c,d=[],e=function(a,b){b=m.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=m.ajaxSettings&&m.ajaxSettings.traditional),m.isArray(a)||a.jquery&&!m.isPlainObject(a))m.each(a,function(){e(this.name,this.value)});else for(c in a)Vc(c,a[c],b,e);return d.join("&").replace(Qc,"+")},m.fn.extend({serialize:function(){return m.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=m.prop(this,"elements");return a?m.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!m(this).is(":disabled")&&Uc.test(this.nodeName)&&!Tc.test(a)&&(this.checked||!W.test(a))}).map(function(a,b){var c=m(this).val();return null==c?null:m.isArray(c)?m.map(c,function(a){return{name:b.name,value:a.replace(Sc,"\r\n")}}):{name:b.name,value:c.replace(Sc,"\r\n")}}).get()}}),m.ajaxSettings.xhr=void 0!==a.ActiveXObject?function(){return!this.isLocal&&/^(get|post|head|put|delete|options)$/i.test(this.type)&&Zc()||$c()}:Zc;var Wc=0,Xc={},Yc=m.ajaxSettings.xhr();a.attachEvent&&a.attachEvent("onunload",function(){for(var a in Xc)Xc[a](void 0,!0)}),k.cors=!!Yc&&"withCredentials"in Yc,Yc=k.ajax=!!Yc,Yc&&m.ajaxTransport(function(a){if(!a.crossDomain||k.cors){var b;return{send:function(c,d){var e,f=a.xhr(),g=++Wc;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)void 0!==c[e]&&f.setRequestHeader(e,c[e]+"");f.send(a.hasContent&&a.data||null),b=function(c,e){var h,i,j;if(b&&(e||4===f.readyState))if(delete Xc[g],b=void 0,f.onreadystatechange=m.noop,e)4!==f.readyState&&f.abort();else{j={},h=f.status,"string"==typeof f.responseText&&(j.text=f.responseText);try{i=f.statusText}catch(k){i=""}h||!a.isLocal||a.crossDomain?1223===h&&(h=204):h=j.text?200:404}j&&d(h,i,j,f.getAllResponseHeaders())},a.async?4===f.readyState?setTimeout(b):f.onreadystatechange=Xc[g]=b:b()},abort:function(){b&&b(void 0,!0)}}}});function Zc(){try{return new a.XMLHttpRequest}catch(b){}}function $c(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}m.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return m.globalEval(a),a}}}),m.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),m.ajaxTransport("script",function(a){if(a.crossDomain){var b,c=y.head||m("head")[0]||y.documentElement;return{send:function(d,e){b=y.createElement("script"),b.async=!0,a.scriptCharset&&(b.charset=a.scriptCharset),b.src=a.url,b.onload=b.onreadystatechange=function(a,c){(c||!b.readyState||/loaded|complete/.test(b.readyState))&&(b.onload=b.onreadystatechange=null,b.parentNode&&b.parentNode.removeChild(b),b=null,c||e(200,"success"))},c.insertBefore(b,c.firstChild)},abort:function(){b&&b.onload(void 0,!0)}}}});var _c=[],ad=/(=)\?(?=&|$)|\?\?/;m.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=_c.pop()||m.expando+"_"+vc++;return this[a]=!0,a}}),m.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(ad.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&ad.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=m.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(ad,"$1"+e):b.jsonp!==!1&&(b.url+=(wc.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||m.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,_c.push(e)),g&&m.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),m.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||y;var d=u.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=m.buildFragment([a],b,e),e&&e.length&&m(e).remove(),m.merge([],d.childNodes))};var bd=m.fn.load;m.fn.load=function(a,b,c){if("string"!=typeof a&&bd)return bd.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=m.trim(a.slice(h,a.length)),a=a.slice(0,h)),m.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(f="POST"),g.length>0&&m.ajax({url:a,type:f,dataType:"html",data:b}).done(function(a){e=arguments,g.html(d?m("<div>").append(m.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,e||[a.responseText,b,a])}),this},m.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){m.fn[b]=function(a){return this.on(b,a)}}),m.expr.filters.animated=function(a){return m.grep(m.timers,function(b){return a===b.elem}).length};var cd=a.document.documentElement;function dd(a){return m.isWindow(a)?a:9===a.nodeType?a.defaultView||a.parentWindow:!1}m.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=m.css(a,"position"),l=m(a),n={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=m.css(a,"top"),i=m.css(a,"left"),j=("absolute"===k||"fixed"===k)&&m.inArray("auto",[f,i])>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),m.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(n.top=b.top-h.top+g),null!=b.left&&(n.left=b.left-h.left+e),"using"in b?b.using.call(a,n):l.css(n)}},m.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){m.offset.setOffset(this,a,b)});var b,c,d={top:0,left:0},e=this[0],f=e&&e.ownerDocument;if(f)return b=f.documentElement,m.contains(b,e)?(typeof e.getBoundingClientRect!==K&&(d=e.getBoundingClientRect()),c=dd(f),{top:d.top+(c.pageYOffset||b.scrollTop)-(b.clientTop||0),left:d.left+(c.pageXOffset||b.scrollLeft)-(b.clientLeft||0)}):d},position:function(){if(this[0]){var a,b,c={top:0,left:0},d=this[0];return"fixed"===m.css(d,"position")?b=d.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),m.nodeName(a[0],"html")||(c=a.offset()),c.top+=m.css(a[0],"borderTopWidth",!0),c.left+=m.css(a[0],"borderLeftWidth",!0)),{top:b.top-c.top-m.css(d,"marginTop",!0),left:b.left-c.left-m.css(d,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||cd;while(a&&!m.nodeName(a,"html")&&"static"===m.css(a,"position"))a=a.offsetParent;return a||cd})}}),m.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c=/Y/.test(b);m.fn[a]=function(d){return V(this,function(a,d,e){var f=dd(a);return void 0===e?f?b in f?f[b]:f.document.documentElement[d]:a[d]:void(f?f.scrollTo(c?m(f).scrollLeft():e,c?e:m(f).scrollTop()):a[d]=e)},a,d,arguments.length,null)}}),m.each(["top","left"],function(a,b){m.cssHooks[b]=Lb(k.pixelPosition,function(a,c){return c?(c=Jb(a,b),Hb.test(c)?m(a).position()[b]+"px":c):void 0})}),m.each({Height:"height",Width:"width"},function(a,b){m.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){m.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return V(this,function(b,c,d){var e;return m.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?m.css(b,c,g):m.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),m.fn.size=function(){return this.length},m.fn.andSelf=m.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return m});var ed=a.jQuery,fd=a.$;return m.noConflict=function(b){return a.$===m&&(a.$=fd),b&&a.jQuery===m&&(a.jQuery=ed),m},typeof b===K&&(a.jQuery=a.$=m),m});

/**
 * jsBezier-0.7
 *
 * Copyright (c) 2010 - 2015 jsPlumb (hello@jsplumbtoolkit.com)
 *
 * licensed under the MIT license.
 *
 * a set of Bezier curve functions that deal with Beziers, used by jsPlumb, and perhaps useful for other people.  These functions work with Bezier
 * curves of arbitrary degree.
 *
 * - functions are all in the 'jsBezier' namespace.
 *
 * - all input points should be in the format {x:.., y:..}. all output points are in this format too.
 *
 * - all input curves should be in the format [ {x:.., y:..}, {x:.., y:..}, {x:.., y:..}, {x:.., y:..} ]
 *
 * - 'location' as used as an input here refers to a decimal in the range 0-1 inclusive, which indicates a point some proportion along the length
 * of the curve.  location as output has the same format and meaning.
 *
 *
 * Function List:
 * --------------
 *
 * distanceFromCurve(point, curve)
 *
 * 	Calculates the distance that the given point lies from the given Bezier.  Note that it is computed relative to the center of the Bezier,
 * so if you have stroked the curve with a wide pen you may wish to take that into account!  The distance returned is relative to the values
 * of the curve and the point - it will most likely be pixels.
 *
 * gradientAtPoint(curve, location)
 *
 * 	Calculates the gradient to the curve at the given location, as a decimal between 0 and 1 inclusive.
 *
 * gradientAtPointAlongCurveFrom (curve, location)
 *
 *	Calculates the gradient at the point on the given curve that is 'distance' units from location.
 *
 * nearestPointOnCurve(point, curve)
 *
 *	Calculates the nearest point to the given point on the given curve.  The return value of this is a JS object literal, containing both the
 *point's coordinates and also the 'location' of the point (see above), for example:  { point:{x:551,y:150}, location:0.263365 }.
 *
 * pointOnCurve(curve, location)
 *
 * 	Calculates the coordinates of the point on the given Bezier curve at the given location.
 *
 * pointAlongCurveFrom(curve, location, distance)
 *
 * 	Calculates the coordinates of the point on the given curve that is 'distance' units from location.  'distance' should be in the same coordinate
 * space as that used to construct the Bezier curve.  For an HTML Canvas usage, for example, distance would be a measure of pixels.
 *
 * locationAlongCurveFrom(curve, location, distance)
 *
 * 	Calculates the location on the given curve that is 'distance' units from location.  'distance' should be in the same coordinate
 * space as that used to construct the Bezier curve.  For an HTML Canvas usage, for example, distance would be a measure of pixels.
 *
 * perpendicularToCurveAt(curve, location, length, distance)
 *
 * 	Calculates the perpendicular to the given curve at the given location.  length is the length of the line you wish for (it will be centered
 * on the point at 'location'). distance is optional, and allows you to specify a point along the path from the given location as the center of
 * the perpendicular returned.  The return value of this is an array of two points: [ {x:...,y:...}, {x:...,y:...} ].
 *
 *
 */

(function() {

    var root = this;

    if(typeof Math.sgn == "undefined") {
        Math.sgn = function(x) { return x == 0 ? 0 : x > 0 ? 1 :-1; };
    }

    var Vectors = {
            subtract 	: 	function(v1, v2) { return {x:v1.x - v2.x, y:v1.y - v2.y }; },
            dotProduct	: 	function(v1, v2) { return (v1.x * v2.x)  + (v1.y * v2.y); },
            square		:	function(v) { return Math.sqrt((v.x * v.x) + (v.y * v.y)); },
            scale		:	function(v, s) { return {x:v.x * s, y:v.y * s }; }
        },

        maxRecursion = 64,
        flatnessTolerance = Math.pow(2.0,-maxRecursion-1);

    /**
     * Calculates the distance that the point lies from the curve.
     *
     * @param point a point in the form {x:567, y:3342}
     * @param curve a Bezier curve in the form [{x:..., y:...}, {x:..., y:...}, {x:..., y:...}, {x:..., y:...}].  note that this is currently
     * hardcoded to assume cubiz beziers, but would be better off supporting any degree.
     * @return a JS object literal containing location and distance, for example: {location:0.35, distance:10}.  Location is analogous to the location
     * argument you pass to the pointOnPath function: it is a ratio of distance travelled along the curve.  Distance is the distance in pixels from
     * the point to the curve.
     */
    var _distanceFromCurve = function(point, curve) {
        var candidates = [],
            w = _convertToBezier(point, curve),
            degree = curve.length - 1, higherDegree = (2 * degree) - 1,
            numSolutions = _findRoots(w, higherDegree, candidates, 0),
            v = Vectors.subtract(point, curve[0]), dist = Vectors.square(v), t = 0.0;

        for (var i = 0; i < numSolutions; i++) {
            v = Vectors.subtract(point, _bezier(curve, degree, candidates[i], null, null));
            var newDist = Vectors.square(v);
            if (newDist < dist) {
                dist = newDist;
                t = candidates[i];
            }
        }
        v = Vectors.subtract(point, curve[degree]);
        newDist = Vectors.square(v);
        if (newDist < dist) {
            dist = newDist;
            t = 1.0;
        }
        return {location:t, distance:dist};
    };
    /**
     * finds the nearest point on the curve to the given point.
     */
    var _nearestPointOnCurve = function(point, curve) {
        var td = _distanceFromCurve(point, curve);
        return {point:_bezier(curve, curve.length - 1, td.location, null, null), location:td.location};
    };
    var _convertToBezier = function(point, curve) {
        var degree = curve.length - 1, higherDegree = (2 * degree) - 1,
            c = [], d = [], cdTable = [], w = [],
            z = [ [1.0, 0.6, 0.3, 0.1], [0.4, 0.6, 0.6, 0.4], [0.1, 0.3, 0.6, 1.0] ];

        for (var i = 0; i <= degree; i++) c[i] = Vectors.subtract(curve[i], point);
        for (var i = 0; i <= degree - 1; i++) {
            d[i] = Vectors.subtract(curve[i+1], curve[i]);
            d[i] = Vectors.scale(d[i], 3.0);
        }
        for (var row = 0; row <= degree - 1; row++) {
            for (var column = 0; column <= degree; column++) {
                if (!cdTable[row]) cdTable[row] = [];
                cdTable[row][column] = Vectors.dotProduct(d[row], c[column]);
            }
        }
        for (i = 0; i <= higherDegree; i++) {
            if (!w[i]) w[i] = [];
            w[i].y = 0.0;
            w[i].x = parseFloat(i) / higherDegree;
        }
        var n = degree, m = degree-1;
        for (var k = 0; k <= n + m; k++) {
            var lb = Math.max(0, k - m),
                ub = Math.min(k, n);
            for (i = lb; i <= ub; i++) {
                j = k - i;
                w[i+j].y += cdTable[j][i] * z[j][i];
            }
        }
        return w;
    };
    /**
     * counts how many roots there are.
     */
    var _findRoots = function(w, degree, t, depth) {
        var left = [], right = [],
            left_count, right_count,
            left_t = [], right_t = [];

        switch (_getCrossingCount(w, degree)) {
            case 0 : {
                return 0;
            }
            case 1 : {
                if (depth >= maxRecursion) {
                    t[0] = (w[0].x + w[degree].x) / 2.0;
                    return 1;
                }
                if (_isFlatEnough(w, degree)) {
                    t[0] = _computeXIntercept(w, degree);
                    return 1;
                }
                break;
            }
        }
        _bezier(w, degree, 0.5, left, right);
        left_count  = _findRoots(left,  degree, left_t, depth+1);
        right_count = _findRoots(right, degree, right_t, depth+1);
        for (var i = 0; i < left_count; i++) t[i] = left_t[i];
        for (var i = 0; i < right_count; i++) t[i+left_count] = right_t[i];
        return (left_count+right_count);
    };
    var _getCrossingCount = function(curve, degree) {
        var n_crossings = 0, sign, old_sign;
        sign = old_sign = Math.sgn(curve[0].y);
        for (var i = 1; i <= degree; i++) {
            sign = Math.sgn(curve[i].y);
            if (sign != old_sign) n_crossings++;
            old_sign = sign;
        }
        return n_crossings;
    };
    var _isFlatEnough = function(curve, degree) {
        var  error,
            intercept_1, intercept_2, left_intercept, right_intercept,
            a, b, c, det, dInv, a1, b1, c1, a2, b2, c2;
        a = curve[0].y - curve[degree].y;
        b = curve[degree].x - curve[0].x;
        c = curve[0].x * curve[degree].y - curve[degree].x * curve[0].y;

        var max_distance_above = max_distance_below = 0.0;

        for (var i = 1; i < degree; i++) {
            var value = a * curve[i].x + b * curve[i].y + c;
            if (value > max_distance_above)
                max_distance_above = value;
            else if (value < max_distance_below)
                max_distance_below = value;
        }

        a1 = 0.0; b1 = 1.0; c1 = 0.0; a2 = a; b2 = b;
        c2 = c - max_distance_above;
        det = a1 * b2 - a2 * b1;
        dInv = 1.0/det;
        intercept_1 = (b1 * c2 - b2 * c1) * dInv;
        a2 = a; b2 = b; c2 = c - max_distance_below;
        det = a1 * b2 - a2 * b1;
        dInv = 1.0/det;
        intercept_2 = (b1 * c2 - b2 * c1) * dInv;
        left_intercept = Math.min(intercept_1, intercept_2);
        right_intercept = Math.max(intercept_1, intercept_2);
        error = right_intercept - left_intercept;
        return (error < flatnessTolerance)? 1 : 0;
    };
    var _computeXIntercept = function(curve, degree) {
        var XLK = 1.0, YLK = 0.0,
            XNM = curve[degree].x - curve[0].x, YNM = curve[degree].y - curve[0].y,
            XMK = curve[0].x - 0.0, YMK = curve[0].y - 0.0,
            det = XNM*YLK - YNM*XLK, detInv = 1.0/det,
            S = (XNM*YMK - YNM*XMK) * detInv;
        return 0.0 + XLK * S;
    };
    var _bezier = function(curve, degree, t, left, right) {
        var temp = [[]];
        for (var j =0; j <= degree; j++) temp[0][j] = curve[j];
        for (var i = 1; i <= degree; i++) {
            for (var j =0 ; j <= degree - i; j++) {
                if (!temp[i]) temp[i] = [];
                if (!temp[i][j]) temp[i][j] = {};
                temp[i][j].x = (1.0 - t) * temp[i-1][j].x + t * temp[i-1][j+1].x;
                temp[i][j].y = (1.0 - t) * temp[i-1][j].y + t * temp[i-1][j+1].y;
            }
        }
        if (left != null)
            for (j = 0; j <= degree; j++) left[j]  = temp[j][0];
        if (right != null)
            for (j = 0; j <= degree; j++) right[j] = temp[degree-j][j];

        return (temp[degree][0]);
    };

    var _curveFunctionCache = {};
    var _getCurveFunctions = function(order) {
        var fns = _curveFunctionCache[order];
        if (!fns) {
            fns = [];
            var f_term = function() { return function(t) { return Math.pow(t, order); }; },
                l_term = function() { return function(t) { return Math.pow((1-t), order); }; },
                c_term = function(c) { return function(t) { return c; }; },
                t_term = function() { return function(t) { return t; }; },
                one_minus_t_term = function() { return function(t) { return 1-t; }; },
                _termFunc = function(terms) {
                    return function(t) {
                        var p = 1;
                        for (var i = 0; i < terms.length; i++) p = p * terms[i](t);
                        return p;
                    };
                };

            fns.push(new f_term());  // first is t to the power of the curve order
            for (var i = 1; i < order; i++) {
                var terms = [new c_term(order)];
                for (var j = 0 ; j < (order - i); j++) terms.push(new t_term());
                for (var j = 0 ; j < i; j++) terms.push(new one_minus_t_term());
                fns.push(new _termFunc(terms));
            }
            fns.push(new l_term());  // last is (1-t) to the power of the curve order

            _curveFunctionCache[order] = fns;
        }

        return fns;
    };


    /**
     * calculates a point on the curve, for a Bezier of arbitrary order.
     * @param curve an array of control points, eg [{x:10,y:20}, {x:50,y:50}, {x:100,y:100}, {x:120,y:100}].  For a cubic bezier this should have four points.
     * @param location a decimal indicating the distance along the curve the point should be located at.  this is the distance along the curve as it travels, taking the way it bends into account.  should be a number from 0 to 1, inclusive.
     */
    var _pointOnPath = function(curve, location) {
        var cc = _getCurveFunctions(curve.length - 1),
            _x = 0, _y = 0;
        for (var i = 0; i < curve.length ; i++) {
            _x = _x + (curve[i].x * cc[i](location));
            _y = _y + (curve[i].y * cc[i](location));
        }

        return {x:_x, y:_y};
    };

    var _dist = function(p1,p2) {
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    };

    var _isPoint = function(curve) {
        return curve[0].x == curve[1].x && curve[0].y == curve[1].y;
    };

    /**
     * finds the point that is 'distance' along the path from 'location'.  this method returns both the x,y location of the point and also
     * its 'location' (proportion of travel along the path); the method below - _pointAlongPathFrom - calls this method and just returns the
     * point.
     */
    var _pointAlongPath = function(curve, location, distance) {

        if (_isPoint(curve)) {
            return {
                point:curve[0],
                location:location
            };
        }

        var prev = _pointOnPath(curve, location),
            tally = 0,
            curLoc = location,
            direction = distance > 0 ? 1 : -1,
            cur = null;

        while (tally < Math.abs(distance)) {
            curLoc += (0.005 * direction);
            cur = _pointOnPath(curve, curLoc);
            tally += _dist(cur, prev);
            prev = cur;
        }
        return {point:cur, location:curLoc};
    };

    var _length = function(curve) {
        if (_isPoint(curve)) return 0;

        var prev = _pointOnPath(curve, 0),
            tally = 0,
            curLoc = 0,
            direction = 1,
            cur = null;

        while (curLoc < 1) {
            curLoc += (0.005 * direction);
            cur = _pointOnPath(curve, curLoc);
            tally += _dist(cur, prev);
            prev = cur;
        }
        return tally;
    };

    /**
     * finds the point that is 'distance' along the path from 'location'.
     */
    var _pointAlongPathFrom = function(curve, location, distance) {
        return _pointAlongPath(curve, location, distance).point;
    };

    /**
     * finds the location that is 'distance' along the path from 'location'.
     */
    var _locationAlongPathFrom = function(curve, location, distance) {
        return _pointAlongPath(curve, location, distance).location;
    };

    /**
     * returns the gradient of the curve at the given location, which is a decimal between 0 and 1 inclusive.
     *
     * thanks // http://bimixual.org/AnimationLibrary/beziertangents.html
     */
    var _gradientAtPoint = function(curve, location) {
        var p1 = _pointOnPath(curve, location),
            p2 = _pointOnPath(curve.slice(0, curve.length - 1), location),
            dy = p2.y - p1.y, dx = p2.x - p1.x;
        return dy == 0 ? Infinity : Math.atan(dy / dx);
    };

    /**
     returns the gradient of the curve at the point which is 'distance' from the given location.
     if this point is greater than location 1, the gradient at location 1 is returned.
     if this point is less than location 0, the gradient at location 0 is returned.
     */
    var _gradientAtPointAlongPathFrom = function(curve, location, distance) {
        var p = _pointAlongPath(curve, location, distance);
        if (p.location > 1) p.location = 1;
        if (p.location < 0) p.location = 0;
        return _gradientAtPoint(curve, p.location);
    };

    /**
     * calculates a line that is 'length' pixels long, perpendicular to, and centered on, the path at 'distance' pixels from the given location.
     * if distance is not supplied, the perpendicular for the given location is computed (ie. we set distance to zero).
     */
    var _perpendicularToPathAt = function(curve, location, length, distance) {
        distance = distance == null ? 0 : distance;
        var p = _pointAlongPath(curve, location, distance),
            m = _gradientAtPoint(curve, p.location),
            _theta2 = Math.atan(-1 / m),
            y =  length / 2 * Math.sin(_theta2),
            x =  length / 2 * Math.cos(_theta2);
        return [{x:p.point.x + x, y:p.point.y + y}, {x:p.point.x - x, y:p.point.y - y}];
    };

    this.jsBezier = {
        distanceFromCurve : _distanceFromCurve,
        gradientAtPoint : _gradientAtPoint,
        gradientAtPointAlongCurveFrom : _gradientAtPointAlongPathFrom,
        nearestPointOnCurve : _nearestPointOnCurve,
        pointOnCurve : _pointOnPath,
        pointAlongCurveFrom : _pointAlongPathFrom,
        perpendicularToCurveAt : _perpendicularToPathAt,
        locationAlongCurveFrom:_locationAlongPathFrom,
        getLength:_length
    };
}).call(this);

/**
 * Biltong v0.2
 *
 * Various geometry functions written as part of jsPlumb and perhaps useful for others.
 *
 * Copyright (c) 2014 Simon Porritt
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
;(function() {

	
	"use strict";

	var Biltong = this.Biltong = {};

	var _isa = function(a) { return Object.prototype.toString.call(a) === "[object Array]"; },
		_pointHelper = function(p1, p2, fn) {
		    p1 = _isa(p1) ? p1 : [p1.x, p1.y];
		    p2 = _isa(p2) ? p2 : [p2.x, p2.y];    
		    return fn(p1, p2);
		},
		/**
		* @name Biltong.gradient
		* @function
		* @desc Calculates the gradient of a line between the two points.
		* @param {Point} p1 First point, either as a 2 entry array or object with `left` and `top` properties.
		* @param {Point} p2 Second point, either as a 2 entry array or object with `left` and `top` properties.
		* @return {Float} The gradient of a line between the two points.
		*/
		_gradient = Biltong.gradient = function(p1, p2) {
		    return _pointHelper(p1, p2, function(_p1, _p2) { 
		        if (_p2[0] == _p1[0])
		            return _p2[1] > _p1[1] ? Infinity : -Infinity;
		        else if (_p2[1] == _p1[1]) 
		            return _p2[0] > _p1[0] ? 0 : -0;
		        else 
		            return (_p2[1] - _p1[1]) / (_p2[0] - _p1[0]); 
		    });		
		},
		/**
		* @name Biltong.normal
		* @function
		* @desc Calculates the gradient of a normal to a line between the two points.
		* @param {Point} p1 First point, either as a 2 entry array or object with `left` and `top` properties.
		* @param {Point} p2 Second point, either as a 2 entry array or object with `left` and `top` properties.
		* @return {Float} The gradient of a normal to a line between the two points.
		*/
		_normal = Biltong.normal = function(p1, p2) {
		    return -1 / _gradient(p1, p2);
		},
		/**
		* @name Biltong.lineLength
		* @function
		* @desc Calculates the length of a line between the two points.
		* @param {Point} p1 First point, either as a 2 entry array or object with `left` and `top` properties.
		* @param {Point} p2 Second point, either as a 2 entry array or object with `left` and `top` properties.
		* @return {Float} The length of a line between the two points.
		*/
		_lineLength = Biltong.lineLength = function(p1, p2) {
		    return _pointHelper(p1, p2, function(_p1, _p2) {
		        return Math.sqrt(Math.pow(_p2[1] - _p1[1], 2) + Math.pow(_p2[0] - _p1[0], 2));			
		    });
		},
		/**
		* @name Biltong.quadrant
		* @function
		* @desc Calculates the quadrant in which the angle between the two points lies. 
		* @param {Point} p1 First point, either as a 2 entry array or object with `left` and `top` properties.
		* @param {Point} p2 Second point, either as a 2 entry array or object with `left` and `top` properties.
		* @return {Integer} The quadrant - 1 for upper right, 2 for lower right, 3 for lower left, 4 for upper left.
		*/
		_quadrant = Biltong.quadrant = function(p1, p2) {
		    return _pointHelper(p1, p2, function(_p1, _p2) {
		        if (_p2[0] > _p1[0]) {
		            return (_p2[1] > _p1[1]) ? 2 : 1;
		        }
		        else if (_p2[0] == _p1[0]) {
		            return _p2[1] > _p1[1] ? 2 : 1;    
		        }
		        else {
		            return (_p2[1] > _p1[1]) ? 3 : 4;
		        }
		    });
		},
		/**
		* @name Biltong.theta
		* @function
		* @desc Calculates the angle between the two points. 
		* @param {Point} p1 First point, either as a 2 entry array or object with `left` and `top` properties.
		* @param {Point} p2 Second point, either as a 2 entry array or object with `left` and `top` properties.
		* @return {Float} The angle between the two points.
		*/
		_theta = Biltong.theta = function(p1, p2) {
		    return _pointHelper(p1, p2, function(_p1, _p2) {
		        var m = _gradient(_p1, _p2),
		            t = Math.atan(m),
		            s = _quadrant(_p1, _p2);
		        if ((s == 4 || s== 3)) t += Math.PI;
		        if (t < 0) t += (2 * Math.PI);
		    
		        return t;
		    });
		},
		/**
		* @name Biltong.intersects
		* @function
		* @desc Calculates whether or not the two rectangles intersect.
		* @param {Rectangle} r1 First rectangle, as a js object in the form `{x:.., y:.., w:.., h:..}`
		* @param {Rectangle} r2 Second rectangle, as a js object in the form `{x:.., y:.., w:.., h:..}`
		* @return {Boolean} True if the rectangles intersect, false otherwise.
		*/
		_intersects = Biltong.intersects = function(r1, r2) {
		    var x1 = r1.x, x2 = r1.x + r1.w, y1 = r1.y, y2 = r1.y + r1.h,
		        a1 = r2.x, a2 = r2.x + r2.w, b1 = r2.y, b2 = r2.y + r2.h;
		
			return  ( (x1 <= a1 && a1 <= x2) && (y1 <= b1 && b1 <= y2) ) ||
			        ( (x1 <= a2 && a2 <= x2) && (y1 <= b1 && b1 <= y2) ) ||
			        ( (x1 <= a1 && a1 <= x2) && (y1 <= b2 && b2 <= y2) ) ||
			        ( (x1 <= a2 && a1 <= x2) && (y1 <= b2 && b2 <= y2) ) ||	
			        ( (a1 <= x1 && x1 <= a2) && (b1 <= y1 && y1 <= b2) ) ||
			        ( (a1 <= x2 && x2 <= a2) && (b1 <= y1 && y1 <= b2) ) ||
			        ( (a1 <= x1 && x1 <= a2) && (b1 <= y2 && y2 <= b2) ) ||
			        ( (a1 <= x2 && x1 <= a2) && (b1 <= y2 && y2 <= b2) );
		},
		/**
		* @name Biltong.encloses
		* @function
		* @desc Calculates whether or not r2 is completely enclosed by r1.
		* @param {Rectangle} r1 First rectangle, as a js object in the form `{x:.., y:.., w:.., h:..}`
		* @param {Rectangle} r2 Second rectangle, as a js object in the form `{x:.., y:.., w:.., h:..}`
		* @param {Boolean} [allowSharedEdges=false] If true, the concept of enclosure allows for one or more edges to be shared by the two rectangles.
		* @return {Boolean} True if r1 encloses r2, false otherwise.
		*/
		_encloses = Biltong.encloses = function(r1, r2, allowSharedEdges) {
			var x1 = r1.x, x2 = r1.x + r1.w, y1 = r1.y, y2 = r1.y + r1.h,
		        a1 = r2.x, a2 = r2.x + r2.w, b1 = r2.y, b2 = r2.y + r2.h,
				c = function(v1, v2, v3, v4) { return allowSharedEdges ? v1 <= v2 && v3>= v4 : v1 < v2 && v3 > v4; };
				
			return c(x1,a1,x2,a2) && c(y1,b1,y2,b2);
		},
		_segmentMultipliers = [null, [1, -1], [1, 1], [-1, 1], [-1, -1] ],
		_inverseSegmentMultipliers = [null, [-1, -1], [-1, 1], [1, 1], [1, -1] ],
		/**
		* @name Biltong.pointOnLine
		* @function
		* @desc Calculates a point on the line from `fromPoint` to `toPoint` that is `distance` units along the length of the line.
		* @param {Point} p1 First point, either as a 2 entry array or object with `left` and `top` properties.
		* @param {Point} p2 Second point, either as a 2 entry array or object with `left` and `top` properties.
		* @return {Point} Point on the line, in the form `{ x:..., y:... }`.
		*/
		_pointOnLine = Biltong.pointOnLine = function(fromPoint, toPoint, distance) {
		    var m = _gradient(fromPoint, toPoint),
		        s = _quadrant(fromPoint, toPoint),
		        segmentMultiplier = distance > 0 ? _segmentMultipliers[s] : _inverseSegmentMultipliers[s],
		        theta = Math.atan(m),
		        y = Math.abs(distance * Math.sin(theta)) * segmentMultiplier[1],
		        x =  Math.abs(distance * Math.cos(theta)) * segmentMultiplier[0];
		    return { x:fromPoint.x + x, y:fromPoint.y + y };
		},
		/**
		* @name Biltong.perpendicularLineTo
		* @function
		* @desc Calculates a line of length `length` that is perpendicular to the line from `fromPoint` to `toPoint` and passes through `toPoint`.
		* @param {Point} p1 First point, either as a 2 entry array or object with `left` and `top` properties.
		* @param {Point} p2 Second point, either as a 2 entry array or object with `left` and `top` properties.
		* @return {Line} Perpendicular line, in the form `[ { x:..., y:... }, { x:..., y:... } ]`.
		*/        
		_perpendicularLineTo = Biltong.perpendicularLineTo = function(fromPoint, toPoint, length) {
		    var m = _gradient(fromPoint, toPoint),
		        theta2 = Math.atan(-1 / m),
		        y =  length / 2 * Math.sin(theta2),
		        x =  length / 2 * Math.cos(theta2);
		    return [{x:toPoint.x + x, y:toPoint.y + y}, {x:toPoint.x - x, y:toPoint.y - y}];
		};	
}).call(this);
;
(function () {

    "use strict";

    var root = this,
        Sniff = {
            android: navigator.userAgent.toLowerCase().indexOf("android") > -1
        },
        matchesSelector = function (el, selector, ctx) {
            ctx = ctx || el.parentNode;
            var possibles = ctx.querySelectorAll(selector);
            for (var i = 0; i < possibles.length; i++) {
                if (possibles[i] === el) {
                    return true;
                }
            }
            return false;
        },
        _gel = function (el) {
            return (typeof el == "string" || el.constructor === String) ? document.getElementById(el) : el;
        },
        _t = function (e) {
            return e.srcElement || e.target;
        },
        _d = function (l, fn) {
            for (var i = 0, j = l.length; i < j; i++) {
                if (l[i] == fn) break;
            }
            if (i < l.length) l.splice(i, 1);
        },
        guid = 1,
    //
    // this function generates a guid for every handler, sets it on the handler, then adds
    // it to the associated object's map of handlers for the given event. this is what enables us
    // to unbind all events of some type, or all events (the second of which can be requested by the user,
    // but it also used by Mottle when an element is removed.)
        _store = function (obj, event, fn) {
            var g = guid++;
            obj.__ta = obj.__ta || {};
            obj.__ta[event] = obj.__ta[event] || {};
            // store each handler with a unique guid.
            obj.__ta[event][g] = fn;
            // set the guid on the handler.
            fn.__tauid = g;
            return g;
        },
        _unstore = function (obj, event, fn) {
            obj.__ta && obj.__ta[event] && delete obj.__ta[event][fn.__tauid];
            // a handler might have attached extra functions, so we unbind those too.
            if (fn.__taExtra) {
                for (var i = 0; i < fn.__taExtra.length; i++) {
                    _unbind(obj, fn.__taExtra[i][0], fn.__taExtra[i][1]);
                }
                fn.__taExtra.length = 0;
            }
            // a handler might have attached an unstore callback
            fn.__taUnstore && fn.__taUnstore();
        },
        _curryChildFilter = function (children, obj, fn, evt) {
            if (children == null) return fn;
            else {
                var c = children.split(","),
                    _fn = function (e) {
                        _fn.__tauid = fn.__tauid;
                        var t = _t(e);
                        for (var i = 0; i < c.length; i++) {
                            if (matchesSelector(t, c[i], obj)) {
                                fn.apply(t, arguments);
                            }
                        }
                    };
                registerExtraFunction(fn, evt, _fn);
                return _fn;
            }
        },
    //
    // registers an 'extra' function on some event listener function we were given - a function that we
    // created and bound to the element as part of our housekeeping, and which we want to unbind and remove
    // whenever the given function is unbound.
        registerExtraFunction = function (fn, evt, newFn) {
            fn.__taExtra = fn.__taExtra || [];
            fn.__taExtra.push([evt, newFn]);
        },
        DefaultHandler = function (obj, evt, fn, children) {
            if (isTouchDevice && touchMap[evt]) {
                var tfn = _curryChildFilter(children, obj, fn, touchMap[evt]);
                _bind(obj, touchMap[evt], tfn , fn);
            }
            if (evt === "focus" && obj.getAttribute("tabindex") == null) {
                obj.setAttribute("tabindex", "1");
            }
            _bind(obj, evt, _curryChildFilter(children, obj, fn, evt), fn);
        },
        SmartClickHandler = function (obj, evt, fn, children) {
            if (obj.__taSmartClicks == null) {
                var down = function (e) {
                        obj.__tad = _pageLocation(e);
                    },
                    up = function (e) {
                        obj.__tau = _pageLocation(e);
                    },
                    click = function (e) {
                        if (obj.__tad && obj.__tau && obj.__tad[0] === obj.__tau[0] && obj.__tad[1] === obj.__tau[1]) {
                            for (var i = 0; i < obj.__taSmartClicks.length; i++)
                                obj.__taSmartClicks[i].apply(_t(e), [ e ]);
                        }
                    };
                DefaultHandler(obj, "mousedown", down, children);
                DefaultHandler(obj, "mouseup", up, children);
                DefaultHandler(obj, "click", click, children);
                obj.__taSmartClicks = [];
            }

            // store in the list of callbacks
            obj.__taSmartClicks.push(fn);
            // the unstore function removes this function from the object's listener list for this type.
            fn.__taUnstore = function () {
                _d(obj.__taSmartClicks, fn);
            };
        },
        _tapProfiles = {
            "tap": {touches: 1, taps: 1},
            "dbltap": {touches: 1, taps: 2},
            "contextmenu": {touches: 2, taps: 1}
        },
        TapHandler = function (clickThreshold, dblClickThreshold) {
            return function (obj, evt, fn, children) {
                // if event is contextmenu, for devices which are mouse only, we want to
                // use the default bind.
                if (evt == "contextmenu" && isMouseDevice)
                    DefaultHandler(obj, evt, fn, children);
                else {
                    // the issue here is that this down handler gets registered only for the
                    // child nodes in the first registration. in fact it should be registered with
                    // no child selector and then on down we should cycle through the regustered
                    // functions to see if one of them matches. on mouseup we should execute ALL of
                    // the functions whose children are either null or match the element.
                    if (obj.__taTapHandler == null) {
                        var tt = obj.__taTapHandler = {
                            tap: [],
                            dbltap: [],
                            contextmenu: [],
                            down: false,
                            taps: 0,
                            downSelectors: []
                        };
                        var down = function (e) {
                                var target = e.srcElement || e.target;
                                for (var i = 0; i < tt.downSelectors.length; i++) {
                                    if (tt.downSelectors[i] == null || matchesSelector(target, tt.downSelectors[i], obj)) {
                                        tt.down = true;
                                        setTimeout(clearSingle, clickThreshold);
                                        setTimeout(clearDouble, dblClickThreshold);
                                        break; // we only need one match on mousedown
                                    }
                                }
                            },
                            up = function (e) {
                                if (tt.down) {
                                    var target = e.srcElement || e.target;
                                    tt.taps++;
                                    var tc = _touchCount(e);
                                    for (var eventId in _tapProfiles) {
                                        if (_tapProfiles.hasOwnProperty(eventId)) {
                                            var p = _tapProfiles[eventId];
                                            if (p.touches === tc && (p.taps === 1 || p.taps === tt.taps)) {
                                                for (var i = 0; i < tt[eventId].length; i++) {
                                                    if (tt[eventId][i][1] == null || matchesSelector(target, tt[eventId][i][1], obj))
                                                        tt[eventId][i][0].apply(_t(e), [ e ]);
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            clearSingle = function () {
                                tt.down = false;
                            },
                            clearDouble = function () {
                                tt.taps = 0;
                            };

                        DefaultHandler(obj, "mousedown", down/*, children*/);
                        DefaultHandler(obj, "mouseup", up/*, children*/);
                    }
                    // add this child selector (it can be null, that's fine).
                    obj.__taTapHandler.downSelectors.push(children);

                    obj.__taTapHandler[evt].push([fn, children]);
                    // the unstore function removes this function from the object's listener list for this type.
                    fn.__taUnstore = function () {
                        _d(obj.__taTapHandler[evt], fn);
                    };
                }
            };
        },
        meeHelper = function (type, evt, obj, target) {
            for (var i in obj.__tamee[type]) {
                if (obj.__tamee[type].hasOwnProperty(i)) {
                    obj.__tamee[type][i].apply(target, [ evt ]);
                }
            }
        },
        MouseEnterExitHandler = function () {
            var activeElements = [];
            return function (obj, evt, fn, children) {
                if (!obj.__tamee) {
                    // __tamee holds a flag saying whether the mouse is currently "in" the element, and a list of
                    // both mouseenter and mouseexit functions.
                    obj.__tamee = { over: false, mouseenter: [], mouseexit: [] };
                    // register over and out functions
                    var over = function (e) {
                            var t = _t(e);
                            if ((children == null && (t == obj && !obj.__tamee.over)) || (matchesSelector(t, children, obj) && (t.__tamee == null || !t.__tamee.over))) {
                                meeHelper("mouseenter", e, obj, t);
                                t.__tamee = t.__tamee || {};
                                t.__tamee.over = true;
                                activeElements.push(t);
                            }
                        },
                        out = function (e) {
                            var t = _t(e);
                            // is the current target one of the activeElements? and is the
                            // related target NOT a descendant of it?
                            for (var i = 0; i < activeElements.length; i++) {
                                if (t == activeElements[i] && !matchesSelector((e.relatedTarget || e.toElement), "*", t)) {
                                    t.__tamee.over = false;
                                    activeElements.splice(i, 1);
                                    meeHelper("mouseexit", e, obj, t);
                                }
                            }
                        };

                    _bind(obj, "mouseover", _curryChildFilter(children, obj, over, "mouseover"), over);
                    _bind(obj, "mouseout", _curryChildFilter(children, obj, out, "mouseout"), out);
                }

                fn.__taUnstore = function () {
                    delete obj.__tamee[evt][fn.__tauid];
                };

                _store(obj, evt, fn);
                obj.__tamee[evt][fn.__tauid] = fn;
            };
        },
        isTouchDevice = "ontouchstart" in document.documentElement,
        isMouseDevice = "onmousedown" in document.documentElement,
        touchMap = { "mousedown": "touchstart", "mouseup": "touchend", "mousemove": "touchmove" },
        touchstart = "touchstart", touchend = "touchend", touchmove = "touchmove",
        iev = (function () {
            var rv = -1;
            if (navigator.appName == 'Microsoft Internet Explorer') {
                var ua = navigator.userAgent,
                    re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
                if (re.exec(ua) != null)
                    rv = parseFloat(RegExp.$1);
            }
            return rv;
        })(),
        isIELT9 = iev > -1 && iev < 9,
        _genLoc = function (e, prefix) {
            if (e == null) return [ 0, 0 ];
            var ts = _touches(e), t = _getTouch(ts, 0);
            return [t[prefix + "X"], t[prefix + "Y"]];
        },
        _pageLocation = function (e) {
            if (e == null) return [ 0, 0 ];
            if (isIELT9) {
                return [ e.clientX + document.documentElement.scrollLeft, e.clientY + document.documentElement.scrollTop ];
            }
            else {
                return _genLoc(e, "page");
            }
        },
        _screenLocation = function (e) {
            return _genLoc(e, "screen");
        },
        _clientLocation = function (e) {
            return _genLoc(e, "client");
        },
        _getTouch = function (touches, idx) {
            return touches.item ? touches.item(idx) : touches[idx];
        },
        _touches = function (e) {
            return e.touches && e.touches.length > 0 ? e.touches :
                    e.changedTouches && e.changedTouches.length > 0 ? e.changedTouches :
                    e.targetTouches && e.targetTouches.length > 0 ? e.targetTouches :
                [ e ];
        },
        _touchCount = function (e) {
            return _touches(e).length;
        },
    //http://www.quirksmode.org/blog/archives/2005/10/_and_the_winner_1.html
        _bind = function (obj, type, fn, originalFn) {
            _store(obj, type, fn);
            originalFn.__tauid = fn.__tauid;
            if (obj.addEventListener)
                obj.addEventListener(type, fn, false);
            else if (obj.attachEvent) {
                var key = type + fn.__tauid;
                obj["e" + key] = fn;
                // TODO look at replacing with .call(..)
                obj[key] = function () {
                    obj["e" + key] && obj["e" + key](window.event);
                };
                obj.attachEvent("on" + type, obj[key]);
            }
        },
        _unbind = function (obj, type, fn) {
            if (fn == null) return;
            _each(obj, function () {
                var _el = _gel(this);
                _unstore(_el, type, fn);
                // it has been bound if there is a tauid. otherwise it was not bound and we can ignore it.
                if (fn.__tauid != null) {
                    if (_el.removeEventListener) {
                        _el.removeEventListener(type, fn, false);
                        if (isTouchDevice && touchMap[type]) _el.removeEventListener(touchMap[type], fn, false);
                    }
                    else if (this.detachEvent) {
                        var key = type + fn.__tauid;
                        _el[key] && _el.detachEvent("on" + type, _el[key]);
                        _el[key] = null;
                        _el["e" + key] = null;
                    }
                }

                // if a touch event was also registered, deregister now.
                if (fn.__taTouchProxy) {
                    _unbind(obj, fn.__taTouchProxy[1], fn.__taTouchProxy[0]);
                }
            });
        },
        _each = function (obj, fn) {
            if (obj == null) return;
            // if a list (or list-like), use it. if a string, get a list
            // by running the string through querySelectorAll. else, assume
            // it's an Element.
            // obj.top is "unknown" in IE8.
            obj = (typeof Window !== "undefined" && (typeof obj.top !== "unknown" && obj == obj.top)) ? [ obj ] :
                    (typeof obj !== "string") && (obj.tagName == null && obj.length != null) ? obj :
                    typeof obj === "string" ? document.querySelectorAll(obj)
                : [ obj ];

            for (var i = 0; i < obj.length; i++)
                fn.apply(obj[i]);
        };

    /**
     * Mottle offers support for abstracting out the differences
     * between touch and mouse devices, plus "smart click" functionality
     * (don't fire click if the mouse has moved between mousedown and mouseup),
     * and synthesized click/tap events.
     * @class Mottle
     * @constructor
     * @param {Object} params Constructor params
     * @param {Number} [params.clickThreshold=150] Threshold, in milliseconds beyond which a touchstart followed by a touchend is not considered to be a click.
     * @param {Number} [params.dblClickThreshold=350] Threshold, in milliseconds beyond which two successive tap events are not considered to be a click.
     * @param {Boolean} [params.smartClicks=false] If true, won't fire click events if the mouse has moved between mousedown and mouseup. Note that this functionality
     * requires that Mottle consume the mousedown event, and so may not be viable in all use cases.
     */
    root.Mottle = function (params) {
        params = params || {};
        var clickThreshold = params.clickThreshold || 150,
            dblClickThreshold = params.dblClickThreshold || 350,
            mouseEnterExitHandler = new MouseEnterExitHandler(),
            tapHandler = new TapHandler(clickThreshold, dblClickThreshold),
            _smartClicks = params.smartClicks,
            _doBind = function (obj, evt, fn, children) {
                if (fn == null) return;
                _each(obj, function () {
                    var _el = _gel(this);
                    if (_smartClicks && evt === "click")
                        SmartClickHandler(_el, evt, fn, children);
                    else if (evt === "tap" || evt === "dbltap" || evt === "contextmenu") {
                        tapHandler(_el, evt, fn, children);
                    }
                    else if (evt === "mouseenter" || evt == "mouseexit")
                        mouseEnterExitHandler(_el, evt, fn, children);
                    else
                        DefaultHandler(_el, evt, fn, children);
                });
            };

        /**
         * Removes an element from the DOM, and deregisters all event handlers for it. You should use this
         * to ensure you don't leak memory.
         * @method remove
         * @param {String|Element} el Element, or id of the element, to remove.
         * @return {Mottle} The current Mottle instance; you can chain this method.
         */
        this.remove = function (el) {
            _each(el, function () {
                var _el = _gel(this);
                if (_el.__ta) {
                    for (var evt in _el.__ta) {
                        if (_el.__ta.hasOwnProperty(evt)) {
                            for (var h in _el.__ta[evt]) {
                                if (_el.__ta[evt].hasOwnProperty(h))
                                    _unbind(_el, evt, _el.__ta[evt][h]);
                            }
                        }
                    }
                }
                _el.parentNode && _el.parentNode.removeChild(_el);
            });
            return this;
        };

        /**
         * Register an event handler, optionally as a delegate for some set of descendant elements. Note
         * that this method takes either 3 or 4 arguments - if you supply 3 arguments it is assumed you have
         * omitted the `children` parameter, and that the event handler should be bound directly to the given element.
         * @method on
         * @param {Element[]|Element|String} el Either an Element, or a CSS spec for a list of elements, or an array of Elements.
         * @param {String} [children] Comma-delimited list of selectors identifying allowed children.
         * @param {String} event Event ID.
         * @param {Function} fn Event handler function.
         * @return {Mottle} The current Mottle instance; you can chain this method.
         */
        this.on = function (el, event, children, fn) {
            var _el = arguments[0],
                _c = arguments.length == 4 ? arguments[2] : null,
                _e = arguments[1],
                _f = arguments[arguments.length - 1];

            _doBind(_el, _e, _f, _c);
            return this;
        };

        /**
         * Cancel delegate event handling for the given function. Note that unlike with 'on' you do not supply
         * a list of child selectors here: it removes event delegation from all of the child selectors for which the
         * given function was registered (if any).
         * @method off
         * @param {Element[]|Element|String} el Element - or ID of element - from which to remove event listener.
         * @param {String} event Event ID.
         * @param {Function} fn Event handler function.
         * @return {Mottle} The current Mottle instance; you can chain this method.
         */
        this.off = function (el, event, fn) {
            _unbind(el, event, fn);
            return this;
        };

        /**
         * Triggers some event for a given element.
         * @method trigger
         * @param {Element} el Element for which to trigger the event.
         * @param {String} event Event ID.
         * @param {Event} originalEvent The original event. Should be optional of course, but currently is not, due
         * to the jsPlumb use case that caused this method to be added.
         * @param {Object} [payload] Optional object to set as `payload` on the generated event; useful for message passing.
         * @return {Mottle} The current Mottle instance; you can chain this method.
         */
        this.trigger = function (el, event, originalEvent, payload) {
            // MouseEvent undefined in old IE; that's how we know it's a mouse event.  A fine Microsoft paradox.
            var originalIsMouse = isMouseDevice && (typeof MouseEvent === "undefined" || originalEvent == null || originalEvent.constructor === MouseEvent);

            var eventToBind = (isTouchDevice && !isMouseDevice && touchMap[event]) ? touchMap[event] : event,
                bindingAMouseEvent = !(isTouchDevice && !isMouseDevice && touchMap[event]);

            var pl = _pageLocation(originalEvent), sl = _screenLocation(originalEvent), cl = _clientLocation(originalEvent);
            _each(el, function () {
                var _el = _gel(this), evt;
                originalEvent = originalEvent || {
                    screenX: sl[0],
                    screenY: sl[1],
                    clientX: cl[0],
                    clientY: cl[1]
                };

                var _decorate = function (_evt) {
                    if (payload) _evt.payload = payload;
                };

                var eventGenerators = {
                    "TouchEvent": function (evt) {
                        var touch = document.createTouch(window, _el, 0, pl[0], pl[1],
                            sl[0], sl[1],
                            cl[0], cl[1],
                            0, 0, 0, 0);

                        // https://gist.github.com/sstephenson/448808
                        var touches = document.createTouchList(touch);
                        var targetTouches = document.createTouchList(touch);
                        var changedTouches = document.createTouchList(touch);
                        evt.initTouchEvent(eventToBind, true, true, window, null, sl[0], sl[1],
                            cl[0], cl[1], false, false, false, false,
                            touches, targetTouches, changedTouches, 1, 0);
                    },
                    "MouseEvents": function (evt) {
                        evt.initMouseEvent(eventToBind, true, true, window, 0,
                            sl[0], sl[1],
                            cl[0], cl[1],
                            false, false, false, false, 1, _el);

                        if (Sniff.android) {
                            // Android's touch events are not standard.
                            var t = document.createTouch(window, _el, 0, pl[0], pl[1],
                                sl[0], sl[1],
                                cl[0], cl[1],
                                0, 0, 0, 0);

                            evt.touches = evt.targetTouches = evt.changedTouches = document.createTouchList(t);
                        }
                    }
                };

                if (document.createEvent) {

                    var ite = !bindingAMouseEvent && !originalIsMouse && (isTouchDevice && touchMap[event] && !Sniff.android),
                        evtName = ite ? "TouchEvent" : "MouseEvents";

                    evt = document.createEvent(evtName);
                    eventGenerators[evtName](evt);
                    _decorate(evt);
                    _el.dispatchEvent(evt);
                }
                else if (document.createEventObject) {
                    evt = document.createEventObject();
                    evt.eventType = evt.eventName = eventToBind;
                    evt.screenX = sl[0];
                    evt.screenY = sl[1];
                    evt.clientX = cl[0];
                    evt.clientY = cl[1];
                    _decorate(evt);
                    _el.fireEvent('on' + eventToBind, evt);
                }
            });
            return this;
        }
    };

    /**
     * Static method to assist in 'consuming' an element: uses `stopPropagation` where available, or sets
     * `e.returnValue=false` where it is not.
     * @method Mottle.consume
     * @param {Event} e Event to consume
     * @param {Boolean} [doNotPreventDefault=false] If true, does not call `preventDefault()` on the event.
     */
    root.Mottle.consume = function (e, doNotPreventDefault) {
        if (e.stopPropagation)
            e.stopPropagation();
        else
            e.returnValue = false;

        if (!doNotPreventDefault && e.preventDefault)
            e.preventDefault();
    };

    /**
     * Gets the page location corresponding to the given event. For touch events this means get the page location of the first touch.
     * @method Mottle.pageLocation
     * @param {Event} e Event to get page location for.
     * @return {Integer[]} [left, top] for the given event.
     */
    root.Mottle.pageLocation = _pageLocation;

    /**
     * Forces touch events to be turned "on". Useful for testing: even if you don't have a touch device, you can still
     * trigger a touch event when this is switched on and it will be captured and acted on.
     * @method setForceTouchEvents
     * @param {Boolean} value If true, force touch events to be on.
     */
    root.Mottle.setForceTouchEvents = function (value) {
        isTouchDevice = value;
    };

    /**
     * Forces mouse events to be turned "on". Useful for testing: even if you don't have a mouse, you can still
     * trigger a mouse event when this is switched on and it will be captured and acted on.
     * @method setForceMouseEvents
     * @param {Boolean} value If true, force mouse events to be on.
     */
    root.Mottle.setForceMouseEvents = function (value) {
        isMouseDevice = value;
    };

}).call(this);

/**
 drag/drop functionality for use with jsPlumb but with
 no knowledge of jsPlumb. supports multiple scopes (separated by whitespace), dragging
 multiple elements, constrain to parent, drop filters, drag start filters, custom
 css classes.

 a lot of the functionality of this script is expected to be plugged in:

 addClass
 removeClass

 addEvent
 removeEvent

 getPosition
 setPosition
 getSize

 indexOf
 intersects

 the name came from here:

 http://mrsharpoblunto.github.io/foswig.js/

 copyright 2015 jsPlumb
 */

;(function() {

    "use strict";

    Array.prototype.suggest = function(item, head) {
        if (this.indexOf(item) === -1) {
            head ? this.unshift(item) : this.push(item);
        }
    };

    Array.prototype.vanquish = function(item) {
        var idx = this.indexOf(item);
        if (idx != -1) this.splice(idx, 1);
    };

    var _isString = function(f) {
        return f == null ? false : (typeof f === "string" || f.constructor == String);
    };

    var getOffsetRect = function (elem) {
        // (1)
        var box = elem.getBoundingClientRect(),
            body = document.body,
            docElem = document.documentElement,
        // (2)
            scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop,
            scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft,
        // (3)
            clientTop = docElem.clientTop || body.clientTop || 0,
            clientLeft = docElem.clientLeft || body.clientLeft || 0,
        // (4)
            top  = box.top +  scrollTop - clientTop,
            left = box.left + scrollLeft - clientLeft;

        return { top: Math.round(top), left: Math.round(left) };
    };

    var matchesSelector = function(el, selector, ctx) {
        ctx = ctx || el.parentNode;
        var possibles = ctx.querySelectorAll(selector);
        for (var i = 0; i < possibles.length; i++) {
            if (possibles[i] === el)
                return true;
        }
        return false;
    };

    var iev = (function() {
            var rv = -1;
            if (navigator.appName == 'Microsoft Internet Explorer') {
                var ua = navigator.userAgent,
                    re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
                if (re.exec(ua) != null)
                    rv = parseFloat(RegExp.$1);
            }
            return rv;
        })(),
        DEFAULT_GRID_X = 50,
        DEFAULT_GRID_Y = 50,
        isIELT9 = iev > -1 && iev < 9,
        _pl = function(e) {
            if (isIELT9) {
                return [ e.clientX + document.documentElement.scrollLeft, e.clientY + document.documentElement.scrollTop ];
            }
            else {
                var ts = _touches(e), t = _getTouch(ts, 0);
                // this is for iPad. may not fly for Android.
                return [t.pageX, t.pageY];
            }
        },
        _getTouch = function(touches, idx) { return touches.item ? touches.item(idx) : touches[idx]; },
        _touches = function(e) {
            return e.touches && e.touches.length > 0 ? e.touches :
                    e.changedTouches && e.changedTouches.length > 0 ? e.changedTouches :
                    e.targetTouches && e.targetTouches.length > 0 ? e.targetTouches :
                [ e ];
        },
        _classes = {
            draggable:"katavorio-draggable",    // draggable elements
            droppable:"katavorio-droppable",    // droppable elements
            drag : "katavorio-drag",            // elements currently being dragged
            selected:"katavorio-drag-selected", // elements in current drag selection
            active : "katavorio-drag-active",   // droppables that are targets of a currently dragged element
            hover : "katavorio-drag-hover",     // droppables over which a matching drag element is hovering
            noSelect : "katavorio-drag-no-select" // added to the body to provide a hook to suppress text selection
        },
        _defaultScope = "katavorio-drag-scope",
        _events = [ "stop", "start", "drag", "drop", "over", "out", "beforeStart" ],
        _devNull = function() {},
        _true = function() { return true; },
        _foreach = function(l, fn, from) {
            for (var i = 0; i < l.length; i++) {
                if (l[i] != from)
                    fn(l[i]);
            }
        },
        _setDroppablesActive = function(dd, val, andHover, drag) {
            _foreach(dd, function(e) {
                e.setActive(val);
                if (val) e.updatePosition();
                if (andHover) e.setHover(drag, val);
            });
        },
        _each = function(obj, fn) {
            if (obj == null) return;
            obj = !_isString(obj) && (obj.tagName == null && obj.length != null) ? obj : [ obj ];
            for (var i = 0; i < obj.length; i++)
                fn.apply(obj[i], [ obj[i] ]);
        },
        _consume = function(e) {
            if (e.stopPropagation) {
                e.stopPropagation();
                e.preventDefault();
            }
            else {
                e.returnValue = false;
            }
        },
        _defaultInputFilterSelector = "input,textarea,select,button,option",
    //
    // filters out events on all input elements, like textarea, checkbox, input, select.
        _inputFilter = function(e, el, _katavorio) {
            var t = e.srcElement || e.target;
            return !matchesSelector(t, _katavorio.getInputFilterSelector(), el);
        };

    var Super = function(el, params, css, scope) {
        this.params = params || {};
        this.el = el;
        this.params.addClass(this.el, this._class);
        this.uuid = _uuid();
        var enabled = true;
        this.setEnabled = function(e) { enabled = e; };
        this.isEnabled = function() { return enabled; };
        this.toggleEnabled = function() { enabled = !enabled; };
        this.setScope = function(scopes) {
            this.scopes = scopes ? scopes.split(/\s+/) : [ scope ];
        };
        this.addScope = function(scopes) {
            var m = {};
            _each(this.scopes, function(s) { m[s] = true;});
            _each(scopes ? scopes.split(/\s+/) : [], function(s) { m[s] = true;});
            this.scopes = [];
            for (var i in m) this.scopes.push(i);
        };
        this.removeScope = function(scopes) {
            var m = {};
            _each(this.scopes, function(s) { m[s] = true;});
            _each(scopes ? scopes.split(/\s+/) : [], function(s) { delete m[s];});
            this.scopes = [];
            for (var i in m) this.scopes.push(i);
        };
        this.toggleScope = function(scopes) {
            var m = {};
            _each(this.scopes, function(s) { m[s] = true;});
            _each(scopes ? scopes.split(/\s+/) : [], function(s) {
                if (m[s]) delete m[s];
                else m[s] = true;
            });
            this.scopes = [];
            for (var i in m) this.scopes.push(i);
        };
        this.setScope(params.scope);
        this.k = params.katavorio;
        return params.katavorio;
    };

    var Drag = function(el, params, css, scope) {
        this._class = css.draggable;
        var k = Super.apply(this, arguments);
        this.rightButtonCanDrag = this.params.rightButtonCanDrag;
        var downAt = [0,0], posAtDown = null, moving = false,
            consumeStartEvent = this.params.consumeStartEvent !== false,
            dragEl = this.el,
            clone = this.params.clone,
            scroll = this.params.scroll,
            _multipleDrop = params.multipleDrop !== false;

        var snapThreshold = params.snapThreshold || 5,
            _snap = function(pos, x, y, thresholdX, thresholdY) {
                thresholdX = thresholdX || snapThreshold;
                thresholdY = thresholdY || snapThreshold;
                var _dx = Math.floor(pos[0] / x),
                    _dxl = x * _dx,
                    _dxt = _dxl + x,
                    _x = Math.abs(pos[0] - _dxl) <= thresholdX ? _dxl : Math.abs(_dxt - pos[0]) <= thresholdX ? _dxt : pos[0];

                var _dy = Math.floor(pos[1] / y),
                    _dyl = y * _dy,
                    _dyt = _dyl + y,
                    _y = Math.abs(pos[1] - _dyl) <= thresholdY ? _dyl : Math.abs(_dyt - pos[1]) <= thresholdY ? _dyt : pos[1];

                return [ _x, _y];
            };

        this.posses = [];
        this.posseRoles = {};

        this.toGrid = function(pos) {
            if (this.params.grid == null) {
                return pos;
            }
            else {
                return _snap(pos, this.params.grid[0], this.params.grid[1]);
            }
        };

        this.snap = function(x, y) {
            if (dragEl == null) return;
            x = x || (this.params.grid ? this.params.grid[0] : DEFAULT_GRID_X);
            y = y || (this.params.grid ? this.params.grid[1] : DEFAULT_GRID_Y);
            var p = this.params.getPosition(dragEl);
            this.params.setPosition(dragEl, _snap(p, x, y, x, y));
        };

        this.constrain = typeof this.params.constrain === "function" ? this.params.constrain  : (this.params.constrain || this.params.containment) ? function(pos) {
            return [
                Math.max(0, Math.min(constrainRect.w - this.size[0], pos[0])),
                Math.max(0, Math.min(constrainRect.h - this.size[1], pos[1]))
            ];
        } : function(pos) { return pos; };

        var _assignId = function(obj) {
                if (typeof obj == "function") {
                    obj._katavorioId = _uuid();
                    return obj._katavorioId;
                } else {
                    return obj;
                }
            },
        // a map of { spec -> [ fn, exclusion ] } entries.
            _filters = {},
            _testFilter = function(e) {
                for (var key in _filters) {
                    var f = _filters[key];
                    var rv = f[0](e);
                    if (f[1]) rv = !rv;
                    if (!rv) return false;
                }
                return true;
            },
            _setFilter = this.setFilter = function(f, _exclude) {
                if (f) {
                    var key = _assignId(f);
                    _filters[key] = [
                        function(e) {
                            var t = e.srcElement || e.target, m;
                            if (_isString(f)) {
                                m = matchesSelector(t, f, el);
                            }
                            else if (typeof f === "function") {
                                m = f(e, el);
                            }
                            return m;
                        },
                            _exclude !== false
                    ];

                }
            },
            _addFilter = this.addFilter = _setFilter,
            _removeFilter = this.removeFilter = function(f) {
                var key = typeof f == "function" ? f._katavorioId : f;
                delete _filters[key];
            };

        this.clearAllFilters = function() {
            _filters = {};
        };

        this.canDrag = this.params.canDrag || _true;

        var constrainRect,
            matchingDroppables = [], intersectingDroppables = [];

        this.downListener = function(e) {
            var isNotRightClick = this.rightButtonCanDrag || (e.which !== 3 && e.button !== 2);
            if (isNotRightClick && this.isEnabled() && this.canDrag()) {
                var _f =  _testFilter(e) && _inputFilter(e, this.el, this.k);
                if (_f) {
                    if (!clone)
                        dragEl = this.el;
                    else {
                        dragEl = this.el.cloneNode(true);
                        dragEl.setAttribute("id", null);
                        dragEl.style.position = "absolute";
                        // the clone node is added to the body; getOffsetRect gives us a value
                        // relative to the body.
                        var b = getOffsetRect(this.el);
                        dragEl.style.left = b.left + "px";
                        dragEl.style.top = b.top + "px";
                        document.body.appendChild(dragEl);
                    }
                    consumeStartEvent && _consume(e);
                    downAt = _pl(e);
                    //
                    this.params.bind(document, "mousemove", this.moveListener);
                    this.params.bind(document, "mouseup", this.upListener);
                    k.markSelection(this);
                    k.markPosses(this);
                    this.params.addClass(document.body, css.noSelect);
                    _dispatch("beforeStart", {el:this.el, pos:posAtDown, e:e, drag:this});
                }
                else if (this.params.consumeFilteredEvents) {
                    _consume(e);
                }
            }
        }.bind(this);

        this.moveListener = function(e) {
            if (downAt) {
                if (!moving) {
                    var _continue = _dispatch("start", {el:this.el, pos:posAtDown, e:e, drag:this});
                    if (_continue !== false) {
                        if (!downAt) return;
                        this.mark(true);
                        moving = true;
                    }
                }

                // it is possible that the start event caused the drag to be aborted. So we check
                // again that we are currently dragging.
                if (downAt) {
                    intersectingDroppables.length = 0;
                    var pos = _pl(e), dx = pos[0] - downAt[0], dy = pos[1] - downAt[1],
                        z = this.params.ignoreZoom ? 1 : k.getZoom();
                    dx /= z;
                    dy /= z;
                    this.moveBy(dx, dy, e);
                    k.updateSelection(dx, dy, this);
                    k.updatePosses(dx, dy, this);
                }
            }
        }.bind(this);

        this.upListener = function(e) {
            if (downAt) {
                downAt = null;
                this.params.unbind(document, "mousemove", this.moveListener);
                this.params.unbind(document, "mouseup", this.upListener);
                this.params.removeClass(document.body, css.noSelect);
                this.unmark(e);
                k.unmarkSelection(this, e);
                k.unmarkPosses(this, e);
                this.stop(e);
                k.notifySelectionDragStop(this, e);
                moving = false;
                if (clone) {
                    dragEl && dragEl.parentNode && dragEl.parentNode.removeChild(dragEl);
                    dragEl = null;
                }
            }
        }.bind(this);

        this.getFilters = function() { return _filters; };

        this.abort = function() {
            if (downAt != null)
                this.upListener();
        };

        this.getDragElement = function() {
            return dragEl || this.el;
        };

        var listeners = {"start":[], "drag":[], "stop":[], "over":[], "out":[], "beforeStart":[] };
        if (params.events.start) listeners.start.push(params.events.start);
        if (params.events.beforeStart) listeners.beforeStart.push(params.events.beforeStart);
        if (params.events.stop) listeners.stop.push(params.events.stop);
        if (params.events.drag) listeners.drag.push(params.events.drag);

        this.on = function(evt, fn) {
            if (listeners[evt]) listeners[evt].push(fn);
        };

        var _dispatch = function(evt, value) {
            if (listeners[evt]) {
                for (var i = 0; i < listeners[evt].length; i++) {
                    try {
                        listeners[evt][i](value);
                    }
                    catch (e) { }
                }
            }
        };

        this.notifyStart = function(e) {
            _dispatch("start", {el:this.el, pos:this.params.getPosition(dragEl), e:e, drag:this});
        };

        this.stop = function(e, force) {
            if (force || moving) {
                var positions = [],
                    sel = k.getSelection(),
                    dPos = this.params.getPosition(dragEl);

                if (sel.length > 1) {
                    for (var i = 0; i < sel.length; i++) {
                        var p = this.params.getPosition(sel[i].el);
                        positions.push([ sel[i].el, { left: p[0], top: p[1] }, sel[i] ]);
                    }
                }
                else {
                    positions.push([ dragEl, {left:dPos[0], top:dPos[1]}, this ]);
                }

                _dispatch("stop", {
                    el: dragEl, pos: dPos, e: e, drag: this, selection:positions
                });
            }
        };

        this.mark = function(andNotify) {
            posAtDown = this.params.getPosition(dragEl);
            this.size = this.params.getSize(dragEl);
            matchingDroppables = k.getMatchingDroppables(this);
            _setDroppablesActive(matchingDroppables, true, false, this);
            this.params.addClass(dragEl, this.params.dragClass || css.drag);
            if (this.params.constrain || this.params.containment) {
                var cs = this.params.getSize(dragEl.parentNode);
                constrainRect = { w:cs[0], h:cs[1] };
            }
            if (andNotify) {
                k.notifySelectionDragStart(this);
            }
        };
        this.unmark = function(e) {
            _setDroppablesActive(matchingDroppables, false, true, this);
            this.params.removeClass(dragEl, this.params.dragClass || css.drag);
            matchingDroppables.length = 0;
            for (var i = 0; i < intersectingDroppables.length; i++) {
                var retVal = intersectingDroppables[i].drop(this, e);
                if (retVal === true) break;
            }
        };
        this.moveBy = function(dx, dy, e) {
            intersectingDroppables.length = 0;
            var cPos = this.constrain(this.toGrid(([posAtDown[0] + dx, posAtDown[1] + dy])), dragEl),
                rect = { x:cPos[0], y:cPos[1], w:this.size[0], h:this.size[1]},
                focusDropElement = null;

            this.params.setPosition(dragEl, cPos);
            for (var i = 0; i < matchingDroppables.length; i++) {
                var r2 = { x:matchingDroppables[i].position[0], y:matchingDroppables[i].position[1], w:matchingDroppables[i].size[0], h:matchingDroppables[i].size[1]};
                if (this.params.intersects(rect, r2) && (_multipleDrop || focusDropElement == null || focusDropElement == matchingDroppables[i].el) && matchingDroppables[i].canDrop(this)) {
                    if (!focusDropElement) focusDropElement = matchingDroppables[i].el;
                    intersectingDroppables.push(matchingDroppables[i]);
                    matchingDroppables[i].setHover(this, true, e);
                }
                else if (matchingDroppables[i].isHover()) {
                    matchingDroppables[i].setHover(this, false, e);
                }
            }

            _dispatch("drag", {el:this.el, pos:cPos, e:e, drag:this});

            /* test to see if the parent needs to be scrolled
             if (scroll) {
             var pnsl = dragEl.parentNode.scrollLeft, pnst = dragEl.parentNode.scrollTop;
             console.log("scroll!", pnsl, pnst);
             }*/
        };
        this.destroy = function() {
            this.params.unbind(this.el, "mousedown", this.downListener);
            this.params.unbind(document, "mousemove", this.moveListener);
            this.params.unbind(document, "mouseup", this.upListener);
            this.downListener = null;
            this.upListener = null;
            this.moveListener = null;
            //this.params = null;
            //this.el = null;
            //dragEl = null;
        };

        // init:register mousedown, and perhaps set a filter
        this.params.bind(this.el, "mousedown", this.downListener);

        // if handle provded, use that.  otherwise, try to set a filter.
        // note that a `handle` selector always results in filterExclude being set to false, ie.
        // the selector defines the handle element(s).
        if (this.params.handle)
            _setFilter(this.params.handle, false);
        else
            _setFilter(this.params.filter, this.params.filterExclude);
    };

    var Drop = function(el, params, css, scope) {
        this._class = css.droppable;
        this.params = params || {};
        this._activeClass = this.params.activeClass || css.active;
        this._hoverClass = this.params.hoverClass || css.hover;
        Super.apply(this, arguments);
        var hover = false;
        this.allowLoopback = this.params.allowLoopback !== false;

        this.setActive = function(val) {
            this.params[val ? "addClass" : "removeClass"](this.el, this._activeClass);
        };

        this.updatePosition = function() {
            this.position = this.params.getPosition(this.el);
            this.size = this.params.getSize(this.el);
        };

        this.canDrop = this.params.canDrop || function(drag) {
            return true;
        };

        this.isHover = function() { return hover; };

        this.setHover = function(drag, val, e) {
            // if turning off hover but this was not the drag that caused the hover, ignore.
            if (val || this.el._katavorioDragHover == null || this.el._katavorioDragHover == drag.el._katavorio) {
                this.params[val ? "addClass" : "removeClass"](this.el, this._hoverClass);
                //this.el._katavorioDragHover = val ? drag.el._katavorio : null;
                this.el._katavorioDragHover = val ? drag.el._katavorio : null;
                if (hover !== val)
                    this.params.events[val ? "over" : "out"]({el:this.el, e:e, drag:drag, drop:this});
                hover = val;
            }
        };

        this.drop = function(drag, event) {
            return this.params.events["drop"]({ drag:drag, e:event, drop:this });
        };

        this.destroy = function() {
            this._class = null;
            this._activeClass = null;
            this._hoverClass = null;
            //this.params = null;
            hover = null;
            //this.el = null;
        };
    };

    var _uuid = function() {
        return ('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        }));
    };

    var _gel = function(el) {
        if (el == null) return null;
        el = (typeof el === "string" || el.constructor == String)  ? document.getElementById(el) : el;
        if (el == null) return null;
        el._katavorio = el._katavorio || _uuid();
        return el;
    };

    this.Katavorio = function(katavorioParams) {

        var _selection = [],
            _selectionMap = {};

        this._dragsByScope = {};
        this._dropsByScope = {};
        var _zoom = 1,
            _reg = function(obj, map) {
                _each(obj, function(_obj) {
                    for(var i = 0; i < _obj.scopes.length; i++) {
                        map[_obj.scopes[i]] = map[_obj.scopes[i]] || [];
                        map[_obj.scopes[i]].push(_obj);
                    }
                });
            },
            _unreg = function(obj, map) {
                var c = 0;
                _each(obj, function(_obj) {
                    for(var i = 0; i < _obj.scopes.length; i++) {
                        if (map[_obj.scopes[i]]) {
                            var idx = katavorioParams.indexOf(map[_obj.scopes[i]], _obj);
                            if (idx != -1) {
                                map[_obj.scopes[i]].splice(idx, 1);
                                c++;
                            }
                        }
                    }
                });

                return c > 0 ;
            },
            _getMatchingDroppables = this.getMatchingDroppables = function(drag) {
                var dd = [], _m = {};
                for (var i = 0; i < drag.scopes.length; i++) {
                    var _dd = this._dropsByScope[drag.scopes[i]];
                    if (_dd) {
                        for (var j = 0; j < _dd.length; j++) {
                            if (_dd[j].canDrop(drag) &&  !_m[_dd[j].uuid] && (_dd[j].allowLoopback || _dd[j].el !== drag.el)) {
                                _m[_dd[j].uuid] = true;
                                dd.push(_dd[j]);
                            }
                        }
                    }
                }
                return dd;
            },
            _prepareParams = function(p) {
                p = p || {};
                var _p = {
                    events:{}
                }, i;
                for (i in katavorioParams) _p[i] = katavorioParams[i];
                for (i in p) _p[i] = p[i];
                // events

                for (i = 0; i < _events.length; i++) {
                    _p.events[_events[i]] = p[_events[i]] || _devNull;
                }
                _p.katavorio = this;
                return _p;
            }.bind(this),
            _mistletoe = function(existingDrag, params) {
                for (var i = 0; i < _events.length; i++) {
                    if (params[_events[i]]) {
                        existingDrag.on(_events[i], params[_events[i]]);
                    }
                }
            }.bind(this),
            _css = {},
            overrideCss = katavorioParams.css || {},
            _scope = katavorioParams.scope || _defaultScope;

        // prepare map of css classes based on defaults frst, then optional overrides
        for (var i in _classes) _css[i] = _classes[i];
        for (var i in overrideCss) _css[i] = overrideCss[i];

        var inputFilterSelector = katavorioParams.inputFilterSelector || _defaultInputFilterSelector;
        /**
         * Gets the selector identifying which input elements to filter from drag events.
         * @method getInputFilterSelector
         * @return {String} Current input filter selector.
         */
        this.getInputFilterSelector = function() { return inputFilterSelector; };

        /**
         * Sets the selector identifying which input elements to filter from drag events.
         * @method setInputFilterSelector
         * @param {String} selector Input filter selector to set.
         * @return {Katavorio} Current instance; method may be chained.
         */
        this.setInputFilterSelector = function(selector) {
            inputFilterSelector = selector;
            return this;
        };

        this.draggable = function(el, params) {
            var o = [];
            _each(el, function(_el) {
                _el = _gel(_el);
                if (_el != null) {
                    if (_el._katavorioDrag == null) {
                        var p = _prepareParams(params);
                        _el._katavorioDrag = new Drag(_el, p, _css, _scope);
                        _reg(_el._katavorioDrag, this._dragsByScope);
                        o.push(_el._katavorioDrag);
                        katavorioParams.addClass(_el, _css.draggable);
                    }
                    else {
                        _mistletoe(_el._katavorioDrag, params);
                    }
                }
            }.bind(this));
            return o;

        };

        this.droppable = function(el, params) {
            var o = [];
            _each(el, function(_el) {
                _el = _gel(_el);
                if (_el != null) {
                    var drop = new Drop(_el, _prepareParams(params), _css, _scope);
                    _el._katavorioDrop = _el._katavorioDrop || [];
                    _el._katavorioDrop.push(drop);
                    _reg(drop, this._dropsByScope);
                    o.push(drop);
                    katavorioParams.addClass(_el, _css.droppable);
                }
            }.bind(this));
            return o;
        };

        /**
         * @name Katavorio#select
         * @function
         * @desc Adds an element to the current selection (for multiple node drag)
         * @param {Element|String} DOM element - or id of the element - to add.
         */
        this.select = function(el) {
            _each(el, function() {
                var _el = _gel(this);
                if (_el && _el._katavorioDrag) {
                    if (!_selectionMap[_el._katavorio]) {
                        _selection.push(_el._katavorioDrag);
                        _selectionMap[_el._katavorio] = [ _el, _selection.length - 1 ];
                        katavorioParams.addClass(_el, _css.selected);
                    }
                }
            });
            return this;
        };

        /**
         * @name Katavorio#deselect
         * @function
         * @desc Removes an element from the current selection (for multiple node drag)
         * @param {Element|String} DOM element - or id of the element - to remove.
         */
        this.deselect = function(el) {
            _each(el, function() {
                var _el = _gel(this);
                if (_el && _el._katavorio) {
                    var e = _selectionMap[_el._katavorio];
                    if (e) {
                        var _s = [];
                        for (var i = 0; i < _selection.length; i++)
                            if (_selection[i].el !== _el) _s.push(_selection[i]);
                        _selection = _s;
                        delete _selectionMap[_el._katavorio];
                        katavorioParams.removeClass(_el, _css.selected);
                    }
                }
            });
            return this;
        };

        this.deselectAll = function() {
            for (var i in _selectionMap) {
                var d = _selectionMap[i];
                katavorioParams.removeClass(d[0], _css.selected);
            }

            _selection.length = 0;
            _selectionMap = {};
        };

        this.markSelection = function(drag) {
            _foreach(_selection, function(e) { e.mark(); }, drag);
        };

        this.markPosses = function(drag) {
            if (drag.posses) {
                _each(drag.posses, function(p) {
                    if (drag.posseRoles[p] && _posses[p]) {
                        _foreach(_posses[p].members, function (d) {
                            d.mark();
                        }, drag);
                    }
                })
            }
        };

        this.unmarkSelection = function(drag, event) {
            _foreach(_selection, function(e) { e.unmark(event); }, drag);
        };

        this.unmarkPosses = function(drag, event) {
            if (drag.posses) {
                _each(drag.posses, function(p) {
                    if (drag.posseRoles[p] && _posses[p]) {
                        _foreach(_posses[p].members, function (d) {
                            d.unmark(event);
                        }, drag);
                    }
                });
            }
        };

        this.getSelection = function() { return _selection.slice(0); };

        this.updateSelection = function(dx, dy, drag) {
            _foreach(_selection, function(e) { e.moveBy(dx, dy); }, drag);
        };

        this.updatePosses = function(dx, dy, drag) {
            if (drag.posses) {
                _each(drag.posses, function(p) {
                    if (drag.posseRoles[p] && _posses[p]) {
                        _foreach(_posses[p].members, function (e) {
                            e.moveBy(dx, dy);
                        }, drag);
                    }
                });
            }
        };

        this.notifySelectionDragStop = function(drag, evt) {
            _foreach(_selection, function(e) { e.stop(evt, true); }, drag);
        };

        this.notifySelectionDragStart = function(drag, evt) {
            _foreach(_selection, function(e) { e.notifyStart(evt);}, drag);
        };

        this.setZoom = function(z) { _zoom = z; };
        this.getZoom = function() { return _zoom; };

        // does the work of changing scopes
        var _scopeManip = function(kObj, scopes, map, fn) {
            _each(kObj, function(_kObj) {
                _unreg(_kObj, map);  // deregister existing scopes
                _kObj[fn](scopes); // set scopes
                _reg(_kObj, map); // register new ones
            });
        };

        _each([ "set", "add", "remove", "toggle"], function(v) {
            this[v + "Scope"] = function(el, scopes) {
                _scopeManip(el._katavorioDrag, scopes, this._dragsByScope, v + "Scope");
                _scopeManip(el._katavorioDrop, scopes, this._dropsByScope, v + "Scope");
            }.bind(this);
            this[v + "DragScope"] = function(el, scopes) {
                _scopeManip(el._katavorioDrag, scopes, this._dragsByScope, v + "Scope");
            }.bind(this);
            this[v + "DropScope"] = function(el, scopes) {
                _scopeManip(el._katavorioDrop, scopes, this._dropsByScope, v + "Scope");
            }.bind(this);
        }.bind(this));

        this.snapToGrid = function(x, y) {
            for (var s in this._dragsByScope) {
                _foreach(this._dragsByScope[s], function(d) { d.snap(x, y); });
            }
        };

        this.getDragsForScope = function(s) { return this._dragsByScope[s]; };
        this.getDropsForScope = function(s) { return this._dropsByScope[s]; };

        var _destroy = function(el, type, map) {
            el = _gel(el);
            if (el[type]) {
                if (_unreg(el[type], map)) {
                    _each(el[type], function(kObj) { kObj.destroy() });
                }

                el[type] = null;
            }
        };

        this.elementRemoved = function(el) {
            this.destroyDraggable(el);
            this.destroyDroppable(el);
        };

        this.destroyDraggable = function(el) {
            _destroy(el, "_katavorioDrag", this._dragsByScope);
        };

        this.destroyDroppable = function(el) {
            _destroy(el, "_katavorioDrop", this._dropsByScope);
        };

        this.reset = function() {
            this._dragsByScope = {};
            this._dropsByScope = {};
            _selection = [];
            _selectionMap = {};
            _posses = {};
        };

        // ----- groups
        var _posses = {};
        /**
         * Add the given element to the posse with the given id, creating the group if it at first does not exist.
         * @param {Element} el Element to add.
         * @param {String...|Object...} spec Variable args parameters. Each argument can be a either a String, indicating
         * the ID of a Posse to which the element should be added as an active participant, or an Object containing
         * `{ id:"posseId", active:false/true}`. In the latter case, if `active` is not provided it is assumed to be
         * true.
         * @returns {Posse} The Posse to which the element(s) was/were added.
         */
        this.addToPosse = function(el, spec) {

            var posses = [], posseId, active;

            var _one = function(_spec) {
                posseId = _isString(_spec) ? _spec : _spec.id;
                active = _isString(_spec) ? true : _spec.active !== false;
                var posse = _posses[posseId] || (function() {
                    var g = {name:posseId, members:[]};
                    _posses[posseId] = g;
                    return g;
                })();
                _each(el, function(_el) {
                    if (_el._katavorioDrag) {
                        posse.members.suggest(_el._katavorioDrag);
                        _el._katavorioDrag.posses.suggest(posse.name);
                        _el._katavorioDrag.posseRoles[posse.name] = active;
                    }
                });
                posses.push(posse);
            };

            for (var i = 1; i < arguments.length; i++) {
                _one(arguments[i]);
            }



            return posses.length == 1 ? posses[0] : posses;
        };

        /**
         * Remove the given element from the given posse(s).
         * @param {Element} el Element to remove.
         * @param {String...} posseId Varargs parameter: one value for each posse to remove the element from.
         */
        this.removeFromPosse = function(el, posseId) {
            if (arguments.length < 2) throw new TypeError("No posse id provided for remove operation");
            for(var i = 1; i < arguments.length; i++) {
                posseId = arguments[i];
                _each(el, function (_el) {
                    if (_el._katavorioDrag && _el._katavorioDrag.posses) {
                        var d = _el._katavorioDrag;
                        _each(posseId, function (p) {
                            _posses[p].members.vanquish(d);
                            d.posses.vanquish(p);
                            delete d.posseRoles[p];
                        });
                    }
                });
            }
        };

        /**
         * Remove the given element from all Posses to which it belongs.
         * @param {Element|Element[]} el Element to remove from Posses.
         */
        this.removeFromAllPosses = function(el) {
            _each(el, function(_el) {
                if (_el._katavorioDrag && _el._katavorioDrag.posses) {
                    var d = _el._katavorioDrag;
                    _each(d.posses, function(p) {
                        _posses[p].members.vanquish(d);
                    });
                    d.posses.length = 0;
                    d.posseRoles = {};
                }
            });
        };
    };
}).call(this);

/*
 * jsPlumb
 *
 * Title:jsPlumb 2.0.2
 *
 * Provides a way to visually connect elements on an HTML page, using SVG.
 *
 * This file contains utility functions that run in both browsers and headless.
 *
 * Copyright (c) 2010 - 2015 jsPlumb (hello@jsplumbtoolkit.com)
 *
 * http://jsplumbtoolkit.com
 * http://github.com/sporritt/jsplumb
 *
 * Dual licensed under the MIT and GPL2 licenses.
 */

;
(function () {

    var _isa = function (a) {
            return Object.prototype.toString.call(a) === "[object Array]";
        },
        _isnum = function (n) {
            return Object.prototype.toString.call(n) === "[object Number]";
        },
        _iss = function (s) {
            return typeof s === "string";
        },
        _isb = function (s) {
            return typeof s === "boolean";
        },
        _isnull = function (s) {
            return s == null;
        },
        _iso = function (o) {
            return o == null ? false : Object.prototype.toString.call(o) === "[object Object]";
        },
        _isd = function (o) {
            return Object.prototype.toString.call(o) === "[object Date]";
        },
        _isf = function (o) {
            return Object.prototype.toString.call(o) === "[object Function]";
        },
        _ise = function (o) {
            for (var i in o) {
                if (o.hasOwnProperty(i)) return false;
            }
            return true;
        };

    var root = this;
    var exports = root.jsPlumbUtil = {
        isArray: _isa,
        isString: _iss,
        isBoolean: _isb,
        isNull: _isnull,
        isObject: _iso,
        isDate: _isd,
        isFunction: _isf,
        isEmpty: _ise,
        isNumber: _isnum,
        clone: function (a) {
            if (_iss(a)) return "" + a;
            else if (_isb(a)) return !!a;
            else if (_isd(a)) return new Date(a.getTime());
            else if (_isf(a)) return a;
            else if (_isa(a)) {
                var b = [];
                for (var i = 0; i < a.length; i++)
                    b.push(this.clone(a[i]));
                return b;
            }
            else if (_iso(a)) {
                var c = {};
                for (var j in a)
                    c[j] = this.clone(a[j]);
                return c;
            }
            else return a;
        },
        merge: function (a, b, collations) {
            // first change the collations array - if present - into a lookup table, because its faster.
            var cMap = {}, ar, i;
            collations = collations || [];
            for (i = 0; i < collations.length; i++)
                cMap[collations[i]] = true;

            var c = this.clone(a);
            for (i in b) {
                if (c[i] == null) {
                    c[i] = b[i];
                }
                else if (_iss(b[i]) || _isb(b[i])) {
                    if (!cMap[i]) {
                        c[i] = b[i]; // if we dont want to collate, just copy it in.
                    }
                    else {
                        ar = [];
                        // if c's object is also an array we can keep its values.
                        ar.push.apply(ar, _isa(c[i]) ? c[i] : [ c[i] ]);
                        ar.push.apply(ar, _isa(b[i]) ? b[i] : [ b[i] ]);
                        c[i] = ar;
                    }
                }
                else {
                    if (_isa(b[i])) {
                        ar = [];
                        // if c's object is also an array we can keep its values.
                        if (_isa(c[i])) ar.push.apply(ar, c[i]);
                        ar.push.apply(ar, b[i]);
                        c[i] = ar;
                    }
                    else if (_iso(b[i])) {
                        // overwite c's value with an object if it is not already one.
                        if (!_iso(c[i]))
                            c[i] = {};
                        for (var j in b[i]) {
                            c[i][j] = b[i][j];
                        }
                    }
                }

            }
            return c;
        },
        replace: function (inObj, path, value) {
            if (inObj == null) return;
            var q = inObj, t = q;
            path.replace(/([^\.])+/g, function (term, lc, pos, str) {
                var array = term.match(/([^\[0-9]+){1}(\[)([0-9+])/),
                    last = pos + term.length >= str.length,
                    _getArray = function () {
                        return t[array[1]] || (function () {
                            t[array[1]] = [];
                            return t[array[1]];
                        })();
                    };

                if (last) {
                    // set term = value on current t, creating term as array if necessary.
                    if (array)
                        _getArray()[array[3]] = value;
                    else
                        t[term] = value;
                }
                else {
                    // set to current t[term], creating t[term] if necessary.
                    if (array) {
                        var a = _getArray();
                        t = a[array[3]] || (function () {
                            a[array[3]] = {};
                            return a[array[3]];
                        })();
                    }
                    else
                        t = t[term] || (function () {
                            t[term] = {};
                            return t[term];
                        })();
                }
            });

            return inObj;
        },
        //
        // chain a list of functions, supplied by [ object, method name, args ], and return on the first
        // one that returns the failValue. if none return the failValue, return the successValue.
        //
        functionChain: function (successValue, failValue, fns) {
            for (var i = 0; i < fns.length; i++) {
                var o = fns[i][0][fns[i][1]].apply(fns[i][0], fns[i][2]);
                if (o === failValue) {
                    return o;
                }
            }
            return successValue;
        },
        // take the given model and expand out any parameters.
        populate: function (model, values) {
            // for a string, see if it has parameter matches, and if so, try to make the substitutions.
            var getValue = function (fromString) {
                    var matches = fromString.match(/(\${.*?})/g);
                    if (matches != null) {
                        for (var i = 0; i < matches.length; i++) {
                            var val = values[matches[i].substring(2, matches[i].length - 1)] || "";
                            if (val != null) {
                                fromString = fromString.replace(matches[i], val);
                            }
                        }
                    }
                    return fromString;
                },
            // process one entry.
                _one = function (d) {
                    if (d != null) {
                        if (_iss(d)) {
                            return getValue(d);
                        }
                        else if (_isa(d)) {
                            var r = [];
                            for (var i = 0; i < d.length; i++)
                                r.push(_one(d[i]));
                            return r;
                        }
                        else if (_iso(d)) {
                            var s = {};
                            for (var j in d) {
                                s[j] = _one(d[j]);
                            }
                            return s;
                        }
                        else {
                            return d;
                        }
                    }
                };

            return _one(model);
        },
        findWithFunction: function (a, f) {
            if (a)
                for (var i = 0; i < a.length; i++) if (f(a[i])) return i;
            return -1;
        },
        removeWithFunction: function (a, f) {
            var idx = exports.findWithFunction(a, f);
            if (idx > -1) a.splice(idx, 1);
            return idx != -1;
        },
        remove: function (l, v) {
            var idx = l.indexOf(v);
            if (idx > -1) l.splice(idx, 1);
            return idx != -1;
        },
        // TODO support insert index
        addWithFunction: function (list, item, hashFunction) {
            if (exports.findWithFunction(list, hashFunction) == -1) list.push(item);
        },
        addToList: function (map, key, value, insertAtStart) {
            var l = map[key];
            if (l == null) {
                l = [];
                map[key] = l;
            }
            l[insertAtStart ? "unshift" : "push"](value);
            return l;
        },
        //
        // extends the given obj (which can be an array) with the given constructor function, prototype functions, and
        // class members, any of which may be null.
        //
        extend: function (child, parent, _protoFn) {
            var i;
            parent = _isa(parent) ? parent : [ parent ];

            for (i = 0; i < parent.length; i++) {
                for (var j in parent[i].prototype) {
                    if (parent[i].prototype.hasOwnProperty(j)) {
                        child.prototype[j] = parent[i].prototype[j];
                    }
                }
            }

            var _makeFn = function (name, protoFn) {
                return function () {
                    for (i = 0; i < parent.length; i++) {
                        if (parent[i].prototype[name])
                            parent[i].prototype[name].apply(this, arguments);
                    }
                    return protoFn.apply(this, arguments);
                };
            };

            var _oneSet = function (fns) {
                for (var k in fns) {
                    child.prototype[k] = _makeFn(k, fns[k]);
                }
            };

            if (arguments.length > 2) {
                for (i = 2; i < arguments.length; i++)
                    _oneSet(arguments[i]);
            }

            return child;
        },
        uuid: function () {
            return ('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            }));
        },
        logEnabled: true,
        log: function () {
            if (exports.logEnabled && typeof console != "undefined") {
                try {
                    var msg = arguments[arguments.length - 1];
                    console.log(msg);
                }
                catch (e) {
                }
            }
        },

        /**
         * Wraps one function with another, creating a placeholder for the
         * wrapped function if it was null. this is used to wrap the various
         * drag/drop event functions - to allow jsPlumb to be notified of
         * important lifecycle events without imposing itself on the user's
         * drag/drop functionality.
         * @method jsPlumbUtil.wrap
         * @param {Function} wrappedFunction original function to wrap; may be null.
         * @param {Function} newFunction function to wrap the original with.
         * @param {Object} [returnOnThisValue] Optional. Indicates that the wrappedFunction should
         * not be executed if the newFunction returns a value matching 'returnOnThisValue'.
         * note that this is a simple comparison and only works for primitives right now.
         */
        wrap: function (wrappedFunction, newFunction, returnOnThisValue) {
            wrappedFunction = wrappedFunction || function () {
            };
            newFunction = newFunction || function () {
            };
            return function () {
                var r = null;
                try {
                    r = newFunction.apply(this, arguments);
                } catch (e) {
                    exports.log("jsPlumb function failed : " + e);
                }
                if (returnOnThisValue == null || (r !== returnOnThisValue)) {
                    try {
                        r = wrappedFunction.apply(this, arguments);
                    } catch (e) {
                        exports.log("wrapped function failed : " + e);
                    }
                }
                return r;
            };
        }
    };

    exports.EventGenerator = function () {
        var _listeners = {},
            eventsSuspended = false,
        // this is a list of events that should re-throw any errors that occur during their dispatch. it is current private.
            eventsToDieOn = { "ready": true };

        this.bind = function (event, listener, insertAtStart) {
            var _one = function(evt) {
                exports.addToList(_listeners, evt, listener, insertAtStart);
                listener.__jsPlumb = listener.__jsPlumb || {};
                listener.__jsPlumb[jsPlumbUtil.uuid()] = evt;
            };

            if (typeof event === "string") _one(event);
            else if (event.length != null) {
                for (var i = 0; i < event.length; i++) {
                    _one(event[i]);
                }
            }

            return this;
        };

        this.fire = function (event, value, originalEvent) {
            if (!eventsSuspended && _listeners[event]) {
                var l = _listeners[event].length, i = 0, _gone = false, ret = null;
                if (!this.shouldFireEvent || this.shouldFireEvent(event, value, originalEvent)) {
                    while (!_gone && i < l && ret !== false) {
                        // doing it this way rather than catching and then possibly re-throwing means that an error propagated by this
                        // method will have the whole call stack available in the debugger.
                        if (eventsToDieOn[event])
                            _listeners[event][i].apply(this, [ value, originalEvent]);
                        else {
                            try {
                                ret = _listeners[event][i].apply(this, [ value, originalEvent ]);
                            } catch (e) {
                                exports.log("jsPlumb: fire failed for event " + event + " : " + e);
                            }
                        }
                        i++;
                        if (_listeners == null || _listeners[event] == null)
                            _gone = true;
                    }
                }
            }
            return this;
        };

        this.unbind = function (eventOrListener, listener) {

            if (arguments.length === 0) {
                _listeners = {};
            }
            else if (arguments.length === 1) {
                if (typeof eventOrListener === "string")
                    delete _listeners[eventOrListener];
                else if (eventOrListener.__jsPlumb) {
                    var evt;
                    for (var i in eventOrListener.__jsPlumb) {
                        evt = eventOrListener.__jsPlumb[i];
                        exports.remove(_listeners[evt] || [], eventOrListener);
                    }
                }
            }
            else if (arguments.length === 2) {
                exports.remove(_listeners[eventOrListener] || [], listener);
            }

            return this;
        };

        this.getListener = function (forEvent) {
            return _listeners[forEvent];
        };
        this.setSuspendEvents = function (val) {
            eventsSuspended = val;
        };
        this.isSuspendEvents = function () {
            return eventsSuspended;
        };
        this.silently = function(fn) {
            this.setSuspendEvents(true);
            try {
                fn();
            }
            catch (e) {
                jsPlumbUtil.log("Cannot execute silent function " + e);
            }
            this.setSuspendEvents(false);
        };
        this.cleanupListeners = function () {
            for (var i in _listeners) {
                _listeners[i] = null;
            }
        };
    };

    exports.EventGenerator.prototype = {
        cleanup: function () {
            this.cleanupListeners();
        }
    };

}).call(this);

/*
 * jsPlumb
 *
 * Title:jsPlumb 2.0.2
 *
 * Provides a way to visually connect elements on an HTML page, using SVG.
 *
 * This file contains utility functions that run in browsers only.
 *
 * Copyright (c) 2010 - 2015 jsPlumb (hello@jsplumbtoolkit.com)
 *
 * http://jsplumbtoolkit.com
 * http://github.com/sporritt/jsplumb
 *
 * Dual licensed under the MIT and GPL2 licenses.
 */
 ;(function() {

  "use strict";

   var root = this;
   var exports = root.jsPlumbUtil;

   exports.matchesSelector = function(el, selector, ctx) {
       ctx = ctx || el.parentNode;
       var possibles = ctx.querySelectorAll(selector);
       for (var i = 0; i < possibles.length; i++) {
           if (possibles[i] === el)
               return true;
       }
       return false;
   };

   exports.consume = function(e, doNotPreventDefault) {
       if (e.stopPropagation)
           e.stopPropagation();
       else
           e.returnValue = false;

       if (!doNotPreventDefault && e.preventDefault)
            e.preventDefault();
   };

   /*
    * Function: sizeElement
    * Helper to size and position an element. You would typically use
    * this when writing your own Connector or Endpoint implementation.
    *
    * Parameters:
    *  x - [int] x position for the element origin
    *  y - [int] y position for the element origin
    *  w - [int] width of the element
    *  h - [int] height of the element
    *
    */
   exports.sizeElement = function(el, x, y, w, h) {
       if (el) {
           el.style.height = h + "px";
           el.height = h;
           el.style.width = w + "px";
           el.width = w;
           el.style.left = x + "px";
           el.style.top = y + "px";
       }
   };


 }).call(this);

/*
 * jsPlumb
 * 
 * Title:jsPlumb 2.0.2
 * 
 * Provides a way to visually connect elements on an HTML page, using SVG.
 * 
 * This file contains the core code.
 *
 * Copyright (c) 2010 - 2015 jsPlumb (hello@jsplumbtoolkit.com)
 * 
 * http://jsplumbtoolkit.com
 * http://github.com/sporritt/jsplumb
 * 
 * Dual licensed under the MIT and GPL2 licenses.
 */
(function () {

    "use strict";

    var root = this;
    var connectorTypes = [], rendererTypes;

    var _ju = root.jsPlumbUtil,
        _getOffset = function (el, _instance, relativeToRoot) {
            return _instance.getOffset(el, relativeToRoot);
        },

        /**
         * creates a timestamp, using milliseconds since 1970, but as a string.
         */
        _timestamp = function () {
            return "" + (new Date()).getTime();
        },

    // helper method to update the hover style whenever it, or paintStyle, changes.
    // we use paintStyle as the foundation and merge hoverPaintStyle over the
    // top.
        _updateHoverStyle = function (component) {
            if (component._jsPlumb.paintStyle && component._jsPlumb.hoverPaintStyle) {
                var mergedHoverStyle = {};
                jsPlumb.extend(mergedHoverStyle, component._jsPlumb.paintStyle);
                jsPlumb.extend(mergedHoverStyle, component._jsPlumb.hoverPaintStyle);
                delete component._jsPlumb.hoverPaintStyle;
                // we want the fillStyle of paintStyle to override a gradient, if possible.
                if (mergedHoverStyle.gradient && component._jsPlumb.paintStyle.fillStyle)
                    delete mergedHoverStyle.gradient;
                component._jsPlumb.hoverPaintStyle = mergedHoverStyle;
            }
        },
        events = ["tap", "dbltap", "click", "dblclick", "mouseover", "mouseout", "mousemove", "mousedown", "mouseup", "contextmenu" ],
        eventFilters = { "mouseout": "mouseleave", "mouseexit": "mouseleave" },
        _updateAttachedElements = function (component, state, timestamp, sourceElement) {
            var affectedElements = component.getAttachedElements();
            if (affectedElements) {
                for (var i = 0, j = affectedElements.length; i < j; i++) {
                    if (!sourceElement || sourceElement != affectedElements[i])
                        affectedElements[i].setHover(state, true, timestamp);			// tell the attached elements not to inform their own attached elements.
                }
            }
        },
        _splitType = function (t) {
            return t == null ? null : t.split(" ");
        },
        _mapType = function(map, obj, typeId) {
            for (var i in obj)
                map[i] = typeId;
        },
        _each = function(fn, obj) {
            obj = jsPlumbUtil.isArray(obj) || (obj.length != null && !jsPlumbUtil.isString(obj)) ? obj : [ obj ];
            for (var i = 0; i < obj.length; i++) {
                try {
                    fn.apply(obj[i], [ obj[i] ]);
                }
                catch (e) {
                    jsPlumbUtil.log(".each iteration failed : " + e);
                }
            }
        },
        _applyTypes = function (component, params, doNotRepaint) {
            if (component.getDefaultType) {
                var td = component.getTypeDescriptor(), map = {};
                var defType = component.getDefaultType();
                var o = _ju.merge({}, defType);
                _mapType(map, defType, "__default");
                for (var i = 0, j = component._jsPlumb.types.length; i < j; i++) {
                    var tid = component._jsPlumb.types[i];
                    if (tid !== "__default") {
                        var _t = component._jsPlumb.instance.getType(tid, td);
                        if (_t != null) {
                            o = _ju.merge(o, _t, [ "cssClass" ]);
                            _mapType(map, _t, tid);
                        }
                    }
                }

                if (params) {
                    o = _ju.populate(o, params);
                }

                component.applyType(o, doNotRepaint, map);
                if (!doNotRepaint) component.repaint();
            }
        },

// ------------------------------ BEGIN jsPlumbUIComponent --------------------------------------------

        jsPlumbUIComponent = window.jsPlumbUIComponent = function (params) {

            jsPlumbUtil.EventGenerator.apply(this, arguments);

            var self = this,
                a = arguments,
                idPrefix = self.idPrefix,
                id = idPrefix + (new Date()).getTime();

            this._jsPlumb = {
                instance: params._jsPlumb,
                parameters: params.parameters || {},
                paintStyle: null,
                hoverPaintStyle: null,
                paintStyleInUse: null,
                hover: false,
                beforeDetach: params.beforeDetach,
                beforeDrop: params.beforeDrop,
                overlayPlacements: [],
                hoverClass: params.hoverClass || params._jsPlumb.Defaults.HoverClass,
                types: [],
                typeCache:{}
            };

            this.cacheTypeItem = function(key, item, typeId) {
                this._jsPlumb.typeCache[typeId] = this._jsPlumb.typeCache[typeId] || {};
                this._jsPlumb.typeCache[typeId][key] = item;
            };
            this.getCachedTypeItem = function(key, typeId) {
                return this._jsPlumb.typeCache[typeId] ? this._jsPlumb.typeCache[typeId][key] : null;
            };

            this.getId = function () {
                return id;
            };

// ----------------------------- default type --------------------------------------------


            var o = params.overlays || [], oo = {};
            if (this.defaultOverlayKeys) {
                for (var i = 0; i < this.defaultOverlayKeys.length; i++)
                    Array.prototype.push.apply(o, this._jsPlumb.instance.Defaults[this.defaultOverlayKeys[i]] || []);

                for (i = 0; i < o.length; i++) {
                    // if a string, convert to object representation so that we can store the typeid on it.
                    // also assign an id.
                    var fo = jsPlumb.convertToFullOverlaySpec(o[i]);
                    oo[fo[1].id] = fo;
                }
            }

            var _defaultType = {
                overlays:oo,
                parameters: params.parameters || {},
                scope: params.scope || this._jsPlumb.instance.getDefaultScope()
            };
            this.getDefaultType = function() {
                return _defaultType;
            };
            this.appendToDefaultType = function(obj) {
                for (var i in obj) _defaultType[i] = obj[i];
            };

// ----------------------------- end default type --------------------------------------------

            // all components can generate events

            if (params.events) {
                for (i in params.events)
                    self.bind(i, params.events[i]);
            }

            // all components get this clone function.
            // TODO issue 116 showed a problem with this - it seems 'a' that is in
            // the clone function's scope is shared by all invocations of it, the classic
            // JS closure problem.  for now, jsPlumb does a version of this inline where
            // it used to call clone.  but it would be nice to find some time to look
            // further at this.
            this.clone = function () {
                var o = {};//new Object();
                this.constructor.apply(o, a);
                return o;
            }.bind(this);

            // user can supply a beforeDetach callback, which will be executed before a detach
            // is performed; returning false prevents the detach.
            this.isDetachAllowed = function (connection) {
                var r = true;
                if (this._jsPlumb.beforeDetach) {
                    try {
                        r = this._jsPlumb.beforeDetach(connection);
                    }
                    catch (e) {
                        _ju.log("jsPlumb: beforeDetach callback failed", e);
                    }
                }
                return r;
            };

            // user can supply a beforeDrop callback, which will be executed before a dropped
            // connection is confirmed. user can return false to reject connection.
            this.isDropAllowed = function (sourceId, targetId, scope, connection, dropEndpoint, source, target) {
                var r = this._jsPlumb.instance.checkCondition("beforeDrop", {
                    sourceId: sourceId,
                    targetId: targetId,
                    scope: scope,
                    connection: connection,
                    dropEndpoint: dropEndpoint,
                    source: source, target: target
                });
                if (this._jsPlumb.beforeDrop) {
                    try {
                        r = this._jsPlumb.beforeDrop({
                            sourceId: sourceId,
                            targetId: targetId,
                            scope: scope,
                            connection: connection,
                            dropEndpoint: dropEndpoint,
                            source: source, target: target
                        });
                    }
                    catch (e) {
                        _ju.log("jsPlumb: beforeDrop callback failed", e);
                    }
                }
                return r;
            };

            var boundListeners = [],
                bindAListener = function (obj, type, fn) {
                    boundListeners.push([obj, type, fn]);
                    obj.bind(type, fn);
                },
                domListeners = [];

            // sets the component associated with listener events. for instance, an overlay delegates
            // its events back to a connector. but if the connector is swapped on the underlying connection,
            // then this component must be changed. This is called by setConnector in the Connection class.
            this.setListenerComponent = function (c) {
                for (var i = 0; i < domListeners.length; i++)
                    domListeners[i][3] = c;
            };


        };

    var _removeTypeCssHelper = function (component, typeIndex) {
        var typeId = component._jsPlumb.types[typeIndex],
            type = component._jsPlumb.instance.getType(typeId, component.getTypeDescriptor());

        if (type != null) {

            if (type.cssClass && component.canvas)
                component._jsPlumb.instance.removeClass(component.canvas, type.cssClass);
        }
    };

    jsPlumbUtil.extend(jsPlumbUIComponent, jsPlumbUtil.EventGenerator, {

        getParameter: function (name) {
            return this._jsPlumb.parameters[name];
        },

        setParameter: function (name, value) {
            this._jsPlumb.parameters[name] = value;
        },

        getParameters: function () {
            return this._jsPlumb.parameters;
        },

        setParameters: function (p) {
            this._jsPlumb.parameters = p;
        },

        getClass:function() {
            return jsPlumb.getClass(this.canvas);
        },

        hasClass:function(clazz) {
            return jsPlumb.hasClass(this.canvas, clazz);
        },

        addClass: function (clazz) {
            jsPlumb.addClass(this.canvas, clazz);
        },

        removeClass: function (clazz) {
            jsPlumb.removeClass(this.canvas, clazz);
        },

        updateClasses: function (classesToAdd, classesToRemove) {
            jsPlumb.updateClasses(this.canvas, classesToAdd, classesToRemove);
        },

        setType: function (typeId, params, doNotRepaint) {
            this.clearTypes();
            this._jsPlumb.types = _splitType(typeId) || [];
            _applyTypes(this, params, doNotRepaint);
        },

        getType: function () {
            return this._jsPlumb.types;
        },

        reapplyTypes: function (params, doNotRepaint) {
            _applyTypes(this, params, doNotRepaint);
        },

        hasType: function (typeId) {
            return this._jsPlumb.types.indexOf(typeId) != -1;
        },

        addType: function (typeId, params, doNotRepaint) {
            var t = _splitType(typeId), _cont = false;
            if (t != null) {
                for (var i = 0, j = t.length; i < j; i++) {
                    if (!this.hasType(t[i])) {
                        this._jsPlumb.types.push(t[i]);
                        _cont = true;
                    }
                }
                if (_cont) _applyTypes(this, params, doNotRepaint);
            }
        },

        removeType: function (typeId, doNotRepaint) {
            var t = _splitType(typeId), _cont = false, _one = function (tt) {
                var idx = this._jsPlumb.types.indexOf(tt);
                if (idx != -1) {
                    // remove css class if necessary
                    _removeTypeCssHelper(this, idx);
                    this._jsPlumb.types.splice(idx, 1);
                    return true;
                }
                return false;
            }.bind(this);

            if (t != null) {
                for (var i = 0, j = t.length; i < j; i++) {
                    _cont = _one(t[i]) || _cont;
                }
                if (_cont) _applyTypes(this, null, doNotRepaint);
            }
        },
        clearTypes: function (doNotRepaint) {
            var i = this._jsPlumb.types.length;
            for (var j = 0; j < i; j++) {
                _removeTypeCssHelper(this, 0);
                this._jsPlumb.types.splice(0, 1);
            }
            _applyTypes(this, {}, doNotRepaint);
        },

        toggleType: function (typeId, params, doNotRepaint) {
            var t = _splitType(typeId);
            if (t != null) {
                for (var i = 0, j = t.length; i < j; i++) {
                    var idx = this._jsPlumb.types.indexOf(t[i]);
                    if (idx != -1) {
                        _removeTypeCssHelper(this, idx);
                        this._jsPlumb.types.splice(idx, 1);
                    }
                    else
                        this._jsPlumb.types.push(t[i]);
                }

                _applyTypes(this, params, doNotRepaint);
            }
        },
        applyType: function (t, doNotRepaint) {
            this.setPaintStyle(t.paintStyle, doNotRepaint);
            this.setHoverPaintStyle(t.hoverPaintStyle, doNotRepaint);
            if (t.parameters) {
                for (var i in t.parameters)
                    this.setParameter(i, t.parameters[i]);
            }
            this._jsPlumb.paintStyleInUse = this.getPaintStyle();
        },
        setPaintStyle: function (style, doNotRepaint) {
//		    	this._jsPlumb.paintStyle = jsPlumb.extend({}, style);
// TODO figure out if we want components to clone paintStyle so as not to share it.
            this._jsPlumb.paintStyle = style;
            this._jsPlumb.paintStyleInUse = this._jsPlumb.paintStyle;
            _updateHoverStyle(this);
            if (!doNotRepaint) this.repaint();
        },
        getPaintStyle: function () {
            return this._jsPlumb.paintStyle;
        },
        setHoverPaintStyle: function (style, doNotRepaint) {
            //this._jsPlumb.hoverPaintStyle = jsPlumb.extend({}, style);
// TODO figure out if we want components to clone paintStyle so as not to share it.		    	
            this._jsPlumb.hoverPaintStyle = style;
            _updateHoverStyle(this);
            if (!doNotRepaint) this.repaint();
        },
        getHoverPaintStyle: function () {
            return this._jsPlumb.hoverPaintStyle;
        },
        destroy: function (force) {
            if (force || this.typeId == null) {
                this.cleanupListeners(); // this is on EventGenerator
                this.clone = null;
                this._jsPlumb = null;
            }
        },

        isHover: function () {
            return this._jsPlumb.hover;
        },

        setHover: function (hover, ignoreAttachedElements, timestamp) {
            // while dragging, we ignore these events.  this keeps the UI from flashing and
            // swishing and whatevering.
            if (this._jsPlumb && !this._jsPlumb.instance.currentlyDragging && !this._jsPlumb.instance.isHoverSuspended()) {

                this._jsPlumb.hover = hover;

                if (this.canvas != null) {
                    if (this._jsPlumb.instance.hoverClass != null) {
                        var method = hover ? "addClass" : "removeClass";
                        this._jsPlumb.instance[method](this.canvas, this._jsPlumb.instance.hoverClass);
                    }
                    if (this._jsPlumb.hoverClass != null) {
                        this._jsPlumb.instance[method](this.canvas, this._jsPlumb.hoverClass);
                    }
                }
                if (this._jsPlumb.hoverPaintStyle != null) {
                    this._jsPlumb.paintStyleInUse = hover ? this._jsPlumb.hoverPaintStyle : this._jsPlumb.paintStyle;
                    if (!this._jsPlumb.instance.isSuspendDrawing()) {
                        timestamp = timestamp || _timestamp();
                        this.repaint({timestamp: timestamp, recalc: false});
                    }
                }
                // get the list of other affected elements, if supported by this component.
                // for a connection, its the endpoints.  for an endpoint, its the connections! surprise.
                if (this.getAttachedElements && !ignoreAttachedElements)
                    _updateAttachedElements(this, hover, _timestamp(), this);
            }
        }
    });

// ------------------------------ END jsPlumbUIComponent --------------------------------------------

    var _jsPlumbInstanceIndex = 0,
        getInstanceIndex = function () {
            var i = _jsPlumbInstanceIndex + 1;
            _jsPlumbInstanceIndex++;
            return i;
        };

    var jsPlumbInstance = window.jsPlumbInstance = function (_defaults) {

        this.Defaults = {
            Anchor: "Bottom",
            Anchors: [ null, null ],
            ConnectionsDetachable: true,
            ConnectionOverlays: [ ],
            Connector: "Bezier",
            Container: null,
            DoNotThrowErrors: false,
            DragOptions: { },
            DropOptions: { },
            Endpoint: "Dot",
            EndpointOverlays: [ ],
            Endpoints: [ null, null ],
            EndpointStyle: { fillStyle: "#456" },
            EndpointStyles: [ null, null ],
            EndpointHoverStyle: null,
            EndpointHoverStyles: [ null, null ],
            HoverPaintStyle: null,
            LabelStyle: { color: "black" },
            LogEnabled: false,
            Overlays: [ ],
            MaxConnections: 1,
            PaintStyle: { lineWidth: 4, strokeStyle: "#456" },
            ReattachConnections: false,
            RenderMode: "svg",
            Scope: "jsPlumb_DefaultScope"
        };
        if (_defaults) jsPlumb.extend(this.Defaults, _defaults);

        this.logEnabled = this.Defaults.LogEnabled;
        this._connectionTypes = {};
        this._endpointTypes = {};

        jsPlumbUtil.EventGenerator.apply(this);

        var _currentInstance = this,
            _instanceIndex = getInstanceIndex(),
            _bb = _currentInstance.bind,
            _initialDefaults = {},
            _zoom = 1,
            _info = function (el) {
                if (el == null) return null;
                else if (el.nodeType == 3 || el.nodeType == 8) {
                    return { el:el, text:true };
                }
                else {
                    var _el = _currentInstance.getElement(el);
                    return { el: _el, id: (jsPlumbUtil.isString(el) && _el == null) ? el : _getId(_el) };
                }
            };

        this.getInstanceIndex = function () {
            return _instanceIndex;
        };

        this.setZoom = function (z, repaintEverything) {
            _zoom = z;
            _currentInstance.fire("zoom", _zoom);
            if (repaintEverything) _currentInstance.repaintEverything();
            return true;
        };
        this.getZoom = function () {
            return _zoom;
        };

        for (var i in this.Defaults)
            _initialDefaults[i] = this.Defaults[i];

        var _container, _containerDelegations = [];
        this.unbindContainer = function() {
            if (_container != null && _containerDelegations.length > 0) {
                for (var i = 0; i < _containerDelegations.length; i++) {
                    _currentInstance.off(_container, _containerDelegations[i][0], _containerDelegations[i][1]);
                }
            }
        };
        this.setContainer = function (c) {

            this.unbindContainer();

            // get container as dom element.
            c = this.getElement(c);
            // move existing connections and endpoints, if any.
            this.select().each(function (conn) {
                conn.moveParent(c);
            });
            this.selectEndpoints().each(function (ep) {
                ep.moveParent(c);
            });

            // set container.
            var previousContainer = _container;
            _container = c;
            _containerDelegations.length = 0;

            var _oneDelegateHandler = function (id, e) {
                var t = e.srcElement || e.target,
                    jp = (t && t.parentNode ? t.parentNode._jsPlumb : null) || (t ? t._jsPlumb : null) || (t && t.parentNode && t.parentNode.parentNode ? t.parentNode.parentNode._jsPlumb : null);
                if (jp) {
                    jp.fire(id, jp, e);
                    // jsplumb also fires every event coming from components/overlays. That's what the test for `jp.component` is for.
                    _currentInstance.fire(id, jp.component || jp, e);
                }
            };

            var _addOneDelegate = function(eventId, selector, fn) {
                _containerDelegations.push([eventId, fn]);
                _currentInstance.on(_container, eventId, selector, fn);
            };

            // delegate one event on the container to jsplumb elements. it might be possible to
            // abstract this out: each of endpoint, connection and overlay could register themselves with
            // jsplumb as "component types" or whatever, and provide a suitable selector. this would be
            // done by the renderer (although admittedly from 2.0 onwards we're not supporting vml anymore)
            var _oneDelegate = function (id) {
                // connections.
                //_addOneDelegate(id, ".jsplumb-connector, .jsplumb-connector > *", function (e) {
                _addOneDelegate(id, ".jsplumb-connector > *", function (e) {
                    _oneDelegateHandler(id, e);
                });
                // endpoints. note they can have an enclosing div, or not.
                _addOneDelegate(id, ".jsplumb-endpoint, .jsplumb-endpoint > *, .jsplumb-endpoint svg *", function (e) {
                    _oneDelegateHandler(id, e);
                });
                // overlays
                _addOneDelegate(id, ".jsplumb-overlay, .jsplumb-overlay *", function (e) {
                    _oneDelegateHandler(id, e);
                });
            };

            for (var i = 0; i < events.length; i++)
                _oneDelegate(events[i]);

            // managed elements
            for (var elId in managedElements) {
                var el = managedElements[elId].el;
                if (el.parentNode === previousContainer) {
                    previousContainer.removeChild(el);
                    _container.appendChild(el);
                }
            }

        };
        this.getContainer = function () {
            return _container;
        };

        this.bind = function (event, fn) {
            if ("ready" === event && initialized) fn();
            else _bb.apply(_currentInstance, [event, fn]);
        };

        _currentInstance.importDefaults = function (d) {
            for (var i in d) {
                _currentInstance.Defaults[i] = d[i];
            }
            if (d.Container)
                _currentInstance.setContainer(d.Container);

            return _currentInstance;
        };

        _currentInstance.restoreDefaults = function () {
            _currentInstance.Defaults = jsPlumb.extend({}, _initialDefaults);
            return _currentInstance;
        };

        var log = null,
            initialized = false,
        // TODO remove from window scope
            connections = [],
        // map of element id -> endpoint lists. an element can have an arbitrary
        // number of endpoints on it, and not all of them have to be connected
        // to anything.
            endpointsByElement = {},
            endpointsByUUID = {},
            managedElements = {},
            offsets = {},
            offsetTimestamps = {},
            draggableStates = {},
            connectionBeingDragged = false,
            sizes = [],
            _suspendDrawing = false,
            _suspendedAt = null,
            DEFAULT_SCOPE = this.Defaults.Scope,
            renderMode = null,  // will be set in init()
            _curIdStamp = 1,
            _idstamp = function () {
                return "" + _curIdStamp++;
            },

        //
        // appends an element to some other element, which is calculated as follows:
        //
        // 1. if Container exists, use that element.
        // 2. if the 'parent' parameter exists, use that.
        // 3. otherwise just use the root element.
        //
        //
            _appendElement = function (el, parent) {
                if (_container)
                    _container.appendChild(el);
                else if (!parent)
                    this.appendToRoot(el);
                else
                    this.getElement(parent).appendChild(el);
            }.bind(this),

        //
        // Draws an endpoint and its connections. this is the main entry point into drawing connections as well
        // as endpoints, since jsPlumb is endpoint-centric under the hood.
        //
        // @param element element to draw (of type library specific element object)
        // @param ui UI object from current library's event system. optional.
        // @param timestamp timestamp for this paint cycle. used to speed things up a little by cutting down the amount of offset calculations we do.
        // @param clearEdits defaults to false; indicates that mouse edits for connectors should be cleared
        ///
            _draw = function (element, ui, timestamp, clearEdits) {

                // TODO is it correct to filter by headless at this top level? how would a headless adapter ever repaint?
                // NO. it is not correct.
                if (!jsPlumb.headless && !_suspendDrawing) {
                    var id = _getId(element),
                        repaintEls = _currentInstance.getDragManager().getElementsForDraggable(id);

                    if (timestamp == null) timestamp = _timestamp();

                    // update the offset of everything _before_ we try to draw anything.
                    var o = _updateOffset({ elId: id, offset: ui, recalc: false, timestamp: timestamp });

                    if (repaintEls) {
                        for (var i in repaintEls) {
                            _updateOffset({
                                elId: repaintEls[i].id,
                                offset: {
                                    left: o.o.left + repaintEls[i].offset.left,
                                    top: o.o.top + repaintEls[i].offset.top
                                },
                                recalc: false,
                                timestamp: timestamp
                            });
                        }
                    }

                    _currentInstance.anchorManager.redraw(id, ui, timestamp, null, clearEdits);

                    if (repaintEls) {
                        for (var j in repaintEls) {
                            _currentInstance.anchorManager.redraw(repaintEls[j].id, ui, timestamp, repaintEls[j].offset, clearEdits, true);
                        }
                    }
                }
            },

        //
        // gets an Endpoint by uuid.
        //
            _getEndpoint = function (uuid) {
                return endpointsByUUID[uuid];
            },

            /**
             * inits a draggable if it's not already initialised.
             * TODO: somehow abstract this to the adapter, because the concept of "draggable" has no
             * place on the server.
             */
            _initDraggableIfNecessary = function (element, isDraggable, dragOptions, id) {
                // move to DragManager?
                if (!jsPlumb.headless) {
                    var _draggable = isDraggable == null ? false : isDraggable;
                    if (_draggable) {
                        if (jsPlumb.isDragSupported(element, _currentInstance)) {
                            var options = dragOptions || _currentInstance.Defaults.DragOptions;
                            options = jsPlumb.extend({}, options); // make a copy.
                            if (!jsPlumb.isAlreadyDraggable(element, _currentInstance)) {
                                var dragEvent = jsPlumb.dragEvents.drag,
                                    stopEvent = jsPlumb.dragEvents.stop,
                                    startEvent = jsPlumb.dragEvents.start,
                                    _del = _currentInstance.getElement(element),
                                    _ancestor = _currentInstance.getDragManager().getDragAncestor(_del),
                                    _noOffset = {left: 0, top: 0},
                                    _ancestorOffset = _noOffset,
                                    _started = false;

                                _manage(id, element);

                                options[startEvent] = _ju.wrap(options[startEvent], function () {
                                    _ancestorOffset = _ancestor != null ? _currentInstance.getOffset(_ancestor) : _noOffset;
                                    _currentInstance.setHoverSuspended(true);
                                    _currentInstance.select({source: element}).addClass(_currentInstance.elementDraggingClass + " " + _currentInstance.sourceElementDraggingClass, true);
                                    _currentInstance.select({target: element}).addClass(_currentInstance.elementDraggingClass + " " + _currentInstance.targetElementDraggingClass, true);
                                    _currentInstance.setConnectionBeingDragged(true);
                                    if (options.canDrag) return dragOptions.canDrag();
                                }, false);

                                options[dragEvent] = _ju.wrap(options[dragEvent], function () {
                                    // TODO: here we could actually use getDragObject, and then compute it ourselves,
                                    // since every adapter does the same thing. but i'm not sure why YUI's getDragObject
                                    // differs from getUIPosition so much
                                    var ui = _currentInstance.getUIPosition(arguments, _currentInstance.getZoom());
                                    // adjust by ancestor offset if there is one: this is for the case that a draggable
                                    // is contained inside some other element that is not the Container.
                                    ui.left += _ancestorOffset.left;
                                    ui.top += _ancestorOffset.top;
                                    _draw(element, ui, null, true);
                                    if (_started) _currentInstance.addClass(element, "jsplumb-dragged");
                                    _started = true;
                                });
                                options[stopEvent] = _ju.wrap(options[stopEvent], function () {
                                    var elements = arguments[0].selection;
                                    var uip = _currentInstance.getUIPosition(arguments);

                                    // this is one element
                                    var _one = function (_e) {
                                        _draw(_e[0], uip);
                                        _currentInstance.removeClass(_e[0], "jsplumb-dragged");
                                        _currentInstance.select({source: _e[0]}).removeClass(_currentInstance.elementDraggingClass + " " + _currentInstance.sourceElementDraggingClass, true);
                                        _currentInstance.select({target: _e[0]}).removeClass(_currentInstance.elementDraggingClass + " " + _currentInstance.targetElementDraggingClass, true);
                                        _currentInstance.getDragManager().dragEnded(_e[0]);
                                    };

                                    for (var i = 0; i < elements.length; i++)
                                        _one(elements[i]);

                                    // this is common across all
                                    _started = false;
                                    _currentInstance.setHoverSuspended(false);
                                    _currentInstance.setConnectionBeingDragged(false);
                                });
                                var elId = _getId(element); // need ID
                                draggableStates[elId] = true;
                                var draggable = draggableStates[elId];
                                options.disabled = draggable == null ? false : !draggable;
                                _currentInstance.initDraggable(element, options);
                                _currentInstance.getDragManager().register(element);
                            }
                            else {
                                // already draggable. attach any start, drag or stop listeners to the current Drag.
                                if (dragOptions.force) {
                                    _currentInstance.initDraggable(element, options);
                                }
                            }
                        }
                    }
                }
            },

            _scopeMatch = function (e1, e2) {
                var s1 = e1.scope.split(/\s/), s2 = e2.scope.split(/\s/);
                for (var i = 0; i < s1.length; i++)
                    for (var j = 0; j < s2.length; j++)
                        if (s2[j] == s1[i]) return true;

                return false;
            },

        /*
         * prepares a final params object that can be passed to _newConnection, taking into account defaults, events, etc.
         */
            _prepareConnectionParams = function (params, referenceParams) {
                var _p = jsPlumb.extend({ }, params);
                if (referenceParams) jsPlumb.extend(_p, referenceParams);

                // hotwire endpoints passed as source or target to sourceEndpoint/targetEndpoint, respectively.
                if (_p.source) {
                    if (_p.source.endpoint)
                        _p.sourceEndpoint = _p.source;
                    else
                        _p.source = _currentInstance.getElement(_p.source);
                }
                if (_p.target) {
                    if (_p.target.endpoint)
                        _p.targetEndpoint = _p.target;
                    else
                        _p.target = _currentInstance.getElement(_p.target);
                }

                // test for endpoint uuids to connect
                if (params.uuids) {
                    _p.sourceEndpoint = _getEndpoint(params.uuids[0]);
                    _p.targetEndpoint = _getEndpoint(params.uuids[1]);
                }

                // now ensure that if we do have Endpoints already, they're not full.
                // source:
                if (_p.sourceEndpoint && _p.sourceEndpoint.isFull()) {
                    _ju.log(_currentInstance, "could not add connection; source endpoint is full");
                    return;
                }

                // target:
                if (_p.targetEndpoint && _p.targetEndpoint.isFull()) {
                    _ju.log(_currentInstance, "could not add connection; target endpoint is full");
                    return;
                }

                // if source endpoint mandates connection type and nothing specified in our params, use it.
                if (!_p.type && _p.sourceEndpoint)
                    _p.type = _p.sourceEndpoint.connectionType;

                // copy in any connectorOverlays that were specified on the source endpoint.
                // it doesnt copy target endpoint overlays.  i'm not sure if we want it to or not.
                if (_p.sourceEndpoint && _p.sourceEndpoint.connectorOverlays) {
                    _p.overlays = _p.overlays || [];
                    for (var i = 0, j = _p.sourceEndpoint.connectorOverlays.length; i < j; i++) {
                        _p.overlays.push(_p.sourceEndpoint.connectorOverlays[i]);
                    }
                }

                // pointer events
                if (!_p["pointer-events"] && _p.sourceEndpoint && _p.sourceEndpoint.connectorPointerEvents)
                    _p["pointer-events"] = _p.sourceEndpoint.connectorPointerEvents;

                var _mergeOverrides = function (def, values) {
                    var m = jsPlumb.extend({}, def);
                    for (var i in values) {
                        if (values[i]) m[i] = values[i];
                    }
                    return m;
                };

                var _addEndpoint = function (el, def, idx) {
                    return _currentInstance.addEndpoint(el, _mergeOverrides(def, {
                        anchor: _p.anchors ? _p.anchors[idx] : _p.anchor,
                        endpoint: _p.endpoints ? _p.endpoints[idx] : _p.endpoint,
                        paintStyle: _p.endpointStyles ? _p.endpointStyles[idx] : _p.endpointStyle,
                        hoverPaintStyle: _p.endpointHoverStyles ? _p.endpointHoverStyles[idx] : _p.endpointHoverStyle
                    }));
                };

                // check for makeSource/makeTarget specs.

                var _oneElementDef = function (type, idx, defs, matchType) {
                    if (_p[type] && !_p[type].endpoint && !_p[type + "Endpoint"] && !_p.newConnection) {
                        var tid = _getId(_p[type]), tep = defs[tid];

                        tep = tep ? tep[matchType] : null;

                        if (tep) {
                            // if not enabled, return.
                            if (!tep.enabled) return false;
                            var newEndpoint = tep.endpoint != null && tep.endpoint._jsPlumb ? tep.endpoint : _addEndpoint(_p[type], tep.def, idx);
                            if (newEndpoint.isFull()) return false;
                            _p[type + "Endpoint"] = newEndpoint;
                            newEndpoint._doNotDeleteOnDetach = false; // reset.
                            newEndpoint._deleteOnDetach = true;
                            if (tep.uniqueEndpoint) {
                                if (!tep.endpoint) {
                                    tep.endpoint = newEndpoint;
                                    newEndpoint._deleteOnDetach = false;
                                    newEndpoint._doNotDeleteOnDetach = true;
                                }
                                else
                                    newEndpoint.finalEndpoint = tep.endpoint;
                            }
                        }
                    }
                };

                if (_oneElementDef("source", 0, this.sourceEndpointDefinitions, _p.type || "default") === false) return;
                if (_oneElementDef("target", 1, this.targetEndpointDefinitions, _p.type || "default") === false) return;

                // last, ensure scopes match
                if (_p.sourceEndpoint && _p.targetEndpoint)
                    if (!_scopeMatch(_p.sourceEndpoint, _p.targetEndpoint)) _p = null;

                return _p;
            }.bind(_currentInstance),

            _newConnection = function (params) {
                var connectionFunc = _currentInstance.Defaults.ConnectionType || _currentInstance.getDefaultConnectionType();

                params._jsPlumb = _currentInstance;
                params.newConnection = _newConnection;
                params.newEndpoint = _newEndpoint;
                params.endpointsByUUID = endpointsByUUID;
                params.endpointsByElement = endpointsByElement;
                params.finaliseConnection = _finaliseConnection;
                params.id = "con_" + _idstamp();
                var con = new connectionFunc(params);

                // if the connection is draggable, then maybe we need to tell the target endpoint to init the
                // dragging code. it won't run again if it already configured to be draggable.
                if (con.isDetachable()) {
                    con.endpoints[0].initDraggable("_jsPlumbSource");
                    con.endpoints[1].initDraggable("_jsPlumbTarget");
                }

                return con;
            },

        //
        // adds the connection to the backing model, fires an event if necessary and then redraws
        //
            _finaliseConnection = _currentInstance.finaliseConnection = function (jpc, params, originalEvent, doInformAnchorManager) {
                params = params || {};
                // add to list of connections (by scope).
                if (!jpc.suspendedEndpoint)
                    connections.push(jpc);

                jpc.pending = null;

                // turn off isTemporarySource on the source endpoint (only viable on first draw)
                jpc.endpoints[0].isTemporarySource = false;

                // always inform the anchor manager
                // except that if jpc has a suspended endpoint it's not true to say the
                // connection is new; it has just (possibly) moved. the question is whether
                // to make that call here or in the anchor manager.  i think perhaps here.
                if (doInformAnchorManager !== false)
                    _currentInstance.anchorManager.newConnection(jpc);

                // force a paint
                _draw(jpc.source);

                // fire an event
                if (!params.doNotFireConnectionEvent && params.fireEvent !== false) {

                    var eventArgs = {
                        connection: jpc,
                        source: jpc.source, target: jpc.target,
                        sourceId: jpc.sourceId, targetId: jpc.targetId,
                        sourceEndpoint: jpc.endpoints[0], targetEndpoint: jpc.endpoints[1]
                    };

                    _currentInstance.fire("connection", eventArgs, originalEvent);
                }
            },

        /*
         factory method to prepare a new endpoint.  this should always be used instead of creating Endpoints
         manually, since this method attaches event listeners and an id.
         */
            _newEndpoint = function (params, id) {
                var endpointFunc = _currentInstance.Defaults.EndpointType || jsPlumb.Endpoint;
                var _p = jsPlumb.extend({}, params);
                _p._jsPlumb = _currentInstance;
                _p.newConnection = _newConnection;
                _p.newEndpoint = _newEndpoint;
                _p.endpointsByUUID = endpointsByUUID;
                _p.endpointsByElement = endpointsByElement;
                _p.fireDetachEvent = fireDetachEvent;
                _p.elementId = id || _getId(_p.source);
                var ep = new endpointFunc(_p);
                ep.id = "ep_" + _idstamp();
                _manage(_p.elementId, _p.source);

                if (!jsPlumb.headless)
                    _currentInstance.getDragManager().endpointAdded(_p.source, id);

                return ep;
            },

        /*
         * performs the given function operation on all the connections found
         * for the given element id; this means we find all the endpoints for
         * the given element, and then for each endpoint find the connectors
         * connected to it. then we pass each connection in to the given
         * function.
         */
            _operation = function (elId, func, endpointFunc) {
                var endpoints = endpointsByElement[elId];
                if (endpoints && endpoints.length) {
                    for (var i = 0, ii = endpoints.length; i < ii; i++) {
                        for (var j = 0, jj = endpoints[i].connections.length; j < jj; j++) {
                            var retVal = func(endpoints[i].connections[j]);
                            // if the function passed in returns true, we exit.
                            // most functions return false.
                            if (retVal) return;
                        }
                        if (endpointFunc) endpointFunc(endpoints[i]);
                    }
                }
            },

            _setDraggable = function (element, draggable) {
                return jsPlumb.each(element, function (el) {
                    if (_currentInstance.isDragSupported(el)) {
                        draggableStates[_currentInstance.getAttribute(el, "id")] = draggable;
                        _currentInstance.setElementDraggable(el, draggable);
                    }
                });
            },
        /*
         * private method to do the business of hiding/showing.
         *
         * @param el
         *            either Id of the element in question or a library specific
         *            object for the element.
         * @param state
         *            String specifying a value for the css 'display' property
         *            ('block' or 'none').
         */
            _setVisible = function (el, state, alsoChangeEndpoints) {
                state = state === "block";
                var endpointFunc = null;
                if (alsoChangeEndpoints) {
                    if (state) endpointFunc = function (ep) {
                        ep.setVisible(true, true, true);
                    };
                    else endpointFunc = function (ep) {
                        ep.setVisible(false, true, true);
                    };
                }
                var info = _info(el);
                _operation(info.id, function (jpc) {
                    if (state && alsoChangeEndpoints) {
                        // this test is necessary because this functionality is new, and i wanted to maintain backwards compatibility.
                        // this block will only set a connection to be visible if the other endpoint in the connection is also visible.
                        var oidx = jpc.sourceId === info.id ? 1 : 0;
                        if (jpc.endpoints[oidx].isVisible()) jpc.setVisible(true);
                    }
                    else  // the default behaviour for show, and what always happens for hide, is to just set the visibility without getting clever.
                        jpc.setVisible(state);
                }, endpointFunc);
            },
        /*
         * toggles the draggable state of the given element(s).
         * el is either an id, or an element object, or a list of ids/element objects.
         */
            _toggleDraggable = function (el) {
                return jsPlumb.each(el, function (el) {
                    var elId = _currentInstance.getAttribute(el, "id");
                    var state = draggableStates[elId] == null ? false : draggableStates[elId];
                    state = !state;
                    draggableStates[elId] = state;
                    _currentInstance.setDraggable(el, state);
                    return state;
                }.bind(this));
            },
            /**
             * private method to do the business of toggling hiding/showing.
             */
            _toggleVisible = function (elId, changeEndpoints) {
                var endpointFunc = null;
                if (changeEndpoints) {
                    endpointFunc = function (ep) {
                        var state = ep.isVisible();
                        ep.setVisible(!state);
                    };
                }
                _operation(elId, function (jpc) {
                    var state = jpc.isVisible();
                    jpc.setVisible(!state);
                }, endpointFunc);
            },

        // TODO comparison performance
            _getCachedData = function (elId) {
                var o = offsets[elId];
                if (!o)
                    return _updateOffset({elId: elId});
                else
                    return {o: o, s: sizes[elId]};
            },

            /**
             * gets an id for the given element, creating and setting one if
             * necessary.  the id is of the form
             *
             *    jsPlumb_<instance index>_<index in instance>
             *
             * where "index in instance" is a monotonically increasing integer that starts at 0,
             * for each instance.  this method is used not only to assign ids to elements that do not
             * have them but also to connections and endpoints.
             */
            _getId = function (element, uuid, doNotCreateIfNotFound) {
                if (jsPlumbUtil.isString(element)) return element;
                if (element == null) return null;
                var id = _currentInstance.getAttribute(element, "id");
                if (!id || id === "undefined") {
                    // check if fixed uuid parameter is given
                    if (arguments.length == 2 && arguments[1] !== undefined)
                        id = uuid;
                    else if (arguments.length == 1 || (arguments.length == 3 && !arguments[2]))
                        id = "jsPlumb_" + _instanceIndex + "_" + _idstamp();

                    if (!doNotCreateIfNotFound) _currentInstance.setAttribute(element, "id", id);
                }
                return id;
            };

        this.setConnectionBeingDragged = function (v) {
            connectionBeingDragged = v;
        };
        this.isConnectionBeingDragged = function () {
            return connectionBeingDragged;
        };

        /**
         * Returns a map of all the elements this jsPlumbInstance is currently managing.
         * @returns {Object} Map of [id-> {el, endpoint[], connection, position}] information.
         */
        this.getManagedElements = function() {
            return managedElements;
        };

        this.getRenderMode = function() { return "svg"; };

        this.connectorClass = "jsplumb-connector";
        this.connectorOutlineClass = "jsplumb-connector-outline";
        this.connectedClass = "jsplumb-connected";
        this.hoverClass = "jsplumb-hover";
        this.endpointClass = "jsplumb-endpoint";
        this.endpointConnectedClass = "jsplumb-endpoint-connected";
        this.endpointFullClass = "jsplumb-endpoint-full";
        this.endpointDropAllowedClass = "jsplumb-endpoint-drop-allowed";
        this.endpointDropForbiddenClass = "jsplumb-endpoint-drop-forbidden";
        this.overlayClass = "jsplumb-overlay";
        this.draggingClass = "jsplumb-dragging";
        this.elementDraggingClass = "jsplumb-element-dragging";
        this.sourceElementDraggingClass = "jsplumb-source-element-dragging";
        this.targetElementDraggingClass = "jsplumb-target-element-dragging";
        this.endpointAnchorClassPrefix = "jsplumb-endpoint-anchor";
        this.hoverSourceClass = "jsplumb-source-hover";
        this.hoverTargetClass = "jsplumb-target-hover";
        this.dragSelectClass = "jsplumb-drag-select";

        this.Anchors = {};
        this.Connectors = {  "svg": {} };
        this.Endpoints = { "svg": {} };
        this.Overlays = { "svg": {} } ;
        this.ConnectorRenderers = {};
        this.SVG = "svg";

// --------------------------- jsPlumbInstance public API ---------------------------------------------------------


        this.addEndpoint = function (el, params, referenceParams) {
            referenceParams = referenceParams || {};
            var p = jsPlumb.extend({}, referenceParams);
            jsPlumb.extend(p, params);
            p.endpoint = p.endpoint || _currentInstance.Defaults.Endpoint;
            p.paintStyle = p.paintStyle || _currentInstance.Defaults.EndpointStyle;

            var results = [],
                inputs = (_ju.isArray(el) || (el.length != null && !_ju.isString(el))) ? el : [ el ];

            for (var i = 0, j = inputs.length; i < j; i++) {
                p.source = _currentInstance.getElement(inputs[i]);
                _ensureContainer(p.source);

                var id = _getId(p.source), e = _newEndpoint(p, id);

                // SP new. here we have introduced a class-wide element manager, which is responsible
                // for getting object dimensions and width/height, and for updating these values only
                // when necessary (after a drag, or on a forced refresh call).
                var myOffset = _manage(id, p.source).info.o;
                _ju.addToList(endpointsByElement, id, e);

                if (!_suspendDrawing) {
                    e.paint({
                        anchorLoc: e.anchor.compute({ xy: [ myOffset.left, myOffset.top ], wh: sizes[id], element: e, timestamp: _suspendedAt }),
                        timestamp: _suspendedAt
                    });
                }

                results.push(e);
                e._doNotDeleteOnDetach = true; // mark this as being added via addEndpoint.
            }

            return results.length == 1 ? results[0] : results;
        };

        this.addEndpoints = function (el, endpoints, referenceParams) {
            var results = [];
            for (var i = 0, j = endpoints.length; i < j; i++) {
                var e = _currentInstance.addEndpoint(el, endpoints[i], referenceParams);
                if (_ju.isArray(e))
                    Array.prototype.push.apply(results, e);
                else results.push(e);
            }
            return results;
        };

        this.animate = function (el, properties, options) {
            if (!this.animationSupported) return false;

            options = options || {};
            var del = _currentInstance.getElement(el),
                id = _getId(del),
                stepFunction = jsPlumb.animEvents.step,
                completeFunction = jsPlumb.animEvents.complete;

            options[stepFunction] = _ju.wrap(options[stepFunction], function () {
                _currentInstance.revalidate(id);
            });

            // onComplete repaints, just to make sure everything looks good at the end of the animation.
            options[completeFunction] = _ju.wrap(options[completeFunction], function () {
                _currentInstance.revalidate(id);
            });

            _currentInstance.doAnimate(del, properties, options);
        };

        /**
         * checks for a listener for the given condition, executing it if found, passing in the given value.
         * condition listeners would have been attached using "bind" (which is, you could argue, now overloaded, since
         * firing click events etc is a bit different to what this does).  i thought about adding a "bindCondition"
         * or something, but decided against it, for the sake of simplicity. jsPlumb will never fire one of these
         * condition events anyway.
         */
        this.checkCondition = function (conditionName, args) {
            var l = _currentInstance.getListener(conditionName),
                r = true;

            if (l && l.length > 0) {
                var values = Array.prototype.slice.call(arguments, 1);
                try {
                    for (var i = 0, j = l.length; i < j; i++) {
                        r = r && l[i].apply(l[i], values);
                    }
                }
                catch (e) {
                    _ju.log(_currentInstance, "cannot check condition [" + conditionName + "]" + e);
                }
            }
            return r;
        };

        this.connect = function (params, referenceParams) {
            // prepare a final set of parameters to create connection with
            var _p = _prepareConnectionParams(params, referenceParams), jpc;
            // TODO probably a nicer return value if the connection was not made.  _prepareConnectionParams
            // will return null (and log something) if either endpoint was full.  what would be nicer is to
            // create a dedicated 'error' object.
            if (_p) {
                if (_p.source == null && _p.sourceEndpoint == null) {
                    jsPlumbUtil.log("Cannot establish connection - source does not exist");
                    return;
                }
                if (_p.target == null && _p.targetEndpoint == null) {
                    jsPlumbUtil.log("Cannot establish connection - target does not exist");
                    return;
                }
                _ensureContainer(_p.source);
                // create the connection.  it is not yet registered
                jpc = _newConnection(_p);
                // now add it the model, fire an event, and redraw
                _finaliseConnection(jpc, _p);
            }
            return jpc;
        };

        var stTypes = [
            { el: "source", elId: "sourceId", epDefs: "sourceEndpointDefinitions" },
            { el: "target", elId: "targetId", epDefs: "targetEndpointDefinitions" }
        ];

        var _set = function (c, el, idx, doNotRepaint) {
            var ep, _st = stTypes[idx], cId = c[_st.elId], cEl = c[_st.el], sid, sep,
                oldEndpoint = c.endpoints[idx];

            var evtParams = {
                index: idx,
                originalSourceId: idx === 0 ? cId : c.sourceId,
                newSourceId: c.sourceId,
                originalTargetId: idx == 1 ? cId : c.targetId,
                newTargetId: c.targetId,
                connection: c
            };

            if (el.constructor == jsPlumb.Endpoint) { // TODO here match the current endpoint class; users can change it {
                ep = el;
                ep.addConnection(c);
            }
            else {
                sid = _getId(el);
                sep = this[_st.epDefs][sid];

                if (sid === c[_st.elId])
                    ep = null;  // dont change source/target if the element is already the one given.
                else if (sep) {
                    for (var t in sep) {
                        if (!sep[t].enabled) return;
                        ep = sep[t].endpoint != null && sep[t].endpoint._jsPlumb ? sep[t].endpoint : this.addEndpoint(el, sep[t].def);
                        if (sep[t].uniqueEndpoint) sep[t].endpoint = ep;
                        ep._doNotDeleteOnDetach = false;
                        ep._deleteOnDetach = true;
                        ep.addConnection(c);
                    }
                }
                else {
                    ep = c.makeEndpoint(idx === 0, el, sid);
                    ep._doNotDeleteOnDetach = false;
                    ep._deleteOnDetach = true;
                }
            }

            if (ep != null) {
                oldEndpoint.detachFromConnection(c);
                c.endpoints[idx] = ep;
                c[_st.el] = ep.element;
                c[_st.elId] = ep.elementId;
                evtParams[idx === 0 ? "newSourceId" : "newTargetId"] = ep.elementId;

                fireMoveEvent(evtParams);

                if (!doNotRepaint)
                    c.repaint();
            }

            return evtParams;

        }.bind(this);

        this.setSource = function (connection, el, doNotRepaint) {
            var p = _set(connection, el, 0, doNotRepaint);
            this.anchorManager.sourceChanged(p.originalSourceId, p.newSourceId, connection);
        };
        this.setTarget = function (connection, el, doNotRepaint) {
            var p = _set(connection, el, 1, doNotRepaint);
            this.anchorManager.updateOtherEndpoint(p.originalSourceId, p.originalTargetId, p.newTargetId, connection);
        };

        this.deleteEndpoint = function (object, dontUpdateHover) {
            var endpoint = (typeof object === "string") ? endpointsByUUID[object] : object;
            if (endpoint) {
                _currentInstance.deleteObject({ endpoint: endpoint, dontUpdateHover: dontUpdateHover });
            }
            return _currentInstance;
        };

        this.deleteEveryEndpoint = function () {
            var _is = _currentInstance.setSuspendDrawing(true);
            for (var id in endpointsByElement) {
                var endpoints = endpointsByElement[id];
                if (endpoints && endpoints.length) {
                    for (var i = 0, j = endpoints.length; i < j; i++) {
                        _currentInstance.deleteEndpoint(endpoints[i], true);
                    }
                }
            }
            endpointsByElement = {};
            // SP new
            managedElements = {};
            endpointsByUUID = {};
            offsets = {};
            offsetTimestamps = {};
            _currentInstance.anchorManager.reset();
            _currentInstance.getDragManager().reset();
            if (!_is) _currentInstance.setSuspendDrawing(false);
            return _currentInstance;
        };

        var fireDetachEvent = function (jpc, doFireEvent, originalEvent) {
            // may have been given a connection, or in special cases, an object
            var connType = _currentInstance.Defaults.ConnectionType || _currentInstance.getDefaultConnectionType(),
                argIsConnection = jpc.constructor == connType,
                params = argIsConnection ? {
                    connection: jpc,
                    source: jpc.source, target: jpc.target,
                    sourceId: jpc.sourceId, targetId: jpc.targetId,
                    sourceEndpoint: jpc.endpoints[0], targetEndpoint: jpc.endpoints[1]
                } : jpc;

            if (doFireEvent)
                _currentInstance.fire("connectionDetached", params, originalEvent);

            _currentInstance.anchorManager.connectionDetached(params);
        };

        var fireMoveEvent = _currentInstance.fireMoveEvent = function (params, evt) {
            _currentInstance.fire("connectionMoved", params, evt);
        };

        this.unregisterEndpoint = function (endpoint) {
            //if (endpoint._jsPlumb == null) return;
            if (endpoint._jsPlumb.uuid) endpointsByUUID[endpoint._jsPlumb.uuid] = null;
            _currentInstance.anchorManager.deleteEndpoint(endpoint);
            // TODO at least replace this with a removeWithFunction call.
            for (var e in endpointsByElement) {
                var endpoints = endpointsByElement[e];
                if (endpoints) {
                    var newEndpoints = [];
                    for (var i = 0, j = endpoints.length; i < j; i++)
                        if (endpoints[i] != endpoint) newEndpoints.push(endpoints[i]);

                    endpointsByElement[e] = newEndpoints;
                }
                if (endpointsByElement[e].length < 1) {
                    delete endpointsByElement[e];
                }
            }
        };

        this.detach = function () {

            if (arguments.length === 0) return;
            var connType = _currentInstance.Defaults.ConnectionType || _currentInstance.getDefaultConnectionType(),
                firstArgIsConnection = arguments[0].constructor == connType,
                params = arguments.length == 2 ? firstArgIsConnection ? (arguments[1] || {}) : arguments[0] : arguments[0],
                fireEvent = (params.fireEvent !== false),
                forceDetach = params.forceDetach,
                conn = firstArgIsConnection ? arguments[0] : params.connection;

            if (conn) {
                if (forceDetach || jsPlumbUtil.functionChain(true, false, [
                    [ conn.endpoints[0], "isDetachAllowed", [ conn ] ],
                    [ conn.endpoints[1], "isDetachAllowed", [ conn ] ],
                    [ conn, "isDetachAllowed", [ conn ] ],
                    [ _currentInstance, "checkCondition", [ "beforeDetach", conn ] ]
                ])) {

                    conn.endpoints[0].detach(conn, false, true, fireEvent);
                }
            }
            else {
                var _p = jsPlumb.extend({}, params); // a backwards compatibility hack: source should be thought of as 'params' in this case.
                // test for endpoint uuids to detach
                if (_p.uuids) {
                    _getEndpoint(_p.uuids[0]).detachFrom(_getEndpoint(_p.uuids[1]), fireEvent);
                } else if (_p.sourceEndpoint && _p.targetEndpoint) {
                    _p.sourceEndpoint.detachFrom(_p.targetEndpoint);
                } else {
                    var sourceId = _getId(_currentInstance.getElement(_p.source)),
                        targetId = _getId(_currentInstance.getElement(_p.target));
                    _operation(sourceId, function (jpc) {
                        if ((jpc.sourceId == sourceId && jpc.targetId == targetId) || (jpc.targetId == sourceId && jpc.sourceId == targetId)) {
                            if (_currentInstance.checkCondition("beforeDetach", jpc)) {
                                jpc.endpoints[0].detach(jpc, false, true, fireEvent);
                            }
                        }
                    });
                }
            }
        };

        this.detachAllConnections = function (el, params) {
            params = params || {};
            el = _currentInstance.getElement(el);
            var id = _getId(el),
                endpoints = endpointsByElement[id];
            if (endpoints && endpoints.length) {
                for (var i = 0, j = endpoints.length; i < j; i++) {
                    endpoints[i].detachAll(params.fireEvent !== false, params.forceDetach);
                }
            }
            return _currentInstance;
        };

        this.detachEveryConnection = function (params) {
            params = params || {};
            _currentInstance.batch(function () {
                for (var id in endpointsByElement) {
                    var endpoints = endpointsByElement[id];
                    if (endpoints && endpoints.length) {
                        for (var i = 0, j = endpoints.length; i < j; i++) {
                            endpoints[i].detachAll(params.fireEvent !== false, params.forceDetach);
                        }
                    }
                }
                connections.length = 0;
            });
            return _currentInstance;
        };

        /// not public.  but of course its exposed. how to change this.
        this.deleteObject = function (params) {
            var result = {
                    endpoints: {},
                    connections: {},
                    endpointCount: 0,
                    connectionCount: 0
                },
                fireEvent = params.fireEvent !== false,
                deleteAttachedObjects = params.deleteAttachedObjects !== false;

            var unravelConnection = function (connection) {
                if (connection != null && result.connections[connection.id] == null) {
                    if (!params.dontUpdateHover && connection._jsPlumb != null) connection.setHover(false);
                    result.connections[connection.id] = connection;
                    result.connectionCount++;
                    if (deleteAttachedObjects) {
                        for (var j = 0; j < connection.endpoints.length; j++) {
                            if (connection.endpoints[j]._deleteOnDetach)
                                unravelEndpoint(connection.endpoints[j]);
                        }
                    }
                }
            };
            var unravelEndpoint = function (endpoint) {
                if (endpoint != null && result.endpoints[endpoint.id] == null) {
                    if (!params.dontUpdateHover && endpoint._jsPlumb != null) endpoint.setHover(false);
                    result.endpoints[endpoint.id] = endpoint;
                    result.endpointCount++;

                    if (deleteAttachedObjects) {
                        for (var i = 0; i < endpoint.connections.length; i++) {
                            var c = endpoint.connections[i];
                            unravelConnection(c);
                        }
                    }
                }
            };

            if (params.connection)
                unravelConnection(params.connection);
            else unravelEndpoint(params.endpoint);

            // loop through connections
            for (var i in result.connections) {
                var c = result.connections[i];
                if (c._jsPlumb) {
                    jsPlumbUtil.removeWithFunction(connections, function (_c) {
                        return c.id == _c.id;
                    });

                    fireDetachEvent(c, params.fireEvent === false ? false : !c.pending, params.originalEvent);

                    c.endpoints[0].detachFromConnection(c);
                    c.endpoints[1].detachFromConnection(c);
                    c.cleanup(true);
                    c.destroy(true);
                }
            }

            // loop through endpoints
            for (var j in result.endpoints) {
                var e = result.endpoints[j];
                if (e._jsPlumb) {
                    _currentInstance.unregisterEndpoint(e);
                    // FIRE some endpoint deleted event?
                    e.cleanup(true);
                    e.destroy(true);
                }
            }

            return result;
        };

        this.draggable = function (el, options) {
            var info;
            _each(function(_el) {
                 info = _info(_el);
                if (info.el) _initDraggableIfNecessary(info.el, true, options, info.id);
            }, el);
            return _currentInstance;
        };

        this.droppable = function(el, options) {
            var info;
            options = options || {};
            options.allowLoopback = false;
            _each(function(_el) {
                info = _info(_el);
                if (info.el) _currentInstance.initDroppable(info.el, options);
            }, el);
            return _currentInstance;
        };

        // helpers for select/selectEndpoints
        var _setOperation = function (list, func, args, selector) {
                for (var i = 0, j = list.length; i < j; i++) {
                    list[i][func].apply(list[i], args);
                }
                return selector(list);
            },
            _getOperation = function (list, func, args) {
                var out = [];
                for (var i = 0, j = list.length; i < j; i++) {
                    out.push([ list[i][func].apply(list[i], args), list[i] ]);
                }
                return out;
            },
            setter = function (list, func, selector) {
                return function () {
                    return _setOperation(list, func, arguments, selector);
                };
            },
            getter = function (list, func) {
                return function () {
                    return _getOperation(list, func, arguments);
                };
            },
            prepareList = function (input, doNotGetIds) {
                var r = [];
                if (input) {
                    if (typeof input == 'string') {
                        if (input === "*") return input;
                        r.push(input);
                    }
                    else {
                        if (doNotGetIds) r = input;
                        else {
                            if (input.length) {
                                for (var i = 0, j = input.length; i < j; i++)
                                    r.push(_info(input[i]).id);
                            }
                            else
                                r.push(_info(input).id);
                        }
                    }
                }
                return r;
            },
            filterList = function (list, value, missingIsFalse) {
                if (list === "*") return true;
                return list.length > 0 ? list.indexOf(value) != -1 : !missingIsFalse;
            };

        // get some connections, specifying source/target/scope
        this.getConnections = function (options, flat) {
            if (!options) {
                options = {};
            } else if (options.constructor == String) {
                options = { "scope": options };
            }
            var scope = options.scope || _currentInstance.getDefaultScope(),
                scopes = prepareList(scope, true),
                sources = prepareList(options.source),
                targets = prepareList(options.target),
                results = (!flat && scopes.length > 1) ? {} : [],
                _addOne = function (scope, obj) {
                    if (!flat && scopes.length > 1) {
                        var ss = results[scope];
                        if (ss == null) {
                            ss = results[scope] = [];
                        }
                        ss.push(obj);
                    } else results.push(obj);
                };

            for (var j = 0, jj = connections.length; j < jj; j++) {
                var c = connections[j];
                if (filterList(scopes, c.scope) && filterList(sources, c.sourceId) && filterList(targets, c.targetId))
                    _addOne(c.scope, c);
            }

            return results;
        };

        var _curryEach = function (list, executor) {
                return function (f) {
                    for (var i = 0, ii = list.length; i < ii; i++) {
                        f(list[i]);
                    }
                    return executor(list);
                };
            },
            _curryGet = function (list) {
                return function (idx) {
                    return list[idx];
                };
            };

        var _makeCommonSelectHandler = function (list, executor) {
            var out = {
                    length: list.length,
                    each: _curryEach(list, executor),
                    get: _curryGet(list)
                },
                setters = ["setHover", "removeAllOverlays", "setLabel", "addClass", "addOverlay", "removeOverlay",
                    "removeOverlays", "showOverlay", "hideOverlay", "showOverlays", "hideOverlays", "setPaintStyle",
                    "setHoverPaintStyle", "setSuspendEvents", "setParameter", "setParameters", "setVisible",
                    "repaint", "addType", "toggleType", "removeType", "removeClass", "setType", "bind", "unbind" ],

                getters = ["getLabel", "getOverlay", "isHover", "getParameter", "getParameters", "getPaintStyle",
                    "getHoverPaintStyle", "isVisible", "hasType", "getType", "isSuspendEvents" ],
                i, ii;

            for (i = 0, ii = setters.length; i < ii; i++)
                out[setters[i]] = setter(list, setters[i], executor);

            for (i = 0, ii = getters.length; i < ii; i++)
                out[getters[i]] = getter(list, getters[i]);

            return out;
        };

        var _makeConnectionSelectHandler = function (list) {
            var common = _makeCommonSelectHandler(list, _makeConnectionSelectHandler);
            return jsPlumb.extend(common, {
                // setters
                setDetachable: setter(list, "setDetachable", _makeConnectionSelectHandler),
                setReattach: setter(list, "setReattach", _makeConnectionSelectHandler),
                setConnector: setter(list, "setConnector", _makeConnectionSelectHandler),
                detach: function () {
                    for (var i = 0, ii = list.length; i < ii; i++)
                        _currentInstance.detach(list[i]);
                },
                // getters
                isDetachable: getter(list, "isDetachable"),
                isReattach: getter(list, "isReattach")
            });
        };

        var _makeEndpointSelectHandler = function (list) {
            var common = _makeCommonSelectHandler(list, _makeEndpointSelectHandler);
            return jsPlumb.extend(common, {
                setEnabled: setter(list, "setEnabled", _makeEndpointSelectHandler),
                setAnchor: setter(list, "setAnchor", _makeEndpointSelectHandler),
                isEnabled: getter(list, "isEnabled"),
                detachAll: function () {
                    for (var i = 0, ii = list.length; i < ii; i++)
                        list[i].detachAll();
                },
                "remove": function () {
                    for (var i = 0, ii = list.length; i < ii; i++)
                        _currentInstance.deleteObject({endpoint: list[i]});
                }
            });
        };

        this.select = function (params) {
            params = params || {};
            params.scope = params.scope || "*";
            return _makeConnectionSelectHandler(params.connections || _currentInstance.getConnections(params, true));
        };

        this.selectEndpoints = function (params) {
            params = params || {};
            params.scope = params.scope || "*";
            var noElementFilters = !params.element && !params.source && !params.target,
                elements = noElementFilters ? "*" : prepareList(params.element),
                sources = noElementFilters ? "*" : prepareList(params.source),
                targets = noElementFilters ? "*" : prepareList(params.target),
                scopes = prepareList(params.scope, true);

            var ep = [];

            for (var el in endpointsByElement) {
                var either = filterList(elements, el, true),
                    source = filterList(sources, el, true),
                    sourceMatchExact = sources != "*",
                    target = filterList(targets, el, true),
                    targetMatchExact = targets != "*";

                // if they requested 'either' then just match scope. otherwise if they requested 'source' (not as a wildcard) then we have to match only endpoints that have isSource set to to true, and the same thing with isTarget.
                if (either || source || target) {
                    inner:
                        for (var i = 0, ii = endpointsByElement[el].length; i < ii; i++) {
                            var _ep = endpointsByElement[el][i];
                            if (filterList(scopes, _ep.scope, true)) {

                                var noMatchSource = (sourceMatchExact && sources.length > 0 && !_ep.isSource),
                                    noMatchTarget = (targetMatchExact && targets.length > 0 && !_ep.isTarget);

                                if (noMatchSource || noMatchTarget)
                                    continue inner;

                                ep.push(_ep);
                            }
                        }
                }
            }

            return _makeEndpointSelectHandler(ep);
        };

        // get all connections managed by the instance of jsplumb.
        this.getAllConnections = function () {
            return connections;
        };
        this.getDefaultScope = function () {
            return DEFAULT_SCOPE;
        };
        // get an endpoint by uuid.
        this.getEndpoint = _getEndpoint;
        // get endpoints for some element.
        this.getEndpoints = function (el) {
            return endpointsByElement[_info(el).id];
        };
        // gets the default endpoint type. used when subclassing. see wiki.
        this.getDefaultEndpointType = function () {
            return jsPlumb.Endpoint;
        };
        // gets the default connection type. used when subclassing.  see wiki.
        this.getDefaultConnectionType = function () {
            return jsPlumb.Connection;
        };
        /*
         * Gets an element's id, creating one if necessary. really only exposed
         * for the lib-specific functionality to access; would be better to pass
         * the current instance into the lib-specific code (even though this is
         * a static call. i just don't want to expose it to the public API).
         */
        this.getId = _getId;

        this.appendElement = _appendElement;

        var _hoverSuspended = false;
        this.isHoverSuspended = function () {
            return _hoverSuspended;
        };
        this.setHoverSuspended = function (s) {
            _hoverSuspended = s;
        };

        // set an element's connections to be hidden
        this.hide = function (el, changeEndpoints) {
            _setVisible(el, "none", changeEndpoints);
            return _currentInstance;
        };

        // exposed for other objects to use to get a unique id.
        this.idstamp = _idstamp;

        this.connectorsInitialized = false;
        this.registerConnectorType = function (connector, name) {
            connectorTypes.push([connector, name]);
        };

        // ensure that, if the current container exists, it is a DOM element and not a selector.
        // if it does not exist and `candidate` is supplied, the offset parent of that element will be set as the Container.
        // this is used to do a better default behaviour for the case that the user has not set a container:
        // addEndpoint, makeSource, makeTarget and connect all call this method with the offsetParent of the
        // element in question (for connect it is the source element). So if no container is set, it is inferred
        // to be the offsetParent of the first element the user tries to connect.
        var _ensureContainer = function (candidate) {
            if (!_container && candidate) {
                var can = _currentInstance.getElement(candidate);
                if (can.offsetParent) _currentInstance.setContainer(can.offsetParent);
            }
        };

        var _getContainerFromDefaults = function () {
            if (_currentInstance.Defaults.Container)
                _currentInstance.setContainer(_currentInstance.Defaults.Container);
        };

        // check if a given element is managed or not. if not, add to our map. if drawing is not suspended then
        // we'll also stash its dimensions; otherwise we'll do this in a lazy way through updateOffset.
        var _manage = _currentInstance.manage = function (id, element, transient) {
            if (!managedElements[id]) {
                managedElements[id] = {
                    el: element,
                    endpoints: [],
                    connections: []
                };

                managedElements[id].info = _updateOffset({ elId: id, timestamp: _suspendedAt });
                if (!transient) {
                    _currentInstance.fire("manageElement", { id:id, info:managedElements[id].info, el:element });
                }
            }

            return managedElements[id];
        };

        var _unmanage = function(id) {
            if (managedElements[id]) {
                delete managedElements[id];
                _currentInstance.fire("unmanageElement", id);
            }
        };

        /**
         * updates the offset and size for a given element, and stores the
         * values. if 'offset' is not null we use that (it would have been
         * passed in from a drag call) because it's faster; but if it is null,
         * or if 'recalc' is true in order to force a recalculation, we get the current values.
         */
        var _updateOffset = this.updateOffset = function (params) {

            var timestamp = params.timestamp, recalc = params.recalc, offset = params.offset, elId = params.elId, s;
            if (_suspendDrawing && !timestamp) timestamp = _suspendedAt;
            if (!recalc) {
                if (timestamp && timestamp === offsetTimestamps[elId]) {
                    return {o: params.offset || offsets[elId], s: sizes[elId]};
                }
            }
            if (recalc || (!offset && offsets[elId] == null)) { // if forced repaint or no offset available, we recalculate.

                // get the current size and offset, and store them
                s = managedElements[elId] ? managedElements[elId].el : null;
                if (s != null) {
                    sizes[elId] = _currentInstance.getSize(s);
                    offsets[elId] = _currentInstance.getOffset(s);
                    offsetTimestamps[elId] = timestamp;
                }
            } else {
                offsets[elId] = offset || offsets[elId];
                if (sizes[elId] == null) {
                    s = managedElements[elId].el;
                    if (s != null) sizes[elId] = _currentInstance.getSize(s);
                }
                offsetTimestamps[elId] = timestamp;
            }

            if (offsets[elId] && !offsets[elId].right) {
                offsets[elId].right = offsets[elId].left + sizes[elId][0];
                offsets[elId].bottom = offsets[elId].top + sizes[elId][1];
                offsets[elId].width = sizes[elId][0];
                offsets[elId].height = sizes[elId][1];
                offsets[elId].centerx = offsets[elId].left + (offsets[elId].width / 2);
                offsets[elId].centery = offsets[elId].top + (offsets[elId].height / 2);
            }

            return {o: offsets[elId], s: sizes[elId]};
        };

        /**
         * callback from the current library to tell us to prepare ourselves (attach
         * mouse listeners etc; can't do that until the library has provided a bind method)
         */
        this.init = function () {
            rendererTypes = jsPlumb.getRenderModes();

            var _oneType = function (renderer, name, fn) {
                jsPlumb.Connectors[renderer][name] = function () {
                    fn.apply(this, arguments);
                    jsPlumb.ConnectorRenderers[renderer].apply(this, arguments);
                };
                jsPlumbUtil.extend(jsPlumb.Connectors[renderer][name], [ fn, jsPlumb.ConnectorRenderers[renderer]]);
            };

            if (!jsPlumb.connectorsInitialized) {
                for (var i = 0; i < connectorTypes.length; i++) {
                    for (var j = 0; j < rendererTypes.length; j++) {
                        _oneType(rendererTypes[j], connectorTypes[i][1], connectorTypes[i][0]);
                    }

                }
                jsPlumb.connectorsInitialized = true;
            }

            if (!initialized) {
                _getContainerFromDefaults();
                _currentInstance.anchorManager = new jsPlumb.AnchorManager({jsPlumbInstance: _currentInstance});
                initialized = true;
                _currentInstance.fire("ready", _currentInstance);
            }
        }.bind(this);

        this.log = log;
        this.jsPlumbUIComponent = jsPlumbUIComponent;

        /*
         * Creates an anchor with the given params.
         *
         *
         * Returns: The newly created Anchor.
         * Throws: an error if a named anchor was not found.
         */
        this.makeAnchor = function () {
            var pp, _a = function (t, p) {
                if (jsPlumb.Anchors[t]) return new jsPlumb.Anchors[t](p);
                if (!_currentInstance.Defaults.DoNotThrowErrors)
                    throw { msg: "jsPlumb: unknown anchor type '" + t + "'" };
            };
            if (arguments.length === 0) return null;
            var specimen = arguments[0], elementId = arguments[1], jsPlumbInstance = arguments[2], newAnchor = null;
            // if it appears to be an anchor already...
            if (specimen.compute && specimen.getOrientation) return specimen;  //TODO hazy here about whether it should be added or is already added somehow.
            // is it the name of an anchor type?
            else if (typeof specimen == "string") {
                newAnchor = _a(arguments[0], {elementId: elementId, jsPlumbInstance: _currentInstance});
            }
            // is it an array? it will be one of:
            // 		an array of [spec, params] - this defines a single anchor, which may be dynamic, but has parameters.
            //		an array of arrays - this defines some dynamic anchors
            //		an array of numbers - this defines a single anchor.
            else if (_ju.isArray(specimen)) {
                if (_ju.isArray(specimen[0]) || _ju.isString(specimen[0])) {
                    // if [spec, params] format
                    if (specimen.length == 2 && _ju.isObject(specimen[1])) {
                        // if first arg is a string, its a named anchor with params
                        if (_ju.isString(specimen[0])) {
                            pp = jsPlumb.extend({elementId: elementId, jsPlumbInstance: _currentInstance}, specimen[1]);
                            newAnchor = _a(specimen[0], pp);
                        }
                        // otherwise first arg is array, second is params. we treat as a dynamic anchor, which is fine
                        // even if the first arg has only one entry. you could argue all anchors should be implicitly dynamic in fact.
                        else {
                            pp = jsPlumb.extend({elementId: elementId, jsPlumbInstance: _currentInstance, anchors: specimen[0]}, specimen[1]);
                            newAnchor = new jsPlumb.DynamicAnchor(pp);
                        }
                    }
                    else
                        newAnchor = new jsPlumb.DynamicAnchor({anchors: specimen, selector: null, elementId: elementId, jsPlumbInstance: _currentInstance});

                }
                else {
                    var anchorParams = {
                        x: specimen[0], y: specimen[1],
                        orientation: (specimen.length >= 4) ? [ specimen[2], specimen[3] ] : [0, 0],
                        offsets: (specimen.length >= 6) ? [ specimen[4], specimen[5] ] : [ 0, 0 ],
                        elementId: elementId,
                        jsPlumbInstance: _currentInstance,
                        cssClass: specimen.length == 7 ? specimen[6] : null
                    };
                    newAnchor = new jsPlumb.Anchor(anchorParams);
                    newAnchor.clone = function () {
                        return new jsPlumb.Anchor(anchorParams);
                    };
                }
            }

            if (!newAnchor.id) newAnchor.id = "anchor_" + _idstamp();
            return newAnchor;
        };

        /**
         * makes a list of anchors from the given list of types or coords, eg
         * ["TopCenter", "RightMiddle", "BottomCenter", [0, 1, -1, -1] ]
         */
        this.makeAnchors = function (types, elementId, jsPlumbInstance) {
            var r = [];
            for (var i = 0, ii = types.length; i < ii; i++) {
                if (typeof types[i] == "string")
                    r.push(jsPlumb.Anchors[types[i]]({elementId: elementId, jsPlumbInstance: jsPlumbInstance}));
                else if (_ju.isArray(types[i]))
                    r.push(_currentInstance.makeAnchor(types[i], elementId, jsPlumbInstance));
            }
            return r;
        };

        /**
         * Makes a dynamic anchor from the given list of anchors (which may be in shorthand notation as strings or dimension arrays, or Anchor
         * objects themselves) and the given, optional, anchorSelector function (jsPlumb uses a default if this is not provided; most people will
         * not need to provide this - i think).
         */
        this.makeDynamicAnchor = function (anchors, anchorSelector) {
            return new jsPlumb.DynamicAnchor({anchors: anchors, selector: anchorSelector, elementId: null, jsPlumbInstance: _currentInstance});
        };

// --------------------- makeSource/makeTarget ---------------------------------------------- 

        this.targetEndpointDefinitions = {};
        var _setEndpointPaintStylesAndAnchor = function (ep, epIndex, _instance) {
           /* ep.paintStyle = ep.paintStyle ||
                _instance.Defaults.EndpointStyles[epIndex] ||
                _instance.Defaults.EndpointStyle;

            ep.hoverPaintStyle = ep.hoverPaintStyle ||
                _instance.Defaults.EndpointHoverStyles[epIndex] ||
                _instance.Defaults.EndpointHoverStyle;

            ep.anchor = ep.anchor ||
                _instance.Defaults.Anchors[epIndex] ||
                _instance.Defaults.Anchor;

            ep.endpoint = ep.endpoint ||
                _instance.Defaults.Endpoints[epIndex] ||
                _instance.Defaults.Endpoint;*/
        };

        // TODO put all the source stuff inside one parent, keyed by id.
        this.sourceEndpointDefinitions = {};

        var selectorFilter = function (evt, _el, selector, _instance, negate) {
            var t = evt.target || evt.srcElement, ok = false,
                sel = _instance.getSelector(_el, selector);
            for (var j = 0; j < sel.length; j++) {
                if (sel[j] == t) {
                    ok = true;
                    break;
                }
            }
            return negate ? !ok : ok;
        };

        // SP target source refactor
        var _makeElementDropHandler = function (elInfo, p, dropOptions, isSource, isTarget) {
            var proxyComponent = new jsPlumbUIComponent(p);
            var _drop = p._jsPlumb.EndpointDropHandler({
                jsPlumb: _currentInstance,
                enabled: function () {
                    return elInfo.def.enabled;
                },
                isFull: function () {
                    var targetCount = _currentInstance.select({target: elInfo.id}).length;
                    return elInfo.def.maxConnections > 0 && targetCount >= elInfo.def.maxConnections;
                },
                element: elInfo.el,
                elementId: elInfo.id,
                isSource: isSource,
                isTarget: isTarget,
                addClass: function (clazz) {
                    _currentInstance.addClass(elInfo.el, clazz);
                },
                removeClass: function (clazz) {
                    _currentInstance.removeClass(elInfo.el, clazz);
                },
                onDrop: function (jpc) {
                    var source = jpc.endpoints[0];
                    source.anchor.locked = false;
                },
                isDropAllowed: function () {
                    return proxyComponent.isDropAllowed.apply(proxyComponent, arguments);
                },
                isRedrop:function(jpc) {
                    return (jpc.suspendedElement != null && jpc.suspendedEndpoint != null && jpc.suspendedEndpoint.element === elInfo.el);
                },
                getEndpoint: function (jpc) {

                    // make a new Endpoint for the target, or get it from the cache if uniqueEndpoint
                    // is set. if its a redrop the new endpoint will be immediately cleaned up.

                    var newEndpoint = elInfo.def.endpoint;

                    // if no cached endpoint, or there was one but it has been cleaned up
                    // (ie. detached), create a new one
                    if (newEndpoint == null || newEndpoint._jsPlumb == null) {
                        var eps = _currentInstance.deriveEndpointAndAnchorSpec(jpc.getType().join(" "), true);
                        var pp = eps.endpoints ? jsPlumb.extend(p, {
                            endpoint:elInfo.def.def.endpoint || eps.endpoints[1]
                        }) :p;
                        if (eps.anchors) {
                            pp = jsPlumb.extend(pp, {
                                anchor:elInfo.def.def.anchor || eps.anchors[1]
                            });
                        }
                        newEndpoint = _currentInstance.addEndpoint(elInfo.el, pp);
                        newEndpoint._mtNew = true;
                    }

                    if (p.uniqueEndpoint) elInfo.def.endpoint = newEndpoint;  // may of course just store what it just pulled out. that's ok.
                    // TODO test options to makeTarget to see if we should do this?
                    newEndpoint._doNotDeleteOnDetach = false; // reset.
                    newEndpoint._deleteOnDetach = true;

                    // if connection is detachable, init the new endpoint to be draggable, to support that happening.
                    if (jpc.isDetachable())
                        newEndpoint.initDraggable();

                    // if the anchor has a 'positionFinder' set, then delegate to that function to find
                    // out where to locate the anchor.
                    if (newEndpoint.anchor.positionFinder != null) {
                        var dropPosition = _currentInstance.getUIPosition(arguments, _currentInstance.getZoom()),
                            elPosition = _currentInstance.getOffset(elInfo.el),
                            elSize = _currentInstance.getSize(elInfo.el),
                            ap = newEndpoint.anchor.positionFinder(dropPosition, elPosition, elSize, newEndpoint.anchor.constructorParams);

                        newEndpoint.anchor.x = ap[0];
                        newEndpoint.anchor.y = ap[1];
                        // now figure an orientation for it..kind of hard to know what to do actually. probably the best thing i can do is to
                        // support specifying an orientation in the anchor's spec. if one is not supplied then i will make the orientation
                        // be what will cause the most natural link to the source: it will be pointing at the source, but it needs to be
                        // specified in one axis only, and so how to make that choice? i think i will use whichever axis is the one in which
                        // the target is furthest away from the source.
                    }

                    return newEndpoint;
                },
                maybeCleanup: function (ep) {
                    if (ep._mtNew && ep.connections.length === 0) {
                        _currentInstance.deleteObject({endpoint: ep});
                    }
                    else
                        delete ep._mtNew;
                }
            });

            // wrap drop events as needed and initialise droppable
            var dropEvent = jsPlumb.dragEvents.drop;
            dropOptions.scope = dropOptions.scope || (p.scope || _currentInstance.Defaults.Scope);
            dropOptions[dropEvent] = _ju.wrap(dropOptions[dropEvent], _drop, true);

            // if target, return true from the over event. this will cause katavorio to stop setting drops to hover
            // if multipleDrop is set to false.
            if (isTarget) {
                dropOptions[jsPlumb.dragEvents.over] = function () { return true; };
            }

            // vanilla jsplumb only
            if (p.allowLoopback === false) {
                dropOptions.canDrop = function (_drag) {
                    var de = _drag.getDragElement()._jsPlumbRelatedElement;
                    return de != elInfo.el;
                };
            }
            _currentInstance.initDroppable(elInfo.el, dropOptions, "internal");

            return _drop;

        };

        // see API docs
        this.makeTarget = function (el, params, referenceParams) {

            // put jsplumb ref into params without altering the params passed in
            var p = jsPlumb.extend({_jsPlumb: this}, referenceParams);
            jsPlumb.extend(p, params);

            // calculate appropriate paint styles and anchor from the params given
            _setEndpointPaintStylesAndAnchor(p, 1, this);

            var deleteEndpointsOnDetach = !(p.deleteEndpointsOnDetach === false),
                maxConnections = p.maxConnections || -1,

                _doOne = function (el) {

                    // get the element's id and store the endpoint definition for it.  jsPlumb.connect calls will look for one of these,
                    // and use the endpoint definition if found.
                    // decode the info for this element (id and element)
                    var elInfo = _info(el),
                        elid = elInfo.id,
                        dropOptions = jsPlumb.extend({}, p.dropOptions || {}),
                        type = "default";

                    this.targetEndpointDefinitions[elid] = this.targetEndpointDefinitions[elid] || {};

                    _ensureContainer(elid);

                    // store the definition
                    var _def = {
                        def: jsPlumb.extend({}, p),
                        uniqueEndpoint: p.uniqueEndpoint,
                        maxConnections: maxConnections,
                        enabled: true
                    };
                    elInfo.def = _def;
                    this.targetEndpointDefinitions[elid][type] = _def;
                    _makeElementDropHandler(elInfo, p, dropOptions, p.isSource === true, true);

                }.bind(this);

            // make an array if only given one element
            var inputs = el.length && el.constructor != String ? el : [ el ];

            // register each one in the list.
            for (var i = 0, ii = inputs.length; i < ii; i++) {
                _doOne(inputs[i]);
            }

            return this;
        };

        // see api docs
        this.unmakeTarget = function (el, doNotClearArrays) {
            var info = _info(el);
            jsPlumb.destroyDroppable(info.el);
            if (!doNotClearArrays) {
                delete this.targetEndpointDefinitions[info.id];
            }

            return this;
        };

        // see api docs
        this.makeSource = function (el, params, referenceParams) {
            var p = jsPlumb.extend({_jsPlumb: this}, referenceParams);
            jsPlumb.extend(p, params);
            var type = p.connectionType || "default";
            var aae = _currentInstance.deriveEndpointAndAnchorSpec(type);
            p.endpoint = p.endpoint || aae.endpoints[0];
            p.anchor = p.anchor || aae.anchors[0];
            _setEndpointPaintStylesAndAnchor(p, 0, this);
            var maxConnections = p.maxConnections || -1,
                onMaxConnections = p.onMaxConnections,
                _doOne = function (elInfo) {
                    // get the element's id and store the endpoint definition for it.  jsPlumb.connect calls will look for one of these,
                    // and use the endpoint definition if found.
                    var elid = elInfo.id,
                        _del = this.getElement(elInfo.el);

                    this.sourceEndpointDefinitions[elid] = this.sourceEndpointDefinitions[elid] || {};
                    _ensureContainer(elid);

                    var _def = {
                        def:jsPlumb.extend({}, p),
                        uniqueEndpoint: p.uniqueEndpoint,
                        maxConnections: maxConnections,
                        enabled: true
                    };


                    this.sourceEndpointDefinitions[elid][type] = _def;
                    elInfo.def = _def;

                    var stopEvent = jsPlumb.dragEvents.stop,
                        dragEvent = jsPlumb.dragEvents.drag,
                        dragOptions = jsPlumb.extend({ }, p.dragOptions || {}),
                        existingDrag = dragOptions.drag,
                        existingStop = dragOptions.stop,
                        ep = null,
                        endpointAddedButNoDragYet = false;

                    // set scope if its not set in dragOptions but was passed in in params
                    dragOptions.scope = dragOptions.scope || p.scope;

                    dragOptions[dragEvent] = _ju.wrap(dragOptions[dragEvent], function () {
                        if (existingDrag) existingDrag.apply(this, arguments);
                        endpointAddedButNoDragYet = false;
                    });

                    dragOptions[stopEvent] = _ju.wrap(dragOptions[stopEvent], function () {

                        if (existingStop) existingStop.apply(this, arguments);
                        this.currentlyDragging = false;
                        if (ep._jsPlumb != null) { // if not cleaned up...

                            // reset the anchor to the anchor that was initially provided. the one we were using to drag
                            // the connection was just a placeholder that was located at the place the user pressed the
                            // mouse button to initiate the drag.
                            var anchorDef = p.anchor || this.Defaults.Anchor,
                                oldAnchor = ep.anchor,
                                oldConnection = ep.connections[0];

                            // if the connection has a type, try to get an anchor spec for it.
                            /*if (oldConnection != null) {
                                var aae = _currentInstance.deriveEndpointAndAnchorSpec(oldConnection.getType().join(" "), false);
                                if (aae.anchors) anchorDef = aae.anchor[0];
                                if (aae.endpoints) ep.setEndpoint(aae.endpoints[0]);
                            }*/

                            var    newAnchor = this.makeAnchor(anchorDef, elid, this),
                                _el = ep.element;

                            // if the anchor has a 'positionFinder' set, then delegate to that function to find
                            // out where to locate the anchor. issue 117.
                            if (newAnchor.positionFinder != null) {
                                var elPosition = _currentInstance.getOffset(_el),
                                    elSize = this.getSize(_el),
                                    dropPosition = { left: elPosition.left + (oldAnchor.x * elSize[0]), top: elPosition.top + (oldAnchor.y * elSize[1]) },
                                    ap = newAnchor.positionFinder(dropPosition, elPosition, elSize, newAnchor.constructorParams);

                                newAnchor.x = ap[0];
                                newAnchor.y = ap[1];
                            }

                            ep.setAnchor(newAnchor, true);
                            ep.repaint();
                            this.repaint(ep.elementId);
                            if (oldConnection != null) this.repaint(oldConnection.targetId);
                        }
                    }.bind(this));

                    // when the user presses the mouse, add an Endpoint, if we are enabled.
                    var mouseDownListener = function (e) {
                        // on right mouse button, abort.
                        if (e.which === 3 || e.button === 2) return;

                        // TODO store def on element.
                        var def = this.sourceEndpointDefinitions[elid][type];

                        // if disabled, return.
                        if (!def.enabled) return;

                        elid = this.getId(this.getElement(elInfo.el)); // elid might have changed since this method was called to configure the element.

                        // if a filter was given, run it, and return if it says no.
                        if (p.filter) {
                            var r = jsPlumbUtil.isString(p.filter) ? selectorFilter(e, elInfo.el, p.filter, this, p.filterExclude) : p.filter(e, elInfo.el);
                            if (r === false) return;
                        }

                        // if maxConnections reached
                        var sourceCount = this.select({source: elid}).length;
                        if (def.maxConnections >= 0 && (sourceCount >= def.maxConnections)) {
                            if (onMaxConnections) {
                                onMaxConnections({
                                    element: elInfo.el,
                                    maxConnections: maxConnections
                                }, e);
                            }
                            return false;
                        }

                        // find the position on the element at which the mouse was pressed; this is where the endpoint
                        // will be located.
                        var elxy = jsPlumb.getPositionOnElement(e, _del, _zoom);

                        // we need to override the anchor in here, and force 'isSource', but we don't want to mess with
                        // the params passed in, because after a connection is established we're going to reset the endpoint
                        // to have the anchor we were given.
                        var tempEndpointParams = {};
                        jsPlumb.extend(tempEndpointParams, p);
                        tempEndpointParams.isTemporarySource = true;
                        tempEndpointParams.anchor = [ elxy[0], elxy[1] , 0, 0];
                        tempEndpointParams.dragOptions = dragOptions;

                        if (def.def.scope) tempEndpointParams.scope = def.def.scope;

                        ep = this.addEndpoint(elid, tempEndpointParams);
                        endpointAddedButNoDragYet = true;
                        ep._doNotDeleteOnDetach = false; // reset.
                        ep._deleteOnDetach = true;

                        // if unique endpoint and it's already been created, push it onto the endpoint we create. at the end
                        // of a successful connection we'll switch to that endpoint.
                        // TODO this is the same code as the programmatic endpoints create on line 1050 ish
                        if (def.uniqueEndpoint) {
                            if (!def.endpoint) {
                                def.endpoint = ep;
                                ep._deleteOnDetach = false;
                                ep._doNotDeleteOnDetach = true;
                            }
                            else
                                ep.finalEndpoint = def.endpoint;
                        }

                        var _delTempEndpoint = function () {
                            // this mouseup event is fired only if no dragging occurred, by jquery and yui, but for mootools
                            // it is fired even if dragging has occurred, in which case we would blow away a perfectly
                            // legitimate endpoint, were it not for this check.  the flag is set after adding an
                            // endpoint and cleared in a drag listener we set in the dragOptions above.
                            _currentInstance.off(ep.canvas, "mouseup", _delTempEndpoint);
                            _currentInstance.off(elInfo.el, "mouseup", _delTempEndpoint);
                            if (endpointAddedButNoDragYet) {
                                endpointAddedButNoDragYet = false;
                                _currentInstance.deleteEndpoint(ep);
                            }
                        };

                        _currentInstance.on(ep.canvas, "mouseup", _delTempEndpoint);
                        _currentInstance.on(elInfo.el, "mouseup", _delTempEndpoint);

                        // optionally check for attributes to extract from the source element
                        var payload = {};
                        if (def.def.extract) {
                            for (var att in def.def.extract) {
                                var v = e.srcElement.getAttribute(att);
                                if (v) {
                                    payload[def.def.extract[att]] = v;
                                }
                            }
                        }

                        // and then trigger its mousedown event, which will kick off a drag, which will start dragging
                        // a new connection from this endpoint.
                        _currentInstance.trigger(ep.canvas, "mousedown", e, payload);

                        jsPlumbUtil.consume(e);

                    }.bind(this);

                    this.on(elInfo.el, "mousedown", mouseDownListener);
                    _def.trigger = mouseDownListener;

                    // if a filter was provided, set it as a dragFilter on the element,
                    // to prevent the element drag function from kicking in when we want to
                    // drag a new connection
                    if (p.filter && (jsPlumbUtil.isString(p.filter) || jsPlumbUtil.isFunction(p.filter))) {
                        _currentInstance.setDragFilter(elInfo.el, p.filter);
                    }

                    var dropOptions = jsPlumb.extend({}, p.dropOptions || {});

                    _makeElementDropHandler(elInfo, p, dropOptions, true, p.isTarget === true);

                }.bind(this);

            var inputs = el.length && el.constructor != String ? el : [ el ];
            for (var i = 0, ii = inputs.length; i < ii; i++) {
                _doOne(_info(inputs[i]));
            }

            return this;
        };

        // see api docs
        this.unmakeSource = function (el, connectionType, doNotClearArrays) {
            var info = _info(el);
            var eldefs = this.sourceEndpointDefinitions[info.id];
            if (eldefs) {
                for (var def in eldefs) {
                    if (connectionType == null || connectionType === def) {
                        var mouseDownListener = eldefs[def].trigger;
                        if (mouseDownListener)
                            _currentInstance.off(info.el, "mousedown", mouseDownListener);
                        if (!doNotClearArrays) {
                            delete this.sourceEndpointDefinitions[info.id][def];
                        }
                    }
                }
            }

            return this;
        };

        // see api docs
        this.unmakeEverySource = function () {
            for (var i in this.sourceEndpointDefinitions)
                _currentInstance.unmakeSource(i, null, true);

            this.sourceEndpointDefinitions = {};
            return this;
        };

        var _getScope = function (el, types, connectionType) {
            types = jsPlumbUtil.isArray(types) ? types : [ types ];
            var id = _getId(el);
            connectionType = connectionType || "default";
            for (var i = 0; i < types.length; i++) {
                var eldefs = this[types[i]][id];
                if (eldefs && eldefs[connectionType]) return eldefs[connectionType].def.scope || this.Defaults.Scope;
            }
        }.bind(this);

        var _setScope = function (el, scope, types, connectionType) {
            types = jsPlumbUtil.isArray(types) ? types : [ types ];
            var id = _getId(el);
            connectionType = connectionType || "default";
            for (var i = 0; i < types.length; i++) {
                var eldefs = this[types[i]][id];
                if (eldefs && eldefs[connectionType]) {
                    eldefs[connectionType].def.scope = scope;
                }
            }

        }.bind(this);

        this.getScope = function (el, scope) {
            return _getScope(el, [ "sourceEndpointDefinitions", "targetEndpointDefinitions" ]);
        };
        this.getSourceScope = function (el) {
            return _getScope(el, "sourceEndpointDefinitions");
        };
        this.getTargetScope = function (el) {
            return _getScope(el, "targetEndpointDefinitions");
        };
        this.setScope = function (el, scope, connectionType) {
            this.setSourceScope(el, scope, connectionType);
            this.setTargetScope(el, scope, connectionType);
        };
        this.setSourceScope = function (el, scope, connectionType) {
            _setScope(el, scope, "sourceEndpointDefinitions", connectionType);
            // we get the source scope during the mousedown event, but we also want to set this.
            this.setDragScope(el, scope);
        };
        this.setTargetScope = function (el, scope, connectionType) {
            _setScope(el, scope, "targetEndpointDefinitions", connectionType);
            this.setDropScope(el, scope);
        };

        // see api docs
        this.unmakeEveryTarget = function () {
            for (var i in this.targetEndpointDefinitions)
                _currentInstance.unmakeTarget(i, true);

            this.targetEndpointDefinitions = {};
            return this;
        };

        // does the work of setting a source enabled or disabled.
        var _setEnabled = function (type, el, state, toggle, connectionType) {
            var a = type == "source" ? this.sourceEndpointDefinitions : this.targetEndpointDefinitions;
            connectionType = connectionType || "default";


            if (_ju.isString(el) && a[el] && a[el][connectionType]) {
                a[el][connectionType].enabled = toggle ? !a[el][connectionType].enabled : state;
            }
            else if (el.length) {
                for (var i = 0, ii = el.length; i < ii; i++) {
                    var info = _info(el[i]);
                    if (a[info.id] && a[info.id][connectionType])
                        a[info.id][connectionType].enabled = toggle ? !a[info.id][connectionType].enabled : state;
                }
            }
            // otherwise a DOM element
            else {
                var id = _info(el).id;
                if (a[id] && a[id][connectionType])
                    a[id][connectionType].enabled = toggle ? !a[id][connectionType].enabled : state;
            }
            return this;
        }.bind(this);

        var _first = function (el, fn) {
            if (_ju.isString(el) || !el.length)
                return fn.apply(this, [ el ]);
            else if (el.length)
                return fn.apply(this, [ el[0] ]);

        }.bind(this);

        this.toggleSourceEnabled = function (el, connectionType) {
            _setEnabled("source", el, null, true, connectionType);
            return this.isSourceEnabled(el, connectionType);
        };

        this.setSourceEnabled = function (el, state, connectionType) {
            return _setEnabled("source", el, state, null, connectionType);
        };
        this.isSource = function (el, connectionType) {
            connectionType = connectionType || "default";
            return _first(el, function (_el) {
                var eldefs = this.sourceEndpointDefinitions[_info(_el).id];
                return eldefs != null && eldefs[connectionType] != null;
            }.bind(this));
        };
        this.isSourceEnabled = function (el, connectionType) {
            connectionType = connectionType || "default";
            return _first(el, function (_el) {
                var sep = this.sourceEndpointDefinitions[_info(_el).id];
                return sep && sep[connectionType] && sep[connectionType].enabled === true;
            }.bind(this));
        };

        this.toggleTargetEnabled = function (el, connectionType) {
            _setEnabled("target", el, null, true, connectionType);
            return this.isTargetEnabled(el, connectionType);
        };

        this.isTarget = function (el, connectionType) {
            connectionType = connectionType || "default";
            return _first(el, function (_el) {
                var eldefs = this.targetEndpointDefinitions[_info(_el).id];
                return eldefs != null && eldefs[connectionType] != null;
            }.bind(this));
        };
        this.isTargetEnabled = function (el, connectionType) {
            connectionType = connectionType || "default";
            return _first(el, function (_el) {
                var tep = this.targetEndpointDefinitions[_info(_el).id];
                return tep && tep[connectionType] && tep[connectionType].enabled === true;
            }.bind(this));
        };
        this.setTargetEnabled = function (el, state, connectionType) {
            return _setEnabled("target", el, state, null, connectionType);
        };

// --------------------- end makeSource/makeTarget ---------------------------------------------- 				

        this.ready = function (fn) {
            _currentInstance.bind("ready", fn);
        };

        var _elEach = function(el, fn) {
            // support both lists...
            if (typeof el == 'object' && el.length)
                for (var i = 0, ii = el.length; i < ii; i++) {
                    fn(el[i]);
                }
            else // ...and single strings or elements.
                fn(el);

            return _currentInstance;
        };

        // repaint some element's endpoints and connections
        this.repaint = function (el, ui, timestamp) {
            return _elEach(el, function(_el) {
                _draw(_el, ui, timestamp);
            });
        };

        this.revalidate = function (el, timestamp, isIdAlready) {
            return _elEach(el, function(_el) {
                var elId = isIdAlready ? _el : _currentInstance.getId(_el);
                _currentInstance.updateOffset({ elId: elId, recalc: true, timestamp:timestamp });
                _currentInstance.repaint(_el);
            });
        };

        // repaint every endpoint and connection.
        this.repaintEverything = function () {
            // TODO this timestamp causes continuous anchors to not repaint properly.
            // fix this. do not just take out the timestamp. it runs a lot faster with
            // the timestamp included.
            var timestamp = _timestamp(), elId;

            for (elId in endpointsByElement) {
                _currentInstance.updateOffset({ elId: elId, recalc: true, timestamp: timestamp });
            }

            for (elId in endpointsByElement) {
                _draw(elId, null, timestamp);
            }

            return this;
        };

        this.removeAllEndpoints = function (el, recurse, affectedElements) {
            affectedElements = affectedElements || [];
            var _one = function (_el) {
                var info = _info(_el),
                    ebe = endpointsByElement[info.id],
                    i, ii;

                if (ebe) {
                    affectedElements.push(info);
                    for (i = 0, ii = ebe.length; i < ii; i++)
                        _currentInstance.deleteEndpoint(ebe[i], false);
                }
                delete endpointsByElement[info.id];

                if (recurse) {
                    if (info.el && info.el.nodeType != 3 && info.el.nodeType != 8) {
                        for (i = 0, ii = info.el.childNodes.length; i < ii; i++) {
                            _one(info.el.childNodes[i]);
                        }
                    }
                }

            };
            _one(el);
            return this;
        };

        var _doRemove = function(info, affectedElements) {
            _currentInstance.removeAllEndpoints(info.id, true, affectedElements);
            var _one = function(_info) {
                _currentInstance.getDragManager().elementRemoved(_info.id);
                _currentInstance.anchorManager.clearFor(_info.id);
                _currentInstance.anchorManager.removeFloatingConnection(_info.id);
                delete _currentInstance.floatingConnections[_info.id];
                delete managedElements[_info.id];
                delete offsets[_info.id];
                if (_info.el) {
                    _currentInstance.removeElement(_info.el);
                    _info.el._jsPlumb = null;
                }
            };

            // remove all affected child elements
            for (var ae = 1; ae < affectedElements.length; ae++) {
                _one(affectedElements[ae]);
            }
            // and always remove the requested one from the dom.
            _one(info);
        };

        /**
         * Remove the given element, including cleaning up all endpoints registered for it.
         * This is exposed in the public API but also used internally by jsPlumb when removing the
         * element associated with a connection drag.
         */
        this.remove = function (el, doNotRepaint) {
            var info = _info(el), affectedElements = [];
            if (info.text) {
                info.el.parentNode.removeChild(info.el);
            }
            else if (info.id) {
                _currentInstance.batch(function () {
                    _doRemove(info, affectedElements);
                }, doNotRepaint === false);
            }
            return _currentInstance;
        };

        this.empty = function (el, doNotRepaint) {
            var affectedElements = [];
            var _one = function(el, dontRemoveFocus) {
                var info = _info(el);
                if (info.text) {
                    info.el.parentNode.removeChild(info.el);
                }
                else if (info.el) {
                    while(info.el.childNodes.length > 0) {
                        _one(info.el.childNodes[0]);
                    }
                    if (!dontRemoveFocus) _doRemove(info, affectedElements);
                }
            };

            _currentInstance.batch(function() {
                _one(el, true);
            }, doNotRepaint === false);

            return _currentInstance;
        };

        this.reset = function () {
            _currentInstance.silently(function() {
                _currentInstance.deleteEveryEndpoint();
                _currentInstance.unbind();
                this.targetEndpointDefinitions = {};
                this.sourceEndpointDefinitions = {};
                connections.length = 0;
                if (this.doReset) this.doReset();
            }.bind(this));
        };

        var _clearObject = function (obj) {
            if (obj.canvas && obj.canvas.parentNode)
                obj.canvas.parentNode.removeChild(obj.canvas);
            obj.cleanup();
            obj.destroy();
        };

        this.clear = function () {
            _currentInstance.select().each(_clearObject);
            _currentInstance.selectEndpoints().each(_clearObject);

            endpointsByElement = {};
            endpointsByUUID = {};
        };

        this.setDefaultScope = function (scope) {
            DEFAULT_SCOPE = scope;
            return _currentInstance;
        };

        // sets whether or not some element should be currently draggable.
        this.setDraggable = _setDraggable;

        this.deriveEndpointAndAnchorSpec = function(type, dontPrependDefault) {
            var bits = ((dontPrependDefault ? "" : "default ") + type).split(/[\s]/), eps = null, ep = null, a = null, as = null;
            for (var i = 0; i < bits.length; i++) {
                var _t = _currentInstance.getType(bits[i], "connection");
                if (_t) {
                    if (_t.endpoints) eps = _t.endpoints;
                    if (_t.endpoint) ep = _t.endpoint;
                    if (_t.anchors) as = _t.anchors;
                    if (_t.anchor) a = _t.anchor;
                }
            }
            return { endpoints: eps ? eps : [ ep, ep ], anchors: as ? as : [a, a ]};
        };

        // sets the id of some element, changing whatever we need to to keep track.
        this.setId = function (el, newId, doNotSetAttribute) {
            //
            var id;

            if (jsPlumbUtil.isString(el)) {
                id = el;
            }
            else {
                el = this.getElement(el);
                id = this.getId(el);
            }

            var sConns = this.getConnections({source: id, scope: '*'}, true),
                tConns = this.getConnections({target: id, scope: '*'}, true);

            newId = "" + newId;

            if (!doNotSetAttribute) {
                el = this.getElement(id);
                this.setAttribute(el, "id", newId);
            }
            else
                el = this.getElement(newId);

            endpointsByElement[newId] = endpointsByElement[id] || [];
            for (var i = 0, ii = endpointsByElement[newId].length; i < ii; i++) {
                endpointsByElement[newId][i].setElementId(newId);
                endpointsByElement[newId][i].setReferenceElement(el);
            }
            delete endpointsByElement[id];

            this.sourceEndpointDefinitions[newId] = this.sourceEndpointDefinitions[id];
            delete this.sourceEndpointDefinitions[id];
            this.targetEndpointDefinitions[newId] = this.targetEndpointDefinitions[id];
            delete this.targetEndpointDefinitions[id];

            this.anchorManager.changeId(id, newId);
            this.getDragManager().changeId(id, newId);
            managedElements[newId] = managedElements[id];
            delete managedElements[id];

            var _conns = function (list, epIdx, type) {
                for (var i = 0, ii = list.length; i < ii; i++) {
                    list[i].endpoints[epIdx].setElementId(newId);
                    list[i].endpoints[epIdx].setReferenceElement(el);
                    list[i][type + "Id"] = newId;
                    list[i][type] = el;
                }
            };
            _conns(sConns, 0, "source");
            _conns(tConns, 1, "target");

            this.repaint(newId);
        };

        this.setDebugLog = function (debugLog) {
            log = debugLog;
        };

        this.setSuspendDrawing = function (val, repaintAfterwards) {
            var curVal = _suspendDrawing;
            _suspendDrawing = val;
            if (val) _suspendedAt = new Date().getTime(); else _suspendedAt = null;
            if (repaintAfterwards) this.repaintEverything();
            return curVal;
        };

        // returns whether or not drawing is currently suspended.
        this.isSuspendDrawing = function () {
            return _suspendDrawing;
        };

        // return timestamp for when drawing was suspended.
        this.getSuspendedAt = function () {
            return _suspendedAt;
        };

        this.batch = function (fn, doNotRepaintAfterwards) {
            var _wasSuspended = this.isSuspendDrawing();
            if (!_wasSuspended)
                this.setSuspendDrawing(true);
            try {
                fn();
            }
            catch (e) {
                _ju.log("Function run while suspended failed", e);
            }
            if (!_wasSuspended)
                this.setSuspendDrawing(false, !doNotRepaintAfterwards);
        };

        this.doWhileSuspended = this.batch;

        this.getCachedData = _getCachedData;
        this.timestamp = _timestamp;
        this.show = function (el, changeEndpoints) {
            _setVisible(el, "block", changeEndpoints);
            return _currentInstance;
        };

        // TODO: update this method to return the current state.
        this.toggleVisible = _toggleVisible;
        this.toggleDraggable = _toggleDraggable;
        this.addListener = this.bind;
    };

    jsPlumbUtil.extend(jsPlumbInstance, jsPlumbUtil.EventGenerator, {
        setAttribute: function (el, a, v) {
            this.setAttribute(el, a, v);
        },
        getAttribute: function (el, a) {
            return this.getAttribute(jsPlumb.getElement(el), a);
        },
        convertToFullOverlaySpec: function(spec) {
            if (jsPlumbUtil.isString(spec)) {
                spec = [ spec, { } ];
            }
            spec[1].id = spec[1].id || jsPlumbUtil.uuid();
            return spec;
        },
        registerConnectionType: function (id, type) {
            this._connectionTypes[id] = jsPlumb.extend({}, type);
            if (type.overlays) {
                var to = {};
                for (var i = 0; i < type.overlays.length; i++) {
                    // if a string, convert to object representation so that we can store the typeid on it.
                    // also assign an id.
                    var fo = this.convertToFullOverlaySpec(type.overlays[i]);
                    to[fo[1].id] = fo;
                }
                this._connectionTypes[id].overlays = to;
            }
        },
        registerConnectionTypes: function (types) {
            for (var i in types)
                this.registerConnectionType(i, types[i]);
        },
        registerEndpointType: function (id, type) {
            this._endpointTypes[id] = jsPlumb.extend({}, type);
            if (type.overlays) {
                var to = {};
                for (var i = 0; i < type.overlays.length; i++) {
                    // if a string, convert to object representation so that we can store the typeid on it.
                    // also assign an id.
                    var fo = this.convertToFullOverlaySpec(type.overlays[i]);
                    to[fo[1].id] = fo;
                }
                this._endpointTypes[id].overlays = to;
            }
        },
        registerEndpointTypes: function (types) {
            for (var i in types)
                //this._endpointTypes[i] = jsPlumb.extend({}, types[i]);
                this.registerEndpointType(i, types[i]);
        },
        getType: function (id, typeDescriptor) {
            return typeDescriptor === "connection" ? this._connectionTypes[id] : this._endpointTypes[id];
        },
        setIdChanged: function (oldId, newId) {
            this.setId(oldId, newId, true);
        },
        // set parent: change the parent for some node and update all the registrations we need to.
        setParent: function (el, newParent) {
            var _dom = this.getElement(el),
                _id = this.getId(_dom),
                _pdom = this.getElement(newParent),
                _pid = this.getId(_pdom);

            _dom.parentNode.removeChild(_dom);
            _pdom.appendChild(_dom);
            this.getDragManager().setParent(_dom, _id, _pdom, _pid);
        },
        extend: function (o1, o2, names) {
            var i;
            if (names) {
                for (i = 0; i < names.length; i++)
                    o1[names[i]] = o2[names[i]];
            }
            else
                for (i in o2) o1[i] = o2[i];
            return o1;
        },
        floatingConnections: {},
        getFloatingAnchorIndex: function (jpc) {
            return jpc.endpoints[0].isFloating() ? 0 : jpc.endpoints[1].isFloating() ? 1 : -1;
        }
    });

// --------------------- static instance + AMD registration -------------------------------------------	

// create static instance and assign to window if window exists.	
    var jsPlumb = new jsPlumbInstance();
    // register on window if defined (lets us run on server)
    if (typeof window != 'undefined') window.jsPlumb = jsPlumb;
    // add 'getInstance' method to static instance
    jsPlumb.getInstance = function (_defaults) {
        var j = new jsPlumbInstance(_defaults);
        j.init();
        return j;
    };
    jsPlumb.each = function (spec, fn) {
        if (spec == null) return;
        if (typeof spec === "string")
            fn(jsPlumb.getElement(spec));
        else if (spec.length != null) {
            for (var i = 0; i < spec.length; i++)
                fn(jsPlumb.getElement(spec[i]));
        }
        else
            fn(spec); // assume it's an element.
    };
// maybe register static instance as an AMD module, and getInstance method too.
    if (typeof define === "function") {
        define("jsplumb", [], function () {
            return jsPlumb;
        });
        define("jsplumbinstance", [], function () {
            return jsPlumb.getInstance();
        });
    }
    // CommonJS
    if (typeof exports !== 'undefined') {
        exports.jsPlumb = jsPlumb;
    }


// --------------------- end static instance + AMD registration -------------------------------------------		

}).call(this);

/*
 * jsPlumb
 *
 * Title:jsPlumb 2.0.2
 *
 * Provides a way to visually connect elements on an HTML page, using SVG.
 *
 * This file contains the base functionality for DOM type adapters.
 *
 * Copyright (c) 2010 - 2015 jsPlumb (hello@jsplumbtoolkit.com)
 *
 * http://jsplumbtoolkit.com
 * http://github.com/sporritt/jsplumb
 *
 * Dual licensed under the MIT and GPL2 licenses.
 */
;
(function () {

    var root = this, _ju = root.jsPlumbUtil;

    var svgAvailable = !!window.SVGAngle || document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1"),

        _genLoc = function (e, prefix) {
            if (e == null) return [ 0, 0 ];
            var ts = _touches(e), t = _getTouch(ts, 0);
            return [t[prefix + "X"], t[prefix + "Y"]];
        },
        _pageLocation = function (e) {
            if (e == null) return [ 0, 0 ];
            return _genLoc(e, "page");
        },
        _screenLocation = function (e) {
            return _genLoc(e, "screen");
        },
        _clientLocation = function (e) {
            return _genLoc(e, "client");
        },
        _getTouch = function (touches, idx) {
            return touches.item ? touches.item(idx) : touches[idx];
        },
        _touches = function (e) {
            return e.touches && e.touches.length > 0 ? e.touches :
                    e.changedTouches && e.changedTouches.length > 0 ? e.changedTouches :
                    e.targetTouches && e.targetTouches.length > 0 ? e.targetTouches :
                [ e ];
        };

    /**
     Manages dragging for some instance of jsPlumb.

     TODO instead of this being accessed directly, it should subscribe to events on the jsPlumb instance: every method
     in here is called directly by jsPlumb. But what should happen is that we have unpublished events that this listens
     to.  The only trick is getting one of these instantiated with every jsPlumb instance: it needs to have a hook somehow.
     Basically the general idea is to pull ALL the drag code out (prototype method registrations plus this) into a
     dedicated drag script), that does not necessarily need to be included.


     */
    var DragManager = function (_currentInstance) {
        var _draggables = {}, _dlist = [], _delements = {}, _elementsWithEndpoints = {},
        // elementids mapped to the draggable to which they belong.
            _draggablesForElements = {};

        /**
         register some element as draggable.  right now the drag init stuff is done elsewhere, and it is
         possible that will continue to be the case.
         */
        this.register = function (el) {
            var id = _currentInstance.getId(el),
                parentOffset = _currentInstance.getOffset(el);

            if (!_draggables[id]) {
                _draggables[id] = el;
                _dlist.push(el);
                _delements[id] = {};
            }

            // look for child elements that have endpoints and register them against this draggable.
            var _oneLevel = function (p) {
                if (p) {
                    for (var i = 0; i < p.childNodes.length; i++) {
                        if (p.childNodes[i].nodeType != 3 && p.childNodes[i].nodeType != 8) {
                            var cEl = jsPlumb.getElement(p.childNodes[i]),
                                cid = _currentInstance.getId(p.childNodes[i], null, true);
                            if (cid && _elementsWithEndpoints[cid] && _elementsWithEndpoints[cid] > 0) {
                                var cOff = _currentInstance.getOffset(cEl);
                                _delements[id][cid] = {
                                    id: cid,
                                    offset: {
                                        left: cOff.left - parentOffset.left,
                                        top: cOff.top - parentOffset.top
                                    }
                                };
                                _draggablesForElements[cid] = id;
                            }
                            _oneLevel(p.childNodes[i]);
                        }
                    }
                }
            };

            _oneLevel(el);
        };

        // refresh the offsets for child elements of this element.
        this.updateOffsets = function (elId) {
            if (elId != null) {
                var domEl = jsPlumb.getElement(elId),
                    id = _currentInstance.getId(domEl),
                    children = _delements[id],
                    parentOffset = _currentInstance.getOffset(domEl);

                if (children) {
                    for (var i in children) {
                        if (children.hasOwnProperty(i)) {
                            var cel = jsPlumb.getElement(i),
                                cOff = _currentInstance.getOffset(cel);

                            _delements[id][i] = {
                                id: i,
                                offset: {
                                    left: cOff.left - parentOffset.left,
                                    top: cOff.top - parentOffset.top
                                }
                            };
                            _draggablesForElements[i] = id;
                        }
                    }
                }
            }
        };

        /**
         notification that an endpoint was added to the given el.  we go up from that el's parent
         node, looking for a parent that has been registered as a draggable. if we find one, we add this
         el to that parent's list of elements to update on drag (if it is not there already)
         */
        this.endpointAdded = function (el, id) {

            id = id || _currentInstance.getId(el);

            var b = document.body,
                p = el.parentNode;

            _elementsWithEndpoints[id] = _elementsWithEndpoints[id] ? _elementsWithEndpoints[id] + 1 : 1;

            while (p != null && p != b) {
                var pid = _currentInstance.getId(p, null, true);
                if (pid && _draggables[pid]) {
                    var pLoc = _currentInstance.getOffset(p);

                    if (_delements[pid][id] == null) {
                        var cLoc = _currentInstance.getOffset(el);
                        _delements[pid][id] = {
                            id: id,
                            offset: {
                                left: cLoc.left - pLoc.left,
                                top: cLoc.top - pLoc.top
                            }
                        };
                        _draggablesForElements[id] = pid;
                    }
                    break;
                }
                p = p.parentNode;
            }
        };

        this.endpointDeleted = function (endpoint) {
            if (_elementsWithEndpoints[endpoint.elementId]) {
                _elementsWithEndpoints[endpoint.elementId]--;
                if (_elementsWithEndpoints[endpoint.elementId] <= 0) {
                    for (var i in _delements) {
                        if (_delements.hasOwnProperty(i) && _delements[i]) {
                            delete _delements[i][endpoint.elementId];
                            delete _draggablesForElements[endpoint.elementId];
                        }
                    }
                }
            }
        };

        this.changeId = function (oldId, newId) {
            _delements[newId] = _delements[oldId];
            _delements[oldId] = {};
            _draggablesForElements[newId] = _draggablesForElements[oldId];
            _draggablesForElements[oldId] = null;
        };

        this.getElementsForDraggable = function (id) {
            return _delements[id];
        };

        this.elementRemoved = function (elementId) {
            var elId = _draggablesForElements[elementId];
            if (elId) {
                delete _delements[elId][elementId];
                delete _draggablesForElements[elementId];
            }
        };

        this.reset = function () {
            _draggables = {};
            _dlist = [];
            _delements = {};
            _elementsWithEndpoints = {};
        };

        //
        // notification drag ended. We check automatically if need to update some
        // ancestor's offsets.
        //
        this.dragEnded = function (el) {
            var id = _currentInstance.getId(el),
                ancestor = _draggablesForElements[id];

            if (ancestor) this.updateOffsets(ancestor);
        };

        this.setParent = function (el, elId, p, pId) {
            var current = _draggablesForElements[elId];
            if (current) {
                if (!_delements[pId])
                    _delements[pId] = {};
                _delements[pId][elId] = _delements[current][elId];
                delete _delements[current][elId];
                var pLoc = _currentInstance.getOffset(p),
                    cLoc = _currentInstance.getOffset(el);
                _delements[pId][elId].offset = {
                    left: cLoc.left - pLoc.left,
                    top: cLoc.top - pLoc.top
                };
                _draggablesForElements[elId] = pId;
            }
        };

        this.getDragAncestor = function (el) {
            var de = jsPlumb.getElement(el),
                id = _currentInstance.getId(de),
                aid = _draggablesForElements[id];

            if (aid)
                return jsPlumb.getElement(aid);
            else
                return null;
        };

    };

    var trim = function (str) {
            return str == null ? null : (str.replace(/^\s\s*/, '').replace(/\s\s*$/, ''));
        },
        _setClassName = function (el, cn) {
            cn = trim(cn);
            if (typeof el.className.baseVal != "undefined")  // SVG
                el.className.baseVal = cn;
            else
                el.className = cn;
        },
        _getClassName = function (el) {
            return (typeof el.className.baseVal == "undefined") ? el.className : el.className.baseVal;
        },
        _classManip = function (el, classesToAdd, classesToRemove) {
            classesToAdd = classesToAdd == null ? [] : jsPlumbUtil.isArray(classesToAdd) ? classesToAdd : classesToAdd.split(/\s+/);
            classesToRemove = classesToRemove == null ? [] : jsPlumbUtil.isArray(classesToRemove) ? classesToRemove : classesToRemove.split(/\s+/);

            var className = _getClassName(el),
                curClasses = className.split(/\s+/);

            var _oneSet = function (add, classes) {
                for (var i = 0; i < classes.length; i++) {
                    if (add) {
                        if (curClasses.indexOf(classes[i]) == -1)
                            curClasses.push(classes[i]);
                    }
                    else {
                        var idx = curClasses.indexOf(classes[i]);
                        if (idx != -1)
                            curClasses.splice(idx, 1);
                    }
                }
            };

            _oneSet(true, classesToAdd);
            _oneSet(false, classesToRemove);

            _setClassName(el, curClasses.join(" "));
        };

    jsPlumb.extend(jsPlumbInstance.prototype, {

        headless: false,

        pageLocation: _pageLocation,
        screenLocation: _screenLocation,
        clientLocation: _clientLocation,

        getDragManager:function() {
            if (this.dragManager == null)
                this.dragManager = new DragManager(this);

            return this.dragManager;
        },

        recalculateOffsets:function(elId) {
            this.getDragManager().updateOffsets(elId);
        },

        createElement:function(tag, style, clazz, atts) {
            return this.createElementNS(null, tag, style, clazz, atts);
        },

        createElementNS:function(ns, tag, style, clazz, atts) {
            var e = ns == null ? document.createElement(tag) : document.createElementNS(ns, tag);
            var i;
            style = style || {};
            for (i in style)
                e.style[i] = style[i];

            if (clazz)
                e.className = clazz;

            atts = atts || {};
            for (i in atts)
                e.setAttribute(i, "" + atts[i]);

            return e;
        },

        getAttribute: function (el, attName) {
            return el.getAttribute != null ? el.getAttribute(attName) : null;
        },

        setAttribute: function (el, a, v) {
            if (el.setAttribute != null) el.setAttribute(a, v);
        },

        setAttributes: function (el, atts) {
            for (var i in atts)
                if (atts.hasOwnProperty(i)) el.setAttribute(i, atts[i]);
        },
        appendToRoot: function (node) {
            document.body.appendChild(node);
        },
        getRenderModes: function () {
            return [ "svg"  ];
        },
        getClass:_getClassName,
        addClass: function (el, clazz) {
            jsPlumb.each(el, function (e) {
                _classManip(e, clazz);
            });
        },
        hasClass: function (el, clazz) {
            el = jsPlumb.getElement(el);
            if (el.classList) return el.classList.contains(clazz);
            else {
                return _getClassName(el).indexOf(clazz) != -1;
            }
        },
        removeClass: function (el, clazz) {
            jsPlumb.each(el, function (e) {
                _classManip(e, null, clazz);
            });
        },
        updateClasses: function (el, toAdd, toRemove) {
            jsPlumb.each(el, function (e) {
                _classManip(e, toAdd, toRemove);
            });
        },
        setClass: function (el, clazz) {
            jsPlumb.each(el, function (e) {
                _setClassName(e, clazz);
            });
        },
        setPosition: function (el, p) {
            el.style.left = p.left + "px";
            el.style.top = p.top + "px";
        },
        getPosition: function (el) {
            var _one = function (prop) {
                var v = el.style[prop];
                return v ? v.substring(0, v.length - 2) : 0;
            };
            return {
                left: _one("left"),
                top: _one("top")
            };
        },
        getStyle:function(el, prop) {
            if (typeof window.getComputedStyle !== 'undefined') {
                return getComputedStyle(el, null).getPropertyValue(prop);
            } else {
                return el.currentStyle[prop];
            }
        },
        getSelector: function (ctx, spec) {
            var sel = null;
            if (arguments.length == 1) {
                sel = ctx.nodeType != null ? ctx : document.querySelectorAll(ctx);
            }
            else
                sel = ctx.querySelectorAll(spec);

            return sel;
        },
        getOffset:function(el, relativeToRoot, container) {
            el = jsPlumb.getElement(el);
            container = container || this.getContainer();
            var out = {
                    left: el.offsetLeft,
                    top: el.offsetTop
                },
                op = (relativeToRoot  || (container != null && (el != container && el.offsetParent != container))) ?  el.offsetParent : null,
                _maybeAdjustScroll = function(offsetParent) {
                    if (offsetParent != null && offsetParent !== document.body && (offsetParent.scrollTop > 0 || offsetParent.scrollLeft > 0)) {
                        out.left -= offsetParent.scrollLeft;
                        out.top -= offsetParent.scrollTop;
                    }
                }.bind(this);

            while (op != null) {
                out.left += op.offsetLeft;
                out.top += op.offsetTop;
                _maybeAdjustScroll(op);
                op = relativeToRoot ? op.offsetParent :
                        op.offsetParent == container ? null : op.offsetParent;
            }

            // if container is scrolled and the element (or its offset parent) is not absolute or fixed, adjust accordingly.
            if (container != null && !relativeToRoot && (container.scrollTop > 0 || container.scrollLeft > 0)) {
                var pp = el.offsetParent != null ? this.getStyle(el.offsetParent, "position") : "static",
                    p = this.getStyle(el, "position");
                if (p !== "absolute" && p !== "fixed" && pp !== "absolute" && pp != "fixed") {
                    out.left -= container.scrollLeft;
                    out.top -= container.scrollTop;
                }
            }
            return out;
        },
        //
        // return x+y proportion of the given element's size corresponding to the location of the given event.
        //
        getPositionOnElement: function (evt, el, zoom) {
            var box = typeof el.getBoundingClientRect !== "undefined" ? el.getBoundingClientRect() : { left: 0, top: 0, width: 0, height: 0 },
                body = document.body,
                docElem = document.documentElement,
                scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop,
                scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft,
                clientTop = docElem.clientTop || body.clientTop || 0,
                clientLeft = docElem.clientLeft || body.clientLeft || 0,
                pst = 0,
                psl = 0,
                top = box.top + scrollTop - clientTop + (pst * zoom),
                left = box.left + scrollLeft - clientLeft + (psl * zoom),
                cl = jsPlumb.pageLocation(evt),
                w = box.width || (el.offsetWidth * zoom),
                h = box.height || (el.offsetHeight * zoom),
                x = (cl[0] - left) / w,
                y = (cl[1] - top) / h;

            return [ x, y ];
        },

        /**
         * Gets the absolute position of some element as read from the left/top properties in its style.
         * @method getAbsolutePosition
         * @param {Element} el The element to retrieve the absolute coordinates from. **Note** this is a DOM element, not a selector from the underlying library.
         * @return {Number[]} [left, top] pixel values.
         */
        getAbsolutePosition: function (el) {
            var _one = function (s) {
                var ss = el.style[s];
                if (ss) return parseFloat(ss.substring(0, ss.length - 2));
            };
            return [ _one("left"), _one("top") ];
        },

        /**
         * Sets the absolute position of some element by setting the left/top properties in its style.
         * @method setAbsolutePosition
         * @param {Element} el The element to set the absolute coordinates on. **Note** this is a DOM element, not a selector from the underlying library.
         * @param {Number[]} xy x and y coordinates
         * @param {Number[]} [animateFrom] Optional previous xy to animate from.
         * @param {Object} [animateOptions] Options for the animation.
         */
        setAbsolutePosition: function (el, xy, animateFrom, animateOptions) {
            if (animateFrom) {
                this.animate(el, {
                    left: "+=" + (xy[0] - animateFrom[0]),
                    top: "+=" + (xy[1] - animateFrom[1])
                }, animateOptions);
            }
            else {
                el.style.left = xy[0] + "px";
                el.style.top = xy[1] + "px";
            }
        },
        /**
         * gets the size for the element, in an array : [ width, height ].
         */
        getSize: function (el) {
            return [ el.offsetWidth, el.offsetHeight ];
        },
        getWidth: function (el) {
            return el.offsetWidth;
        },
        getHeight: function (el) {
            return el.offsetHeight;
        }

    });
}).call(this);

/*
 * jsPlumb
 *
 * Title:jsPlumb 2.0.2
 *
 * Provides a way to visually connect elements on an HTML page, using SVG.
 *
 * This file contains code for components that support overlays.
 *
 * Copyright (c) 2010 - 2015 jsPlumb (hello@jsplumbtoolkit.com)
 *
 * http://jsplumbtoolkit.com
 * http://github.com/sporritt/jsplumb
 *
 * Dual licensed under the MIT and GPL2 licenses.
 */
;(function() {

    "use strict";
    var root = this, _jp = root.jsPlumb, _ju = root.jsPlumbUtil;

    // ------------------------------ BEGIN OverlayCapablejsPlumbUIComponent --------------------------------------------

    var _internalLabelOverlayId = "__label",
    // this is a shortcut helper method to let people add a label as
    // overlay.
        _makeLabelOverlay = function (component, params) {

            var _params = {
                    cssClass: params.cssClass,
                    labelStyle: component.labelStyle,
                    id: _internalLabelOverlayId,
                    component: component,
                    _jsPlumb: component._jsPlumb.instance  // TODO not necessary, since the instance can be accessed through the component.
                },
                mergedParams = jsPlumb.extend(_params, params);

            return new _jp.Overlays[component._jsPlumb.instance.getRenderMode()].Label(mergedParams);
        },
        _processOverlay = function (component, o) {
            var _newOverlay = null;
            if (_ju.isArray(o)) {	// this is for the shorthand ["Arrow", { width:50 }] syntax
                // there's also a three arg version:
                // ["Arrow", { width:50 }, {location:0.7}]
                // which merges the 3rd arg into the 2nd.
                var type = o[0],
                // make a copy of the object so as not to mess up anyone else's reference...
                    p = _jp.extend({component: component, _jsPlumb: component._jsPlumb.instance}, o[1]);
                if (o.length == 3) _jp.extend(p, o[2]);
                _newOverlay = new _jp.Overlays[component._jsPlumb.instance.getRenderMode()][type](p);
            } else if (o.constructor == String) {
                _newOverlay = new _jp.Overlays[component._jsPlumb.instance.getRenderMode()][o]({component: component, _jsPlumb: component._jsPlumb.instance});
            } else {
                _newOverlay = o;
            }

            _newOverlay.id = _newOverlay.id || _ju.uuid();
            component.cacheTypeItem("overlay", _newOverlay, _newOverlay.id);
            //component._jsPlumb.overlays.push(_newOverlay);
            component._jsPlumb.overlays[_newOverlay.id] = _newOverlay;

            return _newOverlay;
        };

    _jp.OverlayCapableJsPlumbUIComponent = function (params) {

        jsPlumbUIComponent.apply(this, arguments);
        this._jsPlumb.overlays = {};
        this._jsPlumb.overlayPositions = {};

        if (params.label) {
            this.getDefaultType().overlays[_internalLabelOverlayId] = ["Label", {
                label: params.label,
                location: params.labelLocation || this.defaultLabelLocation || 0.5,
                labelStyle: params.labelStyle || this._jsPlumb.instance.Defaults.LabelStyle,
                id:_internalLabelOverlayId
            }];
        }

        this.setListenerComponent = function (c) {
            if (this._jsPlumb) {
                for (var i in this._jsPlumb.overlays)
                    this._jsPlumb.overlays[i].setListenerComponent(c);
            }
        };
    };

    _jp.OverlayCapableJsPlumbUIComponent.applyType = function (component, t) {
        if (t.overlays) {
            // loop through the ones in the type. if already present on the component,
            // dont remove or re-add.
            var keep = {}, i;

            for (i in t.overlays) {

                var existing = component._jsPlumb.overlays[t.overlays[i][1].id];
                if (existing) {
                    // maybe update from data, if there were parameterised values for instance.
                    existing.updateFrom(t.overlays[i][1]);
                    keep[t.overlays[i][1].id] = true;
                }
                else {
                    var c = component.getCachedTypeItem("overlay", t.overlays[i][1].id);
                    if (c != null) {
                        c.reattach(component._jsPlumb.instance);
                        // maybe update from data, if there were parameterised values for instance.
                        c.updateFrom(t.overlays[i][1]);
                        component._jsPlumb.overlays[c.id] = c;
                    }
                    else {
                        c = component.addOverlay(t.overlays[i], true);
                    }
                    keep[c.id] = true;
                }
            }

            // now loop through the full overlays and remove those that we dont want to keep
            for (i in component._jsPlumb.overlays) {
                if (keep[component._jsPlumb.overlays[i].id] == null)
                    component.removeOverlay(component._jsPlumb.overlays[i].id);
            }
        }
    };

    _ju.extend(_jp.OverlayCapableJsPlumbUIComponent, jsPlumbUIComponent, {

        setHover: function (hover, ignoreAttachedElements) {
            if (this._jsPlumb && !this._jsPlumb.instance.isConnectionBeingDragged()) {
                for (var i in this._jsPlumb.overlays) {
                    this._jsPlumb.overlays[i][hover ? "addClass" : "removeClass"](this._jsPlumb.instance.hoverClass);
                }
            }
        },
        addOverlay: function (overlay, doNotRepaint) {
            var o = _processOverlay(this, overlay);
            if (!doNotRepaint) this.repaint();
            return o;
        },
        getOverlay: function (id) {
            return this._jsPlumb.overlays[id];
        },
        getOverlays: function () {
            return this._jsPlumb.overlays;
        },
        hideOverlay: function (id) {
            var o = this.getOverlay(id);
            if (o) o.hide();
        },
        hideOverlays: function () {
            for (var i in this._jsPlumb.overlays)
                this._jsPlumb.overlays[i].hide();
        },
        showOverlay: function (id) {
            var o = this.getOverlay(id);
            if (o) o.show();
        },
        showOverlays: function () {
            for (var i in this._jsPlumb.overlays)
                this._jsPlumb.overlays[i].show();
        },
        removeAllOverlays: function (doNotRepaint) {
            for (var i in this._jsPlumb.overlays) {
                if (this._jsPlumb.overlays[i].cleanup) this._jsPlumb.overlays[i].cleanup();
            }

            this._jsPlumb.overlays = {};
            this._jsPlumb.overlayPositions = null;
            if (!doNotRepaint)
                this.repaint();
        },
        removeOverlay: function (overlayId) {
            var o = this._jsPlumb.overlays[overlayId];
            if (o) {
                if (o.cleanup) o.cleanup();
                delete this._jsPlumb.overlays[overlayId];
                if (this._jsPlumb.overlayPositions)
                    delete this._jsPlumb.overlayPositions[overlayId];
            }
        },
        removeOverlays: function () {
            for (var i = 0, j = arguments.length; i < j; i++)
                this.removeOverlay(arguments[i]);
        },
        moveParent: function (newParent) {
            if (this.bgCanvas) {
                this.bgCanvas.parentNode.removeChild(this.bgCanvas);
                newParent.appendChild(this.bgCanvas);
            }

            if (this.canvas && this.canvas.parentNode) {
                this.canvas.parentNode.removeChild(this.canvas);
                newParent.appendChild(this.canvas);

                for (var i in this._jsPlumb.overlays) {
                    if (this._jsPlumb.overlays[i].isAppendedAtTopLevel) {
                        var el = this._jsPlumb.overlays[i].getElement();
                        el.parentNode.removeChild(el);
                        newParent.appendChild(el);
                    }
                }
            }
        },
        getLabel: function () {
            var lo = this.getOverlay(_internalLabelOverlayId);
            return lo != null ? lo.getLabel() : null;
        },
        getLabelOverlay: function () {
            return this.getOverlay(_internalLabelOverlayId);
        },
        setLabel: function (l) {
            var lo = this.getOverlay(_internalLabelOverlayId);
            if (!lo) {
                var params = l.constructor == String || l.constructor == Function ? { label: l } : l;
                lo = _makeLabelOverlay(this, params);
                this._jsPlumb.overlays[_internalLabelOverlayId] = lo;
            }
            else {
                if (l.constructor == String || l.constructor == Function) lo.setLabel(l);
                else {
                    if (l.label) lo.setLabel(l.label);
                    if (l.location) lo.setLocation(l.location);
                }
            }

            if (!this._jsPlumb.instance.isSuspendDrawing())
                this.repaint();
        },
        cleanup: function (force) {
            for (var i in this._jsPlumb.overlays) {
                this._jsPlumb.overlays[i].cleanup(force);
                this._jsPlumb.overlays[i].destroy(force);
            }
            if (force) {
                this._jsPlumb.overlays = {};
                this._jsPlumb.overlayPositions = null;
            }
        },
        setVisible: function (v) {
            this[v ? "showOverlays" : "hideOverlays"]();
        },
        setAbsoluteOverlayPosition: function (overlay, xy) {
            this._jsPlumb.overlayPositions[overlay.id] = xy;
        },
        getAbsoluteOverlayPosition: function (overlay) {
            return this._jsPlumb.overlayPositions ? this._jsPlumb.overlayPositions[overlay.id] : null;
        }
    });

// ------------------------------ END OverlayCapablejsPlumbUIComponent --------------------------------------------

}).call(this);

/*
 * jsPlumb
 * 
 * Title:jsPlumb 2.0.2
 * 
 * Provides a way to visually connect elements on an HTML page, using SVG.
 * 
 * This file contains the code for Endpoints.
 *
 * Copyright (c) 2010 - 2015 jsPlumb (hello@jsplumbtoolkit.com)
 * 
 * http://jsplumbtoolkit.com
 * http://github.com/sporritt/jsplumb
 * 
 * Dual licensed under the MIT and GPL2 licenses.
 */
(function () {

    "use strict";
    var root = this, _jp = root.jsPlumb, _ju = root.jsPlumbUtil;

    // create the drag handler for a connection
    var _makeConnectionDragHandler = function (endpoint, placeholder, _jsPlumb) {
        var stopped = false;
        return {
            drag: function () {
                if (stopped) {
                    stopped = false;
                    return true;
                }

                if (placeholder.element) {
                    var _ui = _jsPlumb.getUIPosition(arguments, _jsPlumb.getZoom());
                    jsPlumb.setPosition(placeholder.element, _ui);
                    _jsPlumb.repaint(placeholder.element, _ui);
                    // always repaint the source endpoint, because only continuous/dynamic anchors cause the endpoint
                    // to be repainted, so static anchors need to be told (or the endpoint gets dragged around)
                    endpoint.paint({anchorPoint:endpoint.anchor.getCurrentLocation({element:endpoint.element})});
                }
            },
            stopDrag: function () {
                stopped = true;
            }
        };
    };

    // creates a placeholder div for dragging purposes, adds it, and pre-computes its offset.
    var _makeDraggablePlaceholder = function (placeholder, _jsPlumb, ipco, ips) {
        var n = jsPlumb.createElement("div", { position : "absolute" });
        _jsPlumb.appendElement(n);
        var id = _jsPlumb.getId(n);
        jsPlumb.setPosition(n, ipco);
        n.style.width = ips[0] + "px";
        n.style.height = ips[1] + "px";
        _jsPlumb.manage(id, n, true); // TRANSIENT MANAGE
        // create and assign an id, and initialize the offset.
        placeholder.id = id;
        placeholder.element = n;
    };

    // create a floating endpoint (for drag connections)
    var _makeFloatingEndpoint = function (paintStyle, referenceAnchor, endpoint, referenceCanvas, sourceElement, _jsPlumb, _newEndpoint, scope) {
        var floatingAnchor = new _jp.FloatingAnchor({ reference: referenceAnchor, referenceCanvas: referenceCanvas, jsPlumbInstance: _jsPlumb });
        //setting the scope here should not be the way to fix that mootools issue.  it should be fixed by not
        // adding the floating endpoint as a droppable.  that makes more sense anyway!
        // TRANSIENT MANAGE
        return _newEndpoint({
            paintStyle: paintStyle,
            endpoint: endpoint,
            anchor: floatingAnchor,
            source: sourceElement,
            scope: scope
        });
    };

    var typeParameters = [ "connectorStyle", "connectorHoverStyle", "connectorOverlays",
        "connector", "connectionType", "connectorClass", "connectorHoverClass" ];

    // a helper function that tries to find a connection to the given element, and returns it if so. if elementWithPrecedence is null,
    // or no connection to it is found, we return the first connection in our list.
    var findConnectionToUseForDynamicAnchor = function (ep, elementWithPrecedence) {
        var idx = 0;
        if (elementWithPrecedence != null) {
            for (var i = 0; i < ep.connections.length; i++) {
                if (ep.connections[i].sourceId == elementWithPrecedence || ep.connections[i].targetId == elementWithPrecedence) {
                    idx = i;
                    break;
                }
            }
        }

        return ep.connections[idx];
    };

    _jp.Endpoint = function (params) {
        var _jsPlumb = params._jsPlumb,
            _newConnection = params.newConnection,
            _newEndpoint = params.newEndpoint;

        this.idPrefix = "_jsplumb_e_";
        this.defaultLabelLocation = [ 0.5, 0.5 ];
        this.defaultOverlayKeys = ["Overlays", "EndpointOverlays"];
        _jp.OverlayCapableJsPlumbUIComponent.apply(this, arguments);

// TYPE

        this.appendToDefaultType({
            connectionType:params.connectionType,
            maxConnections: params.maxConnections == null ? this._jsPlumb.instance.Defaults.MaxConnections : params.maxConnections, // maximum number of connections this endpoint can be the source of.,
            paintStyle: params.endpointStyle || params.paintStyle || params.style || this._jsPlumb.instance.Defaults.EndpointStyle || _jp.Defaults.EndpointStyle,
            hoverPaintStyle: params.endpointHoverStyle || params.hoverPaintStyle || this._jsPlumb.instance.Defaults.EndpointHoverStyle || _jp.Defaults.EndpointHoverStyle,
            connectorStyle: params.connectorStyle,
            connectorHoverStyle: params.connectorHoverStyle,
            connectorClass: params.connectorClass,
            connectorHoverClass: params.connectorHoverClass,
            connectorOverlays: params.connectorOverlays,
            connector: params.connector,
            connectorTooltip: params.connectorTooltip
        });

// END TYPE

        this._jsPlumb.enabled = !(params.enabled === false);
        this._jsPlumb.visible = true;
        this.element = _jp.getElement(params.source);
        this._jsPlumb.uuid = params.uuid;
        this._jsPlumb.floatingEndpoint = null;
        var inPlaceCopy = null;
        if (this._jsPlumb.uuid) params.endpointsByUUID[this._jsPlumb.uuid] = this;
        this.elementId = params.elementId;
        this.dragProxy = params.dragProxy;

        this._jsPlumb.connectionCost = params.connectionCost;
        this._jsPlumb.connectionsDirected = params.connectionsDirected;
        this._jsPlumb.currentAnchorClass = "";
        this._jsPlumb.events = {};

        var _updateAnchorClass = function () {
            // stash old, get new
            var oldAnchorClass = _jsPlumb.endpointAnchorClassPrefix + "-" + this._jsPlumb.currentAnchorClass;
            this._jsPlumb.currentAnchorClass = this.anchor.getCssClass();
            var anchorClass = _jsPlumb.endpointAnchorClassPrefix + (this._jsPlumb.currentAnchorClass ? "-" + this._jsPlumb.currentAnchorClass : "");

            this.removeClass(oldAnchorClass);
            this.addClass(anchorClass);
            // add and remove at the same time to reduce the number of reflows.
            jsPlumb.updateClasses(this.element, anchorClass, oldAnchorClass);
        }.bind(this);

        this.prepareAnchor = function(anchorParams) {
            var a = this._jsPlumb.instance.makeAnchor(anchorParams, this.elementId, _jsPlumb);
            a.bind("anchorChanged", function (currentAnchor) {
                this.fire("anchorChanged", {endpoint: this, anchor: currentAnchor});
                _updateAnchorClass();
            }.bind(this));
            return a;
        };

        this.setPreparedAnchor = function(anchor, doNotRepaint) {
            this._jsPlumb.instance.continuousAnchorFactory.clear(this.elementId);
            this.anchor = anchor;
            _updateAnchorClass();

            if (!doNotRepaint)
                this._jsPlumb.instance.repaint(this.elementId);

            return this;
        };

        this.setAnchor = function (anchorParams, doNotRepaint) {
            var a = this.prepareAnchor(anchorParams);
            this.setPreparedAnchor(a, doNotRepaint);
            return this;
        };

        var internalHover = function (state) {
            if (this.connections.length > 0) {
                for (var i = 0; i < this.connections.length; i++)
                    this.connections[i].setHover(state, false);
            }
            else
                this.setHover(state);
        }.bind(this);

        this.bind("mouseover", function () {
            internalHover(true);
        });
        this.bind("mouseout", function () {
            internalHover(false);
        });

        // ANCHOR MANAGER
        if (!params._transient) // in place copies, for example, are transient.  they will never need to be retrieved during a paint cycle, because they dont move, and then they are deleted.
            this._jsPlumb.instance.anchorManager.add(this, this.elementId);

        this.prepareEndpoint = function(ep, typeId) {
            var _e = function (t, p) {
                var rm = _jsPlumb.getRenderMode();
                if (_jp.Endpoints[rm][t]) return new _jp.Endpoints[rm][t](p);
                if (!_jsPlumb.Defaults.DoNotThrowErrors)
                    throw { msg: "jsPlumb: unknown endpoint type '" + t + "'" };
            };

            var endpointArgs = {
                _jsPlumb: this._jsPlumb.instance,
                cssClass: params.cssClass,
                container: params.container,
                tooltip: params.tooltip,
                connectorTooltip: params.connectorTooltip,
                endpoint: this
            };

            var endpoint;

            if (_ju.isString(ep))
                endpoint = _e(ep, endpointArgs);
            else if (_ju.isArray(ep)) {
                endpointArgs = _ju.merge(ep[1], endpointArgs);
                endpoint = _e(ep[0], endpointArgs);
            }
            else {
                endpoint = ep.clone();
            }

            // assign a clone function using a copy of endpointArgs. this is used when a drag starts: the endpoint that was dragged is cloned,
            // and the clone is left in its place while the original one goes off on a magical journey.
            // the copy is to get around a closure problem, in which endpointArgs ends up getting shared by
            // the whole world.
            //var argsForClone = jsPlumb.extend({}, endpointArgs);
            endpoint.clone = function () {
                // TODO this, and the code above, can be refactored to be more dry.
                if (_ju.isString(ep))
                    return _e(ep, endpointArgs);
                else if (_ju.isArray(ep)) {
                    endpointArgs = _ju.merge(ep[1], endpointArgs);
                    return _e(ep[0], endpointArgs);
                }
            }.bind(this);

            endpoint.typeId = typeId;
            return endpoint;
        };

        this.setEndpoint = function(ep, doNotRepaint) {
            var _ep = this.prepareEndpoint(ep);
            this.setPreparedEndpoint(_ep, true);
        };

        this.setPreparedEndpoint = function (ep, doNotRepaint) {
            if (this.endpoint != null) {
                this.endpoint.cleanup();
                this.endpoint.destroy();
            }
            this.endpoint = ep;
            this.type = this.endpoint.type;
            this.canvas = this.endpoint.canvas;
        };

        _jp.extend(this, params, typeParameters);

        this.isSource = params.isSource || false;
        this.isTemporarySource = params.isTemporarySource || false;
        this.isTarget = params.isTarget || false;

        this.connections = params.connections || [];
        this.connectorPointerEvents = params["connector-pointer-events"];

        this.scope = params.scope || _jsPlumb.getDefaultScope();
        this.timestamp = null;
        this.reattachConnections = params.reattach || _jsPlumb.Defaults.ReattachConnections;
        this.connectionsDetachable = _jsPlumb.Defaults.ConnectionsDetachable;
        if (params.connectionsDetachable === false || params.detachable === false)
            this.connectionsDetachable = false;
        this.dragAllowedWhenFull = params.dragAllowedWhenFull !== false;

        if (params.onMaxConnections)
            this.bind("maxConnections", params.onMaxConnections);

        //
        // add a connection. not part of public API.
        //
        this.addConnection = function (connection) {
            this.connections.push(connection);
            this[(this.connections.length > 0 ? "add" : "remove") + "Class"](_jsPlumb.endpointConnectedClass);
            this[(this.isFull() ? "add" : "remove") + "Class"](_jsPlumb.endpointFullClass);
        };

        this.detachFromConnection = function (connection, idx, doNotCleanup) {
            //idx = idx == null ? findConnectionIndex(connection, this) : idx;
            idx = idx == null ? this.connections.indexOf(connection) : idx;
            if (idx >= 0) {
                this.connections.splice(idx, 1);
                this[(this.connections.length > 0 ? "add" : "remove") + "Class"](_jsPlumb.endpointConnectedClass);
                this[(this.isFull() ? "add" : "remove") + "Class"](_jsPlumb.endpointFullClass);
            }

            if (!doNotCleanup && this._deleteOnDetach && this.connections.length === 0) {
                _jsPlumb.deleteObject({
                    endpoint: this,
                    fireEvent: false,
                    deleteAttachedObjects: false
                });
            }
        };

        this.detach = function (connection, ignoreTarget, forceDetach, fireEvent, originalEvent, endpointBeingDeleted, connectionIndex) {

            var idx = connectionIndex == null ? this.connections.indexOf(connection) : connectionIndex,
                actuallyDetached = false;
            fireEvent = (fireEvent !== false);

            if (idx >= 0) {

                if (forceDetach || connection._forceDetach || (connection.isDetachable() && connection.isDetachAllowed(connection) && this.isDetachAllowed(connection) && _jsPlumb.checkCondition("beforeDetach", connection, endpointBeingDeleted) )) {

                    _jsPlumb.deleteObject({
                        connection: connection,
                        fireEvent: (!ignoreTarget && fireEvent),
                        originalEvent: originalEvent,
                        deleteAttachedObjects: false/**/
                    });
                    actuallyDetached = true;
                }
            }
            return actuallyDetached;
        };

        this.detachAll = function (fireEvent, forceDetach) {
            var unaffectedConns = [];
            while (this.connections.length > 0) {
                // TODO this could pass the index in to the detach method to save some time (index will always be zero in this while loop)
                var actuallyDetached = this.detach(this.connections[0], false, forceDetach === true, fireEvent !== false, null, this, 0);
                if (!actuallyDetached) {
                    unaffectedConns.push(this.connections[0]);
                    this.connections.splice(0, 1);
                }
            }
            this.connections = unaffectedConns;
            return this;
        };
        this.detachFrom = function (targetEndpoint, fireEvent, originalEvent) {
            var c = [];
            for (var i = 0; i < this.connections.length; i++) {
                if (this.connections[i].endpoints[1] == targetEndpoint || this.connections[i].endpoints[0] == targetEndpoint) {
                    c.push(this.connections[i]);
                }
            }
            for (var j = 0; j < c.length; j++) {
                this.detach(c[j], false, true, fireEvent, originalEvent);
            }
            return this;
        };

        this.getElement = function () {
            return this.element;
        };

        this.setElement = function (el) {
            var parentId = this._jsPlumb.instance.getId(el),
                curId = this.elementId;
            // remove the endpoint from the list for the current endpoint's element
            _ju.removeWithFunction(params.endpointsByElement[this.elementId], function (e) {
                return e.id == this.id;
            }.bind(this));
            this.element = jsPlumb.getElement(el);
            this.elementId = _jsPlumb.getId(this.element);
            _jsPlumb.anchorManager.rehomeEndpoint(this, curId, this.element);
            _jsPlumb.dragManager.endpointAdded(this.element);
            _ju.addToList(params.endpointsByElement, parentId, this);
            return this;
        };

        /**
         * private but must be exposed.
         */
        this.makeInPlaceCopy = function () {
            var loc = this.anchor.getCurrentLocation({element: this}),
                o = this.anchor.getOrientation(this),
                acc = this.anchor.getCssClass(),
                inPlaceAnchor = {
                    bind: function () {
                    },
                    compute: function () {
                        return [ loc[0], loc[1] ];
                    },
                    getCurrentLocation: function () {
                        return [ loc[0], loc[1] ];
                    },
                    getOrientation: function () {
                        return o;
                    },
                    getCssClass: function () {
                        return acc;
                    }
                };

            return _newEndpoint({
                dropOptions: params.dropOptions,
                anchor: inPlaceAnchor,
                source: this.element,
                paintStyle: this.getPaintStyle(),
                endpoint: params.hideOnDrag ? "Blank" : this.endpoint,
                _transient: true,
                scope: this.scope,
                reference:this
            });
        };

        /**
         * returns a connection from the pool; used when dragging starts.  just gets the head of the array if it can.
         */
        this.connectorSelector = function () {
            var candidate = this.connections[0];
            // SP target source refactor
            if (/*this.isTarget && */candidate) return candidate;
            else {
                return (this.connections.length < this._jsPlumb.maxConnections) || this._jsPlumb.maxConnections == -1 ? null : candidate;
            }
        };

        this.setStyle = this.setPaintStyle;

        this.paint = function (params) {
            params = params || {};
            var timestamp = params.timestamp, recalc = !(params.recalc === false);
            if (!timestamp || this.timestamp !== timestamp) {

                var info = _jsPlumb.updateOffset({ elId: this.elementId, timestamp: timestamp });

                var xy = params.offset ? params.offset.o : info.o;
                if (xy != null) {
                    var ap = params.anchorPoint, connectorPaintStyle = params.connectorPaintStyle;
                    if (ap == null) {
                        var wh = params.dimensions || info.s,
                            anchorParams = { xy: [ xy.left, xy.top ], wh: wh, element: this, timestamp: timestamp };
                        if (recalc && this.anchor.isDynamic && this.connections.length > 0) {
                            var c = findConnectionToUseForDynamicAnchor(this, params.elementWithPrecedence),
                                oIdx = c.endpoints[0] == this ? 1 : 0,
                                oId = oIdx === 0 ? c.sourceId : c.targetId,
                                oInfo = _jsPlumb.getCachedData(oId),
                                oOffset = oInfo.o, oWH = oInfo.s;
                            anchorParams.txy = [ oOffset.left, oOffset.top ];
                            anchorParams.twh = oWH;
                            anchorParams.tElement = c.endpoints[oIdx];
                        }
                        ap = this.anchor.compute(anchorParams);
                    }

                    this.endpoint.compute(ap, this.anchor.getOrientation(this), this._jsPlumb.paintStyleInUse, connectorPaintStyle || this.paintStyleInUse);
                    this.endpoint.paint(this._jsPlumb.paintStyleInUse, this.anchor);
                    this.timestamp = timestamp;

                    // paint overlays
                    for (var i in this._jsPlumb.overlays) {
                        if (this._jsPlumb.overlays.hasOwnProperty(i)) {
                            var o = this._jsPlumb.overlays[i];
                            if (o.isVisible()) {
                                this._jsPlumb.overlayPlacements[i] = o.draw(this.endpoint, this._jsPlumb.paintStyleInUse);
                                o.paint(this._jsPlumb.overlayPlacements[i]);
                            }
                        }
                    }
                }
            }
        };

        this.getTypeDescriptor = function () {
            return "endpoint";
        };
        this.isVisible = function () {
            return this._jsPlumb.visible;
        };

        this.repaint = this.paint;

        var draggingInitialised = false;
        this.initDraggable = function () {

            // is this a connection source? we make it draggable and have the
            // drag listener maintain a connection with a floating endpoint.
            if (!draggingInitialised && _jp.isDragSupported(this.element)) {
                var placeholderInfo = { id: null, element: null },
                    jpc = null,
                    existingJpc = false,
                    existingJpcParams = null,
                    _dragHandler = _makeConnectionDragHandler(this, placeholderInfo, _jsPlumb),
                    dragOptions = params.dragOptions || {},
                    defaultOpts = {},
                    startEvent = _jp.dragEvents.start,
                    stopEvent = _jp.dragEvents.stop,
                    dragEvent = _jp.dragEvents.drag,
                    beforeStartEvent = _jp.dragEvents.beforeStart,
                    payload;

                // respond to beforeStart from katavorio; this will have, optionally, a payload of attribute values
                // that were placed there by the makeSource mousedown listener.
                var beforeStart = function(beforeStartParams) {
                    payload = beforeStartParams.e.payload || {};
                };

                var start = function (startParams) {

// -------------   first, get a connection to drag. this may be null, in which case we are dragging a new one.

                    jpc = this.connectorSelector();

// -------------------------------- now a bunch of tests about whether or not to proceed -------------------------

                    var _continue = true;
                    // if not enabled, return
                    if (!this.isEnabled()) _continue = false;
                    // if no connection and we're not a source - or temporarily a source, as is the case with makeSource - return.
                    if (jpc == null && !this.isSource && !this.isTemporarySource) _continue = false;
                    // otherwise if we're full and not allowed to drag, also return false.
                    if (this.isSource && this.isFull() && !(jpc != null && this.dragAllowedWhenFull)) _continue = false;
                    // if the connection was setup as not detachable or one of its endpoints
                    // was setup as connectionsDetachable = false, or Defaults.ConnectionsDetachable
                    // is set to false...
                    if (jpc != null && !jpc.isDetachable(this)) _continue = false;

                    var beforeDrag = _jsPlumb.checkCondition(jpc == null ? "beforeDrag" : "beforeStartDetach", {
                        endpoint:this,
                        source:this.element,
                        sourceId:this.elementId,
                        connection:jpc
                    });
                    if (beforeDrag === false) _continue = false;
                    // else we might have been given some data. we'll pass it in to a new connection as 'data'.
                    // here we also merge in the optional payload we were given on mousedown.
                    else if (typeof beforeDrag === "object") {
                        jsPlumb.extend(beforeDrag, payload || {});
                    }
                    else
                        // or if no beforeDrag data, maybe use the payload on its own.
                        beforeDrag = payload || {};

                    if (_continue === false) {
                        // this is for mootools and yui. returning false from this causes jquery to stop drag.
                        // the events are wrapped in both mootools and yui anyway, but i don't think returning
                        // false from the start callback would stop a drag.
                        if (_jsPlumb.stopDrag) _jsPlumb.stopDrag(this.canvas);
                        _dragHandler.stopDrag();
                        return false;
                    }

// ---------------------------------------------------------------------------------------------------------------------

                    // ok to proceed.

                    // clear hover for all connections for this endpoint before continuing.
                    for (var i = 0; i < this.connections.length; i++)
                        this.connections[i].setHover(false);

                    this.addClass("endpointDrag");
                    _jsPlumb.setConnectionBeingDragged(true);

                    // if we're not full but there was a connection, make it null. we'll create a new one.
                    if (jpc && !this.isFull() && this.isSource) jpc = null;

                    _jsPlumb.updateOffset({ elId: this.elementId });

// ----------------    make the element we will drag around, and position it -----------------------------

                    var ipco = this._jsPlumb.instance.getOffset(this.canvas),
                        canvasElement = this.canvas,
                        ips = this._jsPlumb.instance.getSize(this.canvas);

                    _makeDraggablePlaceholder(placeholderInfo, _jsPlumb, ipco, ips);

                    // store the id of the dragging div and the source element. the drop function will pick these up.                   
                    _jsPlumb.setAttributes(this.canvas, {
                        "dragId": placeholderInfo.id,
                        "elId": this.elementId
                    });

// ------------------- create an endpoint that will be our floating endpoint ------------------------------------

                    var endpointToFloat = this.dragProxy || this.endpoint;
                    if (this.dragProxy == null && this.connectionType != null) {
                        var aae = this._jsPlumb.instance.deriveEndpointAndAnchorSpec(this.connectionType);
                        if (aae.endpoints[1]) endpointToFloat = aae.endpoints[1];
                    }
                    var centerAnchor = this._jsPlumb.instance.makeAnchor("Center");
                    centerAnchor.isFloating = true;
                    this._jsPlumb.floatingEndpoint = _makeFloatingEndpoint(this.getPaintStyle(), centerAnchor, endpointToFloat, this.canvas, placeholderInfo.element, _jsPlumb, _newEndpoint, this.scope);
                    var _savedAnchor = this._jsPlumb.floatingEndpoint.anchor;


                    if (jpc == null) {

                        this.setHover(false, false);
                        // create a connection. one end is this endpoint, the other is a floating endpoint.                    
                        jpc = _newConnection({
                            sourceEndpoint: this,
                            targetEndpoint: this._jsPlumb.floatingEndpoint,
                            source: this.element,  // for makeSource with parent option.  ensure source element is represented correctly.
                            target: placeholderInfo.element,
                            anchors: [ this.anchor, this._jsPlumb.floatingEndpoint.anchor ],
                            paintStyle: params.connectorStyle, // this can be null. Connection will use the default.
                            hoverPaintStyle: params.connectorHoverStyle,
                            connector: params.connector, // this can also be null. Connection will use the default.
                            overlays: params.connectorOverlays,
                            type: this.connectionType,
                            cssClass: this.connectorClass,
                            hoverClass: this.connectorHoverClass,
                            data:beforeDrag
                        });
                        jpc.pending = true;
                        jpc.addClass(_jsPlumb.draggingClass);
                        this._jsPlumb.floatingEndpoint.addClass(_jsPlumb.draggingClass);
                        this._jsPlumb.floatingEndpoint.anchor = _savedAnchor;
                        // fire an event that informs that a connection is being dragged
                        _jsPlumb.fire("connectionDrag", jpc);

                        // register the new connection on the drag manager. This connection, at this point, is 'pending',
                        // and has as its target a temporary element (the 'placeholder'). If the connection subsequently
                        // becomes established, the anchor manager is informed that the target of the connection has
                        // changed.

                        _jsPlumb.anchorManager.newConnection(jpc);

                    } else {
                        existingJpc = true;
                        jpc.setHover(false);
                        // new anchor idx
                        var anchorIdx = jpc.endpoints[0].id == this.id ? 0 : 1;
                        this.detachFromConnection(jpc, null, true);                         // detach from the connection while dragging is occurring. but dont cleanup automatically.

                        // store the original scope (issue 57)
                        var dragScope = _jsPlumb.getDragScope(canvasElement);
                        _jsPlumb.setAttribute(this.canvas, "originalScope", dragScope);

                        // fire an event that informs that a connection is being dragged. we do this before
                        // replacing the original target with the floating element info.
                        _jsPlumb.fire("connectionDrag", jpc);

                        // now we replace ourselves with the temporary div we created above:
                        if (anchorIdx === 0) {
                            existingJpcParams = [ jpc.source, jpc.sourceId, canvasElement, dragScope ];
                            jpc.source = placeholderInfo.element;
                            jpc.sourceId = placeholderInfo.id;

                            _jsPlumb.anchorManager.sourceChanged(jpc.endpoints[anchorIdx].elementId, jpc.sourceId, jpc);

                        } else {
                            existingJpcParams = [ jpc.target, jpc.targetId, canvasElement, dragScope ];
                            jpc.target = placeholderInfo.element;
                            jpc.targetId = placeholderInfo.id;

                            _jsPlumb.anchorManager.updateOtherEndpoint(jpc.sourceId, jpc.endpoints[anchorIdx].elementId, jpc.targetId, jpc);
                        }

                        // lock the other endpoint; if it is dynamic it will not move while the drag is occurring.
                        // TODO SP i commented this out as part of the rewirte; i think now we want the other endpoint
                        // to behave naturally.
                        // SJP
                        //jpc.endpoints[anchorIdx === 0 ? 1 : 0].anchor.locked = true;


                        // store the original endpoint and assign the new floating endpoint for the drag.
                        jpc.suspendedEndpoint = jpc.endpoints[anchorIdx];

                        // PROVIDE THE SUSPENDED ELEMENT, BE IT A SOURCE OR TARGET (ISSUE 39)
                        jpc.suspendedElement = jpc.endpoints[anchorIdx].getElement();
                        jpc.suspendedElementId = jpc.endpoints[anchorIdx].elementId;
                        jpc.suspendedElementType = anchorIdx === 0 ? "source" : "target";

                        jpc.suspendedEndpoint.setHover(false);
                        this._jsPlumb.floatingEndpoint.referenceEndpoint = jpc.suspendedEndpoint;
                        jpc.endpoints[anchorIdx] = this._jsPlumb.floatingEndpoint;

                        jpc.addClass(_jsPlumb.draggingClass);
                        this._jsPlumb.floatingEndpoint.addClass(_jsPlumb.draggingClass);
                    }

                    // register it and register connection on it.
                    _jsPlumb.floatingConnections[placeholderInfo.id] = jpc;
                    // only register for the target endpoint; we will not be dragging the source at any time
                    // before this connection is either discarded or made into a permanent connection.
                    _ju.addToList(params.endpointsByElement, placeholderInfo.id, this._jsPlumb.floatingEndpoint);
                    // tell jsplumb about it
                    _jsPlumb.currentlyDragging = true;
                }.bind(this);

                var stop = function () {
                    _jsPlumb.setConnectionBeingDragged(false);

                    if (jpc && jpc.endpoints != null) {
                        // get the actual drop event (decode from library args to stop function)
                        var originalEvent = _jsPlumb.getDropEvent(arguments);
                        // unlock the other endpoint (if it is dynamic, it would have been locked at drag start)
                        var idx = _jsPlumb.getFloatingAnchorIndex(jpc);
                        jpc.endpoints[idx === 0 ? 1 : 0].anchor.locked = false;
                        // TODO: Dont want to know about css classes inside jsplumb, ideally.
                        jpc.removeClass(_jsPlumb.draggingClass);

                        // if we have the floating endpoint then the connection has not been dropped
                        // on another endpoint.  If it is a new connection we throw it away. If it is an
                        // existing connection we check to see if we should reattach it, throwing it away
                        // if not.
                        if (this._jsPlumb && (jpc.deleteConnectionNow || jpc.endpoints[idx] == this._jsPlumb.floatingEndpoint)) {
                            // 6a. if the connection was an existing one...
                            if (existingJpc && jpc.suspendedEndpoint) {
                                // fix for issue35, thanks Sylvain Gizard: when firing the detach event make sure the
                                // floating endpoint has been replaced.
                                if (idx === 0) {
                                    jpc.floatingElement = jpc.source;
                                    jpc.floatingId = jpc.sourceId;
                                    jpc.floatingEndpoint = jpc.endpoints[0];
                                    jpc.floatingIndex = 0;
                                    jpc.source = existingJpcParams[0];
                                    jpc.sourceId = existingJpcParams[1];
                                } else {
                                    // keep a copy of the floating element; the anchor manager will want to clean up.
                                    jpc.floatingElement = jpc.target;
                                    jpc.floatingId = jpc.targetId;
                                    jpc.floatingEndpoint = jpc.endpoints[1];
                                    jpc.floatingIndex = 1;
                                    jpc.target = existingJpcParams[0];
                                    jpc.targetId = existingJpcParams[1];
                                }

                                var fe = this._jsPlumb.floatingEndpoint; // store for later removal.
                                // restore the original scope (issue 57)
                                _jsPlumb.setDragScope(existingJpcParams[2], existingJpcParams[3]);
                                jpc.endpoints[idx] = jpc.suspendedEndpoint;
                                // IF the connection should be reattached, or the other endpoint refuses detach, then
                                // reset the connection to its original state
                                if (jpc.isReattach() || jpc._forceReattach || jpc._forceDetach || !jpc.endpoints[idx === 0 ? 1 : 0].detach(jpc, false, false, true, originalEvent, true)) {
                                    jpc.setHover(false);
                                    jpc._forceDetach = null;
                                    jpc._forceReattach = null;
                                    this._jsPlumb.floatingEndpoint.detachFromConnection(jpc);
                                    jpc.suspendedEndpoint.addConnection(jpc);

                                    // TODO this code is duplicated in lots of places...and there is nothing external
                                    // in the code; it all refers to the connection itself. we could add a
                                    // `checkSanity(connection)` method to anchorManager that did this.
                                    if (idx == 1) {
                                        _jsPlumb.anchorManager.updateOtherEndpoint(jpc.sourceId, jpc.floatingId, jpc.targetId, jpc);
                                    }
                                    else {
                                        _jsPlumb.anchorManager.sourceChanged(jpc.floatingId, jpc.sourceId, jpc);
                                    }

                                    _jsPlumb.repaint(existingJpcParams[1]);
                                }
                                else {
                                    _jsPlumb.deleteObject({endpoint: fe});
                                }
                            }
                        }

                        // makeTargets sets this flag, to tell us we have been replaced and should delete this object.
                        if (this.deleteAfterDragStop) {
                            _jsPlumb.deleteObject({endpoint: this});
                        }
                        else {
                            if (this._jsPlumb) {
                                 this.paint({recalc: false});
                            }
                        }

                        // although the connection is no longer valid, there are use cases where this is useful.
                        _jsPlumb.fire("connectionDragStop", jpc, originalEvent);
                        // tell jsplumb that dragging is finished.
                        _jsPlumb.currentlyDragging = false;
                        jpc = null;
                    }

                    // if no endpoints, jpc already cleaned up. but still we want to ensure we're reset properly.
                    // remove the element associated with the floating endpoint
                    // (and its associated floating endpoint and visual artefacts)
                    if (placeholderInfo && placeholderInfo.element) {
                        _jsPlumb.remove(placeholderInfo.element, false, false);
                    }
                    // remove the inplace copy
                    if (inPlaceCopy) {
                        _jsPlumb.deleteObject({endpoint: inPlaceCopy});
                    }

                    if (this._jsPlumb) {
                        // make our canvas visible (TODO: hand off to library; we should not know about DOM)
                        this.canvas.style.visibility = "visible";
                        // unlock our anchor
                        this.anchor.locked = false;
                        // clear floating anchor.
                        this._jsPlumb.floatingEndpoint = null;
                    }

                }.bind(this);

                dragOptions = _jp.extend(defaultOpts, dragOptions);
                dragOptions.scope = this.scope || dragOptions.scope;
                dragOptions[beforeStartEvent] = _ju.wrap(dragOptions[beforeStartEvent], beforeStart, false);
                dragOptions[startEvent] = _ju.wrap(dragOptions[startEvent], start, false);
                // extracted drag handler function so can be used by makeSource
                dragOptions[dragEvent] = _ju.wrap(dragOptions[dragEvent], _dragHandler.drag);
                dragOptions[stopEvent] = _ju.wrap(dragOptions[stopEvent], stop);
                dragOptions.multipleDrop = false;

                dragOptions.canDrag = function () {
                    return this.isSource || this.isTemporarySource || /*(this.isTarget && */this.connections.length > 0/*)*/;
                }.bind(this);

                _jsPlumb.initDraggable(this.canvas, dragOptions, "internal");

                this.canvas._jsPlumbRelatedElement = this.element;

                draggingInitialised = true;
            }
        };

        var ep = params.endpoint || this._jsPlumb.instance.Defaults.Endpoint || _jp.Defaults.Endpoint;
        this.setEndpoint(ep, true);
        var anchorParamsToUse = params.anchor ? params.anchor : params.anchors ? params.anchors : (_jsPlumb.Defaults.Anchor || "Top");
        this.setAnchor(anchorParamsToUse, true);

        // finally, set type if it was provided
        var type = [ "default", (params.type || "")].join(" ");
        this.addType(type, params.data, true);
        this.canvas = this.endpoint.canvas;
        this.canvas._jsPlumb = this;

        this.initDraggable();

        // pulled this out into a function so we can reuse it for the inPlaceCopy canvas; you can now drop detached connections
        // back onto the endpoint you detached it from.
        var _initDropTarget = function (canvas, isTransient, endpoint, referenceEndpoint) {

            if (_jp.isDropSupported(this.element)) {
                var dropOptions = params.dropOptions || _jsPlumb.Defaults.DropOptions || _jp.Defaults.DropOptions;
                dropOptions = _jp.extend({}, dropOptions);
                dropOptions.scope = dropOptions.scope || this.scope;
                var dropEvent = _jp.dragEvents.drop,
                    overEvent = _jp.dragEvents.over,
                    outEvent = _jp.dragEvents.out,
                    _ep = this,
                    drop = _jsPlumb.EndpointDropHandler({
                        getEndpoint: function () {
                            return _ep;
                        },
                        jsPlumb: _jsPlumb,
                        enabled: function () {
                            return endpoint != null ? endpoint.isEnabled() : true;
                        },
                        isFull: function () {
                            return endpoint.isFull();
                        },
                        element: this.element,
                        elementId: this.elementId,
                        isSource: this.isSource,
                        isTarget: this.isTarget,
                        addClass: function (clazz) {
                            _ep.addClass(clazz);
                        },
                        removeClass: function (clazz) {
                            _ep.removeClass(clazz);
                        },
                        isDropAllowed: function () {
                            return _ep.isDropAllowed.apply(_ep, arguments);
                        },
                        reference:referenceEndpoint,
                        isRedrop:function(jpc, dhParams) {
                            return jpc.suspendedEndpoint && dhParams.reference && (jpc.suspendedEndpoint.id === dhParams.reference.id);
                        }
                    });

                dropOptions[dropEvent] = _ju.wrap(dropOptions[dropEvent], drop, true);
                dropOptions[overEvent] = _ju.wrap(dropOptions[overEvent], function () {
                    var draggable = _jp.getDragObject(arguments),
                        id = _jsPlumb.getAttribute(_jp.getElement(draggable), "dragId"),
                        _jpc = _jsPlumb.floatingConnections[id];

                    if (_jpc != null) {
                        var idx = _jsPlumb.getFloatingAnchorIndex(_jpc);
                        // here we should fire the 'over' event if we are a target and this is a new connection,
                        // or we are the same as the floating endpoint.
                        var _cont = (this.isTarget && idx !== 0) || (_jpc.suspendedEndpoint && this.referenceEndpoint && this.referenceEndpoint.id == _jpc.suspendedEndpoint.id);
                        if (_cont) {
                            var bb = _jsPlumb.checkCondition("checkDropAllowed", {
                                sourceEndpoint: _jpc.endpoints[idx],
                                targetEndpoint: this,
                                connection: _jpc
                            });
                            this[(bb ? "add" : "remove") + "Class"](_jsPlumb.endpointDropAllowedClass);
                            this[(bb ? "remove" : "add") + "Class"](_jsPlumb.endpointDropForbiddenClass);
                            _jpc.endpoints[idx].anchor.over(this.anchor, this);
                        }
                    }
                }.bind(this));

                dropOptions[outEvent] = _ju.wrap(dropOptions[outEvent], function () {
                    var draggable = _jp.getDragObject(arguments),
                        id = draggable == null ? null : _jsPlumb.getAttribute(_jp.getElement(draggable), "dragId"),
                        _jpc = id ? _jsPlumb.floatingConnections[id] : null;

                    if (_jpc != null) {
                        var idx = _jsPlumb.getFloatingAnchorIndex(_jpc);
                        var _cont = (this.isTarget && idx !== 0) || (_jpc.suspendedEndpoint && this.referenceEndpoint && this.referenceEndpoint.id == _jpc.suspendedEndpoint.id);
                        if (_cont) {
                            this.removeClass(_jsPlumb.endpointDropAllowedClass);
                            this.removeClass(_jsPlumb.endpointDropForbiddenClass);
                            _jpc.endpoints[idx].anchor.out();
                        }
                    }
                }.bind(this));

                _jsPlumb.initDroppable(canvas, dropOptions, "internal", isTransient);
            }
        }.bind(this);

        // Initialise the endpoint's canvas as a drop target. The drop handler will take care of the logic of whether
        // something can actually be dropped.
        if (!this.anchor.isFloating)
            _initDropTarget(this.canvas, !(params._transient || this.anchor.isFloating), this, params.reference);


        return this;
    };

    _ju.extend(_jp.Endpoint, _jp.OverlayCapableJsPlumbUIComponent, {

        setVisible: function (v, doNotChangeConnections, doNotNotifyOtherEndpoint) {
            this._jsPlumb.visible = v;
            if (this.canvas) this.canvas.style.display = v ? "block" : "none";
            this[v ? "showOverlays" : "hideOverlays"]();
            if (!doNotChangeConnections) {
                for (var i = 0; i < this.connections.length; i++) {
                    this.connections[i].setVisible(v);
                    if (!doNotNotifyOtherEndpoint) {
                        var oIdx = this === this.connections[i].endpoints[0] ? 1 : 0;
                        // only change the other endpoint if this is its only connection.
                        if (this.connections[i].endpoints[oIdx].connections.length == 1) this.connections[i].endpoints[oIdx].setVisible(v, true, true);
                    }
                }
            }
        },
        getAttachedElements: function () {
            return this.connections;
        },
        applyType: function (t, doNotRepaint) {
            this.setPaintStyle(t.endpointStyle || t.paintStyle, doNotRepaint);
            this.setHoverPaintStyle(t.endpointHoverStyle || t.hoverPaintStyle, doNotRepaint);
            if (t.maxConnections != null) this._jsPlumb.maxConnections = t.maxConnections;
            if (t.scope) this.scope = t.scope;
            _jp.extend(this, t, typeParameters);
            if (t.cssClass != null && this.canvas) this._jsPlumb.instance.addClass(this.canvas, t.cssClass);
            _jp.OverlayCapableJsPlumbUIComponent.applyType(this, t);
        },
        isEnabled: function () {
            return this._jsPlumb.enabled;
        },
        setEnabled: function (e) {
            this._jsPlumb.enabled = e;
        },
        cleanup: function () {
            var anchorClass = this._jsPlumb.instance.endpointAnchorClassPrefix + (this._jsPlumb.currentAnchorClass ? "-" + this._jsPlumb.currentAnchorClass : "");
            jsPlumb.removeClass(this.element, anchorClass);
            this.anchor = null;
            this.endpoint.cleanup(true);
            this.endpoint.destroy();
            this.endpoint = null;
            // drag/drop
            this._jsPlumb.instance.destroyDraggable(this.canvas, "internal");
            this._jsPlumb.instance.destroyDroppable(this.canvas, "internal");
        },
        setHover: function (h) {
            if (this.endpoint && this._jsPlumb && !this._jsPlumb.instance.isConnectionBeingDragged())
                this.endpoint.setHover(h);
        },
        isFull: function () {
            return this._jsPlumb.maxConnections === 0 ? true : !(this.isFloating() || this._jsPlumb.maxConnections < 0 || this.connections.length < this._jsPlumb.maxConnections);
        },
        /**
         * private but needs to be exposed.
         */
        isFloating: function () {
            return this.anchor != null && this.anchor.isFloating;
        },
        isConnectedTo: function (endpoint) {
            var found = false;
            if (endpoint) {
                for (var i = 0; i < this.connections.length; i++) {
                    if (this.connections[i].endpoints[1] == endpoint || this.connections[i].endpoints[0] == endpoint) {
                        found = true;
                        break;
                    }
                }
            }
            return found;
        },
        getConnectionCost: function () {
            return this._jsPlumb.connectionCost;
        },
        setConnectionCost: function (c) {
            this._jsPlumb.connectionCost = c;
        },
        areConnectionsDirected: function () {
            return this._jsPlumb.connectionsDirected;
        },
        setConnectionsDirected: function (b) {
            this._jsPlumb.connectionsDirected = b;
        },
        setElementId: function (_elId) {
            this.elementId = _elId;
            this.anchor.elementId = _elId;
        },
        setReferenceElement: function (_el) {
            this.element = _jp.getElement(_el);
        },
        setDragAllowedWhenFull: function (allowed) {
            this.dragAllowedWhenFull = allowed;
        },
        equals: function (endpoint) {
            return this.anchor.equals(endpoint.anchor);
        },
        getUuid: function () {
            return this._jsPlumb.uuid;
        },
        computeAnchor: function (params) {
            return this.anchor.compute(params);
        }
    });

    root.jsPlumbInstance.prototype.EndpointDropHandler = function (dhParams) {
        return function (e) {

            var _jsPlumb = dhParams.jsPlumb;

            // remove the classes that are added dynamically. drop is neither forbidden nor allowed now that
            // the drop is finishing.
            dhParams.removeClass(_jsPlumb.endpointDropAllowedClass);
            dhParams.removeClass(_jsPlumb.endpointDropForbiddenClass);

            var originalEvent = _jsPlumb.getDropEvent(arguments),
                draggable = _jsPlumb.getDragObject(arguments),
                id = _jsPlumb.getAttribute(draggable, "dragId"),
                elId = _jsPlumb.getAttribute(draggable, "elId"),
                scope = _jsPlumb.getAttribute(draggable, "originalScope"),
                jpc = _jsPlumb.floatingConnections[id];

            // if no active connection, bail.
            if (jpc == null) return;

            // calculate if this is an existing connection.
            var existingConnection = jpc.suspendedEndpoint != null;

            // if suspended endpoint exists but has been cleaned up, bail. This means it's an existing connection
            // that has been detached and will shortly be discarded.
            if (existingConnection && jpc.suspendedEndpoint._jsPlumb == null) return;

            // get the drop endpoint. for a normal connection this is just the one that would replace the currently
            // floating endpoint. for a makeTarget this is a new endpoint that is created on drop. But we leave that to
            // the handler to figure out.
            var _ep = dhParams.getEndpoint(jpc);

            // If we're not given an endpoint to use, bail.
            if (_ep == null) return;

            // if this is a drop back where the connection came from, mark it force reattach and
            // return; the stop handler will reattach. without firing an event.
            if (dhParams.isRedrop(jpc, dhParams)) {
                jpc._forceReattach = true;
                jpc.setHover(false);
                if (dhParams.maybeCleanup) dhParams.maybeCleanup(_ep);
                return;
            }

            // ensure we dont bother trying to drop sources on non-source eps, and same for target.
            var idx = _jsPlumb.getFloatingAnchorIndex(jpc);
            if ((idx === 0 && !dhParams.isSource)|| (idx === 1 && !dhParams.isTarget)){
                if (dhParams.maybeCleanup) dhParams.maybeCleanup(_ep);
                return;
            }

            if (dhParams.onDrop) dhParams.onDrop(jpc);

            // restore the original scope if necessary (issue 57)
            if (scope) _jsPlumb.setDragScope(draggable, scope);

            // if the target of the drop is full, fire an event (we abort below)
            // makeTarget: keep.
            var isFull = dhParams.isFull(e);
            if (isFull) {
                _ep.fire("maxConnections", {
                    endpoint: this,
                    connection: jpc,
                    maxConnections: _ep._jsPlumb.maxConnections
                }, originalEvent);
            }
            //
            // if endpoint enabled, not full, and matches the index of the floating endpoint...
            if (!isFull &&  dhParams.enabled()) {
                var _doContinue = true;

                // before testing for beforeDrop, reset the connection's source/target to be the actual DOM elements
                // involved (that is, stash any temporary stuff used for dragging. but we need to keep it around in
                // order that the anchor manager can clean things up properly).
                if (idx === 0) {
                    jpc.floatingElement = jpc.source;
                    jpc.floatingId = jpc.sourceId;
                    jpc.floatingEndpoint = jpc.endpoints[0];
                    jpc.floatingIndex = 0;
                    jpc.source = dhParams.element;
                    jpc.sourceId = dhParams.elementId;
                } else {
                    jpc.floatingElement = jpc.target;
                    jpc.floatingId = jpc.targetId;
                    jpc.floatingEndpoint = jpc.endpoints[1];
                    jpc.floatingIndex = 1;
                    jpc.target = dhParams.element;
                    jpc.targetId = dhParams.elementId;
                }

                // if this is an existing connection and detach is not allowed we won't continue. The connection's
                // endpoints have been reinstated; everything is back to how it was.
                if (existingConnection && jpc.suspendedEndpoint.id != _ep.id) {

                    if (!jpc.isDetachAllowed(jpc) || !jpc.endpoints[idx].isDetachAllowed(jpc) || !jpc.suspendedEndpoint.isDetachAllowed(jpc) || !_jsPlumb.checkCondition("beforeDetach", jpc))
                        _doContinue = false;
                }

// ------------ wrap the execution path in a function so we can support asynchronous beforeDrop

                var continueFunction = function (optionalData) {
                    // remove this jpc from the current endpoint, which is a floating endpoint that we will
                    // subsequently discard.
                    jpc.endpoints[idx].detachFromConnection(jpc);

                    // if there's a suspended endpoint, detach it from the connection.
                    if (jpc.suspendedEndpoint) jpc.suspendedEndpoint.detachFromConnection(jpc);

                    jpc.endpoints[idx] = _ep;
                    _ep.addConnection(jpc);

                    // copy our parameters in to the connection:
                    var params = _ep.getParameters();
                    for (var aParam in params)
                        jpc.setParameter(aParam, params[aParam]);

                    if (!existingConnection) {
                        // if not an existing connection and
                        if (params.draggable)
                            _jsPlumb.initDraggable(this.element, dragOptions, "internal", _jsPlumb);
                    }
                    else {
                        var suspendedElementId = jpc.suspendedEndpoint.elementId;
                        _jsPlumb.fireMoveEvent({
                            index: idx,
                            originalSourceId: idx === 0 ? suspendedElementId : jpc.sourceId,
                            newSourceId: idx === 0 ? _ep.elementId : jpc.sourceId,
                            originalTargetId: idx == 1 ? suspendedElementId : jpc.targetId,
                            newTargetId: idx == 1 ? _ep.elementId : jpc.targetId,
                            originalSourceEndpoint: idx === 0 ? jpc.suspendedEndpoint : jpc.endpoints[0],
                            newSourceEndpoint: idx === 0 ? _ep : jpc.endpoints[0],
                            originalTargetEndpoint: idx == 1 ? jpc.suspendedEndpoint : jpc.endpoints[1],
                            newTargetEndpoint: idx == 1 ? _ep : jpc.endpoints[1],
                            connection: jpc
                        }, originalEvent);
                    }

                    if (idx == 1) {
                        _jsPlumb.anchorManager.updateOtherEndpoint(jpc.sourceId, jpc.floatingId, jpc.targetId, jpc);
                    }
                    else {
                        _jsPlumb.anchorManager.sourceChanged(jpc.floatingId, jpc.sourceId, jpc);
                    }

                    // when makeSource has uniqueEndpoint:true, we want to create connections with new endpoints
                    // that are subsequently deleted. So makeSource sets `finalEndpoint`, which is the Endpoint to
                    // which the connection should be attached. The `detachFromConnection` call below results in the
                    // temporary endpoint being cleaned up.
                    if (jpc.endpoints[0].finalEndpoint) {
                        var _toDelete = jpc.endpoints[0];
                        _toDelete.detachFromConnection(jpc);
                        jpc.endpoints[0] = jpc.endpoints[0].finalEndpoint;
                        jpc.endpoints[0].addConnection(jpc);
                    }

                    // if optionalData was given, merge it onto the connection's data.
                    if (jsPlumbUtil.isObject(optionalData)) {
                        jpc.mergeData(optionalData);
                    }
                    // finalise will inform the anchor manager and also add to
                    // connectionsByScope if necessary.
                    _jsPlumb.finaliseConnection(jpc, null, originalEvent, false);
                    jpc.setHover(false);

                }.bind(this);

                var dontContinueFunction = function () {
                    // otherwise just put it back on the endpoint it was on before the drag.
                    if (jpc.suspendedEndpoint) {
                        jpc.endpoints[idx] = jpc.suspendedEndpoint;
                        jpc.setHover(false);
                        jpc._forceDetach = true;
                        if (idx === 0) {
                            jpc.source = jpc.suspendedEndpoint.element;
                            jpc.sourceId = jpc.suspendedEndpoint.elementId;
                        } else {
                            jpc.target = jpc.suspendedEndpoint.element;
                            jpc.targetId = jpc.suspendedEndpoint.elementId;
                        }
                        jpc.suspendedEndpoint.addConnection(jpc);

                        // TODO checkSanity
                        if (idx == 1) {
                            _jsPlumb.anchorManager.updateOtherEndpoint(jpc.sourceId, jpc.floatingId, jpc.targetId, jpc);
                        }
                        else {
                            _jsPlumb.anchorManager.sourceChanged(jpc.floatingId, jpc.sourceId, jpc);
                        }

                        _jsPlumb.repaint(jpc.sourceId);
                        jpc._forceDetach = false;
                    }
                };

// --------------------------------------
                // now check beforeDrop.  this will be available only on Endpoints that are setup to
                // have a beforeDrop condition (although, secretly, under the hood all Endpoints and
                // the Connection have them, because they are on jsPlumbUIComponent.  shhh!), because
                // it only makes sense to have it on a target endpoint.
                _doContinue = _doContinue && dhParams.isDropAllowed(jpc.sourceId, jpc.targetId, jpc.scope, jpc, _ep);// && jpc.pending;

                if (_doContinue) {
                    continueFunction(_doContinue);
                    return true;
                }
                else {
                    dontContinueFunction();
                }
            }

            if (dhParams.maybeCleanup) dhParams.maybeCleanup(_ep);

            _jsPlumb.currentlyDragging = false;
        };
    };
}).call(this);

/*
 * jsPlumb
 * 
 * Title:jsPlumb 2.0.2
 * 
 * Provides a way to visually connect elements on an HTML page, using SVG.
 * 
 * This file contains the code for Connections.
 *
 * Copyright (c) 2010 - 2015 jsPlumb (hello@jsplumbtoolkit.com)
 * 
 * http://jsplumbtoolkit.com
 * http://github.com/sporritt/jsplumb
 * 
 * Dual licensed under the MIT and GPL2 licenses.
 */
;
(function () {

    "use strict";
    var root = this,
        _jp = root.jsPlumb,
        _ju = root.jsPlumbUtil;


    var makeConnector = function (_jsPlumb, renderMode, connectorName, connectorArgs, forComponent) {
            if (!_jsPlumb.Defaults.DoNotThrowErrors && jsPlumb.Connectors[renderMode][connectorName] == null)
                throw { msg: "jsPlumb: unknown connector type '" + connectorName + "'" };

            return new _jp.Connectors[renderMode][connectorName](connectorArgs, forComponent);
        },
        _makeAnchor = function (anchorParams, elementId, _jsPlumb) {
            return (anchorParams) ? _jsPlumb.makeAnchor(anchorParams, elementId, _jsPlumb) : null;
        },
        _updateConnectedClass = function (conn, element, _jsPlumb, remove) {
            if (element != null) {
                element._jsPlumbConnections = element._jsPlumbConnections || {};
                if (remove)
                    delete element._jsPlumbConnections[conn.id];
                else
                    element._jsPlumbConnections[conn.id] = true;

                if (_ju.isEmpty(element._jsPlumbConnections)) {
                    _jsPlumb.removeClass(element, _jsPlumb.connectedClass);
                }
                else
                    _jsPlumb.addClass(element, _jsPlumb.connectedClass);
            }
        };

    _jp.Connection = function (params) {
        var _newEndpoint = params.newEndpoint;

        this.id = params.id;
        this.connector = null;
        this.idPrefix = "_jsplumb_c_";
        this.defaultLabelLocation = 0.5;
        this.defaultOverlayKeys = ["Overlays", "ConnectionOverlays"];
        // if a new connection is the result of moving some existing connection, params.previousConnection
        // will have that Connection in it. listeners for the jsPlumbConnection event can look for that
        // member and take action if they need to.
        this.previousConnection = params.previousConnection;
        this.source = _jp.getElement(params.source);
        this.target = _jp.getElement(params.target);
        // sourceEndpoint and targetEndpoint override source/target, if they are present. but 
        // source is not overridden if the Endpoint has declared it is not the final target of a connection;
        // instead we use the source that the Endpoint declares will be the final source element.
        if (params.sourceEndpoint) this.source = params.sourceEndpoint.getElement();
        if (params.targetEndpoint) this.target = params.targetEndpoint.getElement();

        _jp.OverlayCapableJsPlumbUIComponent.apply(this, arguments);

        this.sourceId = this._jsPlumb.instance.getId(this.source);
        this.targetId = this._jsPlumb.instance.getId(this.target);
        this.scope = params.scope; // scope may have been passed in to the connect call. if it wasn't, we will pull it from the source endpoint, after having initialised the endpoints.            
        this.endpoints = [];
        this.endpointStyles = [];

        var _jsPlumb = this._jsPlumb.instance;

        _jsPlumb.manage(this.sourceId, this.source);
        _jsPlumb.manage(this.targetId, this.target);

        this._jsPlumb.visible = true;
        this._jsPlumb.editable = params.editable === true;
        this._jsPlumb.params = {
            cssClass: params.cssClass,
            container: params.container,
            "pointer-events": params["pointer-events"],
            editorParams: params.editorParams,
            overlays: params.overlays
        };
        this._jsPlumb.lastPaintedAt = null;

        // listen to mouseover and mouseout events passed from the container delegate.
        this.bind("mouseover", function () {
            this.setHover(true);
        }.bind(this));
        this.bind("mouseout", function () {
            this.setHover(false);
        }.bind(this));

// INITIALISATION CODE

        this.makeEndpoint = function (isSource, el, elId, ep) {
            elId = elId || this._jsPlumb.instance.getId(el);
            return this.prepareEndpoint(_jsPlumb, _newEndpoint, this, ep, isSource ? 0 : 1, params, el, elId);
        };

        // if type given, get the endpoint definitions mapping to that type from the jsplumb instance, and use those.
        // we apply types at the end of this constructor but endpoints are only honoured in a type definition at
        // create time.
        if (params.type) {
            params.endpoints = this._jsPlumb.instance.deriveEndpointAndAnchorSpec(params.type).endpoints;
        }

        var eS = this.makeEndpoint(true, this.source, this.sourceId, params.sourceEndpoint),
            eT = this.makeEndpoint(false, this.target, this.targetId, params.targetEndpoint);

        if (eS) _ju.addToList(params.endpointsByElement, this.sourceId, eS);
        if (eT) _ju.addToList(params.endpointsByElement, this.targetId, eT);
        // if scope not set, set it to be the scope for the source endpoint.
        if (!this.scope) this.scope = this.endpoints[0].scope;

        // if explicitly told to (or not to) delete endpoints on detach, override endpoint's preferences
        if (params.deleteEndpointsOnDetach != null) {
            this.endpoints[0]._deleteOnDetach = params.deleteEndpointsOnDetach;
            this.endpoints[1]._deleteOnDetach = params.deleteEndpointsOnDetach;
        }
        else {
            // otherwise, unless the endpoints say otherwise, mark them for deletion.
            if (!this.endpoints[0]._doNotDeleteOnDetach) this.endpoints[0]._deleteOnDetach = true;
            if (!this.endpoints[1]._doNotDeleteOnDetach) this.endpoints[1]._deleteOnDetach = true;
        }

// -------------------------- DEFAULT TYPE ---------------------------------------------

        // DETACHABLE
        var _detachable = _jsPlumb.Defaults.ConnectionsDetachable;
        if (params.detachable === false) _detachable = false;
        if (this.endpoints[0].connectionsDetachable === false) _detachable = false;
        if (this.endpoints[1].connectionsDetachable === false) _detachable = false;
        // REATTACH
        var _reattach = params.reattach || this.endpoints[0].reattachConnections || this.endpoints[1].reattachConnections || _jsPlumb.Defaults.ReattachConnections;

        this.appendToDefaultType({
            detachable: _detachable,
            rettach: _reattach,
            paintStyle:this.endpoints[0].connectorStyle || this.endpoints[1].connectorStyle || params.paintStyle || _jsPlumb.Defaults.PaintStyle || jsPlumb.Defaults.PaintStyle,
            hoverPaintStyle:this.endpoints[0].connectorHoverStyle || this.endpoints[1].connectorHoverStyle || params.hoverPaintStyle || _jsPlumb.Defaults.HoverPaintStyle || jsPlumb.Defaults.HoverPaintStyle
        });


        var _suspendedAt = _jsPlumb.getSuspendedAt();
        if (!_jsPlumb.isSuspendDrawing()) {
            // paint the endpoints
            var myInfo = _jsPlumb.getCachedData(this.sourceId),
                myOffset = myInfo.o, myWH = myInfo.s,
                otherInfo = _jsPlumb.getCachedData(this.targetId),
                otherOffset = otherInfo.o,
                otherWH = otherInfo.s,
                initialTimestamp = _suspendedAt || _jsPlumb.timestamp(),
                anchorLoc = this.endpoints[0].anchor.compute({
                    xy: [ myOffset.left, myOffset.top ], wh: myWH, element: this.endpoints[0],
                    elementId: this.endpoints[0].elementId,
                    txy: [ otherOffset.left, otherOffset.top ], twh: otherWH, tElement: this.endpoints[1],
                    timestamp: initialTimestamp
                });

            this.endpoints[0].paint({ anchorLoc: anchorLoc, timestamp: initialTimestamp });

            anchorLoc = this.endpoints[1].anchor.compute({
                xy: [ otherOffset.left, otherOffset.top ], wh: otherWH, element: this.endpoints[1],
                elementId: this.endpoints[1].elementId,
                txy: [ myOffset.left, myOffset.top ], twh: myWH, tElement: this.endpoints[0],
                timestamp: initialTimestamp
            });
            this.endpoints[1].paint({ anchorLoc: anchorLoc, timestamp: initialTimestamp });
        }

        this.getTypeDescriptor = function () {
            return "connection";
        };
        this.getAttachedElements = function () {
            return this.endpoints;
        };

        this.isDetachable = function () {
            return this._jsPlumb.detachable === true;
        };
        this.setDetachable = function (detachable) {
            this._jsPlumb.detachable = detachable === true;
        };
        this.isReattach = function () {
            return this._jsPlumb.reattach === true || this.endpoints[0].reattachConnections === true || this.endpoints[1].reattachConnections === true;
        };
        this.setReattach = function (reattach) {
            this._jsPlumb.reattach = reattach === true;
        };

// END INITIALISATION CODE


// COST + DIRECTIONALITY
        // if cost not supplied, try to inherit from source endpoint
        this._jsPlumb.cost = params.cost || this.endpoints[0].getConnectionCost();
        this._jsPlumb.directed = params.directed;
        // inherit directed flag if set no source endpoint
        if (params.directed == null) this._jsPlumb.directed = this.endpoints[0].areConnectionsDirected();
// END COST + DIRECTIONALITY

// PARAMETERS
        // merge all the parameters objects into the connection.  parameters set
        // on the connection take precedence; then source endpoint params, then
        // finally target endpoint params.
        var _p = jsPlumb.extend({}, this.endpoints[1].getParameters());
        _jp.extend(_p, this.endpoints[0].getParameters());
        _jp.extend(_p, this.getParameters());
        this.setParameters(_p);
// END PARAMETERS

// PAINTING

        this.setConnector(this.endpoints[0].connector || this.endpoints[1].connector || params.connector || _jsPlumb.Defaults.Connector || _jp.Defaults.Connector, true);
        var data = params.data == null || !jsPlumbUtil.isObject(params.data) ? {} : params.data;
        this.getData = function() { return data; };
        this.setData = function(d) { data = d || {}; };
        this.mergeData = function(d) { data = jsPlumb.extend(data, d); };

        // the very last thing we do is apply types, if there are any.
        var _types = [ "default", this.endpoints[0].connectionType, this.endpoints[1].connectionType,  params.type ].join(" ");
        if (/[^\s]/.test(_types))
            this.addType(_types, params.data, true);

        this.updateConnectedClass();

// END PAINTING    
    };

    _ju.extend(_jp.Connection, _jp.OverlayCapableJsPlumbUIComponent, {
        applyType: function (t, doNotRepaint, typeMap) {

            // none of these things result in the creation of objects so can be ignored.
            if (t.detachable != null) this.setDetachable(t.detachable);
            if (t.reattach != null) this.setReattach(t.reattach);
            if (t.scope) this.scope = t.scope;

            if (t.cssClass != null && this.canvas) this._jsPlumb.instance.addClass(this.canvas, t.cssClass);

            var _anchors = null;
            // this also results in the creation of objects.
            if (t.anchor) {
                // note that even if the param was anchor, we store `anchors`.
                _anchors = this.getCachedTypeItem("anchors", typeMap.anchor);
                if (_anchors == null) {
                    _anchors = [ this._jsPlumb.instance.makeAnchor(t.anchor), this._jsPlumb.instance.makeAnchor(t.anchor) ];
                    this.cacheTypeItem("anchors", _anchors, typeMap.anchor);
                }
            }
            else if (t.anchors) {
                _anchors = this.getCachedTypeItem("anchors", typeMap.anchors);
                if (_anchors == null) {
                    _anchors = [
                        this._jsPlumb.instance.makeAnchor(t.anchors[0]),
                        this._jsPlumb.instance.makeAnchor(t.anchors[1])
                    ];
                    this.cacheTypeItem("anchors", _anchors, typeMap.anchors);
                }
            }
            if (_anchors != null) {
                this.endpoints[0].anchor = _anchors[0];
                this.endpoints[1].anchor = _anchors[1];
                if (this.endpoints[1].anchor.isDynamic) this._jsPlumb.instance.repaint(this.endpoints[1].elementId);
            }

            _jp.OverlayCapableJsPlumbUIComponent.applyType(this, t);
        },
        addClass: function (c, informEndpoints) {
            if (informEndpoints) {
                this.endpoints[0].addClass(c);
                this.endpoints[1].addClass(c);
                if (this.suspendedEndpoint) this.suspendedEndpoint.addClass(c);
            }
            if (this.connector) {
                this.connector.addClass(c);
            }
        },
        removeClass: function (c, informEndpoints) {
            if (informEndpoints) {
                this.endpoints[0].removeClass(c);
                this.endpoints[1].removeClass(c);
                if (this.suspendedEndpoint) this.suspendedEndpoint.removeClass(c);
            }
            if (this.connector) {
                this.connector.removeClass(c);
            }
        },
        isVisible: function () {
            return this._jsPlumb.visible;
        },
        setVisible: function (v) {
            this._jsPlumb.visible = v;
            if (this.connector)
                this.connector.setVisible(v);
            this.repaint();
        },
        cleanup: function () {
            this.updateConnectedClass(true);
            this.endpoints = null;
            this.source = null;
            this.target = null;
            if (this.connector != null) {
                this.connector.cleanup(true);
                this.connector.destroy(true);
            }
            this.connector = null;
        },
        updateConnectedClass:function(remove) {
            _updateConnectedClass(this, this.source, this._jsPlumb.instance, remove);
            _updateConnectedClass(this, this.target, this._jsPlumb.instance, remove);
        },
        setHover: function (state) {
            if (this.connector && this._jsPlumb && !this._jsPlumb.instance.isConnectionBeingDragged()) {
                this.connector.setHover(state);
                root.jsPlumb[state ? "addClass" : "removeClass"](this.source, this._jsPlumb.instance.hoverSourceClass);
                root.jsPlumb[state ? "addClass" : "removeClass"](this.target, this._jsPlumb.instance.hoverTargetClass);
            }
        },
        getUuids:function() {
            return [ this.endpoints[0].getUuid(), this.endpoints[1].getUuid() ];
        },
        getCost: function () {
            return this._jsPlumb.cost;
        },
        setCost: function (c) {
            this._jsPlumb.cost = c;
        },
        isDirected: function () {
            return this._jsPlumb.directed === true;
        },
        getConnector: function () {
            return this.connector;
        },
        prepareConnector:function(connectorSpec, typeId) {
            var connectorArgs = {
                    _jsPlumb: this._jsPlumb.instance,
                    cssClass: this._jsPlumb.params.cssClass,
                    container: this._jsPlumb.params.container,
                    "pointer-events": this._jsPlumb.params["pointer-events"]
                },
                renderMode = this._jsPlumb.instance.getRenderMode(),
                connector;

            if (_ju.isString(connectorSpec))
                connector = makeConnector(this._jsPlumb.instance, renderMode, connectorSpec, connectorArgs, this); // lets you use a string as shorthand.
            else if (_ju.isArray(connectorSpec)) {
                if (connectorSpec.length == 1)
                    connector = makeConnector(this._jsPlumb.instance, renderMode, connectorSpec[0], connectorArgs, this);
                else
                    connector = makeConnector(this._jsPlumb.instance, renderMode, connectorSpec[0], _ju.merge(connectorSpec[1], connectorArgs), this);
            }
            if (typeId != null) connector.typeId = typeId;
            return connector;
        },
        setPreparedConnector: function(connector, doNotRepaint, doNotChangeListenerComponent, typeId) {

            var previous, previousClasses = "";
            // the connector will not be cleaned up if it was set as part of a type, because `typeId` will be set on it
            // and we havent passed in `true` for "force" here.
            if (this.connector != null) {
                previous = this.connector;
                previousClasses = previous.getClass();
                this.connector.cleanup();
                this.connector.destroy();
            }

            this.connector = connector;
            if (typeId) {
                this.cacheTypeItem("connector", connector, typeId);
            }

            this.canvas = this.connector.canvas;
            this.bgCanvas = this.connector.bgCanvas;

            // put classes from prior connector onto the canvas
            this.addClass(previousClasses);

            // new: instead of binding listeners per connector, we now just have one delegate on the container.
            // so for that handler we set the connection as the '_jsPlumb' member of the canvas element, and
            // bgCanvas, if it exists, which it does right now in the VML renderer, so it won't from v 2.0.0 onwards.
            if (this.canvas) this.canvas._jsPlumb = this;
            if (this.bgCanvas) this.bgCanvas._jsPlumb = this;

            if (previous != null) {
                var o = this.getOverlays();
                for (var i = 0; i < o.length; i++) {
                    if (o[i].transfer) o[i].transfer(this.connector);
                }
            }

            if (!doNotChangeListenerComponent) this.setListenerComponent(this.connector);
            if (!doNotRepaint) this.repaint();
        },
        setConnector: function (connectorSpec, doNotRepaint, doNotChangeListenerComponent, typeId) {
            var connector = this.prepareConnector(connectorSpec, typeId);
            this.setPreparedConnector(connector, doNotRepaint, doNotChangeListenerComponent, typeId);
        },
        paint: function (params) {

            if (!this._jsPlumb.instance.isSuspendDrawing() && this._jsPlumb.visible) {
                params = params || {};
                var timestamp = params.timestamp,
                // if the moving object is not the source we must transpose the two references.
                    swap = false,
                    tId = swap ? this.sourceId : this.targetId, sId = swap ? this.targetId : this.sourceId,
                    tIdx = swap ? 0 : 1, sIdx = swap ? 1 : 0;

                if (timestamp == null || timestamp != this._jsPlumb.lastPaintedAt) {
                    var sourceInfo = this._jsPlumb.instance.updateOffset({elId:sId}).o,
                        targetInfo = this._jsPlumb.instance.updateOffset({elId:tId}).o,
                        sE = this.endpoints[sIdx], tE = this.endpoints[tIdx];

                    var sAnchorP = sE.anchor.getCurrentLocation({xy: [sourceInfo.left, sourceInfo.top], wh: [sourceInfo.width, sourceInfo.height], element: sE, timestamp: timestamp}),
                        tAnchorP = tE.anchor.getCurrentLocation({xy: [targetInfo.left, targetInfo.top], wh: [targetInfo.width, targetInfo.height], element: tE, timestamp: timestamp});

                    this.connector.resetBounds();

                    this.connector.compute({
                        sourcePos: sAnchorP,
                        targetPos: tAnchorP,
                        sourceEndpoint: this.endpoints[sIdx],
                        targetEndpoint: this.endpoints[tIdx],
                        lineWidth: this._jsPlumb.paintStyleInUse.lineWidth,
                        sourceInfo: sourceInfo,
                        targetInfo: targetInfo
                    });

                    var overlayExtents = { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity };

                    // compute overlays. we do this first so we can get their placements, and adjust the
                    // container if needs be (if an overlay would be clipped)
                    for (var i in this._jsPlumb.overlays) {
                        if (this._jsPlumb.overlays.hasOwnProperty(i)) {
                            var o = this._jsPlumb.overlays[i];
                            if (o.isVisible()) {
                                this._jsPlumb.overlayPlacements[i] = o.draw(this.connector, this._jsPlumb.paintStyleInUse, this.getAbsoluteOverlayPosition(o));
                                overlayExtents.minX = Math.min(overlayExtents.minX, this._jsPlumb.overlayPlacements[i].minX);
                                overlayExtents.maxX = Math.max(overlayExtents.maxX, this._jsPlumb.overlayPlacements[i].maxX);
                                overlayExtents.minY = Math.min(overlayExtents.minY, this._jsPlumb.overlayPlacements[i].minY);
                                overlayExtents.maxY = Math.max(overlayExtents.maxY, this._jsPlumb.overlayPlacements[i].maxY);
                            }
                        }
                    }

                    var lineWidth = parseFloat(this._jsPlumb.paintStyleInUse.lineWidth || 1) / 2,
                        outlineWidth = parseFloat(this._jsPlumb.paintStyleInUse.lineWidth || 0),
                        extents = {
                            xmin: Math.min(this.connector.bounds.minX - (lineWidth + outlineWidth), overlayExtents.minX),
                            ymin: Math.min(this.connector.bounds.minY - (lineWidth + outlineWidth), overlayExtents.minY),
                            xmax: Math.max(this.connector.bounds.maxX + (lineWidth + outlineWidth), overlayExtents.maxX),
                            ymax: Math.max(this.connector.bounds.maxY + (lineWidth + outlineWidth), overlayExtents.maxY)
                        };
                    // paint the connector.
                    this.connector.paint(this._jsPlumb.paintStyleInUse, null, extents);
                    // and then the overlays
                    for (var j in this._jsPlumb.overlays) {
                        if (this._jsPlumb.overlays.hasOwnProperty(j)) {
                            var p = this._jsPlumb.overlays[j];
                            if (p.isVisible()) {
                                p.paint(this._jsPlumb.overlayPlacements[j], extents);
                            }
                        }
                    }
                }
                this._jsPlumb.lastPaintedAt = timestamp;
            }
        },
        repaint: function (params) {
            params = params || {};
            this.paint({ elId: this.sourceId, recalc: !(params.recalc === false), timestamp: params.timestamp});
        },
        prepareEndpoint: function (_jsPlumb, _newEndpoint, conn, existing, index, params, element, elementId) {
            var e;
            if (existing) {
                conn.endpoints[index] = existing;
                existing.addConnection(conn);
            } else {
                if (!params.endpoints) params.endpoints = [ null, null ];
                var ep = params.endpoints[index] || params.endpoint || _jsPlumb.Defaults.Endpoints[index] || jsPlumb.Defaults.Endpoints[index] || _jsPlumb.Defaults.Endpoint || jsPlumb.Defaults.Endpoint;
                if (!params.endpointStyles) params.endpointStyles = [ null, null ];
                if (!params.endpointHoverStyles) params.endpointHoverStyles = [ null, null ];
                var es = params.endpointStyles[index] || params.endpointStyle || _jsPlumb.Defaults.EndpointStyles[index] || jsPlumb.Defaults.EndpointStyles[index] || _jsPlumb.Defaults.EndpointStyle || jsPlumb.Defaults.EndpointStyle;
                // Endpoints derive their fillStyle from the connector's strokeStyle, if no fillStyle was specified.
                if (es.fillStyle == null && params.paintStyle != null)
                    es.fillStyle = params.paintStyle.strokeStyle;

                if (es.outlineColor == null && params.paintStyle != null)
                    es.outlineColor = params.paintStyle.outlineColor;
                if (es.outlineWidth == null && params.paintStyle != null)
                    es.outlineWidth = params.paintStyle.outlineWidth;

                var ehs = params.endpointHoverStyles[index] || params.endpointHoverStyle || _jsPlumb.Defaults.EndpointHoverStyles[index] || jsPlumb.Defaults.EndpointHoverStyles[index] || _jsPlumb.Defaults.EndpointHoverStyle || jsPlumb.Defaults.EndpointHoverStyle;
                // endpoint hover fill style is derived from connector's hover stroke style
                if (params.hoverPaintStyle != null) {
                    if (ehs == null) ehs = {};
                    if (ehs.fillStyle == null) {
                        ehs.fillStyle = params.hoverPaintStyle.strokeStyle;
                    }
                }
                var a = params.anchors ? params.anchors[index] :
                        params.anchor ? params.anchor :
                            _makeAnchor(_jsPlumb.Defaults.Anchors[index], elementId, _jsPlumb) ||
                            _makeAnchor(_jp.Defaults.Anchors[index], elementId, _jsPlumb) ||
                            _makeAnchor(_jsPlumb.Defaults.Anchor, elementId, _jsPlumb) ||
                            _makeAnchor(_jp.Defaults.Anchor, elementId, _jsPlumb),
                    u = params.uuids ? params.uuids[index] : null;

                e = _newEndpoint({
                    paintStyle: es, hoverPaintStyle: ehs, endpoint: ep, connections: [ conn ],
                    uuid: u, anchor: a, source: element, scope: params.scope,
                    reattach: params.reattach || _jsPlumb.Defaults.ReattachConnections,
                    detachable: params.detachable || _jsPlumb.Defaults.ConnectionsDetachable
                });
                conn.endpoints[index] = e;

                if (params.drawEndpoints === false) e.setVisible(false, true, true);

            }
            return e;
        }

    }); // END Connection class            
}).call(this);

/*
 * jsPlumb
 * 
 * Title:jsPlumb 2.0.2
 * 
 * Provides a way to visually connect elements on an HTML page, using SVG.
 * 
 * This file contains the code for creating and manipulating anchors.
 *
 * Copyright (c) 2010 - 2015 jsPlumb (hello@jsplumbtoolkit.com)
 * 
 * http://jsplumbtoolkit.com
 * http://github.com/sporritt/jsplumb
 * 
 * Dual licensed under the MIT and GPL2 licenses.
 */
;
(function () {

    "use strict";

    var root = this,
        _ju = root.jsPlumbUtil,
        _jp = root.jsPlumb;

    //
    // manages anchors for all elements.
    //
    _jp.AnchorManager = function (params) {
        var _amEndpoints = {},
            continuousAnchorLocations = {},
            userDefinedContinuousAnchorLocations = {},
            continuousAnchorOrientations = {},
            Orientation = { HORIZONTAL: "horizontal", VERTICAL: "vertical", DIAGONAL: "diagonal", IDENTITY: "identity" },
            axes = ["left", "top", "right", "bottom"],
            connectionsByElementId = {},
            self = this,
            anchorLists = {},
            jsPlumbInstance = params.jsPlumbInstance,
            floatingConnections = {},
            calculateOrientation = function (sourceId, targetId, sd, td, sourceAnchor, targetAnchor) {

                if (sourceId === targetId) return {
                    orientation: Orientation.IDENTITY,
                    a: ["top", "top"]
                };

                var theta = Math.atan2((td.centery - sd.centery), (td.centerx - sd.centerx)),
                    theta2 = Math.atan2((sd.centery - td.centery), (sd.centerx - td.centerx));

// --------------------------------------------------------------------------------------

                // improved face calculation. get midpoints of each face for source and target, then put in an array with all combinations of
                // source/target faces. sort this array by distance between midpoints. the entry at index 0 is our preferred option. we can
                // go through the array one by one until we find an entry in which each requested face is supported.
                var candidates = [], midpoints = { };
                (function (types, dim) {
                    for (var i = 0; i < types.length; i++) {
                        midpoints[types[i]] = {
                            "left": [ dim[i].left, dim[i].centery ],
                            "right": [ dim[i].right, dim[i].centery ],
                            "top": [ dim[i].centerx, dim[i].top ],
                            "bottom": [ dim[i].centerx , dim[i].bottom]
                        };
                    }
                })([ "source", "target" ], [ sd, td ]);

                for (var sf = 0; sf < axes.length; sf++) {
                    for (var tf = 0; tf < axes.length; tf++) {
                        if (sf != tf) {
                            candidates.push({
                                source: axes[sf],
                                target: axes[tf],
                                dist: Biltong.lineLength(midpoints.source[axes[sf]], midpoints.target[axes[tf]])
                            });
                        }
                    }
                }

                candidates.sort(function (a, b) {
                    return a.dist < b.dist ? -1 : a.dist > b.dist ? 1 : 0;
                });

                // now go through this list and try to get an entry that satisfies both (there will be one, unless one of the anchors
                // declares no available faces)
                var sourceEdge = candidates[0].source, targetEdge = candidates[0].target;
                for (var i = 0; i < candidates.length; i++) {

                    if (!sourceAnchor.isContinuous || sourceAnchor.isEdgeSupported(candidates[i].source))
                        sourceEdge = candidates[i].source;
                    else
                        sourceEdge = null;

                    if (!targetAnchor.isContinuous || targetAnchor.isEdgeSupported(candidates[i].target))
                        targetEdge = candidates[i].target;
                    else {
                        targetEdge = null;
                    }

                    if (sourceEdge != null && targetEdge != null) break;
                }

// --------------------------------------------------------------------------------------

                return {
                    a: [ sourceEdge, targetEdge ],
                    theta: theta,
                    theta2: theta2
                };
            },
        // used by placeAnchors function
            placeAnchorsOnLine = function (desc, elementDimensions, elementPosition, connections, horizontal, otherMultiplier, reverse) {
                var a = [], step = elementDimensions[horizontal ? 0 : 1] / (connections.length + 1);

                for (var i = 0; i < connections.length; i++) {
                    var val = (i + 1) * step, other = otherMultiplier * elementDimensions[horizontal ? 1 : 0];
                    if (reverse)
                        val = elementDimensions[horizontal ? 0 : 1] - val;

                    var dx = (horizontal ? val : other), x = elementPosition[0] + dx, xp = dx / elementDimensions[0],
                        dy = (horizontal ? other : val), y = elementPosition[1] + dy, yp = dy / elementDimensions[1];

                    a.push([ x, y, xp, yp, connections[i][1], connections[i][2] ]);
                }

                return a;
            },
        // used by edgeSortFunctions
            currySort = function (reverseAngles) {
                return function (a, b) {
                    var r = true;
                    if (reverseAngles) {
                        r = a[0][0] < b[0][0];
                    }
                    else {
                        r = a[0][0] > b[0][0];
                    }
                    return r === false ? -1 : 1;
                };
            },
        // used by edgeSortFunctions
            leftSort = function (a, b) {
                // first get adjusted values
                var p1 = a[0][0] < 0 ? -Math.PI - a[0][0] : Math.PI - a[0][0],
                    p2 = b[0][0] < 0 ? -Math.PI - b[0][0] : Math.PI - b[0][0];
                if (p1 > p2) return 1;
                else return a[0][1] > b[0][1] ? 1 : -1;
            },
        // used by placeAnchors
            edgeSortFunctions = {
                "top": function (a, b) {
                    return a[0] > b[0] ? 1 : -1;
                },
                "right": currySort(true),
                "bottom": currySort(true),
                "left": leftSort
            },
        // used by placeAnchors
            _sortHelper = function (_array, _fn) {
                return _array.sort(_fn);
            },
        // used by AnchorManager.redraw
            placeAnchors = function (elementId, _anchorLists) {
                var cd = jsPlumbInstance.getCachedData(elementId), sS = cd.s, sO = cd.o,
                    placeSomeAnchors = function (desc, elementDimensions, elementPosition, unsortedConnections, isHorizontal, otherMultiplier, orientation) {
                        if (unsortedConnections.length > 0) {
                            var sc = _sortHelper(unsortedConnections, edgeSortFunctions[desc]), // puts them in order based on the target element's pos on screen
                                reverse = desc === "right" || desc === "top",
                                anchors = placeAnchorsOnLine(desc, elementDimensions,
                                    elementPosition, sc,
                                    isHorizontal, otherMultiplier, reverse);

                            // takes a computed anchor position and adjusts it for parent offset and scroll, then stores it.
                            var _setAnchorLocation = function (endpoint, anchorPos) {
                                continuousAnchorLocations[endpoint.id] = [ anchorPos[0], anchorPos[1], anchorPos[2], anchorPos[3] ];
                                continuousAnchorOrientations[endpoint.id] = orientation;
                            };

                            for (var i = 0; i < anchors.length; i++) {
                                var c = anchors[i][4], weAreSource = c.endpoints[0].elementId === elementId, weAreTarget = c.endpoints[1].elementId === elementId;
                                if (weAreSource)
                                    _setAnchorLocation(c.endpoints[0], anchors[i]);
                                else if (weAreTarget)
                                    _setAnchorLocation(c.endpoints[1], anchors[i]);
                            }
                        }
                    };

                placeSomeAnchors("bottom", sS, [sO.left, sO.top], _anchorLists.bottom, true, 1, [0, 1]);
                placeSomeAnchors("top", sS, [sO.left, sO.top], _anchorLists.top, true, 0, [0, -1]);
                placeSomeAnchors("left", sS, [sO.left, sO.top], _anchorLists.left, false, 0, [-1, 0]);
                placeSomeAnchors("right", sS, [sO.left, sO.top], _anchorLists.right, false, 1, [1, 0]);
            };

        this.reset = function () {
            _amEndpoints = {};
            connectionsByElementId = {};
            anchorLists = {};
        };
        this.addFloatingConnection = function (key, conn) {
            floatingConnections[key] = conn;
        };
        this.removeFloatingConnection = function (key) {
            delete floatingConnections[key];
        };
        this.newConnection = function (conn) {
            var sourceId = conn.sourceId, targetId = conn.targetId,
                ep = conn.endpoints,
                doRegisterTarget = true,
                registerConnection = function (otherIndex, otherEndpoint, otherAnchor, elId, c) {
                    if ((sourceId == targetId) && otherAnchor.isContinuous) {
                        // remove the target endpoint's canvas.  we dont need it.
                        conn._jsPlumb.instance.removeElement(ep[1].canvas);
                        doRegisterTarget = false;
                    }
                    _ju.addToList(connectionsByElementId, elId, [c, otherEndpoint, otherAnchor.constructor == _jp.DynamicAnchor]);
                };

            registerConnection(0, ep[0], ep[0].anchor, targetId, conn);
            if (doRegisterTarget)
                registerConnection(1, ep[1], ep[1].anchor, sourceId, conn);
        };
        var removeEndpointFromAnchorLists = function (endpoint) {
            (function (list, eId) {
                if (list) {  // transient anchors dont get entries in this list.
                    var f = function (e) {
                        return e[4] == eId;
                    };
                    _ju.removeWithFunction(list.top, f);
                    _ju.removeWithFunction(list.left, f);
                    _ju.removeWithFunction(list.bottom, f);
                    _ju.removeWithFunction(list.right, f);
                }
            })(anchorLists[endpoint.elementId], endpoint.id);
        };
        this.connectionDetached = function (connInfo, doNotRedraw) {
            var connection = connInfo.connection || connInfo,
                sourceId = connInfo.sourceId,
                targetId = connInfo.targetId,
                ep = connection.endpoints,
                removeConnection = function (otherIndex, otherEndpoint, otherAnchor, elId, c) {
                   _ju.removeWithFunction(connectionsByElementId[elId], function (_c) {
                        return _c[0].id == c.id;
                    });
                };

            removeConnection(1, ep[1], ep[1].anchor, sourceId, connection);
            removeConnection(0, ep[0], ep[0].anchor, targetId, connection);
            if (connection.floatingId) {
                removeConnection(connection.floatingIndex, connection.floatingEndpoint, connection.floatingEndpoint.anchor, connection.floatingId, connection);
                removeEndpointFromAnchorLists(connection.floatingEndpoint);
            }

            // remove from anchorLists            
            removeEndpointFromAnchorLists(connection.endpoints[0]);
            removeEndpointFromAnchorLists(connection.endpoints[1]);

            if (!doNotRedraw) {
                self.redraw(connection.sourceId);
                if (connection.targetId !== connection.sourceId)
                    self.redraw(connection.targetId);
            }
        };
        this.add = function (endpoint, elementId) {
            _ju.addToList(_amEndpoints, elementId, endpoint);
        };
        this.changeId = function (oldId, newId) {
            connectionsByElementId[newId] = connectionsByElementId[oldId];
            _amEndpoints[newId] = _amEndpoints[oldId];
            delete connectionsByElementId[oldId];
            delete _amEndpoints[oldId];
        };
        this.getConnectionsFor = function (elementId) {
            return connectionsByElementId[elementId] || [];
        };
        this.getEndpointsFor = function (elementId) {
            return _amEndpoints[elementId] || [];
        };
        this.deleteEndpoint = function (endpoint) {
            _ju.removeWithFunction(_amEndpoints[endpoint.elementId], function (e) {
                return e.id == endpoint.id;
            });
            removeEndpointFromAnchorLists(endpoint);
        };
        this.clearFor = function (elementId) {
            delete _amEndpoints[elementId];
            _amEndpoints[elementId] = [];
        };
        // updates the given anchor list by either updating an existing anchor's info, or adding it. this function
        // also removes the anchor from its previous list, if the edge it is on has changed.
        // all connections found along the way (those that are connected to one of the faces this function
        // operates on) are added to the connsToPaint list, as are their endpoints. in this way we know to repaint
        // them wthout having to calculate anything else about them.
        var _updateAnchorList = function (lists, theta, order, conn, aBoolean, otherElId, idx, reverse, edgeId, elId, connsToPaint, endpointsToPaint) {
            // first try to find the exact match, but keep track of the first index of a matching element id along the way.s
            var exactIdx = -1,
                firstMatchingElIdx = -1,
                endpoint = conn.endpoints[idx],
                endpointId = endpoint.id,
                oIdx = [1, 0][idx],
                values = [
                    [ theta, order ],
                    conn,
                    aBoolean,
                    otherElId,
                    endpointId
                ],
                listToAddTo = lists[edgeId],
                listToRemoveFrom = endpoint._continuousAnchorEdge ? lists[endpoint._continuousAnchorEdge] : null,
                i,
                candidate;

            if (listToRemoveFrom) {
                var rIdx = _ju.findWithFunction(listToRemoveFrom, function (e) {
                    return e[4] == endpointId;
                });
                if (rIdx != -1) {
                    listToRemoveFrom.splice(rIdx, 1);
                    // get all connections from this list
                    for (i = 0; i < listToRemoveFrom.length; i++) {
                        candidate = listToRemoveFrom[i][1];
                        _ju.addWithFunction(connsToPaint, candidate, function (c) {
                            return c.id == candidate.id;
                        });
                        _ju.addWithFunction(endpointsToPaint, listToRemoveFrom[i][1].endpoints[idx], function (e) {
                            return e.id == candidate.endpoints[idx].id;
                        });
                        _ju.addWithFunction(endpointsToPaint, listToRemoveFrom[i][1].endpoints[oIdx], function (e) {
                            return e.id == candidate.endpoints[oIdx].id;
                        });
                    }
                }
            }

            for (i = 0; i < listToAddTo.length; i++) {
                candidate = listToAddTo[i][1];
                if (params.idx == 1 && listToAddTo[i][3] === otherElId && firstMatchingElIdx == -1)
                    firstMatchingElIdx = i;
                _ju.addWithFunction(connsToPaint, candidate, function (c) {
                    return c.id == candidate.id;
                });
                _ju.addWithFunction(endpointsToPaint, listToAddTo[i][1].endpoints[idx], function (e) {
                    return e.id == candidate.endpoints[idx].id;
                });
                _ju.addWithFunction(endpointsToPaint, listToAddTo[i][1].endpoints[oIdx], function (e) {
                    return e.id == candidate.endpoints[oIdx].id;
                });
            }
            if (exactIdx != -1) {
                listToAddTo[exactIdx] = values;
            }
            else {
                var insertIdx = reverse ? firstMatchingElIdx != -1 ? firstMatchingElIdx : 0 : listToAddTo.length; // of course we will get this from having looked through the array shortly.
                listToAddTo.splice(insertIdx, 0, values);
            }

            // store this for next time.
            endpoint._continuousAnchorEdge = edgeId;
        };

        //
        // find the entry in an endpoint's list for this connection and update its target endpoint
        // with the current target in the connection.
        // 
        //
        this.updateOtherEndpoint = function (elId, oldTargetId, newTargetId, connection) {
            var sIndex = _ju.findWithFunction(connectionsByElementId[elId], function (i) {
                    return i[0].id === connection.id;
                }),
                tIndex = _ju.findWithFunction(connectionsByElementId[oldTargetId], function (i) {
                    return i[0].id === connection.id;
                });

            // update or add data for source
            if (sIndex != -1) {
                connectionsByElementId[elId][sIndex][0] = connection;
                connectionsByElementId[elId][sIndex][1] = connection.endpoints[1];
                connectionsByElementId[elId][sIndex][2] = connection.endpoints[1].anchor.constructor == _jp.DynamicAnchor;
            }

            // remove entry for previous target (if there)
            if (tIndex > -1) {
                connectionsByElementId[oldTargetId].splice(tIndex, 1);
                // add entry for new target
                _ju.addToList(connectionsByElementId, newTargetId, [connection, connection.endpoints[0], connection.endpoints[0].anchor.constructor == _jp.DynamicAnchor]);
            }

            connection.updateConnectedClass();
        };

        //
        // notification that the connection given has changed source from the originalId to the newId.
        // This involves:
        // 1. removing the connection from the list of connections stored for the originalId
        // 2. updating the source information for the target of the connection
        // 3. re-registering the connection in connectionsByElementId with the newId
        //
        this.sourceChanged = function (originalId, newId, connection) {
            if (originalId !== newId) {
                // remove the entry that points from the old source to the target
                _ju.removeWithFunction(connectionsByElementId[originalId], function (info) {
                    return info[0].id === connection.id;
                });
                // find entry for target and update it
                var tIdx = _ju.findWithFunction(connectionsByElementId[connection.targetId], function (i) {
                    return i[0].id === connection.id;
                });
                if (tIdx > -1) {
                    connectionsByElementId[connection.targetId][tIdx][0] = connection;
                    connectionsByElementId[connection.targetId][tIdx][1] = connection.endpoints[0];
                    connectionsByElementId[connection.targetId][tIdx][2] = connection.endpoints[0].anchor.constructor == _jp.DynamicAnchor;
                }
                // add entry for new source
                _ju.addToList(connectionsByElementId, newId, [connection, connection.endpoints[1], connection.endpoints[1].anchor.constructor == _jp.DynamicAnchor]);

                // TODO SP not final on this yet. when a user drags an existing connection and it turns into a self
                // loop, then this code hides the target endpoint (by removing it from the DOM) But I think this should
                // occur only if the anchor is Continuous
                if (connection.endpoints[1].anchor.isContinuous) {
                    if (connection.source === connection.target) {
                        connection._jsPlumb.instance.removeElement(connection.endpoints[1].canvas);
                    }
                    else {
                        if (connection.endpoints[1].canvas.parentNode == null) {
                            connection._jsPlumb.instance.appendElement(connection.endpoints[1].canvas);
                        }
                    }
                }

                connection.updateConnectedClass();
            }
        };

        //
        // moves the given endpoint from `currentId` to `element`.
        // This involves:
        //
        // 1. changing the key in _amEndpoints under which the endpoint is stored
        // 2. changing the source or target values in all of the endpoint's connections
        // 3. changing the array in connectionsByElementId in which the endpoint's connections
        //    are stored (done by either sourceChanged or updateOtherEndpoint)
        //
        this.rehomeEndpoint = function (ep, currentId, element) {
            var eps = _amEndpoints[currentId] || [],
                elementId = jsPlumbInstance.getId(element);

            if (elementId !== currentId) {
                var idx = eps.indexOf(ep);
                if (idx > -1) {
                    var _ep = eps.splice(idx, 1)[0];
                    self.add(_ep, elementId);
                }
            }

            for (var i = 0; i < ep.connections.length; i++) {
                if (ep.connections[i].sourceId == currentId) {
                    ep.connections[i].sourceId = ep.elementId;
                    ep.connections[i].source = ep.element;
                    self.sourceChanged(currentId, ep.elementId, ep.connections[i]);
                }
                else if (ep.connections[i].targetId == currentId) {
                    ep.connections[i].targetId = ep.elementId;
                    ep.connections[i].target = ep.element;
                    self.updateOtherEndpoint(ep.connections[i].sourceId, currentId, ep.elementId, ep.connections[i]);
                }
            }
        };

        this.redraw = function (elementId, ui, timestamp, offsetToUI, clearEdits, doNotRecalcEndpoint) {

            if (!jsPlumbInstance.isSuspendDrawing()) {
                // get all the endpoints for this element
                var ep = _amEndpoints[elementId] || [],
                    endpointConnections = connectionsByElementId[elementId] || [],
                    connectionsToPaint = [],
                    endpointsToPaint = [],
                    anchorsToUpdate = [];

                timestamp = timestamp || jsPlumbInstance.timestamp();
                // offsetToUI are values that would have been calculated in the dragManager when registering
                // an endpoint for an element that had a parent (somewhere in the hierarchy) that had been
                // registered as draggable.
                offsetToUI = offsetToUI || {left: 0, top: 0};
                if (ui) {
                    ui = {
                        left: ui.left + offsetToUI.left,
                        top: ui.top + offsetToUI.top
                    };
                }

                // valid for one paint cycle.
                var myOffset = jsPlumbInstance.updateOffset({ elId: elementId, offset: ui, recalc: false, timestamp: timestamp }),
                    orientationCache = {};

                // actually, first we should compute the orientation of this element to all other elements to which
                // this element is connected with a continuous anchor (whether both ends of the connection have
                // a continuous anchor or just one)

                for (var i = 0; i < endpointConnections.length; i++) {
                    var conn = endpointConnections[i][0],
                        sourceId = conn.sourceId,
                        targetId = conn.targetId,
                        sourceContinuous = conn.endpoints[0].anchor.isContinuous,
                        targetContinuous = conn.endpoints[1].anchor.isContinuous;

                    if (sourceContinuous || targetContinuous) {
                        var oKey = sourceId + "_" + targetId,
                            o = orientationCache[oKey],
                            oIdx = conn.sourceId == elementId ? 1 : 0;

                        if (sourceContinuous && !anchorLists[sourceId]) anchorLists[sourceId] = { top: [], right: [], bottom: [], left: [] };
                        if (targetContinuous && !anchorLists[targetId]) anchorLists[targetId] = { top: [], right: [], bottom: [], left: [] };

                        if (elementId != targetId) jsPlumbInstance.updateOffset({ elId: targetId, timestamp: timestamp });
                        if (elementId != sourceId) jsPlumbInstance.updateOffset({ elId: sourceId, timestamp: timestamp });

                        var td = jsPlumbInstance.getCachedData(targetId),
                            sd = jsPlumbInstance.getCachedData(sourceId);

                        if (targetId == sourceId && (sourceContinuous || targetContinuous)) {
                            // here we may want to improve this by somehow determining the face we'd like
                            // to put the connector on.  ideally, when drawing, the face should be calculated
                            // by determining which face is closest to the point at which the mouse button
                            // was released.  for now, we're putting it on the top face.
                            _updateAnchorList(
                                anchorLists[sourceId],
                                    -Math.PI / 2,
                                0,
                                conn,
                                false,
                                targetId,
                                0, false, "top", sourceId, connectionsToPaint, endpointsToPaint);
                        }
                        else {
                            if (!o) {
                                o = calculateOrientation(sourceId, targetId, sd.o, td.o, conn.endpoints[0].anchor, conn.endpoints[1].anchor);
                                orientationCache[oKey] = o;
                                // this would be a performance enhancement, but the computed angles need to be clamped to
                                //the (-PI/2 -> PI/2) range in order for the sorting to work properly.
                                /*  orientationCache[oKey2] = {
                                 orientation:o.orientation,
                                 a:[o.a[1], o.a[0]],
                                 theta:o.theta + Math.PI,
                                 theta2:o.theta2 + Math.PI
                                 };*/
                            }
                            if (sourceContinuous) _updateAnchorList(anchorLists[sourceId], o.theta, 0, conn, false, targetId, 0, false, o.a[0], sourceId, connectionsToPaint, endpointsToPaint);
                            if (targetContinuous) _updateAnchorList(anchorLists[targetId], o.theta2, -1, conn, true, sourceId, 1, true, o.a[1], targetId, connectionsToPaint, endpointsToPaint);
                        }

                        if (sourceContinuous) _ju.addWithFunction(anchorsToUpdate, sourceId, function (a) {
                            return a === sourceId;
                        });
                        if (targetContinuous) _ju.addWithFunction(anchorsToUpdate, targetId, function (a) {
                            return a === targetId;
                        });
                        _ju.addWithFunction(connectionsToPaint, conn, function (c) {
                            return c.id == conn.id;
                        });
                        if ((sourceContinuous && oIdx === 0) || (targetContinuous && oIdx === 1))
                            _ju.addWithFunction(endpointsToPaint, conn.endpoints[oIdx], function (e) {
                                return e.id == conn.endpoints[oIdx].id;
                            });
                    }
                }

                // place Endpoints whose anchors are continuous but have no Connections
                for (i = 0; i < ep.length; i++) {
                    if (ep[i].connections.length === 0 && ep[i].anchor.isContinuous) {
                        if (!anchorLists[elementId]) anchorLists[elementId] = { top: [], right: [], bottom: [], left: [] };
                        _updateAnchorList(anchorLists[elementId], -Math.PI / 2, 0, {endpoints: [ep[i], ep[i]], paint: function () {
                        }}, false, elementId, 0, false, ep[i].anchor.getDefaultFace(), elementId, connectionsToPaint, endpointsToPaint);
                        _ju.addWithFunction(anchorsToUpdate, elementId, function (a) {
                            return a === elementId;
                        });
                    }
                }


                // now place all the continuous anchors we need to;
                for (i = 0; i < anchorsToUpdate.length; i++) {
                    placeAnchors(anchorsToUpdate[i], anchorLists[anchorsToUpdate[i]]);
                }

                // now that continuous anchors have been placed, paint all the endpoints for this element
                // TODO performance: add the endpoint ids to a temp array, and then when iterating in the next
                // loop, check that we didn't just paint that endpoint. we can probably shave off a few more milliseconds this way.
                for (i = 0; i < ep.length; i++) {
                    ep[i].paint({ timestamp: timestamp, offset: myOffset, dimensions: myOffset.s, recalc: doNotRecalcEndpoint !== true });
                }

                // ... and any other endpoints we came across as a result of the continuous anchors.
                for (i = 0; i < endpointsToPaint.length; i++) {
                    var cd = jsPlumbInstance.getCachedData(endpointsToPaint[i].elementId);
                    endpointsToPaint[i].paint({ timestamp: timestamp, offset: cd, dimensions: cd.s });
                }

                // paint all the standard and "dynamic connections", which are connections whose other anchor is
                // static and therefore does need to be recomputed; we make sure that happens only one time.

                // TODO we could have compiled a list of these in the first pass through connections; might save some time.
                for (i = 0; i < endpointConnections.length; i++) {
                    var otherEndpoint = endpointConnections[i][1];
                    if (otherEndpoint.anchor.constructor == _jp.DynamicAnchor) {
                        otherEndpoint.paint({ elementWithPrecedence: elementId, timestamp: timestamp });
                        _ju.addWithFunction(connectionsToPaint, endpointConnections[i][0], function (c) {
                            return c.id == endpointConnections[i][0].id;
                        });
                        // all the connections for the other endpoint now need to be repainted
                        for (var k = 0; k < otherEndpoint.connections.length; k++) {
                            if (otherEndpoint.connections[k] !== endpointConnections[i][0])
                                _ju.addWithFunction(connectionsToPaint, otherEndpoint.connections[k], function (c) {
                                    return c.id == otherEndpoint.connections[k].id;
                                });
                        }
                    } else if (otherEndpoint.anchor.constructor == _jp.Anchor) {
                        _ju.addWithFunction(connectionsToPaint, endpointConnections[i][0], function (c) {
                            return c.id == endpointConnections[i][0].id;
                        });
                    }
                }

                // paint current floating connection for this element, if there is one.
                var fc = floatingConnections[elementId];
                if (fc)
                    fc.paint({timestamp: timestamp, recalc: false, elId: elementId});

                // paint all the connections
                for (i = 0; i < connectionsToPaint.length; i++) {
                    connectionsToPaint[i].paint({elId: elementId, timestamp: timestamp, recalc: false, clearEdits: clearEdits});
                }
            }
        };

        var ContinuousAnchor = function (anchorParams) {
            _ju.EventGenerator.apply(this);
            this.type = "Continuous";
            this.isDynamic = true;
            this.isContinuous = true;
            var faces = anchorParams.faces || ["top", "right", "bottom", "left"],
                clockwise = !(anchorParams.clockwise === false),
                availableFaces = { },
                opposites = { "top": "bottom", "right": "left", "left": "right", "bottom": "top" },
                clockwiseOptions = { "top": "right", "right": "bottom", "left": "top", "bottom": "left" },
                antiClockwiseOptions = { "top": "left", "right": "top", "left": "bottom", "bottom": "right" },
                secondBest = clockwise ? clockwiseOptions : antiClockwiseOptions,
                lastChoice = clockwise ? antiClockwiseOptions : clockwiseOptions,
                cssClass = anchorParams.cssClass || "";

            for (var i = 0; i < faces.length; i++) {
                availableFaces[faces[i]] = true;
            }

            this.getDefaultFace = function () {
                return faces.length === 0 ? "top" : faces[0];
            };

            // if the given edge is supported, returns it. otherwise looks for a substitute that _is_
            // supported. if none supported we also return the request edge.
            this.verifyEdge = function (edge) {
                if (availableFaces[edge]) return edge;
                else if (availableFaces[opposites[edge]]) return opposites[edge];
                else if (availableFaces[secondBest[edge]]) return secondBest[edge];
                else if (availableFaces[lastChoice[edge]]) return lastChoice[edge];
                return edge; // we have to give them something.
            };

            this.isEdgeSupported = function (edge) {
                return availableFaces[edge] === true;
            };

            this.compute = function (params) {
                return userDefinedContinuousAnchorLocations[params.element.id] || continuousAnchorLocations[params.element.id] || [0, 0];
            };
            this.getCurrentLocation = function (params) {
                return userDefinedContinuousAnchorLocations[params.element.id] || continuousAnchorLocations[params.element.id] || [0, 0];
            };
            this.getOrientation = function (endpoint) {
                return continuousAnchorOrientations[endpoint.id] || [0, 0];
            };
            this.clearUserDefinedLocation = function () {
                delete userDefinedContinuousAnchorLocations[anchorParams.elementId];
            };
            this.setUserDefinedLocation = function (loc) {
                userDefinedContinuousAnchorLocations[anchorParams.elementId] = loc;
            };
            this.getCssClass = function () {
                return cssClass;
            };
        };

        // continuous anchors
        jsPlumbInstance.continuousAnchorFactory = {
            get: function (params) {
                return new ContinuousAnchor(params);
            },
            clear: function (elementId) {
                delete userDefinedContinuousAnchorLocations[elementId];
                delete continuousAnchorLocations[elementId];
            }
        };
    };

    /**
     * Anchors model a position on some element at which an Endpoint may be located.  They began as a first class citizen of jsPlumb, ie. a user
     * was required to create these themselves, but over time this has been replaced by the concept of referring to them either by name (eg. "TopMiddle"),
     * or by an array describing their coordinates (eg. [ 0, 0.5, 0, -1 ], which is the same as "TopMiddle").  jsPlumb now handles all of the
     * creation of Anchors without user intervention.
     */
    _jp.Anchor = function (params) {
        this.x = params.x || 0;
        this.y = params.y || 0;
        this.elementId = params.elementId;
        this.cssClass = params.cssClass || "";
        this.userDefinedLocation = null;
        this.orientation = params.orientation || [ 0, 0 ];
        this.lastReturnValue = null;
        this.offsets = params.offsets || [ 0, 0 ];
        this.timestamp = null;

        _ju.EventGenerator.apply(this);

        this.compute = function (params) {

            var xy = params.xy, wh = params.wh, timestamp = params.timestamp;

            if (params.clearUserDefinedLocation)
                this.userDefinedLocation = null;

            if (timestamp && timestamp === self.timestamp)
                return this.lastReturnValue;

            if (this.userDefinedLocation != null) {
                this.lastReturnValue = this.userDefinedLocation;
            }
            else {
                this.lastReturnValue = [ xy[0] + (this.x * wh[0]) + this.offsets[0], xy[1] + (this.y * wh[1]) + this.offsets[1] ];
            }

            this.timestamp = timestamp;
            return this.lastReturnValue;
        };

        this.getCurrentLocation = function (params) {
            params = params || {};
            return (this.lastReturnValue == null || (params.timestamp != null && this.timestamp != params.timestamp)) ? this.compute(params) : this.lastReturnValue;
        };
    };
    _ju.extend(_jp.Anchor, _ju.EventGenerator, {
        equals: function (anchor) {
            if (!anchor) return false;
            var ao = anchor.getOrientation(),
                o = this.getOrientation();
            return this.x == anchor.x && this.y == anchor.y && this.offsets[0] == anchor.offsets[0] && this.offsets[1] == anchor.offsets[1] && o[0] == ao[0] && o[1] == ao[1];
        },
        getUserDefinedLocation: function () {
            return this.userDefinedLocation;
        },
        setUserDefinedLocation: function (l) {
            this.userDefinedLocation = l;
        },
        clearUserDefinedLocation: function () {
            this.userDefinedLocation = null;
        },
        getOrientation: function () {
            return this.orientation;
        },
        getCssClass: function () {
            return this.cssClass;
        }
    });

    /**
     * An Anchor that floats. its orientation is computed dynamically from
     * its position relative to the anchor it is floating relative to.  It is used when creating
     * a connection through drag and drop.
     *
     * TODO FloatingAnchor could totally be refactored to extend Anchor just slightly.
     */
    _jp.FloatingAnchor = function (params) {

        _jp.Anchor.apply(this, arguments);

        // this is the anchor that this floating anchor is referenced to for
        // purposes of calculating the orientation.
        var ref = params.reference,
            // the canvas this refers to.
            refCanvas = params.referenceCanvas,
            size = _jp.getSize(refCanvas),
            // these are used to store the current relative position of our
            // anchor wrt the reference anchor. they only indicate
            // direction, so have a value of 1 or -1 (or, very rarely, 0). these
            // values are written by the compute method, and read
            // by the getOrientation method.
            xDir = 0, yDir = 0,
            // temporary member used to store an orientation when the floating
            // anchor is hovering over another anchor.
            orientation = null,
            _lastResult = null;

        // clear from parent. we want floating anchor orientation to always be computed.
        this.orientation = null;

        // set these to 0 each; they are used by certain types of connectors in the loopback case,
        // when the connector is trying to clear the element it is on. but for floating anchor it's not
        // very important.
        this.x = 0;
        this.y = 0;

        this.isFloating = true;

        this.compute = function (params) {
            var xy = params.xy,
                result = [ xy[0] + (size[0] / 2), xy[1] + (size[1] / 2) ]; // return origin of the element. we may wish to improve this so that any object can be the drag proxy.
            _lastResult = result;
            return result;
        };

        this.getOrientation = function (_endpoint) {
            if (orientation) return orientation;
            else {
                var o = ref.getOrientation(_endpoint);
                // here we take into account the orientation of the other
                // anchor: if it declares zero for some direction, we declare zero too. this might not be the most awesome. perhaps we can come
                // up with a better way. it's just so that the line we draw looks like it makes sense. maybe this wont make sense.
                return [ Math.abs(o[0]) * xDir * -1,
                        Math.abs(o[1]) * yDir * -1 ];
            }
        };

        /**
         * notification the endpoint associated with this anchor is hovering
         * over another anchor; we want to assume that anchor's orientation
         * for the duration of the hover.
         */
        this.over = function (anchor, endpoint) {
            orientation = anchor.getOrientation(endpoint);
        };

        /**
         * notification the endpoint associated with this anchor is no
         * longer hovering over another anchor; we should resume calculating
         * orientation as we normally do.
         */
        this.out = function () {
            orientation = null;
        };

        this.getCurrentLocation = function (params) {
            return _lastResult == null ? this.compute(params) : _lastResult;
        };
    };
    _ju.extend(_jp.FloatingAnchor, _jp.Anchor);

    var _convertAnchor = function (anchor, jsPlumbInstance, elementId) {
        return anchor.constructor == _jp.Anchor ? anchor : jsPlumbInstance.makeAnchor(anchor, elementId, jsPlumbInstance);
    };

    /* 
     * A DynamicAnchor is an Anchor that contains a list of other Anchors, which it cycles
     * through at compute time to find the one that is located closest to
     * the center of the target element, and returns that Anchor's compute
     * method result. this causes endpoints to follow each other with
     * respect to the orientation of their target elements, which is a useful
     * feature for some applications.
     * 
     */
    _jp.DynamicAnchor = function (params) {
        _jp.Anchor.apply(this, arguments);

        this.isDynamic = true;
        this.anchors = [];
        this.elementId = params.elementId;
        this.jsPlumbInstance = params.jsPlumbInstance;

        for (var i = 0; i < params.anchors.length; i++)
            this.anchors[i] = _convertAnchor(params.anchors[i], this.jsPlumbInstance, this.elementId);

        this.getAnchors = function () {
            return this.anchors;
        };
        this.locked = false;
        var _curAnchor = this.anchors.length > 0 ? this.anchors[0] : null,
            _lastAnchor = _curAnchor,
            self = this,

        // helper method to calculate the distance between the centers of the two elements.
            _distance = function (anchor, cx, cy, xy, wh) {
                var ax = xy[0] + (anchor.x * wh[0]), ay = xy[1] + (anchor.y * wh[1]),
                    acx = xy[0] + (wh[0] / 2), acy = xy[1] + (wh[1] / 2);
                return (Math.sqrt(Math.pow(cx - ax, 2) + Math.pow(cy - ay, 2)) +
                    Math.sqrt(Math.pow(acx - ax, 2) + Math.pow(acy - ay, 2)));
            },
        // default method uses distance between element centers.  you can provide your own method in the dynamic anchor
        // constructor (and also to jsPlumb.makeDynamicAnchor). the arguments to it are four arrays:
        // xy - xy loc of the anchor's element
        // wh - anchor's element's dimensions
        // txy - xy loc of the element of the other anchor in the connection
        // twh - dimensions of the element of the other anchor in the connection.
        // anchors - the list of selectable anchors
            _anchorSelector = params.selector || function (xy, wh, txy, twh, anchors) {
                var cx = txy[0] + (twh[0] / 2), cy = txy[1] + (twh[1] / 2);
                var minIdx = -1, minDist = Infinity;
                for (var i = 0; i < anchors.length; i++) {
                    var d = _distance(anchors[i], cx, cy, xy, wh);
                    if (d < minDist) {
                        minIdx = i + 0;
                        minDist = d;
                    }
                }
                return anchors[minIdx];
            };

        this.compute = function (params) {
            var xy = params.xy, wh = params.wh, txy = params.txy, twh = params.twh;

            this.timestamp = params.timestamp;

            var udl = self.getUserDefinedLocation();
            if (udl != null) {
                return udl;
            }

            // if anchor is locked or an opposite element was not given, we
            // maintain our state. anchor will be locked
            // if it is the source of a drag and drop.
            if (this.locked || txy == null || twh == null)
                return _curAnchor.compute(params);
            else
                params.timestamp = null; // otherwise clear this, i think. we want the anchor to compute.

            _curAnchor = _anchorSelector(xy, wh, txy, twh, this.anchors);
            this.x = _curAnchor.x;
            this.y = _curAnchor.y;

            if (_curAnchor != _lastAnchor)
                this.fire("anchorChanged", _curAnchor);

            _lastAnchor = _curAnchor;

            return _curAnchor.compute(params);
        };

        this.getCurrentLocation = function (params) {
            return this.getUserDefinedLocation() || (_curAnchor != null ? _curAnchor.getCurrentLocation(params) : null);
        };

        this.getOrientation = function (_endpoint) {
            return _curAnchor != null ? _curAnchor.getOrientation(_endpoint) : [ 0, 0 ];
        };
        this.over = function (anchor, endpoint) {
            if (_curAnchor != null) _curAnchor.over(anchor, endpoint);
        };
        this.out = function () {
            if (_curAnchor != null) _curAnchor.out();
        };

        this.getCssClass = function () {
            return (_curAnchor && _curAnchor.getCssClass()) || "";
        };
    };
    _ju.extend(_jp.DynamicAnchor, _jp.Anchor);

// -------- basic anchors ------------------    
    var _curryAnchor = function (x, y, ox, oy, type, fnInit) {
        _jp.Anchors[type] = function (params) {
            var a = params.jsPlumbInstance.makeAnchor([ x, y, ox, oy, 0, 0 ], params.elementId, params.jsPlumbInstance);
            a.type = type;
            if (fnInit) fnInit(a, params);
            return a;
        };
    };

    _curryAnchor(0.5, 0, 0, -1, "TopCenter");
    _curryAnchor(0.5, 1, 0, 1, "BottomCenter");
    _curryAnchor(0, 0.5, -1, 0, "LeftMiddle");
    _curryAnchor(1, 0.5, 1, 0, "RightMiddle");

    _curryAnchor(0.5, 0, 0, -1, "Top");
    _curryAnchor(0.5, 1, 0, 1, "Bottom");
    _curryAnchor(0, 0.5, -1, 0, "Left");
    _curryAnchor(1, 0.5, 1, 0, "Right");
    _curryAnchor(0.5, 0.5, 0, 0, "Center");
    _curryAnchor(1, 0, 0, -1, "TopRight");
    _curryAnchor(1, 1, 0, 1, "BottomRight");
    _curryAnchor(0, 0, 0, -1, "TopLeft");
    _curryAnchor(0, 1, 0, 1, "BottomLeft");

// ------- dynamic anchors -------------------    

    // default dynamic anchors chooses from Top, Right, Bottom, Left
    _jp.Defaults.DynamicAnchors = function (params) {
        return params.jsPlumbInstance.makeAnchors(["TopCenter", "RightMiddle", "BottomCenter", "LeftMiddle"], params.elementId, params.jsPlumbInstance);
    };

    // default dynamic anchors bound to name 'AutoDefault'
    _jp.Anchors.AutoDefault = function (params) {
        var a = params.jsPlumbInstance.makeDynamicAnchor(_jp.Defaults.DynamicAnchors(params));
        a.type = "AutoDefault";
        return a;
    };

// ------- continuous anchors -------------------    

    var _curryContinuousAnchor = function (type, faces) {
        _jp.Anchors[type] = function (params) {
            var a = params.jsPlumbInstance.makeAnchor(["Continuous", { faces: faces }], params.elementId, params.jsPlumbInstance);
            a.type = type;
            return a;
        };
    };

    _jp.Anchors.Continuous = function (params) {
        return params.jsPlumbInstance.continuousAnchorFactory.get(params);
    };

    _curryContinuousAnchor("ContinuousLeft", ["left"]);
    _curryContinuousAnchor("ContinuousTop", ["top"]);
    _curryContinuousAnchor("ContinuousBottom", ["bottom"]);
    _curryContinuousAnchor("ContinuousRight", ["right"]);

// ------- position assign anchors -------------------    

    // this anchor type lets you assign the position at connection time.
    _curryAnchor(0, 0, 0, 0, "Assign", function (anchor, params) {
        // find what to use as the "position finder". the user may have supplied a String which represents
        // the id of a position finder in jsPlumb.AnchorPositionFinders, or the user may have supplied the
        // position finder as a function.  we find out what to use and then set it on the anchor.
        var pf = params.position || "Fixed";
        anchor.positionFinder = pf.constructor == String ? params.jsPlumbInstance.AnchorPositionFinders[pf] : pf;
        // always set the constructor params; the position finder might need them later (the Grid one does,
        // for example)
        anchor.constructorParams = params;
    });

    // these are the default anchor positions finders, which are used by the makeTarget function.  supplying
    // a position finder argument to that function allows you to specify where the resulting anchor will
    // be located
    jsPlumbInstance.prototype.AnchorPositionFinders = {
        "Fixed": function (dp, ep, es) {
            return [ (dp.left - ep.left) / es[0], (dp.top - ep.top) / es[1] ];
        },
        "Grid": function (dp, ep, es, params) {
            var dx = dp.left - ep.left, dy = dp.top - ep.top,
                gx = es[0] / (params.grid[0]), gy = es[1] / (params.grid[1]),
                mx = Math.floor(dx / gx), my = Math.floor(dy / gy);
            return [ ((mx * gx) + (gx / 2)) / es[0], ((my * gy) + (gy / 2)) / es[1] ];
        }
    };

// ------- perimeter anchors -------------------    

    _jp.Anchors.Perimeter = function (params) {
        params = params || {};
        var anchorCount = params.anchorCount || 60,
            shape = params.shape;

        if (!shape) throw new Error("no shape supplied to Perimeter Anchor type");

        var _circle = function () {
                var r = 0.5, step = Math.PI * 2 / anchorCount, current = 0, a = [];
                for (var i = 0; i < anchorCount; i++) {
                    var x = r + (r * Math.sin(current)),
                        y = r + (r * Math.cos(current));
                    a.push([ x, y, 0, 0 ]);
                    current += step;
                }
                return a;
            },
            _path = function (segments) {
                var anchorsPerFace = anchorCount / segments.length, a = [],
                    _computeFace = function (x1, y1, x2, y2, fractionalLength) {
                        anchorsPerFace = anchorCount * fractionalLength;
                        var dx = (x2 - x1) / anchorsPerFace, dy = (y2 - y1) / anchorsPerFace;
                        for (var i = 0; i < anchorsPerFace; i++) {
                            a.push([
                                    x1 + (dx * i),
                                    y1 + (dy * i),
                                0,
                                0
                            ]);
                        }
                    };

                for (var i = 0; i < segments.length; i++)
                    _computeFace.apply(null, segments[i]);

                return a;
            },
            _shape = function (faces) {
                var s = [];
                for (var i = 0; i < faces.length; i++) {
                    s.push([faces[i][0], faces[i][1], faces[i][2], faces[i][3], 1 / faces.length]);
                }
                return _path(s);
            },
            _rectangle = function () {
                return _shape([
                    [ 0, 0, 1, 0 ],
                    [ 1, 0, 1, 1 ],
                    [ 1, 1, 0, 1 ],
                    [ 0, 1, 0, 0 ]
                ]);
            };

        var _shapes = {
                "Circle": _circle,
                "Ellipse": _circle,
                "Diamond": function () {
                    return _shape([
                        [ 0.5, 0, 1, 0.5 ],
                        [ 1, 0.5, 0.5, 1 ],
                        [ 0.5, 1, 0, 0.5 ],
                        [ 0, 0.5, 0.5, 0 ]
                    ]);
                },
                "Rectangle": _rectangle,
                "Square": _rectangle,
                "Triangle": function () {
                    return _shape([
                        [ 0.5, 0, 1, 1 ],
                        [ 1, 1, 0, 1 ],
                        [ 0, 1, 0.5, 0]
                    ]);
                },
                "Path": function (params) {
                    var points = params.points, p = [], tl = 0;
                    for (var i = 0; i < points.length - 1; i++) {
                        var l = Math.sqrt(Math.pow(points[i][2] - points[i][0]) + Math.pow(points[i][3] - points[i][1]));
                        tl += l;
                        p.push([points[i][0], points[i][1], points[i + 1][0], points[i + 1][1], l]);
                    }
                    for (var j = 0; j < p.length; j++) {
                        p[j][4] = p[j][4] / tl;
                    }
                    return _path(p);
                }
            },
            _rotate = function (points, amountInDegrees) {
                var o = [], theta = amountInDegrees / 180 * Math.PI;
                for (var i = 0; i < points.length; i++) {
                    var _x = points[i][0] - 0.5,
                        _y = points[i][1] - 0.5;

                    o.push([
                            0.5 + ((_x * Math.cos(theta)) - (_y * Math.sin(theta))),
                            0.5 + ((_x * Math.sin(theta)) + (_y * Math.cos(theta))),
                        points[i][2],
                        points[i][3]
                    ]);
                }
                return o;
            };

        if (!_shapes[shape]) throw new Error("Shape [" + shape + "] is unknown by Perimeter Anchor type");

        var da = _shapes[shape](params);
        if (params.rotation) da = _rotate(da, params.rotation);
        var a = params.jsPlumbInstance.makeDynamicAnchor(da);
        a.type = "Perimeter";
        return a;
    };
}).call(this);
/*
 * jsPlumb
 * 
 * Title:jsPlumb 2.0.2
 * 
 * Provides a way to visually connect elements on an HTML page, using SVG.
 * 
 * This file contains the default Connectors, Endpoint and Overlay definitions.
 *
 * Copyright (c) 2010 - 2015 jsPlumb (hello@jsplumbtoolkit.com)
 * 
 * http://jsplumbtoolkit.com
 * http://github.com/sporritt/jsplumb
 * 
 * Dual licensed under the MIT and GPL2 licenses.
 */
;
(function () {

    "use strict";
    var root = this, _jp = root.jsPlumb, _ju = root.jsPlumbUtil, _jg = root.Biltong;

    _jp.Segments = {

        /*
         * Class: AbstractSegment
         * A Connector is made up of 1..N Segments, each of which has a Type, such as 'Straight', 'Arc',
         * 'Bezier'. This is new from 1.4.2, and gives us a lot more flexibility when drawing connections: things such
         * as rounded corners for flowchart connectors, for example, or a straight line stub for Bezier connections, are
         * much easier to do now.
         *
         * A Segment is responsible for providing coordinates for painting it, and also must be able to report its length.
         * 
         */
        AbstractSegment: function (params) {
            this.params = params;

            /**
             * Function: findClosestPointOnPath
             * Finds the closest point on this segment to the given [x, y],
             * returning both the x and y of the point plus its distance from
             * the supplied point, and its location along the length of the
             * path inscribed by the segment.  This implementation returns
             * Infinity for distance and null values for everything else;
             * subclasses are expected to override.
             */
            this.findClosestPointOnPath = function (x, y) {
                return {
                    d: Infinity,
                    x: null,
                    y: null,
                    l: null
                };
            };

            this.getBounds = function () {
                return {
                    minX: Math.min(params.x1, params.x2),
                    minY: Math.min(params.y1, params.y2),
                    maxX: Math.max(params.x1, params.x2),
                    maxY: Math.max(params.y1, params.y2)
                };
            };
        },
        Straight: function (params) {
            var _super = _jp.Segments.AbstractSegment.apply(this, arguments),
                length, m, m2, x1, x2, y1, y2,
                _recalc = function () {
                    length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                    m = _jg.gradient({x: x1, y: y1}, {x: x2, y: y2});
                    m2 = -1 / m;
                };

            this.type = "Straight";

            this.getLength = function () {
                return length;
            };
            this.getGradient = function () {
                return m;
            };

            this.getCoordinates = function () {
                return { x1: x1, y1: y1, x2: x2, y2: y2 };
            };
            this.setCoordinates = function (coords) {
                x1 = coords.x1;
                y1 = coords.y1;
                x2 = coords.x2;
                y2 = coords.y2;
                _recalc();
            };
            this.setCoordinates({x1: params.x1, y1: params.y1, x2: params.x2, y2: params.y2});

            this.getBounds = function () {
                return {
                    minX: Math.min(x1, x2),
                    minY: Math.min(y1, y2),
                    maxX: Math.max(x1, x2),
                    maxY: Math.max(y1, y2)
                };
            };

            /**
             * returns the point on the segment's path that is 'location' along the length of the path, where 'location' is a decimal from
             * 0 to 1 inclusive. for the straight line segment this is simple maths.
             */
            this.pointOnPath = function (location, absolute) {
                if (location === 0 && !absolute)
                    return { x: x1, y: y1 };
                else if (location == 1 && !absolute)
                    return { x: x2, y: y2 };
                else {
                    var l = absolute ? location > 0 ? location : length + location : location * length;
                    return _jg.pointOnLine({x: x1, y: y1}, {x: x2, y: y2}, l);
                }
            };

            /**
             * returns the gradient of the segment at the given point - which for us is constant.
             */
            this.gradientAtPoint = function (_) {
                return m;
            };

            /**
             * returns the point on the segment's path that is 'distance' along the length of the path from 'location', where
             * 'location' is a decimal from 0 to 1 inclusive, and 'distance' is a number of pixels.
             * this hands off to jsPlumbUtil to do the maths, supplying two points and the distance.
             */
            this.pointAlongPathFrom = function (location, distance, absolute) {
                var p = this.pointOnPath(location, absolute),
                    farAwayPoint = distance <= 0 ? {x: x1, y: y1} : {x: x2, y: y2 };

                /*
                 location == 1 ? {
                 x:x1 + ((x2 - x1) * 10),
                 y:y1 + ((y1 - y2) * 10)
                 } :
                 */

                if (distance <= 0 && Math.abs(distance) > 1) distance *= -1;

                return _jg.pointOnLine(p, farAwayPoint, distance);
            };

            // is c between a and b?
            var within = function (a, b, c) {
                return c >= Math.min(a, b) && c <= Math.max(a, b);
            };
            // find which of a and b is closest to c
            var closest = function (a, b, c) {
                return Math.abs(c - a) < Math.abs(c - b) ? a : b;
            };

            /**
             Function: findClosestPointOnPath
             Finds the closest point on this segment to [x,y]. See
             notes on this method in AbstractSegment.
             */
            this.findClosestPointOnPath = function (x, y) {
                var out = {
                    d: Infinity,
                    x: null,
                    y: null,
                    l: null,
                    x1: x1,
                    x2: x2,
                    y1: y1,
                    y2: y2
                };

                if (m === 0) {
                    out.y = y1;
                    out.x = within(x1, x2, x) ? x : closest(x1, x2, x);
                }
                else if (m == Infinity || m == -Infinity) {
                    out.x = x1;
                    out.y = within(y1, y2, y) ? y : closest(y1, y2, y);
                }
                else {
                    // closest point lies on normal from given point to this line.  
                    var b = y1 - (m * x1),
                        b2 = y - (m2 * x),
                    // y1 = m.x1 + b and y1 = m2.x1 + b2
                    // so m.x1 + b = m2.x1 + b2
                    // x1(m - m2) = b2 - b
                    // x1 = (b2 - b) / (m - m2)
                        _x1 = (b2 - b) / (m - m2),
                        _y1 = (m * _x1) + b;

                    out.x = within(x1, x2, _x1) ? _x1 : closest(x1, x2, _x1);//_x1;
                    out.y = within(y1, y2, _y1) ? _y1 : closest(y1, y2, _y1);//_y1;
                }

                var fractionInSegment = _jg.lineLength([ out.x, out.y ], [ x1, y1 ]);
                out.d = _jg.lineLength([x, y], [out.x, out.y]);
                out.l = fractionInSegment / length;
                return out;
            };
        },

        /*
         Arc Segment. You need to supply:

         r   -   radius
         cx  -   center x for the arc
         cy  -   center y for the arc
         ac  -   whether the arc is anticlockwise or not. default is clockwise.

         and then either:

         startAngle  -   startAngle for the arc.
         endAngle    -   endAngle for the arc.

         or:

         x1          -   x for start point
         y1          -   y for start point
         x2          -   x for end point
         y2          -   y for end point

         */
        Arc: function (params) {
            var _super = _jp.Segments.AbstractSegment.apply(this, arguments),
                _calcAngle = function (_x, _y) {
                    return _jg.theta([params.cx, params.cy], [_x, _y]);
                },
                _calcAngleForLocation = function (segment, location) {
                    if (segment.anticlockwise) {
                        var sa = segment.startAngle < segment.endAngle ? segment.startAngle + TWO_PI : segment.startAngle,
                            s = Math.abs(sa - segment.endAngle);
                        return sa - (s * location);
                    }
                    else {
                        var ea = segment.endAngle < segment.startAngle ? segment.endAngle + TWO_PI : segment.endAngle,
                            ss = Math.abs(ea - segment.startAngle);

                        return segment.startAngle + (ss * location);
                    }
                },
                TWO_PI = 2 * Math.PI;

            this.radius = params.r;
            this.anticlockwise = params.ac;
            this.type = "Arc";

            if (params.startAngle && params.endAngle) {
                this.startAngle = params.startAngle;
                this.endAngle = params.endAngle;
                this.x1 = params.cx + (this.radius * Math.cos(params.startAngle));
                this.y1 = params.cy + (this.radius * Math.sin(params.startAngle));
                this.x2 = params.cx + (this.radius * Math.cos(params.endAngle));
                this.y2 = params.cy + (this.radius * Math.sin(params.endAngle));
            }
            else {
                this.startAngle = _calcAngle(params.x1, params.y1);
                this.endAngle = _calcAngle(params.x2, params.y2);
                this.x1 = params.x1;
                this.y1 = params.y1;
                this.x2 = params.x2;
                this.y2 = params.y2;
            }

            if (this.endAngle < 0) this.endAngle += TWO_PI;
            if (this.startAngle < 0) this.startAngle += TWO_PI;

            // segment is used by vml     
            //this.segment = _jg.quadrant([this.x1, this.y1], [this.x2, this.y2]);

            // we now have startAngle and endAngle as positive numbers, meaning the
            // absolute difference (|d|) between them is the sweep (s) of this arc, unless the
            // arc is 'anticlockwise' in which case 's' is given by 2PI - |d|.

            var ea = this.endAngle < this.startAngle ? this.endAngle + TWO_PI : this.endAngle;
            this.sweep = Math.abs(ea - this.startAngle);
            if (this.anticlockwise) this.sweep = TWO_PI - this.sweep;
            var circumference = 2 * Math.PI * this.radius,
                frac = this.sweep / TWO_PI,
                length = circumference * frac;

            this.getLength = function () {
                return length;
            };

            this.getBounds = function () {
                return {
                    minX: params.cx - params.r,
                    maxX: params.cx + params.r,
                    minY: params.cy - params.r,
                    maxY: params.cy + params.r
                };
            };

            var VERY_SMALL_VALUE = 0.0000000001,
                gentleRound = function (n) {
                    var f = Math.floor(n), r = Math.ceil(n);
                    if (n - f < VERY_SMALL_VALUE)
                        return f;
                    else if (r - n < VERY_SMALL_VALUE)
                        return r;
                    return n;
                };

            /**
             * returns the point on the segment's path that is 'location' along the length of the path, where 'location' is a decimal from
             * 0 to 1 inclusive.
             */
            this.pointOnPath = function (location, absolute) {

                if (location === 0) {
                    return { x: this.x1, y: this.y1, theta: this.startAngle };
                }
                else if (location == 1) {
                    return { x: this.x2, y: this.y2, theta: this.endAngle };
                }

                if (absolute) {
                    location = location / length;
                }

                var angle = _calcAngleForLocation(this, location),
                    _x = params.cx + (params.r * Math.cos(angle)),
                    _y = params.cy + (params.r * Math.sin(angle));

                return { x: gentleRound(_x), y: gentleRound(_y), theta: angle };
            };

            /**
             * returns the gradient of the segment at the given point.
             */
            this.gradientAtPoint = function (location, absolute) {
                var p = this.pointOnPath(location, absolute);
                var m = _jg.normal([ params.cx, params.cy ], [p.x, p.y ]);
                if (!this.anticlockwise && (m == Infinity || m == -Infinity)) m *= -1;
                return m;
            };

            this.pointAlongPathFrom = function (location, distance, absolute) {
                var p = this.pointOnPath(location, absolute),
                    arcSpan = distance / circumference * 2 * Math.PI,
                    dir = this.anticlockwise ? -1 : 1,
                    startAngle = p.theta + (dir * arcSpan),
                    startX = params.cx + (this.radius * Math.cos(startAngle)),
                    startY = params.cy + (this.radius * Math.sin(startAngle));

                return {x: startX, y: startY};
            };
        },

        Bezier: function (params) {
            this.curve = [
                { x: params.x1, y: params.y1},
                { x: params.cp1x, y: params.cp1y },
                { x: params.cp2x, y: params.cp2y },
                { x: params.x2, y: params.y2 }
            ];

            var _super = _jp.Segments.AbstractSegment.apply(this, arguments);
            // although this is not a strictly rigorous determination of bounds
            // of a bezier curve, it works for the types of curves that this segment
            // type produces.
            this.bounds = {
                minX: Math.min(params.x1, params.x2, params.cp1x, params.cp2x),
                minY: Math.min(params.y1, params.y2, params.cp1y, params.cp2y),
                maxX: Math.max(params.x1, params.x2, params.cp1x, params.cp2x),
                maxY: Math.max(params.y1, params.y2, params.cp1y, params.cp2y)
            };

            this.type = "Bezier";

            var _translateLocation = function (_curve, location, absolute) {
                if (absolute)
                    location = root.jsBezier.locationAlongCurveFrom(_curve, location > 0 ? 0 : 1, location);

                return location;
            };

            /**
             * returns the point on the segment's path that is 'location' along the length of the path, where 'location' is a decimal from
             * 0 to 1 inclusive.
             */
            this.pointOnPath = function (location, absolute) {
                location = _translateLocation(this.curve, location, absolute);
                return root.jsBezier.pointOnCurve(this.curve, location);
            };

            /**
             * returns the gradient of the segment at the given point.
             */
            this.gradientAtPoint = function (location, absolute) {
                location = _translateLocation(this.curve, location, absolute);
                return root.jsBezier.gradientAtPoint(this.curve, location);
            };

            this.pointAlongPathFrom = function (location, distance, absolute) {
                location = _translateLocation(this.curve, location, absolute);
                return root.jsBezier.pointAlongCurveFrom(this.curve, location, distance);
            };

            this.getLength = function () {
                return root.jsBezier.getLength(this.curve);
            };

            this.getBounds = function () {
                return this.bounds;
            };
        }
    };

    /*
     Class: AbstractComponent
     Superclass for AbstractConnector and AbstractEndpoint.
     */
    var AbstractComponent = function () {
        this.resetBounds = function () {
            this.bounds = { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity };
        };
        this.resetBounds();
    };

    /*
     * Class: AbstractConnector
     * Superclass for all Connectors; here is where Segments are managed.  This is exposed on jsPlumb just so it
     * can be accessed from other files. You should not try to instantiate one of these directly.
     *
     * When this class is asked for a pointOnPath, or gradient etc, it must first figure out which segment to dispatch
     * that request to. This is done by keeping track of the total connector length as segments are added, and also
     * their cumulative ratios to the total length.  Then when the right segment is found it is a simple case of dispatching
     * the request to it (and adjusting 'location' so that it is relative to the beginning of that segment.)
     */
    _jp.Connectors.AbstractConnector = function (params) {

        AbstractComponent.apply(this, arguments);

        var segments = [],
            totalLength = 0,
            segmentProportions = [],
            segmentProportionalLengths = [],
            stub = params.stub || 0,
            sourceStub = _ju.isArray(stub) ? stub[0] : stub,
            targetStub = _ju.isArray(stub) ? stub[1] : stub,
            gap = params.gap || 0,
            sourceGap = _ju.isArray(gap) ? gap[0] : gap,
            targetGap = _ju.isArray(gap) ? gap[1] : gap,
            userProvidedSegments = null,
            edited = false,
            paintInfo = null;

        // to be overridden by subclasses.
        this.getPath = function () {
        };
        this.setPath = function (path) {
        };

        /**
         * Function: findSegmentForPoint
         * Returns the segment that is closest to the given [x,y],
         * null if nothing found.  This function returns a JS
         * object with:
         *
         *   d   -   distance from segment
         *   l   -   proportional location in segment
         *   x   -   x point on the segment
         *   y   -   y point on the segment
         *   s   -   the segment itself.
         */
        this.findSegmentForPoint = function (x, y) {
            var out = { d: Infinity, s: null, x: null, y: null, l: null };
            for (var i = 0; i < segments.length; i++) {
                var _s = segments[i].findClosestPointOnPath(x, y);
                if (_s.d < out.d) {
                    out.d = _s.d;
                    out.l = _s.l;
                    out.x = _s.x;
                    out.y = _s.y;
                    out.s = segments[i];
                    out.x1 = _s.x1;
                    out.x2 = _s.x2;
                    out.y1 = _s.y1;
                    out.y2 = _s.y2;
                    out.index = i;
                }
            }

            return out;
        };

        var _updateSegmentProportions = function () {
                var curLoc = 0;
                for (var i = 0; i < segments.length; i++) {
                    var sl = segments[i].getLength();
                    segmentProportionalLengths[i] = sl / totalLength;
                    segmentProportions[i] = [curLoc, (curLoc += (sl / totalLength)) ];
                }
            },

            /**
             * returns [segment, proportion of travel in segment, segment index] for the segment
             * that contains the point which is 'location' distance along the entire path, where
             * 'location' is a decimal between 0 and 1 inclusive. in this connector type, paths
             * are made up of a list of segments, each of which contributes some fraction to
             * the total length.
             * From 1.3.10 this also supports the 'absolute' property, which lets us specify a location
             * as the absolute distance in pixels, rather than a proportion of the total path.
             */
            _findSegmentForLocation = function (location, absolute) {
                if (absolute) {
                    location = location > 0 ? location / totalLength : (totalLength + location) / totalLength;
                }
                var idx = segmentProportions.length - 1, inSegmentProportion = 1;
                for (var i = 0; i < segmentProportions.length; i++) {
                    if (segmentProportions[i][1] >= location) {
                        idx = i;
                        // todo is this correct for all connector path types?
                        inSegmentProportion = location == 1 ? 1 : location === 0 ? 0 : (location - segmentProportions[i][0]) / segmentProportionalLengths[i];
                        break;
                    }
                }
                return { segment: segments[idx], proportion: inSegmentProportion, index: idx };
            },
            _addSegment = function (conn, type, params) {
                if (params.x1 == params.x2 && params.y1 == params.y2) return;
                var s = new _jp.Segments[type](params);
                segments.push(s);
                totalLength += s.getLength();
                conn.updateBounds(s);
            },
            _clearSegments = function () {
                totalLength = segments.length = segmentProportions.length = segmentProportionalLengths.length = 0;
            };

        this.setSegments = function (_segs) {
            userProvidedSegments = [];
            totalLength = 0;
            for (var i = 0; i < _segs.length; i++) {
                userProvidedSegments.push(_segs[i]);
                totalLength += _segs[i].getLength();
            }
        };

        this.getLength = function() {
            return totalLength;
        };

        var _prepareCompute = function (params) {
            this.lineWidth = params.lineWidth;
            var segment = _jg.quadrant(params.sourcePos, params.targetPos),
                swapX = params.targetPos[0] < params.sourcePos[0],
                swapY = params.targetPos[1] < params.sourcePos[1],
                lw = params.lineWidth || 1,
                so = params.sourceEndpoint.anchor.getOrientation(params.sourceEndpoint),
                to = params.targetEndpoint.anchor.getOrientation(params.targetEndpoint),
                x = swapX ? params.targetPos[0] : params.sourcePos[0],
                y = swapY ? params.targetPos[1] : params.sourcePos[1],
                w = Math.abs(params.targetPos[0] - params.sourcePos[0]),
                h = Math.abs(params.targetPos[1] - params.sourcePos[1]);

            // if either anchor does not have an orientation set, we derive one from their relative
            // positions.  we fix the axis to be the one in which the two elements are further apart, and
            // point each anchor at the other element.  this is also used when dragging a new connection.
            if (so[0] === 0 && so[1] === 0 || to[0] === 0 && to[1] === 0) {
                var index = w > h ? 0 : 1, oIndex = [1, 0][index];
                so = [];
                to = [];
                so[index] = params.sourcePos[index] > params.targetPos[index] ? -1 : 1;
                to[index] = params.sourcePos[index] > params.targetPos[index] ? 1 : -1;
                so[oIndex] = 0;
                to[oIndex] = 0;
            }

            var sx = swapX ? w + (sourceGap * so[0]) : sourceGap * so[0],
                sy = swapY ? h + (sourceGap * so[1]) : sourceGap * so[1],
                tx = swapX ? targetGap * to[0] : w + (targetGap * to[0]),
                ty = swapY ? targetGap * to[1] : h + (targetGap * to[1]),
                oProduct = ((so[0] * to[0]) + (so[1] * to[1]));

            var result = {
                sx: sx, sy: sy, tx: tx, ty: ty, lw: lw,
                xSpan: Math.abs(tx - sx),
                ySpan: Math.abs(ty - sy),
                mx: (sx + tx) / 2,
                my: (sy + ty) / 2,
                so: so, to: to, x: x, y: y, w: w, h: h,
                segment: segment,
                startStubX: sx + (so[0] * sourceStub),
                startStubY: sy + (so[1] * sourceStub),
                endStubX: tx + (to[0] * targetStub),
                endStubY: ty + (to[1] * targetStub),
                isXGreaterThanStubTimes2: Math.abs(sx - tx) > (sourceStub + targetStub),
                isYGreaterThanStubTimes2: Math.abs(sy - ty) > (sourceStub + targetStub),
                opposite: oProduct == -1,
                perpendicular: oProduct === 0,
                orthogonal: oProduct == 1,
                sourceAxis: so[0] === 0 ? "y" : "x",
                points: [x, y, w, h, sx, sy, tx, ty ]
            };
            result.anchorOrientation = result.opposite ? "opposite" : result.orthogonal ? "orthogonal" : "perpendicular";
            return result;
        };

        this.getSegments = function () {
            return segments;
        };

        this.updateBounds = function (segment) {
            var segBounds = segment.getBounds();
            this.bounds.minX = Math.min(this.bounds.minX, segBounds.minX);
            this.bounds.maxX = Math.max(this.bounds.maxX, segBounds.maxX);
            this.bounds.minY = Math.min(this.bounds.minY, segBounds.minY);
            this.bounds.maxY = Math.max(this.bounds.maxY, segBounds.maxY);
        };

        var dumpSegmentsToConsole = function () {
            console.log("SEGMENTS:");
            for (var i = 0; i < segments.length; i++) {
                console.log(segments[i].type, segments[i].getLength(), segmentProportions[i]);
            }
        };

        this.pointOnPath = function (location, absolute) {
            var seg = _findSegmentForLocation(location, absolute);
            return seg.segment && seg.segment.pointOnPath(seg.proportion, false) || [0, 0];
        };

        this.gradientAtPoint = function (location, absolute) {
            var seg = _findSegmentForLocation(location, absolute);
            return seg.segment && seg.segment.gradientAtPoint(seg.proportion, false) || 0;
        };

        this.pointAlongPathFrom = function (location, distance, absolute) {
            var seg = _findSegmentForLocation(location, absolute);
            // TODO what happens if this crosses to the next segment?
            return seg.segment && seg.segment.pointAlongPathFrom(seg.proportion, distance, false) || [0, 0];
        };

        this.compute = function (params) {
            if (!edited)
                paintInfo = _prepareCompute.call(this, params);

            _clearSegments();
            this._compute(paintInfo, params);
            this.x = paintInfo.points[0];
            this.y = paintInfo.points[1];
            this.w = paintInfo.points[2];
            this.h = paintInfo.points[3];
            this.segment = paintInfo.segment;
            _updateSegmentProportions();
        };

        return {
            addSegment: _addSegment,
            prepareCompute: _prepareCompute,
            sourceStub: sourceStub,
            targetStub: targetStub,
            maxStub: Math.max(sourceStub, targetStub),
            sourceGap: sourceGap,
            targetGap: targetGap,
            maxGap: Math.max(sourceGap, targetGap)
        };
    };
    _ju.extend(_jp.Connectors.AbstractConnector, AbstractComponent);

    /**
     * Class: Connectors.Straight
     * The Straight connector draws a simple straight line between the two anchor points.  It does not have any constructor parameters.
     */
    var Straight = _jp.Connectors.Straight = function () {
        this.type = "Straight";
        var _super = _jp.Connectors.AbstractConnector.apply(this, arguments);

        this._compute = function (paintInfo, _) {
            _super.addSegment(this, "Straight", {x1: paintInfo.sx, y1: paintInfo.sy, x2: paintInfo.startStubX, y2: paintInfo.startStubY});
            _super.addSegment(this, "Straight", {x1: paintInfo.startStubX, y1: paintInfo.startStubY, x2: paintInfo.endStubX, y2: paintInfo.endStubY});
            _super.addSegment(this, "Straight", {x1: paintInfo.endStubX, y1: paintInfo.endStubY, x2: paintInfo.tx, y2: paintInfo.ty});
        };
    };
    _ju.extend(_jp.Connectors.Straight, _jp.Connectors.AbstractConnector);
    _jp.registerConnectorType(Straight, "Straight");


    // ********************************* END OF CONNECTOR TYPES *******************************************************************

    // ********************************* ENDPOINT TYPES *******************************************************************

    _jp.Endpoints.AbstractEndpoint = function (params) {
        AbstractComponent.apply(this, arguments);
        var compute = this.compute = function (anchorPoint, orientation, endpointStyle, connectorPaintStyle) {
            var out = this._compute.apply(this, arguments);
            this.x = out[0];
            this.y = out[1];
            this.w = out[2];
            this.h = out[3];
            this.bounds.minX = this.x;
            this.bounds.minY = this.y;
            this.bounds.maxX = this.x + this.w;
            this.bounds.maxY = this.y + this.h;
            return out;
        };
        return {
            compute: compute,
            cssClass: params.cssClass
        };
    };
    _ju.extend(_jp.Endpoints.AbstractEndpoint, AbstractComponent);

    /**
     * Class: Endpoints.Dot
     * A round endpoint, with default radius 10 pixels.
     */

    /**
     * Function: Constructor
     *
     * Parameters:
     *
     *    radius    -    radius of the endpoint.  defaults to 10 pixels.
     */
    _jp.Endpoints.Dot = function (params) {
        this.type = "Dot";
        var _super = _jp.Endpoints.AbstractEndpoint.apply(this, arguments);
        params = params || {};
        this.radius = params.radius || 10;
        this.defaultOffset = 0.5 * this.radius;
        this.defaultInnerRadius = this.radius / 3;

        this._compute = function (anchorPoint, orientation, endpointStyle, connectorPaintStyle) {
            this.radius = endpointStyle.radius || this.radius;
            var x = anchorPoint[0] - this.radius,
                y = anchorPoint[1] - this.radius,
                w = this.radius * 2,
                h = this.radius * 2;

            if (endpointStyle.strokeStyle) {
                var lw = endpointStyle.lineWidth || 1;
                x -= lw;
                y -= lw;
                w += (lw * 2);
                h += (lw * 2);
            }
            return [ x, y, w, h, this.radius ];
        };
    };
    _ju.extend(_jp.Endpoints.Dot, _jp.Endpoints.AbstractEndpoint);

    _jp.Endpoints.Rectangle = function (params) {
        this.type = "Rectangle";
        var _super = _jp.Endpoints.AbstractEndpoint.apply(this, arguments);
        params = params || {};
        this.width = params.width || 20;
        this.height = params.height || 20;

        this._compute = function (anchorPoint, orientation, endpointStyle, connectorPaintStyle) {
            var width = endpointStyle.width || this.width,
                height = endpointStyle.height || this.height,
                x = anchorPoint[0] - (width / 2),
                y = anchorPoint[1] - (height / 2);

            return [ x, y, width, height];
        };
    };
    _ju.extend(_jp.Endpoints.Rectangle, _jp.Endpoints.AbstractEndpoint);

    var DOMElementEndpoint = function (params) {
        _jp.jsPlumbUIComponent.apply(this, arguments);
        this._jsPlumb.displayElements = [];
    };
    _ju.extend(DOMElementEndpoint, _jp.jsPlumbUIComponent, {
        getDisplayElements: function () {
            return this._jsPlumb.displayElements;
        },
        appendDisplayElement: function (el) {
            this._jsPlumb.displayElements.push(el);
        }
    });

    /**
     * Class: Endpoints.Image
     * Draws an image as the Endpoint.
     */
    /**
     * Function: Constructor
     *
     * Parameters:
     *
     *    src    -    location of the image to use.

     TODO: multiple references to self. not sure quite how to get rid of them entirely. perhaps self = null in the cleanup
     function will suffice

     TODO this class still might leak memory.

     */
    _jp.Endpoints.Image = function (params) {

        this.type = "Image";
        DOMElementEndpoint.apply(this, arguments);
        _jp.Endpoints.AbstractEndpoint.apply(this, arguments);

        var _onload = params.onload,
            src = params.src || params.url,
            clazz = params.cssClass ? " " + params.cssClass : "";

        this._jsPlumb.img = new Image();
        this._jsPlumb.ready = false;
        this._jsPlumb.initialized = false;
        this._jsPlumb.deleted = false;
        this._jsPlumb.widthToUse = params.width;
        this._jsPlumb.heightToUse = params.height;
        this._jsPlumb.endpoint = params.endpoint;

        this._jsPlumb.img.onload = function () {
            if (this._jsPlumb != null) {
                this._jsPlumb.ready = true;
                this._jsPlumb.widthToUse = this._jsPlumb.widthToUse || this._jsPlumb.img.width;
                this._jsPlumb.heightToUse = this._jsPlumb.heightToUse || this._jsPlumb.img.height;
                if (_onload) {
                    _onload(this);
                }
            }
        }.bind(this);

        /*
         Function: setImage
         Sets the Image to use in this Endpoint.

         Parameters:
         img         -   may be a URL or an Image object
         onload      -   optional; a callback to execute once the image has loaded.
         */
        this._jsPlumb.endpoint.setImage = function (_img, onload) {
            var s = _img.constructor == String ? _img : _img.src;
            _onload = onload;
            this._jsPlumb.img.src = s;

            if (this.canvas != null)
                this.canvas.setAttribute("src", this._jsPlumb.img.src);
        }.bind(this);

        this._jsPlumb.endpoint.setImage(src, _onload);
        this._compute = function (anchorPoint, orientation, endpointStyle, connectorPaintStyle) {
            this.anchorPoint = anchorPoint;
            if (this._jsPlumb.ready) return [anchorPoint[0] - this._jsPlumb.widthToUse / 2, anchorPoint[1] - this._jsPlumb.heightToUse / 2,
                this._jsPlumb.widthToUse, this._jsPlumb.heightToUse];
            else return [0, 0, 0, 0];
        };

        this.canvas = jsPlumb.createElement("img", {
            position:"absolute",
            margin:0,
            padding:0,
            outline:0
        }, this._jsPlumb.instance.endpointClass + clazz);

        if (this._jsPlumb.widthToUse) this.canvas.setAttribute("width", this._jsPlumb.widthToUse);
        if (this._jsPlumb.heightToUse) this.canvas.setAttribute("height", this._jsPlumb.heightToUse);
        this._jsPlumb.instance.appendElement(this.canvas);

        this.actuallyPaint = function (d, style, anchor) {
            if (!this._jsPlumb.deleted) {
                if (!this._jsPlumb.initialized) {
                    this.canvas.setAttribute("src", this._jsPlumb.img.src);
                    this.appendDisplayElement(this.canvas);
                    this._jsPlumb.initialized = true;
                }
                var x = this.anchorPoint[0] - (this._jsPlumb.widthToUse / 2),
                    y = this.anchorPoint[1] - (this._jsPlumb.heightToUse / 2);
                _ju.sizeElement(this.canvas, x, y, this._jsPlumb.widthToUse, this._jsPlumb.heightToUse);
            }
        };

        this.paint = function (style, anchor) {
            if (this._jsPlumb != null) {  // may have been deleted
                if (this._jsPlumb.ready) {
                    this.actuallyPaint(style, anchor);
                }
                else {
                    root.setTimeout(function () {
                        this.paint(style, anchor);
                    }.bind(this), 200);
                }
            }
        };
    };
    _ju.extend(_jp.Endpoints.Image, [ DOMElementEndpoint, _jp.Endpoints.AbstractEndpoint ], {
        cleanup: function (force) {
            if (force) {
                this._jsPlumb.deleted = true;
                if (this.canvas) this.canvas.parentNode.removeChild(this.canvas);
                this.canvas = null;
            }
        }
    });

    /*
     * Class: Endpoints.Blank
     * An Endpoint that paints nothing (visible) on the screen.  Supports cssClass and hoverClass parameters like all Endpoints.
     */
    _jp.Endpoints.Blank = function (params) {
        var _super = _jp.Endpoints.AbstractEndpoint.apply(this, arguments);
        this.type = "Blank";
        DOMElementEndpoint.apply(this, arguments);
        this._compute = function (anchorPoint, orientation, endpointStyle, connectorPaintStyle) {
            return [anchorPoint[0], anchorPoint[1], 10, 0];
        };

        var clazz = params.cssClass ? " " + params.cssClass : "";

        this.canvas = jsPlumb.createElement("div", {
            display: "block",
            width: "1px",
            height: "1px",
            background: "transparent",
            position: "absolute"
        }, this._jsPlumb.instance.endpointClass + clazz);

        this._jsPlumb.instance.appendElement(this.canvas);

        this.paint = function (style, anchor) {
            _ju.sizeElement(this.canvas, this.x, this.y, this.w, this.h);
        };
    };
    _ju.extend(_jp.Endpoints.Blank, [_jp.Endpoints.AbstractEndpoint, DOMElementEndpoint], {
        cleanup: function () {
            if (this.canvas && this.canvas.parentNode) {
                this.canvas.parentNode.removeChild(this.canvas);
            }
        }
    });

    /*
     * Class: Endpoints.Triangle
     * A triangular Endpoint.
     */
    /*
     * Function: Constructor
     *
     * Parameters:
     *
     * 	width	-	width of the triangle's base.  defaults to 55 pixels.
     * 	height	-	height of the triangle from base to apex.  defaults to 55 pixels.
     */
    _jp.Endpoints.Triangle = function (params) {
        this.type = "Triangle";
        _jp.Endpoints.AbstractEndpoint.apply(this, arguments);
        params = params || {  };
        params.width = params.width || 55;
        params.height = params.height || 55;
        this.width = params.width;
        this.height = params.height;
        this._compute = function (anchorPoint, orientation, endpointStyle, connectorPaintStyle) {
            var width = endpointStyle.width || self.width,
                height = endpointStyle.height || self.height,
                x = anchorPoint[0] - (width / 2),
                y = anchorPoint[1] - (height / 2);
            return [ x, y, width, height ];
        };
    };
// ********************************* END OF ENDPOINT TYPES *******************************************************************


// ********************************* OVERLAY DEFINITIONS ***********************************************************************    

    var AbstractOverlay = _jp.Overlays.AbstractOverlay = function (params) {
        this.visible = true;
        this.isAppendedAtTopLevel = true;
        this.component = params.component;
        this.loc = params.location == null ? 0.5 : params.location;
        this.endpointLoc = params.endpointLocation == null ? [ 0.5, 0.5] : params.endpointLocation;
    };
    AbstractOverlay.prototype = {
        cleanup: function (force) {
            if (force) {
                this.component = null;
                this.canvas = null;
                this.endpointLoc = null;
            }
        },
        reattach:function(instance) {

        },
        setVisible: function (val) {
            this.visible = val;
            this.component.repaint();
        },
        isVisible: function () {
            return this.visible;
        },
        hide: function () {
            this.setVisible(false);
        },
        show: function () {
            this.setVisible(true);
        },
        incrementLocation: function (amount) {
            this.loc += amount;
            this.component.repaint();
        },
        setLocation: function (l) {
            this.loc = l;
            this.component.repaint();
        },
        getLocation: function () {
            return this.loc;
        },
        updateFrom:function() { }
    };


    /*
     * Class: Overlays.Arrow
     *
     * An arrow overlay, defined by four points: the head, the two sides of the tail, and a 'foldback' point at some distance along the length
     * of the arrow that lines from each tail point converge into.  The foldback point is defined using a decimal that indicates some fraction
     * of the length of the arrow and has a default value of 0.623.  A foldback point value of 1 would mean that the arrow had a straight line
     * across the tail.
     */
    /*
     * Function: Constructor
     *
     * Parameters:
     *
     * 	length - distance in pixels from head to tail baseline. default 20.
     * 	width - width in pixels of the tail baseline. default 20.
     * 	fillStyle - style to use when filling the arrow.  defaults to "black".
     * 	strokeStyle - style to use when stroking the arrow. defaults to null, which means the arrow is not stroked.
     * 	lineWidth - line width to use when stroking the arrow. defaults to 1, but only used if strokeStyle is not null.
     * 	foldback - distance (as a decimal from 0 to 1 inclusive) along the length of the arrow marking the point the tail points should fold back to.  defaults to 0.623.
     * 	location - distance (as a decimal from 0 to 1 inclusive) marking where the arrow should sit on the connector. defaults to 0.5.
     * 	direction - indicates the direction the arrow points in. valid values are -1 and 1; 1 is default.
     */
    _jp.Overlays.Arrow = function (params) {
        this.type = "Arrow";
        AbstractOverlay.apply(this, arguments);
        this.isAppendedAtTopLevel = false;
        params = params || {};

        this.length = params.length || 20;
        this.width = params.width || 20;
        this.id = params.id;
        var direction = (params.direction || 1) < 0 ? -1 : 1,
            paintStyle = params.paintStyle || { lineWidth: 1 },
        // how far along the arrow the lines folding back in come to. default is 62.3%.
            foldback = params.foldback || 0.623;

        this.computeMaxSize = function () {
            return self.width * 1.5;
        };

        this.draw = function (component, currentConnectionPaintStyle) {

            var hxy, mid, txy, tail, cxy;
            if (component.pointAlongPathFrom) {

                if (_ju.isString(this.loc) || this.loc > 1 || this.loc < 0) {
                    var l = parseInt(this.loc, 10),
                        fromLoc = this.loc < 0 ? 1 : 0;
                    hxy = component.pointAlongPathFrom(fromLoc, l, false);
                    mid = component.pointAlongPathFrom(fromLoc, l - (direction * this.length / 2), false);
                    txy = _jg.pointOnLine(hxy, mid, this.length);
                }
                else if (this.loc == 1) {
                    hxy = component.pointOnPath(this.loc);
                    mid = component.pointAlongPathFrom(this.loc, -(this.length));
                    txy = _jg.pointOnLine(hxy, mid, this.length);

                    if (direction == -1) {
                        var _ = txy;
                        txy = hxy;
                        hxy = _;
                    }
                }
                else if (this.loc === 0) {
                    txy = component.pointOnPath(this.loc);
                    mid = component.pointAlongPathFrom(this.loc, this.length);
                    hxy = _jg.pointOnLine(txy, mid, this.length);
                    if (direction == -1) {
                        var __ = txy;
                        txy = hxy;
                        hxy = __;
                    }
                }
                else {
                    hxy = component.pointAlongPathFrom(this.loc, direction * this.length / 2);
                    mid = component.pointOnPath(this.loc);
                    txy = _jg.pointOnLine(hxy, mid, this.length);
                }

                tail = _jg.perpendicularLineTo(hxy, txy, this.width);
                cxy = _jg.pointOnLine(hxy, txy, foldback * this.length);

                var d = { hxy: hxy, tail: tail, cxy: cxy },
                    strokeStyle = paintStyle.strokeStyle || currentConnectionPaintStyle.strokeStyle,
                    fillStyle = paintStyle.fillStyle || currentConnectionPaintStyle.strokeStyle,
                    lineWidth = paintStyle.lineWidth || currentConnectionPaintStyle.lineWidth;

                return {
                    component: component,
                    d: d,
                    lineWidth: lineWidth,
                    strokeStyle: strokeStyle,
                    fillStyle: fillStyle,
                    minX: Math.min(hxy.x, tail[0].x, tail[1].x),
                    maxX: Math.max(hxy.x, tail[0].x, tail[1].x),
                    minY: Math.min(hxy.y, tail[0].y, tail[1].y),
                    maxY: Math.max(hxy.y, tail[0].y, tail[1].y)
                };
            }
            else return {component: component, minX: 0, maxX: 0, minY: 0, maxY: 0};
        };
    };
    _ju.extend(_jp.Overlays.Arrow, AbstractOverlay, {
        updateFrom:function(d) {
            this.length = d.length || this.length;
            this.width = d.width|| this.width;
            this.direction = d.direction != null ? d.direction : this.direction;
            this.foldback = d.foldback|| this.foldback;
        }
    });

    /*
     * Class: Overlays.PlainArrow
     *
     * A basic arrow.  This is in fact just one instance of the more generic case in which the tail folds back on itself to some
     * point along the length of the arrow: in this case, that foldback point is the full length of the arrow.  so it just does
     * a 'call' to Arrow with foldback set appropriately.
     */
    /*
     * Function: Constructor
     * See <Overlays.Arrow> for allowed parameters for this overlay.
     */
    _jp.Overlays.PlainArrow = function (params) {
        params = params || {};
        var p = _jp.extend(params, {foldback: 1});
        _jp.Overlays.Arrow.call(this, p);
        this.type = "PlainArrow";
    };
    _ju.extend(_jp.Overlays.PlainArrow, _jp.Overlays.Arrow);

    /*
     * Class: Overlays.Diamond
     * 
     * A diamond. Like PlainArrow, this is a concrete case of the more generic case of the tail points converging on some point...it just
     * happens that in this case, that point is greater than the length of the the arrow.
     *
     *      this could probably do with some help with positioning...due to the way it reuses the Arrow paint code, what Arrow thinks is the
     *      center is actually 1/4 of the way along for this guy.  but we don't have any knowledge of pixels at this point, so we're kind of
     *      stuck when it comes to helping out the Arrow class. possibly we could pass in a 'transpose' parameter or something. the value
     *      would be -l/4 in this case - move along one quarter of the total length.
     */
    /*
     * Function: Constructor
     * See <Overlays.Arrow> for allowed parameters for this overlay.
     */
    _jp.Overlays.Diamond = function (params) {
        params = params || {};
        var l = params.length || 40,
            p = jsPlumb.extend(params, {length: l / 2, foldback: 2});
        _jp.Overlays.Arrow.call(this, p);
        this.type = "Diamond";
    };
    _ju.extend(_jp.Overlays.Diamond, _jp.Overlays.Arrow);

    var _getDimensions = function (component, forceRefresh) {
        if (component._jsPlumb.cachedDimensions == null || forceRefresh)
            component._jsPlumb.cachedDimensions = component.getDimensions();
        return component._jsPlumb.cachedDimensions;
    };

    // abstract superclass for overlays that add an element to the DOM.
    var AbstractDOMOverlay = function (params) {
        _jp.jsPlumbUIComponent.apply(this, arguments);
        AbstractOverlay.apply(this, arguments);

        // hand off fired events to associated component.
        var _f = this.fire;
        this.fire = function () {
            _f.apply(this, arguments);
            if (this.component) this.component.fire.apply(this.component, arguments);
        };

        this.detached=false;
        this.id = params.id;
        this._jsPlumb.div = null;
        this._jsPlumb.initialised = false;
        this._jsPlumb.component = params.component;
        this._jsPlumb.cachedDimensions = null;
        this._jsPlumb.create = params.create;
        this._jsPlumb.initiallyInvisible = params.visible === false;

        this.getElement = function () {
            if (this._jsPlumb.div == null) {
                var div = this._jsPlumb.div = jsPlumb.getElement(this._jsPlumb.create(this._jsPlumb.component));
                div.style.position = "absolute";
                div.className = this._jsPlumb.instance.overlayClass + " " +
                    (this.cssClass ? this.cssClass :
                        params.cssClass ? params.cssClass : "");
                this._jsPlumb.instance.appendElement(div);
                this._jsPlumb.instance.getId(div);
                this.canvas = div;

                // in IE the top left corner is what it placed at the desired location.  This will not
                // be fixed. IE8 is not going to be supported for much longer.
                var ts = "translate(-50%, -50%)";
                div.style.webkitTransform = ts;
                div.style.mozTransform = ts;
                div.style.msTransform = ts;
                div.style.oTransform = ts;
                div.style.transform = ts;

                // write the related component into the created element
                div._jsPlumb = this;

                if (params.visible === false)
                    div.style.display = "none";
            }
            return this._jsPlumb.div;
        };

        this.draw = function (component, currentConnectionPaintStyle, absolutePosition) {
            var td = _getDimensions(this);
            if (td != null && td.length == 2) {
                var cxy = { x: 0, y: 0 };

                // absolutePosition would have been set by a call to connection.setAbsoluteOverlayPosition.
                if (absolutePosition) {
                    cxy = { x: absolutePosition[0], y: absolutePosition[1] };
                }
                else if (component.pointOnPath) {
                    var loc = this.loc, absolute = false;
                    if (_ju.isString(this.loc) || this.loc < 0 || this.loc > 1) {
                        loc = parseInt(this.loc, 10);
                        absolute = true;
                    }
                    cxy = component.pointOnPath(loc, absolute);  // a connection
                }
                else {
                    var locToUse = this.loc.constructor == Array ? this.loc : this.endpointLoc;
                    cxy = { x: locToUse[0] * component.w,
                        y: locToUse[1] * component.h };
                }

                var minx = cxy.x - (td[0] / 2),
                    miny = cxy.y - (td[1] / 2);

                return {
                    component: component,
                    d: { minx: minx, miny: miny, td: td, cxy: cxy },
                    minX: minx,
                    maxX: minx + td[0],
                    minY: miny,
                    maxY: miny + td[1]
                };
            }
            else return {minX: 0, maxX: 0, minY: 0, maxY: 0};
        };
    };
    _ju.extend(AbstractDOMOverlay, [_jp.jsPlumbUIComponent, AbstractOverlay], {
        getDimensions: function () {
            return [1,1];
        },
        setVisible: function (state) {
            if (this._jsPlumb.div) {
                this._jsPlumb.div.style.display = state ? "block" : "none";
                // if initially invisible, dimensions are 0,0 and never get updated
                if (state && this._jsPlumb.initiallyInvisible) {
                    _getDimensions(this, true);
                    this.component.repaint();
                    this._jsPlumb.initiallyInvisible = false;
                }
            }
        },
        /*
         * Function: clearCachedDimensions
         * Clears the cached dimensions for the label. As a performance enhancement, label dimensions are
         * cached from 1.3.12 onwards. The cache is cleared when you change the label text, of course, but
         * there are other reasons why the text dimensions might change - if you make a change through CSS, for
         * example, you might change the font size.  in that case you should explicitly call this method.
         */
        clearCachedDimensions: function () {
            this._jsPlumb.cachedDimensions = null;
        },
        cleanup: function (force) {
            if (force) {
                if (this._jsPlumb.div != null) {
                    this._jsPlumb.div._jsPlumb = null;
                    this._jsPlumb.instance.removeElement(this._jsPlumb.div);
                }
            }
            else {
                // if not a forced cleanup, just detach child from parent for now.
                if (this._jsPlumb && this._jsPlumb.div && this._jsPlumb.div.parentNode)
                    this._jsPlumb.div.parentNode.removeChild(this._jsPlumb.div);
                this.detached = true;
            }

        },
        reattach:function(instance) {
            if (this._jsPlumb.div != null) instance.getContainer().appendChild(this._jsPlumb.div);
            this.detached = false;
        },
        computeMaxSize: function () {
            var td = _getDimensions(this);
            return Math.max(td[0], td[1]);
        },
        paint: function (p, containerExtents) {
            if (!this._jsPlumb.initialised) {
                this.getElement();
                p.component.appendDisplayElement(this._jsPlumb.div);
                this._jsPlumb.initialised = true;
                if (this.detached) this._jsPlumb.div.parentNode.removeChild(this._jsPlumb.div);
            }
            this._jsPlumb.div.style.left = (p.component.x + p.d.minx) + "px";
            this._jsPlumb.div.style.top = (p.component.y + p.d.miny) + "px";
        }
    });

    /*
     * Class: Overlays.Custom
     * A Custom overlay. You supply a 'create' function which returns some DOM element, and jsPlumb positions it.
     * The 'create' function is passed a Connection or Endpoint.
     */
    /*
     * Function: Constructor
     * 
     * Parameters:
     * 	create - function for jsPlumb to call that returns a DOM element.
     * 	location - distance (as a decimal from 0 to 1 inclusive) marking where the label should sit on the connector. defaults to 0.5.
     * 	id - optional id to use for later retrieval of this overlay.
     * 	
     */
    _jp.Overlays.Custom = function (params) {
        this.type = "Custom";
        AbstractDOMOverlay.apply(this, arguments);
    };
    _ju.extend(_jp.Overlays.Custom, AbstractDOMOverlay);

    _jp.Overlays.GuideLines = function () {
        var self = this;
        self.length = 50;
        self.lineWidth = 5;
        this.type = "GuideLines";
        AbstractOverlay.apply(this, arguments);
        _jp.jsPlumbUIComponent.apply(this, arguments);
        this.draw = function (connector, currentConnectionPaintStyle) {

            var head = connector.pointAlongPathFrom(self.loc, self.length / 2),
                mid = connector.pointOnPath(self.loc),
                tail = _jg.pointOnLine(head, mid, self.length),
                tailLine = _jg.perpendicularLineTo(head, tail, 40),
                headLine = _jg.perpendicularLineTo(tail, head, 20);

            return {
                connector: connector,
                head: head,
                tail: tail,
                headLine: headLine,
                tailLine: tailLine,
                minX: Math.min(head.x, tail.x, headLine[0].x, headLine[1].x),
                minY: Math.min(head.y, tail.y, headLine[0].y, headLine[1].y),
                maxX: Math.max(head.x, tail.x, headLine[0].x, headLine[1].x),
                maxY: Math.max(head.y, tail.y, headLine[0].y, headLine[1].y)
            };
        };

        // this.cleanup = function() { };  // nothing to clean up for GuideLines
    };

    /*
     * Class: Overlays.Label

     */
    /*
     * Function: Constructor
     * 
     * Parameters:
     * 	cssClass - optional css class string to append to css class. This string is appended "as-is", so you can of course have multiple classes
     *             defined.  This parameter is preferred to using labelStyle, borderWidth and borderStyle.
     * 	label - the label to paint.  May be a string or a function that returns a string.  Nothing will be painted if your label is null or your
     *         label function returns null.  empty strings _will_ be painted.
     * 	location - distance (as a decimal from 0 to 1 inclusive) marking where the label should sit on the connector. defaults to 0.5.
     * 	id - optional id to use for later retrieval of this overlay.
     * 
     * 	
     */
    _jp.Overlays.Label = function (params) {
        this.labelStyle = params.labelStyle;

        var labelWidth = null, labelHeight = null, labelText = null, labelPadding = null;
        this.cssClass = this.labelStyle != null ? this.labelStyle.cssClass : null;
        var p = _jp.extend({
            create: function () {
                return jsPlumb.createElement("div");
            }}, params);
        _jp.Overlays.Custom.call(this, p);
        this.type = "Label";
        this.label = params.label || "";
        this.labelText = null;
        if (this.labelStyle) {
            var el = this.getElement();
            this.labelStyle.font = this.labelStyle.font || "12px sans-serif";
            el.style.font = this.labelStyle.font;
            el.style.color = this.labelStyle.color || "black";
            if (this.labelStyle.fillStyle) el.style.background = this.labelStyle.fillStyle;
            if (this.labelStyle.borderWidth > 0) {
                var dStyle = this.labelStyle.borderStyle ? this.labelStyle.borderStyle : "black";
                el.style.border = this.labelStyle.borderWidth + "px solid " + dStyle;
            }
            if (this.labelStyle.padding) el.style.padding = this.labelStyle.padding;
        }

    };
    _ju.extend(_jp.Overlays.Label, _jp.Overlays.Custom, {
        cleanup: function (force) {
            if (force) {
                this.div = null;
                this.label = null;
                this.labelText = null;
                this.cssClass = null;
                this.labelStyle = null;
            }
        },
        getLabel: function () {
            return this.label;
        },
        /*
         * Function: setLabel
         * sets the label's, um, label.  you would think i'd call this function
         * 'setText', but you can pass either a Function or a String to this, so
         * it makes more sense as 'setLabel'. This uses innerHTML on the label div, so keep
         * that in mind if you need escaped HTML.
         */
        setLabel: function (l) {
            this.label = l;
            this.labelText = null;
            this.clearCachedDimensions();
            this.update();
            this.component.repaint();
        },
        getDimensions: function () {
            this.update();
            return AbstractDOMOverlay.prototype.getDimensions.apply(this, arguments);
        },
        update: function () {
            if (typeof this.label == "function") {
                var lt = this.label(this);
                this.getElement().innerHTML = lt.replace(/\r\n/g, "<br/>");
            }
            else {
                if (this.labelText == null) {
                    this.labelText = this.label;
                    this.getElement().innerHTML = this.labelText.replace(/\r\n/g, "<br/>");
                }
            }
        },
        updateFrom:function(d) {
            if(d.label) this.setLabel(d.label);
        }
    });

    // ********************************* END OF OVERLAY DEFINITIONS ***********************************************************************

}).call(this);

/*
 * jsPlumb
 *
 * Title:jsPlumb 2.0.2
 *
 * Provides a way to visually connect elements on an HTML page, using SVG.
 *
 * This file contains the base class for library adapters.
 *
 * Copyright (c) 2010 - 2015 jsPlumb (hello@jsplumbtoolkit.com)
 *
 * http://jsplumbtoolkit.com
 * http://github.com/sporritt/jsplumb
 *
 * Dual licensed under the MIT and GPL2 licenses.
 */
;(function() {
    "use strict";
    var root = this,
        _jp = root.jsPlumb;

    var _getEventManager = function(instance) {
        var e = instance._mottle;
        if (!e) {
            e = instance._mottle = new root.Mottle();
        }
        return e;
    };

    _jp.extend(root.jsPlumbInstance.prototype, {
        getEventManager:function() {
            return _getEventManager(this);
        },
        on : function(el, event, callback) {
            // TODO: here we would like to map the tap event if we know its
            // an internal bind to a click. we have to know its internal because only
            // then can we be sure that the UP event wont be consumed (tap is a synthesized
            // event from a mousedown followed by a mouseup).
            //event = { "click":"tap", "dblclick":"dbltap"}[event] || event;
            this.getEventManager().on.apply(this, arguments);
            return this;
        },
        off : function(el, event, callback) {
            this.getEventManager().off.apply(this, arguments);
            return this;
        }
    });


}).call(this);
/*
 * jsPlumb
 * 
 * Title:jsPlumb 2.0.2
 * 
 * Provides a way to visually connect elements on an HTML page, using SVG.
 * 
 * This file contains the 'flowchart' connectors, consisting of vertical and horizontal line segments.
 *
 * Copyright (c) 2010 - 2015 jsPlumb (hello@jsplumbtoolkit.com)
 * 
 * http://jsplumbtoolkit.com
 * http://github.com/sporritt/jsplumb
 * 
 * Dual licensed under the MIT and GPL2 licenses.
 */
;
(function () {

    "use strict";
    var root = this, _jp = root.jsPlumb, _ju = root.jsPlumbUtil;

    var Flowchart = function (params) {
        this.type = "Flowchart";
        params = params || {};
        params.stub = params.stub == null ? 30 : params.stub;
        var segments,
            _super = _jp.Connectors.AbstractConnector.apply(this, arguments),
            midpoint = params.midpoint == null ? 0.5 : params.midpoint,
            alwaysRespectStubs = params.alwaysRespectStubs === true,
            userSuppliedSegments = null,
            lastx = null, lasty = null, lastOrientation,
            cornerRadius = params.cornerRadius != null ? params.cornerRadius : 0,
            sgn = function (n) {
                return n < 0 ? -1 : n === 0 ? 0 : 1;
            },
            /**
             * helper method to add a segment.
             */
            addSegment = function (segments, x, y, paintInfo) {
                if (lastx == x && lasty == y) return;
                var lx = lastx == null ? paintInfo.sx : lastx,
                    ly = lasty == null ? paintInfo.sy : lasty,
                    o = lx == x ? "v" : "h",
                    sgnx = sgn(x - lx),
                    sgny = sgn(y - ly);

                lastx = x;
                lasty = y;
                segments.push([lx, ly, x, y, o, sgnx, sgny]);
            },
            segLength = function (s) {
                return Math.sqrt(Math.pow(s[0] - s[2], 2) + Math.pow(s[1] - s[3], 2));
            },
            _cloneArray = function (a) {
                var _a = [];
                _a.push.apply(_a, a);
                return _a;
            },
            writeSegments = function (conn, segments, paintInfo) {
                var current = null, next;
                for (var i = 0; i < segments.length - 1; i++) {

                    current = current || _cloneArray(segments[i]);
                    next = _cloneArray(segments[i + 1]);
                    if (cornerRadius > 0 && current[4] != next[4]) {
                        var radiusToUse = Math.min(cornerRadius, segLength(current), segLength(next));
                        // right angle. adjust current segment's end point, and next segment's start point.
                        current[2] -= current[5] * radiusToUse;
                        current[3] -= current[6] * radiusToUse;
                        next[0] += next[5] * radiusToUse;
                        next[1] += next[6] * radiusToUse;
                        var ac = (current[6] == next[5] && next[5] == 1) ||
                                ((current[6] == next[5] && next[5] === 0) && current[5] != next[6]) ||
                                (current[6] == next[5] && next[5] == -1),
                            sgny = next[1] > current[3] ? 1 : -1,
                            sgnx = next[0] > current[2] ? 1 : -1,
                            sgnEqual = sgny == sgnx,
                            cx = (sgnEqual && ac || (!sgnEqual && !ac)) ? next[0] : current[2],
                            cy = (sgnEqual && ac || (!sgnEqual && !ac)) ? current[3] : next[1];

                        _super.addSegment(conn, "Straight", {
                            x1: current[0], y1: current[1], x2: current[2], y2: current[3]
                        });

                        _super.addSegment(conn, "Arc", {
                            r: radiusToUse,
                            x1: current[2],
                            y1: current[3],
                            x2: next[0],
                            y2: next[1],
                            cx: cx,
                            cy: cy,
                            ac: ac
                        });
                    }
                    else {
                        // dx + dy are used to adjust for line width.
                        var dx = (current[2] == current[0]) ? 0 : (current[2] > current[0]) ? (paintInfo.lw / 2) : -(paintInfo.lw / 2),
                            dy = (current[3] == current[1]) ? 0 : (current[3] > current[1]) ? (paintInfo.lw / 2) : -(paintInfo.lw / 2);
                        _super.addSegment(conn, "Straight", {
                            x1: current[0] - dx, y1: current[1] - dy, x2: current[2] + dx, y2: current[3] + dy
                        });
                    }
                    current = next;
                }
                if (next != null) {
                    // last segment
                    _super.addSegment(conn, "Straight", {
                        x1: next[0], y1: next[1], x2: next[2], y2: next[3]
                    });
                }
            };

        this.setSegments = function (s) {
            userSuppliedSegments = s;
        };

        this.isEditable = function () {
            return true;
        };

        /*
         Function: getOriginalSegments
         Gets the segments before the addition of rounded corners. This is used by the flowchart
         connector editor, since it only wants to concern itself with the original segments.
         */
        this.getOriginalSegments = function () {
            return userSuppliedSegments || segments;
        };

        this._compute = function (paintInfo, params) {

            if (params.clearEdits)
                userSuppliedSegments = null;

            if (userSuppliedSegments != null) {
                writeSegments(this, userSuppliedSegments, paintInfo);
                return;
            }

            segments = [];
            lastx = null;
            lasty = null;
            lastOrientation = null;

            var midx = paintInfo.startStubX + ((paintInfo.endStubX - paintInfo.startStubX) * midpoint),
                midy = paintInfo.startStubY + ((paintInfo.endStubY - paintInfo.startStubY) * midpoint);

            var orientations = { x: [ 0, 1 ], y: [ 1, 0 ] },
                commonStubCalculator = function () {
                    return [ paintInfo.startStubX, paintInfo.startStubY, paintInfo.endStubX, paintInfo.endStubY ];
                },
                stubCalculators = {
                    perpendicular: commonStubCalculator,
                    orthogonal: commonStubCalculator,
                    opposite: function (axis) {
                        var pi = paintInfo,
                            idx = axis == "x" ? 0 : 1,
                            areInProximity = {
                                "x": function () {
                                    return ( (pi.so[idx] == 1 && (
                                        ( (pi.startStubX > pi.endStubX) && (pi.tx > pi.startStubX) ) ||
                                        ( (pi.sx > pi.endStubX) && (pi.tx > pi.sx))))) ||

                                        ( (pi.so[idx] == -1 && (
                                            ( (pi.startStubX < pi.endStubX) && (pi.tx < pi.startStubX) ) ||
                                            ( (pi.sx < pi.endStubX) && (pi.tx < pi.sx)))));
                                },
                                "y": function () {
                                    return ( (pi.so[idx] == 1 && (
                                        ( (pi.startStubY > pi.endStubY) && (pi.ty > pi.startStubY) ) ||
                                        ( (pi.sy > pi.endStubY) && (pi.ty > pi.sy))))) ||

                                        ( (pi.so[idx] == -1 && (
                                            ( (pi.startStubY < pi.endStubY) && (pi.ty < pi.startStubY) ) ||
                                            ( (pi.sy < pi.endStubY) && (pi.ty < pi.sy)))));
                                }
                            };

                        if (!alwaysRespectStubs && areInProximity[axis]()) {
                            return {
                                "x": [(paintInfo.sx + paintInfo.tx) / 2, paintInfo.startStubY, (paintInfo.sx + paintInfo.tx) / 2, paintInfo.endStubY],
                                "y": [paintInfo.startStubX, (paintInfo.sy + paintInfo.ty) / 2, paintInfo.endStubX, (paintInfo.sy + paintInfo.ty) / 2]
                            }[axis];
                        }
                        else {
                            return [ paintInfo.startStubX, paintInfo.startStubY, paintInfo.endStubX, paintInfo.endStubY ];
                        }
                    }
                },
                lineCalculators = {
                    perpendicular: function (axis) {
                        var pi = paintInfo,
                            sis = {
                                x: [
                                    [ [ 1, 2, 3, 4 ], null, [ 2, 1, 4, 3 ] ],
                                    null,
                                    [ [ 4, 3, 2, 1 ], null, [ 3, 4, 1, 2 ] ]
                                ],
                                y: [
                                    [ [ 3, 2, 1, 4 ], null, [ 2, 3, 4, 1 ] ],
                                    null,
                                    [ [ 4, 1, 2, 3 ], null, [ 1, 4, 3, 2 ] ]
                                ]
                            },
                            stubs = {
                                x: [ [ pi.startStubX, pi.endStubX ], null, [ pi.endStubX, pi.startStubX ] ],
                                y: [ [ pi.startStubY, pi.endStubY ], null, [ pi.endStubY, pi.startStubY ] ]
                            },
                            midLines = {
                                x: [ [ midx, pi.startStubY ], [ midx, pi.endStubY ] ],
                                y: [ [ pi.startStubX, midy ], [ pi.endStubX, midy ] ]
                            },
                            linesToEnd = {
                                x: [ [ pi.endStubX, pi.startStubY ] ],
                                y: [ [ pi.startStubX, pi.endStubY ] ]
                            },
                            startToEnd = {
                                x: [ [ pi.startStubX, pi.endStubY ], [ pi.endStubX, pi.endStubY ] ],
                                y: [ [ pi.endStubX, pi.startStubY ], [ pi.endStubX, pi.endStubY ] ]
                            },
                            startToMidToEnd = {
                                x: [ [ pi.startStubX, midy ], [ pi.endStubX, midy ], [ pi.endStubX, pi.endStubY ] ],
                                y: [ [ midx, pi.startStubY ], [ midx, pi.endStubY ], [ pi.endStubX, pi.endStubY ] ]
                            },
                            otherStubs = {
                                x: [ pi.startStubY, pi.endStubY ],
                                y: [ pi.startStubX, pi.endStubX ]
                            },
                            soIdx = orientations[axis][0], toIdx = orientations[axis][1],
                            _so = pi.so[soIdx] + 1,
                            _to = pi.to[toIdx] + 1,
                            otherFlipped = (pi.to[toIdx] == -1 && (otherStubs[axis][1] < otherStubs[axis][0])) || (pi.to[toIdx] == 1 && (otherStubs[axis][1] > otherStubs[axis][0])),
                            stub1 = stubs[axis][_so][0],
                            stub2 = stubs[axis][_so][1],
                            segmentIndexes = sis[axis][_so][_to];

                        if (pi.segment == segmentIndexes[3] || (pi.segment == segmentIndexes[2] && otherFlipped)) {
                            return midLines[axis];
                        }
                        else if (pi.segment == segmentIndexes[2] && stub2 < stub1) {
                            return linesToEnd[axis];
                        }
                        else if ((pi.segment == segmentIndexes[2] && stub2 >= stub1) || (pi.segment == segmentIndexes[1] && !otherFlipped)) {
                            return startToMidToEnd[axis];
                        }
                        else if (pi.segment == segmentIndexes[0] || (pi.segment == segmentIndexes[1] && otherFlipped)) {
                            return startToEnd[axis];
                        }
                    },
                    orthogonal: function (axis, startStub, otherStartStub, endStub, otherEndStub) {
                        var pi = paintInfo,
                            extent = {
                                "x": pi.so[0] == -1 ? Math.min(startStub, endStub) : Math.max(startStub, endStub),
                                "y": pi.so[1] == -1 ? Math.min(startStub, endStub) : Math.max(startStub, endStub)
                            }[axis];

                        return {
                            "x": [
                                [ extent, otherStartStub ],
                                [ extent, otherEndStub ],
                                [ endStub, otherEndStub ]
                            ],
                            "y": [
                                [ otherStartStub, extent ],
                                [ otherEndStub, extent ],
                                [ otherEndStub, endStub ]
                            ]
                        }[axis];
                    },
                    opposite: function (axis, ss, oss, es) {
                        var pi = paintInfo,
                            otherAxis = {"x": "y", "y": "x"}[axis],
                            dim = {"x": "height", "y": "width"}[axis],
                            comparator = pi["is" + axis.toUpperCase() + "GreaterThanStubTimes2"];

                        if (params.sourceEndpoint.elementId == params.targetEndpoint.elementId) {
                            var _val = oss + ((1 - params.sourceEndpoint.anchor[otherAxis]) * params.sourceInfo[dim]) + _super.maxStub;
                            return {
                                "x": [
                                    [ ss, _val ],
                                    [ es, _val ]
                                ],
                                "y": [
                                    [ _val, ss ],
                                    [ _val, es ]
                                ]
                            }[axis];

                        }
                        else if (!comparator || (pi.so[idx] == 1 && ss > es) || (pi.so[idx] == -1 && ss < es)) {
                            return {
                                "x": [
                                    [ ss, midy ],
                                    [ es, midy ]
                                ],
                                "y": [
                                    [ midx, ss ],
                                    [ midx, es ]
                                ]
                            }[axis];
                        }
                        else if ((pi.so[idx] == 1 && ss < es) || (pi.so[idx] == -1 && ss > es)) {
                            return {
                                "x": [
                                    [ midx, pi.sy ],
                                    [ midx, pi.ty ]
                                ],
                                "y": [
                                    [ pi.sx, midy ],
                                    [ pi.tx, midy ]
                                ]
                            }[axis];
                        }
                    }
                };

            var stubs = stubCalculators[paintInfo.anchorOrientation](paintInfo.sourceAxis),
                idx = paintInfo.sourceAxis == "x" ? 0 : 1,
                oidx = paintInfo.sourceAxis == "x" ? 1 : 0,
                ss = stubs[idx],
                oss = stubs[oidx],
                es = stubs[idx + 2],
                oes = stubs[oidx + 2];

            // add the start stub segment.
            addSegment(segments, stubs[0], stubs[1], paintInfo);

            // compute the rest of the line
            var p = lineCalculators[paintInfo.anchorOrientation](paintInfo.sourceAxis, ss, oss, es, oes);
            if (p) {
                for (var i = 0; i < p.length; i++) {
                    addSegment(segments, p[i][0], p[i][1], paintInfo);
                }
            }

            // line to end stub
            addSegment(segments, stubs[2], stubs[3], paintInfo);

            // end stub to end
            addSegment(segments, paintInfo.tx, paintInfo.ty, paintInfo);

            writeSegments(this, segments, paintInfo);
        };

        this.getPath = function () {
            var _last = null, _lastAxis = null, s = [], segs = userSuppliedSegments || segments;
            for (var i = 0; i < segs.length; i++) {
                var seg = segs[i], axis = seg[4], axisIndex = (axis == "v" ? 3 : 2);
                if (_last != null && _lastAxis === axis) {
                    _last[axisIndex] = seg[axisIndex];
                }
                else {
                    if (seg[0] != seg[2] || seg[1] != seg[3]) {
                        s.push({
                            start: [ seg[0], seg[1] ],
                            end: [ seg[2], seg[3] ]
                        });
                        _last = seg;
                        _lastAxis = seg[4];
                    }
                }
            }
            return s;
        };

        this.setPath = function (path) {
            userSuppliedSegments = [];
            for (var i = 0; i < path.length; i++) {
                var lx = path[i].start[0],
                    ly = path[i].start[1],
                    x = path[i].end[0],
                    y = path[i].end[1],
                    o = lx == x ? "v" : "h",
                    sgnx = sgn(x - lx),
                    sgny = sgn(y - ly);

                userSuppliedSegments.push([lx, ly, x, y, o, sgnx, sgny]);
            }
        };
    };

    _ju.extend(Flowchart, _jp.Connectors.AbstractConnector);
    _jp.registerConnectorType(Flowchart, "Flowchart");
}).call(this);
/*
 * jsPlumb
 * 
 * Title:jsPlumb 2.0.2
 * 
 * Provides a way to visually connect elements on an HTML page, using SVG.
 * 
 * This file contains the state machine connectors.
 *
 * Copyright (c) 2010 - 2015 jsPlumb (hello@jsplumbtoolkit.com)
 * 
 * http://jsplumbtoolkit.com
 * http://github.com/sporritt/jsplumb
 * 
 * Dual licensed under the MIT and GPL2 licenses.
 */
;
(function () {

    "use strict";
    var root = this, _jp = root.jsPlumb, _ju = root.jsPlumbUtil;

    var _segment = function (x1, y1, x2, y2) {
            if (x1 <= x2 && y2 <= y1) return 1;
            else if (x1 <= x2 && y1 <= y2) return 2;
            else if (x2 <= x1 && y2 >= y1) return 3;
            return 4;
        },

    // the control point we will use depends on the faces to which each end of the connection is assigned, specifically whether or not the
    // two faces are parallel or perpendicular.  if they are parallel then the control point lies on the midpoint of the axis in which they
    // are parellel and varies only in the other axis; this variation is proportional to the distance that the anchor points lie from the
    // center of that face.  if the two faces are perpendicular then the control point is at some distance from both the midpoints; the amount and
    // direction are dependent on the orientation of the two elements. 'seg', passed in to this method, tells you which segment the target element
    // lies in with respect to the source: 1 is top right, 2 is bottom right, 3 is bottom left, 4 is top left.
    //
    // sourcePos and targetPos are arrays of info about where on the source and target each anchor is located.  their contents are:
    //
    // 0 - absolute x
    // 1 - absolute y
    // 2 - proportional x in element (0 is left edge, 1 is right edge)
    // 3 - proportional y in element (0 is top edge, 1 is bottom edge)
    //
        _findControlPoint = function (midx, midy, segment, sourceEdge, targetEdge, dx, dy, distance, proximityLimit) {
            // TODO (maybe)
            // - if anchor pos is 0.5, make the control point take into account the relative position of the elements.
            if (distance <= proximityLimit) return [midx, midy];

            if (segment === 1) {
                if (sourceEdge[3] <= 0 && targetEdge[3] >= 1) return [ midx + (sourceEdge[2] < 0.5 ? -1 * dx : dx), midy ];
                else if (sourceEdge[2] >= 1 && targetEdge[2] <= 0) return [ midx, midy + (sourceEdge[3] < 0.5 ? -1 * dy : dy) ];
                else return [ midx + (-1 * dx) , midy + (-1 * dy) ];
            }
            else if (segment === 2) {
                if (sourceEdge[3] >= 1 && targetEdge[3] <= 0) return [ midx + (sourceEdge[2] < 0.5 ? -1 * dx : dx), midy ];
                else if (sourceEdge[2] >= 1 && targetEdge[2] <= 0) return [ midx, midy + (sourceEdge[3] < 0.5 ? -1 * dy : dy) ];
                else return [ midx + dx, midy + (-1 * dy) ];
            }
            else if (segment === 3) {
                if (sourceEdge[3] >= 1 && targetEdge[3] <= 0) return [ midx + (sourceEdge[2] < 0.5 ? -1 * dx : dx), midy ];
                else if (sourceEdge[2] <= 0 && targetEdge[2] >= 1) return [ midx, midy + (sourceEdge[3] < 0.5 ? -1 * dy : dy) ];
                else return [ midx + (-1 * dx) , midy + (-1 * dy) ];
            }
            else if (segment === 4) {
                if (sourceEdge[3] <= 0 && targetEdge[3] >= 1) return [ midx + (sourceEdge[2] < 0.5 ? -1 * dx : dx), midy ];
                else if (sourceEdge[2] <= 0 && targetEdge[2] >= 1) return [ midx, midy + (sourceEdge[3] < 0.5 ? -1 * dy : dy) ];
                else return [ midx + dx , midy + (-1 * dy) ];
            }

        };

    var StateMachine = function (params) {
        params = params || {};
        this.type = "StateMachine";

        var _super = _jp.Connectors.AbstractConnector.apply(this, arguments),
            curviness = params.curviness || 10,
            margin = params.margin || 5,
            proximityLimit = params.proximityLimit || 80,
            clockwise = params.orientation && params.orientation === "clockwise",
            loopbackRadius = params.loopbackRadius || 25,
            showLoopback = params.showLoopback !== false;

        this._compute = function (paintInfo, params) {
            var w = Math.abs(params.sourcePos[0] - params.targetPos[0]),
                h = Math.abs(params.sourcePos[1] - params.targetPos[1]);

            if (!showLoopback || (params.sourceEndpoint.elementId !== params.targetEndpoint.elementId)) {
                var _sx = params.sourcePos[0] < params.targetPos[0] ? 0 : w,
                    _sy = params.sourcePos[1] < params.targetPos[1] ? 0 : h,
                    _tx = params.sourcePos[0] < params.targetPos[0] ? w : 0,
                    _ty = params.sourcePos[1] < params.targetPos[1] ? h : 0;

                // now adjust for the margin
                if (params.sourcePos[2] === 0) _sx -= margin;
                if (params.sourcePos[2] === 1) _sx += margin;
                if (params.sourcePos[3] === 0) _sy -= margin;
                if (params.sourcePos[3] === 1) _sy += margin;
                if (params.targetPos[2] === 0) _tx -= margin;
                if (params.targetPos[2] === 1) _tx += margin;
                if (params.targetPos[3] === 0) _ty -= margin;
                if (params.targetPos[3] === 1) _ty += margin;

                //
                // these connectors are quadratic bezier curves, having a single control point. if both anchors
                // are located at 0.5 on their respective faces, the control point is set to the midpoint and you
                // get a straight line.  this is also the case if the two anchors are within 'proximityLimit', since
                // it seems to make good aesthetic sense to do that. outside of that, the control point is positioned
                // at 'curviness' pixels away along the normal to the straight line connecting the two anchors.
                //
                // there may be two improvements to this.  firstly, we might actually support the notion of avoiding nodes
                // in the UI, or at least making a good effort at doing so.  if a connection would pass underneath some node,
                // for example, we might increase the distance the control point is away from the midpoint in a bid to
                // steer it around that node.  this will work within limits, but i think those limits would also be the likely
                // limits for, once again, aesthetic good sense in the layout of a chart using these connectors.
                //
                // the second possible change is actually two possible changes: firstly, it is possible we should gradually
                // decrease the 'curviness' as the distance between the anchors decreases; start tailing it off to 0 at some
                // point (which should be configurable).  secondly, we might slightly increase the 'curviness' for connectors
                // with respect to how far their anchor is from the center of its respective face. this could either look cool,
                // or stupid, and may indeed work only in a way that is so subtle as to have been a waste of time.
                //

                var _midx = (_sx + _tx) / 2,
                    _midy = (_sy + _ty) / 2,
                    segment = _segment(_sx, _sy, _tx, _ty),
                    distance = Math.sqrt(Math.pow(_tx - _sx, 2) + Math.pow(_ty - _sy, 2)),
                    // calculate the control point.  this code will be where we'll put in a rudimentary element avoidance scheme; it
                    // will work by extending the control point to force the curve to be, um, curvier.
                    _controlPoint = _findControlPoint(_midx,
                        _midy,
                        segment,
                        params.sourcePos,
                        params.targetPos,
                        curviness, curviness,
                        distance,
                        proximityLimit);

                _super.addSegment(this, "Bezier", {
                    x1: _tx, y1: _ty, x2: _sx, y2: _sy,
                    cp1x: _controlPoint[0], cp1y: _controlPoint[1],
                    cp2x: _controlPoint[0], cp2y: _controlPoint[1]
                });
            }
            else {
                // a loopback connector.  draw an arc from one anchor to the other.
                var x1 = params.sourcePos[0], y1 = params.sourcePos[1] - margin,
                    cx = x1, cy = y1 - loopbackRadius,
                // canvas sizing stuff, to ensure the whole painted area is visible.
                    _w = 2 * loopbackRadius,
                    _h = 2 * loopbackRadius,
                    _x = cx - loopbackRadius,
                    _y = cy - loopbackRadius;

                paintInfo.points[0] = _x;
                paintInfo.points[1] = _y;
                paintInfo.points[2] = _w;
                paintInfo.points[3] = _h;

                // ADD AN ARC SEGMENT.
                _super.addSegment(this, "Arc", {
                    loopback: true,
                    x1: (x1 - _x) + 4,
                    y1: y1 - _y,
                    startAngle: 0,
                    endAngle: 2 * Math.PI,
                    r: loopbackRadius,
                    ac: !clockwise,
                    x2: (x1 - _x) - 4,
                    y2: y1 - _y,
                    cx: cx - _x,
                    cy: cy - _y
                });
            }
        };
    };
    _ju.extend(StateMachine, _jp.Connectors.AbstractConnector);
    _jp.registerConnectorType(StateMachine, "StateMachine");
}).call(this);
/*
 * jsPlumb
 * 
 * Title:jsPlumb 2.0.2
 * 
 * Provides a way to visually connect elements on an HTML page, using SVG.
 * 
 * This file contains the code for the Bezier connector type.
 *
 * Copyright (c) 2010 - 2015 jsPlumb (hello@jsplumbtoolkit.com)
 * 
 * http://jsplumbtoolkit.com
 * http://github.com/sporritt/jsplumb
 * 
 * Dual licensed under the MIT and GPL2 licenses.
 */
;
(function () {

    "use strict";
    var root = this, _jp = root.jsPlumb, _ju = root.jsPlumbUtil;

    var Bezier = function (params) {
        params = params || {};

        var _super = _jp.Connectors.AbstractConnector.apply(this, arguments),
            majorAnchor = params.curviness || 150,
            minorAnchor = 10;

        this.type = "Bezier";
        this.getCurviness = function () {
            return majorAnchor;
        };

        this._findControlPoint = function (point, sourceAnchorPosition, targetAnchorPosition, sourceEndpoint, targetEndpoint, soo, too) {
            // determine if the two anchors are perpendicular to each other in their orientation.  we swap the control
            // points around if so (code could be tightened up)
            var perpendicular = soo[0] != too[0] || soo[1] == too[1],
                p = [];

            if (!perpendicular) {
                if (soo[0] === 0) // X
                    p.push(sourceAnchorPosition[0] < targetAnchorPosition[0] ? point[0] + minorAnchor : point[0] - minorAnchor);
                else p.push(point[0] - (majorAnchor * soo[0]));

                if (soo[1] === 0) // Y
                    p.push(sourceAnchorPosition[1] < targetAnchorPosition[1] ? point[1] + minorAnchor : point[1] - minorAnchor);
                else p.push(point[1] + (majorAnchor * too[1]));
            }
            else {
                if (too[0] === 0) // X
                    p.push(targetAnchorPosition[0] < sourceAnchorPosition[0] ? point[0] + minorAnchor : point[0] - minorAnchor);
                else p.push(point[0] + (majorAnchor * too[0]));

                if (too[1] === 0) // Y
                    p.push(targetAnchorPosition[1] < sourceAnchorPosition[1] ? point[1] + minorAnchor : point[1] - minorAnchor);
                else p.push(point[1] + (majorAnchor * soo[1]));
            }

            return p;
        };

        this._compute = function (paintInfo, p) {
            var sp = p.sourcePos,
                tp = p.targetPos,
                _w = Math.abs(sp[0] - tp[0]),
                _h = Math.abs(sp[1] - tp[1]),
                _sx = sp[0] < tp[0] ? _w : 0,
                _sy = sp[1] < tp[1] ? _h : 0,
                _tx = sp[0] < tp[0] ? 0 : _w,
                _ty = sp[1] < tp[1] ? 0 : _h,
                _CP = this._findControlPoint([_sx, _sy], sp, tp, p.sourceEndpoint, p.targetEndpoint, paintInfo.so, paintInfo.to),
                _CP2 = this._findControlPoint([_tx, _ty], tp, sp, p.targetEndpoint, p.sourceEndpoint, paintInfo.to, paintInfo.so);

            _super.addSegment(this, "Bezier", {
                x1: _sx, y1: _sy, x2: _tx, y2: _ty,
                cp1x: _CP[0], cp1y: _CP[1], cp2x: _CP2[0], cp2y: _CP2[1]
            });
        };
    };

    _ju.extend(Bezier, _jp.Connectors.AbstractConnector);
    _jp.registerConnectorType(Bezier, "Bezier");

}).call(this);
/*
 * jsPlumb
 * 
 * Title:jsPlumb 2.0.2
 * 
 * Provides a way to visually connect elements on an HTML page, using SVG.
 * 
 * This file contains the SVG renderers.
 *
 * Copyright (c) 2010 - 2015 jsPlumb (hello@jsplumbtoolkit.com)
 * 
 * http://jsplumbtoolkit.com
 * http://github.com/sporritt/jsplumb
 * 
 * Dual licensed under the MIT and GPL2 licenses.
 */
;
(function () {

// ************************** SVG utility methods ********************************************	

    "use strict";
    var root = this, _jp = root.jsPlumb, _ju = root.jsPlumbUtil;

    var svgAttributeMap = {
            "stroke-linejoin": "stroke-linejoin",
            "stroke-dashoffset": "stroke-dashoffset",
            "stroke-linecap": "stroke-linecap"
        },
        STROKE_DASHARRAY = "stroke-dasharray",
        DASHSTYLE = "dashstyle",
        LINEAR_GRADIENT = "linearGradient",
        RADIAL_GRADIENT = "radialGradient",
        DEFS = "defs",
        FILL = "fill",
        STOP = "stop",
        STROKE = "stroke",
        STROKE_WIDTH = "stroke-width",
        STYLE = "style",
        NONE = "none",
        JSPLUMB_GRADIENT = "jsplumb_gradient_",
        LINE_WIDTH = "lineWidth",
        ns = {
            svg: "http://www.w3.org/2000/svg",
            xhtml: "http://www.w3.org/1999/xhtml"
        },
        _attr = function (node, attributes) {
            for (var i in attributes)
                node.setAttribute(i, "" + attributes[i]);
        },
        _node = function (name, attributes) {
            attributes = attributes || {};
            attributes.version = "1.1";
            attributes.xmlns = ns.xhtml;
            return jsPlumb.createElementNS(ns.svg, name, null, null, attributes);
        },
        _pos = function (d) {
            return "position:absolute;left:" + d[0] + "px;top:" + d[1] + "px";
        },
        _clearGradient = function (parent) {
            var els = parent.querySelectorAll(" defs,linearGradient,radialGradient");
            for (var i = 0; i < els.length; i++)
                els[i].parentNode.removeChild(els[i]);
        },
        _updateGradient = function (parent, node, style, dimensions, uiComponent) {
            var id = JSPLUMB_GRADIENT + uiComponent._jsPlumb.instance.idstamp();
            // first clear out any existing gradient
            _clearGradient(parent);
            // this checks for an 'offset' property in the gradient, and in the absence of it, assumes
            // we want a linear gradient. if it's there, we create a radial gradient.
            // it is possible that a more explicit means of defining the gradient type would be
            // better. relying on 'offset' means that we can never have a radial gradient that uses
            // some default offset, for instance.
            // issue 244 suggested the 'gradientUnits' attribute; without this, straight/flowchart connectors with gradients would
            // not show gradients when the line was perfectly horizontal or vertical.
            var g;
            if (!style.gradient.offset)
                g = _node(LINEAR_GRADIENT, {id: id, gradientUnits: "userSpaceOnUse"});
            else
                g = _node(RADIAL_GRADIENT, { id: id });

            var defs = _node(DEFS);
            parent.appendChild(defs);
            defs.appendChild(g);

            // the svg radial gradient seems to treat stops in the reverse
            // order to how canvas does it.  so we want to keep all the maths the same, but
            // iterate the actual style declarations in reverse order, if the x indexes are not in order.
            for (var i = 0; i < style.gradient.stops.length; i++) {
                var styleToUse = uiComponent.segment == 1 || uiComponent.segment == 2 ? i : style.gradient.stops.length - 1 - i,
                    //stopColor = _ju.convertStyle(style.gradient.stops[styleToUse][1], true),
                    stopColor = style.gradient.stops[styleToUse][1],
                    s = _node(STOP, {"offset": Math.floor(style.gradient.stops[i][0] * 100) + "%", "stop-color": stopColor});

                g.appendChild(s);
            }
            var applyGradientTo = style.strokeStyle ? STROKE : FILL;
            node.setAttribute(applyGradientTo, "url(#" + id + ")");
        },
        _applyStyles = function (parent, node, style, dimensions, uiComponent) {

            node.setAttribute(FILL, style.fillStyle ? style.fillStyle : NONE);
            node.setAttribute(STROKE, style.strokeStyle ? style.strokeStyle : NONE);

            if (style.gradient) {
                _updateGradient(parent, node, style, dimensions, uiComponent);
            }
            else {
                // make sure we clear any existing gradient
                _clearGradient(parent);
                node.setAttribute(STYLE, "");
            }

            if (style.lineWidth) {
                node.setAttribute(STROKE_WIDTH, style.lineWidth);
            }

            // in SVG there is a stroke-dasharray attribute we can set, and its syntax looks like
            // the syntax in VML but is actually kind of nasty: values are given in the pixel
            // coordinate space, whereas in VML they are multiples of the width of the stroked
            // line, which makes a lot more sense.  for that reason, jsPlumb is supporting both
            // the native svg 'stroke-dasharray' attribute, and also the 'dashstyle' concept from
            // VML, which will be the preferred method.  the code below this converts a dashstyle
            // attribute given in terms of stroke width into a pixel representation, by using the
            // stroke's lineWidth.
            if (style[DASHSTYLE] && style[LINE_WIDTH] && !style[STROKE_DASHARRAY]) {
                var sep = style[DASHSTYLE].indexOf(",") == -1 ? " " : ",",
                    parts = style[DASHSTYLE].split(sep),
                    styleToUse = "";
                parts.forEach(function (p) {
                    styleToUse += (Math.floor(p * style.lineWidth) + sep);
                });
                node.setAttribute(STROKE_DASHARRAY, styleToUse);
            }
            else if (style[STROKE_DASHARRAY]) {
                node.setAttribute(STROKE_DASHARRAY, style[STROKE_DASHARRAY]);
            }

            // extra attributes such as join type, dash offset.
            for (var i in svgAttributeMap) {
                if (style[i]) {
                    node.setAttribute(svgAttributeMap[i], style[i]);
                }
            }
        },
        _appendAtIndex = function (svg, path, idx) {
            if (svg.childNodes.length > idx) {
                svg.insertBefore(path, svg.childNodes[idx]);
            }
            else svg.appendChild(path);
        };

    /**
     utility methods for other objects to use.
     */
    _ju.svg = {
        node: _node,
        attr: _attr,
        pos: _pos
    };

    // ************************** / SVG utility methods ********************************************

    /*
     * Base class for SVG components.
     */
    var SvgComponent = function (params) {
        var pointerEventsSpec = params.pointerEventsSpec || "all", renderer = {};

        _jp.jsPlumbUIComponent.apply(this, params.originalArgs);
        this.canvas = null;
        this.path = null;
        this.svg = null;
        this.bgCanvas = null;

        var clazz = params.cssClass + " " + (params.originalArgs[0].cssClass || ""),
            svgParams = {
                "style": "",
                "width": 0,
                "height": 0,
                "pointer-events": pointerEventsSpec,
                "position": "absolute"
            };

        this.svg = _node("svg", svgParams);

        if (params.useDivWrapper) {
            this.canvas = jsPlumb.createElement("div", { position : "absolute" });
            _ju.sizeElement(this.canvas, 0, 0, 1, 1);
            this.canvas.className = clazz;
        }
        else {
            _attr(this.svg, { "class": clazz });
            this.canvas = this.svg;
        }

        params._jsPlumb.appendElement(this.canvas, params.originalArgs[0].parent);
        if (params.useDivWrapper) this.canvas.appendChild(this.svg);

        var displayElements = [ this.canvas ];
        this.getDisplayElements = function () {
            return displayElements;
        };

        this.appendDisplayElement = function (el) {
            displayElements.push(el);
        };

        this.paint = function (style, anchor, extents) {
            if (style != null) {

                var xy = [ this.x, this.y ], wh = [ this.w, this.h ], p;
                if (extents != null) {
                    if (extents.xmin < 0) xy[0] += extents.xmin;
                    if (extents.ymin < 0) xy[1] += extents.ymin;
                    wh[0] = extents.xmax + ((extents.xmin < 0) ? -extents.xmin : 0);
                    wh[1] = extents.ymax + ((extents.ymin < 0) ? -extents.ymin : 0);
                }

                if (params.useDivWrapper) {
                    _ju.sizeElement(this.canvas, xy[0], xy[1], wh[0], wh[1]);
                    xy[0] = 0;
                    xy[1] = 0;
                    p = _pos([ 0, 0 ]);
                }
                else
                    p = _pos([ xy[0], xy[1] ]);

                renderer.paint.apply(this, arguments);

                _attr(this.svg, {
                    "style": p,
                    "width": wh[0] || 0,
                    "height": wh[1] || 0
                });
            }
        };

        return {
            renderer: renderer
        };
    };

    _ju.extend(SvgComponent, _jp.jsPlumbUIComponent, {
        cleanup: function (force) {
            if (force || this.typeId == null) {
                if (this.canvas) this.canvas._jsPlumb = null;
                if (this.svg) this.svg._jsPlumb = null;
                if (this.bgCanvas) this.bgCanvas._jsPlumb = null;

                if (this.canvas && this.canvas.parentNode)
                    this.canvas.parentNode.removeChild(this.canvas);
                if (this.bgCanvas && this.bgCanvas.parentNode)
                    this.canvas.parentNode.removeChild(this.canvas);

                this.svg = null;
                this.canvas = null;
                this.path = null;
                this.group = null;
            }
            else {
                // if not a forced cleanup, just detach from DOM for now.
                if (this.canvas && this.canvas.parentNode) this.canvas.parentNode.removeChild(this.canvas);
                if (this.bgCanvas && this.bgCanvas.parentNode) this.bgCanvas.parentNode.removeChild(this.bgCanvas);
            }
        },
        reattach:function(instance) {
            var c = instance.getContainer();
            if (this.canvas && this.canvas.parentNode == null) c.appendChild(this.canvas);
            if (this.bgCanvas && this.bgCanvas.parentNode == null) c.appendChild(this.bgCanvas);
        },
        setVisible: function (v) {
            if (this.canvas) {
                this.canvas.style.display = v ? "block" : "none";
            }
        }
    });

    /*
     * Base class for SVG connectors.
     */
    _jp.ConnectorRenderers.svg = function (params) {
        var self = this,
            _super = SvgComponent.apply(this, [
                {
                    cssClass: params._jsPlumb.connectorClass,
                    originalArgs: arguments,
                    pointerEventsSpec: "none",
                    _jsPlumb: params._jsPlumb
                }
            ]);

        _super.renderer.paint = function (style, anchor, extents) {

            var segments = self.getSegments(), p = "", offset = [0, 0];
            if (extents.xmin < 0) offset[0] = -extents.xmin;
            if (extents.ymin < 0) offset[1] = -extents.ymin;

            if (segments.length > 0) {

                // create path from segments.
                for (var i = 0; i < segments.length; i++) {
                    p += _jp.Segments.svg.SegmentRenderer.getPath(segments[i]);
                    p += " ";
                }

                var a = {
                        d: p,
                        transform: "translate(" + offset[0] + "," + offset[1] + ")",
                        "pointer-events": params["pointer-events"] || "visibleStroke"
                    },
                    outlineStyle = null,
                    d = [self.x, self.y, self.w, self.h];

                // outline style.  actually means drawing an svg object underneath the main one.
                if (style.outlineColor) {
                    var outlineWidth = style.outlineWidth || 1,
                        outlineStrokeWidth = style.lineWidth + (2 * outlineWidth);
                    outlineStyle = _jp.extend({}, style);
                    delete outlineStyle.gradient;
                    outlineStyle.strokeStyle = style.outlineColor;
                    outlineStyle.lineWidth = outlineStrokeWidth;

                    if (self.bgPath == null) {
                        self.bgPath = _node("path", a);
                        _jp.addClass(self.bgPath, _jp.connectorOutlineClass);
                        _appendAtIndex(self.svg, self.bgPath, 0);
                    }
                    else {
                        _attr(self.bgPath, a);
                    }

                    _applyStyles(self.svg, self.bgPath, outlineStyle, d, self);
                }

                if (self.path == null) {
                    self.path = _node("path", a);
                    _appendAtIndex(self.svg, self.path, style.outlineColor ? 1 : 0);
                }
                else {
                    _attr(self.path, a);
                }

                _applyStyles(self.svg, self.path, style, d, self);
            }
        };
    };
    _ju.extend(_jp.ConnectorRenderers.svg, SvgComponent);

// ******************************* svg segment renderer *****************************************************	

    _jp.Segments.svg = {
        SegmentRenderer: {
            getPath: function (segment) {
                return ({
                    "Straight": function () {
                        var d = segment.getCoordinates();
                        return "M " + d.x1 + " " + d.y1 + " L " + d.x2 + " " + d.y2;
                    },
                    "Bezier": function () {
                        var d = segment.params;
                        return "M " + d.x1 + " " + d.y1 +
                            " C " + d.cp1x + " " + d.cp1y + " " + d.cp2x + " " + d.cp2y + " " + d.x2 + " " + d.y2;
                    },
                    "Arc": function () {
                        var d = segment.params,
                            laf = segment.sweep > Math.PI ? 1 : 0,
                            sf = segment.anticlockwise ? 0 : 1;

                        return "M" + segment.x1 + " " + segment.y1 + " A " + segment.radius + " " + d.r + " 0 " + laf + "," + sf + " " + segment.x2 + " " + segment.y2;
                    }
                })[segment.type]();
            }
        }
    };

// ******************************* /svg segments *****************************************************

    /*
     * Base class for SVG endpoints.
     */
    var SvgEndpoint = _jp.SvgEndpoint = function (params) {
        var _super = SvgComponent.apply(this, [
            {
                cssClass: params._jsPlumb.endpointClass,
                originalArgs: arguments,
                pointerEventsSpec: "all",
                useDivWrapper: true,
                _jsPlumb: params._jsPlumb
            }
        ]);

        _super.renderer.paint = function (style) {
            var s = _jp.extend({}, style);
            if (s.outlineColor) {
                s.strokeWidth = s.outlineWidth;
                s.strokeStyle = s.outlineColor;
            }

            if (this.node == null) {
                this.node = this.makeNode(s);
                this.svg.appendChild(this.node);
            }
            else if (this.updateNode != null) {
                this.updateNode(this.node);
            }
            _applyStyles(this.svg, this.node, s, [ this.x, this.y, this.w, this.h ], this);
            _pos(this.node, [ this.x, this.y ]);
        }.bind(this);

    };
    _ju.extend(SvgEndpoint, SvgComponent);

    /*
     * SVG Dot Endpoint
     */
    _jp.Endpoints.svg.Dot = function () {
        _jp.Endpoints.Dot.apply(this, arguments);
        SvgEndpoint.apply(this, arguments);
        this.makeNode = function (style) {
            return _node("circle", {
                "cx": this.w / 2,
                "cy": this.h / 2,
                "r": this.radius
            });
        };
        this.updateNode = function (node) {
            _attr(node, {
                "cx": this.w / 2,
                "cy": this.h / 2,
                "r": this.radius
            });
        };
    };
    _ju.extend(_jp.Endpoints.svg.Dot, [_jp.Endpoints.Dot, SvgEndpoint]);

    /*
     * SVG Rectangle Endpoint
     */
    _jp.Endpoints.svg.Rectangle = function () {
        _jp.Endpoints.Rectangle.apply(this, arguments);
        SvgEndpoint.apply(this, arguments);
        this.makeNode = function (style) {
            return _node("rect", {
                "width": this.w,
                "height": this.h
            });
        };
        this.updateNode = function (node) {
            _attr(node, {
                "width": this.w,
                "height": this.h
            });
        };
    };
    _ju.extend(_jp.Endpoints.svg.Rectangle, [_jp.Endpoints.Rectangle, SvgEndpoint]);

    /*
     * SVG Image Endpoint is the default image endpoint.
     */
    _jp.Endpoints.svg.Image = _jp.Endpoints.Image;
    /*
     * Blank endpoint in svg renderer is the default Blank endpoint.
     */
    _jp.Endpoints.svg.Blank = _jp.Endpoints.Blank;
    /*
     * Label overlay in svg renderer is the default Label overlay.
     */
    _jp.Overlays.svg.Label = _jp.Overlays.Label;
    /*
     * Custom overlay in svg renderer is the default Custom overlay.
     */
    _jp.Overlays.svg.Custom = _jp.Overlays.Custom;

    var AbstractSvgArrowOverlay = function (superclass, originalArgs) {
        superclass.apply(this, originalArgs);
        _jp.jsPlumbUIComponent.apply(this, originalArgs);
        this.isAppendedAtTopLevel = false;
        var self = this;
        this.path = null;
        this.paint = function (params, containerExtents) {
            // only draws on connections, not endpoints.
            if (params.component.svg && containerExtents) {
                if (this.path == null) {
                    this.path = _node("path", {
                        "pointer-events": "all"
                    });
                    params.component.svg.appendChild(this.path);

                    this.canvas = params.component.svg; // for the sake of completeness; this behaves the same as other overlays
                }
                var clazz = originalArgs && (originalArgs.length == 1) ? (originalArgs[0].cssClass || "") : "",
                    offset = [0, 0];

                if (containerExtents.xmin < 0) offset[0] = -containerExtents.xmin;
                if (containerExtents.ymin < 0) offset[1] = -containerExtents.ymin;

                _attr(this.path, {
                    "d": makePath(params.d),
                    "class": clazz,
                    stroke: params.strokeStyle ? params.strokeStyle : null,
                    fill: params.fillStyle ? params.fillStyle : null,
                    transform: "translate(" + offset[0] + "," + offset[1] + ")"
                });
            }
        };
        var makePath = function (d) {
            return (isNaN(d.cxy.x) || isNaN(d.cxy.y)) ? "" : "M" + d.hxy.x + "," + d.hxy.y +
                " L" + d.tail[0].x + "," + d.tail[0].y +
                " L" + d.cxy.x + "," + d.cxy.y +
                " L" + d.tail[1].x + "," + d.tail[1].y +
                " L" + d.hxy.x + "," + d.hxy.y;
        };
        this.transfer = function(target) {
            if (target.canvas && this.path && this.path.parentNode) {
                this.path.parentNode.removeChild(this.path);
                target.canvas.appendChild(this.path);
            }
        };
    };
    _ju.extend(AbstractSvgArrowOverlay, [_jp.jsPlumbUIComponent, _jp.Overlays.AbstractOverlay], {
        cleanup: function (force) {
            if (this.path != null) {
                if (force)
                    this._jsPlumb.instance.removeElement(this.path);
                else
                    if (this.path.parentNode)
                        this.path.parentNode.removeChild(this.path);
            }
        },
        reattach:function(instance) {
            if (this.path && this.canvas && this.path.parentNode == null)
                this.canvas.appendChild(this.path);
        },
        setVisible: function (v) {
            if (this.path != null) (this.path.style.display = (v ? "block" : "none"));
        }
    });

    _jp.Overlays.svg.Arrow = function () {
        AbstractSvgArrowOverlay.apply(this, [_jp.Overlays.Arrow, arguments]);
    };
    _ju.extend(_jp.Overlays.svg.Arrow, [ _jp.Overlays.Arrow, AbstractSvgArrowOverlay ]);

    _jp.Overlays.svg.PlainArrow = function () {
        AbstractSvgArrowOverlay.apply(this, [_jp.Overlays.PlainArrow, arguments]);
    };
    _ju.extend(_jp.Overlays.svg.PlainArrow, [ _jp.Overlays.PlainArrow, AbstractSvgArrowOverlay ]);

    _jp.Overlays.svg.Diamond = function () {
        AbstractSvgArrowOverlay.apply(this, [_jp.Overlays.Diamond, arguments]);
    };
    _ju.extend(_jp.Overlays.svg.Diamond, [ _jp.Overlays.Diamond, AbstractSvgArrowOverlay ]);

    // a test
    _jp.Overlays.svg.GuideLines = function () {
        var path = null, self = this, p1_1, p1_2;
        _jp.Overlays.GuideLines.apply(this, arguments);
        this.paint = function (params, containerExtents) {
            if (path == null) {
                path = _node("path");
                params.connector.svg.appendChild(path);
                self.attachListeners(path, params.connector);
                self.attachListeners(path, self);

                p1_1 = _node("path");
                params.connector.svg.appendChild(p1_1);
                self.attachListeners(p1_1, params.connector);
                self.attachListeners(p1_1, self);

                p1_2 = _node("path");
                params.connector.svg.appendChild(p1_2);
                self.attachListeners(p1_2, params.connector);
                self.attachListeners(p1_2, self);
            }

            var offset = [0, 0];
            if (containerExtents.xmin < 0) offset[0] = -containerExtents.xmin;
            if (containerExtents.ymin < 0) offset[1] = -containerExtents.ymin;

            _attr(path, {
                "d": makePath(params.head, params.tail),
                stroke: "red",
                fill: null,
                transform: "translate(" + offset[0] + "," + offset[1] + ")"
            });

            _attr(p1_1, {
                "d": makePath(params.tailLine[0], params.tailLine[1]),
                stroke: "blue",
                fill: null,
                transform: "translate(" + offset[0] + "," + offset[1] + ")"
            });

            _attr(p1_2, {
                "d": makePath(params.headLine[0], params.headLine[1]),
                stroke: "green",
                fill: null,
                transform: "translate(" + offset[0] + "," + offset[1] + ")"
            });
        };

        var makePath = function (d1, d2) {
            return "M " + d1.x + "," + d1.y +
                " L" + d2.x + "," + d2.y;
        };
    };
    _ju.extend(_jp.Overlays.svg.GuideLines, _jp.Overlays.GuideLines);
}).call(this);

/*
 * jsPlumb
 * 
 * Title:jsPlumb 2.0.2
 * 
 * Provides a way to visually connect elements on an HTML page, using SVG.
 * 
 * This file contains the 'vanilla' adapter - having no external dependencies other than bundled libs.
 *
 * Copyright (c) 2010 - 2015 jsPlumb (hello@jsplumbtoolkit.com)
 * 
 * http://jsplumbtoolkit.com
 * http://github.com/sporritt/jsplumb
 * 
 * Dual licensed under the MIT and GPL2 licenses.
 */
;
(function () {

    "use strict";
    var root = this, _jp = root.jsPlumb, _ju = root.jsPlumbUtil,
        _jk = root.Katavorio, _jg = root.Biltong;

    var _getDragManager = function (instance, category) {

        category = category || "main";
        var key = "_katavorio_" + category;
        var k = instance[key],
            e = instance.getEventManager();

        if (!k) {
            k = new _jk({
                bind: e.on,
                unbind: e.off,
                getSize: jsPlumb.getSize,
                getPosition: function (el) {
                    // if this is a nested draggable then compute the offset against its own offsetParent, otherwise
                    // compute against the Container's origin. see also the getUIPosition method below.
                    var o = instance.getOffset(el, false, el._katavorioDrag ? el.offsetParent : null);
                    return [o.left, o.top];
                },
                setPosition: function (el, xy) {
                    el.style.left = xy[0] + "px";
                    el.style.top = xy[1] + "px";
                },
                addClass: jsPlumb.addClass,
                removeClass: jsPlumb.removeClass,
                intersects: _jg.intersects,
                indexOf: function(l, i) { return l.indexOf(i); },
                css: {
                    noSelect: instance.dragSelectClass,
                    droppable: "jsplumb-droppable",
                    draggable: "jsplumb-draggable",
                    drag: "jsplumb-drag",
                    selected: "jsplumb-drag-selected",
                    active: "jsplumb-drag-active",
                    hover: "jsplumb-drag-hover"
                }
            });
            instance[key] = k;
            instance.bind("zoom", k.setZoom);
        }
        return k;
    };

    var _animProps = function (o, p) {
        var _one = function (pName) {
            if (p[pName] != null) {
                if (_ju.isString(p[pName])) {
                    var m = p[pName].match(/-=/) ? -1 : 1,
                        v = p[pName].substring(2);
                    return o[pName] + (m * v);
                }
                else return p[pName];
            }
            else
                return o[pName];
        };
        return [ _one("left"), _one("top") ];
    };

    _jp.extend(root.jsPlumbInstance.prototype, {

        animationSupported:true,
        getElement: function (el) {
            if (el == null) return null;
            // here we pluck the first entry if el was a list of entries.
            // this is not my favourite thing to do, but previous versions of
            // jsplumb supported jquery selectors, and it is possible a selector
            // will be passed in here.
            el = typeof el === "string" ? el : el.length != null && el.enctype == null ? el[0] : el;
            return typeof el === "string" ? document.getElementById(el) : el;
        },
        removeElement: function (element) {
            _getDragManager(this).elementRemoved(element);
            this.getEventManager().remove(element);
        },
        //
        // this adapter supports a rudimentary animation function. no easing is supported.  only
        // left/top properties are supported. property delta args are expected to be in the form
        //
        // +=x.xxxx
        //
        // or
        //
        // -=x.xxxx
        //
        doAnimate: function (el, properties, options) {
            options = options || {};
            var o = this.getOffset(el),
                ap = _animProps(o, properties),
                ldist = ap[0] - o.left,
                tdist = ap[1] - o.top,
                d = options.duration || 250,
                step = 15, steps = d / step,
                linc = (step / d) * ldist,
                tinc = (step / d) * tdist,
                idx = 0,
                int = setInterval(function () {
                    jsPlumb.setPosition(el, {
                        left: o.left + (linc * (idx + 1)),
                        top: o.top + (tinc * (idx + 1))
                    });
                    if (options.step != null) options.step(idx, Math.ceil(steps));
                    idx++;
                    if (idx >= steps) {
                        window.clearInterval(int);
                        if (options.complete != null) options.complete();
                    }
                }, step);
        },
        // DRAG/DROP
        destroyDraggable: function (el, category) {
            _getDragManager(this, category).destroyDraggable(el);
        },
        destroyDroppable: function (el, category) {
            _getDragManager(this, category).destroyDroppable(el);
        },
        initDraggable: function (el, options, category) {
            _getDragManager(this, category).draggable(el, options);
        },
        initDroppable: function (el, options, category) {
            _getDragManager(this, category).droppable(el, options);
        },
        isAlreadyDraggable: function (el) {
            return el._katavorioDrag != null;
        },
        isDragSupported: function (el, options) {
            return true;
        },
        isDropSupported: function (el, options) {
            return true;
        },
        isElementDraggable: function (el) {
            el = jsPlumb.getElement(el);
            return el._katavorioDrag && el._katavorioDrag.isEnabled();
        },
        getDragObject: function (eventArgs) {
            return eventArgs[0].drag.getDragElement();
        },
        getDragScope: function (el) {
            return el._katavorioDrag && el._katavorioDrag.scopes.join(" ") || "";
        },
        getDropEvent: function (args) {
            return args[0].e;
        },
        getUIPosition: function (eventArgs, zoom) {
            // here the position reported to us by Katavorio is relative to the element's offsetParent. For top
            // level nodes that is fine, but if we have a nested draggable then its offsetParent is actually
            // not going to be the jsplumb container; it's going to be some child of that element. In that case
            // we want to adjust the UI position to account for the offsetParent's position relative to the Container
            // origin.
            var el = eventArgs[0].el;
            var p = { left:eventArgs[0].pos[0], top:eventArgs[0].pos[1] };
            if (el._katavorioDrag && el.offsetParent !== this.getContainer()) {
                var oc = this.getOffset(el.offsetParent);
                p.left += oc.left;
                p.top += oc.top;
            }
            return p;
        },
        setDragFilter: function (el, filter, _exclude) {
            if (el._katavorioDrag) {
                el._katavorioDrag.setFilter(filter, _exclude);
            }
        },
        setElementDraggable: function (el, draggable) {
            el = jsPlumb.getElement(el);
            if (el._katavorioDrag)
                el._katavorioDrag.setEnabled(draggable);
        },
        setDragScope: function (el, scope) {
            if (el._katavorioDrag)
                el._katavorioDrag.k.setDragScope(el, scope);
        },
        setDropScope:function(el, scope) {
            if (el._katavorioDrop && el._katavorioDrop.length > 0) {
                el._katavorioDrop[0].k.setDropScope(el, scope);
            }
        },
        addToPosse:function(el, spec) {
            var specs = Array.prototype.slice.call(arguments, 1);
            var dm = _getDragManager(this);
            jsPlumb.each(el, function(_el) {
                _el = [ jsPlumb.getElement(_el) ];
                _el.push.apply(_el, specs );
                dm.addToPosse.apply(dm, _el);
            });
        },
        removeFromPosse:function(el, posseId) {
            var specs = Array.prototype.slice.call(arguments, 1);
            var dm = _getDragManager(this);
            jsPlumb.each(el, function(_el) {
                _el = [ jsPlumb.getElement(_el) ];
                _el.push.apply(_el, specs );
                dm.removeFromPosse.apply(dm, _el);
            });
        },
        removeFromAllPosses:function(el) {
            var dm = _getDragManager(this);
            jsPlumb.each(el, function(_el) { dm.removeFromAllPosses(jsPlumb.getElement(_el)); });
        },
        dragEvents: {
            'start': 'start', 'stop': 'stop', 'drag': 'drag', 'step': 'step',
            'over': 'over', 'out': 'out', 'drop': 'drop', 'complete': 'complete',
            'beforeStart':'beforeStart'
        },
        animEvents: {
            'step': "step", 'complete': 'complete'
        },
        stopDrag: function (el) {
            if (el._katavorioDrag)
                el._katavorioDrag.abort();
        },
        addToDragSelection: function (spec) {
            _getDragManager(this).select(spec);
        },
        removeFromDragSelection: function (spec) {
            _getDragManager(this).deselect(spec);
        },
        clearDragSelection: function () {
            _getDragManager(this).deselectAll();
        },
        trigger: function (el, event, originalEvent, payload) {
            this.getEventManager().trigger(el, event, originalEvent, payload);
        },
        doReset:function() {
            // look for katavorio instances and reset each one if found.
            for (var key in this) {
                if (key.indexOf("_katavorio_") === 0) {
                    this[key].reset();
                }
            }
        }
    });

    var ready = function (f) {
        var _do = function () {
            if (/complete|loaded|interactive/.test(document.readyState) && typeof(document.body) != "undefined" && document.body != null)
                f();
            else
                setTimeout(_do, 9);
        };

        _do();
    };
    ready(_jp.init);

}).call(this);

(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';

    if (has(cache, path)) return cache[path].exports;
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex].exports;
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  var list = function() {
    var result = [];
    for (var item in modules) {
      if (has(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.list = list;
  globals.require.brunch = true;
})();
require.define({'phoenix': function(exports, require, module){ "use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

// Phoenix Channels JavaScript client
//
// ## Socket Connection
//
// A single connection is established to the server and
// channels are mulitplexed over the connection.
// Connect to the server using the `Socket` class:
//
//     let socket = new Socket("/ws")
//     socket.connect({userToken: "123"})
//
// The `Socket` constructor takes the mount point of the socket
// as well as options that can be found in the Socket docs,
// such as configuring the `LongPoll` transport, and heartbeat.
// Socket params can also be passed as an object literal to `connect`.
//
// ## Channels
//
// Channels are isolated, concurrent processes on the server that
// subscribe to topics and broker events between the client and server.
// To join a channel, you must provide the topic, and channel params for
// authorization. Here's an example chat room example where `"new_msg"`
// events are listened for, messages are pushed to the server, and
// the channel is joined with ok/error matches, and `after` hook:
//
//     let channel = socket.channel("rooms:123", {token: roomToken})
//     channel.on("new_msg", msg => console.log("Got message", msg) )
//     $input.onEnter( e => {
//       channel.push("new_msg", {body: e.target.val})
//        .receive("ok", (msg) => console.log("created message", msg) )
//        .receive("error", (reasons) => console.log("create failed", reasons) )
//        .after(10000, () => console.log("Networking issue. Still waiting...") )
//     })
//     channel.join()
//       .receive("ok", ({messages}) => console.log("catching up", messages) )
//       .receive("error", ({reason}) => console.log("failed join", reason) )
//       .after(10000, () => console.log("Networking issue. Still waiting...") )
//
//
// ## Joining
//
// Joining a channel with `channel.join(topic, params)`, binds the params to
// `channel.params`. Subsequent rejoins will send up the modified params for
// updating authorization params, or passing up last_message_id information.
// Successful joins receive an "ok" status, while unsuccessful joins
// receive "error".
//
//
// ## Pushing Messages
//
// From the previous example, we can see that pushing messages to the server
// can be done with `channel.push(eventName, payload)` and we can optionally
// receive responses from the push. Additionally, we can use
// `after(millsec, callback)` to abort waiting for our `receive` hooks and
// take action after some period of waiting.
//
//
// ## Socket Hooks
//
// Lifecycle events of the multiplexed connection can be hooked into via
// `socket.onError()` and `socket.onClose()` events, ie:
//
//     socket.onError( () => console.log("there was an error with the connection!") )
//     socket.onClose( () => console.log("the connection dropped") )
//
//
// ## Channel Hooks
//
// For each joined channel, you can bind to `onError` and `onClose` events
// to monitor the channel lifecycle, ie:
//
//     channel.onError( () => console.log("there was an error!") )
//     channel.onClose( () => console.log("the channel has gone away gracefully") )
//
// ### onError hooks
//
// `onError` hooks are invoked if the socket connection drops, or the channel
// crashes on the server. In either case, a channel rejoin is attemtped
// automatically in an exponential backoff manner.
//
// ### onClose hooks
//
// `onClose` hooks are invoked only in two cases. 1) the channel explicitly
// closed on the server, or 2). The client explicitly closed, by calling
// `channel.leave()`
//

var SOCKET_STATES = { connecting: 0, open: 1, closing: 2, closed: 3 };
var CHANNEL_STATES = {
  closed: "closed",
  errored: "errored",
  joined: "joined",
  joining: "joining" };
var CHANNEL_EVENTS = {
  close: "phx_close",
  error: "phx_error",
  join: "phx_join",
  reply: "phx_reply",
  leave: "phx_leave"
};
var TRANSPORTS = {
  longpoll: "longpoll",
  websocket: "websocket"
};

var Push = (function () {

  // Initializes the Push
  //
  // channel - The Channelnel
  // event - The event, for example `"phx_join"`
  // payload - The payload, for example `{user_id: 123}`
  //

  function Push(channel, event, payload) {
    _classCallCheck(this, Push);

    this.channel = channel;
    this.event = event;
    this.payload = payload || {};
    this.receivedResp = null;
    this.afterHook = null;
    this.recHooks = [];
    this.sent = false;
  }

  _prototypeProperties(Push, null, {
    send: {
      value: function send() {
        var _this = this;

        var ref = this.channel.socket.makeRef();
        this.refEvent = this.channel.replyEventName(ref);
        this.receivedResp = null;
        this.sent = false;

        this.channel.on(this.refEvent, function (payload) {
          _this.receivedResp = payload;
          _this.matchReceive(payload);
          _this.cancelRefEvent();
          _this.cancelAfter();
        });

        this.startAfter();
        this.sent = true;
        this.channel.socket.push({
          topic: this.channel.topic,
          event: this.event,
          payload: this.payload,
          ref: ref
        });
      },
      writable: true,
      configurable: true
    },
    receive: {
      value: function receive(status, callback) {
        if (this.receivedResp && this.receivedResp.status === status) {
          callback(this.receivedResp.response);
        }

        this.recHooks.push({ status: status, callback: callback });
        return this;
      },
      writable: true,
      configurable: true
    },
    after: {
      value: function after(ms, callback) {
        if (this.afterHook) {
          throw "only a single after hook can be applied to a push";
        }
        var timer = null;
        if (this.sent) {
          timer = setTimeout(callback, ms);
        }
        this.afterHook = { ms: ms, callback: callback, timer: timer };
        return this;
      },
      writable: true,
      configurable: true
    },
    matchReceive: {

      // private

      value: function matchReceive(_ref) {
        var status = _ref.status;
        var response = _ref.response;
        var ref = _ref.ref;

        this.recHooks.filter(function (h) {
          return h.status === status;
        }).forEach(function (h) {
          return h.callback(response);
        });
      },
      writable: true,
      configurable: true
    },
    cancelRefEvent: {
      value: function cancelRefEvent() {
        this.channel.off(this.refEvent);
      },
      writable: true,
      configurable: true
    },
    cancelAfter: {
      value: function cancelAfter() {
        if (!this.afterHook) {
          return;
        }
        clearTimeout(this.afterHook.timer);
        this.afterHook.timer = null;
      },
      writable: true,
      configurable: true
    },
    startAfter: {
      value: function startAfter() {
        var _this = this;

        if (!this.afterHook) {
          return;
        }
        var callback = function () {
          _this.cancelRefEvent();
          _this.afterHook.callback();
        };
        this.afterHook.timer = setTimeout(callback, this.afterHook.ms);
      },
      writable: true,
      configurable: true
    }
  });

  return Push;
})();

var Channel = exports.Channel = (function () {
  function Channel(topic, params, socket) {
    var _this = this;

    _classCallCheck(this, Channel);

    this.state = CHANNEL_STATES.closed;
    this.topic = topic;
    this.params = params || {};
    this.socket = socket;
    this.bindings = [];
    this.joinedOnce = false;
    this.joinPush = new Push(this, CHANNEL_EVENTS.join, this.params);
    this.pushBuffer = [];
    this.rejoinTimer = new Timer(function () {
      return _this.rejoinUntilConnected();
    }, this.socket.reconnectAfterMs);
    this.joinPush.receive("ok", function () {
      _this.state = CHANNEL_STATES.joined;
      _this.rejoinTimer.reset();
    });
    this.onClose(function () {
      _this.socket.log("channel", "close " + _this.topic);
      _this.state = CHANNEL_STATES.closed;
      _this.socket.remove(_this);
    });
    this.onError(function (reason) {
      _this.socket.log("channel", "error " + _this.topic, reason);
      _this.state = CHANNEL_STATES.errored;
      _this.rejoinTimer.setTimeout();
    });
    this.on(CHANNEL_EVENTS.reply, function (payload, ref) {
      _this.trigger(_this.replyEventName(ref), payload);
    });
  }

  _prototypeProperties(Channel, null, {
    rejoinUntilConnected: {
      value: function rejoinUntilConnected() {
        this.rejoinTimer.setTimeout();
        if (this.socket.isConnected()) {
          this.rejoin();
        }
      },
      writable: true,
      configurable: true
    },
    join: {
      value: function join() {
        if (this.joinedOnce) {
          throw "tried to join multiple times. 'join' can only be called a single time per channel instance";
        } else {
          this.joinedOnce = true;
        }
        this.sendJoin();
        return this.joinPush;
      },
      writable: true,
      configurable: true
    },
    onClose: {
      value: function onClose(callback) {
        this.on(CHANNEL_EVENTS.close, callback);
      },
      writable: true,
      configurable: true
    },
    onError: {
      value: function onError(callback) {
        this.on(CHANNEL_EVENTS.error, function (reason) {
          return callback(reason);
        });
      },
      writable: true,
      configurable: true
    },
    on: {
      value: function on(event, callback) {
        this.bindings.push({ event: event, callback: callback });
      },
      writable: true,
      configurable: true
    },
    off: {
      value: function off(event) {
        this.bindings = this.bindings.filter(function (bind) {
          return bind.event !== event;
        });
      },
      writable: true,
      configurable: true
    },
    canPush: {
      value: function canPush() {
        return this.socket.isConnected() && this.state === CHANNEL_STATES.joined;
      },
      writable: true,
      configurable: true
    },
    push: {
      value: function push(event, payload) {
        if (!this.joinedOnce) {
          throw "tried to push '" + event + "' to '" + this.topic + "' before joining. Use channel.join() before pushing events";
        }
        var pushEvent = new Push(this, event, payload);
        if (this.canPush()) {
          pushEvent.send();
        } else {
          this.pushBuffer.push(pushEvent);
        }

        return pushEvent;
      },
      writable: true,
      configurable: true
    },
    leave: {

      // Leaves the channel
      //
      // Unsubscribes from server events, and
      // instructs channel to terminate on server
      //
      // Triggers onClose() hooks
      //
      // To receive leave acknowledgements, use the a `receive`
      // hook to bind to the server ack, ie:
      //
      //     channel.leave().receive("ok", () => alert("left!") )
      //

      value: function leave() {
        var _this = this;

        return this.push(CHANNEL_EVENTS.leave).receive("ok", function () {
          _this.socket.log("channel", "leave " + _this.topic);
          _this.trigger(CHANNEL_EVENTS.close, "leave");
        });
      },
      writable: true,
      configurable: true
    },
    onMessage: {

      // Overridable message hook
      //
      // Receives all events for specialized message handling

      value: function onMessage(event, payload, ref) {},
      writable: true,
      configurable: true
    },
    isMember: {

      // private

      value: function isMember(topic) {
        return this.topic === topic;
      },
      writable: true,
      configurable: true
    },
    sendJoin: {
      value: function sendJoin() {
        this.state = CHANNEL_STATES.joining;
        this.joinPush.send();
      },
      writable: true,
      configurable: true
    },
    rejoin: {
      value: function rejoin() {
        this.sendJoin();
        this.pushBuffer.forEach(function (pushEvent) {
          return pushEvent.send();
        });
        this.pushBuffer = [];
      },
      writable: true,
      configurable: true
    },
    trigger: {
      value: function trigger(triggerEvent, payload, ref) {
        this.onMessage(triggerEvent, payload, ref);
        this.bindings.filter(function (bind) {
          return bind.event === triggerEvent;
        }).map(function (bind) {
          return bind.callback(payload, ref);
        });
      },
      writable: true,
      configurable: true
    },
    replyEventName: {
      value: function replyEventName(ref) {
        return "chan_reply_" + ref;
      },
      writable: true,
      configurable: true
    }
  });

  return Channel;
})();

var Socket = exports.Socket = (function () {

  // Initializes the Socket
  //
  // endPoint - The string WebSocket endpoint, ie, "ws://example.com/ws",
  //                                               "wss://example.com"
  //                                               "/ws" (inherited host & protocol)
  // opts - Optional configuration
  //   transport - The Websocket Transport, for example WebSocket or Phoenix.LongPoll.
  //               Defaults to WebSocket with automatic LongPoll fallback.
  //   heartbeatIntervalMs - The millisec interval to send a heartbeat message
  //   reconnectAfterMs - The optional function that returns the millsec
  //                      reconnect interval. Defaults to stepped backoff of:
  //
  //     function(tries){
  //       return [1000, 5000, 10000][tries - 1] || 10000
  //     }
  //
  //   logger - The optional function for specialized logging, ie:
  //     `logger: (kind, msg, data) => { console.log(`${kind}: ${msg}`, data) }
  //
  //   longpollerTimeout - The maximum timeout of a long poll AJAX request.
  //                        Defaults to 20s (double the server long poll timer).
  //
  // For IE8 support use an ES5-shim (https://github.com/es-shims/es5-shim)
  //

  function Socket(endPoint) {
    var _this = this;

    var opts = arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, Socket);

    this.stateChangeCallbacks = { open: [], close: [], error: [], message: [] };
    this.channels = [];
    this.sendBuffer = [];
    this.ref = 0;
    this.transport = opts.transport || window.WebSocket || LongPoll;
    this.heartbeatIntervalMs = opts.heartbeatIntervalMs || 30000;
    this.reconnectAfterMs = opts.reconnectAfterMs || function (tries) {
      return [1000, 5000, 10000][tries - 1] || 10000;
    };
    this.logger = opts.logger || function () {}; // noop
    this.longpollerTimeout = opts.longpollerTimeout || 20000;
    this.params = {};
    this.reconnectTimer = new Timer(function () {
      return _this.connect(_this.params);
    }, this.reconnectAfterMs);
    this.endPoint = "" + endPoint + "/" + TRANSPORTS.websocket;
  }

  _prototypeProperties(Socket, null, {
    protocol: {
      value: function protocol() {
        return location.protocol.match(/^https/) ? "wss" : "ws";
      },
      writable: true,
      configurable: true
    },
    endPointURL: {
      value: function endPointURL() {
        var uri = Ajax.appendParams(this.endPoint, this.params);
        if (uri.charAt(0) !== "/") {
          return uri;
        }
        if (uri.charAt(1) === "/") {
          return "" + this.protocol() + ":" + uri;
        }

        return "" + this.protocol() + "://" + location.host + "" + uri;
      },
      writable: true,
      configurable: true
    },
    disconnect: {
      value: function disconnect(callback, code, reason) {
        if (this.conn) {
          this.conn.onclose = function () {}; // noop
          if (code) {
            this.conn.close(code, reason || "");
          } else {
            this.conn.close();
          }
          this.conn = null;
        }
        callback && callback();
      },
      writable: true,
      configurable: true
    },
    connect: {

      // params - The params to send when connecting, for example `{user_id: userToken}`

      value: function connect() {
        var _this = this;

        var params = arguments[0] === undefined ? {} : arguments[0];
        this.params = params;
        this.disconnect(function () {
          _this.conn = new _this.transport(_this.endPointURL());
          _this.conn.timeout = _this.longpollerTimeout;
          _this.conn.onopen = function () {
            return _this.onConnOpen();
          };
          _this.conn.onerror = function (error) {
            return _this.onConnError(error);
          };
          _this.conn.onmessage = function (event) {
            return _this.onConnMessage(event);
          };
          _this.conn.onclose = function (event) {
            return _this.onConnClose(event);
          };
        });
      },
      writable: true,
      configurable: true
    },
    log: {

      // Logs the message. Override `this.logger` for specialized logging. noops by default

      value: function log(kind, msg, data) {
        this.logger(kind, msg, data);
      },
      writable: true,
      configurable: true
    },
    onOpen: {

      // Registers callbacks for connection state change events
      //
      // Examples
      //
      //    socket.onError(function(error){ alert("An error occurred") })
      //

      value: function onOpen(callback) {
        this.stateChangeCallbacks.open.push(callback);
      },
      writable: true,
      configurable: true
    },
    onClose: {
      value: function onClose(callback) {
        this.stateChangeCallbacks.close.push(callback);
      },
      writable: true,
      configurable: true
    },
    onError: {
      value: function onError(callback) {
        this.stateChangeCallbacks.error.push(callback);
      },
      writable: true,
      configurable: true
    },
    onMessage: {
      value: function onMessage(callback) {
        this.stateChangeCallbacks.message.push(callback);
      },
      writable: true,
      configurable: true
    },
    onConnOpen: {
      value: function onConnOpen() {
        var _this = this;

        this.log("transport", "connected to " + this.endPointURL(), this.transport.prototype);
        this.flushSendBuffer();
        this.reconnectTimer.reset();
        if (!this.conn.skipHeartbeat) {
          clearInterval(this.heartbeatTimer);
          this.heartbeatTimer = setInterval(function () {
            return _this.sendHeartbeat();
          }, this.heartbeatIntervalMs);
        }
        this.stateChangeCallbacks.open.forEach(function (callback) {
          return callback();
        });
      },
      writable: true,
      configurable: true
    },
    onConnClose: {
      value: function onConnClose(event) {
        this.log("transport", "close", event);
        this.triggerChanError();
        clearInterval(this.heartbeatTimer);
        this.reconnectTimer.setTimeout();
        this.stateChangeCallbacks.close.forEach(function (callback) {
          return callback(event);
        });
      },
      writable: true,
      configurable: true
    },
    onConnError: {
      value: function onConnError(error) {
        this.log("transport", error);
        this.triggerChanError();
        this.stateChangeCallbacks.error.forEach(function (callback) {
          return callback(error);
        });
      },
      writable: true,
      configurable: true
    },
    triggerChanError: {
      value: function triggerChanError() {
        this.channels.forEach(function (channel) {
          return channel.trigger(CHANNEL_EVENTS.error);
        });
      },
      writable: true,
      configurable: true
    },
    connectionState: {
      value: function connectionState() {
        switch (this.conn && this.conn.readyState) {
          case SOCKET_STATES.connecting:
            return "connecting";
          case SOCKET_STATES.open:
            return "open";
          case SOCKET_STATES.closing:
            return "closing";
          default:
            return "closed";
        }
      },
      writable: true,
      configurable: true
    },
    isConnected: {
      value: function isConnected() {
        return this.connectionState() === "open";
      },
      writable: true,
      configurable: true
    },
    remove: {
      value: function remove(channel) {
        this.channels = this.channels.filter(function (c) {
          return !c.isMember(channel.topic);
        });
      },
      writable: true,
      configurable: true
    },
    channel: {
      value: function channel(topic) {
        var chanParams = arguments[1] === undefined ? {} : arguments[1];

        var channel = new Channel(topic, chanParams, this);
        this.channels.push(channel);
        return channel;
      },
      writable: true,
      configurable: true
    },
    push: {
      value: function push(data) {
        var _this = this;

        var topic = data.topic;
        var event = data.event;
        var payload = data.payload;
        var ref = data.ref;

        var callback = function () {
          return _this.conn.send(JSON.stringify(data));
        };
        this.log("push", "" + topic + " " + event + " (" + ref + ")", payload);
        if (this.isConnected()) {
          callback();
        } else {
          this.sendBuffer.push(callback);
        }
      },
      writable: true,
      configurable: true
    },
    makeRef: {

      // Return the next message ref, accounting for overflows

      value: function makeRef() {
        var newRef = this.ref + 1;
        if (newRef === this.ref) {
          this.ref = 0;
        } else {
          this.ref = newRef;
        }

        return this.ref.toString();
      },
      writable: true,
      configurable: true
    },
    sendHeartbeat: {
      value: function sendHeartbeat() {
        this.push({ topic: "phoenix", event: "heartbeat", payload: {}, ref: this.makeRef() });
      },
      writable: true,
      configurable: true
    },
    flushSendBuffer: {
      value: function flushSendBuffer() {
        if (this.isConnected() && this.sendBuffer.length > 0) {
          this.sendBuffer.forEach(function (callback) {
            return callback();
          });
          this.sendBuffer = [];
        }
      },
      writable: true,
      configurable: true
    },
    onConnMessage: {
      value: function onConnMessage(rawMessage) {
        var msg = JSON.parse(rawMessage.data);
        var topic = msg.topic;
        var event = msg.event;
        var payload = msg.payload;
        var ref = msg.ref;

        this.log("receive", "" + (payload.status || "") + " " + topic + " " + event + " " + (ref && "(" + ref + ")" || ""), payload);
        this.channels.filter(function (channel) {
          return channel.isMember(topic);
        }).forEach(function (channel) {
          return channel.trigger(event, payload, ref);
        });
        this.stateChangeCallbacks.message.forEach(function (callback) {
          return callback(msg);
        });
      },
      writable: true,
      configurable: true
    }
  });

  return Socket;
})();

var LongPoll = exports.LongPoll = (function () {
  function LongPoll(endPoint) {
    _classCallCheck(this, LongPoll);

    this.endPoint = null;
    this.token = null;
    this.skipHeartbeat = true;
    this.onopen = function () {}; // noop
    this.onerror = function () {}; // noop
    this.onmessage = function () {}; // noop
    this.onclose = function () {}; // noop
    this.pollEndpoint = this.normalizeEndpoint(endPoint);
    this.readyState = SOCKET_STATES.connecting;

    this.poll();
  }

  _prototypeProperties(LongPoll, null, {
    normalizeEndpoint: {
      value: function normalizeEndpoint(endPoint) {
        return endPoint.replace("ws://", "http://").replace("wss://", "https://").replace(new RegExp("(.*)/" + TRANSPORTS.websocket), "$1/" + TRANSPORTS.longpoll);
      },
      writable: true,
      configurable: true
    },
    endpointURL: {
      value: function endpointURL() {
        return Ajax.appendParams(this.pollEndpoint, {
          token: this.token,
          format: "json"
        });
      },
      writable: true,
      configurable: true
    },
    closeAndRetry: {
      value: function closeAndRetry() {
        this.close();
        this.readyState = SOCKET_STATES.connecting;
      },
      writable: true,
      configurable: true
    },
    ontimeout: {
      value: function ontimeout() {
        this.onerror("timeout");
        this.closeAndRetry();
      },
      writable: true,
      configurable: true
    },
    poll: {
      value: function poll() {
        var _this = this;

        if (!(this.readyState === SOCKET_STATES.open || this.readyState === SOCKET_STATES.connecting)) {
          return;
        }

        Ajax.request("GET", this.endpointURL(), "application/json", null, this.timeout, this.ontimeout.bind(this), function (resp) {
          if (resp) {
            var status = resp.status;
            var token = resp.token;
            var messages = resp.messages;

            _this.token = token;
          } else {
            var status = 0;
          }

          switch (status) {
            case 200:
              messages.forEach(function (msg) {
                return _this.onmessage({ data: JSON.stringify(msg) });
              });
              _this.poll();
              break;
            case 204:
              _this.poll();
              break;
            case 410:
              _this.readyState = SOCKET_STATES.open;
              _this.onopen();
              _this.poll();
              break;
            case 0:
            case 500:
              _this.onerror();
              _this.closeAndRetry();
              break;
            default:
              throw "unhandled poll status " + status;
          }
        });
      },
      writable: true,
      configurable: true
    },
    send: {
      value: function send(body) {
        var _this = this;

        Ajax.request("POST", this.endpointURL(), "application/json", body, this.timeout, this.onerror.bind(this, "timeout"), function (resp) {
          if (!resp || resp.status !== 200) {
            _this.onerror(status);
            _this.closeAndRetry();
          }
        });
      },
      writable: true,
      configurable: true
    },
    close: {
      value: function close(code, reason) {
        this.readyState = SOCKET_STATES.closed;
        this.onclose();
      },
      writable: true,
      configurable: true
    }
  });

  return LongPoll;
})();

var Ajax = exports.Ajax = (function () {
  function Ajax() {
    _classCallCheck(this, Ajax);
  }

  _prototypeProperties(Ajax, {
    request: {
      value: function request(method, endPoint, accept, body, timeout, ontimeout, callback) {
        if (window.XDomainRequest) {
          var req = new XDomainRequest(); // IE8, IE9
          this.xdomainRequest(req, method, endPoint, body, timeout, ontimeout, callback);
        } else {
          var req = window.XMLHttpRequest ? new XMLHttpRequest() : // IE7+, Firefox, Chrome, Opera, Safari
          new ActiveXObject("Microsoft.XMLHTTP"); // IE6, IE5
          this.xhrRequest(req, method, endPoint, accept, body, timeout, ontimeout, callback);
        }
      },
      writable: true,
      configurable: true
    },
    xdomainRequest: {
      value: function xdomainRequest(req, method, endPoint, body, timeout, ontimeout, callback) {
        var _this = this;

        req.timeout = timeout;
        req.open(method, endPoint);
        req.onload = function () {
          var response = _this.parseJSON(req.responseText);
          callback && callback(response);
        };
        if (ontimeout) {
          req.ontimeout = ontimeout;
        }

        // Work around bug in IE9 that requires an attached onprogress handler
        req.onprogress = function () {};

        req.send(body);
      },
      writable: true,
      configurable: true
    },
    xhrRequest: {
      value: function xhrRequest(req, method, endPoint, accept, body, timeout, ontimeout, callback) {
        var _this = this;

        req.timeout = timeout;
        req.open(method, endPoint, true);
        req.setRequestHeader("Content-Type", accept);
        req.onerror = function () {
          callback && callback(null);
        };
        req.onreadystatechange = function () {
          if (req.readyState === _this.states.complete && callback) {
            var response = _this.parseJSON(req.responseText);
            callback(response);
          }
        };
        if (ontimeout) {
          req.ontimeout = ontimeout;
        }

        req.send(body);
      },
      writable: true,
      configurable: true
    },
    parseJSON: {
      value: function parseJSON(resp) {
        return resp && resp !== "" ? JSON.parse(resp) : null;
      },
      writable: true,
      configurable: true
    },
    serialize: {
      value: function serialize(obj, parentKey) {
        var queryStr = [];
        for (var key in obj) {
          if (!obj.hasOwnProperty(key)) {
            continue;
          }
          var paramKey = parentKey ? "" + parentKey + "[" + key + "]" : key;
          var paramVal = obj[key];
          if (typeof paramVal === "object") {
            queryStr.push(this.serialize(paramVal, paramKey));
          } else {
            queryStr.push(encodeURIComponent(paramKey) + "=" + encodeURIComponent(paramVal));
          }
        }
        return queryStr.join("&");
      },
      writable: true,
      configurable: true
    },
    appendParams: {
      value: function appendParams(url, params) {
        if (Object.keys(params).length === 0) {
          return url;
        }

        var prefix = url.match(/\?/) ? "&" : "?";
        return "" + url + "" + prefix + "" + this.serialize(params);
      },
      writable: true,
      configurable: true
    }
  });

  return Ajax;
})();

Ajax.states = { complete: 4 };

// Creates a timer that accepts a `timerCalc` function to perform
// calculated timeout retries, such as exponential backoff.
//
// ## Examples
//
//    let reconnectTimer = new Timer(() => this.connect(), function(tries){
//      return [1000, 5000, 10000][tries - 1] || 10000
//    })
//    reconnectTimer.setTimeout() // fires after 1000
//    reconnectTimer.setTimeout() // fires after 5000
//    reconnectTimer.reset()
//    reconnectTimer.setTimeout() // fires after 1000
//

var Timer = (function () {
  function Timer(callback, timerCalc) {
    _classCallCheck(this, Timer);

    this.callback = callback;
    this.timerCalc = timerCalc;
    this.timer = null;
    this.tries = 0;
  }

  _prototypeProperties(Timer, null, {
    reset: {
      value: function reset() {
        this.tries = 0;
        clearTimeout(this.timer);
      },
      writable: true,
      configurable: true
    },
    setTimeout: {

      // Cancels any previous setTimeout and schedules callback

      value: (function (_setTimeout) {
        var _setTimeoutWrapper = function setTimeout() {
          return _setTimeout.apply(this, arguments);
        };

        _setTimeoutWrapper.toString = function () {
          return _setTimeout.toString();
        };

        return _setTimeoutWrapper;
      })(function () {
        var _this = this;

        clearTimeout(this.timer);

        this.timer = setTimeout(function () {
          _this.tries = _this.tries + 1;
          _this.callback();
        }, this.timerCalc(this.tries + 1));
      }),
      writable: true,
      configurable: true
    }
  });

  return Timer;
})();

Object.defineProperty(exports, "__esModule", {
  value: true
});
 }});
if(typeof(window) === 'object' && !window.Phoenix){ window.Phoenix = require('phoenix') };
require.register("web/static/js/app", function(exports, require, module) {
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _phoenix = require("phoenix");

var Socket = _phoenix.Socket;
var LongPoller = _phoenix.LongPoller;

var App = (function () {
  function App() {
    _classCallCheck(this, App);
  }

  _createClass(App, null, {
    init: {
      value: function init() {
        var _this = this;

        var socket = new Phoenix.Socket("ws://" + location.host + "/socket");

        var username = this.randomUsername(20);
        var self = this;
        this.self = self;
        this.username = username;

        socket.connect({ user_id: username });
        var $username = $("#username");
        var $canvasBody = $("#canvas_body");
        var $clearModel = $("#clear_model");

        // set the generated username
        $username.val(username);
        this.username = $username;

        socket.onOpen(function (ev) {
          return console.log("OPEN", ev);
        });
        socket.onError(function (ev) {
          return console.log("ERROR", ev);
        });
        socket.onClose(function (e) {
          return console.log("CLOSE", e);
        });

        var chan = socket.channel("box_model:1", { user: username });
        chan.join().receive("ignore", function () {
          return console.log("auth error");
        }).receive("ok", function () {
          return console.log("join ok");
        }).after(10000, function () {
          return console.log("Connection interruption");
        });
        chan.onError(function (e) {
          return console.log("something went wrong", e);
        });
        chan.onClose(function (e) {
          return console.log("channel closed", e);
        });

        $canvasBody.dblclick(function (event) {
          var box = self.addBox($canvasBody, event.offsetY - 20, event.offsetX - 20, "mcBox" + self.randomUsername(15), chan);

          chan.push("box_model:update_create", self.buildCreateUpdate(box));
        });

        $clearModel.click(function (event) {
          $canvasBody.html("");
          divCount = 0;
        });

        chan.on("user:entered", function (msg) {
          var username = _this.sanitize(msg.user || "anonymous");
          console.log("User entered! " + username);
        });

        chan.on("box_model:sync_create", function (msg) {
          var username = _this.sanitize(msg.user || "anonymous");

          if (username != _this.getUsername()) {
            console.log("[" + username + "] created a box!");
            self.addBox($canvasBody, msg.top, msg.left, msg.box_id, chan);
          }
        });

        chan.on("box_model:sync_position", function (msg) {
          var username = _this.sanitize(msg.user || "anonymous");

          if (username != _this.getUsername()) {
            console.log("[" + username + "] updated a box!");

            var box = $("#" + msg.box_id);
            box.offset({ top: msg.top, left: msg.left });
          }
        });

        chan.on("box_model:sync_content", function (msg) {
          var username = _this.sanitize(msg.user || "anonymous");

          if (username != _this.getUsername()) {
            console.log("[" + username + "] updated a box!");

            var box = $("#" + msg.box_id);
            box.html(msg.content);
          }
        });
      }
    },
    addBox: {
      value: function addBox(parent, top, left, id, channel) {
        var box = "<div id=\"" + id + "\" style=\"top: " + top + "px; left: " + left + "px;\" class=\"mcBox\"  contenteditable=true></div>";
        parent.append(box);

        var elem = $("#" + id);
        var isClicked = false;
        var self = this;

        elem.draggable();

        elem.mousemove(function (event) {
          // Only move if this is the one being updated!
          if (isClicked) {
            channel.push("box_model:update_position", self.buildPositionUpdate(elem));
          }
        });

        elem.mousedown(function () {
          isClicked = true;
        });

        elem.mouseup(function () {
          isClicked = false;
          channel.push("box_model:update_position", self.buildPositionUpdate(elem));
        });

        elem.click(function (event) {
          event.stopPropagation();
          elem.focus();
        });

        elem.dblclick(function (event) {
          event.stopPropagation();
          event.preventDefault();
        });

        elem.keyup(function (event) {
          channel.push("box_model:update_content", self.buildContentUpdate(elem));
        });

        return elem;
      }
    },
    buildCreateUpdate: {
      value: function buildCreateUpdate(elem) {
        return {
          box_id: elem.attr("id"),
          user: this.getUsername(),
          top: elem.offset().top,
          left: elem.offset().left
        };
      }
    },
    buildContentUpdate: {
      value: function buildContentUpdate(elem) {
        return {
          box_id: elem.attr("id"),
          user: this.getUsername(),
          content: elem.html()
        };
      }
    },
    buildPositionUpdate: {
      value: function buildPositionUpdate(elem) {
        return {
          box_id: elem.attr("id"),
          user: this.getUsername(),
          top: elem.offset().top,
          left: elem.offset().left
        };
      }
    },
    getUsername: {
      value: function getUsername() {
        return this.username.val();
      }
    },
    randomUsername: {
      value: function randomUsername(count) {
        var letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVQXYZ0123456789";
        var name = "";

        while (count > 0) {
          var index = Math.round((letters.length - 1) * Math.random());
          name = name + letters[index];
          count--;
        }

        return name;
      }
    },
    sanitize: {
      value: function sanitize(html) {
        return $("<div/>").text(html).html();
      }
    },
    messageTemplate: {
      value: function messageTemplate(msg) {
        var username = this.sanitize(msg.user || "anonymous");
        var body = this.sanitize(msg.body);

        return "<p><a href='#'>[" + username + "]</a>&nbsp; " + body + "</p>";
      }
    }
  });

  return App;
})();

$(function () {
  return App.init();
});

module.exports = App;});

;require.register("web/static/js/jquery-ui.min", function(exports, require, module) {
"use strict";(function(e){"function" == typeof define && define.amd?define(["jquery"], e):e(jQuery);})(function(e){function t(t, s){var n, a, o, r=t.nodeName.toLowerCase();return "area" === r?(n = t.parentNode, a = n.name, t.href && a && "map" === n.nodeName.toLowerCase()?(o = e("img[usemap='#" + a + "']")[0], !!o && i(o)):!1):(/^(input|select|textarea|button|object)$/.test(r)?!t.disabled:"a" === r?t.href || s:s) && i(t);}function i(t){return e.expr.filters.visible(t) && !e(t).parents().addBack().filter(function(){return "hidden" === e.css(this, "visibility");}).length;}function s(e){for(var t, i; e.length && e[0] !== document;) {if((t = e.css("position"), ("absolute" === t || "relative" === t || "fixed" === t) && (i = parseInt(e.css("zIndex"), 10), !isNaN(i) && 0 !== i))){return i;}e = e.parent();}return 0;}function n(){this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = {closeText:"Done", prevText:"Prev", nextText:"Next", currentText:"Today", monthNames:["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], monthNamesShort:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], dayNames:["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], dayNamesShort:["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], dayNamesMin:["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], weekHeader:"Wk", dateFormat:"mm/dd/yy", firstDay:0, isRTL:!1, showMonthAfterYear:!1, yearSuffix:""}, this._defaults = {showOn:"focus", showAnim:"fadeIn", showOptions:{}, defaultDate:null, appendText:"", buttonText:"...", buttonImage:"", buttonImageOnly:!1, hideIfNoPrevNext:!1, navigationAsDateFormat:!1, gotoCurrent:!1, changeMonth:!1, changeYear:!1, yearRange:"c-10:c+10", showOtherMonths:!1, selectOtherMonths:!1, showWeek:!1, calculateWeek:this.iso8601Week, shortYearCutoff:"+10", minDate:null, maxDate:null, duration:"fast", beforeShowDay:null, beforeShow:null, onSelect:null, onChangeMonthYear:null, onClose:null, numberOfMonths:1, showCurrentAtPos:0, stepMonths:1, stepBigMonths:12, altField:"", altFormat:"", constrainInput:!0, showButtonPanel:!1, autoSize:!1, disabled:!1}, e.extend(this._defaults, this.regional[""]), this.regional.en = e.extend(!0, {}, this.regional[""]), this.regional["en-US"] = e.extend(!0, {}, this.regional.en), this.dpDiv = a(e("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"));}function a(t){var i="button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";return t.delegate(i, "mouseout", function(){e(this).removeClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && e(this).removeClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && e(this).removeClass("ui-datepicker-next-hover");}).delegate(i, "mouseover", o);}function o(){e.datepicker._isDisabledDatepicker(v.inline?v.dpDiv.parent()[0]:v.input[0]) || (e(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), e(this).addClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && e(this).addClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && e(this).addClass("ui-datepicker-next-hover"));}function r(t, i){e.extend(t, i);for(var s in i) null == i[s] && (t[s] = i[s]);return t;}function h(e){return function(){var t=this.element.val();e.apply(this, arguments), this._refresh(), t !== this.element.val() && this._trigger("change");};}e.ui = e.ui || {}, e.extend(e.ui, {version:"1.11.4", keyCode:{BACKSPACE:8, COMMA:188, DELETE:46, DOWN:40, END:35, ENTER:13, ESCAPE:27, HOME:36, LEFT:37, PAGE_DOWN:34, PAGE_UP:33, PERIOD:190, RIGHT:39, SPACE:32, TAB:9, UP:38}}), e.fn.extend({scrollParent:function scrollParent(t){var i=this.css("position"), s="absolute" === i, n=t?/(auto|scroll|hidden)/:/(auto|scroll)/, a=this.parents().filter(function(){var t=e(this);return s && "static" === t.css("position")?!1:n.test(t.css("overflow") + t.css("overflow-y") + t.css("overflow-x"));}).eq(0);return "fixed" !== i && a.length?a:e(this[0].ownerDocument || document);}, uniqueId:(function(){var e=0;return function(){return this.each(function(){this.id || (this.id = "ui-id-" + ++e);});};})(), removeUniqueId:function removeUniqueId(){return this.each(function(){/^ui-id-\d+$/.test(this.id) && e(this).removeAttr("id");});}}), e.extend(e.expr[":"], {data:e.expr.createPseudo?e.expr.createPseudo(function(t){return function(i){return !!e.data(i, t);};}):function(t, i, s){return !!e.data(t, s[3]);}, focusable:function focusable(i){return t(i, !isNaN(e.attr(i, "tabindex")));}, tabbable:function tabbable(i){var s=e.attr(i, "tabindex"), n=isNaN(s);return (n || s >= 0) && t(i, !n);}}), e("<a>").outerWidth(1).jquery || e.each(["Width", "Height"], function(t, i){function s(t, i, s, a){return (e.each(n, function(){i -= parseFloat(e.css(t, "padding" + this)) || 0, s && (i -= parseFloat(e.css(t, "border" + this + "Width")) || 0), a && (i -= parseFloat(e.css(t, "margin" + this)) || 0);}), i);}var n="Width" === i?["Left", "Right"]:["Top", "Bottom"], a=i.toLowerCase(), o={innerWidth:e.fn.innerWidth, innerHeight:e.fn.innerHeight, outerWidth:e.fn.outerWidth, outerHeight:e.fn.outerHeight};e.fn["inner" + i] = function(t){return void 0 === t?o["inner" + i].call(this):this.each(function(){e(this).css(a, s(this, t) + "px");});}, e.fn["outer" + i] = function(t, n){return "number" != typeof t?o["outer" + i].call(this, t):this.each(function(){e(this).css(a, s(this, t, !0, n) + "px");});};}), e.fn.addBack || (e.fn.addBack = function(e){return this.add(null == e?this.prevObject:this.prevObject.filter(e));}), e("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (e.fn.removeData = (function(t){return function(i){return arguments.length?t.call(this, e.camelCase(i)):t.call(this);};})(e.fn.removeData)), e.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), e.fn.extend({focus:(function(t){return function(i, s){return "number" == typeof i?this.each(function(){var t=this;setTimeout(function(){e(t).focus(), s && s.call(t);}, i);}):t.apply(this, arguments);};})(e.fn.focus), disableSelection:(function(){var e="onselectstart" in document.createElement("div")?"selectstart":"mousedown";return function(){return this.bind(e + ".ui-disableSelection", function(e){e.preventDefault();});};})(), enableSelection:function enableSelection(){return this.unbind(".ui-disableSelection");}, zIndex:function zIndex(t){if(void 0 !== t){return this.css("zIndex", t);}if(this.length)for(var i, s, n=e(this[0]); n.length && n[0] !== document;) {if((i = n.css("position"), ("absolute" === i || "relative" === i || "fixed" === i) && (s = parseInt(n.css("zIndex"), 10), !isNaN(s) && 0 !== s))){return s;}n = n.parent();}return 0;}}), e.ui.plugin = {add:function add(t, i, s){var n, a=e.ui[t].prototype;for(n in s) a.plugins[n] = a.plugins[n] || [], a.plugins[n].push([i, s[n]]);}, call:function call(e, t, i, s){var n, a=e.plugins[t];if(a && (s || e.element[0].parentNode && 11 !== e.element[0].parentNode.nodeType))for(n = 0; a.length > n; n++) e.options[a[n][0]] && a[n][1].apply(e.element, i);}};var l=0, u=Array.prototype.slice;e.cleanData = (function(t){return function(i){var s, n, a;for(a = 0; null != (n = i[a]); a++) try{s = e._data(n, "events"), s && s.remove && e(n).triggerHandler("remove");}catch(o) {}t(i);};})(e.cleanData), e.widget = function(t, i, s){var n, a, o, r, h={}, l=t.split(".")[0];return (t = t.split(".")[1], n = l + "-" + t, s || (s = i, i = e.Widget), e.expr[":"][n.toLowerCase()] = function(t){return !!e.data(t, n);}, e[l] = e[l] || {}, a = e[l][t], o = e[l][t] = function(e, t){return this._createWidget?(arguments.length && this._createWidget(e, t), void 0):new o(e, t);}, e.extend(o, a, {version:s.version, _proto:e.extend({}, s), _childConstructors:[]}), r = new i(), r.options = e.widget.extend({}, r.options), e.each(s, function(t, s){return e.isFunction(s)?(h[t] = (function(){var e=function e(){return i.prototype[t].apply(this, arguments);}, n=function n(e){return i.prototype[t].apply(this, e);};return function(){var t, i=this._super, a=this._superApply;return (this._super = e, this._superApply = n, t = s.apply(this, arguments), this._super = i, this._superApply = a, t);};})(), void 0):(h[t] = s, void 0);}), o.prototype = e.widget.extend(r, {widgetEventPrefix:a?r.widgetEventPrefix || t:t}, h, {constructor:o, namespace:l, widgetName:t, widgetFullName:n}), a?(e.each(a._childConstructors, function(t, i){var s=i.prototype;e.widget(s.namespace + "." + s.widgetName, o, i._proto);}), delete a._childConstructors):i._childConstructors.push(o), e.widget.bridge(t, o), o);}, e.widget.extend = function(t){for(var i, s, n=u.call(arguments, 1), a=0, o=n.length; o > a; a++) for(i in n[a]) s = n[a][i], n[a].hasOwnProperty(i) && void 0 !== s && (t[i] = e.isPlainObject(s)?e.isPlainObject(t[i])?e.widget.extend({}, t[i], s):e.widget.extend({}, s):s);return t;}, e.widget.bridge = function(t, i){var s=i.prototype.widgetFullName || t;e.fn[t] = function(n){var a="string" == typeof n, o=u.call(arguments, 1), r=this;return (a?this.each(function(){var i, a=e.data(this, s);return "instance" === n?(r = a, !1):a?e.isFunction(a[n]) && "_" !== n.charAt(0)?(i = a[n].apply(a, o), i !== a && void 0 !== i?(r = i && i.jquery?r.pushStack(i.get()):i, !1):void 0):e.error("no such method '" + n + "' for " + t + " widget instance"):e.error("cannot call methods on " + t + " prior to initialization; " + "attempted to call method '" + n + "'");}):(o.length && (n = e.widget.extend.apply(null, [n].concat(o))), this.each(function(){var t=e.data(this, s);t?(t.option(n || {}), t._init && t._init()):e.data(this, s, new i(n, this));})), r);};}, e.Widget = function(){}, e.Widget._childConstructors = [], e.Widget.prototype = {widgetName:"widget", widgetEventPrefix:"", defaultElement:"<div>", options:{disabled:!1, create:null}, _createWidget:function _createWidget(t, i){i = e(i || this.defaultElement || this)[0], this.element = e(i), this.uuid = l++, this.eventNamespace = "." + this.widgetName + this.uuid, this.bindings = e(), this.hoverable = e(), this.focusable = e(), i !== this && (e.data(i, this.widgetFullName, this), this._on(!0, this.element, {remove:function remove(e){e.target === i && this.destroy();}}), this.document = e(i.style?i.ownerDocument:i.document || i), this.window = e(this.document[0].defaultView || this.document[0].parentWindow)), this.options = e.widget.extend({}, this.options, this._getCreateOptions(), t), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init();}, _getCreateOptions:e.noop, _getCreateEventData:e.noop, _create:e.noop, _init:e.noop, destroy:function destroy(){this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus");}, _destroy:e.noop, widget:function widget(){return this.element;}, option:function option(t, i){var s, n, a, o=t;if(0 === arguments.length){return e.widget.extend({}, this.options);}if("string" == typeof t)if((o = {}, s = t.split("."), t = s.shift(), s.length)){for(n = o[t] = e.widget.extend({}, this.options[t]), a = 0; s.length - 1 > a; a++) n[s[a]] = n[s[a]] || {}, n = n[s[a]];if((t = s.pop(), 1 === arguments.length)){return void 0 === n[t]?null:n[t];}n[t] = i;}else {if(1 === arguments.length){return void 0 === this.options[t]?null:this.options[t];}o[t] = i;}return (this._setOptions(o), this);}, _setOptions:function _setOptions(e){var t;for(t in e) this._setOption(t, e[t]);return this;}, _setOption:function _setOption(e, t){return (this.options[e] = t, "disabled" === e && (this.widget().toggleClass(this.widgetFullName + "-disabled", !!t), t && (this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus"))), this);}, enable:function enable(){return this._setOptions({disabled:!1});}, disable:function disable(){return this._setOptions({disabled:!0});}, _on:function _on(t, i, s){var n, a=this;"boolean" != typeof t && (s = i, i = t, t = !1), s?(i = n = e(i), this.bindings = this.bindings.add(i)):(s = i, i = this.element, n = this.widget()), e.each(s, function(s, o){function r(){return t || a.options.disabled !== !0 && !e(this).hasClass("ui-state-disabled")?("string" == typeof o?a[o]:o).apply(a, arguments):void 0;}"string" != typeof o && (r.guid = o.guid = o.guid || r.guid || e.guid++);var h=s.match(/^([\w:-]*)\s*(.*)$/), l=h[1] + a.eventNamespace, u=h[2];u?n.delegate(u, l, r):i.bind(l, r);});}, _off:function _off(t, i){i = (i || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, t.unbind(i).undelegate(i), this.bindings = e(this.bindings.not(t).get()), this.focusable = e(this.focusable.not(t).get()), this.hoverable = e(this.hoverable.not(t).get());}, _delay:function _delay(e, t){function i(){return ("string" == typeof e?s[e]:e).apply(s, arguments);}var s=this;return setTimeout(i, t || 0);}, _hoverable:function _hoverable(t){this.hoverable = this.hoverable.add(t), this._on(t, {mouseenter:function mouseenter(t){e(t.currentTarget).addClass("ui-state-hover");}, mouseleave:function mouseleave(t){e(t.currentTarget).removeClass("ui-state-hover");}});}, _focusable:function _focusable(t){this.focusable = this.focusable.add(t), this._on(t, {focusin:function focusin(t){e(t.currentTarget).addClass("ui-state-focus");}, focusout:function focusout(t){e(t.currentTarget).removeClass("ui-state-focus");}});}, _trigger:function _trigger(t, i, s){var n, a, o=this.options[t];if((s = s || {}, i = e.Event(i), i.type = (t === this.widgetEventPrefix?t:this.widgetEventPrefix + t).toLowerCase(), i.target = this.element[0], a = i.originalEvent))for(n in a) n in i || (i[n] = a[n]);return (this.element.trigger(i, s), !(e.isFunction(o) && o.apply(this.element[0], [i].concat(s)) === !1 || i.isDefaultPrevented()));}}, e.each({show:"fadeIn", hide:"fadeOut"}, function(t, i){e.Widget.prototype["_" + t] = function(s, n, a){"string" == typeof n && (n = {effect:n});var o, r=n?n === !0 || "number" == typeof n?i:n.effect || i:t;n = n || {}, "number" == typeof n && (n = {duration:n}), o = !e.isEmptyObject(n), n.complete = a, n.delay && s.delay(n.delay), o && e.effects && e.effects.effect[r]?s[t](n):r !== t && s[r]?s[r](n.duration, n.easing, a):s.queue(function(i){e(this)[t](), a && a.call(s[0]), i();});};}), e.widget;var d=!1;e(document).mouseup(function(){d = !1;}), e.widget("ui.mouse", {version:"1.11.4", options:{cancel:"input,textarea,button,select,option", distance:1, delay:0}, _mouseInit:function _mouseInit(){var t=this;this.element.bind("mousedown." + this.widgetName, function(e){return t._mouseDown(e);}).bind("click." + this.widgetName, function(i){return !0 === e.data(i.target, t.widgetName + ".preventClickEvent")?(e.removeData(i.target, t.widgetName + ".preventClickEvent"), i.stopImmediatePropagation(), !1):void 0;}), this.started = !1;}, _mouseDestroy:function _mouseDestroy(){this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);}, _mouseDown:function _mouseDown(t){if(!d){this._mouseMoved = !1, this._mouseStarted && this._mouseUp(t), this._mouseDownEvent = t;var i=this, s=1 === t.which, n="string" == typeof this.options.cancel && t.target.nodeName?e(t.target).closest(this.options.cancel).length:!1;return s && !n && this._mouseCapture(t)?(this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function(){i.mouseDelayMet = !0;}, this.options.delay)), this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(t) !== !1, !this._mouseStarted)?(t.preventDefault(), !0):(!0 === e.data(t.target, this.widgetName + ".preventClickEvent") && e.removeData(t.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(e){return i._mouseMove(e);}, this._mouseUpDelegate = function(e){return i._mouseUp(e);}, this.document.bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), t.preventDefault(), d = !0, !0)):!0;}}, _mouseMove:function _mouseMove(t){if(this._mouseMoved){if(e.ui.ie && (!document.documentMode || 9 > document.documentMode) && !t.button){return this._mouseUp(t);}if(!t.which){return this._mouseUp(t);}}return ((t.which || t.button) && (this._mouseMoved = !0), this._mouseStarted?(this._mouseDrag(t), t.preventDefault()):(this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, t) !== !1, this._mouseStarted?this._mouseDrag(t):this._mouseUp(t)), !this._mouseStarted));}, _mouseUp:function _mouseUp(t){return (this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, t.target === this._mouseDownEvent.target && e.data(t.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(t)), d = !1, !1);}, _mouseDistanceMet:function _mouseDistanceMet(e){return Math.max(Math.abs(this._mouseDownEvent.pageX - e.pageX), Math.abs(this._mouseDownEvent.pageY - e.pageY)) >= this.options.distance;}, _mouseDelayMet:function _mouseDelayMet(){return this.mouseDelayMet;}, _mouseStart:function _mouseStart(){}, _mouseDrag:function _mouseDrag(){}, _mouseStop:function _mouseStop(){}, _mouseCapture:function _mouseCapture(){return !0;}}), (function(){function t(e, t, i){return [parseFloat(e[0]) * (p.test(e[0])?t / 100:1), parseFloat(e[1]) * (p.test(e[1])?i / 100:1)];}function i(t, i){return parseInt(e.css(t, i), 10) || 0;}function s(t){var i=t[0];return 9 === i.nodeType?{width:t.width(), height:t.height(), offset:{top:0, left:0}}:e.isWindow(i)?{width:t.width(), height:t.height(), offset:{top:t.scrollTop(), left:t.scrollLeft()}}:i.preventDefault?{width:0, height:0, offset:{top:i.pageY, left:i.pageX}}:{width:t.outerWidth(), height:t.outerHeight(), offset:t.offset()};}e.ui = e.ui || {};var n, a, o=Math.max, r=Math.abs, h=Math.round, l=/left|center|right/, u=/top|center|bottom/, d=/[\+\-]\d+(\.[\d]+)?%?/, c=/^\w+/, p=/%$/, f=e.fn.position;e.position = {scrollbarWidth:function scrollbarWidth(){if(void 0 !== n){return n;}var t, i, s=e("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"), a=s.children()[0];return (e("body").append(s), t = a.offsetWidth, s.css("overflow", "scroll"), i = a.offsetWidth, t === i && (i = s[0].clientWidth), s.remove(), n = t - i);}, getScrollInfo:function getScrollInfo(t){var i=t.isWindow || t.isDocument?"":t.element.css("overflow-x"), s=t.isWindow || t.isDocument?"":t.element.css("overflow-y"), n="scroll" === i || "auto" === i && t.width < t.element[0].scrollWidth, a="scroll" === s || "auto" === s && t.height < t.element[0].scrollHeight;return {width:a?e.position.scrollbarWidth():0, height:n?e.position.scrollbarWidth():0};}, getWithinInfo:function getWithinInfo(t){var i=e(t || window), s=e.isWindow(i[0]), n=!!i[0] && 9 === i[0].nodeType;return {element:i, isWindow:s, isDocument:n, offset:i.offset() || {left:0, top:0}, scrollLeft:i.scrollLeft(), scrollTop:i.scrollTop(), width:s || n?i.width():i.outerWidth(), height:s || n?i.height():i.outerHeight()};}}, e.fn.position = function(n){if(!n || !n.of)return f.apply(this, arguments);n = e.extend({}, n);var p, m, g, v, y, b, _=e(n.of), x=e.position.getWithinInfo(n.within), w=e.position.getScrollInfo(x), k=(n.collision || "flip").split(" "), T={};return (b = s(_), _[0].preventDefault && (n.at = "left top"), m = b.width, g = b.height, v = b.offset, y = e.extend({}, v), e.each(["my", "at"], function(){var e, t, i=(n[this] || "").split(" ");1 === i.length && (i = l.test(i[0])?i.concat(["center"]):u.test(i[0])?["center"].concat(i):["center", "center"]), i[0] = l.test(i[0])?i[0]:"center", i[1] = u.test(i[1])?i[1]:"center", e = d.exec(i[0]), t = d.exec(i[1]), T[this] = [e?e[0]:0, t?t[0]:0], n[this] = [c.exec(i[0])[0], c.exec(i[1])[0]];}), 1 === k.length && (k[1] = k[0]), "right" === n.at[0]?y.left += m:"center" === n.at[0] && (y.left += m / 2), "bottom" === n.at[1]?y.top += g:"center" === n.at[1] && (y.top += g / 2), p = t(T.at, m, g), y.left += p[0], y.top += p[1], this.each(function(){var s, l, u=e(this), d=u.outerWidth(), c=u.outerHeight(), f=i(this, "marginLeft"), b=i(this, "marginTop"), D=d + f + i(this, "marginRight") + w.width, S=c + b + i(this, "marginBottom") + w.height, M=e.extend({}, y), C=t(T.my, u.outerWidth(), u.outerHeight());"right" === n.my[0]?M.left -= d:"center" === n.my[0] && (M.left -= d / 2), "bottom" === n.my[1]?M.top -= c:"center" === n.my[1] && (M.top -= c / 2), M.left += C[0], M.top += C[1], a || (M.left = h(M.left), M.top = h(M.top)), s = {marginLeft:f, marginTop:b}, e.each(["left", "top"], function(t, i){e.ui.position[k[t]] && e.ui.position[k[t]][i](M, {targetWidth:m, targetHeight:g, elemWidth:d, elemHeight:c, collisionPosition:s, collisionWidth:D, collisionHeight:S, offset:[p[0] + C[0], p[1] + C[1]], my:n.my, at:n.at, within:x, elem:u});}), n.using && (l = function(e){var t=v.left - M.left, i=t + m - d, s=v.top - M.top, a=s + g - c, h={target:{element:_, left:v.left, top:v.top, width:m, height:g}, element:{element:u, left:M.left, top:M.top, width:d, height:c}, horizontal:0 > i?"left":t > 0?"right":"center", vertical:0 > a?"top":s > 0?"bottom":"middle"};d > m && m > r(t + i) && (h.horizontal = "center"), c > g && g > r(s + a) && (h.vertical = "middle"), h.important = o(r(t), r(i)) > o(r(s), r(a))?"horizontal":"vertical", n.using.call(this, e, h);}), u.offset(e.extend(M, {using:l}));}));}, e.ui.position = {fit:{left:function left(e, t){var i, s=t.within, n=s.isWindow?s.scrollLeft:s.offset.left, a=s.width, r=e.left - t.collisionPosition.marginLeft, h=n - r, l=r + t.collisionWidth - a - n;t.collisionWidth > a?h > 0 && 0 >= l?(i = e.left + h + t.collisionWidth - a - n, e.left += h - i):e.left = l > 0 && 0 >= h?n:h > l?n + a - t.collisionWidth:n:h > 0?e.left += h:l > 0?e.left -= l:e.left = o(e.left - r, e.left);}, top:function top(e, t){var i, s=t.within, n=s.isWindow?s.scrollTop:s.offset.top, a=t.within.height, r=e.top - t.collisionPosition.marginTop, h=n - r, l=r + t.collisionHeight - a - n;t.collisionHeight > a?h > 0 && 0 >= l?(i = e.top + h + t.collisionHeight - a - n, e.top += h - i):e.top = l > 0 && 0 >= h?n:h > l?n + a - t.collisionHeight:n:h > 0?e.top += h:l > 0?e.top -= l:e.top = o(e.top - r, e.top);}}, flip:{left:function left(e, t){var i, s, n=t.within, a=n.offset.left + n.scrollLeft, o=n.width, h=n.isWindow?n.scrollLeft:n.offset.left, l=e.left - t.collisionPosition.marginLeft, u=l - h, d=l + t.collisionWidth - o - h, c="left" === t.my[0]?-t.elemWidth:"right" === t.my[0]?t.elemWidth:0, p="left" === t.at[0]?t.targetWidth:"right" === t.at[0]?-t.targetWidth:0, f=-2 * t.offset[0];0 > u?(i = e.left + c + p + f + t.collisionWidth - o - a, (0 > i || r(u) > i) && (e.left += c + p + f)):d > 0 && (s = e.left - t.collisionPosition.marginLeft + c + p + f - h, (s > 0 || d > r(s)) && (e.left += c + p + f));}, top:function top(e, t){var i, s, n=t.within, a=n.offset.top + n.scrollTop, o=n.height, h=n.isWindow?n.scrollTop:n.offset.top, l=e.top - t.collisionPosition.marginTop, u=l - h, d=l + t.collisionHeight - o - h, c="top" === t.my[1], p=c?-t.elemHeight:"bottom" === t.my[1]?t.elemHeight:0, f="top" === t.at[1]?t.targetHeight:"bottom" === t.at[1]?-t.targetHeight:0, m=-2 * t.offset[1];0 > u?(s = e.top + p + f + m + t.collisionHeight - o - a, (0 > s || r(u) > s) && (e.top += p + f + m)):d > 0 && (i = e.top - t.collisionPosition.marginTop + p + f + m - h, (i > 0 || d > r(i)) && (e.top += p + f + m));}}, flipfit:{left:function left(){e.ui.position.flip.left.apply(this, arguments), e.ui.position.fit.left.apply(this, arguments);}, top:function top(){e.ui.position.flip.top.apply(this, arguments), e.ui.position.fit.top.apply(this, arguments);}}}, (function(){var t, i, s, n, o, r=document.getElementsByTagName("body")[0], h=document.createElement("div");t = document.createElement(r?"div":"body"), s = {visibility:"hidden", width:0, height:0, border:0, margin:0, background:"none"}, r && e.extend(s, {position:"absolute", left:"-1000px", top:"-1000px"});for(o in s) t.style[o] = s[o];t.appendChild(h), i = r || document.documentElement, i.insertBefore(t, i.firstChild), h.style.cssText = "position: absolute; left: 10.7432222px;", n = e(h).offset().left, a = n > 10 && 11 > n, t.innerHTML = "", i.removeChild(t);})();})(), e.ui.position, e.widget("ui.draggable", e.ui.mouse, {version:"1.11.4", widgetEventPrefix:"drag", options:{addClasses:!0, appendTo:"parent", axis:!1, connectToSortable:!1, containment:!1, cursor:"auto", cursorAt:!1, grid:!1, handle:!1, helper:"original", iframeFix:!1, opacity:!1, refreshPositions:!1, revert:!1, revertDuration:500, scope:"default", scroll:!0, scrollSensitivity:20, scrollSpeed:20, snap:!1, snapMode:"both", snapTolerance:20, stack:!1, zIndex:!1, drag:null, start:null, stop:null}, _create:function _create(){"original" === this.options.helper && this._setPositionRelative(), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._setHandleClassName(), this._mouseInit();}, _setOption:function _setOption(e, t){this._super(e, t), "handle" === e && (this._removeHandleClassName(), this._setHandleClassName());}, _destroy:function _destroy(){return (this.helper || this.element).is(".ui-draggable-dragging")?(this.destroyOnClear = !0, void 0):(this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._removeHandleClassName(), this._mouseDestroy(), void 0);}, _mouseCapture:function _mouseCapture(t){var i=this.options;return (this._blurActiveElement(t), this.helper || i.disabled || e(t.target).closest(".ui-resizable-handle").length > 0?!1:(this.handle = this._getHandle(t), this.handle?(this._blockFrames(i.iframeFix === !0?"iframe":i.iframeFix), !0):!1));}, _blockFrames:function _blockFrames(t){this.iframeBlocks = this.document.find(t).map(function(){var t=e(this);return e("<div>").css("position", "absolute").appendTo(t.parent()).outerWidth(t.outerWidth()).outerHeight(t.outerHeight()).offset(t.offset())[0];});}, _unblockFrames:function _unblockFrames(){this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks);}, _blurActiveElement:function _blurActiveElement(t){var i=this.document[0];if(this.handleElement.is(t.target))try{i.activeElement && "body" !== i.activeElement.nodeName.toLowerCase() && e(i.activeElement).blur();}catch(s) {}}, _mouseStart:function _mouseStart(t){var i=this.options;return (this.helper = this._createHelper(t), this.helper.addClass("ui-draggable-dragging"), this._cacheHelperProportions(), e.ui.ddmanager && (e.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(!0), this.offsetParent = this.helper.offsetParent(), this.hasFixedAncestor = this.helper.parents().filter(function(){return "fixed" === e(this).css("position");}).length > 0, this.positionAbs = this.element.offset(), this._refreshOffsets(t), this.originalPosition = this.position = this._generatePosition(t, !1), this.originalPageX = t.pageX, this.originalPageY = t.pageY, i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt), this._setContainment(), this._trigger("start", t) === !1?(this._clear(), !1):(this._cacheHelperProportions(), e.ui.ddmanager && !i.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t), this._normalizeRightBottom(), this._mouseDrag(t, !0), e.ui.ddmanager && e.ui.ddmanager.dragStart(this, t), !0));}, _refreshOffsets:function _refreshOffsets(e){this.offset = {top:this.positionAbs.top - this.margins.top, left:this.positionAbs.left - this.margins.left, scroll:!1, parent:this._getParentOffset(), relative:this._getRelativeOffset()}, this.offset.click = {left:e.pageX - this.offset.left, top:e.pageY - this.offset.top};}, _mouseDrag:function _mouseDrag(t, i){if((this.hasFixedAncestor && (this.offset.parent = this._getParentOffset()), this.position = this._generatePosition(t, !0), this.positionAbs = this._convertPositionTo("absolute"), !i)){var s=this._uiHash();if(this._trigger("drag", t, s) === !1){return (this._mouseUp({}), !1);}this.position = s.position;}return (this.helper[0].style.left = this.position.left + "px", this.helper[0].style.top = this.position.top + "px", e.ui.ddmanager && e.ui.ddmanager.drag(this, t), !1);}, _mouseStop:function _mouseStop(t){var i=this, s=!1;return (e.ui.ddmanager && !this.options.dropBehaviour && (s = e.ui.ddmanager.drop(this, t)), this.dropped && (s = this.dropped, this.dropped = !1), "invalid" === this.options.revert && !s || "valid" === this.options.revert && s || this.options.revert === !0 || e.isFunction(this.options.revert) && this.options.revert.call(this.element, s)?e(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function(){i._trigger("stop", t) !== !1 && i._clear();}):this._trigger("stop", t) !== !1 && this._clear(), !1);}, _mouseUp:function _mouseUp(t){return (this._unblockFrames(), e.ui.ddmanager && e.ui.ddmanager.dragStop(this, t), this.handleElement.is(t.target) && this.element.focus(), e.ui.mouse.prototype._mouseUp.call(this, t));}, cancel:function cancel(){return (this.helper.is(".ui-draggable-dragging")?this._mouseUp({}):this._clear(), this);}, _getHandle:function _getHandle(t){return this.options.handle?!!e(t.target).closest(this.element.find(this.options.handle)).length:!0;}, _setHandleClassName:function _setHandleClassName(){this.handleElement = this.options.handle?this.element.find(this.options.handle):this.element, this.handleElement.addClass("ui-draggable-handle");}, _removeHandleClassName:function _removeHandleClassName(){this.handleElement.removeClass("ui-draggable-handle");}, _createHelper:function _createHelper(t){var i=this.options, s=e.isFunction(i.helper), n=s?e(i.helper.apply(this.element[0], [t])):"clone" === i.helper?this.element.clone().removeAttr("id"):this.element;return (n.parents("body").length || n.appendTo("parent" === i.appendTo?this.element[0].parentNode:i.appendTo), s && n[0] === this.element[0] && this._setPositionRelative(), n[0] === this.element[0] || /(fixed|absolute)/.test(n.css("position")) || n.css("position", "absolute"), n);}, _setPositionRelative:function _setPositionRelative(){/^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative");}, _adjustOffsetFromHelper:function _adjustOffsetFromHelper(t){"string" == typeof t && (t = t.split(" ")), e.isArray(t) && (t = {left:+t[0], top:+t[1] || 0}), "left" in t && (this.offset.click.left = t.left + this.margins.left), "right" in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left), "top" in t && (this.offset.click.top = t.top + this.margins.top), "bottom" in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top);}, _isRootNode:function _isRootNode(e){return /(html|body)/i.test(e.tagName) || e === this.document[0];}, _getParentOffset:function _getParentOffset(){var t=this.offsetParent.offset(), i=this.document[0];return ("absolute" === this.cssPosition && this.scrollParent[0] !== i && e.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(), t.top += this.scrollParent.scrollTop()), this._isRootNode(this.offsetParent[0]) && (t = {top:0, left:0}), {top:t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0), left:t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)});}, _getRelativeOffset:function _getRelativeOffset(){if("relative" !== this.cssPosition){return {top:0, left:0};}var e=this.element.position(), t=this._isRootNode(this.scrollParent[0]);return {top:e.top - (parseInt(this.helper.css("top"), 10) || 0) + (t?0:this.scrollParent.scrollTop()), left:e.left - (parseInt(this.helper.css("left"), 10) || 0) + (t?0:this.scrollParent.scrollLeft())};}, _cacheMargins:function _cacheMargins(){this.margins = {left:parseInt(this.element.css("marginLeft"), 10) || 0, top:parseInt(this.element.css("marginTop"), 10) || 0, right:parseInt(this.element.css("marginRight"), 10) || 0, bottom:parseInt(this.element.css("marginBottom"), 10) || 0};}, _cacheHelperProportions:function _cacheHelperProportions(){this.helperProportions = {width:this.helper.outerWidth(), height:this.helper.outerHeight()};}, _setContainment:function _setContainment(){var t, i, s, n=this.options, a=this.document[0];return (this.relativeContainer = null, n.containment?"window" === n.containment?(this.containment = [e(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, e(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, e(window).scrollLeft() + e(window).width() - this.helperProportions.width - this.margins.left, e(window).scrollTop() + (e(window).height() || a.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], void 0):"document" === n.containment?(this.containment = [0, 0, e(a).width() - this.helperProportions.width - this.margins.left, (e(a).height() || a.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], void 0):n.containment.constructor === Array?(this.containment = n.containment, void 0):("parent" === n.containment && (n.containment = this.helper[0].parentNode), i = e(n.containment), s = i[0], s && (t = /(scroll|auto)/.test(i.css("overflow")), this.containment = [(parseInt(i.css("borderLeftWidth"), 10) || 0) + (parseInt(i.css("paddingLeft"), 10) || 0), (parseInt(i.css("borderTopWidth"), 10) || 0) + (parseInt(i.css("paddingTop"), 10) || 0), (t?Math.max(s.scrollWidth, s.offsetWidth):s.offsetWidth) - (parseInt(i.css("borderRightWidth"), 10) || 0) - (parseInt(i.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (t?Math.max(s.scrollHeight, s.offsetHeight):s.offsetHeight) - (parseInt(i.css("borderBottomWidth"), 10) || 0) - (parseInt(i.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relativeContainer = i), void 0):(this.containment = null, void 0));}, _convertPositionTo:function _convertPositionTo(e, t){t || (t = this.position);var i="absolute" === e?1:-1, s=this._isRootNode(this.scrollParent[0]);return {top:t.top + this.offset.relative.top * i + this.offset.parent.top * i - ("fixed" === this.cssPosition?-this.offset.scroll.top:s?0:this.offset.scroll.top) * i, left:t.left + this.offset.relative.left * i + this.offset.parent.left * i - ("fixed" === this.cssPosition?-this.offset.scroll.left:s?0:this.offset.scroll.left) * i};}, _generatePosition:function _generatePosition(e, t){var i, s, n, a, o=this.options, r=this._isRootNode(this.scrollParent[0]), h=e.pageX, l=e.pageY;return (r && this.offset.scroll || (this.offset.scroll = {top:this.scrollParent.scrollTop(), left:this.scrollParent.scrollLeft()}), t && (this.containment && (this.relativeContainer?(s = this.relativeContainer.offset(), i = [this.containment[0] + s.left, this.containment[1] + s.top, this.containment[2] + s.left, this.containment[3] + s.top]):i = this.containment, e.pageX - this.offset.click.left < i[0] && (h = i[0] + this.offset.click.left), e.pageY - this.offset.click.top < i[1] && (l = i[1] + this.offset.click.top), e.pageX - this.offset.click.left > i[2] && (h = i[2] + this.offset.click.left), e.pageY - this.offset.click.top > i[3] && (l = i[3] + this.offset.click.top)), o.grid && (n = o.grid[1]?this.originalPageY + Math.round((l - this.originalPageY) / o.grid[1]) * o.grid[1]:this.originalPageY, l = i?n - this.offset.click.top >= i[1] || n - this.offset.click.top > i[3]?n:n - this.offset.click.top >= i[1]?n - o.grid[1]:n + o.grid[1]:n, a = o.grid[0]?this.originalPageX + Math.round((h - this.originalPageX) / o.grid[0]) * o.grid[0]:this.originalPageX, h = i?a - this.offset.click.left >= i[0] || a - this.offset.click.left > i[2]?a:a - this.offset.click.left >= i[0]?a - o.grid[0]:a + o.grid[0]:a), "y" === o.axis && (h = this.originalPageX), "x" === o.axis && (l = this.originalPageY)), {top:l - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition?-this.offset.scroll.top:r?0:this.offset.scroll.top), left:h - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition?-this.offset.scroll.left:r?0:this.offset.scroll.left)});}, _clear:function _clear(){this.helper.removeClass("ui-draggable-dragging"), this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1, this.destroyOnClear && this.destroy();}, _normalizeRightBottom:function _normalizeRightBottom(){"y" !== this.options.axis && "auto" !== this.helper.css("right") && (this.helper.width(this.helper.width()), this.helper.css("right", "auto")), "x" !== this.options.axis && "auto" !== this.helper.css("bottom") && (this.helper.height(this.helper.height()), this.helper.css("bottom", "auto"));}, _trigger:function _trigger(t, i, s){return (s = s || this._uiHash(), e.ui.plugin.call(this, t, [i, s, this], !0), /^(drag|start|stop)/.test(t) && (this.positionAbs = this._convertPositionTo("absolute"), s.offset = this.positionAbs), e.Widget.prototype._trigger.call(this, t, i, s));}, plugins:{}, _uiHash:function _uiHash(){return {helper:this.helper, position:this.position, originalPosition:this.originalPosition, offset:this.positionAbs};}}), e.ui.plugin.add("draggable", "connectToSortable", {start:function start(t, i, s){var n=e.extend({}, i, {item:s.element});s.sortables = [], e(s.options.connectToSortable).each(function(){var i=e(this).sortable("instance");i && !i.options.disabled && (s.sortables.push(i), i.refreshPositions(), i._trigger("activate", t, n));});}, stop:function stop(t, i, s){var n=e.extend({}, i, {item:s.element});s.cancelHelperRemoval = !1, e.each(s.sortables, function(){var e=this;e.isOver?(e.isOver = 0, s.cancelHelperRemoval = !0, e.cancelHelperRemoval = !1, e._storedCSS = {position:e.placeholder.css("position"), top:e.placeholder.css("top"), left:e.placeholder.css("left")}, e._mouseStop(t), e.options.helper = e.options._helper):(e.cancelHelperRemoval = !0, e._trigger("deactivate", t, n));});}, drag:function drag(t, i, s){e.each(s.sortables, function(){var n=!1, a=this;a.positionAbs = s.positionAbs, a.helperProportions = s.helperProportions, a.offset.click = s.offset.click, a._intersectsWith(a.containerCache) && (n = !0, e.each(s.sortables, function(){return (this.positionAbs = s.positionAbs, this.helperProportions = s.helperProportions, this.offset.click = s.offset.click, this !== a && this._intersectsWith(this.containerCache) && e.contains(a.element[0], this.element[0]) && (n = !1), n);})), n?(a.isOver || (a.isOver = 1, s._parent = i.helper.parent(), a.currentItem = i.helper.appendTo(a.element).data("ui-sortable-item", !0), a.options._helper = a.options.helper, a.options.helper = function(){return i.helper[0];}, t.target = a.currentItem[0], a._mouseCapture(t, !0), a._mouseStart(t, !0, !0), a.offset.click.top = s.offset.click.top, a.offset.click.left = s.offset.click.left, a.offset.parent.left -= s.offset.parent.left - a.offset.parent.left, a.offset.parent.top -= s.offset.parent.top - a.offset.parent.top, s._trigger("toSortable", t), s.dropped = a.element, e.each(s.sortables, function(){this.refreshPositions();}), s.currentItem = s.element, a.fromOutside = s), a.currentItem && (a._mouseDrag(t), i.position = a.position)):a.isOver && (a.isOver = 0, a.cancelHelperRemoval = !0, a.options._revert = a.options.revert, a.options.revert = !1, a._trigger("out", t, a._uiHash(a)), a._mouseStop(t, !0), a.options.revert = a.options._revert, a.options.helper = a.options._helper, a.placeholder && a.placeholder.remove(), i.helper.appendTo(s._parent), s._refreshOffsets(t), i.position = s._generatePosition(t, !0), s._trigger("fromSortable", t), s.dropped = !1, e.each(s.sortables, function(){this.refreshPositions();}));});}}), e.ui.plugin.add("draggable", "cursor", {start:function start(t, i, s){var n=e("body"), a=s.options;n.css("cursor") && (a._cursor = n.css("cursor")), n.css("cursor", a.cursor);}, stop:function stop(t, i, s){var n=s.options;n._cursor && e("body").css("cursor", n._cursor);}}), e.ui.plugin.add("draggable", "opacity", {start:function start(t, i, s){var n=e(i.helper), a=s.options;n.css("opacity") && (a._opacity = n.css("opacity")), n.css("opacity", a.opacity);}, stop:function stop(t, i, s){var n=s.options;n._opacity && e(i.helper).css("opacity", n._opacity);}}), e.ui.plugin.add("draggable", "scroll", {start:function start(e, t, i){i.scrollParentNotHidden || (i.scrollParentNotHidden = i.helper.scrollParent(!1)), i.scrollParentNotHidden[0] !== i.document[0] && "HTML" !== i.scrollParentNotHidden[0].tagName && (i.overflowOffset = i.scrollParentNotHidden.offset());}, drag:function drag(t, i, s){var n=s.options, a=!1, o=s.scrollParentNotHidden[0], r=s.document[0];o !== r && "HTML" !== o.tagName?(n.axis && "x" === n.axis || (s.overflowOffset.top + o.offsetHeight - t.pageY < n.scrollSensitivity?o.scrollTop = a = o.scrollTop + n.scrollSpeed:t.pageY - s.overflowOffset.top < n.scrollSensitivity && (o.scrollTop = a = o.scrollTop - n.scrollSpeed)), n.axis && "y" === n.axis || (s.overflowOffset.left + o.offsetWidth - t.pageX < n.scrollSensitivity?o.scrollLeft = a = o.scrollLeft + n.scrollSpeed:t.pageX - s.overflowOffset.left < n.scrollSensitivity && (o.scrollLeft = a = o.scrollLeft - n.scrollSpeed))):(n.axis && "x" === n.axis || (t.pageY - e(r).scrollTop() < n.scrollSensitivity?a = e(r).scrollTop(e(r).scrollTop() - n.scrollSpeed):e(window).height() - (t.pageY - e(r).scrollTop()) < n.scrollSensitivity && (a = e(r).scrollTop(e(r).scrollTop() + n.scrollSpeed))), n.axis && "y" === n.axis || (t.pageX - e(r).scrollLeft() < n.scrollSensitivity?a = e(r).scrollLeft(e(r).scrollLeft() - n.scrollSpeed):e(window).width() - (t.pageX - e(r).scrollLeft()) < n.scrollSensitivity && (a = e(r).scrollLeft(e(r).scrollLeft() + n.scrollSpeed)))), a !== !1 && e.ui.ddmanager && !n.dropBehaviour && e.ui.ddmanager.prepareOffsets(s, t);}}), e.ui.plugin.add("draggable", "snap", {start:function start(t, i, s){var n=s.options;s.snapElements = [], e(n.snap.constructor !== String?n.snap.items || ":data(ui-draggable)":n.snap).each(function(){var t=e(this), i=t.offset();this !== s.element[0] && s.snapElements.push({item:this, width:t.outerWidth(), height:t.outerHeight(), top:i.top, left:i.left});});}, drag:function drag(t, i, s){var n, a, o, r, h, l, u, d, c, p, f=s.options, m=f.snapTolerance, g=i.offset.left, v=g + s.helperProportions.width, y=i.offset.top, b=y + s.helperProportions.height;for(c = s.snapElements.length - 1; c >= 0; c--) h = s.snapElements[c].left - s.margins.left, l = h + s.snapElements[c].width, u = s.snapElements[c].top - s.margins.top, d = u + s.snapElements[c].height, h - m > v || g > l + m || u - m > b || y > d + m || !e.contains(s.snapElements[c].item.ownerDocument, s.snapElements[c].item)?(s.snapElements[c].snapping && s.options.snap.release && s.options.snap.release.call(s.element, t, e.extend(s._uiHash(), {snapItem:s.snapElements[c].item})), s.snapElements[c].snapping = !1):("inner" !== f.snapMode && (n = m >= Math.abs(u - b), a = m >= Math.abs(d - y), o = m >= Math.abs(h - v), r = m >= Math.abs(l - g), n && (i.position.top = s._convertPositionTo("relative", {top:u - s.helperProportions.height, left:0}).top), a && (i.position.top = s._convertPositionTo("relative", {top:d, left:0}).top), o && (i.position.left = s._convertPositionTo("relative", {top:0, left:h - s.helperProportions.width}).left), r && (i.position.left = s._convertPositionTo("relative", {top:0, left:l}).left)), p = n || a || o || r, "outer" !== f.snapMode && (n = m >= Math.abs(u - y), a = m >= Math.abs(d - b), o = m >= Math.abs(h - g), r = m >= Math.abs(l - v), n && (i.position.top = s._convertPositionTo("relative", {top:u, left:0}).top), a && (i.position.top = s._convertPositionTo("relative", {top:d - s.helperProportions.height, left:0}).top), o && (i.position.left = s._convertPositionTo("relative", {top:0, left:h}).left), r && (i.position.left = s._convertPositionTo("relative", {top:0, left:l - s.helperProportions.width}).left)), !s.snapElements[c].snapping && (n || a || o || r || p) && s.options.snap.snap && s.options.snap.snap.call(s.element, t, e.extend(s._uiHash(), {snapItem:s.snapElements[c].item})), s.snapElements[c].snapping = n || a || o || r || p);}}), e.ui.plugin.add("draggable", "stack", {start:function start(t, i, s){var n, a=s.options, o=e.makeArray(e(a.stack)).sort(function(t, i){return (parseInt(e(t).css("zIndex"), 10) || 0) - (parseInt(e(i).css("zIndex"), 10) || 0);});o.length && (n = parseInt(e(o[0]).css("zIndex"), 10) || 0, e(o).each(function(t){e(this).css("zIndex", n + t);}), this.css("zIndex", n + o.length));}}), e.ui.plugin.add("draggable", "zIndex", {start:function start(t, i, s){var n=e(i.helper), a=s.options;n.css("zIndex") && (a._zIndex = n.css("zIndex")), n.css("zIndex", a.zIndex);}, stop:function stop(t, i, s){var n=s.options;n._zIndex && e(i.helper).css("zIndex", n._zIndex);}}), e.ui.draggable, e.widget("ui.droppable", {version:"1.11.4", widgetEventPrefix:"drop", options:{accept:"*", activeClass:!1, addClasses:!0, greedy:!1, hoverClass:!1, scope:"default", tolerance:"intersect", activate:null, deactivate:null, drop:null, out:null, over:null}, _create:function _create(){var t, i=this.options, s=i.accept;this.isover = !1, this.isout = !0, this.accept = e.isFunction(s)?s:function(e){return e.is(s);}, this.proportions = function(){return arguments.length?(t = arguments[0], void 0):t?t:t = {width:this.element[0].offsetWidth, height:this.element[0].offsetHeight};}, this._addToManager(i.scope), i.addClasses && this.element.addClass("ui-droppable");}, _addToManager:function _addToManager(t){e.ui.ddmanager.droppables[t] = e.ui.ddmanager.droppables[t] || [], e.ui.ddmanager.droppables[t].push(this);}, _splice:function _splice(e){for(var t=0; e.length > t; t++) e[t] === this && e.splice(t, 1);}, _destroy:function _destroy(){var t=e.ui.ddmanager.droppables[this.options.scope];this._splice(t), this.element.removeClass("ui-droppable ui-droppable-disabled");}, _setOption:function _setOption(t, i){if("accept" === t)this.accept = e.isFunction(i)?i:function(e){return e.is(i);};else if("scope" === t){var s=e.ui.ddmanager.droppables[this.options.scope];this._splice(s), this._addToManager(i);}this._super(t, i);}, _activate:function _activate(t){var i=e.ui.ddmanager.current;this.options.activeClass && this.element.addClass(this.options.activeClass), i && this._trigger("activate", t, this.ui(i));}, _deactivate:function _deactivate(t){var i=e.ui.ddmanager.current;this.options.activeClass && this.element.removeClass(this.options.activeClass), i && this._trigger("deactivate", t, this.ui(i));}, _over:function _over(t){var i=e.ui.ddmanager.current;i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger("over", t, this.ui(i)));}, _out:function _out(t){var i=e.ui.ddmanager.current;i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("out", t, this.ui(i)));}, _drop:function _drop(t, i){var s=i || e.ui.ddmanager.current, n=!1;return s && (s.currentItem || s.element)[0] !== this.element[0]?(this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function(){var i=e(this).droppable("instance");return i.options.greedy && !i.options.disabled && i.options.scope === s.options.scope && i.accept.call(i.element[0], s.currentItem || s.element) && e.ui.intersect(s, e.extend(i, {offset:i.element.offset()}), i.options.tolerance, t)?(n = !0, !1):void 0;}), n?!1:this.accept.call(this.element[0], s.currentItem || s.element)?(this.options.activeClass && this.element.removeClass(this.options.activeClass), this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop", t, this.ui(s)), this.element):!1):!1;}, ui:function ui(e){return {draggable:e.currentItem || e.element, helper:e.helper, position:e.position, offset:e.positionAbs};}}), e.ui.intersect = (function(){function e(e, t, i){return e >= t && t + i > e;}return function(t, i, s, n){if(!i.offset)return !1;var a=(t.positionAbs || t.position.absolute).left + t.margins.left, o=(t.positionAbs || t.position.absolute).top + t.margins.top, r=a + t.helperProportions.width, h=o + t.helperProportions.height, l=i.offset.left, u=i.offset.top, d=l + i.proportions().width, c=u + i.proportions().height;switch(s){case "fit":return a >= l && d >= r && o >= u && c >= h;case "intersect":return a + t.helperProportions.width / 2 > l && d > r - t.helperProportions.width / 2 && o + t.helperProportions.height / 2 > u && c > h - t.helperProportions.height / 2;case "pointer":return e(n.pageY, u, i.proportions().height) && e(n.pageX, l, i.proportions().width);case "touch":return (o >= u && c >= o || h >= u && c >= h || u > o && h > c) && (a >= l && d >= a || r >= l && d >= r || l > a && r > d);default:return !1;}};})(), e.ui.ddmanager = {current:null, droppables:{"default":[]}, prepareOffsets:function prepareOffsets(t, i){var s, n, a=e.ui.ddmanager.droppables[t.options.scope] || [], o=i?i.type:null, r=(t.currentItem || t.element).find(":data(ui-droppable)").addBack();e: for(s = 0; a.length > s; s++) if(!(a[s].options.disabled || t && !a[s].accept.call(a[s].element[0], t.currentItem || t.element))){for(n = 0; r.length > n; n++) if(r[n] === a[s].element[0]){a[s].proportions().height = 0;continue e;}a[s].visible = "none" !== a[s].element.css("display"), a[s].visible && ("mousedown" === o && a[s]._activate.call(a[s], i), a[s].offset = a[s].element.offset(), a[s].proportions({width:a[s].element[0].offsetWidth, height:a[s].element[0].offsetHeight}));}}, drop:function drop(t, i){var s=!1;return (e.each((e.ui.ddmanager.droppables[t.options.scope] || []).slice(), function(){this.options && (!this.options.disabled && this.visible && e.ui.intersect(t, this, this.options.tolerance, i) && (s = this._drop.call(this, i) || s), !this.options.disabled && this.visible && this.accept.call(this.element[0], t.currentItem || t.element) && (this.isout = !0, this.isover = !1, this._deactivate.call(this, i)));}), s);}, dragStart:function dragStart(t, i){t.element.parentsUntil("body").bind("scroll.droppable", function(){t.options.refreshPositions || e.ui.ddmanager.prepareOffsets(t, i);});}, drag:function drag(t, i){t.options.refreshPositions && e.ui.ddmanager.prepareOffsets(t, i), e.each(e.ui.ddmanager.droppables[t.options.scope] || [], function(){if(!this.options.disabled && !this.greedyChild && this.visible){var s, n, a, o=e.ui.intersect(t, this, this.options.tolerance, i), r=!o && this.isover?"isout":o && !this.isover?"isover":null;r && (this.options.greedy && (n = this.options.scope, a = this.element.parents(":data(ui-droppable)").filter(function(){return e(this).droppable("instance").options.scope === n;}), a.length && (s = e(a[0]).droppable("instance"), s.greedyChild = "isover" === r)), s && "isover" === r && (s.isover = !1, s.isout = !0, s._out.call(s, i)), this[r] = !0, this["isout" === r?"isover":"isout"] = !1, this["isover" === r?"_over":"_out"].call(this, i), s && "isout" === r && (s.isout = !1, s.isover = !0, s._over.call(s, i)));}});}, dragStop:function dragStop(t, i){t.element.parentsUntil("body").unbind("scroll.droppable"), t.options.refreshPositions || e.ui.ddmanager.prepareOffsets(t, i);}}, e.ui.droppable, e.widget("ui.resizable", e.ui.mouse, {version:"1.11.4", widgetEventPrefix:"resize", options:{alsoResize:!1, animate:!1, animateDuration:"slow", animateEasing:"swing", aspectRatio:!1, autoHide:!1, containment:!1, ghost:!1, grid:!1, handles:"e,s,se", helper:!1, maxHeight:null, maxWidth:null, minHeight:10, minWidth:10, zIndex:90, resize:null, start:null, stop:null}, _num:function _num(e){return parseInt(e, 10) || 0;}, _isNumber:function _isNumber(e){return !isNaN(parseInt(e, 10));}, _hasScroll:function _hasScroll(t, i){if("hidden" === e(t).css("overflow")){return !1;}var s=i && "left" === i?"scrollLeft":"scrollTop", n=!1;return t[s] > 0?!0:(t[s] = 1, n = t[s] > 0, t[s] = 0, n);}, _create:function _create(){var t, i, s, n, a, o=this, r=this.options;if((this.element.addClass("ui-resizable"), e.extend(this, {_aspectRatio:!!r.aspectRatio, aspectRatio:r.aspectRatio, originalElement:this.element, _proportionallyResizeElements:[], _helper:r.helper || r.ghost || r.animate?r.helper || "ui-resizable-helper":null}), this.element[0].nodeName.match(/^(canvas|textarea|input|select|button|img)$/i) && (this.element.wrap(e("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({position:this.element.css("position"), width:this.element.outerWidth(), height:this.element.outerHeight(), top:this.element.css("top"), left:this.element.css("left")})), this.element = this.element.parent().data("ui-resizable", this.element.resizable("instance")), this.elementIsWrapper = !0, this.element.css({marginLeft:this.originalElement.css("marginLeft"), marginTop:this.originalElement.css("marginTop"), marginRight:this.originalElement.css("marginRight"), marginBottom:this.originalElement.css("marginBottom")}), this.originalElement.css({marginLeft:0, marginTop:0, marginRight:0, marginBottom:0}), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({position:"static", zoom:1, display:"block"})), this.originalElement.css({margin:this.originalElement.css("margin")}), this._proportionallyResize()), this.handles = r.handles || (e(".ui-resizable-handle", this.element).length?{n:".ui-resizable-n", e:".ui-resizable-e", s:".ui-resizable-s", w:".ui-resizable-w", se:".ui-resizable-se", sw:".ui-resizable-sw", ne:".ui-resizable-ne", nw:".ui-resizable-nw"}:"e,s,se"), this._handles = e(), this.handles.constructor === String))for("all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"), t = this.handles.split(","), this.handles = {}, i = 0; t.length > i; i++) s = e.trim(t[i]), a = "ui-resizable-" + s, n = e("<div class='ui-resizable-handle " + a + "'></div>"), n.css({zIndex:r.zIndex}), "se" === s && n.addClass("ui-icon ui-icon-gripsmall-diagonal-se"), this.handles[s] = ".ui-resizable-" + s, this.element.append(n);this._renderAxis = function(t){var i, s, n, a;t = t || this.element;for(i in this.handles) this.handles[i].constructor === String?this.handles[i] = this.element.children(this.handles[i]).first().show():(this.handles[i].jquery || this.handles[i].nodeType) && (this.handles[i] = e(this.handles[i]), this._on(this.handles[i], {mousedown:o._mouseDown})), this.elementIsWrapper && this.originalElement[0].nodeName.match(/^(textarea|input|select|button)$/i) && (s = e(this.handles[i], this.element), a = /sw|ne|nw|se|n|s/.test(i)?s.outerHeight():s.outerWidth(), n = ["padding", /ne|nw|n/.test(i)?"Top":/se|sw|s/.test(i)?"Bottom":/^e$/.test(i)?"Right":"Left"].join(""), t.css(n, a), this._proportionallyResize()), this._handles = this._handles.add(this.handles[i]);}, this._renderAxis(this.element), this._handles = this._handles.add(this.element.find(".ui-resizable-handle")), this._handles.disableSelection(), this._handles.mouseover(function(){o.resizing || (this.className && (n = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)), o.axis = n && n[1]?n[1]:"se");}), r.autoHide && (this._handles.hide(), e(this.element).addClass("ui-resizable-autohide").mouseenter(function(){r.disabled || (e(this).removeClass("ui-resizable-autohide"), o._handles.show());}).mouseleave(function(){r.disabled || o.resizing || (e(this).addClass("ui-resizable-autohide"), o._handles.hide());})), this._mouseInit();}, _destroy:function _destroy(){this._mouseDestroy();var t, i=function i(t){e(t).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove();};return (this.elementIsWrapper && (i(this.element), t = this.element, this.originalElement.css({position:t.css("position"), width:t.outerWidth(), height:t.outerHeight(), top:t.css("top"), left:t.css("left")}).insertAfter(t), t.remove()), this.originalElement.css("resize", this.originalResizeStyle), i(this.originalElement), this);}, _mouseCapture:function _mouseCapture(t){var i, s, n=!1;for(i in this.handles) s = e(this.handles[i])[0], (s === t.target || e.contains(s, t.target)) && (n = !0);return !this.options.disabled && n;}, _mouseStart:function _mouseStart(t){var i, s, n, a=this.options, o=this.element;return (this.resizing = !0, this._renderProxy(), i = this._num(this.helper.css("left")), s = this._num(this.helper.css("top")), a.containment && (i += e(a.containment).scrollLeft() || 0, s += e(a.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {left:i, top:s}, this.size = this._helper?{width:this.helper.width(), height:this.helper.height()}:{width:o.width(), height:o.height()}, this.originalSize = this._helper?{width:o.outerWidth(), height:o.outerHeight()}:{width:o.width(), height:o.height()}, this.sizeDiff = {width:o.outerWidth() - o.width(), height:o.outerHeight() - o.height()}, this.originalPosition = {left:i, top:s}, this.originalMousePosition = {left:t.pageX, top:t.pageY}, this.aspectRatio = "number" == typeof a.aspectRatio?a.aspectRatio:this.originalSize.width / this.originalSize.height || 1, n = e(".ui-resizable-" + this.axis).css("cursor"), e("body").css("cursor", "auto" === n?this.axis + "-resize":n), o.addClass("ui-resizable-resizing"), this._propagate("start", t), !0);}, _mouseDrag:function _mouseDrag(t){var i, s, n=this.originalMousePosition, a=this.axis, o=t.pageX - n.left || 0, r=t.pageY - n.top || 0, h=this._change[a];return (this._updatePrevProperties(), h?(i = h.apply(this, [t, o, r]), this._updateVirtualBoundaries(t.shiftKey), (this._aspectRatio || t.shiftKey) && (i = this._updateRatio(i, t)), i = this._respectSize(i, t), this._updateCache(i), this._propagate("resize", t), s = this._applyChanges(), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), e.isEmptyObject(s) || (this._updatePrevProperties(), this._trigger("resize", t, this.ui()), this._applyChanges()), !1):!1);}, _mouseStop:function _mouseStop(t){this.resizing = !1;var i, s, n, a, o, r, h, l=this.options, u=this;return (this._helper && (i = this._proportionallyResizeElements, s = i.length && /textarea/i.test(i[0].nodeName), n = s && this._hasScroll(i[0], "left")?0:u.sizeDiff.height, a = s?0:u.sizeDiff.width, o = {width:u.helper.width() - a, height:u.helper.height() - n}, r = parseInt(u.element.css("left"), 10) + (u.position.left - u.originalPosition.left) || null, h = parseInt(u.element.css("top"), 10) + (u.position.top - u.originalPosition.top) || null, l.animate || this.element.css(e.extend(o, {top:h, left:r})), u.helper.height(u.size.height), u.helper.width(u.size.width), this._helper && !l.animate && this._proportionallyResize()), e("body").css("cursor", "auto"), this.element.removeClass("ui-resizable-resizing"), this._propagate("stop", t), this._helper && this.helper.remove(), !1);}, _updatePrevProperties:function _updatePrevProperties(){this.prevPosition = {top:this.position.top, left:this.position.left}, this.prevSize = {width:this.size.width, height:this.size.height};}, _applyChanges:function _applyChanges(){var e={};return (this.position.top !== this.prevPosition.top && (e.top = this.position.top + "px"), this.position.left !== this.prevPosition.left && (e.left = this.position.left + "px"), this.size.width !== this.prevSize.width && (e.width = this.size.width + "px"), this.size.height !== this.prevSize.height && (e.height = this.size.height + "px"), this.helper.css(e), e);}, _updateVirtualBoundaries:function _updateVirtualBoundaries(e){var t, i, s, n, a, o=this.options;a = {minWidth:this._isNumber(o.minWidth)?o.minWidth:0, maxWidth:this._isNumber(o.maxWidth)?o.maxWidth:1 / 0, minHeight:this._isNumber(o.minHeight)?o.minHeight:0, maxHeight:this._isNumber(o.maxHeight)?o.maxHeight:1 / 0}, (this._aspectRatio || e) && (t = a.minHeight * this.aspectRatio, s = a.minWidth / this.aspectRatio, i = a.maxHeight * this.aspectRatio, n = a.maxWidth / this.aspectRatio, t > a.minWidth && (a.minWidth = t), s > a.minHeight && (a.minHeight = s), a.maxWidth > i && (a.maxWidth = i), a.maxHeight > n && (a.maxHeight = n)), this._vBoundaries = a;}, _updateCache:function _updateCache(e){this.offset = this.helper.offset(), this._isNumber(e.left) && (this.position.left = e.left), this._isNumber(e.top) && (this.position.top = e.top), this._isNumber(e.height) && (this.size.height = e.height), this._isNumber(e.width) && (this.size.width = e.width);}, _updateRatio:function _updateRatio(e){var t=this.position, i=this.size, s=this.axis;return (this._isNumber(e.height)?e.width = e.height * this.aspectRatio:this._isNumber(e.width) && (e.height = e.width / this.aspectRatio), "sw" === s && (e.left = t.left + (i.width - e.width), e.top = null), "nw" === s && (e.top = t.top + (i.height - e.height), e.left = t.left + (i.width - e.width)), e);}, _respectSize:function _respectSize(e){var t=this._vBoundaries, i=this.axis, s=this._isNumber(e.width) && t.maxWidth && t.maxWidth < e.width, n=this._isNumber(e.height) && t.maxHeight && t.maxHeight < e.height, a=this._isNumber(e.width) && t.minWidth && t.minWidth > e.width, o=this._isNumber(e.height) && t.minHeight && t.minHeight > e.height, r=this.originalPosition.left + this.originalSize.width, h=this.position.top + this.size.height, l=/sw|nw|w/.test(i), u=/nw|ne|n/.test(i);return (a && (e.width = t.minWidth), o && (e.height = t.minHeight), s && (e.width = t.maxWidth), n && (e.height = t.maxHeight), a && l && (e.left = r - t.minWidth), s && l && (e.left = r - t.maxWidth), o && u && (e.top = h - t.minHeight), n && u && (e.top = h - t.maxHeight), e.width || e.height || e.left || !e.top?e.width || e.height || e.top || !e.left || (e.left = null):e.top = null, e);}, _getPaddingPlusBorderDimensions:function _getPaddingPlusBorderDimensions(e){for(var t=0, i=[], s=[e.css("borderTopWidth"), e.css("borderRightWidth"), e.css("borderBottomWidth"), e.css("borderLeftWidth")], n=[e.css("paddingTop"), e.css("paddingRight"), e.css("paddingBottom"), e.css("paddingLeft")]; 4 > t; t++) i[t] = parseInt(s[t], 10) || 0, i[t] += parseInt(n[t], 10) || 0;return {height:i[0] + i[2], width:i[1] + i[3]};}, _proportionallyResize:function _proportionallyResize(){if(this._proportionallyResizeElements.length)for(var e, t=0, i=this.helper || this.element; this._proportionallyResizeElements.length > t; t++) e = this._proportionallyResizeElements[t], this.outerDimensions || (this.outerDimensions = this._getPaddingPlusBorderDimensions(e)), e.css({height:i.height() - this.outerDimensions.height || 0, width:i.width() - this.outerDimensions.width || 0});}, _renderProxy:function _renderProxy(){var t=this.element, i=this.options;this.elementOffset = t.offset(), this._helper?(this.helper = this.helper || e("<div style='overflow:hidden;'></div>"), this.helper.addClass(this._helper).css({width:this.element.outerWidth() - 1, height:this.element.outerHeight() - 1, position:"absolute", left:this.elementOffset.left + "px", top:this.elementOffset.top + "px", zIndex:++i.zIndex}), this.helper.appendTo("body").disableSelection()):this.helper = this.element;}, _change:{e:function e(e, t){return {width:this.originalSize.width + t};}, w:function w(e, t){var i=this.originalSize, s=this.originalPosition;return {left:s.left + t, width:i.width - t};}, n:(function(_n){var _nWrapper=function n(_x, _x2, _x3){return _n.apply(this, arguments);};_nWrapper.toString = function(){return _n.toString();};return _nWrapper;})(function(e, t, i){var s=this.originalSize, n=this.originalPosition;return {top:n.top + i, height:s.height - i};}), s:function s(e, t, i){return {height:this.originalSize.height + i};}, se:function se(t, i, s){return e.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [t, i, s]));}, sw:function sw(t, i, s){return e.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [t, i, s]));}, ne:function ne(t, i, s){return e.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [t, i, s]));}, nw:function nw(t, i, s){return e.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [t, i, s]));}}, _propagate:function _propagate(t, i){e.ui.plugin.call(this, t, [i, this.ui()]), "resize" !== t && this._trigger(t, i, this.ui());}, plugins:{}, ui:function ui(){return {originalElement:this.originalElement, element:this.element, helper:this.helper, position:this.position, size:this.size, originalSize:this.originalSize, originalPosition:this.originalPosition};}}), e.ui.plugin.add("resizable", "animate", {stop:function stop(t){var i=e(this).resizable("instance"), s=i.options, n=i._proportionallyResizeElements, a=n.length && /textarea/i.test(n[0].nodeName), o=a && i._hasScroll(n[0], "left")?0:i.sizeDiff.height, r=a?0:i.sizeDiff.width, h={width:i.size.width - r, height:i.size.height - o}, l=parseInt(i.element.css("left"), 10) + (i.position.left - i.originalPosition.left) || null, u=parseInt(i.element.css("top"), 10) + (i.position.top - i.originalPosition.top) || null;i.element.animate(e.extend(h, u && l?{top:u, left:l}:{}), {duration:s.animateDuration, easing:s.animateEasing, step:function step(){var s={width:parseInt(i.element.css("width"), 10), height:parseInt(i.element.css("height"), 10), top:parseInt(i.element.css("top"), 10), left:parseInt(i.element.css("left"), 10)};n && n.length && e(n[0]).css({width:s.width, height:s.height}), i._updateCache(s), i._propagate("resize", t);}});}}), e.ui.plugin.add("resizable", "containment", {start:function start(){var t, i, s, n, a, o, r, h=e(this).resizable("instance"), l=h.options, u=h.element, d=l.containment, c=d instanceof e?d.get(0):/parent/.test(d)?u.parent().get(0):d;c && (h.containerElement = e(c), /document/.test(d) || d === document?(h.containerOffset = {left:0, top:0}, h.containerPosition = {left:0, top:0}, h.parentData = {element:e(document), left:0, top:0, width:e(document).width(), height:e(document).height() || document.body.parentNode.scrollHeight}):(t = e(c), i = [], e(["Top", "Right", "Left", "Bottom"]).each(function(e, s){i[e] = h._num(t.css("padding" + s));}), h.containerOffset = t.offset(), h.containerPosition = t.position(), h.containerSize = {height:t.innerHeight() - i[3], width:t.innerWidth() - i[1]}, s = h.containerOffset, n = h.containerSize.height, a = h.containerSize.width, o = h._hasScroll(c, "left")?c.scrollWidth:a, r = h._hasScroll(c)?c.scrollHeight:n, h.parentData = {element:c, left:s.left, top:s.top, width:o, height:r}));}, resize:function resize(t){var i, s, n, a, o=e(this).resizable("instance"), r=o.options, h=o.containerOffset, l=o.position, u=o._aspectRatio || t.shiftKey, d={top:0, left:0}, c=o.containerElement, p=!0;c[0] !== document && /static/.test(c.css("position")) && (d = h), l.left < (o._helper?h.left:0) && (o.size.width = o.size.width + (o._helper?o.position.left - h.left:o.position.left - d.left), u && (o.size.height = o.size.width / o.aspectRatio, p = !1), o.position.left = r.helper?h.left:0), l.top < (o._helper?h.top:0) && (o.size.height = o.size.height + (o._helper?o.position.top - h.top:o.position.top), u && (o.size.width = o.size.height * o.aspectRatio, p = !1), o.position.top = o._helper?h.top:0), n = o.containerElement.get(0) === o.element.parent().get(0), a = /relative|absolute/.test(o.containerElement.css("position")), n && a?(o.offset.left = o.parentData.left + o.position.left, o.offset.top = o.parentData.top + o.position.top):(o.offset.left = o.element.offset().left, o.offset.top = o.element.offset().top), i = Math.abs(o.sizeDiff.width + (o._helper?o.offset.left - d.left:o.offset.left - h.left)), s = Math.abs(o.sizeDiff.height + (o._helper?o.offset.top - d.top:o.offset.top - h.top)), i + o.size.width >= o.parentData.width && (o.size.width = o.parentData.width - i, u && (o.size.height = o.size.width / o.aspectRatio, p = !1)), s + o.size.height >= o.parentData.height && (o.size.height = o.parentData.height - s, u && (o.size.width = o.size.height * o.aspectRatio, p = !1)), p || (o.position.left = o.prevPosition.left, o.position.top = o.prevPosition.top, o.size.width = o.prevSize.width, o.size.height = o.prevSize.height);}, stop:function stop(){var t=e(this).resizable("instance"), i=t.options, s=t.containerOffset, n=t.containerPosition, a=t.containerElement, o=e(t.helper), r=o.offset(), h=o.outerWidth() - t.sizeDiff.width, l=o.outerHeight() - t.sizeDiff.height;t._helper && !i.animate && /relative/.test(a.css("position")) && e(this).css({left:r.left - n.left - s.left, width:h, height:l}), t._helper && !i.animate && /static/.test(a.css("position")) && e(this).css({left:r.left - n.left - s.left, width:h, height:l});}}), e.ui.plugin.add("resizable", "alsoResize", {start:function start(){var t=e(this).resizable("instance"), i=t.options;e(i.alsoResize).each(function(){var t=e(this);t.data("ui-resizable-alsoresize", {width:parseInt(t.width(), 10), height:parseInt(t.height(), 10), left:parseInt(t.css("left"), 10), top:parseInt(t.css("top"), 10)});});}, resize:function resize(t, i){var s=e(this).resizable("instance"), n=s.options, a=s.originalSize, o=s.originalPosition, r={height:s.size.height - a.height || 0, width:s.size.width - a.width || 0, top:s.position.top - o.top || 0, left:s.position.left - o.left || 0};e(n.alsoResize).each(function(){var t=e(this), s=e(this).data("ui-resizable-alsoresize"), n={}, a=t.parents(i.originalElement[0]).length?["width", "height"]:["width", "height", "top", "left"];e.each(a, function(e, t){var i=(s[t] || 0) + (r[t] || 0);i && i >= 0 && (n[t] = i || null);}), t.css(n);});}, stop:function stop(){e(this).removeData("resizable-alsoresize");}}), e.ui.plugin.add("resizable", "ghost", {start:function start(){var t=e(this).resizable("instance"), i=t.options, s=t.size;t.ghost = t.originalElement.clone(), t.ghost.css({opacity:0.25, display:"block", position:"relative", height:s.height, width:s.width, margin:0, left:0, top:0}).addClass("ui-resizable-ghost").addClass("string" == typeof i.ghost?i.ghost:""), t.ghost.appendTo(t.helper);}, resize:function resize(){var t=e(this).resizable("instance");t.ghost && t.ghost.css({position:"relative", height:t.size.height, width:t.size.width});}, stop:function stop(){var t=e(this).resizable("instance");t.ghost && t.helper && t.helper.get(0).removeChild(t.ghost.get(0));}}), e.ui.plugin.add("resizable", "grid", {resize:function resize(){var t, i=e(this).resizable("instance"), s=i.options, n=i.size, a=i.originalSize, o=i.originalPosition, r=i.axis, h="number" == typeof s.grid?[s.grid, s.grid]:s.grid, l=h[0] || 1, u=h[1] || 1, d=Math.round((n.width - a.width) / l) * l, c=Math.round((n.height - a.height) / u) * u, p=a.width + d, f=a.height + c, m=s.maxWidth && p > s.maxWidth, g=s.maxHeight && f > s.maxHeight, v=s.minWidth && s.minWidth > p, y=s.minHeight && s.minHeight > f;s.grid = h, v && (p += l), y && (f += u), m && (p -= l), g && (f -= u), /^(se|s|e)$/.test(r)?(i.size.width = p, i.size.height = f):/^(ne)$/.test(r)?(i.size.width = p, i.size.height = f, i.position.top = o.top - c):/^(sw)$/.test(r)?(i.size.width = p, i.size.height = f, i.position.left = o.left - d):((0 >= f - u || 0 >= p - l) && (t = i._getPaddingPlusBorderDimensions(this)), f - u > 0?(i.size.height = f, i.position.top = o.top - c):(f = u - t.height, i.size.height = f, i.position.top = o.top + a.height - f), p - l > 0?(i.size.width = p, i.position.left = o.left - d):(p = l - t.width, i.size.width = p, i.position.left = o.left + a.width - p));}}), e.ui.resizable, e.widget("ui.selectable", e.ui.mouse, {version:"1.11.4", options:{appendTo:"body", autoRefresh:!0, distance:0, filter:"*", tolerance:"touch", selected:null, selecting:null, start:null, stop:null, unselected:null, unselecting:null}, _create:function _create(){var t, i=this;this.element.addClass("ui-selectable"), this.dragged = !1, this.refresh = function(){t = e(i.options.filter, i.element[0]), t.addClass("ui-selectee"), t.each(function(){var t=e(this), i=t.offset();e.data(this, "selectable-item", {element:this, $element:t, left:i.left, top:i.top, right:i.left + t.outerWidth(), bottom:i.top + t.outerHeight(), startselected:!1, selected:t.hasClass("ui-selected"), selecting:t.hasClass("ui-selecting"), unselecting:t.hasClass("ui-unselecting")});});}, this.refresh(), this.selectees = t.addClass("ui-selectee"), this._mouseInit(), this.helper = e("<div class='ui-selectable-helper'></div>");}, _destroy:function _destroy(){this.selectees.removeClass("ui-selectee").removeData("selectable-item"), this.element.removeClass("ui-selectable ui-selectable-disabled"), this._mouseDestroy();}, _mouseStart:function _mouseStart(t){var i=this, s=this.options;this.opos = [t.pageX, t.pageY], this.options.disabled || (this.selectees = e(s.filter, this.element[0]), this._trigger("start", t), e(s.appendTo).append(this.helper), this.helper.css({left:t.pageX, top:t.pageY, width:0, height:0}), s.autoRefresh && this.refresh(), this.selectees.filter(".ui-selected").each(function(){var s=e.data(this, "selectable-item");s.startselected = !0, t.metaKey || t.ctrlKey || (s.$element.removeClass("ui-selected"), s.selected = !1, s.$element.addClass("ui-unselecting"), s.unselecting = !0, i._trigger("unselecting", t, {unselecting:s.element}));}), e(t.target).parents().addBack().each(function(){var s, n=e.data(this, "selectable-item");return n?(s = !t.metaKey && !t.ctrlKey || !n.$element.hasClass("ui-selected"), n.$element.removeClass(s?"ui-unselecting":"ui-selected").addClass(s?"ui-selecting":"ui-unselecting"), n.unselecting = !s, n.selecting = s, n.selected = s, s?i._trigger("selecting", t, {selecting:n.element}):i._trigger("unselecting", t, {unselecting:n.element}), !1):void 0;}));}, _mouseDrag:function _mouseDrag(t){if((this.dragged = !0, !this.options.disabled)){var i, s=this, n=this.options, a=this.opos[0], o=this.opos[1], r=t.pageX, h=t.pageY;return (a > r && (i = r, r = a, a = i), o > h && (i = h, h = o, o = i), this.helper.css({left:a, top:o, width:r - a, height:h - o}), this.selectees.each(function(){var i=e.data(this, "selectable-item"), l=!1;i && i.element !== s.element[0] && ("touch" === n.tolerance?l = !(i.left > r || a > i.right || i.top > h || o > i.bottom):"fit" === n.tolerance && (l = i.left > a && r > i.right && i.top > o && h > i.bottom), l?(i.selected && (i.$element.removeClass("ui-selected"), i.selected = !1), i.unselecting && (i.$element.removeClass("ui-unselecting"), i.unselecting = !1), i.selecting || (i.$element.addClass("ui-selecting"), i.selecting = !0, s._trigger("selecting", t, {selecting:i.element}))):(i.selecting && ((t.metaKey || t.ctrlKey) && i.startselected?(i.$element.removeClass("ui-selecting"), i.selecting = !1, i.$element.addClass("ui-selected"), i.selected = !0):(i.$element.removeClass("ui-selecting"), i.selecting = !1, i.startselected && (i.$element.addClass("ui-unselecting"), i.unselecting = !0), s._trigger("unselecting", t, {unselecting:i.element}))), i.selected && (t.metaKey || t.ctrlKey || i.startselected || (i.$element.removeClass("ui-selected"), i.selected = !1, i.$element.addClass("ui-unselecting"), i.unselecting = !0, s._trigger("unselecting", t, {unselecting:i.element})))));}), !1);}}, _mouseStop:function _mouseStop(t){var i=this;return (this.dragged = !1, e(".ui-unselecting", this.element[0]).each(function(){var s=e.data(this, "selectable-item");s.$element.removeClass("ui-unselecting"), s.unselecting = !1, s.startselected = !1, i._trigger("unselected", t, {unselected:s.element});}), e(".ui-selecting", this.element[0]).each(function(){var s=e.data(this, "selectable-item");s.$element.removeClass("ui-selecting").addClass("ui-selected"), s.selecting = !1, s.selected = !0, s.startselected = !0, i._trigger("selected", t, {selected:s.element});}), this._trigger("stop", t), this.helper.remove(), !1);}}), e.widget("ui.sortable", e.ui.mouse, {version:"1.11.4", widgetEventPrefix:"sort", ready:!1, options:{appendTo:"parent", axis:!1, connectWith:!1, containment:!1, cursor:"auto", cursorAt:!1, dropOnEmpty:!0, forcePlaceholderSize:!1, forceHelperSize:!1, grid:!1, handle:!1, helper:"original", items:"> *", opacity:!1, placeholder:!1, revert:!1, scroll:!0, scrollSensitivity:20, scrollSpeed:20, scope:"default", tolerance:"intersect", zIndex:1000, activate:null, beforeStop:null, change:null, deactivate:null, out:null, over:null, receive:null, remove:null, sort:null, start:null, stop:null, update:null}, _isOverAxis:function _isOverAxis(e, t, i){return e >= t && t + i > e;}, _isFloating:function _isFloating(e){return /left|right/.test(e.css("float")) || /inline|table-cell/.test(e.css("display"));}, _create:function _create(){this.containerCache = {}, this.element.addClass("ui-sortable"), this.refresh(), this.offset = this.element.offset(), this._mouseInit(), this._setHandleClassName(), this.ready = !0;}, _setOption:function _setOption(e, t){this._super(e, t), "handle" === e && this._setHandleClassName();}, _setHandleClassName:function _setHandleClassName(){this.element.find(".ui-sortable-handle").removeClass("ui-sortable-handle"), e.each(this.items, function(){(this.instance.options.handle?this.item.find(this.instance.options.handle):this.item).addClass("ui-sortable-handle");});}, _destroy:function _destroy(){this.element.removeClass("ui-sortable ui-sortable-disabled").find(".ui-sortable-handle").removeClass("ui-sortable-handle"), this._mouseDestroy();for(var e=this.items.length - 1; e >= 0; e--) this.items[e].item.removeData(this.widgetName + "-item");return this;}, _mouseCapture:function _mouseCapture(t, i){var s=null, n=!1, a=this;return this.reverting?!1:this.options.disabled || "static" === this.options.type?!1:(this._refreshItems(t), e(t.target).parents().each(function(){return e.data(this, a.widgetName + "-item") === a?(s = e(this), !1):void 0;}), e.data(t.target, a.widgetName + "-item") === a && (s = e(t.target)), s?!this.options.handle || i || (e(this.options.handle, s).find("*").addBack().each(function(){this === t.target && (n = !0);}), n)?(this.currentItem = s, this._removeCurrentsFromItems(), !0):!1:!1);}, _mouseStart:function _mouseStart(t, i, s){var n, a, o=this.options;if((this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(t), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {top:this.offset.top - this.margins.top, left:this.offset.left - this.margins.left}, e.extend(this.offset, {click:{left:t.pageX - this.offset.left, top:t.pageY - this.offset.top}, parent:this._getParentOffset(), relative:this._getRelativeOffset()}), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), this.originalPosition = this._generatePosition(t), this.originalPageX = t.pageX, this.originalPageY = t.pageY, o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt), this.domPosition = {prev:this.currentItem.prev()[0], parent:this.currentItem.parent()[0]}, this.helper[0] !== this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), o.containment && this._setContainment(), o.cursor && "auto" !== o.cursor && (a = this.document.find("body"), this.storedCursor = a.css("cursor"), a.css("cursor", o.cursor), this.storedStylesheet = e("<style>*{ cursor: " + o.cursor + " !important; }</style>").appendTo(a)), o.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", o.opacity)), o.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", o.zIndex)), this.scrollParent[0] !== this.document[0] && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", t, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), !s))for(n = this.containers.length - 1; n >= 0; n--) this.containers[n]._trigger("activate", t, this._uiHash(this));return (e.ui.ddmanager && (e.ui.ddmanager.current = this), e.ui.ddmanager && !o.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t), this.dragging = !0, this.helper.addClass("ui-sortable-helper"), this._mouseDrag(t), !0);}, _mouseDrag:function _mouseDrag(t){var i, s, n, a, o=this.options, r=!1;for(this.position = this._generatePosition(t), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll && (this.scrollParent[0] !== this.document[0] && "HTML" !== this.scrollParent[0].tagName?(this.overflowOffset.top + this.scrollParent[0].offsetHeight - t.pageY < o.scrollSensitivity?this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop + o.scrollSpeed:t.pageY - this.overflowOffset.top < o.scrollSensitivity && (this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop - o.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - t.pageX < o.scrollSensitivity?this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft + o.scrollSpeed:t.pageX - this.overflowOffset.left < o.scrollSensitivity && (this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft - o.scrollSpeed)):(t.pageY - this.document.scrollTop() < o.scrollSensitivity?r = this.document.scrollTop(this.document.scrollTop() - o.scrollSpeed):this.window.height() - (t.pageY - this.document.scrollTop()) < o.scrollSensitivity && (r = this.document.scrollTop(this.document.scrollTop() + o.scrollSpeed)), t.pageX - this.document.scrollLeft() < o.scrollSensitivity?r = this.document.scrollLeft(this.document.scrollLeft() - o.scrollSpeed):this.window.width() - (t.pageX - this.document.scrollLeft()) < o.scrollSensitivity && (r = this.document.scrollLeft(this.document.scrollLeft() + o.scrollSpeed))), r !== !1 && e.ui.ddmanager && !o.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t)), this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), i = this.items.length - 1; i >= 0; i--) if((s = this.items[i], n = s.item[0], a = this._intersectsWithPointer(s), a && s.instance === this.currentContainer && n !== this.currentItem[0] && this.placeholder[1 === a?"next":"prev"]()[0] !== n && !e.contains(this.placeholder[0], n) && ("semi-dynamic" === this.options.type?!e.contains(this.element[0], n):!0))){if((this.direction = 1 === a?"down":"up", "pointer" !== this.options.tolerance && !this._intersectsWithSides(s)))break;this._rearrange(t, s), this._trigger("change", t, this._uiHash());break;}return (this._contactContainers(t), e.ui.ddmanager && e.ui.ddmanager.drag(this, t), this._trigger("sort", t, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1);}, _mouseStop:function _mouseStop(t, i){if(t){if((e.ui.ddmanager && !this.options.dropBehaviour && e.ui.ddmanager.drop(this, t), this.options.revert)){var s=this, n=this.placeholder.offset(), a=this.options.axis, o={};a && "x" !== a || (o.left = n.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === this.document[0].body?0:this.offsetParent[0].scrollLeft)), a && "y" !== a || (o.top = n.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === this.document[0].body?0:this.offsetParent[0].scrollTop)), this.reverting = !0, e(this.helper).animate(o, parseInt(this.options.revert, 10) || 500, function(){s._clear(t);});}else this._clear(t, i);return !1;}}, cancel:function cancel(){if(this.dragging){this._mouseUp({target:null}), "original" === this.options.helper?this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper"):this.currentItem.show();for(var t=this.containers.length - 1; t >= 0; t--) this.containers[t]._trigger("deactivate", null, this._uiHash(this)), this.containers[t].containerCache.over && (this.containers[t]._trigger("out", null, this._uiHash(this)), this.containers[t].containerCache.over = 0);}return (this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), "original" !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), e.extend(this, {helper:null, dragging:!1, reverting:!1, _noFinalSort:null}), this.domPosition.prev?e(this.domPosition.prev).after(this.currentItem):e(this.domPosition.parent).prepend(this.currentItem)), this);}, serialize:function serialize(t){var i=this._getItemsAsjQuery(t && t.connected), s=[];return (t = t || {}, e(i).each(function(){var i=(e(t.item || this).attr(t.attribute || "id") || "").match(t.expression || /(.+)[\-=_](.+)/);i && s.push((t.key || i[1] + "[]") + "=" + (t.key && t.expression?i[1]:i[2]));}), !s.length && t.key && s.push(t.key + "="), s.join("&"));}, toArray:function toArray(t){var i=this._getItemsAsjQuery(t && t.connected), s=[];return (t = t || {}, i.each(function(){s.push(e(t.item || this).attr(t.attribute || "id") || "");}), s);}, _intersectsWith:function _intersectsWith(e){var t=this.positionAbs.left, i=t + this.helperProportions.width, s=this.positionAbs.top, n=s + this.helperProportions.height, a=e.left, o=a + e.width, r=e.top, h=r + e.height, l=this.offset.click.top, u=this.offset.click.left, d="x" === this.options.axis || s + l > r && h > s + l, c="y" === this.options.axis || t + u > a && o > t + u, p=d && c;return "pointer" === this.options.tolerance || this.options.forcePointerForContainers || "pointer" !== this.options.tolerance && this.helperProportions[this.floating?"width":"height"] > e[this.floating?"width":"height"]?p:t + this.helperProportions.width / 2 > a && o > i - this.helperProportions.width / 2 && s + this.helperProportions.height / 2 > r && h > n - this.helperProportions.height / 2;}, _intersectsWithPointer:function _intersectsWithPointer(e){var t="x" === this.options.axis || this._isOverAxis(this.positionAbs.top + this.offset.click.top, e.top, e.height), i="y" === this.options.axis || this._isOverAxis(this.positionAbs.left + this.offset.click.left, e.left, e.width), s=t && i, n=this._getDragVerticalDirection(), a=this._getDragHorizontalDirection();return s?this.floating?a && "right" === a || "down" === n?2:1:n && ("down" === n?2:1):!1;}, _intersectsWithSides:function _intersectsWithSides(e){var t=this._isOverAxis(this.positionAbs.top + this.offset.click.top, e.top + e.height / 2, e.height), i=this._isOverAxis(this.positionAbs.left + this.offset.click.left, e.left + e.width / 2, e.width), s=this._getDragVerticalDirection(), n=this._getDragHorizontalDirection();return this.floating && n?"right" === n && i || "left" === n && !i:s && ("down" === s && t || "up" === s && !t);}, _getDragVerticalDirection:function _getDragVerticalDirection(){var e=this.positionAbs.top - this.lastPositionAbs.top;return 0 !== e && (e > 0?"down":"up");}, _getDragHorizontalDirection:function _getDragHorizontalDirection(){var e=this.positionAbs.left - this.lastPositionAbs.left;return 0 !== e && (e > 0?"right":"left");}, refresh:function refresh(e){return (this._refreshItems(e), this._setHandleClassName(), this.refreshPositions(), this);}, _connectWith:function _connectWith(){var e=this.options;return e.connectWith.constructor === String?[e.connectWith]:e.connectWith;}, _getItemsAsjQuery:function _getItemsAsjQuery(t){function i(){r.push(this);}var s, n, a, o, r=[], h=[], l=this._connectWith();if(l && t)for(s = l.length - 1; s >= 0; s--) for(a = e(l[s], this.document[0]), n = a.length - 1; n >= 0; n--) o = e.data(a[n], this.widgetFullName), o && o !== this && !o.options.disabled && h.push([e.isFunction(o.options.items)?o.options.items.call(o.element):e(o.options.items, o.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), o]);for(h.push([e.isFunction(this.options.items)?this.options.items.call(this.element, null, {options:this.options, item:this.currentItem}):e(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]), s = h.length - 1; s >= 0; s--) h[s][0].each(i);return e(r);}, _removeCurrentsFromItems:function _removeCurrentsFromItems(){var t=this.currentItem.find(":data(" + this.widgetName + "-item)");this.items = e.grep(this.items, function(e){for(var i=0; t.length > i; i++) if(t[i] === e.item[0])return !1;return !0;});}, _refreshItems:function _refreshItems(t){this.items = [], this.containers = [this];var i, s, n, a, o, r, h, l, u=this.items, d=[[e.isFunction(this.options.items)?this.options.items.call(this.element[0], t, {item:this.currentItem}):e(this.options.items, this.element), this]], c=this._connectWith();if(c && this.ready)for(i = c.length - 1; i >= 0; i--) for(n = e(c[i], this.document[0]), s = n.length - 1; s >= 0; s--) a = e.data(n[s], this.widgetFullName), a && a !== this && !a.options.disabled && (d.push([e.isFunction(a.options.items)?a.options.items.call(a.element[0], t, {item:this.currentItem}):e(a.options.items, a.element), a]), this.containers.push(a));for(i = d.length - 1; i >= 0; i--) for(o = d[i][1], r = d[i][0], s = 0, l = r.length; l > s; s++) h = e(r[s]), h.data(this.widgetName + "-item", o), u.push({item:h, instance:o, width:0, height:0, left:0, top:0});}, refreshPositions:function refreshPositions(t){this.floating = this.items.length?"x" === this.options.axis || this._isFloating(this.items[0].item):!1, this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());var i, s, n, a;for(i = this.items.length - 1; i >= 0; i--) s = this.items[i], s.instance !== this.currentContainer && this.currentContainer && s.item[0] !== this.currentItem[0] || (n = this.options.toleranceElement?e(this.options.toleranceElement, s.item):s.item, t || (s.width = n.outerWidth(), s.height = n.outerHeight()), a = n.offset(), s.left = a.left, s.top = a.top);if(this.options.custom && this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this);else for(i = this.containers.length - 1; i >= 0; i--) a = this.containers[i].element.offset(), this.containers[i].containerCache.left = a.left, this.containers[i].containerCache.top = a.top, this.containers[i].containerCache.width = this.containers[i].element.outerWidth(), this.containers[i].containerCache.height = this.containers[i].element.outerHeight();return this;}, _createPlaceholder:function _createPlaceholder(t){t = t || this;var i, s=t.options;s.placeholder && s.placeholder.constructor !== String || (i = s.placeholder, s.placeholder = {element:function element(){var s=t.currentItem[0].nodeName.toLowerCase(), n=e("<" + s + ">", t.document[0]).addClass(i || t.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper");return ("tbody" === s?t._createTrPlaceholder(t.currentItem.find("tr").eq(0), e("<tr>", t.document[0]).appendTo(n)):"tr" === s?t._createTrPlaceholder(t.currentItem, n):"img" === s && n.attr("src", t.currentItem.attr("src")), i || n.css("visibility", "hidden"), n);}, update:function update(e, n){(!i || s.forcePlaceholderSize) && (n.height() || n.height(t.currentItem.innerHeight() - parseInt(t.currentItem.css("paddingTop") || 0, 10) - parseInt(t.currentItem.css("paddingBottom") || 0, 10)), n.width() || n.width(t.currentItem.innerWidth() - parseInt(t.currentItem.css("paddingLeft") || 0, 10) - parseInt(t.currentItem.css("paddingRight") || 0, 10)));}}), t.placeholder = e(s.placeholder.element.call(t.element, t.currentItem)), t.currentItem.after(t.placeholder), s.placeholder.update(t, t.placeholder);}, _createTrPlaceholder:function _createTrPlaceholder(t, i){var s=this;t.children().each(function(){e("<td>&#160;</td>", s.document[0]).attr("colspan", e(this).attr("colspan") || 1).appendTo(i);});}, _contactContainers:function _contactContainers(t){var i, s, n, a, o, r, h, l, u, d, c=null, p=null;for(i = this.containers.length - 1; i >= 0; i--) if(!e.contains(this.currentItem[0], this.containers[i].element[0]))if(this._intersectsWith(this.containers[i].containerCache)){if(c && e.contains(this.containers[i].element[0], c.element[0]))continue;c = this.containers[i], p = i;}else this.containers[i].containerCache.over && (this.containers[i]._trigger("out", t, this._uiHash(this)), this.containers[i].containerCache.over = 0);if(c)if(1 === this.containers.length)this.containers[p].containerCache.over || (this.containers[p]._trigger("over", t, this._uiHash(this)), this.containers[p].containerCache.over = 1);else {for(n = 10000, a = null, u = c.floating || this._isFloating(this.currentItem), o = u?"left":"top", r = u?"width":"height", d = u?"clientX":"clientY", s = this.items.length - 1; s >= 0; s--) e.contains(this.containers[p].element[0], this.items[s].item[0]) && this.items[s].item[0] !== this.currentItem[0] && (h = this.items[s].item.offset()[o], l = !1, t[d] - h > this.items[s][r] / 2 && (l = !0), n > Math.abs(t[d] - h) && (n = Math.abs(t[d] - h), a = this.items[s], this.direction = l?"up":"down"));if(!a && !this.options.dropOnEmpty){return;}if(this.currentContainer === this.containers[p]){return (this.currentContainer.containerCache.over || (this.containers[p]._trigger("over", t, this._uiHash()), this.currentContainer.containerCache.over = 1), void 0);}a?this._rearrange(t, a, null, !0):this._rearrange(t, null, this.containers[p].element, !0), this._trigger("change", t, this._uiHash()), this.containers[p]._trigger("change", t, this._uiHash(this)), this.currentContainer = this.containers[p], this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[p]._trigger("over", t, this._uiHash(this)), this.containers[p].containerCache.over = 1;}}, _createHelper:function _createHelper(t){var i=this.options, s=e.isFunction(i.helper)?e(i.helper.apply(this.element[0], [t, this.currentItem])):"clone" === i.helper?this.currentItem.clone():this.currentItem;return (s.parents("body").length || e("parent" !== i.appendTo?i.appendTo:this.currentItem[0].parentNode)[0].appendChild(s[0]), s[0] === this.currentItem[0] && (this._storedCSS = {width:this.currentItem[0].style.width, height:this.currentItem[0].style.height, position:this.currentItem.css("position"), top:this.currentItem.css("top"), left:this.currentItem.css("left")}), (!s[0].style.width || i.forceHelperSize) && s.width(this.currentItem.width()), (!s[0].style.height || i.forceHelperSize) && s.height(this.currentItem.height()), s);}, _adjustOffsetFromHelper:function _adjustOffsetFromHelper(t){"string" == typeof t && (t = t.split(" ")), e.isArray(t) && (t = {left:+t[0], top:+t[1] || 0}), "left" in t && (this.offset.click.left = t.left + this.margins.left), "right" in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left), "top" in t && (this.offset.click.top = t.top + this.margins.top), "bottom" in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top);}, _getParentOffset:function _getParentOffset(){this.offsetParent = this.helper.offsetParent();var t=this.offsetParent.offset();return ("absolute" === this.cssPosition && this.scrollParent[0] !== this.document[0] && e.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(), t.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === this.document[0].body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && e.ui.ie) && (t = {top:0, left:0}), {top:t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0), left:t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)});}, _getRelativeOffset:function _getRelativeOffset(){if("relative" === this.cssPosition){var e=this.currentItem.position();return {top:e.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(), left:e.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()};}return {top:0, left:0};}, _cacheMargins:function _cacheMargins(){this.margins = {left:parseInt(this.currentItem.css("marginLeft"), 10) || 0, top:parseInt(this.currentItem.css("marginTop"), 10) || 0};}, _cacheHelperProportions:function _cacheHelperProportions(){this.helperProportions = {width:this.helper.outerWidth(), height:this.helper.outerHeight()};}, _setContainment:function _setContainment(){var t, i, s, n=this.options;"parent" === n.containment && (n.containment = this.helper[0].parentNode), ("document" === n.containment || "window" === n.containment) && (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, "document" === n.containment?this.document.width():this.window.width() - this.helperProportions.width - this.margins.left, ("document" === n.containment?this.document.width():this.window.height() || this.document[0].body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]), /^(document|window|parent)$/.test(n.containment) || (t = e(n.containment)[0], i = e(n.containment).offset(), s = "hidden" !== e(t).css("overflow"), this.containment = [i.left + (parseInt(e(t).css("borderLeftWidth"), 10) || 0) + (parseInt(e(t).css("paddingLeft"), 10) || 0) - this.margins.left, i.top + (parseInt(e(t).css("borderTopWidth"), 10) || 0) + (parseInt(e(t).css("paddingTop"), 10) || 0) - this.margins.top, i.left + (s?Math.max(t.scrollWidth, t.offsetWidth):t.offsetWidth) - (parseInt(e(t).css("borderLeftWidth"), 10) || 0) - (parseInt(e(t).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, i.top + (s?Math.max(t.scrollHeight, t.offsetHeight):t.offsetHeight) - (parseInt(e(t).css("borderTopWidth"), 10) || 0) - (parseInt(e(t).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]);}, _convertPositionTo:function _convertPositionTo(t, i){i || (i = this.position);var s="absolute" === t?1:-1, n="absolute" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && e.contains(this.scrollParent[0], this.offsetParent[0])?this.scrollParent:this.offsetParent, a=/(html|body)/i.test(n[0].tagName);return {top:i.top + this.offset.relative.top * s + this.offset.parent.top * s - ("fixed" === this.cssPosition?-this.scrollParent.scrollTop():a?0:n.scrollTop()) * s, left:i.left + this.offset.relative.left * s + this.offset.parent.left * s - ("fixed" === this.cssPosition?-this.scrollParent.scrollLeft():a?0:n.scrollLeft()) * s};}, _generatePosition:function _generatePosition(t){var i, s, n=this.options, a=t.pageX, o=t.pageY, r="absolute" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && e.contains(this.scrollParent[0], this.offsetParent[0])?this.scrollParent:this.offsetParent, h=/(html|body)/i.test(r[0].tagName);return ("relative" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()), this.originalPosition && (this.containment && (t.pageX - this.offset.click.left < this.containment[0] && (a = this.containment[0] + this.offset.click.left), t.pageY - this.offset.click.top < this.containment[1] && (o = this.containment[1] + this.offset.click.top), t.pageX - this.offset.click.left > this.containment[2] && (a = this.containment[2] + this.offset.click.left), t.pageY - this.offset.click.top > this.containment[3] && (o = this.containment[3] + this.offset.click.top)), n.grid && (i = this.originalPageY + Math.round((o - this.originalPageY) / n.grid[1]) * n.grid[1], o = this.containment?i - this.offset.click.top >= this.containment[1] && i - this.offset.click.top <= this.containment[3]?i:i - this.offset.click.top >= this.containment[1]?i - n.grid[1]:i + n.grid[1]:i, s = this.originalPageX + Math.round((a - this.originalPageX) / n.grid[0]) * n.grid[0], a = this.containment?s - this.offset.click.left >= this.containment[0] && s - this.offset.click.left <= this.containment[2]?s:s - this.offset.click.left >= this.containment[0]?s - n.grid[0]:s + n.grid[0]:s)), {top:o - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition?-this.scrollParent.scrollTop():h?0:r.scrollTop()), left:a - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition?-this.scrollParent.scrollLeft():h?0:r.scrollLeft())});}, _rearrange:function _rearrange(e, t, i, s){i?i[0].appendChild(this.placeholder[0]):t.item[0].parentNode.insertBefore(this.placeholder[0], "down" === this.direction?t.item[0]:t.item[0].nextSibling), this.counter = this.counter?++this.counter:1;var n=this.counter;this._delay(function(){n === this.counter && this.refreshPositions(!s);});}, _clear:function _clear(e, t){function i(e, t, i){return function(s){i._trigger(e, s, t._uiHash(t));};}this.reverting = !1;var s, n=[];if((!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null, this.helper[0] === this.currentItem[0])){for(s in this._storedCSS) ("auto" === this._storedCSS[s] || "static" === this._storedCSS[s]) && (this._storedCSS[s] = "");this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper");}else this.currentItem.show();for(this.fromOutside && !t && n.push(function(e){this._trigger("receive", e, this._uiHash(this.fromOutside));}), !this.fromOutside && this.domPosition.prev === this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent === this.currentItem.parent()[0] || t || n.push(function(e){this._trigger("update", e, this._uiHash());}), this !== this.currentContainer && (t || (n.push(function(e){this._trigger("remove", e, this._uiHash());}), n.push((function(e){return function(t){e._trigger("receive", t, this._uiHash(this));};}).call(this, this.currentContainer)), n.push((function(e){return function(t){e._trigger("update", t, this._uiHash(this));};}).call(this, this.currentContainer)))), s = this.containers.length - 1; s >= 0; s--) t || n.push(i("deactivate", this, this.containers[s])), this.containers[s].containerCache.over && (n.push(i("out", this, this.containers[s])), this.containers[s].containerCache.over = 0);if((this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor), this.storedStylesheet.remove()), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", "auto" === this._storedZIndex?"":this._storedZIndex), this.dragging = !1, t || this._trigger("beforeStop", e, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.cancelHelperRemoval || (this.helper[0] !== this.currentItem[0] && this.helper.remove(), this.helper = null), !t)){for(s = 0; n.length > s; s++) n[s].call(this, e);this._trigger("stop", e, this._uiHash());}return (this.fromOutside = !1, !this.cancelHelperRemoval);}, _trigger:function _trigger(){e.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel();}, _uiHash:function _uiHash(t){var i=t || this;return {helper:i.helper, placeholder:i.placeholder || e([]), position:i.position, originalPosition:i.originalPosition, offset:i.positionAbs, item:i.currentItem, sender:t?t.element:null};}}), e.widget("ui.accordion", {version:"1.11.4", options:{active:0, animate:{}, collapsible:!1, event:"click", header:"> li > :first-child,> :not(li):even", heightStyle:"auto", icons:{activeHeader:"ui-icon-triangle-1-s", header:"ui-icon-triangle-1-e"}, activate:null, beforeActivate:null}, hideProps:{borderTopWidth:"hide", borderBottomWidth:"hide", paddingTop:"hide", paddingBottom:"hide", height:"hide"}, showProps:{borderTopWidth:"show", borderBottomWidth:"show", paddingTop:"show", paddingBottom:"show", height:"show"}, _create:function _create(){var t=this.options;this.prevShow = this.prevHide = e(), this.element.addClass("ui-accordion ui-widget ui-helper-reset").attr("role", "tablist"), t.collapsible || t.active !== !1 && null != t.active || (t.active = 0), this._processPanels(), 0 > t.active && (t.active += this.headers.length), this._refresh();}, _getCreateEventData:function _getCreateEventData(){return {header:this.active, panel:this.active.length?this.active.next():e()};}, _createIcons:function _createIcons(){var t=this.options.icons;t && (e("<span>").addClass("ui-accordion-header-icon ui-icon " + t.header).prependTo(this.headers), this.active.children(".ui-accordion-header-icon").removeClass(t.header).addClass(t.activeHeader), this.headers.addClass("ui-accordion-icons"));}, _destroyIcons:function _destroyIcons(){this.headers.removeClass("ui-accordion-icons").children(".ui-accordion-header-icon").remove();}, _destroy:function _destroy(){var e;this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"), this.headers.removeClass("ui-accordion-header ui-accordion-header-active ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("aria-controls").removeAttr("tabIndex").removeUniqueId(), this._destroyIcons(), e = this.headers.next().removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled").css("display", "").removeAttr("role").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeUniqueId(), "content" !== this.options.heightStyle && e.css("height", "");}, _setOption:function _setOption(e, t){return "active" === e?(this._activate(t), void 0):("event" === e && (this.options.event && this._off(this.headers, this.options.event), this._setupEvents(t)), this._super(e, t), "collapsible" !== e || t || this.options.active !== !1 || this._activate(0), "icons" === e && (this._destroyIcons(), t && this._createIcons()), "disabled" === e && (this.element.toggleClass("ui-state-disabled", !!t).attr("aria-disabled", t), this.headers.add(this.headers.next()).toggleClass("ui-state-disabled", !!t)), void 0);}, _keydown:function _keydown(t){if(!t.altKey && !t.ctrlKey){var i=e.ui.keyCode, s=this.headers.length, n=this.headers.index(t.target), a=!1;switch(t.keyCode){case i.RIGHT:case i.DOWN:a = this.headers[(n + 1) % s];break;case i.LEFT:case i.UP:a = this.headers[(n - 1 + s) % s];break;case i.SPACE:case i.ENTER:this._eventHandler(t);break;case i.HOME:a = this.headers[0];break;case i.END:a = this.headers[s - 1];}a && (e(t.target).attr("tabIndex", -1), e(a).attr("tabIndex", 0), a.focus(), t.preventDefault());}}, _panelKeyDown:function _panelKeyDown(t){t.keyCode === e.ui.keyCode.UP && t.ctrlKey && e(t.currentTarget).prev().focus();}, refresh:function refresh(){var t=this.options;this._processPanels(), t.active === !1 && t.collapsible === !0 || !this.headers.length?(t.active = !1, this.active = e()):t.active === !1?this._activate(0):this.active.length && !e.contains(this.element[0], this.active[0])?this.headers.length === this.headers.find(".ui-state-disabled").length?(t.active = !1, this.active = e()):this._activate(Math.max(0, t.active - 1)):t.active = this.headers.index(this.active), this._destroyIcons(), this._refresh();}, _processPanels:function _processPanels(){var e=this.headers, t=this.panels;this.headers = this.element.find(this.options.header).addClass("ui-accordion-header ui-state-default ui-corner-all"), this.panels = this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").filter(":not(.ui-accordion-content-active)").hide(), t && (this._off(e.not(this.headers)), this._off(t.not(this.panels)));}, _refresh:function _refresh(){var t, i=this.options, s=i.heightStyle, n=this.element.parent();this.active = this._findActive(i.active).addClass("ui-accordion-header-active ui-state-active ui-corner-top").removeClass("ui-corner-all"), this.active.next().addClass("ui-accordion-content-active").show(), this.headers.attr("role", "tab").each(function(){var t=e(this), i=t.uniqueId().attr("id"), s=t.next(), n=s.uniqueId().attr("id");t.attr("aria-controls", n), s.attr("aria-labelledby", i);}).next().attr("role", "tabpanel"), this.headers.not(this.active).attr({"aria-selected":"false", "aria-expanded":"false", tabIndex:-1}).next().attr({"aria-hidden":"true"}).hide(), this.active.length?this.active.attr({"aria-selected":"true", "aria-expanded":"true", tabIndex:0}).next().attr({"aria-hidden":"false"}):this.headers.eq(0).attr("tabIndex", 0), this._createIcons(), this._setupEvents(i.event), "fill" === s?(t = n.height(), this.element.siblings(":visible").each(function(){var i=e(this), s=i.css("position");"absolute" !== s && "fixed" !== s && (t -= i.outerHeight(!0));}), this.headers.each(function(){t -= e(this).outerHeight(!0);}), this.headers.next().each(function(){e(this).height(Math.max(0, t - e(this).innerHeight() + e(this).height()));}).css("overflow", "auto")):"auto" === s && (t = 0, this.headers.next().each(function(){t = Math.max(t, e(this).css("height", "").height());}).height(t));}, _activate:function _activate(t){var i=this._findActive(t)[0];i !== this.active[0] && (i = i || this.active[0], this._eventHandler({target:i, currentTarget:i, preventDefault:e.noop}));}, _findActive:function _findActive(t){return "number" == typeof t?this.headers.eq(t):e();}, _setupEvents:function _setupEvents(t){var i={keydown:"_keydown"};t && e.each(t.split(" "), function(e, t){i[t] = "_eventHandler";}), this._off(this.headers.add(this.headers.next())), this._on(this.headers, i), this._on(this.headers.next(), {keydown:"_panelKeyDown"}), this._hoverable(this.headers), this._focusable(this.headers);}, _eventHandler:function _eventHandler(t){var i=this.options, s=this.active, n=e(t.currentTarget), a=n[0] === s[0], o=a && i.collapsible, r=o?e():n.next(), h=s.next(), l={oldHeader:s, oldPanel:h, newHeader:o?e():n, newPanel:r};t.preventDefault(), a && !i.collapsible || this._trigger("beforeActivate", t, l) === !1 || (i.active = o?!1:this.headers.index(n), this.active = a?e():n, this._toggle(l), s.removeClass("ui-accordion-header-active ui-state-active"), i.icons && s.children(".ui-accordion-header-icon").removeClass(i.icons.activeHeader).addClass(i.icons.header), a || (n.removeClass("ui-corner-all").addClass("ui-accordion-header-active ui-state-active ui-corner-top"), i.icons && n.children(".ui-accordion-header-icon").removeClass(i.icons.header).addClass(i.icons.activeHeader), n.next().addClass("ui-accordion-content-active")));}, _toggle:function _toggle(t){var i=t.newPanel, s=this.prevShow.length?this.prevShow:t.oldPanel;this.prevShow.add(this.prevHide).stop(!0, !0), this.prevShow = i, this.prevHide = s, this.options.animate?this._animate(i, s, t):(s.hide(), i.show(), this._toggleComplete(t)), s.attr({"aria-hidden":"true"}), s.prev().attr({"aria-selected":"false", "aria-expanded":"false"}), i.length && s.length?s.prev().attr({tabIndex:-1, "aria-expanded":"false"}):i.length && this.headers.filter(function(){return 0 === parseInt(e(this).attr("tabIndex"), 10);}).attr("tabIndex", -1), i.attr("aria-hidden", "false").prev().attr({"aria-selected":"true", "aria-expanded":"true", tabIndex:0});}, _animate:function _animate(e, t, i){var s, n, a, o=this, r=0, h=e.css("box-sizing"), l=e.length && (!t.length || e.index() < t.index()), u=this.options.animate || {}, d=l && u.down || u, c=function c(){o._toggleComplete(i);};return ("number" == typeof d && (a = d), "string" == typeof d && (n = d), n = n || d.easing || u.easing, a = a || d.duration || u.duration, t.length?e.length?(s = e.show().outerHeight(), t.animate(this.hideProps, {duration:a, easing:n, step:function step(e, t){t.now = Math.round(e);}}), e.hide().animate(this.showProps, {duration:a, easing:n, complete:c, step:function step(e, i){i.now = Math.round(e), "height" !== i.prop?"content-box" === h && (r += i.now):"content" !== o.options.heightStyle && (i.now = Math.round(s - t.outerHeight() - r), r = 0);}}), void 0):t.animate(this.hideProps, a, n, c):e.animate(this.showProps, a, n, c));}, _toggleComplete:function _toggleComplete(e){var t=e.oldPanel;t.removeClass("ui-accordion-content-active").prev().removeClass("ui-corner-top").addClass("ui-corner-all"), t.length && (t.parent()[0].className = t.parent()[0].className), this._trigger("activate", null, e);}}), e.widget("ui.menu", {version:"1.11.4", defaultElement:"<ul>", delay:300, options:{icons:{submenu:"ui-icon-carat-1-e"}, items:"> *", menus:"ul", position:{my:"left-1 top", at:"right top"}, role:"menu", blur:null, focus:null, select:null}, _create:function _create(){this.activeMenu = this.element, this.mouseHandled = !1, this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content").toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length).attr({role:this.options.role, tabIndex:0}), this.options.disabled && this.element.addClass("ui-state-disabled").attr("aria-disabled", "true"), this._on({"mousedown .ui-menu-item":function mousedownUiMenuItem(e){e.preventDefault();}, "click .ui-menu-item":function clickUiMenuItem(t){var i=e(t.target);!this.mouseHandled && i.not(".ui-state-disabled").length && (this.select(t), t.isPropagationStopped() || (this.mouseHandled = !0), i.has(".ui-menu").length?this.expand(t):!this.element.is(":focus") && e(this.document[0].activeElement).closest(".ui-menu").length && (this.element.trigger("focus", [!0]), this.active && 1 === this.active.parents(".ui-menu").length && clearTimeout(this.timer)));}, "mouseenter .ui-menu-item":function mouseenterUiMenuItem(t){if(!this.previousFilter){var i=e(t.currentTarget);i.siblings(".ui-state-active").removeClass("ui-state-active"), this.focus(t, i);}}, mouseleave:"collapseAll", "mouseleave .ui-menu":"collapseAll", focus:function focus(e, t){var i=this.active || this.element.find(this.options.items).eq(0);t || this.focus(e, i);}, blur:function blur(t){this._delay(function(){e.contains(this.element[0], this.document[0].activeElement) || this.collapseAll(t);});}, keydown:"_keydown"}), this.refresh(), this._on(this.document, {click:function click(e){this._closeOnDocumentClick(e) && this.collapseAll(e), this.mouseHandled = !1;}});}, _destroy:function _destroy(){this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-menu-icons ui-front").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(), this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").removeUniqueId().removeClass("ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function(){var t=e(this);t.data("ui-menu-submenu-carat") && t.remove();}), this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content");}, _keydown:function _keydown(t){var i, s, n, a, o=!0;switch(t.keyCode){case e.ui.keyCode.PAGE_UP:this.previousPage(t);break;case e.ui.keyCode.PAGE_DOWN:this.nextPage(t);break;case e.ui.keyCode.HOME:this._move("first", "first", t);break;case e.ui.keyCode.END:this._move("last", "last", t);break;case e.ui.keyCode.UP:this.previous(t);break;case e.ui.keyCode.DOWN:this.next(t);break;case e.ui.keyCode.LEFT:this.collapse(t);break;case e.ui.keyCode.RIGHT:this.active && !this.active.is(".ui-state-disabled") && this.expand(t);break;case e.ui.keyCode.ENTER:case e.ui.keyCode.SPACE:this._activate(t);break;case e.ui.keyCode.ESCAPE:this.collapse(t);break;default:o = !1, s = this.previousFilter || "", n = String.fromCharCode(t.keyCode), a = !1, clearTimeout(this.filterTimer), n === s?a = !0:n = s + n, i = this._filterMenuItems(n), i = a && -1 !== i.index(this.active.next())?this.active.nextAll(".ui-menu-item"):i, i.length || (n = String.fromCharCode(t.keyCode), i = this._filterMenuItems(n)), i.length?(this.focus(t, i), this.previousFilter = n, this.filterTimer = this._delay(function(){delete this.previousFilter;}, 1000)):delete this.previousFilter;}o && t.preventDefault();}, _activate:function _activate(e){this.active.is(".ui-state-disabled") || (this.active.is("[aria-haspopup='true']")?this.expand(e):this.select(e));}, refresh:function refresh(){var t, i, s=this, n=this.options.icons.submenu, a=this.element.find(this.options.menus);this.element.toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length), a.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-front").hide().attr({role:this.options.role, "aria-hidden":"true", "aria-expanded":"false"}).each(function(){var t=e(this), i=t.parent(), s=e("<span>").addClass("ui-menu-icon ui-icon " + n).data("ui-menu-submenu-carat", !0);i.attr("aria-haspopup", "true").prepend(s), t.attr("aria-labelledby", i.attr("id"));}), t = a.add(this.element), i = t.find(this.options.items), i.not(".ui-menu-item").each(function(){var t=e(this);s._isDivider(t) && t.addClass("ui-widget-content ui-menu-divider");}), i.not(".ui-menu-item, .ui-menu-divider").addClass("ui-menu-item").uniqueId().attr({tabIndex:-1, role:this._itemRole()}), i.filter(".ui-state-disabled").attr("aria-disabled", "true"), this.active && !e.contains(this.element[0], this.active[0]) && this.blur();}, _itemRole:function _itemRole(){return ({menu:"menuitem", listbox:"option"})[this.options.role];}, _setOption:function _setOption(e, t){"icons" === e && this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(t.submenu), "disabled" === e && this.element.toggleClass("ui-state-disabled", !!t).attr("aria-disabled", t), this._super(e, t);}, focus:function focus(e, t){var i, s;this.blur(e, e && "focus" === e.type), this._scrollIntoView(t), this.active = t.first(), s = this.active.addClass("ui-state-focus").removeClass("ui-state-active"), this.options.role && this.element.attr("aria-activedescendant", s.attr("id")), this.active.parent().closest(".ui-menu-item").addClass("ui-state-active"), e && "keydown" === e.type?this._close():this.timer = this._delay(function(){this._close();}, this.delay), i = t.children(".ui-menu"), i.length && e && /^mouse/.test(e.type) && this._startOpening(i), this.activeMenu = t.parent(), this._trigger("focus", e, {item:t});}, _scrollIntoView:function _scrollIntoView(t){var i, s, n, a, o, r;this._hasScroll() && (i = parseFloat(e.css(this.activeMenu[0], "borderTopWidth")) || 0, s = parseFloat(e.css(this.activeMenu[0], "paddingTop")) || 0, n = t.offset().top - this.activeMenu.offset().top - i - s, a = this.activeMenu.scrollTop(), o = this.activeMenu.height(), r = t.outerHeight(), 0 > n?this.activeMenu.scrollTop(a + n):n + r > o && this.activeMenu.scrollTop(a + n - o + r));}, blur:function blur(e, t){t || clearTimeout(this.timer), this.active && (this.active.removeClass("ui-state-focus"), this.active = null, this._trigger("blur", e, {item:this.active}));}, _startOpening:function _startOpening(e){clearTimeout(this.timer), "true" === e.attr("aria-hidden") && (this.timer = this._delay(function(){this._close(), this._open(e);}, this.delay));}, _open:function _open(t){var i=e.extend({of:this.active}, this.options.position);clearTimeout(this.timer), this.element.find(".ui-menu").not(t.parents(".ui-menu")).hide().attr("aria-hidden", "true"), t.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(i);}, collapseAll:function collapseAll(t, i){clearTimeout(this.timer), this.timer = this._delay(function(){var s=i?this.element:e(t && t.target).closest(this.element.find(".ui-menu"));s.length || (s = this.element), this._close(s), this.blur(t), this.activeMenu = s;}, this.delay);}, _close:function _close(e){e || (e = this.active?this.active.parent():this.element), e.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find(".ui-state-active").not(".ui-state-focus").removeClass("ui-state-active");}, _closeOnDocumentClick:function _closeOnDocumentClick(t){return !e(t.target).closest(".ui-menu").length;}, _isDivider:function _isDivider(e){return !/[^\-\u2014\u2013\s]/.test(e.text());}, collapse:function collapse(e){var t=this.active && this.active.parent().closest(".ui-menu-item", this.element);t && t.length && (this._close(), this.focus(e, t));}, expand:function expand(e){var t=this.active && this.active.children(".ui-menu ").find(this.options.items).first();t && t.length && (this._open(t.parent()), this._delay(function(){this.focus(e, t);}));}, next:function next(e){this._move("next", "first", e);}, previous:function previous(e){this._move("prev", "last", e);}, isFirstItem:function isFirstItem(){return this.active && !this.active.prevAll(".ui-menu-item").length;}, isLastItem:function isLastItem(){return this.active && !this.active.nextAll(".ui-menu-item").length;}, _move:function _move(e, t, i){var s;this.active && (s = "first" === e || "last" === e?this.active["first" === e?"prevAll":"nextAll"](".ui-menu-item").eq(-1):this.active[e + "All"](".ui-menu-item").eq(0)), s && s.length && this.active || (s = this.activeMenu.find(this.options.items)[t]()), this.focus(i, s);}, nextPage:function nextPage(t){var i, s, n;return this.active?(this.isLastItem() || (this._hasScroll()?(s = this.active.offset().top, n = this.element.height(), this.active.nextAll(".ui-menu-item").each(function(){return (i = e(this), 0 > i.offset().top - s - n);}), this.focus(t, i)):this.focus(t, this.activeMenu.find(this.options.items)[this.active?"last":"first"]())), void 0):(this.next(t), void 0);}, previousPage:function previousPage(t){var i, s, n;return this.active?(this.isFirstItem() || (this._hasScroll()?(s = this.active.offset().top, n = this.element.height(), this.active.prevAll(".ui-menu-item").each(function(){return (i = e(this), i.offset().top - s + n > 0);}), this.focus(t, i)):this.focus(t, this.activeMenu.find(this.options.items).first())), void 0):(this.next(t), void 0);}, _hasScroll:function _hasScroll(){return this.element.outerHeight() < this.element.prop("scrollHeight");}, select:function select(t){this.active = this.active || e(t.target).closest(".ui-menu-item");var i={item:this.active};this.active.has(".ui-menu").length || this.collapseAll(t, !0), this._trigger("select", t, i);}, _filterMenuItems:function _filterMenuItems(t){var i=t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"), s=RegExp("^" + i, "i");return this.activeMenu.find(this.options.items).filter(".ui-menu-item").filter(function(){return s.test(e.trim(e(this).text()));});}}), e.widget("ui.autocomplete", {version:"1.11.4", defaultElement:"<input>", options:{appendTo:null, autoFocus:!1, delay:300, minLength:1, position:{my:"left top", at:"left bottom", collision:"none"}, source:null, change:null, close:null, focus:null, open:null, response:null, search:null, select:null}, requestIndex:0, pending:0, _create:function _create(){var t, i, s, n=this.element[0].nodeName.toLowerCase(), a="textarea" === n, o="input" === n;this.isMultiLine = a?!0:o?!1:this.element.prop("isContentEditable"), this.valueMethod = this.element[a || o?"val":"text"], this.isNewMenu = !0, this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off"), this._on(this.element, {keydown:function keydown(n){if(this.element.prop("readOnly")){return (t = !0, s = !0, i = !0, void 0);}t = !1, s = !1, i = !1;var a=e.ui.keyCode;switch(n.keyCode){case a.PAGE_UP:t = !0, this._move("previousPage", n);break;case a.PAGE_DOWN:t = !0, this._move("nextPage", n);break;case a.UP:t = !0, this._keyEvent("previous", n);break;case a.DOWN:t = !0, this._keyEvent("next", n);break;case a.ENTER:this.menu.active && (t = !0, n.preventDefault(), this.menu.select(n));break;case a.TAB:this.menu.active && this.menu.select(n);break;case a.ESCAPE:this.menu.element.is(":visible") && (this.isMultiLine || this._value(this.term), this.close(n), n.preventDefault());break;default:i = !0, this._searchTimeout(n);}}, keypress:function keypress(s){if(t){return (t = !1, (!this.isMultiLine || this.menu.element.is(":visible")) && s.preventDefault(), void 0);}if(!i){var n=e.ui.keyCode;switch(s.keyCode){case n.PAGE_UP:this._move("previousPage", s);break;case n.PAGE_DOWN:this._move("nextPage", s);break;case n.UP:this._keyEvent("previous", s);break;case n.DOWN:this._keyEvent("next", s);}}}, input:function input(e){return s?(s = !1, e.preventDefault(), void 0):(this._searchTimeout(e), void 0);}, focus:function focus(){this.selectedItem = null, this.previous = this._value();}, blur:function blur(e){return this.cancelBlur?(delete this.cancelBlur, void 0):(clearTimeout(this.searching), this.close(e), this._change(e), void 0);}}), this._initSource(), this.menu = e("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({role:null}).hide().menu("instance"), this._on(this.menu.element, {mousedown:function mousedown(t){t.preventDefault(), this.cancelBlur = !0, this._delay(function(){delete this.cancelBlur;});var i=this.menu.element[0];e(t.target).closest(".ui-menu-item").length || this._delay(function(){var t=this;this.document.one("mousedown", function(s){s.target === t.element[0] || s.target === i || e.contains(i, s.target) || t.close();});});}, menufocus:function menufocus(t, i){var s, n;return this.isNewMenu && (this.isNewMenu = !1, t.originalEvent && /^mouse/.test(t.originalEvent.type))?(this.menu.blur(), this.document.one("mousemove", function(){e(t.target).trigger(t.originalEvent);}), void 0):(n = i.item.data("ui-autocomplete-item"), !1 !== this._trigger("focus", t, {item:n}) && t.originalEvent && /^key/.test(t.originalEvent.type) && this._value(n.value), s = i.item.attr("aria-label") || n.value, s && e.trim(s).length && (this.liveRegion.children().hide(), e("<div>").text(s).appendTo(this.liveRegion)), void 0);}, menuselect:function menuselect(e, t){var i=t.item.data("ui-autocomplete-item"), s=this.previous;this.element[0] !== this.document[0].activeElement && (this.element.focus(), this.previous = s, this._delay(function(){this.previous = s, this.selectedItem = i;})), !1 !== this._trigger("select", e, {item:i}) && this._value(i.value), this.term = this._value(), this.close(e), this.selectedItem = i;}}), this.liveRegion = e("<span>", {role:"status", "aria-live":"assertive", "aria-relevant":"additions"}).addClass("ui-helper-hidden-accessible").appendTo(this.document[0].body), this._on(this.window, {beforeunload:function beforeunload(){this.element.removeAttr("autocomplete");}});}, _destroy:function _destroy(){clearTimeout(this.searching), this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"), this.menu.element.remove(), this.liveRegion.remove();}, _setOption:function _setOption(e, t){this._super(e, t), "source" === e && this._initSource(), "appendTo" === e && this.menu.element.appendTo(this._appendTo()), "disabled" === e && t && this.xhr && this.xhr.abort();}, _appendTo:function _appendTo(){var t=this.options.appendTo;return (t && (t = t.jquery || t.nodeType?e(t):this.document.find(t).eq(0)), t && t[0] || (t = this.element.closest(".ui-front")), t.length || (t = this.document[0].body), t);}, _initSource:function _initSource(){var t, i, s=this;e.isArray(this.options.source)?(t = this.options.source, this.source = function(i, s){s(e.ui.autocomplete.filter(t, i.term));}):"string" == typeof this.options.source?(i = this.options.source, this.source = function(t, n){s.xhr && s.xhr.abort(), s.xhr = e.ajax({url:i, data:t, dataType:"json", success:function success(e){n(e);}, error:function error(){n([]);}});}):this.source = this.options.source;}, _searchTimeout:function _searchTimeout(e){clearTimeout(this.searching), this.searching = this._delay(function(){var t=this.term === this._value(), i=this.menu.element.is(":visible"), s=e.altKey || e.ctrlKey || e.metaKey || e.shiftKey;(!t || t && !i && !s) && (this.selectedItem = null, this.search(null, e));}, this.options.delay);}, search:function search(e, t){return (e = null != e?e:this._value(), this.term = this._value(), e.length < this.options.minLength?this.close(t):this._trigger("search", t) !== !1?this._search(e):void 0);}, _search:function _search(e){this.pending++, this.element.addClass("ui-autocomplete-loading"), this.cancelSearch = !1, this.source({term:e}, this._response());}, _response:function _response(){var t=++this.requestIndex;return e.proxy(function(e){t === this.requestIndex && this.__response(e), this.pending--, this.pending || this.element.removeClass("ui-autocomplete-loading");}, this);}, __response:function __response(e){e && (e = this._normalize(e)), this._trigger("response", null, {content:e}), !this.options.disabled && e && e.length && !this.cancelSearch?(this._suggest(e), this._trigger("open")):this._close();}, close:function close(e){this.cancelSearch = !0, this._close(e);}, _close:function _close(e){this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), this.isNewMenu = !0, this._trigger("close", e));}, _change:function _change(e){this.previous !== this._value() && this._trigger("change", e, {item:this.selectedItem});}, _normalize:function _normalize(t){return t.length && t[0].label && t[0].value?t:e.map(t, function(t){return "string" == typeof t?{label:t, value:t}:e.extend({}, t, {label:t.label || t.value, value:t.value || t.label});});}, _suggest:function _suggest(t){var i=this.menu.element.empty();this._renderMenu(i, t), this.isNewMenu = !0, this.menu.refresh(), i.show(), this._resizeMenu(), i.position(e.extend({of:this.element}, this.options.position)), this.options.autoFocus && this.menu.next();}, _resizeMenu:function _resizeMenu(){var e=this.menu.element;e.outerWidth(Math.max(e.width("").outerWidth() + 1, this.element.outerWidth()));}, _renderMenu:function _renderMenu(t, i){var s=this;e.each(i, function(e, i){s._renderItemData(t, i);});}, _renderItemData:function _renderItemData(e, t){return this._renderItem(e, t).data("ui-autocomplete-item", t);}, _renderItem:function _renderItem(t, i){return e("<li>").text(i.label).appendTo(t);}, _move:function _move(e, t){return this.menu.element.is(":visible")?this.menu.isFirstItem() && /^previous/.test(e) || this.menu.isLastItem() && /^next/.test(e)?(this.isMultiLine || this._value(this.term), this.menu.blur(), void 0):(this.menu[e](t), void 0):(this.search(null, t), void 0);}, widget:function widget(){return this.menu.element;}, _value:function _value(){return this.valueMethod.apply(this.element, arguments);}, _keyEvent:function _keyEvent(e, t){(!this.isMultiLine || this.menu.element.is(":visible")) && (this._move(e, t), t.preventDefault());}}), e.extend(e.ui.autocomplete, {escapeRegex:function escapeRegex(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");}, filter:function filter(t, i){var s=RegExp(e.ui.autocomplete.escapeRegex(i), "i");return e.grep(t, function(e){return s.test(e.label || e.value || e);});}}), e.widget("ui.autocomplete", e.ui.autocomplete, {options:{messages:{noResults:"No search results.", results:function results(e){return e + (e > 1?" results are":" result is") + " available, use up and down arrow keys to navigate.";}}}, __response:function __response(t){var i;this._superApply(arguments), this.options.disabled || this.cancelSearch || (i = t && t.length?this.options.messages.results(t.length):this.options.messages.noResults, this.liveRegion.children().hide(), e("<div>").text(i).appendTo(this.liveRegion));}}), e.ui.autocomplete;var c, p="ui-button ui-widget ui-state-default ui-corner-all", f="ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only", m=function m(){var t=e(this);setTimeout(function(){t.find(":ui-button").button("refresh");}, 1);}, g=function g(t){var i=t.name, s=t.form, n=e([]);return (i && (i = i.replace(/'/g, "\\'"), n = s?e(s).find("[name='" + i + "'][type=radio]"):e("[name='" + i + "'][type=radio]", t.ownerDocument).filter(function(){return !this.form;})), n);};e.widget("ui.button", {version:"1.11.4", defaultElement:"<button>", options:{disabled:null, text:!0, label:null, icons:{primary:null, secondary:null}}, _create:function _create(){this.element.closest("form").unbind("reset" + this.eventNamespace).bind("reset" + this.eventNamespace, m), "boolean" != typeof this.options.disabled?this.options.disabled = !!this.element.prop("disabled"):this.element.prop("disabled", this.options.disabled), this._determineButtonType(), this.hasTitle = !!this.buttonElement.attr("title");var t=this, i=this.options, s="checkbox" === this.type || "radio" === this.type, n=s?"":"ui-state-active";null === i.label && (i.label = "input" === this.type?this.buttonElement.val():this.buttonElement.html()), this._hoverable(this.buttonElement), this.buttonElement.addClass(p).attr("role", "button").bind("mouseenter" + this.eventNamespace, function(){i.disabled || this === c && e(this).addClass("ui-state-active");}).bind("mouseleave" + this.eventNamespace, function(){i.disabled || e(this).removeClass(n);}).bind("click" + this.eventNamespace, function(e){i.disabled && (e.preventDefault(), e.stopImmediatePropagation());}), this._on({focus:function focus(){this.buttonElement.addClass("ui-state-focus");}, blur:function blur(){this.buttonElement.removeClass("ui-state-focus");}}), s && this.element.bind("change" + this.eventNamespace, function(){t.refresh();}), "checkbox" === this.type?this.buttonElement.bind("click" + this.eventNamespace, function(){return i.disabled?!1:void 0;}):"radio" === this.type?this.buttonElement.bind("click" + this.eventNamespace, function(){if(i.disabled)return !1;e(this).addClass("ui-state-active"), t.buttonElement.attr("aria-pressed", "true");var s=t.element[0];g(s).not(s).map(function(){return e(this).button("widget")[0];}).removeClass("ui-state-active").attr("aria-pressed", "false");}):(this.buttonElement.bind("mousedown" + this.eventNamespace, function(){return i.disabled?!1:(e(this).addClass("ui-state-active"), c = this, t.document.one("mouseup", function(){c = null;}), void 0);}).bind("mouseup" + this.eventNamespace, function(){return i.disabled?!1:(e(this).removeClass("ui-state-active"), void 0);}).bind("keydown" + this.eventNamespace, function(t){return i.disabled?!1:((t.keyCode === e.ui.keyCode.SPACE || t.keyCode === e.ui.keyCode.ENTER) && e(this).addClass("ui-state-active"), void 0);}).bind("keyup" + this.eventNamespace + " blur" + this.eventNamespace, function(){e(this).removeClass("ui-state-active");}), this.buttonElement.is("a") && this.buttonElement.keyup(function(t){t.keyCode === e.ui.keyCode.SPACE && e(this).click();})), this._setOption("disabled", i.disabled), this._resetButton();}, _determineButtonType:function _determineButtonType(){var e, t, i;this.type = this.element.is("[type=checkbox]")?"checkbox":this.element.is("[type=radio]")?"radio":this.element.is("input")?"input":"button", "checkbox" === this.type || "radio" === this.type?(e = this.element.parents().last(), t = "label[for='" + this.element.attr("id") + "']", this.buttonElement = e.find(t), this.buttonElement.length || (e = e.length?e.siblings():this.element.siblings(), this.buttonElement = e.filter(t), this.buttonElement.length || (this.buttonElement = e.find(t))), this.element.addClass("ui-helper-hidden-accessible"), i = this.element.is(":checked"), i && this.buttonElement.addClass("ui-state-active"), this.buttonElement.prop("aria-pressed", i)):this.buttonElement = this.element;}, widget:function widget(){return this.buttonElement;}, _destroy:function _destroy(){this.element.removeClass("ui-helper-hidden-accessible"), this.buttonElement.removeClass(p + " ui-state-active " + f).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()), this.hasTitle || this.buttonElement.removeAttr("title");}, _setOption:function _setOption(e, t){return (this._super(e, t), "disabled" === e?(this.widget().toggleClass("ui-state-disabled", !!t), this.element.prop("disabled", !!t), t && ("checkbox" === this.type || "radio" === this.type?this.buttonElement.removeClass("ui-state-focus"):this.buttonElement.removeClass("ui-state-focus ui-state-active")), void 0):(this._resetButton(), void 0));}, refresh:function refresh(){var t=this.element.is("input, button")?this.element.is(":disabled"):this.element.hasClass("ui-button-disabled");t !== this.options.disabled && this._setOption("disabled", t), "radio" === this.type?g(this.element[0]).each(function(){e(this).is(":checked")?e(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true"):e(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false");}):"checkbox" === this.type && (this.element.is(":checked")?this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true"):this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false"));}, _resetButton:function _resetButton(){if("input" === this.type){return (this.options.label && this.element.val(this.options.label), void 0);}var t=this.buttonElement.removeClass(f), i=e("<span></span>", this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(t.empty()).text(), s=this.options.icons, n=s.primary && s.secondary, a=[];s.primary || s.secondary?(this.options.text && a.push("ui-button-text-icon" + (n?"s":s.primary?"-primary":"-secondary")), s.primary && t.prepend("<span class='ui-button-icon-primary ui-icon " + s.primary + "'></span>"), s.secondary && t.append("<span class='ui-button-icon-secondary ui-icon " + s.secondary + "'></span>"), this.options.text || (a.push(n?"ui-button-icons-only":"ui-button-icon-only"), this.hasTitle || t.attr("title", e.trim(i)))):a.push("ui-button-text-only"), t.addClass(a.join(" "));}}), e.widget("ui.buttonset", {version:"1.11.4", options:{items:"button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"}, _create:function _create(){this.element.addClass("ui-buttonset");}, _init:function _init(){this.refresh();}, _setOption:function _setOption(e, t){"disabled" === e && this.buttons.button("option", e, t), this._super(e, t);}, refresh:function refresh(){var t="rtl" === this.element.css("direction"), i=this.element.find(this.options.items), s=i.filter(":ui-button");i.not(":ui-button").button(), s.button("refresh"), this.buttons = i.map(function(){return e(this).button("widget")[0];}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(t?"ui-corner-right":"ui-corner-left").end().filter(":last").addClass(t?"ui-corner-left":"ui-corner-right").end().end();}, _destroy:function _destroy(){this.element.removeClass("ui-buttonset"), this.buttons.map(function(){return e(this).button("widget")[0];}).removeClass("ui-corner-left ui-corner-right").end().button("destroy");}}), e.ui.button, e.extend(e.ui, {datepicker:{version:"1.11.4"}});var v;e.extend(n.prototype, {markerClassName:"hasDatepicker", maxRows:4, _widgetDatepicker:function _widgetDatepicker(){return this.dpDiv;}, setDefaults:function setDefaults(e){return (r(this._defaults, e || {}), this);}, _attachDatepicker:function _attachDatepicker(t, i){var s, n, a;s = t.nodeName.toLowerCase(), n = "div" === s || "span" === s, t.id || (this.uuid += 1, t.id = "dp" + this.uuid), a = this._newInst(e(t), n), a.settings = e.extend({}, i || {}), "input" === s?this._connectDatepicker(t, a):n && this._inlineDatepicker(t, a);}, _newInst:function _newInst(t, i){var s=t[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");return {id:s, input:t, selectedDay:0, selectedMonth:0, selectedYear:0, drawMonth:0, drawYear:0, inline:i, dpDiv:i?a(e("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")):this.dpDiv};}, _connectDatepicker:function _connectDatepicker(t, i){var s=e(t);i.append = e([]), i.trigger = e([]), s.hasClass(this.markerClassName) || (this._attachments(s, i), s.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp), this._autoSize(i), e.data(t, "datepicker", i), i.settings.disabled && this._disableDatepicker(t));}, _attachments:function _attachments(t, i){var s, n, a, o=this._get(i, "appendText"), r=this._get(i, "isRTL");i.append && i.append.remove(), o && (i.append = e("<span class='" + this._appendClass + "'>" + o + "</span>"), t[r?"before":"after"](i.append)), t.unbind("focus", this._showDatepicker), i.trigger && i.trigger.remove(), s = this._get(i, "showOn"), ("focus" === s || "both" === s) && t.focus(this._showDatepicker), ("button" === s || "both" === s) && (n = this._get(i, "buttonText"), a = this._get(i, "buttonImage"), i.trigger = e(this._get(i, "buttonImageOnly")?e("<img/>").addClass(this._triggerClass).attr({src:a, alt:n, title:n}):e("<button type='button'></button>").addClass(this._triggerClass).html(a?e("<img/>").attr({src:a, alt:n, title:n}):n)), t[r?"before":"after"](i.trigger), i.trigger.click(function(){return (e.datepicker._datepickerShowing && e.datepicker._lastInput === t[0]?e.datepicker._hideDatepicker():e.datepicker._datepickerShowing && e.datepicker._lastInput !== t[0]?(e.datepicker._hideDatepicker(), e.datepicker._showDatepicker(t[0])):e.datepicker._showDatepicker(t[0]), !1);}));}, _autoSize:function _autoSize(e){if(this._get(e, "autoSize") && !e.inline){var t, i, s, n, a=new Date(2009, 11, 20), o=this._get(e, "dateFormat");o.match(/[DM]/) && (t = function(e){for(i = 0, s = 0, n = 0; e.length > n; n++) e[n].length > i && (i = e[n].length, s = n);return s;}, a.setMonth(t(this._get(e, o.match(/MM/)?"monthNames":"monthNamesShort"))), a.setDate(t(this._get(e, o.match(/DD/)?"dayNames":"dayNamesShort")) + 20 - a.getDay())), e.input.attr("size", this._formatDate(e, a).length);}}, _inlineDatepicker:function _inlineDatepicker(t, i){var s=e(t);s.hasClass(this.markerClassName) || (s.addClass(this.markerClassName).append(i.dpDiv), e.data(t, "datepicker", i), this._setDate(i, this._getDefaultDate(i), !0), this._updateDatepicker(i), this._updateAlternate(i), i.settings.disabled && this._disableDatepicker(t), i.dpDiv.css("display", "block"));}, _dialogDatepicker:function _dialogDatepicker(t, i, s, n, a){var o, h, l, u, d, c=this._dialogInst;return (c || (this.uuid += 1, o = "dp" + this.uuid, this._dialogInput = e("<input type='text' id='" + o + "' style='position: absolute; top: -100px; width: 0px;'/>"), this._dialogInput.keydown(this._doKeyDown), e("body").append(this._dialogInput), c = this._dialogInst = this._newInst(this._dialogInput, !1), c.settings = {}, e.data(this._dialogInput[0], "datepicker", c)), r(c.settings, n || {}), i = i && i.constructor === Date?this._formatDate(c, i):i, this._dialogInput.val(i), this._pos = a?a.length?a:[a.pageX, a.pageY]:null, this._pos || (h = document.documentElement.clientWidth, l = document.documentElement.clientHeight, u = document.documentElement.scrollLeft || document.body.scrollLeft, d = document.documentElement.scrollTop || document.body.scrollTop, this._pos = [h / 2 - 100 + u, l / 2 - 150 + d]), this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), c.settings.onSelect = s, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), e.blockUI && e.blockUI(this.dpDiv), e.data(this._dialogInput[0], "datepicker", c), this);}, _destroyDatepicker:function _destroyDatepicker(t){var i, s=e(t), n=e.data(t, "datepicker");s.hasClass(this.markerClassName) && (i = t.nodeName.toLowerCase(), e.removeData(t, "datepicker"), "input" === i?(n.append.remove(), n.trigger.remove(), s.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)):("div" === i || "span" === i) && s.removeClass(this.markerClassName).empty(), v === n && (v = null));}, _enableDatepicker:function _enableDatepicker(t){var i, s, n=e(t), a=e.data(t, "datepicker");n.hasClass(this.markerClassName) && (i = t.nodeName.toLowerCase(), "input" === i?(t.disabled = !1, a.trigger.filter("button").each(function(){this.disabled = !1;}).end().filter("img").css({opacity:"1.0", cursor:""})):("div" === i || "span" === i) && (s = n.children("." + this._inlineClass), s.children().removeClass("ui-state-disabled"), s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)), this._disabledInputs = e.map(this._disabledInputs, function(e){return e === t?null:e;}));}, _disableDatepicker:function _disableDatepicker(t){var i, s, n=e(t), a=e.data(t, "datepicker");n.hasClass(this.markerClassName) && (i = t.nodeName.toLowerCase(), "input" === i?(t.disabled = !0, a.trigger.filter("button").each(function(){this.disabled = !0;}).end().filter("img").css({opacity:"0.5", cursor:"default"})):("div" === i || "span" === i) && (s = n.children("." + this._inlineClass), s.children().addClass("ui-state-disabled"), s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)), this._disabledInputs = e.map(this._disabledInputs, function(e){return e === t?null:e;}), this._disabledInputs[this._disabledInputs.length] = t);}, _isDisabledDatepicker:function _isDisabledDatepicker(e){if(!e){return !1;}for(var t=0; this._disabledInputs.length > t; t++) if(this._disabledInputs[t] === e){return !0;}return !1;}, _getInst:function _getInst(t){try{return e.data(t, "datepicker");}catch(i) {throw "Missing instance data for this datepicker";}}, _optionDatepicker:function _optionDatepicker(t, i, s){var n, a, o, h, l=this._getInst(t);return 2 === arguments.length && "string" == typeof i?"defaults" === i?e.extend({}, e.datepicker._defaults):l?"all" === i?e.extend({}, l.settings):this._get(l, i):null:(n = i || {}, "string" == typeof i && (n = {}, n[i] = s), l && (this._curInst === l && this._hideDatepicker(), a = this._getDateDatepicker(t, !0), o = this._getMinMaxDate(l, "min"), h = this._getMinMaxDate(l, "max"), r(l.settings, n), null !== o && void 0 !== n.dateFormat && void 0 === n.minDate && (l.settings.minDate = this._formatDate(l, o)), null !== h && void 0 !== n.dateFormat && void 0 === n.maxDate && (l.settings.maxDate = this._formatDate(l, h)), "disabled" in n && (n.disabled?this._disableDatepicker(t):this._enableDatepicker(t)), this._attachments(e(t), l), this._autoSize(l), this._setDate(l, a), this._updateAlternate(l), this._updateDatepicker(l)), void 0);}, _changeDatepicker:function _changeDatepicker(e, t, i){this._optionDatepicker(e, t, i);}, _refreshDatepicker:function _refreshDatepicker(e){var t=this._getInst(e);t && this._updateDatepicker(t);}, _setDateDatepicker:function _setDateDatepicker(e, t){var i=this._getInst(e);i && (this._setDate(i, t), this._updateDatepicker(i), this._updateAlternate(i));}, _getDateDatepicker:function _getDateDatepicker(e, t){var i=this._getInst(e);return (i && !i.inline && this._setDateFromField(i, t), i?this._getDate(i):null);}, _doKeyDown:function _doKeyDown(t){var i, s, n, a=e.datepicker._getInst(t.target), o=!0, r=a.dpDiv.is(".ui-datepicker-rtl");if((a._keyEvent = !0, e.datepicker._datepickerShowing))switch(t.keyCode){case 9:e.datepicker._hideDatepicker(), o = !1;break;case 13:return (n = e("td." + e.datepicker._dayOverClass + ":not(." + e.datepicker._currentClass + ")", a.dpDiv), n[0] && e.datepicker._selectDay(t.target, a.selectedMonth, a.selectedYear, n[0]), i = e.datepicker._get(a, "onSelect"), i?(s = e.datepicker._formatDate(a), i.apply(a.input?a.input[0]:null, [s, a])):e.datepicker._hideDatepicker(), !1);case 27:e.datepicker._hideDatepicker();break;case 33:e.datepicker._adjustDate(t.target, t.ctrlKey?-e.datepicker._get(a, "stepBigMonths"):-e.datepicker._get(a, "stepMonths"), "M");break;case 34:e.datepicker._adjustDate(t.target, t.ctrlKey?+e.datepicker._get(a, "stepBigMonths"):+e.datepicker._get(a, "stepMonths"), "M");break;case 35:(t.ctrlKey || t.metaKey) && e.datepicker._clearDate(t.target), o = t.ctrlKey || t.metaKey;break;case 36:(t.ctrlKey || t.metaKey) && e.datepicker._gotoToday(t.target), o = t.ctrlKey || t.metaKey;break;case 37:(t.ctrlKey || t.metaKey) && e.datepicker._adjustDate(t.target, r?1:-1, "D"), o = t.ctrlKey || t.metaKey, t.originalEvent.altKey && e.datepicker._adjustDate(t.target, t.ctrlKey?-e.datepicker._get(a, "stepBigMonths"):-e.datepicker._get(a, "stepMonths"), "M");break;case 38:(t.ctrlKey || t.metaKey) && e.datepicker._adjustDate(t.target, -7, "D"), o = t.ctrlKey || t.metaKey;break;case 39:(t.ctrlKey || t.metaKey) && e.datepicker._adjustDate(t.target, r?-1:1, "D"), o = t.ctrlKey || t.metaKey, t.originalEvent.altKey && e.datepicker._adjustDate(t.target, t.ctrlKey?+e.datepicker._get(a, "stepBigMonths"):+e.datepicker._get(a, "stepMonths"), "M");break;case 40:(t.ctrlKey || t.metaKey) && e.datepicker._adjustDate(t.target, 7, "D"), o = t.ctrlKey || t.metaKey;break;default:o = !1;}else 36 === t.keyCode && t.ctrlKey?e.datepicker._showDatepicker(this):o = !1;o && (t.preventDefault(), t.stopPropagation());}, _doKeyPress:function _doKeyPress(t){var i, s, n=e.datepicker._getInst(t.target);return e.datepicker._get(n, "constrainInput")?(i = e.datepicker._possibleChars(e.datepicker._get(n, "dateFormat")), s = String.fromCharCode(null == t.charCode?t.keyCode:t.charCode), t.ctrlKey || t.metaKey || " " > s || !i || i.indexOf(s) > -1):void 0;}, _doKeyUp:function _doKeyUp(t){var i, s=e.datepicker._getInst(t.target);if(s.input.val() !== s.lastVal)try{i = e.datepicker.parseDate(e.datepicker._get(s, "dateFormat"), s.input?s.input.val():null, e.datepicker._getFormatConfig(s)), i && (e.datepicker._setDateFromField(s), e.datepicker._updateAlternate(s), e.datepicker._updateDatepicker(s));}catch(n) {}return !0;}, _showDatepicker:function _showDatepicker(t){if((t = t.target || t, "input" !== t.nodeName.toLowerCase() && (t = e("input", t.parentNode)[0]), !e.datepicker._isDisabledDatepicker(t) && e.datepicker._lastInput !== t)){var i, n, a, o, h, l, u;i = e.datepicker._getInst(t), e.datepicker._curInst && e.datepicker._curInst !== i && (e.datepicker._curInst.dpDiv.stop(!0, !0), i && e.datepicker._datepickerShowing && e.datepicker._hideDatepicker(e.datepicker._curInst.input[0])), n = e.datepicker._get(i, "beforeShow"), a = n?n.apply(t, [t, i]):{}, a !== !1 && (r(i.settings, a), i.lastVal = null, e.datepicker._lastInput = t, e.datepicker._setDateFromField(i), e.datepicker._inDialog && (t.value = ""), e.datepicker._pos || (e.datepicker._pos = e.datepicker._findPos(t), e.datepicker._pos[1] += t.offsetHeight), o = !1, e(t).parents().each(function(){return (o |= "fixed" === e(this).css("position"), !o);}), h = {left:e.datepicker._pos[0], top:e.datepicker._pos[1]}, e.datepicker._pos = null, i.dpDiv.empty(), i.dpDiv.css({position:"absolute", display:"block", top:"-1000px"}), e.datepicker._updateDatepicker(i), h = e.datepicker._checkOffset(i, h, o), i.dpDiv.css({position:e.datepicker._inDialog && e.blockUI?"static":o?"fixed":"absolute", display:"none", left:h.left + "px", top:h.top + "px"}), i.inline || (l = e.datepicker._get(i, "showAnim"), u = e.datepicker._get(i, "duration"), i.dpDiv.css("z-index", s(e(t)) + 1), e.datepicker._datepickerShowing = !0, e.effects && e.effects.effect[l]?i.dpDiv.show(l, e.datepicker._get(i, "showOptions"), u):i.dpDiv[l || "show"](l?u:null), e.datepicker._shouldFocusInput(i) && i.input.focus(), e.datepicker._curInst = i));}}, _updateDatepicker:function _updateDatepicker(t){this.maxRows = 4, v = t, t.dpDiv.empty().append(this._generateHTML(t)), this._attachHandlers(t);var i, s=this._getNumberOfMonths(t), n=s[1], a=17, r=t.dpDiv.find("." + this._dayOverClass + " a");r.length > 0 && o.apply(r.get(0)), t.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), n > 1 && t.dpDiv.addClass("ui-datepicker-multi-" + n).css("width", a * n + "em"), t.dpDiv[(1 !== s[0] || 1 !== s[1]?"add":"remove") + "Class"]("ui-datepicker-multi"), t.dpDiv[(this._get(t, "isRTL")?"add":"remove") + "Class"]("ui-datepicker-rtl"), t === e.datepicker._curInst && e.datepicker._datepickerShowing && e.datepicker._shouldFocusInput(t) && t.input.focus(), t.yearshtml && (i = t.yearshtml, setTimeout(function(){i === t.yearshtml && t.yearshtml && t.dpDiv.find("select.ui-datepicker-year:first").replaceWith(t.yearshtml), i = t.yearshtml = null;}, 0));}, _shouldFocusInput:function _shouldFocusInput(e){return e.input && e.input.is(":visible") && !e.input.is(":disabled") && !e.input.is(":focus");}, _checkOffset:function _checkOffset(t, i, s){var n=t.dpDiv.outerWidth(), a=t.dpDiv.outerHeight(), o=t.input?t.input.outerWidth():0, r=t.input?t.input.outerHeight():0, h=document.documentElement.clientWidth + (s?0:e(document).scrollLeft()), l=document.documentElement.clientHeight + (s?0:e(document).scrollTop());return (i.left -= this._get(t, "isRTL")?n - o:0, i.left -= s && i.left === t.input.offset().left?e(document).scrollLeft():0, i.top -= s && i.top === t.input.offset().top + r?e(document).scrollTop():0, i.left -= Math.min(i.left, i.left + n > h && h > n?Math.abs(i.left + n - h):0), i.top -= Math.min(i.top, i.top + a > l && l > a?Math.abs(a + r):0), i);}, _findPos:function _findPos(t){for(var i, s=this._getInst(t), n=this._get(s, "isRTL"); t && ("hidden" === t.type || 1 !== t.nodeType || e.expr.filters.hidden(t));) t = t[n?"previousSibling":"nextSibling"];return (i = e(t).offset(), [i.left, i.top]);}, _hideDatepicker:function _hideDatepicker(t){var i, s, n, a, o=this._curInst;!o || t && o !== e.data(t, "datepicker") || this._datepickerShowing && (i = this._get(o, "showAnim"), s = this._get(o, "duration"), n = function(){e.datepicker._tidyDialog(o);}, e.effects && (e.effects.effect[i] || e.effects[i])?o.dpDiv.hide(i, e.datepicker._get(o, "showOptions"), s, n):o.dpDiv["slideDown" === i?"slideUp":"fadeIn" === i?"fadeOut":"hide"](i?s:null, n), i || n(), this._datepickerShowing = !1, a = this._get(o, "onClose"), a && a.apply(o.input?o.input[0]:null, [o.input?o.input.val():"", o]), this._lastInput = null, this._inDialog && (this._dialogInput.css({position:"absolute", left:"0", top:"-100px"}), e.blockUI && (e.unblockUI(), e("body").append(this.dpDiv))), this._inDialog = !1);}, _tidyDialog:function _tidyDialog(e){e.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar");}, _checkExternalClick:function _checkExternalClick(t){if(e.datepicker._curInst){var i=e(t.target), s=e.datepicker._getInst(i[0]);(i[0].id !== e.datepicker._mainDivId && 0 === i.parents("#" + e.datepicker._mainDivId).length && !i.hasClass(e.datepicker.markerClassName) && !i.closest("." + e.datepicker._triggerClass).length && e.datepicker._datepickerShowing && (!e.datepicker._inDialog || !e.blockUI) || i.hasClass(e.datepicker.markerClassName) && e.datepicker._curInst !== s) && e.datepicker._hideDatepicker();}}, _adjustDate:function _adjustDate(t, i, s){var n=e(t), a=this._getInst(n[0]);this._isDisabledDatepicker(n[0]) || (this._adjustInstDate(a, i + ("M" === s?this._get(a, "showCurrentAtPos"):0), s), this._updateDatepicker(a));}, _gotoToday:function _gotoToday(t){var i, s=e(t), n=this._getInst(s[0]);this._get(n, "gotoCurrent") && n.currentDay?(n.selectedDay = n.currentDay, n.drawMonth = n.selectedMonth = n.currentMonth, n.drawYear = n.selectedYear = n.currentYear):(i = new Date(), n.selectedDay = i.getDate(), n.drawMonth = n.selectedMonth = i.getMonth(), n.drawYear = n.selectedYear = i.getFullYear()), this._notifyChange(n), this._adjustDate(s);}, _selectMonthYear:function _selectMonthYear(t, i, s){var n=e(t), a=this._getInst(n[0]);a["selected" + ("M" === s?"Month":"Year")] = a["draw" + ("M" === s?"Month":"Year")] = parseInt(i.options[i.selectedIndex].value, 10), this._notifyChange(a), this._adjustDate(n);}, _selectDay:function _selectDay(t, i, s, n){var a, o=e(t);e(n).hasClass(this._unselectableClass) || this._isDisabledDatepicker(o[0]) || (a = this._getInst(o[0]), a.selectedDay = a.currentDay = e("a", n).html(), a.selectedMonth = a.currentMonth = i, a.selectedYear = a.currentYear = s, this._selectDate(t, this._formatDate(a, a.currentDay, a.currentMonth, a.currentYear)));}, _clearDate:function _clearDate(t){var i=e(t);this._selectDate(i, "");}, _selectDate:function _selectDate(t, i){var s, n=e(t), a=this._getInst(n[0]);i = null != i?i:this._formatDate(a), a.input && a.input.val(i), this._updateAlternate(a), s = this._get(a, "onSelect"), s?s.apply(a.input?a.input[0]:null, [i, a]):a.input && a.input.trigger("change"), a.inline?this._updateDatepicker(a):(this._hideDatepicker(), this._lastInput = a.input[0], "object" != typeof a.input[0] && a.input.focus(), this._lastInput = null);}, _updateAlternate:function _updateAlternate(t){var i, s, n, a=this._get(t, "altField");a && (i = this._get(t, "altFormat") || this._get(t, "dateFormat"), s = this._getDate(t), n = this.formatDate(i, s, this._getFormatConfig(t)), e(a).each(function(){e(this).val(n);}));}, noWeekends:function noWeekends(e){var t=e.getDay();return [t > 0 && 6 > t, ""];}, iso8601Week:function iso8601Week(e){var t, i=new Date(e.getTime());return (i.setDate(i.getDate() + 4 - (i.getDay() || 7)), t = i.getTime(), i.setMonth(0), i.setDate(1), Math.floor(Math.round((t - i) / 86400000) / 7) + 1);}, parseDate:function parseDate(t, i, s){if(null == t || null == i)throw "Invalid arguments";if((i = "object" == typeof i?"" + i:i + "", "" === i)){return null;}var n, a, o, r, h=0, l=(s?s.shortYearCutoff:null) || this._defaults.shortYearCutoff, u="string" != typeof l?l:new Date().getFullYear() % 100 + parseInt(l, 10), d=(s?s.dayNamesShort:null) || this._defaults.dayNamesShort, c=(s?s.dayNames:null) || this._defaults.dayNames, p=(s?s.monthNamesShort:null) || this._defaults.monthNamesShort, f=(s?s.monthNames:null) || this._defaults.monthNames, m=-1, g=-1, v=-1, y=-1, b=!1, _=function _(e){var i=t.length > n + 1 && t.charAt(n + 1) === e;return (i && n++, i);}, x=function x(e){var t=_(e), s="@" === e?14:"!" === e?20:"y" === e && t?4:"o" === e?3:2, n="y" === e?s:1, a=RegExp("^\\d{" + n + "," + s + "}"), o=i.substring(h).match(a);if(!o)throw "Missing number at position " + h;return (h += o[0].length, parseInt(o[0], 10));}, w=function w(t, s, n){var a=-1, o=e.map(_(t)?n:s, function(e, t){return [[t, e]];}).sort(function(e, t){return -(e[1].length - t[1].length);});if((e.each(o, function(e, t){var s=t[1];return i.substr(h, s.length).toLowerCase() === s.toLowerCase()?(a = t[0], h += s.length, !1):void 0;}), -1 !== a)){return a + 1;}throw "Unknown name at position " + h;}, k=function k(){if(i.charAt(h) !== t.charAt(n))throw "Unexpected literal at position " + h;h++;};for(n = 0; t.length > n; n++) if(b)"'" !== t.charAt(n) || _("'")?k():b = !1;else switch(t.charAt(n)){case "d":v = x("d");break;case "D":w("D", d, c);break;case "o":y = x("o");break;case "m":g = x("m");break;case "M":g = w("M", p, f);break;case "y":m = x("y");break;case "@":r = new Date(x("@")), m = r.getFullYear(), g = r.getMonth() + 1, v = r.getDate();break;case "!":r = new Date((x("!") - this._ticksTo1970) / 10000), m = r.getFullYear(), g = r.getMonth() + 1, v = r.getDate();break;case "'":_("'")?k():b = !0;break;default:k();}if(i.length > h && (o = i.substr(h), !/^\s+/.test(o)))throw "Extra/unparsed characters found in date: " + o;if((-1 === m?m = new Date().getFullYear():100 > m && (m += new Date().getFullYear() - new Date().getFullYear() % 100 + (u >= m?0:-100)), y > -1))for(g = 1, v = y;;) {if((a = this._getDaysInMonth(m, g - 1), a >= v))break;g++, v -= a;}if((r = this._daylightSavingAdjust(new Date(m, g - 1, v)), r.getFullYear() !== m || r.getMonth() + 1 !== g || r.getDate() !== v))throw "Invalid date";return r;}, ATOM:"yy-mm-dd", COOKIE:"D, dd M yy", ISO_8601:"yy-mm-dd", RFC_822:"D, d M y", RFC_850:"DD, dd-M-y", RFC_1036:"D, d M y", RFC_1123:"D, d M yy", RFC_2822:"D, d M yy", RSS:"D, d M y", TICKS:"!", TIMESTAMP:"@", W3C:"yy-mm-dd", _ticksTo1970:10000000 * 60 * 60 * 24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)), formatDate:function formatDate(e, t, i){if(!t){return "";}var s, n=(i?i.dayNamesShort:null) || this._defaults.dayNamesShort, a=(i?i.dayNames:null) || this._defaults.dayNames, o=(i?i.monthNamesShort:null) || this._defaults.monthNamesShort, r=(i?i.monthNames:null) || this._defaults.monthNames, h=function h(t){var i=e.length > s + 1 && e.charAt(s + 1) === t;return (i && s++, i);}, l=function l(e, t, i){var s="" + t;if(h(e))for(; i > s.length;) s = "0" + s;return s;}, u=function u(e, t, i, s){return h(e)?s[t]:i[t];}, d="", c=!1;if(t)for(s = 0; e.length > s; s++) if(c)"'" !== e.charAt(s) || h("'")?d += e.charAt(s):c = !1;else switch(e.charAt(s)){case "d":d += l("d", t.getDate(), 2);break;case "D":d += u("D", t.getDay(), n, a);break;case "o":d += l("o", Math.round((new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime() - new Date(t.getFullYear(), 0, 0).getTime()) / 86400000), 3);break;case "m":d += l("m", t.getMonth() + 1, 2);break;case "M":d += u("M", t.getMonth(), o, r);break;case "y":d += h("y")?t.getFullYear():(10 > t.getYear() % 100?"0":"") + t.getYear() % 100;break;case "@":d += t.getTime();break;case "!":d += 10000 * t.getTime() + this._ticksTo1970;break;case "'":h("'")?d += "'":c = !0;break;default:d += e.charAt(s);}return d;}, _possibleChars:function _possibleChars(e){var t, i="", s=!1, n=function n(i){var s=e.length > t + 1 && e.charAt(t + 1) === i;return (s && t++, s);};for(t = 0; e.length > t; t++) if(s)"'" !== e.charAt(t) || n("'")?i += e.charAt(t):s = !1;else switch(e.charAt(t)){case "d":case "m":case "y":case "@":i += "0123456789";break;case "D":case "M":return null;case "'":n("'")?i += "'":s = !0;break;default:i += e.charAt(t);}return i;}, _get:function _get(e, t){return void 0 !== e.settings[t]?e.settings[t]:this._defaults[t];}, _setDateFromField:function _setDateFromField(e, t){if(e.input.val() !== e.lastVal){var i=this._get(e, "dateFormat"), s=e.lastVal = e.input?e.input.val():null, n=this._getDefaultDate(e), a=n, o=this._getFormatConfig(e);try{a = this.parseDate(i, s, o) || n;}catch(r) {s = t?"":s;}e.selectedDay = a.getDate(), e.drawMonth = e.selectedMonth = a.getMonth(), e.drawYear = e.selectedYear = a.getFullYear(), e.currentDay = s?a.getDate():0, e.currentMonth = s?a.getMonth():0, e.currentYear = s?a.getFullYear():0, this._adjustInstDate(e);}}, _getDefaultDate:function _getDefaultDate(e){return this._restrictMinMax(e, this._determineDate(e, this._get(e, "defaultDate"), new Date()));}, _determineDate:function _determineDate(t, i, s){var n=function n(e){var t=new Date();return (t.setDate(t.getDate() + e), t);}, a=(function(_a){var _aWrapper=function a(_x){return _a.apply(this, arguments);};_aWrapper.toString = function(){return _a.toString();};return _aWrapper;})(function(i){try{return e.datepicker.parseDate(e.datepicker._get(t, "dateFormat"), i, e.datepicker._getFormatConfig(t));}catch(s) {}for(var n=(i.toLowerCase().match(/^c/)?e.datepicker._getDate(t):null) || new Date(), a=n.getFullYear(), o=n.getMonth(), r=n.getDate(), h=/([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, l=h.exec(i); l;) {switch(l[2] || "d"){case "d":case "D":r += parseInt(l[1], 10);break;case "w":case "W":r += 7 * parseInt(l[1], 10);break;case "m":case "M":o += parseInt(l[1], 10), r = Math.min(r, e.datepicker._getDaysInMonth(a, o));break;case "y":case "Y":a += parseInt(l[1], 10), r = Math.min(r, e.datepicker._getDaysInMonth(a, o));}l = h.exec(i);}return new Date(a, o, r);}), o=null == i || "" === i?s:"string" == typeof i?a(i):"number" == typeof i?isNaN(i)?s:n(i):new Date(i.getTime());return (o = o && "Invalid Date" == "" + o?s:o, o && (o.setHours(0), o.setMinutes(0), o.setSeconds(0), o.setMilliseconds(0)), this._daylightSavingAdjust(o));}, _daylightSavingAdjust:function _daylightSavingAdjust(e){return e?(e.setHours(e.getHours() > 12?e.getHours() + 2:0), e):null;}, _setDate:function _setDate(e, t, i){var s=!t, n=e.selectedMonth, a=e.selectedYear, o=this._restrictMinMax(e, this._determineDate(e, t, new Date()));e.selectedDay = e.currentDay = o.getDate(), e.drawMonth = e.selectedMonth = e.currentMonth = o.getMonth(), e.drawYear = e.selectedYear = e.currentYear = o.getFullYear(), n === e.selectedMonth && a === e.selectedYear || i || this._notifyChange(e), this._adjustInstDate(e), e.input && e.input.val(s?"":this._formatDate(e));}, _getDate:function _getDate(e){var t=!e.currentYear || e.input && "" === e.input.val()?null:this._daylightSavingAdjust(new Date(e.currentYear, e.currentMonth, e.currentDay));return t;}, _attachHandlers:function _attachHandlers(t){var i=this._get(t, "stepMonths"), s="#" + t.id.replace(/\\\\/g, "\\");t.dpDiv.find("[data-handler]").map(function(){var t={prev:function prev(){e.datepicker._adjustDate(s, -i, "M");}, next:function next(){e.datepicker._adjustDate(s, +i, "M");}, hide:function hide(){e.datepicker._hideDatepicker();}, today:function today(){e.datepicker._gotoToday(s);}, selectDay:function selectDay(){return (e.datepicker._selectDay(s, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1);}, selectMonth:function selectMonth(){return (e.datepicker._selectMonthYear(s, this, "M"), !1);}, selectYear:function selectYear(){return (e.datepicker._selectMonthYear(s, this, "Y"), !1);}};e(this).bind(this.getAttribute("data-event"), t[this.getAttribute("data-handler")]);});}, _generateHTML:function _generateHTML(e){var t, i, s, n, a, o, r, h, l, u, d, c, p, f, m, g, v, y, b, _, x, w, k, T, D, S, M, C, N, A, P, I, H, z, F, E, O, j, W, L=new Date(), R=this._daylightSavingAdjust(new Date(L.getFullYear(), L.getMonth(), L.getDate())), Y=this._get(e, "isRTL"), B=this._get(e, "showButtonPanel"), J=this._get(e, "hideIfNoPrevNext"), q=this._get(e, "navigationAsDateFormat"), K=this._getNumberOfMonths(e), V=this._get(e, "showCurrentAtPos"), U=this._get(e, "stepMonths"), Q=1 !== K[0] || 1 !== K[1], G=this._daylightSavingAdjust(e.currentDay?new Date(e.currentYear, e.currentMonth, e.currentDay):new Date(9999, 9, 9)), X=this._getMinMaxDate(e, "min"), $=this._getMinMaxDate(e, "max"), Z=e.drawMonth - V, et=e.drawYear;if((0 > Z && (Z += 12, et--), $))for(t = this._daylightSavingAdjust(new Date($.getFullYear(), $.getMonth() - K[0] * K[1] + 1, $.getDate())), t = X && X > t?X:t; this._daylightSavingAdjust(new Date(et, Z, 1)) > t;) Z--, 0 > Z && (Z = 11, et--);for(e.drawMonth = Z, e.drawYear = et, i = this._get(e, "prevText"), i = q?this.formatDate(i, this._daylightSavingAdjust(new Date(et, Z - U, 1)), this._getFormatConfig(e)):i, s = this._canAdjustMonth(e, -1, et, Z)?"<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y?"e":"w") + "'>" + i + "</span></a>":J?"":"<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y?"e":"w") + "'>" + i + "</span></a>", n = this._get(e, "nextText"), n = q?this.formatDate(n, this._daylightSavingAdjust(new Date(et, Z + U, 1)), this._getFormatConfig(e)):n, a = this._canAdjustMonth(e, 1, et, Z)?"<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + n + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y?"w":"e") + "'>" + n + "</span></a>":J?"":"<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + n + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y?"w":"e") + "'>" + n + "</span></a>", o = this._get(e, "currentText"), r = this._get(e, "gotoCurrent") && e.currentDay?G:R, o = q?this.formatDate(o, r, this._getFormatConfig(e)):o, h = e.inline?"":"<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(e, "closeText") + "</button>", l = B?"<div class='ui-datepicker-buttonpane ui-widget-content'>" + (Y?h:"") + (this._isInRange(e, r)?"<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + o + "</button>":"") + (Y?"":h) + "</div>":"", u = parseInt(this._get(e, "firstDay"), 10), u = isNaN(u)?0:u, d = this._get(e, "showWeek"), c = this._get(e, "dayNames"), p = this._get(e, "dayNamesMin"), f = this._get(e, "monthNames"), m = this._get(e, "monthNamesShort"), g = this._get(e, "beforeShowDay"), v = this._get(e, "showOtherMonths"), y = this._get(e, "selectOtherMonths"), b = this._getDefaultDate(e), _ = "", w = 0; K[0] > w; w++) {for(k = "", this.maxRows = 4, T = 0; K[1] > T; T++) {if((D = this._daylightSavingAdjust(new Date(et, Z, e.selectedDay)), S = " ui-corner-all", M = "", Q)){if((M += "<div class='ui-datepicker-group", K[1] > 1))switch(T){case 0:M += " ui-datepicker-group-first", S = " ui-corner-" + (Y?"right":"left");break;case K[1] - 1:M += " ui-datepicker-group-last", S = " ui-corner-" + (Y?"left":"right");break;default:M += " ui-datepicker-group-middle", S = "";}M += "'>";}for(M += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + S + "'>" + (/all|left/.test(S) && 0 === w?Y?a:s:"") + (/all|right/.test(S) && 0 === w?Y?s:a:"") + this._generateMonthYearHeader(e, Z, et, X, $, w > 0 || T > 0, f, m) + "</div><table class='ui-datepicker-calendar'><thead>" + "<tr>", C = d?"<th class='ui-datepicker-week-col'>" + this._get(e, "weekHeader") + "</th>":"", x = 0; 7 > x; x++) N = (x + u) % 7, C += "<th scope='col'" + ((x + u + 6) % 7 >= 5?" class='ui-datepicker-week-end'":"") + ">" + "<span title='" + c[N] + "'>" + p[N] + "</span></th>";for(M += C + "</tr></thead><tbody>", A = this._getDaysInMonth(et, Z), et === e.selectedYear && Z === e.selectedMonth && (e.selectedDay = Math.min(e.selectedDay, A)), P = (this._getFirstDayOfMonth(et, Z) - u + 7) % 7, I = Math.ceil((P + A) / 7), H = Q?this.maxRows > I?this.maxRows:I:I, this.maxRows = H, z = this._daylightSavingAdjust(new Date(et, Z, 1 - P)), F = 0; H > F; F++) {for(M += "<tr>", E = d?"<td class='ui-datepicker-week-col'>" + this._get(e, "calculateWeek")(z) + "</td>":"", x = 0; 7 > x; x++) O = g?g.apply(e.input?e.input[0]:null, [z]):[!0, ""], j = z.getMonth() !== Z, W = j && !y || !O[0] || X && X > z || $ && z > $, E += "<td class='" + ((x + u + 6) % 7 >= 5?" ui-datepicker-week-end":"") + (j?" ui-datepicker-other-month":"") + (z.getTime() === D.getTime() && Z === e.selectedMonth && e._keyEvent || b.getTime() === z.getTime() && b.getTime() === D.getTime()?" " + this._dayOverClass:"") + (W?" " + this._unselectableClass + " ui-state-disabled":"") + (j && !v?"":" " + O[1] + (z.getTime() === G.getTime()?" " + this._currentClass:"") + (z.getTime() === R.getTime()?" ui-datepicker-today":"")) + "'" + (j && !v || !O[2]?"":" title='" + O[2].replace(/'/g, "&#39;") + "'") + (W?"":" data-handler='selectDay' data-event='click' data-month='" + z.getMonth() + "' data-year='" + z.getFullYear() + "'") + ">" + (j && !v?"&#xa0;":W?"<span class='ui-state-default'>" + z.getDate() + "</span>":"<a class='ui-state-default" + (z.getTime() === R.getTime()?" ui-state-highlight":"") + (z.getTime() === G.getTime()?" ui-state-active":"") + (j?" ui-priority-secondary":"") + "' href='#'>" + z.getDate() + "</a>") + "</td>", z.setDate(z.getDate() + 1), z = this._daylightSavingAdjust(z);M += E + "</tr>";}Z++, Z > 11 && (Z = 0, et++), M += "</tbody></table>" + (Q?"</div>" + (K[0] > 0 && T === K[1] - 1?"<div class='ui-datepicker-row-break'></div>":""):""), k += M;}_ += k;}return (_ += l, e._keyEvent = !1, _);}, _generateMonthYearHeader:function _generateMonthYearHeader(e, t, i, s, n, a, o, r){var h, l, u, d, c, p, f, m, g=this._get(e, "changeMonth"), v=this._get(e, "changeYear"), y=this._get(e, "showMonthAfterYear"), b="<div class='ui-datepicker-title'>", _="";if(a || !g)_ += "<span class='ui-datepicker-month'>" + o[t] + "</span>";else {for(h = s && s.getFullYear() === i, l = n && n.getFullYear() === i, _ += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>", u = 0; 12 > u; u++) (!h || u >= s.getMonth()) && (!l || n.getMonth() >= u) && (_ += "<option value='" + u + "'" + (u === t?" selected='selected'":"") + ">" + r[u] + "</option>");_ += "</select>";}if((y || (b += _ + (!a && g && v?"":"&#xa0;")), !e.yearshtml))if((e.yearshtml = "", a || !v))b += "<span class='ui-datepicker-year'>" + i + "</span>";else {for(d = this._get(e, "yearRange").split(":"), c = new Date().getFullYear(), p = function(e){var t=e.match(/c[+\-].*/)?i + parseInt(e.substring(1), 10):e.match(/[+\-].*/)?c + parseInt(e, 10):parseInt(e, 10);return isNaN(t)?c:t;}, f = p(d[0]), m = Math.max(f, p(d[1] || "")), f = s?Math.max(f, s.getFullYear()):f, m = n?Math.min(m, n.getFullYear()):m, e.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>"; m >= f; f++) e.yearshtml += "<option value='" + f + "'" + (f === i?" selected='selected'":"") + ">" + f + "</option>";e.yearshtml += "</select>", b += e.yearshtml, e.yearshtml = null;}return (b += this._get(e, "yearSuffix"), y && (b += (!a && g && v?"":"&#xa0;") + _), b += "</div>");}, _adjustInstDate:function _adjustInstDate(e, t, i){var s=e.drawYear + ("Y" === i?t:0), n=e.drawMonth + ("M" === i?t:0), a=Math.min(e.selectedDay, this._getDaysInMonth(s, n)) + ("D" === i?t:0), o=this._restrictMinMax(e, this._daylightSavingAdjust(new Date(s, n, a)));e.selectedDay = o.getDate(), e.drawMonth = e.selectedMonth = o.getMonth(), e.drawYear = e.selectedYear = o.getFullYear(), ("M" === i || "Y" === i) && this._notifyChange(e);}, _restrictMinMax:function _restrictMinMax(e, t){var i=this._getMinMaxDate(e, "min"), s=this._getMinMaxDate(e, "max"), n=i && i > t?i:t;return s && n > s?s:n;}, _notifyChange:function _notifyChange(e){var t=this._get(e, "onChangeMonthYear");t && t.apply(e.input?e.input[0]:null, [e.selectedYear, e.selectedMonth + 1, e]);}, _getNumberOfMonths:function _getNumberOfMonths(e){var t=this._get(e, "numberOfMonths");return null == t?[1, 1]:"number" == typeof t?[1, t]:t;}, _getMinMaxDate:function _getMinMaxDate(e, t){return this._determineDate(e, this._get(e, t + "Date"), null);}, _getDaysInMonth:function _getDaysInMonth(e, t){return 32 - this._daylightSavingAdjust(new Date(e, t, 32)).getDate();}, _getFirstDayOfMonth:function _getFirstDayOfMonth(e, t){return new Date(e, t, 1).getDay();}, _canAdjustMonth:function _canAdjustMonth(e, t, i, s){var n=this._getNumberOfMonths(e), a=this._daylightSavingAdjust(new Date(i, s + (0 > t?t:n[0] * n[1]), 1));return (0 > t && a.setDate(this._getDaysInMonth(a.getFullYear(), a.getMonth())), this._isInRange(e, a));}, _isInRange:function _isInRange(e, t){var i, s, n=this._getMinMaxDate(e, "min"), a=this._getMinMaxDate(e, "max"), o=null, r=null, h=this._get(e, "yearRange");return (h && (i = h.split(":"), s = new Date().getFullYear(), o = parseInt(i[0], 10), r = parseInt(i[1], 10), i[0].match(/[+\-].*/) && (o += s), i[1].match(/[+\-].*/) && (r += s)), (!n || t.getTime() >= n.getTime()) && (!a || t.getTime() <= a.getTime()) && (!o || t.getFullYear() >= o) && (!r || r >= t.getFullYear()));}, _getFormatConfig:function _getFormatConfig(e){var t=this._get(e, "shortYearCutoff");return (t = "string" != typeof t?t:new Date().getFullYear() % 100 + parseInt(t, 10), {shortYearCutoff:t, dayNamesShort:this._get(e, "dayNamesShort"), dayNames:this._get(e, "dayNames"), monthNamesShort:this._get(e, "monthNamesShort"), monthNames:this._get(e, "monthNames")});}, _formatDate:function _formatDate(e, t, i, s){t || (e.currentDay = e.selectedDay, e.currentMonth = e.selectedMonth, e.currentYear = e.selectedYear);var n=t?"object" == typeof t?t:this._daylightSavingAdjust(new Date(s, i, t)):this._daylightSavingAdjust(new Date(e.currentYear, e.currentMonth, e.currentDay));return this.formatDate(this._get(e, "dateFormat"), n, this._getFormatConfig(e));}}), e.fn.datepicker = function(t){if(!this.length)return this;e.datepicker.initialized || (e(document).mousedown(e.datepicker._checkExternalClick), e.datepicker.initialized = !0), 0 === e("#" + e.datepicker._mainDivId).length && e("body").append(e.datepicker.dpDiv);var i=Array.prototype.slice.call(arguments, 1);return "string" != typeof t || "isDisabled" !== t && "getDate" !== t && "widget" !== t?"option" === t && 2 === arguments.length && "string" == typeof arguments[1]?e.datepicker["_" + t + "Datepicker"].apply(e.datepicker, [this[0]].concat(i)):this.each(function(){"string" == typeof t?e.datepicker["_" + t + "Datepicker"].apply(e.datepicker, [this].concat(i)):e.datepicker._attachDatepicker(this, t);}):e.datepicker["_" + t + "Datepicker"].apply(e.datepicker, [this[0]].concat(i));}, e.datepicker = new n(), e.datepicker.initialized = !1, e.datepicker.uuid = new Date().getTime(), e.datepicker.version = "1.11.4", e.datepicker, e.widget("ui.dialog", {version:"1.11.4", options:{appendTo:"body", autoOpen:!0, buttons:[], closeOnEscape:!0, closeText:"Close", dialogClass:"", draggable:!0, hide:null, height:"auto", maxHeight:null, maxWidth:null, minHeight:150, minWidth:150, modal:!1, position:{my:"center", at:"center", of:window, collision:"fit", using:function using(t){var i=e(this).css(t).offset().top;0 > i && e(this).css("top", t.top - i);}}, resizable:!0, show:null, title:null, width:300, beforeClose:null, close:null, drag:null, dragStart:null, dragStop:null, focus:null, open:null, resize:null, resizeStart:null, resizeStop:null}, sizeRelatedOptions:{buttons:!0, height:!0, maxHeight:!0, maxWidth:!0, minHeight:!0, minWidth:!0, width:!0}, resizableRelatedOptions:{maxHeight:!0, maxWidth:!0, minHeight:!0, minWidth:!0}, _create:function _create(){this.originalCss = {display:this.element[0].style.display, width:this.element[0].style.width, minHeight:this.element[0].style.minHeight, maxHeight:this.element[0].style.maxHeight, height:this.element[0].style.height}, this.originalPosition = {parent:this.element.parent(), index:this.element.parent().children().index(this.element)}, this.originalTitle = this.element.attr("title"), this.options.title = this.options.title || this.originalTitle, this._createWrapper(), this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(this.uiDialog), this._createTitlebar(), this._createButtonPane(), this.options.draggable && e.fn.draggable && this._makeDraggable(), this.options.resizable && e.fn.resizable && this._makeResizable(), this._isOpen = !1, this._trackFocus();}, _init:function _init(){this.options.autoOpen && this.open();}, _appendTo:function _appendTo(){var t=this.options.appendTo;return t && (t.jquery || t.nodeType)?e(t):this.document.find(t || "body").eq(0);}, _destroy:function _destroy(){var e, t=this.originalPosition;this._untrackInstance(), this._destroyOverlay(), this.element.removeUniqueId().removeClass("ui-dialog-content ui-widget-content").css(this.originalCss).detach(), this.uiDialog.stop(!0, !0).remove(), this.originalTitle && this.element.attr("title", this.originalTitle), e = t.parent.children().eq(t.index), e.length && e[0] !== this.element[0]?e.before(this.element):t.parent.append(this.element);}, widget:function widget(){return this.uiDialog;}, disable:e.noop, enable:e.noop, close:function close(t){var i, s=this;if(this._isOpen && this._trigger("beforeClose", t) !== !1){if((this._isOpen = !1, this._focusedElement = null, this._destroyOverlay(), this._untrackInstance(), !this.opener.filter(":focusable").focus().length))try{i = this.document[0].activeElement, i && "body" !== i.nodeName.toLowerCase() && e(i).blur();}catch(n) {}this._hide(this.uiDialog, this.options.hide, function(){s._trigger("close", t);});}}, isOpen:function isOpen(){return this._isOpen;}, moveToTop:function moveToTop(){this._moveToTop();}, _moveToTop:function _moveToTop(t, i){var s=!1, n=this.uiDialog.siblings(".ui-front:visible").map(function(){return +e(this).css("z-index");}).get(), a=Math.max.apply(null, n);return (a >= +this.uiDialog.css("z-index") && (this.uiDialog.css("z-index", a + 1), s = !0), s && !i && this._trigger("focus", t), s);}, open:function open(){var t=this;return this._isOpen?(this._moveToTop() && this._focusTabbable(), void 0):(this._isOpen = !0, this.opener = e(this.document[0].activeElement), this._size(), this._position(), this._createOverlay(), this._moveToTop(null, !0), this.overlay && this.overlay.css("z-index", this.uiDialog.css("z-index") - 1), this._show(this.uiDialog, this.options.show, function(){t._focusTabbable(), t._trigger("focus");}), this._makeFocusTarget(), this._trigger("open"), void 0);}, _focusTabbable:function _focusTabbable(){var e=this._focusedElement;e || (e = this.element.find("[autofocus]")), e.length || (e = this.element.find(":tabbable")), e.length || (e = this.uiDialogButtonPane.find(":tabbable")), e.length || (e = this.uiDialogTitlebarClose.filter(":tabbable")), e.length || (e = this.uiDialog), e.eq(0).focus();}, _keepFocus:function _keepFocus(t){function i(){var t=this.document[0].activeElement, i=this.uiDialog[0] === t || e.contains(this.uiDialog[0], t);i || this._focusTabbable();}t.preventDefault(), i.call(this), this._delay(i);}, _createWrapper:function _createWrapper(){this.uiDialog = e("<div>").addClass("ui-dialog ui-widget ui-widget-content ui-corner-all ui-front " + this.options.dialogClass).hide().attr({tabIndex:-1, role:"dialog"}).appendTo(this._appendTo()), this._on(this.uiDialog, {keydown:function keydown(t){if(this.options.closeOnEscape && !t.isDefaultPrevented() && t.keyCode && t.keyCode === e.ui.keyCode.ESCAPE){return (t.preventDefault(), this.close(t), void 0);}if(t.keyCode === e.ui.keyCode.TAB && !t.isDefaultPrevented()){var i=this.uiDialog.find(":tabbable"), s=i.filter(":first"), n=i.filter(":last");t.target !== n[0] && t.target !== this.uiDialog[0] || t.shiftKey?t.target !== s[0] && t.target !== this.uiDialog[0] || !t.shiftKey || (this._delay(function(){n.focus();}), t.preventDefault()):(this._delay(function(){s.focus();}), t.preventDefault());}}, mousedown:function mousedown(e){this._moveToTop(e) && this._focusTabbable();}}), this.element.find("[aria-describedby]").length || this.uiDialog.attr({"aria-describedby":this.element.uniqueId().attr("id")});}, _createTitlebar:function _createTitlebar(){var t;this.uiDialogTitlebar = e("<div>").addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(this.uiDialog), this._on(this.uiDialogTitlebar, {mousedown:function mousedown(t){e(t.target).closest(".ui-dialog-titlebar-close") || this.uiDialog.focus();}}), this.uiDialogTitlebarClose = e("<button type='button'></button>").button({label:this.options.closeText, icons:{primary:"ui-icon-closethick"}, text:!1}).addClass("ui-dialog-titlebar-close").appendTo(this.uiDialogTitlebar), this._on(this.uiDialogTitlebarClose, {click:function click(e){e.preventDefault(), this.close(e);}}), t = e("<span>").uniqueId().addClass("ui-dialog-title").prependTo(this.uiDialogTitlebar), this._title(t), this.uiDialog.attr({"aria-labelledby":t.attr("id")});}, _title:function _title(e){this.options.title || e.html("&#160;"), e.text(this.options.title);}, _createButtonPane:function _createButtonPane(){this.uiDialogButtonPane = e("<div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"), this.uiButtonSet = e("<div>").addClass("ui-dialog-buttonset").appendTo(this.uiDialogButtonPane), this._createButtons();}, _createButtons:function _createButtons(){var t=this, i=this.options.buttons;return (this.uiDialogButtonPane.remove(), this.uiButtonSet.empty(), e.isEmptyObject(i) || e.isArray(i) && !i.length?(this.uiDialog.removeClass("ui-dialog-buttons"), void 0):(e.each(i, function(i, s){var n, a;s = e.isFunction(s)?{click:s, text:i}:s, s = e.extend({type:"button"}, s), n = s.click, s.click = function(){n.apply(t.element[0], arguments);}, a = {icons:s.icons, text:s.showText}, delete s.icons, delete s.showText, e("<button></button>", s).button(a).appendTo(t.uiButtonSet);}), this.uiDialog.addClass("ui-dialog-buttons"), this.uiDialogButtonPane.appendTo(this.uiDialog), void 0));}, _makeDraggable:function _makeDraggable(){function t(e){return {position:e.position, offset:e.offset};}var i=this, s=this.options;this.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close", handle:".ui-dialog-titlebar", containment:"document", start:function start(s, n){e(this).addClass("ui-dialog-dragging"), i._blockFrames(), i._trigger("dragStart", s, t(n));}, drag:function drag(e, s){i._trigger("drag", e, t(s));}, stop:function stop(n, a){var o=a.offset.left - i.document.scrollLeft(), r=a.offset.top - i.document.scrollTop();s.position = {my:"left top", at:"left" + (o >= 0?"+":"") + o + " " + "top" + (r >= 0?"+":"") + r, of:i.window}, e(this).removeClass("ui-dialog-dragging"), i._unblockFrames(), i._trigger("dragStop", n, t(a));}});}, _makeResizable:function _makeResizable(){function t(e){return {originalPosition:e.originalPosition, originalSize:e.originalSize, position:e.position, size:e.size};}var i=this, s=this.options, n=s.resizable, a=this.uiDialog.css("position"), o="string" == typeof n?n:"n,e,s,w,se,sw,ne,nw";this.uiDialog.resizable({cancel:".ui-dialog-content", containment:"document", alsoResize:this.element, maxWidth:s.maxWidth, maxHeight:s.maxHeight, minWidth:s.minWidth, minHeight:this._minHeight(), handles:o, start:function start(s, n){e(this).addClass("ui-dialog-resizing"), i._blockFrames(), i._trigger("resizeStart", s, t(n));}, resize:function resize(e, s){i._trigger("resize", e, t(s));}, stop:function stop(n, a){var o=i.uiDialog.offset(), r=o.left - i.document.scrollLeft(), h=o.top - i.document.scrollTop();s.height = i.uiDialog.height(), s.width = i.uiDialog.width(), s.position = {my:"left top", at:"left" + (r >= 0?"+":"") + r + " " + "top" + (h >= 0?"+":"") + h, of:i.window}, e(this).removeClass("ui-dialog-resizing"), i._unblockFrames(), i._trigger("resizeStop", n, t(a));}}).css("position", a);}, _trackFocus:function _trackFocus(){this._on(this.widget(), {focusin:function focusin(t){this._makeFocusTarget(), this._focusedElement = e(t.target);}});}, _makeFocusTarget:function _makeFocusTarget(){this._untrackInstance(), this._trackingInstances().unshift(this);}, _untrackInstance:function _untrackInstance(){var t=this._trackingInstances(), i=e.inArray(this, t);-1 !== i && t.splice(i, 1);}, _trackingInstances:function _trackingInstances(){var e=this.document.data("ui-dialog-instances");return (e || (e = [], this.document.data("ui-dialog-instances", e)), e);}, _minHeight:function _minHeight(){var e=this.options;return "auto" === e.height?e.minHeight:Math.min(e.minHeight, e.height);}, _position:function _position(){var e=this.uiDialog.is(":visible");e || this.uiDialog.show(), this.uiDialog.position(this.options.position), e || this.uiDialog.hide();}, _setOptions:function _setOptions(t){var i=this, s=!1, n={};e.each(t, function(e, t){i._setOption(e, t), e in i.sizeRelatedOptions && (s = !0), e in i.resizableRelatedOptions && (n[e] = t);}), s && (this._size(), this._position()), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", n);}, _setOption:function _setOption(e, t){var i, s, n=this.uiDialog;"dialogClass" === e && n.removeClass(this.options.dialogClass).addClass(t), "disabled" !== e && (this._super(e, t), "appendTo" === e && this.uiDialog.appendTo(this._appendTo()), "buttons" === e && this._createButtons(), "closeText" === e && this.uiDialogTitlebarClose.button({label:"" + t}), "draggable" === e && (i = n.is(":data(ui-draggable)"), i && !t && n.draggable("destroy"), !i && t && this._makeDraggable()), "position" === e && this._position(), "resizable" === e && (s = n.is(":data(ui-resizable)"), s && !t && n.resizable("destroy"), s && "string" == typeof t && n.resizable("option", "handles", t), s || t === !1 || this._makeResizable()), "title" === e && this._title(this.uiDialogTitlebar.find(".ui-dialog-title")));}, _size:function _size(){var e, t, i, s=this.options;this.element.show().css({width:"auto", minHeight:0, maxHeight:"none", height:0}), s.minWidth > s.width && (s.width = s.minWidth), e = this.uiDialog.css({height:"auto", width:s.width}).outerHeight(), t = Math.max(0, s.minHeight - e), i = "number" == typeof s.maxHeight?Math.max(0, s.maxHeight - e):"none", "auto" === s.height?this.element.css({minHeight:t, maxHeight:i, height:"auto"}):this.element.height(Math.max(0, s.height - e)), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight());}, _blockFrames:function _blockFrames(){this.iframeBlocks = this.document.find("iframe").map(function(){var t=e(this);return e("<div>").css({position:"absolute", width:t.outerWidth(), height:t.outerHeight()}).appendTo(t.parent()).offset(t.offset())[0];});}, _unblockFrames:function _unblockFrames(){this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks);}, _allowInteraction:function _allowInteraction(t){return e(t.target).closest(".ui-dialog").length?!0:!!e(t.target).closest(".ui-datepicker").length;}, _createOverlay:function _createOverlay(){if(this.options.modal){var t=!0;this._delay(function(){t = !1;}), this.document.data("ui-dialog-overlays") || this._on(this.document, {focusin:function focusin(e){t || this._allowInteraction(e) || (e.preventDefault(), this._trackingInstances()[0]._focusTabbable());}}), this.overlay = e("<div>").addClass("ui-widget-overlay ui-front").appendTo(this._appendTo()), this._on(this.overlay, {mousedown:"_keepFocus"}), this.document.data("ui-dialog-overlays", (this.document.data("ui-dialog-overlays") || 0) + 1);}}, _destroyOverlay:function _destroyOverlay(){if(this.options.modal && this.overlay){var e=this.document.data("ui-dialog-overlays") - 1;e?this.document.data("ui-dialog-overlays", e):this.document.unbind("focusin").removeData("ui-dialog-overlays"), this.overlay.remove(), this.overlay = null;}}}), e.widget("ui.progressbar", {version:"1.11.4", options:{max:100, value:0, change:null, complete:null}, min:0, _create:function _create(){this.oldValue = this.options.value = this._constrainedValue(), this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({role:"progressbar", "aria-valuemin":this.min}), this.valueDiv = e("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element), this._refreshValue();}, _destroy:function _destroy(){this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"), this.valueDiv.remove();}, value:function value(e){return void 0 === e?this.options.value:(this.options.value = this._constrainedValue(e), this._refreshValue(), void 0);}, _constrainedValue:function _constrainedValue(e){return (void 0 === e && (e = this.options.value), this.indeterminate = e === !1, "number" != typeof e && (e = 0), this.indeterminate?!1:Math.min(this.options.max, Math.max(this.min, e)));}, _setOptions:function _setOptions(e){var t=e.value;delete e.value, this._super(e), this.options.value = this._constrainedValue(t), this._refreshValue();}, _setOption:function _setOption(e, t){"max" === e && (t = Math.max(this.min, t)), "disabled" === e && this.element.toggleClass("ui-state-disabled", !!t).attr("aria-disabled", t), this._super(e, t);}, _percentage:function _percentage(){return this.indeterminate?100:100 * (this.options.value - this.min) / (this.options.max - this.min);}, _refreshValue:function _refreshValue(){var t=this.options.value, i=this._percentage();this.valueDiv.toggle(this.indeterminate || t > this.min).toggleClass("ui-corner-right", t === this.options.max).width(i.toFixed(0) + "%"), this.element.toggleClass("ui-progressbar-indeterminate", this.indeterminate), this.indeterminate?(this.element.removeAttr("aria-valuenow"), this.overlayDiv || (this.overlayDiv = e("<div class='ui-progressbar-overlay'></div>").appendTo(this.valueDiv))):(this.element.attr({"aria-valuemax":this.options.max, "aria-valuenow":t}), this.overlayDiv && (this.overlayDiv.remove(), this.overlayDiv = null)), this.oldValue !== t && (this.oldValue = t, this._trigger("change")), t === this.options.max && this._trigger("complete");}}), e.widget("ui.selectmenu", {version:"1.11.4", defaultElement:"<select>", options:{appendTo:null, disabled:null, icons:{button:"ui-icon-triangle-1-s"}, position:{my:"left top", at:"left bottom", collision:"none"}, width:null, change:null, close:null, focus:null, open:null, select:null}, _create:function _create(){var e=this.element.uniqueId().attr("id");this.ids = {element:e, button:e + "-button", menu:e + "-menu"}, this._drawButton(), this._drawMenu(), this.options.disabled && this.disable();}, _drawButton:function _drawButton(){var t=this;this.label = e("label[for='" + this.ids.element + "']").attr("for", this.ids.button), this._on(this.label, {click:function click(e){this.button.focus(), e.preventDefault();}}), this.element.hide(), this.button = e("<span>", {"class":"ui-selectmenu-button ui-widget ui-state-default ui-corner-all", tabindex:this.options.disabled?-1:0, id:this.ids.button, role:"combobox", "aria-expanded":"false", "aria-autocomplete":"list", "aria-owns":this.ids.menu, "aria-haspopup":"true"}).insertAfter(this.element), e("<span>", {"class":"ui-icon " + this.options.icons.button}).prependTo(this.button), this.buttonText = e("<span>", {"class":"ui-selectmenu-text"}).appendTo(this.button), this._setText(this.buttonText, this.element.find("option:selected").text()), this._resizeButton(), this._on(this.button, this._buttonEvents), this.button.one("focusin", function(){t.menuItems || t._refreshMenu();}), this._hoverable(this.button), this._focusable(this.button);}, _drawMenu:function _drawMenu(){var t=this;this.menu = e("<ul>", {"aria-hidden":"true", "aria-labelledby":this.ids.button, id:this.ids.menu}), this.menuWrap = e("<div>", {"class":"ui-selectmenu-menu ui-front"}).append(this.menu).appendTo(this._appendTo()), this.menuInstance = this.menu.menu({role:"listbox", select:function select(e, i){e.preventDefault(), t._setSelection(), t._select(i.item.data("ui-selectmenu-item"), e);}, focus:function focus(e, i){var s=i.item.data("ui-selectmenu-item");null != t.focusIndex && s.index !== t.focusIndex && (t._trigger("focus", e, {item:s}), t.isOpen || t._select(s, e)), t.focusIndex = s.index, t.button.attr("aria-activedescendant", t.menuItems.eq(s.index).attr("id"));}}).menu("instance"), this.menu.addClass("ui-corner-bottom").removeClass("ui-corner-all"), this.menuInstance._off(this.menu, "mouseleave"), this.menuInstance._closeOnDocumentClick = function(){return !1;}, this.menuInstance._isDivider = function(){return !1;};}, refresh:function refresh(){this._refreshMenu(), this._setText(this.buttonText, this._getSelectedItem().text()), this.options.width || this._resizeButton();}, _refreshMenu:function _refreshMenu(){this.menu.empty();var e, t=this.element.find("option");t.length && (this._parseOptions(t), this._renderMenu(this.menu, this.items), this.menuInstance.refresh(), this.menuItems = this.menu.find("li").not(".ui-selectmenu-optgroup"), e = this._getSelectedItem(), this.menuInstance.focus(null, e), this._setAria(e.data("ui-selectmenu-item")), this._setOption("disabled", this.element.prop("disabled")));}, open:function open(e){this.options.disabled || (this.menuItems?(this.menu.find(".ui-state-focus").removeClass("ui-state-focus"), this.menuInstance.focus(null, this._getSelectedItem())):this._refreshMenu(), this.isOpen = !0, this._toggleAttr(), this._resizeMenu(), this._position(), this._on(this.document, this._documentClick), this._trigger("open", e));}, _position:function _position(){this.menuWrap.position(e.extend({of:this.button}, this.options.position));}, close:function close(e){this.isOpen && (this.isOpen = !1, this._toggleAttr(), this.range = null, this._off(this.document), this._trigger("close", e));}, widget:function widget(){return this.button;}, menuWidget:function menuWidget(){return this.menu;}, _renderMenu:function _renderMenu(t, i){var s=this, n="";e.each(i, function(i, a){a.optgroup !== n && (e("<li>", {"class":"ui-selectmenu-optgroup ui-menu-divider" + (a.element.parent("optgroup").prop("disabled")?" ui-state-disabled":""), text:a.optgroup}).appendTo(t), n = a.optgroup), s._renderItemData(t, a);});}, _renderItemData:function _renderItemData(e, t){return this._renderItem(e, t).data("ui-selectmenu-item", t);}, _renderItem:function _renderItem(t, i){var s=e("<li>");return (i.disabled && s.addClass("ui-state-disabled"), this._setText(s, i.label), s.appendTo(t));}, _setText:function _setText(e, t){t?e.text(t):e.html("&#160;");}, _move:function _move(e, t){var i, s, n=".ui-menu-item";this.isOpen?i = this.menuItems.eq(this.focusIndex):(i = this.menuItems.eq(this.element[0].selectedIndex), n += ":not(.ui-state-disabled)"), s = "first" === e || "last" === e?i["first" === e?"prevAll":"nextAll"](n).eq(-1):i[e + "All"](n).eq(0), s.length && this.menuInstance.focus(t, s);}, _getSelectedItem:function _getSelectedItem(){return this.menuItems.eq(this.element[0].selectedIndex);}, _toggle:function _toggle(e){this[this.isOpen?"close":"open"](e);}, _setSelection:function _setSelection(){var e;this.range && (window.getSelection?(e = window.getSelection(), e.removeAllRanges(), e.addRange(this.range)):this.range.select(), this.button.focus());}, _documentClick:{mousedown:function mousedown(t){this.isOpen && (e(t.target).closest(".ui-selectmenu-menu, #" + this.ids.button).length || this.close(t));}}, _buttonEvents:{mousedown:function mousedown(){var e;window.getSelection?(e = window.getSelection(), e.rangeCount && (this.range = e.getRangeAt(0))):this.range = document.selection.createRange();}, click:function click(e){this._setSelection(), this._toggle(e);}, keydown:function keydown(t){var i=!0;switch(t.keyCode){case e.ui.keyCode.TAB:case e.ui.keyCode.ESCAPE:this.close(t), i = !1;break;case e.ui.keyCode.ENTER:this.isOpen && this._selectFocusedItem(t);break;case e.ui.keyCode.UP:t.altKey?this._toggle(t):this._move("prev", t);break;case e.ui.keyCode.DOWN:t.altKey?this._toggle(t):this._move("next", t);break;case e.ui.keyCode.SPACE:this.isOpen?this._selectFocusedItem(t):this._toggle(t);break;case e.ui.keyCode.LEFT:this._move("prev", t);break;case e.ui.keyCode.RIGHT:this._move("next", t);break;case e.ui.keyCode.HOME:case e.ui.keyCode.PAGE_UP:this._move("first", t);break;case e.ui.keyCode.END:case e.ui.keyCode.PAGE_DOWN:this._move("last", t);break;default:this.menu.trigger(t), i = !1;}i && t.preventDefault();}}, _selectFocusedItem:function _selectFocusedItem(e){var t=this.menuItems.eq(this.focusIndex);t.hasClass("ui-state-disabled") || this._select(t.data("ui-selectmenu-item"), e);}, _select:function _select(e, t){var i=this.element[0].selectedIndex;this.element[0].selectedIndex = e.index, this._setText(this.buttonText, e.label), this._setAria(e), this._trigger("select", t, {item:e}), e.index !== i && this._trigger("change", t, {item:e}), this.close(t);}, _setAria:function _setAria(e){var t=this.menuItems.eq(e.index).attr("id");this.button.attr({"aria-labelledby":t, "aria-activedescendant":t}), this.menu.attr("aria-activedescendant", t);}, _setOption:function _setOption(e, t){"icons" === e && this.button.find("span.ui-icon").removeClass(this.options.icons.button).addClass(t.button), this._super(e, t), "appendTo" === e && this.menuWrap.appendTo(this._appendTo()), "disabled" === e && (this.menuInstance.option("disabled", t), this.button.toggleClass("ui-state-disabled", t).attr("aria-disabled", t), this.element.prop("disabled", t), t?(this.button.attr("tabindex", -1), this.close()):this.button.attr("tabindex", 0)), "width" === e && this._resizeButton();}, _appendTo:function _appendTo(){var t=this.options.appendTo;return (t && (t = t.jquery || t.nodeType?e(t):this.document.find(t).eq(0)), t && t[0] || (t = this.element.closest(".ui-front")), t.length || (t = this.document[0].body), t);}, _toggleAttr:function _toggleAttr(){this.button.toggleClass("ui-corner-top", this.isOpen).toggleClass("ui-corner-all", !this.isOpen).attr("aria-expanded", this.isOpen), this.menuWrap.toggleClass("ui-selectmenu-open", this.isOpen), this.menu.attr("aria-hidden", !this.isOpen);}, _resizeButton:function _resizeButton(){var e=this.options.width;e || (e = this.element.show().outerWidth(), this.element.hide()), this.button.outerWidth(e);}, _resizeMenu:function _resizeMenu(){this.menu.outerWidth(Math.max(this.button.outerWidth(), this.menu.width("").outerWidth() + 1));}, _getCreateOptions:function _getCreateOptions(){return {disabled:this.element.prop("disabled")};}, _parseOptions:function _parseOptions(t){var i=[];t.each(function(t, s){var n=e(s), a=n.parent("optgroup");i.push({element:n, index:t, value:n.val(), label:n.text(), optgroup:a.attr("label") || "", disabled:a.prop("disabled") || n.prop("disabled")});}), this.items = i;}, _destroy:function _destroy(){this.menuWrap.remove(), this.button.remove(), this.element.show(), this.element.removeUniqueId(), this.label.attr("for", this.ids.element);}}), e.widget("ui.slider", e.ui.mouse, {version:"1.11.4", widgetEventPrefix:"slide", options:{animate:!1, distance:0, max:100, min:0, orientation:"horizontal", range:!1, step:1, value:0, values:null, change:null, slide:null, start:null, stop:null}, numPages:5, _create:function _create(){this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this._calculateNewMax(), this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget" + " ui-widget-content" + " ui-corner-all"), this._refresh(), this._setOption("disabled", this.options.disabled), this._animateOff = !1;}, _refresh:function _refresh(){this._createRange(), this._createHandles(), this._setupEvents(), this._refreshValue();}, _createHandles:function _createHandles(){var t, i, s=this.options, n=this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"), a="<span class='ui-slider-handle ui-state-default ui-corner-all' tabindex='0'></span>", o=[];for(i = s.values && s.values.length || 1, n.length > i && (n.slice(i).remove(), n = n.slice(0, i)), t = n.length; i > t; t++) o.push(a);this.handles = n.add(e(o.join("")).appendTo(this.element)), this.handle = this.handles.eq(0), this.handles.each(function(t){e(this).data("ui-slider-handle-index", t);});}, _createRange:function _createRange(){var t=this.options, i="";t.range?(t.range === !0 && (t.values?t.values.length && 2 !== t.values.length?t.values = [t.values[0], t.values[0]]:e.isArray(t.values) && (t.values = t.values.slice(0)):t.values = [this._valueMin(), this._valueMin()]), this.range && this.range.length?this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({left:"", bottom:""}):(this.range = e("<div></div>").appendTo(this.element), i = "ui-slider-range ui-widget-header ui-corner-all"), this.range.addClass(i + ("min" === t.range || "max" === t.range?" ui-slider-range-" + t.range:""))):(this.range && this.range.remove(), this.range = null);}, _setupEvents:function _setupEvents(){this._off(this.handles), this._on(this.handles, this._handleEvents), this._hoverable(this.handles), this._focusable(this.handles);}, _destroy:function _destroy(){this.handles.remove(), this.range && this.range.remove(), this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"), this._mouseDestroy();}, _mouseCapture:function _mouseCapture(t){var i, s, n, a, o, r, h, l, u=this, d=this.options;return d.disabled?!1:(this.elementSize = {width:this.element.outerWidth(), height:this.element.outerHeight()}, this.elementOffset = this.element.offset(), i = {x:t.pageX, y:t.pageY}, s = this._normValueFromMouse(i), n = this._valueMax() - this._valueMin() + 1, this.handles.each(function(t){var i=Math.abs(s - u.values(t));(n > i || n === i && (t === u._lastChangedValue || u.values(t) === d.min)) && (n = i, a = e(this), o = t);}), r = this._start(t, o), r === !1?!1:(this._mouseSliding = !0, this._handleIndex = o, a.addClass("ui-state-active").focus(), h = a.offset(), l = !e(t.target).parents().addBack().is(".ui-slider-handle"), this._clickOffset = l?{left:0, top:0}:{left:t.pageX - h.left - a.width() / 2, top:t.pageY - h.top - a.height() / 2 - (parseInt(a.css("borderTopWidth"), 10) || 0) - (parseInt(a.css("borderBottomWidth"), 10) || 0) + (parseInt(a.css("marginTop"), 10) || 0)}, this.handles.hasClass("ui-state-hover") || this._slide(t, o, s), this._animateOff = !0, !0));}, _mouseStart:function _mouseStart(){return !0;}, _mouseDrag:function _mouseDrag(e){var t={x:e.pageX, y:e.pageY}, i=this._normValueFromMouse(t);return (this._slide(e, this._handleIndex, i), !1);}, _mouseStop:function _mouseStop(e){return (this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(e, this._handleIndex), this._change(e, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1);}, _detectOrientation:function _detectOrientation(){this.orientation = "vertical" === this.options.orientation?"vertical":"horizontal";}, _normValueFromMouse:function _normValueFromMouse(e){var t, i, s, n, a;return ("horizontal" === this.orientation?(t = this.elementSize.width, i = e.x - this.elementOffset.left - (this._clickOffset?this._clickOffset.left:0)):(t = this.elementSize.height, i = e.y - this.elementOffset.top - (this._clickOffset?this._clickOffset.top:0)), s = i / t, s > 1 && (s = 1), 0 > s && (s = 0), "vertical" === this.orientation && (s = 1 - s), n = this._valueMax() - this._valueMin(), a = this._valueMin() + s * n, this._trimAlignValue(a));}, _start:function _start(e, t){var i={handle:this.handles[t], value:this.value()};return (this.options.values && this.options.values.length && (i.value = this.values(t), i.values = this.values()), this._trigger("start", e, i));}, _slide:function _slide(e, t, i){var s, n, a;this.options.values && this.options.values.length?(s = this.values(t?0:1), 2 === this.options.values.length && this.options.range === !0 && (0 === t && i > s || 1 === t && s > i) && (i = s), i !== this.values(t) && (n = this.values(), n[t] = i, a = this._trigger("slide", e, {handle:this.handles[t], value:i, values:n}), s = this.values(t?0:1), a !== !1 && this.values(t, i))):i !== this.value() && (a = this._trigger("slide", e, {handle:this.handles[t], value:i}), a !== !1 && this.value(i));}, _stop:function _stop(e, t){var i={handle:this.handles[t], value:this.value()};this.options.values && this.options.values.length && (i.value = this.values(t), i.values = this.values()), this._trigger("stop", e, i);}, _change:function _change(e, t){if(!this._keySliding && !this._mouseSliding){var i={handle:this.handles[t], value:this.value()};this.options.values && this.options.values.length && (i.value = this.values(t), i.values = this.values()), this._lastChangedValue = t, this._trigger("change", e, i);}}, value:function value(e){return arguments.length?(this.options.value = this._trimAlignValue(e), this._refreshValue(), this._change(null, 0), void 0):this._value();}, values:function values(t, i){var s, n, a;if(arguments.length > 1){return (this.options.values[t] = this._trimAlignValue(i), this._refreshValue(), this._change(null, t), void 0);}if(!arguments.length){return this._values();}if(!e.isArray(arguments[0])){return this.options.values && this.options.values.length?this._values(t):this.value();}for(s = this.options.values, n = arguments[0], a = 0; s.length > a; a += 1) s[a] = this._trimAlignValue(n[a]), this._change(null, a);this._refreshValue();}, _setOption:function _setOption(t, i){var s, n=0;switch(("range" === t && this.options.range === !0 && ("min" === i?(this.options.value = this._values(0), this.options.values = null):"max" === i && (this.options.value = this._values(this.options.values.length - 1), this.options.values = null)), e.isArray(this.options.values) && (n = this.options.values.length), "disabled" === t && this.element.toggleClass("ui-state-disabled", !!i), this._super(t, i), t)){case "orientation":this._detectOrientation(), this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation), this._refreshValue(), this.handles.css("horizontal" === i?"bottom":"left", "");break;case "value":this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;break;case "values":for(this._animateOff = !0, this._refreshValue(), s = 0; n > s; s += 1) this._change(null, s);this._animateOff = !1;break;case "step":case "min":case "max":this._animateOff = !0, this._calculateNewMax(), this._refreshValue(), this._animateOff = !1;break;case "range":this._animateOff = !0, this._refresh(), this._animateOff = !1;}}, _value:function _value(){var e=this.options.value;return e = this._trimAlignValue(e);}, _values:function _values(e){var t, i, s;if(arguments.length){return (t = this.options.values[e], t = this._trimAlignValue(t));}if(this.options.values && this.options.values.length){for(i = this.options.values.slice(), s = 0; i.length > s; s += 1) i[s] = this._trimAlignValue(i[s]);return i;}return [];}, _trimAlignValue:function _trimAlignValue(e){if(this._valueMin() >= e){return this._valueMin();}if(e >= this._valueMax()){return this._valueMax();}var t=this.options.step > 0?this.options.step:1, i=(e - this._valueMin()) % t, s=e - i;return (2 * Math.abs(i) >= t && (s += i > 0?t:-t), parseFloat(s.toFixed(5)));}, _calculateNewMax:function _calculateNewMax(){var e=this.options.max, t=this._valueMin(), i=this.options.step, s=Math.floor(+(e - t).toFixed(this._precision()) / i) * i;e = s + t, this.max = parseFloat(e.toFixed(this._precision()));}, _precision:function _precision(){var e=this._precisionOf(this.options.step);return (null !== this.options.min && (e = Math.max(e, this._precisionOf(this.options.min))), e);}, _precisionOf:function _precisionOf(e){var t="" + e, i=t.indexOf(".");return -1 === i?0:t.length - i - 1;}, _valueMin:function _valueMin(){return this.options.min;}, _valueMax:function _valueMax(){return this.max;}, _refreshValue:function _refreshValue(){var t, i, s, n, a, o=this.options.range, r=this.options, h=this, l=this._animateOff?!1:r.animate, u={};this.options.values && this.options.values.length?this.handles.each(function(s){i = 100 * ((h.values(s) - h._valueMin()) / (h._valueMax() - h._valueMin())), u["horizontal" === h.orientation?"left":"bottom"] = i + "%", e(this).stop(1, 1)[l?"animate":"css"](u, r.animate), h.options.range === !0 && ("horizontal" === h.orientation?(0 === s && h.range.stop(1, 1)[l?"animate":"css"]({left:i + "%"}, r.animate), 1 === s && h.range[l?"animate":"css"]({width:i - t + "%"}, {queue:!1, duration:r.animate})):(0 === s && h.range.stop(1, 1)[l?"animate":"css"]({bottom:i + "%"}, r.animate), 1 === s && h.range[l?"animate":"css"]({height:i - t + "%"}, {queue:!1, duration:r.animate}))), t = i;}):(s = this.value(), n = this._valueMin(), a = this._valueMax(), i = a !== n?100 * ((s - n) / (a - n)):0, u["horizontal" === this.orientation?"left":"bottom"] = i + "%", this.handle.stop(1, 1)[l?"animate":"css"](u, r.animate), "min" === o && "horizontal" === this.orientation && this.range.stop(1, 1)[l?"animate":"css"]({width:i + "%"}, r.animate), "max" === o && "horizontal" === this.orientation && this.range[l?"animate":"css"]({width:100 - i + "%"}, {queue:!1, duration:r.animate}), "min" === o && "vertical" === this.orientation && this.range.stop(1, 1)[l?"animate":"css"]({height:i + "%"}, r.animate), "max" === o && "vertical" === this.orientation && this.range[l?"animate":"css"]({height:100 - i + "%"}, {queue:!1, duration:r.animate}));}, _handleEvents:{keydown:function keydown(t){var i, s, n, a, o=e(t.target).data("ui-slider-handle-index");switch(t.keyCode){case e.ui.keyCode.HOME:case e.ui.keyCode.END:case e.ui.keyCode.PAGE_UP:case e.ui.keyCode.PAGE_DOWN:case e.ui.keyCode.UP:case e.ui.keyCode.RIGHT:case e.ui.keyCode.DOWN:case e.ui.keyCode.LEFT:if((t.preventDefault(), !this._keySliding && (this._keySliding = !0, e(t.target).addClass("ui-state-active"), i = this._start(t, o), i === !1))){return;}}switch((a = this.options.step, s = n = this.options.values && this.options.values.length?this.values(o):this.value(), t.keyCode)){case e.ui.keyCode.HOME:n = this._valueMin();break;case e.ui.keyCode.END:n = this._valueMax();break;case e.ui.keyCode.PAGE_UP:n = this._trimAlignValue(s + (this._valueMax() - this._valueMin()) / this.numPages);break;case e.ui.keyCode.PAGE_DOWN:n = this._trimAlignValue(s - (this._valueMax() - this._valueMin()) / this.numPages);break;case e.ui.keyCode.UP:case e.ui.keyCode.RIGHT:if(s === this._valueMax()){return;}n = this._trimAlignValue(s + a);break;case e.ui.keyCode.DOWN:case e.ui.keyCode.LEFT:if(s === this._valueMin()){return;}n = this._trimAlignValue(s - a);}this._slide(t, o, n);}, keyup:function keyup(t){var i=e(t.target).data("ui-slider-handle-index");this._keySliding && (this._keySliding = !1, this._stop(t, i), this._change(t, i), e(t.target).removeClass("ui-state-active"));}}}), e.widget("ui.spinner", {version:"1.11.4", defaultElement:"<input>", widgetEventPrefix:"spin", options:{culture:null, icons:{down:"ui-icon-triangle-1-s", up:"ui-icon-triangle-1-n"}, incremental:!0, max:null, min:null, numberFormat:null, page:10, step:1, change:null, spin:null, start:null, stop:null}, _create:function _create(){this._setOption("max", this.options.max), this._setOption("min", this.options.min), this._setOption("step", this.options.step), "" !== this.value() && this._value(this.element.val(), !0), this._draw(), this._on(this._events), this._refresh(), this._on(this.window, {beforeunload:function beforeunload(){this.element.removeAttr("autocomplete");}});}, _getCreateOptions:function _getCreateOptions(){var t={}, i=this.element;return (e.each(["min", "max", "step"], function(e, s){var n=i.attr(s);void 0 !== n && n.length && (t[s] = n);}), t);}, _events:{keydown:function keydown(e){this._start(e) && this._keydown(e) && e.preventDefault();}, keyup:"_stop", focus:function focus(){this.previous = this.element.val();}, blur:function blur(e){return this.cancelBlur?(delete this.cancelBlur, void 0):(this._stop(), this._refresh(), this.previous !== this.element.val() && this._trigger("change", e), void 0);}, mousewheel:function mousewheel(e, t){if(t){if(!this.spinning && !this._start(e)){return !1;}this._spin((t > 0?1:-1) * this.options.step, e), clearTimeout(this.mousewheelTimer), this.mousewheelTimer = this._delay(function(){this.spinning && this._stop(e);}, 100), e.preventDefault();}}, "mousedown .ui-spinner-button":function mousedownUiSpinnerButton(t){function i(){var e=this.element[0] === this.document[0].activeElement;e || (this.element.focus(), this.previous = s, this._delay(function(){this.previous = s;}));}var s;s = this.element[0] === this.document[0].activeElement?this.previous:this.element.val(), t.preventDefault(), i.call(this), this.cancelBlur = !0, this._delay(function(){delete this.cancelBlur, i.call(this);}), this._start(t) !== !1 && this._repeat(null, e(t.currentTarget).hasClass("ui-spinner-up")?1:-1, t);}, "mouseup .ui-spinner-button":"_stop", "mouseenter .ui-spinner-button":function mouseenterUiSpinnerButton(t){return e(t.currentTarget).hasClass("ui-state-active")?this._start(t) === !1?!1:(this._repeat(null, e(t.currentTarget).hasClass("ui-spinner-up")?1:-1, t), void 0):void 0;}, "mouseleave .ui-spinner-button":"_stop"}, _draw:function _draw(){var e=this.uiSpinner = this.element.addClass("ui-spinner-input").attr("autocomplete", "off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml());this.element.attr("role", "spinbutton"), this.buttons = e.find(".ui-spinner-button").attr("tabIndex", -1).button().removeClass("ui-corner-all"), this.buttons.height() > Math.ceil(0.5 * e.height()) && e.height() > 0 && e.height(e.height()), this.options.disabled && this.disable();}, _keydown:function _keydown(t){var i=this.options, s=e.ui.keyCode;switch(t.keyCode){case s.UP:return (this._repeat(null, 1, t), !0);case s.DOWN:return (this._repeat(null, -1, t), !0);case s.PAGE_UP:return (this._repeat(null, i.page, t), !0);case s.PAGE_DOWN:return (this._repeat(null, -i.page, t), !0);}return !1;}, _uiSpinnerHtml:function _uiSpinnerHtml(){return "<span class='ui-spinner ui-widget ui-widget-content ui-corner-all'></span>";}, _buttonHtml:function _buttonHtml(){return "<a class='ui-spinner-button ui-spinner-up ui-corner-tr'><span class='ui-icon " + this.options.icons.up + "'>&#9650;</span>" + "</a>" + "<a class='ui-spinner-button ui-spinner-down ui-corner-br'>" + "<span class='ui-icon " + this.options.icons.down + "'>&#9660;</span>" + "</a>";}, _start:function _start(e){return this.spinning || this._trigger("start", e) !== !1?(this.counter || (this.counter = 1), this.spinning = !0, !0):!1;}, _repeat:function _repeat(e, t, i){e = e || 500, clearTimeout(this.timer), this.timer = this._delay(function(){this._repeat(40, t, i);}, e), this._spin(t * this.options.step, i);}, _spin:function _spin(e, t){var i=this.value() || 0;this.counter || (this.counter = 1), i = this._adjustValue(i + e * this._increment(this.counter)), this.spinning && this._trigger("spin", t, {value:i}) === !1 || (this._value(i), this.counter++);}, _increment:function _increment(t){var i=this.options.incremental;return i?e.isFunction(i)?i(t):Math.floor(t * t * t / 50000 - t * t / 500 + 17 * t / 200 + 1):1;}, _precision:function _precision(){var e=this._precisionOf(this.options.step);return (null !== this.options.min && (e = Math.max(e, this._precisionOf(this.options.min))), e);}, _precisionOf:function _precisionOf(e){var t="" + e, i=t.indexOf(".");return -1 === i?0:t.length - i - 1;}, _adjustValue:function _adjustValue(e){var t, i, s=this.options;return (t = null !== s.min?s.min:0, i = e - t, i = Math.round(i / s.step) * s.step, e = t + i, e = parseFloat(e.toFixed(this._precision())), null !== s.max && e > s.max?s.max:null !== s.min && s.min > e?s.min:e);}, _stop:function _stop(e){this.spinning && (clearTimeout(this.timer), clearTimeout(this.mousewheelTimer), this.counter = 0, this.spinning = !1, this._trigger("stop", e));}, _setOption:function _setOption(e, t){if("culture" === e || "numberFormat" === e){var i=this._parse(this.element.val());return (this.options[e] = t, this.element.val(this._format(i)), void 0);}("max" === e || "min" === e || "step" === e) && "string" == typeof t && (t = this._parse(t)), "icons" === e && (this.buttons.first().find(".ui-icon").removeClass(this.options.icons.up).addClass(t.up), this.buttons.last().find(".ui-icon").removeClass(this.options.icons.down).addClass(t.down)), this._super(e, t), "disabled" === e && (this.widget().toggleClass("ui-state-disabled", !!t), this.element.prop("disabled", !!t), this.buttons.button(t?"disable":"enable"));}, _setOptions:h(function(e){this._super(e);}), _parse:function _parse(e){return ("string" == typeof e && "" !== e && (e = window.Globalize && this.options.numberFormat?Globalize.parseFloat(e, 10, this.options.culture):+e), "" === e || isNaN(e)?null:e);}, _format:function _format(e){return "" === e?"":window.Globalize && this.options.numberFormat?Globalize.format(e, this.options.numberFormat, this.options.culture):e;}, _refresh:function _refresh(){this.element.attr({"aria-valuemin":this.options.min, "aria-valuemax":this.options.max, "aria-valuenow":this._parse(this.element.val())});}, isValid:function isValid(){var e=this.value();return null === e?!1:e === this._adjustValue(e);}, _value:function _value(e, t){var i;"" !== e && (i = this._parse(e), null !== i && (t || (i = this._adjustValue(i)), e = this._format(i))), this.element.val(e), this._refresh();}, _destroy:function _destroy(){this.element.removeClass("ui-spinner-input").prop("disabled", !1).removeAttr("autocomplete").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"), this.uiSpinner.replaceWith(this.element);}, stepUp:h(function(e){this._stepUp(e);}), _stepUp:function _stepUp(e){this._start() && (this._spin((e || 1) * this.options.step), this._stop());}, stepDown:h(function(e){this._stepDown(e);}), _stepDown:function _stepDown(e){this._start() && (this._spin((e || 1) * -this.options.step), this._stop());}, pageUp:h(function(e){this._stepUp((e || 1) * this.options.page);}), pageDown:h(function(e){this._stepDown((e || 1) * this.options.page);}), value:function value(e){return arguments.length?(h(this._value).call(this, e), void 0):this._parse(this.element.val());}, widget:function widget(){return this.uiSpinner;}}), e.widget("ui.tabs", {version:"1.11.4", delay:300, options:{active:null, collapsible:!1, event:"click", heightStyle:"content", hide:null, show:null, activate:null, beforeActivate:null, beforeLoad:null, load:null}, _isLocal:(function(){var e=/#.*$/;return function(t){var i, s;t = t.cloneNode(!1), i = t.href.replace(e, ""), s = location.href.replace(e, "");try{i = decodeURIComponent(i);}catch(n) {}try{s = decodeURIComponent(s);}catch(n) {}return t.hash.length > 1 && i === s;};})(), _create:function _create(){var t=this, i=this.options;this.running = !1, this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible", i.collapsible), this._processTabs(), i.active = this._initialActive(), e.isArray(i.disabled) && (i.disabled = e.unique(i.disabled.concat(e.map(this.tabs.filter(".ui-state-disabled"), function(e){return t.tabs.index(e);}))).sort()), this.active = this.options.active !== !1 && this.anchors.length?this._findActive(i.active):e(), this._refresh(), this.active.length && this.load(i.active);}, _initialActive:function _initialActive(){var t=this.options.active, i=this.options.collapsible, s=location.hash.substring(1);return (null === t && (s && this.tabs.each(function(i, n){return e(n).attr("aria-controls") === s?(t = i, !1):void 0;}), null === t && (t = this.tabs.index(this.tabs.filter(".ui-tabs-active"))), (null === t || -1 === t) && (t = this.tabs.length?0:!1)), t !== !1 && (t = this.tabs.index(this.tabs.eq(t)), -1 === t && (t = i?!1:0)), !i && t === !1 && this.anchors.length && (t = 0), t);}, _getCreateEventData:function _getCreateEventData(){return {tab:this.active, panel:this.active.length?this._getPanelForTab(this.active):e()};}, _tabKeydown:function _tabKeydown(t){var i=e(this.document[0].activeElement).closest("li"), s=this.tabs.index(i), n=!0;if(!this._handlePageNav(t)){switch(t.keyCode){case e.ui.keyCode.RIGHT:case e.ui.keyCode.DOWN:s++;break;case e.ui.keyCode.UP:case e.ui.keyCode.LEFT:n = !1, s--;break;case e.ui.keyCode.END:s = this.anchors.length - 1;break;case e.ui.keyCode.HOME:s = 0;break;case e.ui.keyCode.SPACE:return (t.preventDefault(), clearTimeout(this.activating), this._activate(s), void 0);case e.ui.keyCode.ENTER:return (t.preventDefault(), clearTimeout(this.activating), this._activate(s === this.options.active?!1:s), void 0);default:return;}t.preventDefault(), clearTimeout(this.activating), s = this._focusNextTab(s, n), t.ctrlKey || t.metaKey || (i.attr("aria-selected", "false"), this.tabs.eq(s).attr("aria-selected", "true"), this.activating = this._delay(function(){this.option("active", s);}, this.delay));}}, _panelKeydown:function _panelKeydown(t){this._handlePageNav(t) || t.ctrlKey && t.keyCode === e.ui.keyCode.UP && (t.preventDefault(), this.active.focus());}, _handlePageNav:function _handlePageNav(t){return t.altKey && t.keyCode === e.ui.keyCode.PAGE_UP?(this._activate(this._focusNextTab(this.options.active - 1, !1)), !0):t.altKey && t.keyCode === e.ui.keyCode.PAGE_DOWN?(this._activate(this._focusNextTab(this.options.active + 1, !0)), !0):void 0;}, _findNextTab:function _findNextTab(t, i){function s(){return (t > n && (t = 0), 0 > t && (t = n), t);}for(var n=this.tabs.length - 1; -1 !== e.inArray(s(), this.options.disabled);) t = i?t + 1:t - 1;return t;}, _focusNextTab:function _focusNextTab(e, t){return (e = this._findNextTab(e, t), this.tabs.eq(e).focus(), e);}, _setOption:function _setOption(e, t){return "active" === e?(this._activate(t), void 0):"disabled" === e?(this._setupDisabled(t), void 0):(this._super(e, t), "collapsible" === e && (this.element.toggleClass("ui-tabs-collapsible", t), t || this.options.active !== !1 || this._activate(0)), "event" === e && this._setupEvents(t), "heightStyle" === e && this._setupHeightStyle(t), void 0);}, _sanitizeSelector:function _sanitizeSelector(e){return e?e.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&"):"";}, refresh:function refresh(){var t=this.options, i=this.tablist.children(":has(a[href])");t.disabled = e.map(i.filter(".ui-state-disabled"), function(e){return i.index(e);}), this._processTabs(), t.active !== !1 && this.anchors.length?this.active.length && !e.contains(this.tablist[0], this.active[0])?this.tabs.length === t.disabled.length?(t.active = !1, this.active = e()):this._activate(this._findNextTab(Math.max(0, t.active - 1), !1)):t.active = this.tabs.index(this.active):(t.active = !1, this.active = e()), this._refresh();}, _refresh:function _refresh(){this._setupDisabled(this.options.disabled), this._setupEvents(this.options.event), this._setupHeightStyle(this.options.heightStyle), this.tabs.not(this.active).attr({"aria-selected":"false", "aria-expanded":"false", tabIndex:-1}), this.panels.not(this._getPanelForTab(this.active)).hide().attr({"aria-hidden":"true"}), this.active.length?(this.active.addClass("ui-tabs-active ui-state-active").attr({"aria-selected":"true", "aria-expanded":"true", tabIndex:0}), this._getPanelForTab(this.active).show().attr({"aria-hidden":"false"})):this.tabs.eq(0).attr("tabIndex", 0);}, _processTabs:function _processTabs(){var t=this, i=this.tabs, s=this.anchors, n=this.panels;this.tablist = this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role", "tablist").delegate("> li", "mousedown" + this.eventNamespace, function(t){e(this).is(".ui-state-disabled") && t.preventDefault();}).delegate(".ui-tabs-anchor", "focus" + this.eventNamespace, function(){e(this).closest("li").is(".ui-state-disabled") && this.blur();}), this.tabs = this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({role:"tab", tabIndex:-1}), this.anchors = this.tabs.map(function(){return e("a", this)[0];}).addClass("ui-tabs-anchor").attr({role:"presentation", tabIndex:-1}), this.panels = e(), this.anchors.each(function(i, s){var n, a, o, r=e(s).uniqueId().attr("id"), h=e(s).closest("li"), l=h.attr("aria-controls");t._isLocal(s)?(n = s.hash, o = n.substring(1), a = t.element.find(t._sanitizeSelector(n))):(o = h.attr("aria-controls") || e({}).uniqueId()[0].id, n = "#" + o, a = t.element.find(n), a.length || (a = t._createPanel(o), a.insertAfter(t.panels[i - 1] || t.tablist)), a.attr("aria-live", "polite")), a.length && (t.panels = t.panels.add(a)), l && h.data("ui-tabs-aria-controls", l), h.attr({"aria-controls":o, "aria-labelledby":r}), a.attr("aria-labelledby", r);}), this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role", "tabpanel"), i && (this._off(i.not(this.tabs)), this._off(s.not(this.anchors)), this._off(n.not(this.panels)));}, _getList:function _getList(){return this.tablist || this.element.find("ol,ul").eq(0);}, _createPanel:function _createPanel(t){return e("<div>").attr("id", t).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy", !0);}, _setupDisabled:function _setupDisabled(t){e.isArray(t) && (t.length?t.length === this.anchors.length && (t = !0):t = !1);for(var i, s=0; i = this.tabs[s]; s++) t === !0 || -1 !== e.inArray(s, t)?e(i).addClass("ui-state-disabled").attr("aria-disabled", "true"):e(i).removeClass("ui-state-disabled").removeAttr("aria-disabled");this.options.disabled = t;}, _setupEvents:function _setupEvents(t){var i={};t && e.each(t.split(" "), function(e, t){i[t] = "_eventHandler";}), this._off(this.anchors.add(this.tabs).add(this.panels)), this._on(!0, this.anchors, {click:function click(e){e.preventDefault();}}), this._on(this.anchors, i), this._on(this.tabs, {keydown:"_tabKeydown"}), this._on(this.panels, {keydown:"_panelKeydown"}), this._focusable(this.tabs), this._hoverable(this.tabs);}, _setupHeightStyle:function _setupHeightStyle(t){var i, s=this.element.parent();"fill" === t?(i = s.height(), i -= this.element.outerHeight() - this.element.height(), this.element.siblings(":visible").each(function(){var t=e(this), s=t.css("position");"absolute" !== s && "fixed" !== s && (i -= t.outerHeight(!0));}), this.element.children().not(this.panels).each(function(){i -= e(this).outerHeight(!0);}), this.panels.each(function(){e(this).height(Math.max(0, i - e(this).innerHeight() + e(this).height()));}).css("overflow", "auto")):"auto" === t && (i = 0, this.panels.each(function(){i = Math.max(i, e(this).height("").height());}).height(i));}, _eventHandler:function _eventHandler(t){var i=this.options, s=this.active, n=e(t.currentTarget), a=n.closest("li"), o=a[0] === s[0], r=o && i.collapsible, h=r?e():this._getPanelForTab(a), l=s.length?this._getPanelForTab(s):e(), u={oldTab:s, oldPanel:l, newTab:r?e():a, newPanel:h};t.preventDefault(), a.hasClass("ui-state-disabled") || a.hasClass("ui-tabs-loading") || this.running || o && !i.collapsible || this._trigger("beforeActivate", t, u) === !1 || (i.active = r?!1:this.tabs.index(a), this.active = o?e():a, this.xhr && this.xhr.abort(), l.length || h.length || e.error("jQuery UI Tabs: Mismatching fragment identifier."), h.length && this.load(this.tabs.index(a), t), this._toggle(t, u));}, _toggle:function _toggle(t, i){function s(){a.running = !1, a._trigger("activate", t, i);}function n(){i.newTab.closest("li").addClass("ui-tabs-active ui-state-active"), o.length && a.options.show?a._show(o, a.options.show, s):(o.show(), s());}var a=this, o=i.newPanel, r=i.oldPanel;this.running = !0, r.length && this.options.hide?this._hide(r, this.options.hide, function(){i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), n();}):(i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), r.hide(), n()), r.attr("aria-hidden", "true"), i.oldTab.attr({"aria-selected":"false", "aria-expanded":"false"}), o.length && r.length?i.oldTab.attr("tabIndex", -1):o.length && this.tabs.filter(function(){return 0 === e(this).attr("tabIndex");}).attr("tabIndex", -1), o.attr("aria-hidden", "false"), i.newTab.attr({"aria-selected":"true", "aria-expanded":"true", tabIndex:0});}, _activate:function _activate(t){var i, s=this._findActive(t);s[0] !== this.active[0] && (s.length || (s = this.active), i = s.find(".ui-tabs-anchor")[0], this._eventHandler({target:i, currentTarget:i, preventDefault:e.noop}));}, _findActive:function _findActive(t){return t === !1?e():this.tabs.eq(t);}, _getIndex:function _getIndex(e){return ("string" == typeof e && (e = this.anchors.index(this.anchors.filter("[href$='" + e + "']"))), e);}, _destroy:function _destroy(){this.xhr && this.xhr.abort(), this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"), this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role"), this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeUniqueId(), this.tablist.unbind(this.eventNamespace), this.tabs.add(this.panels).each(function(){e.data(this, "ui-tabs-destroy")?e(this).remove():e(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role");}), this.tabs.each(function(){var t=e(this), i=t.data("ui-tabs-aria-controls");i?t.attr("aria-controls", i).removeData("ui-tabs-aria-controls"):t.removeAttr("aria-controls");}), this.panels.show(), "content" !== this.options.heightStyle && this.panels.css("height", "");}, enable:function enable(t){var i=this.options.disabled;i !== !1 && (void 0 === t?i = !1:(t = this._getIndex(t), i = e.isArray(i)?e.map(i, function(e){return e !== t?e:null;}):e.map(this.tabs, function(e, i){return i !== t?i:null;})), this._setupDisabled(i));}, disable:function disable(t){var i=this.options.disabled;if(i !== !0){if(void 0 === t)i = !0;else {if((t = this._getIndex(t), -1 !== e.inArray(t, i))){return;}i = e.isArray(i)?e.merge([t], i).sort():[t];}this._setupDisabled(i);}}, load:function load(t, i){t = this._getIndex(t);var s=this, n=this.tabs.eq(t), a=n.find(".ui-tabs-anchor"), o=this._getPanelForTab(n), r={tab:n, panel:o}, h=function h(e, t){"abort" === t && s.panels.stop(!1, !0), n.removeClass("ui-tabs-loading"), o.removeAttr("aria-busy"), e === s.xhr && delete s.xhr;};this._isLocal(a[0]) || (this.xhr = e.ajax(this._ajaxSettings(a, i, r)), this.xhr && "canceled" !== this.xhr.statusText && (n.addClass("ui-tabs-loading"), o.attr("aria-busy", "true"), this.xhr.done(function(e, t, n){setTimeout(function(){o.html(e), s._trigger("load", i, r), h(n, t);}, 1);}).fail(function(e, t){setTimeout(function(){h(e, t);}, 1);})));}, _ajaxSettings:function _ajaxSettings(t, i, s){var n=this;return {url:t.attr("href"), beforeSend:function beforeSend(t, a){return n._trigger("beforeLoad", i, e.extend({jqXHR:t, ajaxSettings:a}, s));}};}, _getPanelForTab:function _getPanelForTab(t){var i=e(t).attr("aria-controls");return this.element.find(this._sanitizeSelector("#" + i));}}), e.widget("ui.tooltip", {version:"1.11.4", options:{content:function content(){var t=e(this).attr("title") || "";return e("<a>").text(t).html();}, hide:!0, items:"[title]:not([disabled])", position:{my:"left top+15", at:"left bottom", collision:"flipfit flip"}, show:!0, tooltipClass:null, track:!1, close:null, open:null}, _addDescribedBy:function _addDescribedBy(t, i){var s=(t.attr("aria-describedby") || "").split(/\s+/);s.push(i), t.data("ui-tooltip-id", i).attr("aria-describedby", e.trim(s.join(" ")));}, _removeDescribedBy:function _removeDescribedBy(t){var i=t.data("ui-tooltip-id"), s=(t.attr("aria-describedby") || "").split(/\s+/), n=e.inArray(i, s);-1 !== n && s.splice(n, 1), t.removeData("ui-tooltip-id"), s = e.trim(s.join(" ")), s?t.attr("aria-describedby", s):t.removeAttr("aria-describedby");}, _create:function _create(){this._on({mouseover:"open", focusin:"open"}), this.tooltips = {}, this.parents = {}, this.options.disabled && this._disable(), this.liveRegion = e("<div>").attr({role:"log", "aria-live":"assertive", "aria-relevant":"additions"}).addClass("ui-helper-hidden-accessible").appendTo(this.document[0].body);}, _setOption:function _setOption(t, i){var s=this;return "disabled" === t?(this[i?"_disable":"_enable"](), this.options[t] = i, void 0):(this._super(t, i), "content" === t && e.each(this.tooltips, function(e, t){s._updateContent(t.element);}), void 0);}, _disable:function _disable(){var t=this;e.each(this.tooltips, function(i, s){var n=e.Event("blur");n.target = n.currentTarget = s.element[0], t.close(n, !0);}), this.element.find(this.options.items).addBack().each(function(){var t=e(this);t.is("[title]") && t.data("ui-tooltip-title", t.attr("title")).removeAttr("title");});}, _enable:function _enable(){this.element.find(this.options.items).addBack().each(function(){var t=e(this);t.data("ui-tooltip-title") && t.attr("title", t.data("ui-tooltip-title"));});}, open:function open(t){var i=this, s=e(t?t.target:this.element).closest(this.options.items);s.length && !s.data("ui-tooltip-id") && (s.attr("title") && s.data("ui-tooltip-title", s.attr("title")), s.data("ui-tooltip-open", !0), t && "mouseover" === t.type && s.parents().each(function(){var t, s=e(this);s.data("ui-tooltip-open") && (t = e.Event("blur"), t.target = t.currentTarget = this, i.close(t, !0)), s.attr("title") && (s.uniqueId(), i.parents[this.id] = {element:this, title:s.attr("title")}, s.attr("title", ""));}), this._registerCloseHandlers(t, s), this._updateContent(s, t));}, _updateContent:function _updateContent(e, t){var i, s=this.options.content, n=this, a=t?t.type:null;return "string" == typeof s?this._open(t, e, s):(i = s.call(e[0], function(i){n._delay(function(){e.data("ui-tooltip-open") && (t && (t.type = a), this._open(t, e, i));});}), i && this._open(t, e, i), void 0);}, _open:function _open(t, i, s){function n(e){l.of = e, o.is(":hidden") || o.position(l);}var a, o, r, h, l=e.extend({}, this.options.position);if(s){if(a = this._find(i)){return (a.tooltip.find(".ui-tooltip-content").html(s), void 0);}i.is("[title]") && (t && "mouseover" === t.type?i.attr("title", ""):i.removeAttr("title")), a = this._tooltip(i), o = a.tooltip, this._addDescribedBy(i, o.attr("id")), o.find(".ui-tooltip-content").html(s), this.liveRegion.children().hide(), s.clone?(h = s.clone(), h.removeAttr("id").find("[id]").removeAttr("id")):h = s, e("<div>").html(h).appendTo(this.liveRegion), this.options.track && t && /^mouse/.test(t.type)?(this._on(this.document, {mousemove:n}), n(t)):o.position(e.extend({of:i}, this.options.position)), o.hide(), this._show(o, this.options.show), this.options.show && this.options.show.delay && (r = this.delayedShow = setInterval(function(){o.is(":visible") && (n(l.of), clearInterval(r));}, e.fx.interval)), this._trigger("open", t, {tooltip:o});}}, _registerCloseHandlers:function _registerCloseHandlers(t, i){var s={keyup:function keyup(t){if(t.keyCode === e.ui.keyCode.ESCAPE){var s=e.Event(t);s.currentTarget = i[0], this.close(s, !0);}}};i[0] !== this.element[0] && (s.remove = function(){this._removeTooltip(this._find(i).tooltip);}), t && "mouseover" !== t.type || (s.mouseleave = "close"), t && "focusin" !== t.type || (s.focusout = "close"), this._on(!0, i, s);}, close:function close(t){var i, s=this, n=e(t?t.currentTarget:this.element), a=this._find(n);return a?(i = a.tooltip, a.closing || (clearInterval(this.delayedShow), n.data("ui-tooltip-title") && !n.attr("title") && n.attr("title", n.data("ui-tooltip-title")), this._removeDescribedBy(n), a.hiding = !0, i.stop(!0), this._hide(i, this.options.hide, function(){s._removeTooltip(e(this));}), n.removeData("ui-tooltip-open"), this._off(n, "mouseleave focusout keyup"), n[0] !== this.element[0] && this._off(n, "remove"), this._off(this.document, "mousemove"), t && "mouseleave" === t.type && e.each(this.parents, function(t, i){e(i.element).attr("title", i.title), delete s.parents[t];}), a.closing = !0, this._trigger("close", t, {tooltip:i}), a.hiding || (a.closing = !1)), void 0):(n.removeData("ui-tooltip-open"), void 0);}, _tooltip:function _tooltip(t){var i=e("<div>").attr("role", "tooltip").addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content " + (this.options.tooltipClass || "")), s=i.uniqueId().attr("id");return (e("<div>").addClass("ui-tooltip-content").appendTo(i), i.appendTo(this.document[0].body), this.tooltips[s] = {element:t, tooltip:i});}, _find:function _find(e){var t=e.data("ui-tooltip-id");return t?this.tooltips[t]:null;}, _removeTooltip:function _removeTooltip(e){e.remove(), delete this.tooltips[e.attr("id")];}, _destroy:function _destroy(){var t=this;e.each(this.tooltips, function(i, s){var n=e.Event("blur"), a=s.element;n.target = n.currentTarget = a[0], t.close(n, !0), e("#" + i).remove(), a.data("ui-tooltip-title") && (a.attr("title") || a.attr("title", a.data("ui-tooltip-title")), a.removeData("ui-tooltip-title"));}), this.liveRegion.remove();}});var y="ui-effects-", b=e;e.effects = {effect:{}}, (function(e, t){function i(e, t, i){var s=d[t.type] || {};return null == e?i || !t.def?null:t.def:(e = s.floor?~ ~e:parseFloat(e), isNaN(e)?t.def:s.mod?(e + s.mod) % s.mod:0 > e?0:e > s.max?s.max:e);}function s(i){var s=l(), n=s._rgba = [];return (i = i.toLowerCase(), f(h, function(e, a){var o, r=a.re.exec(i), h=r && a.parse(r), l=a.space || "rgba";return h?(o = s[l](h), s[u[l].cache] = o[u[l].cache], n = s._rgba = o._rgba, !1):t;}), n.length?("0,0,0,0" === n.join() && e.extend(n, a.transparent), s):a[i]);}function n(e, t, i){return (i = (i + 1) % 1, 1 > 6 * i?e + 6 * (t - e) * i:1 > 2 * i?t:2 > 3 * i?e + 6 * (t - e) * (2 / 3 - i):e);}var a, o="backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor", r=/^([\-+])=\s*(\d+\.?\d*)/, h=[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/, parse:function parse(e){return [e[1], e[2], e[3], e[4]];}}, {re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/, parse:function parse(e){return [2.55 * e[1], 2.55 * e[2], 2.55 * e[3], e[4]];}}, {re:/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/, parse:function parse(e){return [parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16)];}}, {re:/#([a-f0-9])([a-f0-9])([a-f0-9])/, parse:function parse(e){return [parseInt(e[1] + e[1], 16), parseInt(e[2] + e[2], 16), parseInt(e[3] + e[3], 16)];}}, {re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/, space:"hsla", parse:function parse(e){return [e[1], e[2] / 100, e[3] / 100, e[4]];}}], l=e.Color = function(t, i, s, n){return new e.Color.fn.parse(t, i, s, n);}, u={rgba:{props:{red:{idx:0, type:"byte"}, green:{idx:1, type:"byte"}, blue:{idx:2, type:"byte"}}}, hsla:{props:{hue:{idx:0, type:"degrees"}, saturation:{idx:1, type:"percent"}, lightness:{idx:2, type:"percent"}}}}, d={byte:{floor:!0, max:255}, percent:{max:1}, degrees:{mod:360, floor:!0}}, c=l.support = {}, p=e("<p>")[0], f=e.each;p.style.cssText = "background-color:rgba(1,1,1,.5)", c.rgba = p.style.backgroundColor.indexOf("rgba") > -1, f(u, function(e, t){t.cache = "_" + e, t.props.alpha = {idx:3, type:"percent", def:1};}), l.fn = e.extend(l.prototype, {parse:function parse(n, o, r, h){if(n === t){return (this._rgba = [null, null, null, null], this);}(n.jquery || n.nodeType) && (n = e(n).css(o), o = t);var d=this, c=e.type(n), p=this._rgba = [];return (o !== t && (n = [n, o, r, h], c = "array"), "string" === c?this.parse(s(n) || a._default):"array" === c?(f(u.rgba.props, function(e, t){p[t.idx] = i(n[t.idx], t);}), this):"object" === c?(n instanceof l?f(u, function(e, t){n[t.cache] && (d[t.cache] = n[t.cache].slice());}):f(u, function(t, s){var a=s.cache;f(s.props, function(e, t){if(!d[a] && s.to){if("alpha" === e || null == n[e])return;d[a] = s.to(d._rgba);}d[a][t.idx] = i(n[e], t, !0);}), d[a] && 0 > e.inArray(null, d[a].slice(0, 3)) && (d[a][3] = 1, s.from && (d._rgba = s.from(d[a])));}), this):t);}, is:function is(e){var i=l(e), s=!0, n=this;return (f(u, function(e, a){var o, r=i[a.cache];return (r && (o = n[a.cache] || a.to && a.to(n._rgba) || [], f(a.props, function(e, i){return null != r[i.idx]?s = r[i.idx] === o[i.idx]:t;})), s);}), s);}, _space:function _space(){var e=[], t=this;return (f(u, function(i, s){t[s.cache] && e.push(i);}), e.pop());}, transition:function transition(e, t){var s=l(e), n=s._space(), a=u[n], o=0 === this.alpha()?l("transparent"):this, r=o[a.cache] || a.to(o._rgba), h=r.slice();return (s = s[a.cache], f(a.props, function(e, n){var a=n.idx, o=r[a], l=s[a], u=d[n.type] || {};null !== l && (null === o?h[a] = l:(u.mod && (l - o > u.mod / 2?o += u.mod:o - l > u.mod / 2 && (o -= u.mod)), h[a] = i((l - o) * t + o, n)));}), this[n](h));}, blend:function blend(t){if(1 === this._rgba[3]){return this;}var i=this._rgba.slice(), s=i.pop(), n=l(t)._rgba;return l(e.map(i, function(e, t){return (1 - s) * n[t] + s * e;}));}, toRgbaString:function toRgbaString(){var t="rgba(", i=e.map(this._rgba, function(e, t){return null == e?t > 2?1:0:e;});return (1 === i[3] && (i.pop(), t = "rgb("), t + i.join() + ")");}, toHslaString:function toHslaString(){var t="hsla(", i=e.map(this.hsla(), function(e, t){return (null == e && (e = t > 2?1:0), t && 3 > t && (e = Math.round(100 * e) + "%"), e);});return (1 === i[3] && (i.pop(), t = "hsl("), t + i.join() + ")");}, toHexString:function toHexString(t){var i=this._rgba.slice(), s=i.pop();return (t && i.push(~ ~(255 * s)), "#" + e.map(i, function(e){return (e = (e || 0).toString(16), 1 === e.length?"0" + e:e);}).join(""));}, toString:function toString(){return 0 === this._rgba[3]?"transparent":this.toRgbaString();}}), l.fn.parse.prototype = l.fn, u.hsla.to = function(e){if(null == e[0] || null == e[1] || null == e[2])return [null, null, null, e[3]];var t, i, s=e[0] / 255, n=e[1] / 255, a=e[2] / 255, o=e[3], r=Math.max(s, n, a), h=Math.min(s, n, a), l=r - h, u=r + h, d=0.5 * u;return (t = h === r?0:s === r?60 * (n - a) / l + 360:n === r?60 * (a - s) / l + 120:60 * (s - n) / l + 240, i = 0 === l?0:0.5 >= d?l / u:l / (2 - u), [Math.round(t) % 360, i, d, null == o?1:o]);}, u.hsla.from = function(e){if(null == e[0] || null == e[1] || null == e[2])return [null, null, null, e[3]];var t=e[0] / 360, i=e[1], s=e[2], a=e[3], o=0.5 >= s?s * (1 + i):s + i - s * i, r=2 * s - o;return [Math.round(255 * n(r, o, t + 1 / 3)), Math.round(255 * n(r, o, t)), Math.round(255 * n(r, o, t - 1 / 3)), a];}, f(u, function(s, n){var a=n.props, o=n.cache, h=n.to, u=n.from;l.fn[s] = function(s){if((h && !this[o] && (this[o] = h(this._rgba)), s === t))return this[o].slice();var n, r=e.type(s), d="array" === r || "object" === r?s:arguments, c=this[o].slice();return (f(a, function(e, t){var s=d["object" === r?e:t.idx];null == s && (s = c[t.idx]), c[t.idx] = i(s, t);}), u?(n = l(u(c)), n[o] = c, n):l(c));}, f(a, function(t, i){l.fn[t] || (l.fn[t] = function(n){var a, o=e.type(n), h="alpha" === t?this._hsla?"hsla":"rgba":s, l=this[h](), u=l[i.idx];return "undefined" === o?u:("function" === o && (n = n.call(this, u), o = e.type(n)), null == n && i.empty?this:("string" === o && (a = r.exec(n), a && (n = u + parseFloat(a[2]) * ("+" === a[1]?1:-1))), l[i.idx] = n, this[h](l)));});});}), l.hook = function(t){var i=t.split(" ");f(i, function(t, i){e.cssHooks[i] = {set:function set(t, n){var a, o, r="";if("transparent" !== n && ("string" !== e.type(n) || (a = s(n)))){if((n = l(a || n), !c.rgba && 1 !== n._rgba[3])){for(o = "backgroundColor" === i?t.parentNode:t; ("" === r || "transparent" === r) && o && o.style;) try{r = e.css(o, "backgroundColor"), o = o.parentNode;}catch(h) {}n = n.blend(r && "transparent" !== r?r:"_default");}n = n.toRgbaString();}try{t.style[i] = n;}catch(h) {}}}, e.fx.step[i] = function(t){t.colorInit || (t.start = l(t.elem, i), t.end = l(t.end), t.colorInit = !0), e.cssHooks[i].set(t.elem, t.start.transition(t.end, t.pos));};});}, l.hook(o), e.cssHooks.borderColor = {expand:function expand(e){var t={};return (f(["Top", "Right", "Bottom", "Left"], function(i, s){t["border" + s + "Color"] = e;}), t);}}, a = e.Color.names = {aqua:"#00ffff", black:"#000000", blue:"#0000ff", fuchsia:"#ff00ff", gray:"#808080", green:"#008000", lime:"#00ff00", maroon:"#800000", navy:"#000080", olive:"#808000", purple:"#800080", red:"#ff0000", silver:"#c0c0c0", teal:"#008080", white:"#ffffff", yellow:"#ffff00", transparent:[null, null, null, 0], _default:"#ffffff"};})(b), (function(){function t(t){var i, s, n=t.ownerDocument.defaultView?t.ownerDocument.defaultView.getComputedStyle(t, null):t.currentStyle, a={};if(n && n.length && n[0] && n[n[0]])for(s = n.length; s--;) i = n[s], "string" == typeof n[i] && (a[e.camelCase(i)] = n[i]);else for(i in n) "string" == typeof n[i] && (a[i] = n[i]);return a;}function i(t, i){var s, a, o={};for(s in i) a = i[s], t[s] !== a && (n[s] || (e.fx.step[s] || !isNaN(parseFloat(a))) && (o[s] = a));return o;}var s=["add", "remove", "toggle"], n={border:1, borderBottom:1, borderColor:1, borderLeft:1, borderRight:1, borderTop:1, borderWidth:1, margin:1, padding:1};e.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function(t, i){e.fx.step[i] = function(e){("none" !== e.end && !e.setAttr || 1 === e.pos && !e.setAttr) && (b.style(e.elem, i, e.end), e.setAttr = !0);};}), e.fn.addBack || (e.fn.addBack = function(e){return this.add(null == e?this.prevObject:this.prevObject.filter(e));}), e.effects.animateClass = function(n, a, o, r){var h=e.speed(a, o, r);return this.queue(function(){var a, o=e(this), r=o.attr("class") || "", l=h.children?o.find("*").addBack():o;l = l.map(function(){var i=e(this);return {el:i, start:t(this)};}), a = function(){e.each(s, function(e, t){n[t] && o[t + "Class"](n[t]);});}, a(), l = l.map(function(){return (this.end = t(this.el[0]), this.diff = i(this.start, this.end), this);}), o.attr("class", r), l = l.map(function(){var t=this, i=e.Deferred(), s=e.extend({}, h, {queue:!1, complete:function complete(){i.resolve(t);}});return (this.el.animate(this.diff, s), i.promise());}), e.when.apply(e, l.get()).done(function(){a(), e.each(arguments, function(){var t=this.el;e.each(this.diff, function(e){t.css(e, "");});}), h.complete.call(o[0]);});});}, e.fn.extend({addClass:(function(t){return function(i, s, n, a){return s?e.effects.animateClass.call(this, {add:i}, s, n, a):t.apply(this, arguments);};})(e.fn.addClass), removeClass:(function(t){return function(i, s, n, a){return arguments.length > 1?e.effects.animateClass.call(this, {remove:i}, s, n, a):t.apply(this, arguments);};})(e.fn.removeClass), toggleClass:(function(t){return function(i, s, n, a, o){return "boolean" == typeof s || void 0 === s?n?e.effects.animateClass.call(this, s?{add:i}:{remove:i}, n, a, o):t.apply(this, arguments):e.effects.animateClass.call(this, {toggle:i}, s, n, a);};})(e.fn.toggleClass), switchClass:function switchClass(t, i, s, n, a){return e.effects.animateClass.call(this, {add:i, remove:t}, s, n, a);}});})(), (function(){function t(t, i, s, n){return (e.isPlainObject(t) && (i = t, t = t.effect), t = {effect:t}, null == i && (i = {}), e.isFunction(i) && (n = i, s = null, i = {}), ("number" == typeof i || e.fx.speeds[i]) && (n = s, s = i, i = {}), e.isFunction(s) && (n = s, s = null), i && e.extend(t, i), s = s || i.duration, t.duration = e.fx.off?0:"number" == typeof s?s:s in e.fx.speeds?e.fx.speeds[s]:e.fx.speeds._default, t.complete = n || i.complete, t);}function i(t){return !t || "number" == typeof t || e.fx.speeds[t]?!0:"string" != typeof t || e.effects.effect[t]?e.isFunction(t)?!0:"object" != typeof t || t.effect?!1:!0:!0;}e.extend(e.effects, {version:"1.11.4", save:function save(e, t){for(var i=0; t.length > i; i++) null !== t[i] && e.data(y + t[i], e[0].style[t[i]]);}, restore:function restore(e, t){var i, s;for(s = 0; t.length > s; s++) null !== t[s] && (i = e.data(y + t[s]), void 0 === i && (i = ""), e.css(t[s], i));}, setMode:function setMode(e, t){return ("toggle" === t && (t = e.is(":hidden")?"show":"hide"), t);}, getBaseline:function getBaseline(e, t){var i, s;switch(e[0]){case "top":i = 0;break;case "middle":i = 0.5;break;case "bottom":i = 1;break;default:i = e[0] / t.height;}switch(e[1]){case "left":s = 0;break;case "center":s = 0.5;break;case "right":s = 1;break;default:s = e[1] / t.width;}return {x:s, y:i};}, createWrapper:function createWrapper(t){if(t.parent().is(".ui-effects-wrapper")){return t.parent();}var i={width:t.outerWidth(!0), height:t.outerHeight(!0), float:t.css("float")}, s=e("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%", background:"transparent", border:"none", margin:0, padding:0}), n={width:t.width(), height:t.height()}, a=document.activeElement;try{a.id;}catch(o) {a = document.body;}return (t.wrap(s), (t[0] === a || e.contains(t[0], a)) && e(a).focus(), s = t.parent(), "static" === t.css("position")?(s.css({position:"relative"}), t.css({position:"relative"})):(e.extend(i, {position:t.css("position"), zIndex:t.css("z-index")}), e.each(["top", "left", "bottom", "right"], function(e, s){i[s] = t.css(s), isNaN(parseInt(i[s], 10)) && (i[s] = "auto");}), t.css({position:"relative", top:0, left:0, right:"auto", bottom:"auto"})), t.css(n), s.css(i).show());}, removeWrapper:function removeWrapper(t){var i=document.activeElement;return (t.parent().is(".ui-effects-wrapper") && (t.parent().replaceWith(t), (t[0] === i || e.contains(t[0], i)) && e(i).focus()), t);}, setTransition:function setTransition(t, i, s, n){return (n = n || {}, e.each(i, function(e, i){var a=t.cssUnit(i);a[0] > 0 && (n[i] = a[0] * s + a[1]);}), n);}}), e.fn.extend({effect:function effect(){function i(t){function i(){e.isFunction(a) && a.call(n[0]), e.isFunction(t) && t();}var n=e(this), a=s.complete, r=s.mode;(n.is(":hidden")?"hide" === r:"show" === r)?(n[r](), i()):o.call(n[0], s, i);}var s=t.apply(this, arguments), n=s.mode, a=s.queue, o=e.effects.effect[s.effect];return e.fx.off || !o?n?this[n](s.duration, s.complete):this.each(function(){s.complete && s.complete.call(this);}):a === !1?this.each(i):this.queue(a || "fx", i);}, show:(function(e){return function(s){if(i(s))return e.apply(this, arguments);var n=t.apply(this, arguments);return (n.mode = "show", this.effect.call(this, n));};})(e.fn.show), hide:(function(e){return function(s){if(i(s))return e.apply(this, arguments);var n=t.apply(this, arguments);return (n.mode = "hide", this.effect.call(this, n));};})(e.fn.hide), toggle:(function(e){return function(s){if(i(s) || "boolean" == typeof s)return e.apply(this, arguments);var n=t.apply(this, arguments);return (n.mode = "toggle", this.effect.call(this, n));};})(e.fn.toggle), cssUnit:function cssUnit(t){var i=this.css(t), s=[];return (e.each(["em", "px", "%", "pt"], function(e, t){i.indexOf(t) > 0 && (s = [parseFloat(i), t]);}), s);}});})(), (function(){var t={};e.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function(e, i){t[i] = function(t){return Math.pow(t, e + 2);};}), e.extend(t, {Sine:function Sine(e){return 1 - Math.cos(e * Math.PI / 2);}, Circ:function Circ(e){return 1 - Math.sqrt(1 - e * e);}, Elastic:function Elastic(e){return 0 === e || 1 === e?e:-Math.pow(2, 8 * (e - 1)) * Math.sin((80 * (e - 1) - 7.5) * Math.PI / 15);}, Back:function Back(e){return e * e * (3 * e - 2);}, Bounce:function Bounce(e){for(var t, i=4; ((t = Math.pow(2, --i)) - 1) / 11 > e;);return 1 / Math.pow(4, 3 - i) - 7.5625 * Math.pow((3 * t - 2) / 22 - e, 2);}}), e.each(t, function(t, i){e.easing["easeIn" + t] = i, e.easing["easeOut" + t] = function(e){return 1 - i(1 - e);}, e.easing["easeInOut" + t] = function(e){return 0.5 > e?i(2 * e) / 2:1 - i(-2 * e + 2) / 2;};});})(), e.effects, e.effects.effect.blind = function(t, i){var s, n, a, o=e(this), r=/up|down|vertical/, h=/up|left|vertical|horizontal/, l=["position", "top", "bottom", "left", "right", "height", "width"], u=e.effects.setMode(o, t.mode || "hide"), d=t.direction || "up", c=r.test(d), p=c?"height":"width", f=c?"top":"left", m=h.test(d), g={}, v="show" === u;o.parent().is(".ui-effects-wrapper")?e.effects.save(o.parent(), l):e.effects.save(o, l), o.show(), s = e.effects.createWrapper(o).css({overflow:"hidden"}), n = s[p](), a = parseFloat(s.css(f)) || 0, g[p] = v?n:0, m || (o.css(c?"bottom":"right", 0).css(c?"top":"left", "auto").css({position:"absolute"}), g[f] = v?a:n + a), v && (s.css(p, 0), m || s.css(f, a + n)), s.animate(g, {duration:t.duration, easing:t.easing, queue:!1, complete:function complete(){"hide" === u && o.hide(), e.effects.restore(o, l), e.effects.removeWrapper(o), i();}});}, e.effects.effect.bounce = function(t, i){var s, n, a, o=e(this), r=["position", "top", "bottom", "left", "right", "height", "width"], h=e.effects.setMode(o, t.mode || "effect"), l="hide" === h, u="show" === h, d=t.direction || "up", c=t.distance, p=t.times || 5, f=2 * p + (u || l?1:0), m=t.duration / f, g=t.easing, v="up" === d || "down" === d?"top":"left", y="up" === d || "left" === d, b=o.queue(), _=b.length;for((u || l) && r.push("opacity"), e.effects.save(o, r), o.show(), e.effects.createWrapper(o), c || (c = o["top" === v?"outerHeight":"outerWidth"]() / 3), u && (a = {opacity:1}, a[v] = 0, o.css("opacity", 0).css(v, y?2 * -c:2 * c).animate(a, m, g)), l && (c /= Math.pow(2, p - 1)), a = {}, a[v] = 0, s = 0; p > s; s++) n = {}, n[v] = (y?"-=":"+=") + c, o.animate(n, m, g).animate(a, m, g), c = l?2 * c:c / 2;l && (n = {opacity:0}, n[v] = (y?"-=":"+=") + c, o.animate(n, m, g)), o.queue(function(){l && o.hide(), e.effects.restore(o, r), e.effects.removeWrapper(o), i();}), _ > 1 && b.splice.apply(b, [1, 0].concat(b.splice(_, f + 1))), o.dequeue();}, e.effects.effect.clip = function(t, i){var s, n, a, o=e(this), r=["position", "top", "bottom", "left", "right", "height", "width"], h=e.effects.setMode(o, t.mode || "hide"), l="show" === h, u=t.direction || "vertical", d="vertical" === u, c=d?"height":"width", p=d?"top":"left", f={};e.effects.save(o, r), o.show(), s = e.effects.createWrapper(o).css({overflow:"hidden"}), n = "IMG" === o[0].tagName?s:o, a = n[c](), l && (n.css(c, 0), n.css(p, a / 2)), f[c] = l?a:0, f[p] = l?0:a / 2, n.animate(f, {queue:!1, duration:t.duration, easing:t.easing, complete:function complete(){l || o.hide(), e.effects.restore(o, r), e.effects.removeWrapper(o), i();}});}, e.effects.effect.drop = function(t, i){var s, n=e(this), a=["position", "top", "bottom", "left", "right", "opacity", "height", "width"], o=e.effects.setMode(n, t.mode || "hide"), r="show" === o, h=t.direction || "left", l="up" === h || "down" === h?"top":"left", u="up" === h || "left" === h?"pos":"neg", d={opacity:r?1:0};e.effects.save(n, a), n.show(), e.effects.createWrapper(n), s = t.distance || n["top" === l?"outerHeight":"outerWidth"](!0) / 2, r && n.css("opacity", 0).css(l, "pos" === u?-s:s), d[l] = (r?"pos" === u?"+=":"-=":"pos" === u?"-=":"+=") + s, n.animate(d, {queue:!1, duration:t.duration, easing:t.easing, complete:function complete(){"hide" === o && n.hide(), e.effects.restore(n, a), e.effects.removeWrapper(n), i();}});}, e.effects.effect.explode = function(t, i){function s(){b.push(this), b.length === d * c && n();}function n(){p.css({visibility:"visible"}), e(b).remove(), m || p.hide(), i();}var a, o, r, h, l, u, d=t.pieces?Math.round(Math.sqrt(t.pieces)):3, c=d, p=e(this), f=e.effects.setMode(p, t.mode || "hide"), m="show" === f, g=p.show().css("visibility", "hidden").offset(), v=Math.ceil(p.outerWidth() / c), y=Math.ceil(p.outerHeight() / d), b=[];for(a = 0; d > a; a++) for(h = g.top + a * y, u = a - (d - 1) / 2, o = 0; c > o; o++) r = g.left + o * v, l = o - (c - 1) / 2, p.clone().appendTo("body").wrap("<div></div>").css({position:"absolute", visibility:"visible", left:-o * v, top:-a * y}).parent().addClass("ui-effects-explode").css({position:"absolute", overflow:"hidden", width:v, height:y, left:r + (m?l * v:0), top:h + (m?u * y:0), opacity:m?0:1}).animate({left:r + (m?0:l * v), top:h + (m?0:u * y), opacity:m?1:0}, t.duration || 500, t.easing, s);}, e.effects.effect.fade = function(t, i){var s=e(this), n=e.effects.setMode(s, t.mode || "toggle");s.animate({opacity:n}, {queue:!1, duration:t.duration, easing:t.easing, complete:i});}, e.effects.effect.fold = function(t, i){var s, n, a=e(this), o=["position", "top", "bottom", "left", "right", "height", "width"], r=e.effects.setMode(a, t.mode || "hide"), h="show" === r, l="hide" === r, u=t.size || 15, d=/([0-9]+)%/.exec(u), c=!!t.horizFirst, p=h !== c, f=p?["width", "height"]:["height", "width"], m=t.duration / 2, g={}, v={};e.effects.save(a, o), a.show(), s = e.effects.createWrapper(a).css({overflow:"hidden"}), n = p?[s.width(), s.height()]:[s.height(), s.width()], d && (u = parseInt(d[1], 10) / 100 * n[l?0:1]), h && s.css(c?{height:0, width:u}:{height:u, width:0}), g[f[0]] = h?n[0]:u, v[f[1]] = h?n[1]:0, s.animate(g, m, t.easing).animate(v, m, t.easing, function(){l && a.hide(), e.effects.restore(a, o), e.effects.removeWrapper(a), i();});}, e.effects.effect.highlight = function(t, i){var s=e(this), n=["backgroundImage", "backgroundColor", "opacity"], a=e.effects.setMode(s, t.mode || "show"), o={backgroundColor:s.css("backgroundColor")};"hide" === a && (o.opacity = 0), e.effects.save(s, n), s.show().css({backgroundImage:"none", backgroundColor:t.color || "#ffff99"}).animate(o, {queue:!1, duration:t.duration, easing:t.easing, complete:function complete(){"hide" === a && s.hide(), e.effects.restore(s, n), i();}});}, e.effects.effect.size = function(t, i){var s, n, a, o=e(this), r=["position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity"], h=["position", "top", "bottom", "left", "right", "overflow", "opacity"], l=["width", "height", "overflow"], u=["fontSize"], d=["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"], c=["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"], p=e.effects.setMode(o, t.mode || "effect"), f=t.restore || "effect" !== p, m=t.scale || "both", g=t.origin || ["middle", "center"], v=o.css("position"), y=f?r:h, b={height:0, width:0, outerHeight:0, outerWidth:0};"show" === p && o.show(), s = {height:o.height(), width:o.width(), outerHeight:o.outerHeight(), outerWidth:o.outerWidth()}, "toggle" === t.mode && "show" === p?(o.from = t.to || b, o.to = t.from || s):(o.from = t.from || ("show" === p?b:s), o.to = t.to || ("hide" === p?b:s)), a = {from:{y:o.from.height / s.height, x:o.from.width / s.width}, to:{y:o.to.height / s.height, x:o.to.width / s.width}}, ("box" === m || "both" === m) && (a.from.y !== a.to.y && (y = y.concat(d), o.from = e.effects.setTransition(o, d, a.from.y, o.from), o.to = e.effects.setTransition(o, d, a.to.y, o.to)), a.from.x !== a.to.x && (y = y.concat(c), o.from = e.effects.setTransition(o, c, a.from.x, o.from), o.to = e.effects.setTransition(o, c, a.to.x, o.to))), ("content" === m || "both" === m) && a.from.y !== a.to.y && (y = y.concat(u).concat(l), o.from = e.effects.setTransition(o, u, a.from.y, o.from), o.to = e.effects.setTransition(o, u, a.to.y, o.to)), e.effects.save(o, y), o.show(), e.effects.createWrapper(o), o.css("overflow", "hidden").css(o.from), g && (n = e.effects.getBaseline(g, s), o.from.top = (s.outerHeight - o.outerHeight()) * n.y, o.from.left = (s.outerWidth - o.outerWidth()) * n.x, o.to.top = (s.outerHeight - o.to.outerHeight) * n.y, o.to.left = (s.outerWidth - o.to.outerWidth) * n.x), o.css(o.from), ("content" === m || "both" === m) && (d = d.concat(["marginTop", "marginBottom"]).concat(u), c = c.concat(["marginLeft", "marginRight"]), l = r.concat(d).concat(c), o.find("*[width]").each(function(){var i=e(this), s={height:i.height(), width:i.width(), outerHeight:i.outerHeight(), outerWidth:i.outerWidth()};f && e.effects.save(i, l), i.from = {height:s.height * a.from.y, width:s.width * a.from.x, outerHeight:s.outerHeight * a.from.y, outerWidth:s.outerWidth * a.from.x}, i.to = {height:s.height * a.to.y, width:s.width * a.to.x, outerHeight:s.height * a.to.y, outerWidth:s.width * a.to.x}, a.from.y !== a.to.y && (i.from = e.effects.setTransition(i, d, a.from.y, i.from), i.to = e.effects.setTransition(i, d, a.to.y, i.to)), a.from.x !== a.to.x && (i.from = e.effects.setTransition(i, c, a.from.x, i.from), i.to = e.effects.setTransition(i, c, a.to.x, i.to)), i.css(i.from), i.animate(i.to, t.duration, t.easing, function(){f && e.effects.restore(i, l);});})), o.animate(o.to, {queue:!1, duration:t.duration, easing:t.easing, complete:function complete(){0 === o.to.opacity && o.css("opacity", o.from.opacity), "hide" === p && o.hide(), e.effects.restore(o, y), f || ("static" === v?o.css({position:"relative", top:o.to.top, left:o.to.left}):e.each(["top", "left"], function(e, t){o.css(t, function(t, i){var s=parseInt(i, 10), n=e?o.to.left:o.to.top;return "auto" === i?n + "px":s + n + "px";});})), e.effects.removeWrapper(o), i();}});}, e.effects.effect.scale = function(t, i){var s=e(this), n=e.extend(!0, {}, t), a=e.effects.setMode(s, t.mode || "effect"), o=parseInt(t.percent, 10) || (0 === parseInt(t.percent, 10)?0:"hide" === a?0:100), r=t.direction || "both", h=t.origin, l={height:s.height(), width:s.width(), outerHeight:s.outerHeight(), outerWidth:s.outerWidth()}, u={y:"horizontal" !== r?o / 100:1, x:"vertical" !== r?o / 100:1};n.effect = "size", n.queue = !1, n.complete = i, "effect" !== a && (n.origin = h || ["middle", "center"], n.restore = !0), n.from = t.from || ("show" === a?{height:0, width:0, outerHeight:0, outerWidth:0}:l), n.to = {height:l.height * u.y, width:l.width * u.x, outerHeight:l.outerHeight * u.y, outerWidth:l.outerWidth * u.x}, n.fade && ("show" === a && (n.from.opacity = 0, n.to.opacity = 1), "hide" === a && (n.from.opacity = 1, n.to.opacity = 0)), s.effect(n);}, e.effects.effect.puff = function(t, i){var s=e(this), n=e.effects.setMode(s, t.mode || "hide"), a="hide" === n, o=parseInt(t.percent, 10) || 150, r=o / 100, h={height:s.height(), width:s.width(), outerHeight:s.outerHeight(), outerWidth:s.outerWidth()};e.extend(t, {effect:"scale", queue:!1, fade:!0, mode:n, complete:i, percent:a?o:100, from:a?h:{height:h.height * r, width:h.width * r, outerHeight:h.outerHeight * r, outerWidth:h.outerWidth * r}}), s.effect(t);}, e.effects.effect.pulsate = function(t, i){var s, n=e(this), a=e.effects.setMode(n, t.mode || "show"), o="show" === a, r="hide" === a, h=o || "hide" === a, l=2 * (t.times || 5) + (h?1:0), u=t.duration / l, d=0, c=n.queue(), p=c.length;for((o || !n.is(":visible")) && (n.css("opacity", 0).show(), d = 1), s = 1; l > s; s++) n.animate({opacity:d}, u, t.easing), d = 1 - d;n.animate({opacity:d}, u, t.easing), n.queue(function(){r && n.hide(), i();}), p > 1 && c.splice.apply(c, [1, 0].concat(c.splice(p, l + 1))), n.dequeue();}, e.effects.effect.shake = function(t, i){var s, n=e(this), a=["position", "top", "bottom", "left", "right", "height", "width"], o=e.effects.setMode(n, t.mode || "effect"), r=t.direction || "left", h=t.distance || 20, l=t.times || 3, u=2 * l + 1, d=Math.round(t.duration / u), c="up" === r || "down" === r?"top":"left", p="up" === r || "left" === r, f={}, m={}, g={}, v=n.queue(), y=v.length;for(e.effects.save(n, a), n.show(), e.effects.createWrapper(n), f[c] = (p?"-=":"+=") + h, m[c] = (p?"+=":"-=") + 2 * h, g[c] = (p?"-=":"+=") + 2 * h, n.animate(f, d, t.easing), s = 1; l > s; s++) n.animate(m, d, t.easing).animate(g, d, t.easing);n.animate(m, d, t.easing).animate(f, d / 2, t.easing).queue(function(){"hide" === o && n.hide(), e.effects.restore(n, a), e.effects.removeWrapper(n), i();}), y > 1 && v.splice.apply(v, [1, 0].concat(v.splice(y, u + 1))), n.dequeue();}, e.effects.effect.slide = function(t, i){var s, n=e(this), a=["position", "top", "bottom", "left", "right", "width", "height"], o=e.effects.setMode(n, t.mode || "show"), r="show" === o, h=t.direction || "left", l="up" === h || "down" === h?"top":"left", u="up" === h || "left" === h, d={};e.effects.save(n, a), n.show(), s = t.distance || n["top" === l?"outerHeight":"outerWidth"](!0), e.effects.createWrapper(n).css({overflow:"hidden"}), r && n.css(l, u?isNaN(s)?"-" + s:-s:s), d[l] = (r?u?"+=":"-=":u?"-=":"+=") + s, n.animate(d, {queue:!1, duration:t.duration, easing:t.easing, complete:function complete(){"hide" === o && n.hide(), e.effects.restore(n, a), e.effects.removeWrapper(n), i();}});}, e.effects.effect.transfer = function(t, i){var s=e(this), n=e(t.to), a="fixed" === n.css("position"), o=e("body"), r=a?o.scrollTop():0, h=a?o.scrollLeft():0, l=n.offset(), u={top:l.top - r, left:l.left - h, height:n.innerHeight(), width:n.innerWidth()}, d=s.offset(), c=e("<div class='ui-effects-transfer'></div>").appendTo(document.body).addClass(t.className).css({top:d.top - r, left:d.left - h, height:s.innerHeight(), width:s.innerWidth(), position:a?"fixed":"absolute"}).animate(u, t.duration, t.easing, function(){c.remove(), i();});};});});


//# sourceMappingURL=app.js.map