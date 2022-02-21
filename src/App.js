import { useState } from "react";
import { useEffect } from "react";
import background from "./Images/background.jfif";
import LineLeftRed from "./Images/line-left-red.png";
import LineUpRed from "./Images/line-up-red.png";
import LineLeftYellow from "./Images/line-left-yellow.png";
import LineUpYellow from "./Images/line-up-yellow.png";
import LineLeftBlue from "./Images/line-left-blue.png";
import LineUpBlue from "./Images/line-up-blue.png";
import LineLeftGreen from "./Images/line-left-green.png";
import LineUpGreen from "./Images/line-up-green.png";
import LineLeftOrange from "./Images/line-left-orange.png";
import LineUpOrange from "./Images/line-up-orange.png";
import LineLeftPurple from "./Images/line-left-purple.png";
import LineUpPurple from "./Images/line-up-purple.png";
import ScoreBoard from "./ScoreBoard/ScoreBoard";
import BlueCandy from "./Images/blue-candy.png";
import GreenCandy from "./Images/green-candy.png";
import OrangeCandy from "./Images/orange-candy.png";
import PurpleCandy from "./Images/purple-candy.png";
import RedCandy from "./Images/red-candy.png";
import YellowCandy from "./Images/yellow-candy.png";
import Blank from "./Images/blank.png";
import classes from "./App.module.css";
const candyColors = [
  BlueCandy,
  GreenCandy,
  PurpleCandy,
  OrangeCandy,
  RedCandy,
  YellowCandy,
];
const LineLeft=[
  LineLeftBlue,
  LineLeftGreen,
  LineLeftPurple,
  LineLeftOrange,
  LineLeftRed,
  LineLeftYellow
]
const LineUp=[
  LineUpBlue,
  LineUpGreen,
  LineUpPurple,
  LineUpOrange,
  LineUpRed,
  LineUpYellow
]
function App() {
  const width = 8;
  const [currentColorArangement, setCurrentColorArangement] = useState([]);
  const [squareBeingDragged, setSquareBeingDragged] = useState(null);
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null);
  const [scoreDisplay, setScoreDiplay] = useState(0);
 
  const checkForColumnOfFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = currentColorArangement[i];
      const isBlank = currentColorArangement[i] == Blank;
      if (
        columnOfFour.every(
          (square) =>
            currentColorArangement[square] === decidedColor && !isBlank
        )
      ) {
        let special
        if(decidedColor.includes(BlueCandy)){special=LineUpBlue}
        else if(decidedColor.includes(RedCandy)){special=LineUpRed}
        else if(decidedColor.includes(YellowCandy)){special=LineUpYellow}
        else if(decidedColor.includes(OrangeCandy)){special=LineUpOrange}
        else if(decidedColor.includes(PurpleCandy)){special=LineUpPurple}
        else if(decidedColor.includes(GreenCandy)){special=LineUpGreen}
        setScoreDiplay((score) => score + 4);
        columnOfFour.forEach((square, id) => {
          id != 1 && (currentColorArangement[square] = Blank);
        });
        columnOfFour.forEach((square, id) => {
          id == 1 && (currentColorArangement[square] = special);
        });
        return true;
      }
    }
  };
  const checkForColumnOfThree = () => {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedColor = currentColorArangement[i];
      const isBlank = currentColorArangement[i] == Blank;
      if (
        columnOfThree.every(
          (square) =>
            currentColorArangement[square] === decidedColor && !isBlank
        )
      ) {
        setScoreDiplay((score) => score + 4);

        columnOfThree.forEach(
          (square) => (currentColorArangement[square] = Blank)
        );
        return true;
      }
    }
  };
  const checkForRowOfThree = () => {
    for (let i = 0; i <= 64; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decidedColor = currentColorArangement[i];
      const isBlank = currentColorArangement[i] == Blank;
      const notValid = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
      ];
      if (notValid.includes(i)) continue;
      if (
        rowOfThree.every(
          (square) =>
            currentColorArangement[square] === decidedColor && !isBlank
        )
      ) {
        setScoreDiplay((score) => score + 3);
        rowOfThree.forEach(
          (square) => (currentColorArangement[square] = Blank)
        );
        return true;
      }
    }
  };
 

  const checkForRowOfFour = () => {
    for (let i = 0; i <= 62; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3];
      const decidedColor = currentColorArangement[i];
      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55, 62, 63, 64,
      ];
      const isBlank = currentColorArangement[i] == Blank;
      if (notValid.includes(i)) continue;
      if (
        rowOfFour.every(
          (square) =>
            currentColorArangement[square] === decidedColor && !isBlank
        )
      ) {
        let special
        if(decidedColor.includes(BlueCandy)){special=LineLeftBlue}
        else if(decidedColor.includes(RedCandy)){special=LineLeftRed}
        else if(decidedColor.includes(YellowCandy)){special=LineLeftYellow}
        else if(decidedColor.includes(OrangeCandy)){special=LineLeftOrange}
        else if(decidedColor.includes(PurpleCandy)){special=LineLeftPurple}
        else if(decidedColor.includes(GreenCandy)){special=LineLeftGreen}
        setScoreDiplay((score) => score + 4);
        rowOfFour.forEach((square, id) => {
          id != 1 && (currentColorArangement[square] = Blank);
        });
        rowOfFour.forEach((square, id) => {
          id == 1 && (currentColorArangement[square] = special);
        });
        return true;
      }
    }
  };
  const dragStart = (e) => {
    setSquareBeingDragged(e.target);
   
  };
  const dragDrop = (e) => {
    setSquareBeingReplaced(e.target);
  };
  const dragEnd = (e) => {
    const squareBeingDraggedId = parseInt(
      squareBeingDragged.getAttribute("data-id")
    );
    const squareBeingReplaceId = parseInt(
      squareBeingReplaced.getAttribute("data-id")
    );
    currentColorArangement[squareBeingReplaceId] =
      squareBeingDragged.getAttribute("src");
    currentColorArangement[squareBeingDraggedId] =
      squareBeingReplaced.getAttribute("src");

    const validMoves = [
      squareBeingDraggedId - 1,
      squareBeingDraggedId - width,
      squareBeingDraggedId + 1,
      squareBeingDraggedId + width,
    ];
    const validMove = validMoves.includes(squareBeingReplaceId);
    const isAColumnFour = checkForColumnOfFour();
    const isARowFour = checkForRowOfFour();
    const isAColumnThree = checkForColumnOfThree();
    const isARowThree = checkForRowOfThree();
    let special,special1
    if(squareBeingDragged.src.includes(LineUpBlue)){special1=true}
    else if(squareBeingDragged.src.includes(LineUpRed)){special1=true}
    else if(squareBeingDragged.src.includes(LineUpYellow)){special1=true}
    else if(squareBeingDragged.src.includes(LineUpOrange)){special1=true}
    else if(squareBeingDragged.src.includes(LineUpPurple)){special1=true}
    else if(squareBeingDragged.src.includes(LineUpGreen)){special1=true}
     if(squareBeingDragged.src.includes(LineLeftBlue)){special=true}
    else if(squareBeingDragged.src.includes(LineLeftRed)){special=true}
    else if(squareBeingDragged.src.includes(LineLeftYellow)){special=true}
    else if(squareBeingDragged.src.includes(LineLeftOrange)){special=true}
    else if(squareBeingDragged.src.includes(LineLeftPurple)){special=true}
    else if(squareBeingDragged.src.includes(LineLeftGreen)){special=true}
    if (special1 && validMove) {

let dummy=squareBeingReplaceId
while(dummy>=7){
  dummy=dummy-8;
}
for(let i=dummy;i<=64;i+=8){
  currentColorArangement[i] = Blank

}
setScoreDiplay(score=>score+8)
      setSquareBeingDragged(null);
      setSquareBeingReplaced(null);
    }
  else  if (special && validMove) {

      let dummy=squareBeingReplaceId
      while(dummy%8!=0){
        dummy=dummy-1;
      }
      for(let i=dummy;i<=dummy+7;i++){
        currentColorArangement[i] = Blank
      }
      setScoreDiplay(score=>score+8)
            setSquareBeingDragged(null);
            setSquareBeingReplaced(null);
          }
   else if (
      squareBeingReplaceId &&
      validMove &&
      (isARowFour || isARowThree || isAColumnThree || isAColumnFour)
      ) {
      setSquareBeingDragged(null);
      setSquareBeingReplaced(null);
    } else {
      currentColorArangement[squareBeingReplaceId] =
        squareBeingReplaced.getAttribute("src");
      currentColorArangement[squareBeingDraggedId] =
        squareBeingDragged.getAttribute("src");
      setCurrentColorArangement([...currentColorArangement]);
    }
  };

  const CreateBoard = () => {
    const randomColorArrangement = [];
    for (let i = 0; i < width * width; i++) {
      const randomColor =
        candyColors[Math.floor(Math.random() * candyColors.length)];
      randomColorArrangement.push(randomColor);
    }
    setCurrentColorArangement(randomColorArrangement);
  };
  const moveIntoSquareBelow = () => {
    for (let i = 0; i < 64 - width; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i);

      if (isFirstRow && currentColorArangement[i] === Blank) {
        let RandomNumber = Math.floor(Math.random() * candyColors.length);
        currentColorArangement[i] = candyColors[RandomNumber];
      }
      if (currentColorArangement[i + width] === Blank) {
        currentColorArangement[i + width] = currentColorArangement[i];
        currentColorArangement[i] = Blank;
      }
    }
  };
  useEffect(() => {
    CreateBoard();
  }, []);
  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfFour();
      checkForRowOfFour();
      checkForColumnOfThree();
      checkForRowOfThree();
      moveIntoSquareBelow();
      setCurrentColorArangement([...currentColorArangement]);
    }, 100);
    return () => clearInterval(timer);
  }, [
    checkForColumnOfFour,
    checkForRowOfFour,
    checkForColumnOfThree,
    checkForRowOfThree,
    currentColorArangement,
    moveIntoSquareBelow,
  ]);

  return (
    <div className={classes.app}>
      <img src={background} className={classes.background} />
      <div className={classes.game}>
        {currentColorArangement.map((candyColor, index) => (
          <img
            key={index}
            alt={candyColor}
            src={candyColor}
            data-id={index}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
          />
        ))}
      </div>
      <ScoreBoard score={scoreDisplay} />
    </div>
  );
}

export default App;
