import React, { useEffect, useState } from "react";
import AddData from "../AddData/AddData";
import EditData from "../EditData/EditData";
import View from "../View/View";
import Sure from "../Sure/Sure";
import {
  TitleHomepage,
  Container,
  CrimeContainer,
  CrimeInfo,
  CrimeName,
  CrimeDescription,
  AddButton,
  EditButton,
  RemoveButton,
  ViewButton
} from "./styles";

const Content = () => {
  const [criminalArray, setCriminalArray] = useState([]);

  const [selectedID, setSelectedID] = useState(null);

  const [buttonBool, setButtonBool] = useState({
    Add: false,
    Edit: false,
    Sure: false,
    View: false,
  });

  function handlePopups(popup, bool) {
    setButtonBool((oldObj) => ({
      ...oldObj,
      [popup]: bool,
    }));
  }

  async function fetching(id) {
    const response = await fetch(`http://localhost:3000/codigopenal/${id}`);
  
    const data = response.json();
  
    return data;
  }

  async function getFetching() {
    const response = await fetch("http://localhost:3000/codigopenal");

    const data = await response.json();

    setCriminalArray(data);
  }

  async function patchFetching(data, id) {
    const response = await fetch(`http://localhost:3000/codigopenal/${id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    getFetching();
  }

  async function removeFetching(id) {
    const response = await fetch(`http://localhost:3000/codigopenal/${id}`, {
      method: "DELETE",
    });

    getFetching();
  }

  async function postFetching(data) {
    const response = await fetch("http://localhost:3000/codigopenal", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    getFetching();
  }

  useEffect(() => {
    getFetching();
  }, []);

  return (
    <Container>
      <TitleHomepage>Códigos penais da Cidade Alta</TitleHomepage>
      <AddButton onClick={(e) => handlePopups("Add", true)}>
        Criar nova lei
      </AddButton>
      <AddData
        trigger={buttonBool.Add}
        setTrigger={handlePopups}
        post={postFetching}
      />

      {Object.values(criminalArray).map((item, i) => {
        const status = item.status === 1 ? "Ativo" : "Inativo";

        return (
          <CrimeContainer key={item["id"]}>
            <CrimeInfo>{item["id"]}</CrimeInfo>
            <CrimeName>{item["nome"]}</CrimeName>
            <CrimeInfo>
              Multa: <span>{item["multa"]}</span> Status: <span>{status}</span>
            </CrimeInfo>
            <CrimeDescription>{item["descricao"]}</CrimeDescription>
            <EditButton
              onClick={(e) => {
                setSelectedID(item["id"]);
                handlePopups("Edit", true);
              }}
            >
              Editar
            </EditButton>
            <RemoveButton
              onClick={() => {
                setSelectedID(item["id"]);
                handlePopups("Sure", true);
              }}
            >
              Remover
            </RemoveButton>
            <EditButton
              onClick={() => {
                setSelectedID(item["id"]);
                handlePopups("Edit", true);
              }}
            >
              Editar
            </EditButton>
            <ViewButton
              onClick={() => {
                setSelectedID(item["id"]);
                handlePopups("View", true);
              }}
            >
              Visualizar
            </ViewButton>
          </CrimeContainer>
        );
      })}

      <View
        trigger={buttonBool.View}
        setTrigger={handlePopups}
        selectedID={selectedID}
      />
      
      <Sure
        trigger={buttonBool.Sure}
        setTrigger={handlePopups}
        remove={removeFetching}
        selectedID={selectedID}
      />

      <EditData
        trigger={buttonBool.Edit}
        setTrigger={handlePopups}
        put={patchFetching}
        selectedID={selectedID}
      />
    </Container>
  );
};

export default Content;
