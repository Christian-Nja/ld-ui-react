import React, { useState, useContext } from "react";

import { Context } from "./Context";

export default function AlertBox() {
    const [context, setContext] = useContext(Context);
    return (
        <div id="alert-box">{context.alert ? context.alert.message : null}</div>
    );
}
