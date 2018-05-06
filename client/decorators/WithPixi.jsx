import * as React from "react";
import PixiContext from "../contexts/pixi";

const WithPixi = PixiComponent => props => {
  return (
    <PixiContext.Consumer>
      {ctx => <PixiComponent {...props} {...ctx} />}
    </PixiContext.Consumer>
  );
};

export default WithPixi;
