const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null


export const fetchProperties = async()=>{
    try{
        // handle case where domain is not available yet
        if(!apiDomain) return [];
      const res = await fetch(`${apiDomain}/properties`);
      if(!res.ok) throw new Error(`Luthando It Failed To Fetch Data: ${res.status}`);
      const data = await res.json();
      return data;
    }catch(err){
      console.log(err)
      return [];
    }
  
  }

/// fetch property single

export const fetchSingleProperty = async(id)=>{
  try{
      // handle case where domain is not available yet
      if(!apiDomain) return null;
    const res = await fetch(`${apiDomain}/properties/${id}`);
    if(!res.ok) throw new Error(`Luthando It Failed To Fetch Data: ${res.status}`);
    const data = await res.json();
    return data;
  }catch(err){
    console.log(err)
    return null;
  }

}