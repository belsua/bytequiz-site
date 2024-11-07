// src/components/UI/Navbar.jsx
import { useContext, useState } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext' // Import AuthContext
import Logo from '../../assets/Logo.webp'


const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useContext(AuthContext) // Access user and logout from AuthContext
  const [showNav, setShowNav] = useState(false) // Add a state to track the visibility of the navigation links


  const handleLogout = async () => {
    await logout() // Call the logout function from AuthContext
    navigate('/') // Redirect to home after sign-out
  }

  const handleToggleNav = () => {
    setShowNav(!showNav) // Toggle the visibility of the navigation links
  }


  return (
    <nav className="bg-black/85 p-4 text-white sticky top-0 left-0 right-0 z-10 backdrop-blur-xl">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="lg:pl-8">
          <img src={Logo} alt="ByteQuiz Logo" className="max-w-[200px] max-h-[200px] object-contain" />
        </a>
        <div className="hidden md:flex md:justify-center md:items-center">
          {user && (
            <>
              {location.pathname !== '/teacher/dashboard' && (
                <Link to="/teacher/dashboard" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-600 hover:bg-blue-700">
                  Back to Dashboard
                </Link>
              )}
              <div className="mx-2" /> {/* Add a gap between Dashboard and Sign Out buttons */}
              <button
                onClick={handleLogout}
                className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-red-600 hover:bg-red-700"
              >
                Sign Out
              </button>
            </>
          )}
          {!user && (
            <a
              href="/login"
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-green-600 hover:bg-green-700"
            >
              For Instructor
            </a>
          )}
        </div>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
          onClick={handleToggleNav} // Add an onClick event handler to toggle the navigation links
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className={`${showNav ? 'block' : 'hidden'} md:hidden absolute top-full right-0 bg-black/85 p-4 w-full`}>
          <ul className="font-medium flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 w-full">
            {user && (
              <>
                {location.pathname !== '/teacher/dashboard' && (
                  <li className="w-full">
                    <Link to="/teacher/dashboard" className="text-center block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500 w-full">
                      Back to Dashboard
                    </Link>
                  </li>
                )}
                <li className="mt-2 w-full">
                  <button
                    onClick={handleLogout}
                    className="block py-2 px-3 text-white bg-red-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500 w-full"
                  >
                    Sign Out
                  </button>
                </li>
              </>
            )}
            {!user && (
              <li className="w-full">
                <a
                  href="/login"
                  className="text-center block py-2 px-3 text-white bg-green-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500 w-full"
                >
                  Sign In for Instructor
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar