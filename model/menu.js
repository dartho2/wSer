const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    
        category: {type: String, required: true, unique: true},
        desc: {type: String, required: true, unique: true},
        id_class: {type: String, required: true, unique: true},
        img: {type: String, required: true, unique: true},
        dish:{type: Object, required: true},
   
});
productSchema.pre('findByIdAndUpdate', function (next) {
        this.options.runValidators = true;
        next();
    });
module.exports = mongoose.model('Menus', productSchema);