import React from "react";
import './LoginForm.css';

export default function LoginForm (props) {

  return (
    <form className='form' onSubmit={props.submit}>
      <h1>Sign in to Discord </h1>
      <div className="container">
        <label>Email</label>
        <input 
          type="email"
          name='email'
          value={props.values.email || ''}
          onChange={props.handleChange}
          placeholder='email'
          required
        />
      </div>
      <div className="container">
        <label>Discord Id</label>
        <input 
          type="text"
          name='discordId'
          value={props.values.discordId || ''}
          onChange={props.handleChange}
          placeholder='Discord Id'
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );

}