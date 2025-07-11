# MikeHubLab - Piattaforma E-commerce Tech

**MikeHubLab** è un'applicazione web e-commerce completa, costruita con React, che simula un negozio online specializzato in componenti per computer, hardware e periferiche. Il progetto presenta un'interfaccia utente moderna e pulita, un sistema di gestione dello stato robusto (Redux + Context API) e un pannello di amministrazione funzionale per la gestione dei prodotti.


## Funzionalità Implementate

-   **Catalogo Prodotti Dinamico:** Visualizzazione dei prodotti caricati da un backend mock, con la possibilità di filtrare per categoria e sottocategoria.
-   **Ricerca Testuale:** Funzionalità di ricerca per trovare rapidamente prodotti specifici.
-   **Pagine Dettaglio Prodotto:** Ogni prodotto ha una pagina dedicata con immagini multiple, descrizione, prezzo e opzioni di acquisto.
-   **Carrello Funzionante:** Sistema completo per aggiungere, aggiornare la quantità e rimuovere articoli dal carrello.
-   **Autenticazione Utenti:** Flusso di registrazione e login gestito tramite Redux, con lo stato dell'utente mantenuto nell'applicazione.
-   **Homepage Dinamica:** Una sezione di apertura con un banner d'impatto e un video a tema.
-   **Pagina di Contatto con Form:** Una pagina di contatto funzionale con un form per inviare messaggi.
-   **Pannello di Amministrazione :** Un'area protetta (`/admindashboard`) che permette di Creare, Leggere, Aggiornare ed Eliminare prodotti dal database.

## Stack Tecnologico

-   **Frontend:**
    -   [React](https://reactjs.org/) (v18+)
    -   [React Router DOM](https://reactrouter.com/) per la gestione delle rotte.
    -   [Vite](https://vitejs.dev/) come ambiente di sviluppo e build tool.
-   **Styling:**
    -   [Tailwind CSS](https://tailwindcss.com/) per un design rapido e responsivo basato su utility-class.
-   **State Management:**
    -   **Redux & Redux Thunk:** per la gestione dello stato di autenticazione globale.
    -   **Context API:** per la gestione dello stato del negozio (prodotti, carrello, ecc.).
-   **Backend (Mock):**
    -   [json-server](https://github.com/typicode/json-server) per simulare un'API RESTful partendo da un file `db.json`.
-   **Librerie Aggiuntive:**
    -   [axios](https://axios-http.com/) per effettuare chiamate HTTP al backend.
    -   [react-toastify](https://fkhadra.github.io/react-toastify/introduction) per visualizzare notifiche all'utente.

## Struttura del Progetto
```
├── frontend/
│   ├── public/
│   │   ├── images/       # Immagini dei prodotti
│   │   └── video/        # Video per la homepage
│   ├── src/
│   │   ├── assets/       # Icone e immagini statiche
│   │   ├── components/   # Componenti React riutilizzabili
│   │   ├── context/      # React Context (ShopContext)
│   │   ├── pages/        # Componenti che rappresentano le pagine
│   │   └── redux/        # Configurazione di Redux (actions, reducers, store)
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── db.json               # Database per json-server
└── README.md             # Questo file
```
## Installazione e Avvio

Per eseguire il progetto in locale, segui questi passaggi.

1.  **Clona il Repository**
    ```bash
    git clone [https://github.com/tuo-username/tuo-repo.git](https://github.com/tuo-username/tuo-repo.git)
    cd tuo-repo
    ```

2.  **Installa le Dipendenze del Frontend**
    ```bash
    cd frontend
    npm install
    ```

3.  **Avvia il Backend Mock**
    Apri un **nuovo terminale**. Posizionati nella cartella radice del progetto (quella che contiene `db.json`) e lancia questo comando:
    ```bash
    # Il server rimarrà in ascolto su http://localhost:3001
    json-server --watch db.json --port 3001
    ```

4.  **Avvia il Frontend**
    Torna al primo terminale (quello nella cartella `frontend`) e avvia il server di sviluppo:
    ```bash
    npm run dev
    ```
    L'applicazione sarà accessibile all'indirizzo `http://localhost:5173` (o la porta indicata nel terminale).
