import React from 'react';
import Group from './Groups'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUserGroup} from '@fortawesome/free-solid-svg-icons'

const groups = [
  {
    imageUrl: 'src/assets/dashboard/dg.jpeg',
    text: '804 Disc Golf',
  },
  {
    imageUrl: 'src/assets/dashboard/soccerball.jpg',
    text: '804 Pick-Up',
  },
  {
    imageUrl: 'src/assets/dashboard/SCOR.jpg',
    text: 'SCOR',
  },
];

const GroupList = () => {
  return (
    <div className="groups">
        <h3> <FontAwesomeIcon icon={faUserGroup} style={{ marginRight: '8px'}} />My Groups:</h3>
    <div id="card-list">
      {groups.map((group, index) => (
        <Group key={index} imageUrl={group.imageUrl} text={group.text} />
      ))}
    </div>
    </div>
  );
};

export default GroupList;