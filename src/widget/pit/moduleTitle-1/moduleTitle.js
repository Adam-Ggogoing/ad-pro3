import html from './moduleTitle.html'
import "./moduleTitle.less"
import _ from 'underscore'

export default (item)=>{
  return _.template(html)(item);
}
