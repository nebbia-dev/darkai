# DARKAI — Grillz Configurator

DARKAI è un configuratore 3D per progettare grillz personalizzati, calcolarne il prezzo e completare l'ordine online. L'applicazione combina un'esperienza WebGL in tempo reale con gestione di configurazioni, scansioni dentali, pagamenti e backoffice.

## Funzionalità

- configurazione 3D di denti singoli e design multipli;
- scelta di modello, finitura, caratura dell'oro, pietre e signature design;
- personalizzazione opzionale del packaging;
- aggiornamento del prezzo in tempo reale e cronologia undo/redo;
- salvataggio locale della configurazione e invio del riepilogo via email;
- acquisizione dello screenshot del prodotto e upload della scansione dentale STL;
- checkout embedded Stripe con carta e, nei Paesi idonei, Klarna;
- calcolo delle spese di spedizione per area geografica;
- area amministrativa autenticata per ordini, configurazioni e clienti;
- esportazione CSV dei dati di backoffice.

## Stack tecnologico

- [Next.js 16](https://nextjs.org/) con App Router, Server Components e Server Actions;
- [React 19](https://react.dev/) e TypeScript;
- [Three.js](https://threejs.org/), React Three Fiber e Drei per il rendering 3D;
- Zustand e Immer per lo stato del configuratore;
- Tailwind CSS 4 e Material UI 7 per l'interfaccia;
- Supabase per autenticazione, database e object storage;
- Stripe Embedded Checkout per i pagamenti;
- Nodemailer per le email transazionali;
- Netlify con il plugin ufficiale Next.js per il deployment.

## Prerequisiti

- Node.js `>= 20.9.0`;
- npm;
- un progetto Supabase configurato;
- un account Stripe e le relative chiavi API;
- un server SMTP, se si vuole abilitare l'invio delle configurazioni via email.

## Installazione

Installa le dipendenze:

```bash
npm ci
```

Crea un file `.env.local` nella root del progetto e aggiungi le variabili descritte nella sezione seguente. Il file è già escluso da Git.

Avvia quindi l'ambiente di sviluppo:

```bash
npm run dev
```

L'applicazione sarà disponibile su [http://localhost:3000](http://localhost:3000).

## Variabili d'ambiente

```dotenv
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
NEXT_SUPABASE_SECRET_KEY=your-service-role-key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_STRIPE_SECRET_KEY=sk_test_...
NEXT_STRIPE_WEBHOOK_SECRET=whsec_...

# URL pubblico dell'applicazione
NEXT_PUBLIC_DOMAIN=http://localhost:3000

# SMTP — necessario per l'invio delle configurazioni
NEXT_SMTP_SERVER_HOST=smtp.example.com
NEXT_SMTP_SERVER_PORT=587
NEXT_SMTP_SERVER_USERNAME=your-username
NEXT_SMTP_SERVER_PASSWORD=your-password
NEXT_SITE_MAIL_SENDER=no-reply@example.com
```

Le variabili con prefisso `NEXT_PUBLIC_` sono incluse nel bundle client. Le chiavi service role di Supabase, le chiavi segrete Stripe e le credenziali SMTP non devono mai usare quel prefisso né essere committate.

`NEXT_SMTP_SERVER_PORT` è facoltativa e usa `587` come valore predefinito. La porta `465` abilita automaticamente una connessione SMTP sicura.

## Configurazione Supabase

Il progetto si aspetta le seguenti risorse:

### Tabelle

- `No_Stone`, `Bezel`, `Pave`, `Signature` e `Packaging` per il listino;
- `Shipping_Fees` per i costi di spedizione;
- `Configs` per configurazioni, totale, packaging e screenshot;
- `Customers` per dati anagrafici e scansione dentale;
- `Orders` per ordine, indirizzo di spedizione, totale e stato.

Le relazioni usate dal backoffice sono:

- `Orders.user_id` → `Customers.id`;
- `Orders.config_id` → `Configs.id`.

### Storage

Sono richiesti i bucket `configs` e `scans`. L'app genera signed upload URL lato server e salva nel database il path restituito da Supabase. I file che devono essere visualizzati o allegati alle email devono essere accessibili tramite il relativo public URL.

### Autenticazione

L'area `/admin` usa Supabase Auth con email e password. Crea almeno un utente amministrativo e configura policy RLS coerenti con le operazioni di lettura eseguite dal backoffice.

> Il repository non contiene migrazioni o seed del database: schema, relazioni, policy, listino e tariffe di spedizione devono essere predisposti nel progetto Supabase prima dell'avvio.

## Configurazione Stripe

Il checkout crea una sessione embedded in euro e associa gli ID di ordine, configurazione e cliente ai metadata Stripe. Gli ordini vengono finalizzati sia dal return flow sia dal webhook, così da coprire anche i metodi di pagamento asincroni.

Configura in Stripe un webhook con endpoint:

```text
https://your-domain.example/api/stripe/webhook
```

Eventi richiesti:

- `checkout.session.completed`;
- `checkout.session.async_payment_succeeded`.

Per lo sviluppo locale puoi usare Stripe CLI:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Copia il signing secret restituito dalla CLI in `NEXT_STRIPE_WEBHOOK_SECRET`.

## Percorsi principali

| Percorso | Descrizione |
| --- | --- |
| `/` | Configuratore 3D pubblico |
| `/checkout/payment` | Dati cliente, upload scansione e checkout Stripe |
| `/checkout/payment/return` | Verifica del risultato del pagamento |
| `/checkout/payment/success` | Conferma dell'ordine |
| `/checkout/payment/error` | Gestione del pagamento non riuscito |
| `/login` | Accesso al backoffice |
| `/admin/orders` | Elenco e gestione degli ordini |
| `/admin/configs` | Elenco e dettaglio delle configurazioni |
| `/admin/customers` | Elenco clienti |

## Struttura del progetto

```text
darkai/
├── public/                       # Modelli 3D, texture, icone, video ed environment map
├── src/app/
│   ├── _components/              # UI, scena 3D, materiali e geometrie dei denti
│   ├── _helpers/                 # Checkout, database, upload, email e calcoli
│   ├── _stores/teeth.ts          # Stato e cronologia del configuratore
│   ├── _types/                   # Tipi TypeScript del dominio
│   ├── admin/                    # Backoffice protetto
│   ├── api/                      # Webhook e route di upload/finalizzazione
│   ├── checkout/                 # Flusso di acquisto
│   └── page.tsx                  # Entry point del configuratore
├── src/lib/                      # Client Supabase, SMTP e utility server
├── proxy.ts                      # Refresh e controllo della sessione Supabase
├── next.config.ts                # Configurazione Next.js e immagini Supabase
└── netlify.toml                  # Build e plugin Next.js per Netlify
```

## Flusso applicativo

1. La home carica il listino da Supabase e inizializza il configuratore.
2. Le modifiche aggiornano lo stato Zustand, la cronologia e il totale in tempo reale.
3. Al checkout l'app acquisisce lo screenshot, conserva la configurazione e carica gli eventuali file su Supabase Storage.
4. Una Server Action crea cliente, configurazione e ordine, poi inizializza Stripe Embedded Checkout.
5. Il return flow o il webhook conferma il pagamento e aggiorna lo stato dell'ordine.
6. Il backoffice autenticato consente di consultare ed esportare i dati prodotti dal flusso.

## Script disponibili

| Comando | Descrizione |
| --- | --- |
| `npm run dev` | Avvia Next.js in sviluppo con Webpack |
| `npm run build` | Genera la build di produzione |
| `npm run start` | Avvia la build di produzione |
| `npm run lint` | Esegue il comando lint configurato nel progetto |

Per verificare una build locale:

```bash
npm run build
npm run start
```

## Deployment su Netlify

Il repository include `netlify.toml` e `@netlify/plugin-nextjs`. Nel pannello Netlify:

1. configura tutte le variabili d'ambiente di produzione;
2. usa `npm run build` come build command;
3. registra l'URL pubblico del webhook in Stripe;
4. verifica che l'URL Supabase usato in produzione corrisponda ai remote pattern definiti in `next.config.ts`.

## Note di sviluppo

- La configurazione in corso viene salvata anche in `localStorage` con le chiavi `DARKAI Configuration` e `DARKAI Configuration Pack`.
- I prezzi e le tariffe non sono hardcoded nell'interfaccia: vengono letti da Supabase.
- Le route amministrative sono protette da `proxy.ts` e dal layout server di `/admin`.
- Il service role client viene creato solo lato server e non deve essere importato nei componenti client.
- Il webhook Stripe deve essere raggiungibile senza una sessione utente; verifica che le regole del proxy lo escludano dalla protezione prima del deployment.

## Stato dei controlli automatici

Al momento il repository non contiene una suite di test automatizzati. Inoltre, con Next.js 16 lo script `next lint` presente in `package.json` deve essere sostituito con un comando ESLint CLI prima di poter essere usato come controllo CI.
