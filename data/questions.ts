export const questions = [
  {
    id: 'mental_energy',
    type: 'emoji',
    question: "How's your mental energy right now?",
    subtext: 'Be honest - this helps us find the right tasks for you',
    answers: [
      { emoji: '😫', label: 'Drained' },
      { emoji: '😴', label: 'Low' },
      { emoji: '😐', label: 'Okay' },
      { emoji: '🙂', label: 'Good' },
      { emoji: '🤩', label: 'Peak' },
    ],
  },
  {
    id: 'mode',
    type: 'binary',
    question: 'Which sounds more appealing right now?',
    answers: [
      {
        icon: '🎨',
        color: '#ffb4a8',
        label: 'Creative Mode',
        desc: 'Brainstorming, ideation, and exploration',
      },
      {
        icon: '🎯',
        color: '#89cff0',
        label: 'Focused Mode',
        desc: 'Execution, analysis, and completion',
      },
    ],
  },
  {
    id: 'physical_energy',
    type: 'slider',
    question: "How's your physical energy?",
    subtext: 'Consider your body - restless, tired, or ready to move?',
    minLabel: 'Low',
    maxLabel: 'High',
  },
  {
    id: 'clarity',
    type: 'emoji',
    question: 'How clear is your thinking?',
    answers: [
      { emoji: '😵‍💫', label: 'Foggy' },
      { emoji: '😕', label: 'Low' },
      { emoji: '😐', label: 'Okay' },
      { emoji: '🙂', label: 'Good' },
      { emoji: '🤓', label: 'Sharp' },
    ],
  },
];
