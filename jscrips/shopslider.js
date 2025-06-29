
 document.addEventListener('DOMContentLoaded', () => {
    const sliderInner = document.querySelector('.innerslide');
    const slides = document.querySelectorAll('.slides');
    const toggleBtn = document.getElementById('next');
    const container = document.querySelector('.second');
    const arrow = document.querySelector('.nb');


    let currentIndex = 0;
    const slideVW = 93; // <-- Задаем ширину одного слайда в VW

    // Устанавливаем общую ширину для slider-inner в VW.
    // Если у вас 2 слайда, каждый 80vw, то innerslide должен быть 160vw.
    sliderInner.style.width = `${slides.length * slideVW}vw`; // <-- Установка ширины в vw

       function goToSlide(index) {
        currentIndex = index;
        const offsetVW = -currentIndex * slideVW; // Вычисляем смещение прямо в VW
        sliderInner.style.transform = `translateX(${offsetVW}vw)`; // <-- Применяем transform в vw
        console.log(`Переход к слайду: ${currentIndex}, transform: ${sliderInner.style.transform}`);
    }

    goToSlide(0); // Изначально показываем первый слайд

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            if (currentIndex === 0) {
                goToSlide(1);
                 let newText = "merch";
    next.textContent = newText;
   next.style.textDecoration = "underline";
   container.style.marginLeft = '85vw';
   arrow.style.display = "none";
   
            } else {
                goToSlide(0);
                next.textContent = "track releases";
                 next.style.textDecoration = "underline";
   container.style.marginLeft = '82.5vw';
   arrow.style.display = 'block'
            }
        });
    } else {
        console.error("Кнопка с ID 'next' не найдена!");
    }
     
});






