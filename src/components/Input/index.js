import React, { useState, useEffect, useRef } from "react";
import "./Input.style.css";
import Emoji from "../Emoji";

export default function Input({ sendMessage, thisMember }) {
  const placeholder = [
    "Enter your message...",
    "You need to type something first..."
  ];
  const emojiClassName = [
    "emoji-container emoji-container--hide",
    "emoji-container emoji-container--show"
  ];
  const initialInput = {
    text: "",
    placeholder: placeholder[0]
  };

  const [input, setInput] = useState(initialInput);
  const [emojiClass, setEmojiClass] = useState(emojiClassName[0]);

  let inputRef;
  useEffect(() => inputRef.focus(), [emojiClass, inputRef]);

  const timeoutRef = useRef(null);
  const isTyping = (typing) => {
    const message = `${thisMember.id} ${thisMember.username} ${typing}`;
    sendMessage({
      room: `observable-${thisMember.room}`,
      message
    });
  };

  useEffect(() => {
    if (input.text && inputRef === document.activeElement) {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      } else isTyping("1");
      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null;
        isTyping("0");
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  function updateInput(e) {
    setInput({ ...input, text: e.target.value });
  }

  function closeEmoji() {
    setInput({ ...input, placeholder: placeholder[0] });
    setEmojiClass(emojiClassName[0]);
  }

  function insertEmoji(e) {
    e.preventDefault();
    const smileyText = input.text + e.target.innerHTML;
    setInput({ ...input, text: smileyText });
  }

  function toggleEmoji(e) {
    e.preventDefault();
    emojiClass === emojiClassName[0]
      ? setEmojiClass(emojiClassName[1])
      : setEmojiClass(emojiClassName[0]);
  }

  function publishInput(e) {
    e.preventDefault();
    if (input.text === "") {
      setInput({
        ...input,
        placeholder: placeholder[1]
      });
    } else {
      const message = input.text;
      sendMessage({
        room: `observable-${thisMember.room}`,
        message
      });
      setInput({ text: "", placeholder: placeholder[0] });
    }
  }

  return (
    <div className="chat__input">
      <Emoji insertEmoji={insertEmoji} className={emojiClass} />
      <form className="msg-form" onSubmit={publishInput}>
        <button
          className="msg-form__emoji-btn"
          type="button"
          onMouseDown={toggleEmoji}
        >
          <img src="../svg/emoticon.svg" alt="emoticon" width="24" />
        </button>
        <input
          className="msg-form__input"
          value={input.text}
          type="text"
          placeholder={input.placeholder}
          ref={(input) => {
            inputRef = input;
          }}
          autoFocus={true}
          onChange={updateInput}
          onBlur={closeEmoji}
        />
        <button
          type="button"
          className="msg-form__btn"
          onMouseDown={publishInput}
        >
          <img src="../svg/send-message.svg" alt="send-message" width="24" />
        </button>
      </form>
    </div>
  );
}

/* <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a> </div>*/
