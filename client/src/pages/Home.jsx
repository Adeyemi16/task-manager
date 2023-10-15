import { NavLink } from "react-router-dom";
import { CarouselFadeExample } from "../components";
import { Button } from "../components/ui/button";
import { PageLayout } from "../components";
import { useEffect } from "react";
export default function Home() {
  useEffect(() => {
    document.title = "Home"
  })
  return (
    <PageLayout>
      <div
        className="flex lg:flex-row flex-col  lg:align-middle lg:justify-between "
        style={{ height: "80vh", alignItems:"center" }}
      >
        <div
          className="w-auto flex flex-col justify-evenly lg:h-4/5 h-4/5 lg:gap-0 gap-5 lg:px-0 px-3"
          style={{width: "90%",  }}
        >
          <div className="flex flex-col">
            <p
              style={{
                color: "#292929",
                fontSize: "42px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "normal",
              }}
            >
              Manage your tasks on
            </p>
            <p
              style={{
                color: "#974FD0",
                fontSize: "45px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "normal",
              }}
            >
              TaskDuty
            </p>
          </div>
          <p
            style={{
              color: "#737171",
              fontSize: "19px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "normal",
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non tellus,
            sapien, morbi ante nunc euismod ac felis ac. Massa et, at platea
            tempus duis non eget. Hendrerit tortor fermentum bibendum mi nisl
            semper porttitor. Nec accumsan.
          </p>
          <NavLink className="lg:w-1/3 w-3/5  lg:h-1/6" to={"/tasks"}>
            <Button
              className="bg-purple-700 text-white hover:bg-primary/90 text-lg"
              style={{ width: "100%", height: "100%" }}
            >
              Go to my task
            </Button>
          </NavLink>
        </div>
        <div
          className="lg:px-20 lg:py-16 align-middle lg:w-4/5 w-96"
          style={{ height: "80vh", }}
        >
          <CarouselFadeExample />
        </div>
      </div>
    </PageLayout>
  );
}
