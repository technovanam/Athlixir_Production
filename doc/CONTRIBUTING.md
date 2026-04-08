# 🚀 Git Workflow & Contribution Guidelines

**📅 Version Effective From:** 17 March 2026

---

## 📌 1. Commit Message Rules

All commits must follow the standardized format:

`[DD Month YYYY] <type>(scope): <short description>`

### ✅ Example
* `[17 March 2026] feat(auth): implement JWT login`
* `[17 March 2026] fix(api): resolve null pointer issue`
* `[17 March 2026] refactor(db): optimize user schema`

### 🔹 Allowed Types

| Type | Description |
| :--- | :--- |
| **`feat`** | New feature |
| **`fix`** | Bug fix |
| **`refactor`** | Code improvement |
| **`docs`** | Documentation changes |
| **`style`** | Formatting/UI changes |
| **`test`** | Adding/modifying tests |
| **`chore`** | Maintenance tasks |
| **`perf`** | Performance improvements |
| **`ci`** | CI/CD related changes |

### 🔹 Rules
* Use imperative tone (e.g., "add", "fix", not "added", "fixed").
* Keep description under 60 characters.
* Always include a scope where applicable.
* **Avoid vague messages like:**
  * ❌ `update code`
  * ❌ `changes`
  * ❌ `fix stuff`

---

## 📌 2. Branching Strategy



| Branch | Purpose |
| :--- | :--- |
| **`main`** | Production (LIVE) |
| **`develop`** | Staging / Integration |
| **`feature/*`** | New features |
| **`bugfix/*`** | Non-critical fixes |
| **`hotfix/*`** | Critical production fixes |

### 🔹 Naming Convention
* `feature/auth-login`
* `bugfix/token-expiry`
* `hotfix/payment-crash`

---

## 📌 3. Push Rules

Before pushing code, ensure you meet the following requirements:

* ✅ Ensure code builds successfully
* ✅ Run all tests
* ✅ No console errors or warnings
* ✅ Code is formatted properly
* ✅ No sensitive data (API keys, secrets)

### 🚫 Direct Push Restrictions
* ❌ Do **NOT** push directly to `main`
* ❌ Do **NOT** push directly to `develop` (unless authorized)

---

## 📌 4. Merge Rules

### 🔹 Pull Request (PR) Required
All changes **must** go through a Pull Request.

### 🔹 PR Checklist
* [ ] Code is tested
* [ ] No breaking changes (or clearly mentioned)
* [ ] Proper commit messages used
* [ ] No unnecessary files included
* [ ] PR title follows commit format

### 🔹 Approval Rules
* Minimum **1 reviewer approval** required.
* CI/CD checks must pass ✅.

### 🔹 Merge Strategy
* Use **Squash and Merge** (preferred).
* Maintain clean commit history.

---

## 📌 5. CI/CD Rules

* Every push to `develop` → triggers **staging** deployment.
* Every merge to `main` → triggers **production** deployment.
* Failing builds **must** be fixed before merge.

---

## 📌 6. Hotfix Process

1. Create a branch from `main`: `hotfix/issue-name`
2. Fix the issue.
3. Create a PR and merge into **both**:
   * `main`
   * `develop`

---

## 📌 7. Code Quality Standards

* Follow project linting rules.
* Maintain consistent formatting.
* Write readable and modular code.
* Add comments only where necessary.

---

## 📌 8. Security Guidelines

**Never commit:**
* API keys
* Secrets
* `.env` files

> **Note:** Use environment variables instead.

---

## 📌 9. Final Note

This workflow ensures:
* Clean Git history 🧹
* Easy debugging 🔍
* Scalable team collaboration 🤝
* Smooth CI/CD 🚀

**All contributors must strictly follow these guidelines.**