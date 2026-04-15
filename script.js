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

    let name = "";
    if (p === "stochastic") name = "Stochastic";
    if (p === "cooperative") name = "Cooperative";
    if (p === "winner") name = "Dr. Winner";

    document.getElementById("partner-name").innerText = "Partner: " + name;
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

    const partnerMove = getPartnerMove();
    const payoff = getPayoff(studentMove, partnerMove);

    score += payoff;

    studentHistory.push(studentMove);
    partnerHistory.push(partnerMove);

    document.getElementById("score").innerText = score;

    document.getElementById("result").innerHTML =
        "You chose: " + studentMove +
        " | Partner chose: " + partnerMove +
        " | Payoff: " + payoff;

    const table = document.getElementById("history-table");
    const row = table.insertRow();
    row.insertCell(0).innerText = round;
    row.insertCell(1).innerText = studentMove;
    row.insertCell(2).innerText = partnerMove;
    row.insertCell(3).innerText = payoff;
    row.insertCell(4).innerText = score;

    round++;

    if (round > 10) {
        finishGame();
    } else {
        updateRoundInfo();
    }
}

function finishGame() {
    document.getElementById("action-buttons").classList.add("hidden");
    document.getElementById("end-controls").classList.remove("hidden");
    document.getElementById("final-score-inline").innerText = score;
    updateRoundInfo();
}

function restart() {
    location.reload();
}