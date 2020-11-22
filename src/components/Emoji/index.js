import React, { useState } from "react";
import "./Emoji.style.css";
import { emojis } from "../../utilities/helpers";

const emojiTabs = [
  "&#x231A;",
  "&#x2728;",
  "&#x1F32D;",
  "&#x1F3B5;",
  "&#x1F40C;",
  "&#x1F44D;",
  "&#x1F495;",
  "&#x1F600;",
  "&#x1F680;",
  "&#x1F947;"
];

export default function Emoji({ onMouseDown, className }) {
  const [currentEmoji, setCurrentEmoji] = useState(emojiTabs[7]);

  let tabRange = [
    emojis.indexOf(currentEmoji),
    emojis.indexOf(emojiTabs[emojiTabs.indexOf(currentEmoji) + 1])
  ];

  if (emojiTabs.indexOf(currentEmoji) === emojiTabs.length - 1) {
    tabRange[1] = undefined;
  }

  function changeTab(emoji) {
    setCurrentEmoji(emoji);
  }

  function createMarkup(emoji) {
    return { __html: emoji };
  }

  return (
    <ul className={className} onMouseDown={(e) => e.preventDefault()}>
      <li key="emoji-tab" className="emoji-tab">
        {emojiTabs.map((emoji, index) => (
          <span
            key={index}
            className={
              emoji === currentEmoji
                ? "emoji-tab__span emoji-tab__span--selected"
                : "emoji-tab__span"
            }
            role="img"
            aria-label={emoji}
            onMouseDown={() => changeTab(emoji)}
            dangerouslySetInnerHTML={createMarkup(emoji)}
          ></span>
        ))}
      </li>
      {emojis.slice(tabRange[0], tabRange[1]).map((emoji) => (
        <li
          className="emoji-list__item"
          key={emoji}
          onMouseDown={(e) => e.preventDefault()}
        >
          <span
            role="img"
            aria-label={emoji}
            onMouseDown={onMouseDown}
            dangerouslySetInnerHTML={createMarkup(emoji)}
          ></span>
        </li>
      ))}
    </ul>
  );
}
