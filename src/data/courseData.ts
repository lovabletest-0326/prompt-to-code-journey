export interface Exercise {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  hint: string;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  exercises: Exercise[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  lessons: Lesson[];
}

export const courseModules: Module[] = [
  {
    id: 'intro',
    title: 'Intro to Vibecoding',
    description: 'Discover a new way of building software — by talking to AI.',
    icon: '🚀',
    color: 'hsl(30 95% 55%)',
    lessons: [
      {
        id: 'what-is-vibecoding',
        title: 'What is Vibecoding?',
        content: `## What is Vibecoding?\n\nVibecoding is the art of building software by describing what you want in plain English. Instead of memorising syntax, you collaborate with AI to turn your ideas into working code.\n\n### Why does it matter?\n\nTraditional coding requires years of practice. Vibecoding lets you start building **today**. You focus on creativity and problem-solving while the AI handles the technical details.\n\n### The key principle\n\n> "Tell the AI what you want, not how to do it."\n\nFor example, instead of writing CSS yourself, you could say:\n\n*"Make me a card with a title, some text, and an orange button."*\n\nAnd the AI generates the code for you!`,
        exercises: [
          {
            id: 'ex1',
            question: 'What is the main idea behind vibecoding?',
            options: [
              'Memorising programming languages',
              'Describing what you want in plain English and letting AI write the code',
              'Copying code from tutorials',
              'Drawing wireframes by hand',
            ],
            correctIndex: 1,
            hint: 'Think about who writes the actual code in vibecoding.',
            explanation: 'Vibecoding is about describing your vision in natural language and letting AI translate it into working code.',
          },
          {
            id: 'ex2',
            question: 'Which prompt is better for vibecoding?',
            options: [
              'div.container > h1.title + p.text',
              'Create a card with a bold title and descriptive text below it',
              'function renderCard() { return <div>...</div> }',
              '<html><body><div></div></body></html>',
            ],
            correctIndex: 1,
            hint: 'Vibecoding uses natural language, not code syntax.',
            explanation: 'The best vibecoding prompts describe what you want in clear, plain English — the AI handles the syntax.',
          },
        ],
      },
      {
        id: 'how-ai-works',
        title: 'How AI Understands You',
        content: `## How AI Understands Your Prompts\n\nModern AI models are trained on billions of lines of code and documentation. When you describe what you want, the AI:\n\n1. **Parses** your natural language to understand intent\n2. **Maps** your description to code patterns it has learned\n3. **Generates** clean, working code that matches your vision\n\n### Tips for great prompts\n\n- **Be specific**: "A blue button with rounded corners" beats "a button"\n- **Describe behaviour**: "When clicked, show a popup message"\n- **Think visually**: Describe layout, colours, and sizing\n- **Iterate**: Start simple, then add details in follow-up prompts`,
        exercises: [
          {
            id: 'ex3',
            question: 'Which makes a better prompt for AI?',
            options: [
              'Make something nice',
              'A navigation bar with a logo on the left and three links on the right',
              'navbar',
              'Please code',
            ],
            correctIndex: 1,
            hint: 'More detail helps the AI understand exactly what you want.',
            explanation: 'Specific, descriptive prompts give the AI enough context to generate exactly what you envision.',
          },
        ],
      },
    ],
  },
  {
    id: 'first-prompt',
    title: 'Your First Prompt',
    description: 'Write your first prompt and watch AI turn it into real code.',
    icon: '✍️',
    color: 'hsl(200 80% 50%)',
    lessons: [
      {
        id: 'writing-prompts',
        title: 'Writing Effective Prompts',
        content: `## Writing Your First Prompt\n\nLet's write a prompt together! The secret to great vibecoding is being descriptive but concise.\n\n### The anatomy of a good prompt\n\n1. **What** — What type of element? (button, card, form)\n2. **Look** — How should it look? (colours, size, style)\n3. **Behaviour** — What should it do? (hover effects, clicks)\n\n### Example\n\n> "Create a rounded orange button that says 'Get Started' and glows when I hover over it."\n\nThis prompt tells the AI:\n- **What**: a button\n- **Look**: rounded, orange, with text "Get Started"\n- **Behaviour**: glows on hover`,
        exercises: [
          {
            id: 'ex4',
            question: 'What are the three parts of a good vibecoding prompt?',
            options: [
              'HTML, CSS, JavaScript',
              'What, Look, Behaviour',
              'Header, Body, Footer',
              'Input, Process, Output',
            ],
            correctIndex: 1,
            hint: 'Think about describing the element, its appearance, and its actions.',
            explanation: 'A good prompt describes What you want, how it should Look, and its Behaviour.',
          },
        ],
      },
      {
        id: 'prompt-patterns',
        title: 'Common Prompt Patterns',
        content: `## Prompt Patterns That Work\n\nHere are patterns you can reuse for any project:\n\n### The Component Pattern\n> "Create a [component] with [visual details] that [behaviour]."\n\n### The Layout Pattern\n> "Make a [layout type] with [content items] arranged [arrangement]."\n\n### The Interactive Pattern\n> "Build a [element] where when the user [action], it [result]."\n\n### Practice\nTry these in the Playground:\n- "A card with my photo, name, and a short bio"\n- "A navigation bar with Home, About, and Contact links"\n- "A form with name and email fields and a submit button"`,
        exercises: [
          {
            id: 'ex5',
            question: 'Using the Component Pattern, fill in: "Create a ___ with ___ that ___."',
            options: [
              'div, class, renders',
              'card, a shadow and rounded corners, fades in on scroll',
              'function, parameters, returns a value',
              'file, content, saves to disk',
            ],
            correctIndex: 1,
            hint: 'Think in plain English, not code!',
            explanation: 'The Component Pattern uses natural descriptions: what it is, how it looks, and what it does.',
          },
        ],
      },
    ],
  },
  {
    id: 'building-ui',
    title: 'Building UI',
    description: 'Learn to create beautiful interfaces with just your words.',
    icon: '🎨',
    color: 'hsl(320 70% 55%)',
    lessons: [
      {
        id: 'layout-basics',
        title: 'Layout Basics',
        content: `## Creating Layouts with Prompts\n\nLayouts are how elements are arranged on a page. With vibecoding, you describe the arrangement in everyday language.\n\n### Common layout terms\n\n- **Side by side**: Elements next to each other horizontally\n- **Stacked**: Elements on top of each other vertically\n- **Grid**: Elements in rows and columns\n- **Centered**: Content in the middle of the page\n\n### Examples\n\n> "Create a two-column layout with an image on the left and text on the right."\n\n> "Make a grid of 3 cards per row with equal spacing."`,
        exercises: [
          {
            id: 'ex6',
            question: 'How would you ask AI to put two items next to each other?',
            options: [
              'display: flex; flex-direction: row;',
              'Place the image and text side by side',
              'float: left; float: right;',
              'position: absolute;',
            ],
            correctIndex: 1,
            hint: 'Remember: vibecoding uses natural language!',
            explanation: '"Side by side" is natural language that AI understands as a horizontal layout.',
          },
        ],
      },
      {
        id: 'styling-with-words',
        title: 'Styling with Words',
        content: `## Styling Without CSS\n\nInstead of learning CSS properties, describe the visual effect you want:\n\n| Instead of... | Say... |\n|---|---|\n| border-radius: 8px | "rounded corners" |\n| box-shadow: ... | "with a subtle shadow" |\n| background: gradient | "a gradient from blue to purple" |\n| opacity: 0.5 | "semi-transparent" |\n\n### Colours\nYou can use colour names, moods, or references:\n- "A warm sunset gradient"\n- "Corporate blue"\n- "Soft pastel pink"`,
        exercises: [
          {
            id: 'ex7',
            question: 'Which is the best vibecoding way to describe a shadow?',
            options: [
              'box-shadow: 0 4px 6px rgba(0,0,0,0.1)',
              'Add a soft, subtle shadow underneath the card',
              'shadow-lg',
              '.card { filter: drop-shadow() }',
            ],
            correctIndex: 1,
            hint: 'Describe the visual effect, not the code.',
            explanation: 'Describing the visual effect in plain language lets the AI choose the best implementation.',
          },
        ],
      },
    ],
  },
  {
    id: 'adding-logic',
    title: 'Adding Logic',
    description: 'Make your creations interactive and dynamic.',
    icon: '⚡',
    color: 'hsl(160 70% 45%)',
    lessons: [
      {
        id: 'interactivity',
        title: 'Making Things Interactive',
        content: `## Adding Interactivity\n\nStatic pages are great, but interactivity is what makes apps come alive.\n\n### Describing interactions\n\nUse "when...then" language:\n- "When the user clicks the button, show a success message"\n- "When they type in the search box, filter the list below"\n- "When they hover over the card, slightly scale it up"\n\n### State concepts in plain language\n\n- **Toggle**: "switch between on and off"\n- **Counter**: "keep track of how many times"\n- **Show/Hide**: "reveal the content when clicked"`,
        exercises: [
          {
            id: 'ex8',
            question: 'How would you describe a toggle to AI?',
            options: [
              'useState(false); setOpen(!open)',
              'When the user clicks the switch, toggle between showing and hiding the menu',
              'onClick={() => setState(!state)}',
              'if (open) close; else open;',
            ],
            correctIndex: 1,
            hint: 'Describe the user experience, not the code.',
            explanation: 'Describing the interaction in terms of user actions and visible results is the vibecoding way.',
          },
        ],
      },
    ],
  },
  {
    id: 'launch',
    title: 'Launch Your Project',
    description: 'Put it all together and launch your first creation!',
    icon: '🎯',
    color: 'hsl(270 70% 55%)',
    lessons: [
      {
        id: 'full-project',
        title: 'Building a Complete Project',
        content: `## Your First Full Project\n\nNow that you know the fundamentals, let's build a complete mini-project!\n\n### Project: Personal Landing Page\n\nDescribe each section to the AI:\n\n1. **Hero**: "A hero section with my name in large text, a subtitle about what I do, and a call-to-action button"\n2. **About**: "An about section with my photo on the left and a paragraph about me on the right"\n3. **Skills**: "A grid of skill badges showing things I'm learning"\n4. **Contact**: "A contact form with name, email, and message fields"\n\n### Tips for success\n\n- Build one section at a time\n- Preview after each prompt\n- Iterate and refine\n- Save prompts you like for reuse`,
        exercises: [
          {
            id: 'ex9',
            question: 'What is the recommended approach for building a full project?',
            options: [
              'Write the entire project in one giant prompt',
              'Build one section at a time, preview, and iterate',
              'Copy code from other websites',
              'Skip planning and start coding directly',
            ],
            correctIndex: 1,
            hint: 'Think about how to manage complexity.',
            explanation: 'Breaking projects into sections and iterating ensures each part is polished before moving on.',
          },
        ],
      },
      {
        id: 'sharing',
        title: 'Sharing Your Work',
        content: `## Share Your Creation!\n\nCongratulations! 🎉 You've completed the course!\n\nHere's how to share your work:\n\n1. **Save your prompts** — Build a prompt library you can reuse\n2. **Export your code** — Copy the generated code to use anywhere\n3. **Join the community** — Share in the Prompt Gallery and inspire others\n4. **Keep building** — The best way to learn is by creating\n\n### What's next?\n\n- Try building a portfolio website\n- Create a simple app idea you've always had\n- Help others learn vibecoding\n- Explore more advanced AI tools\n\n> "The journey of a thousand apps begins with a single prompt." ✨`,
        exercises: [
          {
            id: 'ex10',
            question: 'What is the best way to continue learning after this course?',
            options: [
              'Stop and do something else',
              'Memorise all the code patterns',
              'Keep building projects and sharing with the community',
              'Read a 1000-page programming textbook',
            ],
            correctIndex: 2,
            hint: 'Vibecoding is all about doing!',
            explanation: 'The best way to improve is by building real projects and learning from the community.',
          },
        ],
      },
    ],
  },
];

export const getTotalLessons = () =>
  courseModules.reduce((sum, m) => sum + m.lessons.length, 0);

export const communityPrompts = [
  { id: '1', author: 'Sarah K.', prompt: 'A weather dashboard with a big temperature display, 5-day forecast cards, and a sunrise/sunset indicator', likes: 42, tags: ['dashboard', 'weather'] },
  { id: '2', author: 'Mike R.', prompt: 'A todo app with drag-and-drop tasks, colour categories, and a progress bar at the top', likes: 38, tags: ['app', 'productivity'] },
  { id: '3', author: 'Ava L.', prompt: 'A recipe card with a food photo, ingredient list, step-by-step instructions, and a timer button', likes: 55, tags: ['card', 'food'] },
  { id: '4', author: 'James T.', prompt: 'An e-commerce product page with image gallery, price, reviews section, and add-to-cart button', likes: 31, tags: ['e-commerce', 'product'] },
  { id: '5', author: 'Luna M.', prompt: 'A music player UI with album art, play/pause controls, a progress slider, and a playlist sidebar', likes: 67, tags: ['music', 'player'] },
  { id: '6', author: 'Chen W.', prompt: 'A portfolio hero section with animated text, a gradient background, and floating geometric shapes', likes: 49, tags: ['portfolio', 'animation'] },
];
