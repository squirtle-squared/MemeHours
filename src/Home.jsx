import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import WaitingRoom from './WaitingRoom';

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 60px;
  text-align: center;
  color: black;
`;

const SmallerText = styled.div`
  font-size: 30px;
`;

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: dotted 0.5px;
  width: 50%;
  padding: 10px;
  font-size: 50px;
  box-shadow: 9px 9px 40px -12px rgba(0, 0, 0, 0.75);
`;

const StyledInput = styled.input`
  padding: 20px;
  margin: 10px;
  width: 75%;
  border: dotted;
  outline: none;
  font-size: 30px;
`;

const StyledInputButton = styled.input`
  border: solid 1px;
  padding: 10px;
  margin: 10px;
  background-color: inherit;
  font-size: 30px;
  border-radius: 10px;

  &:hover {
    background-color: lightblue;
    cursor: pointer;
  }
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: dotted 0.5px;
  width: 50%;
  padding: 10px;
  font-size: 50px;
  box-shadow: 9px 9px 40px -12px rgba(0, 0, 0, 0.75);
`;

const Button = styled.button`
  border: solid 1px;
  padding: 10px;
  margin: 10px;
  background-color: inherit;
  font-size: 30px;
  border-radius: 10px;

  &:hover {
    background-color: lightblue;
    cursor: pointer;
  }
`;

export default function Home() {
  const [name, setName] = useState('');
  const [players, setPlayers] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  // when submitted, player's name is pushed into player's array to be stored in state
  const handleSubmit = e => {
    e.preventDefault();
    players.push(name);
    setPlayers(players);
    setIsClicked(true);
  };

  // logic for what happens when start game is clicked
  const handleClick = () => {
    console.log('game has been started');
  };

  return (
    <Wrapper>
      <Title>Meme Hours</Title>

      {!isClicked && (
        <FormStyled onSubmit={handleSubmit}>
          <div>
            Name
            <StyledInput
              value={name}
              type="text"
              name="name"
              // player's name is updated in state
              onChange={e => {
                setName(e.target.value);
              }}
            ></StyledInput>
          </div>

          <StyledInputButton type="submit" value="Submit"></StyledInputButton>
        </FormStyled>
      )}
      {/* when you submit, you render the waiting room from all the current players in state */}
      {isClicked && (
        <Div>
          {players.map((player, index) => (
            <WaitingRoom key={index} name={player} />
          ))}
          <SmallerText>{players.length} player(s) are ready to play!</SmallerText>
          <Button onClick={handleClick}>Start Game</Button>
        </Div>
      )}

      <Link to="/main">
        <button>Go to Main</button>
      </Link>
    </Wrapper>
  );
}
