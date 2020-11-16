import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

export default function InstancesButton(props) {
    return (
        <Button
            icon
            labelPosition={'left'}
            onClick={() => {
                props.getInstances(props.selectedNodes);
            }}
        >
            <Icon name="world" />
            Explore Instances
        </Button>
    );
}
