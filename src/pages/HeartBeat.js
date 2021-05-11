import React, { useState } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";

import { v4 as uuidv4 } from "uuid";

const data = {
  scaleId: "",
  currentWeight: "",
  secondWeight: "",
};

function HeartBeat() {
  const [values, setValues] = useState(data);

  const submit = async (e) => {
    e.preventDefault();

    const res = await axios.post(
      process.env.REACT_APP_HEARTBEAT_URL,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
      {
        machineId: localStorage.getItem("unlock-token"),
        scales: [
          {
            scaleId: uuidv4(),
            currentWeight: values.currentWeight,
          },
          {
            scaleId: uuidv4(),
            currentWeight: values.secondWeight,
          },
        ],
      }
    )

    if(res.data?.success === true){
      alert("data successfully inserted")
    }
  };

  const setValue = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  return (
    <NavBar>
      <div className="w-4/5 h-auto my-20 mx-auto  flex justify-center items-center bg-gray-900">
        <form
          onSubmit={submit}
          className="w-full flex flex-col justify-center items-center"
        >
          <label for="machine" className="text-white my-4 select-none">
            Enter weight 
          </label>

          <input
            className="w-4/5 my-4 rounded-lg px-4 py-3 focus:outline-none"
            type="text"
            name="currentWeight"
            placeholder="Enter weight..."
            onChange={(e) => setValue(e)}
          />

          <input
            className="w-4/5 my-4 rounded-lg px-4 py-3 focus:outline-none"
            type="text"
            name="secondWeight"
            placeholder="Enter weight ..."
            onChange={(e) => setValue(e)}
          />

          <button
            type="submit"
            className="focus:outline-none w-32 my-4 px-4 py-3 hover:text-yellow-300 rounded-lg text-white border-2 border-green-400 select-none"
          >
            submit
          </button>
        </form>
      </div>
    </NavBar>
  );
}

export default HeartBeat;
