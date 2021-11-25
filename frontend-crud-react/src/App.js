import React, { createContext, useContext, useReducer, useEffect, useRef, useState } from 'react';

const HOST_API = "http://localhost:8080/api";

// Se crea el estado inicial
const initialState = {
  list: [],
  item: {}
};

const Store = createContext(initialState)

// La clase form captura los eventos y los manda a la base de datos
const Form = () => {
  const formRef = useRef(null);
  const { dispatch, state: { item } } = useContext(Store);
  const [state, setState] = useState(item);

  const onAdd = (event) => {
    event.preventDefault(); // Método para prevenir eventos default

    const request = {
      name: state.name,
      id: null,
      isCompleted: false
    };

    fetch(HOST_API + "/todo", {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then((todo) => {
        dispatch({ type: "add-item", item: todo });
        setState({ name: "" });
        formRef.current.reset();
      });
  }

  const onEdit = (event) => {
    event.preventDefault();

    const request = {
      name: state.name,
      id: item.id,
      isCompleted: item.isCompleted
    };

    fetch(HOST_API + "/todo", {
      method: "PUT",
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then((todo) => {
        dispatch({ type: "update-item", item: todo });
        setState({ name: "" });
        formRef.current.reset();
      });
  }
  <div>
    <h1>TO-DO List</h1>
    <hr />
  </div>  //Formulario para agregar y actualizar
  return <form ref={formRef}> 
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="container">
            <div className="form-group">
              <input type="text" name="name" defaultValue={item.name} onChange={(event) => {
                setState({ ...state, name: event.target.value })
              }}></input>
            </div>
            {item.id && <button onClick={onEdit}>Actualizar</button>}
            {!item.id && <button onClick={onAdd}>Agregar</button>}
          </div>
        </div>
      </div>
    </div>
  </form>
}

const List = () => {
  const { dispatch, state } = useContext(Store);

  useEffect(() => {
    fetch(HOST_API + "/todos")
      .then(response => response.json())
      .then((list) => {
        dispatch({ type: "update-list", list })
      })
  }, [state.list.length, dispatch]);

  const onDelete = (id) => {
    fetch(HOST_API + "/" + id + "/todo", {
      method: "DELETE"
    })
      .then((list) => {
        dispatch({ type: "delete-item", id })
      })
  };

  const onEdit = (todo) => {
    dispatch({ type: "edit-item", item: todo })
  };

  // Formulario para el manejo de los datos
  return <div className="container mt-10">
    <table className="table table-striped table-dark">
      <thead>
        <tr>
          <td className="table-primary">ID</td>
          <td>Nombre</td>
          <td>¡¿Está completado?</td>
        </tr>
      </thead>
      <tbody>
        {state.list.map((todo) => {
          return <tr key={todo.id}>
            <td>{todo.id}</td>
            <td>{todo.name}</td>
            <td><input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"></input></td>
            <td><button onClick={() => onDelete(todo.id)} className="btn btn-primary">Eliminar</button></td>
            <td><button onClick={() => onEdit(todo)} className="btn btn-primary">Editar</button></td>
          </tr>
        })}
      </tbody>
    </table>
  </div>
}

function reducer(state, action) {
  switch (action.type) {

    case 'update-item':
      const listUpdateEdit = state.list.map((item) => {
        if (item.id === action.item.id) {
          return action.item;
        }
        return item;
      });
      return { ...state, list: listUpdateEdit, item: {} }

    case 'delete-item':
      const listUpdate = state.list.filter((item) => {
        return item.id !== action.id;
      });
      return { ...state, list: listUpdate, item: {} }

    case 'update-list':
      return { ...state, list: action.list }

    case 'edit-item':
      return { ...state, item: action.item }

    case 'add-item':
      const newList = state.list;
      newList.push(action.item);
      return { ...state, list: newList }
    default:
      return state;
  }
}

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Store.Provider value={{ state, dispatch }}>
    {children}
  </Store.Provider>

}

function App() {
  return <StoreProvider>
    <Form />
    <List />
  </StoreProvider>
}

export default App;
