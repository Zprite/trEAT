# Brukerhistorier

# Sprint 1

## Brukerhistorie 1
### Oppskriftsskjema (frontend) (2+3p)
Som bruker ønsker jeg å opprette en oppskrift med tittel, bilde, ingredienser, beskrivelse av oppskriften og fremgangsmåte. 
### Notater
Lage hovedkomponenter til en mal for innsending av oppskrifter til applikasjonen. (Forberedelse innebærer at teamet blir kjent med React)
### Hvordan demonstrere
Jeg kan legge inn alle opplysninger jeg trenger for en oppskrift

## Brukerhistorie 2
### Forside (frontend) (2p)
Som bruker ønsker jeg å kunne se oppskrifter som er lagt ut, slik at jeg kan finne en rett jeg vil lage
### Notater
Landing-side med oversikt over oppskrifter.
### Hvordan demonstrere
Jeg kan scrolle meg gjennom en side og se på oppskrifter.

## Brukerhistorie 3
### Persistent lagring (backend) (4p)
Som bruker ønsker jeg å kunne finne igjen oppskrifter når jeg bruker appen neste gang.
### Notater
Sette opp et enkel backend for å lagre oppskrifter. 
### Hvordan demonstrere
Jeg kan fylle ut oppskriftsskjemaet og det blir lagret til en database

# Sprint 2

## Brukerhistorie 4
### Autentisering (frontend + backend) (4p)
Som eier ønsker jeg at brukere må logge seg inn med passord for å kunne se oppskrifter slik at det kun er seriøse brukere på applikasjonen.
### Notater
- Lage login page
- Lage registreringside
- Brukerinnlogging i backend med gyldighetsskjekk
### Hvordan demonstrere
- Kommer automatisk inn på en loginnside på hjemmesiden
- Gå inn på en side for registrering og skrive inn brukernavn og passord
- Kunne derreter logge inn med ny bruker
- Få tilgang til nettsiden

## Brukerhistorie 5
### Brukerforside/profil (frontend) (1p)
Som bruker ønsker jeg å kunne gå inn på en bruker og se alle oppskriftene vedkommende har lagt ut.
På denne måten kan jeg se hvordan jeg lager det jeg fikk servert av en venn som også bruker platformen.
### Notater
Overssiktsside for en brukers delte oppskrifter, samme type side både for egne og andres.
### Hvordan demonstrere
- Se en side for profilopplysninger, samt alle oppskrifter du har delt når man trykker på min profil i navbaren (med profilinfo)
- Se en side for profilopplysninger, samt alle oppskrifter en bruker har delt når man trykker på brukernavn i en oppskriftspage
## Brukerhistorie 6
### Kobling mellom bruker og oppskrifter (forntend + backend)
Som bruker ønsker jeg å ha en brukerprofil hvor jeg kan knytte oppskrifter til min bruker.
### Notater
Sette opp koblingen mellom bruker og oppskrifter i backend.

- Koble oppskriftsinnsending og data-fetching opp mot profiler (frontend)
- Utvide backend for støtte av oppskrifter under brukerinstanser (backend)
### Hvordan demonstrere
- Logg inn med brukeren din
- Lag en ny oppskrift
- Sjekk profilsiden din, og se at den nye oppskriften har dukket opp.
- Trykk på oppskriften, og se at den laster inn siden for den.

# Spring 3

## Brukerhistorie 6
### Se oppskrifter til bruker
Som bruker ønsker jeg å kunne gå inn på en annen bruker og se alle oppskriftene vedkommende har lagt ut. På denne måten kan jeg se hvordan jeg lager det jeg fikk servert av en venn som også bruker plattformen.

### Hvordan demonstrere
- gå inn på en oppskrift fra hjemsiden
- gå inn på profilen til den som la ut oppskriften
- du er inne på brukeren og kan se alle oppskriftene til brukeren

## Brukerhistorie 7
### Dark Mode
Som bruker ønsker jeg å kunne sette applikasjonen i "dark-mode", slik at jeg kan skåne øynene mine når jeg skal lage nattmat.

### Hvordan demonstrere
- toggle darkmode i navbar
- se at fargene på nettsiden endrer seg mellom mørke og lyse farger. 
- Endre color scheme i system setting og se at fargen på siden endrer seg. 
- Skjekk dette for alle sider

## Brukerhistorie 8
### Redigere og slette oppskrifter
Som bruker ønsker jeg å kunne endre teksten og bilde i en oppskrift jeg har lagt ut, hvis jeg for eksempel finner ut at ribbe også er godt om sommeren, og at den da bør grilles. Jeg vil også kunne slette mine oppskriter.

### Hvordan demonstrere
- Lag en ny oppskrift
- Finn oppskriften i profil-siden din, og trykk på "endre oppskrift"
- Prøv å endre bilde, ingredienser, framgangsmåte, estimert tid, kort beskrivelse og tittel. 

- Gå på hjemsiden og sjekk at du ikke kan endre andre sine oppskrifter
- Gå manuelt til en URL (for endring av oppskrifter) for en oppskrift som ikke er din og sjekk at du ikke får tilgang til å endre den

## Brukerhistorie 9
### Søke etter oppskrifter på tekst
Som bruker ønsker jeg ulike kategorier på tekst slik at jeg lettere kan finne frem til oppskrifter av interesse.

### Hvordan demonstrere
- Lag en oppskrift
- Søk etter noe spesifikt fra oppskriften på hjem-siden og sjekk at oppskriften kommer opp
