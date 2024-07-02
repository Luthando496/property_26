import properties from '@/properties.json'
import PropertyCard from '@/components/PropertyCard'


const Property = () => {
  return (
    <section class="px-4 py-6">
      <div class="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (<p>No properties found</p>) : (
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.map(item =>(
            <PropertyCard key={item._id} property={item} />
          ))}
        </div>
        )}
        
      </div>
    </section>
  )
}

export default Property
