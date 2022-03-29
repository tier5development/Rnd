import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import './module.css';

const Login = () => {
    const [error, setError] = useState("");
    const [data, setData] = useState({
        email:"",
        password:""
    });

    const handleChange = ({currentTarget: input}) => {
        setData({...data,[input.name]:input.value})
    };

    const handleSubmit =async (e) => {
        e.preventDefault()
        try {
            const url = "http://localhost:5000/auth";
            const {data:res} = await axios.post(url,data);  //sending the data which are given as the input from the user to the api and database.
            localStorage.setItem("token", res.data);
            window.location = "/";
        } catch (error) {
            if(error.response && 
                error.response.status >= 400 &&
                error.response.status <= 500
                ) {
                    setError(error.response.data.message)
                }
        }
    }
    return (
        <div className="login_container">
            <div className="login_form_container">
                <div className="left">
                <form className='form_container' onSubmit={handleSubmit}>
                        <h1>Login To Your Account</h1>
                        <input 
                        type="email" 
                        placeholder='Email'
                        name='email'
                        onChange={handleChange}
                        value={data.email}
                        required
                        className="input" 
                        />
                        <input 
                        type="password" 
                        placeholder='Password'
                        name='password'
                        onChange={handleChange}
                        value={data.password}
                        required
                        className="input" 
                        />
                        {error && <div className="error_msg">{error}</div>}
                        <button type='submit' className='green_btn'>Sign In</button>
                    </form>
                </div>
                <div className="right">
                <h1>New User ? </h1>
                    <Link to="/signup">
                        <button type='button' className="white_btn">
                            Sign Up
                            </button>
                    </Link>
      
                </div>
            </div>
        </div>
    )
}

export default Login;