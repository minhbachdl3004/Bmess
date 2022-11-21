import React from 'react'
import LoginForm from '../../components/LoginForm'
import Image from '../../assets/images/img1.png'
import './styles.scss'
import RegisterForm from '../../components/RegisterForm'

const Register = () => {
  return (
    <div className='register-page'>
        <RegisterForm />
        <img width="500" height="600" src={Image} alt="" />
    </div>
  )
}

export default Register