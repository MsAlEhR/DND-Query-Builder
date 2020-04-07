import React from "react";
import withStyle from "isomorphic-style-loader/lib/withStyles";
import { connect } from "react-redux";
import normalizeCss from "normalize.css";
import { FormattedMessage, injectIntl } from "react-intl";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Dashboard from "@material-ui/icons/Dashboard";
import Subject from "@material-ui/icons/Subject";
import MenuIcon from "@material-ui/icons/Menu";
import GavelIcon from "@material-ui/icons/Gavel";
import FeaturedPlayListIcon from "@material-ui/icons/FeaturedPlayList";
import StarBorder from "@material-ui/icons/StarBorder";
import LanguageIcon from "@material-ui/icons/Language";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SettingsIcon from "@material-ui/icons/Settings";
import Popover from "@material-ui/core/Popover";
import theme from "../../theme/theme";
import Avatar from "@material-ui/core/Avatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SendIcon from "@material-ui/icons/Send";
import { Roles } from "../../constants/general";
import { CONTEXT_PATH } from "../../constants/local-urls";
import HasPermission, {
  hasPermission,
  hasChildPermissions,
  hasAnyPermission
} from "../CmpAccessControl";
import { goTo } from "../../util/generalUtil";
import { closeMessage } from "../../actions/message";
import { changeLocale } from "../../actions/locale";
import SideNav from "@trendmicro/react-sidenav";
import CmpNotification from "../CmpNotification";
import CmpFontWrapper from "../CmpFontWrapper";
import history from "../../history";

import { responseIsErrorFree } from "../../util/actionUtil";
import s from "./CmpLayout.css";
import { withStyles } from "@material-ui/core/styles";
import styles from "./CmpLayoutCS.js";
import cs from "classnames";
import cn from "classnames";

const headerStyle = {
  backgroundColor: theme.palette.primary.dark,
  display: "flex",
  justifyContent: "center"
};

const footerStyle = {
  backgroundColor: theme.palette.primary.dark
};

const userInfoStyle = {
  backgroundColor: theme.palette.primary[300]
};

const iconStyle = {
  fontSize: 30
};

const sideBarMenuWidthOpen = 250;
const sideBarMenuWidthClose = 74;

class CmpLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      anchorEl: null,
      anchorMenu: null,
      Nested: false,
      selectedItem: "rules"
    };
  }

  handleUserClick = event => {
    this.setState({
      anchorEl: event.currentTarget
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null
    });
  };
  handleCloseMessage = () => {
    this.props.closeMessage();
  };

  redirectToPage = (selected, role) => {
    switch (selected) {
      case "home":
        switch (role) {
          case Roles.UM_ADMIN:
            goTo(`${CONTEXT_PATH}/admin`);
            break;
          case Roles.APP_ADMIN:
            goTo(`${CONTEXT_PATH}/dashboard`);
            break;
          case Roles.ROLE_GROUP_ADMIN:
            goTo(
              `${CONTEXT_PATH}/rolegroup?id=${
                this.props.authentication.data.responsiblePartId
              }`
            );
            break;
          default:
            break;
        }
        break;
      default:
    }
  };
  handleMenu = event => {
    this.setState({ anchorMenu: event.currentTarget });
  };
  closeMenu = () => {
    this.setState({ anchorMenu: null });
  };

  goToDashboard = () => {

      goTo(`${CONTEXT_PATH}/rule-management`);

  };

  // card

  handleNested = () => {
    this.setState({ Nested: !this.state.Nested });
  };
  handleClickItem = (event, item) => {
    this.setState({ selectedItem: item });
    history.push(`/${item}`);
  };

  render() {
    const { classes } = this.props;

    const authentication = this.props.authentication.data;
    const role = authentication.role;
    let smallAvatar = (
      <AccountCircleIcon style={iconStyle} onClick={this.handleUserClick} />
    );
    let bigAvatar = (
      <AccountCircleIcon
        style={{ fontSize: 40 }}
        onClick={this.handleUserClick}
      />
    );
    if (authentication.avatar !== undefined && authentication.avatar !== null) {
      smallAvatar = (
        <Avatar
          style={{ height: 30, width: 30 }}
          src={`data:image/png;base64,${authentication.avatar}`}
          onClick={this.handleUserClick}
        />
      );
      bigAvatar = (
        <Avatar
          style={{ height: 40, width: 40 }}
          src={`data:image/png;base64,${authentication.avatar}`}
          onClick={this.handleUserClick}
        />
      );
    }
    const { intl, dir, message, lang } = this.props;
    const open = Boolean(this.state.anchorEl);

    const dashboardParts = [
      [`${CONTEXT_PATH}/admin`, "keywords.dashboard", "um-admin-dashboard"],
      [`${CONTEXT_PATH}/dashboard`, "keywords.dashboard", "app-admin-dashboard"]
    ];
    // const uiAuthority = this.props.authentication.data.uiAuthority || {};
    // const auths = this.props.user.data.authorities;
    const auths = ["ruleManagement", "behaviorManagement"];

    return (
      <div className={s["grid-container"]}>
        <AppBar
          position="static"
          style={{ direction: dir, ...headerStyle }}
          className={s["page-header"]}
        >
          <Toolbar className={s["page-header-content"]}>
            <div className={s["page-header-grid"]} style={{ width: "100%" }}>
              <div style={{ flexGrow: 1 }} />
              <div
                className={s["page-header-part1"]}
                style={{ backgroundColor: "none" }}
              >
                <div>
                  {/*/!* <div className={s['logo-img']} /> *!/*/}
                  {/*<label className={s["logo-title"]}>*/}
                    {/*<FormattedMessage id="AppTitle" />*/}
                  {/*</label>*/}
                </div>
                {/* <div> */}
                {/*  <div className={s[`logo_${lang}`]} /> */}
                {/* </div> */}
              </div>

              <div className={s["page-header-part3"]}>
                <IconButton color="inherit">
                  <Dashboard
                    style={iconStyle}
                    onClick={() => this.goToDashboard()}
                  />
                </IconButton>
                <IconButton color="inherit">
                  <LanguageIcon
                    style={iconStyle}
                    onClick={() => this.changeLocale()}
                  />
                </IconButton>
                <IconButton color="inherit">{smallAvatar}</IconButton>
              </div>
            </div>
          </Toolbar>
        </AppBar>
        <Popover
          id="simple-popper"
          open={open}
          anchorEl={this.state.anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
        >
          <div style={{ maxWidth: 400, direction: dir }}>
            <div>
              <div style={{ ...userInfoStyle }}>
                <CmpFontWrapper>
                  <List>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>{bigAvatar}</ListItemAvatar>
                      <ListItemText
                        primary={`${authentication.firstName} ${
                          authentication.lastName
                        }`}
                        secondary={
                          <React.Fragment>
                            <Typography component="span" color="textPrimary">
                              {authentication.email}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <ListItem button>
                      <ListItemIcon>
                        <SettingsIcon />
                        <ListItemText
                          inset
                          primary={intl.formatMessage({
                            id: "keywords.setting"
                          })}
                        />
                      </ListItemIcon>
                    </ListItem>
                    <ListItem button onClick={this.logout}>
                      <ListItemIcon>
                        <AccountCircleIcon />
                        <ListItemText
                          inset
                          primary={intl.formatMessage({
                            id: "keywords.logout"
                          })}
                        />
                      </ListItemIcon>
                    </ListItem>
                  </List>
                </CmpFontWrapper>
              </div>
            </div>
          </div>
        </Popover>
        <CmpNotification
          open={message.open}
          message={
            // eslint-disable-next-line no-nested-ternary
            message.message !== ""
              ? message.isMessageCode
                ? intl.formatMessage({ id: message.message })
                : message.message
              : ""
          }
          type={message.type}
          onClose={this.props.closeMessage}
          dir={dir}
        />
        <div
          style={{
            direction: dir,
            display: "grid",
            gridTemplateColumns: `${
              this.state.open ? sideBarMenuWidthOpen : sideBarMenuWidthClose
            }px calc(100vw - ${
              this.state.open ? sideBarMenuWidthOpen : sideBarMenuWidthClose
            }px)`
          }}
        >
          <div style={{ position: "relative" }} className={s["page-menu-bar"]}>
            <SideNav
              expanded={this.state.open}
              className={cn(
                dir === "rtl" ? "side-bar-rtl" : "",
                "side-bar",
                classes.background,
                s["page-menu-bar-vert"]
              )}
              style={{
                left: dir === "rtl" ? "unset" : 0,
                direction: dir,
                // backgroundColor: theme.palette.primary.main,
                backgroundImage: "url(" + "/image/server2.jpg" + ")",
                overflowY: "auto",
                minWidth: "100%"
              }}
              onToggle={b => this.toggleDrawer(b)}
              onSelect={selected => this.redirectToPage(selected, role)}
            >
              <SideNav.Toggle />
            </SideNav>
          </div>
          <div className={s["page-content"]}>
            {this.props.children}
            <div
              style={{ backgroundColor: theme.palette.primary.light }}
              className={s["page-menu-bar-horz"]}
            >
              <IconButton
                aria-label="more"
                aria-controls="long-menu"
                color="primary"
                onClick={this.handleMenu}
                aria-haspopup="true"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="long-menu"
                anchorEl={this.state.anchorMenu}
                keepMounted
                open={Boolean(this.state.anchorMenu)}
                onClose={this.closeMenu}
                paperProps={{
                  style: {
                    maxHeight: 200,
                    width: 200
                  }
                }}
              >
                <MenuItem>
                  {" "}
                  {intl.formatMessage({
                    id: "page.ruleManagement.rules"
                  })}{" "}
                </MenuItem>
                <MenuItem>
                  {" "}
                  {intl.formatMessage({
                    id: "page.behaviorManagement.behaviors"
                  })}{" "}
                </MenuItem>
              </Menu>
            </div>
          </div>
        </div>
        <div style={footerStyle} className={s["page-footer"]}>
          <div className={s["page-footer-content"]}>
            <div className={s["page-footer-part1"]} />
            <div className={s["page-footer-part2"]}>
              {/* <label style={{ color: 'white' }}> */}
              {/*  {intl.formatDate(this.props.user.data.currentDate, { */}
              {/*    weekday: 'long', */}
              {/*    year: 'numeric', */}
              {/*    month: 'long', */}
              {/*    day: '2-digit', */}
              {/*  })} */}
              {/* </label> */}
            </div>
            <div className={cs(s["page-footer-part3"], classes.iscStyle)}>
              <div style={{ textAlign: dir === "rtl" ? "left" : "right" }}>
                {intl.formatMessage({ id: "keywords.isc" })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  toggleDrawer = open => {
    this.setState({
      open
    });
  };

  goTo = url => {
    history.push(url);
  };

  changeLocale = () => {
    this.props.changeLocale();
  };

  logout = () => {
    const data = {
      token: this.props.authentication.data.token,
      username: this.props.authentication.data.username
    };

    goTo(`${CONTEXT_PATH}/login`);

    // this.props.logout(data).then(e => {
    //   if (responseIsErrorFree(this.props.authentication.errorType)) {
    //     this.props.clearToken();
    //     goTo(`${CONTEXT_PATH}/login`);
    //   }
    // });
  };
}

const mapStateToProps = state => ({
  dir: state.locale.data.dir,
  lang: state.locale.data.lang,
  flag: state.locale.data.flag,
  message: state.message,
  path: state.path
});

const mapDispatchToProps = dispatch => ({
  changeLocale: () => dispatch(changeLocale()),
  closeMessage: () => dispatch(closeMessage())
});

export default injectIntl(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyle(normalizeCss, s)(withStyles(styles)(CmpLayout)))
);
