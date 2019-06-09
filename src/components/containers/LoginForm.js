import React from 'react';
import { Button, Form, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const LoginForm = props => {
  const { handleChange, handleSubmit } = props;
  return (
    <div>
      <Container text>
        <br />
        <br />
        <br />

        <div className="loginForm">
          <Form onSubmit={handleSubmit}>
            <h1>Login</h1>

            <Form.Field>
              <label>Email</label>
              <input
                id="user_name"
                placeholder="email"
                onChange={handleChange}
                required
              />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input
                name="password"
                type="password"
                id="password"
                placeholder="password"
                onChange={handleChange}
                required
              />
            </Form.Field>
            <Button type="submit" id="submit_btn">
              Login
            </Button>
            <br />
            <br />
            <span>New user? </span>
            <Link to="/signup">Signup</Link>
            <br />
            <br />
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default LoginForm;
