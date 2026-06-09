import db from "./db.js";
import { v4 as uuidv4 } from "uuid";
import { PutCommand } from "@aws-sdk/lib-dynamodb";

export const handler = async (event) => {
  try {
    const body =
      typeof event.body === "string"
        ? JSON.parse(event.body)
        : event.body || {};

    const { title, content } = body;

    if (!title?.trim() || !content?.trim()) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "title and content are required" }),
      };
    }

    const now = new Date().toISOString();

    const id = uuidv4();

    await db.send(
      new PutCommand({
        TableName: "Notes",
        Item: {
          id,
          title,
          content,
          createdAt: now,
          updatedAt: now,
        },
      }),
    );

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: "Note created successfully",
        id,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error creating note",
        error: error.message,
      }),
    };
  }
};
