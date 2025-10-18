import express from "express";
import cors from "cors";
import httpProxy from "http-proxy";

const app = express();
const proxy = httpProxy.createProxyServer({ changeOrigin: true });

app.use(cors());

app.get("/stream", (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).send("Missing URL parameter");

  proxy.web(req, res, { target: url, changeOrigin: true }, (err) => {
    console.error("Error proxying stream:", err.message);
    res.status(500).send("Error streaming content");
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
