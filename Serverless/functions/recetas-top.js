const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    let body;
    let statusCode;
    try {
        body = await dynamo.scan({ TableName: "test-recipes-table" }).promise();
        body.Items = body.Items.sort((a, b) => b.qualification - a.qualification).slice(0, 10);
        statusCode = 200
        body = JSON.stringify(body.Items);
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
