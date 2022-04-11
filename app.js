const Koa = require("koa");
const views = require("koa-views");
const _ = require("koa-route");
const db = require("./database");
const bodyParser = require("koa-bodyparser");

const app = new Koa();
app.use(bodyParser());

// SETTING UP VIEW DIR
app.use(
  views(__dirname + "/views", {
    map: {
      html: "nunjucks"
    }
  })
);


app.use(
  _.get("/", async function(params) {    
    const todos = await db.getAll();
    await params.render("list", {
      list: todos
    });
  })
);

app.use(
  _.get("/add", async function(params) {
    console.log('Agregar / Editar');
    await params.render("form", { todo: {} });
  })
);

app.use(
  _.get("/edit", async function(params) {
    console.log(`Editando Registro con el Id: ${params.query.id}`);
    const id = params.query.id;
    if (!id) {
      throw new Error("Id Inválido");
    }
    const todo = await db.getTodo(id);
    if (!todo) {
      params.body = "Registro no encontrado!";
    } else {
      await params.render("form", {
        todo
      });
    }
  })
);

app.use(
  _.post("/edit", async function(params) {
    try {
      console.log(`Actualizando Registro`);
      const todo = params.request.body;
      await db.update(todo);
      params.redirect("/");
    } catch (error) {
      params.body = error.stack;
    }
  })
);

app.use(
  _.post("/remove", async function(params) {
    const id = params.request.body.id;
    try {
      console.log(`Eliminando Registro con el Id: ${id}`);
      await db.remove(id);
      params.body = {
        status: 0,
        error_message: ""
      };
    } catch (error) {
      params.body = error.stack;
    }
  })
);

app.listen(3000);
console.log("Servidor Iniciado >> http://localhost:3000");
