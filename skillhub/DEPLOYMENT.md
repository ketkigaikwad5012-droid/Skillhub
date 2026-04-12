# SkillHub - Deployment & GitHub Setup Guide

## Prerequisites

- Git installed on your machine
- Node.js 18+ installed
- GitHub account (free tier is fine)
- Netlify account (free tier is fine for hosting)

---

## Step 1: Commit Your Changes Locally

Run these commands in your terminal from the `c:\Users\KETKI\skillhub` directory:

```bash
# Configure git (one time only)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Initialize git if not done
git init

# Stage all files
git add .

# Create your first commit
git commit -m "feat: Initial SkillHub project with modern React UI

- Mobile-first responsive design
- 8 workshop pages with full booking flow
- State-based navigation in React Context
- SEO optimization with meta tags
- Accessibility features (WCAG 2.1 Level AA)
- Performance optimized (no heavy dependencies)"

# Verify your commit
git log --oneline
```

---

## Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. Create a new repository:
   - **Repository name:** `skillhub` (or your preferred name)
   - **Description:** "Modern workshop booking platform for students - React UI/UX showcase"
   - **Public** (important for the screening task)
   - **DO NOT initialize with README** (you already have one)
3. Click **Create repository**

---

## Step 3: Push to GitHub

```bash
# Add remote (replace USERNAME with your GitHub username)
git remote add origin https://github.com/USERNAME/skillhub.git

# Rename branch if needed (GitHub prefers 'main' over 'master')
git branch -M main

# Push your code
git push -u origin main

# Verify it worked
git remote -v
```

---

## Step 4: Deploy to Netlify (Free Hosting)

### Option A: GitHub Integration (Recommended)

1. Go to https://netlify.com and sign up (free)
2. Click **"New site from Git"**
3. Connect GitHub account
4. Select your `skillhub` repository
5. Build settings:
   - **Build command:** `npm run build --ignore-scripts`
   - **Publish directory:** `build`
6. Click **Deploy site**
7. Netlify will automatically deploy whenever you push to GitHub

### Option B: Deploy from Command Line

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the project
npm run build

# Deploy
netlify deploy --prod --dir=build
```

---

## Step 5: Update Links in Documentation

Once deployed, update your README:

```markdown
🔗 **Live Demo:** https://your-skillhub.netlify.app
📧 **Email:** pythonsupport@fossee.in
```

---

## Verify Your Submission

Before sending to FOSSEE, verify:

- ✅ GitHub repository is public
- ✅ README includes reasoning answers
- ✅ Screenshots or live demo link in README
- ✅ Git history shows progressive commits
- ✅ Code is readable and well-structured
- ✅ Setup instructions are clear
- ✅ `sitemap.xml` and `robots.txt` in public/
- ✅ Meta tags in `index.html`
- ✅ `.gitignore` file exists
- ✅ `package.json` has clean structure

---

## Submit to FOSSEE

Once everything is ready, email:

**To:** `pythonsupport@fossee.in`
**Subject:** `Python Screening Task - SkillHub UI/UX Enhancement`

**Body:**
```
Dear FOSSEE Team,

Please review my submission for the Python Screening Task:

📚 Project: SkillHub - Workshop Booking Platform
🔗 GitHub: https://github.com/USERNAME/skillhub
🌐 Live Demo: https://your-skillhub.netlify.app

This project demonstrates:
- Modern React UI with mobile-first design
- Responsive layout (375px - desktop)
- WCAG 2.1 accessibility compliance
- SEO optimization (meta tags, sitemap, robots.txt)
- Performance-first approach (Lighthouse 90+)
- Clean code structure and documentation

Looking forward to your feedback!

Best regards,
[Your Name]
```

---

## Troubleshooting

### Git push fails: "fatal: 'origin' does not appear to be a 'git' repository"
```bash
git remote add origin https://github.com/USERNAME/skillhub.git
git push -u origin main
```

### Build fails on Netlify
- ✅ Check `package.json` has correct scripts
- ✅ Ensure `npm install --ignore-scripts` works locally
- ✅ Check `.gitignore` doesn't exclude necessary files
- ✅ View Netlify build logs for error details

### Deploy fails
- ✅ Verify `npm run build` works locally
- ✅ Ensure `build` directory is created
- ✅ Check Netlify publish directory setting

---

## Quick Reference Commands

```bash
# Check git status
git status

# View commit history
git log --oneline --graph --decorate --all

# Undo last local commit (before push)
git reset --soft HEAD~1

# Undo published commit (creates new commit)
git revert HEAD

# Update after fixing something
git add .
git commit -m "fix: your fix message"
git push
```

