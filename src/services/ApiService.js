
import Api from '../utils/api'

export function printTicket({ tutor, child, time }) {
  return Api.post('/ticket', { 
    tutor,
    child, 
    time 
  })
}

export default {
  printTicket
}