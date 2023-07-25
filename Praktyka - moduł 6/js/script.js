'use strict';
{
    const eventHandler = function(event) {
        event.preventDefault();
        const clicked = this;
        const activeElements = document.getElementsByClassName('active');
        Object.entries(activeElements).forEach(el => el[1].classList.remove('active'));

        const id = clicked.getAttribute('href').replace('#', '');

        clicked.classList.add('active');
        document.getElementById(id).classList.add('active');
    }

    const selectors = document.querySelectorAll('.titles > li > a');
    selectors.forEach(selector => selector.addEventListener('click', eventHandler));
}