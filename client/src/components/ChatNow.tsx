import React from 'react';
import { ReactComponent as Chat } from '../assets/icons/Chat.svg';

interface ChatNowProps {
  className?: string;
}

function ChatNow({
  className,
}: ChatNowProps) {
  return (
    <button className={`chat-now ${className}`} type="button">
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

ChatNow.defaultProps = {
  className: '',
};

export default ChatNow;
