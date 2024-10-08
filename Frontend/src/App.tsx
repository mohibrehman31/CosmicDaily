import React from "react";
import ButtonGradient from "./assets/svg/ButtonGradient";
import Benefits from "./components/Benefits";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import { AsteroidDashboard } from "./components/AsteroidDashboard";
import { MarsWeatherDashboard } from "./components/MarsWeather";
import { Provider } from "react-redux";
import { store } from "./app/store";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header />
        <Hero />
        <MarsWeatherDashboard />
        <AsteroidDashboard />
        <Benefits />
        <Footer />
      </div>
      <ButtonGradient />
    </Provider>
  );
};

export default App;
