const express = require("express");
const app = express();
const port = 3000;

const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

const restoList = require("./restaurant.json");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", { resto: restoList.results });
});
app.get("/restaurants/:id", (req, res) => {
  const id = req.params.id;
  const restaurant = restoList.results.find(
    (item) => item.id.toString() === id
  );
  res.render("show", { resto: restaurant });
});

app.get("/search", (req, res) => {
  const keyword = req.query.keyword;
  const searchedResto = restoList.results.filter((item) =>
    item.name.toLowerCase().includes(keyword.toLowerCase())
  );
  res.render("index", { resto: searchedResto, keyword });
});

app.listen(port, () => {
  console.log(`The page is running on http://localhost/${port}`);
});
