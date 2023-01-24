function createEmployeeRecord (employee) {
    const newEmployee = {}
        newEmployee.firstName = employee[0],
        newEmployee.familyName = employee[1],
        newEmployee.title = employee[2],
        newEmployee.payPerHour = employee[3],
        newEmployee.timeInEvents = [],
        newEmployee.timeOutEvents = []
    return newEmployee
}

function createEmployeeRecords (array) {
    const employeesObjArray = array.map(employee => createEmployeeRecord(employee));
    return employeesObjArray
}

function createTimeInEvent(newEmployee, dateStamp) {
    newEmployee.timeInEvents.push({
        type: "TimeIn",
        hour: Number(dateStamp.slice(11)),
        date: dateStamp.slice(0, 10)
    })
    return newEmployee
}

function createTimeOutEvent(newEmployee, dateStamp) {
    newEmployee.timeOutEvents.push({
        type: "TimeOut",
        hour: Number(dateStamp.slice(11)),
        date: dateStamp.slice(0, 10)
    })
    return newEmployee
}

function hoursWorkedOnDate (newEmployee, date) {
    if (newEmployee.timeOutEvents.find(el => el.date === date).date === newEmployee.timeInEvents.find(el => el.date === date).date) {
        return (newEmployee.timeOutEvents.find(el => el.date === date).hour - newEmployee.timeInEvents.find(el => el.date === date).hour)/100
    }
}

function wagesEarnedOnDate (newEmployee, date) {
    const hoursWorked = hoursWorkedOnDate(newEmployee, date);
    return hoursWorked * newEmployee.payPerHour
}

function allWagesFor (newEmployee) {
    const allDates = newEmployee.timeInEvents.map(el => el["date"])
    const allWages = []
    for (let date of allDates) {
        allWages.push(wagesEarnedOnDate(newEmployee, date))
    }
    const total = allWages.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    return total;
}

function calculatePayroll (employeeArray) {
    let total = 0
    for (let i = 0; i < employeeArray.length; i++) {
        total += allWagesFor(employeeArray[i])
    }
    return total
}


// allWagesFor({payPerHour: 20, timeInEvents: [{type: "TimeIn", hour: 1900, date: "01-02-1998"}], timeOutEvents: [{type: "TimeOut", hour: 2100, date: "01-02-1998"}]}, "01-02-1998")
