import { MongoClient } from "mongodb";

const LOCAL_URI = "mongodb://127.0.0.1:27017/portfolio?replicaSet=rs0&directConnection=true";
const ATLAS_URI = "mongodb+srv://hanzlarajput:hsrajput786%40@cluster0.fnawbb2.mongodb.net/portfolio";
const DB_NAME = "portfolio";

async function migrate() {
  console.log("Connecting to local MongoDB...");
  const local = new MongoClient(LOCAL_URI);
  await local.connect();

  console.log("Connecting to MongoDB Atlas...");
  const atlas = new MongoClient(ATLAS_URI);
  await atlas.connect();

  const localDb = local.db(DB_NAME);
  const atlasDb = atlas.db(DB_NAME);

  const collections = await localDb.listCollections().toArray();
  console.log(`\nFound ${collections.length} collections: ${collections.map(c => c.name).join(", ")}\n`);

  for (const { name } of collections) {
    const docs = await localDb.collection(name).find({}).toArray();
    if (docs.length === 0) {
      console.log(`  [${name}] empty — skipped`);
      continue;
    }

    // Drop existing Atlas collection so we start fresh
    await atlasDb.collection(name).drop().catch(() => {});
    await atlasDb.collection(name).insertMany(docs);
    console.log(`  [${name}] migrated ${docs.length} document(s)`);
  }

  await local.close();
  await atlas.close();
  console.log("\nMigration complete.");
}

migrate().catch((err) => {
  console.error("Migration failed:", err.message);
  process.exit(1);
});
