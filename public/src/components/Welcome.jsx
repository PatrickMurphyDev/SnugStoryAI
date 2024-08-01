import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";
export default function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    (async () => {
      setUserName(
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        ).username
      );
    })();
  }, []);

const savedGames = [{name:"save 1"},{name:"save 2"}];
  return (
    <Container>
      <img src={Robot} alt="" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat or an option below to Start messaging.</h3>
      <br />
      <div style={{ width: "100%", textAlign: "center" }}>
        <br />
        <h2>Load Game</h2>
        {savedGames.map((sg,i)=>{return <div key={i}
          style={{
            borderRadius: "5px",
            textAlign: "center",
            backgroundColor: "#444477",
            padding: "10px",
            width: "25%",
            margin: "auto",
            marginBottom: "5px"
          }}
        >
          {sg.name}
        </div>})}
        <br />
        <div style={{ textAlign: "center", width: "40%", margin: "auto", display: "flex", flexDirection:"row", columnGap:"5px" }}>
          <div
            style={{
              display: "block-inline",
              backgroundColor: "#333333",
              padding: "15px",
              paddingVertical: "20px",
              textAlign: "center",
              borderRadius: "5px",
              width: "20%"
            }}
          >
            ⚙️
          </div>
          <a href="/createCharacter" title="Create Character / Story" style={{width:"80%",
              textDecoration: "none",color:'#fff'}}>
          <div
            style={{
              display: "block-inline",
              backgroundColor: "#4444ff",
              padding: "15px",
              paddingVertical: "20px",
              textAlign: "center",
              borderRadius: "5px",
              width:"100%"
            }}
          >
            New Story
          </div></a>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;
