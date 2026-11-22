import { RouterProvider } from "react-router"
import { router } from "./app.routes.jsx"
import { AuthProvider } from "./features/auth/auth.context.jsx"

function App() {

  return (
    <>
      <AuthProvider>  {/* we have wrapped whole app inside authprovide i.e in auth.context.jsx so that every components get user details easily */}

        {/* router inside => {router}<= is the router which we exported in app.routes.jsx page */}
        <RouterProvider router={router} />

      </AuthProvider>
    </>
  )
}

export default App
