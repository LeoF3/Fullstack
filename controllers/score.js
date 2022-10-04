require('mongoose');
const Sco = require('../models/score');


const addScore = async (punto,dificultad,usuario) => {

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

}   

const getAllScore = async (limit,offset) => {

    const scores = await Sco.find({}).limit(limit).skip(offset);

    return scores;
}

const getScore = async(limit,user) => {
    const score = await Sco.find({ "usuario":user }).limit(limit);
    return score;
}

module.exports = { addScore , getAllScore, getScore}