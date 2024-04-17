(function renderPage(){
  "use strict"
  const searchBtn = document.querySelectorAll(".searchjs");
  const searchBox = document.querySelector('.search-container');
  const nav = document.querySelector(".menu-containerjs");
  const cancelMBtn = document.querySelector(".cancel.nav");
  const cancelSBtn = document.querySelector(".cancel.search");
  const searchText = document.querySelector('.input');
  const hamburgerBtn = document.querySelectorAll(".menujs");
  const navList = document.querySelector('.sub-mainjs');
  const searchEl = document.getElementById('searchDisplay');

  const facebook = document.getElementById("fb-icon");
  const instagram = document.getElementById("insta-icon");
  const linkedIn = document.getElementById("linkedIn-icon");
  const twitter = document.getElementById("twitter-icon");



  searchBtn.forEach((btn)=>{
    btn.addEventListener('click', ()=>{
      btn.style.display = "none"
      searchBox.style.display = "flex";
      searchBox.classList.add('open-search');
      searchText.focus();
      navList.style.visibility = "hidden"

    })
    cancelSBtn.addEventListener('click', ()=>{
      searchBox.style.display = "none";
    })

  
  });

  hamburgerBtn.forEach((menu)=>{
    menu.addEventListener('click', ()=>{
      nav.style.display = "flex";
      nav.classList.add('menu-open');
      
    })

    cancelMBtn.addEventListener('click', ()=>{
      nav.style.display = "none";
      
    })

  });



  document.querySelectorAll(".share-linkjs").forEach((element)=>{

    element.addEventListener("click", (e)=>{
      if(e.target === twitter){
        const tweetUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent("localhost:3000/<%= item._id %>")}`;
    
        window.open(tweetUrl, "_blank")
    
      }
    
      if(e.target === facebook){  
        const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("localhost:3000/<%= item._id %>")}`;
    
        window.open(facebookShareUrl, '_blank');
    
      }
    
      if(e.target === linkedIn){
        const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("localhost:3000/<%= item._id %>")}`;
    
        window.open(linkedInShareUrl, '_blank');
      }
    })

  })

}());


