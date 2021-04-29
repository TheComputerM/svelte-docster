"use strict";function e(t,i){for(var n,r=0;r<t.length;r++)Array.isArray(n=t[r])?e(n,i):null!=n&&i.push(n);return i}function t(i){if(!i)return i;i.declaration&&(i=i.declaration);let n,r=0,s=[];switch(i.type){case"Identifier":return i.name;case"ImportSpecifier":case"ImportDefaultSpecifier":case"ImportNamespaceSpecifier":return t(i.local);case"VariableDeclarator":case"FunctionDeclaration":return t(i.id);case"VariableDeclaration":for(;r<i.declarations.length;r++)n=t(i.declarations[r]),Array.isArray(n)?e(n,s):n&&s.push(n);return s;case"ImportDeclaration":for(;r<i.specifiers.length;r++)(n=t(i.specifiers[r]))&&s.push(n);return s;case"ObjectPattern":for(;r<i.properties.length;r++)n=t(i.properties[r].value),Array.isArray(n)?e(n,s):n&&s.push(n);return s}}function i(e){if(!e)return e;switch(e.declaration&&(e=e.declaration),e.type){case"VariableDeclaration":return e.declarations;case"ImportDeclaration":return e.specifiers;case"ImportSpecifier":case"ImportDefaultSpecifier":case"ImportNamespaceSpecifier":case"FunctionDeclaration":case"VariableDeclarator":return e}}function n(e,t,i,r){if(!e)return;if("object"!=typeof e)return e;if(Array.isArray(e)){for(let s,o,a=0;a<e.length;a++)s=n(o=e[a],t,i,r),null!=s&&(false===s?e.splice(a--,1):s!==o&&(e[a]=s));return e}let s,o,a,l=e.type;if(!l)return e;let p=t[l];if(void 0===e.path&&(e.path={parent:r}),p&&("function"==typeof p?a=p(e,i):p.enter&&(a=p.enter(e,i)),null!=a)){if(true===a)return e;if(false===a)return false;a.path=e.path,e=a}for(s in e)if("path"!==s){if(o=e[s],null==o)continue;if("object"!=typeof o)continue;if(a=n(o,t,i,e),null==a)continue;false===a?delete e[s]:a!==o&&(e[s]=a)}if(p&&p.exit&&(a=p.exit(e,i),null!=a))if(true===a);else{if(false===a)return false;a.path=e.path,e=a}return e}const{stringify:r}=JSON;if(!String.prototype.repeat)throw new Error("String.prototype.repeat is undefined, see https://github.com/davidbonnet/astring#installation");if(!String.prototype.endsWith)throw new Error("String.prototype.endsWith is undefined, see https://github.com/davidbonnet/astring#installation");const s={"||":3,"&&":4,"|":5,"^":6,"&":7,"==":8,"!=":8,"===":8,"!==":8,"<":9,">":9,"<=":9,">=":9,in:9,instanceof:9,"<<":10,">>":10,">>>":10,"+":11,"-":11,"*":12,"%":12,"/":12,"**":13},o={ArrayExpression:20,TaggedTemplateExpression:20,ThisExpression:20,Identifier:20,Literal:18,TemplateLiteral:20,Super:20,SequenceExpression:20,MemberExpression:19,ChainExpression:19,CallExpression:19,NewExpression:19,ArrowFunctionExpression:17,ClassExpression:17,FunctionExpression:17,ObjectExpression:17,UpdateExpression:16,UnaryExpression:15,AwaitExpression:15,BinaryExpression:14,LogicalExpression:13,ConditionalExpression:4,AssignmentExpression:3,YieldExpression:2,RestElement:1};function a(e,t){const{generator:i}=e;if(e.write("("),null!=t&&t.length>0){i[t[0].type](t[0],e);const{length:n}=t;for(let r=1;r<n;r++){const n=t[r];e.write(", "),i[n.type](n,e)}}e.write(")")}function l(e,t,i,n){const r=e.expressionsPrecedence[t.type];if(17===r)return!0;const o=e.expressionsPrecedence[i.type];return r!==o?!n&&15===r&&14===o&&"**"===i.operator||r<o:(13===r||14===r)&&("**"===t.operator&&"**"===i.operator?!n:n?s[t.operator]<=s[i.operator]:s[t.operator]<s[i.operator])}function p(e,t,i,n){const{generator:r}=e;l(e,t,i,n)?(e.write("("),r[t.type](t,e),e.write(")")):r[t.type](t,e)}function c(e,t,i,n){const r=t.split("\n"),s=r.length-1;if(e.write(r[0].trim()),s>0){e.write(n);for(let t=1;t<s;t++)e.write(i+r[t].trim()+n);e.write(i+r[s].trim())}}function u(e,t,i,n){const{length:r}=t;for(let s=0;s<r;s++){const r=t[s];e.write(i),"L"===r.type[0]?e.write("// "+r.value.trim()+"\n",r):(e.write("/*"),c(e,r.value,i,n),e.write("*/"+n))}}function m(e,t){const{generator:i}=e,{declarations:n}=t;e.write(t.kind+" ");const{length:r}=n;if(r>0){i.VariableDeclarator(n[0],e);for(let t=1;t<r;t++)e.write(", "),i.VariableDeclarator(n[t],e)}}let d,w,h,y,f,g;const x={Program(e,t){const i=t.indent.repeat(t.indentLevel),{lineEnd:n,writeComments:r}=t;r&&null!=e.comments&&u(t,e.comments,i,n);const s=e.body,{length:o}=s;for(let e=0;e<o;e++){const o=s[e];r&&null!=o.comments&&u(t,o.comments,i,n),t.write(i),this[o.type](o,t),t.write(n)}r&&null!=e.trailingComments&&u(t,e.trailingComments,i,n)},BlockStatement:g=function(e,t){const i=t.indent.repeat(t.indentLevel++),{lineEnd:n,writeComments:r}=t,s=i+t.indent;t.write("{");const o=e.body;if(null!=o&&o.length>0){t.write(n),r&&null!=e.comments&&u(t,e.comments,s,n);const{length:a}=o;for(let e=0;e<a;e++){const i=o[e];r&&null!=i.comments&&u(t,i.comments,s,n),t.write(s),this[i.type](i,t),t.write(n)}t.write(i)}else r&&null!=e.comments&&(t.write(n),u(t,e.comments,s,n),t.write(i));r&&null!=e.trailingComments&&u(t,e.trailingComments,s,n),t.write("}"),t.indentLevel--},ClassBody:g,EmptyStatement(e,t){t.write(";")},ExpressionStatement(e,t){const i=t.expressionsPrecedence[e.expression.type];17===i||3===i&&"O"===e.expression.left.type[0]?(t.write("("),this[e.expression.type](e.expression,t),t.write(")")):this[e.expression.type](e.expression,t),t.write(";")},IfStatement(e,t){t.write("if ("),this[e.test.type](e.test,t),t.write(") "),this[e.consequent.type](e.consequent,t),null!=e.alternate&&(t.write(" else "),this[e.alternate.type](e.alternate,t))},LabeledStatement(e,t){this[e.label.type](e.label,t),t.write(": "),this[e.body.type](e.body,t)},BreakStatement(e,t){t.write("break"),null!=e.label&&(t.write(" "),this[e.label.type](e.label,t)),t.write(";")},ContinueStatement(e,t){t.write("continue"),null!=e.label&&(t.write(" "),this[e.label.type](e.label,t)),t.write(";")},WithStatement(e,t){t.write("with ("),this[e.object.type](e.object,t),t.write(") "),this[e.body.type](e.body,t)},SwitchStatement(e,t){const i=t.indent.repeat(t.indentLevel++),{lineEnd:n,writeComments:r}=t;t.indentLevel++;const s=i+t.indent,o=s+t.indent;t.write("switch ("),this[e.discriminant.type](e.discriminant,t),t.write(") {"+n);const{cases:a}=e,{length:l}=a;for(let e=0;e<l;e++){const i=a[e];r&&null!=i.comments&&u(t,i.comments,s,n),i.test?(t.write(s+"case "),this[i.test.type](i.test,t),t.write(":"+n)):t.write(s+"default:"+n);const{consequent:l}=i,{length:p}=l;for(let e=0;e<p;e++){const i=l[e];r&&null!=i.comments&&u(t,i.comments,o,n),t.write(o),this[i.type](i,t),t.write(n)}}t.indentLevel-=2,t.write(i+"}")},ReturnStatement(e,t){t.write("return"),e.argument&&(t.write(" "),this[e.argument.type](e.argument,t)),t.write(";")},ThrowStatement(e,t){t.write("throw "),this[e.argument.type](e.argument,t),t.write(";")},TryStatement(e,t){if(t.write("try "),this[e.block.type](e.block,t),e.handler){const{handler:i}=e;null==i.param?t.write(" catch "):(t.write(" catch ("),this[i.param.type](i.param,t),t.write(") ")),this[i.body.type](i.body,t)}e.finalizer&&(t.write(" finally "),this[e.finalizer.type](e.finalizer,t))},WhileStatement(e,t){t.write("while ("),this[e.test.type](e.test,t),t.write(") "),this[e.body.type](e.body,t)},DoWhileStatement(e,t){t.write("do "),this[e.body.type](e.body,t),t.write(" while ("),this[e.test.type](e.test,t),t.write(");")},ForStatement(e,t){if(t.write("for ("),null!=e.init){const{init:i}=e;"V"===i.type[0]?m(t,i):this[i.type](i,t)}t.write("; "),e.test&&this[e.test.type](e.test,t),t.write("; "),e.update&&this[e.update.type](e.update,t),t.write(") "),this[e.body.type](e.body,t)},ForInStatement:d=function(e,t){t.write(`for ${e.await?"await ":""}(`);const{left:i}=e;"V"===i.type[0]?m(t,i):this[i.type](i,t),t.write("I"===e.type[3]?" in ":" of "),this[e.right.type](e.right,t),t.write(") "),this[e.body.type](e.body,t)},ForOfStatement:d,DebuggerStatement(e,t){t.write("debugger;",e)},FunctionDeclaration:w=function(e,t){t.write((e.async?"async ":"")+(e.generator?"function* ":"function ")+(e.id?e.id.name:""),e),a(t,e.params),t.write(" "),this[e.body.type](e.body,t)},FunctionExpression:w,VariableDeclaration(e,t){m(t,e),t.write(";")},VariableDeclarator(e,t){this[e.id.type](e.id,t),null!=e.init&&(t.write(" = "),this[e.init.type](e.init,t))},ClassDeclaration(e,t){if(t.write("class "+(e.id?`${e.id.name} `:""),e),e.superClass){t.write("extends ");const{superClass:i}=e,{type:n}=i,r=t.expressionsPrecedence[n];"C"===n[0]&&"l"===n[1]&&"E"===n[5]||!(17===r||r<t.expressionsPrecedence.ClassExpression)?this[i.type](i,t):(t.write("("),this[e.superClass.type](i,t),t.write(")")),t.write(" ")}this.ClassBody(e.body,t)},ImportDeclaration(e,t){t.write("import ");const{specifiers:i}=e,{length:n}=i;let r=0;if(n>0){for(;r<n;){r>0&&t.write(", ");const e=i[r],n=e.type[6];if("D"===n)t.write(e.local.name,e),r++;else{if("N"!==n)break;t.write("* as "+e.local.name,e),r++}}if(r<n){for(t.write("{");;){const e=i[r],{name:s}=e.imported;if(t.write(s,e),s!==e.local.name&&t.write(" as "+e.local.name),!(++r<n))break;t.write(", ")}t.write("}")}t.write(" from ")}this.Literal(e.source,t),t.write(";")},ImportExpression(e,t){t.write("import("),this[e.source.type](e.source,t),t.write(")")},ExportDefaultDeclaration(e,t){t.write("export default "),this[e.declaration.type](e.declaration,t),null!=t.expressionsPrecedence[e.declaration.type]&&"F"!==e.declaration.type[0]&&t.write(";")},ExportNamedDeclaration(e,t){if(t.write("export "),e.declaration)this[e.declaration.type](e.declaration,t);else{t.write("{");const{specifiers:i}=e,{length:n}=i;if(n>0)for(let e=0;;){const r=i[e],{name:s}=r.local;if(t.write(s,r),s!==r.exported.name&&t.write(" as "+r.exported.name),!(++e<n))break;t.write(", ")}t.write("}"),e.source&&(t.write(" from "),this.Literal(e.source,t)),t.write(";")}},ExportAllDeclaration(e,t){null!=e.exported?t.write("export * as "+e.exported.name+" from "):t.write("export * from "),this.Literal(e.source,t),t.write(";")},MethodDefinition(e,t){e.static&&t.write("static ");const i=e.kind[0];"g"!==i&&"s"!==i||t.write(e.kind+" "),e.value.async&&t.write("async "),e.value.generator&&t.write("*"),e.computed?(t.write("["),this[e.key.type](e.key,t),t.write("]")):this[e.key.type](e.key,t),a(t,e.value.params),t.write(" "),this[e.value.body.type](e.value.body,t)},ClassExpression(e,t){this.ClassDeclaration(e,t)},ArrowFunctionExpression(e,t){t.write(e.async?"async ":"",e);const{params:i}=e;null!=i&&(1===i.length&&"I"===i[0].type[0]?t.write(i[0].name,i[0]):a(t,e.params)),t.write(" => "),"O"===e.body.type[0]?(t.write("("),this.ObjectExpression(e.body,t),t.write(")")):this[e.body.type](e.body,t)},ThisExpression(e,t){t.write("this",e)},Super(e,t){t.write("super",e)},RestElement:h=function(e,t){t.write("..."),this[e.argument.type](e.argument,t)},SpreadElement:h,YieldExpression(e,t){t.write(e.delegate?"yield*":"yield"),e.argument&&(t.write(" "),this[e.argument.type](e.argument,t))},AwaitExpression(e,t){t.write("await ",e),p(t,e.argument,e)},TemplateLiteral(e,t){const{quasis:i,expressions:n}=e;t.write("`");const{length:r}=n;for(let e=0;e<r;e++){const r=n[e],s=i[e];t.write(s.value.raw,s),t.write("${"),this[r.type](r,t),t.write("}")}const s=i[i.length-1];t.write(s.value.raw,s),t.write("`")},TemplateElement(e,t){t.write(e.value.raw,e)},TaggedTemplateExpression(e,t){this[e.tag.type](e.tag,t),this[e.quasi.type](e.quasi,t)},ArrayExpression:f=function(e,t){if(t.write("["),e.elements.length>0){const{elements:i}=e,{length:n}=i;for(let e=0;;){const r=i[e];if(null!=r&&this[r.type](r,t),!(++e<n)){null==r&&t.write(", ");break}t.write(", ")}}t.write("]")},ArrayPattern:f,ObjectExpression(e,t){const i=t.indent.repeat(t.indentLevel++),{lineEnd:n,writeComments:r}=t,s=i+t.indent;if(t.write("{"),e.properties.length>0){t.write(n),r&&null!=e.comments&&u(t,e.comments,s,n);const o=","+n,{properties:a}=e,{length:l}=a;for(let e=0;;){const i=a[e];if(r&&null!=i.comments&&u(t,i.comments,s,n),t.write(s),this[i.type](i,t),!(++e<l))break;t.write(o)}t.write(n),r&&null!=e.trailingComments&&u(t,e.trailingComments,s,n),t.write(i+"}")}else r?null!=e.comments?(t.write(n),u(t,e.comments,s,n),null!=e.trailingComments&&u(t,e.trailingComments,s,n),t.write(i+"}")):null!=e.trailingComments?(t.write(n),u(t,e.trailingComments,s,n),t.write(i+"}")):t.write("}"):t.write("}");t.indentLevel--},Property(e,t){e.method||"i"!==e.kind[0]?this.MethodDefinition(e,t):(e.shorthand||(e.computed?(t.write("["),this[e.key.type](e.key,t),t.write("]")):this[e.key.type](e.key,t),t.write(": ")),this[e.value.type](e.value,t))},ObjectPattern(e,t){if(t.write("{"),e.properties.length>0){const{properties:i}=e,{length:n}=i;for(let e=0;this[i[e].type](i[e],t),++e<n;)t.write(", ")}t.write("}")},SequenceExpression(e,t){a(t,e.expressions)},UnaryExpression(e,t){if(e.prefix){const{operator:i,argument:n,argument:{type:r}}=e;t.write(i);const s=l(t,n,e);s||!(i.length>1)&&("U"!==r[0]||"n"!==r[1]&&"p"!==r[1]||!n.prefix||n.operator[0]!==i||"+"!==i&&"-"!==i)||t.write(" "),s?(t.write(i.length>1?" (":"("),this[r](n,t),t.write(")")):this[r](n,t)}else this[e.argument.type](e.argument,t),t.write(e.operator)},UpdateExpression(e,t){e.prefix?(t.write(e.operator),this[e.argument.type](e.argument,t)):(this[e.argument.type](e.argument,t),t.write(e.operator))},AssignmentExpression(e,t){this[e.left.type](e.left,t),t.write(" "+e.operator+" "),this[e.right.type](e.right,t)},AssignmentPattern(e,t){this[e.left.type](e.left,t),t.write(" = "),this[e.right.type](e.right,t)},BinaryExpression:y=function(e,t){const i="in"===e.operator;i&&t.write("("),p(t,e.left,e,!1),t.write(" "+e.operator+" "),p(t,e.right,e,!0),i&&t.write(")")},LogicalExpression:y,ConditionalExpression(e,t){const{test:i}=e,n=t.expressionsPrecedence[i.type];17===n||n<=t.expressionsPrecedence.ConditionalExpression?(t.write("("),this[i.type](i,t),t.write(")")):this[i.type](i,t),t.write(" ? "),this[e.consequent.type](e.consequent,t),t.write(" : "),this[e.alternate.type](e.alternate,t)},NewExpression(e,t){t.write("new ");const i=t.expressionsPrecedence[e.callee.type];17===i||i<t.expressionsPrecedence.CallExpression||function(e){let t=e;for(;null!=t;){const{type:e}=t;if("C"===e[0]&&"a"===e[1])return!0;if("M"!==e[0]||"e"!==e[1]||"m"!==e[2])return!1;t=t.object}}(e.callee)?(t.write("("),this[e.callee.type](e.callee,t),t.write(")")):this[e.callee.type](e.callee,t),a(t,e.arguments)},CallExpression(e,t){const i=t.expressionsPrecedence[e.callee.type];17===i||i<t.expressionsPrecedence.CallExpression?(t.write("("),this[e.callee.type](e.callee,t),t.write(")")):this[e.callee.type](e.callee,t),e.optional&&t.write("?."),a(t,e.arguments)},ChainExpression(e,t){this[e.expression.type](e.expression,t)},MemberExpression(e,t){const i=t.expressionsPrecedence[e.object.type];17===i||i<t.expressionsPrecedence.MemberExpression?(t.write("("),this[e.object.type](e.object,t),t.write(")")):this[e.object.type](e.object,t),e.computed?(e.optional&&t.write("?."),t.write("["),this[e.property.type](e.property,t),t.write("]")):(e.optional?t.write("?."):t.write("."),this[e.property.type](e.property,t))},MetaProperty(e,t){t.write(e.meta.name+"."+e.property.name,e)},Identifier(e,t){t.write(e.name,e)},Literal(e,t){null!=e.raw?t.write(e.raw,e):null!=e.regex?this.RegExpLiteral(e,t):null!=e.bigint?t.write(e.bigint+"n",e):t.write(r(e.value),e)},RegExpLiteral(e,t){const{regex:i}=e;t.write(`/${i.pattern}/${i.flags}`,e)}},b={};class E{constructor(e){const t=null==e?b:e;this.output="",null!=t.output?(this.output=t.output,this.write=this.writeToStream):this.output="",this.generator=null!=t.generator?t.generator:x,this.expressionsPrecedence=null!=t.expressionsPrecedence?t.expressionsPrecedence:o,this.indent=null!=t.indent?t.indent:"  ",this.lineEnd=null!=t.lineEnd?t.lineEnd:"\n",this.indentLevel=null!=t.startingIndentLevel?t.startingIndentLevel:0,this.writeComments=!!t.comments&&t.comments,null!=t.sourceMap&&(this.write=null==t.output?this.writeAndMap:this.writeToStreamAndMap,this.sourceMap=t.sourceMap,this.line=1,this.column=0,this.lineEndSize=this.lineEnd.split("\n").length-1,this.mapping={original:null,generated:this,name:void 0,source:t.sourceMap.file||t.sourceMap._file})}write(e){this.output+=e}writeToStream(e){this.output.write(e)}writeAndMap(e,t){this.output+=e,this.map(e,t)}writeToStreamAndMap(e,t){this.output.write(e),this.map(e,t)}map(e,t){if(null!=t){const{type:i}=t;if("L"===i[0]&&"n"===i[2])return this.column=0,void this.line++;if(null!=t.loc){const{mapping:e}=this;e.original=t.loc.start,e.name=t.name,this.sourceMap.addMapping(e)}if("T"===i[0]&&"E"===i[8]||"L"===i[0]&&"i"===i[1]&&"string"==typeof t.value){const{length:t}=e;let{column:i,line:n}=this;for(let r=0;r<t;r++)"\n"===e[r]?(i=0,n++):i++;return this.column=i,void(this.line=n)}}const{length:i}=e,{lineEnd:n}=this;i>0&&(this.lineEndSize>0&&(1===n.length?e[i-1]===n:e.endsWith(n))?(this.line+=this.lineEndSize,this.column=0):this.column+=i)}toString(){return this.output}}function v(e,t){const i=new E(t);return i.generator[e.type](e,i),i.output}const{parse:S}=require("comment-parser/lib");function C(e){if(e.leadingComments){const t=e.leadingComments[0],i="Line"===t.type,n=t.value,r=S(i?`/** ${n} */`:`/*${n}*/`)[0];if(r)return{description:r.description,tags:r.tags.map((e=>({tag:e.tag,type:e.type,name:e.name,description:e.description})))}}return{description:null,tags:[]}}function D(e){const r=new Map;return n(e,{ExportNamedDeclaration:{enter(e,t){t.set("is_exported",!0)},exit(e,t){t.set("is_exported",!1)}},VariableDeclaration(e,t){if(t.get("is_exported")){const t=e.declarations[0],i=e.path.parent,n=e.kind,{name:s}=t.id,o=!t.init;let a=null,l=null;const{description:p,tags:c}=C(i);o||(a=v(t.init),l=t.init.type),r.set(s,{value:a,valueType:l,localName:s,kind:n,required:o,description:p,tags:c})}},ExportSpecifier(e,s){if(s.get("is_exported")){const s=e.exported.name,o=e.local.name,a=function(e,r){let s=e.path,o=[s],a=!1,l=e;for(s=s.bindings=s.bindings||{};l=l.path.parent;){let e=l.path.bindings||l.path.scoped;if(void 0===e){if(e={},"BlockStatement"===l.type)l.body.length&&n(l.body,{FunctionDeclaration(t){e[t.id.name]=t},VariableDeclarator(i){let n=t(i.id);Array.isArray(n)?n.forEach((t=>e[t]=i)):n&&(e[n]=i)}});else if("FunctionDeclaration"===l.type){let i=t(l);i&&(e[i]=e[i]||l),l.params.forEach((n=>{(i=t(n))&&(e[i]=e[i]||n)}))}else if("Program"===l.type){let n,r,s=0,o=l.body;for(;s<o.length;s++)(r=i(o[s]))&&[].concat(r).forEach((i=>{n=t(i),e[n]=e[n]||i}));a=!0}l.path.scoped=e,l.path.bindings={}}l.path.scanned||o.push(l.path);for(let t in e){let i,n=0,r=o;for(;n<r.length;n++)i=r[n],i.scanned=i.scanned||a,i.bindings[t]=i.bindings[t]||e[t]}if(r&&s[r])break}return s}(e,o)[o];let l=null,p=null,c=null,u=null,m="",d=[];if(a){const e=a.path.parent;l=!a.init,l||(p=v(a.init),c=a.init.type),u=e.kind,({description:m,tags:d}=C(e))}r.set(s,{value:p,valueType:c,localName:o,kind:u,required:l,description:m,tags:d})}},FunctionDeclaration(e,t){if(t.get("is_exported")){const t=e.path.parent,i=e.id.name,{description:n,tags:s}=C(t);r.set(i,{value:v(e),valueType:e.type,localName:i,kind:"function",required:!1,description:n,tags:s})}}},new Map),Object.fromEntries(r)}const{parse:k}=require("comment-parser/lib"),{walk:P}=require("svelte/compiler");function L(e){switch(e.type){case"Text":return e.raw;case"MustacheTag":return e.expression.raw;case"AttributeShorthand":return e.expression.name}return null}function A(e,t){const i=e.instance&&e.instance.content||"",n=function(e){const t=k(e),i={slot:{},event:{},typedef:{},restProps:!1,all:[]};return t.forEach((e=>{e.tags.forEach((e=>{switch(e.tag){case"slot":i.slot[e.name]={type:e.type,description:e.description};break;case"event":i.event[e.name]={eventDetail:e.type,description:e.description};break;case"typedef":i.typedef[e.name]={value:e.type,description:e.description};break;case"restProps":i.restProps=e.type}})),i.all.push({description:e.description,tags:e.tags.map((e=>({tag:e.tag,name:e.name,type:e.type,description:e.description,optional:e.optional})))})})),i}(t.substring(i.start,i.end)),r={},s=n.event;let o=null;return P(e.html,{enter(e){if("Slot"===e.type){const i=e.attributes,s=i.find((({name:e})=>"name"===e)),o=s?s.value[0].data:"default";r[o]={type:null,description:null,...n.slot[o],attributes:i.reduce(((e,t)=>{const i=t.value[0];return e[t.name]={value:L(i),valueType:i.type},e}),{}),content:t.substring(e.start,e.end)}}else["Element","InlineComponent"].includes(e.type)&&e.attributes.forEach((t=>{"EventHandler"!==t.type||t.expression?"Element"===e.type&&"Spread"===t.type&&"$$restProps"===t.expression.name&&(o=e.name):s[t.name]={description:null,eventDetail:"Element"===e.type?"window":null,...n.event[t.name],by:e.type,trigger:e.name}}))}}),o=n.restProps||o,{slots:r,events:s,typedef:n.typedef,restProps:o,all:n.all}}const{parse:T}=require("svelte/compiler"),M=require("path"),I=require("fs");module.exports=e=>{const t=e.file;let i,n;t?(i=I.readFileSync(t).toString(),n=M.basename(t)):({content:i,filename:n}=e);const r=i.replace(/<style(.)*>(.|\n)*<\/style>/,""),s=T(r,{filename:n,customElement:!1}),o=s.instance&&s.instance.content||"",a=A(s,i);return{props:D(o),...a}};
