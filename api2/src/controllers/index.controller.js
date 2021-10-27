const { Pool } = require("pg");

const pool = new Pool({
  user: "pgadmin",
  host: "172.31.254.2",
  password: "pez1988pg",
  database: "webservice",
  port: "5432",
});

const estadistica = async (req, res) => {
  const response = await pool.query(
    "SELECT * FROM public.conteo ORDER BY id ASC"
  );
  //si la estadistica se hace aqui complementar
  res.json(response.rows); //responde en formato json el contenido de response
};

const validacionVoto = async (req, res) => {
  const rut = parseInt(req.params.rut);
  const { hash } = req.body;
  const response = await pool.query(
    "SELECT voto FROM public.usuario WHERE hash = $1 AND rut = $2",
    [hash, rut]
  );
  res.json(response.rows); //responde en formato json el contenido de response
};
module.exports = {
  //exportar todos las funciones
  estadistica,
  validacionVoto,
};
