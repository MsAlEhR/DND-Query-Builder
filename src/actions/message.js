import { OPEN_MESSAGE, CLOSE_MESSAGE } from '../constants/actions';

export function openMessage(message, messageType, isMessageCode = false) {
  return {
    type: OPEN_MESSAGE,
    payload: message,
    messageType,
    isMessageCode,
  };
}

export function closeMessage() {
  return {
    type: CLOSE_MESSAGE,
  };
}
