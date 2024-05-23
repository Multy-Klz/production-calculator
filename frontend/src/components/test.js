import unityData from "./../assets/units.json" assert { type: "json" };

let obj = unityData;

function percorrerJSON(obj) {
  for (let key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      if (obj[key].hasOwnProperty("units")) {
        console.log("Units encontradas:", obj[key], obj[key].units);
      }
      percorrerJSON(obj[key]); // Chamada recursiva para explorar objetos aninhados
    }
  }
}

obj.forEach((obj) => {
  percorrerJSON(obj);
});
