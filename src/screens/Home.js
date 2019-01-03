import React from 'react'
import { View, TextInput, Label, Button } from 'react-desktop/windows'
import styled from 'styled-components'
import RangeSelect from '../components/RangeSelect'
import ApiService from '../services/ApiService'
import Alert from 'sweetalert2/dist/sweetalert2.js'

const TITLE = styled.h1`
  width: 100%;
  text-align: center;
  line-height: 28px;
  font-family: Segoe UI, Frutiger, Frutiger Linotype, Dejavu Sans, Helvetica Neue, Arial, sans-serif;
  font-size: 45px;
  font-weight: 100;
  color: #333;
`;

const SECTION = styled.div`
  display: block;
  width: 100%;
  text-align: center;
`

const DIV = styled.div`
  width: 100%;
  margin-top: 20px;
`

const LABEL = styled.label`
position: relative;
top: 25px;
right: 170px;
font-family: Segoe UI, Frutiger, Frutiger Linotype, Dejavu Sans, Helvetica Neue, Arial, sans-serif;
font-weight: 100;
`

const INPUT = styled.input`
    width: 100px;
    border-style: solid;
    outline-width: 0;
    border-color: rgb(148, 148, 148);
    padding: 2px 10px 3px;
    line-height: 23px;
    border-width: 2px;
    font-size: 15px;
    font-weight: 100;
    color: rgb(0, 0, 0);
    margin-bottom: 18px;
    background: rgba(255, 255, 255, 0.34902);
    font-family: "Segoe UI", Frutiger, "Frutiger Linotype", "Dejavu Sans", "Helvetica Neue", Arial, sans-serif;
`


class Home extends React.Component {

  state = {
    hours: '0',
    minutes: '',
    fatherName: '',
    childName: ''
  }

  updateHours = (hours) => {
    if (this.isNumber(hours)) {
      this.setState({ hours })
    }
  }

  updateMins = (minutes) => {
    if (this.isNumber(minutes)) {
      this.setState({ minutes })
    }
  }

  submitTicket = async () => {

    const min = this.state.minutes || 0
    const data = {
      tutor: this.state.fatherName,
      child: this.state.childName,
      time: parseFloat(this.state.hours, 10) + parseFloat((min / 60), 10)
    }
    const result = await ApiService.saveTicket(data)

    console.log('result', result)
    
    if (result.data.success) {
      Alert.queue([{
        title: 'Listo!',
        text: 'Registro correcto',
        type: 'success',
        confirmButtonText: 'imprimir copia',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return ApiService.rePrintTicket(result.data.ticket)
            .then(data => Alert.insertQueueStep('Listo!'))
            .catch(() => {
              Alert.insertQueueStep({
                type: 'error',
                title: 'Upps! Hubo un error con la impresora!'
              })
            })
        },
        onClose: () => {
          this.setState({ 
            hours: '',
            minutes: '',
            fatherName: '',
            childName: ''
          })
        }
      }])
    }
  }

  closeModal = () => {
    this.setState({ showAlert: false })
  }

  isNumber(val) {
    return val.length === 0 || /^\d+$/.test(val);
  }

  validateForm = () => {
    return !!(this.state.fatherName.length && this.state.childName.length && this.state.hours) 
  }

  render() {

    const valid = this.validateForm()

    return (
      <SECTION>
        <SECTION>
          <TITLE>
            Divertilandia
          </TITLE>
        </SECTION>
        <SECTION>
          <DIV>
            <LABEL>Nombre del papa:</LABEL>
            <div style={{ textAlign: 'center' }} >
              <INPUT 
                placeholder="Papa"
                value={this.state.fatherName}
                onChange={e => this.setState({ fatherName: e.target.value })} />
            </div>
          </DIV>
          <DIV>
            <LABEL>Nombre del niño:</LABEL>
            <div style={{ textAlign: 'center' }} >
              <INPUT 
                placeholder="Niño"
                value={this.state.childName}
                onChange={e => this.setState({ childName: e.target.value })} />
            </div>
          </DIV>
          <DIV>
            <RangeSelect 
              hours={this.state.hours} 
              minutes={this.state.minutes}
              updateHoursHandler={this.updateHours}
              updateMinsHandler={this.updateMins}
              />
          </DIV>
          <DIV>
            <Button push onClick={this.submitTicket} disabled={!valid}>
              Imprimir ticket
            </Button>
          </DIV>
        </SECTION>
      </SECTION>
    )
  }
}

export default Home
