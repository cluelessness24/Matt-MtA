# Mt Atkinson Ward & Melton Electoral Intelligence Dashboard

A data-driven political analysis and interactive electoral simulation dashboard built with React 19, TypeScript, Tailwind CSS, and Vite.

## Features
- **Mount Atkinson Ward 2024 Results**: Complete Victorian Electoral Commission (VEC) formal returns for all 6 candidates.
- **5-Round Preference Distribution**: Step-by-step visual waterfall tracing how preferences flowed from eliminated candidates to Phillip Zada (62.10%) and Matt Pearse (37.90%).
- **Precinct & Polling Booth Analysis**: Granular examination of Mt Atkinson Central, Thornhill Park, Rockbank, Plumpton, and Postal/Pre-poll votes.
- **Advocacy Impact & Voter Sentiment**: Case studies on Hopkins Road duplication, Thornhill Park bus route 454, school builds, and drainage infrastructure.
- **Platform Alignment Matrix**: 6 growth-corridor priorities benchmarked against community polling and council delivery.
- **Future Electoral Scenario Modeling**: Strategic feasibility assessments and live swing simulator for:
  - City of Melton Council 2028 (Mount Atkinson Ward)
  - Victorian State Election 2026 (Seat of Melton)
  - Australian Federal Election (Division of Hawke)
- **Executive Strategic Memorandum**: Formatted strategic briefing paper ready to copy or print.


---

## 🚀 How to Run Locally

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (version 18 or 20+) installed on your machine.

### 2. Clone the Repository
```bash
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>
```

### 3. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 4. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) or [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Build for Production
```bash
npm run build
```
The compiled static assets will be output to the `dist/` directory.

---

## 🌐 How to Publish on GitHub Pages (Free Hosting)

A GitHub Actions workflow is pre-configured in `.github/workflows/deploy.yml`.

### Step 1: Enable GitHub Pages in your Repository Settings
1. Open your repository on GitHub.
2. Go to **Settings** (top tab) $\rightarrow$ **Pages** (in the left sidebar under "Code and automation").
3. Under **Build and deployment** $\rightarrow$ **Source**, select **GitHub Actions** (instead of "Deploy from a branch").

### Step 2: Push Your Code
Push this repository to the `main` branch:
```bash
git add .
git commit -m "Configure GitHub Pages deployment"
git push origin main
```

### Step 3: View Your Live App!
GitHub will automatically run the build workflow in the **Actions** tab. Once completed (usually 1-2 minutes), your dashboard will be live at:
```
https://<your-username>.github.io/<your-repo-name>/
```

---

## ⚡ Alternative Instant Deployment Options

If you prefer connecting your GitHub repository to a one-click host:

- **Vercel**: Import the GitHub repo on [vercel.com](https://vercel.com). Framework preset: `Vite`, build command: `npm run build`, output directory: `dist`.
- **Netlify**: Import the GitHub repo on [netlify.com](https://netlify.com). Publish directory: `dist`.
- **Cloudflare Pages**: Connect GitHub repo, Framework preset: `Vite`.
