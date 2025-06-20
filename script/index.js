let images = [{
  url: "images/admiral.jpg",
  title1: "Rostov-on-Don <br> LCD admiral",
  title2: "81 m2",
  title3: "3.5 months",
  title4: "Upon request",
  name: "Rostov-on-Don, Admiral"
}, {
  url: "images/Sochi.jpg",
  title1: "Sochi <br> Thieves",
  title2: "105 m2",
  title3: "4 months",
  title4: "Upon request",
  name: "Sochi Thieves"
}, {
  url: "images/Rostov.jpg",
  title1: "Rostov-on-Don <br> Patriotic",
  title2: "93 m2",
  title3: "3 months",
  title4: "Upon request",
  name: "Rostov-on-Don Patriotic"
}];

function initSlider() {
  if (!images || !images.length) return;

  let sliderImages = document.querySelector(".slider__images");
  let sliderArrows = document.querySelector(".slider__arrows");
  let sliderDots = document.querySelector(".slider__dots");
  let title1 = document.querySelector(".value1");
  let title2 = document.querySelector(".value2");
  let title3 = document.querySelector(".value3");
  let title4 = document.querySelector(".value4");
  let nameObj = document.querySelector(".titles");

  initImages();
  initArrows();
  initDots();
  initTitles();
  initNames();

  function initImages() {
    images.forEach((image, index) => {
      let imageDiv = `<div class="image n${index} ${index === 0 ? "active" : ""}" style="background-image:url(${images[index].url});" data-index="${index}"></div>`;
      sliderImages.innerHTML += imageDiv;
    });
  }

  function initArrows() {
    // Стрелки для десктопной версии
    sliderArrows.querySelectorAll(".slider__arrow").forEach(arrow => {
      arrow.addEventListener("click", function() {
        let curNumber = +sliderImages.querySelector(".active").dataset.index;
        let nextNumber;
        if (arrow.classList.contains("left")) {
          nextNumber = curNumber === 0 ? images.length - 1 : curNumber - 1;
        } else {
          nextNumber = curNumber === images.length - 1 ? 0 : curNumber + 1;
        }
        moveSlider(nextNumber);
      });
    });

    // Стрелки для мобильной версии
    document.querySelectorAll('.button_arrow1_cp, .button_arrow2_cp, .button_arrow1_c1, .button_arrow2_c1').forEach(arrow => {
      arrow.addEventListener('click', function() {
        const currentIndex = +sliderImages.querySelector('.active').dataset.index;
        let nextIndex;
        
        if (this.classList.contains('button_arrow1_cp') || this.classList.contains('button_arrow1_c1')) {
          // Левая стрелка - предыдущий слайд
          nextIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
        } else {
          // Правая стрелка - следующий слайд
          nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
        }
        
        moveSlider(nextIndex);
      });
    });
  }

  

  function initDots() {
    images.forEach((image, index) => {
      let dot = `<div class="slider__dots-item n${index} ${index === 0 ? "active" : ""}" data-index="${index}"></div>`;
      sliderDots.innerHTML += dot;
    });

    sliderDots.querySelectorAll(".slider__dots-item").forEach(dot => {
      dot.addEventListener("click", function() {
        moveSlider(this.dataset.index);
      })
    })
  }

  function moveSlider(num) {
    sliderImages.querySelector(".active").classList.remove("active");
    sliderImages.querySelector(".n" + num).classList.add("active");

    sliderDots.querySelector(".active").classList.remove("active");
    sliderDots.querySelector(".n" + num).classList.add("active");

    title1.querySelector(".active").classList.remove("active");
    title1.querySelector(".n" + num).classList.add("active");
    title2.querySelector(".active").classList.remove("active");
    title2.querySelector(".n" + num).classList.add("active");
    title3.querySelector(".active").classList.remove("active");
    title3.querySelector(".n" + num).classList.add("active");
    title4.querySelector(".active").classList.remove("active");
    title4.querySelector(".n" + num).classList.add("active");

    nameObj.querySelector(".active").classList.remove("active");
    nameObj.querySelector(".n" + num).classList.add("active");
  }

  function initTitles() {
    images.forEach((image, index) => {
      let title1Div = `<div class="value1 n${index} ${index === 0 ? "active" : ""}" data-index="${index}">${images[index].title1}</div>`;
      let title2Div = `<div class="value2 n${index} ${index === 0 ? "active" : ""}" data-index="${index}">${images[index].title2}</div>`;
      let title3Div = `<div class="value3 n${index} ${index === 0 ? "active" : ""}" data-index="${index}">${images[index].title3}</div>`;
      let title4Div = `<div class="value4 n${index} ${index === 0 ? "active" : ""}" data-index="${index}">${images[index].title4}</div>`;
      title1.innerHTML += title1Div;
      title2.innerHTML += title2Div;
      title3.innerHTML += title3Div;
      title4.innerHTML += title4Div;
    });
  }

  function initNames() {
    images.forEach((image, index) => {
      let nameSlider = `<div class="title_ob n${index} ${index === 0 ? "active" : ""}" data-index="${index}">${images[index].name}</div>`;
      nameObj.innerHTML += nameSlider;
    });

    nameObj.querySelectorAll(".title_ob").forEach(nameSlider => {
      nameSlider.addEventListener("click", function() {
        moveSlider(this.dataset.index);
      })
    })
  }
}

document.addEventListener("DOMContentLoaded", function() {
  // Инициализация слайдера
  initSlider();

  // Прозрачность хедера при скролле
  const header = document.getElementById('header');
  const scrollThreshold = 100;

  window.addEventListener('scroll', () => {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Базовая маска для телефона
  document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('input', function(e) {
      let value = this.value.replace(/\D/g, '');
      if (value.length > 0) {
        value = '+7 (' + value.substring(1, 4) + ') ' + 
                value.substring(4, 7) + '-' + 
                value.substring(7, 9) + '-' + 
                value.substring(9, 11);
      }
      this.value = value;
    });
  });

  // Обработчики отправки форм
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Проверка обязательных полей
      const requiredInputs = Array.from(form.querySelectorAll('[required]'));
      const isValid = requiredInputs.every(input => {
        if (input.type === 'checkbox') return input.checked;
        return input.value.trim() !== '';
      });

      if (isValid) {
        // Если форма в модальном окне
        if (form.closest('.modal')) {
          hideModals();
          showModal('sentModal');
        } else {
          alert('Thank you! Your request has been submitted.');
          form.reset();
        }
      } else {
        alert('Please fill in all required fields');
      }
    });
  });
});