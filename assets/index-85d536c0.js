import{j as t,C as F,r as n,u as l,a as w,g as E,b,c as k,d,F as G,R as p,e as L,f,h as S,i as T,I as j,T as B,k as I,l as R}from"./index-a5e3f5d8.js";import{S as y}from"./index-f10bf813.js";const H=e=>e.filmsPage.films,z=e=>e.filmsPage.isFetching,A=e=>e.filmsPage.genre,D=e=>e.filmsPage.genres,K=()=>t(F,{speed:3,width:900,height:52,viewBox:"0 0 900 52",backgroundColor:"#f3f3f3",foregroundColor:"#ecebeb",children:t("rect",{x:"0",y:"0",rx:"10",ry:"10",width:"900",height:"32"})}),{Title:x,Paragraph:v,Text:N}=B,$=n.memo(()=>{const[e,o]=n.useState(1),[r,c]=n.useState(!0),i=l(H),g=l(A),h=l(D),C=l(z),a=w();n.useEffect(()=>{r&&e<6?(a(E()),a(b({genre:g,page:e})),o(s=>s+1),c(!1)):e===6&&c(!1)},[r,g]),n.useEffect(()=>(a(k("films")),document.addEventListener("scroll",u),function(){document.removeEventListener("scroll",u)}),[]);const u=s=>{s.target.documentElement.scrollHeight-(window.innerHeight+s.target.documentElement.scrollTop)<100&&i.length<=40&&c(!0)},P=s=>{a(I()),o(1),a(R(s)),c(!0)};return d(G,{children:[t(x,{children:"Каталог фильмов:"}),h.length?t(p.Group,{defaultValue:g,onChange:s=>P(s.target.value),disabled:r,style:{marginBottom:"20px"},children:h.map(s=>t(p.Button,{value:s.id,children:s.genre},s.id))}):t(K,{}),i.length?d(L,{justify:"center",gutter:[{sm:8,md:16,xl:24},{xs:16,sm:16,xl:24}],children:[i.map((s,m)=>t(f,{lg:{span:6},md:{span:8},sm:{span:12},children:t(O,{film:s},m)},m)),C&&t(f,{children:t(y,{size:"large",tip:"Loading"})})]}):t(y,{size:"large",tip:"Loading"})]})}),O=n.memo(({film:e})=>{const o=S();return d(T,{hoverable:!0,onClick:()=>o(`/film/${e.kinopoiskId}`),style:{height:"100%"},cover:t(j,{alt:"Poster",src:e.posterUrl,style:{width:"100%",height:"438px"},preview:!1}),children:[t(x,{level:5,children:e.nameRu||e.nameOriginal}),t(v,{strong:!0,children:e.ratingKinopoisk}),t(v,{type:"success",children:e.year}),t(N,{type:"secondary",children:e.countries.map(r=>r.country+" ")})]})});export{$ as default};
