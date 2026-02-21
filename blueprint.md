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
*   **Disqus Comments Integration:** Positioned above the contact form for better engagement.
*   **Collapsible Partnership Inquiry Form:** Located at the absolute bottom, allowing users to expand it only when needed.

## Current Plan: Daily Lucky Items & Refinement

1.  **Daily Lucky Items (Enhancement):** Enrich the fortune results by adding personalized "Lucky Items" (Color, Number, and Direction).
2.  **UI Refinement:** Fine-tune transitions for the collapsible contact form and polish the comment area layout.

**Steps for Structure Update:**
1.  **Reorder HTML:** Move the Disqus section above the contact section in `index.html`.
2.  **Add Collapsible Logic:** Use a toggle button and a content wrapper for the contact form.
3.  **Style Transitions:** Add CSS for smooth expansion/collapse animations in `style.css`.
4.  **Implement Toggle in JS:** Add a `toggleContactForm` function in `main.js`.
5.  **Git Push:** Commit and push the changes.