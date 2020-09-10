import React from 'react';

export default function CustomIcon(props) {
    return (
        <i>
            <img class="ld-ui-div-icon" src={props.src}></img>
            {props.message}
            <br />
        </i>
    );
}
