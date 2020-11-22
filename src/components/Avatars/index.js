import React from "react";
import "./Avatars.style.css";
//ne radi u codesandboxu
/* function Avatars({ selectAvatar }) {
  const reqSvgs = require.context("../../media/avatars/svg/", true, /\.svg$/);
  const svgs = reqSvgs.keys().map((path) => ({ path, file: reqSvgs(path) }));

  function renderSvgs(svg, index) {
    return (
      <li className="reg-form__avatar" key={index}>
        <img src={svg.file} alt={`Avatar ${index}`} onClick={selectAvatar} />
      </li>
    );
  }

  return (
    <ul className="reg-form__avatar-list">
      {svgs.slice(0, 16).map((svg, index) => renderSvgs(svg, index))}
    </ul>
  );
} */

//bez require.context za codesandbox (svg u public folderu)
function Avatars({ random, getAvatar, avatarAnimation, avatarSelected }) {
  const avatars = [];
  for (let i = 1; i <= 16; i++) {
    const path = `../svg/avatar-${i}.svg`;
    avatars.push(path);
  }

  function renderAvatars(avatar, index) {
    const img_alt = `Avatar-${index}`;
    return (
      <li
        className={
          random
            ? "reg-form__avatar reg-form__avatar--disabled"
            : avatarSelected === img_alt
            ? "reg-form__avatar reg-form__avatar--selected"
            : avatarAnimation
            ? "reg-form__avatar reg-form__avatar--animation"
            : "reg-form__avatar"
        }
        key={index}
      >
        <img src={avatar} alt={img_alt} onClick={getAvatar} />
      </li>
    );
  }

  return (
    <ul className="reg-form__avatar-list">
      {avatars.map((avatar, index) => renderAvatars(avatar, index))}
    </ul>
  );
}

export default Avatars;
