const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();


module.exports.handler = async function (event) {

    let body;
    let statusCode;
    try {
        //get recipe by id
        const { id } = event.pathParameters;
        const { Item } = await dynamo.get({ TableName: "test-recipes-table", Key: { id } }).promise();

        //add comment to recipe
        const { comment } = JSON.parse(event.body);
        //Items first comment
        const newComment = {
            id: Item.comments.length + 1,
            user: 0,
            comment,
            response: "",
            create_at: new Date().toISOString(),
            response_at: "",
        };

        Item.comments.push(newComment);

        //update recipe
        await dynamo.update({ TableName: "test-recipes-table", Key: { id }, UpdateExpression: "set comments = :comments", ExpressionAttributeValues: { ":comments": Item.comments } }).promise();
        body = { error: false, message: 'Comentario agregado' };
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
