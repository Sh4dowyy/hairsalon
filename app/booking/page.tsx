"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { format, addDays, startOfWeek, addWeeks, isSameDay } from "date-fns"
import { ru } from "date-fns/locale"
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useToast } from "@/hooks/use-toast"

// Mock data
const stylists = [
  { id: 1, name: "Анна Иванова", specialization: "Стилист-колорист" },
  { id: 2, name: "Мария Петрова", specialization: "Стилист-парикмахер" },
  { id: 3, name: "Елена Сидорова", specialization: "Мастер-универсал" },
  { id: 4, name: "Александр Козлов", specialization: "Барбер" },
]

const timeSlots = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"]

interface UnavailableTime {
  date: Date
  slots: string[]
}

export default function BookingPage() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [stylistId, setStylistId] = useState<string>("")
  const [service, setService] = useState<string>("")
  const [time, setTime] = useState<string>("")
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }))
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([])
  const [stylistUnavailableTimes, setStylistUnavailableTimes] = useState<UnavailableTime[]>([])
  const { toast } = useToast()

  const services = ["Женская стрижка", "Мужская стрижка", "Окрашивание", "Укладка", "Стрижка бороды", "Детская стрижка"]

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i))

  // Load stylist unavailable times when stylist changes
  useEffect(() => {
    if (stylistId) {
      // In a real app, you would fetch this from the server
      const storedUnavailableTimes = localStorage.getItem(`unavailable_${stylistId}`)

      if (storedUnavailableTimes) {
        try {
          const parsedTimes = JSON.parse(storedUnavailableTimes)
          // Convert string dates back to Date objects
          setStylistUnavailableTimes(
            parsedTimes.map((item: any) => ({
              date: new Date(item.date),
              slots: item.slots,
            })),
          )
        } catch (error) {
          console.error("Error parsing stored unavailable times:", error)
          setStylistUnavailableTimes([])
        }
      } else {
        setStylistUnavailableTimes([])
      }
    } else {
      setStylistUnavailableTimes([])
    }
  }, [stylistId])

  // Update available time slots when date or stylist changes
  useEffect(() => {
    if (date && stylistId) {
      // Find unavailable slots for the selected date and stylist
      const unavailableForDate = stylistUnavailableTimes.find((item) => isSameDay(new Date(item.date), date))

      const unavailableSlots = unavailableForDate?.slots || []

      // Filter out unavailable slots
      const available = timeSlots.filter((slot) => !unavailableSlots.includes(slot))
      setAvailableTimeSlots(available)

      // Reset selected time if it's no longer available
      if (time && unavailableSlots.includes(time)) {
        setTime("")
      }
    } else {
      setAvailableTimeSlots([])
    }
  }, [date, stylistId, stylistUnavailableTimes, time])

  const handlePrevWeek = () => {
    setCurrentWeekStart(addWeeks(currentWeekStart, -1))
  }

  const handleNextWeek = () => {
    setCurrentWeekStart(addWeeks(currentWeekStart, 1))
  }

  const handleDateSelect = (day: Date) => {
    setDate(day)
    setTime("")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!date || !time || !stylistId || !service) {
      toast({
        title: "Ошибка бронирования",
        description: "Пожалуйста, заполните все поля",
        variant: "destructive",
      })
      return
    }

    // Here you would typically send the booking data to your backend
    toast({
      title: "Бронирование успешно!",
      description: `Дата: ${format(date, "dd.MM.yyyy")}\nВремя: ${time}\nМастер: ${stylists.find((s) => s.id.toString() === stylistId)?.name}\nУслуга: ${service}`,
    })

    // Reset form
    setDate(undefined)
    setStylistId("")
    setService("")
    setTime("")
  }

  // Check if a day has unavailable times for the selected stylist
  const isDayUnavailable = (day: Date) => {
    if (!stylistId) return false

    const unavailableForDate = stylistUnavailableTimes.find((item) => isSameDay(new Date(item.date), day))

    // If all time slots are unavailable, the day is fully unavailable
    return unavailableForDate?.slots.length === timeSlots.length
  }

  return (
    <main className="flex flex-col min-h-screen py-12">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Онлайн-запись</h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Выберите удобное время и запишитесь к нашим мастерам
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Выберите дату</CardTitle>
              <CardDescription>Выберите удобную дату для записи</CardDescription>
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
                      disabled={(date) => {
                        const today = new Date()
                        today.setHours(0, 0, 0, 0)
                        return date < today || isDayUnavailable(date)
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="hidden md:block">
                <div className="flex justify-between items-center p-4">
                  <Button variant="outline" size="icon" onClick={handlePrevWeek}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="font-medium">
                    {format(currentWeekStart, "d MMMM", { locale: ru })} -{" "}
                    {format(addDays(currentWeekStart, 6), "d MMMM", { locale: ru })}
                  </div>
                  <Button variant="outline" size="icon" onClick={handleNextWeek}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-7 gap-1 p-4">
                  {weekDays.map((day) => {
                    const today = new Date()
                    today.setHours(0, 0, 0, 0)
                    const isPastDay = day < today
                    const isFullyUnavailable = isDayUnavailable(day)
                    const isDisabled = isPastDay || isFullyUnavailable

                    return (
                      <Button
                        key={day.toString()}
                        variant={isSameDay(day, date || new Date(0)) ? "default" : "outline"}
                        className={cn(
                          "h-14 w-full",
                          isFullyUnavailable &&
                            "bg-destructive/10 text-destructive hover:bg-destructive/20 hover:text-destructive",
                        )}
                        disabled={isDisabled}
                        onClick={() => handleDateSelect(day)}
                      >
                        <div className="flex flex-col items-center">
                          <span className="text-xs">{format(day, "EEE", { locale: ru })}</span>
                          <span className="text-lg">{format(day, "d")}</span>
                        </div>
                      </Button>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Детали записи</CardTitle>
              <CardDescription>Выберите услугу, мастера и время</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Услуга
                  </label>
                  <Select value={service} onValueChange={setService}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите услугу" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Мастер
                  </label>
                  <Select value={stylistId} onValueChange={setStylistId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите мастера" />
                    </SelectTrigger>
                    <SelectContent>
                      {stylists.map((stylist) => (
                        <SelectItem key={stylist.id} value={stylist.id.toString()}>
                          {stylist.name} ({stylist.specialization})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {date && stylistId && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Время ({format(date, "d MMM", { locale: ru })})
                    </label>
                    {availableTimeSlots.length > 0 ? (
                      <div className="grid grid-cols-5 gap-2">
                        {availableTimeSlots.map((slot) => (
                          <Button
                            key={slot}
                            type="button"
                            variant={time === slot ? "default" : "outline"}
                            className="h-10"
                            onClick={() => setTime(slot)}
                          >
                            {slot}
                          </Button>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4 text-muted-foreground">
                        Нет доступного времени на эту дату у выбранного мастера
                      </div>
                    )}
                  </div>
                )}
              </form>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="w-full"
                disabled={!date || !time || !stylistId || !service}
                onClick={handleSubmit}
              >
                Записаться
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  )
}

