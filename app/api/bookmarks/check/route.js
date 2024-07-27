const { connectDB } = require("@/config/database");
import User from '@/models/User'
import { getSessionUser } from '@/utils/getSessionUser';

export const POST =async(request)=>{
    try{
        await connectDB();


        const {propertyId} = await request.json();

        const sessionUser = await getSessionUser();
        if(!sessionUser ||!sessionUser.userId){
            return new Response('User Id Is Required',{status:401})
        }
        const {userId} = sessionUser;

        // Find User In The Database

        const user = await User.findById(userId);

        // Check if property is bookmarked
        let isBookmark = user.bookmarks.includes(propertyId);

        //if already bookmarked we remove it

        

        

        return new Response(JSON.stringify(isBookmark),{status:200});
    }catch(err){
        console.error(err);
        return new Response('Error Happened During Bookmark',{status:500})
    }
}