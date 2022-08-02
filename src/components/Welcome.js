import { useEffect, useState } from "react";
import axios from 'axios';

export default function Welcome (props) {

  const [checked, setChecked] = useState(false);
  const [data, setData] = useState(null);
  const baseUrl = 'https://ms-discord-upy5mhs63a-rj.a.run.app';

  async function checkToken() {
    const token = localStorage.getItem('token');
    axios.get(`${baseUrl}/auth/check`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      setData(res.data);
      setChecked(true);
    })
  }

  useEffect(() => {
    checkToken();
  }, []);

  function logout() {
    localStorage.removeItem('token');
    props.setLogged(false);
  }
  
  return (
    <>
      { 
        checked ? 
        <div>
          Welcome {data.username} 
          <button onClick={logout}> logout</button>
        </div> 
        : <div>Loading...</div>
      } 
    </>
  )
}
