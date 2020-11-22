export default function toggleTimestamp(
  member_id,
  msg_id,
  msgTime,
  setMsgTime
) {
  const idIndex = !msg_id
    ? msgTime.member_id.indexOf(member_id)
    : msgTime.msg_id.indexOf(member_id + "-" + msg_id);
  const new_id = [];
  if (idIndex < 0) {
    for (let i = 0; i < msgTime.msg_id.length; i++) {
      if (msgTime.msg_id[i].indexOf(member_id) === -1) {
        new_id.push(msgTime.msg_id[i]);
      }
    }
    !msg_id
      ? setMsgTime(
          { ...msgTime },
          msgTime.member_id.push(member_id),
          msgTime.msg_id.splice(0, msgTime.msg_id.length, ...new_id)
        )
      : setMsgTime(
          { ...msgTime },
          msgTime.msg_id.push(member_id + "-" + msg_id)
        );
  } else {
    for (let i = 0; i < msgTime.msg_id.length; i++) {
      if (msgTime.msg_id[i].indexOf(member_id) === -1) {
        new_id.push(msgTime.msg_id[i]);
      }
    }
    !msg_id
      ? setMsgTime(
          { ...msgTime },
          msgTime.member_id.splice(idIndex, 1),
          msgTime.msg_id.splice(0, msgTime.msg_id.length, ...new_id)
        )
      : setMsgTime({ ...msgTime }, msgTime.msg_id.splice(idIndex, 1));
  }
}
