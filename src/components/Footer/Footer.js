import React from "react";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./Footer.css";
import { injectIntl } from "react-intl";
import theme from "../../theme/theme";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";

const iscStyle = {
  color: theme.palette.primary.contrastText,
  padding: "0 10px"
};

class Footer extends React.Component {
  render() {
    const { intl, dir, authentication } = this.props;
    return (
      <Grid container style={{ direction: dir }}>
        <Grid item xs={12} md={4}>
          <div
            style={{ ...iscStyle, textAlign: dir === "rtl" ? "right" : "left" }}
          >
            {/* {`${intl.formatMessage({ id: 'component.footer.currentUser' })} : ${ */}
            {/*  authentication.firstName */}
            {/* } ${authentication.lastName}`} */}
          </div>
        </Grid>
        <Grid item xs={12} md={4} />
        <Grid item xs={12} md={4}>
          <div
            style={{ ...iscStyle, textAlign: dir === "rtl" ? "left" : "right" }}
          >
            {intl.formatMessage({ id: "keywords.isc" })}
          </div>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  authentication: state.authentication.data
});

export default injectIntl(connect(mapStateToProps)(withStyles(s)(Footer)));
