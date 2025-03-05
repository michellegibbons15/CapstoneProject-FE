import React, {useState, useEffect} from 'react'
import "../../Styles/Login/AuthForm.css"
import {useLocation, useNavigate} from 'react-router-dom'

export default function AuthForms() {
  const [activeForm, setActiveForm] = useState("login");
  const location = useLocation();
  const navigate = useNavigate();
  const message = location.state?.message;
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState(null);

 useEffect(() => {
    if (message) {
      // If there's a message (e.g., "Log Out Successful"), show the modal
      setShowModal(true);
      // Hide the modal after 2 seconds
      setTimeout(() => {
        setShowModal(false);
      }, 2000);
    }
  }, [message]);
  const toggleForms = (formType) => setActiveForm(formType);

// capture input changes correctly
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8081/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: formData.username, password: formData.password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Login successful:", data);
        localStorage.setItem("token", data.token);
        navigate("/dashboard"); // Redirect to dashboard after login
      } else {
        setError(data.message || "Login failed.");
      }
    } catch (err) {
      setError("Error connecting to server.");
    }
  };

  // handle signup
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8081/api/users/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Signup successful:", data);
        navigate("/dashboard");
      } else {
        setError(data.message || "Signup failed.");
      }
    } catch (err) {
      setError("Error connecting to server.");
    }
  };

  return (
    <div>
      {message && showModal && (
        <div className="modal show">{message} </div> )}

    <div className="LoginContainer">
  {/* Log in Form */}
        <div id="loginForm" className={`form-container ${activeForm === "login" ? "active" : "hidden"}`}>
          <h2>Log In</h2>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleLogin}>
            <label htmlFor="first">Username:</label>
            <input type="text" id="username" name="username" placeholder="Enter your Username" required value={formData.username}
              onChange={handleInputChange}/>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" placeholder="Enter your Password" required value={formData.password}
              onChange={handleInputChange}/>
            <button type="submit">Log In</button>
            <label className="rememberMe">
              <input type="checkbox" className="checkbox" />Remember Me
            </label>
            <p><a href="#" onClick={() => toggleForms("forgotPassword")}>Forgot Password?</a></p>
            <p>Don't have an account? <a href="#" onClick={() => toggleForms("signup")}>Sign up</a></p>
          </form>
        </div>
  {/* Sign  up Form */}
        <div id="signupForm" className={`form-container ${activeForm === "signup" ? "active" : "hidden"}`}>
          <h2>Sign Up</h2>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSignup}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" placeholder="Enter your Name" required value={formData.name}
              onChange={handleInputChange}/>
            <label htmlFor="newUser">Username:</label>
            <input type="text" id="username" name="username" placeholder="Enter your Username" required value={formData.username}
              onChange={handleInputChange}/>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Enter your Email" required value={formData.email}
              onChange={handleInputChange}/>
            <label htmlFor="newPassword">Password:</label>
            <input type="password" id="password" name="password" placeholder="Enter your Password" required value={formData.password}
              onChange={handleInputChange}/>
            <button type="submit">Sign Up</button>
            <p>Already have an account? <a href="#" onClick={() => toggleForms("login")}>Log in</a></p>
          </form>
        </div>
  {/* Forgot Password Form */}
        <div id="forgotPasswordForm" className={`form-container ${activeForm === "forgotPassword" ? "active" : "hidden"}`}>
          <h2>Forgot Password?</h2>
          <form>
            <label htmlFor="emailReset">Enter your Email:</label>
            <input type="email" id="emailReset" name="emailReset" placeholder="Enter your Email" required />
            <button type="submit">Reset Password</button>
            <p>Remember your password? <a href="#" onClick={() => toggleForms("login")}>Log in</a></p>
          </form>
        </div>
     
    </div>
    </div>
  );
}