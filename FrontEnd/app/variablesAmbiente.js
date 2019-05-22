(function (window) {
  window.__env = window.__env || {};
  //API url
  window.__env.apiUrl = 'http://localhost';
  //Url base
  window.__env.baseUrl = '/';
  //Puertos de microservicios
  //Puerto de usuarios
  window.__env.puertoUsuarios = ':7003';
  //Puerto de Facultados
  window.__env.puertoFacultades = ':7005';
  //Puerto de especialidades
  window.__env.puertoEspecialidad = ':7005';
  //Puerto de semestre
  window.__env.puertoSemestre = ':7006';
  //Puerto de Calificacióng
  window.__env.puertoCalificacion = ':7007';
  //Permite depurar la aplicacion
  window.__env.enableDebug = true;
}(this));
