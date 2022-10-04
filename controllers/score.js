require('mongoose');
const Sco = require('../models/score');


const addScore = async (punto,dificultad,usuario) => {

   // let existUser = await Sco.findOne({ email: email });
  //  console.log(existUser);
 //   if(!existUser) {

   /*     const cryptoPass = require('crypto')
        .createHash('sha256')
        .update(password)
        .digest('hex');
     */   
        const sco = new Sco(
            {              
                punto: punto,
                dificultad:dificultad,
                usuario: usuario

            }
        );

        let scor = await sco.save(); 
        console.log("score nuevo");
        console.log(scor);
        return { scor }; 

  //  }else{
  //      return false;
 //   }
}   
/*
const getAllUsers = async (limit,offset) => {

    const users = await Usr.find({}).limit(limit).skip(offset);

    return users;
}

const getUser = async(id) => {

    const user = await Usr.findById(id);

    // await Usr.findOne({ _id: req.params.id })

    return user;
}

const editUser = async(user) => {

    const result = await Usr.findByIdAndUpdate(user._id,user,{new:true});

    return result;
}

const editRoles = async(roles,id) => {

    const result = await Usr.findByIdAndUpdate(id,{$set:{roles:roles}},{new:true});

    return result;
}

const deleteUser = async(id) => {

    const result = await Usr.findByIdAndDelete(id);

    return result;
}

module.exports = { addUser, getAllUsers, getUser, editUser, editRoles, deleteUser }
*/
module.exports = { addScore }