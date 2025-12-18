import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `http://localhost:5000/api/auth/createuser`;
    const data = {name: credentials.name, email: credentials.email, password: credentials.password };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const result = await response.json();
      if (result.token) {
        localStorage.setItem("token", result.token);
        console.log("success");
        navigate("/");
      }
    } catch (error) {
      console.error(error.message);
    }
    setCredentials({name: "", email: "", password: ""});
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="usernamesignup" className="form-label">
            Username
          </label>
          <input
            name="name"
            onChange={handleChange}
            type="text"
            className="form-control"
            id="usernamesignup"
            value={credentials.name}
            aria-describedby="emailHelp"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="signupInputEmail1" className="form-label">
            Email address
          </label>
          <input
            name="email"
            onChange={handleChange}
            type="email"
            className="form-control"
            id="signupInputEmail"
            value={credentials.email}
            aria-describedby="emailHelp"
            required
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="signupInputPassword1" className="form-label">
            Password
          </label>
          <input
            onChange={handleChange}
            type="password"
            className="form-control"
            id="signupInputPassword1"
            value={credentials.password}
            name="password"
            minLength={5}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
