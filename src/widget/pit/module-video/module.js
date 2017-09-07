import html from './module.html'
import _ from 'underscore'
export default (list)=>{
  return _.template(html)({list});
}
