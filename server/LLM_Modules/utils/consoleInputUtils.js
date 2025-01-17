const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function requestYesNo(question) {
  const answer = await askQuestion(`${question} (y/n): `);
  if (typeof answer == "string") {
    return answer.toLowerCase() === "y";
  } else {
    return false;
  }
}

async function requestNumber(question) {
  const answer = await askQuestion(`${question}: `);
  if (typeof answer == "string") {
    const number = parseFloat(answer);
    if (isNaN(number)) {
      console.log("Please enter a valid number.");
      return requestNumber(question);
    }
    return number;
  } else {
    return 0;
  }
}

async function requestString(question) {
  const answer = await askQuestion(`${question}: `);
  return answer.trim();
}

async function requestConfirm(question) {
  const answer = await askQuestion(`${question} (confirm): `);
  return answer.toLowerCase() === "confirm";
}

function closeInterface() {
  rl.close();
}

module.exports = {
  requestYesNo,
  requestNumber,
  requestString,
  requestConfirm,
  closeInterface,
};
