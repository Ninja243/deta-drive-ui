(this["webpackJsonpdrive-ui"]=this["webpackJsonpdrive-ui"]||[]).push([[0],{12:function(e,t,n){},13:function(e,t,n){},23:function(e,t,n){"use strict";n.r(t);var a=n(1),l=n.n(a),i=n(2),r=n(4),s=n.n(r),c=n(6),o=n.n(c),d=(n(12),n(13),n(0));var u=function(){return Object(d.jsx)("div",{className:"App",children:Object(d.jsxs)("div",{className:"w2 pcolor",children:[Object(d.jsx)("br",{}),Object(d.jsx)("br",{}),Object(d.jsx)("nav",{className:"navbar pcolor",role:"navigation","aria-label":"main navigation",children:Object(d.jsxs)("div",{className:"navbar-brand",children:[Object(d.jsx)("a",{className:"navbar-item nav1",href:"https://deta.sh",children:Object(d.jsx)("img",{alt:"",src:"https://uploads-ssl.webflow.com/5eb96efa78dc680fc15be3be/5ec58c9b49c21c4535eead5a_logo-250.png",className:"img1"})}),Object(d.jsx)("h2",{className:"navbar-item header1",children:" Deta Drive Explorer"})]})}),Object(d.jsx)("header",{children:Object(d.jsxs)("h1",{className:"subtitle is-4",children:["Exploring your Deta Drive is now only a few clicks away! ",Object(d.jsx)("br",{}),Object(d.jsx)("strong",{children:"Heavily"})," based on ",Object(d.jsx)("a",{href:"https://explorer.deta.dev/",target:"_blank",rel:"noreferrer",children:"Deta Base Explorer"}),". Check out the code for this project at ",Object(d.jsx)("span",{children:Object(d.jsx)("a",{target:"_blank",rel:"noreferrer",href:"https://github.com/Ninja243/deta-base-explorer",children:"GitHub"})}),"."]})}),Object(d.jsxs)("section",{children:[Object(d.jsxs)("form",{className:"f1",children:[Object(d.jsx)("label",{className:"l1",children:"Project Key  "}),Object(d.jsx)("input",{id:"projectKey",className:"input l2",type:"text",placeholder:"Enter Project Key"}),Object(d.jsx)("label",{className:"l3",children:"Drive Name  "}),Object(d.jsx)("input",{id:"driveName",className:"input i1",type:"text",placeholder:"Enter Drive"}),Object(d.jsx)("label",{className:"l4",children:"Key "}),Object(d.jsx)("input",{id:"entryKey",className:"input i2",type:"text",placeholder:"Optional Key Input"})]}),Object(d.jsx)("br",{}),Object(d.jsx)("br",{}),Object(d.jsxs)("div",{className:"d1",children:[Object(d.jsx)("button",{id:"getAll",className:"button b1",children:"List Files"}),Object(d.jsx)("button",{id:"get",className:"button b2",children:"Get (with Key)"}),Object(d.jsx)("button",{id:"delete",className:"button b3",children:"Delete (with Key)"})]}),Object(d.jsx)("br",{}),Object(d.jsx)("div",{className:"d1",children:Object(d.jsx)("button",{id:"put",className:"button b3",children:"Put Data (with Key)"})}),Object(d.jsx)("br",{}),Object(d.jsx)("div",{className:"d3",children:Object(d.jsx)("h4",{className:"subtitle is-3",id:"resultText"})}),Object(d.jsx)("br",{}),Object(d.jsxs)("div",{id:"inputArea",className:"d4",children:[Object(d.jsxs)("p",{className:"subtitle is-4 App",children:["Add your labels and values in the respective input fields",Object(d.jsx)("br",{}),"If you do not provide a key, a random key will be added to the entry"]}),Object(d.jsx)("div",{id:"inputText",className:"d1"}),Object(d.jsx)("br",{}),Object(d.jsx)("div",{className:"d1",children:Object(d.jsx)("button",{id:"putConfirm",className:"button b1",children:"Write into your Drive!"})})]}),Object(d.jsx)("br",{}),Object(d.jsx)("div",{id:"tableDiv",className:"table-container tc",children:Object(d.jsxs)("table",{id:"dataTable",className:"table w1",children:[Object(d.jsx)("thead",{children:Object(d.jsxs)("tr",{children:[Object(d.jsx)("th",{className:"w3",children:"Index"}),Object(d.jsx)("th",{className:"w1",children:"Data"})]})}),Object(d.jsx)("tbody",{id:"tableBody"})]})}),Object(d.jsx)("br",{}),Object(d.jsx)("br",{})]})]})})},m=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,24)).then((function(t){var n=t.getCLS,a=t.getFID,l=t.getFCP,i=t.getLCP,r=t.getTTFB;n(e),a(e),l(e),i(e),r(e)}))},b=n(3);o.a.render(Object(d.jsx)(s.a.StrictMode,{children:Object(d.jsx)(u,{})}),document.getElementById("root"));var p=document.getElementById("projectKey"),j=document.getElementById("driveName"),y=document.getElementById("entryKey"),x=document.getElementById("getAll"),v=document.getElementById("get"),h=document.getElementById("delete"),f=document.getElementById("put"),g=document.getElementById("inputArea"),O=document.getElementById("inputText"),E=document.getElementById("putConfirm"),w=document.getElementById("resultText"),N=document.getElementById("tableDiv"),T=document.getElementById("dataTable"),k=!1;function B(){return(B=Object(i.a)(l.a.mark((function e(t,n,a){var i,r,s,c,o,d;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log(t.value),console.log(n.value),N.style.display="none",""===t.value||""===n.value?w.innerText="Enter valid Project Key and Drive Name":null===document.getElementById("toUpload").files.item(0)?w.innerText="Select a file to upload":(w.innerText="Writing ...",g.style.display="none",k=!1,f.innerText="Put Data (with Key)",i=Object(b.Deta)(t.value),r=i.Drive(n.value),s=new FileReader,c="binary/octet-stream",o=["mp4","webm"],d=["wav","wave","ogg","mp3"],["bmp","cod","gif","ief","jpe","jpeg","jpg","jfif","png","svg"].includes(document.getElementById("toUpload").files.item(0).name.slice((Math.max(0,document.getElementById("toUpload").files.item(0).name.lastIndexOf("."))||1/0)+1))&&(c="image/"+document.getElementById("toUpload").files.item(0).name.substring(document.getElementById("toUpload").files.item(0).name.lastIndexOf(".")+1)),o.includes(document.getElementById("toUpload").files.item(0).name.slice((Math.max(0,document.getElementById("toUpload").files.item(0).name.lastIndexOf("."))||1/0)+1))&&(c="video/"+document.getElementById("toUpload").files.item(0).name.substring(document.getElementById("toUpload").files.item(0).name.lastIndexOf(".")+1)),d.includes(document.getElementById("toUpload").files.item(0).name.slice((Math.max(0,document.getElementById("toUpload").files.item(0).name.lastIndexOf("."))||1/0)+1))&&(c="audio/"+document.getElementById("toUpload").files.item(0).name.substring(document.getElementById("toUpload").files.item(0).name.lastIndexOf(".")+1)),s.onload=function(){var e=new Uint8Array(s.result),t=r.put(document.getElementById("toUpload").files.item(0).name,{data:e,contentType:c}).then((function(){null!=t&&(w.innerText="Succesfully Wrote!"),a.innerHTML=""}))},s.readAsArrayBuffer(document.getElementById("toUpload").files.item(0)));case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function I(){return(I=Object(i.a)(l.a.mark((function e(t,n){var a,i,r,s,c;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(N.style.display="none",""!==t.value&&""!==n.value){e.next=6;break}w.innerText="Enter valid Project Key and Drive Name",N.style.display="none",e.next=16;break;case 6:return w.innerText="Collecting results from Drive...",a=Object(b.Deta)(t.value),i=a.Drive(n.value),e.next=11,i.list();case 11:if(r=e.sent,console.log(r),console.log("going to print everything"),console.log(JSON.stringify(r.names[0])),null===r)w.innerText="There are no entries in this Base!";else{for(w.innerText="",N.style.display="block",console.log("loopil keran ponu"),s=1,c=T.rows.length-1;c>0;c--)T.deleteRow(c);r.names.forEach((function(e){console.log(e);var t=T.rows.length,n=T.insertRow(t);n.insertCell(0).innerText=s,n.insertCell(1).innerText=JSON.stringify(e,void 0,4),s+=1}))}case 16:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function D(e,t,n){return K.apply(this,arguments)}function K(){return(K=Object(i.a)(l.a.mark((function e(t,n,a){var i,r,s,c,o,d,u,m,p,j,y,x,v,h,f;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(N.style.display="none",""!==t.value&&""!==n.value||""!==a.value){e.next=6;break}w.innerText="Enter valid Project Key and Base Name",N.style.display="none",e.next=23;break;case 6:if(""!==t.value&&""!==n.value||""===a.value){e.next=11;break}w.innerText="Enter Project Key and Base Name",N.style.display="none",e.next=23;break;case 11:if(""!==a.value){e.next=16;break}w.innerText="Invalid Key, Try Again!",N.style.display="none",e.next=23;break;case 16:return w.innerText="Collecting Entry...",i=Object(b.Deta)(t.value),r=i.Drive(n.value),e.next=21,r.get(a.value);case 21:if(null===(s=e.sent))w.innerText="Sorry, there is no record with this key!";else{for(N.style.display="block",w.innerText="",c=T.rows.length-1;c>0;c--)T.deleteRow(c);o=T.rows.length,d=T.insertRow(o),d.insertCell(0).innerText=1,u=d.insertCell(1),m=window.URL||window.webkitURL,console.log(s),"binary/octet-stream"===s.type?u.innerText="Binary":s.type.includes("image/")?(p=document.createElement("img"),j=m.createObjectURL(s),p.src=j,p.height=55,p.width=55,u.appendChild(p)):s.type.includes("video/")?(y=document.createElement("video"),x=m.createObjectURL(s),y.src=x,y.controls=!0,y.innerHTML='Your browser doesn\'t support embedded videos. Download it <a target="_blank" href="'+x+'">here</a>.',u.appendChild(y)):s.type.includes("audio/")?(v=document.createElement("audio"),h=m.createObjectURL(s),v.src=h,v.controls=!0,v.innerHTML='Your browser doesn\'t support embedded audio. Download it <a target="_blank" href="'+h+'">here</a>.',u.appendChild(v)):(f=m.createObjectURL(s),u.innerText="No idea. Download it <a src='"+f+"' target='_blank'>here</a>.")}case 23:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function U(){return(U=Object(i.a)(l.a.mark((function e(t,n,a){var i,r,s;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(N.style.display="none",""!==t.value||""!==n.value||""!==a.value){e.next=5;break}w.innerText="Enter valid Project Key and Base Name",e.next=28;break;case 5:if(""!==t.value&&""!==n.value||""!==a.value){e.next=10;break}w.innerText="Enter valid Project Key and Base Name",N.style.display="none",e.next=28;break;case 10:if(""!==t.value&&""!==n.value||""===a.value){e.next=15;break}w.innerText="Enter Project Key and Base Name",N.style.display="none",e.next=28;break;case 15:if(""!==a.value){e.next=20;break}w.innerText="Invalid Key, Try Again!",N.style.display="none",e.next=28;break;case 20:return w.innerText="Deleting Entry...",i=Object(b.Deta)(t.value),r=i.Drive(n.value),e.next=25,r.delete(a.value);case 25:s=e.sent,console.log(s),w.innerText="The entry was deleted!";case 28:case"end":return e.stop()}}),e)})))).apply(this,arguments)}f.addEventListener("click",(function(){if(N.style.display="none",!1===k){g.style.display="block",f.innerText="Hide Input Area",k=!0;var e=document.createElement("div");e.style="display:flex; text-align:center; width:100%";var t=document.createElement("input");t.className="input",t.placeholder="Enter Label",t.style="float:left; margin-right:5px; margin-bottom:5px; margin-left:auto;";var n=document.createElement("input");n.className="input",n.placeholder="Enter Value",n.style="float:right; margin-left:5px; margin-bottom:5px; margin-right:auto;";var a=document.createElement("form");a.enctype="multipart/form-data",a.method="post";var l=document.createElement("input");l.type="file",l.name="file",l.id="toUpload",l.multiple=!1,a.appendChild(l),e.appendChild(a),O.appendChild(e)}else k&&(g.style.display="none",f.innerText="Put Data (with Key)",k=!1,O.innerHTML="",w.innerText="")})),v.addEventListener("click",Object(i.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:D(p,j,y);case 1:case"end":return e.stop()}}),e)})))),h.addEventListener("click",(function(){console.log("Project Key is ".concat(p.value)),console.log("Base Name is ".concat(j.value)),console.log("Entry Key is ".concat(y.value)),function(e,t,n){U.apply(this,arguments)}(p,j,y)})),x.addEventListener("click",(function(){console.log("Project Key is ".concat(p.value)),console.log("Base Name is ".concat(j.value)),console.log("Entry Key is ".concat(y.value)),function(e,t){I.apply(this,arguments)}(p,j)})),E.addEventListener("click",(function(){!function(e,t,n){B.apply(this,arguments)}(p,j,O)})),m()}},[[23,1,2]]]);
//# sourceMappingURL=main.6e6dbfaa.chunk.js.map