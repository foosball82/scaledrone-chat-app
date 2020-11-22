import React, { useState, useEffect, useRef } from "react";
import "./Messages.style.css";
import toggleTimestamp from "./toggleTimestamp";
import { convertUnixTimestamp } from "../../utilities/helpers";
import { notificationSound } from "../../utilities/helpers";
import classNames from "./classNames";

export default function Messages({
  messages,
  thisMember,
  initialMemberId,
  chatTheme,
  showHistory
}) {
  const [msgTime, setMsgTime] = useState({
    member_id: [],
    msg_id: []
  });

  const room_messages = messages.filter(
    (message) => message.member.clientData.room === thisMember.room
  );

  let sameMember = "";
  const bottomDiv = useRef();

  useEffect(() => {
    bottomDiv.current.scrollIntoView();
  }, [messages.length]);

  function toggleTime(member_id, msg_id) {
    toggleTimestamp(member_id, msg_id, msgTime, setMsgTime);
  }

  function renderMessage(message) {
    const { member, data, timestamp, id } = message;
    const classNameArgs = [
      message,
      thisMember,
      initialMemberId,
      msgTime,
      chatTheme
    ];

    const divMemberData = (
      <div className={classNames(...classNameArgs, "classNameMemberData")}>
        {member.clientData.color ? (
          <span
            className="msg-list__avatar--random"
            style={{ backgroundColor: member.clientData.color }}
          />
        ) : (
          <img
            className="msg-list__avatar"
            src={member.clientData.avatar}
            alt="user-avatar"
          />
        )}

        <div className={classNames(...classNameArgs, "classNameInfoContainer")}>
          <span className="msg-list__username">
            {member.clientData.username}
          </span>
          <img
            className={classNames(...classNameArgs, "classNameTimeInfo")}
            src="./svg/time-info.svg"
            alt="time-info"
            onClick={(e) => toggleTime(member.id, false)}
          />
        </div>
      </div>
    );

    const divTextContainer = (
      <div
        className={classNames(...classNameArgs, "classNameTextContainer")}
        onClick={(e) => toggleTime(member.id, id)}
      >
        <div
          className={
            chatTheme === "dark"
              ? "msg-list__text"
              : "msg-list__text msg-list__text--light"
          }
          title={convertUnixTimestamp(timestamp, "date")}
        >
          {data}
        </div>
        <div className={classNames(...classNameArgs, "classNameTimestamp")}>
          {convertUnixTimestamp(timestamp, "time").slice(0, 5)}
        </div>
      </div>
    );

    const listItem =
      sameMember !== member.id /* && sameMember !== initialMemberId */ ? (
        <li
          className={classNames(...classNameArgs, "classNameMsg", showHistory)}
          key={id}
          data-id={member.id}
        >
          {message.history || message.previous ? null : (
            <audio autoPlay src={notificationSound} />
          )}
          <div className="msg-list__msg-container">
            {divMemberData}
            {divTextContainer}
          </div>
        </li>
      ) : (
        <li
          className={classNames(...classNameArgs, "classNameMsg", showHistory)}
          key={id}
          data-id={member.id}
        >
          {message.history || message.previous ? null : (
            <audio autoPlay src={notificationSound} />
          )}
          {divTextContainer}
        </li>
      );
    sameMember = member ? member.id : null;
    return listItem;
  }

  return (
    <ul
      className={chatTheme === "dark" ? "msg-list" : "msg-list msg-list--light"}
    >
      {room_messages.map((m) => renderMessage(m))}
      <div ref={bottomDiv}></div>
    </ul>
  );
}
