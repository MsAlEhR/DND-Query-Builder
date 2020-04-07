import React from "react";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import { TextField } from "@material-ui/core";
import s from "./CmpFormTextField.css";
import CmpFormErrorMessage from "../CmpFormErrorMessage";
import * as PropTypes from "prop-types";

class CmpFormTextField extends React.Component {
  render() {
    const { errorMessageFieldName, style, ...textFieldProps } = this.props;
    return (
      <TextField
        fullWidth
        margin="dense"
        variant="outlined"
        style={style}
        helperText={
          this.props.errorMessageFieldName ? (
            <CmpFormErrorMessage name={this.props.errorMessageFieldName} />
          ) : null
        }
        {...textFieldProps}
      >
        {this.props.children}
      </TextField>
    );
  }
}

CmpFormTextField.propTypes = {
  errorMessageFieldName: PropTypes.string
};

export default withStyles(s)(CmpFormTextField);
