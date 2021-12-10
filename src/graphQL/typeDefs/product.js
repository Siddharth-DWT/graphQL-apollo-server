import {gql} from "apollo-server-express";

export default gql`
  type Product {
    productId: String
    allOptions: [AllOptions!]!
    customProductInfoBean: CustomProductInfoBean
  }
 
  type CustomProductInfoBean {
    productId : String
    customProductType : String
    customProductInformation : String
  } 
  
  type AllOptions {
    type: String!
    sortPriority : Int
    options: [Option]
  }
    
  type Option {
    id: String!
    type: String!
    value: String!
    sortPriority: Int
    status: String
    message: String
  }
    
  type Query {
    productDetails(id: [ID]): Product
  }
`;