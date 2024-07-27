const { connectDB } = require("@/config/database");
import User from '@/models/User'
import Property from '@/models/Property'
import { getSessionUser } from '@/utils/getSessionUser';

export const dynamic = 'force-dynamic';


export const POST =async(request)=>{
    try{
        await connectDB();

        const {propertyId} = request.json();

        const sessionUser = await getSessionUser();
        if(!sessionUser ||!sessionUser.userId){
            return new Response('User Id Is Required',{status:401})
        }
        const {userId} = sessionUser;

        // Find User In The Database

        const user = await User.findBy(userId);

        // Check if property is bookmarked
        let isBookmark = user.bookmarks.includes(propertyId);

        //if already bookmarked we remove it

        let message;

        if(isBookmark){
            user.bookmarks.pull(propertyId);
            message = 'Property Removed Successfully';
            isBookmark = false;
        }else{
            user.bookmarks.push(propertyId);
            message = 'Property Added To Bookmarked Successfully';
            isBookmark = true;
        }

        await user.save();

        return new Response(JSON.stringify({message,isBookmark}),{status:200});
    }catch(err){
        console.error(err);
        return new Response('Error Happened During Bookmark',{status:500})
    }
}