// ()
// console.log('app.js connected')

const searchAllData = () => {
    toggleSpinner(true); // loading spinner add
    // console.log('kaj kore');
    const inputString = document.getElementById('searchValue');
    const inputValue = inputString.value;
    // console.log(inputValue);
    const URL = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${inputValue}`;
    // console.log(URL);
    
    fetch(URL)
    .then(response => response.json())
    .then(data => showPlayerData(data.player));
}

const showPlayerData = (players) => {
    // console.log(players.length);
    
    document.getElementById("searchValue").value = "";

    const container = document.getElementById('player-info');
    container.innerHTML = "";
    // noDataFound();
    noDataFound(players);
    const sId = document.getElementById("s");
    if(players.length === 1){
        sId.classList.add('hidden');
    } else {
        sId.classList.remove('hidden');
    }
    players.forEach(player => {
        const playersCount = document.getElementById("players-count");
        const playerTotal = players.length;
        playersCount.innerText = playerTotal;
        // console.log(player);

        const {strThumb,strPlayer,strNationality,idPlayer} = player; // destructuring
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="card w-96 bg-base-100 shadow-2xl">
                <figure class="px-10 pt-10">
                <img src="${strThumb ? strThumb : 'images/no-photo.jpg'}" alt="player image" class="rounded-xl" />
                </figure>
    
                <div class="card-body items-center text-center">
    
                <h2 class="card-title">${strPlayer}</h2>
    
                <p>Nationality: ${strNationality}</p>
    
                <div class="card-actions">
                    <button onclick="singlePlayer('${idPlayer}')" class="btn btn-primary">Details</button>
                </div>
    
                </div>
            </div>
        `;
        container.appendChild(div);
    });
    toggleSpinner(false);
}

const singlePlayer = (id) => {
    // console.log(id);
    const URL = `https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`;
    fetch(URL)
        .then(response => response.json())
        .then(data => showSinglePlayer(data.players[0]));
}

const showSinglePlayer = (data) => {
    console.log(data);
    const container = document.getElementById('singlePlayerDetails');
    container.innerHTML = "";
    const {strThumb,strPlayer,strNationality,strPosition} = data;
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="card card-side bg-base-100 shadow-2xl">
            <figure>
            <img class="w-80" src="${strThumb ? strThumb : 'images/no-photo.jpg'}" alt="Player Image"/>
            </figure>
            <div class="card-body">
            <h2 class="card-title">${strPlayer}</h2>
            <p class="grow-0">Nationality: ${strNationality}</p>
            <p class="grow-0">Position: ${strPosition}</p>
            </div>
        </div>
    `;
    container.appendChild(div);
}

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('hidden');
        loaderSection.classList.add('flex');
    } else {
        loaderSection.classList.remove('flex');
        loaderSection.classList.add('hidden');
    }
}

const noDataFound = players => {
    const noData = document.getElementById("no-data-found");
    // console.log(players)
        if(players === null){
            noData.classList.remove('hidden');
            noData.classList.add('flex');
            toggleSpinner(false);
            const playersCount = document.getElementById("players-count");
            playersCount.innerText = 0;
        } else {
            noData.classList.add('hidden');
        }
}

