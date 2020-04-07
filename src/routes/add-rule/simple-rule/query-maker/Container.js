import React, { useState, useCallback } from "react";
import { useDrop } from "react-dnd";
import { Grid, IconButton } from "@material-ui/core";
import ItemTypes from "./ItemTypes";
import Box from "./Box";
import update from "immutability-helper";
import CmpButton from "../../../../components/CmpButton";
import {
  AddCircle,
  RemoveCircle,
} from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import theme from "../../../../theme/theme";

const styleContainer = {
  width: "100%",
  height: 500,
  overflow: "auto",
  border: "1px solid black",
  position: "relative"
};
const Divider = {
  // position: "absolute",
  borderTop: "1px solid",
  borderColor: theme.palette.primary.dark,
  cursor: "move",
  width: "90%",
  order: 1,
  marginTop: "2%",
  marginBottom: "1%"
};

const Buttons = {
  border: "1px solid #3391CD",
  position: "absolute",
  // marginRight: "90%",
  // marginTop: "1%"
  // cursor: "move",
  top: "1%",
  right: "91.5%"
};

const Container = ({
  setExpression,
  expression,
  intl,
  dir,
  boxes,
  setBoxes,
  dustbin,
  setDustbin,
  arrowValue,
  setArrow,
  possibleDust,
  setPossibleDust,
  baseInfo
}) => {
  // const [arrowValue, setArrow] = useState(0);
  // const [possibleDust, setPossibleDust] = useState(["0"]);
  // const [boxes, setBoxes] = useState({
  //   0: {
  //     top: 50,
  //     left: 180,
  //     title: "مقصد",
  //     dustbinList: ["0"],
  //     canDrag: false
  //   },
  //   1: {
  //     top: 350,
  //     left: 180,
  //     title: "مبدا",
  //     dustbinList: ["1", "2"],
  //     canDrag: true
  //   }
  // });
  // const handleDrop = useCallback(box => setBoxes(box));

  // const [dustbin, setDustbin] = useState({ 0: { hasParent: false } });

  const [, drop] = useDrop({
    accept: [ItemTypes.BOX, ItemTypes.Operator],
    drop(item, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset();
      // const left = Math.round(delta !== null ? item.left + delta.x : item.left);
      // const top = Math.round(delta !== null ? item.top + delta.y : item.top);
      // item.type === ItemTypes.Operator
      //   ? moveOperator(item.id, left, top)
      //   : moveBox(item.id, left, top);
      return undefined;
    }
  });
  const moveBox = (id, left, top) => {
    setBoxes(
      update(boxes, {
        [id]: {
          $merge: { left, top }
        }
      })
    );
  };

  const handleArrow = direct => {
    if (direct === "right") {
      setArrow(arrowValue + 1);
      const dustbinList = boxes[1].dustbinList;
      const maxDust = (Math.max(...dustbinList) + 1).toString();
      dustbinList.push(maxDust);
      setBoxes(
        update(boxes, {
          1: {
            $merge: { dustbinList }
          }
        })
      );
    }
    if (direct === "left" && boxes[1].dustbinList.length > 1) {
      setArrow(arrowValue - 1);
      let dustbinList = boxes[1].dustbinList;
      const maxDust = Math.max(...dustbinList).toString();
      dustbinList = dustbinList.filter(x => x !== maxDust);
      setBoxes(
        update(boxes, {
          1: {
            $merge: { dustbinList }
          }
        })
      );
    }
  };
  // console.log("container", dustbin, boxes, dir);
  return (
    <div>
      <div ref={drop} style={styleContainer}>
        <div style={Buttons}>
          <div
            style={{
              color: " rgba(0, 0, 0, 0.54)",
              fontSize: 15,
              margin: 5
            }}
          >
            {intl.formatMessage({ id: "page.AddRule.numOperator" })}
          </div>
          <span />
          <IconButton
            size="small"
            variant="text"
            onClick={() => handleArrow("right")}
          >
            <AddCircle />
          </IconButton>
          <IconButton
            size="small"
            variant="text"
            onClick={() => handleArrow("left")}
          >
            <RemoveCircle />
          </IconButton>
        </div>
        <Grid container direction="column" justify="center" alignItems="center">
          {Object.keys(boxes).map(key => {
            const { left, top, title, canDrag } = boxes[key];
            return (
              <Grid
                item
                key={key}
                style={{
                  margin: "2%",
                  order: key === "1" ? 2 : 0
                }}
              >
                <Box
                  key={key}
                  id={key}
                  intl={intl}
                  dir={dir}
                  left={left}
                  top={top}
                  setExpression={setExpression}
                  expression={expression}
                  boxes={boxes}
                  canDrag={canDrag}
                  setBoxes={setBoxes}
                  setPossibleDust={setPossibleDust}
                  possibleDust={possibleDust}
                  moveBox={moveBox}
                  dustbin={dustbin}
                  baseInfo={baseInfo}
                  setDustbin={setDustbin}
                >
                  {title}
                </Box>
              </Grid>
            );
          })}
          <Grid item style={Divider} />
        </Grid>
      </div>
    </div>
  );
};
export default Container;
