import { transporter } from "../config/nodemailer.js"
import Admin from '../models/adminModel.js';
import bcrypt from 'bcryptjs'
import path from 'path'
import productModel from "../models/productModel.js";

let storedOtp = ''; 

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const handlesendOtp =  (req, res)=>{
    const {email} = req.body
    const otp = generateOTP()
    storedOtp = otp

    const mailOptions = {
        from: 'cmabdulkareem@gmail.com',
        to: email,
        subject: 'Approval request',
        text: `Your OTP code is: ${otp}`,
      };

      transporter.sendMail(mailOptions, (error, info)=>{
        if(error){
            return res.status(500).json({error: "Internal error"})
        }else{
            res.status(200).json({message: "OTP sent succesfully"})
        }
      })
}

export const handleRegister = async (req, res) => {
    const { email, password, otp } = req.body;
  
    if (!email || !password || !otp) {
      return res.status(400).send('Missing required fields');
    }
  
    if (otp !== storedOtp) {    
      return res.status(400).send('Invalid OTP');
    }
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
  
      await Admin.create({ email, password: hashedPassword });
  
      res.status(200).json({message: "registration success"});
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({error: "Registration failed, Internal error"});
    }
  };

  export const handleLogin = (req, res)=>{
    const {email, password} = req.body

    if (!email || !password){
      return res.status(400).json({error: "Enter both username and password"})
    }else{
      Admin.findOne({email})
        .then((user)=>{
          if(!user){
            return res.status(400).json({error: "User not found"})
          }else{
            bcrypt.compare(password, user.password)   
                .then((isMatch) => {
                    if (!isMatch) {
                        return res.status(401).json({ error: 'Invalid credentials' });
                    }
                    req.session.userId = user._id;
                    req.session.useremail = user.email;
                    res.status(200).json({ message: 'Login successful' });
                })
                .catch((error) => {
                    console.error('Error comparing passwords:', error);
                    res.status(500).json({ error: 'Internal server error' });
                });
          }
        })
        .catch((err)=>{
          console.log(err)
          res.status(500).json({ error: 'Internal server error' });
        })
    }
  }


  export const handleCheckAuth = (req, res)=>{
    if(req.session.userId){
      const email = req.session.useremail
      return res.status(200).json({message: "User found", email: email})
    }else{
      res.status(400).json({error: "Not logged in"})
    }
  }


  export const handleSignout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error destroying session", err);
            return res.status(500).send("Internal server error");
        } else {
          res.status(200).send("Signout success");
            console.log("Session destroyed successfully");
        }
    });
}


export const handleAddProducts = (req, res)=>{
  const {itemName, itemDesc, itemPrice} = req.body
  const {itemImage} = req.files

  console.log(itemImage)
  
  if(!itemImage){
    return res.status(400).json({error: "please upload product image"})
  }else{
    productModel.create({itemName, itemDesc, itemPrice})
    .then((newproduct)=>{
      itemImage.mv(path.join("./public", "images", "products/", `${newproduct._id}.jpg`))
      res.status(200).json({message: "product uploaded"})
    })
    .catch((err)=>{
      res.status(500).json({error: "internal error"})
    })
  }
}

export const handleGetProducts = (req, res)=>{
  productModel.find({})
    .then((result)=>{
      res.status(200).json({message: result})
    })
    .catch((err)=>{
      res.status(500).json({error: "internal error"})
    })
}

export const handleDeleteProduct = (req, res)=>{
  const id = req.params.id
  productModel.findByIdAndDelete(id)
  .then(()=>{
    res.status(200).json({message:"successfully deleted"})
  })

  .catch((error)=>{
    res.status(500).json({error})
  })
}

export const handleGetEditProduct = (req, res)=>{
  const id = req.params.id
  productModel.findById(id)
    .then((product)=>{
      res.status(200).json({message: product})
    })
    .catch((err)=>{
      res.status(500).json({error: "internal server error"})
    })
}