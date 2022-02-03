const { login } = require("../lib/utils");

module.exports.handler = async function signInUser(event) {
  const body = JSON.parse(event.body);

  return login(body)
    .then(session => ({
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
      },
      body: JSON.stringify(session)
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
