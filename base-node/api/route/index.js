module.exports = function (app) {
  const ItemList = require("../controller/index");
  app.route("/item").get(ItemList.getItem).post(ItemList.addItem);
  app.route("/item/:id").delete(ItemList.deleteItem).put(ItemList.updateItem);
  app.route("/item/paginate").get(ItemList.paginateItem)
  app.route("/item/search").get(ItemList.searchItem)
};
