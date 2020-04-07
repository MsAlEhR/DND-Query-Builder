/* eslint-disable */
import React, { useState,useCallback,useEffect } from 'react'
import { useDrop } from 'react-dnd'
import ItemTypes from './ItemTypes'
import theme from "../../../../theme/theme";
import { Chip, Grid } from "@material-ui/core";
import ModalOperator from "./ModalOperator";
import ModalOperand from "./ModalOperand";

function getStyle(backgroundColor,borderColor) {
    return {
        border: '1px solid rgba(0,0,0,0.2)',
        borderColor,
        minHeight: '10px',
        minWidth: '10px',
        color: 'black',
        backgroundColor,
        padding: '10px',
        paddingTop: '10px',
        margin: '10px',
        textAlign: 'center',
        float: 'left',
        fontSize: '1rem',
    }
}
const Dustbin = ({ greedy, children,boxes,setBoxes , moveBox,id,dustbin,setDustbin,setPossibleDust,possibleDust,intl,dir,forceUpdateBox,baseInfo}) => {
    const [hasDropped, setHasDropped] = useState(false)
    const [item, setItem] = useState({})
    const [operand, setOperand] = useState(" ")
    const [borderColor, setBorderColor] = useState('rgba(0,0,0,0.2)');
    const AllOperator={...baseInfo.relationalOperator,...baseInfo.comparativeOperator,...baseInfo.arithmeticOperator}

    const handleBorder = useCallback(color => setBorderColor(color));


    const [hasDroppedOnChild, setHasDroppedOnChild] = useState(true)
    const [{ isOver, isOverCurrent }, drop] = useDrop({
        accept: [ItemTypes.BOX,ItemTypes.Operator],
        drop(item, monitor) {
            const didDrop = monitor.didDrop()
            const delta = monitor.getDifferenceFromInitialOffset()
            if (didDrop && !greedy) {
                return
            }

            setHasDropped(true);
            setItem(item);
            if(possibleDust.includes(id.toString())) {
                let boxesValue = boxes;
                let dustbinList = boxes[1].dustbinList;

                let dustbinSt = dustbin;
                dustbinList.map(dust=>
                  dustbinSt[dust]= {...dust, hasParent: true, parent: id}
                );
                Object.keys(dustbinSt).map(dust=> dustbinSt[dust].last = dust === id)
                dustbinSt[id]={...dustbinSt[id],sign:"true"};
                setDustbin(dustbinSt);

                const maxDust = Math.max(...boxes[1].dustbinList);
                boxesValue[0]={...boxesValue[0],dustbinList:[...boxesValue[0].dustbinList.concat(dustbinList)]};
                boxesValue[1]={...boxesValue[1],dustbinList:[(maxDust+1).toString(),(maxDust+2).toString()]};
                setBoxes(boxesValue);

                let possible = possibleDust;

                possible=possible.concat(dustbinList);
                possible = possible.filter(x => x !== id.toString());
                setPossibleDust(possible);
                // setHasDroppedOnChild(true);
                // console.log(hasDroppedOnChild,hasDropped,didDrop,"check in the drop");

                queryCheck()


            }
            // console.log(boxes,item,id,possibleDust,"23");

        },
        collect: monitor => ({
            isOver: monitor.isOver(),
            isOverCurrent: monitor.isOver({ shallow: true }),
        }),
    });
    const handleOperand = useCallback((e) => {
        e.stopPropagation();
        setOperand(id)
    }, [operand]);


    const onMouseOver =()=>{
        setBorderColor(theme.palette.fourthly.dark)
    };
    const onMouseLeave =()=>{
        setBorderColor('rgba(0,0,0,0.2)')
    };
    const deleteBox =()=>{

        let dustbinSt = dustbin;
        let dustFilter ={};
        let dustFilter2 ={};
        // let listFilter = Object.keys(dustbinSt).filter(dust=> dust != id)
        // listFilter.forEach(i=> dustFilter[i]=dustbinSt[i])
        const dustbinID = dustbinSt[id].id? {
            id: dustbinSt[id].id,
            title: dustbinSt[id].title,
            value: dustbinSt[id].value,
            valueType: dustbinSt[id].valueType,
            version: dustbinSt[id].version,
            "@type":dustbinSt[id]["@type"]} :{};
        dustbinSt[id]= id !=="0" ?
                               {hasParent: dustbinSt[id].hasParent,parent: dustbinSt[id].parent,sign:false,last:false,...dustbinID}
                               :
                               {hasParent: dustbinSt[id].hasParent};

        let listTree = [id];

        boxes[0].dustbinList.forEach(function(dust) {
            for (let i in listTree){

                if(dustbinSt[dust].parent === listTree[i]){
                    if(!listTree.includes(dust)){
                        listTree.push(dust)
                    }
                }
            }
        });
        listTree = listTree.filter(x => x !== id);

        let listFilter = boxes[0].dustbinList.filter(dust => !listTree.includes(dust)) ;


        listFilter.forEach(i=> dustFilter2[i]=dustbinSt[i]);

        let boxesValue = boxes;
        boxesValue[0]={...boxesValue[0],dustbinList:listFilter};

        let possible = possibleDust;
        possible.push(id)


        setPossibleDust(possible);
        setBoxes(boxesValue);
        setDustbin(dustFilter2);
        handleBorder('rgba(0,0,0,0.2)');

    };

    const selectOperator =(operator)=>{
        let dustbinSt = dustbin;
        dustbinSt[id]={...dustbinSt[id],operator};
        setDustbin(dustbinSt);
        forceUpdateBox();
        handleBorder('rgba(0,0,0,0.2)');
    };

    const onCloseModalOperator =()=>{
        deleteBox();
        handleBorder('rgba(0,0,0,0.2)');
    };
    const operatorType =(type)=>{
        let dustbinSt = dustbin;
        dustbinSt[id]={...dustbinSt[id],"@type":type, id:"",version:""};
        setDustbin(dustbinSt);
        handleBorder('rgba(0,0,0,0.2)');
    };

    const onCancelOperand =(a)=>{
        setOperand(a);
        handleBorder('rgba(0,0,0,0.2)');
    };

    const text = greedy ? 'operand' : 'not greedy'
    let backgroundColor = 'rgba(255, 255, 255)'
    if (isOverCurrent || (isOver && greedy)) {
        backgroundColor = 'darkgreen'
    }

    const queryCheck=() =>{

        if(    dustbin[id].parent &&
          Object.values(Object.keys(baseInfo.arithmeticOperator)).includes(
            dustbin[dustbin[id].parent].operator
          )){
            // console.log(dustbin,boxes,"duu")
            deleteBox();
            setHasDroppedOnChild(false);
            // return false
        }
        setHasDroppedOnChild(true);


    };
    console.log(dustbin,"DDDdd")

    return (

        <div ref={drop}
             style={getStyle(backgroundColor,borderColor)}
             onClick={handleOperand}
             id={id}
             onMouseOver={onMouseOver}
             onMouseLeave={onMouseLeave}>

            {dustbin[id] && dustbin[id].last && hasDroppedOnChild ?
              <ModalOperator
                selectOperator={operator => selectOperator(operator)}
                onCloseModalOperator={onCloseModalOperator}
                operatorType={type=>operatorType(type)}
                dir={dir}
                dustbin={dustbin}
                id={id}
                baseInfo={baseInfo}
                intl={intl}
                open={ dustbin[id].last }/> :
              null}

            {dustbin[id] && dustbin[id].sign ?
              (<Chip  variant={"outlined"}
                      size ="small"
                      color={"primary"}
                      label={AllOperator[dustbin[id].operator]}
                      onDelete={deleteBox}/>):
              <span>{operand}{id}</span>}

              {operand===id && possibleDust.includes(id)  ?
              <ModalOperand intl={intl}
                            open={operand===id}
                            setOperand={setOperand}
                            operand={operand}
                            onCancelOperand={a=>onCancelOperand(a)}
                            dustbin={dustbin}
                            baseInfo={baseInfo}
                            forceUpdateBox={forceUpdateBox}
                            setDustbin={setDustbin}/> :
              null}

              <br />
            <div>{children}</div>
        </div>
    )
};
export default Dustbin
