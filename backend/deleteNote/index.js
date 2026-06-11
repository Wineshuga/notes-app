const db = require("../db.js");
const {DeleteCommand} = require("@aws-sdk/lib-dynamodb");
const {GetCommand} = require("@aws-sdk/lib-dynamodb");
const headers = require("../headers.js");

exports.handler = async (event) => {
  try {
    const id = event.pathParameters?.id;

    if (!id) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          message: "Note id is required",
        }),
      };
    }

    const params = {
      TableName: "Notes",
      Key: { id },
    };

    await db.send(
      new DeleteCommand({
        TableName: "Notes",
        Key: { id },
        ConditionExpression: "attribute_exists(id)",
      }),
    );

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: "Note deleted successfully" }),
    };
  } catch (error) {
    if (error.name === "ProvisionedThroughputExceededException") {
      return {
        statusCode: 503,
        headers,
        body: JSON.stringify({
          message: "Service unavailable, please try again later",
        }),
      };
    }

    if (error.name === "conditionalcheckfailedexception") {
      return {
        statusCode: 404,
  headers,        body: JSON.stringify({ message: "Note not found" }),
      };
    }

    return {
      statusCode: 500,
headers,      body: JSON.stringify({
        message: "Error deleting note",
        error: error.message,
      }),
    };
  }
};
