export const CommaNumber = (number: number) => {
    if (number === null) {
      return "";
    }
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }