import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import normalizeCss from 'normalize.css';
import { injectIntl } from 'react-intl';
import s from './CmpThumb.css';
import theme from '../../theme/theme';

const thumbStyle = {
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.contrastText,
};

class CmpThumb extends React.Component {
  state = {
    loading: false,
  };

  arr2String = arr => {
    let s = '';
    for (let i = 0; i < arr.length; i += 1) {
      s += String.fromCharCode(arr[i]);
    }
    return s;
  };

  render() {
    const { file, intl } = this.props;
    const { loading } = this.state;

    return (
      <div
        style={{
          boxShadow:
            '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
        }}
      >
        {file ? (
          <div>
            <img
              onClick={this.props.onClick}
              src={`data:image/png;base64,${window.btoa(
                this.arr2String(file),
              )}`}
              height={200}
              width={150}
              style={{
                cursor: 'pointer',
              }}
            />
          </div>
        ) : (
          <div
            onClick={this.props.onClick}
            style={{
              width: 150,
              height: 200,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              ...thumbStyle,
            }}
          >
            <span>{intl.formatMessage({ id: 'keywords.image' })}</span>
          </div>
        )}
      </div>
    );
  }
}

export default injectIntl(withStyles(normalizeCss, s)(CmpThumb));
