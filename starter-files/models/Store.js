const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');
const { ModuleFilenameHelpers, Module } = require('webpack');

const storeSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Please enter a store name!'
    },
    slug: String,
    description: {
        type: String,
        trim: true
    },
    tags: [String]
});

storeSchema.pre('save', function(next) {
    if (!this.isModified('name')) {
        next(); //skip it
        return; //stop this function
    }
    this.slug = slug(this.name);
    next();
    //TODO make more resiliant so slugs are unique
});

module.exports = mongoose.model('Store', storeSchema);
