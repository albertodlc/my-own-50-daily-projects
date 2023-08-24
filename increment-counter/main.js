const X_SUBSCRIBERS = 132742;
const YT_SUBSCRIBERS = 945890;
const FB_SUBSCRIBERS = 90432;

let counter = 0;

let xCounter = document.getElementById("x-counter");
let youtubeCounter = document.getElementById("youtube-counter");
let facebookCounter = document.getElementById("facebook-counter");

let currentInterval = setInterval(updateCounters, 0.0001);

function updateCounters(){
    if( counter >= X_SUBSCRIBERS ){
        xCounter.innerText = X_SUBSCRIBERS;
    }else{
        xCounter.innerText = counter;
    }

    if( counter >= YT_SUBSCRIBERS ){
        youtubeCounter.innerText = YT_SUBSCRIBERS;
    }else{
        youtubeCounter.innerText = counter;
    }

    if( counter >= FB_SUBSCRIBERS ){
        facebookCounter.innerText = FB_SUBSCRIBERS;
    }else{
        facebookCounter.innerText = counter;
    }

    if( counter > Math.max( X_SUBSCRIBERS, YT_SUBSCRIBERS, FB_SUBSCRIBERS ) ){
        clearInterval(currentInterval);
    }

    counter+=300;
}

currentInterval;
