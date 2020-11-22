export default function classNames(
  message,
  thisMember,
  initialMemberId,
  msgTime,
  chatTheme,
  whichClass,
  showHistory
) {
  const { member, id } = message;
  const thisMemberMsg =
    member.id === thisMember.id ||
    message.from_me ||
    member.clientData.id === initialMemberId;
  let classNameMsg = thisMemberMsg
    ? "msg-list__msg msg-list__msg--thisMember"
    : "msg-list__msg";
  if (message.history) classNameMsg = classNameMsg.concat(" history");
  if (message.history && !showHistory) {
    classNameMsg = classNameMsg.concat(" hide");
  }

  const classNameMemberData = thisMemberMsg
    ? "msg-list__member-data msg-list__member-data--thisMember"
    : "msg-list__member-data";

  const classNameInfoContainer = thisMemberMsg
    ? "msg-list__info-container msg-list__info-container--thisMember"
    : "msg-list__info-container";

  const classNameTextContainer = thisMemberMsg
    ? "msg-list__text-container msg-list__text-container--thisMember"
    : "msg-list__text-container";

  let classNameTimestamp = "";
  switch (
    msgTime.msg_id.indexOf(member.id + "-" + id) > -1 &&
    msgTime.member_id.indexOf(member.id) > -1
  ) {
    case true:
      classNameTimestamp =
        chatTheme === "dark"
          ? "msg-list__timestamp"
          : "msg-list__timestamp msg-list__timestamp--light";
      break;
    case false:
      if (
        msgTime.msg_id.indexOf(member.id + "-" + id) > -1 ||
        msgTime.member_id.indexOf(member.id) > -1
      ) {
        classNameTimestamp =
          chatTheme === "dark"
            ? "msg-list__timestamp msg-list__timestamp--show"
            : "msg-list__timestamp msg-list__timestamp--light msg-list__timestamp--show";
      } else
        classNameTimestamp =
          chatTheme === "dark"
            ? "msg-list__timestamp"
            : "msg-list__timestamp msg-list__timestamp--light";
      break;
    default:
      classNameTimestamp =
        chatTheme === "dark"
          ? "msg-list__timestamp"
          : "msg-list__timestamp msg-list__timestamp--light";
  }

  let classNameTimeInfo =
    msgTime.member_id.indexOf(member.id) > -1
      ? "msg-list__time-info msg-list__time-info--open"
      : "msg-list__time-info";

  switch (whichClass) {
    case "classNameMsg":
      return classNameMsg;
    case "classNameMemberData":
      return classNameMemberData;
    case "classNameInfoContainer":
      return classNameInfoContainer;
    case "classNameTextContainer":
      return classNameTextContainer;
    case "classNameTimestamp":
      return classNameTimestamp;
    case "classNameTimeInfo":
      return classNameTimeInfo;
    default:
      return undefined;
  }
}
