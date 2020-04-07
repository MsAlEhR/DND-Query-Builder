import {
  ADD_APPLICATION_TO_PATH,
  ADD_ROLE_GROUP_TO_PATH,
  ADD_ROLE_TO_PATH,
  ADD_USER_ROLE_GROUP_TO_PATH,
} from '../constants/actions';

const initialState = {
  application: '',
  roleGroup: '',
  role: '',
  userRoleGroup: '',
};

export default function path(state = initialState, action) {
  switch (action.type) {
    case ADD_APPLICATION_TO_PATH:
      return {
        application: action.payload,
      };
    case ADD_ROLE_GROUP_TO_PATH:
      return {
        application: state.application,
        roleGroup: action.payload,
      };
    case ADD_ROLE_TO_PATH:
      return {
        application: state.application,
        roleGroup: state.roleGroup,
        role: action.payload,
      };
    case ADD_USER_ROLE_GROUP_TO_PATH:
      return {
        userRoleGroup: action.payload,
      };
    default:
      return state;
  }
}
