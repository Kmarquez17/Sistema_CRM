import gql from "graphql-tag";

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
