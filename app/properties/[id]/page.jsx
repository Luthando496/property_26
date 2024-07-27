'use client';
import BookmarkButton from '@/components/BookmarkButton';
import ContactForm from '@/components/ContactForm';
import PropertyDetails from '@/components/PropertyDetails';
import PropertyHeaderImage from '@/components/PropertyHeaderImage';
import PropertyImages from '@/components/PropertyImages';
import ShareButtons from '@/components/ShareButtons';
import Spinner from '@/components/Spinner';
import { fetchSingleProperty } from '@/utils/requests';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {useState,useEffect} from 'react';
import {FaArrowLeft} from 'react-icons/fa'

const PropertyPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchPropertyData =async()=>{
      if(!id)return;

      try {
        const house = await fetchSingleProperty(id);
        setProperty(house);
      } catch (error) {
        console.log("Fetching Single Property Error",error)
      }finally{
        setLoading(false);
      }
    }

    if(property === null) fetchPropertyData();
  }, [id,property]);

  if(!property && !loading){
    return (
      <h1 classNameName='text-center text-2xl font-bold mt-10'>Property Not Found</h1>
    )
  }

  return (
    <>
    {loading && <Spinner loading={loading} />}
      {!loading && property && (
        <>
          <PropertyHeaderImage image={property.images[0]} />
          <section>
      <div className="container m-auto py-6 px-6">
        <Link
          href="/properties"
          className="text-blue-500 hover:text-blue-600 flex items-center"
        >
          <FaArrowLeft className='mr-2 text-xl' /> Back to Properties
        </Link>
      </div>
    </section>

    {/* // */}
    <section className="bg-blue-50">
      <div className="container m-auto py-10 px-6">
        <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
          <PropertyDetails property={property} />

          {/* // Sidebar */}
          <aside className="space-y-4">       
            <BookmarkButton property={property} />
           <ShareButtons property={property}  />

            {/* // Contact Form  */}
           <ContactForm property={property}  />
          </aside>
        </div>
      </div>
    </section>
    <PropertyImages image={property.images} />
        </>
      )}
    </>
  )
}

export default PropertyPage