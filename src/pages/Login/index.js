import React, { useState } from 'react';
import {useNavigate, Link} from "react-router-dom";
import {auth} from '../../firebase'
import {signInWithEmailAndPassword} from 'firebase/auth';
import LoadingSpinner from "../../components/LoadingSpinner";

const Login = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false)
      navigate('/')
    } catch (err) {
      setErr(true)
      setLoading(false)
      console.log(err)
    }
  }
  return (
    <div className={'formContainer'}>
      <div className={'formWrapper'}>
        <span className={'logo'}>Є Chat</span>
        <span className={'title'}>Login</span>
        <form onSubmit={handleSubmit}>
          <div className={'inputField'}>
            <input type="email" placeholder={'Email'}/>
          </div>
          <div className={'inputField'}>
            <input type="password" placeholder={'Password'}/>
          </div>
          <button>Sign in</button>
        </form>
        <p>You don't have an account ? <Link to={'/register'}>Register</Link></p>
        {err && <span style={{marginBottom: '10px', textAlign: "center", color: 'red'}}>Something went wrong</span>}
      </div>
      {loading && <LoadingSpinner/>}
    </div>
  );
};

export default Login;