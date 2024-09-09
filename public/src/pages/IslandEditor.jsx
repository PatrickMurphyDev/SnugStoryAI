import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { allUsersRoute, host } from "../utils/APIRoutes";


export default function IslandEditor() {
  const navigate = useNavigate();
  const [islands, setIslands] = useState([]);
  const [currentIsland, setCurrentIsland] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(()=> {(async () => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/login");
    } else {
      setCurrentUser(
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )
      );
    }
  })();}, [navigate]);

  useEffect(()=>{(async () => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        setIslands(data.data);
      } else {
        navigate("/setAvatar");
      }
    }
  })();}, [currentUser, navigate, setIslands]);

  const handleIslandChange = (Island) => {
    setCurrentIsland(Island);
  }; 

  return (
    <>
      <Container>
        <div className="container">
          <IslandsList islands={islands} changeIsland={handleIslandChange} />
          {currentIsland === undefined ? (
            <Container>
            <h3>Select an Island to View, Edit or Delete. Or Create New.</h3>
            </Container>
          ) : (
            <IslandDataViewer currentIsland={currentIsland}  />
          )}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
