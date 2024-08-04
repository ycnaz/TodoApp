const __vite__fileDeps=["assets/cross-w-CGOUEG2X.js","assets/index-CTydEL2q.js","assets/index-DM-Gva1Y.css","assets/hamburger-BlZImWoe.js"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import{g as U,u as j,D as i,r as x,G,j as W,I as q,o as s,c as a,a as n,n as y,b as d,w as k,d as l,O as b,P as S,N as g,F as Y,M as J,U as K,q as C,f as T,_ as B}from"./index-CTydEL2q.js";import{u as Q}from"./useLeftSideBar-CdaP7crN.js";import{u as X,a as Z}from"./useLists-CWo7fso7.js";import{u as ee}from"./useRightBar-DT88hqXG.js";const te={class:"flex grow"},oe={class:"p-3 flex grow justify-center"},se={class:"flex flex-col flex-grow items-center gap-y-5"},ae={key:"hamburger",class:"flex-none mr-auto"},ie={key:"loading"},ne={class:"text-4xl mb-5 dark:text-white",key:"filter"},re=["onClick"],le={class:"flex items-center"},ce=["disabled","onClick","checked"],de={style:{"word-break":"break-all"},class:"text-white pl-5 break-words"},ue={key:"no-todo"},fe={__name:"TodoComp",setup(me){const D=T(()=>B(()=>import("./cross-w-CGOUEG2X.js"),__vite__mapDeps([0,1,2]))),E=T(()=>B(()=>import("./hamburger-BlZImWoe.js"),__vite__mapDeps([3,1,2]))),L=j(),o=X(),p=i(()=>o.filteredTodos),h=Q(),u=i(()=>h.isSidebarOpen),z=i(()=>o.filter.charAt(0).toUpperCase()+o.filter.slice(1)),f=x(u.value);G(()=>{u.value?f.value=!0:setTimeout(()=>{f.value=!1},250)});function F(){h.toggleSideBar()}const c=ee(),O=i(()=>c.rightBarOpen),R=i(()=>c.editing);function V(){R.value!==!0&&c.toggleRightBar(),c.editing=!1}const A=Z(),I=i(()=>A.lists);function M(t){return I.value.find(r=>r.name===t.list).color}function N(t){o.removeTodo(t),L.success("To-do removed successfully")}function P(t){o.toggleTodo(t)}function _(t){const r=new Date;return new Date(t)<r.setHours(0,0,0,0)}function $(t){const r=M(t),e=_(t.date)?"0.75":"1";return{backgroundColor:r,opacity:e}}const v=x(window.innerWidth<1280);function m(){v.value=window.innerWidth<1280}const H=i(()=>(u.value||O.value)&&v.value?"block":"hidden");return W(()=>{m(),window.addEventListener("resize",m)}),q(()=>window.removeEventListener("resize",m)),(t,r)=>(s(),a("div",te,[n("div",{class:y([H.value,"fixed w-full h-full bg-black opacity-80 z-20"])},null,2),n("div",oe,[n("div",se,[d(S,{tag:"div",name:"fade",class:"flex max-w-96 w-full max-sm:min-w-fit"},{default:k(()=>[f.value?b("",!0):(s(),a("div",ae,[d(l(E),{onClick:F,class:"h-16 w-16 cursor-pointer"})])),(s(),a("button",{onClick:V,key:"newTodo",class:"max-w-96 w-full h-14 mt-1 bg-indigo-700 rounded-lg shadow-md text-white text-3xl hover:bg-indigo-500 focus:bg-indigo-500 active:bg-indigo-600 max-sm:min-w-fit transition-all"},"+"))]),_:1}),d(S,{tag:"ul",name:"fade",class:"flex flex-col gap-y-1 relative list-none w-96 max-sm:max-w-96 max-sm:w-auto"},{default:k(()=>[l(o).loading?(s(),a("span",ie,"Checking for to-do's...")):(s(),a("span",ne,g(l(o).listFilter?l(o).listFilter:z.value),1)),(s(!0),a(Y,null,J(p.value,e=>(s(),a("li",{key:e.id,onClick:w=>t.$emit("editTodo",e),style:K($(e)),class:"group flex flex-col w-96 max-sm:max-w-96 max-sm:w-auto py-3 px-5 rounded-lg shadow-lg transition-all cursor-pointer"},[n("div",le,[n("input",{disabled:_(e.date),onClick:C(w=>P(e.id),["stop"]),type:"checkbox",checked:e.completed,class:"cursor-pointer w-4 h-4 border-none text-indigo-600 transition-all"},null,8,ce),n("span",de,g(e.text),1),d(l(D),{onClick:C(w=>N(e.id),["stop"]),class:"opacity-0 h-5 w-5 ml-auto cursor-pointer rounded-full group-hover:opacity-100 transition-all duration-300"},null,8,["onClick"])]),n("p",{class:y([{"group-hover:mt-3":e.desc},"text-gray-200 max-h-0 opacity-0 group-hover:opacity-100 group-hover:max-h-96 group-focus:opacity-100 group-focus:max-h-96 transition-all"])},g(e.desc),3)],12,re))),128)),!l(o).loading&&!p.value?(s(),a("h1",ue,"You have no to-do's")):b("",!0)]),_:1})])])]))}},ve=U(fe,[["__scopeId","data-v-603d39c9"]]);export{ve as default};
