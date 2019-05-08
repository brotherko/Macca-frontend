import React, { Component} from 'react'
let diff = require('diff')

export default class DiffMessage extends Component{
  constructor(props){
    super(props)
    
  }
  render(){
    const {corr_message, message} = this.props
    var color = '', span=''
    var diff_result = diff.diffChars(message, corr_message)
    console.log(diff_result)
      return(
        <div id="display_diff">
          {Object.keys(diff_result).map( i => {
              console.log(diff_result[i])
              if(diff_result[i].added){
                console.log('1')
                return(
                  <div className="added">{diff_result[i].value} </div>
                )
              }else if(diff_result[i].removed){
                console.log('2')
                return(
                  <div className="removed">{diff_result[i].value} </div>
                ) 
              }else{
                console.log('3')
                return(
                  <div className="normal">{diff_result[i].value} </div>
                )
              }
            }
          )}
        </div>
      )
  }
}
