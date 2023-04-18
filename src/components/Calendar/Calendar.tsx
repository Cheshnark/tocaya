import { useState } from 'react'
import { 
    add,
    differenceInCalendarDays,
    eachDayOfInterval,
    endOfMonth,
    format,
    getDay,
    isEqual,
    isPast,
    isSameMonth,
    isToday,
    parse,
    startOfToday
 } from 'date-fns'

 function classNames(...classes:any) {
    return classes.filter(Boolean).join(' ')
  }

const Calendar = () => {
    const today = startOfToday()
    const [selectedDay, setSelectedDay] = useState(today)
    const [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
    const firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())
    
  
    let days = eachDayOfInterval({
      start: firstDayCurrentMonth,
      end: endOfMonth(firstDayCurrentMonth),
    })
  
    function previousMonth() {
      let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
      setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }
  
    function nextMonth() {
      let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
      setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }    

    return (
      <div className="pt-8">
        <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">        
          <div className="max-w-sm mx-auto">
            <div className="flex items-center px-4">
              <h2 className="flex-auto font-semibold text-gray-900 text-2xl">
                {format(firstDayCurrentMonth, 'MMMM yyyy')}
              </h2>
              <button
                type="button"
                onClick={previousMonth}
                className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Previous month</span>
                <i className="fa-solid fa-chevron-left w-5 h-5" aria-hidden="true"/>
              </button>
              <button
                onClick={nextMonth}
                type="button"
                className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Next month</span>
                <i className="fa-solid fa-chevron-right w-5 h-5" aria-hidden="true"/> 
              </button>
            </div>
            <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
              <div>S</div>
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
            </div>
            <div className="grid grid-cols-7 mt-2 text-sm">
              {days.map((day, dayIdx) => (
                <div
                  key={day.toString()}
                  className={classNames(
                    dayIdx === 0 && colStartClasses[getDay(day)],
                    'py-1.5'
                  )}
                >
                  <button
                    type="button"
                    onClick={(e) => {                   
                      if(!isPast(day) && differenceInCalendarDays(day, today) > 6) {
                        setSelectedDay(day)
                      }else if(!isPast(day)) {
                        alert('El plazo mínimo de días que tardo en hacer un dibujo es 7 días. Elije una fecha acorde. Porfa <3')
                      }
                    }
                    }
                    className={classNames(
                      isEqual(day, selectedDay) && 'text-white',
                      !isEqual(day, selectedDay) &&
                        isToday(day) &&
                        'text-red-500',
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        isSameMonth(day, firstDayCurrentMonth) &&
                        'text-gray-900',
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        !isSameMonth(day, firstDayCurrentMonth) &&
                        'text-gray-400',
                      isEqual(day, selectedDay) && isToday(day) && 'bg-red-500',
                      isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        'bg-gray-900',
                      !isEqual(day, selectedDay) && 'hover:bg-gray-200',
                      (isEqual(day, selectedDay) || isToday(day)) &&
                        'font-semibold',
                      'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                    )}
                  >
                    {isPast(day) ? (
                      <time dateTime={format(day, 'yyyy-MM-dd')} className='text-gray-300'>
                        {format(day, 'd')}
                      </time>
                    ):(
                      <time dateTime={format(day, 'yyyy-MM-dd')}>
                        {format(day, 'd')}
                      </time>
                    )
                    }
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
}   

let colStartClasses = [
    '',
    'col-start-2',
    'col-start-3',
    'col-start-4',
    'col-start-5',
    'col-start-6',
    'col-start-7',
  ]

export default Calendar