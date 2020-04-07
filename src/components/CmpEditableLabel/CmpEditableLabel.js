import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { injectIntl } from 'react-intl';
import normalizeCss from 'normalize.css';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckIcon from '@material-ui/icons/Check';
import Popover from '@material-ui/core/Popover';
import Chip from '@material-ui/core/Chip';
import s from './CmpEditableLabel.css';

class CmpEditableLabel extends React.Component {
  constructor(props) {
    super(props);
    this.titleRef = React.createRef();
    this.nameRef = React.createRef();
    this.state = {
      title: this.props.title,
      name: this.props.name,
      anchorEl: null,
    };
  }

  handleUserClick = event => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  render() {
    const { dir, intl, className, onChange } = this.props;
    const open = Boolean(this.state.anchorEl);
    return (
      <span>
        <span className={s.title}>
          <span>
            <span>{this.state.title}</span> <Chip label={this.state.name} />
          </span>
          <EditIcon className={s['oper-icon']} onClick={this.handleUserClick}>
            edit
          </EditIcon>
        </span>
        <Popover
          id="simple-popper"
          open={open}
          anchorEl={this.state.anchorEl}
          onClose={this.handleClose}
          disableBackdropClick
          disableEscapeKeyDown
          modal
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <div style={{ height: 50, direction: dir, padding: 10 }}>
            <div className={s.title}>
              <span style={{ width: 50 }}>Title</span>
              <input
                type="text"
                defaultValue={this.props.title}
                ref={this.titleRef}
              />
              <CheckIcon
                className={s['oper-icon']}
                onClick={() => {
                  this.setState(
                    {
                      title: this.titleRef.current.value,
                      name: this.nameRef.current.value,
                      anchorEl: false,
                    },
                    () =>
                      onChange({
                        title: this.state.title,
                        name: this.state.name,
                      }),
                  );
                }}
              >
                ok
              </CheckIcon>
              <CancelIcon
                className={s['oper-icon']}
                onClick={() => {
                  this.setState({
                    anchorEl: false,
                  });
                }}
              >
                cancel
              </CancelIcon>
            </div>
            <div style={{ display: 'flex' }}>
              <span style={{ width: 50 }}>Name</span>
              <input
                defaultValue={this.props.name}
                ref={this.nameRef}
                type="text"
              />
            </div>
          </div>
        </Popover>
      </span>
    );
  }
}

export default injectIntl(withStyles(normalizeCss, s)(CmpEditableLabel));
