import React from "react";

import { FaEdit, FaTrash } from "react-icons/fa";
const List = ({ list, removeItem, editItem,setList }) => {

  const handleClick = (e) => {
    
       list.map((item) => {
        if(e.id === item .id )
          {
            setList ({...item, status:!item.status} );
          }
        return item;
      })

  }
  return (
    <div className="grocery-list">
      {list.map((item) => {
        const { id, title } = item;
        return (
          <article key={id} className="grocery-item">
            {item.status === true ?  <p style={{color:'green'}} className="title">{title}</p> : <p className="title">{title}</p>}
            <div className="btn-container">
              <label class="switch">
              <input type="checkbox" onClick={handleClick} />
             <span class="slider round"></span>
              </label>
              <button
                onClick={() => editItem(id)}
                type="button"
                className="edit-btn"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => removeItem(id)}
                type="button"
                className="delete-btn"
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
