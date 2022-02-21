import React from 'react'
import classes from './ScoreBoard.module.css'
import background from '../Images/background.png'
export default function ScoreBoard({score}) {
  return (
    <div className={classes.board}>
      <img src={background}/>
    <div className={classes.score_board}>
      <h2>Score:</h2>
      <h2>{score}</h2>
    </div>
    </div>
  )
}
