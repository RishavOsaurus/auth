import * as services from "../services/services.js";

export const signup = async (req, res) => {
  const { username, password } = req.body;
  console.log(username)
  console.log(password)
  try {
    const request = await services.registerUser(username, password);
    res.status(request.status).json(request.body);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const request = await services.checkUser(username, password,req);
    res.status(request.status).json(request.body);
    console.log(req.session.userId)
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Login Error"
    });
  }
};

export const logout = async (req, res) => {
  try {
    const result = await services.logoutUser(req);
    if(result.body.clearCookie){
        res.clearCookie('connect.sid')
    }
    res.status(result.status).json(result.body);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const afterAuth = async(req,res)=>{
    res.status(200).json({ success: true, message: "Authorized" });
}


