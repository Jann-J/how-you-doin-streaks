import { useState, useEffect } from "react";
import supabase from "./config/supabaseClients";
//while submitting any form, e.preventDefault() is used to prevent the default action of the form
//like refreshing the page or submitting the form

function Try() {
  console.log(supabase);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const {data, error} = await supabase
        .from('users')
        .select('*');

        if(error){
          console.error(error);
        } else {
          setUsers(data);
          console.log(data);
        }
    }
    fetchUsers();
  }, []);
  return (

  <div>
    <h1>Hello people</h1>
    <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>DOB</th>
            <th>Age Group</th>
            <th>Gender</th>
            <th>Created At</th>
            <th>Streak</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.phone}</td>
              <td>{u.dob}</td>
              <td>{u.age_group}</td>
              <td>{u.gender}</td>
              <td>{new Date(u.created_at).toLocaleString()}</td>
              <td>{u.streak}</td>
            </tr>
          ))}
        </tbody>
      </table>
  </div>
  )
}

export default Try;
