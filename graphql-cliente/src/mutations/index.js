import gql from "graphql-tag";

//Clientes
export const CREAR_CLIENTE = gql`
  mutation crearCliente($input: ClienteInput) {
    crearCliente(input: $input) {
      id
      nombre
      apellido
    }
  }
`;

export const ACTUALIZAR_CLIENTE = gql`
  mutation actualizarCliente($input: ClienteInput) {
    actualizarCliente(input: $input) {
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

export const ELIMINAR_CLIENTE = gql`
  mutation eliminarCliente($id: ID) {
    eliminarCliente(id: $id)
  }
`;

//Productos
export const CREAR_PRODUCTO = gql`
  mutation crearProducto($input: ProductoInput) {
    crearProducto(input: $input) {
      id
      nombre
      precio
      stock
    }
  }
`;

export const ACTUALIZAR_PRODUCTO = gql`
  mutation actualizarProducto($input: ProductoInput) {
    actualizarProducto(input: $input) {
      id
      nombre
      precio
      stock
    }
  }
`;

export const ELIMINAR_PRODUCTO = gql`
  mutation eliminarProducto($id: ID) {
    eliminarProducto(id: $id)
  }
`;
