const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const scoreSchema = new Schema({

	punto:{
		type: Number,
		required:true,
	},
	dificultad:{
		type: String,
		required:true
    },
    usuario:{type: Schema.ObjectId, ref: "user", 
		required:true
	}
}, { timestamps: true } ).set('toJSON',{
    transform: (document, object) => {
        object.id = document.id;
        delete object._id;
        delete object.password;
    }});


const Score = mongoose.model('score',scoreSchema);
module.exports = Score;