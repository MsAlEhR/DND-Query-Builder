import React from "react";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import { connect } from "react-redux";
import normalizeCss from "normalize.css";
import { injectIntl } from "react-intl";
import s from "./ModalOperator.css";
import CmpFormTextField from "../../../../components/CmpFormTextField";

class Expression extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.order = 0;
  }
  expressionBuilder(exp) {
    let resultString = "";
      const baseInfo ={
          arithmeticOperator:
              {   ADD: "+",
                  MUL: "×",
                  SUB: "-",
              },
          comparativeOperator:
              {   EQUAL: "=",
                  EQUAL_OR_GREATER_THAN: ">=",
                  EQUAL_OR_LESS_THAN: "<=",
                  GREATER_THAN: ">",
                  LESS_THAN: "<",
                  UNEQUAL: "!="
              },
          relationalOperator:
              {   AND: "And",
                  NOT: "Not",
                  OR: "Or"}
      };
      const AllOperator={...baseInfo.relationalOperator,...baseInfo.comparativeOperator,...baseInfo.arithmeticOperator};

    // console.log("in function", exp.key);
    if (
      exp["@type"] === "RelationalExpressionModel" ||
      exp["@type"] === "ComplexParamModel"
    ) {
      if (exp.operator === "NOT") {
        resultString += AllOperator[exp.operator];
      }
      resultString += "(";
      for (const x in exp.expressionList) {
        // console.log(x, "xx in loop");
        resultString += " ";
        resultString += this.expressionBuilder(exp.expressionList[x]);
        resultString += " ";
        // console.log(exp.expressionList.length, "Dddddddd");
        if (x !== (exp.expressionList.length - 1).toString()) {
          if (exp.operator !== "NOT") {
            resultString += AllOperator[exp.operator];
          }
        }
      }
      resultString += ")";
    } else if (exp["@type"] === "ComparativeExpressionModel") {
      resultString += "(";
      if (!exp.expressionList) {
        exp.expressionList = [];
        exp.expressionList[0] = exp.first;
        exp.expressionList[1] = exp.second;
        exp.expressionList[0].expressionList = exp.first.paramList;
        exp.expressionList[1].expressionList = exp.second.paramList;
      } else {
        exp.first = exp.expressionList[0];
        exp.second = exp.expressionList[1];
        exp.first.paramList = exp.expressionList[0].expressionList;
        exp.second.paramList = exp.expressionList[1].expressionList;
      }
      if (exp.expressionList[0]["@type"] === "ComplexParamModel") {
        resultString += this.expressionBuilder(exp.expressionList[0]);
      } else {
        resultString += exp.expressionList[0].title
          ? exp.expressionList[0].title
          : "▢";
      }
      resultString += AllOperator[exp.operator];

      if (exp.expressionList[1]["@type"] === "ComplexParamModel") {
        resultString += this.expressionBuilder(exp.expressionList[1]);
      } else {
        resultString += exp.expressionList[1].title
          ? exp.expressionList[1].title
          : "▢";
      }

      resultString += ")";
    } else {
      exp.order = this.order;
      // console.log("uuuuuuuuu", this.order);
      resultString += exp.title ? exp.title : "▢";
      this.order += 1;
    }
    return resultString;
  }
  render() {
    const { expression, intl } = this.props;
    this.order = 0;
    return (
      <CmpFormTextField
        dir="ltr"
        value={this.expressionBuilder(expression)}
        label={intl.formatMessage({ id: "keywords.expression" })}
      />
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default injectIntl(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(normalizeCss, s)(Expression))
);
