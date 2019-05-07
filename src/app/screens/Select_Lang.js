import React, {Component} from "react";
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import Select from 'react-select'


export class Select_Lang extends React.Component{
	state = {
		native_lang: null,
		target_lang: null
	}
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

	handleNativeChange = (native_lang) => {
		this.setState({native_lang});
	}

	handleTargetChange = (target_lang) => {
		this.setState({target_lang})
	}

	handleFind = () => {
		//mutate the native
		this.props.insert_users_native_langsMutation({
			variables: {
				lang_id: this.state.native_lang.value,
				user_id: 540
			}
		})
		//mutate the target
		this.props.insert_users_target_langsMutation({
			variables: {
				lang_id: this.state.target_lang.value,
				user_id: 540
			}
		})
		//go to search page
    history.push('/loading')
	}
	render(){
		const {native_lang, target_lang} = this.state
		console.log(this.state)
		console.log(this.props)

		return(
			<div>
				<h1>Select Language</h1>
				<div className="select">
					<div>
							<label>Select your native Language</label>
							<Select
								value={native_lang}
								onChange={this.handleNativeChange}
								options={option}
							/>
							<label>Select your target learning Language</label>
							<Select
								value={target_lang}
								onChange={this.handleTargetChange}
								options={option}
							/>
						</div>
				</div>
				<button onClick={this.handleFind}>Search for your buddy</button>
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
const option = []

const insert_users_native_langs = gql`
	mutation insert_users_native_langs ($lang_id: Int!, $user_id: Int!){
		insert_users_native_langs(objects: {lang_id: $lang_id, user_id: $user_id}) {
			returning {
				id
				lang_id
				user_id
			}
		}
	}
`
const insert_users_target_langs = gql`
	mutation insert_users_target_langs ($lang_id: Int!, $user_id: Int!){
		insert_users_target_langs(objects: {lang_id: $lang_id, user_id: $user_id}) {
			returning {
				id
				lang_id
				user_id
			}
		}
	}
`

export default compose(
	graphql(list_languages, {name: "list_languagesQuery"}),
	graphql(insert_users_native_langs, {name: "insert_users_native_langsMutation"}),
	graphql(insert_users_target_langs, {name: "insert_users_target_langsMutation"}),
)(Select_Lang)



