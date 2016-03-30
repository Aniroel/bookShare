import React from 'react';
import {PeopleListEntryContainer} from './PeopleListEntry';
class PeopleList extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    if (!this.props.peopleList) {
      return <div></div>;
    } else if (this.props.peopleList.length === 0) {
      return <div>
        <h3>Not found, search again</h3>
      </div>;
    } else if (this.props.peopleList) {
      return <div class-name="people-list">
        <h3>Search results:</h3>
        {this.props.peopleList ?
          this.props.peopleList.map((person) => <PeopleListEntryContainer {...person}/>) :
          null}
      </div>;
    }
  }
}
export default PeopleList;