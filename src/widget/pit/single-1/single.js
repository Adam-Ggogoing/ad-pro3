import html from './single.html'
import "./single.less"
import _ from 'underscore'

export default (list)=>{
  return _.template(html)({list});
}
