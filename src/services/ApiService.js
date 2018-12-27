
import Api from '../utils/api'

export function printTicket({ father, child, time }) {
  return Api.post('/print', { 
    father,
    child, 
    time 
  })
}

export default {
  printTicket
}