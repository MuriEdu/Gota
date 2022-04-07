import React from "react";
import { getData } from "../../firebase";
import Logo from "../../assets/Logo.transparente.png";
import { Link } from "react-router-dom";

function Collections() {
  getData();

  function getCurrentColection() {
    const collection = JSON.parse(window.sessionStorage.getItem("@DON"));
    const currentCollection = collection.filter((item) => {
      if (item.isCurrent === true) {
        return item;
      }
    });

    return currentCollection;
  }

  const currentCollectionHome = getCurrentColection();

  function getOtherCollections() {
    const collection = JSON.parse(window.sessionStorage.getItem("@DON"));
    const otherCollections = collection.filter((item) => {
      if (item.isCurrent === false) {
        return item;
      }
    });

    return otherCollections;
  }

  const otherCollections = getOtherCollections();

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
      <div className="header">
        <img src={Logo} alt={"logo"} className="logo" />
        <Link to={"/"} className="homeButton">
          {" "}
          Home{" "}
        </Link>
      </div>

      <div className="collectionTitle">
        <h2>Arrecadação Atual</h2>
      </div>

      <div className="currentHomeDiv">
        <div className="currentHomeBox1">
          <div className="homeBox1Chield">
            <h2 className="monthTitle" id="homeMonthTitle">
              {getMonth(currentCollectionHome[0].startDate)}
            </h2>
            <div>
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
          {/* <button className="homeAboutDonationButton">Saiba Mais</button> */}
        </div>
        <div className="collectionDesc">
          <p>{currentCollectionHome[0].description}</p>
        </div>
      </div>

      <div className="collectionTitle">
        <h2>Arrecadações Antigas</h2>
      </div>
      <div>
        {otherCollections.map((item) => {
          return (
            <div className="currentHomeDiv">
              <div className="currentHomeBox1">
                <div className="homeBox1Chield">
                  <h2 className="monthTitle" id="homeMonthTitle">
                    {getMonth(item.startDate)}
                  </h2>
                  <div>
                    <p className="dataStyle" id="homeNameTitle">
                      Instituição:{" "}
                      {
                        <p className="nameTitle" id="homeNameText">
                          {item.name}
                        </p>
                      }
                    </p>
                  </div>
                </div>
              </div>
              <div className="currentHomeBox2">
                <p className="dataStyle" id="homeDataStyle">
                  Dos dias {item.startDate} até {item.endDate}
                </p>
              </div>
              <div className="currentHomeBox3">
                <p className="nameTitle" id="homeProductsTitle">
                  Produtos:
                </p>
                {item.products.map((value) => {
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
                {item.collectPoint.map((value) => {
                  return (
                    <li className="dataStyle" id="homeCollectPointText">
                      {value}
                    </li>
                  );
                })}
                {/* <button className="homeAboutDonationButton">Saiba Mais</button> */}
              </div>
              <div className="collectionDesc">
                <p>{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Collections;
