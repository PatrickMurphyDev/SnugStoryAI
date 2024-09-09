import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from "styled-components";
import Logo from "../../assets/logo.svg";


const ListCharacters = (props) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/characters') // Endpoint to fetch characters
      .then((response) => {
        setCharacters(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching characters:', err);
        setError('Failed to load characters.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading characters...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Container>
        <div className="brand">
        <img src={Logo} alt="logo" />
        <h3>Walks Into A Bar...</h3>
      </div>
    <div className="characters-list" style={{color:'#fff'}}>
      <h2 style={{marginLeft:"10px"}}>Characters List</h2>
      <button onClick={()=>props.newItem()}>+ New Item</button>
      {characters.length > 0 ? (
        <ul>
          {characters.map((character, index) => (
            <li key={character._id}>
              <h3 style={{margin:"35px"}} onClick={() => props.changeItem(character,index)}>{character.name.first} {character.name.last}</h3>
            </li>
          ))}
        </ul>
      ) : (
        <p>No characters found.</p>
      )}
    </div>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .islands-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .island {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
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
    .selected {
      background-color: #9a86f3;
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;

export default ListCharacters;
