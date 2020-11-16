import React from 'react';

export default function SelectButton(props) {
    const style = {
        backgroundColor: 'black',
        border: '2px solid',
        borderColor: props.active ? 'red' : 'green',
        color: 'white',
        borderRadius: 7,
        padding: 8,
    };
    const label = props.active ? 'unselect' : 'select';
    return <div style={style}>{label}</div>;
}
