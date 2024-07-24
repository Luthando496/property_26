'use client'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import profileDefault from '@/assets/images/profile.png';
import { useEffect, useState } from 'react';
import Spinner from '@/components/Spinner';
import { toast } from 'react-toastify';


const page = () => {

    const { data: session } = useSession();
    const profileImage = session?.user?.image;
    const profileName = session?.user?.name;
    const profileEmail = session?.user?.email;

    const [properties,setProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        const fetchProperties = async (userId)=>{
          if(!userId) return;
            try{
                const res = await fetch(`/api/properties/user/${userId}`)
                if(res.status ===200){
                  const data = await res.json()
                  setProperties(data)
                  
                }
              }catch(error){
                console.error(error,'User Properties')
                setIsLoading(false)
              }finally{
                setIsLoading(false)
              }
            }

        // fetch properties if session is available
        if(session?.user?.id) fetchProperties(session?.user?.id)    
    },[session])

    const handleDelete =async(propertyId)=>{
      const confirm = window.confirm('Are You Sure You Want To Delete This Property?')

      if(!confirm) return;

      try{
        const res = await fetch(`/api/properties/${propertyId}`,{method:'DELETE'})

        if(res.status === 200){
          /// Remove The property From The State
          const updatedProperty = properties.filter(p=>p._id!==propertyId)
          setProperties(updatedProperty)
          toast.success('Property Deleted Successfully')
        }else{
          toast.error('Failed To Delete Property') 
        }
      }catch(error){
        toast.error('Could Not  Delete Property')
      }

    }
  return (
    <>
        <section className="bg-blue-50">
      <div className="container m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mx-20 mt-10">
              <div className="mb-4">
                <Image
                  className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                  src={profileImage|| profileDefault}
                  alt="User"
                  width={200}
                  height={200}
                />
              </div>
              <h2 className="text-2xl mb-4"><span className="font-bold block">Name: </span> {profileName}</h2>
              <h2 className="text-2xl"><span className="font-bold block">Email: </span> {profileEmail}</h2>
            </div>

            <div className="md:w-3/4 md:pl-4">
              <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
              {!isLoading && properties.length ===0 &&(
                <p>No properties found.</p>
              )}
              {isLoading ? (<Spinner loading={isLoading} /> ) : (
                properties.map((property)=>(
                  <div className="mb-10" key={property._id}>
                <Link href={`/properties/${property._id}`}>
                  <Image
                    className="h-32 w-full rounded-md object-cover"
                    src={property.images[0]}
                    alt="Property 1"
                    width={500}
                    height={400}
                    priority={true}
                  />
                </Link>
                <div className="mt-2">
                  <p className="text-lg font-semibold">{property.name}</p>
                  <p className="text-gray-600">Address: {property.location.street} {property.location.city} {property.location.state} </p>
                </div>
                <div className="mt-2">
                  <Link href={`/properties/${property._id}/edit`}
                    className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
                  >
                    Edit
                  </Link>
                  <button onClick={()=> handleDelete(property._id)}
                    className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                    type="button"
                  >
                    Delete
                  </button>
                </div>
              </div>
              )))}
              
              
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default page