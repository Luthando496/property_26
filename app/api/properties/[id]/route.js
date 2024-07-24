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


// PUT /api/properties/:id
export const PUT = async(request,{params})=>{
   try{
      await connectDB();
      

    const sessionUser = await getSessionUser();
    if(!sessionUser || !sessionUser.user){
       return new Response('User Id Is Required',{status:401})
      }
      const {userId} = sessionUser;
      const {id} = params;

      const formData = await request.formData();
      // Access All values for Amenities and images
      const amenities = formData.getAll('amenities');

      // Get Property To Update
      const existingProperty = await Property.findById(id);

      if(!existingProperty) return new Response('Property Does Not Exist ',{status:404});

      // Verify Owner Ship
      if(existingProperty.owner.toString()!== userId){
         return new Response('Unauthorized Access',{status:403})
      }

      //create property data
      const propertyData = {
         type: formData.get('type'),
         name: formData.get('name'),
         description: formData.get('description'),
         location: {
            street: formData.get('location.street'),
            city: formData.get('location.city'),
            state: formData.get('location.state'),
            zipcode: formData.get('location.zipcode'),
         },
         beds:formData.get('beds'),
         baths:formData.get('baths'),
         square_feet: formData.get('square_feet'),
         amenities,
         rates: {
            nightly: formData.get('rates.nightly'),
            weekly: formData.get('rates.weekly'),
            monthly: formData.get('rates.monthly'),
         },
         seller_info:{
            name: formData.get('seller_info.name'),
            email: formData.get('seller_info.email'),
            phone: formData.get('seller_info.phone'),
         },
         owner:userId,
      }

   
      // Update Property In Database
      const UpdatedProperty = await Property.findByIdAndUpdate(id,propertyData);
      
      return new Response(JSON.stringify(UpdatedProperty),{status:200})

      

   }
   catch(error){
      console.log(error)
      return new Response('Something Went Wrong',{status:500})
   }
}