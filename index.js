// Your code here
function createEmployeeRecord(array){
    const employeeRecord = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
    return employeeRecord
};

function createEmployeeRecords(array){
    let employeeObject = array.map(function(x){
      return createEmployeeRecord(x)
     })
     return employeeObject;
   };

function createTimeInEvent(employeeRecord, dateStamp){
    let splitDateStamp = dateStamp.split(" ");
    employeeRecord.timeInEvents.push({
        type: `TimeIn`,
        hour: (+splitDateStamp[1]),
        date: splitDateStamp[0]
    } )
    return employeeRecord;
};

function createTimeOutEvent(employeeRecord, dateStamp){
    let splitDateStamp = dateStamp.split(" ");
    employeeRecord.timeOutEvents.push({
        type: `TimeOut`,
        hour: (+splitDateStamp[1]),
        date: splitDateStamp[0]
    }) 
    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date){
    let clockInArray = employeeRecord.timeInEvents;
    let clockInObject = clockInArray.find(function(object){
        return object.date === date;
    })

    let clockOutArray = employeeRecord.timeOutEvents;
    let clockOutObject = clockOutArray.find(function(object){
        return object.date === date;
    })


return (clockOutObject.hour - clockInObject.hour)/100;
}

function wagesEarnedOnDate(employeeRecord, date){

    let hours = hoursWorkedOnDate(employeeRecord, date);
    let totalPay = hours * employeeRecord.payPerHour;
    return totalPay;
}




function allWagesFor(employeeRecord) {
    let totalWages = employeeRecord.timeInEvents.reduce(function (accumulator, timeInEvent) {
      const date = timeInEvent.date;
      const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
      const dailyWage = hoursWorked * employeeRecord.payPerHour;
      return accumulator + dailyWage;
    }, 0);
  
    return totalWages;
  }

  
function calculatePayroll(array){
    let totalPayroll = array.reduce(function (accumulator, employeeRecord) {
        return accumulator + allWagesFor(employeeRecord);
      }, 0);
      return totalPayroll;
}



