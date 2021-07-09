import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import { CSVLink } from 'react-csv';

function App() {

  const dataClientes = [
    { id: 1, nombre: "Andrés Antón", clinica: 241 , direccion: "xxx", dentista:"xxx", distribuidor: "xxx", estado:"xxx", acciones:"xxx"},
    { id: 2, nombre: "Roberto García", clinica: 123 , direccion: "xxx", dentista:"xxx", distribuidor: "xxx", estado:"xxx", acciones:"xxx"},
  ];

  const [ cliente, setCliente ] = useState( dataClientes );
  const [ editarCliente, setEditarCliente ] = useState(false);
  const [ eliminarCliente, setEliminarCliente ] = useState(false);
  const [ añadirCliente, setAñadirCliente ] = useState(false);

  const [ clienteSeleccionado, setClienteSeleccionado ] = useState({
    id: '',
    nombre: '',
    clinica: '',
    direccion: '',
    dentista: '',
    distribuidor: '',
    estado: '',
    acciones: ''
  });
  

  const seleccionarCliente = ( elemento, caso ) => {

    setClienteSeleccionado(elemento);

    (caso === 'Editar' ) ? setEditarCliente (true) : setEliminarCliente(true)
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setClienteSeleccionado(( prevState ) => ({
      ...prevState,
      [name]: value

    }));
  }

  const editar=()=>{
    var clienteNuevo = cliente;
    clienteNuevo.map( cliente => {
      if( cliente.id === clienteSeleccionado.id ){

        cliente.minutos = clienteSeleccionado.minutos;
        cliente.nombre = clienteSeleccionado.nombre;

      }
    });
    setCliente( clienteNuevo );
    setEditarCliente(false);
  }

  const eliminar = () => {
    setCliente(cliente.filter( cliente => cliente.id !== clienteSeleccionado.id ));
    setEliminarCliente(false);
  }

  const abrirModalInsertar = () => {
    setClienteSeleccionado(null);
    setAñadirCliente(true);
  }

  const añadir = () => {

    var valorInsertar = clienteSeleccionado;
    valorInsertar.id = cliente[cliente.length-1].id+1;
    var clienteNuevo = cliente;
    clienteNuevo.push( valorInsertar );
    setCliente( clienteNuevo );
    setAñadirCliente(false);

  }
// <CSVLink datos = { dataClientes } filename= {"tablaClientes.csv"}><button className="btn btn-success"> Exportar a CSV </button> </CSVLink>
  return (
    <div className="App">
      <h2>Listado de pacientes</h2>
      <br />
    <button className="btn btn-success" onClick = {() => abrirModalInsertar()}>Añadir</button>

    <br /><br />
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre y apellidos</th>
            <th>Clínica</th>
            <th>Dirección</th>
            <th>Dentista</th>
            <th>Distribuidor</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          { cliente.map(elemento => (
            <tr>
              <td>{elemento.id}</td>
              <td>{elemento.nombre}</td>
              <td>{elemento.clinica}</td>
              <td>{elemento.direccion}</td>
              <td>{elemento.dentista}</td>
              <td>{elemento.distribuidor}</td>
              <td>{elemento.estado}</td>
              <td>{elemento.acciones}</td>
              <td><button className="btn btn-primary" onClick = {() => seleccionarCliente(elemento, 'Editar')}>Editar</button> {"   "} 
              <button className="btn btn-danger" onClick = {() => seleccionarCliente(elemento, 'Eliminar')}>Eliminar</button></td>
            </tr>
          ))
          }
        </tbody>
      </table>

      <Modal isOpen={ editarCliente }>
        <ModalHeader>
          <div>
            <h3>Editar cliente</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID</label>
            <input
              className = "form-control"
              readOnly
              type = "text"
              name = "id"
              value ={ clienteSeleccionado && clienteSeleccionado.id }
            />
            <br />

            <label>Cliente</label>
            <input
              className = "form-control"
              type = "text"
              name = "nombre"
              value = { clienteSeleccionado && clienteSeleccionado.nombre}
              onChange = { handleChange } 
            />
            <br />

            <label>Clinica</label>
            <input
              className = "form-control"
              type = "text"
              name = "clinica"
              value = { clienteSeleccionado && clienteSeleccionado.minutos}
              onChange = { handleChange }
            />
            <br />

            <label>Dirección</label>
            <input
              className = "form-control"
              type = "text"
              name = "direccion"
              value = { clienteSeleccionado && clienteSeleccionado.minutos}
              onChange = { handleChange }
            />
            <br />

            <label>Dentista</label>
            <input
              className = "form-control"
              type = "text"
              name = "dentista"
              value = { clienteSeleccionado && clienteSeleccionado.minutos}
              onChange = { handleChange }
            />
            <br />

            <label>Distribuidor</label>
            <input
              className = "form-control"
              type = "text"
              name = "distribuidor"
              value = { clienteSeleccionado && clienteSeleccionado.minutos}
              onChange = { handleChange }
            />
            <br />

            <label>Estado</label>
            <input
              className = "form-control"
              type = "text"
              name = "estado"
              value = { clienteSeleccionado && clienteSeleccionado.minutos}
              onChange = { handleChange }
            />
            <br />

            <label>Acciones</label>
            <input
              className = "form-control"
              type = "text"
              name = "acciones"
              value = { clienteSeleccionado && clienteSeleccionado.minutos}
              onChange = { handleChange }
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className = "btn btn-primary" onClick = {() => editar() }>
            Actualizar
          </button>
          <button
            className="btn btn-danger"
            onClick = {() => setEditarCliente(false) }
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>


      <Modal isOpen = { eliminarCliente }>
        <ModalBody>
          Estás Seguro que deseas eliminar el cliente {clienteSeleccionado && clienteSeleccionado.nombre}
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>eliminar()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick = {() => setEliminarCliente(false)}
          >
            No
          </button>
        </ModalFooter>
      </Modal>


        <Modal isOpen = { añadirCliente }>
        <ModalHeader>
          <div>
            <h3>Añadir Cliente</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className = "form-group">
            <label>ID</label>
            <input
              className = "form-control"
              readOnly
              type = "text"
              name = "id"
              value = {cliente[cliente.length-1].id+1 }
            />
            <br />

            <label>Cliente</label>
            <input
              className = "form-control"
              type = "text"
              name = "nombre"
              value = { clienteSeleccionado ? clienteSeleccionado.nombre: '' }
              onChange = { handleChange }
            />
            <br />

            <label>Clínica</label>
            <input
              className = "form-control"
              type = "text"
              name = "clinica"
              value = { clienteSeleccionado ? clienteSeleccionado.minutos: '' }
              onChange = { handleChange }
            />
            <br />

            <label>Dirección</label>
            <input
              className = "form-control"
              type = "text"
              name = "direccion"
              value = { clienteSeleccionado ? clienteSeleccionado.minutos: '' }
              onChange = { handleChange }
            />
            <br />

            <label>Dentista</label>
            <input
              className = "form-control"
              type = "text"
              name = "dentista"
              value = { clienteSeleccionado ? clienteSeleccionado.minutos: '' }
              onChange = { handleChange }
            />
            <br />

            <label>Distribuidor</label>
            <input
              className = "form-control"
              type = "text"
              name = "distribuidor"
              value = { clienteSeleccionado ? clienteSeleccionado.minutos: '' }
              onChange = { handleChange }
            />
            <br />

            <label>Estado</label>
            <input
              className = "form-control"
              type = "text"
              name = "estado"
              value = { clienteSeleccionado ? clienteSeleccionado.minutos: '' }
              onChange = { handleChange }
            />
            <br />

            <label>Acciones</label>
            <input
              className = "form-control"
              type = "text"
              name = "acciones"
              value = { clienteSeleccionado ? clienteSeleccionado.minutos: '' }
              onChange = { handleChange }
            />
            <br />

          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary"
          onClick = {() => añadir ()}>
            Insertar
          </button>
          <button
            className="btn btn-danger"
            onClick = {() => setAñadirCliente(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );

  
}

export default App;
