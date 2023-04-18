import { MongoClient } from "mongodb";

export const getCityDetails = async (req, res) => {
  const client = new MongoClient(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();

    const database = client.db("world-city-details");
    const collection = database.collection("city-details");

    const userInput = req.query.input;
    console.log("userInput", userInput);

    const cities = await collection
      .find({ city: { $regex: `^${userInput}`, $options: "i" } })
      .toArray();

    console.log("cities", cities);
    return res.status(200).json(cities);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  } finally {
    await client.close();
  }
};
