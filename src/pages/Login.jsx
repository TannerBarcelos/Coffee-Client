import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import MessagePopup from '../components/common/MessagePopup'
import { axiosInstance } from '../utils/axios'

const Login = ({ setUser }) => {
  let navigate = useNavigate()

  const [state, setState] = useState({
    email: '',
    password: '',
  })

  const [popup, setPopup] = useState(null) // holds error state

  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await axiosInstance.post('/auth/login', {
        data: {
          email: state.email,
          password: state.password,
        },
      })
      const info = result.data
      if (info.isAuthenticated) {
        setPopup({ msg: info.message + '!', color: 'green' })
        setTimeout(() => {
          setUser(info.data.role, info.isAuthenticated, info.data)
          navigate('/profile')
        }, 1500)
      } else {
        setPopup({ msg: info.message, color: 'red' })
        setTimeout(() => setPopup(null), 3000)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main id='login__main-container'>
      <form className='login__form' onSubmit={onSubmit}>
        {popup ? <MessagePopup msg={popup} style={{ width: '100%' }} /> : null}
        <h1 className='hero-text'>Login</h1>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          name='email'
          onChange={onChange}
          id='email'
          minLength='11'
          maxLength='100'
          required
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='password'
          onChange={onChange}
          id='password'
          minLength='8'
          maxLength='25'
          required
        />
        <input type='submit' value='Submit' />
      </form>
    </main>
  )
}

export default Login
