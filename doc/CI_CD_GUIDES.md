# ATHLIXIR CI/CD Management Guide

This guide contains the mandatory steps to enforce the **ATHLIXIR GitOps Model** in your GitHub repository.

---

## 1. GitHub Branch Protection Setup (Mandatory)

To make it impossible to bypass the CI/CD pipeline, go to **Settings > Branches > Branch protection rules** and add the following rules:

### **`develop` Branch Rule**
*   **[x] Require a pull request before merging**
    *   **[x] Require approvals**: Set to `2`.
    *   **[x] Dismiss stale pull request approvals when new commits are pushed**.
    *   **[x] Require review from Code Owners** (Optional but recommended).
    *   **[x] Require conversation resolution before merging**.
*   **[x] Require status checks to pass before merging**
    *   Search and add: `CI - ATHLIXIR Gatekeeper / check-code (pull_request)`.
*   **[x] Require branches to be up to date before merging**.
*   **[x] Restrict force pushes**.
*   **[x] Allow deletions** (Uncheck this for safety).

### **`main` Branch Rule (STRICT)**
*   **All rules from `develop` PLUS:**
*   **[x] Do not allow deletions**.
*   **[x] Restrict who can push to matching branches**: Add only `Maintainers` or `Admins`.

---

## 2. GitHub Secrets Setup (Required for Netlify)

Go to **Settings > Secrets and variables > Actions** and add the following secrets:

1.  `NETLIFY_AUTH_TOKEN`: Your Personal Access Token from Netlify.
2.  `NETLIFY_SITE_ID_STAGING`: The Site ID for your Staging environment.
3.  `NETLIFY_SITE_ID_PRODUCTION`: The Site ID for your Production environment.

---

## 3. Hotfix SOP (Standard Operating Procedure)

When a critical bug is found on the **`main`** branch (production):

1.  **Create Hotfix Branch**:
    ```bash
    git checkout main
    git pull origin main
    git checkout -b hotfix/fix-description
    ```
2.  **Fix and Commit**:
    ```bash
    # Make changes...
    git add .
    git commit -m "fix: production issue description"
    git push origin hotfix/fix-description
    ```
3.  **PR to `main`**: Create a PR from `hotfix/*` -> `main`. Wait for CI and 2 approvals.
4.  **Merge to `main`**: Once merged, the Production CD will trigger.
5.  **Sync `develop`**: **IMPORTANT!** You must also merge the fix back to `develop`.
    ```bash
    git checkout develop
    git pull origin develop
    git merge main
    git push origin develop
    ```

---

## 4. How to Read & Modify Workflows

*   **`.github/workflows/ci.yml`**: Runs on every PR. It installs dependencies, lints, tests, and builds. If `npm test` fails, the PR is blocked.
*   **`.github/workflows/deploy-staging.yml`**: Runs when code is merged to `develop`. Deploys directly to Netlify Staging.
*   **`.github/workflows/deploy-production.yml`**: Runs when code is merged to `main`. Deploys to the production site.
