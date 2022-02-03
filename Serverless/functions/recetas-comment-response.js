const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();


module.exports.handler = async function (event) {

    let body;
    let statusCode;
    try {
        //get recipe by id
        const { id } = event.pathParameters;
        const { Item } = await dynamo.get({ TableName: "test-recipes-table", Key: { id } }).promise();

        //add response to comment of recipe
        const data = JSON.parse(event.body);
        //search comment by id
        const comment = Item.comments.find(item => item.id === data.id);

        //add response to comment of recipe
        comment.response = data.response;
        comment.response_at = new Date().toISOString();

        //update recipe
        await dynamo.update({ TableName: "test-recipes-table", Key: { id }, UpdateExpression: "set comments = :comments", ExpressionAttributeValues: { ":comments": Item.comments } }).promise();

        body = { error: false, message: 'Respuesta agregada' };
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
        body: JSON.stringify(body)
    };
};
