import React, { useState } from "react";
import NavBar from "../components/NavBar";
import { BsPlusCircleFill } from "react-icons/bs";
import { MdRemoveCircle } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

function HeartBeat() {
  const [inputList, setInputList] = useState([
    { scaleId: uuidv4(), currentWeight: "" },
  ]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([...inputList, { scaleId: uuidv4(), currentWeight: "" }]);
  };

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
        scales: [inputList],
      }
    );

    if(res.data?.success === true){
      alert("data successfully inserted")
    }

    console.log("res", res.data);
  };

  return (
    <NavBar>
      <div className="min-h-screen">
        <div className="w-11/12 lg:w-4/5 mx-auto h-auto my-20 p-2 lg:p-10 bg-gray-900">
          <form onSubmit={submit}>
            <div className="w-full flex justify-center items-center">
              <label for="machine" className="text-white my-4 select-none">
                Enter weight
              </label>
            </div>

            {inputList.map((x, i) => {
              return (
                <div className="w-full h-full flex items-center">
                  <div
                    key={i}
                    className="w-64 sm:w-11/12 mx-auto  justify-center h-full flex items-center my-2 "
                  >
                    <input
                      className="w-full focus:outline-none border-2 border-green-400 py-3 px-4 mx-4 rounded-lg"
                      name="currentWeight"
                      placeholder="Enter weight"
                      value={x.currentWeight}
                      onChange={(e) => handleInputChange(e, i)}
                    />
                  </div>

                  <div className="flex-1 h-full flex pl-0.5 lg:px-2  ">
                    {inputList.length !== 1 && (
                      <MdRemoveCircle
                        className="w-6 h-6 mr-3 lg:mr-5 text-red-500"
                        onClick={() => handleRemoveClick(i)}
                      />
                    )}
                    {inputList.length - 1 === i && (
                      <BsPlusCircleFill
                        className="w-5 h-5 text-blue-500"
                        onClick={handleAddClick}
                      />
                    )}
                  </div>
                </div>
              );
            })}
            <div className="w-4/5 mx-auto h-full flex justify-center items-center ">
              <button
                className="focus:outline-none -ml-12 lg:ml-0 w-32 my-4 px-4 py-3 hover:text-yellow-300 rounded-lg text-white border-2 border-green-400 select-none"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </NavBar>
  );
}

export default HeartBeat;
