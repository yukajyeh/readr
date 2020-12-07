import React from 'react';
import './button.css';

const Button = ({ children, type = 'default', onClick, disabled = false}) => {

    const classTypes = {
        primary: 'primary',
        secondary: 'secondary',
        default: 'default'
    }

    const classnames = `btn btn--${classTypes[type]}`;

    return(
        <button onClick={onClick} className={classnames} disabled={disabled}>
            {children}
        </button>
    )
};

export default Button;