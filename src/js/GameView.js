import { React, useState } from 'react';
// import { useAsync } from 'react-async';
import entrance from '../img/start.png';
import improom from '../img/improom.png';
import hubroom from '../img/hubRoom.png';
import jarroom from '../img/jarroom.png';
import { POST, packagePostData, updateRoom } from '../js/helpers.js';
import { url } from '../js/config.js';

function getImg(room_name) {
  let exportImg;
  if (room_name === 'entrance') {
    exportImg = entrance;
  } else if (room_name === 'hubroom') {
    exportImg = hubroom;
  } else if (room_name === 'jarroom') {
    exportImg = jarroom;
  } else if (room_name === 'improom') {
    exportImg = improom;
  }
  return exportImg;
}

function Header(props) {
  const img = getImg(props.room_name);

  return (
    <div className="header round-border-top">
      <img alt={props.room_name} src={img}></img>
      <p className="bottom-fade">{props.room_name.toUpperCase()}</p>
    </div>
  );
}

function Details(props) {
  return (
    <div className="details bottom-border">
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

function Choice(props) {
  return (
    <form
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
      <label>Choice: </label>
      <input type="text" name="choice" />
      <button>Submit</button>
      <button
        className="btn-reset"
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
    </form>
  );
}

export default function GameView(props) {
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
        setRoomDetails={setRoomDetails}
        setRoomName={setRoomName}
        room_name={room_name}
        setRoomOptions={setRoomOptions}
        looked={looked}
        setLooked={setLooked}
        room_details={room_details}
        room_options={room_options}
        trap={trap}
        setTrap={setTrap}
        hp={hp}
        setHp={setHp}
        stick={stick}
        setStick={setStick}
        approach={approach}
        setApproach={setApproach}
      />
    </div>
  );
}
