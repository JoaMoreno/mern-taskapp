const { Schema, model } = require('mongoose');

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//
// SOLUCIONAR COMPOUND & RELATIONS //
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//

const projectSchema = new Schema({
    project: { type: String, required: "{PATH} is required!" },
    status: {type: Boolean, default: false},
    tasks: [{type: Schema.Types.ObjectId, ref:"Tasks"}]
    },{
    timestamps: true,
    versionKey: false
});

module.exports = model('Project', projectSchema);