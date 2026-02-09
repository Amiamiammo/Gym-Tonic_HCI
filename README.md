# GymTonic

GymTonic è una web application full-stack progettata per aiutare gli utenti a creare routine di allenamento personalizzate, imparare la corretta esecuzione degli esercizi e testare le proprie conoscenze attraverso quiz interattivi. L'applicazione include un sistema di gamification con livelli e badge di achievement.

## Indice

- [Tech Stack](#tech-stack)
- [Struttura del Progetto](#struttura-del-progetto)
- [Funzionalità](#funzionalità)
- [Installazione](#installazione)
- [Avvio](#avvio)
- [Database](#database)
- [API Endpoints](#api-endpoints)

## Tech Stack

### Frontend

- **React 18** con **Vite** come bundler
- **Material-UI (MUI)** per i componenti UI
- **Three.js** / **React Three Fiber** per il modello 3D interattivo
- **React Router v6** per la navigazione
- **React Player** per la riproduzione dei video tutorial
- **Bootstrap** e **styled-components** per lo styling

### Backend

- **Node.js** con **Express**
- **Passport.js** per l'autenticazione (strategia locale con sessioni)
- **SQLite3** come database
- **express-validator** per la validazione degli input

## Struttura del Progetto

```
HCI Code/
├── client/                     # Frontend React
│   ├── public/                 # Asset statici (modello 3D, immagini)
│   ├── src/
│   │   ├── App.jsx             # Router e gestione stato principale
│   │   ├── API.js              # Servizio centralizzato per le chiamate API
│   │   ├── Homepage.jsx        # Homepage con modello 3D
│   │   ├── ThreeFiber.jsx      # Modello 3D interattivo del corpo umano
│   │   ├── Exercises.jsx       # Browser degli esercizi
│   │   ├── Exercise.jsx        # Dettaglio singolo esercizio
│   │   ├── DailyTraining.jsx   # Gestione allenamento giornaliero
│   │   ├── Quiz.jsx            # Lista quiz disponibili
│   │   ├── QuizPage.jsx        # Interfaccia domande/risposte
│   │   └── ...                 # Altri componenti UI
│   ├── package.json
│   └── vite.config.js
│
└── server/                     # Backend Express
    ├── index.js                # Server Express e definizione route API
    ├── dao.js                  # Data Access Object (esercizi, quiz, training)
    ├── user-dao.js             # Autenticazione e gestione utenti
    ├── db.js                   # Connessione SQLite
    ├── populatedb.sql          # Script SQL per inizializzare il database
    ├── gymTonic.db             # Database SQLite
    └── package.json
```

## Funzionalità

### Homepage con Modello 3D Interattivo

La homepage presenta un modello 3D del corpo umano realizzato con Three.js. L'utente può cliccare sui diversi gruppi muscolari per visualizzare gli esercizi disponibili per quella zona. In homepage viene inoltre mostrato il badge corrispondente al livello raggiunto dall'utente.

### Libreria Esercizi

Un catalogo completo di esercizi organizzati per **10 gruppi muscolari**: Petto, Addome, Schiena, Spalle, Bicipiti, Tricipiti, Avambracci, Glutei, Quadricipiti e Polpacci. Ogni esercizio include:

- Video tutorial da YouTube
- Consigli per la corretta esecuzione
- Errori comuni da evitare
- Immagini illustrative

### Allenamento Giornaliero

L'utente può costruire la propria routine di allenamento quotidiano:

- Aggiungere esercizi alla lista giornaliera
- Segnare gli esercizi come completati tramite checkbox
- Sostituire un esercizio con un altro dello stesso gruppo muscolare
- Rimuovere singoli esercizi o svuotare l'intera routine

### Sistema Quiz

Quiz a risposta multipla che si sbloccano al raggiungimento di determinate soglie di esercizi completati. Ogni gruppo muscolare ha il proprio quiz con domande specifiche. Al termine del quiz viene fornito un feedback immediato con evidenziazione delle risposte corrette e sbagliate. Per superare un quiz servono almeno 3 risposte corrette.

### Sistema di Livelli e Badge

Un sistema di gamification incentiva l'utente a progredire:

| Livello | Badge |
|---------|-------|
| 0 – 4 | Beginner |
| 5 – 9 | Determined Athlete |
| 10 – 14 | Master Of Endurance |
| 15 | Fitness Champion |

Superare i quiz fa salire di livello e sbloccare nuovi badge.

### Navigazione

Una barra di navigazione fissa in basso con 4 sezioni principali: **Home**, **Exercises**, **Daily Training** e **Quiz**.

## Installazione

### Prerequisiti

- [Node.js](https://nodejs.org/) (con npm)

### Passi

1. **Clona la repository:**

   ```bash
   git clone <url-repository>
   cd Human-Computer-Interact_Gym-Tonic/HCI Code
   ```

2. **Installa le dipendenze del frontend:**

   ```bash
   cd client
   npm install
   ```

3. **Installa le dipendenze del backend:**

   ```bash
   cd ../server
   npm install
   ```

## Avvio

L'applicazione richiede due terminali separati: uno per il server backend e uno per il client frontend.

**Terminale 1 — Backend (porta 3001):**

```bash
cd "HCI Code/server"
node index.js
```

**Terminale 2 — Frontend (porta 5173):**

```bash
cd "HCI Code/client"
npm run dev
```

Una volta avviati entrambi, aprire il browser all'indirizzo `http://localhost:5173`.

### Build di Produzione

```bash
cd "HCI Code/client"
npm run build     # Genera la cartella dist/ ottimizzata
npm run preview   # Anteprima della build di produzione
```

## Database

Il database SQLite (`gymTonic.db`) è già pre-popolato con dati di esempio. Lo schema comprende le seguenti tabelle:

| Tabella | Descrizione |
|---------|-------------|
| `users` | Utenti registrati con credenziali e livello |
| `musclegroups` | I 10 gruppi muscolari |
| `exercises` | Catalogo esercizi con link video, consigli ed errori |
| `quiz` | Quiz associati ai gruppi muscolari |
| `questions` | Domande dei quiz |
| `answers` | Risposte con indicazione della correttezza |
| `dailytraining` | Esercizi nell'allenamento giornaliero dell'utente |

Per reinizializzare il database è possibile eliminare `gymTonic.db` e ricreare lo schema tramite lo script `populatedb.sql`.

## API Endpoints

### Autenticazione

| Metodo | Endpoint | Descrizione |
|--------|----------|-------------|
| POST | `/api/sessions` | Login |
| GET | `/api/sessions/current` | Utente corrente |
| DELETE | `/api/sessions/current` | Logout |

### Esercizi e Gruppi Muscolari

| Metodo | Endpoint | Descrizione |
|--------|----------|-------------|
| GET | `/api/musclegroups` | Tutti i gruppi muscolari |
| GET | `/api/musclegroups/:id` | Esercizi di un gruppo muscolare |
| GET | `/api/exercises` | Tutti gli esercizi |
| GET | `/api/exercises/:id` | Dettaglio singolo esercizio |

### Allenamento Giornaliero

| Metodo | Endpoint | Descrizione |
|--------|----------|-------------|
| GET | `/api/dailytraining` | Lista allenamento giornaliero |
| POST | `/api/dailytraining` | Aggiungi esercizio |
| PUT | `/api/dailytraining` | Segna esercizio come fatto/non fatto |
| PUT | `/api/dailytraining/swap` | Sostituisci esercizio |
| DELETE | `/api/dailytraining` | Svuota allenamento |
| DELETE | `/api/dailytraining/:id` | Rimuovi singolo esercizio |

### Quiz e Livello

| Metodo | Endpoint | Descrizione |
|--------|----------|-------------|
| GET | `/api/quizzes` | Tutti i quiz |
| GET | `/api/quizzes/:id` | Dettaglio quiz |
| GET | `/api/questions/:id` | Domande di un quiz |
| GET | `/api/answers/:id` | Risposte di un quiz |
| GET | `/api/userlevel` | Livello utente corrente |
| PUT | `/api/userlevel` | Incrementa livello |
| PUT | `/api/quiz/:id` | Segna quiz come superato |
