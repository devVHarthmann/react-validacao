import React from "react";
import { Formik, useField } from "formik";
import * as yup from "yup";

const Campo = (props) => {
  const [field, meta] = useField(props);
  return (
    <div className="form-group">
      <label htmlFor={props.id}>{props.label}</label>
      <input
        {...field}
        {...props}
        className={meta.error && meta.touched ? "is-invalid" : ""}
      />
      {meta.error && meta.touched ? (
        <div className="invalid-feedback">{meta.error}</div>
      ) : null}
    </div>
  );
};

const AdicionaCliente = () => {
  const esquema = yup.object({
    nome: yup
      .string()
      .required("O nome é obrigatório")
      .min(10, "O nome deve ter pelo menos 10 caracteres")
      .max(30, "O nome deve ter até 30 caracteres"),
    email: yup
      .string()
      .required("O email é obrigatório")
      .email("O email é inválido"),
    nascimento: yup
      .date()
      .required("A data de nascimento é obrigatória")
      .max(new Date(), "Data inválida"),
  });

  return (
    <>
      <h1>Cadastro de Clientes</h1>

      <Formik
        initialValues={{ nome: "", email: "", nascimento: "" }}
        validationSchema={esquema}
        onSubmit={(values) => {
          alert(JSON.stringify(values));
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit} noValidate>
            <Campo id="nome" name="nome" type="text" label="Nome" />

            <Campo id="email" name="email" type="email" label="Email" />

            <Campo
              id="nascimento"
              name="nascimento"
              type="date"
              label="Data de Nascimento"
            />

            <button type="submit">Adicionar</button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AdicionaCliente;
