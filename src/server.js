import express from "express";
import cors from 'cors';

import productRoutes from "./routes/productRoutes.js";
import returnRoutes from "./routes/returnRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import branchRoutes from "./routes/branchRoutes.js";

const server = express();

server.use(express.json());
server.use(cors())

server.use("/api", productRoutes);
server.use("/api", clientRoutes);
server.use("/api", branchRoutes);
server.use("/api", returnRoutes);

export default server;
