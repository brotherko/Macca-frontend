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
      return(
        <div id="display_diff">
          {Object.keys(diff_result).map( i => {
              if(diff_result[i].added){
                return(
                  <div className="added">{diff_result[i].value} </div>
                )
              }else if(diff_result[i].removed){
                return(
                  <div className="removed">{diff_result[i].value} </div>
                ) 
              }else{
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
