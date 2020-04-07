import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import s from './CmpStatisticalInfo.css';
import { goTo } from '../../util/generalUtil';
import theme from '../../theme/theme';

const iconWrapperStyle = {
  backgroundColor: theme.palette.primary.main,
  textAlign: 'center',
  color: theme.palette.primary.contrastText,
  paddingTop: 20,
};

const infoWrapperStyle = {
  backgroundColor: theme.palette.primary.light,
};

class CmpStatisticalInfo extends React.Component {
  render() {
    return (
      <Card>
        <CardContent style={{ padding: 0 }}>
          <div className={s['content-wrapper']}>
            <div style={iconWrapperStyle}>{this.props.icon}</div>
            <div style={infoWrapperStyle}>
              <div className={s.title}>
                <span
                  className={s['title-link']}
                  onClick={() => goTo(this.props.url)}
                >
                  {this.props.title}
                </span>
              </div>
              <div className={s.value}>
                <span>{this.props.value}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(s)(CmpStatisticalInfo);
