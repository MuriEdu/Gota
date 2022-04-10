import React, { useEffect, useState } from "react";
import "./style.css";
import Logo from "../../assets/Logo.transparente.png";
import { HiOutlineLogout } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { addData } from "../../firebase";

function NewDonation() {
  useEffect(() => {
    const user = JSON.parse(window.sessionStorage.getItem("@TOKEN-key"));

    if (user === null) {
      navigate("/login");
    }
  });

  const navigate = useNavigate();

  // PRODUCTS CSS CLASS
  const [newProductClass, setNewProductClass] = useState("productsPopupNone");

  // COLLECT POINTS CSS CLASS
  const [newCollectPointClass, setNewCollectPointClass] =
    useState("productsPopupNone");

  // PRODUCTS VALUE
  const [newProduct, setNewProduct] = useState(null);
  const [products, setProducts] = useState([]);

  // START DATE VALUE
  const [startDate, setStartDate] = useState(null);

  // END DATE VALUE
  const [endDate, setEndDate] = useState(null);

  //INSTITUTE NAME VALUE
  const [name, setName] = useState(null);

  // INSTITUTE DECRIPTION VALUE
  const [info, setInfo] = useState(null);

  // COLLECT POINT VALUE
  const [newCollectPoint, setNewCollectPoint] = useState(null);
  const [collectPoint, setCollectPoint] = useState([
    "Colégio La Salle São Carlos",
  ]);

  // IMAGE BASE64 VALUE
  const [pic, setPic] = useState(null);

  // CONVERT IMG
  function convertImg(file) {
    const reader = new FileReader();
    let textImg = null;

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      textImg = reader.result;
      setPic(textImg);
    };
  }

  return (
    <div>
      {/* Add Products PopUp */}
      <div className={newProductClass}>
        <p className="titles">Adicionar Produto</p>
        <input
          className="popInput"
          value={newProduct}
          onChange={(e) => {
            setNewProduct(e.target.value);
          }}
        ></input>
        <button
          className="newProductButtonAdd"
          onClick={() => {
            if (newProduct.trim() === "") {
              alert("Não é possível adicionar um produto vazio");
              return;
            } else {
              const newArr = [...products, newProduct];
              setProducts(newArr);
              setNewProductClass("productsPopupNone");
              setNewProduct("");
            }
          }}
        >
          Adicionar
        </button>
        <button
          className="newProductButtonCancel"
          onClick={() => {
            setNewProductClass("productsPopupNone");
          }}
        >
          Cancelar
        </button>
      </div>
      {/* Add CollectPoint PopUp */}
      <div className={newCollectPointClass}>
        <p className="titles">Adicionar Ponto de Coleta</p>
        <input
          className="popInput"
          value={newCollectPoint}
          onChange={(e) => {
            setNewCollectPoint(e.target.value);
          }}
        ></input>
        <button
          className="newProductButtonAdd"
          onClick={() => {
            if (newCollectPoint.trim() === "") {
              alert("Não é possível adicionar um produto vazio");
              return;
            } else {
              const newArr = [...collectPoint, newCollectPoint];
              setCollectPoint(newArr);
              setNewCollectPointClass("productsPopupNone");
              setNewCollectPoint("");
            }
          }}
        >
          Adicionar
        </button>
        <button
          className="newProductButtonCancel"
          onClick={() => {
            setNewCollectPointClass("productsPopupNone");
          }}
        >
          Cancelar
        </button>
      </div>
      <div className="container">
        {/* header */}
        <div className="header">
          <div className="leftHeader">
            <img src={Logo} alt={"logo"} className="logo" />
            <h3 className="pageTitle">Painel de Controle</h3>
          </div>
          <button
            className="logout"
            onClick={() => {
              sessionStorage.removeItem("@TOKEN-key");
              window.location.reload(true);
            }}
          >
            <HiOutlineLogout className="logoutIcon" />
          </button>
        </div>

        <div className="donationForm">
          <h3 className="subtitle">NOVA ARRECADAÇÃO:</h3>

          {/* Date */}
          <div className="dateForm">
            <p className="titles">Data: </p>
            <p className="dateText">Dos dias</p>
            <input
              type="date"
              className="dateInput"
              onChange={(e) => {
                const event = e.target.value;
                const date = event.split("-").reverse().join("/");
                setStartDate(date);
              }}
            ></input>
            <p className="dateText">até</p>
            <input
              type="date"
              className="dateInput"
              onChange={(e) => {
                const event = e.target.value;
                const date = event.split("-").reverse().join("/");
                setEndDate(date);
              }}
            ></input>
          </div>

          {/* Products */}
          <div className="productsForm">
            <p className="titles">Produtos:</p>
            <div>
              {products.map((value) => {
                return (
                  <div className="productDiv">
                    <div className="insideProductsDiv">
                      <li className="productsList">{value}</li>
                      <button
                        className="delProduct"
                        onClick={() => {
                          const newArr = [...products];
                          newArr.splice(newArr.indexOf(value), 1);
                          setProducts(newArr);
                        }}
                      >
                        X
                      </button>
                    </div>
                  </div>
                );
              })}
              <button
                className="newProducts"
                onClick={() => {
                  setNewProductClass("productsPopup");
                }}
              >
                + Produtos
              </button>
            </div>
          </div>

          {/* Name */}
          <div className="nameForm">
            <p className="titles">Nome da Instituição:</p>
            <input
              className="nameInput"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></input>
          </div>

          {/* Descripion */}
          <div className="infoForm">
            <p className="titles">Descrição da Instituição:</p>
            <textarea
              value={info}
              className="infoInput"
              onChange={(e) => {
                setInfo(e.target.value);
              }}
            ></textarea>
          </div>

          {/* Collect Point */}
          <div className="productsForm">
            <p className="titles">Pontos de Coleta:</p>
            <div>
              {collectPoint.map((value) => {
                return (
                  <div className="productDiv">
                    <div className="insideProductsDiv">
                      <li className="productsList">{value}</li>
                      <button
                        className="delProduct"
                        onClick={() => {
                          const newArr = [...collectPoint];
                          newArr.splice(newArr.indexOf(value), 1);
                          setCollectPoint(newArr);
                        }}
                      >
                        X
                      </button>
                    </div>
                  </div>
                );
              })}
              <button
                className="newProducts"
                onClick={() => {
                  setNewCollectPointClass("productsPopup");
                }}
              >
                + Pontos de Coleta
              </button>
            </div>
          </div>

          {/* Picture */}
          {/* <div className="picForm">
            <p className="titles">Foto da Instituição:</p>
            <input
              accept="image/*"
              type="file"
              className="picInput"
              onChange={(e) => {
                convertImg(e.target.files[0]);
              }}
            ></input>
          </div> */}

          {/* Botton Menu */}
          <div className="menu">
            <button
              className="addButton"
              // para adicionar as imagens novamente a funcionalidade,
              //  é necessário alterar a função "addData"
              onClick={() => {
                addData(name, info, startDate, endDate, products, collectPoint)
                  .then(() => {
                    alert("Nova arrecadação adicionada com sucesso!");
                    setProducts([]);
                    setStartDate(null);
                    setEndDate(null);
                    setName(null);
                    setInfo(null);
                    setPic(null);
                    navigate("/painel");
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              Adicionar Nova Arrecadação
            </button>
            <Link className="cancelButton" to="/painel">
              Cancelar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewDonation;
