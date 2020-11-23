import React from "react";
import "./Header.style.css";

export default function Header({ room, whoIsTyping, members }) {
  const tooLong = whoIsTyping.users.join(", ").length > 60 ? true : false;
  return (
    <div>
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
      <div className="onlineMembers-container">
        <span>Online:</span>
        <ul className="onlineMembers">
          {members.map((member) => (
            <li className="onlineMembers__member" key={member.id}>
              {member.clientData.color ? (
                <span
                  className="onlineMembers__color"
                  style={{ backgroundColor: member.clientData.color }}
                />
              ) : (
                <img
                  className="onlineMembers__avatar"
                  src={member.clientData.avatar}
                  alt="user-avatar"
                />
              )}
              <span>{member.clientData.username}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
