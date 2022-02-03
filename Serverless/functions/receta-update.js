const AWS = require("aws-sdk");
const s3 = new AWS.S3();
const uuidv4 = require('uuid');

const dynamo = new AWS.DynamoDB.DocumentClient();


// bucket name env var will be set in serverless.yml file
const BUCKET_NAME = process.env.FILE_UPLOAD_BUCKET_NAME;

exports.handler = async (event) => {


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
                    Key: "recetas/" + uuidv4.v1(),
                    Body: decodedFile,
                    ContentType: "image/jpeg"
                };
                const uploadResult = await s3.upload(params).promise();
                data.image.push(uploadResult.Location);
            }
        }
        delete data.files
        body = await dynamo.put({
            TableName: "test-recipes-table",
            Item: {
                ...data,
            }
        }).promise();
        statusCode = 200
        body = JSON.stringify({ error: false, message: 'Receta actualizada' });
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
        }, body
    };
};
