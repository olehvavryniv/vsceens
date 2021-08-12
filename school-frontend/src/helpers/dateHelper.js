export default function weekDayToString(weekDay){
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