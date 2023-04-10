import { useState } from "react";
import "./Style.css";

function RegisterUser() {
  //use state for firstname
  const [firstname, setFirstname] = useState("");
  //use state for lastname
  const [lastname, setLastname] = useState("");
  //use state for username
  const [username, setUsername] = useState("");
  //use state for password
  const [password, setPassword] = useState("");
  //use state for confirm password
  const [confirmpass, setConfirmpass] = useState("");

  //onchange for the useStates
  const fnameOnchange = (e) => {
    setFirstname(e.target.value);
  };
  //last name
  const lnameOnchange = (e) => {
    setLastname(e.target.value);
  };
  //username
  const unameOnchange = (e) => {
    setUsername(e.target.value);
  };
  //password
  const pwdOnchange = (e) => {
    setPassword(e.target.value);
  };
  //confirm password
  const confirmOnchange = (e) => {
    setConfirmpass(e.target.value);
  };

  //register handler
  const btnRegister = (e) => {
    e.preventDefault();
    fetch("", {
      method: "POST",
      body: JSON.stringify({
        firstname,
        lastname,
        username,
        password,
      }),
    });
  };

  return (
    <div class="first-container">
      <div class="second-container">
        <form>
          {/* first name */}
          <div class="input-div">
            <label forHTML="firstname" class="lbl">
              Firstname
            </label>
            <input
              type="text"
              value={firstname}
              onChange={fnameOnchange}
              id="firstname"
              placeholder="firstname"
            />
          </div>
          {/* last name  */}
          <div class="input-div">
            <label forHTML="lastname" class="lbl">
              Lastname
            </label>
            <input
              type="text"
              value={lastname}
              onChange={lnameOnchange}
              id="lastname"
              placeholder="lastname"
            />
          </div>
          {/* user name */}
          <div class="input-div">
            <label forHTML="username" class="lbl">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={unameOnchange}
              id="username"
              placeholder="username"
            />
          </div>
          {/* password */}
          <div class="input-div">
            <label forHTML="password" class="lbl">
              Password
            </label>
            <input
              type="text"
              value={password}
              onChange={pwdOnchange}
              id="password"
              placeholder="********"
            />
          </div>

          {/* confirm password  */}
          <div class="input-div">
            <label forHTML="confirmpass" class="lbl">
              Confirm
            </label>
            <input
              type="text"
              value={confirmpass}
              onChange={confirmOnchange}
              id="confirmpass"
              placeholder="********"
            />
          </div>
          {/* register button */}
          <button class="btnLogin" onClick={btnRegister}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterUser;
