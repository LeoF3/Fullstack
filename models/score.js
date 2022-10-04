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
});


const Score = mongoose.model('score',scoreSchema);
module.exports = Score;