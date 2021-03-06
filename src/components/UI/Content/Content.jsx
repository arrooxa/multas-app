import React, { useEffect, useState } from "react";
import AddData from "../AddData/AddData";
import EditData from "../EditData/EditData";
import ViewData from "../ViewData/ViewData";
import RemoveData from "../RemoveData/RemoveData";
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
  ViewButton,
} from "./styles";

const Content = () => {
  const [criminalArray, setCriminalArray] = useState([]);

  const [selectedArray, setSelectedArray] = useState(null);

  const [selectedID, setSelectedID] = useState(null);

  const [LastIDAPI, setLastIDAPI] = useState(null);

  const [buttonBool, setButtonBool] = useState({
    Add: false,
    Edit: false,
    Remove: false,
    View: false,
  });

  useEffect(() => {
    const fetching = async (id) => {
      const fetched = id === null ? await fetch (`http://localhost:3000/codigopenal`) : await fetch(`http://localhost:3000/codigopenal/${selectedID}`);

      const result = await fetched.json();

      if(id !== null){
      setSelectedArray({
        nome: result['nome'],
        descricao: result['descricao'],
        multa: result['multa'],
        tempoPrisao: result['tempoPrisao']
      })
    }}

    fetching(selectedID);
  }, [selectedID]);

  useEffect(() => console.log(selectedArray), [selectedArray]);

  function handlePopups(popup, bool) {
    setButtonBool((oldObj) => ({
      ...oldObj,
      [popup]: bool,
    }));
  }

  async function getFetching() {
    const response = await fetch("http://localhost:3000/codigopenal");

    const data = await response.json();

    const LastIDFetched = data.reduce((prev, current) =>
      prev.id > current.id ? prev.id : current.id
    );

    setLastIDAPI(LastIDFetched);

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
      body: JSON.stringify({ id: LastIDAPI + 1, ...data }),
    });

    getFetching();
  }

  useEffect(() => {
    getFetching();
  }, []);

  return (
    <Container>
      <TitleHomepage>C??digos penais da Cidade Alta</TitleHomepage>
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
                handlePopups("Remove", true);
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

      <ViewData
        trigger={buttonBool.View}
        setTrigger={handlePopups}
        selectedID={selectedID}
      />

      <RemoveData
        trigger={buttonBool.Remove}
        setTrigger={handlePopups}
        remove={removeFetching}
        selectedID={selectedID}
      />

      <EditData
        trigger={buttonBool.Edit}
        setTrigger={handlePopups}
        put={patchFetching}
        selectedID={selectedID}
        preloadedData={selectedArray}
      />
    </Container>
  );
};

export default Content;
