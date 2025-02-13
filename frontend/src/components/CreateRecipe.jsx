import React, { useEffect, useState } from "react";
import unityData from "./../assets/units.json";
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

  const [convertionData, setConvertionData] = useState([]);

  const [unitIngredients, setUnitIngredients] = useState([]); // [ {id: "id", quantity: 0, unity: "kg"}
  const [ingredients, setIngredients] = useState([]); // [ {id: "id", quantity: 0, unity: "kg"}
  const [ingredient, setIngredient] = useState(null);
  const [ingredientUnity, setIngredientUnity] = useState(null);
  const [ingredientQuantity, setIngredientQuantity] = useState(0);

  const [ingredientsList, setIngredientList] = useState(null);
  const [newIngredient, setNewIngredient] = useState(false);

  function getConvertionData() {
    let convertions = [];
    units.forEach((unit) =>
      Object.keys(unit).forEach((key) => {
        unit[key].convertion ? convertions.push(unit[key].convertion) : null;
      })
    );
    setConvertionData(convertions);
  }

  function getItemList() {
    fetch(`http://localhost:3000/api/showItems`)
      .then((response) => response.json())
      .then((data) => {
        setIngredientList(data);
      });
  }

  function handleIngredientChange(ingredientUnitySelected) {
    console.log(ingredientUnitySelected);
    
    let matchingUnits = [];

  units.forEach((unitType) => {
    Object.keys(unitType).forEach((key) => {
      if (unitType[key].units.some((unit) => unit.name === ingredientUnitySelected)) {
        const unityDataOnSelect = unitType[key].units.map((unit) => ({
          name: unit.name,
          symbol: unit.symbol,
        }));
        matchingUnits.push(...unityDataOnSelect);
      }
    });
  });

    console.log('Matching units:', matchingUnits);

    setUnitIngredients(matchingUnits);
  }

  const handleInputChange = (event) => {
    setUnity("");
    const value = event.target.value;
    setInputValue(value);
    if (value) {
      setFilteredUnits(handleIngredientChange());
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

  function saveRecipe(event) {
    event.preventDefault();
    console.log(name, quantity, cost, unity);
    if (name && quantity && cost && unity && ingredients.length > 0) {
      fetch("http://localhost:3000/api/addrecipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          quantity: quantity,
          cost: cost,
          unity: unity,
          items: ingredients,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success Creating:", data.name);
          props.setState(true);
          props.setModal();
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Cannot connect to the server. Try again later");
        });
    } else {
      setIsEmpty(true);
      setShowErrorMessage(true);
    }
  }

  function addIngredient(event) {
    event.preventDefault();
    setNewIngredient(!newIngredient);

    if (ingredient && ingredientQuantity && ingredientUnity) {
      console.log(ingredient);
      
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

  function calculateCost() {
    console.log("convertionData", units);

    let totalCost = 0;
    ingredients.forEach((ingredient) => {
      let ingredientHasDiferentUnity = ingredientsList.some(ingredientItem => ingredientItem._id === ingredient._id && ingredientItem.unity !== ingredient.unity);
      
      if (ingredientHasDiferentUnity) {
        let itemUnity = ingredientsList.find((item) => item._id === ingredient._id).unity;  
        let ingredientUnity = ingredients.find((item) => item._id === ingredient._id).unity;  
        

        let itemSymbol = null;
        let ingredientSymbol = null;
        let convertionData = null;
      

        units.forEach((unitType) => {
          Object.keys(unitType).forEach((key) => {
            const itemUnit = unitType[key].units.find((unit) => unit.name === itemUnity);
            const ingredientUnit = unitType[key].units.find((unit) => unit.name === ingredientUnity);
            
            if (itemUnit) {
              itemSymbol = itemUnit.symbol;
              convertionData = unitType[key].convertion;
            }
  
            if (ingredientUnit) {
              ingredientSymbol = ingredientUnit.symbol;
            }
          });
        });
  
        if (itemSymbol && ingredientSymbol && convertionData) {
          const itemFactor = convertionData[itemSymbol];
          const ingredientFactor = convertionData[ingredientSymbol];
  
            console.log('itemFactor:', itemFactor, 'ingredientFactor:', ingredientFactor);


          if (itemFactor && ingredientFactor) {
            const conversionFactor =  ingredientFactor / itemFactor;
            console.log('itemSymbol:', itemSymbol, 'ingredientSymbol:', ingredientSymbol, 'conversionFactor:', conversionFactor);
  
            let quantidade = ingredientsList.find((item) => item._id === ingredient._id).quantity * conversionFactor;
            console.log('quantidade:', quantidade);
            

            totalCost += ((ingredientsList.find((item) => item._id === ingredient._id).cost / ingredientsList.find((item) => item._id === ingredient._id).quantity) / conversionFactor) * ingredient.quantity;
            
            
          console.log('totalCost:', totalCost);
          
          }
        }
      } else {
        // If the units are the same, just add the cost
        totalCost += ingredient.quantity * (ingredientsList.find((item) => item._id === ingredient._id).cost / ingredientsList.find((item) => item._id === ingredient._id).quantity);
      }
      
      
      console.log(
        "Item:",
        ingredientsList.find((item) => item._id === ingredient._id),
        "Ingrediente",
        ingredient,
        'ingredientHasDiferentUnity:', ingredientHasDiferentUnity,
        'totalCost:', totalCost,
      );

      setCost(totalCost);
    });
    
  }

  useEffect(() => {
    if (!ingredientsList) {
      getItemList();
      getConvertionData();
      setUnitIngredients(handleIngredientChange());
    }
    console.log(ingredient, unitIngredients, ingredients, ingredientsList);
    calculateCost();
  }, [ingredients, ingredientsList, ingredient]);

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
                  onChange={(e) => handleValueChange(e, setQuantity)}
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
                    {!unity && inputValue !== ""
                      ? units.map((unitType, index) => (
                        Object.keys(unitType).map((key) => (
                          unitType[key].units.map((unit) => (
                            <div
                              key={unit.name}
                              className="p-2 hover:bg-gray-200 cursor-pointer"
                              onClick={() => {
                                setInputValue(unit.name);
                                setUnity(unit.name);
                              }}
                            >
                              {unit.name}
                            </div>
                          ))
                        ))
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
                        value={ingredient?.name}
                        onChange={({ target }) => {
                          const selectedOption = target.options[target.selectedIndex];
                          const selectedUnity = selectedOption.getAttribute('data-unity');

                          handleIngredientChange(selectedUnity);

                          setIngredient({
                            ...ingredient,
                            name: target.value,
                            _id: ingredientsList.find(
                              (item) => item.name === target.value
                            )._id,
                            unity: selectedUnity,
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
                            <option
                              key={index}
                              value={ingredient.name}
                              data-unity={ingredient.unity}
                            >
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
                        value={ingredientUnity ? ingredientUnity : ""}
                        id="unity"
                        className="w-full"
                        onChange={({ target }) => {
                    
                          setIngredientUnity(target.value);
                        }}
                        disabled={!ingredient}
                      >
                        <option value="" disabled hidden>
                          Select an unit
                        </option>
                        //TODO: display the units that are compatible with the
                        ingredient
                        {unitIngredients &&
                          unitIngredients
                            .map((unit, index) => (
                              <option key={index} value={unit.name}>
                                {unit.name}
                              </option>
                        ))}
                        
                      </select>
                    </>
                  )}
                  <button
                    className={`p-1 mx-2 bg-green-500 text-white text-nowrap mr-5 ${
                      isEmpty && !quantity ? "border border-red-500" : ""
                    }`}
                    onClick={(event) => addIngredient(event)}
                  >
                    {`${!newIngredient ? "Add new" : "Save"} ingredient`}
                  </button>
                </div>
                {ingredients.length > 0
                  ? ingredients.map((ingredient, index) => (
                      <h2 key={index + "i"} className="pt-1">
                        {"=> " +
                          ingredient.name +
                          " - " +
                          ingredient.quantity +
                          " " +
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
            
                  //disabled={true}
                />
              </div>
              <div className="text-xs">
                Custo calculado dinamicamente de acordo com os ingredientes e
                suas quantidades
              </div>
              <div className="flex gap-1 mt-2">
                <button
                  className="bg-green-500 text-white"
                  onClick={saveRecipe}
                >
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
