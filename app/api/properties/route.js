export const GET = async(request)=>{
     try{
         return new Response('Hello Luthando',{status:200})
     }
     catch(error){
        console.log(error)
        return new Response('Something Went Wrong',{status:500})
     }
}