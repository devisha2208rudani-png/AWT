import express from 'express'
import cors from 'cors'

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const USERS = [
  {
    email: "student@test.com",
    password: "1234",
    name: "Rahul",
    role: "student",
    college: "PDPU",
  },
  {
    email: "faculty@test.com",
    password: "admin",
    name: "Dr Mehta",
    role: "faculty",
    college: "PDPU",
  },
];

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const user = USERS.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  const safeUser = {
    name: user.name,
    role: user.role,
    college: user.college,
    email: user.email,
  };

  res.json({
    success: true,
    user: safeUser,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});