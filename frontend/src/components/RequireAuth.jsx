
import { useContext } from "react"
import { Navigate } from "react-router"
import { AuthContext } from "../context/Auth"

const RequireAuth = ({ children }) => {
  const { user } = useContext(AuthContext)

  if (!user) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}

export default RequireAuth
