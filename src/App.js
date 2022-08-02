import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const baseUrl = 'https://ms-discord-upy5mhs63a-rj.a.run.app';

  const [values, setValues] = useState({
    email: "jose@larnu.com",
    discordId: "310544245155168256"
  });
  const [token, setToken] = useState(null);
  const [logged, setLogged] = useState(false);


  const handleChange = (event) => {
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value
    }));
  }

  useEffect(()  => {
    // checkear si existe un token en el localStorage
    // si no existe, mostrar formulario de login
    // checkear si ese token es valido (endpoint check)
    // si es valido, setear logged a true
    // si no es valido, eliminar token de localStorage mostrar formulario de login
  });

  function login() {
    axios.post(`${baseUrl}/auth/login`, values)
      .then(res => res.data.token)
      .then(token => {
        setToken(token);
        setLogged(true);
      });
  }

  function submit(e) {
    e.preventDefault();
    login();
  }

  const Form = () => {
    return (
      <form className='form' onSubmit={submit}>
        <div>
          <label>email</label>
          <input 
            type="email"
            name='email'
            value={values.email || ''}
            onChange={handleChange}
            placeholder='email'
            required
          />
        </div>
        <div>
          <label>discordId</label>
          <input 
            type="text"
            name='discordId'
            value={values.discordId || ''}
            onChange={handleChange}
            placeholder='Discord Id'
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    );
  }

  const Welcome = () => {

    const [checked, setChecked] = useState(false);
    const [data, setData] = useState(null);

    async function checkToken() {
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

    return (
      <>
        { checked ? <div>Welcome {data.username}</div> : <div>Loading...</div>} 
      </>
    )
  }

  return (
    <div className="App">
      {
        logged ? <Welcome/> : <Form/>
      }
    </div>
  );
}

export default App;
