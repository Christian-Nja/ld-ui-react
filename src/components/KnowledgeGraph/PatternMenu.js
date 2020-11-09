import React from 'react';
import { Menu } from 'semantic-ui-react';

import InstancesButton from './InstancesButton';

import { getURILabel } from '../../utilities/uri';

const menuStyle = { marginLeft: 20, marginTop: 20, height: '50vh' };

export default function PatternMenu(props) {
    return (
        <div style={menuStyle}>
            <Menu vertical inverted>
                <Menu.Item>
                    Selected
                    <Menu.Menu>
                        {props.selectedNodes.map((selected, key) => {
                            return (
                                <Menu.Item key={key}>
                                    {getURILabel(selected)}
                                </Menu.Item>
                            );
                        })}
                    </Menu.Menu>
                </Menu.Item>
            </Menu>
            <InstancesButton
                getInstances={props.getInstances}
                selectedNodes={props.selectedNodes}
            ></InstancesButton>
        </div>
    );
}
