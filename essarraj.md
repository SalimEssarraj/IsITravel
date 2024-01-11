# WebApp gestione e prenotazione viaggi

## VALUE PROPOSITION:
La mia WebApp è la soluzione per pianificare e organizzare i viaggi in modo semplice e efficente. Ti propongoi diversi strumenti:

- Pianificazione Persnalizzata: Puoi creare itinierari su misura in base ai tuoi interessi, budget e preferenze
- Gestione Unificata: Puoi tenere sotto controllo tutto con un'unica piattaforma. Archivia prenotazioni, biglietti e note importanti per accedere alle informazioni per il viaggio.
  
Tramite la mia applicazione la tua esperienza di pianificazione diventa leggera e fluida. Unisciti a me e trasforma ogni viaggio in un'epica avventura senza confini.

## PROBLEMA:
Il problema che risolve la mia WebApp è quello di poter consultare il costo di volo, alloggio di una vacanza da casa.
## SPECIFICA DEI REQUISITI:
### REQUISITI FUNZIONALI
#### Registrazione e autenticazione:
- Registrazione degli utenti 
- Autenticazione utenti 
#### Gestione profilo utente:
- Modifica dei dati personali
- Aggiunta foto profilo
#### Ricerca viaggi:
- Funzionalità per ricercare il viaggio con data sia di ritorno che di andata oppure solo andata
- Visualizzazione della ricerca in modo dettagliato con prezzi, orari dei voli e compagnie aeree
#### Prenotazione:
- Inserimento dei dettagli dei passeggeri dopo aver selezionato il viaggio da prenotare
- Riepilogo della prenotazione
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
### REQUISITI DI DOMINIO:
#### Pagamenti:
- Gestione pagamento attraverso varie opzioni (PayPal, carta di credito ecc...)

## CASI D'USO:
### Gestire profilo:
- Attore: Utente
- Scenario: l'utente dopo aver effettuato il login all'applicazione, entra nella sezione utente per visualizzare i propri dati personali, informazioni di pagamento ecc...
### Ricercare un viaggio:
- Attore: Utente
- Scenario: L'utente entra nella sezione della ricerca e in base alle sue esigenze di budget, destinazione e compagnia area, che potrà selezionare in una sezione filtri, per effettuare unaa ricerca
### Prenotare un viaggio:
- Attore: Utente
- Scenario: L'utente seleziona l'opzione che desidera selezionare e completa la prenotazione inserendo i dettagli dei passeggeri
### Gestire prenotazioni:
- Attore: Utente
- Scenario: L'utente modifica, elimina e visualizza le prenotazioni effettuate
### Notifiche: 
- Attore: Sistema
- Scenario: Il sistema invia all'utente aggiornamenti sul volo esempio (ritardi), promozioni o informazioni sul viaggio
### Assistenza clienti:
- Attore: Utente
- Scenario: L'utente può contattare il sistema per richiedere assistenza
### Pagamento viaggio:
- Attore: Utente
- Scenario: L'utente inserisce i propri dati della carta e effettua il pagamento
### Recensioni:
- Attore: Utente
- Scenario: L'utente dopo aver effettuato il viaggio può inserire una valutazione positiva o negativa in modo da dare un idea ad un possibile utente che vorrà utilizzare la stessa compagnia aerea o hotel

## USER STORIES

### Settimana 1:

#### Registrazione e Autenticazione (1 giorno):
- L'utente vuole poter registrare inserendo i dati personali (nome, email, password) per accedere al sito.
- L'utente registrato, vuole poter effettuare l'accesso utilizzando l'email e la password per accedere al profilo.
#### Gestione Profilo Utente (4 ore):
- L'utente, desidera poter modificare i dati personali (nome, foto del profilo) nel profilo utente.
- L'utente, vuole poter aggiungere o cambiare la foto del profilo.
#### Ricerca Viaggi (2 giorni e 4 ore):
- L'utente, vuole poter cercare voli inserendo le date di andata e ritorno o solo di andata, visualizzando dettagli come prezzi, orari dei voli e compagnie aeree.
#### Prenotazione (1 giorno):
- L'utente, vuole inserire i dettagli dei passeggeri dopo aver selezionato il volo da prenotare.
- L'utente, desidera visualizzare un riepilogo della prenotazione prima di confermarla.

### Settimana 2:

#### Conferme e Notifiche (1 giorno):
- L'utente, desidera ricevere una notifica di conferma del pagamento via email dopo aver effettuato la prenotazione.
- L'utente, vuole ricevere notifiche in caso di variazioni degli orari dei voli prenotati.
#### Gestione Viaggi (1 giorno):
- L'utente, vuole gestire i viaggi prenotati in una sezione dedicata, per modificare date o cancellare viaggi.
#### Gestione Recensioni (4 ore):
- L'utente, desidera poter lasciare recensioni o valutazioni per voli o alloggi che ha utilizzato.
#### Mappe per Visualizzare la Destinazione (4 ore):
- L'utente, vuole visualizzare mappe per le destinazioni dei viaggi prenotati.
#### Assistenza Clienti (1 giorno):
- L'utente, desidera poter accedere a un'assistenza via chat con il gestore del sito per domande o problemi.
#### Compatibilità (4 ore):
- L'utente, vuole poter accedere al sito da qualsiasi dispositivo o browser per garantire una buona esperienza utente.
#### Pagamenti (4 ore):
- L'utente, vuole poter effettuare pagamenti utilizzando varie opzioni come PayPal, carta di credito, ecc.


## DIAGRAMMA UML
<img src="https://yuml.me/diagram/usecase/[Utente]-(Gestire%20profilo%20utente),(Gestire%20profilo%20utente)%3E(Login),[Utente]-(Ricercare%20il%20viaggio),(Ricercare%20il%20Viaggio)%3C(Filtri%20sulla%20ricerca),(Ricercare%20il%20viaggio)%3C(Login),[Utente]-(Prenotare%20un%20viaggio),(Prenotare%20un%20viaggio)%3E(Login),[Utente]-(Pagamento%20viaggio),(Pagamento%20viaggio)%3E(Prenotare%20un%20viaggio),[Utente]-(Gestire%20prenotazioni),(Gestire%20prenotazioni)%3E(Login),[Utente]-(Ricevere%20notifiche%20su%20viaggi%20e%20promozioni),(Ricevere%20notifiche%20su%20viaggi%20e%20promozioni)%3E(Login),(Assistenza%20clienti)%3E(Login),[Utente]-(Assistenza%20clienti),(Assistenza%20clienti)%5E[Amministratore%20Sistema],[Utente]-(Recensioni%20e%20valutazioni%20sui%20viaggi),(Recensioni%20e%20valutazioni%20sui%20viaggi)%3E(Login),">

## WBS 
![image](https://github.com/SalimEssarraj/esercizio/assets/101174782/c8d2c922-150d-4fb1-87d3-0b6007bf375e)
