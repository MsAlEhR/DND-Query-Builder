import React from "react";
import withStyle from "isomorphic-style-loader/lib/withStyles";
import normalizeCss from "normalize.css";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { Field, Form, Formik } from "formik";
import { changeLocale, setLocale } from "../../actions/locale";
import s from "./Login.css";
import { goTo } from "../../util/generalUtil";
// import { responseIsErrorFree } from "../../util/actionUtil";
// import { Roles } from "../../constants/general";
// import { CONTEXT_PATH } from "../../constants/local-urls";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import { handleMessage } from "../../util/messageUtil";
import { ErrorType } from "../../constants/general";

const styles = theme => ({
  inputCss: {
    color: "rgb(3,3,12)",
    "&:focus": { color: "rgb(255,255,255)" }
  },
  cssLabel: {
    color: "rgb(255,255,255)",
    fontSize: 20
  }
});

class Login extends React.Component {
  constructor(props) {
    super(props);
  }



  render() {
    const { intl, dir } = this.props;
    const { classes } = this.props;

    return (
      <div className={s.App}>
        <div className={s["container-login100"]}>
          <div className={s["wrap-login100"]}>
                <div className={s["container-login100-form-btn"]}>
                  <button
                    className={s["login100-form-btn"]}
                    id="btn"
                    name="login"
                    type="submit"
                    onClick={()=> goTo("/add-rule")}
                  >
                   Start
                  </button>
                </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export default injectIntl(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyle(normalizeCss, s)(withStyles(styles)(Login)))
);
