import { InfinitySpin } from "react-loader-spinner";

export default function Loader({ title }) {
  return (
    <div
      className="flex flex-col align-middle justify-evenly w-48 h-48 px-4 py-4 mt-32 relative"
      style={{
        borderStyle: "solid",
        borderColor: "lightgrey",
        borderWidth: "thin",
        borderRadius: "12%",
        alignItems: "center",
        boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)",
        boxSizing: "border-box",
      }}
    >
      <div style={{ width: "100%" }}>
        <InfinitySpin
          height="120"
          width="120"
          radius="9"
          color="purple"
          ariaLabel="three-dots-loading"
          wrapperStyle
          wrapperClass
        />
      </div>

      <p className="text-xl font-normal">{title}</p>
    </div>
  );
}
