import React, { Component} from 'react'

export default class InterestDiff extends Component{
	constructor(props){
		super(props)
		this.state = {
			interest_list: [],
			first: 1
		}
	}
	componentDidUpdate(){
		const {members} = this.props
		
		if(members && this.state.first){
			for(var i = 0; i < members[0].user_interests.length; i++){
				var eq_interest = 1
				for(var mem = 1; mem < members.length; mem++){
					for(var k = 0; k < members[mem].user_interests.length; k++){
						if(members[0].user_interests[i].interest_id == members[mem].user_interests[k].interest_id){
							eq_interest++
							break
						}
					}
				}
				if(eq_interest == members.length){
					var tmp = members[0].user_interests[i].name.name
					this.setState({
						interest_id: this.state.interest_list.push(tmp)
					})
				}
				if(this.state.interest_list.length == 3){
					break
				}
				eq_interest = 0;
			}
			this.setState({
				first: 0
			})
		}
	}
	render(){
		return(
			<div>
				Common interest in this room is 
				{this.state.interest_list.map((name, i) => {
					return(
						<span> {name}</span>
					)
				})
					
				}
			</div>
		)
	}

}