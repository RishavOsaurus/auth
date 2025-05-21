import { User } from "../model/model.js"
import bcrypt from 'bcrypt'
export const registerUser = async(username,password)=>{
    const existing = await User.findOne({username})
    if(existing){
        return{
            status: 409,
            body: {
                success: false,
                message: "User Already Exists"
            }
        }
    }

    const hashed = await bcrypt.hash(password,10)
    const user = new User({username, password: hashed})
    await user.save();

       return {
        status: 201,
        body: { success: true, message: "User registered successfully" }
    };
}

export const checkUser = async (username, password, req) => {
  const user = await User.findOne({ username });
  if (!user) {
    return {
      status: 401,
      body: { success: false, message: "Invalid credentials" }
    };
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return {
      status: 401,
      body: { success: false, message: "Invalid credentials" }
    };
  }

  req.session.userId = user._id;

  // ✅ Ensure the session is saved before continuing
  return new Promise((resolve, reject) => {
    req.session.save(err => {
      if (err) {
        return resolve({
          status: 500,
          body: { success: false, message: "Session save failed" }
        });
      }

      resolve({
        status: 200,
        body: { success: true, message: "Logged in successfully", userId: user._id }
      });
    });
  });
};


export const logoutUser = (req)=>{
    return new Promise((resolve,reject)=>{
        req.session.destroy((err)=>{
            if(err){
                return resolve({
                    status: 500,
                    body: { success: false, message: 'Logout failed' }
                })
            }
            resolve({
                status: 200,
                 body: { success: true, message: 'Logged out successfully', clearCookie: true }
            })
        })
    })
}