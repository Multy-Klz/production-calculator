import React, { useState } from "react";
import unityData from "./../assets/units.json";
import Message from "./Message.jsx";

function CreateItem(props) {
  const [cost, setCost] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [name, setName] = useState(null);

  const [inputValue, setInputValue] = useState("");
  const [unitiesToDisplay, setUnitiesToDisplay] = useState([]);

  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const [isEmpty, setIsEmpty] = useState(false);

  const [unity, setUnity] = useState("");

  const units = unityData;

  const handleInputChange = (event) => {
    setUnity("");
    const value = event.target.value;
    setInputValue(value);
    if (value) {
      //TODO: implementar lógica para testar novo arquivo de unidades
      let allUnits = [];

      units.forEach((unitType) => {
        Object.keys(unitType).forEach((key) => {
          console.log(key, unitType[key].units, unitType[key].convertion);

          const unityNames = unitType[key].units.map((unit) => unit.name);
          allUnits.push(...unityNames);
        });
      });

      const FilteredUnits = allUnits.filter((unit) =>
        unit.toLowerCase().includes(value.toLowerCase())
      );

      setUnitiesToDisplay(FilteredUnits);
    } else {
      setUnitiesToDisplay([]);
    }
  };

  const handleNameChange = (event) => {
    const name = event.target.value.trimStart();
    name == "" ? setName(null) : setName(name);
    console.log(name);
  };

  const handleValueChange = (event) => {
    const value = event.target.value;
    console.log(value);
    if (event.target.id === "cost") {
      if (value < 0 && event.target.id === "cost") {
        setCost(0);
      } else {
        setCost(value);
      }
    }
    if (event.target.id === "quantity") {
      if (value < 0 && event.target.id === "quantity") {
        setQuantity(0);
      } else {
        setQuantity(value);
      }
    }
  };

  function saveItem(event) {
    event.preventDefault();
    console.log(name, quantity, cost, unity);
    if (name && quantity && cost && unity) {
      fetch("http://localhost:3000/api/additem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          quantity: quantity,
          cost: cost,
          unity: unity,
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

  return (
    <div className="text-black">
      {props && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#2b2929] bg-opacity-75 backdrop-blur">
          <div className="bg-white p-5 rounded shadow-lg w-1/2 ">
            <h2 className="text-2xl py-2">Create a new item</h2>
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
              <div className="flex items-center">
                <label htmlFor="quantity">Quantity</label>
                <input
                  className={`mx-5 block w-full bg-slate-300 rounded-md shadow-sm p-2 m-1 ${
                    isEmpty && !quantity ? "border border-red-500" : ""
                  }`}
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={handleValueChange}
                />
              </div>
              <div className="flex items-center  relative">
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
                      ? unitiesToDisplay.map((unit) => (
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

export default CreateItem;
