import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Row = styled.div`
  display: flex;
`;
const Title = styled.h1`
  font-size: 60px;
  text-align: center;
  color: black;
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

const StyledSection = styled.section`
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

const StyledButton = styled.button`
  border: solid 1px;
  padding: 10px;
  margin: 10px;
  background-color: inherit;
  font-size: 20px;
  border-radius: 10px;

  &:hover {
    background-color: lightblue;
    cursor: pointer;
  }
`;

const StyledChoices = styled.button`
  border: solid 1px;
  width: 20%;
  padding: 10px;
  margin: 10px;
  background-color: inherit;
  font-size: 30px;
  border-radius: 10px;
  &:hover {
    background-color: lightblue;
    cursor: pointer;
  }
  &:focus {
    background-color: lightblue;
  }
`;

export default function Home() {
  const [name, setName] = useState('');
  //   const [room, setRoom] = useState('');
  //   const [isClicked, setIsClicked] = useState(false);
  //   const [rounds, setRounds] = useState(0);

  const handleSubmit = e => {
    e.preventDefault();
    console.log(name, room, rounds);
  };

  return (
    <Wrapper>
      <Title>Meme Hours</Title>
      {/* <Row>
        <StyledButton
          onClick={() => {
            setIsClicked(false);
          }}
        >
          Join Game
        </StyledButton>

        <StyledButton
          onClick={() => {
            setIsClicked(true);
          }}
        >
          Create Game
        </StyledButton>
      </Row> */}

      <FormStyled onSubmit={handleSubmit}>
        <div>
          Name
          <StyledInput
            value={name}
            type="text"
            name="name"
            onChange={e => {
              setName(e.target.value);
            }}
          ></StyledInput>
        </div>

        <StyledInputButton type="submit" value="Submit"></StyledInputButton>
      </FormStyled>

      <Link to="/main">
        <button>Go to Main</button>
      </Link>
    </Wrapper>
  );
}
