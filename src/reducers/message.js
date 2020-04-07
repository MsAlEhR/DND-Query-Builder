import { CLOSE_MESSAGE, OPEN_MESSAGE } from '../constants/actions';
import { MessageType } from '../constants/general';

const initialState = {
  message: '',
  type: MessageType.INFO,
  open: false,
  isMessageCode: false,
};

export default function message(state = initialState, action) {
  switch (action.type) {
    case OPEN_MESSAGE:
      return {
        message: action.payload,
        type: action.messageType,
        open: true,
        isMessageCode: action.isMessageCode,
      };
    case CLOSE_MESSAGE:
      return initialState;
    default:
      return state;
  }
}
