# WebPortofolio
Portfolio web dinamic pentru proiectul de semestru la materia Programare Web. Interfata are un aspect tech/dark cu fundal inspirat de circuite, iar proiectele sunt incarcate automat din GitHub prin API.

## Functionalitati
- Header de prezentare cu imagine de profil si tag-uri.
- Sectiuni pentru experienta si educatie.
- Lista de proiecte incarcata din GitHub, cu paginare si stari de incarcare/eroare.

## Structura proiectului
- `index.html` - structura paginii si layout responsive.
- `style.css` - stiluri custom si fundalul tip circuit.
- `app.js` - logica de fetch din GitHub API, randare carduri, paginare.
- `config.js` - token GitHub (fine-grained PAT) pentru acces la repo-uri private.
- `README.md` - documentatie.

## Cerinte
- Browser modern (Chrome/Edge/Firefox).
- Server local pentru a rula ES Modules (nu merge prin `file://`).

## Instalare locala
1. Cloneaza repository-ul.
2. (Optional) Configureaza token-ul GitHub pentru repo-uri private (vezi sectiunea de mai jos).
3. Porneste un server local:
   - VS Code: extensia Live Server.
   - Python: `python -m http.server 5500`
4. Deschide in browser `http://localhost:5500`.

## Configurare GitHub Token (Fine-grained PAT)
Pentru a vedea si repo-urile private sau colaborate, ai nevoie de un **Fine-grained Personal Access Token**.
1. GitHub -> **Settings** -> **Developer settings** -> **Personal access tokens** -> **Fine-grained tokens**.
2. **Generate new token**.
3. **Repository access**: `All repositories` sau selecteaza repo-urile dorite.
4. Permisiuni minime:
   - **Contents: Read**
   - **Metadata: Read**
5. Creeaza `config.js`: export const GITHUB_TOKEN = "github_pat_xxx";

## Tehnologii folosite
- HTML5
- Tailwind CSS (CDN)
- CSS custom
- JavaScript (ES6+)

## Deploy (GitHub Pages)
1. Da push proiectului pe GitHub.
2. In repo -> **Settings** -> **Pages**.
3. **Deploy from branch** -> `main` -> `/ (root)`.
4. Salveaza si asteapta URL-ul generat.

## Observatii
- Pentru GitHub Pages, nu pastra token-ul in codul public.
- Daca vrei doar repo-uri publice, poti elimina token-ul.

Creat pentru proiect universitar - 2026.
