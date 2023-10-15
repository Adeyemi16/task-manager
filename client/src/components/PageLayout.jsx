export default function PageLayout({ children }) {
  return <div className="lg:px-20 lg:py-10 flex py-9 px-3 items-start relative" style={{minHeight: "90vh", height: "auto" , display: "flex", justifyContent: "center"}}>{children}</div>;
}
