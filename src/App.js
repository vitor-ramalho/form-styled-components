import React, { useState } from 'react';
import styled, { createGlobalStyle, css } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html{
    height: 100%;
  }
  body{
    font-family: Arial, Helvetica, sans-serif;
    background: linear-gradient(to bottom, #f05053, #e1eec3);
    height: 100px;
    margin: 0;
    color: #555;
  }
`;

const sharedStyles = css`
  background-color: #eee;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin: 10px 0 20px 0;
  padding: 20px;
  box-sizing: border-box;
`;

const StyledFormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 0 20px;
`;

const StyledFrom = styled.form`
  width: 100%;
  max-width: 700px;
  padding: 40px;
  background-color: #fff;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.5);
`;

const StyledInput = styled.input`
  display: block;
  width: 100%;
  ${sharedStyles}

`;

const StyledTextArea = styled.textarea`
  background-color: #eee;
  width: 100%;
  min-height: 100px;
  resize: none;
  ${sharedStyles}
`;

const StyledButton = styled.button`
  display: block;
  background-color: #f7797d;
  color: #fff;
  font-size: .9rem;
  border: 0;
  border-radius: 40px;
  height: 40px;
  padding: 0 20px;
  cursor: pointer;
  box-sizing: border-box;
`;

const StyledFieldset = styled.fieldset`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  margin: 20px 0;

  legend{
    padding: 0 10px;
  }
  label{
    padding-right: 20px;
  }
  input{
    margin-right: 10px;
  }
`;

const StyledError = styled.div`
  color: red;
  font-weight: 800;
  margin: 00 40px 0;

`;

const initialState = {
  name: '',
  email: '',
  message: '',
  gender: '',
}

function App() {
  const [state, setState] = useState(initialState);
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    for(let key in state){
      if(state[key] === ''){
        setError(`You must provide the ${key}`);
        return
      }
    }
    setError('');
  }

  const handleInput = e => {
    const inputName = e.currentTarget.name;
    const value = e.currentTarget.value;

    setState(prev => ({ ...prev, [inputName]: value }));
  }

  return (
    <>
      <GlobalStyle />
      <StyledFormWrapper>
        <StyledFrom onSubmit={handleSubmit}>
          <h2>Contact Form</h2>
          <label htmlFor="name">Name</label>
          <StyledInput
            type="text"
            name="name"
            value={state.name}
            onChange={handleInput}
          />
          <label htmlFor="email">Email</label>
          <StyledInput
            type="email"
            name="email"
            value={state.email}
            onChange={handleInput}
          />
          <StyledFieldset>
            <legend>Gender</legend>
            <label>
              <input
                type="radio"
                value="female"
                name="gender"
                checked={state.gender === 'female'}
                onChange={handleInput}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                value="male"
                name="gender"
                checked={state.gender === 'male'}
                onChange={handleInput}
              />
              Male
            </label>
          </StyledFieldset>

          <label htmlFor="message">Message</label>
          <StyledTextArea
            name="message"
            value={state.message}
            onChange={handleInput}
          />
          {error && (
            <StyledError>
              <p>{error}</p>
            </StyledError>
          )}

          <StyledButton type="submit">Send a message</StyledButton>
        </StyledFrom>
      </StyledFormWrapper>
    </>
  );
}

export default App;
