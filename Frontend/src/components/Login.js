import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Login = (props) => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const HOST = process.env.REACT_APP_HOST;
    const url = `${HOST}/api/auth/login`;
    const data = { email: credentials.email, password: credentials.password };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        props.showAlert("Incorrect email or password", "danger");
        throw new Error(`Response status: ${response.status}`);
      }
      const result = await response.json();
      if (result.token) {
        localStorage.setItem("token", result.token);
        props.showAlert("Welcome back", "success");
        navigate("/");
      }
    } catch (error) {
      console.error(error.message);
      props.showAlert("Incorrect email or password", "danger");
    }
    setCredentials({ email: "", password: "" });
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            name="email"
            onChange={handleChange}
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            value={credentials.email}
            aria-describedby="emailHelp"
            required
          />
          <div id="emailHelp" style={{color: "white"}} className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            onChange={handleChange}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={credentials.password}
            name="password"
            required
          />
        </div>
        <button type="submit" style={{backgroundColor: "#EBD5AB"}} className="btn ">
          Login
        </button>
        <p className="mx-2" style={{display: "inline"}}> Click <Link to="/signup">here</Link> to create an account </p>
      </form>
    </div>
  );
};

export default Login;
