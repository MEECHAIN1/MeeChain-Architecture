
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Simulation } from './components/Simulation';
import { DeepDive } from './components/DeepDive';
import { Analysis } from './components/Analysis';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <div className="container mx-auto px-4 space-y-24 py-12">
          <section id="simulation">
            <Simulation />
          </section>
          
          <section id="details">
            <DeepDive />
          </section>
          
          <section id="analysis">
            <Analysis />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
