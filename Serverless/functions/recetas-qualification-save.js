const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();


module.exports.handler = async function (event) {
    let body;
    let statusCode;

    try {
        //get recipe by id
        let { id } = event.pathParameters;
        let { Item } = await dynamo.get({ TableName: "test-recipes-table", Key: { id } }).promise();

        //add qualification to qualificationDetails of recipe
        let { qualification } = JSON.parse(event.body);
        Item.qualificationDetails.push({ qualification });

        Item.qualification = Item.qualificationDetails.reduce((a, b) => a + b.qualification, 0) / Item.qualificationDetails.length;

        //update recipe
        await dynamo.update({ TableName: "test-recipes-table", Key: { id }, UpdateExpression: "set qualificationDetails = :qualificationDetails, qualification = :qualification", ExpressionAttributeValues: { ":qualificationDetails": Item.qualificationDetails, ":qualification": Item.qualification } }).promise();

        body = { error: false, message: "Receta calificada" }
        statusCode = 200;
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
