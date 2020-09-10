import React from 'react';

export default function CustomIcon(props) {
    return (
        <i>
            <img
                class="ld-ui-div-icon"
                src={props.src}
                className={'simple-icon'}
            ></img>
            <p className={'icon-description'}>{props.message}</p>
            <br />
        </i>
    );
}
