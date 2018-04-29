import React, { Component, PropTypes } from 'react';
import { connect }                from 'react-redux'
import { bindActionCreators }     from 'redux'

import * as agentActionCreater from 'redux/modules/agentInfoStore'
import {Table, GlobalSearchBox} from 'components'
import { full_width} from 'sharedStyle/sharedStyle.scss'
import {debounce} from 'config/helperFunction'


class AgentInfoContainer extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {
          requestSent: false,
          increaseCounter: 1,
          filterVal: "",
          currentAgentList: this.props.currentAgentList,
        }
    }
  	
    componentWillReceiveProps (nextProps) {
        this.state.currentAgentList = nextProps.currentAgentList
    }

  	componentDidMount() {
      window.addEventListener('scroll', this.handleOnScroll);
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.handleOnScroll);
    }
    
    /**
     * / querySearchResult to update current agent list in store
     * @return {[type]} [description]
     */
    querySearchResult = () => {
    	this.props.getMoreAgent()
    }

    /**
     * / searchFilter is to search from the tabuler list (you can search from every field)
     * @param  {[type]} e [key to search from list]
     */
    searchFilter = (e) => {
    	let value = e.target.value
    	let currentAgentList = this.props.currentAgentList
    	let keyName = e.target.getAttribute("data")
    	
  		debounce(() => {
  			console.log(value)
    		let netAgentList = value && value.length ? currentAgentList.filter(x => JSON.stringify(x).toLowerCase().includes(value.toLowerCase())) : this.props.currentAgentList
    		this.setState({currentAgentList: netAgentList})
  		}, 250)();
    	this.setState({filterVal: value})
    }

    /**
     * / handleOnScroll to get more agents list when user scroll
     * @return {[type]} [description]
     */
    handleOnScroll = () => {
    	var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
      var scrollHeight = (document.body && document.body.scrollHeight) || document.body.scrollHeight;
      var clientHeight = document.documentElement.clientHeight || window.innerHeight;
      var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight-(200*this.state.increaseCounter);

      if (scrolledToBottom) {
      	this.state.increaseCounter = this.state.increaseCounter+1
        this.querySearchResult();
      }
    }

    inputKeyPress = (event) => {
      let e = event.which
      if(e == 27){
        this.removeSearch()
      }
    } 

    removeSearch = () => {
      this.setState({filterVal: "", currentAgentList: this.props.currentAgentList})
    }

    render() {
        return (
            <div className= {full_width}>
              <GlobalSearchBox 
                value = {this.state.filterVal} 
                inputKeyPress = {this.inputKeyPress} 
                removeSearch = {this.removeSearch}
                onChange = {this.searchFilter} />
              {this.state.currentAgentList
                ? (<Table  
                      headers = {["First Name", "Last Name", "Email", "Agency Name"]}
                      currentAgentList = {this.state.currentAgentList}
                    />
                ): (<div>No info Available!</div>)}
            </div>
        );
    }
}

export default connect(
	({agentInfoStore}) => ({
    currentAgentList: agentInfoStore.currentAgentList,
		isFetching: agentInfoStore.isFetching,
	}),
	(dispatch) => bindActionCreators(agentActionCreater, dispatch)
)(AgentInfoContainer)
