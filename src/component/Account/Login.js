import "./Style.css";
import { useState } from "react";

function UserLogin() {
  //useState for username
  const [username, setUsername] = useState("");
  //use state for password
  const [password, setPassword] = useState("");

  //username onchange handler
  const usernameOnchange = (e) => {
    setUsername(e.target.value);
  };
  //password onchange handler
  const passwordOnchange = (e) => {
    setPassword(e.target.value);
  };

  //function to log user in
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:1234/auth/login", {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
        }),
      });
      console.log('response' + response);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div class="first-container">
      <div class="second-container">
        <form onSubmit={onSubmit}>
          <div class="input-div">
            <label forHTML="username" class="lbl">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={usernameOnchange}
              id="username"
              placeholder="username"
            />
          </div>

          <div class="input-div">
            <label forHTML="password" class="lbl">
              Password
            </label>
            <input
              type="text"
              value={password}
              onChange={passwordOnchange}
              id="password"
              placeholder="********"
            />
          </div>

          <button class="btnLogin">Login</button>
          <div class="input-div">
            <p>Don't have an account?</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserLogin;
