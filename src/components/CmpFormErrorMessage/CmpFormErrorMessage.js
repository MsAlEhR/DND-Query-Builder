import React from 'react';
import { ErrorMessage } from 'formik';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './CmpFormErrorMessage.css';

class CmpFormErrorMessage extends React.Component {
  render() {
    return (
      <span className={s.error}>
        <ErrorMessage name={this.props.name} />
      </span>
    );
  }
}

export default withStyles(s)(CmpFormErrorMessage);
