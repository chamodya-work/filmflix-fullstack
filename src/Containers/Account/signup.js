import React, { useEffect, useState } from "react";
import "./account.css";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [gUser, setGUser] = useState();
  const [email, setEmail] = useState("");

  // Function to save new user data to the backend
  const saveUserData = async (name, email, password) => {
    fetch("http://localhost:8081/addGUser", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    });
  };

  // useEffect to fetch user data whenever email state changes
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResult = await fetch(
          `http://localhost:8081/getGUserByEmail/${email}`
        );
        setGUser(await userResult.json());
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, [email]);

  // Validation functions
  const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return regex.test(password);
  };

  const validateForm = (name, email, password) => {
    if (!name || !email || !password) {
      alert("All fields are required.");
      return false;
    }
    if (!validateEmail(email)) {
      alert("Please enter a valid email.");
      return false;
    }
    if (!validatePassword(password)) {
      alert(
        "Password must be at least 6 characters long, contain a number and a special character."
      );
      return false;
    }
    return true;
  };

  const userValidation = () => {
    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;

    if (!validateForm(name, email, password)) return;

    if (gUser?.email === email) {
      alert("User already exists, Please login..!");
    } else {
      saveUserData(name, email, password);

      const user = {
        name: name,
        email: email,
        password: password,
      };

      localStorage.setItem("userEmail", email);
      let loggedUser = JSON.stringify(user);
      localStorage.setItem("loggedUser", loggedUser);

      navigate("/home");

      const sendEmail = async () => {
        fetch(`http://localhost:8081/registration/${email}`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            subject: "Registration to MYFLIX",
          }),
        });
      };
      sendEmail();
    }
  };

  const closePage = () => {
    navigate("/"); // Goes back to the previous page
  };

  return (
    <div className="wrapper__create">
      <div className="create-box">
        <button
          type="button"
          className="btn-close btn-close-white close-btn"
          onClick={closePage}
          aria-label="Close"
        ></button>
        <form>
          <label className="login-box-label">SIGN UP</label>
          <input
            required
            className="login-box-userInputs"
            type="text"
            placeholder="Enter your name"
            id="name"
          ></input>
          <input
            required
            className="login-box-userInputs"
            type="text"
            placeholder="Enter your email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          ></input>
          <input
            className="login-box-userInputs"
            type="password"
            placeholder="Enter your password"
            id="password"
          ></input>
          <label
            required
            className="login-box-linkToPage"
            onClick={() => {
              navigate("/login");
            }}
          >
            👉 Are you an existing user? Login here...
          </label>
          <input
            className="login-box-CreateButton"
            type="button"
            value="Create Account "
            onClick={userValidation}
          ></input>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
