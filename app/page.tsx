"use client";

import TopographicBackground from "./components/TopographicBackground";
import ThreeModel from "./components/ThreeModel";

const projects = [
  {
    id: 1,
    title: "Projet 1",
    description: "inflatable wing",
    modelType: "wing" as const,
    tags: ["CAO", "Simulation", "Prototypage"],
  },
  {
    id: 2,
    title: "Projet 2",
    description: "kickstarter project",
    modelType: "projet2" as const,
    tags: ["Analyse", "Design", "Fabrication"],
  },
  {
    id: 3,
    title: "Projet 3",
    description: "hive robotics projet",
    modelType: "projet3" as const,
    tags: ["Optimisation", "Tests", "Production"],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <TopographicBackground />
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dimitry Portfolio</h1>
            <div className="flex gap-6">
              <a href="#about" className="text-slate-300 hover:text-white transition">À propos</a>
              <a href="#projects" className="text-slate-300 hover:text-white transition">Projets</a>
              <a href="#contact" className="text-slate-300 hover:text-white transition">Contact</a>
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section id="about" className="mb-20 text-center py-12">
          <h2 className="text-5xl font-bold text-white mb-6">
            Ingénieur Mécanique
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Passionné par l'innovation et le design mécanique, je crée des solutions techniques pour résoudre des problèmes complexes.
          </p>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-20">
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            Mes Projets
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <a
                key={project.id}
                href={`/projects/${project.id}`}
                className="bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer block border border-slate-700"
              >
                <div className="relative h-64 bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <ThreeModel
                    modelType={project.modelType}
                    scaleMultiplier={project.id === 1 ? 1.6 : 1}
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-white mb-2">
                    {project.title}
                  </h4>
                  <p className="text-slate-300 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-900/50 text-blue-200 rounded-full text-sm border border-blue-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 text-blue-400 font-medium flex items-center gap-2">
                    Voir les détails →
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="text-center py-12 bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-slate-700">
          <h3 className="text-3xl font-bold text-white mb-4">
            Me Contacter
          </h3>
          <p className="text-slate-300 mb-6">
            Vous avez un projet ? N'hésitez pas à me contacter.
          </p>
          <a
            href="mailto:contact@example.com"
            className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
          >
            Envoyer un email
          </a>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-slate-400">
          <p>© 2026 Dimitry - Ingénieur Mécanique. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
