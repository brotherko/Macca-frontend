import React, {Component} from "react";
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import Select from 'react-select'

const option = []
export class Select_Lang extends React.Component{
	componentDidUpdate(){
		const {list_languages} = this.props.list_languagesQuery
		for(var i = 0; i < list_languages.length; i++){
			var tmp = {
				value: list_languages[i].id,
				label: list_languages[i].name
			}
			option.push(tmp)
		}
	}
	render(){
		console.log(this.props)
		return(
			<div>
				<h1>Select Language</h1>
				
			</div>
		)
	}
}

const list_languages = gql`
	query list_languages{
		list_languages {
			id
			name
		}
	}
`

export default compose(
	graphql(list_languages, {name: "list_languagesQuery"})
)(Select_Lang)



