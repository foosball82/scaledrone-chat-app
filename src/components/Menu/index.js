import React, { useState } from "react";
import "./Menu.style.css";
import { CONFIG } from "../../utilities/config";
import {
  changeTheme,
  handleSaveChat,
  handleShowHistory,
  resetProfile,
  changeRoom,
  handleExit
} from "./menu_functions";

export default function Menu({
  chatTheme,
  setChatTheme,
  saveChat,
  setSaveChat,
  showHistory,
  setShowHistory,
  chat,
  setChat,
  drone,
  setDrone,
  setRoomReady,
  setRoomChange
}) {
  const [showRooms, setShowRooms] = useState(false);

  const showRoomList = () => {
    if (!showRooms) setShowRooms(true);
    else setShowRooms(false);
  };

  const roomClass = showRooms
    ? "main-nav__room-list-item"
    : "main-nav__room-list-item--hide";

  const changeRoomArgs = [chat, drone, setRoomReady, setChat, setRoomChange];

  return (
    <nav className="main-nav" role="navigation">
      <div className="main-nav__menu-toggle">
        <input className="main-nav__input" type="checkbox" />
        <span className="main-nav__span"></span>
        <span className="main-nav__span"></span>
        <span className="main-nav__span"></span>

        <ul className="main-nav__menu">
          <li className="main-nav__menu-item" key="1">
            Dark/Light theme
            <label className="switch">
              {chatTheme === "dark" ? (
                <input
                  className="switch-input"
                  type="checkbox"
                  onChange={(e) => changeTheme(e, setChatTheme)}
                />
              ) : (
                <input
                  className="switch-input"
                  type="checkbox"
                  defaultChecked
                  onChange={(e) => changeTheme(e, setChatTheme)}
                />
              )}

              <span className="slider--theme round"></span>
            </label>
          </li>
          <li className="main-nav__menu-item" key="2">
            Save chat on exit
            <label className="switch">
              {saveChat ? (
                <input
                  className="switch-input"
                  type="checkbox"
                  defaultChecked
                  onChange={(e) => handleSaveChat(e, setSaveChat)}
                />
              ) : (
                <input
                  className="switch-input"
                  type="checkbox"
                  onChange={(e) => handleSaveChat(e, setSaveChat)}
                />
              )}
              <span className="slider round"></span>
            </label>
          </li>
          <li className="main-nav__menu-item" key="3">
            Show chat history
            <label className="switch">
              {showHistory ? (
                <input
                  className="switch-input"
                  type="checkbox"
                  defaultChecked
                  onChange={(e) => handleShowHistory(e, setShowHistory)}
                />
              ) : (
                <input
                  className="switch-input"
                  type="checkbox"
                  onChange={(e) => handleShowHistory(e, setShowHistory)}
                />
              )}
              <span className="slider round"></span>
            </label>
          </li>
          <li className="main-nav__menu-item" key="4">
            <span
              className="main-nav__span-action"
              onClick={() =>
                resetProfile(drone, setDrone, setChat, setRoomReady)
              }
            >
              Reset profile
            </span>
          </li>
          <li className="main-nav__menu-item" key="5">
            <ul className="main-nav__room-list">
              <li
                className={
                  showRooms
                    ? "main-nav__room-list-header--highlight"
                    : "main-nav__room-list-header"
                }
                key="0"
                onClick={showRoomList}
              >
                Change room
              </li>
              {CONFIG.chatrooms.map((room, index) => (
                <li
                  key={index + 1}
                  data-value={room}
                  className={
                    chat.member.room === `${room}`
                      ? `${roomClass} room--selected`
                      : roomClass
                  }
                  onClick={(e) =>
                    changeRoom(e.target.dataset.value, ...changeRoomArgs)
                  }
                >
                  {room}
                </li>
              ))}
            </ul>
          </li>
          <li className="main-nav__menu-item" key="6">
            <span
              className="main-nav__span-action"
              onClick={() => handleExit(saveChat, chat, drone)}
            >
              Exit
            </span>
          </li>
        </ul>
      </div>
    </nav>
  );
}
