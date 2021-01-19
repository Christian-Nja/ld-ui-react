import React from "react";

//https://github.com/facebook/react/issues/17280#issuecomment-549980239
const Context = React.createContext([{}, function () {}]);

export { Context };
