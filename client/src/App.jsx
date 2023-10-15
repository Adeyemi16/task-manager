import "./App.css";
import { Toaster } from "react-hot-toast";
import { StateContext } from "./config/store";
import { Suspense, lazy } from "react";
import Loader from "./utils/Loader";
const Routespath = lazy(() => import("./routes/Routespath"));

function Load() {
  return (
    <div className="flex h-100 justify-center items-center">
      <Loader title={"Welcome to Task Manager"} />
    </div>
  );
}
function App() {
  return (
    <StateContext>
      <Toaster position="bottom-right" />
      <Suspense fallback={<Load />}>
        <Routespath />
      </Suspense>
    </StateContext>
  );
}

export default App;
