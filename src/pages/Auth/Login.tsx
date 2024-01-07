import { Component } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { paths } from "../../paths/paths";
import { authenticate } from "../../authservice";

interface LoginState {
  username: string;
  password: string;
}

interface ILoginProps {
  navigate: NavigateFunction;
}

class Login extends Component<ILoginProps, LoginState> {
  constructor(props: ILoginProps) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  async handleLogin(userName: string, password: string) {
    const generatedToken = await authenticate(userName, password);

    if (generatedToken) {
      this.props.navigate(paths.ROOT);
     
    }
  }

  render() {
    const { username, password } = this.state;
    return (
      <div>
        <div
          className="form-container border border-success rounded mx-auto"
          style={{ height: "370px", width: "350px" }}
        >
          <h3>Login</h3>
          <form style={{ width: "300px" }}>
            <div className="login-form-input-container">
              <label htmlFor="username" className=" py-1">
                UserName
              </label>
              <input
                type="text"
                name="username"
                id="username"
                required
                className="form-control border border-black"
                value={username}
                onChange={(e) => this.setState({ username: e.target.value })}
              />
            </div>
            <div className="login-form-input-container">
              <label htmlFor="password" className=" py-1">
                Password
              </label>
              <input
                type="password"
                required
                name="password"
                id="password"
                className="form-control border border-black"
                value={password}
                onChange={(e) => this.setState({ password: e.target.value })}
              />
            </div>
            <button
              type="button"
              className="btn btn-success w-100 mt-2"
              onClick={() => this.handleLogin(username, password)}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default function () {
  const navigate = useNavigate();

  return <Login navigate={navigate} />;
}
