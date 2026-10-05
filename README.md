# Portfolio — Giovanni Gaiotto

Sito statico, una pagina sola. Nessun framework, nessuna build, nessun tracker.

Al momento la pagina contiene solo tre cose: l'introduzione, il blocco delle
variabili dichiarate e i contatti. Il resto (foto dei display, sezioni di
lavoro) è stato tolto e si aggiunge più avanti.

```
index.html                       struttura e contenuti
assets/style.css                 design system (tema chiaro + scuro)
assets/hmi.js                    tema, comparsa allo scroll, freccia "torna su"
assets/hmi/winch-display.webp    foto dell'argano — nel repository, non usata
.nojekyll                        dice a GitHub Pages di servire i file così come sono
```

La foto dell'argano resta nel repository ma non è più richiamata dalla pagina:
è pronta per quando si ricostruisce la sezione lavori.

---

## 1. Pubblicare su GitHub Pages

### Opzione A — sito principale (URL più pulito)

Crea un repository chiamato `<tuo-username>.github.io` e fai il push su `main`.
Il sito sarà su `https://<tuo-username>.github.io` in un paio di minuti, senza
toccare nessuna impostazione.

### Opzione B — repository normale

Push su `main`, poi **Settings → Pages → Build and deployment**,
*Source: Deploy from a branch*, *Branch: `main`*, cartella `/ (root)`.
L'indirizzo sarà `https://<tuo-username>.github.io/<nome-repo>/`.

Dopo il primo giro basta `git push`: Pages ripubblica da solo.

---

## 2. Guardarlo in locale

Basta aprire `index.html` col browser. Oppure, identico a Pages:

```bash
python -m http.server 8321
```

---

## 3. Note

**Linguaggio visivo.** Preso dall'editor CODESYS, ma solo per quello che lì
funziona: fondo bianco, monospaziato come font principale, la logica cromatica
del syntax highlighting (parole chiave blu `#1A46C7`, commenti verde `#0E7A3C`
in corsivo). Lasciati fuori i grigi sporchi, i bordi in rilievo e le toolbar
affollate. Due elementi ripresi dall'IDE: il blocco `VAR_GLOBAL` dell'hero e la
status bar in fondo alla pagina.

Tutti i colori stanno nelle variabili CSS in cima a `style.css`: per cambiare
tono al sito basta toccare quel blocco.

**Font.** JetBrains Mono (titoli e codice) e IBM Plex Sans (testo corrente),
da Google Fonts.

**Temi.** Chiaro di default, scuro automatico se il sistema lo richiede, più un
interruttore in alto a destra che ha la precedenza e viene ricordato.

**Nessuna icona di scheda.** Il `<link rel="icon" href="data:,">` serve a
lasciare vuota la linguetta del browser invece di mostrare un'icona qualsiasi.

**Accessibilità.** Contrasto AA in entrambi i temi, animazioni spente con
`prefers-reduced-motion`, la freccia "torna su" esce dal flusso di tabulazione
finché non è visibile.

---

## 4. Riprendere quello che è stato tolto

Niente è perso: le schermate dell'argano, le sezioni di lavoro e il sistema di
design stanno nella storia di git.

```bash
git log --oneline            # trova il commit
git show <commit>:index.html # guarda com'era
git show 028b49a:assets/hmi/menu.webp > menu.webp   # recupera una foto
```
