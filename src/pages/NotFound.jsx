import { Link } from 'react-router-dom'
import { LotusMark } from '../components/Om.jsx'

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-5 py-28 text-center">
      <LotusMark className="h-14 w-14 opacity-70" />
      <h1 className="mt-6 font-serif text-3xl text-white">This page is not found</h1>
      <p className="mt-3 text-night-300">
        The song or page you seek is not here — but the shelter of the holy name is always near.
      </p>
      <Link to="/songbook" className="btn-primary mt-8">
        Return to the Songbook
      </Link>
    </div>
  )
}
