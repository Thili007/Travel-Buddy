import jwt from "jsonwebtoken";

const Auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decodedToken;

    // res.json(decodedToken);
    next();
  } catch (error) {
    res.status(400).json({ error: "Authentication Failed" });
  }
};

const localVariables = (req, res, next) => {
  req.app.locals = {
    resetSession: false,
  };

  next();
};

export { Auth, localVariables };
