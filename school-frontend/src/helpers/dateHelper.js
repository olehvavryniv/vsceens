export function weekDayToString(weekDay){
    switch (weekDay) {
        case 0:
            return "нд";
        case 1:
            return "пн";
        case 2:
            return "вт";
        case 3:
            return "ср";
        case 4:
            return "чт";
        case 5:
            return "пт";
        case 6:
            return "сб";
        default:
            return "";
    }
}

export function monthToString(month) {
    switch (month) {
        case 0:
            return 'січня';
        case 1:
            return 'лютого';
        case 2:
            return 'березня';
        case 3:
            return 'квітня';
        case 4:
            return 'травня';
        case 5:
            return 'червня';
        case 6:
            return 'липня';
        case 7:
            return 'серпня';
        case 8:
            return 'вересня';
        case 9:
            return 'жовтня';
        case 10:
            return 'листопада';
        case 11:
            return 'грудня';
        default:
            return ''
    }
}