/* Вынеси её в отдельный файл fetchCountries.js и сделай именованный экспорт.
 */
export { fetchCountries };

/* Напиши функцию fetchCountries(name) которая делает HTTP-запрос на
ресурс name и возвращает промис с массивом стран - результатом запроса. 
*/


async function fetchCountries(name) {
   
 const response = await fetch(
   `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
 )
   
   if (!response.ok) {
       
     const name = await new Error(response.status);
   }
     
   return await response.json();
      
}