import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ListItems from "../components/characters/ListCharacters";
import ViewItem from "../components/characters/ViewCharacter";
import CreateItem from "../components/characters/CreateCharacter";
import EditItem from "../components/characters/EditCharacter";

const EditorStateEnum = { VIEW: 0, CREATE: 1, EDIT: 2, DELETE: 3 };

export default function CharacterEditor() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [editorState, setEditorState] = useState(undefined);

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

  const newItem = () => {
    setEditorState(EditorStateEnum.CREATE);
  };

  const RenderEditorView = () => {
    if (editorState === undefined) {
      return (
        <Container2>
          <h3>Select an Item to View, Edit or Delete. Or Create New.</h3>
        </Container2>
      );
    } else {
      switch (editorState) {
        case EditorStateEnum.VIEW:
          return <ViewItem id={currentItem._id} editItemFn={()=>setEditorState(EditorStateEnum.EDIT)}  deleteItemFn={()=>setEditorState(EditorStateEnum.DELETE)} />;
        case EditorStateEnum.CREATE:
          return <CreateItem />;
        case EditorStateEnum.EDIT:
          return <EditItem IslandID={currentItem._id} />;
        case EditorStateEnum.DELETE:
          return (
            <div>
              <h2 style={{color:"#fff"}}>Are you Sure you want to delete this item?</h2>
              <div>
              <button style={{marginRight:"20px", backgroundColor:"darkred"}}>Yes, Delete the Item forever.</button>
              <button style={{marginRight:"20px", backgroundColor:'grey'}}>Cancel</button>
              </div>
            </div>
          );
        default:
          return (
            <Container2>
              <h3>Select an Item to View, Edit or Delete. Or Create New.</h3>
            </Container2>
          );
      }
    }
  };


  const handleItemChange = (Item) => {
    setCurrentItem(Item);
    //set url to currentURL+"/"+currentIsland._id;
    setEditorState(EditorStateEnum.VIEW);
  }; 

  return (
    <>
      <Container>
        <div className="container">
          <ListItems
            items={items}
            changeItem={handleItemChange}
            newItem={newItem}
            setItems={setItems}
          />
          {editorState === undefined ? (
            <Container2>
              <h3 style={{ marginTop: "auto", color: "#fff" }}>
                Select an Item to View, Edit or Delete. Or Create New.
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
