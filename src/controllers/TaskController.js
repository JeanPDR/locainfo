function index(req, res) {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM tasks', (err, tasks) => {
      if(err) {
        res.json(err);
      }
      res.render('tasks/index', { tasks });
    });
  });
}

function create(req, res) {

  res.render('tasks/create');
}

function store(req, res) {
  const data = req.body;

  req.getConnection((err, conn) => {
    conn.query('INSERT INTO tasks SET ?', [data], (err, rows) => {
      res.redirect('/tasks');
    });
  });
}

function destroy(req, res) {
  const inc = req.body.inc;

  req.getConnection((err, conn) => {
    conn.query('DELETE FROM tasks WHERE id = ?', [inc], (err, rows) => {
      res.redirect('/tasks');
    });
  })
}

function edit(req, res) {
  const inc = req.params.inc;

  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM tasks WHERE id = ?', [inc], (err, tasks) => {
      if(err) {
        res.json(err);
      }
      res.render('tasks/edit', { tasks });
    });
  });
}

function update(req, res) {
  const inc = req.params.inc;
  const data = req.body;

  req.getConnection((err, conn) => {
    conn.query('UPDATE tasks SET ? WHERE id = ?', [data, inc], (err, rows) => {
      res.redirect('/tasks');
    });
  });
}


module.exports = {
  index: index,
  create: create,
  store: store,
  destroy: destroy,
  edit: edit,
  update: update,
}