'use client';
import ClipLoader from 'react-spinners/ClipLoader'



const LoadingPage = ({loading}) => {
    const override = {
      display: 'block',
      margin:'120px auto'}
  return (
    <>
        <ClipLoader size={180} color="#3f51b5" aria-label='Loading Spinner' cssOverride={override} />
    </>
  )
}

export default LoadingPage