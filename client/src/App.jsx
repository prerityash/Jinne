import { RouterProvider } from "react-router"
import { router } from "./app.routes.jsx"

function App() {

  return (
    <>
      {/* router inside => {router}<= is the router which we exported in app.routes.jsx page */}
      <RouterProvider router={router} />
    </>
  )
}

export default App
