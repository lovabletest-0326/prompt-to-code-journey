export interface GeneratedCode {
  code: string;
  language: string;
  preview: string;
  explanation: string[];
}

const snippets: Record<string, GeneratedCode> = {
  button: {
    code: `<button class="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition font-semibold">
  Click Me!
</button>`,
    language: 'html',
    preview: '<button style="background:#f59e0b;color:white;padding:12px 24px;border:none;border-radius:8px;font-size:16px;font-weight:600;cursor:pointer">Click Me!</button>',
    explanation: [
      '🎨 <button> creates a clickable element on the page.',
      '🖌️ bg-orange-500 sets a bright orange background colour.',
      '📝 text-white makes the text colour white for contrast.',
      '📐 px-6 py-3 adds horizontal and vertical padding.',
      '🔄 hover:bg-orange-600 darkens the button when you hover over it.',
      '✨ transition makes the colour change smooth and animated.',
    ],
  },
  card: {
    code: `<div class="bg-white rounded-xl shadow-lg p-6 max-w-sm">
  <h2 class="text-xl font-bold mb-2">My First Card</h2>
  <p class="text-gray-600">This is a beautiful card component built with just a prompt!</p>
  <button class="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg">Learn More</button>
</div>`,
    language: 'html',
    preview: '<div style="background:white;border-radius:12px;box-shadow:0 10px 25px rgba(0,0,0,0.1);padding:24px;max-width:320px"><h2 style="font-size:20px;font-weight:bold;margin-bottom:8px">My First Card</h2><p style="color:#666;margin-bottom:16px">This is a beautiful card component built with just a prompt!</p><button style="background:#f59e0b;color:white;padding:8px 16px;border:none;border-radius:8px;cursor:pointer">Learn More</button></div>',
    explanation: [
      '📦 <div> is a container that groups elements together.',
      '🎨 bg-white rounded-xl shadow-lg creates a white box with rounded corners and a shadow.',
      '📰 <h2> is a heading — perfect for titles.',
      '📝 <p> is a paragraph for body text.',
      '🔘 The button is nested inside for a call-to-action.',
    ],
  },
  nav: {
    code: `<nav class="flex items-center justify-between p-4 bg-white shadow-sm">
  <span class="text-xl font-bold text-orange-500">MySite</span>
  <div class="flex gap-6">
    <a href="#" class="hover:text-orange-500 transition">Home</a>
    <a href="#" class="hover:text-orange-500 transition">About</a>
    <a href="#" class="hover:text-orange-500 transition">Contact</a>
  </div>
</nav>`,
    language: 'html',
    preview: '<nav style="display:flex;align-items:center;justify-content:space-between;padding:16px;background:white;box-shadow:0 1px 3px rgba(0,0,0,0.1)"><span style="font-size:20px;font-weight:bold;color:#f59e0b">MySite</span><div style="display:flex;gap:24px"><a style="text-decoration:none;color:#333">Home</a><a style="text-decoration:none;color:#333">About</a><a style="text-decoration:none;color:#333">Contact</a></div></nav>',
    explanation: [
      '🧭 <nav> is a semantic HTML element specifically for navigation.',
      '↔️ flex items-center justify-between spreads items across the bar.',
      '🏷️ The logo uses font-bold and text-orange-500 to stand out.',
      '🔗 <a> elements are links — the building blocks of web navigation.',
      '✨ hover:text-orange-500 highlights links when the cursor hovers.',
    ],
  },
  form: {
    code: `<form class="bg-white rounded-xl shadow-lg p-6 max-w-md space-y-4">
  <h2 class="text-xl font-bold">Contact Us</h2>
  <input type="text" placeholder="Your name" class="w-full border rounded-lg p-3" />
  <input type="email" placeholder="Your email" class="w-full border rounded-lg p-3" />
  <textarea placeholder="Message" class="w-full border rounded-lg p-3 h-24"></textarea>
  <button class="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold">Send</button>
</form>`,
    language: 'html',
    preview: '<form style="background:white;border-radius:12px;box-shadow:0 10px 25px rgba(0,0,0,0.1);padding:24px;max-width:400px"><h2 style="font-size:20px;font-weight:bold;margin-bottom:16px">Contact Us</h2><input placeholder="Your name" style="width:100%;border:1px solid #ddd;border-radius:8px;padding:12px;margin-bottom:12px;box-sizing:border-box"/><input placeholder="Your email" style="width:100%;border:1px solid #ddd;border-radius:8px;padding:12px;margin-bottom:12px;box-sizing:border-box"/><textarea placeholder="Message" style="width:100%;border:1px solid #ddd;border-radius:8px;padding:12px;height:80px;margin-bottom:12px;box-sizing:border-box"></textarea><button style="width:100%;background:#f59e0b;color:white;padding:12px;border:none;border-radius:8px;font-weight:600;cursor:pointer">Send</button></form>',
    explanation: [
      '📋 <form> wraps input fields and handles data submission.',
      '✏️ <input> creates text fields for user data.',
      '📧 type="email" tells the browser to validate email format.',
      '📝 <textarea> provides a multi-line text area.',
      '📐 space-y-4 adds consistent vertical spacing between elements.',
    ],
  },
};

export const aiService = {
  async generateCode(prompt: string): Promise<GeneratedCode> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700));

    const lower = prompt.toLowerCase();
    if (lower.includes('nav') || lower.includes('menu') || lower.includes('header')) return snippets.nav;
    if (lower.includes('form') || lower.includes('contact') || lower.includes('input')) return snippets.form;
    if (lower.includes('card') || lower.includes('profile') || lower.includes('box')) return snippets.card;
    return snippets.button;
  },

  getSavedPrompts(): { prompt: string; timestamp: string }[] {
    const data = localStorage.getItem('vibecoding_prompts');
    return data ? JSON.parse(data) : [];
  },

  savePrompt(prompt: string) {
    const prompts = this.getSavedPrompts();
    prompts.unshift({ prompt, timestamp: new Date().toISOString() });
    localStorage.setItem('vibecoding_prompts', JSON.stringify(prompts.slice(0, 50)));
  },
};
