const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    let body;
    let statusCode;
    try {
        //get category by id
        const { id } = event.pathParameters;
        const { Items } = await dynamo.get({ TableName: "test-recipes-table", Key: { id } }).promise();

        statusCode = 200
        body = JSON.stringify({ error: false, message: 'Category found', params: { Items } });
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
        }, body
    };
};
