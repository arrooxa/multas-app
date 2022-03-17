import React, { useEffect, useState } from "react";
import { Popup, InnerPopup, CloseButton } from "./styles";
import { useForm } from "react-hook-form";

async function fetching(id){
  const response = await fetch("http://localhost:3000/codigopenal");

  const data = await response.json();

  return data[id-1];
}

const EditData = ({ trigger, setTrigger, selectedID, put, preloadedData }) => {

  useEffect(() => {console.log(preloadedData)}, [preloadedData])

  const { register, handleSubmit, errors } = useForm({
    defaultValues: preloadedData,
  });
  
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
            type="text"
            name="nome"
            {...register("nome")}
          />
          <input
            type="text"
            name="descricao"
            {...register("descricao")}
          />
          <input
            type="number"
            name="multa"
            {...register("multa")}
          />
          <input
            type="number"
            name="tempoPrisao"
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
