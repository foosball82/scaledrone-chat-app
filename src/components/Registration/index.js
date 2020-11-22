import React, { useState } from "react";
import "./Registration.style.css";
import Avatars from "../Avatars";
import { randomName, randomColor } from "../../utilities/helpers";
import { CONFIG } from "../../utilities/config";

function Registration({ chat, setChat }) {
  const [avatar, setAvatar] = useState("");
  const [username, setUsername] = useState("");
  const [avatarAnimation, setAvatarAnimation] = useState(false);
  const [avatarSelected, setAvatarSelected] = useState("");
  const [room, setRoom] = useState("");
  const [random, setRandom] = useState(false);

  const getAvatar = (e) => {
    if (!random) {
      setAvatar(e.target.src);
      setAvatarSelected(e.target.alt);
    }
  };

  const getUsername = (e) => {
    setUsername(e.target.value);
  };

  const getRoom = (e) => {
    setRoom(e.target.value);
  };

  const getRandom = (e) => {
    if (e.target.checked) {
      setRandom(true);
      setUsername("");
      setAvatar("");
      setAvatarSelected("");
    } else {
      setRandom(false);
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (random) {
      chat.member = {
        username: randomName(),
        color: randomColor(),
        room: room
      };
      setChat({ ...chat }, chat.member);
    } else if (avatar === "") {
      setAvatarAnimation(true);
      setTimeout(() => {
        setAvatarAnimation(false);
      }, 800);
    } else {
      chat.member = {
        username: username,
        avatar: avatar,
        room: room
      };
      setChat({ ...chat }, chat.member);
    }
  };

  return (
    <div className="form-container">
      <form className="reg-form" onSubmit={submitForm}>
        <input
          className="reg-form__txt-input"
          type="text"
          placeholder="Enter name..."
          maxLength="15"
          required
          onChange={getUsername}
          value={username}
          disabled={random ? "disabled" : false}
        />
        <span
          className={
            random
              ? "reg-form__span reg-form__span--disabled"
              : "reg-form__span"
          }
        >
          Choose avatar:
        </span>
        <Avatars
          random={random}
          getAvatar={getAvatar}
          avatarAnimation={avatarAnimation}
          avatarSelected={avatarSelected}
        />
        <select
          className="reg-form__room-select"
          name="room"
          required
          value={room}
          onChange={getRoom}
        >
          <option key="0" value="" disabled>
            Choose room
          </option>
          {CONFIG.chatrooms.map((chatroom, index) => (
            <option key={index + 1} value={chatroom}>
              {chatroom.charAt(0).toUpperCase() + chatroom.slice(1)}
            </option>
          ))}
        </select>
        <div className="reg-form__random-checkbox">
          <label>
            Randomize name and color
            <input type="checkbox" onClick={getRandom} />
          </label>
        </div>
        <button className="reg-form__btn" type="submit">
          Start chat
        </button>
      </form>
    </div>
  );
}

export default Registration;
