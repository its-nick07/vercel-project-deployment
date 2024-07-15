const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');


const memberSchema = new mongoose.Schema({
    memberId:{
        type:String,
        required:true,
        unique:true,
        default: uuidv4 // Generate a UUID by default
    },
    memberName:{
        type: String,
        require:true,
    },
    memberEmail:{
        type: String,
        require: true,
    },
    phoneNumber:{
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default:Date.now
    }
})

const Member = mongoose.model("Member", memberSchema);


module.exports = Member;
