// api/users.js

// Para efectos de prueba, se utiliza un array en memoria.
// IMPORTANTE: Los datos se reiniciarán en cada despliegue o reinicio del contenedor.
// Para persistencia real utiliza una base de datos externa.
let users = [];

export default function handler(req, res) {
  const { method } = req;

  if (method === "GET") {
    if (req.query && req.query.id) {
      const user = users.find(u => u.id === req.query.id);
      if (user) return res.status(200).json(user);
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(users);
  }

  if (method === "POST") {
    const newUser = req.body;
    users.push(newUser);
    return res.status(201).json(newUser);
  }

  if (method === "PUT") {
    const { id } = req.query;
    const updatedUser = req.body;
    users = users.map(u => (u.id === id ? updatedUser : u));
    return res.status(200).json(updatedUser);
  }

  res.status(405).json({ message: "Method not allowed" });
}
