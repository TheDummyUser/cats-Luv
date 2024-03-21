import { Link } from 'react-router-dom'
const Head = () => {
  return (
    <>
    <div className='flex space-x-4 p-6 justify-end border-b-2 border-slate-900'>
        <p className='border border-black p-1 pl-3 pr-3 rounded-2xl bg-slate-700 text-slate-300'><Link to='/'>Cats and Luv</Link></p>
        <p className='border border-black p-1 pl-3 pr-3 rounded-2xl bg-slate-700 text-slate-300'><Link to='/dashboard'>dashboard</Link></p>
    </div>
    </>
  )
}

export default Head