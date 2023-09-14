const showBillionaireLimit = () => {
    const URL = 'https://forbes400.onrender.com/api/forbes400?limit=10';
    fetch(URL)
        .then(response => response.json())
        .then(data => showBillionaireLimitData(data));
}

const showBillionaireLimitData = (data) => {
    console.log(data);
    const container = document.getElementById('billionaire-table');
    data.forEach( billionaire => {
        console.log(typeof billionaire);
        const {personName, countryOfCitizenship, industries, rank, finalWorth} = billionaire;

        const tr = document.createElement('tr');
        tr.classList.add('block');
        tr.classList.add('md:table-row');
        tr.innerHTML = `
            <td class="p-2 text-left block md:table-cell">${personName}
                <!-- Modal Button -->
                <label onclick="singleBillionaire('${personName}')" for="my-modal-3" class="cursor-pointer">
                    <i class="fa-regular fa-eye"></i>
                </label>
            </td>

            <td class="p-2 text-left block md:table-cell">${countryOfCitizenship}</td>
            <td class="p-2 text-left block md:table-cell">${industries}</td>
            <td class="p-2 text-left block md:table-cell">${rank}</td>
            <td class="p-2 text-left block md:table-cell">$ <span>${finalWorth}</span></td>
        `;
        container.appendChild(tr);
        
    });
    // Calculate Total of Billionaire Wealth
    const totalData = document.getElementById('billionaireTotalWealth');
    let total = 0;
    data.forEach(billionaire => {
        total += billionaire.finalWorth;
        return total;
    })
    totalData.innerText = total;
}

const singleBillionaire = (name) => {
    // console.log(name);
    const URL = 'https://forbes400.onrender.com/api/forbes400?limit=10';
    fetch(URL)
        .then(response => response.json())
        .then(data => showSingleBillionaireData(data, name));
}

const showSingleBillionaireData = (data , name) => {
    // console.log(data, name);
    // console.log(birthDate);
    const modal = document.getElementById('modalContainer');
    modal.innerHTML = "";
    data.personName = name;
    const {bios, squareImage, source, countryOfCitizenship, city, gender, industries, rank, finalWorth, birthDate} = data;
    const div = document.createElement('div');
    div.classList.add('modal-box');
    div.classList.add('relative');
    div.innerHTML = `
            <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
            <div class="text-center">
                <h3 class="text-4xl font-bold font-inknut">${name}</h3>
                <h5 class="text-xl font-bold font-inknut">Biography</h5>
                <p class="py-4 font-inter text-justify">
                ${bios}
                </p>
            </div>
            <div class="flex gap-5">
                
                <figure>
                    <img class="w-52" src="${squareImage}" alt="">
                    <figcaption class="font-bold">Source: <span class="font-normal">${source}</span></figcaption>
                </figure>
                <div>
                    <h1 class="font-inknut text-xl mb-3">General Information</h1>
                    <hr class="border border-black mb-1">
                    <p class="font-bold">Citizenship: <span class="font-normal">${countryOfCitizenship}</span></p>
                    <p class="font-bold">State: <span class="font-normal">${city}</span></p>
                    <p class="font-bold">City: <span class="font-normal">${city}</span></p>
                    <p class="font-bold">Birthday: <span class="font-normal">${birthDate}</span></p>
                    <p class="font-bold">Gender: <span class="font-normal">${gender}</span></p>

                    <h1 class="font-inknut text-lg mb-3">Financial Information</h1>
                    <hr class="border border-black mb-1">
                    <p class="font-bold">Exchange: <span class="font-normal">NASDAQ</span></p>
                    <p class="font-bold">Ticker: <span class="font-normal">AMZN-US</span></p>
                    <p class="font-bold">Total Shares: <span class="font-normal">992634000</span></p>
                    <p class="font-bold">Share Price: <span class="font-normal">$99.7</span></p>
                </div>
            </div>
    `;
    modal.appendChild(div);
}

singleBillionaire();
