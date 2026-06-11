const db = require("../db.js");
const {ScanCommand} = require("@aws-sdk/lib-dynamodb");
const headers = require("../headers.js");

exports.handler = async () => {
  try {
    const params = {
      TableName: "Notes",
    };
    const result = await db.send(new ScanCommand(params));
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        items: result.Items,
        count: result.Items.length,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
        headers,
        body: JSON.stringify({
        message: "Failed to retrieve notes",
        error: error.message,
      }),
    };
  }
};
