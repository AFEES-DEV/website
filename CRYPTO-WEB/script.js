// 🌍 Fetch top coin prices
function loadPrices() {
    fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin&vs_currencies=usd")
        .then(res => res.json())
        .then(data => {
            document.getElementById("btc").innerText = "$" + data.bitcoin.usd;
            document.getElementById("eth").innerText = "$" + data.ethereum.usd;
            document.getElementById("bnb").innerText = "$" + data.binancecoin.usd;
        });
}
loadPrices();
setInterval(loadPrices, 10000);


// 🔎 Search any coin
function searchCoin() {
    let coin = document.getElementById("searchCoin").value.toLowerCase();
    if (coin === "") return alert("Enter a coin name");

    fetch ("https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd")
        .then(res => res.json())
        .then(data => {
            if (!data[coin]) {
                alert("Coin not found!");
                return;
            }
            alert ("${coin.toUpperCase()} Price: $${data[coin].usd}");
        });
}


// 💱 Convert USD → Crypto
function convertCoin() {
    let usd = document.getElementById("usd").value;
    let coin = document.getElementById("coinSelect").value;

    if (usd === "") return alert("Enter an amount");

    fetch("https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd")
        .then(res => res.json())
        .then(data => {
            let price = data[coin].usd;
            let result = usd / price;
            document.getElementById("result").innerText =
                ${usd} USD = ${"result.toFixed(6)} ${coin.toUpperCase()"};
        });
}


// 🌗 Dark / Light Mode
document.getElementById("toggleMode").onclick = () => {
    document.body.classList.toggle("light");
};


// 📈 Bitcoin Chart
fetch("https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7")
    .then(res => res.json())
    .then(data => {
        let prices = data.prices.map(p => p[1]);

        new Chart(document.getElementById("chart"), {
            type: "line",
            data: {
                labels: ["Day1", "Day2", "Day3", "Day4", "Day5", "Day6", "Today"],
                datasets: [{
                    data: prices,
                    borderWidth: 2
                }]
            }
        });
});