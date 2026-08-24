import { RouterProvider } from "react-router"
import { router } from "./app.routes.jsx"

function App() {

  return (
    <>
      <RouterProvider router={router} />  //router inside bracket is the router which we exported in app.routes.jsx page
    </>
  )
}

export default App
