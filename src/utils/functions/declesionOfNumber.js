export function declesionOfNumber(number, textForms){
    number = Math.abs(number) //чтобы работало с отрицательными числами
    let number1 = number % 10; //остаток при делении на 10
  
    if(number > 10 && number < 20){ return textForms[2]; }
    if(number1 > 1 && number1 < 5){ return textForms[1]; }
    if(number1 === 1){ return textForms[0]; }
    
    return textForms[2];
}

//1 минута [0]
//2 минуты [1]
//5 минут [2]