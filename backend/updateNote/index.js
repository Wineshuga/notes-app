import db from "../db.js";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";

export const handler = async (event) => {
  try {
    const id = event.pathParameters?.id;

    if (!id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Note id is required" }),
      };
    }

    const body =
      typeof event.body === "string"
        ? JSON.parse(event.body)
        : event.body || {};

    const { title, content } = body;

    if (!title?.trim() || !content?.trim()) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "title and content are required",
        }),
      };
    }

    await db.send(
      new UpdateCommand({
        TableName: "Notes",
        Key: { id },
        UpdateExpression:
          "set title = :title, content = :content, updatedAt = :updatedAt",
        ExpressionAttributeValues: {
          ":title": title,
          ":content": content,
          ":updatedAt": new Date().toISOString(),
        },
        ConditionExpression: "attribute_exists(id)",
      }),
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Note updated successfully" }),
    };
  } catch (error) {
    if (error.name === "ConditionalCheckFailedException") {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Note not found" }),
      };
    }

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error updating note",
        error: error.message,
      }),
    };
  }
};
