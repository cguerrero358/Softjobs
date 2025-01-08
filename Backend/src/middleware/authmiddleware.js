const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const Authorization = req.header("Authorization");
  if (!Authorization) {
    return res.status(401).json({ error: "No token provided" });
  }
  const token = Authorization.split("Bearer ")[1];
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  try {
    
    jwt.verify(token, process.env.JWT_SECRET); 
    const payload = jwt.decode(token); 
    req.user = payload; 
    console.log(`Acceso autorizado para ${payload.email}`);
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send({ error: "Token inválido" });
  }
};


const reportarConsulta = async (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const queryParams = req.query;
  const routeParams = req.params;
  const headers = req.headers;
  const body = req.body;

  console.log(
    `\nHoy ${new Date()}
  Se ha recibido una consulta en la ruta ${url}
  Metodo: ${method}
  Parametros de consulta (query): ${JSON.stringify(queryParams)}
  Parametros de ruta (params): ${JSON.stringify(routeParams)}
  Encabezados: ${JSON.stringify(headers)}
  Cuerpo: ${JSON.stringify(body)}\n`
  );
  next();
};

module.exports = { authMiddleware, reportarConsulta };