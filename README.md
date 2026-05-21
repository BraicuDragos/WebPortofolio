# WebPortofolio

Portfolio web dinamic pentru proiectul de semestru, construit cu HTML5, CSS și JavaScript modern. Interfața are un aspect tech/dark cu un fundal inspirat de circuite, iar proiectele sunt încărcate automat din GitHub prin API.

## Structura proiectului

- `index.html` - structura principală și layout responsive.
- `style.css` - stiluri custom și fundalul tip circuit.
- `app.js` - fetch din GitHub API, randare carduri, loading/error state, paginare.
- `config.js` - token GitHub (fine-grained PAT) pentru acces la repo-uri private.
- `README.md` - documentație.

## Rulare locală

> Important: fiind ES Modules, proiectul trebuie servit printr-un server local, nu prin `file://`.

1. Clonează repository-ul.
2. Dacă vrei să vezi repo-uri private, configurează token-ul (vezi secțiunea de mai jos).
3. Pornește un server local:
	- VS Code: folosește extensia Live Server.
	- Python: `python -m http.server 5500`
4. Deschide în browser `http://localhost:5500`.

## Configurare GitHub Token (Fine-grained PAT)

Pentru a vedea și repo-urile private sau colaborate, ai nevoie de un **Fine-grained Personal Access Token**.

1. Mergi pe GitHub -> **Settings** -> **Developer settings** -> **Personal access tokens** -> **Fine-grained tokens**.
2. Click **Generate new token**.
3. Alege **Repository access**: `All repositories` sau selectează explicit repo-urile dorite.
4. Permisiuni minime necesare:
	- **Contents: Read**
	- **Metadata: Read**
5. Copiază token-ul generat și adaugă-l în `config.js`:

```js
export const GITHUB_TOKEN = "github_pat_xxx";
```

> Notă: token-ul este vizibil în browser (client-side). Nu publica token-ul în repo-uri publice.

## Tehnologii folosite

- HTML5
- CSS custom (fără framework)
- Vanilla JavaScript (ES6+)
- Background animat tip circuit

## Deploy (GitHub Pages / Vercel)

### GitHub Pages
1. Împinge proiectul pe GitHub.
2. În repo -> **Settings** -> **Pages**.
3. Selectează **Deploy from branch** -> `main` -> `/ (root)`.
4. Salvează și așteaptă URL-ul generat.

### Vercel
1. Conectează contul GitHub la Vercel.
2. Importă repository-ul.
3. Deploy (nu sunt necesare setări speciale pentru un site static).

---

Creat pentru un proiect universitar - 2026.
