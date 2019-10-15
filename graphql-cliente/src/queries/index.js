// import  gql  from "graphql-tag";
import { gql } from "apollo-boost";

export const CLIENTES_QUERY = gql`
  {
    getClientes {
      id
      nombre
      apellido
      empresa
    }
  }
`;

export const CLIENTE_QUERY = gql`
  query consultarCliente($id: ID) {
    getCliente(id: $id) {
      id
      nombre
      apellido
      empresa
      emails{
        email
      }
      edad
      tipo
    }
  }
`;
