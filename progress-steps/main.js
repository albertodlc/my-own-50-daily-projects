const nextButton = document.querySelector('#next');
const prevButton = document.querySelector('#prev');

const PROGRESS_BAR = {
    1: "0%",
    2: "32%",
    3: "65%",
    4: "100%"
}

function handleNextStep(){
    function updateCircles(){
        let numTotal = document.querySelectorAll('.circle').length;
        let numActive = document.querySelectorAll('.active').length;
    
        if(numActive === numTotal){
            return;
        }
    
        document.getElementsByClassName('circle')[numActive].classList.add('active');
    }

    function updateProgressBar(){
        const progressBar = document.querySelector('#progress');
        let numActive = document.querySelectorAll('.active').length;

        progressBar.style.width = PROGRESS_BAR[numActive + 1];
    }

    function unlockPrevButton(){
        let numActive = document.querySelectorAll('.active').length;

        if( numActive > 1 ){
            prevButton.disabled = false;
        }

    }

    function lockNextButton(){
        let numActive = document.querySelectorAll('.active').length;

        if(  numActive === 4 ){
            nextButton.disabled = true;
        }
    }

    updateProgressBar();
    updateCircles();
    unlockPrevButton();
    lockNextButton();
}

function handlePrevStep(){
    function updateCircles(){
        let numActive = document.querySelectorAll('.active').length;

        if( numActive === 1 ){
            return;
        }

        document.getElementsByClassName('circle')[numActive - 1].classList.remove('active');
    }

    function updateProgressBar(){
        const progressBar = document.querySelector('#progress');
        let numActive = document.querySelectorAll('.active').length;

        progressBar.style.width = PROGRESS_BAR[numActive];
    }

    function unlockNextButton(){
        let numActive = document.querySelectorAll('.active').length;
        let numTotal = document.querySelectorAll('.circle').length;

        if( numActive < numTotal ){
            nextButton.disabled = false;
        }
    }

    function lockPrevButton(){
        let numActive = document.querySelectorAll('.active').length;

        if( numActive === 1 ){
            prevButton.disabled = true;
        }
    }

    updateCircles();
    updateProgressBar();
    unlockNextButton();
    lockPrevButton();
}

nextButton.addEventListener('click', handleNextStep);
prevButton.addEventListener('click', handlePrevStep);

