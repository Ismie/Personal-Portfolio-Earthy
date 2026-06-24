# Inhalts-Guide — romanschulz.com

Kurzanleitung zum **Bearbeiten der Inhalte** dieser Portfolio-Seite. Gedacht zum Nachschlagen
und als Einstieg für eine frische KI-Session ("Project init"). Du musst kein Next.js können —
fast alle Texte liegen in wenigen, klar benannten Dateien.

---

## 1. Was ist das hier?

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript
- **Styling:** Tailwind CSS v4, plus ein eigenes Design-System ("Warm Terminal") in `app/globals.css`
- **Hosting:** Netlify (Seite `schulzrportfolio`) — deployt automatisch, sobald auf GitHub `main` gepusht wird
- **Repo:** https://github.com/Ismie/Personal-Portfolio-Earthy
- **Lokaler Ordner (der richtige!):** `C:\Users\roman\Desktop\Personal-Portfolio-Earthy-main`
  > ⚠️ Es gibt einen zweiten, alten Ordner in `Documents` — **den nie anfassen.** Immer der Desktop-Ordner.

---

## 2. Lokal starten (Vorschau im Browser)

Im Projektordner ein Terminal öffnen und:

```bash
npm install      # nur beim ersten Mal nötig (lädt Abhängigkeiten)
npm run dev      # startet die Vorschau
```

Dann im Browser **http://localhost:3000** öffnen. Änderungen an Dateien erscheinen sofort
(Live-Reload). Beenden mit `Strg + C` im Terminal.

Vor dem Veröffentlichen prüfen, dass alles fehlerfrei baut:

```bash
npm run lint     # Code-Stil / Fehler
npm run build    # Produktions-Build (muss fehlerfrei durchlaufen)
```

---

## 3. Wo welcher Inhalt steht (das Wichtigste)

| Was du ändern willst | Datei |
|---|---|
| **Projekte** (Name, Beschreibung, Tags, Jahr, Status, Link) | `src/data/projects.ts` |
| **Blog-Artikel** (Texte, Titel, Datum) | `src/data/posts.ts` |
| **Startseite**: Intro-Text, Über-mich, Werdegang, Skill-Liste | `app/page.tsx` |
| **Kontaktdaten** (E-Mail, Telefon, Adresse, LinkedIn) | `app/kontakt/page.tsx` |
| **Seitentitel / SEO-Beschreibung** (global) | `app/layout.tsx` |
| **Fußzeile** | `src/components/layout/Footer.tsx` |
| **Navigation** (Menüpunkte) | `src/components/layout/Nav.tsx` |
| **Farben, Schriften, Design** | `app/globals.css` |

### Projekte bearbeiten — `src/data/projects.ts`
Eine Liste von Einträgen. Ein neues Projekt = einen Block kopieren und Werte ändern:

```ts
{
  name: 'Projektname',
  sub: 'Kurzer Untertitel · Technologie',
  desc: 'Beschreibung in ein, zwei Sätzen.',
  tags: ['laravel', 'mysql'],   // kleine Stichwort-Chips
  year: '2025',
  status: 'in betrieb',          // freier Text, z.B. "shipped", "in pflege"
  link: 'beispiel.de',           // oder null, wenn es keinen Link gibt
  accent: true,                  // true = hervorgehobene Karte
},
```
Die ersten 3 Einträge erscheinen auch auf der Startseite ("ausgewählte projekte").

### Blog-Artikel bearbeiten — `src/data/posts.ts`
Jeder Artikel hat Kopf-Infos und einen `body` aus **Blöcken**. Es gibt vier Block-Typen:

```ts
{ type: 'p',    text: 'Ein normaler Absatz.' }
{ type: 'h2',   text: 'Eine Zwischenüberschrift' }
{ type: 'code', text: "console.log('Code-Block');" }
{ type: 'ul',   items: ['Listenpunkt 1', 'Listenpunkt 2'] }
```
Der `slug` ist der Teil der URL (`/blog/mein-slug`) — nur Kleinbuchstaben und Bindestriche.
> Hinweis: Die vier vorhandenen Artikel sind **KI-Entwürfe** auf Basis echter Projekte.
> Gern redigieren, kürzen oder mit echten Code-Beispielen ergänzen.

### Texte auf der Startseite — `app/page.tsx`
Suche im oberen Teil der Datei nach:
- `experience` → Werdegang / Berufserfahrung
- `skills` → die Stack-Chips (Backend, Frontend, …)
- `hero-sub` → der Intro-Absatz unter dem Namen
- `about-body` → der "über mich"-Text

Nur die Texte in den Anführungszeichen bzw. zwischen den Tags ändern — die Struktur drumherum
in Ruhe lassen.

---

## 4. Kontaktformular (Resend)

Das Formular schickt E-Mails über den Dienst **Resend**. Damit es live funktioniert, braucht es
einen API-Key als Umgebungsvariable:

- **Lokal:** Datei `.env.local` anlegen (Vorlage: `.env.example`), `RESEND_API_KEY=...` eintragen.
- **Auf Netlify:** unter *Site settings → Environment variables* dieselbe Variable setzen.

Ohne Key zeigt das Formular automatisch einen "schreib mir direkt per E-Mail"-Fallback — es
bricht also nichts. Empfänger/Absender lassen sich über `CONTACT_TO` / `CONTACT_FROM` anpassen
(siehe `.env.example`).

---

## 5. Veröffentlichen (kurz)

```bash
git add .
git commit -m "Inhalt: <was geändert wurde>"
git push
```
Netlify baut danach automatisch und veröffentlicht in 1–2 Minuten.
Mehr Git-Details: siehe **Git-Spickzettel.pdf** auf dem Desktop.

---

## 6. Für eine neue KI-Session ("Project init")

Empfehlung: Ja, ein frischer Chat lohnt sich für reine Inhaltsänderungen. Gib der KI zum Start:

> "Arbeite ausschließlich in `C:\Users\roman\Desktop\Personal-Portfolio-Earthy-main`.
> Das ist ein Next.js-16-Projekt (Warm-Terminal-Design). Lies zuerst `CONTENT-GUIDE.md`,
> `AGENTS.md` und `CLAUDE.md`. Ich möchte Inhalte ändern: [was du vorhast]."

Wichtige Projekt-Regeln, die die KI kennen muss (stehen auch in `AGENTS.md` / `CLAUDE.md`):
- Es ist **"NOT the Next.js you know"** — vor Code-Änderungen die Doku unter
  `node_modules/next/dist/docs/` lesen.
- Komponenten liegen in `src/components/` nach Zweck gruppiert (`pixel/`, `layout/`).
- Server-Komponenten sind Standard; `'use client'` nur bei Interaktivität/Hooks.
- Design-Tokens (Farben/Schriften) immer aus `app/globals.css` `:root` verwenden — kein kaltes
  Dark-Theme wieder einführen.
