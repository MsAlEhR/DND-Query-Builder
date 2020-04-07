import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {connect} from 'react-redux';
import normalizeCss from 'normalize.css';
import {injectIntl} from 'react-intl';
import s from './CmpRawLayout.css';
import {closeMessage} from '../../actions/message';
import CmpNotification from '../CmpNotification';

class CmpRawLayout extends React.Component {

  render() {
    const { intl, dir, message, lang } = this.props;
    return (
      <div style={{ direction: dir }}>
        {this.props.children}
        <CmpNotification
          open={message.open}
          message={
            message.message !== ''
              ? message.isMessageCode
                ? intl.formatMessage({ id: message.message })
                : message.message
              : ''
          }
          type={message.type}
          onClose={this.props.closeMessage}
          dir={dir}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  dir: state.locale.data.dir,
  lang: state.locale.data.lang,
  flag: state.locale.data.flag,
  message: state.message,
});

const mapDispatchToProps = dispatch => ({
  closeMessage: () => dispatch(closeMessage()),
});

export default injectIntl(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withStyles(normalizeCss, s)(CmpRawLayout)),
);
