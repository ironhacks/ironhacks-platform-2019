// IronHacks Platform
// yourCompetitorsRank.js
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
//Styled components
import styled from 'styled-components';
import ComperitorRow from './comperitorRow.js';
import swal from 'sweetalert2';
//Custom Constants
import * as Constants from '../../../constants.js';
// import * as Texts from './staticTexts.js';


const SectionContainer = styled('div')`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  padding-bottom: 60px;
  border-radius: ${Constants.universalBorderRadius};
`;

const Table = styled('table')`
  border-collapse: collapse;
  border-radius: 1em;
  overflow: hidden;
  width: 100%;
  
  thead {
    background-color: #FFD75F;
  }

  tr {
    position: relative;
    height: 60px;

    :nth-child(even) {
      background-color: #fff1c7;
    }

    td, th {
      text-align: center;
    }
  }

  a {
    padding: 10px;
    font-weight: 700;
    color: white;
    background-color: #e6b92f;
    border-radius: 4px;
  }
`;

const SaveLikesButton = styled('button')`
  position: absolute;
  display: ${(props => props.hidden ? 'none' : 'block')}
  bottom: 15px; 
  right: 0;
  width: 150px;
  height: 40px;
  margin-top: 10px;
  border: none;
  border-radius: ${Constants.universalBorderRadius};
  background-color: #FFD75F;
  cursor: pointer;
`;

class YourCompetitorsRank extends React.Component {
  constructor(props){
    super(props)
    this.state =  {
      likedUsers: [],
    }
  }
  
  onLike = (hackerId) => {
    const likedUsers = this.state.likedUsers;
    if (likedUsers[hackerId]) {
      delete likedUsers[hackerId]
      this.setState({likedUsers});      
      return false;
    } else {
      if ( Object.keys(likedUsers).length === 3) {
        swal("You can only like 3 projects.")
        return false;
      } else {
        likedUsers[hackerId] = !likedUsers[hackerId];
        this.setState({likedUsers});
        return true;
      }
    }
  }

  saveLikes = () => {
    let likedUsers= [];
    for(const k in this.state.likedUsers) {
      if (this.state.likedUsers[k]) 
        likedUsers.push(k);
    }
    this.props.onLikedCompetitors(likedUsers);
  }

  render() {
    return (
      <SectionContainer>
        <Table>
          <thead>
            <tr>
              <th>Hacker</th>
              <th>Project Link</th>
              {this.props.treatment === "1" && 
              <th>Similarity Rating</th>
              }
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(this.props.scores.similarity).map((key, i) => {
              return (
                <ComperitorRow
                  key={i}
                  hacker={this.props.participants[key]}
                  hackerId={key}
                  hackName={this.props.hackName}
                  score={this.props.treatment === "1" ? this.props.scores.similarity[key] : null}
                  onLike={this.onLike}
                />
              );
            })}
          </tbody>
        </Table>
        <SaveLikesButton onClick={this.saveLikes} hidden={this.props.scores.filtered}>Save likes</SaveLikesButton>
      </SectionContainer>
    );
  }
}

export default YourCompetitorsRank;