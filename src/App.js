import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Fullscreen from "./components/Fullscreen";
import Header from "./components/Header";
import Input from "./components/Input";
import Loader from "./components/Loader";
import Menu from "./components/Menu";
import Messages from "./components/Messages";
import Registration from "./components/Registration";

export default function App() {
  const initialChatState = localStorage.username
    ? {
        member: {
          username: localStorage.username,
          avatar: localStorage.avatar,
          room: localStorage.room,
          color: localStorage.color !== "undefined" ? localStorage.color : "",
        },
        messages: JSON.parse(localStorage.messages),
      }
    : {
        member: { username: "", avatar: "", room: "", color: "" },
        messages: [],
      };

  const [chat, setChat] = useState(initialChatState);
  const [roomReady, setRoomReady] = useState(false);
  const [drone, setDrone] = useState(null);
  const [chatTheme, setChatTheme] = useState(
    localStorage.theme ? localStorage.theme : "dark"
  );
  const [saveChat, setSaveChat] = useState(
    localStorage.saveChat ? JSON.parse(localStorage.saveChat) : true
  );
  const [showHistory, setShowHistory] = useState(
    localStorage.showHistory ? JSON.parse(localStorage.showHistory) : true
  );
  const [roomChange, setRoomChange] = useState();
  const [isTyping, setIsTyping] = useState({ users: [] });
  const [initialMemberId, setinitialMemberId] = useState(null);
  const [members, setMembers] = useState({ online: [] });

  const chatDiv = useRef();
  const getRefFromParent = () => {
    return chatDiv;
  };

  useEffect(() => {
    if (chat.member.username !== "" || localStorage.username) {
      const drone = new window.Scaledrone("Gng4m7K07hNftBNe", {
        data: chat.member,
      });
      setDrone(drone);
    }
  }, [chat.member]);

  useEffect(() => {
    const droneEvents = () => {
      drone.on("open", (error) => {
        if (error) {
          return console.error(error);
        }
        chat.member.id = drone.clientId;
        if (initialMemberId === null) setinitialMemberId(drone.clientId);
        if (localStorage.username) {
          chat.member.username = localStorage.username;
          chat.member.avatar = localStorage.avatar;
          chat.member.room = localStorage.room;
          chat.member.color = localStorage.color;
        }
        setChat({ ...chat }, chat.member);
        roomEvents();
      });

      drone.on("error", (error) => console.error(error));
      drone.on("disconnect", () => {
        console.log(
          "User has disconnected, Scaledrone will try to reconnect soon"
        );
      });
      drone.on("reconnect", () => {
        console.log("User has been reconnected");
      });
    };

    const roomEvents = () => {
      const room = drone.subscribe(`observable-${chat.member.room}`);
      room.on("open", (error) => {
        if (error) {
          console.error(error);
        } else {
          console.log("Connected to room");
          setRoomReady(true);
        }
      });
      room.on("members", (m) => {
        members.online = m;
        setMembers({ ...members });
      });
      room.on("member_join", (member) => {
        members.online.push(member);
        setMembers({ ...members });
      });
      room.on("member_leave", ({ id }) => {
        const index = members.online.findIndex((member) => member.id === id);
        members.online.splice(index, 1);
        setMembers({ ...members });
      });
      room.on("message", (message) => {
        receiveMsg(message);
      });
    };

    const receiveMsg = (message) => {
      message.member.clientData.room = chat.member.room;
      if (
        message.data.indexOf(message.clientId) === 0 ||
        message.data.indexOf(message.member.clientData.id) === 0
      ) {
        if (
          message.data.charAt(message.data.length - 1) === "1" &&
          message.data.indexOf(chat.member.id) === -1
        ) {
          isTyping.users.push(message.member.clientData.username);
          setIsTyping({ ...isTyping }, isTyping.users);
        } else if (
          message.data.charAt(message.data.length - 1) === "0" &&
          message.data.indexOf(chat.member.id) === -1
        ) {
          isTyping.users.splice(
            isTyping.users.indexOf(message.member.clientData.username),
            1
          );
          setIsTyping({ ...isTyping }, isTyping.users);
        }
      } else {
        chat.messages.push(message);
        setChat({ ...chat }, chat.messages);
      }
    };

    if (drone && !chat.member.id) {
      droneEvents();
    }

    if (roomChange) {
      roomEvents();
      setRoomChange(false);
    }
  }, [chat, drone, roomChange, isTyping, initialMemberId, members]);

  return !localStorage.username && !chat.member.username ? (
    <div className="reg-container">
      <Registration chat={chat} setChat={(obj) => setChat(obj)} />
    </div>
  ) : !roomReady ? (
    <Loader />
  ) : (
    <div
      className={chatTheme === "dark" ? "chat" : "chat chat--light"}
      ref={chatDiv}
    >
      <Header
        room={chat.member.room}
        whoIsTyping={isTyping}
        members={members.online}
      />
      <Menu
        chatTheme={chatTheme}
        setChatTheme={(theme) => setChatTheme(theme)}
        saveChat={saveChat}
        setSaveChat={(boolean) => setSaveChat(boolean)}
        showHistory={showHistory}
        setShowHistory={(boolean) => setShowHistory(boolean)}
        chat={chat}
        setChat={(obj) => setChat(obj)}
        drone={drone}
        setDrone={(obj) => setDrone(obj)}
        setRoomReady={(boolean) => setRoomReady(boolean)}
        setRoomChange={(boolean) => setRoomChange(boolean)}
      />
      <Fullscreen getElement={getRefFromParent} />
      <Messages
        messages={chat.messages}
        thisMember={chat.member}
        initialMemberId={initialMemberId}
        chatTheme={chatTheme}
        showHistory={showHistory}
      />
      <Input
        sendMessage={(obj) => drone.publish(obj)}
        thisMember={chat.member}
      />
    </div>
  );
}
