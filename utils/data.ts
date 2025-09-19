export interface Subject {
  code: string
  name: string
  credits: number
}

export type Grade = "O" | "A+" | "A" | "B+" | "B" | "C" | "U" | "RA"

export const gradeScale: Record<Grade, number> = {
  O: 10,
  "A+": 9,
  A: 8,
  "B+": 7,
  B: 6,
  C: 5,
  U: 0,
  RA: 0,
}

export const subjectData: Record<string, Subject[]> = {
  "1": [
    { code: "CH3124", name: "Engineering Chemistry", credits: 3 },
    { code: "EN3111", name: "Professional English I", credits: 3 },
    { code: "GE3111", name: "Heritage of Tamils", credits: 1 },
    { code: "GE3131", name: "Basic Electrical & Electronics Engineering", credits: 3 },
    { code: "MA3122", name: "Matrices and Calculus", credits: 4 },
    { code: "PH3123", name: "Engineering Physics", credits: 3 },
    { code: "EN3119", name: "English Language Learning Lab", credits: 1 },
    { code: "GE3121", name: "Physics and Chemistry Lab", credits: 2 },
    { code: "GE3134", name: "Engineering Practices Lab", credits: 2 },
  ],
  "2": [
    { code: "CH3222", name: "Chemistry for Information Science", credits: 3 },
    { code: "EN3211", name: "Professional English II", credits: 3 },
    { code: "GE3211", name: "Tamils and Technology", credits: 1 },
    { code: "GE3231", name: "Problem Solving & Python Programming", credits: 3 },
    { code: "GE3233", name: "Engineering Graphics and Design", credits: 3 },
    { code: "MA3222", name: "Statistics & Numerical Methods", credits: 4 },
    { code: "PH3222", name: "Physics for Information Science", credits: 3 },
    { code: "GE3221", name: "Engineering Sciences Lab", credits: 2 },
    { code: "GE3232", name: "Python Programming Lab", credits: 2 },
  ],
  "3": [
    { code: "AD3363", name: "Digital Principles and Computer Organization", credits: 3 },
    { code: "CS3361", name: "Object Oriented Programming", credits: 3 },
    { code: "CY3361", name: "Fundamentals of Networks & Communication", credits: 3 },
    { code: "CY3362", name: "Introduction to Cyber Security", credits: 3 },
    { code: "IT3361", name: "Programming and Data Structures", credits: 3 },
    { code: "MA3322", name: "Discrete Mathematics", credits: 3 },
    { code: "CS3364", name: "OOP Lab", credits: 1.5 },
    { code: "CY3363", name: "Networks Lab", credits: 1.5 },
    { code: "IT3363", name: "Data Structures Lab", credits: 1.5 },
  ],
  "4": [
    { code: "CS3463", name: "Database Management Systems", credits: 3 },
    { code: "CY3461", name: "Basics of Cyber Forensics", credits: 3 },
    { code: "CY3462", name: "Secure Software Engineering", credits: 3 },
    { code: "CY3463", name: "Cyber Laws and Ethics", credits: 3 },
    { code: "IT3461", name: "Operating Systems", credits: 3 },
    { code: "MA3422", name: "Applied Math for Info Science", credits: 2 },
    { code: "CS3466", name: "DBMS Lab", credits: 1.5 },
    { code: "CY3464", name: "Open Source Lab", credits: 1.5 },
    { code: "IT3464", name: "OS Lab", credits: 1.5 },
  ],
  "5": [
    { code: "CE3531", name: "Environmental Studies", credits: 2 },
    { code: "CS3564", name: "Web Development and UI Design", credits: 3 },
    { code: "CY3561", name: "Biometric Security", credits: 3 },
    { code: "CY3562", name: "Ethical Hacking Practices", credits: 3 },
    { code: "CY3563", name: "Information Warfare", credits: 3 },
    { code: "PCY301", name: "Modern Cryptography", credits: 3 },
    { code: "PCY302", name: "Cryptocurrency and Blockchain", credits: 3 },
    { code: "CS3567", name: "Full Stack Dev Lab", credits: 1.5 },
    { code: "CY3565", name: "Biometric Image Processing Lab", credits: 1.5 },
    { code: "CY3566", name: "Ethical Hacking Lab", credits: 1.5 },
  ],
}
