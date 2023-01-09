const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

let users = [
  {
    name: 'Yusuf',
    email: 'yusuf@mail.com',
    password: '123456'
  },
  {
    name: 'Joe',
    email: 'joe@mail.com',
    password: '123123'
  }
]

// Register
app.post('/api/users/register', (req, res) => {
  const name = req.body.name
  const email = req.body.email.toLowerCase()
  const password = req.body.password

  const user = users.find(user => user.email === email)

  // Return Error if Data is incorrect
  if (user != undefined) {
    return res.status(400).json({
      error: true,
      message: "Email Already Exists!"
    })
  } else {
    users.push({
      name,
      email,
      password
    });
    res.send('Register Completed!')
  }
})

// Login
app.post('/api/users/login', (req, res) => {
  const email = req.body.email.toLowerCase()
  const password = req.body.password
  const user = users.find(user => user.email === email)

  // Return Error if Email/Password is not exist
  if (!email || !password) {
    return res.status(400).json({
      error: true,
      message: "Missing Email or Password"
    });
  } else if (user == undefined) {
    return res.status(404).json({
      error: true,
      message: "User Not Found!"
    });
  } else {
    if (password !== user.password) {
      return res.status(400).json({
        error: true,
        message: "Password is incorrect!"
      });
    } else {
      return res.json(user);
    }
  }
})

// Get Users
app.get('/api/users', (req, res) => {
  res.json(users)
})

// Get Custom User
app.get('/api/users/:email', (req, res) => {
  const email = req.params.email;
  const user = users.find(user => user.email === email);
  if (user) {
    res.json(user)
  } else {
    res.send('User not found')
  }
  res.json(users)
})

// Run Port
app.listen('7000', () => {
  console.log('Server Running On Port 7000');
})