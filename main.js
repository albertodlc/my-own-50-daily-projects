document.querySelectorAll(".website-wrapper").forEach((elem) => {
    elem.addEventListener("mouseover", () => {
        const tags = elem.getElementsByClassName('website-tags-section');
        tags[0].classList.remove('non-active-section');
    });

    elem.addEventListener("mouseout", () => {
        const tags = elem.getElementsByClassName('website-tags-section');
        tags[0].classList.add('non-active-section');
    });
});

