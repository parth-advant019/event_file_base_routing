import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
} from "../../../helpers/db-utils";

async function handler(req, res) {
  const eventId = req.query.eventId;

  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    return res.status(500).json({ message: "Connecting to database failed!" });
  }

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      client.close();
      return res.status(422).json({ message: "Invalid input" });
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    try {
      const result = await insertDocument(client, "comments", newComment);

      newComment._id = result.insertedId;

      client.close();

      return res.status(201).json({
        message: "Comment added",
        comment: newComment,
      });
    } catch (error) {
      client.close();
      return res.status(500).json({ message: "Insert comment failed" });
    }
  }

  if (req.method === "GET") {
    try {
      const documents = await getAllDocuments(
        client,
        "comments",
        { eventId: eventId },
        { _id: -1 },
      );

      client.close();

      return res.status(200).json({ comments: documents });
    } catch (error) {
      client.close();
      return res.status(500).json({ message: "Getting comments failed." });
    }
  }
}

export default handler;
