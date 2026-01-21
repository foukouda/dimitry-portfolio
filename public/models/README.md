# Assets 3D - Guide d'utilisation

## 📁 Structure des fichiers

Placez vos modèles 3D dans ce dossier avec les noms suivants :

```
public/models/
├── projet1.glb      (ou .gltf)
├── projet2.glb
├── projet3.glb
└── README.md
```

## 🎨 Formats supportés

- **GLB** (recommandé) : Format binaire compact
- **GLTF** : Format JSON + fichiers séparés
- **FBX** : Supporté avec loader supplémentaire
- **OBJ** : Supporté avec loader supplémentaire

## 📏 Recommandations

### Taille des fichiers
- **Optimale** : < 5 MB par modèle
- **Maximum** : < 10 MB
- Utilisez [gltf-pipeline](https://github.com/CesiumGS/gltf-pipeline) pour compresser vos modèles

### Optimisation
```bash
# Installation de l'outil de compression
npm install -g gltf-pipeline

# Compression d'un modèle
gltf-pipeline -i input.gltf -o output.glb -d
```

### Échelle et orientation
- **Échelle** : Le modèle devrait tenir dans une boîte de 2x2x2 unités
- **Origine** : Centrez le modèle à l'origine (0, 0, 0)
- **Orientation** : Face avant vers +Z, haut vers +Y

### Matériaux
- Utilisez des matériaux PBR (Physically Based Rendering)
- Limitez le nombre de textures
- Résolution de texture recommandée : 1024x1024 ou 2048x2048

## 🔄 Utilisation dans le projet

Une fois vos modèles ajoutés, vous devrez mettre à jour le composant `ThreeModel.tsx` pour charger les fichiers au lieu des formes procédurales.

### Exemple de code (à ajouter dans ThreeModel.tsx) :

```typescript
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// Dans votre composant
useEffect(() => {
  const loader = new GLTFLoader();
  loader.load(
    '/models/projet1.glb',
    (gltf) => {
      scene.add(gltf.scene);
    },
    (progress) => {
      console.log('Loading:', (progress.loaded / progress.total) * 100, '%');
    },
    (error) => {
      console.error('Erreur de chargement:', error);
    }
  );
}, []);
```

## 🛠️ Outils recommandés

### Création/Export
- **Blender** : Gratuit, puissant
- **SolidWorks** : Export via plugins
- **Fusion 360** : Export GLB natif
- **Maya/3ds Max** : Avec exporteur GLTF

### Optimisation
- **gltf-pipeline** : Compression CLI
- **gltfpack** : Compression avancée
- **Blender** : Décimation et baking

### Visualisation
- **gltf.report** : Analyse en ligne
- **Three.js Editor** : Test rapide
- **Babylon.js Sandbox** : Prévisualisation

## 📝 Mapping des projets

Actuellement, les projets utilisent ces modèles :

| Projet | Fichier 3D | Type actuel |
|--------|-----------|-------------|
| Projet 1 - Inflatable wing | `projet1.glb` | cube |
| Projet 2 - Analyse et Design | `projet2.glb` | triangle |
| Projet 3 - Optimisation | `projet3.glb` | donut |

## ⚠️ Notes importantes

1. **Droits d'auteur** : Assurez-vous d'avoir les droits sur les modèles 3D
2. **Performance** : Testez sur mobile - les modèles trop lourds ralentissent le site
3. **Fallback** : Gardez les formes procédurales comme solution de secours
4. **Formats** : GLB est préféré car il contient tout dans un seul fichier

## 🚀 Prochaines étapes

1. Exportez vos modèles au format GLB
2. Placez-les dans ce dossier
3. Modifiez `app/components/ThreeModel.tsx` pour charger les fichiers
4. Testez dans le navigateur
5. Optimisez si nécessaire
