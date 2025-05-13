import React, { Component } from 'react'


export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname:'',
      email: '',
      password: '',
      };
      this.handleSubmit=this.handleSubmit.bind(this);
  }
  handleSubmit=(e)=>{
    e.preventDefault();
    const{ firstname, lastname, email, password }= this.state;
    console.log(firstname, lastname, email, password);
    fetch("http://localhost:5000/register",{
    method:"POST",
    crossDomain:"true",
    headers:{
      "Content-Type":"application/json",
      Accept:"application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body:JSON.stringify({
      firstname,
      lastname,
      email,
      password,
    }),
  }).then((result)=>result.json())
  .then((data)=>{
    console.log(data,"userRegister");
  })
  .catch((error) => console.error("Signup Error:", error));
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Sign Up</h3>
        
        <div className="mb-3">
          <label>First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            onChange={(e)=>this.setState({firstname:e.target.value})}
          />
        </div>

        <div className="mb-3">
          <label>Last name</label>
          <input type="text" className="form-control" placeholder="Last name" 
          onChange={(e)=>this.setState({lastname:e.target.value})}
          />
        </div>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e)=>this.setState({email:e.target.value})}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e)=>this.setState({password:e.target.value})}
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/sign-in">sign in?</a>
        </p>
      </form>
    )
  }
}