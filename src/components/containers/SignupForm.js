import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Container, Label } from 'semantic-ui-react';

const SignupForm = props => {
  const { handleChange, handleSubmit } = props;
  return (
    <div>
      <Container text>
        <br />
        <br />
        <br />
        <div className="createBoxshadow">
          <Form className="signupform" onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <Form.Group widths={2}>
              <Form.Field>
                <Form.Input
                  id="first_name"
                  label="First name"
                  placeholder="first name"
                  onChange={handleChange}
                  required
                />
                <Label
                  className="first_name_error"
                  id="first_name_error"
                  basic
                  color="red"
                  pointing
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  id="last_name"
                  label="Last name"
                  placeholder="last name"
                  onChange={handleChange}
                  required
                />
                <Label
                  className="last_name_error"
                  id="last_name_error"
                  basic
                  color="red"
                  pointing
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths={2}>
              <Form.Field>
                <Form.Input
                  id="other_name"
                  label="Other names"
                  placeholder="other names"
                  onChange={handleChange}
                  required
                />
                <Label
                  className="other_name_error"
                  id="other_name_error"
                  basic
                  color="red"
                  pointing
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  id="username"
                  label="Username"
                  placeholder="username"
                  onChange={handleChange}
                  required
                />
                <Label
                  className="signup_error"
                  id="username_error"
                  basic
                  color="red"
                  pointing
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths={2}>
              <Form.Field>
                <Form.Input
                  id="email"
                  label="Email"
                  placeholder="email"
                  onChange={handleChange}
                  required
                />
                <Label
                  className="signup_error"
                  id="email_error"
                  basic
                  color="red"
                  pointing
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  id="mobile_number"
                  label="Phone e.g +254727427766"
                  placeholder="+254727427766"
                  onChange={handleChange}
                  required
                />
                <Label
                  className="signup_error"
                  id="phone_error"
                  basic
                  color="red"
                  pointing
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths={2}>
              <Form.Field>
                <Form.Input
                  id="password"
                  label="Password"
                  placeholder="password"
                  type="password"
                  onChange={handleChange}
                  required
                />
                <Label
                  className="signup_error"
                  id="password_error"
                  basic
                  color="red"
                  pointing
                />
              </Form.Field>
            </Form.Group>
            <Button id="signup_btn" type="submit">
              Sign Up
            </Button>
            <br />
            <br />
            <span>Already have an account? </span>
            <Link to="/">Login</Link>
            <br />
            <br />
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default SignupForm;
