import React, { useEffect, useState } from "react";
import unityData from "./../assets/unityData.json";
import Message from "./Message.jsx";
import { faYinYang } from "@fortawesome/free-solid-svg-icons";

function CreateRecipe(props) {
  const [name, setName] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [cost, setCost] = useState(0);

  const [inputValue, setInputValue] = useState("");
  const [filteredUnits, setFilteredUnits] = useState([]);

  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const [isEmpty, setIsEmpty] = useState(false);

  const [unity, setUnity] = useState("");
  const units = unityData;

  const [unitIngredients, setUnitIngredients] = useState(unityData); // [ {id: "id", quantity: 0, unity: "kg"}
  const [ingredients, setIngredients] = useState([]); // [ {id: "id", quantity: 0, unity: "kg"}
  const [ingredient, setIngredient] = useState({
    _id: "",
    name: "",
  });
  const [ingredientUnity, setIngredientUnity] = useState("");
  const [ingredientQuantity, setIngredientQuantity] = useState(0);

  const [ingredientsList, setIngredientList] = useState(null);
  const [newIngredient, setNewIngredient] = useState(false);

  function getItemList() {
    fetch(`http://localhost:3000/api/showItems`)
      .then((response) => response.json())
      .then((data) => {
        setIngredientList(data);
      });
  }

  const handleInputChange = (event) => {
    setUnity("");
    const value = event.target.value;
    setInputValue(value);
    if (value) {
      const newFilteredUnits = units.filter((unit) =>
        unit.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredUnits(newFilteredUnits);
    } else {
      setFilteredUnits([]);
    }
  };

  const cleanNewIngredientStates = () => {
    setIngredientQuantity(0);
    setIngredient({
      _id: "",
      name: "",
      cost: 0,
    });
    setIngredientUnity("");
  };

  const handleNameChange = (event) => {
    const name = event.target.value.trimStart();
    name == "" ? setName(null) : setName(name);
    console.log(name);
  };

  const handleValueChange = (event, setValue) => {
    const value = event.target.value;
    //console.log(event.target);

    if (value < 0 && event.target.id === "quantity") {
      setValue(0);
    } else {
      setValue(value);
    }
  };

  function saveItem(event) {
    event.preventDefault();
    console.log(name, quantity, cost, unity);
    if (name && quantity && cost && unity && ingredients.length > 0) {
    } else {
      setIsEmpty(true);
      setShowErrorMessage(true);
    }
  }

  function addIngredient(event) {
    event.preventDefault();
    setNewIngredient(!newIngredient);

    console.log(ingredient, ingredientQuantity, ingredientUnity);
    if (ingredient && ingredientQuantity && ingredientUnity) {
      //TODO: handle the quantity and unity of the ingredient and save the cost responsively
      let newIngredient = {
        name: ingredient.name,
        quantity: ingredientQuantity,
        unity: ingredientUnity,
        _id: ingredient._id,
      };
      setIngredients([...ingredients, newIngredient]);
      console.log("ingredients", ingredients);
      cleanNewIngredientStates();
    }
  }

  useEffect(
    () => {
      if (!ingredientsList) {
        getItemList();
      }
      console.log(ingredients, ingredientsList);
    },
    { ingredients, ingredientsList }
  );

  return (
    <div className="text-black">
      {props && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#2b2929] bg-opacity-75 backdrop-blur">
          <div className="bg-white p-5 rounded shadow-lg w-1/2 ">
            <h2 className="text-2xl py-2">Create a new Recipe</h2>
            <form>
              <div className="flex justify-center items-center">
                <label htmlFor="name">Name</label>
                <input
                  className={`mx-5 block w-full bg-slate-300 rounded-md shadow-sm p-2 m-1 ${
                    isEmpty && !name ? "border border-red-500" : ""
                  }`}
                  type="text"
                  id="name"
                  placeholder="insert name"
                  onChange={handleNameChange}
                />
              </div>
              <div className="flex items-center flex-rol">
                <label htmlFor="quantity">Quantity</label>
                <input
                  className={`mx-5 block w-full bg-slate-300 rounded-md shadow-sm p-2 m-1 ${
                    isEmpty && !quantity ? "border border-red-500" : ""
                  }`}
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => handleValueChange(e)}
                />
                <label htmlFor="cost">Unity</label>

                <div className="flex mx-5 items-center w-full m-1 relative">
                  <input
                    className={`block w-full bg-slate-300 rounded-md shadow-sm p-2 ${
                      isEmpty && !unity ? "border border-red-500" : ""
                    }`}
                    type="text"
                    min="0"
                    id="unity"
                    placeholder="insert unity"
                    value={inputValue}
                    onChange={handleInputChange}
                  />
                  <div className="absolute mr-5 w-full top-0   mt-10 bg-white rounded-md shadow-lg ">
                    {!unity
                      ? filteredUnits.map((unit) => (
                          <div
                            key={unit}
                            className="p-2 hover:bg-gray-200 cursor-pointer"
                            onClick={() => {
                              setInputValue(unit), setUnity(unit);
                            }}
                          >
                            {unit}
                          </div>
                        ))
                      : ""}
                  </div>
                </div>
              </div>
              <div className="flex flex-col py-1">
                <div className="flex flex-rol">
                  <h2 className="pt-1">ingredients</h2>
                  {newIngredient && (
                    <>
                      <select
                        value={ingredient.name}
                        onChange={({ target }) => {
                          setIngredient({
                            ...ingredient,
                            name: target.value,
                            _id: ingredientsList.find(
                              (item) => item.name === target.value
                            )._id,
                          });
                        }}
                        className="w-full"
                        id="ingredients"
                      >
                        <option value="" disabled hidden>
                          Select an ingredient
                        </option>
                        {ingredientsList &&
                          ingredientsList.map((ingredient, index) => (
                            <option key={index} value={ingredient.name}>
                              {ingredient.name}
                            </option>
                          ))}
                      </select>
                      <input
                        className={`mx-5 block w-full bg-slate-300 rounded-md shadow-sm p-2 m-1 ${
                          isEmpty && !quantity ? "border border-red-500" : ""
                        }`}
                        type="number"
                        id="quantity"
                        value={ingredientQuantity}
                        onChange={(e) =>
                          handleValueChange(e, setIngredientQuantity)
                        }
                      />
                      <select
                        value={ingredientUnity}
                        id="unity"
                        className="w-full"
                        onChange={({ target }) => {
                          setIngredientUnity(target.value);
                        }}
                      >
                        <option value="" disabled hidden>
                          Select an unit
                        </option>
                        {unitIngredients &&
                          unitIngredients.map((unit) => (
                            <option key={unit} value={unit}>
                              {unit}
                            </option>
                          ))}
                      </select>
                    </>
                  )}
                  <button
                    className="p-1 mx-2 bg-green-500 text-white text-nowrap mr-5"
                    onClick={(event) => addIngredient(event)}
                  >
                    {`${!newIngredient ? "Add new" : "Save"} ingredient`}
                  </button>
                </div>
                {ingredients.length > 0
                  ? ingredients.map((ingredient, index) => (
                      <h2 key={index + "i"} className="pt-1">
                        {" - " +
                          ingredient.name +
                          " " +
                          ingredient.quantity +
                          ingredient.unity}
                      </h2>
                    ))
                  : ""}
              </div>
              <div className="flex items-center">
                <label htmlFor="cost">Cost</label>
                <input
                  className={`mx-5 block w-full bg-slate-300 rounded-md shadow-sm p-2 m-1 ${
                    isEmpty && !cost ? "border border-red-500" : ""
                  }`}
                  type="number"
                  min="0"
                  id="cost"
                  value={cost}
                  onChange={handleValueChange}
                />
              </div>
              <div className="flex gap-1 mt-2">
                <button className="bg-green-500 text-white" onClick={saveItem}>
                  Create
                </button>
                <button
                  className="bg-red-500 text-white"
                  onClick={() => props.setModal()}
                >
                  Close
                </button>
              </div>
              {showErrorMessage ? (
                <Message
                  style={"bg-red-500"}
                  message={`Insert all the data!`}
                  setState={setShowErrorMessage}
                />
              ) : (
                ""
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateRecipe;
