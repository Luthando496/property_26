'use client';
import PropertyCard from '@/components/PropertyCard'
import Spinner from '@/components/Spinner'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'


const SavedProperties = () => {
    const [properties,setProperties] = useState([])
    const [loading,setLoading] = useState(true)


    useEffect(()=>{
        const fetchSavedProperties = async ()=>{
            try{
                const res = await fetch('/api/bookmarks/')
                if(res.status === 200){
                    const data = await res.json()
                    setProperties(data)
                }
            } catch (error){
                toast.error('Failed to fetch saved properties')
                console.error(error)
            } finally{
                setLoading(false)
            }
        }
        fetchSavedProperties()
    },[])

  return loading ? <Spinner  loading={loading} /> : (
    <section className="px-4 py-6">
    <h1 className="text-2xl font-light ">Saved Pages</h1>
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (<p>No Saved Properties Found</p>) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.map(item =>(
            <PropertyCard key={item._id} property={item} />
          ))}
        </div>
        )}
        
      </div>
    </section>
  )
}

export default SavedProperties
