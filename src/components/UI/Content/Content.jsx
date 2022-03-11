import React, { useEffect, useState } from "react";
import AddData from "../AddData/AddData";
import { TitleHomepage, Container, CrimeContainer, CrimeInfo, CrimeName, CrimeDescription, AddButton } from "./styles";

const Content = () => {
  const [criminalArray, setCriminalArray] = useState([]); 
  
  const [buttonBool, setButtonBool] = useState({
    Add: false,
    Edit: false,
  })

  function handlePopups(popup, bool){
    setButtonBool((oldObj) => ({
      ...oldObj,
      [popup]: bool,
    }))

  }

  async function getFetching() {
    const response = await fetch(
      "https://my-json-server.typicode.com/cidadealta/exercise/codigopenal"
    );

    const data = await response.json();

    setCriminalArray(data);
  }

  async function postFetching(data){

    console.log(data);

    const response = await fetch("https://my-json-server.typicode.com/cidadealta/exercise/codigopenal", {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        id: 12,
        nome: 'teste',
        descricao: 'teste',
        multa: 123,
        tempoPrisao: 30
      })
    })

    console.log(response);

    getFetching();
  }

  useEffect(() => {
    getFetching();
  }, []);

  return (
    <Container>
      <TitleHomepage>Códigos penais da Cidade Alta</TitleHomepage>
        <AddButton onClick={(e) => handlePopups('Add', true)}>Criar nova lei</AddButton>
        <AddData trigger={buttonBool.Add} setTrigger={handlePopups} post={postFetching}/>

        {Object.values(criminalArray).map((item) => {
          const status = item.status === 1 ? "Ativo" : "Inativo";

          return (
              <CrimeContainer key={item['id']}>
                  <CrimeInfo>{item['id']}</CrimeInfo>
                  <CrimeName>{item['nome']}</CrimeName>
                  <CrimeInfo>Multa: <span>{item['multa']}</span> Status: <span>{status}</span></CrimeInfo>
                  <CrimeDescription>{item['descricao']}</CrimeDescription>
              </CrimeContainer>
          );
        })}
    </Container>
  );
};

export default Content;
