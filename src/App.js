
import { useState,useRef } from 'react';
import './App.css';

function App() {
const [list,setlist] = useState("");
const [editItem,setEditItem] = useState(null);
const [listarray,setarray] =useState([]);
const [isEditing, setIsEditing] = useState(false);
const [currentId, setCurrentId] = useState(null);
const inputRef = useRef(null);

function handleChange(e){
  setlist(e.target.value)
}

function editListItem(val){
  setEditItem(val);
  setlist(val.list);
  setIsEditing(true);
  inputRef.current.focus()
}

function handleClick(e,isEditingItem){
  e.preventDefault();
  if(isEditingItem) {
    const updatedListArray = listarray.map(item=>{
      if(item.id===editItem.id){
        return {
          id:editItem.id,
          list
        }
      }else{
        return item;
      }
    })
    setarray(updatedListArray);
  }else{
    const listnew ={
      id: listarray.length + 1,
      list:list
    }
    setarray([...listarray,listnew])
  }
  setlist("");
  setEditItem(null);
  setIsEditing(false);

}
function buttonclick(id){
  setarray(listarray.filter(item => item.id !== id));
}


  return (
    <div className="App">
 <h1>TO DO APP</h1>
 <div className='main'>
    <form>
      <input ref={inputRef} type="text" name="List" value={list} placeholder='List' onChange={handleChange} />
      {list.length > 0 && <button onClick={(e)=>handleClick(e,isEditing)} >{isEditing ? "Update" : "Add"}</button>}
    </form>
    <ul>
      {listarray.map((val)=>(
        <li key={val.id}><span>{val.list}</span>
              <button className='style' onClick={()=>editListItem(val)}>Edit</button>
              <button className='style' onClick={() => buttonclick(val.id)}>Delete</button>
              
        </li>
        
      ))}
    </ul>
 </div>
    </div>
  );
}

export default App;
