import { useState } from "react";
import axios from 'axios';

export default function Welcome (props) {

  const [checked, setChecked] = useState(false);
    const [data, setData] = useState(null);
    const tokens = localStorage.getItem('token')
    
    async function checkToken() {
      axios.get(`${props.baseUrl}/auth/check`, {
        headers: {
          Authorization: `Bearer ${tokens}`
        }
      }).then(res => {
        setData(res.data);
        setChecked(true);
      })
    }

    checkToken();
    
    return (
      <>
        { checked ? <div>Welcome {data.username}</div> : <div>Loading...</div>} 
      </>
    )
  }
