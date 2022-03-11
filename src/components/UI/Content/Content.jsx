import React, { useEffect, useState } from "react";
import { TitleHomepage, Container, CrimeContainer, CrimeInfo, CrimeName, CrimeDescription } from "./styles";

const Content = () => {
  const [criminalArray, setCriminalArray] = useState([]);

  useEffect(() => {
    async function fetching() {
      const response = await fetch(
        "https://my-json-server.typicode.com/cidadealta/exercise/codigopenal"
      );

      const data = await response.json();

      setCriminalArray(data);
    }

    fetching();
  }, []);

  return (
    <Container>
      <TitleHomepage>Códigos penais da Cidade Alta</TitleHomepage>
        {Object.values(criminalArray).map((item) => {
          const status = item.status === 1 ? "Ativo" : "Inativo";

          if(item['id'] < 10){
              item['id'] = `0${item['id']}`
          }

          return (
              <CrimeContainer>
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
