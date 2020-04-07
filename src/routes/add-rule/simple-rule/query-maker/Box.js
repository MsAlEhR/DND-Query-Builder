/* eslint-disable */
import React, { useCallback } from "react";
import { useDrag } from 'react-dnd'
import ItemTypes from './ItemTypes'
import Dustbin from "./Dustbin";
import { Grid } from "@material-ui/core";
import equal from 'fast-deep-equal';

const style = {
    // position: 'absolute',
    border: '1px dashed gray',
    backgroundColor: 'white',
    padding: '0.5rem 1rem',
    cursor: 'move',
};
const Box = ({ id, left, top, setExpression,expression, children ,boxes, setBoxes,moveBox,dustbin,setDustbin,canDrag,setPossibleDust,possibleDust,intl,dir,baseInfo}) => {


    const [,updateState]=React.useState();
    const forceUpdateBox = useCallback(() => updateState({},[]));


    const [{ isDragging }, drag] = useDrag({
        item: { id, left, top, type: ItemTypes.BOX },
        canDrag: canDrag,
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    });
    let element = {};
    let element_exp = {};
    return (
        <div ref={drag} style={{ ...style, left, top }}>
            <Grid  container
                   direction="row-reverse"
                   justify="center"
                   alignItems="center">
            {boxes[id].dustbinList.map((key,value) => {

                if(id==='0'){
                    let checkParent = dustbin[key].hasParent;
                    // console.log(id,value,checkParent,"hhhH");
                    if (checkParent){
                        let parent=dustbin[key].parent;

                        let x_exp = element_exp[parent]===undefined ? {...dustbin[parent],key:parent,expressionList:[]}:element_exp[parent];

                        let x= element[parent]===undefined ? <Dustbin
                            key={parent}
                            id={parent}
                            intl={intl}
                            dir={dir}
                            greedy={true}
                            boxes={boxes}
                            setBoxes={setBoxes}
                            possibleDust={possibleDust}
                            setPossibleDust={setPossibleDust}
                            moveBox={moveBox}
                            dustbin={dustbin}
                            setDustbin={setDustbin}
                            forceUpdateBox={forceUpdateBox}
                            baseInfo={baseInfo}
                        >
                            {[]}
                        </Dustbin>:element[parent];
                        x_exp={...x_exp,expressionList:[...x_exp.expressionList,{...dustbin[key],key:key,expressionList:[]}]};

                        x={...x,props:{
                                ...x.props,
                                children:[
                                ...x.props.children,
                                    <Dustbin
                                        key={key}
                                        intl={intl}
                                        dir={dir}
                                        id={key}
                                        greedy={true}
                                        boxes={boxes}
                                        setBoxes={setBoxes}
                                        moveBox={moveBox}
                                        possibleDust={possibleDust}
                                        setPossibleDust={setPossibleDust}
                                        dustbin={dustbin}
                                        setDustbin={setDustbin}
                                        forceUpdateBox={forceUpdateBox}
                                        baseInfo={baseInfo}

                                    />
                            ]
                            }};
                            element_exp[parent]=x_exp;

                            element[parent]=x

                    }
                    else{
                        let x= <Dustbin
                            key={key}
                            intl={intl}
                            dir={dir}
                            id={key}
                            greedy={true}
                            boxes={boxes}
                            setBoxes={setBoxes}
                            moveBox={moveBox}
                            possibleDust={possibleDust}
                            setPossibleDust={setPossibleDust}
                            dustbin={dustbin}
                            setDustbin={setDustbin}
                            forceUpdateBox={forceUpdateBox}
                            baseInfo={baseInfo}

                        >
                            {[]}
                        </Dustbin>;
                        let x_exp ={...dustbin[key],key:key,expressionList:[]}

                        element_exp[key]=x_exp;

                        element[key]=x

                    }

                    if(boxes[0].dustbinList[boxes[0].dustbinList.length-1]===key) {
                        while( Object.keys(element).length>1) {

                            let ele = Object.keys(element)[Object.keys(element).length-1];


                            if(dustbin[ele].hasParent === true){

                                    let parent = dustbin[ele].parent

                                    let elementParent = element[parent]

                                    let elementExpParent = element_exp[parent]

                                   // console.log(parent,"rrrrr")
                                elementParent.props.children.forEach((a,index)=> a.key===ele ? elementParent.props.children[index]=element[ele]:null)

                                elementExpParent.expressionList.forEach((a,index)=> a.key===ele ? elementExpParent.expressionList[index]=element_exp[ele]:null)

                                    element[parent] = elementParent;
                                     delete element[ele]

                                   element_exp[parent] = elementExpParent;
                                      delete element_exp[ele]

                            }

                        }
                        if(!equal(expression,element_exp[0])) {
                          setExpression(element_exp[0])
                        }

                        return (
                            <span>
                                {element[0]}
                             </span>
                        )



                    }

                }
                else {
                    return (

                        <Dustbin
                            key={key}
                            intl={intl}
                            dir={dir}
                            id={key}
                            greedy={true}
                            boxes={boxes}
                            setBoxes={setBoxes}
                            moveBox={moveBox}
                            possibleDust={possibleDust}
                            setPossibleDust={setPossibleDust}
                            forceUpdateBox={forceUpdateBox}
                            dustbin={dustbin}
                            baseInfo={baseInfo}
                            setDustbin={setDustbin}>
                        </Dustbin>

                    )
                }
            })}
                {children}
            </Grid>
        </div>
    )
}
export default Box
