/* 
* 大整数加法
* @params a，b为string
*/

export default function add(a,b){
    let i = a.length - 1;
    let j = b.length - 1; 
    let carry = 0;//产生的进位
    let ret = '';
    while(i >= 0 || j >= 0){
        let x = 0;
        let y = 0;
        let sum;
        if(i >= 0){
            x = a[i] - '0';//转化为数字
            i--;
        }
        if(j >= 0){
            y = b[j] - '0';//转化为数字
            j--;
        }
        sum = x+y+carry;
        if(sum >= 10){
            carry = 1;
            sum -= 10;
        }else{
            carry = 0;
        }
        ret = sum+ret
    }
    if(carry){
        ret = carry + ret;//进位一定要写在前面
    }
    return ret;
}