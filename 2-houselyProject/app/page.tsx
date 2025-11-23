import HomePage from "./(home)/page";
import Header from "./components/header/header";

export default function Home() {
  return (
    <div className="">
      <Header />

      <HomePage />
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <h1>FOOTER</h1>
    </div>
  );
}
