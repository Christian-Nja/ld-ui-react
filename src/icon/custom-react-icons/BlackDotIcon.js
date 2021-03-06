import React from 'react';

import CustomIcon from '../components/CustomIcon';

import svg from '../uri-encoded-icons/black-circle.svg.uri';

export default function BlackDotIcon(props) {
    return (
        <CustomIcon
            src={svg}
            message={props.message}
            iconClassName={props.iconClassName}
            descriptionClassName={props.descriptionClassName}
        ></CustomIcon>
    );
}
