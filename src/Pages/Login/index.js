import React, { useState } from "react";
import Logo from "../../assets/Logo.transparente.png";
import "./style.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineBorder, AiOutlineCheckSquare } from "react-icons/ai";

function Login() {
  const [user, setUser] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userPassword, setUserPassword] = useState(null);
  const [img, setImg] = useState(null);
  const [emailClass, setEmailClass] = useState("formP");
  const [passClass, setPassClass] = useState("formP");
  const [keepBoxClass, setKeepBoxClass] = useState("keepBoxClass");
  const [keepBoxCheckClass, setKeepBoxCheckClass] = useState("none");
  const [keepOption, setKeepOption] = useState(false);

  const auth = getAuth();
  const navigate = useNavigate();

  return (
    <div className="container">
      <div>
        <img
          src={Logo}
          alt={"logo"}
          className="logo"
          onClick={() => {
            navigate("/");
          }}
        />
      </div>
      <div className="form">
        <p className={emailClass}>E-MAIL</p>
        <input
          className="loginInput"
          type="email"
          value={userEmail}
          onChange={(e) => {
            setUserEmail(e.target.value);
          }}
        ></input>
        <p className={passClass}>SENHA</p>
        <input
          className="loginInput"
          type="password"
          value={userPassword}
          onChange={(e) => {
            setUserPassword(e.target.value);
          }}
        ></input>
        <button
          className="loginBTN"
          id="loginBTNId"
          onClick={() => {
            signInWithEmailAndPassword(auth, userEmail, userPassword)
              .then((userCredential) => {
                setUser(userCredential.user);
                if (keepOption === true) {
                  window.localStorage.setItem("@KEEP", "true");
                  window.localStorage.setItem(
                    "@TOKEN-key",
                    JSON.stringify(userCredential.user)
                  );
                } else {
                  window.sessionStorage.setItem(
                    "@TOKEN-key",
                    JSON.stringify(userCredential.user)
                  );
                }
                navigate("/painel");
              })
              .catch((err) => {
                setEmailClass("formP");
                setPassClass("formP");
                const code = err.code;
                if (code === "auth/invalid-email") {
                  setEmailClass("formP-wrong");
                  alert("Email inválido");
                }
                if (code === "auth/wrong-password") {
                  setPassClass("formP-wrong");
                  alert("Senha inválida");
                }
                if (code === "auth/user-not-found") {
                  alert("Usuário não cadastrado");
                }
                console.log(err.code);
                console.log(err.message);
              });
          }}
        >
          LOGIN
        </button>
        <div
          className="keepConnectedDiv"
          onClick={() => {
            setKeepBoxClass(keepBoxCheckClass);
            setKeepBoxCheckClass(keepBoxClass);
            setKeepOption(!keepOption);
          }}
        >
          <AiOutlineBorder className={keepBoxClass} />
          <AiOutlineCheckSquare className={keepBoxCheckClass} />
          <p className="keepConnectedText">Me manter conectado</p>
        </div>
        <Link to={"/signup"} className="signinBTN">
          Fazer Cadastro
        </Link>
      </div>
    </div>
  );
}

export default Login;
