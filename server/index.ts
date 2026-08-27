import "dotenv/config";
import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { getAllStock, getSizeStockForSlug, getStockForSlug } from "./stock";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Live stock levels, backed by Supabase. Returns an empty result instead of
  // erroring when Supabase isn't configured yet, so the site keeps working
  // without stock data until SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY are set.
  app.get("/api/stock", async (_req, res) => {
    const result = await getAllStock();
    if ("error" in result) return res.status(500).json(result);
    res.json(result.data);
  });

  app.get("/api/stock/:slug", async (req, res) => {
    const result = await getStockForSlug(req.params.slug);
    if ("error" in result) return res.status(500).json(result);
    res.json({ slug: req.params.slug, ...result.data });
  });

  // Per-size stock (rings). Empty object when Supabase isn't configured, or the
  // product has no per-size rows — the frontend treats that as "no size data yet".
  app.get("/api/size-stock/:slug", async (req, res) => {
    const result = await getSizeStockForSlug(req.params.slug);
    if ("error" in result) return res.status(500).json(result);
    res.json(result.data);
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
