import React, { useState } from "react";

function DeletePopup({setDeleteItem, item} ) {


    const handleDelete = (item) => {
        fetch(`http://localhost:3000/api/deleteitem/${item._id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Success Deleting:", data.name);
            })
            .catch((error) => {
              console.error("Error:", error);
              console.error('Erro ao excluir o item:', error);
            });
        setDeleteItem(false);
    };


    return (
        <>
            <div className="text-black">
      {setDeleteItem && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#2b2929] bg-opacity-75 backdrop-blur">
          <div className="bg-white p-5 rounded shadow-lg w-1/2 ">
            <h2>Are you sure to delete item ?</h2>
            
              <div className="flex gap-1 mt-2">
                <button className="bg-green-500 text-white" onClick={()=> handleDelete(item)}>
                  Yes, delete!
                </button>
                <button
                  className="bg-red-500 text-white"
                  onClick={() => setDeleteItem(false)}
                >
                  Cancel
                </button>
              </div>
             
         
          </div>
        </div>
      )}
    </div>
        </>
    );
}

export default DeletePopup;