// Require AWS SDK and instantiate DocumentClient
const AWS = require("aws-sdk");
const bcrypt = require("bcryptjs");
const { Model } = require("dynamodb-toolbox");
const { v4: uuidv4 } = require("uuid");
const { signToken } = require("../lib/utils");

const User = new Model("User", {
  // Specify table name
  table: "test-users-table",

  // Define partition and sort keys
  partitionKey: "pk",
  sortKey: "sk",

  // Define schema
  schema: {
    pk: { type: "string", alias: "email" },
    sk: { type: "string", hidden: true, alias: "type" },
    id: { type: "string" },
    name: { type: "string" },
    passwordHash: { type: "string" },
    createdAt: { type: "string" }
  }
});

// INIT AWS
AWS.config.update({
  region: "us-east-1"
});

const docClient = new AWS.DynamoDB.DocumentClient();

const createDbUser = async props => {
  let res;
  //sheach user if exists
  const user = await getUserByEmail(props.email);

  if (user.id) { return { error: true, message: 'Usuario ya existe' } }

  const passwordHash = await bcrypt.hash(props.password, 8); // hash the pass
  delete props.password; // don't save it in clear text

  const params = User.put({
    id: uuidv4(),
    type: "User",
    passwordHash,
    ...props,
    createdAt: new Date()
  });

  console.log("create user with params", params);

  const response = await docClient.put(params).promise();

  const userRes = await getUserByEmail(props.email);

  const token = await signToken(userRes);

  return { error: false, message: 'Usuario creado correctamente', params: { token } };
};

const getUserByEmail = async email => {
  const params = User.get({ email, sk: "User" });
  const response = await docClient.get(params).promise();

  return User.parse(response);
};

module.exports = {
  createDbUser,
  getUserByEmail
};
