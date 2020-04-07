import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './CmpLinkInfo.css';
import theme from '../../theme/theme';
import {goTo} from '../../util/generalUtil';

const wrapperStyle = {
  display: 'flex',
  flexDirection: 'row',
};

const iconStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '0 15px',
};

const headerStyle = {
  color: theme.palette.primary.dark,
  padding: '15px 0',
  fontSize: 18,
  fontWeight: 'bolder',
};

const descStyle = {
  color: theme.palette.primary.dark,
};

const linkStyle = {
  cursor: 'pointer',
};

class CmpLinkInfo extends React.Component {
  render() {
    const {icon, header, description, link} = this.props;
    return (
      <div style={wrapperStyle}>
        <div style={iconStyle}>
          <span>{icon}</span>
        </div>
        <div>
          <div style={headerStyle}>
            <span style={linkStyle} onClick={() => goTo(link)}>{header}</span>
          </div>
          <div>
            <span style={descStyle}>{description}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(CmpLinkInfo);
