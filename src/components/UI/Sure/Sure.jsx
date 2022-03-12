import React from "react";
import {
  Popup,
  InnerPopup,
  CloseButton,
  DefinitonButton,
  DefinitionText,
} from "./styles";

const Sure = ({ trigger, setTrigger, remove, selectedID }) => {
  return trigger ? (
    <Popup>
      <InnerPopup>
        <CloseButton
          onClick={() => {
            setTrigger("Sure", false);
          }}
        >
          Fechar
        </CloseButton>
        <DefinitionText>Você tem certeza?</DefinitionText>
        <DefinitonButton
          onClick={() => {
            remove(selectedID);
            setTrigger("Sure", false);
          }}
        >
          Sim
        </DefinitonButton>
        <DefinitonButton onClick={() => setTrigger("Sure", false)}>
          Não
        </DefinitonButton>
      </InnerPopup>
    </Popup>
  ) : (
    ""
  );
};

export default Sure;
