// IronHacks Platform
// markdownEditor.js - Plain Markdown Editor
// We are using react-mde: https://github.com/andrerpena/react-mde
// Please refer to react-mde github for further documentation
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';

import styled from 'styled-components';
import ReactMde, {ReactMdeTypes} from 'react-mde'; //react-mde
import * as Showdown from "showdown"; // Markdown reader

import 'react-mde/lib/styles/css/react-mde-all.css';//Editor stylesheet

interface AppState {
    mdeState: ReactMdeTypes.MdeState;
}

const Editor = styled(ReactMde)`
  height: 100%;
  width: 100%;
`;

class MarkdownEditor extends React.Component<{}, AppState> {

  converter: Showdown.Converter;

  constructor(props) {
    super(props);
    this.state = {
      mdeState: null,
    };
    this.converter = new Showdown.Converter({tables: true, simplifiedAutoLink: true});
  }

  handleValueChange = (mdeState: ReactMdeTypes.MdeState) => {
    this.setState({mdeState});
  }

  render() {
    return (
      <Editor
        layout={this.props.editorLayout}
        onChange={this.handleValueChange}
        editorState={this.state.mdeState}
        generateMarkdownPreview={(markdown) => Promise.resolve(this.converter.makeHtml(markdown))}
      />
    )
  }
}

export default MarkdownEditor;