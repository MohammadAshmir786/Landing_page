import bg from "../assets/hero_bg.jpg";

export default function Hero() {
  return (
    <section
      className="hero relative bg-cover bg-center text-white h-screen"
      style={{
        backgroundImage: `url(${bg})`, // Replace with your image path
      }}
      id = "home"
    >

      {/* Content inside the hero */}
      <div className="hero-content z-10 p-8">
        <h1 className="text-4xl font-bold w-20">Consultaion, Design, & Marketing</h1>
      </div>
    </section>
  );
}
