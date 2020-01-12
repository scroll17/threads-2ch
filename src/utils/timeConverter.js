export default function timeConverter(UNIX_timestamp){
  let date = new Date(UNIX_timestamp * 1000);
  let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  let year = date.getFullYear();
  let month = months[date.getMonth()];
  let day = date.getDate();
  let hour = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();
  return (day + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec);
}
