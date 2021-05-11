import React, { useState } from "react";
import Header from "../components/Header";
import axios from "axios";

import { useHistory } from "react-router-dom";

const inputData = {
  machineId: "",
  cardId: "",
};

function LockPage() {
  const history = useHistory();

  const [values, setValues] = useState(inputData);


  const submit = async (e) => {
    e.preventDefault();

    console.log("value: ", values);

    const res = await axios.post(
      process.env.REACT_APP_UNLOCK_URL,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
      {
        machineId: `${values.machineId}-machine`,
        cardId: `${values.cardId}-card`,
        accessMode: "NFC",
      }
    )

    if (res.data?.success === true) {
      localStorage.setItem("unlock-token", values.machineId);
      history.push("/");
    }
  }

  const setValue = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };



  return (
    <div className="min-h-screen flex flex-col items-center">
      <Header />
      <div className="w-4/5 h-96 my-20 mx-auto  flex justify-center items-center bg-gray-900">
        <form
          onSubmit={submit}
          className="w-full flex flex-col justify-center items-center"
        >
          <label for="machine" className="text-white">
            Enter Machine Name
          </label>
          <input
            onChange={(e) => setValue(e)}
            className="w-4/5 my-4 rounded-lg px-4 py-3 focus:outline-none"
            type="text"
            name="machineId"
            placeholder="Enter Machine Name"
          />
          <label for="machine" className="text-white">
            Enter Card Name
          </label>
          <input
            onChange={(e) => setValue(e)}
            className="w-4/5 my-4 rounded-lg px-4 py-3 focus:outline-none"
            type="text"
            name="cartId"
            placeholder="Enter Cart Name"
          />
          <button
            type="submit"
            className="focus:outline-none w-32 my-4 px-4 py-3 hover:text-yellow-300 rounded-lg text-white border-2 border-green-400 select-none"
          >
            Unlock 
          </button>
        </form>
      </div>
    </div>
  );
}

export default LockPage;
