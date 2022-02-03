const { createDbUser } = require("../lib/db");
const { signToken } = require("../lib/utils");

module.exports.handler = async function registerUser(event) {
  const body = JSON.parse(event.body);

  return createDbUser(body)
    .then(body => ({
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
      },
      body: JSON.stringify(body)
    }))
    .catch(err => {
      console.log({ err });

      return {
        statusCode: err.statusCode || 500,
        headers: {
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        body: { stack: err.stack, message: err.message }
      };
    });
};
