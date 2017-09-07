import _ from 'underscore'
var picker=list=>{
  if(!_.isArray(list)){
    return list
  }
  var single=list.shift()
  while(list.length>0&&!single.items){
    single=list.shift()
  }
  return single
}
var parseDate = (timesamp)=>{
  var date = new Date(timesamp)
  return [date.getFullYear(),date.getMonth()+1,date.getDate()].join('-')+
    ' '+[date.getHours(),date.getMinutes(),date.getSeconds()].join(':')
}
var download = '//m.xianzaishi.com/mobile/download.html'
export default {picker,parseDate,download}
