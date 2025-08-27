import mongoose from "mongoose";

const MONGODB_URI =
  "mongodb+srv://alejocalandra18:Qbsmrql5bc0u3LEB@cluster0.lu85r8x.mongodb.net/miBaseDeDatos";

let cached = global.mongoose || { conn: null, promise: null };
global.mongoose = cached;

export async function connectDB() {
  if (cached.conn) return cached.conn;

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });

  cached.conn = await cached.promise;
  return cached.conn;
}
