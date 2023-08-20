const leftContainer = document.querySelector('.left-container');
const rightContainer = document.querySelector('.right-container');

leftContainer.addEventListener('mouseenter', () => leftContainer.classList.add('hover-left'))
leftContainer.addEventListener('mouseleave', () => leftContainer.classList.remove('hover-left'))

rightContainer.addEventListener('mouseenter', () => rightContainer.classList.add('hover-right'))
rightContainer.addEventListener('mouseleave', () => rightContainer.classList.remove('hover-right'))
