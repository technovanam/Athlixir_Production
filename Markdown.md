## 🔐 Access Control & Branch Rules (VERY IMPORTANT)

### 🔴 `main` (Production Branch)
* **🎯 Purpose:** Contains 100% stable, tested code. Directly deployed to production.
* **🔒 Access Rules:**
  * ❌ No direct push
  * ❌ No force push
  * ❌ No commits allowed
  * ✅ Only Pull Request (PR) merge allowed
  * ✅ Minimum 2 approvals required
  * ✅ CI/CD pipeline must pass
* **👤 Who Can Merge:** Tech Lead / Project Owner ONLY
* **🔁 Merge Sources:** `release/*`, `hotfix/*`

---

### 🟡 `develop` (Integration Branch)
* **🎯 Purpose:** Combines all completed features. Acts as a staging environment.
* **🔒 Access Rules:**
  * ❌ No direct push (recommended)
  * ✅ PR required
* **👤 Who Can Merge:** Developers (with review) / Tech Lead approval recommended
* **🔁 Merge Sources:** `feature/*`, `bugfix/*`, `hotfix/*` (after production fix)

---

### 🟢 `feature/*` (Feature Development)
* **🎯 Purpose:** Develop individual features.
* **🔒 Access Rules:**
  * ✅ Full access for assigned developer
* **👤 Who Can Work:** Individual developers
* **🔁 Merge Target:** `develop`
* **📌 Examples:** * `feature/auth-firebase`
  * `feature/dashboard-ui`
  * `feature/prisma-schema-update`

---

### 🟠 `bugfix/*`
* **🎯 Purpose:** Fix non-critical issues.
* **🔁 Merge Target:** `develop`

---

### 🔵 `release/*`
* **🎯 Purpose:** Final testing before production. Stabilization phase.
* **🔒 Access Rules:** Limited (Senior Dev / Lead)
* **👤 Who Can Merge:** Tech Lead / QA approval required
* **🔁 Merge Targets:** `main`, `develop` (after release)

---

### 🚨 `hotfix/*`
* **🎯 Purpose:** Fix critical production bugs.
* **⚡ Priority:** Highest priority branch.
* **🔒 Access Rules:** Senior Dev / Lead ONLY
* **🔁 Merge Targets:** `main`, `develop`