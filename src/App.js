import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";
const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};
function App() {
  const [name, setName] = useState([]);
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setisEditing] = useState(false);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || name.length === 0) {
      showAlert(true, "Please type something", "danger");
      //alert
    } else if (name && isEditing) {
      const editedItem = list.map((item) => {
        if (item.id === editId) {
          return { ...item, title: name };
        }
        return item;
      });
      setList(editedItem);
      setName("");
      setisEditing(false);

      setEditId(null);
      showAlert(true, "Task has been Upadated", "success");
    } else {
      let newItem = { id: new Date().getTime().toString(), title: name ,status:false };
      setList([...list, newItem]);
      showAlert(true, "Task has been Added", "success");
      setName("");
    }
  };
  const showAlert = (show = false, msg = "", type = "") => {
    setAlert({ show, type, msg });
  };
  const removeItem = (id) => {
    showAlert(true, `1 Task has been removed from the list`, "danger");
    const newUpdateList = list.filter((item) => item.id !== id);
    setList(newUpdateList);
  };
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setisEditing(true);
    setEditId(id);
    setName(specificItem.title);
  };
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  return (      
    <section className="section-center">
      <h4>Do you keep forgetting your things to do? Note here</h4>
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert list={list} {...alert} removeAlert={showAlert} />}
        <h3>Task List</h3>
        <div className="form-control">
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="grocery"
            type="text"
            placeholder="eg : file upload feature in profile section"
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "Edit" : "Add"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List  setList={setList} list={list} removeItem={removeItem} editItem={editItem} />
          <button
            onClick={() => {
              setList([]);
              showAlert(true, "All Tasks are cleared", "success");
            }}
            className="clear-btn"
          >
            Remove all
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
