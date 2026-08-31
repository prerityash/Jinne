import { RouterProvider } from "react-router"
import { router } from "./app.routes.jsx"
import { AuthProvider } from "./feature/auth/auth.context.jsx"

function App() {

  return (
    <>
      <AuthProvider>
        {/* router inside => {router}<= is the router which we exported in app.routes.jsx page */}
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  )
}

export default App
