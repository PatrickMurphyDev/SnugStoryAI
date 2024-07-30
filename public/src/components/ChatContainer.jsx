import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";
import IslandSketch from "./IslandSketch/IslandSketch";

// ChatContainer component for managing chat interactions
export default function ChatContainer({ currentChat, socket }) {
  // State for storing chat messages
  const [messages, setMessages] = useState([]);
  // Ref for scrolling to the latest message
  const scrollRef = useRef();
  // State for storing incoming messages
  const [incomingMessage, setIncomingMessage] = useState(null);

/* ===== This code currently hidden until Sketch Map added
  const [propertySelected, setPropertySelected] = useState(null);
  const [characterSelected, setCharacterSelected] = useState(null);

  const handleCharacterSelect = (character) => {
    setCharacterSelected(character);
    if (characterSelected) characterSelected.deselect();
    character.select();
    setCharacterSelected(character);
  };

  const handlePropertySelect = (property) => {
    if (propertySelected) propertySelected.deselect();
    property.select();
    setPropertySelected(property);
  };*/

  // Fetch previous messages when currentChat changes
  useEffect(() => {
    (async () => {
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      const response = await axios.post(recieveMessageRoute, {
        from: data._id,
        to: currentChat._id,
      });
      setMessages(response.data);
    })();
  }, [currentChat]);

  // Ensure the current chat is set when currentChat changes
  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  // Handle sending a message
  const handleSendMsg = async (msg, AIChecked) => {
    AIChecked = AIChecked || 0;
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      llmodel: AIChecked,
      senderIsAI: 0,
      msg,
    });
    /*await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      llmodel: AIChecked,
      senderIsAI: 0,
      message: msg,
    });*/

    const msgs = [...messages];
    msgs.push({ fromSelf: true, senderIsAI: 0, message: msg });
    setMessages(msgs);
  };

  // Handle receiving messages via socket
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        console.log("msg-recieve: ", msg);
        setIncomingMessage({ fromSelf: false, senderIsAI: 0, message: msg });
      });
      socket.current.on("msg-recieve-ai", (msg) => {
        console.log("msg-recieve-ai: ", msg);
        setIncomingMessage({ fromSelf: false, senderIsAI: 1, message: msg });
        //setIsProcessingResponse(false);
      });
    }
  }, []);

  // Update messages state when a new message arrives
  useEffect(() => {
    incomingMessage && setMessages((prev) => [...prev, incomingMessage]);
  }, [incomingMessage]);

  // Scroll to the latest message when messages change
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Render chat container
  return (
    <Container>
      {/*<div style={{height: "250px", width:"500px", display: "none"}}>
        <IslandSketch
          onCharacterSelect={handleCharacterSelect}
          onPropertySelect={handlePropertySelect}
          sizeVector={{x:500,y:250}}
        />
      </div>*/}
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt=""
            />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${
                  message.fromSelf ? "sentMsg" : "recievedMsg"
                } ${message.senderIsAI ? "AIResponse" : "NonAIResponse"}`}
              >
                <div className="content ">
                  <sub>username</sub>
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} socket={socket} />
    </Container>
  );
}

// Styled-components for styling the chat container
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sentMsg {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recievedMsg {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
    .AIResponse {
      margin-left: 5em;
      .content {
        background-color: #4f735621;
      }
    }
  }
`;
