import React, { useContext } from "react";
import { ButtonLeave, Container, Logo } from "./styles";
import { useHistory } from "react-router-dom";
import StoreContext from "components/Store/Context";

const Header = () => {
  const { setToken } = useContext(StoreContext);

  const history = useHistory();

  function onClick() {
    setToken(false);
    return history.push("/login");
  }

  return (
    <Container>
      <Logo />
      <ButtonLeave onClick={onClick} tipo={`submit`}>Sair</ButtonLeave>
    </Container>
  );
};

export default Header;
