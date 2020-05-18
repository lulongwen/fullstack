
class Parent extends React.Component {
  constructor (props) {
    super(props)
    this.state = { count: 0 }
  }

  componentDidMount () {
    this.setState({ count: this.state.count + 1 })
    console.log(1, this.state.count) // 输出 0

    this.setState({ count: this.state.count + 1 })
    console.log(2, this.state.count)  // 输出 0

    this.setState({ count: this.state.count + 1 })

    setTimeout(() => {
      this.setState({ count: this.state.count + 1 })
      console.log(3, this.state.count)  // 输出 2
    }, 0)

    setTimeout(() => {
      this.setState({ count: this.state.count + 1 })
      console.log(4, this.state.count)  // 输出 3
    }, 0)
  }

  render () {
    return <h1>值：{this.state.count}</h1>
  }
}
