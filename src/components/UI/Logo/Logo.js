import React from 'react';

import starLogo from '../../../assets/starwars_header.jpg';

import classes from './Logo.css';

const logo = () => (
    <div className={classes.Logo}>
        <img src={starLogo} alt="Starwars" />
    </div>
);

export default logo;