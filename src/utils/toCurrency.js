export default function toCurrency(number) {
    return number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}