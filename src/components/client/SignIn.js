import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { connect } from "react-redux";
import { actOpenFormSignUp } from "../../actions/index";
import "../../css/client/Authform.css";
import callApi from "../../utils/apiCaller";
// import { Redirect } from 'react-router-dom'
// import { browserHistory } from 'react-router';
class SignIn extends Component {
  constructor(pros) {
    super(pros);
    this.state = {
      email: "",
      password: "",
      emailErr: "",
      passwordErr: "",
      err: "",
    };
  }

  validate = (email, password) => {
    let emailError = "";
    let passwordError = "";

    if (!email) {
      emailError = "The email field is required.";
    }
    if (!password) {
      passwordError = "The password field is required.";
    }

    if (emailError || passwordError) {
      this.setState({
        emailErr: emailError,
        passwordErr: passwordError,
      });
      return false;
    }
    return true;
  };

  onHandleChange = (e) => {
    let target = e.target;
    let name = target.name;
    let value = target.value;
    this.setState({
      [name]: value,
    });
    console.log(this.state.email, this.state.password);
  };

  onSubmit = (e) => {
    e.preventDefault();
    let { email, password } = this.state;
    let isValidate = this.validate(email, password);
    if (isValidate) {
      let account = {
        email,
        password,
      };
      // this.props.onLogin(account)
      callApi("api/auth/sign-in", "POST", account)
        .then((res) => {
          this.props.onLogin(res.data); // res.data = user
          this.props.onCloseModal();
        })
        .catch((error) =>
          this.setState({
            err: error.response.data.message,
          })
        );
    }
  };

  render() {
    let { email, password, emailErr, passwordErr, err } = this.state;
    return (
      <div className="Authform">
        <div className="header">
          <h1>Welcome Back</h1>
          <p>Login with your email & password</p>
        </div>
        {err && (
          <div
            style={{
              color: "rgb(97, 26, 21)",
              backgroundColor: "rgb(253, 236, 234)",
              textAlign: "center",
              padding: "15px",
              borderRadius: "4px",
            }}
          >
            {err}
          </div>
        )}
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Label for="Email">Email</Label>
            <Input
              type="email"
              name="email"
              id="Email"
              placeholder="EX: tho123@gmail.com"
              value={email}
              onChange={this.onHandleChange}
            />
            {emailErr && <div className="validation">{emailErr}</div>}
          </FormGroup>
          <FormGroup>
            <Label for="Password">Password</Label>
            <Input
              type="password"
              name="password"
              id="Password"
              placeholder="EX: 123456"
              value={password}
              onChange={this.onHandleChange}
            />
            {passwordErr && <div className="validation">{passwordErr}</div>}
          </FormGroup>
          <Button size="lg" block type="submit" className="btn">
            Continue
          </Button>
        </Form>
        <div className="footer">
          Don't have an account? &nbsp;
          <span className="signup" onClick={this.props.onOpenFormSignUp}>
            Sign up
          </span>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onOpenFormSignUp: () => {
      dispatch(actOpenFormSignUp());
    },
  };
};

export default connect(null, mapDispatchToProps)(SignIn);
