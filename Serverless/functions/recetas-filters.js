const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();


module.exports.handler = async function (event) {

    let body;
    let statusCode;
    try {
        //search categories of recipes and count number of recipes
        let recipesBySearch = [];
        let data = JSON.parse(event.body)

        //get all recipes
        const { Items } = await dynamo.scan({ TableName: "test-recipes-table" }).promise();

        recipesBySearch = Items.filter(item => {
            if (data.users.includes(item.user) && data.users.length > -1) {
                return data.users.includes(item.user);
            }
            if (data.categories.includes(item.category) && data.categories.length > -1) {
                return true;
            }
            if (item['qualification'] >= data.stars && data.stars !== 0) {
                return true;
            }
            if (data.search != '' && (item['title'].toLowerCase().indexOf(data.search.toLowerCase()) != -1 ||
                item['description'].toLowerCase().indexOf(data.search.toLowerCase()) != -1 ||
                item['ingredients'].filter(item => item['name'].toLowerCase().indexOf(data.search.toLowerCase()) != -1).length > 0)) {
                return true;
            }

        });
        body = recipesBySearch;
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
