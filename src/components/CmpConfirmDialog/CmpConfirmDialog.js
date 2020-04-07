import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {injectIntl} from 'react-intl';
import cn from 'classnames';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DisagreeIcon from '@material-ui/icons/ThumbDown';
import AgreeIcon from '@material-ui/icons/ThumbUp';
import NotificationIcon from '@material-ui/icons/NotificationImportant';
import CmpFontWrapper from '../CmpFontWrapper';
import s from './CmpConfirmDialog.css';
import theme from '../../theme/theme';

const titleStyle = {
  padding: '5px 24px',
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.primary.contrastText,
  height: 30,
};

class CmpConfirmDialog extends React.Component {
  handleClose = status => {
    this.props.onClose(status);
  };

  render() {
    const { intl, title, description, open, dir, className } = this.props;
    return (
      <Dialog
        style={{ direction: dir }}
        open={open}
        disableBackdropClick
        disableEscapeKeyDown
        className={cn(s.dialog, className)}
        maxWidth="sm"
        fullWidth={false}
      >
        <CmpFontWrapper>
          <DialogTitle
            style={titleStyle}
            disableTypography
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <NotificationIcon />
              <span>{title}</span>
            </div>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <div className={s.content}>{description}</div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.handleClose(false)}
              autoFocus
              variant="contained"
              color="primary"
            >
              {intl.formatMessage({ id: 'keywords.disagree' })}
              <DisagreeIcon />
            </Button>
            <Button
              onClick={() => this.handleClose(true)}
              variant="contained"
              color="primary"
            >
              {intl.formatMessage({ id: 'keywords.agree' })}
              <AgreeIcon />
            </Button>
          </DialogActions>
        </CmpFontWrapper>
      </Dialog>
    );
  }
}

export default injectIntl(withStyles(s)(CmpConfirmDialog));
