export interface MessageInfo {
    name?: any;
    message?: any;
    messageType?: MessageType;
    date?: any;
  }

  export enum MessageType {
    sendMessage = 0,
    receiveMessage = 1
  }
  