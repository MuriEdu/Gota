import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.transparente.png";
import Madre from "../../assets/madre.png";
import Inicio from "../../assets/inicio.png";
import "./style.css";

function AboutUs() {
  return (
    <div>
      <div className="header">
        <img src={Logo} alt={"logo"} className="logo" />
        <Link to={"/"} className="homeButton">
          {" "}
          Home{" "}
        </Link>
      </div>
      <div className="content">
        <div className="project">
          <div className="projectText">
            <h2 className="projectTitle">Projeto Gota:</h2>
            <div className="projectTextDiv">
              <p className="projectParagraph">
                O projeto gota recebeu esse nome por conta da frase de Madre
                Teresa de Calcutá “eu sei que meu trabalho é uma gota no oceano,
                mas sem ele o oceano seria menor”. Depois dessa frase criamos
                nosso lema “uma gota de compaixão em um mundo sem ação”
              </p>
            </div>
          </div>
          <div className="projectImg">
            <img src={Madre} alt={"Madre Tereza"} className="madre" />
          </div>
        </div>
        <div className="project" id="start">
          <div className="projectImg">
            <img src={Inicio} alt={"inicio"} className="madre" />
          </div>
          <div className="projectText">
            <h3 className="projectTitle">Início:</h3>
            <div className="projectTextDiv">
              <p className="projectParagraph">
                A ideia do projeto surgiu quando em uma ação social da nossa
                escola levamos cadeiras de rodas para um abrigo de idosos e nos
                encantamos, descobrimos essa outra realidade que estava fora da
                nossa bolha. Percebendo todos seus problemas decidimos tomar
                alguma providência. Um ano depois o projeto gota surgiu e
                estamos aqui apresentando-o a você e tornando-o oficial.
              </p>
            </div>
          </div>
        </div>
        <div className="objective">
          <h3 className="objectiveTitle">Objetivo:</h3>
          <p className="objectiveText">
            Nosso principal objetivo com isso é realmente fazer com que as
            pessoas saiam de suas zonas de conforto e vejam essa outra realidade
            que precisa de ajuda mensalmente. Acreditamos que apenas arrecadar
            produtos materiais não é o suficiente, então, além disso, queremos
            sensibiliza-las para que nos ajudem com maior divulgação e maiores
            arrecadações.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
