// IronHacks Platform
// markdownEditor.js - Plain Markdown Editor
// We are using react-mde: https://github.com/andrerpena/react-mde
// Please refer to react-mde github for further documentation
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';

import styled from 'styled-components';
import ReactMde from 'react-mde'; //react-mde
import * as Showdown from "showdown"; // Markdown reader

import './css/react-mde-all.css'; //Custom Editor stylesheet

const Editor = styled(ReactMde)`
  height: 500px;
  max-height: 500px;
  padding-top: 1px;
  position: relative;
  width: 100%;
`;

class MarkdownEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mdeState: {
        markdown: this.props.withContent ? this.props.withContent : '',
      },
    };
    this.converter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true, 
      prefixHeaderId: true, //Add a prefix to the generated header ids. Passing a string will prefix that string to the header id. Setting to true will add a generic 'section' prefix.
      strikethrough: true, //Enable support for strikethrough syntax. ~~strikethrough~~ as <del>strikethrough</del>
      tasklists: true
    });
  };

  handleValueChange = (mdeState) => {
    this.props.onEditorChange(mdeState.markdown);
    this.setState({mdeState});
  };

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