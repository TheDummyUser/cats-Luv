import { Link } from 'react-router-dom'
const Head = () => {
  return (
    <>
    <div>
        <p>Cats and Luv</p>
        <p><Link to='/dashboard'>dashboard</Link></p>
    </div>
    </>
  )
}

export default Head