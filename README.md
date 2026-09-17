# Beacon Academy Hub

Create a highly professional and modern Educational Web Ecosystem for "Bekobod Tumani Ixtisoslashtirilgan Maktabi" (A specialized school under the Agency for Specialized Educational Institutions - PIIMA) using Next.js, Tailwind CSS, Lucide Icons, and TypeScript. 

The application must include the following features and distinct pages, styled with a premium educational palette (Deep Blue as primary, Clean White, Vibrant Green for success, and Warning Coral/Red for alerts):

1. **🏠 Smart Landing Page (Home):**

   - **🚨 Dynamic CHSB/BShB Exam Alert Banner:** Placed at the very top of the page. It should only appear when active. It must feature a "Live Countdown Timer" (e.g., '9-A class, Mathematics Exam starts in 15 minutes! Please head to Computer Lab 2'). It needs a pulsing red indicator to catch attention.

   - **📰 School Life & Events Feed:** A beautiful card-based feed showcasing recent school events, spirituality hours, and announcements.

   - **🔗 Telegram Integration Button:** Every news card must include a sleek "View & Comment on Telegram" button that links back to their official community (t.me/piima_bekobodtumani) to drive social engagement.

2. **🏆 "Bizning Faxrimiz" (Achievements Showcase Page):**

   - **🔍 Advanced Filter System:** Tabs at the top to filter achievements by category: [All], [IELTS / Language Certificates], [Al-Khwarizmi Olympiad], [Exact Sciences].

   - **🪪 Dynamic Scholar Cards:** Displaying the student's photo, name, class, achievement title, and a small preview of the certificate (e.g., IELTS B2/C1, National A+). 

   - **🖼️ Certificate Modal View:** Clicking a card opens a beautiful, clean modal showing the full scanned certificate and student profile details.

   - **👏 "Congratulate" (Like/Clap) Button:** Every card must have an interactive counter button where peers can click to "clap/congratulate" the student, fostering internal school motivation. Include a global dynamic counter at the bottom showing total certificates achieved by the school.

3. **📅 Info & Digital Timetable Page:**

   - **🕒 Smart "Today's Schedule" Mode:** It should automatically highlight the current day's timetable (Monday-Saturday) with classes, teachers, and room numbers. Users can also click tabs to see other days.

   - **⚡ PIIMA Computerized Exam Guide:** A dedicated UI section with stress-management tips and step-by-step instructions on how students should take exams under strictly monitored computer environments.

4. **🛠️ User-Friendly Admin Dashboard (`/admin`):**

   - Designed for teachers who are non-technical users. It must include:

     - **CHSB Controller:** A simple switch toggle to turn the landing page Exam Banner ON/OFF, along with inputs for Class, Subject, Time, and Room number.

     - **Achievement Submitter:** Inputs for Student Name, Class, Category Selection, Achievement Description, and an image upload placeholder for the certificate.

     - **News Publisher:** A clean form to add title, text description, and event photos.

Ensure the entire web app has smooth transitions, modern hover effects, premium glassmorphic UI elements where appropriate, and is fully responsive for smartphones, tablets, and desktops. Code should be clean, modular, and production-ready.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e47d77a9-c22b-4145-a5e7-a5bbd8db4960).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
