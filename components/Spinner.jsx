'use client';
import ClipLoader from 'react-spinners/ClipLoader'



const Spinner = ({loading}) => {
    const override = {
      display: 'block',
      margin:'120px auto'}
  return (
    <>
        <ClipLoader size={140} color="#3f5220" aria-label='Loading Spinner' cssOverride={override} />
    </>
  )
}

export default Spinner