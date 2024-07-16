const base_url = "https://api.currencyapi.com/v3/latest?apikey=cur_live_F8DjkBJrhzeCdLJPgG94y1DsUX6XfoPvkewYgpMK";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Populate the dropdowns with currency options
for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

// Update the flag image based on selected currency
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault(); // Fixing the preventDefault call
    let amount = document.querySelector(".amount input");
    let amtValue = amount.value;
    console.log(amtValue);
    if (amtValue === "" || amtValue < 1) {
        amtValue = 1;
        amount.value = "1";
    }

    // Construct the correct API URL
    const URL = `${base_url}&currencies=${toCurr.value}&base_currency=${fromCurr.value}`;
    let response = await fetch(URL);
    let data = await response.json();
    
    // Adjust based on actual API response structure
    let rate = data.data[toCurr.value].value;
    let finalAmount = amtValue * rate;
    msg.innerText = `${amtValue} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
});

