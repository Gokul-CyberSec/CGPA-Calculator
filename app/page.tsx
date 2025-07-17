"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calculator, GraduationCap, Moon, Sun, Download, RotateCcw, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { subjectData, gradeScale, type Grade } from "@/utils/data"

type CalculatorMode = "semester" | "overall"

interface GradeEntry {
  subjectCode: string
  grade: Grade | ""
}

export default function CGPACalculator() {
  const [mode, setMode] = useState<CalculatorMode>("semester")
  const [selectedSemester, setSelectedSemester] = useState<string>("")
  const [selectedSemesters, setSelectedSemesters] = useState<string[]>([])
  const [grades, setGrades] = useState<Record<string, GradeEntry[]>>({})
  const [darkMode, setDarkMode] = useState(false)
  const [showLegend, setShowLegend] = useState(false)
  const [showPredictor, setShowPredictor] = useState(false)
  const [targetCGPA, setTargetCGPA] = useState("")

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const calculateGPA = (semester: string): number => {
    const semesterGrades = grades[semester] || []
    const subjects = subjectData[semester] || []

    let totalCredits = 0
    let totalPoints = 0

    subjects.forEach((subject) => {
      const gradeEntry = semesterGrades.find((g) => g.subjectCode === subject.code)
      if (gradeEntry && gradeEntry.grade) {
        const points = gradeScale[gradeEntry.grade]
        totalPoints += points * subject.credits
        totalCredits += subject.credits
      }
    })

    return totalCredits > 0 ? totalPoints / totalCredits : 0
  }

  const calculateCGPA = (): number => {
    let totalCredits = 0
    let totalPoints = 0

    selectedSemesters.forEach((semester) => {
      const subjects = subjectData[semester] || []
      const semesterGrades = grades[semester] || []

      subjects.forEach((subject) => {
        const gradeEntry = semesterGrades.find((g) => g.subjectCode === subject.code)
        if (gradeEntry && gradeEntry.grade) {
          const points = gradeScale[gradeEntry.grade]
          totalPoints += points * subject.credits
          totalCredits += subject.credits
        }
      })
    })

    return totalCredits > 0 ? totalPoints / totalCredits : 0
  }

  const updateGrade = (semester: string, subjectCode: string, grade: Grade | "") => {
    setGrades((prev) => {
      const semesterGrades = prev[semester] || []
      const existingIndex = semesterGrades.findIndex((g) => g.subjectCode === subjectCode)

      if (existingIndex >= 0) {
        semesterGrades[existingIndex].grade = grade
      } else {
        semesterGrades.push({ subjectCode, grade })
      }

      return {
        ...prev,
        [semester]: [...semesterGrades],
      }
    })
  }

  const clearAll = () => {
    setGrades({})
    setSelectedSemester("")
    setSelectedSemesters([])
  }

  const exportToPDF = () => {
    // Simple implementation - in a real app, you'd use jsPDF or html2pdf
    const content =
      mode === "semester"
        ? `Semester ${selectedSemester} GPA: ${calculateGPA(selectedSemester).toFixed(2)}`
        : `Overall CGPA: ${calculateCGPA().toFixed(2)}`

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${mode === "semester" ? "GPA" : "CGPA"}_Report.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${darkMode ? "dark bg-gray-900" : "bg-gradient-to-br from-blue-50 to-indigo-100"}`}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <GraduationCap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white">CGPA Calculator</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg">B.E Cyber Security • Anna University • R2023</p>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <Button variant="outline" size="sm" onClick={() => setDarkMode(!darkMode)} className="gap-2">
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              {darkMode ? "Light" : "Dark"}
            </Button>

            <Dialog open={showLegend} onOpenChange={setShowLegend}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <Info className="h-4 w-4" />
                  Grade Legend
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Anna University R2023 Grading Scale</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(gradeScale).map(([grade, points]) => (
                    <div
                      key={grade}
                      className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded"
                    >
                      <span className="font-semibold">{grade}</span>
                      <Badge variant="secondary">{points} points</Badge>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>

            <Button variant="outline" size="sm" onClick={clearAll} className="gap-2 bg-transparent">
              <RotateCcw className="h-4 w-4" />
              Clear All
            </Button>

            <Button variant="outline" size="sm" onClick={exportToPDF} className="gap-2 bg-transparent">
              <Download className="h-4 w-4" />
              Export PDF
            </Button>
          </div>
        </motion.div>

        {/* Mode Selection */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto mb-8"
        >
          <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-center flex items-center justify-center gap-2">
                <Calculator className="h-5 w-5" />
                Calculator Mode
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={mode === "semester" ? "default" : "outline"}
                  onClick={() => setMode("semester")}
                  className="w-full"
                >
                  Semester GPA
                </Button>
                <Button
                  variant={mode === "overall" ? "default" : "outline"}
                  onClick={() => setMode("overall")}
                  className="w-full"
                >
                  Overall CGPA
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <AnimatePresence mode="wait">
          {mode === "semester" ? (
            <motion.div
              key="semester"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <SemesterMode
                selectedSemester={selectedSemester}
                setSelectedSemester={setSelectedSemester}
                grades={grades}
                updateGrade={updateGrade}
                calculateGPA={calculateGPA}
              />
            </motion.div>
          ) : (
            <motion.div
              key="overall"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <OverallMode
                selectedSemesters={selectedSemesters}
                setSelectedSemesters={setSelectedSemesters}
                grades={grades}
                updateGrade={updateGrade}
                calculateCGPA={calculateCGPA}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function SemesterMode({ selectedSemester, setSelectedSemester, grades, updateGrade, calculateGPA }: any) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Semester Selection */}
      <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-xl">
        <CardHeader>
          <CardTitle>Select Semester</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedSemester} onValueChange={setSelectedSemester}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a semester" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(subjectData).map((semester) => (
                <SelectItem key={semester} value={semester}>
                  Semester {semester}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Subjects */}
      <AnimatePresence>
        {selectedSemester && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-xl">
              <CardHeader>
                <CardTitle>Semester {selectedSemester} Subjects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {subjectData[selectedSemester]?.map((subject, index) => (
                    <motion.div
                      key={subject.code}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 dark:text-white">{subject.code}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{subject.name}</p>
                        <Badge variant="secondary" className="mt-1">
                          {subject.credits} credits
                        </Badge>
                      </div>
                      <div className="ml-4">
                        <Select
                          value={grades[selectedSemester]?.find((g) => g.subjectCode === subject.code)?.grade || ""}
                          onValueChange={(value) => updateGrade(selectedSemester, subject.code, value as Grade)}
                        >
                          <SelectTrigger className="w-24">
                            <SelectValue placeholder="Grade" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.keys(gradeScale).map((grade) => (
                              <SelectItem key={grade} value={grade}>
                                {grade}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* GPA Result */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="backdrop-blur-sm bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-0 shadow-xl">
                <CardContent className="text-center py-8">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    Semester {selectedSemester} GPA
                  </h2>
                  <div className="text-5xl font-bold text-blue-600 dark:text-blue-400">
                    {calculateGPA(selectedSemester).toFixed(2)}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">Grade Point Average</p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function OverallMode({ selectedSemesters, setSelectedSemesters, grades, updateGrade, calculateCGPA }: any) {
  const toggleSemester = (semester: string) => {
    setSelectedSemesters((prev: string[]) =>
      prev.includes(semester) ? prev.filter((s) => s !== semester) : [...prev, semester],
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Semester Selection */}
      <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-xl">
        <CardHeader>
          <CardTitle>Select Semesters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {Object.keys(subjectData).map((semester) => (
              <Button
                key={semester}
                variant={selectedSemesters.includes(semester) ? "default" : "outline"}
                onClick={() => toggleSemester(semester)}
                className="w-full"
              >
                Sem {semester}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Selected Semesters */}
      <AnimatePresence>
        {selectedSemesters.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {selectedSemesters.map((semester, semIndex) => (
              <motion.div
                key={semester}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: semIndex * 0.1 }}
              >
                <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle>Semester {semester}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3">
                      {subjectData[semester]?.map((subject, index) => (
                        <div
                          key={subject.code}
                          className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                        >
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-800 dark:text-white text-sm">
                              {subject.code} - {subject.name}
                            </h4>
                            <Badge variant="secondary" className="mt-1 text-xs">
                              {subject.credits} credits
                            </Badge>
                          </div>
                          <Select
                            value={grades[semester]?.find((g) => g.subjectCode === subject.code)?.grade || ""}
                            onValueChange={(value) => updateGrade(semester, subject.code, value as Grade)}
                          >
                            <SelectTrigger className="w-20">
                              <SelectValue placeholder="Grade" />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.keys(gradeScale).map((grade) => (
                                <SelectItem key={grade} value={grade}>
                                  {grade}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* CGPA Result */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="backdrop-blur-sm bg-gradient-to-r from-green-500/20 to-blue-500/20 border-0 shadow-xl">
                <CardContent className="text-center py-8">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Overall CGPA</h2>
                  <div className="text-6xl font-bold text-green-600 dark:text-green-400">
                    {calculateCGPA().toFixed(2)}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">Cumulative Grade Point Average</p>
                  <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    Based on {selectedSemesters.length} semester{selectedSemesters.length !== 1 ? "s" : ""}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
