import React from "react";
import DeletePopup from "./DeletePopup";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';

import EditItem from "./EditItem";
function ItemsTable({ props }) {
  const [edit, setEdit] = useState(false);
  const [item, setItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(false);

  function changeModal() { 
    setEdit(!edit);
  }

  const handleDelete = async (item) => {
    setDeleteItem(true);
    setItem(item)
  };

  const handleEdit = async (item) => {
    setEdit(true);
    setItem(item)
    console.log('Editando item:', item.name);

};


  return (
    <div className="items-container flex justify-center p-5">
      <div className="item-table  bg-slate-50 text-black p-5 rounded-md">
        <table className="table-auto ">
          <thead>
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Quantity</th>
              <th className="border px-4 py-2">Cost</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {props.map((item, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">
                  {item.quantity} {item.unity}
                </td>
                <td className="border px-4 py-2">R$ {item.cost}</td>
                <td className="border px-4 py-2">
                  <div className="flex flex-row gap-1">

                  <button  className="bg-blue-500 text-white px-2 py-1" onClick={() => handleEdit(item)}><FontAwesomeIcon icon={faPencil} className="  px-2"/></button>
                  <button  className="bg-red-500 text-white px-2 py-1" onClick={() => handleDelete(item)}><FontAwesomeIcon icon={faTrash} className="  px-2"/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {edit ? <EditItem item={item} setModal={changeModal} /> : ''}
      {deleteItem ? < DeletePopup setDeleteItem={setDeleteItem} item={item} /> : ''}
    </div>
  );
}

export default ItemsTable;
