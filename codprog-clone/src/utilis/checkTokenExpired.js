export function checkTokenExpired(expiredTime)
{
   const currentTime = Math.floor((Date.now())/1000) ; // date.now  gives us current time in millisecond , so we convert the given time into second;
   return currentTime > expiredTime ;
}