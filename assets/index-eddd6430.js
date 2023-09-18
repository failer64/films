import{r as g,w as I,h as b,u as m,a as z,c as E,x as N,y as F,z as j,j as e,d as r,e as p,f as d,I as u,E as A,P as T,i as L,T as U}from"./index-a5e3f5d8.js";import{S}from"./index-f10bf813.js";const k=s=>s.filmsProfile.film,B=s=>s.filmsProfile.filmSimilars,R=s=>s.filmsProfile.images,O=s=>s.filmsProfile.totalPages,$=s=>s.filmsProfile.isFetching;const{Title:h,Paragraph:l,Text:n}=U,K=g.memo(()=>{const[s,w]=g.useState(1),{filmId:o}=I(),f=Number(o),C=b(),i=m(k),x=m(B),P=m(R),y=m(O),v=m($),a=z();return g.useEffect(()=>{a(E("film")),a(N(Number(o))),a(F({id:f,currentPage:s})),a(j(Number(o)))},[o]),g.useEffect(()=>{a(F({id:f,currentPage:s}))},[s,y]),v?e(S,{size:"large",tip:"Loading"}):i&&r("div",{children:[e(h,{children:i.nameRu||i.nameOriginal}),r(p,{gutter:[{xs:0,sm:0,md:20},{xs:20,sm:20,md:0}],style:{marginBottom:"30px"},children:[e(d,{md:{span:8},sm:{span:24},children:e(u,{alt:"Poster",height:"100%",style:{height:"100%"},fallback:"https://avatars.mds.yandex.net/get-mpic/4614113/img_id4540393345861599750.jpeg/9hq",src:i.posterUrl,preview:!1})}),r(d,{md:{span:16},style:{fontSize:"22px"},children:[e(h,{level:4,children:i.slogan}),r(l,{children:[e(n,{strong:!0,children:"Год: "}),e(n,{children:i.year})]}),r(l,{children:[e(n,{strong:!0,children:"Рейтинг: "}),e(n,{type:"warning",children:i.ratingKinopoisk||i.ratingImdb})]}),r(l,{children:[e(n,{strong:!0,children:"Ограничение: "}),r(n,{children:[i.ratingAgeLimits&&i.ratingAgeLimits.replace("age","")," +"]})]}),r(l,{children:[e(n,{strong:!0,children:"Жанр: "}),i.genres.map((t,c)=>r(n,{children:[t.genre," "]},c))]}),r(l,{children:[e(n,{strong:!0,children:"Страна: "}),i.countries.map((t,c)=>r(n,{children:[t.country," "]},c))]}),e(l,{children:e(n,{children:i.description})})]})]}),r("div",{children:[e(h,{level:3,children:"Кадры из фильма:"}),P.length?e(p,{gutter:[{xs:8,sm:12,md:16},{xs:8,sm:12,md:16}],style:{marginBottom:"20px"},children:P.map((t,c)=>e(d,{md:{span:6},xs:{span:12},className:"image",children:e(u,{alt:"Poster",src:t.previewUrl,preview:{src:`${t.imageUrl}`},style:{height:"190px"}})},c))}):e(A,{description:"Not images"}),e(T,{hideOnSinglePage:!0,onChange:t=>w(t),current:s,total:y*20,pageSize:20,showSizeChanger:!1,responsive:!0,style:{textAlign:"center"},disabled:v})]}),r("div",{children:[e(h,{level:3,children:"Похожие фильмы:"}),e(p,{justify:"center",gutter:[{xs:8,sm:12,md:16},{xs:8,sm:12,md:16}],style:{marginBottom:"20px"},children:x.length?x.map(t=>e(d,{md:{span:3},xs:{span:8},children:e(L,{hoverable:!0,onClick:()=>C(`/film/${t.filmId}`),style:{height:"100%"},cover:e(u,{alt:"Poster",style:{width:"100%",height:"211px"},src:t.posterUrl,preview:!1}),children:e(l,{children:t.nameRu||t.nameEn})})})):e(S,{size:"large",tip:"Loading"})})]})]})});export{K as default};