import React, { useState } from "react";
import "./style.css";
import Logo from "../../assets/Logo.transparente.png";
import LaSalle from "../../assets/lasallelogo.png";
import { BsWhatsapp, BsInstagram } from "react-icons/bs";
import { MdOutlineMailOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { getData } from "../../firebase";

function HomePage() {
  const defaltDb = [
    {
      name: "undefined",
      description: "undefined",
      startDate: "undefined",
      endDate: "undefined",
      products: ["undefined"],
      picture: "undefined",
      id: "undefined",
      collectPoint: ["undefined"],
    },
  ];

  const [currentCollectionHome, setCurrentCollectionHome] = useState(defaltDb);

  getData().then(() => {
    setCurrentCollectionHome(getCurrentColection());
    return;
  });

  function getCurrentColection() {
    const collection = JSON.parse(window.sessionStorage.getItem("@DON"));
    const currentCollection = collection.filter((item) => {
      if (item.isCurrent === true) {
        return item;
      }
    });
    return currentCollection;
  }

  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  function getMonth(date) {
    try {
      const monthIdStr = date.substr(3, 2);
      const monthId = parseInt(monthIdStr);
      if (months[monthId - 1] === undefined) {
        return "Erro";
      } else {
        return months[monthId - 1];
      }
    } catch (err) {
      console.log(err);
      return "Erro";
    }
  }

  return (
    <div>
      <div className="homeMenu">
        <div className="socialMenu">
          <button
            className="whatsapp"
            onClick={() => {
              window.location.assign(
                "https://chat.whatsapp.com/CONgHqrV7piGS2F9navtSJ"
              );
            }}
          >
            <BsWhatsapp className="whatsappIcon" />
          </button>
          <button
            className="instagram"
            onClick={() => {
              window.location.assign(
                "https://instagram.com/projeto_gota_?utm_medium=copy_link"
              );
            }}
          >
            <BsInstagram className="instagramIcon" />
          </button>
          <button
            className="email"
            onClick={() => {
              window.location.assign("mailto:projeto.gota2020@gmail.com");
            }}
          >
            <MdOutlineMailOutline className="emailIcon" />
          </button>
        </div>
        <Link to={"/about-us"} className="aboutUsButton">
          Sobre Nós
        </Link>
      </div>
      <div className="sloganDiv">
        <div className="slogan1">
          <h1 className="sloganTxt">"Uma </h1>
          <h1 className="sloganTxt" id="blueSlogan">
            gota{" "}
          </h1>
          <h1 className="sloganTxt">de compaixão</h1>
        </div>
        <div className="slogan2">
          <h1 className="sloganTxt">em um mundo sem </h1>
          <h1 className="sloganTxt" id="blueSlogan">
            ação
          </h1>
          <h1 className="sloganTxt">"</h1>
        </div>
      </div>
      <div className="seeDonations">
        <div className="box1">
          <img src={Logo} alt={"logo"} className="smallLogo"></img>
        </div>
        <div className="box2">
          <Link to="/collections" className="donationHomeButton">
            Arrecadações
          </Link>
        </div>
      </div>
      <div className="collectionTitle">
        <h2>Arrecadação Atual</h2>
      </div>

      <div className="currentHomeDiv">
        <div className="currentHomeBox1">
          <div className="homeBox1Chield">
            <h2 className="monthTitleHome" id="homeMonthTitle">
              {getMonth(currentCollectionHome[0].startDate)}
            </h2>
            <div className="instituteNameHome">
              <p className="dataStyle" id="homeNameTitle">
                Instituição:{" "}
                {
                  <p className="nameTitle" id="homeNameText">
                    {currentCollectionHome[0].name}
                  </p>
                }
              </p>
            </div>
          </div>
        </div>
        <div className="currentHomeBox2">
          <p className="dataStyle" id="homeDataStyle">
            Dos dias {currentCollectionHome[0].startDate} até{" "}
            {currentCollectionHome[0].endDate}
          </p>
        </div>
        <div className="currentHomeBox3">
          <p className="nameTitle" id="homeProductsTitle">
            Produtos:
          </p>
          {currentCollectionHome[0].products.map((value) => {
            return (
              <li className="productData" id="homeProductData">
                {value}
              </li>
            );
          })}
        </div>
        <div className="currentHomeBox4">
          <p className="nameTitle" id="homeCollectPointsTitle">
            Pontos de Coleta:
          </p>
          {currentCollectionHome[0].collectPoint.map((value) => {
            return (
              <li className="dataStyle" id="homeCollectPointText">
                {value}
              </li>
            );
          })}
        </div>
        <div className="collectionDesc">
          <p>{currentCollectionHome[0].description}</p>
        </div>
      </div>
      <div className="collectionTitle">
        <img src={LaSalle} alt={"LaSalle"} className="laSalle" />
      </div>
      <div className="collectionTitle">
        <Link to={"/painel"} className="aboutUsButton">
          Adm
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
