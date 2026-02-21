# 🔮 신비한 띠별 운세 🔮 - Blueprint

## Overview

A simple and visually appealing web application that provides users with daily and monthly horoscope readings based on their selected zodiac sign. The application is designed to be intuitive, responsive, and engaging, offering a unique fortune-telling experience.

## Implemented Features

*   **Zodiac Selection:** Users can select their zodiac sign from a dropdown list.
*   **Daily & Monthly Fortunes:** Users can view their fortune for the current day or the entire month.
*   **Persistent Fortunes:**
    *   Today's fortune is saved and displayed for the entire day.
    *   The monthly fortune is saved and displayed for the entire month.
*   **Fortune History:** A log of previously viewed fortunes is maintained for the user.
*   **Responsive Design:** The layout adapts to different screen sizes, ensuring a good experience on both desktop and mobile devices.
*   **Modern & Dark Theme:** The application uses a dark, mystical theme with engaging animations and color-coded results.
*   **Fortune History Detail View:** Users can click on any record in the history list to view the full fortune details in a modal.

## Current Plan: Dark/Light Mode Toggle & Lucky Items

1.  **Dark/Light Mode Toggle:** Add a theme toggle functionality to allow users to switch between the default mystical dark theme and a clean light theme.
2.  **Daily Lucky Items (Enhancement):** Enrich the fortune results by adding personalized "Lucky Items" (Color, Number, and Direction).

**Steps for Theme Toggle:**
1.  **Define CSS Variables:** Replace hardcoded colors in `style.css` with CSS variables.
2.  **Add Light Mode Styles:** Create a `.light-mode` class override for the CSS variables.
3.  **Add Toggle UI:** Insert a theme toggle button in `index.html`.
4.  **Implement Toggle Logic:** Add JavaScript to `main.js` to handle theme switching and persist the choice in `localStorage`.
5.  **Git Push:** Commit and push the changes.