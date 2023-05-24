import React from 'react'

function Message(props) {
  return (
    <><div>{props.sender}</div><div>{props.text}</div></>
  )
}

export default Message