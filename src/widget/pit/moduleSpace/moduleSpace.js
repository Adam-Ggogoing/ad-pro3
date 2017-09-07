import html from './moduleSpace.html'
import "./moduleSpace.less"
import _ from 'underscore'

export default (list)=>{
  return _.template(html)({list});
  console.log(list)
}
