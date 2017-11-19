import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import { InputField } from './components/input.js';
import { FullList } from './components/full.js';
/*import { Article } from './components/article.js';*/
import { Filters } from './components/filters.js';
import _ from 'lodash';

export class ToDoList extends React.Component {

	constructor(props) {
    	super(props);
      	this.state = { 
    		articles: []
    	 };
    	this.onNewItemCreated = this.onNewItemCreated.bind(this);
    	this.itemDone = this.itemDone.bind(this);
    	this.clearCompleted = this.clearCompleted.bind(this);
    	this.allCompleted = this.allCompleted.bind(this);
		this.destroyItem = this.destroyItem.bind(this);
	}

	
	itemDone(completeItem) {
		var newArticles = this.state.articles.map((b) =>{ 
			if (completeItem.id !== b.id) {
				return b
			} else {
				return {
					title: completeItem.title,
					completed: !completeItem.completed,
					id:completeItem.id
				}
			}
		})
		this.setState({
			articles: newArticles
		})

	}
	
	allCompleted() {
		var areAllCompleted = this.state.articles.every(element => element.completed)
		var newArticles = this.state.articles.map((element) =>{ 
			return {
				title: element.title,
				completed: !areAllCompleted,
				id:element.id
			}
		})	
		this.setState({
			articles: newArticles
		})
	}

	clearCompleted() {

		var listComplete = this.state.articles.filter((article) => {
			return article.completed === false
		})
		this.setState({
			articles: listComplete
		})
		
	}

	onNewItemCreated(newUserInput) {
       	var articles = this.state.articles //нынешнее состояние(изначально пустое)
		var maximum = Math.max(...articles.map((o) => {return (o.id)}));
		maximum = maximum < 0 ? 0: maximum ;
		var currentId = maximum + 1;
       	var article = {
    		title: newUserInput,
    		completed: false,
    		id: currentId
    	}
		var newArticles = [article] // один артикл обернули в массив
	  	this.setState({
    		articles: articles.concat(newArticles)  		
		})

	}

	destroyItem(element) {
		var newArticles = this.state.articles.filter((article) => {
			return element.id !== article.id
		})
		this.setState({
			articles: newArticles
		})		
	}

  	render() {
  		return(
			<div>
				<h1>todos</h1>
				<div className='container'>
				  	<div className='my-list'>
				  		<InputField onChange={this.onNewItemCreated} allCompleted={this.allCompleted} />
				  		<FullList articles={this.state.articles}  itemDone={this.itemDone} destroyItem={this.destroyItem} />
				  		{this.state.articles.length > 0 ? <Filters articles={this.state.articles} listCompleted={this.clearCompleted} />:''}
				  		{this.state.articles.length > 0 ? <div className='three-line'></div>:''}
					</div>
				</div>
				<footer className='down-footer'>
					<p>Double-click to edit a todo</p>
					<p>Created by <a href="">petehunt</a></p>
					<p>Part of <a href="">TodoMVC</a></p>
				</footer>
			</div>
		)
 	}
};
