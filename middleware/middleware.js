export const printReq = (req, res, next) => {
  console.log(`${req.method} - ${req.url}`);
  next();
};

export const auth = (req, res, next) => {
  // More comprehensive session debugging
  console.log('Session data:', req.session);
  console.log('User ID from session:', req.session.userId);
  
  if (!req.session || !req.session.userId) {
    console.log('Auth failed: No valid session or userId');
    return res.status(401).json({ success: false, message: "No Permission" });
  }
  
  console.log('Auth successful for user:', req.session.userId);
  next();
};