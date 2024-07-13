import { users } from "../database/db";

function authMiddleware(req, res, next) {
  const id = req.headers.authorization;

  console.log(id);

  if (!id) {
    return res.status(400).json({ ok: false, message: "Id não informado" });
  }

  const idFound = users.find((user) => user.id === id);

  console.log(`Id informado inválido e Id passado pelo headers:${id}`);

  if (!idFound) {
    return res.status(400).json({ ok: false, message: "Id inválido" });
  }

  return next();
}

export { authMiddleware };
