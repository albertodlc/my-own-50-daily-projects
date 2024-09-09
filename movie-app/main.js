class MoviePoster extends HTMLElement{
    _style= `
        <style>
            .card {
                display: flex;
                flex-direction:column;

                width: 300px;
                height: 550px;

                overflow: hidden;

                position: relative;
            }

            .card img {
                width: 100%;
                height: 100%;
            }

            .card .description {
                height: 150px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;

                background-color: #373b69;
                align-items: center;

                padding: 10px;
            }

            .card .vote {
                background-color: #22254b;
                color: orange;
                padding: 7px;
            }

            .card .title {
                color: #fff;
                padding: 7px;
                font-size: 22px;
            }

            .card .overview {

            }

            .card:hover .overview {
                
            }
        </style>
    `;

    constructor(){
        super();
		this.attachShadow({ mode: 'open' });

        this._voteAverage = this.getAttribute("vote-average") || "";
        this._originalTitle = this.getAttribute("orig-title") || "";
        this._overview = this.getAttribute("overview") || "";
        this._posterPath = this.getAttribute("poster") ? 
            `https://image.tmdb.org/t/p/w1280/${this.getAttribute("poster")}.jpg` : 
            "";
    }

    connectedCallback(){
        this.render();
    }

    render(){
        this.shadowRoot.innerHTML = `
            ${this._style}
            <div class="card">
                <div>
                    <img class="" src="${this._posterPath}"></img>
                </div>
                <div class="description">
                    <div class="title"><b>${this._originalTitle}</b></div>
                    <div class="vote"><b>${this._voteAverage}</b></div>
                </div>
                <div class="overview">${this._overview}</div>
            </div>
        `;
    }
}


async function readFile(){
    let urlBase = window.location.href;

    return await fetch(urlBase + "movie.json")
    .then(res => {
        if( !res.ok ){
            throw new Error("HTTP error: " + res.statusText);
        }

        return res.json();
    });
}


async function loadMovies(){
    let movies = await readFile();
    for( const movie of movies.results ){
        document.getElementById("movies").innerHTML += `
            <movie-poster 
                vote-average="${movie?.vote_average}"
                orig-title="${movie?.original_title}"
                overview="${movie?.overview}"
                poster="${movie?.poster_path}"
                ></movie-poster>`;
    }
}

function defineComponents(){
    if( !customElements.get("movie-poster") ){
        customElements.define("movie-poster", MoviePoster);
    }
}

loadMovies();