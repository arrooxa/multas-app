import React from "react";
import {
  Popup,
  InnerPopup,
  CloseButton,
  DefinitonButton,
  DefinitionText,
} from "./styles";

const RemoveData = ({ trigger, setTrigger, remove, selectedID }) => {
  return trigger ? (
    <Popup>
      <InnerPopup>
        <CloseButton
          onClick={() => {
            setTrigger("Remove", false);
          }}
        >
          Fechar
        </CloseButton>
        <DefinitionText>Você tem certeza?</DefinitionText>
        <DefinitonButton
          onClick={() => {
            remove(selectedID);
            setTrigger("Remove", false);
          }}
        >
          Sim
        </DefinitonButton>
        <DefinitonButton onClick={() => setTrigger("Remove", false)}>
          Não
        </DefinitonButton>
      </InnerPopup>
    </Popup>
  ) : (
    ""
  );
};

export default RemoveData;
