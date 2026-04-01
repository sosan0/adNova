import express from "express";
import { createServer as createViteServer } from "vite";
import { WebSocketServer, WebSocket } from "ws";
import http from "http";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;
  const server = http.createServer(app);

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // WebSocket Server
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    console.log("Client connected to analytics stream");

    // Send initial data
    const sendUpdate = () => {
      if (ws.readyState === WebSocket.OPEN) {
        const update = {
          type: "ANALYTICS_UPDATE",
          data: {
            reach: Math.floor(Math.random() * 5000) + 1000,
            engagement: Math.floor(Math.random() * 2000) + 500,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            stats: {
              reach: (1.2 + (Math.random() * 0.1)).toFixed(2) + "M",
              engagement: (45.8 + (Math.random() * 2)).toFixed(1) + "K",
              followers: (82.4 + (Math.random() * 0.5)).toFixed(1) + "K",
              conversion: (3.2 + (Math.random() * 0.4 - 0.2)).toFixed(1) + "%"
            }
          }
        };
        ws.send(JSON.stringify(update));
      }
    };

    // Send updates every 5 seconds
    const interval = setInterval(sendUpdate, 5000);

    ws.on("close", () => {
      clearInterval(interval);
      console.log("Client disconnected");
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
