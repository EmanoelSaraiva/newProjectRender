import express from "express";
import { users } from "../database/db";
import { authMiddleware } from "../middleware/authMiddleware";

const app = express();

app.use(express.json());

// Este middleware é para validar o e-mail que vou receber do body das requisições
function authLogin(req, res, next) {
  const emailUser = req.body.email;

  if (!emailUser) {
    return res
      .status(400)
      .json({ ok: false, message: "E-mail ou senha inválidos" });
  }
  // Estou consultando no array através do find se o e-mail informado existe o retorno será o objeto encontrado ou undefined
  const userFound = users.find((user) => user.email === emailUser);

  console.log(`Estou no middleware e este é o e-mail passado: ${emailUser}`);

  if (!userFound) {
    return res
      .status(400)
      .json({ ok: false, message: "E-mail ou senha inválidos" });
  }

  return next();
}

app.post("/login", authLogin, (req, res) => {
  const { email, password } = req.body;

  console.log(req.body);

  if (!email || !password) {
    return res.status(400).json({
      ok: false,
      message: "E-mail ou senha não informado ou inválido",
    });
  }

  const data = {
    email: email,
  };

  return res
    .status(201)
    .json({ ok: true, message: "Usuario logado com sucesso", data: data });
});

app.get("/users", authMiddleware, (req, res) => {
  res.status(200).json({ ok: false, message: "Autorizado", data: users });
});

app.get("/", (req, res) => {
  return res.status(200).json({
    status: true,
    statusCode: 200,
    message: "Api funcionando no render",
    data: users,
  });
});

app.listen(8000, () => {
  console.log("Server running port 8000");
});
