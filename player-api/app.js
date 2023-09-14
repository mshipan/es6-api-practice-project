// ()
// console.log('app.js connected')

const searchAllData = () => {
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
    // console.log(players);
    document.getElementById("searchValue").value = "";

    const container = document.getElementById('player-info');
    container.innerHTML = "";
    players.forEach(player => {
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