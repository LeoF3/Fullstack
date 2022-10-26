const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sudSchema = new Schema({

		SudokuR:{
		type: String,
		required:true,
	},
	ISudoku:{
		type: Number,
		required:true
    },
    SudokuA:{
		type: Boolean,
		required:true
	}
	
}, { timestamps: true } ).set('toJSON',{
    transform: (document, object) => {
        object.id = document.id;
        delete object._id;
    }
});


const Sud = mongoose.model('sud',sudSchema);
module.exports = Sud;