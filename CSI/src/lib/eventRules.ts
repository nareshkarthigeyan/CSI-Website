export const eventRules: Record<string, { name: string; rules: string[] }> = {
  "tech-symposium": {
    name: "Tech Symposium (Pick & Speak)",
    rules: [
      "Presentation time: 10 minutes + 5 minutes Q&A",
      "Topics can include research projects, innovative solutions, or emerging technologies",
      "Visual aids (PowerPoint/Prezi) are mandatory",
      "Original work only - plagiarism will result in disqualification",
      "Judging based on innovation, technical depth, and presentation skills",
    ],
  },
  ideathon: {
    name: "Ideathon",
    rules: [
      "Problem statements will be revealed at the start of the event",
      "Teams can use any technology stack or framework",
      "Prototypes must be functional (not just mockups)",
      "Final presentation: 15 minutes pitch + demo",
      "Internet access and external libraries are allowed",
    ],
  },
  techquizz: {
    name: "TechQuizz",
    rules: [
      "Multiple rounds: Prelims (online) + Finals (offline)",
      "Topics include DSA, OS, Networks, AI/ML, Web Technologies, and Current Tech",
      "No electronic devices allowed during the quiz",
      "Negative marking for wrong answers in final rounds",
      "Top teams from prelims qualify for finals",
    ],
  },
  poster: {
    name: "Poster Presentation",
    rules: [
      "Poster size: A1 (594 x 841 mm)",
      "Content should be original research or project work",
      "Include methodology, results, and conclusions",
      "5 minutes presentation + 3 minutes Q&A per poster",
      "Judging based on content quality, design, and presentation",
    ],
  },
  "programming-contest": {
    name: "Programming Contest",
    rules: [
      "Team-based contest: teams of up to 3 members (including the leader)",
      "Round 1: Beginner: 45 mins, 5 problems, 10 pts each, passing threshold 30 pts (qualify to Round 2)",
      "Round 2: Intermediate: 60 mins, 4 problems, partial scoring (10/20), wrong-submission penalty -2 per test file, passing threshold 60 pts",
      "Round 3: Hard: 90 mins, 3 problems (from pool of 5), partial & bonus scoring (15/35 + up to 10 bonus), wrong-submission penalty -5 per test file; tie-break by lower total AC time",
      "Teams may use rough paper and discuss approaches among themselves during the contest",
      "Submission guidelines: file naming <ContestID>.<ext>, use only standard libraries, judge returns immediate verdicts (AC/WA/TLE/RE/CE).",
      "Ranking: total score minus penalties; tiebreaker by lower cumulative AC time; final leaderboard published within 30 minutes after Round 3",
    ],
  },
};

export default eventRules;
