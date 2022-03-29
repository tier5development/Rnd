import './module.css';
import { Link } from 'react-router-dom';

const Main = () => {

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    }

    return (
        <div className="main_container">
            <nav className="navbar">
                <h1>QuizZ Application</h1>
                <button className="white_btn" onClick={handleLogout}>
                    Logout
                </button>
            </nav>
            <div className='startDiv'>
                <Link to="/settings">
                        <button type='button' className="startQuiz">Start Game</button>
                </Link>
            </div>
        </div>
    )
}

export default Main;