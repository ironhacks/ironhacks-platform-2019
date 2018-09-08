// IronHacks Platform
// newHack.js
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
//Styled components
import styled, {ThemeProvider} from 'styled-components'; 
//Custom Constants
import * as Constants from '../../../../constants.js';

const theme = Constants.AppSectionTheme;

//Section container
const SectionContainer = styled('div')`
  width: 100%;
  height: ${props => props.theme.containerHeight};
  background-color: ${props => props.theme.backgroundColor};

  h1 {
    &:first-child {
      margin: 30px 0 0 0;
    }
  }
`;
const Separator = styled('div')`
  width: 100%;
  height: 1px;
  margin-top: 15px;
  margin-bottom: 10px;
  background-color: ${(props) => 
    props.primary ? Constants.mainBgColor : 'lightgray'
  };
`;
const NewElementButton = styled('button')`
  background-color: transparent;
  border: none;
  font-weight: 800;
  color: #4D4D4D;

  &:hover{
    cursor: pointer;
  }
`;
class NewHack extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      hackName : '',
    }
  }

  //This callback report if the title input state change
  hackNameEventHandler = (event) => {
    this.setState({hackName: event.target.value});
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
      <SectionContainer className='container-fluid'>
        <div className='row'>
          <div className='col-md-8 offset-md-2'>
          	<h1>Create a new Hack</h1>
            <p>Hack description</p>
            <Separator primary/>
            <h2>Hack name</h2>
            <input type='text' placeholder='Hack Name' onChange={this.hackNameEventHandler}/>
            <Separator/>
            <h2>{this.state.hackName} Dates</h2>
            <p>Dates Explanation.</p>
            <Separator/>
            <h2>Phases</h2>
            <p>Phase mechanic description.</p>
            <NewElementButton>ADD PHASE</NewElementButton>
            <Separator/>
          </div>
        </div>
      </SectionContainer>
      </ThemeProvider>
    );
  }
}

export default NewHack;