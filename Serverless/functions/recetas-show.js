const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();


module.exports.handler = async function (event) {

    let body;
    let statusCode;
    //search recipe by id dynamo.get({ TableName: "test-recipes-table", Key: { id } })
    try {
        //get recipe by id
        let { id } = event.pathParameters;
        let result = await dynamo.get({ TableName: "test-recipes-table", Key: { id: id } }).promise();

        body = result.Item;
        statusCode = 200;

    } catch (e) {
        statusCode = 500
        body = JSON.stringify(e.message);
    }
    return {
        statusCode,
        headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        body: JSON.stringify({ error: false, message: 'Receta', params: { recipe: body } })
    };
};
