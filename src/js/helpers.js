// import { useAsync } from 'react-async';

export function updateRoom(data, props) {
  console.log('Values that state is updated with:', data);
  props.setRoomName(data.room_name);
  props.setRoomDetails(data.room_details);
  props.setRoomOptions(data.room_options);
  props.setLooked(data.looked);
  props.setTrap(data.trap);
  props.setHp(data.hp);
  props.setStick(data.stick);
  props.setApproach(data.approach);
}

// only returns json data
// Sends post request
export const POST = async (url, uploadData = undefined) => {
  try {
    console.log('Upload Data:', uploadData);
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    });
    // const data = await res.json();
    if (!res.ok) throw new Error(`Couldn't fetch Data ${res.message}`);
    return await res.json();
  } catch (err) {
    console.error(err);
  }
};

// Bundles game state into a json file that is sent to the back-end
export const packagePostData = function (choice = 'default', props) {
  if (choice === 'default') {
    return {
      choice: choice,
      looked: 'false',
      room: 'entrance',
      trap: 'true',
      stick: 'false',
      hp: 20,
      approach: 4,
    };
  }

  return {
    choice: choice,
    looked: props.looked,
    room: props.room_name,
    trap: props.trap,
    stick: props.stick,
    hp: props.hp,
    approach: props.approach,
  };
};
