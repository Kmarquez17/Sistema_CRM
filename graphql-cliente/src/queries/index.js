// import  gql  from "graphql-tag";
import { gql } from 'apollo-boost';

export const CLIENTES_QUERY = gql`  
{
    getClientes {
        id
        nombre
        apellido
        empresa
      }  
}
    
`
