import{a as y,S as w,i as n}from"./assets/vendor-CRCB-GUD.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const g of s.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&l(g)}).observe(document,{childList:!0,subtree:!0});function r(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(t){if(t.ep)return;t.ep=!0;const s=r(t);fetch(t.href,s)}})();const h=a=>`
  <li class="gallery-card"><a class="gallery-link" href="${a.largeImageURL}">
    <img class="gallery-img" src="${a.webformatURL}" alt="${a.tags}"/>
</a><div class ="card-data">  <ul class="data-list"><li class="image-data"><p class="image-data-text">Views</p><p class="image-data-text">${a.views}</p></li>
  <li class="image-data"><p class="image-data-text">Likes</p><p class="image-data-text">${a.likes}</p></li>
  <li class="image-data"><p class="image-data-text">Comments</p><p class="image-data-text">${a.comments}</p></li>
  <li class="image-data"><p class="image-data-text">Downloads</p><p class="image-data-text">${a.downloads}</p></li>
  </ul></div></li>
  `;y.defaults.baseURL="https://pixabay.com/";const f=(a,e)=>{const r={params:{key:"45764445-59cc1762e95f1291ab4a968b5",q:a,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:15}};return y.get("api/",r)},d=document.querySelector(".search-form"),p=document.querySelector(".gallery"),i=document.querySelector(".loader"),c=document.querySelector(".js-load-more");let u="",m=1,L=0,o=0;const v=new w(".gallery-link",{captions:!0,captionsData:"alt",captionDelay:250}),b=async a=>{try{if(a.preventDefault(),m=1,o=0,u=d.elements.user_query.value.trim(),c.classList.contains("is-hidden")||c.classList.add("is-hidden"),u===""){n.show({message:"❌ Sorry, there are no images matching your search query. Please try again!",color:"red",position:"topRight"});return}i.classList.add("is-open");const e=await f(u,m);if(e.data.total===0){i.classList.remove("is-open"),d.reset(),n.show({message:"❌ Sorry, there are no images matching your search query. Please try again!",color:"red",position:"topRight"}),p.innerHTML="";return}const r=e.data.hits.map(t=>h(t)).join("");if(d.reset(),i.classList.remove("is-open"),p.innerHTML=r,v.refresh(),L=p.querySelector("li").getBoundingClientRect().height,o=document.querySelectorAll(".gallery-card"),e.data.totalHits===o.length){n.show({message:"That's all we could find on your request",color:"yellow",position:"topRight"});return}c.classList.remove("is-hidden")}catch(e){console.log(e)}},q=async a=>{try{m+=1,i.classList.add("is-open");const e=await f(u,m),r=e.data.hits.map(l=>h(l)).join("");p.insertAdjacentHTML("beforeend",r),v.refresh(),i.classList.remove("is-open"),scrollBy({top:L*2,behavior:"smooth"}),o=document.querySelectorAll(".gallery-card"),console.log(e.data.totalHits),console.log(o.length),e.data.totalHits<=o.length&&(c.classList.add("is-hidden"),n.show({message:"We're sorry, but you've reached the end of search results.",color:"yellow",position:"topRight"}))}catch(e){console.log(e)}};d.addEventListener("submit",b);c.addEventListener("click",q);
//# sourceMappingURL=index.js.map
