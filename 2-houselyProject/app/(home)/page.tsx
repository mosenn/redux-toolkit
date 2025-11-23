import React from "react";
import HydrationHomeList from "../components/hydration-homes/hydration-home-list";
import HomeListSSR from "../components/home-list-ssr/homse-list-ssr";

const HomePage = () => {
  return (
    <div>
      <h1>Home</h1>
      {/* //* hydration-react-query-ssr is active  */}
      {/* <HydrationHomeList /> */}
      {/* just ssr */}
      <HomeListSSR activebtn={false}/>
    </div>
  );
};

export default HomePage;
