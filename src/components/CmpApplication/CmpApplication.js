import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { injectIntl } from 'react-intl';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { connect } from 'react-redux';
import CardActions from '@material-ui/core/CardActions';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import normalizeCss from 'normalize.css';
import CmpConfirmDialog from '../CmpConfirmDialog';
import { goTo } from '../../util/generalUtil';
import { CONTEXT_PATH } from '../../constants/local-urls';
import theme from '../../theme/theme';
import s from './CmpApplication.css';

const wrapperStyle = {
  display: 'flex',
  flexDirection: 'column',
  marginTop: 30,
  overflow: 'visible',
};

const headerStyle = {
  marginLeft: 5,
  marginRight: 5,
  marginTop: -15,
  backgroundColor: theme.palette.primary.main,
  borderRadius: 5,
  padding: '0 5px',
  textAlign: 'center',
  minHeight: 70,
  boxShadow:
    '0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)',
  cursor: 'pointer',
};

const contentStyle = {
  minHeight: 60,
};

const titleStyle = {
  color: theme.palette.primary.contrastText,
  textDecoration: 'none',
  fontSize: 18,
};

class CmpApplication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openDeleteConfirmationDialog: false,
    };
  }

  onDeleteConfirmationDialogClosed = status => {
    this.setState({
      openDeleteConfirmationDialog: false,
    });
    if (status === true) {
      this.props.onDelete();
    }
  };

  editApplication = id => {
    goTo(`${CONTEXT_PATH}/admin/application?id=${id}`);
  };

  render() {
    const {
      id,
      name,
      title,
      description,
      onEdit,
      dir,
      intl,
      className,
    } = this.props;
    return (
      <div>
        <Card className={className} style={wrapperStyle}>
          <CardHeader
            onClick={() => goTo(`${CONTEXT_PATH}/admin/application?id=${id}`)}
            style={headerStyle}
            className={s.header}
            title={<span style={titleStyle}>{title}</span>}
          />
          <CardContent style={contentStyle}>
            <div>
              <div>{name}</div>
              <div>{description}</div>
            </div>
          </CardContent>
          <CardActions disableActionSpacing>
            <Fab color="primary" variant="round" aria-label="Add" size="small">
              <DeleteIcon
                onClick={() => {
                  this.setState({
                    openDeleteConfirmationDialog: true,
                  });
                }}
              />
            </Fab>
          </CardActions>
        </Card>
        <CmpConfirmDialog
          title={intl.formatMessage({
            id: 'keywords.warning',
          })}
          description={intl.formatMessage({
            id: 'component.application.delete.message',
          })}
          open={this.state.openDeleteConfirmationDialog}
          onClose={status => this.onDeleteConfirmationDialogClosed(status)}
          dir={dir}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  application: state.applicationGet,
});

const mapDispatchToProps = dispatch => ({});

export default injectIntl(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withStyles(normalizeCss, s)(CmpApplication)),
);
