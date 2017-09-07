import _ from 'underscore'
import "./title.less"
import template from './title.html'

export default (title)=>{
  return _.template(template)({title})
}
