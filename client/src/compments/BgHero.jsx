import { NavLink } from "react-router-dom";

function BgHero() {
  return (
    <>
      {/* Hero section */}
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(src/assets/pexels-aleksandar-pasaric-1820770.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md pt-40">
            <h1 className="mb-5 text-5xl font-bold">
              Welcome to <br />
              It's Gravy Nights
            </h1>
            <p className="mb-5 text-lg">
              where luxury meets extravagance to offer you an unforgettable
              nightlife experience. Explore our exclusive options to make your
              evening as memorable as possible.
            </p>
            <NavLink to="/contact" className="btn btn-secondary mx-2">
              Contact
            </NavLink>
            <NavLink to="/offerings" className="btn mx-2">
              Offerings
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
export { BgHero };
