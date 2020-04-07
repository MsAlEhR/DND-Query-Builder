import React from "react";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import { connect } from "react-redux";
import normalizeCss from "normalize.css";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import { Field, Form, Formik } from "formik";
import { injectIntl } from "react-intl";
import s from "./ModalOperator.css";
import * as Yup from "yup";
import CmpFontWrapper from "../../../../components/CmpFontWrapper";
import CmpIconButton from "../../../../components/CmpIconButton";
import CmpDialogTitle from "../../../../components/CmpDialogTitle";
import CmpDialogActions from "../../../../components/CmpDialogActions";
import CmpDialogContent from "../../../../components/CmpDialogContent";
import CmpDialog from "../../../../components/CmpDialog";
import CmpFormTextField from "../../../../components/CmpFormTextField";
import CmpFormSelect from "../../../../components/CmpFormSelect";

class ModalOperand extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.open,
      literalCategory: " ",
      operandValues: {
        title: props.dustbin[props.operand].title
          ? props.dustbin[props.operand].title
          : " ",
        paramType: props.dustbin[props.operand]["@type"]
          ? props.dustbin[props.operand]["@type"]
          : " ",
        valueType:
          props.dustbin[props.operand]["@type"] === "SYSTEM"
            ? findCategoryId(
                props.dustbin[props.operand].value.id,
                props.systemLiteral
              )
            : props.dustbin[props.operand].valueType,
        value: props.dustbin[props.operand].value
          ? props.dustbin[props.operand]["@type"] === "SYSTEM"
            ? props.dustbin[props.operand].value.id
            : props.dustbin[props.operand].value
          : " "
      }
      // paramType: "SystemParamModel"
    };
  }
  submitParameter = values => {
    const dustbinSt = this.props.dustbin;
    dustbinSt[this.props.operand] = {
      ...this.props.dustbin[this.props.operand],
      title: values.title,
      "@type": values.paramType,
      valueType:
        values.paramType === "SYSTEM"
          ? { id: values.valueType }
          : values.valueType,
      value:
        values.paramType === "SYSTEM"
          ? { id: values.value }
          : values.valueType === "NUMBER"
          ? Number(values.value)
          : values.value
    };
    this.props.setDustbin(dustbinSt);
    this.props.setOperand(" ");
    this.props.forceUpdateBox();
  };

  cancel = e => {
    e.stopPropagation();
    this.props.setOperand(" ");
    this.props.forceUpdateBox();
    // this.props.onCancelOperand(" ");
    // this.setState({ open: false });
  };

  render() {
    console.log(this.props.dustbin[this.props.operand], "onmodalOperand");
    const { dir, intl, style } = this.props;
    return (
      <CmpDialog open={this.state.open} style={style} onClose={this.cancel}>
        <CmpFontWrapper>
          <Formik
            onSubmit={values => this.submitParameter(values)}
            initialValues={this.state.operandValues}
            // validate={validate(getFormValidationSchema, intl)}
          >
            <Form name="my" style={{ width: "100%" }}>
              <CmpDialogTitle>
                {intl.formatMessage({
                  id: "page.AddRule.ModalOperand.title"
                })}
              </CmpDialogTitle>
              <CmpDialogContent>
                <Grid
                  container
                  spacing={16}
                  style={{ width: "90%", margin: "auto" }}
                >
                  <Grid item xs={6}>
                    <Field
                      name="title"
                      type="text"
                      render={({ field, form }) => (
                        <CmpFormTextField
                          style={{ width: "200px" }}
                          label={intl.formatMessage({ id: "keywords.title" })}
                          errorMessageFieldName="title"
                          {...field}
                        />
                      )}
                    />
                  </Grid>{" "}
                  {/*<Grid item xs={6}>*/}
                    {/*<Field*/}
                      {/*name="paramType"*/}
                      {/*as="select"*/}
                      {/*render={({ field, form }) => (*/}
                        {/*<CmpFormSelect*/}
                          {/*label={intl.formatMessage({*/}
                            {/*id: "page.AddRule.ModalOperand.paramType"*/}
                          {/*})}*/}
                          {/*className={s.select}*/}
                          {/*value={field.value}*/}
                          {/*onChange={type => {*/}
                            {/*form.setFieldValue("paramType", type);*/}
                            {/*this.setState({*/}
                              {/*operandValues: {*/}
                                {/*...this.state.operandValues,*/}
                                {/*paramType: type,*/}
                                {/*valueType: " "*/}
                              {/*}*/}
                            {/*});*/}
                          {/*}}*/}
                          {/*errorMessageFieldName="paramType"*/}
                        {/*>*/}
                          {/*{Object.keys(this.props.baseInfo.paramTypes).map(*/}
                            {/*(op, index) => (*/}
                              {/*<MenuItem key={index} value={op}>*/}
                                {/*{this.props.baseInfo.paramTypes[op]}*/}
                              {/*</MenuItem>*/}
                            {/*)*/}
                          {/*)}*/}
                        {/*</CmpFormSelect>*/}
                      {/*)}*/}
                    {/*/>*/}
                  {/*</Grid>*/}
                    <Grid item xs={6}>
                      <Field
                        name="valueType"
                        as="select"
                        render={({ field, form }) => (
                          <CmpFormSelect
                            label={intl.formatMessage({
                              id: "page.AddRule.ModalOperand.valueType"
                            })}
                            className={s.select}
                            value={field.value}
                            onChange={type =>
                              form.setFieldValue("valueType", type)
                            }
                            errorMessageFieldName="valueType"
                          >
                            {Object.keys(this.props.baseInfo.valueTypes).map(
                              (op, index) => (
                                <MenuItem key={index} value={op}>
                                  {this.props.baseInfo.valueTypes[op]}
                                </MenuItem>
                              )
                            )}
                          </CmpFormSelect>
                        )}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        name="value"
                        type="text"
                        render={({ field, form }) => (
                          <CmpFormTextField
                            style={{ width: "200px" }}
                            label={intl.formatMessage({
                              id: "keywords.initialValue"
                            })}
                            errorMessageFieldName="title"
                            {...field}
                          />
                        )}
                      />
                    </Grid>
                  <Grid item xs={12} />
                </Grid>
              </CmpDialogContent>

              <CmpDialogActions>
                <CmpIconButton
                  caption={intl.formatMessage({ id: "keywords.confirm" })}
                  iconType="accept"
                  type="submit"
                />
                <CmpIconButton
                  caption={intl.formatMessage({ id: "keywords.cancel" })}
                  iconType="reject"
                  onClick={this.cancel}
                />
              </CmpDialogActions>
            </Form>
          </Formik>
        </CmpFontWrapper>
      </CmpDialog>
    );
  }
}

function findCategoryId(id, systemLiteral) {
  for (let i = 0; i < systemLiteral.length; i++) {
    for (let j = 0; j < systemLiteral[i].literalList.length; j++) {
      if (systemLiteral[i].literalList[j].id === id) {
        return systemLiteral[i].id;
      }
    }
  }
}

function getFormValidationSchema(values, intl) {
  return Yup.object().shape({
    name: Yup.string()
      .nullable()
      .required(
        intl.formatMessage({ id: "validation.general.nameIsRequired" })
      ),
    title: Yup.string()
      .nullable()
      .required(
        intl.formatMessage({ id: "validation.general.titleIsRequired" })
      )
  });
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  // editServiceAuthority: serviceAuthority => dispatch(edit(serviceAuthority))
});

export default injectIntl(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(normalizeCss, s)(ModalOperand))
);
