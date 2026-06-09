import db from "../db.js";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";

export const handler = async () => {
  try {
    const params = {
      TableName: "Notes",
    };
    const result = await db.send(new ScanCommand(params));
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: result.Items,
        count: result.Items.length,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Failed to retrieve notes",
        error: error.message,
      }),
    };
  }
};
