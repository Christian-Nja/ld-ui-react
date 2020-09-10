import React from 'react';
import { Tooltip } from 'react-leaflet';

import TimeIcon from '../../icon/simple-icons/TimeIcon';
import MuseumIcon from '../../icon/simple-icons/MuseumIcon';

export default function ClickableTooltip(props) {
    return (
        <Tooltip opacity={1} interactive={true}>
            <MuseumIcon message={props.siteLabel}></MuseumIcon>
            <TimeIcon message={props.timeInterval}></TimeIcon>
        </Tooltip>
    );
}
