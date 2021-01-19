import React from "react";
import { Icon } from "semantic-ui-react";

export default function HelpIcon({ style = {} }) {
    return (
        <div style={style}>
            <Icon
                color="teal"
                size="big"
                name="help"
                className="hide-help with-help shakeit"
            />
        </div>
    );
}
