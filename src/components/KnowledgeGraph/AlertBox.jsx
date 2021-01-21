import React, { useState, useContext } from "react";

// import { Context } from "./Context";

import { Icon } from "semantic-ui-react";

export default function AlertBox() {
    // console.log("Alert box called");
    // const [context, setContext] = useContext(Context);
    return (
        <div id="alert-box">
            <div class="semantic-ui-icon">
                <Icon name="check" size="big" color="green" />
            </div>
            Filter applied
            {/* {context.alert ? context.alert.message : null} */}
        </div>
    );
}
