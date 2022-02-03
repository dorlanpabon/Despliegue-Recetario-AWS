const AWS = require("aws-sdk");
const s3 = new AWS.S3();
const uuidv4 = require('uuid');
const { getUserFromToken } = require("../lib/utils");

const dynamo = new AWS.DynamoDB.DocumentClient();

// bucket name env var will be set in serverless.yml file
const BUCKET_NAME = process.env.FILE_UPLOAD_BUCKET_NAME;

module.exports.handler = async function (event) {
    let body;
    let statusCode;
    try {
        let data = JSON.parse(event.body);
        //validate is exist file and fileKey
        if (data.files.length > 0) {
            //save all files
            for (let i = 0; i < data.files.length; i++) {
                const base64File = data.files[i];
                const decodedFile = Buffer.from(base64File.replace(/^data:image\/\w+;base64,/, ""), "base64");
                const params = {
                    Bucket: BUCKET_NAME,
                    Key: "recetas/" + uuidv4.v1() + ".jpeg",
                    Body: decodedFile,
                    ContentType: "image/jpeg"
                };

                const uploadResult = await s3.upload(params).promise();
                data.image.push(uploadResult.Location);
            }
        }
        delete data.files
        //get id user from token
        const userObj = await getUserFromToken(event.headers.Authorization);

        delete data.id
        data.user = userObj.id;
        result = await dynamo.put({
            TableName: "test-recipes-table",
            Item: {
                id: uuidv4.v1(),
                ...data
            }
        }).promise();

        statusCode = 200
        body = { error: false, message: 'Receta creada', params: { result } };
    } catch (e) {
        statusCode = 500
        body = e.message
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
