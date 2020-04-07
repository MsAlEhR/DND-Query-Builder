import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import OkIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import AddIcon from "@material-ui/icons/AddCircle";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import RefreshIcon from "@material-ui/icons/Refresh";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
  wrapper: {
    margin: theme.spacing.unit,
    position: "relative"
  },
  buttonProgress: {
    color: theme.palette.primary.main,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
});

class CmpIconButton extends React.Component {
  getIcon = iconType => {
    switch (iconType) {
      case "accept":
        return <OkIcon />;
      case "reject":
        return <CancelIcon />;
      case "add":
        return <AddIcon />;
      case "edit":
        return <EditIcon />;
      case "delete":
        return <DeleteIcon />;
      case "refresh":
        return <RefreshIcon />;
      default:
        return null;
    }
  };

  render() {
    const { caption, iconType, loadable, loading, classes ,disabled} = this.props;
    const buttonOptions = {
      caption: this.props.caption,
      type: this.props.type,
      onClick: this.props.onClick,
      size: this.props.size,
      className: this.props.className
    };
    return (
      <span className={classes.wrapper}>
        <Button
          variant="contained"
          color={this.props.color || "primary"}
          // disabled={loadable ? loading : false}
          disabled={disabled}
          {...buttonOptions}
        >
          {caption}
          {this.getIcon(iconType)}
        </Button>
        {loadable && loading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </span>
    );
  }
}

export default withStyles(styles)(CmpIconButton);
