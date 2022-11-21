import React from 'react'
import LoginForm from '../../components/LoginForm'
import Image from '../../assets/images/img1.png'
import './styles.scss'

const Login = () => {
  const myImageStyle = { width: '500px', height: '600px' };
  return (
    <div className='login-page'>
        <LoginForm />
        <img width="500" height="600" src={Image} alt="" />
    </div>
  )
}

export default Login