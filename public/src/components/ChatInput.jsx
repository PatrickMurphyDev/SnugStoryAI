import React, { useState, useEffect } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from "emoji-picker-react";

export default function ChatInput({
  handleSendMsg,
  socket,
  isProcessingResponse = false
}) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [AIChecked, setAIChecked] = useState(false);
  const [processing, setProcessing] = useState(isProcessingResponse);

  useEffect(() => {
    const handleMsgReceiveAI = (msg) => {
      console.log("msg-recieve-ai: ", msg);
      setProcessing(false);
    };

    const handleMsgStartAI = (msg) => {
      console.log("msg-start-ai: ", msg);
      setProcessing(true);
    };

    socket.current.on("msg-recieve-ai", handleMsgReceiveAI);
    socket.current.on("msg-start-ai", handleMsgStartAI);

    return () => {
      socket.current.off("msg-recieve-ai", handleMsgReceiveAI);
      socket.current.off("msg-start-ai", handleMsgStartAI);
    };
  }, [socket]);

  const handleAICheckedChange = () => {
    setAIChecked(!AIChecked);
  };

  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (processing) {
      console.log("block processing");
    } else if (msg.length > 0) {
      handleSendMsg(msg, AIChecked);
      setMsg("");
    }
  };

  const ButtonChat = (processing) => (
    <button type="submit" className={(processing ? "disabled" : "")}>
      {processing ? "..." : <IoMdSend />}
    </button>
  );

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input
          type="text"
          placeholder="type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <div className="input-ai-flag">
          <label>
            <input
              type="checkbox"
              checked={AIChecked}
              onChange={handleAICheckedChange}
            />
            AI
          </label>
        </div>
        <ButtonChat processing={processing} />
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #080420;
  padding: 0 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .emoji-picker-react {
        position: absolute;
        top: -350px;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #9a86f3;
        }
        .emoji-group:before {
          background-color: #080420;
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      .disabled {
        background-color: grey !important;
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;
