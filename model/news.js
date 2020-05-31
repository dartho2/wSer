const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    
        title: {type: String, required: true },
        id_class: {type: String, required: true},
        img: {type: String, required: true},
        descriptions:{type: String, required: true},
   
});
productSchema.pre('findByIdAndUpdate', function (next) {
        this.options.runValidators = true;
        next();
    });
module.exports = mongoose.model('News', productSchema);