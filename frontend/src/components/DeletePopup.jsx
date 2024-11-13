import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function DeletePopup({ setDelete, objectToDelete, param, ...props }) {
  const handleDelete = (objectToDelete) => {
    fetch(`http://localhost:3000/api/${param}/${objectToDelete._id}`, {
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
        console.error("Erro ao excluir o item:", error);
      });
    setDelete(false);
    console.log(props.closeWindow);
  };

  return (
    <>
      <div className="text-black">
        {setDelete && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#2b2929] bg-opacity-75 backdrop-blur">
            <div className="bg-white p-5 rounded shadow-lg w-1/2 ">
              <h2>Are you sure to delete ?</h2>

              <div className="flex gap-1 mt-2">
                <button
                  className="bg-green-500 text-white"
                  onClick={() => handleDelete(objectToDelete)}
                >
                  Yes, delete!
                </button>
                <button
                  className="bg-red-500 text-white"
                  onClick={() => setDelete(false)}
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
