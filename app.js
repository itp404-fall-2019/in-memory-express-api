const express = require('express');
const app = express();
const cors = require('cors')

app.use(express.json());
app.use(cors());

const db = {
  posts: [
    {
      id: 1,
      title: 'Post 1',
      body: 'something here...'
    }
  ]
};

app.get('/api/posts', (request, response) => {
  response.json(db.posts);
});

app.post('/api/posts', (request, response) => {
  // add some validation here
  const post = request.body;
  post.id = db.posts.length;
  db.posts.push(post);
  response.json(post);
});

app.get('/api/posts/:id', (request, response) => {
  const post = db.posts.find((post) => {
    return post.id === Number(request.params.id);
  });

  if (post) {
    response.json(post);
  } else {
    response.status(404).send();
  }
});

app.delete('/api/posts/:id', (request, response) => {
  const post = db.posts.find((post) => {
    return post.id === Number(request.params.id);
  });

  if (post) {
    db.posts = db.posts.filter((post) => {
      return post.id !== Number(request.params.id);
    });
    response.status(204).send();
  } else {
    response.status(404).send();
  }
});

app.put('/api/posts/:id', (request, response) => {
  const post = db.posts.find((post) => {
    return post.id === Number(request.params.id);
  });

  if (post) {
    Object.assign(post, request.body)
    response.json(post);
  } else {
    response.status(404).send();
  }
});

app.listen(8000);