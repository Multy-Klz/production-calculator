import React, { useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import DeletePopup from "./DeletePopup";

function ShowRecipe({
  recipe,
  setIsOpen,
  deleteRecipe,
  setDelete,
  objectToDelete,
  param,
}) {
  const [items, setItems] = useState([]);

  function closeWindow() {
    setIsOpen(false);
  }

  const handleDelete = async (recipe) => {
    setDelete(true);
  };

  useEffect(() => {
    const fetchItems = async () => {
      const fetchedItems = await Promise.all(
        recipe.items.map((item) =>
          fetch(`http://localhost:3000/api/item/${item._id}`)
            .then((response) => response.json())
            .then((data) => data[0].name)
        )
      );
      setItems(fetchedItems);
    };

    fetchItems();
  }, [recipe.items]);

  return (
    <div className="border rounded-md px-4 py-2">
      <div className="flex justify-center  ">
        <button className="bg-blue-500 text-white m-2" onClick={closeWindow}>
          Voltar
        </button>
        <button className="bg-blue-500 text-white m-2">
          <FontAwesomeIcon icon={faPencil} className="  px-2" />
        </button>
        <button
          className="bg-red-500 text-white m-2"
          onClick={() => handleDelete(recipe)}
        >
          <FontAwesomeIcon icon={faTrash} className="  px-2" />
        </button>
      </div>
      <div className="border-t-black border-t-2 border-opacity-50">
        <h2 className="m-2 text-2xl font-bold flex justify-center">
          {recipe.name} - {recipe.quantity} {recipe.unity}
        </h2>
        <div>
          <p className="border-t-black border-t-2  border-opacity-30 text-sm font-bold">
            Ingredients
          </p>
          {recipe.items.map((item, index) => (
            <p key={index}>
              {items[index] + " - " + item.quantity + " " + item.unity}
            </p>
          ))}
        </div>
        <p className="border-t-black border-t-2  border-opacity-30 font-bold mt-2">
          Cost: R$ {recipe.cost}
        </p>
      </div>

      {deleteRecipe ? (
        <DeletePopup
          setDelete={setDeleteRecipe}
          objectToDelete={recipe}
          param={"deleterecipe"}
          closeWindow={closeWindow}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default ShowRecipe;
