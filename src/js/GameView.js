import { React, useState } from 'react';
// import { useAsync } from 'react-async';
import entrance from '../img/start.png';
import improom from '../img/improom.png';
import hubroom from '../img/hubRoom.png';
import jarroom from '../img/jarroom.png';
import bossroom from '../img/bossroom.png';
import { POST, packagePostData, updateRoom } from '../js/helpers.js';
import { url } from '../js/config.js';

function reformatHeader(room_name) {
  let exportImg, roomName;
  if (room_name === 'entrance') {
    exportImg = entrance;
    roomName = 'The Front Door';
  } else if (room_name === 'hubroom') {
    exportImg = hubroom;
    roomName = '*SPOILERS* Trap Room';
  } else if (room_name === 'jarroom') {
    exportImg = jarroom;
    roomName = 'The Skeleton Jar room';
  } else if (room_name === 'improom') {
    exportImg = improom;
    roomName = 'The Imp Room';
  } else if (room_name === 'bossroom') {
    exportImg = bossroom;
    roomName = 'The Boss Room';
  }
  const retObj = {
    img: exportImg,
    room: roomName,
  };
  return retObj;
}

function Header(props) {
  const { img, room } = reformatHeader(props.room_name);
  return (
    <div className="header round-border-top center-text">
      <img alt={props.room_name} src={img}></img>
      <p className="bottom-fade">{room}</p>
    </div>
  );
}

function Details(props) {
  return (
    <div className="details bottom-border center-text">
      <p>{props.room_details}</p>
    </div>
  );
}

function Options(props) {
  return (
    <div className="options">
      {props.room_options.map((option, id) => (
        <p key={id}>{option}</p>
      ))}
    </div>
  );
}

function Reset(props) {
  return (
    <button
      className="btn-reset center-text"
      onClick={(e) => {
        e.preventDefault();

        const defaultOptions = packagePostData('default');

        POST(url, defaultOptions, props).then((res) =>
          updateRoom(res.data, props)
        );
      }}
    >
      Reset
    </button>
  );
}

function Choice(props) {
  return (
    <form
      className="choice center-text"
      onSubmit={(e) => {
        e.preventDefault();

        // Get users choice
        const choice = e.target[0].value;

        if (!choice) return;
        // // Package choice and props together
        const newOptions = packagePostData(choice, props);

        // Get server response from choice
        POST(url, newOptions).then((res) =>
          // Update state with fetched data
          {
            updateRoom(res.data, props);
          }
        );

        // end

        // Delete text in the choice textbox
        e.target[0].value = '';
      }}
    >
      <label>Type your choice from the options above: </label>
      <input type="text" name="choice" />
      <button>Submit</button>
    </form>
  );
}

export default function GameView(props) {
  // any way to move these outside the function so the children can reference them also?
  const [room_details, setRoomDetails] = useState(
    props.gameOptions.room_details
  );
  const [room_name, setRoomName] = useState(props.gameOptions.room_name);
  const [room_options, setRoomOptions] = useState(
    props.gameOptions.room_options
  );
  const [looked, setLooked] = useState(false);
  const [trap, setTrap] = useState(true);
  const [hp, setHp] = useState(20);
  const [stick, setStick] = useState(false);
  const [approach, setApproach] = useState(4);

  return (
    <div className="game-border">
      <Header room_name={room_name} />
      <Details room_details={room_details} />
      <Options room_options={room_options} />
      <Choice
        // How can we change this to a function?
        setRoomDetails={setRoomDetails}
        setRoomName={setRoomName}
        setRoomOptions={setRoomOptions}
        setLooked={setLooked}
        setTrap={setTrap}
        setHp={setHp}
        setStick={setStick}
        setApproach={setApproach}
        room_name={room_name}
        looked={looked}
        room_details={room_details}
        room_options={room_options}
        trap={trap}
        hp={hp}
        stick={stick}
        approach={approach}
      />
      <Reset
        setRoomDetails={setRoomDetails}
        setRoomName={setRoomName}
        setRoomOptions={setRoomOptions}
        setLooked={setLooked}
        setTrap={setTrap}
        setHp={setHp}
        setStick={setStick}
        setApproach={setApproach}
      />
    </div>
  );
}
