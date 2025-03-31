# 💸 Local Personal TestNet Wallet with Onchain Wallet

Ce projet est une interface Web3 développée avec **React**, **TypeScript**, **TailwindCSS** et une intégration prévue avec **Electron** (en cours de développement) a des fins experimentals.

L'application permet de :
- Consulter le solde de votre wallet on-chain.
- Envoyer de l'ETH vers un smart contract.
- Retirer de l'ETH depuis le smart contract.

## 📦 Stack technique

- **Frontend** : React + TypeScript
- **Styling** : TailwindCSS
- **Blockchain** : Ethereum (Smart Contract en Solidity)
- **Electron** : Intégration prévue pour une version desktop (non encore supportée)

---

## ⚙️ Installation & Lancement

### 1. Cloner le projet

```bash
git clone https://github.com/therepo
cd wallet
npm install
```

### 2. Lancer le front
```bash
npm run dev
```
### 2.1 Enlever l'appel electron du package.json (si necessaire)
```bash 
Avant -> "dev": "concurrently \"vite\" \"wait-on http://localhost:5173 && electron electron/main.js\"",
Apres -> "dev": "vite",
```

## Smarts Contracts

### Installer Hardhat
```bash
npm install --save-dev hardhat
```

###  Initialiser le projet Hardhat (si nécessaire)
```bash
npx hardhat
```

### Compiler les contrats
```bash
npx hardhat compile
```

### Lancer une blockchain locale (Hardhat)
```bash
npx hardhat node
```

### Déployer les contrats localement
```bash
npx hardhat run scripts/deploy.cjs --network localhost
```

### S'assurer d'utiliser l'adresse du contrat correct dans App.tsx
```bash
const walletAddress = "Votre Adresse contrat (Sortie de npx hardhat run scripts/deploy.cjs --network localhost)";
```

##  État de l'intégration Electron
### Une version Electron (Desktop App) est en cours de développement pour permettre une utilisation hors navigateur. Cette fonctionnalité n'est pas encore stable ou disponible.

# Ajout des Wallets et réseau TestsNet dans vos Web3 Wallets (Metamask, Trust Wallet etc....)

## Metamask 
- Ouvrir Metamask
- Se connecter

### Ajouter le réseau
- Sélectionner un réseau
- Descende en bas et cliquez sur 'Ajouter un réseau personnalisé'
- Nom du réseau : le nom que vous souhaitez
- URL par défaut du RPC : 127.0.0.1:8545
- ID de chaîne : 1337
- Symbole de la devise : ETHq
- URL de l’explorateur de blocs : Vide
- Enregistrer

###
- Sélection des comptes 
- Ajouter un compte ou un portefeuille matériel
- Importer le compte
- Collé une des clés privées dans la sortie de votre npx hardhat node
- Example : 
```bash
Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae7
```
- Vous copiez collé la clé privé