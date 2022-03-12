import React from "react";
import { Popup, InnerPopup, CloseButton } from "./styles";
import { useForm } from "react-hook-form";

const AddData = ({ post, trigger, setTrigger }) => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    const today = new Date();

    const date = today.toISOString();

    data.dataCriacao = date;

    post(data);

    setTrigger("Add", false);
  };

  return trigger ? (
    <Popup>
      <InnerPopup>
        <CloseButton onClick={() => setTrigger("Add", false)}>
          Fechar
        </CloseButton>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="number"
            placeholder="ID"
            {...register("id", { required: true })}
          />
          <input
            type="text"
            placeholder="Nome"
            {...register("nome", { required: true })}
          />
          <input
            type="text"
            placeholder="Descrição"
            {...register("descricao", { required: true })}
          />
          <input
            type="number"
            placeholder="Multa"
            {...register("multa", { required: true })}
          />
          <input
            type="number"
            placeholder="Tempo de Prisão"
            {...register("tempoPrisao", { required: true })}
          />
          <input type="submit" />
        </form>
      </InnerPopup>
    </Popup>
  ) : (
    ""
  );
};

export default AddData;
