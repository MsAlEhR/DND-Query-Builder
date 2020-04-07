import React, { useCallback, useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import Grid from "@material-ui/core/Grid";
import Container from "./Container";
import Expression from "./Expression";

export default function QueryBuilderPart(prop) {
  // const [expression, setExpression] = useState("");
  // console.log(prop, "YYYYYYYYYYYYYYYYY");
  // const handleExpression = useCallback(ex => prop.handleExpression(ex));
  // const handleBoxes = useCallback(ex => prop.setBoxes(ex));
  // const classes = useStyles();
  return (
    <div>
      <Grid>
        <div className="App">
          <DndProvider backend={HTML5Backend}>
            <Container
              dir={prop.dir}
              intl={prop.intl}
              setExpression={prop.handleExpression}
              expression={prop.expression}
              boxes={prop.queryInfo.boxes}
              setBoxes={prop.setBoxes}
              dustbin={prop.queryInfo.dustbin}
              setDustbin={prop.setDustbin}
              baseInfo={prop.baseInfo}
              arrowValue={prop.queryInfo.arrowValue}
              setArrow={prop.setArrow}
              possibleDust={prop.queryInfo.possibleDust}
              setPossibleDust={prop.setPossibleDust}
            />
          </DndProvider>
          <Expression
            intl={prop.intl}
            expression={prop.expression}
            baseInfo={prop.baseInfo}
          />
        </div>
      </Grid>
    </div>
  );
}
