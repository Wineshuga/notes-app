const db = require("../db.js");
const { v4: uuidv4 } = require("uuid");
const { PutCommand } = require("@aws-sdk/lib-dynamodb");
const headers = require("../headers.js");

exports.handler = async (event) => {
  try {
    const body =
      typeof event.body === "string"
        ? JSON.parse(event.body)
        : event.body || {};

    const { title, content } = body;

    if (!title?.trim() || !content?.trim()) {
      return {
        statusCode: 400,
        headers,
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
      headers,
      body: JSON.stringify({
        message: "Note created successfully",
        id,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        message: "Error creating note",
        error: error.message,
      }),
    };
  }
};
