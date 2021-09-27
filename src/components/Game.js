import { Button, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Dice from './Dice';
import ScoreTable from './ScoreTable';


const DICE_NUM = 5;
const ROLL_NUM = 3;
var counter = 0;

const Game = () => {

    const [gameState, setGameState] = useState({
        dice: Array.from({ length: DICE_NUM }),
        locked: Array(DICE_NUM).fill(false),
        rollsLeft: ROLL_NUM,
        rolling: false,
        scores: {
            ones: undefined,
            twos: undefined,
            threes: undefined,
            fours: undefined,
            fives: undefined,
            sixes: undefined,
            threeOfAKind: undefined,
            fourOfAKind: undefined,
            fullHouse: undefined,
            smallStraight: undefined,
            largeStraight: undefined,
            yahtzee: undefined,
            chance: undefined
        }
    })


    const roll = (e) => {
        setGameState(gs => ({
            ...gameState,
            dice: gs.dice.map((d, i) =>
            gs.locked[i] ? d : Math.ceil(Math.random() * 6)
            ),
            locked: gs.rollsLeft > 1 ? gs.locked: Array(DICE_NUM).fill(true),
            rollsLeft: gs.rollsLeft > 0 ? gs.rollsLeft - 1 : 0,
            rolling: false
        }));
    }

    
    useEffect(() => {
        animateRoll();
        // eslint-disable-next-line
    }, [gameState.scores])

    const animateRoll = () => {
        setGameState(() => ({
            ...gameState,
            rolling: true
        }));
        setTimeout(roll, 0);
    }

    const toggleLocked = (idx) => {
        if (gameState.rollsLeft > 0 && !gameState.rolling) {
            setGameState(gs => ({
                ...gameState,
                locked: [
                    ...gs.locked.slice(0, idx),
                    !gs.locked[idx],
                    ...gs.locked.slice(idx + 1)
                ]
            }));
        }
    }

    const doScore = (ruleName, ruleFn) => {
        setGameState(gs => ({
            ...gameState,
            scores: { ...gs.scores, [ruleName]: ruleFn(gameState.dice) },
            rollsLeft: ROLL_NUM,
            locked: Array(DICE_NUM).fill(false),
        }));
        counter++;
    }

    const displayRollInfo = () => {
           const messages = [
            '0 Rolls Left',
            '1 Roll Left',
            '2 Rolls Left',
            'Starting Round'
        ];
        return messages[gameState.rollsLeft]
    }

    const getTotalScore = () => {
        let totalScore = 0;
        for (let key in gameState.scores) {
            if (gameState.scores[key]) totalScore += gameState.scores[key]
        }
        return totalScore
    }

    const highScore = localStorage.getItem("highScore");

    if (counter === 13) {
        if (getTotalScore() > highScore) {
            localStorage.setItem("highScore", getTotalScore())
        }
        localStorage.setItem("totalScore", getTotalScore())

        
    }

    const playAgain = () => {
        window.location.reload();
    }


    return (
        <div style={{marginTop: "100px"}}>
        <div className="Game">
            <Grid className="header">
                <Dice
                    dice={gameState.dice}
                    locked={gameState.locked}
                    handleClick={toggleLocked}
                    disabled={gameState.rollsLeft === 0}
                    rolling={gameState.rolling}
                />
                {counter === 13 && <Button
                style={{marginBottom: "20px", marginTop: "10px", width:"620px"}}
                    variant="contained"
                    color="secondary"
                    disabled={
                        gameState.locked.every(x => x) ||
                        gameState.rollsLeft === 0 ||
                        gameState.rolling
                    }
                    onClick={playAgain}
                >
                    PLAY AGAIN
                </Button>}
                {counter < 13 && <Button
                style={{marginBottom: "20px", marginTop: "10px", width:"620px"}}
                    variant="contained"
                    color="primary"
                    disabled={
                        gameState.locked.every(x => x) ||
                        gameState.rollsLeft === 0 ||
                        gameState.rolling
                    }
                    onClick={animateRoll}
                >
                    {displayRollInfo()}
                </Button>}
            </Grid>
            <ScoreTable getTotalScore={getTotalScore} doScore={doScore} scores={gameState.scores} />
        </div>
        </div>
    )

}

export default Game;