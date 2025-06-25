export const interests: string[] = [
  "AI",
  "WebDev",
  "Literature",
  "Physics",
  "Robotics",
  "Cybersecurity",
  "Psychology",
  "Finance",
  "Design",
  "Music",
  "Blockchain",
  "Writing",
  "Filmmaking",
  "Marketing",
  "Sociology",
  "Gaming",
  "DataScience",
  "Networking",
  "Philosophy",
  "Education",
  "Biology",
  "Animation",
  "Startups",
  "MachineLearning",
  "Environment",
  "Photography",
  "Art",
  "Healthcare",
  "Astronomy",
  "Mathematics"
]

export const getRandomInterests = (): string[] => {
  const shuffled = [...interests].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, 3)
}


