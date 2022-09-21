import React from "react";
import { useEffect } from "react";
import { useState,useContext, useRef } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { AppContext } from "../context/appContext";
import "./MessageForm.css"

export const MessageForm = () => {
const [message, setMessage] = useState("");
const user = useSelector((state)=> state.user);
const {socket, currentRoom, setMessages, messages, privateMemberMsg} = useContext(AppContext);
const messageEndRef = useRef(null);

function getFormattedDate(){
  const date = new Date();
  const year = date.getFullYear();

  let month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : "0" + month;

  let day = date.getDate().toString();
  day = day.length > 1 ? day : "0" + day;
  return day + "/" + month + "/" + year;
}

const todayDate = getFormattedDate();

socket.off('room-messages').on('room-messages', (roomMessages)=>{
console.log(roomMessages);
  setMessages(roomMessages);
})

useEffect(()=>{
  scrollToBottom();
}, [messages]);

function scrollToBottom(){
  messageEndRef.current?.scrollIntoView({behavior : 'smooth'})
}

  function handleSubmit(e) {
    e.preventDefault();
    if(!message) return;
    const today = new Date();
    const minutes = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
    const time = today.getHours() + ":" + minutes;
    const roomId = currentRoom;
    socket.emit("message-room", roomId, message,time,  todayDate, user);
    setMessage("");
  }



  return (
    <div >
        <div className="message-output">
          {user && !privateMemberMsg?._id && <div className="alert alert-info">You are in {currentRoom} room</div>}
          {user && privateMemberMsg?._id && (
            <>
            <div className="alert alert-info conversation-info">
              <div>
                You are chatting with {privateMemberMsg.name} <img src={privateMemberMsg.picture} className="conversation-profile-pic" alt=""/>
              </div>
            </div>
            </>
          )}
          {!user && <div className="alert alert-danger">Please Login</div>}
          {user && messages.map(({_id : date, messagesByDate }, idx)=>(
            <div key={idx}>
              <p className=" text-center message-date-indicator">{date}</p>
              {messagesByDate?.map(({content, time, from:sender }, msgIdx)=>(
                <div className={sender?.email === user?.email ? "message" : "incoming-message"} key={msgIdx}>
                  <div className="message-inner">
                    <div className="d-flex align-items-center mb-3">
                      <img src={sender.picture} style={{width:30, height:30, objectFit:'cover', borderRadius:'50%', marginRight: 10}} alt=""/>
                      <p className="message-sender"> {sender._id === user?._id ? "You" : sender.name}</p>
                    </div>
                    <p className="message-content">{content}</p>
                      <p className="message-timestamp-left">{time}</p>
                  </div>
                  
                </div>
              ))}
            </div>
          ))}
          <div ref={messageEndRef}/>
          </div>
        
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={11}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Enter your message..."
                disabled={!user}
                value = {message}
                onChange = {e => setMessage(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col md={1}>
            <Button
              variant="primary"
              type="submit"
              style={{ width: "100%", backgroundColor: "#53AFEE" }}
              disabled={!user}
            >
              <i className="fas fa-paper-plane"></i>
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
