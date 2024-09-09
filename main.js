class ProjectCard extends HTMLElement{
    _style = `
        <style>
            .css-logo-color {
                background-color:  #264de4;
            }

            .js-logo-color {
                background-color: #F0DB4F;
            }

            .html-logo-color {
                background-color: #F16529;
            }

            .card {
                padding: 17px;
                display: flex;
                flex-direction: column;

                width: 300px;
                height: 300px;

                align-items: center;
                gap: 7px;

                text-decoration: none;
                background-color: #fff;

                box-shadow: #9D958F 0px 8px 24px;

                overflow: hidden;
                transition: transform 0.3s ease-in-out;
            }

            .card .website-detail{
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            .card .tags {   
                display: flex;
                gap: 7px;

                flex-wrap: wrap;
                height: 0;
                overflow: hidden;
                transition: height 0.3s ease-in-out;
            }

            .tag {
                font-size: 12px;
                border: 4px black;
                border-radius: 7px;

                padding: 7px;

                color: #fff;
            }

            .card:hover .tags {
                height: 30px;
            }

            .card .img-wrapper{
                width: 100%;
                height: 100%;
            }

            .card img {
                width: 100%;
                height: 100%; 
                object-fit: cover;                
            }

            .card .website-title {    
                font-size: 20px;
                font-weight: 400;
            }

            .card .description {    
                font-size: 14px;
                color: gray;
            }
        </style>`;

    constructor(){
        super();
        this.attachShadow({ mode: "open" });
        this._href = this.getAttribute("href") || "";
        this._imgRef = this.getAttribute("img-ref") || "";
        this._imgAlt = this.getAttribute("img-alt") || "";
        this._cardTitle = this.getAttribute("card-title") || "";
        this._cardDescr = this.getAttribute("card-descr") || "";
        this._tags = this.getAttribute("tags") ? this.getAttribute("tags").split(",") : [];
    }

    connectedCallback(){
        this.render();
    }

    render(){
        const tags = [];
        for(const tag of this._tags){
            let color = ``;
            if( tag === "HTML5"){
                color = "html-logo-color";
            } else if(tag === "CSS3"){
                color = "css-logo-color";
            } else if(tag === "JavaScript") {
                color = "js-logo-color";
            }

            tags.push(`<span class="tag ${color}">${tag}</span>`);
        }

        this.shadowRoot.innerHTML = `
            ${this._style}
            <a href="${this._href}" target="_blank" class="card">
                <div class="img-wrapper">
                    <img src="${this._imgRef}" alt="${this._imgAlt}">
                </div>
                <div class="website-detail">
                    <span class="website-title">${this._cardTitle}</span>
                    <p class="description">${this._cardTitle}</p>
                    <span class="website-tags-section">
                        <div class="tags">
                            ${tags.join("")}
                        </div>
                    </span>
                </div>
            </a>
        `;

    }
}

function defineComponents(){
    if( !customElements.get("project-card") ){
        customElements.define("project-card", ProjectCard)
    }
}
