 import Order from "./models/orderModel.js";
 import Product from "./models/productModel.js";
 import User from "./models/userModel.js";
 import user from "./data/user.js";
 import products from "./data/products.js";
 import connectdb from "./config/db.js";
 import dotenv from 'dotenv'

 dotenv.config()
 connectdb()

 const importData = async ()=>{
   try {
    await User.deleteMany()
    await Order.deleteMany()
    await Product.deleteMany()

    const createdUser = await User.insertMany(user)
    const adminUser = createdUser[0]._id

    const sampleProducts = products.map(product => {
        return {...product,user: adminUser}
    })

    await Product.insertMany(sampleProducts)
    console.log('Imported Data')
    process.exit()
   } catch (error) {
    console.log(error.message)
    process.exit(1)
   }
 }

 const destroyData = async ()=>{
    try {
        await User.deleteMany()
        await Order.deleteMany()
        await Product.deleteMany()
    
        console.log('Destroyed Data')
        process.exit()
       } catch (error) {
        console.log(error.message)
        process.exit(1)
       }
 }

 if(process.argv[2] == '-d'){
    destroyData()
 }else{
    importData()
 }