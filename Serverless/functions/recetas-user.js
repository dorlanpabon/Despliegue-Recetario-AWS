const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

const { getUserByEmail } = require("../lib/db");
const { getUserFromToken } = require("../lib/utils");

module.exports.handler = async function (event) {
    let userObj
    let dbUser
    let recipes
    let body
    let statusCode
    try {
        userObj = await getUserFromToken(event.headers.Authorization);


        dbUser = await getUserByEmail(userObj.email);

        //search recipes for id user
        let { Items } = await dynamo.scan({ TableName: "test-recipes-table" }).promise();

        body = Items.filter(item => item.user === dbUser.id);

        statusCode = 200
    } catch (e) {
        statusCode = 500
        body = e.message;
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
