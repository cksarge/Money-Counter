const moneyDisplay = document.getElementById("money");
const stopwatchDisplay = document.getElementById("stopwatch");
const rateInput = document.getElementById("rate");
const decimalsInput = document.getElementById("decimals");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");
const startingMoneyInput = document.getElementById("startingMoney");

let elapsedMs = 0;
let startTimestamp = 0;
let timerInterval = null;

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return [hours, minutes, seconds]
        .map(unit => String(unit).padStart(2, "0"))
        .join(":");
}

function updateDisplay() {
    const currentElapsed = timerInterval
        ? elapsedMs + (Date.now() - startTimestamp)
        : elapsedMs;
    
    stopwatchDisplay.textContent = formatTime(currentElapsed);

    const hoursWorked = currentElapsed / 1000 / 60 / 60;
    const rate = parseFloat(rateInput.value) || 0;
    const decimals = parseInt(decimalsInput.value) || 0;
    const startingMoney = parseFloat(startingMoneyInput.value) || 0;
    const money = hoursWorked * rate + startingMoney;

    moneyDisplay.textContent = "$" + money.toFixed(decimals);
}

startBtn.addEventListener("click", () => {
    if (timerInterval) return;
    startTimestamp = Date.now();
    timerInterval = setInterval(updateDisplay, 100);
});

stopBtn.addEventListener("click", () => {
    if (!timerInterval) return;
    elapsedMs += Date.now() - startTimestamp;
    clearInterval(timerInterval);
    timerInterval = null;
    updateDisplay();
});

resetBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    timerInterval = null;
    elapsedMs = 0;
    updateDisplay();
});

decimalsInput.addEventListener("input", () => {
    const value = parseInt(decimalsInput.value);
    if (isNaN(value)) return;
    if (value > 10) decimalsInput.value = 10;
    if (value < 0) decimalsInput.value = 0;
});