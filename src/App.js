import { useState, useRef } from 'react';
import './App.css';

function App() {
  const [list, setList] = useState("");
  const [editItem, setEditItem] = useState(null);
  const [listArray, setArray] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

  function handleChange(e) {
    setList(e.target.value);
  }

  function editListItem(val) {
    setEditItem(val);
    setList(val.list);
    setIsEditing(true);
    inputRef.current.focus();
  }

  function handleClick(e, isEditingItem) {
    e.preventDefault();
    if (isEditingItem) {
      const updatedListArray = listArray.map(item => {
        if (item.id === editItem.id) {
          return {
            id: editItem.id,
            list
          };
        } else {
          return item;
        }
      });
      setArray(updatedListArray);
    } else {
      const listNew = {
        id: listArray.length + 1,
        list: list
      };
      setArray([...listArray, listNew]);
    }
    setList("");
    setEditItem(null);
    setIsEditing(false);
  }

  function buttonClick(id) {
    setArray(listArray.filter(item => item.id !== id));
  }

  return (
    <div className="App">
      <h1>TO DO APP</h1>
      <div className='main'>
        <form>
          <input ref={inputRef} type="text" name="List" value={list} placeholder='List' onChange={handleChange} />
          {list.length > 0 && <button onClick={(e) => handleClick(e, isEditing)}>{isEditing ? "Update" : "Add"}</button>}
        </form>
        <ul>
          {listArray.map((val) => (
            <li key={val.id}>
              <span>{val.list}</span>
              <button className='style' onClick={() => editListItem(val)}>Edit</button>
              <button className='style' onClick={() => buttonClick(val.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
