# 🔮 신비한 운세 & AI 테스트 - Blueprint (Structural Refinement)

## Overview

A refined multi-page application with specialized services. Features a simplified date display and a dedicated partnership inquiry flow to enhance professionality and user experience.

## Page Structure

*   **[Main] 🔮 띠별 운세 (index.html):** Personalized fortune telling.
*   **[Special] 🐶 AI 동물상 테스트 (animal-test.html):** AI-powered classification.
*   **[Support] 🤝 제휴 및 문의 (contact.html):** Dedicated inquiry page for partners.

## Key Refinements (Current Plan)

1.  **Simplified Date Display:** Removed day-of-week logic and parentheses from all date displays (Result Card, History) to ensure a clean "YYYY.MM.DD" format.
2.  **Contact Flow Redesign:** Removed the collapsible contact form from service pages. Replaced with a subtle footer text link that directs to the dedicated `contact.html`.
3.  **Error Fixes:** Resolved UI glitches in the partnership form by isolating it into its own environment.

## Implemented Features

*   **Modern UI:** Glassmorphism, Pretendard typography, and high-contrast accessibility.
*   **AI Integration:** Teachable Machine model for animal look testing.
*   **Navigation:** Top sticky navbar for seamless page switching.

## Current Plan

1.  **Create contact.html:** Build a professional standalone inquiry page.
2.  **Refactor index & animal-test:** Remove old contact containers and add footer links.
3.  **Update JS Logic:** Clean up date formatting and remove unused toggle functions.
4.  **Deploy:** Push to GitHub Pages.