import html from './module.html'
import "./module.less"
import _ from 'underscore'

export default (list)=>{
  return _.template(html)({list});
}
