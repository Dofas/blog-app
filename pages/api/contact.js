import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, name, message } = req.body;

    if (
      !email ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !message ||
      message.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input' });
    }

    const newMessage = {
      email,
      name,
      message,
    };

    let client;

    try {
      client = await MongoClient.connect(process.env.MONGO_URL);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to connect to MongoDB' });
    }

    const db = client.db(process.env.MESSAGE_DB_NAME);

    try {
      const result = await db.collection('messages').insertOne(newMessage);
      newMessage.id = result.insertedId;
    } catch (error) {
      await client.close();
      return res
        .status(500)
        .json({ message: 'Failed to save the message to MongoDB' });
    }

    await client.close();

    res
      .status(201)
      .json({ message: 'Successfully stored message!', entity: newMessage });
  }
}
