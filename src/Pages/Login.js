import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import { PageTitle } from "../Components/page-header";

const Login = (props) => {
  const [userInput, setUserInput] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [fieldError, setFieldError] = useState({
    email: false,
    password: false,
    message: "",
  });

  const updateUserInput = (e) => {
    setUserInput(prevInput => ({
      ...prevInput, [e.target.name]: e.target.value
    }));

    setFieldError(prevInput => ({
      ...prevInput, [e.target.name]: false
    }));

    setFieldError(prevInput => ({
      ...prevInput, message: ""
    }));
  }

  const onSubmit = async (e) => {
    e.preventDefault();    
    if(userInput.email != "" && userInput.password != "") {
      if(userInput.email.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
        try {
          await props.login(userInput.email, userInput.password);
        } catch(e) {
          setFieldError(prevInput => ({
            ...prevInput, message: e.message
          }));
        }
        console.log("submit Form");
      } else {
        setFieldError(prevInput => ({
          ...prevInput, email: true
        }));

        setFieldError(prevInput => ({
          ...prevInput, message: "Your email appears to be in the wrong format."
        }));
      }
    } else {
      if(userInput.email == "") {
        setFieldError(prevInput => ({
          ...prevInput, email: true
        }));
      } 

      if(userInput.password == "") {
        setFieldError(prevInput => ({
          ...prevInput, password: true
        }));
      }

      setFieldError(prevInput => ({
        ...prevInput, message: "Invalid Email/Password"
      }));
    }
  }

  return (
    <>
    <PageTitle name="Login"/>
    <div className="flex fl-center">
      <div className="content-widthfix about-wrapper flex fl-col">
        <h2 className='selection-header-text'>Log In to Your Account</h2>
        <p className='selection-small-text'>Login form that will lead to dashboard</p>
        {fieldError.message && <div className="alert alert-danger mt-0" role="alert">{fieldError.message}</div>}
        <form>
          <section className="card card-light card-body border-0 shadow-sm p-4 mb-4" id="basic-info">
            <div className="mb-3">
              <label htmlFor="emailAddress" className="form-label mb-2">Email Address</label>
              <input type="email" className={fieldError.email ? 'form-control is-invalid' : 'form-control'} id="emailAddress" required="" name="email" value={userInput.email} onChange={updateUserInput} placeholder="Enter Your Email"/>
            {fieldError.email && <div id="validationServer03Feedback" className="invalid-feedback mt-0 mb-0">Please provide a valid email.</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label mb-2">Password</label>
              <input type="password" className={fieldError.password ? 'form-control is-invalid' : 'form-control'} id="password" required="" name="password" value={userInput.password} onChange={updateUserInput} placeholder="Enter Password"/>
              {fieldError.password && <div id="validationServer03Feedback" className="invalid-feedback mt-0 mb-0">Please provide a valid password.</div>}
            </div>
            <div className="d-grid mb-3">
              <button className="btn btn-primary full-width height-10px" type="button" onClick={onSubmit}>Login to Dashboard</button>
            </div>
          </section>
        </form>
      </div>
    </div>
    </>
  )
}

export default Login;