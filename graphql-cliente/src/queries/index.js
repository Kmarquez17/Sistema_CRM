// import  gql  from "graphql-tag";
import { gql } from "apollo-boost";

export const CLIENTES_QUERY = gql`
  query getClientes($limite: Int, $offset: Int) {
    getClientes(limite: $limite, offset: $offset) {
      id
      nombre
      apellido
      empresa
    }
    totalClientes
  }
`;

export const CLIENTE_QUERY = gql`
  query consultarCliente($id: ID) {
    getCliente(id: $id) {
      id
      nombre
      apellido
      empresa
      emails {
        email
      }
      edad
      tipo
    }
  }
`;
