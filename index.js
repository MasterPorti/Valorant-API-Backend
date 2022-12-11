const { v4: uuidv4 } = require("uuid");
const express = require("express");
const cors = require("cors");
const logger = require("./loggerMiddleware");
const app = express();

app.use(cors());
app.use(express.json());

let agents = {
  data: [
    {
      id: uuidv4(),
      agent: "Fade",
      type: "setinela",
    },
    {
      id: uuidv4(),
      agent: "Sage",
      type: "Controlador",
    },
    {
      id: uuidv4(),
      agent: "Yoru",
      type: "Duelista",
    },
    {
      id: uuidv4(),
      agent: "Reyna",
      type: "Duelista",
    },
  ],
};

app.use(logger);

app.get("/agents", (request, response) => {
  response.json(agents);
});

app.get("/agents/:id", (request, response, next) => {
  const id = Number(request.params.id);
  const agent = agents.data.find(agent => agent.id === id);
  agent ? response.json(agent) : next();
});

app.post("/newagent", (request, response) => {
  const data = request.body;
  const newagent = {
    id: uuidv4(),
    agent: data.agent,
    type: data.type,
  };
  agents.data.push(newagent);
  response.json(agents);
});

app.use((request, response) => {
  response.status(404);
  response.json({
    error: "Not Found",
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on `);
  console.log(`http://localhost:${PORT}`);
});
