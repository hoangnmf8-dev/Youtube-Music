function controlSlide(id) {
  const $ = document.querySelector.bind(document);
  const slide = $(`${id} .section-body`);
  const btnNext = slide.closest(id).querySelector(".section-controls-btn.next");
  const btnBack = slide.closest(id).querySelector(".section-controls-btn.back");
  const stepScroll = slide.clientWidth * 10 / 100;

  if(+slide.clientWidth === +slide.scrollWidth) {
    btnBack.classList.remove("active");
    btnNext.classList.remove("active");
  } else {
    btnNext.classList.add("active");
  }

  btnNext.addEventListener("click", e => {
    slide.scrollBy({
      left: stepScroll,
      behavior: "smooth"
    })
    if((slide.scrollWidth - slide.clientWidth) <= (+slide.scrollLeft + 2)) {
      btnNext.classList.remove("active");
    } else {
      if(!btnNext.classList.contains("active")) {
        btnNext.classList.add("active");
      }
    }

    if(+slide.scrollLeft + stepScroll > 0 && !btnBack.classList.contains("active")) {
      btnBack.classList.add("active");
    }
  })


  btnBack.addEventListener("click", e => {
    slide.scrollBy({
      left: -stepScroll,
      behavior: "smooth"
    })
    if(slide.scrollLeft - stepScroll <= 0) {
      btnBack.classList.remove("active");
    } else {
      if(!btnBack.classList.contains("active")) {
        btnBack.classList.add("active");
      }
    }

    if(((slide.scrollWidth - slide.clientWidth) !== (slide.scrollLeft + stepScroll)) && !btnNext.classList.contains("active")) {
      btnNext.classList.add("active");
    }
  });

  slide.addEventListener("scroll", e => {
    if(slide.scrollWidth - slide.clientWidth  <= +slide.scrollLeft + 2) {
      btnNext.classList.remove("active");
    } else {
      if(!btnNext.classList.contains("active")) {
        btnNext.classList.add('active');
      }
    }

    if(+slide.scrollLeft === 0) {
      btnBack.classList.remove("active");
    } else {
      if(!btnBack.classList.contains("active")) {
        btnBack.classList.add("active");
      }
    }
  })
}

export default controlSlide;