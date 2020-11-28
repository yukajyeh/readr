import React from 'react';
import './button.css';

const Button = ({ children, type = 'default', onClick }) => {

    const classTypes = {
        primary: 'primary',
        secondary: 'secondary',
        default: 'default'
    }

    const classnames = `btn btn--${classTypes[type]}`;

    return(
        <button onClick={onClick} className={classnames}>
            {children}
        </button>
    )
};

export default Button;