let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#Reset");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnO = true;

const WinPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const resetGame = () => {
  turnO = true; 
  msgContainer.classList.add("hide"); 
  enableBoxes(); 
};

const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = ""; 
    box.classList.remove("disabled"); 
  });
};

// Disable all boxes
const disableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = true; // Disable the box
    box.classList.add("disabled"); // Optional: Add a class for visual indication
  });
};


const showWinner = (winner) => {
  msg.innerText = `CONGRATULATIONS, WINNER IS ${winner}`;
  msgContainer.classList.remove("hide"); 
  disableBoxes(); 
};

const checkWinner = () => {
  let hasWinner = false; 

  for (let pattern of WinPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
      showWinner(pos1Val); 
      hasWinner = true; 
      break; 
    }
  }

  
  if (!hasWinner) {
    const isDraw = [...boxes].every((box) => box.innerText !== "");
    if (isDraw) {
      msg.innerText = `It's a Draw!`;
      msgContainer.classList.remove("hide");
      disableBoxes();
    }
  }
};

const initializeGame = () => {
  boxes.forEach((box) => {
    box.innerText = ""; 
    box.disabled = false; 
    box.addEventListener("click", () => {
      if (box.disabled) return; 
      if (turnO) {
        box.innerText = "O";
        turnO = false;
      } else {
        box.innerText = "X";
        turnO = true;
      }
      box.disabled = true; 
      checkWinner(); 
    });
  });
};
initializeGame();
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
