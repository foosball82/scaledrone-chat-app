import React, { useState } from "react";
import "./Fullscreen.style.css";

export default function Fullscreen({ getElement }) {
  const [fullscreen, setFullscreen] = useState(false);

  const toggleFullScreen = () => {
    let doc = window.document;
    let chatDiv = getElement();

    let requestFullScreen =
      chatDiv.current.requestFullscreen ||
      chatDiv.current.mozRequestFullScreen ||
      chatDiv.current.webkitRequestFullScreen ||
      chatDiv.current.msRequestFullscreen;
    let cancelFullScreen =
      doc.exitFullscreen ||
      doc.mozCancelFullScreen ||
      doc.webkitExitFullscreen ||
      doc.msExitFullscreen;

    if (
      !doc.fullscreenElement &&
      !doc.mozFullScreenElement &&
      !doc.webkitFullscreenElement &&
      !doc.msFullscreenElement
    ) {
      requestFullScreen.call(chatDiv.current);
      setFullscreen(true);
    } else {
      cancelFullScreen.call(doc);
      setFullscreen(false);
    }
  };

  return fullscreen ? (
    <div className="fullscreen-toggle fullscreen-toggle--fullscreen">
      <img
        className="fullscreen-toggle__img"
        src="./svg/fullscreen-exit-btn.svg"
        alt="Exit fullscreen button"
        onClick={toggleFullScreen}
      />
    </div>
  ) : (
    <div className="fullscreen-toggle">
      <img
        className="fullscreen-toggle__img"
        src="./svg/fullscreen-btn.svg"
        alt="Fullscreen button"
        onClick={toggleFullScreen}
      />
    </div>
  );
}

/*
Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
Icons made by <a href="https://www.flaticon.com/authors/pixelmeetup" title="Pixelmeetup">Pixelmeetup</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>

*/
