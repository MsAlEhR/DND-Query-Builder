import React from "react";
import { useDrag } from "react-dnd";
import ItemTypes from "./ItemTypes";
import Dustbin from "./Dustbin";

const style = {
  position: "absolute",
  // border: '1px dashed gray',
  backgroundColor: "white",
  // padding: '0.5rem 1rem',
  cursor: "move",
  lineHeight: "0%",
  width: "0px",
  borderRight: "25px solid transparent",
  borderLeft: "25px dashed transparent",
  borderBottom: " 50px solid #d4ffa5"
};
const Operator = ({
  id,
  left,
  top,
  hideSourceOnDrag,
  children,
  boxes,
  setBoxes,
  moveBox,
  dustbin,
  setDustbin
}) => {
  const [{ isDragging }, drag] = useDrag({
    item: { id, left, top, type: ItemTypes.Operator },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });
  if (isDragging && hideSourceOnDrag) {
    return <div ref={drag} />;
  }
  return (
    <div ref={drag} style={{ ...style, left, top }}>
    </div>
  );
};
export default Operator;
