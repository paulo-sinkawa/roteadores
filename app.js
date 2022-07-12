const express = require("express");
const app = express();
const data = require("./data");
const { v4: uuid4 } = require("uuid");

app.use(express.json());

app.post("/create", (req, res) => {
  data.push({ ...req.body, id: uuid4() });

  return res
    .status(201)
    .json({ msg: "Seu documento foi criado !", array: data });
});

app.get("/read", (req, res) => {
  return res.status(200).json(data);
});

app.get("/details/:id", (req, res) => {
  const { id } = req.params;
  const document = data.filter((currentDocument) => currentDocument.id === id);
  return res.status(200).json(document[0]);
});

app.put("/edit/:id", (req, res) => {
  const { id } = req.params;
  data.forEach((currentDocument, i) => {
    if (currentDocument.id === id) {
      data[i] = { ...req.body, id: currentDocument.id };
    }
  });
  const newDocument = data.filter(
    (currentDocument) => currentDocument.id === id
  );
  return res.status(200).json(newDocument[0]);
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  const document = data.filter((currentDocument) => currentDocument.id === id);
  const index = data.indexOf(document[0]);
  data.splice(index, 1);
  return res.status(200).json(data);
});

app.listen(4001, () => {
  console.log("Testando servidor na porta 4001.");
});
