import express from "express";

const router = express.Router();

const defaultMessage = "Bem-vindo ao mencionômetro. Explore as outras rotas.";

router.get("/", (req, res) => res.status(200).json(defaultMessage));

export default router;
