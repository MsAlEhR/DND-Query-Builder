import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import normalizeCss from 'normalize.css';
import s from './CmpFontWrapper.css';

class CmpFontWrapper extends React.Component {
  render() {
    const { dir } = this.props;
    return <div className={s[`${dir}-font`]}>{this.props.children}</div>;
  }
}

const mapStateToProps = state => ({
  dir: state.locale.data.dir,
});

export default injectIntl(
  connect(mapStateToProps)(withStyles(normalizeCss, s)(CmpFontWrapper)),
);
