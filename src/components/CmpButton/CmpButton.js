import React from "react";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fab from "@material-ui/core/Fab";

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

class CmpButton extends React.Component {
  render() {
    const { caption, icon, loadable, loading, classes, variant } = this.props;
    const buttonOptions = {
      caption: this.props.caption,
      type: this.props.type,
      onClick: this.props.onClick,
      size: this.props.size,
      className: this.props.className
    };
    return (
      <span className={classes.wrapper}>
        <Fab
          variant={variant || "extended"}
          color="primary"
          disabled={loadable ? loading : false}
          {...buttonOptions}
        >
          {caption} {icon}
        </Fab>
        {loadable && loading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </span>
    );
  }
}

export default withStyles(styles)(CmpButton);
