const db = require("../db.js");
const {GetCommand} = require("@aws-sdk/lib-dynamodb");

exports.handler = async (event) => {
  try {
    const id = event.pathParameters?.id;

    if (!id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Note id is required" }),
      };
    }

    const result = await db.send(
      new GetCommand({
        TableName: "Notes",
        Key: { id },
      }),
    );

    if (!result.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Note not found" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error retrieving note",
        error: error.message,
      }),
    };
  }
};
