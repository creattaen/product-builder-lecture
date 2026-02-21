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

## Current Plan: Daily Lucky Items (Enhancement)

Enrich the fortune results by adding personalized "Lucky Items" (Color, Number, and Direction) for each reading. This adds more depth and "actionable" advice for the user.

**Steps:**

1.  **Update Fortune Data:** Add arrays for lucky colors, numbers, and directions in `main.js`.
2.  **Modify Fortune Logic:** Update `checkTodayFortune` and `checkMonthFortune` to randomly select and store lucky items.
3.  **Update UI (Today's Result):** Modify `renderTodayFortune` to display the lucky items in a stylish way.
4.  **Update UI (Monthly Sidebar):** Modify `renderMonthlySidebar` to include lucky items.
5.  **Update History Detail:** Ensure the modal displays the lucky items when viewing history records.
6.  **Style Lucky Items:** Add CSS for the lucky item badges/labels to make them visually distinct and appealing.