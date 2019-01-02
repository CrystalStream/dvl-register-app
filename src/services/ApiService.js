
import Api from '../utils/api'

export function saveTicket({ tutor, child, time }) {
  return Api.post('/ticket', { 
    tutor,
    child, 
    time 
  })
}

export function rePrintTicket(ticket) {
  return Api.post('/ticket/print', ticket)
}



export default {
  saveTicket,
  rePrintTicket
}