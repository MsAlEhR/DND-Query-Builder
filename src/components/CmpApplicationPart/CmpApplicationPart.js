import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import s from './CmpApplicationPart.css';
import theme from '../../theme/theme';
import CmpHelpIcon from '../CmpHelpIcon';
import {goTo} from "../../util/generalUtil";

class CmpApplicationPart extends React.Component {
  render() {
    const { link, title, dir } = this.props;
    return (
      <div>
        <Card>
          <CardHeader
            className={s.header}
            style={{ backgroundColor: theme.palette.primary.main, cursor:'pointer', color: theme.palette.secondary.contrastText, fontSize:20}}
            onClick={()=>goTo(link)}
            disableTypography
            title={
              <div>
                <div style={{ display: 'inline-block' }}>
                  {/*<Link*/}
                    {/*className={s['header-text-link']}*/}
                    {/*style={{ color: theme.palette.secondary.contrastText }}*/}
                    {/*to={link}*/}
                  {/*>*/}
                    {title}
                  {/*</Link>*/}
                </div>
                {this.props.helpText !== undefined &&
                this.props.helpText !== null &&
                this.props.helpText.trim() !== '' ? (
                  <div
                    style={{
                      display: 'inline-block',
                      float: dir === 'rtl' ? 'left' : 'right',
                    }}
                  >
                    <CmpHelpIcon
                      iconOutLine
                      helpText={this.props.helpText}
                      iconStyle={{ color: theme.palette.primary.contrastText }}
                    />
                  </div>
                ) : null}
              </div>
            }
          />
          <CardContent className={s['app-icon-wrapper']}>
            <div
              className={s['app-icon']}
              style={{ color: theme.palette.secondary.dark }}
            >
              {this.props.icon}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(s)(CmpApplicationPart);
