const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();


module.exports.handler = async function (event) {

    let body;
    let statusCode;
    try {
        //delete recipe by id
        const { id } = event.pathParameters;
        const { Items } = await dynamo.scan({ TableName: "test-recipes-table" }).promise();
        const recipe = Items.find(item => item.id === id);

        if (!recipe) { return { statusCode: 404, body: "Not found" }; }

        await dynamo.delete({ TableName: "test-recipes-table", Key: { id } }).promise();
        body = JSON.stringify({ error: false, message: 'Receta eliminada' });
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
        body
    };
};
