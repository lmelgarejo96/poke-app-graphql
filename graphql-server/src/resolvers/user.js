export const userResolver = {
    Query: {
        getUserById: () => {

        },
        getSimpleUsers: () => {
            return "Hello world con GraphQL";
        },
        getFullUsers: (root, args) => {
            const { name } = args;
            return `Hello ${name}!`;
        },
    },
    Mutation: {
        createUser: () => {

        },
        updateUser: () => {

        },
        removeUser: () => {

        }
    }
}