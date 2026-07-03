window.addEventListener("DOMContentLoaded", () => {
    
    let boxes = document.querySelectorAll(".box");
    let resetbtn = document.querySelector("#reset-btn");
    let drawScreen = document.querySelector("#draw-screen");
    let drawResetBtn = document.querySelector("#draw-reset-btn");
    let turnheart = true; 
    let clickCount = 0;

    const winpatterns = [
        [0,1,2], [0,3,6], [0,4,8],
        [1,4,7], [2,5,8], [2,4,6],
        [3,4,5], [6,7,8],
    ];

    for (let box of boxes) {
        box.addEventListener("click", () => {
            if (box.innerHTML.trim() === "") {
                clickCount++; 
                if (turnheart) {
                    box.innerHTML = `<img src="../assets/heart.png" alt="heart" style="width: 80%; height: 80%; object-fit: contain;">`;
                    box.setAttribute("data-sign", "heart"); 
                    turnheart = false;
                } else {
                    box.innerHTML = `<img src="../assets/sword.png" alt="sword" style="width: 80%; height: 80%; object-fit: contain;">`;
                    box.setAttribute("data-sign", "sword"); 
                    turnheart = true;
                }
                checkWinner();
            }
        });
    }

    const checkWinner = () => {
        let isWinnerFound = false;

        for (let pattern of winpatterns) {
            let pos1Val = boxes[pattern[0]].getAttribute("data-sign");
            let pos2Val = boxes[pattern[1]].getAttribute("data-sign");
            let pos3Val = boxes[pattern[2]].getAttribute("data-sign");

            if (pos1Val && pos2Val && pos3Val) {
                if (pos1Val === pos2Val && pos2Val === pos3Val) {
                    isWinnerFound = true;
                    if (pos1Val === "heart") {
                        window.location.href = "../pages/winner.html";
                    } else if (pos1Val === "sword") {
                        window.location.href = "../pages/loser.html";
                    }
                    return;    
                }
            }
        }

        if (clickCount === 9 && !isWinnerFound) { 
            drawScreen.style.setProperty("display", "flex", "important"); 
        }
    } 

    resetbtn.addEventListener("click", () => {
        turnheart = true;
        clickCount = 0; 
        drawScreen.style.setProperty("display", "none", "important");
        for (let box of boxes){
            box.innerHTML = "";
            box.removeAttribute("data-sign");
        }
    });

    drawResetBtn.addEventListener("click", ()=> {
        turnheart = true ;
        clickCount = 0; 
        drawScreen.style.setProperty("display", "none", "important");
        for(let box of boxes) {
            box.innerHTML= "";
            box.removeAttribute("data-sign");
        }
    });
});


