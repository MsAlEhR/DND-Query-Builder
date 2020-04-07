import React from "react";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import LinearProgress from "@material-ui/core/LinearProgress";
import normalizeCss from "normalize.css";
import { injectIntl } from "react-intl";
import s from "./CmpPageLoading.css";

class CmpPageLoading extends React.Component {
  render() {
    let component = <div />;
    switch (this.props.pageStatus) {
      case "LOADING":
        component = <LinearProgress />;
        break;
      case "ERROR_OCCURRED":
        component = <div className={s.content}>ERROR OCCURRED</div>;
        break;
      case "DATA_FETCHED":
        component = <div className={s.content}>{this.props.children}</div>;
        break;
      default:
        component = <div className={s.content}>Something Bad</div>;
    }

    return component;
  }
}

export default injectIntl(withStyles(normalizeCss, s)(CmpPageLoading));
