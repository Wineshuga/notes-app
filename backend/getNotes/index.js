const db = require("../db.js");
const {ScanCommand} = require("@aws-sdk/lib-dynamodb");
const headers = require("../headers.js");

exports.handler = async (event) => {
  try {
    const userEmail = event.headers["cf-access-authenticated-user-email"];
    const query = event.queryStringParameters?.query || "";    
    
    if (!userEmail) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ message: "Unauthorized" }),
      };
    }

    let filterExpression = "userEmail = :u";
    let expressionValues = {
      ":u": userEmail,
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
