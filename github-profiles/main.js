class GithubSearchBar extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        this.render();
    }

    render(){
        let inputSTyle = `color:#fff; width:100%; height:50px; background-color: #4c2885; padding: 0px 10px 0px 10px;`;
        let fontStyle = `border: none; border-radius: 10px; outline: none; font-family: inherit; font-size: 1rem;`;

        this.innerHTML = `
            <div style="width:100%; box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05), 0 15px 40px rgba(0, 0, 0, 0.1)">
                <input type="text" name="profile-name" style="${inputSTyle}${fontStyle}" placeholder="Search a Github User"/>
            </div>
        `;
    }
}

class GithubSearchResult extends HTMLElement{
    constructor(){
        super();

        this._profileId = this.getAttribute("profile-id") || "";
    }

    connectedCallback(){
        this.render();
    }

    async render(){
        const data = await fetch(`https://api.github.com/users/${this._profileId}`)
        .then(res => {
            if( !res.ok ){
                throw new Error("Error");
            }

            return res.json();
        })

        const dataRepos = await fetch(data?.repos_url)
        .then(res => {
            if( !res.ok ){
                throw new Error("Error");
            }

            return res.json();
        });

        const repos = [];

        if( dataRepos.length >= 5 ){
            for(let i = 0; i < 5; i++ ){
                let currentRepo = dataRepos[i];

                repos.push(`<a href="${currentRepo?.html_url}" target="_blank" style="text-decoration: none; color: #fff;">
                        <span style="padding: 5px; display: flex; gap: 10px; background-color: #212a72; font-size: 0.7rem;">
                            ${currentRepo?.name}
                        </span>
                    </a>
                    `);
            }
        }

        this.innerHTML = /* html */`
            <div style="align-items: center; padding: 50px; display:flex; flex-direction: row; gap: 17px; box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05), 0 15px 40px rgba(0, 0, 0, 0.1); background-color: #4c2885; border: none; border-radius: 10px;">
                <div>
                    <img src="${data?.avatar_url}" alt="User Avatar" width="150" height="150" style="border-radius: 50%; border: 10px solid #212a72;">
                </div>
                <div style="display:flex; flex-direction: column; gap: 17px;">
                    <h2>${data?.name}</h2>
                    <div>
                        <div>${data.bio ? data.bio : "N/A"}</div>
                    </div>
                    <div style="display: flex; flex-direction: row; justify-content: space-between; gap: 10px;">
                        <span style="display: flex; gap: 10px">${data?.followers} <b>Followers</b></span>
                        <span style="display: flex; gap: 10px">${data?.following} <b>Following</b></span>
                        <span style="display: flex; gap: 10px">${data?.public_repos} <b>Repos</b></span>
                    </div>
                    <div style="display: flex; flex-direction: row; justify-content: space-between; flex-wrap: wrap; gap: 7px;">
                        ${repos.join("")}
                    </div>
                </div>
            </div>
        `;
    }

}

function launchSearch(){
    const formData = Object.fromEntries(
		new FormData(document.getElementById("form-data"))
	);

    document.getElementById("result").innerHTML = `<github-search-result profile-id="${formData["profile-name"]}"></github-search-result>`

    return false;
}

function defineComponents(){
    if( !customElements.get("github-search-bar") ){
        customElements.define("github-search-bar", GithubSearchBar);
    }

    if( !customElements.get("github-search-result") ){
        customElements.define("github-search-result", GithubSearchResult);
    }
}