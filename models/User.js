import {Schema,models,model} from "mongoose";


const UserSchema = new Schema({
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:[true,'Email Already exists.'],
    },
    username:{
        type:String,
        required:[true,'Username is required'],
    },
    image:{
        type:String,
    },
    bookmarks:[
        {
            type:Schema.Types.ObjectId,
            ref:'Property'
        }
    ]
},
{
    timestamps:true
})


const User = models.User || models('User',UserSchema)
export default User;