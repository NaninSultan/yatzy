import { Typography } from "@material-ui/core";
import React from "react";


const RuleRow = ({ doScore, name, score, description }) => {
    const disabled = score !== undefined;

    return (
        <tr className={`RuleRow RuleRow-${disabled ? 'disabled' : 'active'}`} onClick={disabled ? null : doScore}>
            <td className="RuleRow-name"><Typography variant="h5">{name}</Typography></td>
            <td className="RuleRow-score"><Typography variant="h5">{disabled ? score : description}</Typography></td>
        </tr>
    )
}

export default RuleRow;