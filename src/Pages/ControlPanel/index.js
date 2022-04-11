import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import Logo from "../../assets/Logo.transparente.png";
import { HiOutlineLogout } from "react-icons/hi";
import { BiEdit, BiSearchAlt } from "react-icons/bi";
import { deleteData, editData, findDonation, getData } from "../../firebase";

function ControlPanel() {
  const key = "SsRw8Om4XzVsaxUZPY_AmBWAqc8NzE68KvvfCsoNG4c";

  useEffect(() => {
    const keepOption = window.localStorage.getItem("@KEEP");
    let user = JSON.parse(window.sessionStorage.getItem("@TOKEN-key"));

    if (keepOption === "true") {
      const getUser = JSON.parse(window.localStorage.getItem("@TOKEN-key"));
      user = getUser;
    }

    if (user === null) {
      navigate("/login");
    }
  });

  const navigate = useNavigate();

  getData();

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

  const [admClass, setAdmClass] = useState("admPopupNone");
  const [searchClass, setSearchClass] = useState("searchResultOff");
  const [searchValue, setSearchValue] = useState("");
  const [currentDon, setCurrentDon] = useState(defaltDb);
  const [searchRes, setSearchRes] = useState(defaltDb);
  const [isGetCollection, setIsGetCollection] = useState(true);

  if (isGetCollection === true) {
    getCurrentColection();
  }

  async function getCurrentColection() {
    const localCurrent = await JSON.parse(
      window.sessionStorage.getItem("@DON")
    );

    const find = (item) => {
      if (item.isCurrent === true) {
        return item;
      }
    };

    const res = localCurrent.filter(find);
    if (res[0] !== undefined) {
      setCurrentDon(res);
    }
    setIsGetCollection(false);
    return res;
  }

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

  async function changeCurrentDon(newCrrDon, oldDon) {
    const localDon = JSON.parse(window.sessionStorage.getItem("@DON"));
    setCurrentDon([newCrrDon]);

    try {
      const changedNCD = newCrrDon;
      changedNCD.isCurrent = true;
      editData(newCrrDon.id, changedNCD).then(console.log("1/2"));

      const changedCD = oldDon;
      changedCD.isCurrent = false;
      editData(oldDon.id, changedCD).then(console.log("2/2"));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      {/* adm popup */}
      <div className={admClass}>
        <div className="admPopDiv">
          <div>
            <p className="admTitle">Novo Administrador</p>
            <p className="admText">Chave de acesso: {key}</p>
            <Link className="admText" id="admLink" to={"/signup"}>
              Link: https://projetogota.netlify.app/singin
            </Link>
          </div>
          <button
            className="admExit"
            onClick={() => {
              setAdmClass("admPopupNone");
            }}
          >
            X
          </button>
        </div>
      </div>

      <div className="container">
        {/* header */}
        <div className="header">
          <div className="leftHeader">
            <img
              src={Logo}
              alt={"logo"}
              className="logo"
              onClick={() => {
                navigate("/");
              }}
            />
            <h3 className="pageTitle">Painel de Controle</h3>
          </div>
          <button
            className="logout"
            onClick={() => {
              window.sessionStorage.clear();
              window.localStorage.clear();
              navigate("/login");
            }}
          >
            <HiOutlineLogout className="logoutIcon" />
          </button>
        </div>

        <div className="main">
          {/* current donation */}
          <div className="currentCollection">
            <div className="currentData">
              <h3 className="currentTitle">Arrecadação Atual</h3>
              <p className="itensTitle">Data:</p>
              <p className="dataStyle">
                {currentDon[0].startDate} à {currentDon[0].endDate}
              </p>
              <p className="itensTitle">Produtos:</p>
              <p>
                {currentDon[0].products.map((value) => {
                  return <li className="productData">{value}</li>;
                })}
              </p>
              <div className="infoDiv">
                <p className="nameTitle">instituição: </p>
                <p className="nameData">{currentDon[0].name}</p>
              </div>
              <p className="itensTitle">Pontos de Coleta:</p>
              <p>
                {currentDon[0].collectPoint.map((value) => {
                  return <li className="productData">{value}</li>;
                })}
              </p>
            </div>
            <button
              className="editCurrent"
              onClick={() => {
                window.sessionStorage.setItem(
                  "@SELECTED-donation",
                  JSON.stringify(currentDon[0])
                );
                navigate("/edit-donation");
              }}
            >
              <BiEdit className="editCurrent"></BiEdit>
            </button>
          </div>

          {/* side menu */}

          <div className="menu">
            <Link className="menuButton" to="/new-donation">
              Nova Arrecadação
            </Link>
            <button
              className="menuButton"
              onClick={() => {
                setAdmClass("admPopup");
              }}
            >
              Adicionar Novo Admnistrador
            </button>
          </div>
        </div>

        {/* search */}
        <div className="searchContainer">
          <div className="searchDiv">
            <input
              className="searchInput"
              placeholder="Pesquisar arrecadações"
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              h
            ></input>
            <button
              className="searchButton"
              onClick={() => {
                const res = findDonation(searchValue);
                setSearchRes(res);

                const createRes = (value) => {
                  if (value === undefined) {
                    alert("Arrecadação não encontrada");
                    return;
                  } else {
                    setSearchClass("searchResult");
                  }
                };

                if (res[0] === undefined) {
                  alert("nenhum resultado encontrado");
                  return;
                } else {
                  createRes(res);
                }
              }}
            >
              <BiSearchAlt className="searchButtonIcon" />
            </button>
          </div>

          {/* search ress */}
          <div className={searchClass}>
            {searchRes.map((item) => {
              return (
                <div>
                  <p className="monthTitle">{getMonth(item.startDate)}</p>
                  <div className="nameResult">
                    <p className="instRes">Instituição</p>
                    <p className="instNameRes">{item.name}</p>
                  </div>
                  <div className="descRes">
                    <p className="descResP">{item.description}</p>
                  </div>
                  <div className="idResult">
                    <p className="idRes">id:</p>
                    <p>{item.id}</p>
                  </div>
                  <div className="resButtons">
                    <button
                      className="resButton"
                      onClick={() => {
                        window.sessionStorage.setItem(
                          "@SELECTED-donation",
                          JSON.stringify(item)
                        );
                        navigate("/edit-donation");
                      }}
                    >
                      Editar Arrecadação
                    </button>
                    <button
                      className="resButtonR"
                      onClick={async () => {
                        try {
                          const id = item.id;
                          await deleteData(id);
                          setSearchClass("searchResultOff");
                          alert("arrecadação deletada com sucesso!");
                          navigate("/painel");
                        } catch (err) {
                          console.log(err);
                          alert("não foi possível deletar esta arrecadação!");
                        }
                      }}
                    >
                      Deletar Arrecadação
                    </button>
                  </div>
                  <button
                    className="currentButtonSearch"
                    onClick={() => {
                      changeCurrentDon(item, currentDon[0]).then(
                        alert("Arrecadação selecionada como atual"),
                        setSearchClass("searchResultOff")
                      );
                    }}
                  >
                    Selecionar como arrecadação atual
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ControlPanel;
