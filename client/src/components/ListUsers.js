import React, { useState, useEffect } from "react";
import axios from "axios";
import { Collapse } from "antd";
import { ListPosts } from ".";

const { Panel } = Collapse;

const ListUsers = props => {
  const [users, storeUsers] = useState([]); // stores the list of users from the server
  const id = props.match.params.id || "";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let results = await axios.get(`http://localhost:4000/api/users/${id}`);
        results = Array.isArray(results.data) ? results.data : [results.data];
        storeUsers(results);
      } catch (error) {
        console.log("Error retrieving users");
      }
    };
    fetchUsers();
  }, [id]);

  return (
    <Collapse defaultActiveKey={["0"]} accordion>
      {users.map((user, index) => (
        <Panel header={user.name} key={index}>
          <ListPosts id={user.id} />
        </Panel>
      ))}
    </Collapse>
  );
};

export default ListUsers;
