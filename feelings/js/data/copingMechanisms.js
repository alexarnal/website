// Coping mechanisms data organized by categories
// Based on therapeutic resources and evidence-based strategies

const copingMechanisms = [
    // Be Active - Physical activities
    {
        category: "Be Active",
        color: "#339af0", // Blue
        icon: "🚴",
        strategies: [
            "Put on music and dance",
            "Go for a walk, run or hike", 
            "Do 10 jumping jacks",
            "Run in place for 20 seconds",
            "Bounce a ball or play catch",
            "Squeeze a stress ball",
            "Build with Legos or blocks",
            "Do some exercise - have a series of exercises to do",
            "Use a stress ball, kick a ball about",
            "Run fast for a minute",
            "Do some colouring in (mindfully)",
            "Do some exercise",
            "Throw something",
            "Flick an elastic band",
            "Do a progressive muscle relaxation (look it up on youtube)",
            "Press against a wall as hard as you can"
        ]
    },
    
    // Find Your Calm - Relaxation and breathing
    {
        category: "Find Your Calm", 
        color: "#51cf66", // Green
        icon: "🧘",
        strategies: [
            "Take some deep breaths",
            "Listen to music or sing a song",
            "Close your eyes and count to 10 or backward from 100",
            "Take a quiet break or rest",
            "Have a drink of cold water",
            "Blow bubbles",
            "Think of a calm, happy place",
            "Breathing exercises (latente.io/breathe)", // Special link
            "Listen to some music that makes you feel relaxed, or brings back happy memories",
            "Use some hand cream and rub it into your hands for a few minutes",
            "Wrap yourself tightly in your bed covers or a blanket and comfy cushion",
            "Think about what you would say to someone you care about who was feeling sad. Now say this to yourself",
            "Visualize a safe place or comforting place. Think of all the things in the scene that make you feel comforted",
            "Go outside and sit/lie down. Listen to everything that you can hear",
            "Hug a person, or a pillow",
            "Have something that has a nice smell to it, smell this when you are feeling upset",
            "Have a bubble bath, or a long shower",
            "Put on a face mask",
            "Get some ice and hold this in your hand for two minutes",
            "Have a cold or hot shower",
            "Splash cold water on your face, or dunk your head in a sink of cold water"
        ]
    },
    
    // Get Creative - Art, music, writing
    {
        category: "Get Creative",
        color: "#e599f7", // Purple/Pink
        icon: "🎨", 
        strategies: [
            "Color, draw or paint",
            "Play with Play-Doh or sand",
            "Play an instrument", 
            "Make up a song",
            "Write about your thoughts or feelings",
            "Create a dance",
            "Write a poem",
            "Draw how you feel",
            "Write song lyrics about how you feel to express yourself",
            "Write down your thoughts on a piece of paper, just get them down, then rip up the paper",
            "Draw on yourself with a red felt tip",
            "Tear up paper",
            "Scribble on paper until your feelings go away",
            "Name all of your football teams members, or the squad from a particular year",
            "Count all of the patterns that you can see in the room",
            "Think of all the lyrics to one of your favourite songs. Recite these to yourself",
            "Think of a meaningful memory for every letter of the alphabet",
            "Spell out the alphabet by moving your feet",
            "Call someone and talk to them about something different",
            "Write down all the places you would like to visit if money was no object",
            "Write a story or a poem",
            "What would you do if you won the lottery?",
            "Do a 'brain game' (memory game)",
            "Say the alphabet backwards",
            "Play on a computer game",
            "Cook something with someone",
            "Do some origami",
            "Do something with others that makes you laugh",
            "Watch a funny film/TV show/youtube"
        ]
    },
    
    // Connect with Others - Social support
    {
        category: "Connect with Others",
        color: "#74c0fc", // Light blue
        icon: "💙",
        strategies: [
            "Cuddle or play with your pet",
            "Read a book with someone",
            "Play a game with a friend or family member", 
            "Work with someone on a puzzle",
            "Write someone a letter",
            "Share your feelings with someone you trust",
            "Ask for help",
            "Tell yourself all your good points",
            "Tell someone how you are feeling and why",
            "Talk to your cat/dog/pet about how you are feeling",
            "Talk to someone that will make you laugh",
            "Think about three things that have made you smile over the last few days",
            "Look at a poem or lyrics to a song that make you smile"
        ]
    },
    
    // Shift Your Mindset - Cognitive strategies  
    {
        category: "Shift Your Mindset",
        color: "#69db7c", // Bright green
        icon: "🧠",
        strategies: [
            "Think of something positive",
            "Focus on one thing you're grateful for", 
            "Identify your top three strengths",
            "Think about something you're looking forward to",
            "Focus on the present moment",
            "Think about something that makes you laugh",
            "Practice reframes ('I didn't fail, I learned')",
            "Stick some positive messages up around your bed, read these each day",
            "Start a positive things diary",
            "Write down a list of your strengths", 
            "Do a 'feelings dance' to express these. Record yourself speaking your thoughts on your phone, then delete",
            "Write down your worries. Question how real these really are - get some perspective",
            "Look at pictures that make you feel relaxed",
            "Eat something you enjoy slowly and savour it - or suck on a sweet"
        ]
    }
];

// Export coping mechanisms data
window.CopingMechanismsData = copingMechanisms;