// IronHacks Platform
// results.js - Results Component
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
//Styled components
import styled, {ThemeProvider} from 'styled-components';
//Router
import { Link, Switch, Route } from "react-router-dom";
//Custom components
import TaskSection from './sections/task/admTaskSection.js';
import TutorialSection from './sections/tutorial/admTutorialSection.js';
//Custom Constants
import * as Constants from '../../../constants.js';
//Image references
import HouseIcon from './img/house-black-icon.svg';
import SettingsIcon from './img/settings-icon.svg';

const theme = Constants.AppSectionTheme;

//Section container
const SectionContainer = styled('div')`
  width: 100%;
  height: ${props => props.theme.containerHeight};
  background-color: ${props => props.theme.backgroundColor};

  .container-fuild {
    padding: 0;
  }

  .full-height {
    height: 100%;
  }

  .overflow {
    overflow: auto;
  }

`;
const ControlPanel = styled('div')`
  height 100%; 
  border-right: 1px solid black;
`;
const ControlPanelItem = styled('div')`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid black;
  padding-left: 15px;
  transition: color 0.5s, background-color 0.5s;

  &:hover {
    background-color: gray;
    color: ${Constants.mainBgColor};
  }

  &:first-child {
    margin-top: 70px;
    border-top: 1px solid black;
    justify-content: space-around;
  }

  img {
    width: 25px;
    height: 25px;

    &:first-child {
      margin-right: 10px;
    }

    &:last-child {
      margin-left: 10px;
    }
  }
`;
const VerticalSeparator = styled('div')`
  width: 2px;
  height: 25px;
  background-color: black;
`;
const SectionHeader = styled('div')`
  min-height: 140px;
  border-bottom: 1px solid black;
`;
const SectionBody = styled('div')`
  overflow: auto;
`;
class AdminDashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      hack: {},
      hackId: '',
    }
  }

  componentDidMount(){
    //Check if there is a hack instance on the component state, if not, ask for it.
    if(!this.props.location.state){
      this.getHack();
    }else{
      this.setState({
        hack: this.props.location.state.hack,
        hackId: this.props.location.state.hackId,
      });
    };
  };

  getHack = () => {
    //db Reference
    const firestore = window.firebase.firestore();
    const settings = {timestampsInSnapshots: true};
    firestore.settings(settings);
    const _this = this;
    //Updating the current hack:
    firestore.collection('hacks').where('name', '==', this.props.match.params.hackId).limit(1)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          _this.setState({hack: doc.data(), hackId: doc.id});
        });
    }) 
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
  };
//--------------------------- TUTORIAL SECTION ----------------------------//
  //This function handle the tutorial docuement update.
  onTutorialMarkdownUpdate = (markdown) => {
    this.setState({tutorialMarkdown: markdown});
  };

  updateTutorialDocument = () => {
    //db Reference
    const firestore = window.firebase.firestore();
    const settings = {timestampsInSnapshots: true};
    firestore.settings(settings);
    //Updating the current hack:
    const hackRef = firestore.collection('hacks').doc(this.state.hackId);
    var hackTutorial = this.state.hack.tutorial;
    hackTutorial.doc = this.utoa(this.state.tutorialMarkdown)
    hackRef.update({
      tutorial: hackTutorial,
    })
    .then(() => {
      //TODO: update UI to provide feedback to the user.
      console.log('done')
    })  
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
  };
//--------------------------- TUTORIAL SECTION ----------------------------//
//--------------------------- TASK SECTION ----------------------------//
  //This function handle the tutorial docuement update.
  onTaskMarkdownUpdate = (markdown) => {
    this.setState({taskMarkdown: markdown});
  };

  updateTaskDocument = () => {
    //db Reference
    const firestore = window.firebase.firestore();
    const settings = {timestampsInSnapshots: true};
    firestore.settings(settings);
    //Updating the current hack:
    const hackRef = firestore.collection('hacks').doc(this.state.hackId);
    var hackTask = this.state.hack.task;
    hackTask.doc = this.utoa(this.state.taskMarkdown)
    hackRef.update({
      task: hackTask,
    })
    .then(() => {
      //TODO: update UI to provide feedback to the user.
      console.log('done')
    })  
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
  };
//--------------------------- TASK SECTION ----------------------------//
//--------------------------- MARKDOWN UTILITIES --------------------------//
  // ucs-2 string to base64 encoded ascii
  utoa = (str) => {
      return window.btoa(unescape(encodeURIComponent(str)));
  };
  // base64 encoded ascii to ucs-2 string
  atou = (str) => {
      return decodeURIComponent(escape(window.atob(str)));
  };
//--------------------------- MARKDOWN UTILITIES --------------------------//

  render() {
    return (
      <ThemeProvider theme={theme}>
        <SectionContainer className='container-fuild'>
          <div className='row no-gutters full-height'>
            <ControlPanel className='col-md-2'>
              <ControlPanelItem >
                <img src={HouseIcon} alt='Home'/>
                <span>Proyect Overview </span>
                <VerticalSeparator/>
                <Link to={'/admin/dashboard/' + this.props.match.params.hackId + '/settings/'}><img src={SettingsIcon} alt='Settings'/></Link>
              </ControlPanelItem>
              <ControlPanelItem>
                <Link to={'/admin/dashboard/' + this.props.match.params.hackId + '/stats/'}>Stats</Link>
              </ControlPanelItem>
              <ControlPanelItem>
                <Link to={'/admin/dashboard/' + this.props.match.params.hackId + '/forums/'}>Forums</Link>
              </ControlPanelItem>
              <ControlPanelItem>
                <Link to={'/admin/dashboard/' + this.props.match.params.hackId + '/qualtrics/'}>Qualtrics Integration</Link>
              </ControlPanelItem>
              <ControlPanelItem>
                <Link to={'/admin/dashboard/' + this.props.match.params.hackId + '/tutorial/'}>Tutorial</Link>
              </ControlPanelItem>
              <ControlPanelItem>
                <Link to={'/admin/dashboard/' + this.props.match.params.hackId + '/task/'}>Task</Link>
              </ControlPanelItem>
            </ControlPanel>
            <div className='col-md-10 full-height'>
              <div className='d-flex flex-column full-height'>
              <SectionHeader className='row no-gutters'>
                <div className='col-md-12'>
                  <h2>{this.state.hack.name ? this.state.hack.name : 'Loading'}</h2>
                  <span>Hack Dashboard</span>
                </div>
              </SectionHeader>
              <div className='row no-gutters flex-grow-1 overflow'>
                <SectionBody className='col-md-12'>
                  <Switch>
                    <Route 
                      path={this.props.match.url + '/tutorial'}
                      render={()=> 
                        <TutorialSection 
                          previousDocument={this.state.hack.tutorial ? this.atou(this.state.hack.tutorial.doc) : ''}
                          onTutorialMarkdownUpdate={this.onTutorialMarkdownUpdate}
                          updateTutorialDocument={this.updateTutorialDocument}
                        />}/>
                      <Route 
                      path={this.props.match.url + '/task'}
                      render={()=> 
                        <TaskSection 
                          previousDocument={this.state.hack.task ? this.atou(this.state.hack.task.doc) : ''}
                          onTaskMarkdownUpdate={this.onTaskMarkdownUpdate}
                          updateTaskDocument={this.updateTaskDocument}
                        />}/>
                  </Switch>
                </SectionBody>
              </div>
              </div>
            </div>
          </div>
        </SectionContainer>
      </ThemeProvider>
    );
  }
}

export default AdminDashboard;