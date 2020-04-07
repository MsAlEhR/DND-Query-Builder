import React from "react";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import normalizeCss from "normalize.css";
import Paper from "@material-ui/core/Paper";
import { injectIntl } from "react-intl";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import s from "./CmpCard.css";
import theme from "../../theme/theme";
import CmpCardHeader from "../CmpCardHeader";
import LinearProgress from "@material-ui/core/LinearProgress";

const headerStyle = {
  backgroundColor: theme.palette.primary.main,
  height: 80,
  position: "relative",
  width: "98%",
  display: "flex",
  alignItems: "center",
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: -25
};
const loaderStyle = {
  height: 10
};

const cardStyle = {
  border: 0,
  backgroundColor: "unset",
  boxShadow: "none"
};

const contentStyle = {
  paddingRight: "5%",
  paddingLeft: "5%"
};

const wrapperStyle = {
  minHeight: "32.5vw",
  marginTop: 20,
  position: "relative",
  display: "flex",
  flexDirection: "column"
};

const actionsStyle = {
  float: "left",
  height: 60
};

const dividerStyle = {
  borderTop: "1px solid",
  borderColor: theme.palette.primary.light,
  margin: "auto 1%"
};

const unClickableLayerStyle = {
  pointerEvents: "none",
  backgroundColor: "rgba(0, 0, 0, 0.05)"
};

class CmpCard extends React.Component {
  render() {
    return (
      <Paper
        style={
          this.props.loading
            ? { ...unClickableLayerStyle, ...wrapperStyle }
            : this.props.minHeight? {...wrapperStyle, minHeight: 0}:{...wrapperStyle}
        }
      >
        {this.props.header ? (
          <Paper style={headerStyle}>
            <CmpCardHeader label={this.props.header.text} />
          </Paper>
        ) : null}
        <Card style={cardStyle}>
          {this.props.loading || false ? (
            <LinearProgress
              style={loaderStyle}
              variant="query"
              color="secondary"
            />
          ) : null}

          <div>
            <CardContent style={contentStyle}>{this.props.content}</CardContent>
            {this.props.actions ? <div style={dividerStyle} /> : null}
            {this.props.actions ? (
              <CardActions style={actionsStyle}>
                {this.props.actions}
              </CardActions>
            ) : null}
          </div>
        </Card>
      </Paper>
    );
  }
}

export default injectIntl(withStyles(normalizeCss, s)(CmpCard));
