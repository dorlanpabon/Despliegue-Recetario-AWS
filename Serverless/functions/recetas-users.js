const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();


module.exports.handler = async function (event) {
    let body
    let statusCode
    try {
        //search list users of recipes and count number of recipes
        const { Items: recipesItems } = await dynamo.scan({ TableName: "test-recipes-table" }).promise();
        const { Items: usersItems } = await dynamo.scan({ TableName: "test-users-table" }).promise();

        const hahs = {};
        const usersCount = usersItems.filter((indice) => {
            indice.count = 0;
            delete indice.email;
            delete indice.passwordHash
            delete indice.type
            delete indice.createdAt
            delete indice.__model
            delete indice.sk
            delete indice.pk
            recipesItems.map((ind) => { (ind.user === indice.id) ? indice.count = indice.count + 1 : false; })
            return hahs.hasOwnProperty(indice.id) ? false : (hahs[indice.id] = true);
        });

        body = { error: false, message: 'Usuarios de recetas', params: { usersCount } };
        statusCode = 200
    } catch (e) {
        statusCode = 500
        body = e.message;
    }
    return {
        statusCode,
        headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        body: JSON.stringify(body)
    };
};
