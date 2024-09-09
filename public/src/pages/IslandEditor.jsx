import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useParams } from "react-router-dom"; // Assuming you're using React Router
import ListIslands from "../components/islands/ListIslands";
import ViewIsland from "../components/islands/ViewIsland";
import CreateIsland from "../components/islands/CreateIsland";
import EditIsland from "../components/islands/EditIsland";

const EditorStateEnum = { VIEW: 0, CREATE: 1, EDIT: 2, DELETE: 3 };

export default function IslandEditor() {
  const { id } = useParams(); // Island ID from the URL
  const navigate = useNavigate();
  const [islands, setIslands] = useState([]);
  const [currentIsland, setCurrentIsland] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [editorState, setEditorState] = useState(undefined);

  const newIsland = () => {
    setEditorState(EditorStateEnum.CREATE);
  };

  const RenderEditorView = () => {
    if (editorState === undefined) {
      return (
        <Container2>
          <h3>Select an Island to View, Edit or Delete. Or Create New.</h3>
        </Container2>
      );
    } else {
      switch (editorState) {
        case EditorStateEnum.VIEW:
          return <ViewIsland IslandID={currentIsland._id} editIslandFn={()=>setEditorState(EditorStateEnum.EDIT)}  deleteIslandFn={()=>setEditorState(EditorStateEnum.DELETE)} />;
        case EditorStateEnum.CREATE:
          return <CreateIsland />;
        case EditorStateEnum.EDIT:
          return <EditIsland IslandID={currentIsland._id} />;
        case EditorStateEnum.DELETE:
          return (
            <div>
              <h2 style={{color:"#fff"}}>Are you Sure you want to delete this island?</h2>
              <div>
              <button style={{marginRight:"20px", backgroundColor:"darkred"}}>Yes, Delete the Island forever...</button>
              <button style={{marginRight:"20px", backgroundColor:'grey'}}>Cancel</button>
              </div>
            </div>
          );
        default:
          return (
            <Container2>
              <h3>Select an Island to View, Edit or Delete. Or Create New.</h3>
            </Container2>
          );
      }
    }
  };

  useEffect(() => {
    (async () => {
      if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
        navigate("/login");
      } else {
        setCurrentUser(
          await JSON.parse(
            localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
          )
        );
      }
    })();
  }, [navigate]);

  const handleIslandChange = (Island) => {
    setCurrentIsland(Island);
    //set url to currentURL+"/"+currentIsland._id;
    setEditorState(EditorStateEnum.VIEW);
  }; 

  return (
    <>
      <Container>
        <div className="container">
          <ListIslands
            islands={islands}
            changeIsland={handleIslandChange}
            newIsland={newIsland}
            setIslands={setIslands}
          />
          {editorState === undefined ? (
            <Container2>
              <h3 style={{ marginTop: "auto", color: "#fff" }}>
                Select an Island to View, Edit or Delete. Or Create New.
              </h3>
            </Container2>
          ) : (
            <Container2 style={{marginTop:"50px"}}>
                <RenderEditorView />
            </Container2>
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

const Container2 = styled.div`
  display: grid;
  color: "#fff";
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }`;
