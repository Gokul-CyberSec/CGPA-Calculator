"use client"

import React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Terminal,
  Shield,
  Eye,
  EyeOff,
  Download,
  RotateCcw,
  Info,
  Zap,
  Lock,
  Cpu,
  Github,
  Linkedin,
  Mail,
  Instagram,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Loader from "@/components/ui/loader"
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
  const [darkMode, setDarkMode] = useState(true)
  const [showLegend, setShowLegend] = useState(false)
  const [terminalText, setTerminalText] = useState("")
  const [showMatrix, setShowMatrix] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Loading effect - show loader for 3 seconds
  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)
    return () => clearTimeout(loadingTimer)
  }, [])

  // Terminal typing effect
  useEffect(() => {
    const text = "root@cybersec:~$ ./cgpa_calculator --init"
    let i = 0
    const timer = setInterval(() => {
      if (i < text.length) {
        setTerminalText(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(timer)
      }
    }, 50)
    return () => clearInterval(timer)
  }, [])

  // Matrix rain effect toggle
  useEffect(() => {
    const interval = setInterval(() => {
      setShowMatrix((prev) => !prev)
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    document.documentElement.classList.add("dark")
  }, [])

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
    const content =
      mode === "semester"
        ? `[CLASSIFIED] Semester ${selectedSemester} GPA: ${calculateGPA(selectedSemester).toFixed(2)}`
        : `[CLASSIFIED] Overall CGPA: ${calculateCGPA().toFixed(2)}`

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${mode === "semester" ? "GPA" : "CGPA"}_Report_CLASSIFIED.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono relative overflow-hidden">
      {/* Loading Screen */}
      {isLoading ? (
        <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 mb-4">
              CGPA CALCULATOR
            </h1>
            <p className="text-cyan-400 text-lg mb-8">Initializing Security Protocols...</p>
          </div>
          <Loader />
          <div className="mt-8 text-sm text-gray-500">
            <div className="animate-pulse">Loading cyber security framework...</div>
          </div>
        </div>
      ) : (
        <>
      {/* Matrix Rain Background */}
      {showMatrix && (
        <div className="fixed inset-0 pointer-events-none opacity-10 z-0">
          <div className="matrix-rain">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="matrix-column"
                style={{
                  left: `${i * 5}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${3 + Math.random() * 2}s`,
                }}
              >
                {Array.from({ length: 20 }).map((_, j) => (
                  <span key={j} className="matrix-char">
                    {String.fromCharCode(0x30a0 + Math.random() * 96)}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Terminal Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="bg-gray-900 border border-green-500 rounded-lg p-4 mb-6 shadow-lg shadow-green-500/20">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="ml-4 text-green-400 text-sm">Terminal - CGPA_CALCULATOR version.0.23</span>
            </div>
            <div className="text-green-400 font-mono text-sm">
              {terminalText}
              <span className="animate-pulse">|</span>
            </div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shield className="h-8 w-8 text-cyan-400 animate-pulse" />
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400">
                CGPA CALCULATOR
              </h1>
              <Terminal className="h-8 w-8 text-green-400" />
            </div>
            <div className="text-cyan-400 text-lg mb-2">
              <span className="text-red-400">[CLASSIFIED]</span> B.E Cyber Security • SRM VEC • R2023
            </div>
            <div className="text-xs text-gray-500 mb-6">
              Security Level: <span className="text-red-700">RESTRICTED</span> | Access Level:{" "}
              <span className="text-green-400">AUTHORIZED</span>
            </div>

            {/* Control Panel */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDarkMode(!darkMode)}
                className="gap-2 bg-gray-900 border-green-500 text-green-400 hover:bg-green-500/10"
              >
                {darkMode ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                {darkMode ? "NIGHT_VISION" : "DAY_MODE"}
              </Button>

              <Dialog open={showLegend} onOpenChange={setShowLegend}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 bg-gray-900 border-cyan-500 text-cyan-400 hover:bg-cyan-500/10"
                  >
                    <Info className="h-4 w-4" />
                    GRADE_LEGEND
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-900 border-green-500 text-green-400">
                  <DialogHeader>
                    <DialogTitle className="text-cyan-400">
                      <Lock className="inline h-4 w-4 mr-2" />
                      ANNA UNIVERSITY R2023 GRADING MATRIX
                    </DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(gradeScale).map(([grade, points]) => (
                      <div
                        key={grade}
                        className="flex justify-between items-center p-2 bg-gray-800 border border-green-500/30 rounded"
                      >
                        <span className="font-bold text-yellow-400">{grade}</span>
                        <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                          {points} pts
                        </Badge>
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>

              <Button
                variant="outline"
                size="sm"
                onClick={clearAll}
                className="gap-2 bg-gray-900 border-red-500 text-red-400 hover:bg-red-500/10"
              >
                <RotateCcw className="h-4 w-4" />
                RESET_ALL
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={exportToPDF}
                className="gap-2 bg-gray-900 border-yellow-500 text-yellow-400 hover:bg-yellow-500/10"
              >
                <Download className="h-4 w-4" />
                EXPORT_DATA
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Mode Selection */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto mb-8"
        >
          <Card className="bg-gray-900 border-green-500 shadow-lg shadow-green-500/20">
            <CardHeader>
              <CardTitle className="text-center flex items-center justify-center gap-2 text-cyan-400">
                <Cpu className="h-5 w-5" />
                OPERATION MODE
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={mode === "semester" ? "default" : "outline"}
                  onClick={() => setMode("semester")}
                  className={`w-full ${
                    mode === "semester"
                      ? "bg-green-500 text-black hover:bg-green-400"
                      : "bg-gray-800 border-green-500 text-green-400 hover:bg-green-500/10"
                  }`}
                >
                  SEMESTER_GPA
                </Button>
                <Button
                  variant={mode === "overall" ? "default" : "outline"}
                  onClick={() => setMode("overall")}
                  className={`w-full ${
                    mode === "overall"
                      ? "bg-cyan-500 text-black hover:bg-cyan-400"
                      : "bg-gray-800 border-cyan-500 text-cyan-400 hover:bg-cyan-500/10"
                  }`}
                >
                  OVERALL_CGPA
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

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-16 border-t border-green-500/30 pt-8"
        >
          <div className="bg-gray-900 border border-green-500/50 rounded-lg p-6 shadow-lg shadow-green-500/20">
            <div className="text-center space-y-4">
              {/* Copyright */}
              <div className="text-green-400 font-mono text-sm">
                <span className="text-cyan-400">[SYSTEM_INFO]</span> © 2025 Gokul Amaran. All rights reserved.
              </div>

              {/* Social Links */}
              <div className="flex items-center justify-center gap-6">
                <a
                  href="https://github.com/Microchip007/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-3 py-2 bg-gray-800 border border-green-500/30 rounded-lg hover:border-green-500 hover:bg-green-500/10 transition-all duration-300"
                >
                  <Github className="h-4 w-4 text-green-400 group-hover:text-green-300" />
                  <span className="text-green-400 group-hover:text-green-300 font-mono text-sm">{""}</span>
                </a>

                <a
                  href="https://linkedin.com/in/gokulamaran"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-3 py-2 bg-gray-800 border border-cyan-500/30 rounded-lg hover:border-cyan-500 hover:bg-cyan-500/10 transition-all duration-300"
                >
                  <Linkedin className="h-4 w-4 text-cyan-400 group-hover:text-cyan-300" />
                  <span className="text-cyan-400 group-hover:text-cyan-300 font-mono text-sm">{""}</span>
                </a>

                <a
                  href="mailto:cipherman.in"
                  className="group flex items-center gap-2 px-3 py-2 bg-gray-800 border border-yellow-500/30 rounded-lg hover:border-yellow-500 hover:bg-yellow-500/10 transition-all duration-300"
                >
                  <Mail className="h-4 w-4 text-yellow-400 group-hover:text-yellow-300" />
                  <span className="text-yellow-400 group-hover:text-yellow-300 font-mono text-sm">{""}</span>
                </a>

                <a
                  href="https://instagram.com/gokulamaran"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-3 py-2 bg-gray-800 border border-pink-500/30 rounded-lg hover:border-pink-500 hover:bg-pink-500/10 transition-all duration-300"
                >
                  <Instagram className="h-4 w-4 text-pink-400 group-hover:text-pink-300" />
                  <span className="text-pink-400 group-hover:text-pink-300 font-mono text-sm">{""}</span>
                </a>
              </div>

              {/* Additional Info */}
              <div className="text-xs text-gray-500 font-mono">
                <span className="text-red-400">[DEVELOPER]</span> B.E Cyber Security Student |
                <span className="text-green-400">    SRM~vec$cys R2023</span>
              </div>

              {/* System Status */}
              <div className="flex items-center justify-center gap-4 text-xs font-mono">
                <span className="text-gray-500">System Status:</span>
                <span className="text-green-400 animate-pulse">● ONLINE</span>
                <span className="text-gray-500">|</span>
                <span className="text-cyan-400">Security Level: AUTHORIZED</span>
                <span className="text-gray-500">|</span>
                <span className="text-yellow-400">Build: Cipherman </span>
              </div>
            </div>
          </div>
        </motion.footer>
      </div>
        </>
      )}
    </div>
  )
}

function SemesterMode({ selectedSemester, setSelectedSemester, grades, updateGrade, calculateGPA }: any) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Semester Selection */}
      <Card className="bg-gray-900 border-green-500 shadow-lg shadow-green-500/20">
        <CardHeader>
          <CardTitle className="text-green-400">
            <Zap className="inline h-5 w-5 mr-2" />
            SELECT TARGET SEMESTER
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedSemester} onValueChange={setSelectedSemester}>
            <SelectTrigger className="bg-gray-800 border-green-500 text-green-400">
              <SelectValue placeholder=">>> Choose semester to analyze" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-green-500">
              {Object.keys(subjectData).map((semester) => (
                <SelectItem key={semester} value={semester} className="text-green-400 hover:bg-green-500/10">
                  SEMESTER_{semester}.exe
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
            <Card className="bg-gray-900 border-cyan-500 shadow-lg shadow-cyan-500/20">
              <CardHeader>
                <CardTitle className="text-cyan-400">
                  <Shield className="inline h-5 w-5 mr-2" />
                  SEMESTER_{selectedSemester} MODULES
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {subjectData[selectedSemester]?.map((subject, index) => (
                    <motion.div
                      key={subject.code}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-800 border border-green-500/30 rounded-lg hover:border-green-500/60 transition-colors"
                    >
                      <div className="flex-1">
                        <h3 className="font-bold text-yellow-400 font-mono">{subject.code}</h3>
                        <p className="text-sm text-green-400">{subject.name}</p>
                        <Badge variant="secondary" className="mt-1 bg-cyan-500/20 text-cyan-400">
                          {subject.credits} CREDITS
                        </Badge>
                      </div>
                      <div className="ml-4">
                        <Select
                          value={grades[selectedSemester]?.find((g) => g.subjectCode === subject.code)?.grade || ""}
                          onValueChange={(value) => updateGrade(selectedSemester, subject.code, value as Grade)}
                        >
                          <SelectTrigger className="w-24 bg-gray-700 border-yellow-500 text-yellow-400">
                            <SelectValue placeholder="--" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-yellow-500">
                            {Object.keys(gradeScale).map((grade) => (
                              <SelectItem key={grade} value={grade} className="text-yellow-400 hover:bg-yellow-500/10">
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
              <Card className="bg-gradient-to-r from-gray-900 via-green-900/20 to-gray-900 border-green-500 shadow-lg shadow-green-500/30">
                <CardContent className="text-center py-8">
                  <h2 className="text-2xl font-bold text-green-400 mb-2 font-mono">
                    [DECRYPTED] SEMESTER_{selectedSemester} GPA
                  </h2>
                  <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400 font-mono">
                    {calculateGPA(selectedSemester).toFixed(2)}
                  </div>
                  <p className="text-cyan-400 mt-2 font-mono">GRADE_POINT_AVERAGE.exe</p>
                  <div className="mt-4 text-xs text-gray-500">
                    Status: <span className="text-green-400">CALCULATION_COMPLETE</span>
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

function OverallMode({ selectedSemesters, setSelectedSemesters, grades, updateGrade, calculateCGPA }: any) {
  const toggleSemester = (semester: string) => {
    setSelectedSemesters((prev: string[]) =>
      prev.includes(semester) ? prev.filter((s) => s !== semester) : [...prev, semester],
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Semester Selection */}
      <Card className="bg-gray-900 border-cyan-500 shadow-lg shadow-cyan-500/20">
        <CardHeader>
          <CardTitle className="text-cyan-400">
            <Terminal className="inline h-5 w-5 mr-2" />
            SELECT SEMESTERS FOR ANALYSIS
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {Object.keys(subjectData).map((semester) => (
              <Button
                key={semester}
                variant={selectedSemesters.includes(semester) ? "default" : "outline"}
                onClick={() => toggleSemester(semester)}
                className={`w-full font-mono ${
                  selectedSemesters.includes(semester)
                    ? "bg-cyan-500 text-black hover:bg-cyan-400"
                    : "bg-gray-800 border-cyan-500 text-cyan-400 hover:bg-cyan-500/10"
                }`}
              >
                SEM_{semester}
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
            {selectedSemesters.map((semester: string, semIndex: number) => (
              <motion.div
                key={semester}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: semIndex * 0.1 }}
              >
                <Card className="bg-gray-900 border-green-500/50 shadow-lg shadow-green-500/10">
                  <CardHeader>
                    <CardTitle className="text-green-400 font-mono">
                      <Lock className="inline h-4 w-4 mr-2" />
                      SEMESTER_{semester}_MODULES.dat
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3">
                      {subjectData[semester]?.map((subject, index) => (
                        <div
                          key={subject.code}
                          className="flex items-center justify-between p-3 bg-gray-800 border border-green-500/20 rounded-lg hover:border-green-500/40 transition-colors"
                        >
                          <div className="flex-1">
                            <h4 className="font-medium text-yellow-400 text-sm font-mono">
                              {subject.code} - {subject.name}
                            </h4>
                            <Badge variant="secondary" className="mt-1 text-xs bg-cyan-500/20 text-cyan-400">
                              {subject.credits} CR
                            </Badge>
                          </div>
                          <Select
                            value={grades[semester]?.find((g) => g.subjectCode === subject.code)?.grade || ""}
                            onValueChange={(value) => updateGrade(semester, subject.code, value as Grade)}
                          >
                            <SelectTrigger className="w-20 bg-gray-700 border-yellow-500 text-yellow-400">
                              <SelectValue placeholder="--" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-900 border-yellow-500">
                              {Object.keys(gradeScale).map((grade) => (
                                <SelectItem
                                  key={grade}
                                  value={grade}
                                  className="text-yellow-400 hover:bg-yellow-500/10"
                                >
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
              <Card className="bg-gradient-to-r from-gray-900 via-cyan-900/20 to-gray-900 border-cyan-500 shadow-lg shadow-cyan-500/30">
                <CardContent className="text-center py-8">
                  <h2 className="text-2xl font-bold text-cyan-400 mb-2 font-mono">[CLASSIFIED] OVERALL CGPA</h2>
                  <div className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 font-mono">
                    {calculateCGPA().toFixed(2)}
                  </div>
                  <p className="text-green-400 mt-2 font-mono">CUMULATIVE_GRADE_POINT_AVERAGE.exe</p>
                  <div className="mt-4 text-sm text-gray-400 font-mono">
                    Analyzed {selectedSemesters.length} semester{selectedSemesters.length !== 1 ? "s" : ""} | Status:{" "}
                    <span className="text-green-400">SECURE</span>
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
