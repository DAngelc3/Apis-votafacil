const { Pool } = require("pg");

const pool = new Pool({
  user: "pgadmin",
  host: "172.31.254.2",
  password: "pez1988pg",
  database: "votadb",
  port: "5432",
});
const poolWebservice = new Pool({
  user: "pgadmin",
  host: "172.31.254.2",
  password: "pez1988pg",
  database: "webservice",
  port: "5432",
});

const getvotacion = async (req, res) => {
  const rut = parseInt(req.params.rut); //obtiene el parametro dado en las rutas (:rut)
  const response = await pool.query(
    "SELECT * FROM public.votantes WHERE rut = $1",
    [rut]
  );
  res.send(res.json(response.rows)); //responde en formato json el contenido de response
};

const insertvoto = async (req, res) => {
  const rut = parseInt(req.params.rut);
  const { correo, voto, mesa, hash, ipvoto } = req.body; //obtiene el parametro atraves de la pagina (form)
  //inserta el voto en la bd de votaciones
  const response = await pool.query(
    "INSERT INTO public.usuario VALUES ($1,$2,$3,$4,$5,$6)",
    [rut, correo, voto, mesa, hash, ipvoto]
  );
  //inserta el mismo voto pero en la base de datos del webservice
  const resp = await poolWebservice.query(
    "INSERT INTO public.usuario VALUES ($1,$2,$3,$4,$5,$6)",
    [rut, correo, voto, mesa, hash, ipvoto]
  );
  res.send(res.json("Su voto fue introducido correctamente"));
};

//login
const getpartpoli = async (req, res) => {
  const { rut, pass } = req.body;
  const response = await pool.query(
    "SELECT * FROM public.partidos WHERE rut = $1 AND password = $2",
    [rut, pass]
  );
  res.json(response.rows);
};

//login usuario
const login = async (req, res) => {
  const { rut, pass } = req.body;
  const response = await pool.query(
    "SELECT usuarios.rut, votacion.nombre, votacion.fecha_inicio, votacion.fecha_termino, eleccion.nombre, opcion.nombre, opcion.opcion FROM usuario JOIN registro ON usuario.rut = registro.rut JOIN votacion ON registro.id_votacion = votacion.id_votacion JOIN opcion ON opcion.id_votacion = votacion.id_votacion JOIN eleccion ON option.id_eleccion = eleccion.id_eleccion WHERE usuario.rut = $1 AND usuario.clave = $2",
    [rut, pass]
  );
  res.send(res.json(response.rows));
};

//exportacion
const exportacion = async (req, res) => {
  const { rut } = req.body;
  const response = await pool.query(
    "SELECT urna.hash, urna.id_voto, registro.rut FROM urna JOIN registro ON urna.id_votacion = registro.id_votacion"
  );
  const id = response[id_voto]
  await pool.query(
    "UPDATE export SET id_voto = $1,  WHERE rut = $2",[id, rut]
  );
  res.send(res.json(response.rows));
};

//actualizar datos de exportacion
const actualizar = async (req, res) => {
  const { rut } = req.body;
  const id = await pool.query(
    "SELECT id_voto FROM export WHERE rut = $1",[rut]
    );
  const response = await pool.query(
    "SELECT urna.hash, urna.id_voto, registro.rut FROM urna JOIN registro ON urna.id_votacion = registro.id_votacion WHERE id_voto >= $1",
    [id] //problemas si las id no son continuas ¿?
  );
  res.send(res.json(response.rows));
};

module.exports = {
  //exportar todos las funciones
  exportacion,
  actualizar,
  getvotacion,
  insertvoto,
  getpartpoli,
  login,
};
