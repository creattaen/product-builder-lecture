# 🔮 신비한 띠별 운세 🔮 - Blueprint

## Overview

A simple and visually appealing web application that provides users with daily and monthly horoscope readings based on their selected zodiac sign. The application is designed with a soft, bright, and mystical aesthetic to provide a pleasant and intuitive fortune-telling experience.

## Implemented Features

*   **Zodiac Selection:** Users can select their zodiac sign from a dropdown list.
*   **Daily & Monthly Fortunes:** Users can view their fortune for the current day or the entire month.
*   **Persistent Fortunes:**
    *   Today's fortune is saved and displayed for the entire day.
    *   The monthly fortune is saved and displayed for the entire month.
*   **Fortune History:** A log of previously viewed fortunes is maintained for the user.
*   **Responsive Design:** The layout adapts to different screen sizes, ensuring a good experience on both desktop and mobile devices.
*   **Soft & Bright Mystical Theme:** A unified, elegant design with soft shadows and readable typography.
*   **Fortune History Detail View:** Users can click on any record in the history list to view the full fortune details in a modal.
*   **Partnership Inquiry Form (Formspree):** A clean contact form integrated with Formspree for partnership inquiries.
*   **Disqus Comments Integration:** A community section for user interaction and feedback.

## Current Plan: Daily Lucky Items & Refinement

1.  **Daily Lucky Items (Enhancement):** Enrich the fortune results by adding personalized "Lucky Items" (Color, Number, and Direction).
2.  **UI Refinement:** Ensure all components (Disqus, Form, History) are perfectly polished within the new soft-bright theme.

**Steps for Theme Update:**
1.  **Redefine CSS Variables:** Replace dark/light variables with a single set of soft, bright colors in `style.css`.
2.  **Cleanup HTML:** Remove the theme toggle button from `index.html`.
3.  **Cleanup JS:** Remove theme-switching logic from `main.js`.
4.  **Final Polish:** Adjust shadows and borders for a "soft" feel.
5.  **Git Push:** Commit and push the changes.