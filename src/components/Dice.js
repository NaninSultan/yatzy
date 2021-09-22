import React from "react";
import Die from './Die';

const Dice = ({ dice, handleClick, locked, disabled, rolling }) => {

    return (
        <div style={{justifyContent: "space-between", display: "flex", margin: "1em"}}>
            {dice.map((d, idx) => (
                <Die 
                    handleClick={handleClick}
                    val={d}
                    locked={locked[idx]}
                    idx={idx}
                    key={idx}
                    disabled={disabled}
                    rolling={rolling && !locked[idx]}
                />
            ))}
        </div>
    );
}

export default Dice;