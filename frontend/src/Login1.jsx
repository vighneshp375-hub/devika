import {useState} from 'react';
import axios from 'axios';

function 

Login1(props){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [isRegistering, setIsRegistering] = useState(false);
    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3000/login', { 
                username: username,
                password: password 
            });
            if (response.status === 200) {
                props.setIsLoggedIn(true);
            }
        } catch (error) {
            alert("Invalid username or password.Try again!");
            console.error(error);
        }
    };
    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:3000/register', {
                username: username,
                password: password
            });
            if (response.status === 201) {
                alert("Account created successfully! You can now log in.");
                setIsRegistering(false);
            }
        } catch (error) {
            alert("Failed to create account.");
            console.error(error);

        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg -light" 
    style={{height:"100vh"}}>
      <div className="bg-white p-4 rounded shadow"
      style={{width:"400px"}}>
<h1 className="text-center mb-4">
    {isRegistering ? ("create account") : ("welcome back")}
        
</h1>
     <input
         type="text"
         placeholder="EnterUsername"
         className="form-control mb-3"
         onChange={(e) => setUsername(e.target.value)}
     />
     <input
         type="password"
         placeholder="Enter Password"
         className="form-control mb-3"
         onChange={(e) => setPassword(e.target.value)}
     />
        {isRegistering ? (
            <button className="btn btn-success w-100 mb-3" onClick={handleRegister}>
                Sign Up
            </button>
        ) : (
            <button className="btn btn-dark w-100 mb-3" onClick={handleLogin}>
                Login
            </button>
        )}
        <div className="text-center mb-3">
            {isRegistering ? (
                <p>
                    Already have an account? <br></br>
                    <span
                        className="text-primary"
                        style={{ cursor: "pointer", textDecoration:"underline" }}
                        onClick={() => setIsRegistering(false)}
                    >
                        Login here
                    </span>       
                </p>
            ) : (
                <p>
                    Don't have an account? <br></br>
                    <span
                        className="text-primary"
                        style={{ cursor: "pointer", textDecoration:"underline" }}
                        onClick={() => setIsRegistering(true)}
                    >
                        Register here
                    </span>
                </p>
            )}
        </div>
    </div>
    </div>
    );
}
export default Login1;