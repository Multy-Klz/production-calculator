const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiController");

// busca de produto pelo id
router.get("/product/:id", apiController.getProduct);
// busca de todos os produtos
router.get("/showproducts",apiController.showProducts);
// adição de produto
router.post("/addproduct", apiController.addProduct);
// deletar produto
router.delete("/deleteproduct/:id", apiController.deleteProduct);
// atualizar produto
router.put("/updateproduct/:id", apiController.updateProduct);

// busca de receita pelo id
router.get("/recipe/:id", apiController.getRecipe);
// busca de receita pelo name
router.get("/recipe/search/:name", apiController.getNameRecipe);
// busca de todas as receitas
router.get("/showrecipes",apiController.showRecipes);
// adição de receita
router.post("/addrecipe", apiController.addRecipe);
// deletar receita
router.delete("/deleterecipe/:id", apiController.deleteRecipe);
// atualizar receita
router.put("/updaterecipe/:id", apiController.updateRecipe);

// busca de item pelo id
router.get("/item/:id", apiController.getItem);
// busca de item pelo name
router.get("/item/search/:name", apiController.getItemByName);
// busca de todos os itens
router.get("/showitems",apiController.showItems);
// adição de item
router.post("/additem", apiController.addItem);
// deletar item
router.delete("/deleteitem/:id", apiController.deleteItem);
// atualizar item
router.put("/updateitem/:id", apiController.updateItem);

module.exports = router;