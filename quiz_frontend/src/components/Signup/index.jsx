import React,{useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import './module.css';

const Signup = () => {
    const [error, setError] = useState("");
    const [data, setData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:""
    });
    
    const navigate = useNavigate();

    const handleChange = ({currentTarget: input}) => {
        setData({...data,[input.name]:input.value})  // taking the data from the user from the client side and then setting it to the data.In the data previously there were only emplty strings with no values.
    };

    const handleSubmit =async (e) => {
        e.preventDefault()
        try {
            const url = "http://localhost:5000/user";
            const {data:res} = await axios.post(url,data);  //sending the data which are given as the input from the user to the api and database.
            navigate("/login")
            console.log(res.message);
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
        <div className="signup_container">
            <div className="signup_form_container">
                <div className="left">
                    <h1>Hey! Welcome Back</h1>
                    <Link to="/login">
                        <button type='button' className="white_btn">Sign In</button>
                    </Link>
                </div>
                <div className="right">
                    <form className='form_container' onSubmit={handleSubmit}>
                        <h1>Create Account</h1>
                        <input 
                        type="text" 
                        placeholder='First Name'
                        name='firstName'
                        onChange={handleChange}
                        value={data.firstName}
                        required
                        className="input" 
                        />
                        <input 
                        type="text" 
                        placeholder='Last Name'
                        name='lastName'
                        onChange={handleChange}
                        value={data.lastName}
                        required
                        className="input" 
                        />
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
                        <button type='submit' className='green_btn'>Sign UP</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup;