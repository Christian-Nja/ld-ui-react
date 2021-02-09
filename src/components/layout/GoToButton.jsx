import React from "react";

import { Icon } from "semantic-ui-react";

export default function GoToButton() {
    // const datasetURL =
    // http://localhost:3000/test-odpreactor/datasets/http%3A%2F%2Farco.istc.cnr.it%2Fldr%2Frdf%2Fd1608109514/patterns/https%3A%2F%2Fw3id.org%2Farco%2Fontology%2Flocation%2Ftime-indexed-typed-location/color/noColor

    return (
        <div className="go-back-button" onClick={() => window.history.back()}>
            <Icon name="home" /> Back
        </div>
    );
}
