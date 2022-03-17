import React, { useEffect, useState } from "react";
import { Popup, InnerPopup, CloseButton } from "./styles";
import { useForm } from "react-hook-form";

const EditData = ({ trigger, setTrigger, selectedID, put }) => {
  const { register, handleSubmit, errors } = useForm();

  async function onSubmit(data) {
    put(data, selectedID);
    setTrigger('Edit', false);
  }

  return trigger ? (
    <Popup>
      <InnerPopup>
        <CloseButton
          onClick={() => {
            setTrigger("Edit", false);
          }}
        >
          Fechar
        </CloseButton>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="number"
            placeholder="ID"
            {...register("id")}
          />
          <input
            type="text"
            placeholder="Nome"
            {...register("nome")}
          />
          <input
            type="text"
            placeholder="Descrição"
            {...register("descricao")}
          />
          <input
            type="number"
            placeholder="Multa"
            {...register("multa")}
          />
          <input
            type="number"
            placeholder="Tempo de Prisão"
            {...register("tempoPrisao")}
          />
          <input type="submit" />
        </form>
      </InnerPopup>
    </Popup>
  ) : (
    ""
  );
};

export default EditData;
