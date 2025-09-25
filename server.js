import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 🔑 Your Discord webhook goes here
const webhook = process.env.DISCORD_WEBHOOK;

app.get("/", (req, res) => {
  res.send("Relay is running ✅");
});

app.post("/relay", async (req, res) => {
  const log = req.body.log || "No log received";

  await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: "```" + log + "```" })
  });

  res.send("OK");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Relay running on port " + PORT));
