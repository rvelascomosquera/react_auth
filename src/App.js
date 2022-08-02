import axios from 'axios';
import { useEffect, useState } from 'react';
import LoginForm from './components/LoginForm';
import Welcome from './components/Welcome';
import './App.css';

function App() {

  const baseUrl = 'https://ms-discord-upy5mhs63a-rj.a.run.app';

  const [values, setValues] = useState({
    email: "jose@larnu.com",
    discordId: "310544245155168256"
  });
  const [logged, setLogged] = useState(false);

  const handleChange = (event) => {
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value
    }));
  }

  async function checkToken() {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    axios.get(`${baseUrl}/auth/check`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      setLogged(true);
    }).catch(err => {
      console.log(err);
      localStorage.removeItem('token');
    });
  }

  useEffect(()  => {
    // checkear si existe un token en el localStorage
    // si no existe, mostrar formulario de login
    // checkear si ese token es valido (endpoint check)
    // si es valido, setear logged a true
    // si no es valido, eliminar token de localStorage mostrar formulario de login
    checkToken();
  });

  function login() {
    axios.post(`${baseUrl}/auth/login`, values)
      .then(res => res.data.token)
      .then(token => {
        localStorage.setItem('token', token);
        console.log(token)
        setLogged(true);
      });
  }

  function submit(e) {
    e.preventDefault();
    login();
  }

  return (
    <div className="App">
      {
          logged ? <Welcome setLogged={setLogged} />
          : < LoginForm  
            values={values} 
            onChange={handleChange}
            submit={submit}
          />        
      }
    </div>
  );
}

export default App;
