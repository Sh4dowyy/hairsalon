"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { format, isSameDay, addMonths, subMonths } from "date-fns"
import { ru } from "date-fns/locale"
import { CalendarIcon, ChevronLeft, ChevronRight, Clock, LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

// Mock time slots
const TIME_SLOTS = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"]

interface Employee {
  id: number
  name: string
  email: string
}

interface UnavailableTime {
  date: Date
  slots: string[]
}

export default function SchedulePage() {
  const [employee, setEmployee] = useState<Employee | null>(null)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [unavailableTimes, setUnavailableTimes] = useState<UnavailableTime[]>([])
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([])
  const router = useRouter()
  const { toast } = useToast()

  // Load employee data and unavailable times on mount
  useEffect(() => {
    const storedEmployee = localStorage.getItem("employee")

    if (!storedEmployee) {
      router.push("/admin/login")
      return
    }

    const employeeData = JSON.parse(storedEmployee) as Employee
    setEmployee(employeeData)

    // In a real app, you would fetch the employee's unavailable times from the server
    const storedUnavailableTimes = localStorage.getItem(`unavailable_${employeeData.id}`)
    if (storedUnavailableTimes) {
      try {
        const parsedTimes = JSON.parse(storedUnavailableTimes)
        // Convert string dates back to Date objects
        setUnavailableTimes(
          parsedTimes.map((item: any) => ({
            date: new Date(item.date),
            slots: item.slots,
          })),
        )
      } catch (error) {
        console.error("Error parsing stored unavailable times:", error)
      }
    }
  }, [router])

  // When date changes, load the selected time slots for that date
  useEffect(() => {
    if (date) {
      const unavailableForDate = unavailableTimes.find((item) => isSameDay(new Date(item.date), date))

      setSelectedTimeSlots(unavailableForDate?.slots || [])
    } else {
      setSelectedTimeSlots([])
    }
  }, [date, unavailableTimes])

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const handleTimeSlotToggle = (timeSlot: string) => {
    setSelectedTimeSlots((prev) =>
      prev.includes(timeSlot) ? prev.filter((slot) => slot !== timeSlot) : [...prev, timeSlot],
    )
  }

  const handleSaveUnavailableTimes = () => {
    if (!date || !employee) return

    // Update or add the unavailable times for the selected date
    const updatedUnavailableTimes = [...unavailableTimes]
    const existingIndex = updatedUnavailableTimes.findIndex((item) => isSameDay(new Date(item.date), date))

    if (existingIndex >= 0) {
      // Update existing entry
      if (selectedTimeSlots.length > 0) {
        updatedUnavailableTimes[existingIndex] = {
          date: date,
          slots: selectedTimeSlots,
        }
      } else {
        // Remove entry if no slots are selected
        updatedUnavailableTimes.splice(existingIndex, 1)
      }
    } else if (selectedTimeSlots.length > 0) {
      // Add new entry
      updatedUnavailableTimes.push({
        date: date,
        slots: selectedTimeSlots,
      })
    }

    setUnavailableTimes(updatedUnavailableTimes)

    // Save to localStorage (in a real app, you would save to a database)
    localStorage.setItem(`unavailable_${employee.id}`, JSON.stringify(updatedUnavailableTimes))

    toast({
      title: "Расписание обновлено",
      description: `Недоступное время на ${format(date, "dd.MM.yyyy")} сохранено.`,
    })
  }

  const handleLogout = () => {
    localStorage.removeItem("employee")
    router.push("/admin/login")
  }

  // Get days with unavailable times for highlighting in the calendar
  const daysWithUnavailableTimes = unavailableTimes.map((item) => new Date(item.date))

  if (!employee) {
    return <div className="flex justify-center items-center min-h-screen">Загрузка...</div>
  }

  return (
    <main className="flex flex-col min-h-screen py-12">
      <div className="container px-4 md:px-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter">Управление расписанием</h1>
            <p className="text-muted-foreground">
              Здравствуйте, {employee.name}. Здесь вы можете отметить время, когда вы недоступны для работы.
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Выйти
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <Card>
            <CardHeader>
              <CardTitle>Выберите дату</CardTitle>
              <CardDescription>Отметьте дни, когда вы не можете работать</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="md:hidden p-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP", { locale: ru }) : "Выберите дату"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      locale={ru}
                      modifiers={{
                        unavailable: daysWithUnavailableTimes,
                      }}
                      modifiersStyles={{
                        unavailable: {
                          backgroundColor: "rgba(239, 68, 68, 0.1)",
                          color: "rgb(239, 68, 68)",
                          fontWeight: "bold",
                        },
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="hidden md:block p-4">
                <div className="flex justify-between items-center mb-4">
                  <Button variant="outline" size="icon" onClick={handlePrevMonth}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <h2 className="font-medium">{format(currentMonth, "LLLL yyyy", { locale: ru })}</h2>
                  <Button variant="outline" size="icon" onClick={handleNextMonth}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  month={currentMonth}
                  onMonthChange={setCurrentMonth}
                  locale={ru}
                  className="rounded-md border"
                  modifiers={{
                    unavailable: daysWithUnavailableTimes,
                  }}
                  modifiersStyles={{
                    unavailable: {
                      backgroundColor: "rgba(239, 68, 68, 0.1)",
                      color: "rgb(239, 68, 68)",
                      fontWeight: "bold",
                    },
                  }}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Недоступное время</CardTitle>
              <CardDescription>
                {date
                  ? `Выберите часы, когда вы недоступны ${format(date, "d MMMM", { locale: ru })}`
                  : "Выберите дату в календаре"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {date ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-5 gap-2">
                    {TIME_SLOTS.map((timeSlot) => (
                      <Button
                        key={timeSlot}
                        variant={selectedTimeSlots.includes(timeSlot) ? "default" : "outline"}
                        className={cn(
                          "h-10",
                          selectedTimeSlots.includes(timeSlot) &&
                            "bg-destructive hover:bg-destructive/90 text-destructive-foreground",
                        )}
                        onClick={() => handleTimeSlotToggle(timeSlot)}
                      >
                        {timeSlot}
                      </Button>
                    ))}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>Выбрано недоступных часов: {selectedTimeSlots.length}</span>
                  </div>
                </div>
              ) : (
                <div className="flex justify-center items-center h-40 text-muted-foreground">
                  Выберите дату в календаре слева
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveUnavailableTimes} className="w-full" disabled={!date}>
                Сохранить
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Ваше расписание недоступности</CardTitle>
            <CardDescription>Обзор всех дней, когда вы отметили недоступное время</CardDescription>
          </CardHeader>
          <CardContent>
            {unavailableTimes.length > 0 ? (
              <div className="space-y-4">
                {unavailableTimes
                  .sort((a, b) => a.date.getTime() - b.date.getTime())
                  .map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="font-medium mb-2 sm:mb-0">
                        {format(new Date(item.date), "d MMMM yyyy", { locale: ru })}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {item.slots.sort().map((slot) => (
                          <span key={slot} className="px-2 py-1 bg-destructive/10 text-destructive rounded text-sm">
                            {slot}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">У вас пока нет отмеченных недоступных часов</div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

