// IronHacks Platform
// quizzes.js - Quiz picker and visualizer
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
//Styled components
import styled, {ThemeProvider} from 'styled-components';
import { Link } from 'react-router-dom';
//Custom Constants
import * as Constants from '../../../constants.js';
const theme = Constants.AppSectionTheme;

//Section container
const SectionContainer = styled('div')`
  width: 100%;
  height: ${props => props.theme.containerHeight};
  background-color: ${props => props.theme.backgroundColor};
`;

const Title = styled('div')`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const ButtonContainer = styled('div')`
  width: 100%
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  overflow: auto;
`;

const QuizButton = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${Constants.mainBgColor};
  border-radius: ${Constants.universalBorderRadius};
  color: black;
  width: 50%;
  height: 35px;
  margin-bottom: 15px;
`;


class Quizzes extends React.Component {
  
  render() {
    return (
      <ThemeProvider theme={theme}>
        <SectionContainer className="container-fluid">
          <div className="row">
            <Title className='col-12'>
              <h1>Quizzes</h1>
            </Title>
          </div>
          <div className="row">
            <ButtonContainer className='col-4 offset-4'>
              <QuizButton to='quizzes/html_css'>HTML & Css</QuizButton>
              <QuizButton to='quizzes/bootstrap'>Bootstrap</QuizButton>
              <QuizButton to='quizzes/javascript_jquery'>Javascript & Jquery</QuizButton>
              <QuizButton to='quizzes/google_maps'>Google Maps API</QuizButton>
              <QuizButton to='quizzes/d3'>D3.js</QuizButton>
            </ButtonContainer>
          </div>
        </SectionContainer> 
      </ThemeProvider>
    );
  }
}

export default Quizzes;