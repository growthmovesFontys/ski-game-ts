# Reken skiën
Reken skiën is een educatief spel voor kinderen op de basisschool met een leerachterstand. Dit wordt gebruikt ter ondersteuning van de extra huiswerk oefeningen die ze mee naar huis krijgen. Deze zijn vaak saai en demotiverend, waarbij Growthmoves een rol zal spelen om deze twee aspecten te verbeteren door het leerproces voor deze kinderen leuker en meer stimulerend te maken​​.

## De bedoeling van het spel
Het is een 2D spel waarbij je in de rol stapt als skiër. Tijdens het naar beneden skiën krijg je sommen te zien die je moet oplossen. Je hebt de keuze uit verschillende sprongen met een antwoord. Kies de juiste sprong en verdien zo punten. Je hebt 3 levens. Als je de verkeerde kiest, gaat er een leven af. Kan jij je score verbeteren?

## Hoe download ik dit
Clone deze repository op je eigen lokale pc. Als je dat gedaan hebt, moet je een aantal stappen doen om het werkend te maken met bijvoorbeeld de extensie Live Server voor Visual Studio Code. Houd er rekening mee dat je Node.js geïnstalleerd moet hebben op je pc.

### Open een nieuwe teminal en type dit:
```
npm install
```

PS: check of je in de juiste map zit.

### Dan type je dit in dezelfde terminal:
```
npx webpack
```

Open nu de public/dist/index.html met liveserver en je bent klaar om het spel te spelen.


## Hier heb je een kleine preview van het spel
![Reken skiën GIF](https://github.com/growthmovesFontys/ski-game-ts/blob/main/Reken-skiën-v1.gif)


# documentatie phaser.js 
Phaser.js is een krachtig HTML5 2D game framework dat ontwikkelaars in staat stelt om snel en efficiënt interactieve spellen te ontwikkelen. Het biedt ondersteuning voor zowel Canvas als WebGL, waardoor het flexibel en compatibel is met een breed scala aan apparaten.

## Kernfuncties van Phaser.js
Renderen: Phaser ondersteunt zowel Canvas als WebGL, waardoor het optimaal presteert op een breed scala aan apparaten.
Preloader: Eenvoudig beheer van game assets zoals afbeeldingen, audio en animaties.
Fysica: Ingebouwde ondersteuning voor populaire fysica-engines zoals Arcade Physics, Ninja Physics en de geavanceerde P2 Physics.
Input: Uitgebreide input-ondersteuning, inclusief toetsenbord, muis, touch en gamepad.
Animaties: Ondersteuning voor sprite-sheet animaties, particle systems, en meer.

## Aan de Slag met Phaser.js
Om te beginnen met Phaser, moet je eerst de Phaser-bibliotheek in je project opnemen. Dit kan door het downloaden van de Phaser bibliotheek of door het linken naar een CDN.

Voorbeeldcode: Een Basis Phaser Spel

```javascript
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload() {
    this.load.image('sky', 'assets/sky.png');
    // Voeg hier meer assets toe
}

function create() {
    this.add.image(400, 300, 'sky');
    // Creëer hier het spel
}

function update() {
    // Spellogica bijwerken
}
