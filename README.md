# il Baito del Gigio

Quaderno dei viaggi online: una pagina con l'elenco dei viaggi e una pagina per
ogni viaggio. Lo pubblica GitHub Pages con Jekyll, che è già incluso: non serve
installare niente, basta scrivere i file e fare il push.

```
index.html               la home: titolo, introduzione, elenco dei viaggi
_viaggi/                 un file .md per ogni viaggio  ← qui si scrive
_config.yml              nome del sito e contatti del menu
_layouts/                lo scheletro delle pagine
_includes/               date in italiano e conteggio dei giorni
assets/quaderno.css      colori, font, impaginazione (giorno e notte)
assets/quaderno.js       tema giorno/notte, menu, ordine dell'elenco
assets/fonts/            Kalam e Alegreya, con la loro licenza (SIL OFL)
assets/baito.svg         l'icona della linguetta del browser
```

I cinque viaggi che ci sono adesso sono segnaposto: nomi e testi dalla
*Divina Commedia*, prezzi e numeri dalle cifre del π. Si cancellano quando
arrivano quelli veri.

---

## Aggiungere un viaggio

Crea un file in `_viaggi/`, per esempio `_viaggi/dolomiti-2026.md`. Il nome
del file diventa l'indirizzo: `…/viaggi/dolomiti-2026/`. Usa solo minuscole,
numeri e trattini.

```markdown
---
titolo: Dolomiti
dal: 2026-09-12
al: 2026-09-15
tipo: ferie
---

## Tappe

1. Prima tappa
2. Seconda tappa

## Aneddoti

Testo libero.

> Nelle citazioni gli a capo restano dove li metti,
> comodo per poesie e frasi copiate.

## Mi è piaciuto

- …

## Non mi è piaciuto

- …

## Prezzi

| Voce | Prezzo |
| --- | ---: |
| Rifugio | 60,00 € |
| **Totale** | **60,00 €** |

## Consigli

- …

## Dettagli

- **Distanza:** …
```

- `dal` e `al` sono nel formato `AAAA-MM-GG`. Per un viaggio di un giorno
  solo basta `dal`.
- I giorni li conta il sito (estremi compresi), e il viaggio finisce da solo
  nell'elenco e nel menu.
- `tipo` è `lavoro` o `ferie`; compare sotto il titolo del viaggio.
- Le sezioni sono un'abitudine, non un obbligo: si possono togliere, cambiare
  o aggiungerne altre con `## Titolo`.

Si può fare anche dal telefono: su github.com apri la cartella `_viaggi`,
**Add file → Create new file**, scrivi e salva.

### Foto

Metti le foto in `assets/foto/` e richiamale così dal file del viaggio:

```markdown
![Il rifugio al tramonto](../../assets/foto/rifugio.jpg)
```

Meglio JPG o WebP larghi al massimo 1600 px: pesano poco e si vedono bene.

---

## Contatti

In `_config.yml`, alla voce `contatti`. **Instagram va completato** con il
tuo profilo (`https://www.instagram.com/nomeutente/`). Una voce lasciata vuota
(`""`) sparisce dal menu.

---

## Pubblicazione

**Settings → Pages → Build and deployment**: *Source: Deploy from a branch*,
*Branch: `main`*, cartella `/ (root)`. Dopo ogni push GitHub ricostruisce il
sito in un minuto o due; se qualcosa non va, l'errore compare nella scheda
**Actions** (`pages build and deployment`).

L'indirizzo è `https://giovannigaiotto.github.io/<nome-repository>/`: tutti i
collegamenti del sito sono relativi, quindi funzionano con qualsiasi nome del
repository.

### Vederlo in locale (facoltativo)

Serve Ruby. Una volta sola: `gem install github-pages`. Poi, dalla cartella
del repository:

```bash
jekyll serve
```

e apri `http://localhost:4000`.

---

## Grafica

**Colori.** Tutti in cima a `assets/quaderno.css`, con nomi parlanti:
`--carta`, `--inchiostro`, `--cuoio`, `--legno`, `--brace`. Due serie: giorno
(carta chiara, inchiostro seppia) e notte (legno scuro, pergamena, braci).
Il contrasto del testo rispetta il livello AA in tutti e due i temi.

**Font.** *Kalam*, una scrittura a penna, per i titoli e i nomi dei viaggi;
*Alegreya*, un carattere da libro, per il testo. Sono nel repository e non
vengono scaricati da Google: niente chiamate esterne, nessun tracker.

**Giorno e notte.** Di base il sito segue il tema del telefono o del
computer. Il tasto con la luna/il sole lo cambia a mano e la scelta viene
ricordata.

**Senza JavaScript** il sito funziona lo stesso: il menu si apre, l'elenco
resta in ordine di data (manca solo il riordino e il tasto del tema).
