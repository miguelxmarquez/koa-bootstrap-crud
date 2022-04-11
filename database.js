const mysql = require("promise-mysql");

async function query(sql) {

  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "koa_development"
  });
  
  try {
    const result = connection.query(sql);
    connection.end();
    return result;
  } catch (error) {
    throw error;
  }

}

async function getAll() {
  return await query("SELECT * FROM todos ORDER BY id DESC");
}

async function getTodo(id) {
  const result = await query(`SELECT * FROM todos WHERE todos.id='${id}'`);
  if (result[0]) {
    return result[0];
  }else{
    return null;
  }
}

async function remove(id) {
  return await query(`DELETE FROM todos WHERE todos.id='${id}'`);
}

async function update(todo) {
  
  todo.done = todo.done == undefined ? 0 : todo.done;

  if (todo.id) {
    
    Object.assign(getTodo(todo.id), todo);
    return await query(`
      UPDATE todos
      SET content='${todo.content}',done='${todo.done}'
      WHERE todos.id=${todo.id}
    `);
    
  } else {

    todo.date = new Date().toJSON().slice(0, 10);
    return await query(`
      INSERT INTO todos (content, date, done) 
      VALUES ('${todo.content}','${todo.date}','${todo.done}')
    `);

  }
}

module.exports = {
  getTodo,
  getAll,
  remove,
  update
};
