import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { Table, Thead, Tbody, Tr, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import axios from "axios";

function UserCart(props) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const res = axios.get(process.env.REACT_APP_CARDUSER_URL, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    setUsers(res.data);
  }, []);

  return (
    <NavBar>
      <div className="w-full h-auto p-10 select-none ">
        <Table className=" select-none">
          <Thead className=" select-none">
            <Tr className=" select-none">
              <Td className="font-bold text-xl select-none">s.no</Td>
              <Td className="font-bold text-xl select-none">Card Id</Td>
              <Td className="font-bold text-xl select-none">Bind Id</Td>
              <Td className="font-bold text-xl select-none">weight</Td>
            </Tr>
          </Thead>

          {users?.map((user, index) => {
            return (
              <>
                <Tbody key={index}>
                  <Tr>
                    <Td>{index}</Td>
                    <Td>{user.cardId}</Td>
                    {Object.entries(user.machineSessionCart).forEach((item) => {
                      return (
                        <>
                          <Td>{item.bindId}</Td>
                          <Td>{item.weight}</Td>
                        </>
                      );
                    })}
                  </Tr>
                </Tbody>
                ;
              </>
            );
          })}
        </Table>
      </div>
    </NavBar>
  );
}

export default UserCart;
