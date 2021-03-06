// IronHacks Platform
// hackSelector.js
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
//Styled components
import styled from 'styled-components';
//Custom Constants
import * as Constants from '../../../constants.js';
//Custom components
//import MarkdownEditor from '../markdownEditor/markdownEditor.js';

const Select = styled('select')`
  height: 30px;
  padding: 0 10px;
  display: flex;
  justify-content: flex-end;
  background-color: #F2F2F2;
  border: 1px solid #999999;
  border-radius: ${Constants.universalBorderRadius};
  
  margin-left: 10px;
`;
class ForumSelector extends React.Component {
  
  onChange = (event) => {
    this.props.onSelection(event.target.value)
  }

  render() {
    return (
      <Select onChange={this.onChange}>
        {this.props.selector.map((selector, i) => {
          return <option key={selector.name} value={i}>{selector.name}</option> 
        })}
      </Select>
    );
  }
}

export default ForumSelector;