import React, { Component } from 'react'
import { Button, Container } from 'reactstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import '../../css/client/Banner.css'

class Banner extends Component {
    constructor(props) {
        super(props)
        this.state = {
            keyword: ''
        }
    }

    handeChange = (e) => {
        let target = e.target
        let name = target.name
        let value = target.value
        this.setState({
            [name]: value
        })
    }
    handleOnclick = () => {
        let { keyword } = this.state
        this.props.onFindProduct(keyword)
        this.setState({
            keyword: ''
        })
    }
    render() {
        return (
            <div className="Banner">
                <Container>
                    <div className="title">
                        <h1>Your own books store</h1>
                        <p>Get your favourite books from our wide range of books.</p>
                    </div>
                    <div className="search-bar">
                        <span className="label">Book</span>
                        <form>
                            <input className="p-0" type="text" placeholder="Search your books from here" name="keyword" value={this.state.keyword} onChange={this.handeChange} />
                        </form>
                        <Button onClick={this.handleOnclick}>
                            <FontAwesomeIcon icon={faSearch} className="mr-2" />
                            Search
                        </Button>
                    </div>
                </Container>
            </div>
        )
    }
}


export default Banner