import {gql} from "@apollo/client";

export const REQUEST_LOGIN = gql`
    mutation Login($code:String!) {
        login(input: {code: $code}){
            user{
                id
                name
                imageURI
            }
            jwt
        }
    }`;


export const LOAD_USERS= gql`
            query {
                users{
                    nodes {
                      id
                      name
                      gitHub
                      imageURI
                    }
                  }
            }
        `;

export const TODOTASK = gql`
    query {
        user(id:$userId){
            TodoListTaks {
                nodes {
                    name
                }
            }
        }
        
    }
`;

export const ADD_TASK = gql`
  mutation ($title: String!, $completed: Boolean!, $description: String!) {
    addTodoListTask(input: { title: $title, completed: $completed, description:$description }) {
      id
      title
    }
  }
`;