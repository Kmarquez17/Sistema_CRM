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

export const CREAR_PEDIDO = gql`
  mutation crearPedido($input: PedidoInput) {
    crearPedido(input: $input) {
      total
      fecha
      cliente
      pedido {
        id
        cantidad
      }
      estado
    }
  }
`;

export const ACTUALIZAR_ESTADO_PEDIDO = gql`
  mutation actualizarEstado($input: PedidoInput) {
    actualizarEstado(input: $input)
  }
`;

export const CREAR_USUARIO = gql`
  mutation crearUsuario($usuario: String!, $nombre: String!, $password: String!, $rol:String! ) {
    crearUsuario(usuario: $usuario, nombre: $nombre, password: $password, rol: $rol )
  }
`;

export const LOGIN = gql`
  mutation autentificarUsuario($usuario: String!, $password: String!) {
    autentificarUsuario(usuario: $usuario, password: $password) {
      token
    }
  }
`;
