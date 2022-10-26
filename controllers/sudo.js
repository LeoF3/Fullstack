require('mongoose');
const Sud = require('../models/sudo');

const addSudo = async (SudokuR, ISudoku, SudokuA) => {
    let existSudo = await Sud.findOne({ "ISudoku": ISudoku });
    const sud = new Sud(
        {
            "SudokuR": SudokuR,
            "ISudoku": ISudoku,
            "SudokuA": SudokuA
        }
    );
    if (!existSudo) {
        let sudo = await sud.save();
        return "sudoku almacenado";
        return { sudo };
    } else {
        const result = await Sud.findOneAndUpdate({ "ISudoku": ISudoku },
            { "SudokuR": SudokuR, "SudokuA": SudokuA }, { new: true });
        return "sudoku Editado";
    }
}

const getAllSudo = async (limit, offset, SudokuA) => {
    let sudo;
    if (SudokuA !== undefined) {
        sudo = await Sud.find({ "SudokuA": SudokuA }).skip(offset).limit(limit).sort("ISudoku");
    } else {
        sudo = await Sud.find().skip(offset).limit(limit).sort("ISudoku");
    }
    return sudo;
}

const getSudoCount = async () => {
    const sudo = await Sud.count();
    return sudo;
}
const getSudo = async (id) => {
    const sudo = await Sud.findOne({ "ISudoku": id });
    return sudo;
}

const editSudo = async (sudo) => {
    const result = await Sud.findByIdAndUpdate(sudo._id, sudo, { new: true });
    return result;
}

module.exports = { addSudo, getAllSudo, editSudo, getSudo, getSudoCount/*, editRoles, deleteUser*/ }