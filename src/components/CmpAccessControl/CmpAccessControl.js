import React from "react";
import { connect } from "react-redux";
import history from "../../history";

export const hasPermission = (authorities, permission) =>
  authorities.includes(permission);

export const hasChildPermissions = (authorities, childPermissions) => {
  let has = false;
  for (const cp of childPermissions) {
    if (authorities.includes(cp)) {
      has = true;
      break;
    }
  }
  return has;
};

export const hasAnyPermission = authorities =>
  authorities.length > 1 ||
  (authorities.length > 0 && !authorities.includes("UserPanel"));

class HasPermission extends React.Component {
  render() {
    const { permission, renderNoAccess, redirectNoAccess } = this.props;

    let component;
    if (hasPermission(this.props.authorities, permission))
      component = this.props.children;
    else if (renderNoAccess !== undefined) component = renderNoAccess;
    else {
      history.push(redirectNoAccess);
      component = null;
    }
    return component;
  }
}

HasPermission.defaultProps = {
  redirectNoAccess: "/"
};

const mapStateToProps = state => ({
  authorities: state.userData.data.authorities
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HasPermission);
