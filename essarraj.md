# WebApp gestione e prenotazione viaggi
## PROBLEMA:

## SPECIFICA DEI REQUISITI:
### REQUISITI FUNZIONALI
#### Registrazione e autenticazione:
- Registrazione degli utenti con email e password
- Autenticazione utenti con email e password o social (Facebook, Google)
#### Gestione profilo utente:
- Modifica dei dati personali
- Aggiunta foto profilo
#### Ricerca viaggi:
- Funzionalità per ricercare il viaggio con data sia di ritorno che di andata oppure solo andata
- Visualizzazione della ricerca in modo dettagliato con prezzi, orari dei voli e compagnie aeree
- Possibilità di selezionare e prenotare il viaggio
#### Pagamenti:
- Inserimento dei dettagli dei passeggeri dopo aver selezionato il viaggio da prenotare
- Gestione pagamento attraverso varie opzioni (PayPal, carta di credito ecc...)
- Riepilogo della prenotazione e conferma del pagamento
#### Conferme e notifiche:
- Notifica di conferma del pagamento tramite email
- Notifica di eventuale variazioni di orari dei voli
#### Gestione viaggi:
- Possibilità di gestire il viaggio prenotato in un'apposita sezione in modo da modificare la data o cancellare il viaggio
#### Gestione delle recensioni: 
- Possibilità di lasciare una recensione o valutazione per un volo o alloggio
#### Mappe per visualizzare la destinazione:
- Visualizzazione di mappe per la destinazione
#### Assistenza clienti:
- Assitenza chat con il gestore
### REQUISITI NON FUNZIONALI
#### Compatibilità
- Garantire che il sito sia compatibile con tutti i dispositivi e browser
## PROBLEMI: 
- Trovare delle infromazioni che siano affidabili su destinazioni, voli e alloggi
- Mantenere traccia delle prenotazioni dei documenti e delle conferme
- Assistenza clienti per problemi durante il viaggio.

## SOLUZIONI: 
- Implementazioni di ricerca avanzato che consente agli utenti di cercare e confrontare le opzioni disponibili 
- Implementazione di un'area personale per gli utenti che permette di tenere traccia delle prenotazioni e ricevere dei promemoria 
- Implementazione di area di assistenza per gli utenti per eventuali problemi

## CASI D'USO:
### Gestire profilo:
- Attore: Utente
- Scenario: l'utente dopo aver effettuato il login all'applicazione, entra nella sezione utente per visualizzare i propri dati personali, informazioni di pagamento ecc...
### Ricerca viaggio:
- Attore: Utente
- Scenario: L'utente entra nella sezione della ricerca e in base alle sue esigenze di budget, destinazione e compagnia area, che potrà selezionare in una sezione filtri, verrà effettuata la ricerca
### Recensioni:
- Attore: Utente
- Scenario: L'utente dopo aver effettuato il viaggio potrà inserire una valutazione positiva o negativa, nella sezione utente -> viaggi effettuati, in modo da dare un idea ad un possibile utente che               vorrà utilizzare la stessa compagnia aerea o hotel
