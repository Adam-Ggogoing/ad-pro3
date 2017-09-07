import $ from 'n-zepto'

const content=$('#content')
const mconsole=$('<div></div>')
mconsole.css({
  "position":"fixed",
  "top":0,
  "right":0,
  "position":"fixed",
  "background-color":"#fff",
  "opacity":".7",
  'z-index':999
})
content.append(mconsole)

export default {
  log(text){
    var log=$('<p></p>').css({
      "font-size":".5rem"
    })
    if(typeof(text)==='object'){
      text=JSON.stringify(text)
    }
    log.html(text+'')
    mconsole.append(log)
  }
}
