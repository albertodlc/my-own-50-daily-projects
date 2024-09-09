class ProjectCard extends HTMLElement{
    constructor(){
        super();
        this._href = this.getAttribute("href") || "";
        this._imgRef = this.getAttribute("img-ref") || "";
        this._imgAlt = this.getAttribute("img-alt") || "";
        this._cardTitle = this.getAttribute("card-title") || "";
        this._cardDescr = this.getAttribute("card-descr") || "";
        this._tags = this.getAttribute("tags") || [];
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

            tags.push(`<span class="tag ${color}">HTML5</span>`);
        }

        this.innerHTML = `
            <a href="${this._href}" target="_blank" class="website-wrapper">
                <img src="${this._imgRef}" alt="${this._imgAlt}">
                <div class="website-detail">
                    <span class="website-title">${this._cardTitle}</span>
                    <p class="description">${this._cardTitle}</p>
                    <span class="website-tags-section non-active-section">
                        <div class="tags">
                            <span class="tag html-logo-color">HTML5</span>
                            <span class="tag css-logo-color">CSS3</span>
                            <span class="tag js-logo-color">JavaScript</span>
                        </div>
                    </span>
                </div>
            </a>
        `;

        this._handleMouseHover();
    }

    _handleMouseHover(){
        this.addEventListener("mouseover", () => {
            const tags = this.getElementsByClassName('website-tags-section');
            tags[0].classList.remove('non-active-section');
        });

        this.addEventListener("mouseout", () => {
            const tags = this.getElementsByClassName('website-tags-section');
            tags[0].classList.add('non-active-section');
        });
    }
}

function defineComponents(){
    if( !customElements.get("project-card") ){
        customElements.define("project-card", ProjectCard)
    }
}
