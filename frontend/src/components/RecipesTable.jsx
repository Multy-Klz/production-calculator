import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

import DeletePopup from "./DeletePopup";
import ShowRecipe from "./ShowRecipe";

function RecipesTable({ recipes }) {
  const [edit, setEdit] = useState(false);

  const [deleteRecipe, setDeleteRecipe] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [recipe, setRecipe] = useState(null);

  function viewProduct(recipe) {
    setIsOpen(!isOpen);
    setRecipe(recipe);
  }

  const handleDelete = async (item) => {
    setDeleteRecipe(true);
  };

  return (
    <div className="recipes-container flex justify-center p-5">
      <div className="recipe-table  bg-slate-50 text-black p-5 rounded-md">
        {!recipe || !isOpen ? (
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
              {recipes &&
                recipes.map((recipe, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">
                      {recipe.name ? recipe.name : "n/a"}
                    </td>
                    <td className="border px-4 py-2">
                      {recipe.quantity} {recipe.unity}
                    </td>

                    <td className="border px-4 py-2">R$ {recipe.cost}</td>
                    <td className="border px-4 py-2">
                      <div className="flex flex-row gap-1">
                        <button
                          className="bg-green-500 text-white  px-6 py-1"
                          onClick={() => viewProduct(recipe)}
                        >
                          <FontAwesomeIcon icon={faEye} className="px-2" />
                        </button>
                        <button className="bg-blue-500 text-white px-2 py-1">
                          <FontAwesomeIcon icon={faPencil} className="  px-2" />
                        </button>
                        <button className="bg-red-500 text-white px-2 py-1">
                          <FontAwesomeIcon
                            icon={faTrash}
                            onClick={() => handleDelete(recipe)}
                            className="  px-2"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <ShowRecipe
            recipe={recipe}
            setIsOpen={setIsOpen}
            setDelete={setDeleteRecipe}
            objectToDelete={recipe}
            param={"deleterecipe"}
          />
        )}
        {deleteRecipe ? (
          <DeletePopup
            deleteRecipe={deleteRecipe}
            setDelete={setDeleteRecipe}
            objectToDelete={recipe}
            param={"deleterecipe"}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default RecipesTable;
