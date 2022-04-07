import React, { useState } from "react";
import Logo from "../../assets/Logo.transparente.png";
import "./style.css";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";

function Login() {
  const [user, setUser] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userPassword, setUserPassword] = useState(null);
  const [userKey, setUserKey] = useState(null);
  const [emailClass, setEmailClass] = useState("formP");
  const [passClass, setPassClass] = useState("formP");
  const [keyClass, setKeyClass] = useState("formP");

  const key = "SsRw8Om4XzVsaxUZPY_AmBWAqc8NzE68KvvfCsoNG4c";

  const auth = getAuth();

  return (
    <div className="container">
      <div>
        <img
          src={Logo}
          alt={"logo"}
          className="logo"
          onClick={() => {
            window.location.assign("https://projetogota.netlify.app/");
          }}
        />
      </div>
      <div className="form">
        <p className={emailClass}>E-MAIL</p>
        <input
          type="email"
          value={userEmail}
          onChange={(e) => {
            setUserEmail(e.target.value);
          }}
        ></input>
        <p className="formP">SENHA</p>
        <input
          type="password"
          value={userPassword}
          onChange={(e) => {
            setUserPassword(e.target.value);
          }}
        ></input>
        <p className={keyClass}>CHAVE DE ACESSO</p>
        <input
          type="text"
          value={userKey}
          onChange={(e) => {
            setUserKey(e.target.value);
          }}
        ></input>
        <button
          className="loginBTN"
          onClick={() => {
            setEmailClass("formP");
            setKeyClass("formP");
            if (userKey === key) {
              createUserWithEmailAndPassword(auth, userEmail, userPassword)
                .then((userCredential) => {
                  setUser(userCredential.user);
                  alert("usuário cadstrado com sucesso");
                  window.location.assign(
                    "https://projetogota.netlify.app/login"
                  );
                })
                .catch((err) => {
                  if (err.code === "auth/invalid-email") {
                    setEmailClass("formP-wrong");
                    alert("Email inválido");
                  }
                  console.log(err.code);
                  console.log(err.message);
                });
            } else {
              setKeyClass("formP-wrong");
              alert("Chave de acesso incorreta");
            }
          }}
        >
          CRIAR
        </button>
        <Link to={"/login"} className="signinBTN">
          Fazer Login
        </Link>
      </div>
    </div>
  );
}

export default Login;
