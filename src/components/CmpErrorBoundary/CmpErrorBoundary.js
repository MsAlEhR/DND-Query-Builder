import React from 'react';
import { injectIntl } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Paper from '@material-ui/core/Paper';
import s from './CmpErrorBoundary.css';

class CmpErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null,
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    const { intl } = this.props;
    if (this.state.errorInfo)
      return (
        <Paper className={s.error}>
          <h4>{intl.formatMessage({ id: 'message.errorInThisPart' })}</h4>
        </Paper>
      );
    return this.props.children;
  }
}

export default injectIntl(withStyles(s)(CmpErrorBoundary));
