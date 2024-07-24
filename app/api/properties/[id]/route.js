import { connectDB } from "@/config/database"
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";


// GET /api/properties/:id
export const GET = async(request,{params})=>{
     try{

        await connectDB();
        const property = await Property.findById(params.id)
        if(!property) return new Response('Property Not Found',{status:404})
         return new Response(JSON.stringify(property),{status:200})
     }
     catch(error){
        console.log(error)
        return new Response('Something Went Wrong',{status:500})
     }
}


// GET /api/properties/:id
export const DELETE = async(request,{params})=>{
   try{

      const propertyId = params.id;

      const sessionUser =await getSessionUser(request);

      // Check For Session
      if(!sessionUser || !sessionUser.userId){
         return new Response('User Id Is Required',{status:401})
      }

      const {userId} = sessionUser;

      await connectDB();
      const property = await Property.findById(propertyId)
      if(!property) return new Response('Property Not Found',{status:404})

      // Verify Owner Ship
      if(property.owner.toString()!== userId.toString()){
         return new Response('Unauthorized Access',{status:403})
      }
      
      await property.deleteOne();
       return new Response('Property Deleted Successfully',{status:200})
   }
   catch(error){
      console.log(error)
      return new Response('Something Went Wrong',{status:500})
   }
}