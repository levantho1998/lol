import React, { Component } from 'react'
import Chart from 'react-apexcharts';
import '../../css/admin/Sale.css'
import { connect } from 'react-redux'
import { actGetAllOrderRequestAdmin } from '../../actions/index'

class Sale extends Component {

    componentDidMount() {
        this.props.onGetAllOrders()
    }

    render() {
        let { orders } = this.props

        let revenue = orders.reduce((result, current) => { // total_revenue
            result += current.totalPrice
            return result
        }, 0)

        let temp = []
        let result = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        for (const order of orders) {
            const parts = order.date.split('-');
            // console.log(parts)
            const orderDay = new Date(parts[0] + ' ' + parts[1] + ' ' + parts[2]);
            // console.log(orderDay)
            temp.push({ month: orderDay.getMonth(), totalPrice: order.totalPrice });
        }
        // console.log(temp)
        let months = temp.reduce((accumulator, currentValue) => {
            if (currentValue.month in accumulator) {
                accumulator[currentValue.month]++
            }
            else {
                accumulator[currentValue.month] = 1
            }
            return accumulator
        }, {})

        // console.log(months)

        for (let i = 0; i <= 11; i++) {
            for (const month in months) {
                if (i === parseInt(month)) {
                    result[i] = months[month];
                    break
                }
                result[i] = 0
            }
        }

        // console.log(result)
        const series = [{
            name: 'Sale',
            data: result
        }];
        const options = {
            colors: ['rgba(3, 211, 181, 0.85)'],
            grid: {
                show: false
            },
            chart: {
                toolbar: {
                    show: false
                },
                type: 'bar',
                height: 350,
                foreColor: 'rgb(22, 31, 106)'
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        style: {
                            fontSize: '16px',
                        }
                    },
                    horizontal: false,
                    columnWidth: '60%'
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            xaxis: {
                categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                labels: {
                    style: {
                        fontSize: '16px'
                    }
                }
            },
            yaxis: {
                labels: {
                    style: {
                        fontSize: '16px'
                    },
                    formatter: (val) => {
                        return Math.trunc(val)
                    }
                }
            },
            fill: {
                opacity: 1,
                colors: ['rgba(3, 211, 181, 0.85)']
            },
            tooltip: {
                fillSeriesColor: false,
                y: {
                    title: {
                        formatter: (seriesName) => seriesName,
                    },
                    formatter: undefined
                }
            }
        };
        return (
            <div className="Sale admin-col">
                <div className="header">
                    <h3 className="bt-header">Sale History</h3>
                    <div className="total">${revenue}</div>
                </div>
                <Chart options={options} series={series} type="bar" height={350} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.order,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetAllOrders: () => {
            dispatch(actGetAllOrderRequestAdmin())
        },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Sale)