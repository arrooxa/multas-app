import styled from "styled-components";
import imageLogo from "../../../assets/img/logo.png";

export const Container = styled.div`
  display: flex;
  background: #f5f5f5;
  align-items: center;
  justify-content: space-around;
`;

export const Logo = styled.img.attrs({ src: `${imageLogo}` })`
  width: 50px;
  height: 50px;
`;

export const ButtonLeave = styled.button`
  background: transparent;
  border-radius: 10%;
  height: 30px;
`;

