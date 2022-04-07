import React, { useEffect, useState } from "react";
import "./styles.css";
import Logo from "../../assets/Logo.transparente.png";
import { HiOutlineLogout } from "react-icons/hi";
import { BiEdit } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { editData } from "../../firebase";

function EditDonation() {
  // config

  useEffect(() => {
    const user = JSON.parse(window.sessionStorage.getItem("@TOKEN-key"));

    if (user === null) {
      navigate("/login");
    }
  });

  const navigate = useNavigate();

  const donation = JSON.parse(
    window.sessionStorage.getItem("@SELECTED-donation")
  );

  //logic

  const [editClass, setEditClass] = useState("none");
  const [popTitle, setPopTitle] = useState();
  const [popType, setPopType] = useState();
  const [newProductClass, setNewProductClass] = useState("none");
  const [newCollectPointClass, setNewCollectPointClass] = useState("none");

  let newDon = donation;

  const editTypes = ["Data", "Produtos", "Nome", "Descrição"];

  function editButtonFunction(type) {
    setEditClass("editBox");
    setPopTitle(editTypes[type]);
  }

  // ==> variables to change donations from popup

  const [startDatePop, setStartDatePop] = useState(donation.startDate);
  const [endDatePop, setEndDatePop] = useState(donation.endDate);
  const [productsPop, setProductsPop] = useState(donation.products);
  const [namePop, setNamePop] = useState(donation.name);
  const [descPop, setDescPop] = useState(donation.description);
  const [collectPointPop, setCollectPointPop] = useState(donation.collectPoint);

  // ==> variables from addNewProductPop

  const [newProduct, setNewProduct] = useState(undefined);
  const [newCollectPoint, setNewCollectPoint] = useState(undefined);

  // ==> popup type functions

  function datePopup() {
    let start = undefined;
    let end = undefined;

    return (
      <div>
        <div className="datePopDiv">
          <p className="datePopText">Data de início:</p>
          <input
            type="date"
            className="datePopInput"
            onChange={(e) => {
              const event = e.target.value;
              const date = event.split("-").reverse().join("/");
              start = date;
            }}
          ></input>
        </div>
        <div className="datePopDiv">
          <p className="datePopText">Data de encerramento:</p>
          <input
            type="date"
            className="datePopInput"
            onChange={(e) => {
              const event = e.target.value;
              const date = event.split("-").reverse().join("/");
              end = date;
            }}
          ></input>
        </div>
        <div>
          <button
            className="popButtons"
            id="confirmPopButton"
            onClick={() => {
              if (start === undefined || end === undefined) {
                alert("Você deixou algum campo em branco!");
              } else {
                setStartDatePop(start);
                setEndDatePop(end);
                setEditClass("none");
              }
            }}
          >
            Confirmar
          </button>
          <button
            className="popButtons"
            id="cancelPopButton"
            onClick={() => {
              setEditClass("none");
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    );
  }

  const [pushArr, setPushArr] = useState([...productsPop]);
  let products = undefined;
  function productsPopup() {
    return (
      <div className="productsPopType">
        {pushArr.map((value) => {
          return (
            <div className="productDivPop">
              <li className="productsListPop">{value}</li>
              <button
                className="delProductPop"
                onClick={() => {
                  const newArr = pushArr;
                  newArr.splice(newArr.indexOf(value), 1);
                  setPushArr(newArr);
                  products = pushArr;
                  editButtonFunction(1);
                  const getType = productsPopup();
                  setPopType(getType);
                }}
              >
                X
              </button>
            </div>
          );
        })}
        <div className="newProductDiv">
          <button
            className="newProductButton"
            onClick={() => {
              setEditClass("none");
              setNewProductClass("newProductPopDiv");
            }}
          >
            + Produtos
          </button>
        </div>
        <div>
          <button
            className="popButtons"
            id="confirmPopButton"
            onClick={() => {
              if (products === undefined) {
                setEditClass("none");
              } else {
                setProductsPop(products);
                setEditClass("none");
              }
            }}
          >
            Confirmar
          </button>
          <button
            className="popButtons"
            id="cancelPopButton"
            onClick={() => {
              setEditClass("none");
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    );
  }

  const [pushArrCollect, setPushArrCollect] = useState([...collectPointPop]);
  let collectPoints = undefined;
  function collectPointPopup() {
    return (
      <div className="productsPopType">
        {pushArrCollect.map((value) => {
          return (
            <div className="productDivPop">
              <li className="productsListPop">{value}</li>
              <button
                className="delProductPop"
                onClick={() => {
                  const newArr = pushArrCollect;
                  newArr.splice(newArr.indexOf(value), 1);
                  setPushArrCollect(newArr);
                  collectPoints = pushArrCollect;
                  editButtonFunction(1);
                  const getType = collectPointPopup();
                  setPopType(getType);
                }}
              >
                X
              </button>
            </div>
          );
        })}
        <div className="newProductDiv">
          <button
            className="newProductButton"
            onClick={() => {
              setEditClass("none");
              setNewCollectPointClass("newProductPopDiv");
            }}
          >
            + Pontos de Coleta
          </button>
        </div>
        <div>
          <button
            className="popButtons"
            id="confirmPopButton"
            onClick={() => {
              if (collectPoints === undefined) {
                setEditClass("none");
              } else {
                setCollectPointPop(collectPoints);
                setEditClass("none");
              }
            }}
          >
            Confirmar
          </button>
          <button
            className="popButtons"
            id="cancelPopButton"
            onClick={() => {
              setEditClass("none");
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    );
  }

  function namePopup() {
    let name = undefined;

    return (
      <div className="namePopDiv">
        <input
          className="newProductPopInput"
          onChange={(e) => {
            name = e.target.value;
          }}
        ></input>
        <div>
          <button
            className="popButtons"
            id="confirmPopButton"
            onClick={() => {
              if (name === undefined || name.trim() === "") {
                alert("Você não pode deixar o nome da instituição vazio!");
              } else {
                setNamePop(name);
                setEditClass("none");
              }
            }}
          >
            Confirmar
          </button>
          <button
            className="popButtons"
            id="cancelPopButton"
            onClick={() => {
              setEditClass("none");
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    );
  }

  function descPopup() {
    let desc = undefined;

    return (
      <div className="namePopDiv">
        <textarea
          className="newProductPopInput"
          onChange={(e) => {
            desc = e.target.value;
          }}
        ></textarea>
        <div>
          <button
            className="popButtons"
            id="confirmPopButton"
            onClick={() => {
              if (desc === undefined || desc.trim() === "") {
                alert("Você não pode deixar o nome da instituição vazio!");
              } else {
                setDescPop(desc);
                setEditClass("none");
              }
            }}
          >
            Confirmar
          </button>
          <button
            className="popButtons"
            id="cancelPopButton"
            onClick={() => {
              setEditClass("none");
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    );
  }

  // front

  return (
    <div>
      {/* Add Product Popup */}
      <div className={newProductClass}>
        <p className="popTitleText">Adicionar Novo Produto</p>
        <input
          className="newProductPopInput"
          onChange={(e) => {
            setNewProduct(e.target.value);
          }}
        ></input>
        <div>
          <button
            className="popButtons"
            id="confirmPopButton"
            onClick={() => {
              if (newProduct === undefined || newProduct.trim() === "") {
                alert("você não pode adicionar um produto vazio!");
              } else {
                pushArr.push(newProduct);
                products = pushArr;
                setNewProductClass("none");
                editButtonFunction(1);
                const getType = productsPopup();
                setPopType(getType);
              }
            }}
          >
            Confrimar
          </button>
          <button
            className="popButtons"
            id="cancelPopButton"
            onClick={() => {
              setNewProductClass("none");
              setEditClass("editBox");
            }}
          >
            Cancelar
          </button>
        </div>
      </div>

      {/* Add Collect Popup */}
      <div className={newCollectPointClass}>
        <p className="popTitleText">Adicionar Novo Ponto de Coleta</p>
        <input
          className="newProductPopInput"
          onChange={(e) => {
            setNewCollectPoint(e.target.value);
          }}
        ></input>
        <div>
          <button
            className="popButtons"
            id="confirmPopButton"
            onClick={() => {
              if (
                newCollectPoint === undefined ||
                newCollectPoint.trim() === ""
              ) {
                alert("você não pode adicionar um produto vazio!");
              } else {
                pushArrCollect.push(newCollectPoint);
                collectPoints = pushArrCollect;
                setNewCollectPointClass("none");
                editButtonFunction(1);
                const getType = collectPointPopup();
                setPopType(getType);
              }
            }}
          >
            Confrimar
          </button>
          <button
            className="popButtons"
            id="cancelPopButton"
            onClick={() => {
              setNewCollectPointClass("none");
              setEditClass("editBox");
            }}
          >
            Cancelar
          </button>
        </div>
      </div>

      {/* PopUp */}
      <div className={editClass}>
        <p className="popTitleText">Editar {popTitle}</p>
        <div>{popType}</div>
      </div>

      {/* Header */}
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
      <h3 className="editTitle">Editar</h3>

      {/* Date div */}
      <div className="itemDiv">
        <button
          className="editButton"
          onClick={() => {
            editButtonFunction(0);
            const getType = datePopup();
            setPopType(getType);
          }}
        >
          <BiEdit className="editButtonIcon" />
        </button>
        <p className="itemTitle">Data:</p>
        <p className="itemText">
          Dos dias {startDatePop} até {endDatePop}
        </p>
      </div>

      {/* Product div */}
      <div className="itemDiv" id="products">
        <button
          className="editButton"
          onClick={() => {
            editButtonFunction(1);
            const getType = productsPopup();
            setPopType(getType);
          }}
        >
          <BiEdit className="editButtonIcon" />
        </button>
        <div className="productDiv">
          <p className="itemTitle" id="productsTitle">
            Produtos:
          </p>
          {productsPop.map((value) => {
            return (
              <div className="productLiDiv">
                <li className="itemText">{value}</li>
              </div>
            );
          })}
        </div>
      </div>

      {/* Collect Point div */}
      <div className="itemDiv" id="products">
        <button
          className="editButton"
          onClick={() => {
            editButtonFunction(1);
            const getType = collectPointPopup();
            setPopType(getType);
          }}
        >
          <BiEdit className="editButtonIcon" />
        </button>
        <div className="productDiv">
          <p className="itemTitle" id="productsTitle">
            Pontos de Coleta:
          </p>
          {collectPointPop.map((value) => {
            return (
              <div className="productLiDiv">
                <li className="itemText">{value}</li>
              </div>
            );
          })}
        </div>
      </div>

      {/* Name div */}
      <div className="itemDiv">
        <button
          className="editButton"
          onClick={() => {
            editButtonFunction(2);
            const getType = namePopup();
            setPopType(getType);
          }}
        >
          <BiEdit className="editButtonIcon" />
        </button>
        <p className="itemTitle">Nome da instituição:</p>
        <p className="itemText">{namePop}</p>
      </div>

      {/* Desc div */}
      <div className="itemDiv" id="descItemDiv">
        <button
          className="editButton"
          onClick={() => {
            editButtonFunction(3);
            const getType = descPopup();
            setPopType(getType);
          }}
        >
          <BiEdit className="editButtonIcon" />
        </button>
        <div className="descDiv">
          <p className="itemTitle" id="descTitle">
            Resumo da instituição:
          </p>
          <p className="itemText" id="descText">
            {descPop}
          </p>
        </div>
      </div>

      {/* buttons */}
      <div className="buttons">
        <button
          className="addButton"
          onClick={() => {
            // set changes

            function stringCorrection(text) {
              text = text.toLowerCase();
              text = text.replace(new RegExp("[ÁÀÂÃ]", "gi"), "a");
              text = text.replace(new RegExp("[ÉÈÊ]", "gi"), "e");
              text = text.replace(new RegExp("[ÍÌÎ]", "gi"), "i");
              text = text.replace(new RegExp("[ÓÒÔÕ]", "gi"), "o");
              text = text.replace(new RegExp("[ÚÙÛ]", "gi"), "u");
              text = text.replace(new RegExp("[Ç]", "gi"), "c");
              text = text.replace(" ", "");
              return text;
            }
            const newDonNameSch = stringCorrection(namePop);

            newDon.startDate = startDatePop;
            newDon.endDate = endDatePop;
            newDon.products = productsPop;
            newDon.name = namePop;
            newDon.description = descPop;
            newDon.nameSch = newDonNameSch;
            newDon.collectPoint = collectPointPop;

            editData(donation.id, newDon)
              .then((e) => {
                alert("Alteração feita com sucesso");
                navigate("/painel");
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          Confirmar
        </button>
        <Link className="cancelButton" to="/painel">
          Cancelar
        </Link>
      </div>
    </div>
  );
}

export default EditDonation;
