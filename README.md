# Portfolio Website with AI Chat Assistant

This project is a personal portfolio website integrated with an AI-powered chat assistant.  
The system is built using a frontend for presentation and a separate Node.js backend that handles all chat intelligence through the Gemini API.

The main idea is to showcase my skills while allowing visitors to interact with a virtual assistant trained only on information related to me and my portfolio.

---

## System Architecture

The project follows a two-layer architecture:

1. Frontend Portfolio – user interface and interactions  
2. Chat Backend – AI logic, training data, and API communication

The frontend never contains any AI logic.  
All message processing happens inside the backend deployed on Vercel.

---

## Technologies Used

### Frontend

**HTML5**  
Provides the structure for all sections such as hero, about, projects, and contact. The markup is written semantically so the website remains accessible and easy to maintain.

**Tailwind CSS**  
Used as the styling framework. The Tailwind CLI generates the final stylesheet based on classes used in the project. Custom configuration is added for:

- fonts and colors  
- shadows and animations  
- dark mode support  
- responsive layouts

**JavaScript**  
Vanilla JavaScript controls:

- navigation and scrolling behavior  
- theme switching  
- UI animations  
- communication with backend API  
- rendering chat messages

---

### Backend Chat Application

The backend is built with **Node.js and JavaScript** and deployed on **Vercel**.

It contains:

- AI training prompts related only to my portfolio  
- logic to process user messages  
- connection with Gemini Generative API  
- response formatting

The API used inside the backend:

```bash
https://generativelanguage.googleapis.com/v1/models/${MODEL_NAME}:generateContent

```


The Gemini API key is stored securely in the `.env` file inside the backend folder.  
The assistant is trained to answer only about:

- my skills  
- my projects  
- my experience  
- information shown in the portfolio

The training is still in progress, so responses are improving gradually.

---

## Frontend Project Structure

```bash
Portfolio-website/
│
├── index.html              → Main webpage
│
├── css/
│   ├── tailwind.css        → Tailwind input file
│   └── output.css          → Compiled final styles
│
├── js/
│   ├── chat.js             → Chat application logic
│   └── main.js             → Website interactions
│
├── assets/                 → Images & icons
│
├── tailwind.config.js      → Tailwind configuration
└── README.md               → Documentation
```


Each part of the structure has a single responsibility so that the project remains understandable even after months.

---

## Code Flow Explanation

### 1. Initial Page Load

When the browser opens the website:

1. `index.html` loads the base markup  
2. `output.css` styles the layout using Tailwind utilities  
3. `main.js` initializes navigation, theme, and scroll behavior  
4. `chat.js` prepares the chat widget but keeps it hidden  

This sequence ensures the page becomes usable even before JavaScript finishes all tasks.

### 2. Navigation and Theme Logic

The navigation bar reacts to scrolling and screen size. JavaScript listens for scroll events and toggles classes to add shadows or background changes. The theme switcher adds or removes a `dark` class on the root element, which automatically triggers Tailwind dark styles.

### 3. Chat Application Flow

The chat system works entirely on the frontend:

1. User clicks the chat icon  
2. The widget slides into view  
3. Input is captured from the text box  
4. JavaScript creates a message bubble  
5. A simulated or API response is added  
6. The container auto-scrolls to the latest message  

The UI is built with Tailwind classes such as blur, rounded corners, and transitions to give a modern floating assistant feel.

---

## Description of Website Sections

### Hero Section  
Introduces my name and role with animated text and call-to-action buttons. This section is designed to immediately tell the visitor who I am and what I do.

### About Section  
Explains my background, interests, and career direction in a readable layout. The design switches from two columns on desktop to single column on mobile.

### Skills Section  
Displays technologies and tools I work with. Each skill card uses hover and scale effects created through Tailwind animations.

### Projects Section  
Showcases selected work with description and tech stack. The structure allows new projects to be added simply by duplicating a card block.

### Contact Section  
Provides a way to reach me through form and social links. Validation and interaction are handled with JavaScript.

### Chat Widget  
Acts as an intelligent FAQ and assistant. It lowers the barrier for visitors who may not want to write a formal message.

---

## Tailwind Build Process

Styling is generated using:

```bash
npx @tailwindcss/cli -i css/tailwind.css -o css/output.css --watch
```

The CLI scans HTML and JavaScript files defined in `tailwind.config.js`. Only detected classes are included in the final CSS. This avoids unused styles and improves loading speed.

---

## Key Design Decisions

- No heavy frameworks to keep performance high  
- Utility-first CSS for rapid iteration  
- Modular JavaScript instead of jQuery  
- Chat integration to make the portfolio interactive  
- Dark mode for better accessibility

---

## Running the Project Locally

1. Clone the repository  
2. Start Tailwind in watch mode  
3. Open `index.html` using live server  

No complex build step is required, making the project beginner friendly.

---

## Future Scope

The project can be extended with:
- real AI backend for chat  
- blog section  
- project filters  
- analytics  
- multilingual support

---

## Conclusion

This portfolio reflects my approach toward frontend development: clean structure, readable code, and practical features. The chat assistant demonstrates how a simple website can be turned into an engaging application without relying on large frameworks.

MIT License

Copyright (c) 2026 Aditya Raj Singh
