const { Schema, model } = require('mongoose');

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//
// COMPROBAR SI ES EFICIENTE ESTE MODELO //
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//

const TasksSchema = new Schema({
    title: { type: String, required:"{PATH} is required!" },
    content: String,
    status: {type: Boolean, default: false},
    project:{ type: Schema.Types.ObjectId, ref:"Project"},
    subtasks: [{type: Schema.Types.ObjectId, ref:"SubTasks"}]
},{
    timestamps: true,
    versionKey: false
});

module.exports = model('Tasks', TasksSchema);