import React from 'react';
import { Tooltip } from 'react-leaflet';

import { MuseumIcon, TimeIcon, LocationIcon } from '../../icon/ld-ui-icon';

export default function ClickableTooltip(props) {
    return (
        <Tooltip opacity={1} interactive={true} className={'clickable-tooltip'}>
            <MuseumIcon
                message={`${props.siteLabel} (${props.city})`}
            ></MuseumIcon>
            <TimeIcon message={props.timeInterval}></TimeIcon>
        </Tooltip>
    );
}

/*
 * NOTE: you may change this with a Popup to make it appear with a click
 *______________________________________________________________________ */
