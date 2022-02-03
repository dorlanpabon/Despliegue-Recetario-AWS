const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    let body;
    let statusCode;
    try {
        //get all categories
        let { Items } = await dynamo.scan({ TableName: "test-categories-table" }).promise();

        statusCode = 200
        body = JSON.stringify(Items);
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
