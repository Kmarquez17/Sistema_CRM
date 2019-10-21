// import  gql  from "graphql-tag";
import { gql } from "apollo-boost";

//Clientes
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
  query getCliente($id: ID) {
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

//Productos
export const PRODUCTOS_QUERY = gql`
  query getProductos($limite: Int, $offset: Int) {
    getProductos(limite: $limite, offset: $offset) {
      id
      nombre
      precio
      stock
    }
  }
`;

export const PRODUCTO_QUERY = gql`
  query getProducto($id: ID) {
    getProducto(id: $id) {
      id
      nombre
      precio
      stock
    }
  }
`;
