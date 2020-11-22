export const changeTheme = (e, setChatTheme) => {
  if (e.target.checked) {
    setChatTheme("light");
  } else {
    setChatTheme("dark");
  }
};

export const handleSaveChat = (e, setSaveChat) => {
  if (e.target.checked) {
    setSaveChat(true);
  } else {
    setSaveChat(false);
  }
};

export const handleShowHistory = (e, setShowHistory) => {
  if (e.target.checked) {
    setShowHistory(true);
  } else {
    setShowHistory(false);
  }
};

export const resetProfile = (drone, setDrone, setChat, setRoomReady) => {
  localStorage.clear();
  drone.close();
  setDrone(null);
  setChat({
    member: { username: "", avatar: "", room: "", color: "" },
    messages: []
  });
  setRoomReady(false);
};

export const changeRoom = (
  room,
  chat,
  drone,
  setRoomReady,
  setChat,
  setRoomChange
) => {
  if (chat.member.room === room) {
    console.log("You are already in this room!");
  } else {
    drone.unsubscribe(`observable-${chat.member.room}`);
    setRoomReady(false);
    chat.messages.forEach((message) => (message.previous = true));
    chat.member.room = room;
    setChat({ ...chat }, chat.member.room, chat.messages);
    setRoomChange(true);
  }
};

export const handleExit = (saveChat, chat, drone) => {
  if (saveChat) {
    localStorage.setItem("username", chat.member.username);
    localStorage.setItem("avatar", chat.member.avatar);
    localStorage.setItem("room", chat.member.room);
    localStorage.setItem("color", chat.member.color);
    chat.messages.map((message) => {
      if (message.member.id === chat.member.id) {
        message.from_me = true;
      }
      message.history = true;
      return message;
    });
    localStorage.setItem("messages", JSON.stringify(chat.messages));
  }
  drone.close();
  window.open("about:blank", "_self");
  window.close();
};
