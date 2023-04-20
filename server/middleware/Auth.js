import jwt from "jsonwebtoken";

const Auth = async (req, res, next) => {
  function isTokenExpired(token) {
    const decodedToken = jwt.decode(token, { complete: true });
    const now = Date.now() / 1000; // convert to seconds
    if (
      decodedToken &&
      decodedToken.payload.exp &&
      decodedToken.payload.exp < now
    ) {
      // Token is expired
      return true;
    }
    return false;
  }
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    // Token not found in request headers
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (isTokenExpired(token)) {
      // Token has expired
      return res.status(401).json({ message: "Season has been expired" });
    }
    req.user = decodedToken;

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
