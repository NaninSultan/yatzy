import { Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import logo from '../images/logo.png';

const AppHeader = () => {

    const [highScoremsg, setHighScoreMsg] = useState('Highscore: ');

    let highest = localStorage.getItem("highScore");

    useEffect(() => {
        if (highest === null) {
            setHighScoreMsg('');
        }
    }, [highest]) 

    console.log(highest)

    return (
        <header>
            <div className='leftTop'>
                <img src={logo} alt='Logo' width="50px" height="50px" />
            </div>
            <div className='leftTop'>
                <h1>YATZY</h1>
            </div>
            <div className="rightTop">
                <Typography variant="h4">{highScoremsg}{highest}</Typography>
            </div>
        </header>
    )

}

export default AppHeader;