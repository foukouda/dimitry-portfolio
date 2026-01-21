'use client';

import { use } from 'react';
import Link from 'next/link';
import ThreeModel from '../../components/ThreeModel';

const projectsData = {
  '1': {
    id: 1,
    title: "Projet 1 - Inflatable wing",
    modelType: "wing" as const,
    tags: ["CAO", "Simulation", "Prototypage", "science des matériaux"],
    description: "Conception et validation d'une aile gonflable pour drones de type avion",
    longDescription: `J'ai mené un projet complet de conception et de validation d'une aile gonflable destinée à des drones de type avion, avec un objectif clair : maintenir un profil aérodynamique fiable malgré la pression interne et les charges rencontrées en vol. Pour répondre à cette problématique, j'ai travaillé sur la définition de la géométrie de l'aile (profil NACA 2412) et sur l'architecture interne, en développant une structure inspirée du drop-stitch à partir d'un maillage kagome, afin de mieux contrôler la rigidité, la tenue de forme et la répartition des efforts.

Le prototype a été réalisé en TPU imprimé en 3D par SLS, ce qui m'a amené à intégrer des contraintes de fabrication additive dès la conception (choix de structure, épaisseurs, zones critiques, assemblage). J'ai ensuite construit une démarche de validation expérimentale et de corrélation numérique : caractérisation du matériau via essais de traction (type ASTM D638), analyse des données (contrainte/déformation, déplacement), et contrôle géométrique par scan 3D pour mesurer précisément la déformation et la conservation du profil. En parallèle, j'ai réalisé des simulations (pression interne + charges extérieures, avec une logique de couplage structure/aéro selon les cas) pour comparer les résultats numériques aux mesures réelles, identifier les écarts, comprendre les mécanismes de déformation et orienter les itérations de conception.

Enfin, le projet ne s'est pas limité au prototype : il ouvre aussi une voie "industrialisation" grâce au choix du TPU, en explorant des solutions de post-traitement et d'assemblage (thermique et/ou chimique) adaptées à des pièces grandes et complexes, là où d'autres approches (notamment résine) sont plus limitées. Au final, ce travail m'a permis de mobiliser à la fois des compétences en conception mécanique, fabrication additive, expérimentation, analyse de données, et simulation, avec une approche itérative orientée performance et validation.`,
    technologies: ["SolidWorks", "ANSYS", "MATLAB", "Impression 3D"],
    images: [
      "/projects/projet1/image.png",
    ],
  },
  '2': {
    id: 2,
    title: "Projet 2 - Kickstarter carrousel Lofi data tracker",
    modelType: "projet2" as const,
    tags: ["Analyse", "Design", "Fabrication","kickstarter","design produit"],
    description: "Lofi data tracker hardware product design",
    longDescription: `Carrousel est un projet de produit hardware "luxury lo-fi" conçu pour rendre le suivi de données plus simple, plus calme et plus tangible.
L'idée de base : consulter des métriques utiles sans retomber automatiquement dans le réflexe "écran + notifications".
Le produit propose une interaction physique (contrôles tactiles) et un retour visuel clair pour parcourir des indicateurs en quelques secondes.
Carrousel vise une expérience "calm tech" : minimaliste, agréable, et pensée pour durer.
Le projet combine une approche design produit premium et une contrainte forte de faisabilité industrielle.
J'ai structuré le concept autour d'usages concrets : sélectionner, comparer et comprendre une donnée sans friction.
Une attention particulière a été portée à l'ergonomie (lecture rapide, logique de navigation, feedback).
Côté technique, le projet couvre l'architecture électronique, le choix des composants et la logique d'interface.
Le prototypage a servi à valider la prise en main, la lisibilité et la cohérence globale de l'objet.
En parallèle, j'ai travaillé la logique de coûts (BOM), les arbitrages composants et les options de fabrication.
Le produit est pensé pour passer du prototype à une production en petite série, avec une roadmap claire.
Carrousel intègre aussi une dimension marque : positionnement premium, cohérence visuelle, et identité produit.
L'objectif final est de proposer un objet utile au quotidien, qui valorise la donnée sans la rendre envahissante.
Ce projet illustre ma capacité à relier vision produit, contraintes d'ingénierie et logique business.
Carrousel est une synthèse entre design, électronique, prototypage et préparation à l'industrialisation.`,
    technologies: ["Kickstarter", "Solidworks", "Python", "CNC","kicad","JLCPCB","3D printing"],
    images: [
      "/projects/projet2/aefa.jpeg",
    ],
  },
  '3': {
    id: 3,
    title: "Projet 3 - Hive-Robotics",
    modelType: "projet3" as const,
    tags: ["Optimisation", "Tests", "Production"],
    description: "Robot de livraison autonome pour environnements outdoors",
    longDescription: `HIVE-Robotics est un projet de robotique orienté innovation produit et prototypage rapide, où je conçois et industrialise des systèmes mêlant mécanique, électronique et software embarqué. L'objectif : créer des solutions robotiques fiables et réalistes à déployer, en s'appuyant sur une approche très "terrain" (tests, itérations, contraintes de fabrication, sécurité).

Ce que je fais concrètement

Conception mécanique : architecture, pièces sur-mesure, intégration, itérations orientées fabrication (impression 3D / usinage).

Électronique & PCB : choix composants, schémas, routage, capteurs/puissance, intégration et debug.

Embarqué & contrôle : firmware, drivers, communication (I2C/serial), mise au point et validation.

Prototypage & tests : plans d'essais, mesures, fiabilisation, corrections jusqu'à un système stable.

Gestion de projet : coordination, documentation, livrables, relation partenaires/sponsors.

Points forts du projet

Approche end-to-end (de l'idée → prototype fonctionnel).

Forte capacité d'itération (design → fabrication → test → amélioration).

Vision produit : robustesse, coût, intégration, maintenance, sécurité.

Technologies & outils (exemples)

CAO (SolidWorks), prototypage (impression 3D), électronique (KiCad), microcontrôleurs (STM32), programmation (Rust / C / Arduino selon besoin), tests & instrumentation.`,
    technologies: ["CATIA", "Abaqus", "Lean Manufacturing", "Six Sigma"],
    images: [
      "/projects/projet3/aa.jpeg",
    ],
  },
};

export default function ProjectDetailClient({ id }: { id: string }) {
  const project = projectsData[id as keyof typeof projectsData];

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Projet non trouvé</h1>
          <Link href="/" className="text-blue-600 hover:text-blue-700 underline">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour aux projets
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            {project.title}
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-6">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag: string, index: number) => (
              <span 
                key={index}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* 3D Model Viewer */}
        <div className="mb-12 bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="h-[500px]">
            <ThreeModel modelType={project.modelType} />
          </div>
        </div>

        {/* Description détaillée */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Description du projet
          </h2>
          <div className="text-slate-600 dark:text-slate-300 whitespace-pre-line leading-relaxed">
            {project.longDescription}
          </div>
        </div>

        {/* Technologies utilisées */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Technologies utilisées
          </h2>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech: string, index: number) => (
              <span 
                key={index}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Galerie d'images */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Galerie
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.images.map((image: string, index: number) => (
              <div key={index} className="aspect-video bg-slate-100 dark:bg-slate-700 rounded-lg overflow-hidden">
                <img 
                  src={image} 
                  alt={`${project.title} - Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
