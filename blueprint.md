# 🔮 신비한 운세 & AI 테스트 - Blueprint (Multi-Page)

## Overview

The application is split into two distinct specialized pages: a traditional Horoscope service and an AI-powered Animal Look Test. Both share a consistent soft-bright mystical aesthetic.

## Page 1: 🔮 띠별 운세 (index.html)

*   **Zodiac Selection:** 12 zodiac signs.
*   **Daily/Monthly Fortunes:** Persistent readings using LocalStorage.
*   **History:** Detailed history modal.
*   **Community:** Disqus comments & Contact form.

## Page 2: 🐶 AI 동물상 테스트 (animal-test.html)

*   **AI Analysis:** Puppy vs Cat classification using Teachable Machine.
*   **Interactive UI:** Image upload, progress bars, and custom results.
*   **Community:** Disqus comments & Contact form.

## Shared Components

*   **Design:** Unified soft-bright mystical theme (`style.css`).
*   **Navigation:** Top navigation bar to switch between Fortune and AI Test.
*   **Integrations:** Disqus and Formspree available on both pages.

## Current Plan

1.  **Refactor Structure:** Split `index.html` and create `animal-test.html`.
2.  **Split Logic:** Create `horoscope.js` and `animal.js`.
3.  **Navigation UI:** Add a navigation bar to both pages.
4.  **Final Polish:** Ensure both pages are fully functional and responsive.
5.  **Git Push:** Deploy the separated pages.