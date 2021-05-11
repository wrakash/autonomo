import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { Table, Thead, Tbody, Tr, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import axios from "axios";

function UserCart(props) {
  const [user, setUser] = useState({
    cardId: "hhffuser",
    machineSessionCart: {
      "001": {
        binId: "001",
        weight: 200.0,
      },
      "002": {
        binId: "002",
        weight: 300.0,
      },
    },
  });

  useEffect(async () => {
    const res = await axios.get(process.env.REACT_APP_CARDUSER_URL, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    setUser(res.data);
  }, []);

  console.log("user: ", user);

  return (
    <NavBar>
      <div className="w-full h-full p-10  my-8 sm:my-12 md:my-0 lg:my-0 ">
        <div className="w-full h-full flex flex-col  items-center">
          <h2 className="font-bold mb-4 border-b-2 border-black">
            <span className="uppercase">CardId</span>: {user.cardId}
          </h2>

          <Table className="">
            <Thead className=" select-none">
              <Tr className=" select-none">
                <Td className="font-bold text-xl select-none">S.no</Td>
                <Td className="font-bold text-xl select-none">Bind Id</Td>
                <Td className="font-bold text-xl select-none">weight</Td>
              </Tr>
            </Thead>

            {Object.keys(user.machineSessionCart).map((key, index) => (
              <Tbody key={index}>
                <Tr>
                  <Td>{index}</Td>
                  <Td key={key}>{user.machineSessionCart[key].binId}</Td>
                  <Td key={key}>{user.machineSessionCart[key].weight}</Td>
                </Tr>
              </Tbody>
            ))}
          </Table>
        </div>
      </div>
    </NavBar>
  );
}

export default UserCart;
