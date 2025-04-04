import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!req.body.username)
      return res.status(400).json({ error: "empty req body" });

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res
        .json({ error: "User with this email already exists." })
        .status(400);

    const salt = bcrypt.genSaltSync(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const profilepic = "https://avatar.iran.liara.run/public";

    const createdUser = await User.create({
      name: username,
      email: email,
      profilepic: profilepic,
      password: hashedPass,
    });
    const token = jwt.sign({ id: createdUser._id }, process.env.JWT_SECRET, {
      expiresIn: "4h",
    });
    const user = {
      _id: createdUser._id,
      username: createdUser.name,
      email: createdUser.email,
      profilepic: createdUser.profilepic,
    };
    res.status(201).json({ token, user });
  } catch (error) {
    console.log("Signup error: ", error);
    res.status(500).json(error);
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (!existingUser)
      return res.json({ error: "Incorrect username or password" }).status(400);

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch)
      return res.json({ error: "Incorrect username or password" }).status(400);

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "4h",
    });
    const user = {
      _id: existingUser._id,
      username: existingUser.name,
      email: existingUser.email,
      profilepic: existingUser.profilepic,
    };

    res.status(201).json({ token, user });
  } catch (error) {
    console.log("Signin error: ", error);
    res.status(500).json(err);
  }
};

const googleSignin = async (req, res) => {
  const user = req.user;
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "4h",
  });

  //   res.redirect(`${process.env.FRONTEND_URL}/auth/success?token=${token}`);
  res.send(`
    <html>
      <body>
               
        <script>
          try {
            
            // Post message to parent window with token
            window.opener.postMessage(
              { token: "${token}", type: "GOOGLE_AUTH_SUCCESS",userData:${JSON.stringify(
    user
  )} },
              "${process.env.FRONTEND_URL}"
            );
            
            
            setTimeout(() => {
              try {
                window.close();
                document.getElementById('status').textContent = 'Window should be closing...';
              } catch (e) {
                document.getElementById('status').textContent = 'Failed to close window automatically: ' + e.message;
              }
            }, 200);
          } catch (e) {
            document.getElementById('status').textContent = 'Error: ' + e.message;
          }
        </script>
        <p>Authentication successful. This window will close automatically.</p>
      </body>
      </html>
  `);
};

export { signup, signin, googleSignin };
