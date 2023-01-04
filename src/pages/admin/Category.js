import React, { Component } from 'react';
import Header from '../../components/admin/Header'
import Nav from '../../components/admin/NavAdmin'
import TaskBar from '../../components/admin/TaskBar'
import CategoryFunc from '../../components/admin/CategoryFunc'
import { Container, Row, Col, Table } from 'reactstrap'
import { connect } from 'react-redux';
import {actAddCategoryRequest, actDeleteCategoryRequest, actFilterCategoryAdminRequest, actGetAllCategoryRequest, actToggleFormCategory} from '../../actions'
import ButtonDelete from '../../components/admin/ButtonDelete'

class Category extends Component {
    componentDidMount() {
        this.props.onGetAllCategory()
    }

    render() {
        let {
            isOpenFormCategory,
            onToggleFormCategory,
            category,
            onAddCategory,
            onDeleteCategory,
            onFilterCategory
        } = this.props
        // console.log(category)
        return (
            <React.Fragment>
                <Header/>
                <Nav match={this.props.match}/>
                {isOpenFormCategory ? 
                    <CategoryFunc 
                        onToggleFormCategory={onToggleFormCategory}
                        onAddCategory={onAddCategory}
                        onToggleFormCategory={onToggleFormCategory}
                        
                /> : ''}
                <div className="AdminProducts admin-page">
                    <Container>
                        <React.Fragment>
                            <Row style={{ padding: "0 15px" }}>
                                <Col className="admin-col mb-4 pb-0">
                                    <TaskBar
                                        type="Category"
                                        onToggleFormCategory={onToggleFormCategory}
                                        onFilterCategory={onFilterCategory}
                                    />
                                </Col>
                            </Row>
                            <Row style={{ padding: "0 15px" }}>
                                <Col
                                    className="admin-col p-0"
                                    style={{
                                        overflow: "auto",
                                        maxHeight: "450px",
                                    }}
                                >
                                    <Table className="admin-table">
                                        <thead>
                                            <tr>
                                                <th>Number</th>
                                                <th>Category Id</th>
                                                <th>Category Name</th>
                                                <th>action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                category.map((category, index) =>
                                                    <tr key={category._id}>
                                                        <td>{index + 1}</td>
                                                        <td>{category._id}</td>
                                                        <td>{category.name}</td>
                                                        <td><ButtonDelete type='category' id={category._id} onDeleteCategory={onDeleteCategory}/></td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        </React.Fragment>
                    </Container>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isOpenFormCategory: state.isOpenFormCategory,
        category : state.category
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onToggleFormCategory : () => {
            dispatch(actToggleFormCategory())
        },
        onGetAllCategory : () => {
            dispatch(actGetAllCategoryRequest())
        },
        onAddCategory : (data) => {
            dispatch(actAddCategoryRequest(data))
        },
        onDeleteCategory : (id) => {
            dispatch(actDeleteCategoryRequest(id))
        },
        onFilterCategory : (name) => {
            dispatch(actFilterCategoryAdminRequest(name))
        }
        
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Category);