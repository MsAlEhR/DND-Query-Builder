import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import normalizeCss from 'normalize.css';
import s from './CmpSecure.css';

class CmpSecure extends React.Component {
  render() {
    const { requiredAuthority, authorities } = this.props;
    return authorities.hasOwnProperty(requiredAuthority) ? (
      <div>{this.props.children}</div>
    ) : null;
  }
}

const mapStateToProps = state => ({
  authorities: state.authentication.data.uiAuthority,
});

const mapDispatchToProps = dispatch => ({});

export default injectIntl(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withStyles(normalizeCss, s)(CmpSecure)),
);
