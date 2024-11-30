import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

const secureRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: "No token, authorization denied" });
    }
    const verified = jwt.verify(token, process.env.JWT_TOKEN);
    if (!verified) {
      return res.status(403).json({ error: "Invalid Token" });
    }
    const user = await User.findById(verified.userId).select("-password"); // current loggedin user
    if (!user) {
      return res.status(404).json({ error: "No user found" });
    }
    console.log(user);
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in secureRoute: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export default secureRoute;