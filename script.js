let partner = null;
let round = 1;
let studentScore = 0;
let partnerScore = 0;
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

function getPayoffs(studentMove, partnerMove) {
    if (studentMove === "Low" && partnerMove === "Low") {
        return { student: 8, partner: 8 };
    }
    if (studentMove === "Low" && partnerMove === "High") {
        return { student: 0, partner: 10 };
    }
    if (studentMove === "High" && partnerMove === "Low") {
        return { student: 10, partner: 0 };
    }
    if (studentMove === "High" && partnerMove === "High") {
        return { student: 4, partner: 4 };
    }
}

function playRound(studentMove) {
    if (round > 10) return;

    const partnerMove = getPartnerMove();
    const payoffs = getPayoffs(studentMove, partnerMove);

    studentScore += payoffs.student;
    partnerScore += payoffs.partner;

    studentHistory.push(studentMove);
    partnerHistory.push(partnerMove);

    document.getElementById("student-score").innerText = studentScore;
    document.getElementById("partner-score").innerText = partnerScore;

    document.getElementById("result").innerHTML =
        "You chose: " + studentMove +
        " | Partner chose: " + partnerMove +
        " | Your payoff: " + payoffs.student +
        " | Partner payoff: " + payoffs.partner;

    const table = document.getElementById("history-table");
    const row = table.insertRow();
    row.insertCell(0).innerText = round;
    row.insertCell(1).innerText = studentMove;
    row.insertCell(2).innerText = partnerMove;
    row.insertCell(3).innerText = payoffs.student;
    row.insertCell(4).innerText = payoffs.partner;
    row.insertCell(5).innerText = studentScore;
    row.insertCell(6).innerText = partnerScore;

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
    document.getElementById("final-student-score").innerText = studentScore;
    document.getElementById("final-partner-score").innerText = partnerScore;
    updateRoundInfo();
}

function restart() {
    location.reload();
}