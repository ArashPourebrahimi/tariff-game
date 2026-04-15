let partner = null;
let round = 1;
let score = 0;
let studentHistory = [];
let partnerHistory = [];

function goToPartnerSelection() {
    document.getElementById("welcome-screen").classList.add("hidden");
    document.getElementById("partner-screen").classList.remove("hidden");
}

function selectPartner(p) {
    partner = p;
    document.getElementById("partner-screen").classList.add("hidden");
    document.getElementById("game-screen").classList.remove("hidden");

    let displayName = "";
    if (p === "stochastic") displayName = "Stochastic";
    if (p === "cooperative") displayName = "Cooperative";
    if (p === "winner") displayName = "Dr. Winner";

    document.getElementById("partner-name").innerText = "Partner: " + displayName;
    updateRoundInfo();
}

function updateRoundInfo() {
    if (round <= 10) {
        document.getElementById("round-info").innerText = "Round " + round + " of 10";
    } else {
        document.getElementById("round-info").innerText = "All 10 rounds completed";
    }
}

function getPartnerMove() {
    if (partner === "stochastic") {
        return Math.random() < 0.5 ? "Low" : "High";
    }

    if (partner === "cooperative") {
        if (round === 1) return "Low";
        return studentHistory[studentHistory.length - 1];
    }

    if (partner === "winner") {
        return "High";
    }
}

function getPayoff(studentMove, partnerMove) {
    if (studentMove === "Low" && partnerMove === "Low") return 8;
    if (studentMove === "Low" && partnerMove === "High") return 0;
    if (studentMove === "High" && partnerMove === "Low") return 10;
    if (studentMove === "High" && partnerMove === "High") return 4;
}

function playRound(studentMove) {
    if (round > 10) return;

    let partnerMove = getPartnerMove();
    let payoff = getPayoff(studentMove, partnerMove);

    score += payoff;

    studentHistory.push(studentMove);
    partnerHistory.push(partnerMove);

    document.getElementById("score").innerText = score;

    document.getElementById("result").innerHTML =
        "You: " + studentMove + " | Partner: " + partnerMove + " | Your payoff: " + payoff;

    let table = document.getElementById("history-table");
    let row = table.insertRow();
    row.insertCell(0).innerText = round;
    row.insertCell(1).innerText = studentMove;
    row.insertCell(2).innerText = partnerMove;
    row.insertCell(3).innerText = payoff;
    row.insertCell(4).innerText = score;

    round++;

    if (round > 10) {
        document.getElementById("action-buttons").classList.add("hidden");
        document.getElementById("final-review").classList.remove("hidden");
        updateRoundInfo();
    } else {
        updateRoundInfo();
    }
}

function showFinalScreen() {
    document.getElementById("game-screen").classList.add("hidden");
    document.getElementById("final-screen").classList.remove("hidden");
    document.getElementById("final-score").innerText = score;
}

function restart() {
    location.reload();
}