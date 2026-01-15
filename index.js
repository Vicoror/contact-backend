import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import contactRoutes from "./src/routes/contact.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "*"
}));

app.use(express.json());

app.use("/api/contact", contactRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Contact API running");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () =>
  console.log(`✅ Server running on port ${PORT}`)
);
