import React from 'react'
import styled from 'styled-components'
import pad from '../utils/pad'

const INPUT = styled.div`
  display: inline-block;
  width: 200px;
`

const LABEL = styled.label`
  font-family: Segoe UI, Frutiger, Frutiger Linotype, Dejavu Sans, Helvetica Neue, Arial, sans-serif;
  font-weight: 100;
  display: inline-block;
`

const OPTIONS = styled.div`
    position: relative;
    bottom: 20px;
    left: 38px;
    border: 2px solid rgb(148, 148, 148);
    float: left;
    background: #FCFCFC;
    width: 60%;
    height: 140px;
    overflow: auto;
`

const UL = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
`

const LI = styled.li`
  padding: 5px;
  border-bottom: 1px solid rgb(148, 148, 148);
  font-family: Segoe UI, Frutiger, Frutiger Linotype, Dejavu Sans, Helvetica Neue, Arial, sans-serif;
  font-weight: 100;
  cursor: pointer;
  &:hover {
    background: rgb(214, 214, 214);
  }
`

const TEXTFIELD = styled.input`
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

export default function RangeSelect(props) {

  const hours = Array(12).fill().map((_, i) => {
    const hour = i + 1
    return <LI key={['hours', hour].join('_')} onClick={() => props.updateHoursHandler(hour.toString())} >{pad(hour.toString())}</LI>
  });

  const mins = Array(5).fill().map((_, i) => {
    const min = (i + 1) * 10
    return <LI key={['min', min].join('_')} onClick={() => props.updateMinsHandler(min.toString())} >{min.toString()}</LI>
  })

  return (
    <div>
      <INPUT>
        <LABEL>Horas:</LABEL>
        <div style={{ textAlign: 'center' }}>
          <TEXTFIELD 
            placeholder="horas" 
            width="100px"
            value={props.hours}
            onChange={e => props.updateHoursHandler(e.target.value)}
            />
        </div>
        <OPTIONS>
          <UL>
           {hours}
          </UL>
        </OPTIONS>
      </INPUT>
      <INPUT>
        <LABEL>Minutos:</LABEL>
        <div style={{ textAlign: 'center' }}>
          <TEXTFIELD 
            placeholder="minutos"
            width="100px"
            value={props.minutes}
            onChange={e => props.updateMinsHandler(e.target.value)}
            />
        </div>
        <OPTIONS>
          <UL>
            {mins}
          </UL>
        </OPTIONS>
      </INPUT>
    </div>
  )
}