import React, { useState } from "react";
import { Popup, InnerPopup, CloseButton, Name } from "./styles";

const ViewData = ({ trigger, setTrigger }) => {
  return trigger ? (
    <Popup>
      <InnerPopup>
        <CloseButton
          onClick={() => {
            setTrigger("View", false);
          }}
        >
          Fechar
        </CloseButton>
      </InnerPopup>
    </Popup>
  ) : (
    ""
  );
};

export default ViewData;
