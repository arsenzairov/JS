import React, { Component } from 'react';

class AddItem extends Component {

    constructor() {
        super();
        this.state = {
            newItem : {}

        }
    }

    handleSubmit(e) {
        e.preventDefault(); // this prevents the page from reloading -- do not delete this line!

        var value = this.refs.id.value;

        if (value === '') {
            alert('Name is required');
        }
        else {

            var newItem = {name : value};

            this.setState({
                newItem : newItem
            }, function() {
                this.props.addItem(this.state);
            })
        }





        // Implement the rest of this function here!
    }


    render() {
        var divName = 'add' + this.props.idName;
        return (
            <div className='addItemDiv'>
                <h4>Add {this.props.idName}</h4>
                <form ref='form' onSubmit={this.handleSubmit.bind(this)}>
                    <div id={divName} ref={divName}>
                        <label>Name</label><br />
                        <input type='text' ref='id' />
                    </div>
                    <br />
                    <input type='submit' value='Submit' />
                    <br />
                </form>
            </div>
        );
    }

}

export default AddItem;