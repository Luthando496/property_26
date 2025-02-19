import PropertyCard from '@/components/PropertyCard'
import { fetchProperties } from '@/utils/requests';




const Property = async()=> {
  const properties = await fetchProperties();
  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (<p>No properties found</p>) : (
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

export default Property;
