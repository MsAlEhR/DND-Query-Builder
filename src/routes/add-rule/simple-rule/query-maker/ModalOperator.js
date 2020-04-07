import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import { injectIntl } from "react-intl";
import normalizeCss from "normalize.css";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import CmpFormSelect from "../../../../components/CmpFormSelect";
import Grid from "@material-ui/core/Grid";
import s from "./ModalOperator.css";
import CmpIconButton from "../../../../components/CmpIconButton";
import { Field, Form, Formik } from "formik";
import { connect } from "react-redux";
import CmpDialog from "../../../../components/CmpDialog";
import CmpDialogContent from "../../../../components/CmpDialogContent";
import CmpDialogActions from "../../../../components/CmpDialogActions";
import CmpFontWrapper from "../../../../components/CmpFontWrapper";
import { validate } from "../../../../util/validationUtil";
import { objectFilter } from "../../../../util/generalUtil";

const style = {
  // overflow: "auto  ",
  // margin: 5,
  // padding:5,
  // border: "1px solid black",
  // position: "relative"
};

class ModalOperator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.open,
      operatorList: handleOperandType(props)[2],
      operand: handleOperandType(props)[1],
      operandType: handleOperandType(props)[0]
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.props.onCloseModalOperator();
    this.setState({ open: false });
  };
  handleSave = values => {
    this.setState({ open: false });
    this.props.selectOperator(this.state.operand);
    let operatorType = "";
    if (this.state.operandType === "ComparativeExpressionModel") {
      operatorType = "ComparativeExpressionModel";
    } else if (this.state.operandType === "RelationalExpressionModel") {
      operatorType = "RelationalExpressionModel";
    } else if (
      this.props.dustbin[this.props.id].parent &&
      Object.values(
        Object.keys(this.props.baseInfo.comparativeOperator)
      ).includes(
        this.props.dustbin[this.props.dustbin[this.props.id].parent].operator
      )
    ) {
      operatorType = "ComplexParamModel";
    } else {
      operatorType = "RelationalExpressionModel";
    }

    this.props.operatorType(operatorType);
  };
  handleOperandType = id => {
    this.setState({ operandType: id });
  };
  handleOperand = id => {
    this.setState({ operand: id });
  };

  render() {
      const AllOperator ={
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
    const LogicalOperand = AllOperator.relationalOperator;
    const ConditionalOperand = AllOperator.comparativeOperator;
    const MathOperand = AllOperator.arithmeticOperator;
    let OperandCategory = [];
    const { dir, intl } = this.props;

    switch (this.state.operandType) {
      case "MathOperand":
        OperandCategory =
          Object.values(this.props.dustbin).filter(
            x => x.parent === this.props.id
          ).length === 2
            ? MathOperand
            : objectFilter(
                MathOperand,
                value =>
                  value !== MathOperand.TIME_DIST &&
                  value !== MathOperand.GEO_DIST
              );
        break;
      case "ComparativeExpressionModel":
        OperandCategory = ConditionalOperand;
        break;
      case "RelationalExpressionModel":
        OperandCategory =
          Object.values(this.props.dustbin).filter(
            x => x.parent === this.props.id
          ).length === 1
            ? objectFilter(LogicalOperand, value => value === "Not")
            : objectFilter(LogicalOperand, value => value !== "Not");
        break;
      default:
        OperandCategory = [];
    }
    return (
      <CmpDialog open={this.state.open} onClose={this.handleClose} dir={dir}>
        <CmpFontWrapper>
          <CmpDialogContent id="form-dialog-title">
            {intl.formatMessage({
              id: "queryBuilder.ModalOperator.title"
            })}
          </CmpDialogContent>
          <CmpDialogContent>
            <Grid container>
              <Grid item xs={12}>
                <CmpFormSelect
                    labelWidth={105}

                    label={intl.formatMessage({
                    id: "page.AddRule.ModalOperator.OperandType"
                  })}
                  className={s["select-op"]}
                  value={this.state.operandType}
                  onChange={id => this.handleOperandType(id)}
                  errorMessageFieldName="OperandType"
                >
                  {Object.values(this.state.operatorList).map((op, index) => (
                    <MenuItem
                      // key={2}
                      value={op}
                      className={s[`${dir}-font`]}
                    >
                      {intl.formatMessage({
                        id: `page.AddRule.ModalOperator.${op}`
                      })}
                    </MenuItem>
                  ))}
                </CmpFormSelect>
              </Grid>

              <Grid item xs={12}>
                <div
                  // className={s.select}
                  style={{
                    display: this.state.operandType === " " ? "none" : "block"
                  }}
                >
                  <CmpFormSelect
                    labelWidth={165}
                    label={intl.formatMessage({
                      id: `page.AddRule.ModalOperator.${this.state.operandType}`
                    })}
                    className={s["select-op"]}
                    value={this.state.operand}
                    onChange={id => this.handleOperand(id)}
                    errorMessageFieldName="Operand"
                  >
                    {Object.keys(OperandCategory).map((op, index) => (
                      <MenuItem key={index} value={op} dir="ltr">
                        {OperandCategory[op]}
                      </MenuItem>
                    ))}
                  </CmpFormSelect>
                </div>
              </Grid>
              <Grid item xs={12} />
            </Grid>
          </CmpDialogContent>

          <CmpDialogActions>
            <CmpIconButton
              caption={intl.formatMessage({ id: "keywords.confirm" })}
              iconType="accept"
              disabled={this.state.operand === " "}
              onClick={this.handleSave}
            />
            <CmpIconButton
              caption={intl.formatMessage({ id: "keywords.cancel" })}
              iconType="reject"
              onClick={this.handleClose}
            />
          </CmpDialogActions>
        </CmpFontWrapper>
      </CmpDialog>
    );
  }
}

function handleOperandType(props) {
  const child_lenght = Object.values(props.dustbin).filter(
    x => x.parent === props.id
  ).length;

  console.log(props, child_lenght, "D");

  let operandType = " ";
  let operand = " ";
  let operatorList = [
    "RelationalExpressionModel",
    "ComparativeExpressionModel",
    "MathOperand"
  ];
  // bray not
  if (child_lenght > 1) {
    // avalin amalgar
    if (!props.dustbin[props.id].hasParent) {
      operatorList = [
        "RelationalExpressionModel",
        "ComparativeExpressionModel"
      ];
    }
    if (
      props.dustbin[props.id].hasParent &&
      Object.values(Object.keys(props.baseInfo.relationalOperator)).includes(
        props.dustbin[props.dustbin[props.id].parent].operator
      )
    ) {
      operatorList = [
        "RelationalExpressionModel",
        "ComparativeExpressionModel"
      ];
    }

    // age parent sharti badesh hesabi
    if (
      props.dustbin[props.id].parent &&
      Object.values(Object.keys(props.baseInfo.comparativeOperator)).includes(
        props.dustbin[props.dustbin[props.id].parent].operator
      )
    ) {
      operandType = "MathOperand";
      operatorList = ["MathOperand"];
    }
  } else {
    operandType = "RelationalExpressionModel";
    operand = "NOT";
    operatorList = ["RelationalExpressionModel"];
  }

  return [operandType, operand, operatorList];
}

const mapStateToProps = state => ({
  dir: state.locale.data.dir,
});
const mapDispatchToProps = dispatch => ({
});

export default injectIntl(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(normalizeCss, s)(ModalOperator))
);
