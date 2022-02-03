const AWS = require("aws-sdk");
const uuidv4 = require('uuid');

const dynamo = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async function (event) {
    let body;
    let statusCode;
    try {
        let data = JSON.parse(event.body);
        delete data.id
        result = await dynamo.put({
            TableName: "test-recipes-table",
            Item: {
                id: uuidv4.v1(),
                ...data
            }
        }).promise();
        statusCode = 200
        body = { error: false, message: 'Receta creada', params: { result } };
    } catch (e) {
        statusCode = 500
        body = e.message
    }
    return {
        statusCode: statusCode,
        headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        body: JSON.stringify(body)
    };
};
