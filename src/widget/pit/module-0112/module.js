import _ from 'underscore'
import template from './module.html'
import "./module.less"

export default (list)=>{
  return _.template(template)({list})
}
