import React from "react";
import { ChatFeed, Message } from "react-chat-ui";

export default ({ messages, username }) => (
  <ChatFeed
    maxHeight={window.innerHeight - 80}
    messages={messages.map(
      msg =>
        new Message({
          id: msg.handle === username ? 0 : msg.messageId,
          senderName: msg.handle,
          message: msg.body,
        }),
    )}
    isTyping={false}
    showSenderName
    bubblesCentered={false}
  />
);
