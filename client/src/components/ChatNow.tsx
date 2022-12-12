import React from 'react';
import { ReactComponent as Chat } from '../assets/icons/Chat.svg';

function ChatNow() {
  return (
    <button className="chat-now" type="button">
      <span className="need-assitance-text">
        Need assistance?
      </span>
      <Chat />
      <span className="chat-now-text">
        Chat Now
      </span>
    </button>
  );
}

export default ChatNow;
