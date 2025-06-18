// src/data/blogs.js
const blogs = [
  {
    id: 1,
    title: "What is React and Why is it So Popular?",
    image: "/images/react.png",
    content: `
React is a JavaScript library developed by Facebook for building user interfaces, especially single-page applications where data changes frequently. It allows developers to create large web applications that can update and render efficiently in response to changing data.

🧠 Key Features of React:
- **Component-Based**: Build encapsulated components that manage their own state.
- **Virtual DOM**: React creates an in-memory cache of the real DOM. When something changes, only the changed parts are updated — improving performance.
- **Reusable UI**: React components can be reused across different pages and projects.
- **React Hooks**: A powerful way to use state and lifecycle methods without writing class-based components.

🚀 Why it's Popular:
- Backed by Facebook and a strong community
- Easy integration with other frameworks (like Redux, Tailwind)
- Huge ecosystem of libraries and tools

Whether you’re building a small portfolio or a large-scale e-commerce site, React makes it fast, scalable, and easy to manage.
`,
  },
  {
    id: 2,
    title: "Top 5 JavaScript Features Every Developer Should Know",
    image: "/images/java.jpg",
    content: `
JavaScript is a dynamic and powerful language that keeps evolving. Here are the top 5 modern features every developer should master:

1️⃣ **Arrow Functions**  
Shorter syntax for writing functions:  
\`const add = (a, b) => a + b;\`

2️⃣ **Destructuring**  
Extract values from arrays or objects:  
\`const { name, age } = user;\`

3️⃣ **Spread and Rest Operators**  
Easy manipulation of arrays and objects:  
\`const newArr = [...oldArr];\`

4️⃣ **Async/Await**  
Write asynchronous code in a cleaner way:  
\`const data = await fetchData();\`

5️⃣ **Optional Chaining & Nullish Coalescing**  
Avoid runtime errors:  
\`const name = user?.profile?.name ?? "Guest";\`

These features make your JavaScript cleaner, faster, and easier to maintain. Start using them in your projects today!
`,
  },
  {
    id: 3,
    title: "India's Space Race: ISRO's Bold Mission to Mars 2.0",
    image: "/images/isro.jpg",
    content: `
India's space agency ISRO has announced its ambitious plan to launch **Mars Orbiter Mission 2.0** in 2026, following the enormous success of its first Mars mission, MOM (Mangalyaan), in 2013.

🔭 **The Mission Objective**:
The MOM 2.0 will focus on advanced research such as detecting methane traces, climate monitoring, and capturing high-resolution images of Martian terrain. It will include an upgraded propulsion system, onboard AI processors, and modular scientific payloads that can adapt mid-mission.

🌍 **Why This Matters Globally**:
India remains among the few countries to successfully reach Mars on its first attempt — and that too with a record-low budget. This mission not only boosts India's technological image but also attracts international collaborations, including with NASA, ESA, and JAXA.

📈 **Economic & Scientific Impact**:
With increasing interest from private space companies like Skyroot and Agnikul, this mission could give India an edge in commercial satellite launching and planetary research. It’s expected to generate thousands of skilled jobs and inspire the next generation of scientists.

🛰️ **What's Next?**:
Following MOM 2.0, ISRO is also planning:
- Chandrayaan 4 for advanced lunar exploration
- Gaganyaan – India's first manned mission to space
- Partnership with private space agencies for reusable rocket development

This bold space journey reflects India's growing power in the field of deep space research and sets the stage for future interplanetary missions.
`,
  },
  {
    id: 4,
    title: "AI क्या है और यह कैसे काम करता है?",
    image: "/images/ai.webp",
    content: `
AI (आर्टिफिशियल इंटेलिजेंस) यानी कृत्रिम बुद्धिमत्ता, कंप्यूटर साइंस की वह शाखा है जो ऐसे सिस्टम बनाती है जो इंसानों की तरह सोचते, सीखते और निर्णय लेते हैं। AI मशीनों को स्मार्ट बनाता है ताकि वे मानव जैसी गतिविधियाँ कर सकें जैसे बोलना, सुनना, समझना और खुद से निर्णय लेना।

🧠 **AI के प्रकार:**
- **Narrow AI (सिमित AI)**: जो सिर्फ एक विशेष कार्य करता है जैसे कि Google Assistant, Siri।
- **General AI (सामान्य AI)**: जो किसी भी इंसान जैसे कार्य कर सके — अभी यह भविष्य की कल्पना है।
- **Super AI (सुपर AI)**: जो इंसान से ज्यादा बुद्धिमान हो — यह अभी रिसर्च स्टेज में है।

⚙️ **AI कैसे काम करता है:**
AI मुख्यतः डेटा के आधार पर काम करता है। इसमें Machine Learning (ML) और Deep Learning जैसे तकनीकें उपयोग होती हैं। मशीन को पहले बहुत सारा डेटा दिया जाता है, जिससे वह patterns को पहचानती है और निर्णय लेती है।

🛠️ **AI का उपयोग:**
- हेल्थकेयर (रोग पहचानना, इलाज सुझाना)
- फाइनेंस (धोखाधड़ी की पहचान)
- ट्रांसपोर्ट (सेल्फ-ड्राइविंग कार)
- सोशल मीडिया (रिकमेंडेशन सिस्टम)

🚨 **भविष्य की चुनौतियाँ:**
AI से नौकरियों में बदलाव आ सकता है। साथ ही, यह जरूरी है कि AI का सही और नैतिक उपयोग हो।

AI आज की दुनिया का भविष्य है — इसके बारे में जानना और समझना हर किसी के लिए जरूरी है।
`
  }
];

export default blogs;
