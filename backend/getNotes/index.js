const db = require("../db.js");
const {ScanCommand} = require("@aws-sdk/lib-dynamodb");
const headers = require("../headers.js");
const { getUserEmail } = require("../auth.js");

exports.handler = async (event) => {
  try {
    const { email } = getUserEmail(event.headers || {});
    const query = event.queryStringParameters?.query || "";    
    
    let filterExpression = "email = :u";
    let expressionValues = {
      ":u": email,
    };

    if (query) {
      filterExpression += " AND (contains(title, :q) OR contains(content, :q))";
      expressionValues[":q"] = query;
    }

    const result = await db.send(new ScanCommand({
      TableName: "Notes",
      FilterExpression: filterExpression,
      ExpressionAttributeValues: expressionValues
    }));
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
