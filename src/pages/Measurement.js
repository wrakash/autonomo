import React, { useState } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";



const inputData = {
  bindId: "",
  weightAfterAction: "",
};

function Measurement() {


  const [values, setValues] = useState(inputData);
  const [weightDiff, setWeightDiff] = useState();

  const submit = async (e) => {
    e.preventDefault();

    const res = await axios.post(
      process.env.REACT_APP_MEASUREMENT_URL,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
      {
        machineId: localStorage.getItem("unlock-token"),
        bindId: values.bindId,
        weightAfterAction: values.weightAfterAction,
      }
    );
    setWeightDiff(res.data?.data);
  };

  const setValue = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  return (
    <NavBar>
      <div className="bg-gray-200 min-h-screen flex flex-col items-center">
        <div className="w-4/5 h-96 my-20 mx-auto  flex justify-center items-center bg-gray-900">
          <form
            onSubmit={submit}
            className="w-full flex flex-col justify-center items-center"
          >
            

            <label for="machine" className="text-white">
              Enter bind Id
            </label>
            <input
              onChange={(e) => setValue(e)}
              className="w-4/5 my-4 rounded-lg px-4 py-3 focus:outline-none"
              type="text"
              name="bindId"
              placeholder="Enter Cart Name"
            />
            <label for="machine" className="text-white">
              Enter weight
            </label>
            <input
              onChange={(e) => setValue(e)}
              className="w-4/5 my-4 rounded-lg px-4 py-3 focus:outline-none"
              type="text"
              name="weightAfterAction"
              placeholder="Enter Weight"
            />
            <button
              type="submit"
              className="focus:outline-none w-32 my-4 px-4 py-3 hover:text-yellow-300 rounded-lg text-white border-2 border-green-400 select-none"
            >
              Measure
            </button>
          </form>
        </div>
      </div>
      {weightDiff ? <h2>{weightDiff}</h2> : null}
    </NavBar>
  );
}

export default Measurement;
