import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import normalizeCss from "normalize.css";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { IntlProvider } from "react-intl";
import { getTheme } from "../../theme/theme";
import { PageType } from "../../constants/general";
import CmpLayout from "../CmpLayout";
import RTL from "../RTL";
import CmpRawLayout from "../CmpRawLayout";
import s from "./AppLayout.css";

class AppLayout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  render() {
    const {
      dir,
      lang,
      messages,
      type,
    } = this.props;


    let component;

      switch (type) {
        case PageType.RAW:
          component = <CmpRawLayout> {this.props.children}</CmpRawLayout>;
          break;
        default: {
          component = (
            <CmpLayout ids={this.props.ids}>
              {this.props.children}
            </CmpLayout>
          );
        }
      }

    return (
      <IntlProvider locale={lang} messages={messages}>
        <RTL>
          <MuiThemeProvider theme={getTheme(dir)}>
            <div className={s[`${dir}-font`]}>{component}</div>
          </MuiThemeProvider>
        </RTL>
      </IntlProvider>
    );
  }
}

const mapStateToProps = state => ({
  lang: state.locale.data.lang,
  messages: state.locale.data.messages,
  dir: state.locale.data.dir,
});
export default connect(mapStateToProps)(withStyles(normalizeCss, s)(AppLayout));
