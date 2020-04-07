import { isNotEmpty } from './generalUtil';
import { MessageType } from '../constants/message';
import { ErrorType } from '../constants/general';

function showMessage(mess, type, duration = 0) {
  switch (type) {
    case MessageType.INFO:
      break;
    case MessageType.SUCCESS:
      break;
    case MessageType.ERROR:
      break;
    case MessageType.WARNING:
      break;
    default:
  }
}

function showNotification(type, config) {
}

export function handleBusinessMessage(type, config) {
  const cfg = {
    message: 'message',
    description: 'description',
    duration: 0,
    className: config.dir === 'rtl' ? 'notification-rtl' : 'notification-ltr',
    placement: config.dir === 'rtl' ? 'topRight' : 'topLeft',
    ...config,
  };
  showNotification(type, cfg);
}

export function handleUnexpectedError(messageKey, intl, dir) {
  const message = intl.formatMessage({ id: messageKey });
  showMessage(message, MessageType.ERROR, 5);
}

export function handleMessage(errorType, message, intl, dir) {
  if (errorType === null) {
    if (isNotEmpty(message)) {
      const title = intl.formatMessage({ id: 'keywords.info' });
      handleBusinessMessage(MessageType.INFO, {
        message: title,
        description: message,
        dir,
      });
    }
  } else if (errorType === ErrorType.BUSINESS_ERROR) {
    const title = intl.formatMessage({ id: 'keywords.error' });
    handleBusinessMessage(MessageType.ERROR, {
      message: title,
      description: message,
      dir,
    });
  } else if (errorType === ErrorType.UN_AUTHENTICATED) {
    handleUnexpectedError(message, intl, dir);
  } else if (errorType === ErrorType.SERVER_ERROR) {
    handleUnexpectedError(message, intl, dir);
  } else if (errorType === ErrorType.UNEXPECTED_ERROR) {
    handleUnexpectedError(message, intl, dir);
  }
}
