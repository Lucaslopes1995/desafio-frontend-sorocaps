export const USERLOGGED = "USERLOGGED";
export const CREATEPRODUCT = "CREATEPRODUCT";
export const CREATECLIENTE = "CREATECLIENTE";
export const CREATEPEDIDO = "CREATEPEDIDO";
export const MESSAGEMODAL = "MESSAGEMODAL";

export const LoggedUser = (payload) => ({ type: USERLOGGED, payload });

export const createProduct = (payload) => ({ type: CREATEPRODUCT, payload });

export const createCliente = (payload) => ({ type: CREATECLIENTE, payload });

export const createPedido = (payload) => ({ type: CREATEPEDIDO, payload });

export const messageModal = (payload) => ({ type: MESSAGEMODAL, payload });