'use client';
import { fetchSingleProperty } from '@/utils/requests';
import { useParams,useRouter } from 'next/navigation';
import React, { useState,useEffect } from 'react'
import { toast } from 'react-toastify';

useRouter
const PropertyEditForm = () => {
    const { id } = useParams();
    const router = useRouter();
    
  const [fields,setFields] = useState({
    name: "Boston Commons Retreat",
    type: "Apartment",
    description: "This is a beautiful apartment located near the commons. It is a 2 bedroom apartment with a full kitchen and bathroom. It is available for weekly or monthly rentals.",
    location: {
      street: "120 Tremont Street",
      city: "Boston",
      state: "MA",
      zipcode: "02108"
    },
    beds: 2,
    baths: 1,
    square_feet: 1500,
    amenities:['Wifi','Smart TV'],
    rates: {
      weekly: 1100,
      monthly: 4200,
      nightly:1254
    },
    seller_info: {
      name: "John Doe",
      email: "john@gmail.com",
      phone: "617-555-5555"
    },
  })


  const [loading, setLoading] = useState(true);

  useEffect(()=>{

    // Fetch Data property for form
    const fetchPropertyData = async()=>{
      try{
        const propertyData = await fetchSingleProperty(id)

        /// Check Rates For Null If So Make Empty String
        if(!propertyData.rates.weekly) propertyData.rates.weekly = ''
        if(!propertyData.rates.monthly) propertyData.rates.monthly = ''
        if(!propertyData.rates.nightly) propertyData.rates.nightly = ''
        setFields(propertyData)

      }catch(err){
        console.log("Fetching Single Property Error",err)
      }finally{
        setLoading(false);
      }
    
    }

    fetchPropertyData();

  },[])


  const handleChange = (e) => {
    const {name,value} = e.target
    if(name.includes('.')){
      const [outerKey,innerKey] = name.split('.')
      console.log(outerKey,innerKey)
      setFields((prevFields)=>({
        ...prevFields,
        [outerKey]:{
         ...prevFields[outerKey],
          [innerKey]:value
        }
      }))
    }else{
      setFields((prev)=>({
        ...prev,
        [name]:value
      }))
    }
  }

  const handleAmenitiesChange=(e)=>{
    const {value,checked} = e.target

    //clone
    const newAmenities = [...fields.amenities]
    if(checked){
      newAmenities.push(value)
    }else{
      const index = newAmenities.indexOf(value)
      if(index !== -1){
        newAmenities.splice(index,1)
      }
    }

    setFields((prev)=>({
     ...prev,
      amenities:newAmenities
    }))
  }
  

  const handleSubmit = async(e) => {
    e.preventDefault()
    //submit to server
    console.log('')
  }

  return (
    !loading &&
    (<form onSubmit={handleSubmit}>
            <h2 className="text-3xl text-center font-semibold mb-6">
              Update Property
            </h2>

            <div className="mb-4">
              <label
                htmlFor="type"
                className="block text-gray-700 font-bold mb-2"
                >Property Type</label
              >
              <select
                id="type"
                name="type"
                value={fields.type}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3"
                required
              >
                <option value="Apartment">Apartment</option>
                <option value="Condo">Condo</option>
                <option value="House">House</option>
                <option value="Cabin Or Cottage">Cabin or Cottage</option>
                <option value="Room">Room</option>
                <option value="Studio">Studio</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2"
                >Listing Name</label
              >
              <input
                type="text"
                id="name"
                value={fields.name}
                onChange={handleChange}
                name="name"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="eg. Beautiful Apartment In Miami"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-bold mb-2"
                >Description</label
              >
              <textarea
                id="description"
                value={fields.description}
                onChange={handleChange}
                name="description"
                className="border rounded w-full py-2 px-3"
                rows="4"
                placeholder="Add an optional description of your property"
              ></textarea>
            </div>

            <div className="mb-4 bg-blue-50 p-4">
              <label className="block text-gray-700 font-bold mb-2">Location</label>
              <input
                type="text"
                id="street"
                value={fields.location.street}
                onChange={handleChange}
                name="location.street"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="Street"
              />
              <input
                type="text"
                id="city"
                value={fields.location.city}
                onChange={handleChange}
                name="location.city"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="City"
                required
              />
              <input
                type="text"
                id="state"
                name="location.state"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="State"
                value={fields.location.state}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                value={fields.location.zipcode}
                onChange={handleChange}
                id="zipcode"
                name="location.zipcode"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="Zipcode"
              />
            </div>

            <div className="mb-4 flex flex-wrap">
              <div className="w-full sm:w-1/3 pr-2">
                <label htmlFor="beds" className="block text-gray-700 font-bold mb-2"
                  >Beds</label
                >
                <input
                  type="number"
                  value={fields.beds}
                onChange={handleChange}
                  id="beds"
                  name="beds"
                  className="border rounded w-full py-2 px-3"
                  required
                />
              </div>
              <div className="w-full sm:w-1/3 px-2">
                <label htmlFor="baths" className="block text-gray-700 font-bold mb-2"
                  >Baths</label
                >
                <input
                  type="number"
                  id="baths"
                  value={fields.baths}
                onChange={handleChange}
                  name="baths"
                  className="border rounded w-full py-2 px-3"
                  required
                />
              </div>
              <div className="w-full sm:w-1/3 pl-2">
                <label
                  htmlFor="square_feet"
                  className="block text-gray-700 font-bold mb-2"
                  >Square Feet</label
                >
                <input
                  type="number"
                  id="square_feet"
                  value={fields.square_feet}
                onChange={handleChange}
                  name="square_feet"
                  className="border rounded w-full py-2 px-3"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2"
                >Amenities</label
              >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                <div>
                  <input
                    type="checkbox"
                    id="amenity_wifi"
                    name="amenities"
                    value="Wifi"
                    className="mr-2"
                    checked={fields.amenities.includes('Wifi')}
                    onChange={handleAmenitiesChange}

                  />
                  <label htmlFor="amenity_wifi">Wifi</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="amenity_kitchen"
                    name="amenities"
                    value="Full Kitchen"
                    onChange={handleAmenitiesChange}
                    className="mr-2"
                    checked={fields.amenities.includes('Full Kitchen')}
                  />
                  <label htmlFor="amenity_kitchen">Full kitchen</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="amenity_washer_dryer"
                    name="amenities"
                    value="Washer & Dryer"
                    className="mr-2"
                    checked={fields.amenities.includes('Washer & Dryer')}
                    onChange={handleAmenitiesChange}
                  />
                  <label htmlFor="amenity_washer_dryer">Washer & Dryer</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="amenity_free_parking"
                    name="amenities"
                    value="Free Parking"
                    checked={fields.amenities.includes('Free Parking')}
                    onChange={handleAmenitiesChange}
                    className="mr-2"
                  />
                  <label htmlFor="amenity_free_parking">Free Parking</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="amenity_pool"
                    checked={fields.amenities.includes('Swimming Pool')}
                    onChange={handleAmenitiesChange}
                    name="amenities"
                    value="Swimming Pool"
                    className="mr-2"
                  />
                  <label htmlFor="amenity_pool">Swimming Pool</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="amenity_hot_tub"
                    name="amenities"
                    value="Hot Tub"
                    checked={fields.amenities.includes('Hot Tub')}
                    onChange={handleAmenitiesChange}
                    className="mr-2"
                  />
                  <label htmlFor="amenity_hot_tub">Hot Tub</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="amenity_24_7_security"
                    name="amenities"
                    value="24/7 Security"
                    className="mr-2"
                    checked={fields.amenities.includes('24/7 Security')}
                    onChange={handleAmenitiesChange}
                  />
                  <label htmlFor="amenity_24_7_security">24/7 Security</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="amenity_wheelchair_accessible"
                    name="amenities"
                    value="Wheelchair Accessible"
                    className="mr-2"
                    checked={fields.amenities.includes('Wheelchair Accessible')}
                    onChange={handleAmenitiesChange}
                  />
                  <label htmlFor="amenity_wheelchair_accessible"
                    >Wheelchair Accessible</label
                  >
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="amenity_elevator_access"
                    name="amenities"
                    value="Elevator Access"
                    className="mr-2"
                    checked={fields.amenities.includes('Elevator Access')}
                    onChange={handleAmenitiesChange}
                  />
                  <label htmlFor="amenity_elevator_access">Elevator Access</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="amenity_dishwasher"
                    name="amenities"
                    value="Dishwasher"
                    className="mr-2"
                    checked={fields.amenities.includes('Dishwasher')}
                    onChange={handleAmenitiesChange}
                  />
                  <label htmlFor="amenity_dishwasher">Dishwasher</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="amenity_gym_fitness_center"
                    name="amenities"
                    value="Gym/Fitness Center"
                    className="mr-2"
                    checked={fields.amenities.includes('Gym/Fitness Center')}
                    onChange={handleAmenitiesChange}
                  />
                  <label htmlFor="amenity_gym_fitness_center"
                    >Gym/Fitness Center</label
                  >
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="amenity_air_conditioning"
                    name="amenities"
                    value="Air Conditioning"
                    checked={fields.amenities.includes('Air Conditioning')}
                    onChange={handleAmenitiesChange}
                    className="mr-2"
                  />
                  <label htmlFor="amenity_air_conditioning">Air Conditioning</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="amenity_balcony_patio"
                    name="amenities"
                    value="Balcony/Patio"
                    className="mr-2"
                    checked={fields.amenities.includes('Balcony/Patio')}
                    onChange={handleAmenitiesChange}
                  />
                  <label htmlFor="amenity_balcony_patio">Balcony/Patio</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="amenity_smart_tv"
                    name="amenities"
                    value="Smart TV"
                    className="mr-2"
                    checked={fields.amenities.includes('Smart TV')}
                    onChange={handleAmenitiesChange}
                  />
                  <label htmlFor="amenity_smart_tv">Smart TV</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="amenity_coffee_maker"
                    name="amenities"
                    value="Coffee Maker"
                    className="mr-2"
                    checked={fields.amenities.includes('Coffee Maker')}
                    onChange={handleAmenitiesChange}
                  />
                  <label htmlFor="amenity_coffee_maker">Coffee Maker</label>
                </div>
              </div>
            </div>

            <div className="mb-4 bg-blue-50 p-4">
              <label className="block text-gray-700 font-bold mb-2"
                >Rates (Leave blank if not applicable)</label
              >
              <div
                className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4"
              >
                <div className="flex items-center">
                  <label htmlFor="weekly_rate" className="mr-2">Weekly</label>
                  <input
                    type="number"
                    id="weekly_rate"
                    name="rates.weekly"
                    value={fields.rates.weekly}
                    onChange={handleChange}
                    className="border rounded w-full py-2 px-3"
                  />
                </div>
                <div className="flex items-center">
                  <label htmlFor="monthly_rate" className="mr-2">Monthly</label>
                  <input
                    type="number"
                    id="monthly_rate"
                    name="rates.monthly"
                    className="border rounded w-full py-2 px-3"
                    value={fields.rates.monthly}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex items-center">
                  <label htmlFor="nightly_rate" className="mr-2">Nightly</label>
                  <input
                    type="number"
                    id="nightly_rate"
                    name="rates.nightly"
                    className="border rounded w-full py-2 px-3"
                    value={fields.rates.nightly}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="seller_name"
                className="block text-gray-700 font-bold mb-2"
                >Seller Name</label
              >
              <input
                type="text"
                id="seller_name"
                value={fields.seller_info.name}
                onChange={handleChange}
                name="seller_info.name"
                className="border rounded w-full py-2 px-3"
                placeholder="Name"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="seller_email"
                
                className="block text-gray-700 font-bold mb-2"
                >Seller Email</label
              >
              <input
                type="email"
                id="seller_email"
                name="seller_info.email"
                value={fields.seller_info.email}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3"
                placeholder="Email address"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="seller_phone"
                className="block text-gray-700 font-bold mb-2"
                >Seller Phone</label
              >
              <input
                type="tel"
                id="seller_phone"
                name="seller_info.phone"
                value={fields.seller_info.phone}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3"
                placeholder="Phone"
              />
            </div>

            <div>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Update Property
              </button>
            </div>
          </form>
  ))
}

export default PropertyEditForm