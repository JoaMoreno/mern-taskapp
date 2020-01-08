const { Schema, model } = require('mongoose');

const SubTasksSchema = new Schema({
    content: { type: String, required:"{PATH} is required!" },
    status: {type: Boolean, default: false},
    task_prima:{ type: Schema.Types.ObjectId, ref:"Tasks"}
},{
    timestamps: true,
    versionKey: false
});

module.exports = model('SubTasks', SubTasksSchema);