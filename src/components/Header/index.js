import React from "react";
import "./Header.style.css";

export default function Header({ room, whoIsTyping }) {
  const tooLong = whoIsTyping.users.join(", ").length > 60 ? true : false;
  return (
    <div className="chat__header">
      <h1 className="header__heading">
        Scaledrone Chat - <span className="header__room">{room}</span>
        <br />
        <span className="header__typing">
          {tooLong
            ? `${whoIsTyping.users.slice(0, 1)} and ${
                whoIsTyping.users.length - 1
              } others are typing...`
            : whoIsTyping.users.length === 1
            ? whoIsTyping.users + " is typing..."
            : whoIsTyping.users.length === 2
            ? whoIsTyping.users.join(" and ") + " are typing..."
            : whoIsTyping.users.length === 3
            ? `${whoIsTyping.users
                .slice(0, whoIsTyping.users.length - 1)
                .join(", ")} and ${
                whoIsTyping.users[whoIsTyping.users.length - 1]
              } are typing...`
            : whoIsTyping.users.length > 3
            ? `${whoIsTyping.users.slice(0, 2).join(", ")} and ${
                whoIsTyping.users.length - 2
              } others are typing...`
            : null}
        </span>
      </h1>
    </div>
  );
}
